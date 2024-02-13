import {useState} from "react";
import {AddMovie} from "./AddMovie";
import {getDataFromEndpoint} from "../../../services/axios";
import {AddContainer} from "../../components/AddContainer";

export function NewMovie({movies, addView, setAddView}) {

	const [results, setResults] = useState([]);
	const [alreadySearched, setAlreadySearched] = useState(false);

	function handleSearch(searchText) {
		if (searchText.length >= 3) {
			getDataFromEndpoint('movies', searchText).then(
				res => {
					setResults(res.data);
					setAlreadySearched(true);
				}
			).catch(error => console.log(error))
		} else {
			setResults([]);
		}
	}

	function contains(id) {
		const movie = movies.filter(m => m.id.toString() === id.toString())[0];
		if (movie) {
			return {alreadyAdded: true, seen: movie.seen};
		}
		return {alreadyAdded: false, seen: false};
	}

	return <AddContainer handleSearch={handleSearch} addView={addView} setAddView={setAddView}>
		{
			results ?
				<>
					{results.length > 0 ? results.map(r =>
						<AddMovie key={r.id} movie={r} movieAttributes={contains(r.id.toString())}/>
					) : alreadySearched ? <p>Nincs találat</p> : null}
					{}
				</>
				: null
		}
	</AddContainer>

}