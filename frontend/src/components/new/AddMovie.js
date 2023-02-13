import React from "react";
import {useDispatch} from "react-redux";
import {addToMovies, updateMovieObject} from "../../store/movie/actions";
import styles from "../styles/movie.module.css";
import defaultPicture from "../../resources/default-movie-back.jpg";
import {getYear} from "../../utils/dateUtil";
import {tmdbConverter} from "../../utils/TransformMovieUtil";

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

    return (
        // <Card onClick={addFilm}>
        //     {
        //         movieAttributes.alreadyAdded ? <Label corner="right" color="green" size="huge" className={styles.labelAdded}>
        //             <Icon name="check square"/>
        //         </Label> : null
        //     }
        //     <Image src={picture()} ui={false} wrapped className={movieAttributes.alreadyAdded ? styles.cardAdded : styles.picture}/>
        //
        //     <Card.Content className={styles.textContent}>
        //         <Card.Header>{movie.title + '(' + getYear(movie.release_date) + ')'}</Card.Header>
        //     </Card.Content>
        // </Card>
        <div>AddMovie</div>
    )
}