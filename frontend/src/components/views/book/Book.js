import React, {useState} from "react";
import styles from "../../styles/movie.module.css";
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

	return <div>Book</div>
		// <>
		// 	{book.priority == 1 ?
		// 		<Dropzone accept={type} priority={book.priority - 1}/>
		// 	: null}
		// 	<div ref={dragRef} className={styles.dragContainer}>
		// 		<Card as="a" className={styles.card}>
		// 			<div className={styles.bookImgContainer}>
		// 				<Image src={book.picture} ui={false} wrapped className={styles.bookImg}/>
		// 			</div>
		// 			<Card.Content className={styles.textContent}>
		// 				<Card.Header className={styles.headerTitle}>{book.priority}.{book.title}</Card.Header>
		// 				<Card.Description>{book.author} ({book.page ? book.page : '?'} oldal)</Card.Description>
		// 			</Card.Content>
		//
		// 			<Card.Content className={styles.buttonContent}>
		// 				<Button animated='vertical' color="red" size="tiny" className={styles.button}
		// 				        onClick={showOrHideDelete} fluid>
		// 					<Button.Content hidden>Törlés</Button.Content>
		// 					<Button.Content visible>
		// 						<Icon name='trash'/>
		// 					</Button.Content>
		// 				</Button>
		// 				<Confirm
		// 					content="Biztosan törli?"
		// 					open={openDelete}
		// 					basic
		// 					cancelButton='Mégse'
		// 					confirmButton="Rendben"
		// 					onCancel={showOrHideDelete}
		// 					onConfirm={handleDelete}
		// 					size="mini"
		// 				/>
		// 			</Card.Content>
		// 		</Card>
		// 	</div>
		{/*	<Dropzone accept={type} priority={book.priority+1}/>*/}
		{/*</>*/}

}