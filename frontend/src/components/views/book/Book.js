import React, {useState} from "react";
import styles from "../../styles/movie.module.css";
import {Button, Card, Confirm, Icon, Image} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {removeBook} from "../../../store/book/actions";
import {useDrag} from "react-dnd";
import {Dropzone} from "../../components/Dropzone";

export function Book({book, type}) {

	const dispatch = useDispatch();

	const [openDelete, setOpenDelete] = useState(false);

	function showOrHideDelete() {
		setOpenDelete(!openDelete);
	}

	function handleDelete() {
		dispatch(removeBook(book));
	}

	const [{isDragging}, dragRef] = useDrag({
		type: type,
		item: book,
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	return (
		<>
			<Dropzone accept={type} priority={book.priority}/>
			<div ref={dragRef}>
				<Card as="a" className={styles.card}>

					<Image src={book.picture} ui={false} wrapped/>
					<Card.Content className={styles.textContent}>
						<Card.Header>{book.title}</Card.Header>
						<Card.Description>{book.author} ({book.page ? book.page : '?'} oldal)</Card.Description>
					</Card.Content>

					<Card.Content className={styles.buttonContent}>
						<Button animated='vertical' color="red" size="tiny" className={styles.button}
						        onClick={showOrHideDelete} fluid>
							<Button.Content hidden>Törlés</Button.Content>
							<Button.Content visible>
								<Icon name='trash'/>
							</Button.Content>
						</Button>
						<Confirm
							content="Biztosan törli?"
							open={openDelete}
							basic
							cancelButton='Mégse'
							confirmButton="Rendben"
							onCancel={showOrHideDelete}
							onConfirm={handleDelete}
							size="mini"
						/>
					</Card.Content>
				</Card>
			</div>
		</>
	)
}