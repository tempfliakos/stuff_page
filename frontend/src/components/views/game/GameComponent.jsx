import {filterGame} from "../../../utils/FilterUtil";
import {Card} from "../../abstracts/Card";

export function GameComponent({game, filter, setSelected}) {

	function getAchievementData() {
		if(game.sum !== 0) {
			return game.earned + "/" + game.sum;
		}
		return "";
	}

	function handleClick() {
		if (setSelected) {
			setSelected(game);
		}
	}

	return filterGame(game, filter) ?
			<Card id={game.id} title={game.title} description={getAchievementData()}
			      additionalClassNames={game.earned === game.sum && game.sum !== 0 ? "bg-dark-green" : ""}
			      imgSrc={game.picture} onClick={handleClick}/>
			: null
}