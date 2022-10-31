import React, {useCallback, useEffect, useState} from "react";
import {Card, Grid, Input, Responsive} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {getGames} from "../../store/game/selectors";
import {getGameList, initGameList} from "../../store/game/actions";
import {SwitchGame} from "../views/switch/SwitchGame";
import {SwitchGameMobile} from "../views/switch/SwitchGameMobile";
import {NewSwitchGame} from "../new/NewSwitchGame";
import $ from "jquery";
import {Scrollable} from "../components/Scrollable";
import {trackPromise} from "react-promise-tracker";

export function SwitchList() {

	const games = useSelector(getGames);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	const sendCreate = useCallback(async () => {
		const pageNumber = page + 1;
		setPage(pageNumber);
		trackPromise(dispatch(createList()));
	}, [dispatch, updateList, setPage, page]);

	const sendUpdate = useCallback(async () => {
		const pageNumber = page + 1;
		setPage(pageNumber);
		trackPromise(dispatch(updateList()));
	}, [dispatch, updateList, setPage, page]);

	useEffect(() => {
		sendCreate();
	}, [dispatch]);

	function handleScroll(event) {
		if (($(window).scrollTop() + 1) + $(window).height() >= $(document).height()) {
			sendUpdate();
		}
	}

	const [titleFilter, setTitleFilter] = useState("");

	let defaultFilter = {
		title: "",
		done: null,
		console: 'Switch',
	};
	const [filter, setFilter] = useState(defaultFilter);

	function createList() {
		return initGameList('Switch', page, titleFilter);
	}

	function updateList() {
		return getGameList('Switch', page, titleFilter);
	}

	function handleTitleSearch(event, data) {
		defaultFilter.title = data.value;
		setTitleFilter(defaultFilter.title);
		setFilter(defaultFilter);
		sendUpdate();
	}

	return (
		<Grid columns="equal" className="gridFull">
			<Grid.Row>
				<Grid.Column>
					<Input placeholder='Játék címe...' fluid onChange={handleTitleSearch}/>
				</Grid.Column>

			</Grid.Row>

			<Grid.Row>
				<Grid.Column>
					<NewSwitchGame games={games}/>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row>
				<Scrollable func={handleScroll}>
					<Responsive minWidth={Responsive.onlyComputer.minWidth}>
						<Card.Group relaxed="very" columns="equal" padded="vertically" centered
						            itemsPerRow={window.screen.width > 800 ? 4 : 1} className="gridFull">
							{games ? games.map(game => (
								<SwitchGame key={game.game_id} game={game} filter={filter}/>
							)) : null}
						</Card.Group>
					</Responsive>

					<Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
						<Grid columns="equal">
							{games ? games.map(game => (
								<SwitchGameMobile key={game.game_id} game={game} filter={filter}/>
							)) : null}
						</Grid>
					</Responsive>
				</Scrollable>
			</Grid.Row>
		</Grid>
	)
}