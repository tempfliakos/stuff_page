import React, {useState} from "react";
import {Button, Card, Confirm, Icon, Image} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {removeMovie, update} from "../../../store/movie/actions";
import {getYear} from "../../../utils/dateUtil"

import styles from '../../styles/movie.module.css';
import defaultPicture from "../../../resources/default-movie-back.jpg";
import {filterMovie} from "../../../utils/FilterUtil";

export function Movie({movie, filter}) {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    function handleDelete() {
        dispatch(removeMovie(movie));
    }

    function handleSeen() {
        if (!releaseInTheFuture() && movie.owned) {
            movie.seen = !movie.seen;
            dispatch(update(movie));
            setOpen(false);
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
            return defaultPicture;
        }
    }

    function releaseInTheFuture() {
        return Date.parse(movie.release_date) > new Date().getTime();
    }

    function showOrHide() {
        if (movie.owned) {
            if (movie.seen) {
                setOpen(!open);
            } else {
                handleSeen();
            }
        }
    }

    function showOrHideDelete() {
        setOpenDelete(!openDelete);
    }

    return (
        <>
            {
                filterMovie(movie, filter) ?
                    <Card as="a" className={styles.card}>

                        <Image src={picture()} ui={false} wrapped/>
                        <Card.Content className={styles.textContent}>
                            <Card.Header>{movie.title + '(' + getYear(movie.release_date) + ')'}</Card.Header>
                        </Card.Content>

                        <Card.Content textAlign="center" className={styles.iconContent}>
                            {releaseInTheFuture() ? <Icon name="clock" size="large" color="yellow"/> : null}
                            <Icon name="download" size="large" color={movie.owned ? "red": "grey"} onClick={handleOwned}/>
                            <Icon name="eye" size="large" color={movie.seen ? "green": "grey"} onClick={showOrHide}/>
                            <Icon name="paw" size="large" color={movie.liza ? "black": "grey"} onClick={handleLiza}/>
                        </Card.Content>

                        <Card.Content className={styles.buttonContent}>
                            <Button animated='vertical' color="red" size="tiny" className={styles.button}
                                    onClick={showOrHideDelete} fluid disabled={movie.seen}>
                                <Button.Content hidden>Törlés</Button.Content>
                                <Button.Content visible>
                                    <Icon name='trash'/>
                                </Button.Content>
                            </Button>
                            <Confirm
                                content="Biztosan törli?"
                                open={openDelete}
                                basic
                                cancelButton='Mégse'
                                confirmButton="Rendben"
                                onCancel={showOrHideDelete}
                                onConfirm={handleDelete}
                                size="mini"
                            />
                        </Card.Content>
                        <Confirm
                            content="Törli a megtekintést?"
                            open={open}
                            basic
                            cancelButton='Mégse'
                            confirmButton="Rendben"
                            onCancel={showOrHide}
                            onConfirm={handleSeen}
                            size="mini"
                        />
                    </Card>
                    : null}
        </>

    )


}