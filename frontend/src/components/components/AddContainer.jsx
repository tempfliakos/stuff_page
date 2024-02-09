import {Button} from "../abstracts/Button";
import {useState} from "react";

export function AddContainer({handleSearch, children, addView, setAddView}) {

	const [searchText, setSearchText] = useState("");

	function handleKeyDown(event) {
		if (event.keyCode === 13) {
			handleSearch(searchText);
		}
	}

	return addView ? <div className="bg-light-black mb-3 p-3 border-radius-20-px">
			<div className="d-flex align-items-center justify-content-center gap-3 mb-3">
				<input placeholder="Keresés..." className="bg-dark-grey c-white w-100"
				       onChange={(event) => setSearchText(event.target.value)}
				       onKeyDown={handleKeyDown}/>
				<Button onClick={() => handleSearch(searchText)} additionalClassNames="width-5" icon="icon-search"/>
				<Button onClick={() => setAddView(false)} additionalClassNames="width-5" icon="icon-close"/>
			</div>
			<div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
				{children}
			</div>
		</div> :
		<Button onClick={() => setAddView(true)} additionalClassNames="floating-button add font-size-32" text="+"/>
}