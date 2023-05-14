import React, { useEffect, useState } from "react";
import "./PlayingCardsMat.css";
import { drawCards, initaliseGame } from "@/state/game";
import NavigationBar from "../NavigationBar/NavigationBar";
import PlayerSpace from "../PlayerSpace/PlayerSpace";
import ScoreBoard from "../ScoreBoard/ScoreBoard"

export default function PlayingCardsMat() {
  const [gameState, setGameState] = useState(initaliseGame());
  const [player1Hand, setPlayer1Hand] = useState(gameState.players.player1.hand);
  const [player2Hand, setPlayer2Hand] = useState(gameState.players.player1.hand);

  useEffect(() => {
    setGameState((prevState) => drawCards(prevState));
  }, []);

  useEffect(() => {
    setPlayer1Hand(gameState.players.player1.hand);
    setPlayer2Hand(gameState.players.player2.hand);
  }, [gameState]);


  const handleDrawCards = () => {
    setGameState((prevState) => drawCards(prevState));
  };

  const handleReset = () => {
    setGameState(() => initaliseGame());
    setGameState((prevState) => drawCards(prevState));
  };



  return (
    <div className="mat">
      <ScoreBoard></ScoreBoard>
      <PlayerSpace hand={player1Hand}></PlayerSpace>
      <PlayerSpace hand={player2Hand}></PlayerSpace>
      <NavigationBar handleReset={handleReset}></NavigationBar>
    </div>
  );
}
