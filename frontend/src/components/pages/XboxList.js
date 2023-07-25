import React, {useCallback, useEffect, useState} from "react";
import {NewXboxGame} from "../new/NewXboxGame";
import {useDispatch, useSelector} from "react-redux";
import {getGameList, getStarlist, initGameList} from "../../store/game/actions";
import {XboxGame} from "../views/xbox/XboxGame";
import {getGames, getStars} from "../../store/game/selectors";
import styles from "../styles/game.module.css";
import {XboxGameMobile} from "../views/xbox/XboxGameMobile";
import {Scrollable} from "../components/Scrollable";
import $ from "jquery";
import {trackPromise} from "react-promise-tracker";
import {StarGame} from "../views/StarGame";
import {NewMovie} from "../new/NewMovie";
import {Movie} from "../views/movie/Movie";

export function XboxList() {

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
    }, [dispatch, createList, getStarred, setPage, page]);

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
    const [doneFilter, setDoneFilter] = useState(null);
    let defaultFilter = {
        title: '',
        done: null,
        console: 'Xbox',
    };
    const [filter, setFilter] = useState(defaultFilter);

    function createList() {
        return initGameList('Xbox', page, titleFilter);
    }

    function updateList() {
        return getGameList('Xbox', page, titleFilter);
    }

    function getStarred() {
        return getStarlist('Xbox');
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

    return <div className="grid-area-main">
        <div>
			<NewXboxGame games={games}/>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mx-2 pt-1">
            {games ? games.map(game => (
                <XboxGame key={game.game_id} game={game} filter={filter}/>
            )) : null}
        </div>
    </div>
    // <Grid columns="equal" className="gridFull">
    // 	<Grid.Row>
    // 		<Grid.Column>
    // 			<Input placeholder='Játék címe...' fluid onChange={handleTitleSearch}/>
    // 		</Grid.Column>
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
    // 			<NewXboxGame games={games}/>
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
    // 						<XboxGame key={game.game_id} game={game} filter={filter}/>
    // 					)) : null}
    // 				</Card.Group>
    // 			</Responsive>
    //
    // 			<Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
    // 				<Grid columns="equal">
    // 					{games ? games.map(game => (
    // 						<XboxGameMobile key={game.game_id} game={game} filter={filter}/>
    // 					)) : null}
    // 				</Grid>
    // 			</Responsive>
    // 		</Scrollable>
    // 	</Grid.Row>
    // </Grid>
}