import {useState} from "react";
import {Button} from "../abstracts/Button";

export function TextSearch({handleSearch}) {

	const [searchText, setSearchText] = useState("");

	function handleKeyDown(event) {
		if (event.keyCode === 13) {
			handleSearch(searchText);
		}
	}

	return <div className="mb-3 p-3 border-radius-20-px">
		<div className="d-flex align-items-center justify-content-center gap-3 mb-3">
			<input placeholder="Keresés..." className="bg-dark-grey c-white w-100"
			       onChange={(event) => setSearchText(event.target.value)}
			       onKeyDown={handleKeyDown}/>
			<Button onClick={() => handleSearch(searchText)} additionalClassNames="width-5" icon="icon-search"/>
		</div>
	</div>
}