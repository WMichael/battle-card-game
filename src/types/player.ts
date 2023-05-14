import Card from "./card";

type Player = {
    hand: Card | undefined;
    deck: Card[];
}

export default Player;