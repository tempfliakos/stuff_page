import {Scrollable} from "../components/Scrollable";
import {SWITCH} from "../constants/PlatformConstants";
import {NewGameComponent} from "../views/game/NewGameComponent";
import {GameComponent} from "../views/game/GameComponent";
import {useEffect, useState} from "react";
import {trackPromise} from "react-promise-tracker";
import {gameService} from "../../services/game-service";
import {deepCopy} from "../../utils/CopyUtil";
import {GameContext} from "../../services/Contexts";

export function SwitchList() {

	let defaultFilter = {
		title: '',
		console: SWITCH.gameType,
	};

	const [filter, setFilter] = useState(defaultFilter);
	const [titleFilter, setTitleFilter] = useState("");
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(-1);
	const [scrollable, setScrollable] = useState(true);
	const [addView, setAddView] = useState(false);

	const [games, setGames] = useState([]);

	useEffect(() => {
		async function getGames() {
			return await gameService.find({console: SWITCH.gameType, page, titleFilter})
		}

		async function setData() {
			let gamesCopy = deepCopy(games);
			let newGames = await getGames();
			gamesCopy = [...gamesCopy, ...newGames.games];
			setGames(gamesCopy);
			if (count < 0) {
				setCount(newGames.count);
			}
			if (gamesCopy.length === count) {
				setScrollable(false);
			}
		}

		trackPromise(setData());
	}, [page, titleFilter]);

	function handleScroll() {
		if (scrollable && (window.scrollY + 1 + window.innerHeight) >= document.documentElement.offsetHeight) {
			setPage(page + 1);
		}
	}

	return <GameContext.Provider value={{games, setGames}}>
		<div>
			<NewGameComponent games={games} platformConstant={SWITCH} addView={addView} setAddView={setAddView}/>
			{!addView ?
				<Scrollable scrollFunction={handleScroll}>
					<div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mx-2 pt-1">
						{games ? games.map(game => (
							<GameComponent key={game.game_id} game={game} filter={filter}/>
						)) : null}
					</div>
				</Scrollable> : null
			}
		</div>
	</GameContext.Provider>
}