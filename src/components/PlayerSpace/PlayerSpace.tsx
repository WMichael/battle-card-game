import Card from '@/types/card';
import Image from 'next/image';
import "./PlayerSpace.css";

interface PlayerSpaceProps {
	computer: boolean;
	hand: Card | undefined;
	handleDrawCards: () => void;
	isGameOver: boolean;
};
// TODO: When card is drawn, show a back card then timeout and then reveal the hand!
export default function PlayerSpace({hand, computer, isGameOver, handleDrawCards}: PlayerSpaceProps ): JSX.Element {
	return (
	<div className="cards">
		<div className='card'>
			{computer || isGameOver ? (
				<Image className='cardImage' src={'cards/back.png'} fill alt="My Image" />
			) : (
				<Image onClick={handleDrawCards} className='cardImage playerCard' src={'cards/back.png'} fill alt="My Image" />
			)}
		</div>

		<div className="card">
			{hand && (
				<Image className='cardImage' src={`cards/${hand.value}-${hand.suit}.png`} fill alt="My Image" />
			)}
		</div>
	</div>
);
}