import {useDispatch} from "react-redux";
import {addToMovies, updateMovieObject} from "../../store/movie/actions";
import styles from "../styles/movie.module.css";
import defaultPicture from "../../resources/default-movie-back.jpg";
import {getYear} from "../../utils/DateUtil";
import {tmdbConverter} from "../../utils/TransformMovieUtil";
import {Movie} from "../views/movie/Movie";
import {Card} from "../abstracts/Card";

export function AddMovie({movie, movieAttributes}) {

	const dispatch = useDispatch();

	function createMovieObject() {
		return tmdbConverter(movie);
	}

	function addFilm() {
		if (!movieAttributes.alreadyAdded) {
			dispatch(addToMovies(createMovieObject()));
		} else {
			dispatch(updateMovieObject(createMovieObject()));
		}
	}

	function picture() {
		if (movie.backdrop_path) {
			return process.env.REACT_APP_TMDB_IMG_LINK + movie.backdrop_path;
		} else {
			return defaultPicture;
		}
	}

	return <div onClick={addFilm}>
			<Card id={movie.id} classNames={movieAttributes.alreadyAdded ? "marked" : ""}
			      imgSrc={picture()} title={movie.title + '(' + getYear(movie.release_date) + ')'}/>
		</div>
}