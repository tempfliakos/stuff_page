import styles from "../styles/game.module.css";
import defaultGamePicture from "../../resources/gamer_default_icon.svg";
import {useDispatch} from "react-redux";
import {addToBooks} from "../../store/book/actions";

export function AddBook({book, alreadyAdded}) {

	const dispatch = useDispatch();

	function addBook() {
		if(!alreadyAdded) {
			dispatch(addToBooks(book));
		}
	}

	function picture() {
		if(book.picture) {
			return book.picture;
		}
		return defaultGamePicture;
	}

	return (
		// <Card onClick={addBook}>
		// 	{
		// 		alreadyAdded ? <Label corner="right" color="green" size="huge" className={styles.labelAdded}>
		// 			<Icon name="check square"/>
		// 		</Label> : null
		// 	}
		// 	<Image src={picture()} wrapped/>
		//
		// 	<Card.Content className={styles.textContent}>
		// 		<Card.Header>{book.title}</Card.Header>
		// 		<Card.Description>{book.author} ({book.page ? book.page : '?'} oldal)</Card.Description>
		// 	</Card.Content>
		// </Card>
		<div>AddBook</div>
	)
}