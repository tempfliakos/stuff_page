import React from "react";
import styles from "../../styles/movie.module.css";
import {useDispatch} from "react-redux";
import {removeGame} from "../../../store/game/actions";

export function WishGameMobile({game}) {

	const dispatch = useDispatch();

	function handleDelete() {
		dispatch(removeGame(game));
	}

	return <div>WishGameMobile</div>
	// <Grid.Row>
	// 	<Grid.Column className={styles.movieMobile}>
	// 		<Image src={game.picture} size='small' verticalAlign='middle'/>{' '}
	// 		<span className={styles.movieMobileText}>
    //                             {game.title}
	// 		</span>
	// 		<Button color="red" size="tiny" circular icon="trash" floated="right"
	// 		        className={styles.movieMobileTorles} onClick={handleDelete}/>
	// 	</Grid.Column>
	// </Grid.Row>
}