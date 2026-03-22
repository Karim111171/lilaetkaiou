import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS_BY_ID } from "../../../lib/products";

type CheckoutItem = {
  id: number;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      console.error("Missing STRIPE_SECRET_KEY");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);

    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ).replace(/\/$/, "");

    let items: CheckoutItem[];

    try {
      const body = await req.json();
      items = body.items;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return NextResponse.json(
          { error: "Cart is empty" },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const lineItems = [];

    for (const item of items) {
      if (
        typeof item.id !== "number" ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0 ||
        item.quantity > 99
      ) {
        return NextResponse.json(
          { error: "Invalid item data" },
          { status: 400 }
        );
      }

      const product = PRODUCTS_BY_ID[item.id];

      if (!product) {
        return NextResponse.json(
          { error: `Unknown product id: ${item.id}` },
          { status: 400 }
        );
      }

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            description: "Pâte à modeler naturelle Lila & Kaiou",
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["LB"],
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop`,
      metadata: {
        items_count: items.length.toString(),
        total_items: items
          .reduce((sum, item) => sum + item.quantity, 0)
          .toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}