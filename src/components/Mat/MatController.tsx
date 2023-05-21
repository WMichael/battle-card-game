import { useState, useEffect } from "react";
import Mat from "./Mat";
import { drawCards, initaliseGame } from "@/state/game";
import SideBar from "../SideBar/SideBar";

export default function MatController() {
        const [gameState, setGameState] = useState(initaliseGame());
    
        const handleDrawCards = () => {
            setGameState((prevState) => drawCards(prevState));
              console.log('handleDrawCards called');
            
        };
    
        const handleReset = () => {
            setGameState(() => initaliseGame());
            console.log('handleReset called');
            console.log(gameState.messages);
        };
        return (
            <div className="container">
                <SideBar handleReset={handleReset} messages={gameState.messages}/>
                    <Mat
                    handleDrawCards={handleDrawCards}
                    gameState={gameState}
                    />
            </div>
            
        )
}