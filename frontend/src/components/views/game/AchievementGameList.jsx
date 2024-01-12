import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {trackPromise} from "react-promise-tracker";
import {Scrollable} from "../../components/Scrollable";
import {getGames, getStars} from "../../../store/game/selectors";
import {getGameList, getStarlist, initGameList} from "../../../store/game/actions";
import {GameDetail} from "./GameDetail";
import {NewGameComponent} from "./NewGameComponent";
import {StarGame} from "./StarGame";
import {GameComponent} from "./GameComponent";

export function AchievementGameList({consoleConstant}) {

	let defaultFilter = {
		title: '',
		console: consoleConstant.gameType,
	};

	const [filter, setFilter] = useState(defaultFilter);
	const [titleFilter, setTitleFilter] = useState("");
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(-1);
	const [scrollable, setScrollable] = useState(true);
	const [addView, setAddView] = useState(false);
	const [selected, setSelected] = useState(null);

	const games = useSelector(getGames);
	const stars = useSelector(getStars);

	const dispatch = useDispatch();

	useEffect(() => {
		async function getGames() {
			if (page === 1) {
				return trackPromise(dispatch(initGameList(consoleConstant.gameType, page, titleFilter)));
			} else {
				return trackPromise(dispatch(getGameList(consoleConstant.gameType, page, titleFilter)));
			}
		}

		async function getStarredGames() {
			if (page === 1) {
				return trackPromise(dispatch(getStarlist(consoleConstant.gameType)));
			}
		}

		async function setData() {
			await getGames();
			await getStarredGames();
		}

		setData().then(() => {
			if(games.length === count) {
				setScrollable(false);
			} else {
				setCount(games.length);
			}
		});
	}, [page, titleFilter]);

	function handleScroll() {
		if (scrollable && (window.scrollY + 1 + window.innerHeight) >= document.documentElement.offsetHeight) {
			setPage(page + 1);
		}
	}

	function handleTitleSearch(event, data) {
		setPage(1);
		defaultFilter.title = data.value;
		setTitleFilter(defaultFilter.title);
		setFilter(defaultFilter);
	}

	return <div className="grid-area-main">
		<NewGameComponent games={games} consoleConstant={consoleConstant} addView={addView} setAddView={setAddView}/>
		{!addView ?
			selected ? <GameDetail game={selected} closeFunction={() => setSelected(null)}/> : <>
				<div className="d-flex align-items-center overflow-auto hide-scrollbar mx-2 mb-3 pt-1">
					{
						stars ? stars.map((star) =>
							<StarGame key={star.game_id} game={star} setSelected={setSelected}/>
						) : null
					}
				</div>
				<Scrollable scrollFunction={handleScroll}>
					<div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mx-2 pt-1">
						{games ? games.map(game => (
							<GameComponent key={game.game_id} game={game} filter={filter} setSelected={setSelected}/>
						)) : null}
					</div>
				</Scrollable>
			</> : null
		}
	</div>
}