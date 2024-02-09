import {filterGame} from "../../../utils/FilterUtil";
import {Card} from "../../abstracts/Card";
import {gamePicture} from "../../../utils/PictureUtil";

export function GameComponent({game, filter, onClick, additionalClassNames = ""}) {

	function getAchievementData() {
		if(game.sum && game.sum !== 0) {
			return game.earned + "/" + game.sum;
		}
		return "";
	}

	function handleClick() {
		if (onClick) {
			onClick(game);
		}
	}

	function getAdditionalClasses() {
		let result = additionalClassNames;
		if(game.sum && game.earned) {
			if(game.earned === game.sum && game.sum !== 0) {
				result += " bg-dark-green";
			}
		}
		return result;
	}

	return filterGame(game, filter) ?
			<Card id={game.id} title={game.title} description={getAchievementData()}
			      additionalClassNames={getAdditionalClasses()}
			      imgSrc={gamePicture(game)} onClick={handleClick}/>
			: null
}