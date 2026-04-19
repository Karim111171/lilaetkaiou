// app/game/page.tsx - Version corrigée
"use client";
// @ts-nocheck
import { useEffect, useRef, useState, useCallback } from "react";
import Header from "../../components/Header";

type Position = { x: number; y: number };

type Level = {
  name: string;
  data: string[];
  collectibles: number;
};

type Player = {
  id: number;
  name: string;
  emoji: string;
  color: string;
  pos: Position;
  collectibles: number;
};

type Images = {
  wall: HTMLImageElement | null;
  floor: HTMLImageElement | null;
  player1: HTMLImageElement | null;
  player2: HTMLImageElement | null;
  collectible: HTMLImageElement | null;
  exit: HTMLImageElement | null;
};

export default function SoLongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [images, setImages] = useState<Images>({
    wall: null,
    floor: null,
    player1: null,
    player2: null,
    collectible: null,
    exit: null,
  });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [gameState, setGameState] = useState({
    map: [] as string[][],
    collectibles: 0,
    totalCollectibles: 0,
    moves: 0,
    isComplete: false,
    levelComplete: false,
  });
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "Kaiou",
      emoji: "😺",
      color: "#3498db",
      pos: { x: 0, y: 0 },
      collectibles: 0,
    },
    {
      id: 2,
      name: "Lila",
      emoji: "🌸",
      color: "#ff69b4",
      pos: { x: 0, y: 0 },
      collectibles: 0,
    }
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [showLevelCompleteOverlay, setShowLevelCompleteOverlay] = useState(false);
  const [firstFinisher, setFirstFinisher] = useState<number | null>(null);

  // Charger les images
  useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.warn(`Image non trouvée: ${src}`);
          resolve(null);
        };
        img.src = src;
      });
    };

    Promise.all([
      loadImage("/game/assets/wall.png"),
      loadImage("/game/assets/floor.png"),
      loadImage("/game/assets/kaiou.png"),
      loadImage("/game/assets/lila.png"),
      loadImage("/game/assets/collectible.png"),
      loadImage("/game/assets/exit.png"),
    ])
      .then(([wall, floor, kaiou, lila, collectible, exit]) => {
        setImages({ 
          wall, 
          floor, 
          player1: kaiou,
          player2: lila,
          collectible, 
          exit 
        });
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        setImagesLoaded(true);
      });
  }, []);

  // Charger les niveaux depuis le JSON
  useEffect(() => {
    fetch('/levels.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load levels');
        return res.json();
      })
      .then(data => {
        setLevels(data.levels);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur chargement niveaux:', error);
        setLoading(false);
      });
  }, []);

  // Valider une map
  const validateMap = (map: string[]): boolean => {
    const validChars = ['1', '0', 'P', 'C', 'E', 'L'];
    for (const row of map) {
      for (const char of row) {
        if (!validChars.includes(char)) return false;
      }
    }
    const width = map[0].length;
    return map.every(row => row.length === width);
  };

  const initGame = useCallback((level: number = currentLevel) => {
  if (levels.length === 0) return;
  const levelData = levels[level];
  if (!levelData) return;
  
  if (!validateMap(levelData.data)) {
    console.error("Invalid map format");
    return;
  }
  
  const map: string[][] = levelData.data.map((row: string) => row.split(''));
  let player1Pos: Position = { x: 0, y: 0 };
  let player2Pos: Position = { x: 0, y: 0 };
  let collectibles: number = 0;
  let foundPlayer1 = false;
  let foundPlayer2 = false;
  
  // Chercher les positions des deux joueurs dans la map
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === 'P' && !foundPlayer1) {
        player1Pos = { x, y };
        foundPlayer1 = true;
      }
      if (map[y][x] === 'L' && !foundPlayer2) {
        player2Pos = { x, y };
        foundPlayer2 = true;
      }
      if (map[y][x] === 'C') collectibles++;
    }
  }
  
  // Si les positions ne sont pas définies dans la map, on les place automatiquement
  if (!foundPlayer1 || !foundPlayer2) {
    const height = map.length;
    const width = map[0].length;
    
    if (!foundPlayer1) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (map[y][x] === '0') {
            player1Pos = { x, y };
            map[y][x] = 'P';
            foundPlayer1 = true;
            break;
          }
        }
        if (foundPlayer1) break;
      }
    }
    
    if (!foundPlayer2) {
      for (let y = height - 1; y >= 0; y--) {
        for (let x = width - 1; x >= 0; x--) {
          if (map[y][x] === '0') {
            player2Pos = { x, y };
            map[y][x] = 'L';
            foundPlayer2 = true;
            break;
          }
        }
        if (foundPlayer2) break;
      }
    }
  }
  
  setGameState({
    map,
    collectibles,
    totalCollectibles: collectibles,
    moves: 0,
    isComplete: false,
    levelComplete: false,
  });
  
  setPlayers([
    { ...players[0], pos: player1Pos, collectibles: 0 },
    { ...players[1], pos: player2Pos, collectibles: 0 }
  ]);
  
  setCurrentPlayerIndex(0);
  setErrorMessage(null);
  setShowLevelCompleteOverlay(false);
  setFirstFinisher(null);
}, [currentLevel, levels]);

  const nextLevel = useCallback(() => {
    setShowLevelCompleteOverlay(false);
    if (currentLevel + 1 < levels.length) {
      setCurrentLevel(prev => prev + 1);
      setTimeout(() => initGame(currentLevel + 1), 100);
    } else {
      setShowWinMessage(true);
      setGameState(prev => ({ ...prev, isComplete: true }));
    }
  }, [currentLevel, initGame, levels.length]);

  const movePlayer = useCallback((dx: number, dy: number) => {
    if (gameState.isComplete || gameState.levelComplete) return;
    
    const player = players[currentPlayerIndex];
    const newX = player.pos.x + dx;
    const newY = player.pos.y + dy;
    
    if (newY < 0 || newY >= gameState.map.length) return;
    if (newX < 0 || newX >= gameState.map[0].length) return;
    
    const targetCell = gameState.map[newY][newX];
    const otherPlayer = players[currentPlayerIndex === 0 ? 1 : 0];
    
    if (otherPlayer.pos.x === newX && otherPlayer.pos.y === newY) {
      setErrorMessage("Case occupée !");
      setTimeout(() => setErrorMessage(null), 1000);
      return;
    }
    
    if (targetCell === '1') return;
    
    const newMap = [...gameState.map.map(row => [...row])];
    let newCollectibles = gameState.collectibles;
    let newPlayerCollectibles = player.collectibles;
    let isLevelComplete = false;
    
    if (targetCell === 'C') {
      newCollectibles--;
      newPlayerCollectibles++;
    }
    
    if (targetCell === 'E') {
      if (newCollectibles === 0) {
        isLevelComplete = true;
      } else {
        setErrorMessage(`Encore ${newCollectibles} ⭐ à collecter`);
        setTimeout(() => setErrorMessage(null), 1000);
        return;
      }
    }
    
    const playerChar = currentPlayerIndex === 0 ? 'P' : 'L';
    newMap[player.pos.y][player.pos.x] = '0';
    newMap[newY][newX] = playerChar;
    
    setGameState(prev => ({
      ...prev,
      map: newMap,
      collectibles: newCollectibles,
      moves: prev.moves + 1,
      levelComplete: isLevelComplete,
      isComplete: isLevelComplete && currentLevel + 1 >= levels.length,
    }));
    
    setPlayers(prev => prev.map((p, idx) => 
      idx === currentPlayerIndex 
        ? { ...p, pos: { x: newX, y: newY }, collectibles: newPlayerCollectibles }
        : p
    ));
    
    if (isLevelComplete) {
      setScores(prev => ({
        player1: prev.player1 + (currentPlayerIndex === 0 ? newPlayerCollectibles : players[0].collectibles),
        player2: prev.player2 + (currentPlayerIndex === 1 ? newPlayerCollectibles : players[1].collectibles)
      }));
      
      if (firstFinisher === null) {
        setFirstFinisher(currentPlayerIndex);
        setScores(prev => ({
          player1: prev.player1 + (currentPlayerIndex === 0 ? 1 : 0),
          player2: prev.player2 + (currentPlayerIndex === 1 ? 1 : 0)
        }));
        setErrorMessage(`🎉 ${players[currentPlayerIndex].name} sort en premier et gagne 1 point bonus ! 🎉`);
        setTimeout(() => setErrorMessage(null), 2000);
      }
      
      setShowLevelCompleteOverlay(true);
      setTimeout(() => {
        setShowLevelCompleteOverlay(false);
        setFirstFinisher(null);
        nextLevel();
      }, 2000);
    } else {
      setCurrentPlayerIndex(prev => prev === 0 ? 1 : 0);
    }
  }, [gameState, players, currentPlayerIndex, currentLevel, levels.length, nextLevel, firstFinisher]);

  // Gestion des touches
  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||
        e.key === 'z' || e.key === 'Z' || e.key === 's' || e.key === 'S' ||
        e.key === 'q' || e.key === 'Q' || e.key === 'd' || e.key === 'D' ||
        e.key === 'w' || e.key === 'W') {
      e.preventDefault();
    }
    
    if (gameState.levelComplete || gameState.isComplete) return;
    
    if (currentPlayerIndex === 0) {
      switch(e.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
      }
    }
    
    if (currentPlayerIndex === 1) {
      switch(e.key) {
        case 'z': case 'Z': 
          movePlayer(0, -1);
          break;
        case 's': case 'S': 
          movePlayer(0, 1);
          break;
        case 'q': case 'Q': 
          movePlayer(-1, 0);
          break;
        case 'd': case 'D':
          movePlayer(1, 0);
          break;
      }
    }
    
    switch(e.key) {
      case ' ': case 'Space':
        e.preventDefault();
        setCurrentPlayerIndex(prev => prev === 0 ? 1 : 0);
        setErrorMessage(null);
        break;
      case 'r': case 'R':
        e.preventDefault();
        initGame();
        break;
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [movePlayer, gameState.levelComplete, gameState.isComplete, initGame, currentPlayerIndex]);

  useEffect(() => {
    if (imagesLoaded && levels.length > 0) {
      initGame();
    }
  }, [imagesLoaded, initGame, levels.length]);

  // Dessiner le jeu - Version qui s'adapte sans scroll
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas || !gameState.map.length || !imagesLoaded) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const mapWidth = gameState.map[0].length;
  const mapHeight = gameState.map.length;
  
  // Calculer l'espace disponible (en pixels)
  const availableWidth = Math.min(window.innerWidth - 80, 1000);
  const availableHeight = window.innerHeight - 280;
  
  // Calculer la taille des cellules pour que la map tienne
  let cellSizeByWidth = Math.floor(availableWidth / mapWidth);
  let cellSizeByHeight = Math.floor(availableHeight / mapHeight);
  
  // Prendre la plus petite pour que tout tienne
  let cellSize = Math.min(cellSizeByWidth, cellSizeByHeight);
  
  // Limites : entre 28px et 70px
  cellSize = Math.min(70, Math.max(24, cellSize));
  
  const width = mapWidth * cellSize;
  const height = mapHeight * cellSize;
  
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  
  gameState.map.forEach((row, y) => {
    row.forEach((cell, x) => {
      const imgX = x * cellSize;
      const imgY = y * cellSize;
      
      if (images.floor && images.floor.complete && images.floor.naturalWidth > 0) {
        ctx.drawImage(images.floor, imgX, imgY, cellSize, cellSize);
      } else {
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(imgX, imgY, cellSize, cellSize);
      }
      
      switch(cell) {
        case '1':
          if (images.wall && images.wall.complete && images.wall.naturalWidth > 0) {
            ctx.drawImage(images.wall, imgX, imgY, cellSize, cellSize);
          } else {
            ctx.fillStyle = '#2c3e50';
            ctx.fillRect(imgX, imgY, cellSize, cellSize);
          }
          break;
        case 'C':
          if (images.collectible && images.collectible.complete && images.collectible.naturalWidth > 0) {
            ctx.drawImage(images.collectible, imgX, imgY, cellSize, cellSize);
          } else {
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(imgX + cellSize/2, imgY + cellSize/2, cellSize * 0.3, 0, 2 * Math.PI);
            ctx.fill();
          }
          break;
        case 'P':
          if (images.player1 && images.player1.complete && images.player1.naturalWidth > 0) {
            ctx.drawImage(images.player1, imgX, imgY, cellSize, cellSize);
          } else {
            ctx.fillStyle = players[0].color;
            ctx.beginPath();
            ctx.arc(imgX + cellSize/2, imgY + cellSize/2, cellSize * 0.35, 0, 2 * Math.PI);
            ctx.fill();
          }
          break;
        case 'L':
          if (images.player2 && images.player2.complete && images.player2.naturalWidth > 0) {
            ctx.drawImage(images.player2, imgX, imgY, cellSize, cellSize);
          } else {
            ctx.fillStyle = players[1].color;
            ctx.beginPath();
            ctx.arc(imgX + cellSize/2, imgY + cellSize/2, cellSize * 0.35, 0, 2 * Math.PI);
            ctx.fill();
          }
          break;
        case 'E':
          if (images.exit && images.exit.complete && images.exit.naturalWidth > 0) {
            ctx.drawImage(images.exit, imgX, imgY, cellSize, cellSize);
          } else {
            ctx.fillStyle = '#2ecc71';
            ctx.fillRect(imgX + cellSize * 0.15, imgY + cellSize * 0.15, cellSize * 0.7, cellSize * 0.7);
          }
          break;
      }
    });
  });
}, [gameState.map, images, imagesLoaded, players]);

  useEffect(() => {
    const handleResize = () => {
      setGameState(prev => ({ ...prev }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading || !imagesLoaded || levels.length === 0) {
    return (
      <div className="container">
        <Header />
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <p>Chargement du jeu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '8px 16px 16px 16px',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Titre et Scores */}
<div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '4px',
  flexWrap: 'wrap'
}}>
  <div>
    <h1 style={{ color: '#dc2d16', fontSize: '1.4rem', margin: 0 }}>LA CHASSE AU TRESOR</h1>
    {/* Nom du niveau - en dessous du titre, aligné à gauche */}
    <div style={{
      fontSize: '1rem',
      color: '#666',
      marginTop: '4px',
      marginLeft: '2px'
    }}>
      {levels[currentLevel]?.name} • {currentLevel + 1}/{levels.length}
    </div>
  </div>
  
  <div style={{ display: 'flex', gap: '15px' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '5px 14px',
      borderRadius: '25px',
      background: currentPlayerIndex === 0 ? `${players[0].color}25` : '#f5f5f5',
      border: currentPlayerIndex === 0 ? `2px solid ${players[0].color}` : '1px solid #e0e0e0'
    }}>
      <span style={{ fontSize: '1.2rem' }}>{players[0].emoji}</span>
      <span style={{ fontWeight: 'bold', fontSize: '1rem', color: players[0].color }}>Kaiou</span>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: players[0].color }}>{scores.player1}</span>
      {currentPlayerIndex === 0 && <span style={{ fontSize: '1.3rem', background: players[0].color, color: 'white', padding: '2px 8px', borderRadius: '12px' }}>TOUR</span>}
    </div>
    
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '5px 14px',
      borderRadius: '25px',
      background: currentPlayerIndex === 1 ? `${players[1].color}25` : '#f5f5f5',
      border: currentPlayerIndex === 1 ? `2px solid ${players[1].color}` : '1px solid #e0e0e0'
    }}>
      <span style={{ fontSize: '1.2rem' }}>{players[1].emoji}</span>
      <span style={{ fontWeight: 'bold', fontSize: '1rem', color: players[1].color }}>Lila</span>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: players[1].color }}>{scores.player2}</span>
      {currentPlayerIndex === 1 && <span style={{ fontSize: '1.3rem', background: players[1].color, color: 'white', padding: '2px 8px', borderRadius: '12px' }}>TOUR</span>}
    </div>
  </div>
