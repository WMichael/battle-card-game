import Card from "@/types/card";
import Deck from "@/types/deck";
import GameState from "@/types/gameState";
import Player from "@/types/player";

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
	};
}

export function drawCards(state: GameState): GameState {
	const playerCard1 = state.players.player1.deck.pop();
	const playerCard2 = state.players.player2.deck.pop();
	if (playerCard1 && playerCard2) {
		state.players.player1.hand = playerCard1;
		state.players.player2.hand = playerCard2;
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
	const winningPlayer: Player = compareCards(state);
	const playerCard1 = state.players.player1.hand
	const playerCard2 = state.players.player2.hand
  state.players.player1.hand = null;
  state.players.player2.hand = null;
	if (playerCard1 && playerCard2) {
		winningPlayer.deck.unshift(playerCard1);
		winningPlayer.deck.unshift(playerCard2);
	} else {
		throw new Error("No cards left in one or both hands");
	}
	return state;
}

export function compareCards(state: GameState): Player {
	const player1Card = state.players.player1.hand;
	const player2Card = state.players.player2.hand;
	if (player1Card && player2Card) {
		if (player1Card.value > player2Card.value) {
			return state.players.player1;
		}
		if (player1Card.value < player2Card.value) {
			return state.players.player2;
		}
		return player1Card.suit > player2Card.suit
			? state.players.player1
			: state.players.player2;
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

