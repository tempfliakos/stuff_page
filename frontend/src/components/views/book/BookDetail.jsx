import {useDispatch} from "react-redux";
import {DetailContainer} from "../../components/DetailContainer";
import {removeBook} from "../../../store/book/actions";
import {Button} from "../../abstracts/Button";

export function BookDetail({book, setBook}) {

	const dispatch = useDispatch();

	function handleDelete() {
		dispatch(removeBook(book));
		setBook(null);
	}

	function getDescriptionBlock() {
		return <p>{book.description}</p>
	}

	return <DetailContainer title={book.title} poster={book.picture} posterSubText={book.author}
	                        closeFunction={() => setBook(null)} extraBlock={getDescriptionBlock()}>
		<Button additionalClassNames={"w-25 bg-dark-green"}
		        onClick={handleDelete}
		        hasApprove={true}
		        icon="icon-trash"
		        text="Törlés"/>
	</DetailContainer>
}