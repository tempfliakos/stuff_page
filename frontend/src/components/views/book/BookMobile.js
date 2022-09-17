import React from "react";
import {Button, Grid, Icon, Image} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import styles from "../../styles/movie.module.css";
import {removeBook, update} from "../../../store/book/actions";
import {Dropzone} from "../../components/Dropzone";
import {useDrag} from "react-dnd";
import {trackPromise} from "react-promise-tracker";

export function BookMobile({book}) {

	const dispatch = useDispatch();

	function handleDelete() {
		trackPromise(
			dispatch(removeBook(book))
		);
	}

	function updatePriority(priority) {
		if (priority > 0 && priority < 1000) {
			book.priority = priority;
			trackPromise(
				dispatch(update(book))
			);
		}
	}

	return (
		<Grid.Row>
			<Grid.Column className={styles.movieMobile}>
				<Image src={book.picture} size='small' verticalAlign='middle'/>{' '}
				<span className={styles.movieMobileText}>
                                {book.title}({book.author})
						</span>

				<Button size="tiny" circular icon="arrow alternate circle up" floated="right"
				        onClick={() => updatePriority(book.priority - 1)} disabled={book.priority === 1}/>
				<Button size="tiny" circular icon="arrow alternate circle down" floated="right"
				        className={styles.movieMobileTorles} onClick={() => updatePriority(book.priority + 1)}
				        disabled={book.priority === 999}/>

				<Button color="red" size="tiny" circular icon="trash" floated="right"
				        className={styles.movieMobileTorles} onClick={handleDelete}/>
			</Grid.Column>
		</Grid.Row>
	)


}