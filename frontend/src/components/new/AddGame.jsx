import {NewWishGame} from "../modals/NewWishGame";
import {Card} from "../abstracts/Card";
import {gamePicture} from "../../utils/PictureUtil";
import {useContext} from "react";
import {GameContext} from "../../services/Contexts";
import {gameService} from "../../services/game-service";
import {deepCopy} from "../../utils/CopyUtil";
import {sortByTitle} from "../../utils/SortUtil";

export function AddGame({game, alreadyAdded, wish}) {

	const {games, setGames} = useContext(GameContext);

	async function addGame() {
		if (!alreadyAdded) {
			let result = await gameService.insert(game);
			let cloneGames = deepCopy(games);
			cloneGames.push(result);
			cloneGames = cloneGames.sort((a, b) => sortByTitle(a, b));
			setGames(cloneGames);
		}
	}

	return <>
		{
			wish ? <NewWishGame game={game} alreadyAdded={alreadyAdded}/>
				: <Card id={game.id} additionalClassNames={alreadyAdded ? "marked" : ""}
				        imgSrc={gamePicture(game)} title={game.title} onClick={addGame}/>
		}
	</>
}