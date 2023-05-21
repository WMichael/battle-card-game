import React, { useEffect, useState } from "react";
import "./Mat.css";
import PlayerSpace from "../PlayerSpace/PlayerSpace";
import GameState from "@/types/gameState";

interface MatProps {
  handleDrawCards: () => void;
  gameState: GameState;
}

export default function Mat(props: MatProps) {
  const { handleDrawCards, gameState} = props;

  return (
    <div className="mat">
      <PlayerSpace handleDrawCards={handleDrawCards} computer={true} isGameOver={gameState.won} hand={gameState.players.computer.hand}></PlayerSpace>
      <PlayerSpace handleDrawCards={handleDrawCards} computer={false} isGameOver={gameState.won} hand={gameState.players.player.hand}></PlayerSpace>
    </div>
  );
}