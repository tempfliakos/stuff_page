import {useEffect, useState} from "react";
import {NewMovie} from "../views/movie/NewMovie";
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../../store/movie/selectors";
import {getMovieList} from "../../store/movie/actions";
import {Movie} from "../views/movie/Movie";
import {genres} from "../../store/catalogs/genres";
import Cookies from "universal-cookie/lib";
import {trackPromise} from "react-promise-tracker";
import {MovieDetail} from "../views/movie/MovieDetail";

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
	const [selected, setSelected] = useState(null);

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

	return <div className="grid-area-main">
		{selected ?
			<MovieDetail movie={selected} setMovie={setSelected} movies={movies}/> :
			<>
				<div>
					<NewMovie movies={movies}/>
				</div>
				<div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mx-2 pt-1">
					{movies ? movies.map(movie => (
						<Movie key={movie.id} movie={movie} filter={filter} setSelected={setSelected}/>
					)) : null}
				</div>
			</>
		}
	</div>

}