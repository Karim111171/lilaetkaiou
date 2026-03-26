import Header from "../../components/Header";
import Image from "next/image";

export default function StoriesPage() {
  return (
    <div className="container">
      <Header />

      <section className="home-section">
        <h1>Les histoires</h1>
        <p>
          Découvrez les aventures illustrées de Lila & Kaiou.
        </p>

        <div className="story-card">
          <h2>1- Lila et Kaiou</h2>
	    <Image src="/histoirelilakaiou.png" alt="histoire de Lila et Kaiou" width={280} height={220} />
          <p>
            Un petit album illustré de Lila & Kaiou à lire en ligne ou à télécharger.
          </p>

          <div className="story-actions">
            <a
              href="/histoires/histoirelilakaiou.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              Lire le PDF
            </a>

            <a
              href="/histoires/lila-et-kaiou-histoire-1.pdf"
              download
              className="cta-button secondary-button"
            >
              Télécharger
            </a>
          </div>
        </div>
	  <div className="story-card">
          <h2>2- La Communication</h2>
	    <Image src="/Snapshot.png" alt="Pâte magique 200g" width={280} height={220} />
          <p>
            Un petit album illustré de Lila & Kaiou à lire en ligne ou à télécharger.
          </p>

          <div className="story-actions">
            <a
              href="/histoires/1 - La communication - Lila & Kaiou.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              Lire le PDF
            </a>

            <a
              href="/histoires/lila-et-kaiou-histoire-1.pdf"
              download
              className="cta-button secondary-button"
            >
              Télécharger
            </a>
          </div>
        </div>

	  <div className="story-card">
          <h2>3- L'histoire de Kaiou</h2>
	    <Image src="/Kaiou.png" alt="histoire de Lila et Kaiou" width={280} height={220} />
          <p>
            Un petit album illustré de Lila & Kaiou à lire en ligne ou à télécharger.
          </p>

          <div className="story-actions">
            <a
              href="/histoires/histoirelilakaiou.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              Lire le PDF
            </a>

            <a
              href="/histoires/lila-et-kaiou-histoire-1.pdf"
              download
              className="cta-button secondary-button"
            >
              Télécharger
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}