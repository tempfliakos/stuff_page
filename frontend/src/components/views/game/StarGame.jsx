export function StarGame({game, setSelected}) {

	function handleClick() {
		if (setSelected) {
			setSelected(game);
		}
	}

	return <img src={game.picture} alt={game.title}
	            className="star border-radius-20-px"
	            onClick={() => handleClick()}/>;
}