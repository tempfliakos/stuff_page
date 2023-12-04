import {useState} from "react";
import styles from "../styles/game.module.css";
import {useDispatch} from "react-redux";
import {addToGames} from "../../store/game/actions";

export function WishModal({trigger, game, alreadyAdded}) {

	const dispatch = useDispatch();

	const [isOpen, setOpen] = useState(false);

	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	function addGame(console) {
		if (!alreadyAdded) {
			game.console = console;
			dispatch(addToGames(game));
		}
		handleClose();
	}

	return (
		// <Modal open={isOpen} trigger={trigger} onOpen={handleOpen} onClose={handleClose} basic closeIcon>
		// 	<Card.Group relaxed="very" columns="equal" padded="vertically" centered
		// 	            itemsPerRow={3} className="gridFull">
		// 		<Card as="a" className={styles.card} onClick={() => addGame('Xbox')}>
		// 			<Image src={game.picture} ui={false} wrapped/>
		// 			<Card.Content className={styles.textContent}>
		// 				<Card.Header><p><Icon name="xbox"/>XBOX</p></Card.Header>
		// 			</Card.Content>
		// 		</Card>
		//
		// 		<Card as="a" className={styles.card} onClick={() => addGame('Playstation')}>
		// 			<Image src={game.picture} ui={false} wrapped/>
		// 			<Card.Content className={styles.textContent}>
		// 				<Card.Header><p><Icon name="playstation"/>Playstation</p></Card.Header>
		// 			</Card.Content>
		// 		</Card>
		//
		// 		<Card as="a" className={styles.card} onClick={() => addGame('Switch')}>
		// 			<Image src={game.picture} ui={false} wrapped/>
		// 			<Card.Content className={styles.textContent}>
		// 				<Card.Header><p><Icon name="nintendo switch"/>Switch</p></Card.Header>
		// 			</Card.Content>
		// 		</Card>
		// 	</Card.Group>
		// </Modal>
		<div>WishModal</div>
	)
}