</div>


        
        {/* Ligne 2 : Stats + Instructions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '8px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ fontSize: '1rem', background: '#f9f9f9', padding: '5px 12px', borderRadius: '20px' }}>
              ⭐ <span style={{ color: '#3498db', fontWeight: 'bold' }}>Kaiou: {players[0].collectibles}</span> / 
              <span style={{ color: '#ff69b4', fontWeight: 'bold' }}> Lila: {players[1].collectibles}</span> / 
              <span style={{ color: '#f1c40f', fontWeight: 'bold' }}> Reste: {gameState.collectibles}</span>
            </div>
            <div style={{ fontSize: '0.85rem', background: '#f9f9f9', padding: '5px 12px', borderRadius: '20px' }}>
              🎲 <strong>{gameState.moves}</strong>
            </div>
          </div>
          
          <div className="desktop-instructions" style={{ 
            display: 'flex', 
            gap: '12px', 
            fontSize: '0.85rem',
            background: '#e8f0fe',
            padding: '5px 14px',
            borderRadius: '25px'
          }}>
            <span>🎮 <strong style={{ color: '#3498db' }}>Kaiou</strong> : ⬆️⬇️⬅️➡️</span>
            <span>🎮 <strong style={{ color: '#ff69b4' }}>Lila</strong> : Z S Q D</span>
            <span>🔄 <strong>ESPACE</strong> pour passer</span>
            <span>🔁 <strong>R</strong> pour recommencer</span>
          </div>
        </div>
        
        {/* Message d'erreur */}
        {errorMessage && (
          <div style={{
            margin: '0 auto 8px auto',
            padding: '4px 12px',
            background: '#e74c3c',
            color: 'white',
            borderRadius: '20px',
            fontSize: '0.75rem',
            textAlign: 'center',
            maxWidth: '300px'
          }}>
            ⚠️ {errorMessage}
          </div>
        )}
        
       {/* Canvas avec overlay - avec scroll horizontal sur mobile */}
