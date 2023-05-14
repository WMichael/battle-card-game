interface NavigationBarProps {
	handleReset: () => void;
}


export default function NavigationBar({handleReset}: NavigationBarProps) {

	return (
		<div className="navBar">
			<button onClick={handleReset}>Reset</button>
		</div>
	);
}