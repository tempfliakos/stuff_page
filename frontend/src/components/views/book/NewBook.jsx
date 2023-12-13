import {useState} from "react";
import {getDataFromEndpoint} from "../../../services/axios";
import {AddBook} from "./AddBook";
import {AddContainer} from "../../components/AddContainer";

export function NewBook({books}) {

	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alreadySearched, setAlreadySearched] = useState(false);


	function handleSearch(searchInput) {
		console.log(searchInput)
		setLoading(true);
		getDataFromEndpoint("books", searchInput).then(res => {
			setResults(res.data);
			setAlreadySearched(true);
			setLoading(false);
		});
	}

	function contains(id) {
		const book = books.filter(b => b.book_id === id.toString())[0];
		return !!book;
	}

	return <AddContainer handleSearch={handleSearch}>
		{
			results ?
				<>
					{results.length > 0 ? results.map(r =>
						<AddBook key={r.book_id} book={r} alreadyAdded={contains(r.book_id)}/>
					) : alreadySearched ? <p>Nincs találat</p> : null}
					{}
				</>
				: null
		}
	</AddContainer>
}