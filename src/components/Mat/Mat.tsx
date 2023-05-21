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
      <PlayerSpace handleDrawCards={handleDrawCards} hand={gameState.players.player1.hand}></PlayerSpace>
      <PlayerSpace handleDrawCards={handleDrawCards} hand={gameState.players.player2.hand}></PlayerSpace>
    </div>
  );
}