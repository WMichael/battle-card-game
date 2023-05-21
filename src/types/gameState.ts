import Player from "./player";

type GameState = {
    players: { 
        computer: Player;
        player: Player;
    };
    won: boolean;
    winner: Player | undefined;
    messages: string[];
}

export default GameState;