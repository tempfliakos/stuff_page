import {useEffect, useState} from "react";
import {trackPromise} from "react-promise-tracker";
import {Scrollable} from "../../components/Scrollable";
import {GameDetail} from "./GameDetail";
import {NewGameComponent} from "./NewGameComponent";
import {StarGame} from "./StarGame";
import {GameComponent} from "./GameComponent";
import {gameService} from "../../../services/game-service";
import {starService} from "../../../services/star-service";
import {deepCopy} from "../../../utils/CopyUtil";
import {TextSearch} from "../../components/TextSearch";

export function AchievementGameList({platformConstant}) {

	let defaultFilter = {
		title: '',
		console: platformConstant.gameType,
	};

	const [filter, setFilter] = useState(defaultFilter);
	const [titleFilter, setTitleFilter] = useState("");
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(-1);
	const [scrollable, setScrollable] = useState(true);
	const [addView, setAddView] = useState(false);
	const [selected, setSelected] = useState(null);
	const [games, setGames] = useState([]);
	const [stars, setStars] = useState([]);

	useEffect(() => {

		async function getGames() {
			return await gameService.find({console: platformConstant.gameType, page, titleFilter})
		}

		async function getStarredGames() {
			return await starService.find({console: platformConstant.gameType})
		}

		async function setData() {
			let gamesCopy = [];
			let newGames = await getGames();

			if (page === 1) {
				gamesCopy = newGames.games;
				let starGames = await getStarredGames();
				setStars(starGames);
			} else {
				gamesCopy = deepCopy(games);
				gamesCopy = [...gamesCopy, ...newGames.games];
			}

			setGames(gamesCopy);

			if (count < 0) {
				setCount(newGames.count);
			}
			if (gamesCopy.length === count) {
				setScrollable(false);
			}
		}

		trackPromise(setData());
	}, [titleFilter, page]);

	function handleScroll() {
		if (scrollable && (window.scrollY + 1 + window.innerHeight) >= document.documentElement.offsetHeight) {
			setPage(page + 1);
		}
	}

	function handleTitleSearch(searchText) {
		setPage(1);
		defaultFilter.title = searchText;
		setTitleFilter(defaultFilter.title);
		setFilter(defaultFilter);
	}

	return <div>
		<NewGameComponent games={games} platformConstant={platformConstant} addView={addView} setAddView={setAddView}/>
		{!addView ?
			selected ? <GameDetail game={selected} closeFunction={() => setSelected(null)}/> : <>
				<div className="d-flex align-items-center overflow-auto mx-5 mb-3 pt-1">
					{
						stars ? stars.map((star) =>
							<StarGame key={star.game_id} game={star} setSelected={setSelected}/>
						) : null
					}
				</div>
				<Scrollable scrollFunction={handleScroll}>
					<TextSearch handleSearch={handleTitleSearch}/>
					<div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mx-2 pt-1">
						{games ? games.map(game => (
							<GameComponent key={game.game_id} game={game} filter={filter} onClick={setSelected}/>
						)) : null}
					</div>
				</Scrollable>
			</> : null
		}
	</div>
}