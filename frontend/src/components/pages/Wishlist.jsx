import {useEffect, useState} from "react";
import {WishGame} from "../views/wishlist/WishGame";
import {trackPromise} from "react-promise-tracker";
import {Card} from "../abstracts/Card";
import {PLAYSTATION, XBOX} from "../constants/ConsoleConstants";
import {NewGameComponent} from "../views/game/NewGameComponent";
import {wishlistService} from "../../services/wishlist-service";
import {sortByTitle} from "../../utils/SortUtil";
import {deepCopy} from "../../utils/CopyUtil";

export function Wishlist() {

	const [machine, setMachine] = useState(XBOX.gameType);
	const [addView, setAddView] = useState(false);

	const [games, setGames] = useState([]);

	useEffect(() => {
		async function getGames() {
			return await wishlistService.find();
		}

		async function setData() {
			let tempGames = await getGames();
			tempGames = tempGames.sort((a, b) => sortByTitle(a, b));
			setGames(tempGames);
		}

		trackPromise(setData());
	}, []);

	function getList(machineParam = machine) {
		return games.filter(g => g.console === machineParam && g.wish === true);
	}

	async function handleDeleteGame(id) {
		let cloneGames = deepCopy(games);
		cloneGames = cloneGames.filter(g => g.id !== id);
		setGames(cloneGames);
		return wishlistService.remove(id);
	}

	function getGameList() {
		let result = [];
		for (let game of getList()) {
			result.push(<WishGame key={game.game_id} game={game} deleteFunc={handleDeleteGame}/>);
		}
		return result;
	}

	return <div className="grid-area-main">
		<NewGameComponent games={games} consoleConstant={machine} addView={addView} setAddView={setAddView}/>
		{!addView ? <div className="d-flex flex-column gap-3 mt-3">
			<div className="d-flex justify-content-center gap-3">
				<Card title={XBOX.gameType}
				      description={getList(XBOX.gameType).length + " db"}
				      onClick={() => setMachine(XBOX.gameType)}
				      additionalClassNames={machine === XBOX.gameType ? "active" : ""}/>

				<Card title={PLAYSTATION.gameType}
				      description={getList(PLAYSTATION.gameType).length + " db"}
				      onClick={() => setMachine(PLAYSTATION.gameType)}
				      additionalClassNames={machine === PLAYSTATION.gameType ? "active" : ""}/>
			</div>
			{machine ? <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mx-2 pt-1">
				{getGameList()}
			</div> : null
			}

		</div> : null}
	</div>
}