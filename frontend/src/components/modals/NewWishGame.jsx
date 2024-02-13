import {useContext, useState} from "react";
import {Button} from "../abstracts/Button";
import {Modal} from "../abstracts/Modal";
import {GameComponent} from "../views/game/GameComponent";
import {PLAYSTATION, XBOX} from "../constants/PlatformConstants";
import {gameService} from "../../services/game-service";
import {deepCopy} from "../../utils/CopyUtil";
import {sortByTitle} from "../../utils/SortUtil";
import {GameContext} from "../../services/Contexts";

export function NewWishGame({game, alreadyAdded}) {

	const [open, setOpen] = useState(false);
	const {games, setGames} = useContext(GameContext);

	const defaultFilter = {
		title: ''
	}

	function handleOpenModal() {
		if(!alreadyAdded) {
			setOpen(true);
			document.body.style.overflowY = "hidden";
		}
	}

	function handleCloseModal() {
		setOpen(false);
		document.body.style.overflowY = "auto";
	}

	async function handleAdd(platform) {
		if (!alreadyAdded) {
			game.console = platform;
			let result = await gameService.insert(game);
			let cloneGames = deepCopy(games);
			cloneGames.push(result);
			cloneGames = cloneGames.sort((a, b) => sortByTitle(a, b));
			setGames(cloneGames);
		}
		handleCloseModal();
	}

	return <>
		<Modal title="Játék hozzáadása" open={open} setOpen={setOpen}>
			<div className="d-grid justify-content-center">
				<span className="c-white font-size-18">{game.title}-t melyik platformhoz adod?</span>
				<div className="d-flex gap-5 mt-3">
					<Button text="Xbox" onClick={() => handleAdd(XBOX.gameType)}/>
					<Button text="Playstation" onClick={() => handleAdd(PLAYSTATION.gameType)}/>
				</div>
			</div>
		</Modal>
		<GameComponent game={game} filter={defaultFilter} onClick={() => handleOpenModal()}
		               additionalClassNames={alreadyAdded ? "marked" : ""}/>
	</>
}