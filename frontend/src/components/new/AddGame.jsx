import {useDispatch} from "react-redux";
import {addToGames} from "../../store/game/actions";
import defaultGamePicture from "../../resources/gamer_default_icon.svg"
import {WishModal} from "../modals/WishModal";
import {Card} from "../abstracts/Card";

export function AddGame({game, alreadyAdded, wish}) {

	const dispatch = useDispatch();

	function picture() {
		if (game.picture) {
			return game.picture;
		}
		return defaultGamePicture;
	}

	function addGame() {
		if(!wish) {
			if (!alreadyAdded) {
				dispatch(addToGames(game));
			}
		}
	}

	return <>
		{
			wish ? <WishModal game={game} alreadyAdded={alreadyAdded}/>
				: <div onClick={addGame}>
					<Card id={game.id} additionalClassNames={alreadyAdded ? "marked" : ""}
					      imgSrc={picture()} title={game.title}/>
				</div>
		}
	</>
}