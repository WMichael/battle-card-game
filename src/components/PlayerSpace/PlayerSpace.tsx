import Card from '@/types/card';
import GameState from '@/types/gameState';
import Image from 'next/image';

interface PlayerSpaceProps {
	hand?: Card;
};

export default function PlayerSpace({hand}: PlayerSpaceProps ): JSX.Element {
	return (
	<div className="card">
		{hand && (
			<Image src={`cards/${hand.value}-${hand.suit}.png`} width={105} height={130}alt="My Image" />
		)}
	</div>
);
}