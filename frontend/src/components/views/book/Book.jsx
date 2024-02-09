import {useState} from "react";
import {useDispatch} from "react-redux";
import {removeBook} from "../../../store/book/actions";
import {Card} from "../../abstracts/Card";
import defaultPicture from "../../../resources/default-movie-back.jpg";

export function Book({book, setSelected, filter}) {

	const dispatch = useDispatch();

	const [openDelete, setOpenDelete] = useState(false);

	function picture() {
		if (book.picture) {
			return book.picture;
		} else {
			return defaultPicture;
		}
	}

	function showOrHideDelete() {
		setOpenDelete(!openDelete);
	}

	function handleDelete() {
		dispatch(removeBook(book));
	}

	function handleOnClick() {
		if (setSelected) {
			setSelected(book);
		}
	}

	function isShowable() {
		return book.title.toLowerCase().includes(filter.toLowerCase()) ||
			book.author.toLowerCase().includes(filter.toLowerCase());
	}


	return isShowable() ? <Card id={book.id} imgSrc={picture()} title={book.priority + ". " + book.title}
	             description={book.author} onClick={handleOnClick}/> : null

}