<div style={{
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '6px 0',
  background: '#2c3e50',
  padding: '10px',
  borderRadius: '16px',
  overflowX: 'auto',
  overflowY: 'hidden',
  maxWidth: '100%',
  WebkitOverflowScrolling: 'touch'
}}>
  <canvas ref={canvasRef} style={{ borderRadius: '8px', display: 'block' }} />
  
  {/* Overlay de fin de niveau */}
  {showLevelCompleteOverlay && (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '16px',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #3498db, #2980b9)',
        padding: '20px 40px',
        borderRadius: '30px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        animation: 'popIn 0.3s ease'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>✨</div>
        <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Niveau terminé !</h2>
        
        {firstFinisher !== null && (
          <div style={{
            marginTop: '10px',
            fontSize: '1rem',
            background: 'rgba(255,255,255,0.3)',
            padding: '5px 15px',
            borderRadius: '25px',
            display: 'inline-block'
          }}>
            🏆 +1 point pour {players[firstFinisher].name} ! 🏆
          </div>
        )}
        
        <div style={{ 
          marginTop: '12px', 
          fontSize: '1rem',
          background: 'rgba(255,255,255,0.2)',
          padding: '4px 12px',
          borderRadius: '20px',
          display: 'inline-block'
        }}>
          😺 {players[0].collectibles}  •  🌸 {players[1].collectibles}
        </div>
      </div>
    </div>
  )}
