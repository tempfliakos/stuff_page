import {useState} from "react";
import {filterGame} from "../../../utils/FilterUtil";
import {useDispatch} from "react-redux";
import {update} from "../../../store/game/actions";
import {Card} from "../../abstracts/Card";

export function XboxGame({game, filter, setSelected}) {

	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	function getAchievementData() {
		return game.earned + "/" + game.sum;
	}

	function isDone() {
		return game.earned === game.sum;
	}

	function isStar() {
		return game.star;
	}

	function cardClick() {
		setOpen(true);
	}

	function starClicked() {
		game.star = !game.star;
		dispatch(update(game));
	}

	function handleClick() {
		if (setSelected) {
			setSelected(game);
		}
	}

	const trigger = (
		// <Card as="a" className={styles.xboxcard}>
		// 	{
		// 		isDone() ?
		// 			<Label corner="right" color="green" size="huge" className={styles.labelAdded} onClick={cardClick}>
		// 				<Icon name="trophy"/>
		// 			</Label> : null
		// 	}
		//
		// 	{
		// 		<Label corner="left" size="huge" className={styles.labelAdded}
		// 		       onClick={starClicked}>
		// 			<Icon name="star" color={isStar() ? "yellow" : "grey"} className={styles.iconClick}/>
		// 		</Label>
		// 	}
		// 	<Image src={game.picture} ui={false} wrapped onClick={cardClick}/>
		// 	<Card.Content className={styles.textContent}>
		// 		<Card.Header onClick={cardClick}>{game.title}</Card.Header>
		//
		// 		<Card.Description textAlign="right" className={styles.xboxcardDescription}>
		// 			<div style={{display: "flex"}}>
		// 				<p onClick={cardClick}>
		// 					{getAchievementData()}
		// 					<Icon name="trophy"/>
		// 				</p>
		// 			</div>
		// 		</Card.Description>
		// 	</Card.Content>
		// </Card>
		<div>XboxGame</div>
	)
	return <>{
		filterGame(game, filter, isDone()) ?
			<Card id={game.id} title={game.title} description={getAchievementData()}
			      imgSrc={game.picture} onClick={handleClick}/>
			: null
	}
	</>
}