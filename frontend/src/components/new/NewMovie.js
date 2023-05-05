import React, {useState} from "react";
import {AddMovie} from "./AddMovie";
import {getDataFromEndpoint} from "../../services/axios";
import {AddMovieMobile} from "./AddMovieMobile";
import {Button} from "../abstracts/Button";

export function NewMovie({movies}) {

	const [searchText, setSearchText] = useState("");
	const [results, setResults] = useState([]);

	function handleSearch() {
		if (searchText.length >= 3) {
			getDataFromEndpoint('movies', searchText).then(
				res => {
					setResults(res.data);
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

	return <div>
		<div class="d-flex align-items-center justify-content-center">
			<input placeholder="Film hozzáadása" class="bg-dark-grey c-white w-100"
			       onChange={(event) => setSearchText(event.target.value)}/>
			<Button onClick={handleSearch} classNames="add" icon="icon-search"/>
		</div>
		<div class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
			{
				results ?
					<>
						{results.map(r =>
							<AddMovie key={r.id} movie={r} movieAttributes={contains(r.id.toString())}/>
						)}
					</>
					: null
			}
		</div>
	</div>

}