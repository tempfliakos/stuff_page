import styles from "../styles/movie.module.css";
import {useDispatch} from "react-redux";
import {addToBooks} from "../../store/book/actions";
import defaultGamePicture from "../../resources/gamer_default_icon.svg";

export function AddBookMobile({book, alreadyAdded}) {

	const dispatch = useDispatch();

	function addBook() {
		if (!alreadyAdded) {
			dispatch(addToBooks(book));
		}
	}

	function picture() {
		if (book.picture) {
			return book.picture;
		}
		return defaultGamePicture;
	}

	return (
		// <Grid.Row onClick={addBook}>
		// 	<Grid.Column className={styles.movieMobile}>
		// 		{
		// 			alreadyAdded ? <Label corner="left" color="green" className={styles.labelAdded}>
		// 				<Icon name="check square"/>
		// 			</Label> : null
		// 		}
		// 		<Image src={picture()} size='small' verticalAlign='middle'
		// 		       className={alreadyAdded ? styles.cardAdded : styles.cardMobile}/>{' '}
		// 		<span className={styles.movieMobileText}>
        //                         {book.title}({book.author})
        //         </span>
		// 		<div></div>
		// 	</Grid.Column>
		// </Grid.Row>
		<div>AddBookMobile</div>
	)
}