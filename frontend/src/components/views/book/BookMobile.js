import React from "react";
import {Button, Grid, Image} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import styles from "../../styles/movie.module.css";
import {removeBook} from "../../../store/book/actions";

export function BookMobile({book}) {

	const dispatch = useDispatch();

	function handleDelete() {
		dispatch(removeBook(book));
	}

	return (

		<Grid.Row>
			<Grid.Column className={styles.movieMobile}>
				<Image src={book.picture} size='small' verticalAlign='middle'/>{' '}
				<span className={styles.movieMobileText}>
                                {book.title}({book.author})
				</span>
				<Button color="red" size="tiny" circular icon="trash" floated="right"
				        className={styles.movieMobileTorles} onClick={handleDelete}/>
			</Grid.Column>
		</Grid.Row>
	)


}