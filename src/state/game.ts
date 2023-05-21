import Card from "@/types/card";
import Deck from "@/types/deck";
import GameState from "@/types/gameState";
import Player from "@/types/player";

enum LogMessages {
	INITIALISE_GAME = "Game started",
	DRAW_CARDS = "Cards drawn",
	AWARD_CARDS = " won the round",
	GAME_WON = "Game won by ",
	GAME_LOST = "Game lost",
}

export function initaliseGame(): GameState {
	const mainDeck: Card[] = initialiseMainDeck();
	const computerDeck: Card[] = mainDeck.slice(0, 26);
	const playerDeck: Card[] = mainDeck.slice(26, 52);

	return {
		players: {
			computer: {
				hand: undefined,
				deck: computerDeck,
			},
			player: {
				hand: undefined,
				deck: playerDeck,
			},
		},
		won: false,
		winner: undefined,
		messages: [LogMessages.INITIALISE_GAME],
	};
}

export function drawCards(state: GameState): GameState {
	if (!state.players.computer.hand && !state.players.player.hand) {
	const computerCard = state.players.computer.deck.pop();
	const playerCard = state.players.player.deck.pop();
	if (computerCard && playerCard) {
		return {
            ...state,
            players: {
                computer: {
                    ...state.players.computer,
                    hand: computerCard
                },
                player: {
                    ...state.players.player,
                    hand: playerCard
                }
            },
			messages: [LogMessages.DRAW_CARDS, ...state.messages]
        };
	}
	}
	return state;
}

export function checkIfGameWon(state: GameState): GameState {
	if (state.players.computer.deck.length === 0) {
		return {
			...state,
			won: true,
			winner: state.players.player,
			messages: [LogMessages.GAME_WON + 'Player', ...state.messages]
		};
	}
	if (state.players.player.deck.length === 0) {
		return {
			...state,
			won: true,
			winner: state.players.computer,
			messages: [LogMessages.GAME_WON + 'Computer', ...state.messages]
		};
	}
	return state;
}

export function awardCards(state: GameState): GameState {
const winningPlayer = compareCards(state);
const { computer: computer, player: player } = state.players;
const { hand: hand1, deck: deck1 } = computer;
const { hand: hand2, deck: deck2 } = player;

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
    computer: { ...computer, deck: deck1, hand: undefined },
    player: { ...player, deck: deck2, hand: undefined },
  },
  messages: [winningPlayer + LogMessages.AWARD_CARDS, ...state.messages],
};
}

function compareCards(state: GameState): string {
	const computerCard = state.players.computer.hand;
	const playerCard = state.players.player.hand;
	if (computerCard && playerCard) {
		if (computerCard.value > playerCard.value) {
			return 'Computer';
		}
		if (computerCard.value < playerCard.value) {
			return 'Player';
		}
		return computerCard.suit > playerCard.suit
			? 'Computer'
			: 'Player';
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

