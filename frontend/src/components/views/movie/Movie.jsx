import defaultPicture from "../../../resources/default-movie-back.jpg";
import {filterMovie} from "../../../utils/FilterUtil";
import {Card} from "../../abstracts/Card";

export function Movie({movie, filter, setSelected}) {
	function picture() {
		if (movie.backdrop_path) {
			return process.env.REACT_APP_TMDB_IMG_LINK + movie.backdrop_path;
		} else {
			return defaultPicture;
		}
	}

	function getReleaseDate() {
		return new Date(Date.parse(movie.release_date)).getFullYear();
	}


	function handleOnClick() {
		if (setSelected) {
			setSelected(movie);
		}
	}

	return filterMovie(movie, filter) ?
		<Card id={movie.id} imgSrc={picture()}
		      title={movie.title} description={getReleaseDate()}
		      onClick={handleOnClick}/>
		: null


}