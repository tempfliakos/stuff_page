import React from "react";
import {Grid, Icon, Image, Label} from "semantic-ui-react";
import styles from "../styles/game.module.css";
import {useDispatch} from "react-redux";
import {addToGames} from "../../store/game/actions";

export function AddGameMobile({game,alreadyAdded}) {

    const dispatch = useDispatch();

    function addGame() {
        if (!alreadyAdded) {
            dispatch(addToGames(game));
        }
    }

    return (
        <Grid.Row onClick={addGame}>
            <Grid.Column className={styles.gameMobile}>
                {
                    alreadyAdded ? <Label corner="left" color="green" className={styles.labelAdded}>
                        <Icon name="check square"/>
                    </Label> : null
                }
                <Image src={game.picture} size='small' verticalAlign='middle'
                       className={alreadyAdded ? styles.cardAdded : styles.card}/>{' '}
                <span className={styles.gameMobileText}>
                                {game.title}

                </span>
                <div></div>
            </Grid.Column>
        </Grid.Row>
    )
}