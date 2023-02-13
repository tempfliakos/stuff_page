import React, {useState} from "react";
import {getDataFromEndpoint} from "../../services/axios";
import {AddBook} from "./AddBook";
import {AddBookMobile} from "./AddBookMobile";

export function NewBook({books}) {

	const [searchInput, setSearchInput] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	function handleSearch() {
		setLoading(true);
		getDataFromEndpoint("books", searchInput).then(res => {
			setResults(res.data);
			setLoading(false);
		});
	}

	function contains(id) {
		const book = books.filter(b => b.book_id === id.toString())[0];
		return !!book;
	}

	function handleSearchInputChange(event) {
		setSearchInput(event.target.value);
	}

	return (
		// <Form inverted>
		// 	<Form.Field>
		// 		<Input placeholder="Könyv hozzáadása..." onChange={handleSearchInputChange} value={searchInput}
		// 		       action={<Button onClick={handleSearch} content="Keresés" color="green" icon="search"
		// 		                       loading={loading} disabled={loading}/>}/>
		// 	</Form.Field>
		// 	{results ?
		// 		<>
		// 			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
		// 				<Card.Group relaxed="very" columns="equal" padded="vertically" centered
		// 				            itemsPerRow={window.screen.width > 800 ? 4 : 1} style={{backgroundColor: '#6f6f6f', borderRadius: '21px'}}>
		// 					{results.map(r =>
		// 						<AddBook key={r.book_id} book={r} alreadyAdded={contains(r.book_id)}/>
		// 					)}
		// 				</Card.Group>
		// 			</Responsive>
		//
		// 			<Responsive as={Grid} {...Responsive.onlyMobile}>
		// 				<Grid columns="equal" style={{backgroundColor: '#6f6f6f', borderRadius: '21px'}}>
		// 					{results.map(r =>
		// 					<AddBookMobile key={r.book_id} book={r} alreadyAdded={contains(r.book_id)}/>
		// 					)}
		// 				</Grid>
		// 			</Responsive>
		// 		</>
		// 		: null}
		// </Form>
		<div>NewBook</div>
	)
}