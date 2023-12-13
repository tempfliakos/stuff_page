import {removeMovie, update} from "../../../store/movie/actions";
import {useDispatch} from "react-redux";
import {MovieSimilar} from "./MovieSimilar";
import {Button} from "../../abstracts/Button";
import {useState} from "react";
import {DetailContainer} from "../../components/DetailContainer";

export function MovieDetail({movie, setMovie, movies}) {

	const dispatch = useDispatch();

	const [similars, setSimilars] = useState(getSimilarMovies());

	function getSimilarMovies(movieParam = movie) {
		if (movieParam) {
			let result = [];
			for (let tempMovie of movies) {
				if (tempMovie.id !== movieParam.id && hasSameGenre(movieParam, tempMovie)) {
					result.push(tempMovie);
				}
			}
			return result;
		}
	}

	function hasSameGenre(movie1, movie2) {
		for (let genre of movie1.genres) {
			if (movie2.genres.includes(genre)) {
				return true;
			}
		}
	}

	function handleOwned() {
		if (!releaseInTheFuture()) {
			movie.owned = !movie.owned;
			movie.seen = false;
			dispatch(update(movie));
		}
	}

	function handleSeen() {
		if (!releaseInTheFuture() && movie.owned) {
			movie.seen = !movie.seen;
			dispatch(update(movie));
		}
	}

	function handleLiza() {
		if (!releaseInTheFuture()) {
			movie.liza = !movie.liza;
			dispatch(update(movie));
		}
	}

	function handleDelete() {
		dispatch(removeMovie(movie));
		setMovie(null);
	}

	function releaseInTheFuture() {
		return Date.parse(movie.release_date) > new Date().getTime();
	}

	function handleClickSimilar(similar) {
		setMovie(similar);
		setSimilars(getSimilarMovies(similar));
	}

	function getSimilarBlock() {
		return similars ? similars.map(similar =>
			<MovieSimilar key={similar.id} movie={similar} onClick={() => handleClickSimilar(similar)}/>
		) : null
	}

	return <DetailContainer title={movie.title} poster={movie.poster_path}
	                        posterSubText={movie.release_date.replaceAll('-', '.')}
	                        genres={movie.genres} extraBlock={getSimilarBlock()} closeFunction={() => setMovie(null)}>
		<Button additionalClassNames={"w-25 " + (movie.owned ? "bg-dark-grey c-white" : "")}
		        onClick={handleOwned}
		        icon="icon-save" text="Beszerzett"/>

		{movie.owned ? <Button additionalClassNames={"w-25 " + (movie.seen ? "bg-light-green" : "")}
		                       onClick={handleSeen}
		                       icon="icon-eye"
		                       text="Megnézett"/> : null
		}

		<Button additionalClassNames={"w-25 " + (movie.liza ? "bg-dark-green" : "")}
		        onClick={handleLiza}
		        icon="icon-star"
		        text="Speciális"/>

		<Button additionalClassNames={"w-25 bg-dark-green"}
		        onClick={handleDelete}
		        hasApprove={true}
		        icon="icon-trash"
		        text="Törlés"/>
	</DetailContainer>
}