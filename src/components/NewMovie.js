import React from "react";
import {Card, Icon} from "semantic-ui-react";
import {NewMovieModal} from "./modals/NewMovieModal";
import styles from './movie.module.css';

export function NewMovie({movies}) {
    const trigger = (
        <Card className={styles.newMovie}>
            <Card.Content textAlign="center" className={styles.plus}>
                <Icon name="add" size="massive" className={styles.plusColor}/>
            </Card.Content>
        </Card>
    );

    return (
        <NewMovieModal trigger={trigger} movies={movies}/>
    );

}