import Card from "@/types/card";
import Deck from "@/types/deck";
import GameState from "@/types/gameState";
import Player from "@/types/player";

enum LogMessages {
	INITIALISE_GAME = "Game started",
	DRAW_CARDS = "Cards drawn",
	AWARD_CARDS = "Cards awarded",
	GAME_WON = "Game won",
	GAME_LOST = "Game lost",
}

export function initaliseGame(): GameState {
	const mainDeck: Card[] = initialiseMainDeck();
	const play1Deck: Card[] = mainDeck.slice(0, 26);
	const play2Deck: Card[] = mainDeck.slice(26, 52);

	return {
		players: {
			player1: {
				hand: undefined,
				deck: play1Deck,
			},
			player2: {
				hand: undefined,
				deck: play2Deck,
			},
		},
		won: false,
		winner: undefined,
		messages: [LogMessages.INITIALISE_GAME],
	};
}

export function drawCards(state: GameState): GameState {
	const playerCard1 = state.players.player1.deck.pop();
	const playerCard2 = state.players.player2.deck.pop();
	if (playerCard1 && playerCard2) {
		return {
            ...state,
            players: {
                player1: {
                    ...state.players.player1,
                    hand: playerCard1
                },
                player2: {
                    ...state.players.player2,
                    hand: playerCard2
                }
            },
			messages: [LogMessages.DRAW_CARDS, ...state.messages]
        };
	}
	return state;
}

export function checkIfGameWon(state: GameState): GameState {
	if (state.players.player1.deck.length === 0) {
		return {
			...state,
			won: true,
			winner: state.players.player2,
		};
	}
	if (state.players.player2.deck.length === 0) {
		return {
			...state,
			won: true,
			winner: state.players.player1,
		};
	}
	return state;
}

export function awardCards(state: GameState): GameState {
const winningPlayer = compareCards(state);
const { player1, player2 } = state.players;
const { hand: hand1, deck: deck1 } = player1;
const { hand: hand2, deck: deck2 } = player2;

if (!hand1 || !hand2) {
  throw new Error("No cards left in one or both hands");
}

if (winningPlayer) {
  deck1.unshift(hand1, hand2);
} else {
  deck2.unshift(hand1, hand2);
}

return {
  ...state,
  players: {
    player1: { ...player1, deck: deck1, hand: undefined },
    player2: { ...player2, deck: deck2, hand: undefined },
  },
};
}

export function compareCards(state: GameState): boolean {
	const player1Card = state.players.player1.hand;
	const player2Card = state.players.player2.hand;
	if (player1Card && player2Card) {
		if (player1Card.value > player2Card.value) {
			return true;
		}
		if (player1Card.value < player2Card.value) {
			return false;
		}
		return player1Card.suit > player2Card.suit
			? true
			: false;
	} else {
		throw new Error("No cards left in one or both hands");
	}
}

function randomiseDeck(deck: any[]) {
	return deck.sort(() => Math.random() - 0.5);
}

function initialiseMainDeck(): any[] {
	const deck: Deck = [];
	for (let i = 0; i < 4; i++) {
		for (let j = 2; j <= 13; j++) {
			deck.push({
				suit: i,
				value: j,
			});
		}
	}
	return randomiseDeck(deck);
}

