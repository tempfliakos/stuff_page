import React from "react";
import {Grid, Icon, Image, Label} from "semantic-ui-react";
import styles from "../styles/movie.module.css";
import {getYear} from "../../utils/dateUtil";
import {useDispatch} from "react-redux";
import {tmdbConverter} from "../../utils/TransformMovieUtil";
import {addToMovies, removeMovie} from "../../store/movie/actions";
import defaultPicture from "../../resources/default-movie-back.jpg";

export function AddMovieMobile({movie, movieAttributes}) {

    const dispatch = useDispatch();

    function createMovieObject() {
        return tmdbConverter(movie);
    }

    function addFilm() {
        if (!movieAttributes.alreadyAdded) {
            dispatch(addToMovies(createMovieObject()));
        } else {
            if(!movieAttributes.seen) {
                dispatch(removeMovie(createMovieObject()));
            }
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
        <Grid.Row onClick={addFilm}>
            <Grid.Column className={styles.movieMobile}>
                {
                    movieAttributes.alreadyAdded ? <Label corner="left" color="green" className={styles.labelAdded}>
                        <Icon name="check square"/>
                    </Label> : null
                }
                <Image src={picture()} size='small' verticalAlign='middle'
                       className={movieAttributes.alreadyAdded ? styles.cardAdded : styles.cardMobile}/>{' '}
                <span className={styles.movieMobileText}>
                                {movie.title + '(' + getYear(movie.release_date) + ')'}

                </span>
                <div></div>
            </Grid.Column>
        </Grid.Row>
    )
}