import {gamePicture} from "../../../utils/PictureUtil";

export function StarGame({game, setSelected}) {

	function handleClick() {
		if (setSelected) {
			setSelected(game);
		}
	}

	return <img src={gamePicture(game)} alt={game.title}
	            className="star border-radius-20-px"
	            onClick={() => handleClick()}/>;
}