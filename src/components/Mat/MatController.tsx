import { useState, useEffect } from "react";
import Mat from "./Mat";
import { awardCards, checkIfGameWon, drawCards, initaliseGame } from "@/state/game";
import SideBar from "../SideBar/SideBar";

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

export default function MatController() {
        const [gameState, setGameState] = useState(initaliseGame());
    
        const handleDrawCards = async () => {
            if (!gameState.players.computer.hand) {
                setGameState((prevState) => drawCards(prevState));
                await timeout(1000);
                setGameState((prevState) => awardCards(prevState));
                setGameState((prevState) => checkIfGameWon(prevState));
            }
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