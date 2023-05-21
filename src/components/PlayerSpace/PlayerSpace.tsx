import Card from '@/types/card';
import Image from 'next/image';
import "./PlayerSpace.css";

interface PlayerSpaceProps {
	hand: Card | undefined;
	handleDrawCards: () => void;
};

export default function PlayerSpace({hand, handleDrawCards}: PlayerSpaceProps ): JSX.Element {
	return (
	<div className="cards">
		<div className='card'>
			<Image onClick={handleDrawCards} className='cardImage' src={'cards/back.png'} fill alt="My Image" />
		</div>
		<div className="card">
			{hand && (
				<Image className='cardImage' src={`cards/${hand.value}-${hand.suit}.png`} fill alt="My Image" />
			)}
		</div>
	</div>
);
}