</div>
        
        {/* Contrôles tactiles pour mobile - Version ultra stylée */}
<div className="mobile-controls" style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '15px 0 10px 0',
  gap: '12px'
}}>
  {/* Flèches directionnelles - disposition en croix */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
    {/* Haut */}
    <button
      onTouchStart={(e) => { e.preventDefault(); movePlayer(0, -1); }}
      style={{
        width: '35px',
        height: '35px',
        fontSize: '2rem',
         background: 'linear-gradient(145deg, #3498db, #2980b9)',
        color: '#ecf0f1',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        touchAction: 'manipulation',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.05s linear'
      }}
      
      onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >⬆️</button>
    
    {/* Milieu : gauche, bas, droite */}
    <div style={{ display: 'flex', gap: '20px' }}>
      <button
        onTouchStart={(e) => { e.preventDefault(); movePlayer(-1, 0); }}
        style={{
          width: '35px',
          height: '35px',
          fontSize: '2rem',
           background: 'linear-gradient(145deg, #3498db, #2980b9)',
          color: '#ecf0f1',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          touchAction: 'manipulation',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.05s linear'
        }}
       
        onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >⬅️</button>
      
      <button
        onTouchStart={(e) => { e.preventDefault(); movePlayer(0, 1); }}
        style={{
          width: '35px',
          height: '35px',
          fontSize: '2rem',
           background: 'linear-gradient(145deg, #3498db, #2980b9)',
          color: '#ecf0f1',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          touchAction: 'manipulation',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.05s linear'
        }}
        
        onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >⬇️</button>
      
      <button
        onTouchStart={(e) => { e.preventDefault(); movePlayer(1, 0); }}
        style={{
          width: '35px',
          height: '35px',
          fontSize: '2rem',
          background: 'linear-gradient(145deg, #3498db, #2980b9)',
          color: '#ecf0f1',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          touchAction: 'manipulation',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.05s linear'
        }}
       
        onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >➡️</button>
    </div>
  </div>
  
  {/* Boutons d'action */}
  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
    <button
      onTouchStart={(e) => { e.preventDefault(); setCurrentPlayerIndex(prev => prev === 0 ? 1 : 0); setErrorMessage(null); }}
      style={{
        padding: '10px 24px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #3498db, #2980b9)',
        color: 'white',
        border: 'none',
        borderRadius: '40px',
        cursor: 'pointer',
        touchAction: 'manipulation',
        boxShadow: '0 4px 12px rgba(52,152,219,0.3)',
        transition: 'all 0.05s linear'
      }}
      
      onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >🔄 Passer le tour</button>
    
    <button
      onTouchStart={(e) => { e.preventDefault(); initGame(); }}
      style={{
        padding: '10px 24px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #e67e22, #d35400)',
        color: 'white',
        border: 'none',
        borderRadius: '40px',
        cursor: 'pointer',
        touchAction: 'manipulation',
        boxShadow: '0 4px 12px rgba(230,126,34,0.3)',
        transition: 'all 0.05s linear'
      }}
      
      onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >🔄 Recommencer</button>
  </div>
  
  {/* Indicateur du joueur actif */}
  <div style={{
    fontSize: '0.9rem',
    marginTop: '12px',
    padding: '8px 20px',
    background: currentPlayerIndex === 0 ? `rgba(52,152,219,0.15)` : `rgba(255,105,180,0.15)`,
    borderRadius: '30px',
    fontWeight: 'bold',
    color: currentPlayerIndex === 0 ? players[0].color : players[1].color,
    border: `1px solid ${currentPlayerIndex === 0 ? players[0].color : players[1].color}`,
    backdropFilter: 'blur(4px)'
  }}>
    🎮 {players[currentPlayerIndex].name} joue
  </div>
</div>
        
        {/* Fin du jeu */}
        {gameState.isComplete && (
          <div style={{
            margin: '6px auto',
            padding: '8px 12px',
            background: '#2ecc71',
            color: 'white',
            borderRadius: '25px',
            textAlign: 'center',
            maxWidth: '350px'
          }}>
            <span style={{ fontWeight: 'bold' }}>🏆 Jeu terminé ! 🏆</span>
            <span style={{ marginLeft: '8px' }}>Kaiou: {scores.player1} - Lila: {scores.player2}</span>
            <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>
              {scores.player1 > scores.player2 && `🎉 Kaiou gagne ! 🎉`}
              {scores.player2 > scores.player1 && `🎉 Lila gagne ! 🎉`}
              {scores.player1 === scores.player2 && `🤝 Égalité ! 🤝`}
            </div>
            <button onClick={() => {
              setCurrentLevel(0);
              setScores({ player1: 0, player2: 0 });
              initGame(0);
              setShowWinMessage(false);
            }} style={{ marginTop: '4px', background: 'white', color: '#2ecc71', border: 'none', borderRadius: '20px', padding: '3px 12px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>
              🔄 Rejouer
            </button>
          </div>
        )}
        
        {showWinMessage && !gameState.isComplete && (
          <div style={{
            margin: '6px auto',
            padding: '8px 12px',
            background: '#2ecc71',
            color: 'white',
            borderRadius: '25px',
            textAlign: 'center',
            maxWidth: '280px'
          }}>
            <span>🏆 Bravo ! 🏆</span>
            <button onClick={() => {
              setCurrentLevel(0);
              setScores({ player1: 0, player2: 0 });
              initGame(0);
              setShowWinMessage(false);
            }} style={{ marginLeft: '10px', background: 'white', color: '#2ecc71', border: 'none', borderRadius: '20px', padding: '3px 12px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>
              🔄 Rejouer
            </button>
          </div>
        )}
      </div>
      
      <style jsx>{`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes popIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Cacher les contrôles tactiles sur desktop */
  @media (min-width: 769px) {
    .mobile-controls {
      display: none !important;
    }
  }
  
  /* Cacher les instructions sur mobile */
  @media (max-width: 768px) {
    .desktop-instructions {
      display: none !important;
    }
  }
`}</style>
    </div>
  );
}