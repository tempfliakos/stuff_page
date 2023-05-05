import React, {useEffect, useState} from "react";
import {NewMovie} from "../new/NewMovie";
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../../store/movie/selectors";
import {getMovieList} from "../../store/movie/actions";
import {Movie} from "../views/movie/Movie";
import {genres} from "../../store/catalogs/genres";
import styles from '../styles/movie.module.css';
import Cookies from "universal-cookie/lib";
import {MovieMobile} from "../views/movie/MovieMobile";
import {trackPromise} from "react-promise-tracker";

export function MovieList() {

	const dispatch = useDispatch();
	const movies = useSelector(getMovies);
	const [titleFilter, setTitleFilter] = useState("");
	const [genresFilter, setGenresFilter] = useState(initGenres());
	const [seenFilter, setSeenFilter] = useState(null);
	const [ownedFilter, setOwnedFilter] = useState(false);
	const [releaseFilter, setReleaseFilter] = useState(false);
	const [lizaFilter, setLizaFilter] = useState(false);
	const [filterExpand, setFilterExpand] = useState(false);
	let defaultFilter = {
		title: "",
		genre: initGenres(),
		seen: null,
		owned: false,
		release: false,
		liza: null,
	};
	const [filter, setFilter] = useState(defaultFilter);

	useEffect(() => {
		const cookie = new Cookies();
		trackPromise(
			dispatch(getMovieList(cookie.get("stuffPages")))
		);
	}, [dispatch])

	function initGenres() {
		return genres.map(g => g.text);
	}

	function handleTitleSearch(event, data) {
		defaultFilter.title = data.value;
		defaultFilter.genre = genresFilter;
		defaultFilter.seen = seenFilter;
		defaultFilter.owned = ownedFilter;
		defaultFilter.release = releaseFilter;
		defaultFilter.liza = lizaFilter;
		setTitleFilter(defaultFilter.title);
		setFilter(defaultFilter);
	}

	function handleGenreSelect(event, data) {
		defaultFilter.title = titleFilter;
		defaultFilter.genre = data.value.length > 0 ? data.value : initGenres();
		defaultFilter.seen = seenFilter;
		defaultFilter.owned = ownedFilter;
		defaultFilter.release = releaseFilter;
		defaultFilter.liza = lizaFilter;
		setGenresFilter(defaultFilter.genre);
		setFilter(defaultFilter);
	}

	function handleSeenToggle(event, data) {
		defaultFilter.title = titleFilter;
		defaultFilter.genre = genresFilter;
		defaultFilter.seen = data.checked;
		defaultFilter.owned = ownedFilter;
		defaultFilter.release = releaseFilter;
		defaultFilter.liza = lizaFilter;
		setSeenFilter(defaultFilter.seen);
		setFilter(defaultFilter);
	}

	function handleOwnToggle(event, data) {
		defaultFilter.title = titleFilter;
		defaultFilter.genre = genresFilter;
		defaultFilter.seen = seenFilter;
		defaultFilter.owned = data.checked;
		defaultFilter.release = releaseFilter;
		defaultFilter.liza = lizaFilter;
		setOwnedFilter(defaultFilter.owned);
		setFilter(defaultFilter);
	}

	function handleReleaseToggle(event, data) {
		defaultFilter.title = titleFilter;
		defaultFilter.genre = genresFilter;
		defaultFilter.seen = seenFilter;
		defaultFilter.owned = ownedFilter;
		defaultFilter.release = data.checked;
		defaultFilter.liza = lizaFilter;
		setReleaseFilter(defaultFilter.release);
		setFilter(defaultFilter);
	}

	function handleLizaToggle(event, data) {
		defaultFilter.title = titleFilter;
		defaultFilter.genre = genresFilter;
		defaultFilter.seen = seenFilter;
		defaultFilter.owned = ownedFilter;
		defaultFilter.release = releaseFilter;
		defaultFilter.liza = data.checked;
		setLizaFilter(defaultFilter.liza);
		setFilter(defaultFilter);
	}

	function handleFilterExpand() {
		setFilterExpand(!filterExpand);
	}

	return <div class="grid-area-main">
		<div>
			<NewMovie movies={movies}/>
		</div>
		<div class="d-flex align-items-center justify-content-center flex-wrap gap-3 mx-2 pt-1">
			{movies ? movies.map(movie => (
				<Movie key={movie.id} movie={movie} filter={filter}/>
			)) : null}
		</div>
	</div>
	// <Grid columns="equal" className="gridFull">
	// 	<Grid.Row>
	// 		<Grid.Column>
	// 			<Input placeholder='Film címe...' fluid onChange={handleTitleSearch}/>
	// 		</Grid.Column>
	// 				<Grid.Column>
	// 			<Dropdown placeholder='Műfaj' fluid multiple search selection options={genres} clearable basic
	// 			          onChange={handleGenreSelect}/>
	// 		</Grid.Column>
	// 				<span className="flexCenterPointer">
	//             <Icon name="sliders horizontal" size="big" onClick={handleFilterExpand}/>
	//         </span>
	// 			</Grid.Row>
	// 	{filterExpand ?
	// 		<>
	// 			<Grid.Row>
	// 				<Grid.Column>
	// 					<Checkbox toggle onChange={handleSeenToggle} label={{children: "Megnézett filmek kivétele"}}
	// 					          className={styles.toggleButton}/>
	// 				</Grid.Column>
	// 			</Grid.Row>
	// 			<Grid.Row>
	// 				<Grid.Column>
	// 					<Checkbox toggle onChange={handleOwnToggle} label={{children: "Beszerzendő filmek"}}
	// 					          className={styles.toggleButton} defaultChecked={false}/>
	// 				</Grid.Column>
	// 			</Grid.Row>
	// 			<Grid.Row>
	// 				<Grid.Column>
	// 					<Checkbox toggle onChange={handleReleaseToggle} label={{children: "Jövőbeni filmek"}}
	// 					          className={styles.toggleButton} fitted/>
	// 				</Grid.Column>
	// 			</Grid.Row>
	// 			<Grid.Row>
	// 				<Grid.Column>
	// 					<Checkbox toggle onChange={handleLizaToggle} label={{children: "Liza filmje"}}
	// 					          className={styles.toggleButton} fitted/>
	// 				</Grid.Column>
	// 			</Grid.Row>
	// 		</>
	// 		: null}
	// 	<Grid.Row>
	// 		<Grid.Column>
	// 			<NewMovie movies={movies}/>
	// 		</Grid.Column>
	// 	</Grid.Row>
	// 			<Grid.Row>
	// 		<Responsive minWidth={Responsive.onlyComputer.minWidth}>
	// 			<Card.Group relaxed="very" columns="equal" padded="vertically" centered
	// 			            itemsPerRow={window.screen.width > 800 ? 4 : 1} className="gridFull">
	// 				{movies ? movies.map(movie => (
	// 					<Movie key={movie.id} movie={movie} filter={filter}/>
	// 				)) : null}
	// </Card.Group>
	// </Responsive>
	// 		<Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
	// 	<Grid columns="equal">
	// 		{movies ? movies.map(movie => (
	// 			<MovieMobile key={movie.id} movie={movie} filter={filter}/>
	// 		)) : null}
	// 	</Grid>
	// </Responsive>
	// </Grid.Row>
	// </Grid>

}