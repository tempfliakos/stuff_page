import React from "react";
import {Card, Icon, Image, Label} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {addToMovies} from "../store/movie/actions";
import styles from "./movie.module.css";
import defaultPicture from "../resources/default-movie-back.jpg";
import {getYear} from "../utils/dateUtil";
import {tmdbConverter} from "../utils/TransformMovieUtil";
import Cookies from "universal-cookie/lib";

export function AddMovie({movie, alreadyAdded}) {

    const dispatch = useDispatch();
    const cookie = new Cookies();

    function createMovieObject() {
        return tmdbConverter(cookie.get("id"), movie);
    }

    function addFilm() {
        if (!alreadyAdded) {
            dispatch(addToMovies(createMovieObject()));
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
        <Card onClick={addFilm}>
            {
                alreadyAdded ? <Label corner="right" color="green" size="huge" className={styles.labelAdded}>
                    <Icon name="check square"/>
                </Label> : null
            }
            <Image src={picture()} ui={false} wrapped className={alreadyAdded ? styles.cardAdded : styles.card}/>

            <Card.Content className={styles.textContent}>
                <Card.Header>{movie.title + '(' + getYear(movie.release_date) + ')'}</Card.Header>
            </Card.Content>
        </Card>
    )
}