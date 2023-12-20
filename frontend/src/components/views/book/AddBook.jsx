import defaultGamePicture from "../../../resources/gamer_default_icon.svg";
import {useDispatch} from "react-redux";
import {addToBooks} from "../../../store/book/actions";
import {Card} from "../../abstracts/Card";

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

	return <div onClick={addBook}>
		<Card id={book.id} additionalClassNames={alreadyAdded ? "marked" : ""}
		      imgSrc={picture()} title={book.title} description={book.author}/>
	</div>
}