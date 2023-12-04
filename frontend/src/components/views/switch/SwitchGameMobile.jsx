import styles from "../../styles/movie.module.css";
import {filterGame} from "../../../utils/FilterUtil";

export function SwitchGameMobile({game, filter}) {

	return <>
		{
			filterGame(game, filter) ?
				// <Grid.Row>
				// 	<Grid.Column className={styles.movieMobile}>
				// 		<Image src={game.picture} size='small' verticalAlign='middle'/>{' '}
				// 		<span className={styles.movieMobileText}>
                //                 {game.title}
                //             </span>
				// 		<div style={{display: "flex", padding: "25px"}}>
				// 		</div>
				// 	</Grid.Column>
				// </Grid.Row>
				<div>SwitchGameMobile</div>
				: null
		}
	</>
}