import React from "react";
import {Card, Icon, Image, Label} from "semantic-ui-react";
import styles from "../styles/game.module.css";
import {useDispatch} from "react-redux";
import {addToGames} from "../../store/game/actions";
import defaultGamePicture from "../../resources/gamer_default_icon.svg"
import {WishModal} from "../modals/WishModal";

export function AddGame({game, alreadyAdded, wish}) {

	const dispatch = useDispatch();

	function picture() {
		if (game.picture) {
			return game.picture;
		}
		return defaultGamePicture;
	}

	function addGame() {
		if(!wish) {
			if (!alreadyAdded) {
				dispatch(addToGames(game));
			}
		}
	}

	function getHover() {
		if (game.console === "Xbox") {
			return styles.xboxcard;
		} else if (game.console === "Playstation") {
			return styles.pscard;
		} else if (game.console === "Switch") {
			return styles.switchcard;
		}
	}

	const gameCard = (<Card onClick={addGame} className={getHover()}>
		{
			alreadyAdded ? <Label corner="right" color="green" size="huge" className={styles.labelAdded}>
				<Icon name="check square"/>
			</Label> : null
		}
		<Image src={picture()} wrapped/>

		<Card.Content className={styles.textContent}>
			<Card.Header>{game.title}</Card.Header>
		</Card.Content>
	</Card>)

	return <>
		{
			wish ? <WishModal game={game} trigger={gameCard} alreadyAdded={alreadyAdded}/>
				: gameCard
		}
	</>
}