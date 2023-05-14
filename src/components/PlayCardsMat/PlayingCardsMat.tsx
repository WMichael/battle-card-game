import React, { useState } from 'react';
import './PlayingCardsMat.css';
import { drawCards, initaliseGame } from '@/state/game';

export default function PlayingCardsMat() {
  const [gameState, setGameState] = useState(initaliseGame());
  console.log(gameState);

  const handleDrawCards = () => {
    setGameState(prevState => drawCards(prevState));
  };

  return (
    <div className='mat'>
        <button onClick={() => handleDrawCards()}>Start</button>
    </div>
  )
}