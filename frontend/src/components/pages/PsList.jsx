import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGames, getStars} from "../../store/game/selectors";
import {getGameList, getStarlist, initGameList} from "../../store/game/actions";
import $ from "jquery";
import {trackPromise} from "react-promise-tracker";

export function PsList() {

	const games = useSelector(getGames);
	const stars = useSelector(getStars);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	const sendCreate = useCallback(async () => {
		const pageNumber = page + 1;
		setPage(pageNumber);
		trackPromise(dispatch(createList())).then(() => {
			trackPromise(dispatch(getStarred()));
		});
	}, [dispatch, createList, getStarred, setPage, page])

	const sendUpdate = useCallback(async () => {
		const pageNumber = page + 1;
		setPage(pageNumber);
		trackPromise(dispatch(updateList()));
	}, [dispatch, updateList, setPage, page])

	useEffect(() => {
		sendCreate();
	}, [dispatch]);

	function handleScroll(event) {
		if (($(window).scrollTop() + 1) + $(window).height() >= $(document).height()) {
			sendUpdate();
		}
	}

	let defaultFilter = {
		title: "",
		done: null,
	};
	const [filter, setFilter] = useState(defaultFilter);
	const [titleFilter, setTitleFilter] = useState("");
	const [doneFilter, setDoneFilter] = useState(null);

	function createList() {
		return initGameList('Playstation', page, titleFilter);
	}

	function updateList() {
		return getGameList('Playstation', page, titleFilter);
	}

	function getStarred() {
		return getStarlist('Playstation');
	}

	function handleTitleSearch(event, data) {
		setPage(1);
		defaultFilter.title = data.value;
		defaultFilter.done = doneFilter;
		setTitleFilter(defaultFilter.title);
		setFilter(defaultFilter);
		sendUpdate();
	}

	function handleDoneToggle(event, data) {
		defaultFilter.title = titleFilter;
		defaultFilter.done = data.checked;
		setDoneFilter(defaultFilter.done);
		setFilter(defaultFilter);
	}

	return (
		// <Grid columns="equal" className="gridFull">
		// 	<Grid.Row>
		// 		<Grid.Column>
		// 			<Input placeholder='Játék címe...' fluid onChange={handleTitleSearch}/>
		// 		</Grid.Column>
		//
		// 	</Grid.Row>
		//
		// 	<Grid.Row>
		// 		<Grid.Column>
		// 			<Checkbox toggle onChange={handleDoneToggle}
		// 			          label={{children: doneFilter ? "Kész játékok megjelenítve" : "Szűrés a kész játékokra"}}
		// 			          className={styles.toggleButton}/>
		// 		</Grid.Column>
		// 	</Grid.Row>
		//
		// 	<Grid.Row>
		// 		<Grid.Column>
		// 			<NewPsGame games={games}/>
		// 		</Grid.Column>
		// 	</Grid.Row>
		//
		// 	<Grid.Row>
		// 		<Grid.Column className={styles.overflow}>
		// 			{stars ? stars.map(game => (
		// 				<StarGame key={game.game_id} game={game}/>
		// 			)) : null}
		// 		</Grid.Column>
		// 	</Grid.Row>
		//
		// 	<Grid.Row>
		// 		<Scrollable func={handleScroll}>
		// 			<Responsive minWidth={Responsive.onlyComputer.minWidth}>
		// 				<Card.Group relaxed="very" columns="equal" padded="vertically" centered
		// 				            itemsPerRow={window.screen.width > 800 ? 4 : 1} className="gridFull">
		// 					{games ? games.map(game => (
		// 						<PsGame key={game.game_id} game={game} filter={filter}/>
		// 					)) : null}
		// 				</Card.Group>
		// 			</Responsive>
		//
		// 			<Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
		// 				<Grid columns="equal">
		// 					{games ? games.map(game => (
		// 						<PsGameMobile key={game.game_id} game={game} filter={filter}/>
		// 					)) : null}
		// 				</Grid>
		// 			</Responsive>
		// 		</Scrollable>
		// 	</Grid.Row>
		// </Grid>
		<div>PsList</div>
	)
}