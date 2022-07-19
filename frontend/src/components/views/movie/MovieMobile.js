import React from "react";
import {Button, Grid, Icon, Image} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {removeMovie, update} from "../../../store/movie/actions";
import {getYear} from "../../../utils/dateUtil"

import defaultPoster from "../../../resources/default-movie-poster.png";
import styles from "../../styles/movie.module.css";
import {filterMovie} from "../../../utils/FilterUtil";

export function MovieMobile({movie, filter}) {

    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(removeMovie(movie));
    }

    function handleSeen() {
        if (!releaseInTheFuture() && movie.owned) {
            movie.seen = !movie.seen;
            dispatch(update(movie));
        }
    }

    function handleOwned() {
        if (!releaseInTheFuture()) {
            movie.owned = !movie.owned;
            movie.seen = false;
            dispatch(update(movie));
        }
    }

    function handleLiza() {
        if (!releaseInTheFuture()) {
            movie.liza = !movie.liza;
            dispatch(update(movie));
        }
    }

    function picture() {
        if (movie.backdrop_path) {
            return process.env.REACT_APP_TMDB_IMG_LINK + movie.backdrop_path;
        } else {
            return defaultPoster;
        }
    }

    function isShown() {
        return filterMovie(movie, filter);
    }

    function releaseInTheFuture() {
        return Date.parse(movie.release_date) > new Date().getTime();
    }

    return (
        <>
            {
                isShown() ?
                    <Grid.Row>
                        <Grid.Column className={styles.movieMobile}>
                            <Image src={picture()} size='small' verticalAlign='middle'/>{' '}
                            <span className={styles.movieMobileText}>
                                {movie.title + '(' + getYear(movie.release_date) + ')'}
                            </span>

                            <span>
                                {releaseInTheFuture() ? <Icon name="clock" color="yellow"/> : null}
                                <Icon name="download" color={movie.owned ? "red" : "grey"} onClick={handleOwned}/>
                                <Icon name="eye" color={movie.seen ? "green" : "grey"} onClick={handleSeen}/>
                                <Icon name="paw" color={movie.liza ? "black" : "grey"} onClick={handleLiza}/>
                            </span>
                            <Button color="red" size="tiny" circular icon="trash" floated="right"
                                    className={styles.movieMobileTorles} onClick={handleDelete} disabled={movie.seen}/>
                        </Grid.Column>
                    </Grid.Row>
                    : null}
        </>

    )


}