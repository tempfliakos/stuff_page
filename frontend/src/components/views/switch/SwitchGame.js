import React from "react";
import styles from "../../styles/game.module.css";
import {Card, Image} from "semantic-ui-react";
import {filterGame} from "../../../utils/FilterUtil";

export function SwitchGame({game, filter}) {

	return <>{
		filterGame(game, filter) ?
			<Card as="a" className={styles.switchcard}>
				<Image src={game.picture} ui={false} wrapped/>
				<Card.Content className={styles.textContent}>
					<Card.Header>{game.title}</Card.Header>
				</Card.Content>
			</Card>
			: null
	}
	</>
}