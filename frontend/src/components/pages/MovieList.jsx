import {useEffect, useState} from "react";
import {NewMovie} from "../views/movie/NewMovie";
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../../store/movie/selectors";
import {getMovieList} from "../../store/movie/actions";
import {Movie} from "../views/movie/Movie";
import Cookies from "universal-cookie/lib";
import {trackPromise} from "react-promise-tracker";
import {MovieDetail} from "../views/movie/MovieDetail";
import {TextSearch} from "../components/TextSearch";
import {SearchContainer} from "../components/SearchContainer";
import {ToggleSwitch} from "../abstracts/ToggleSwitch";
import {deepCopy} from "../../utils/CopyUtil";

export function MovieList() {

	const [titleFilter, setTitleFilter] = useState("");
	const [ownedFilter, setOwnedFilter] = useState(true);
	const [seenFilter, setSeenFilter] = useState(false);
	const [releaseFilter, setReleaseFilter] = useState(null);
	const [specialFilter, setSpecialFilter] = useState(null);
	const [addView, setAddView] = useState(false);
	const [selected, setSelected] = useState(null);
	const [filter, setFilter] = useState({
		title: titleFilter,
		owned: ownedFilter,
		seen: seenFilter,
		release: releaseFilter,
		special: specialFilter,
	});

	const dispatch = useDispatch();
	const movies = useSelector(getMovies);

	useEffect(() => {
		const cookie = new Cookies();
		trackPromise(
			dispatch(getMovieList(cookie.get("stuffPages")))
		);
	}, [dispatch])

	function handleTitleSearch(searchText) {
		let tempFilter = deepCopy(filter);
		filter.title = searchText;
		setTitleFilter(searchText);
		setFilter(tempFilter);
	}

	function handleOwnToggle(checked) {
		let tempFilter = deepCopy(filter);
		tempFilter.owned = checked;
		setOwnedFilter(checked);
		setFilter(tempFilter);
	}

	function handleSeenToggle(checked) {
		let tempFilter = deepCopy(filter);
		tempFilter.seen = checked;
		setSeenFilter(checked);
		setFilter(tempFilter);
	}

	function handleReleaseToggle(checked) {
		let tempFilter = deepCopy(filter);
		tempFilter.release = checked;
		setReleaseFilter(checked);
		setFilter(tempFilter);
	}

	function handleSpecialToggle(checked) {
		let tempFilter = deepCopy(filter);
		tempFilter.special = checked;
		setSpecialFilter(checked);
		setFilter(tempFilter);
	}

	return <div className="grid-area-main">
		<NewMovie movies={movies} addView={addView} setAddView={setAddView}/>
		{!addView ?
			selected ?
				<MovieDetail movie={selected} setMovie={setSelected} movies={movies}/> :
				<>
					<TextSearch handleSearch={handleTitleSearch}/>
					<SearchContainer>
						<div className="d-grid gap-2">
							<ToggleSwitch value={ownedFilter} toggleFunc={handleOwnToggle} text="Beszerzett"/>
							<ToggleSwitch value={seenFilter} toggleFunc={handleSeenToggle} text="Megnézett"/>
							<ToggleSwitch value={releaseFilter} toggleFunc={handleReleaseToggle}
							              text="Jövőbeni megjelenés"/>
							<ToggleSwitch value={specialFilter} toggleFunc={handleSpecialToggle} text="Speciális"/>
						</div>
					</SearchContainer>

					<div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mx-2 pt-1">

						{movies ? movies.map(movie => (
							<Movie key={movie.id} movie={movie} filter={filter} setSelected={setSelected}/>
						)) : null}
					</div>
				</> : null
		}
	</div>

}