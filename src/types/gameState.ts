import Player from "./player";

type GameState = {
    players: { 
        player1: Player;
        player2: Player;
    };
    won: boolean;
    winner: Player | undefined;
    messages: string[];
}

export default GameState;