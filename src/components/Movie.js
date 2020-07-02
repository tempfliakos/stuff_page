import React from "react";
import {Button, Card, Icon, Image, Label} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {removeMovie, setSeen} from "../store/movie/actions";
import {getYear} from "../utils/dateUtil"

import styles from './movie.module.css';
import defaultPicture from "../resources/default-movie-back.jpg";

export function Movie({movie, selectedGenres, titleFilter, releaseFilter}) {

    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(removeMovie(movie));
    }

    function handleSeen() {
        if (!releaseInTheFuture()) {
            movie.seen = !movie.seen;
            dispatch(setSeen(movie));
        }

    }

    function picture() {
        if (movie.backdrop_path) {
            return process.env.REACT_APP_TMDB_IMG_LINK + movie.backdrop_path;
        } else {
            return defaultPicture;
        }
    }

    function isShown() {
        // for (let genre of selectedGenres) {
        //     if (movie.genres.includes(genre) && movie.title.startsWith(titleFilter)) {
        //         if(releaseFilter) {
        //             return releaseInTheFuture();
        //         } else {
        //             return true;
        //         }
        //     }
        // }
        return false;
    }

    function releaseInTheFuture() {
        return Date.parse(movie.release_date) > new Date().getTime();
    }

    return (
        <>
            {
                isShown() ? <Card as="a" className={styles.card}>
                        {
                            movie.seen ? <Label corner="right" color="green">
                                <Icon name="eye"/>
                            </Label> : releaseInTheFuture() ? <Label corner="right" color="yellow">
                                <Icon name="clock"/>
                            </Label> : null
                        }


                        <Image src={picture()} ui={false} wrapped onClick={handleSeen}/>
                        <Card.Content className={styles.textContent} onClick={handleSeen}>
                            <Card.Header>{movie.title + '(' + getYear(movie.release_date) + ')'}</Card.Header>
                        </Card.Content>
                        <Card.Content className={styles.buttonContent}>
                            <Button animated='vertical' color="red" size="tiny" className={styles.button} onClick={handleDelete} fluid disabled={movie.seen}>
                                <Button.Content hidden>Törlés</Button.Content>
                                <Button.Content visible>
                                    <Icon name='trash' />
                                </Button.Content>
                            </Button>
                        </Card.Content>

                    </Card>
                    : null}
        </>

    )


}