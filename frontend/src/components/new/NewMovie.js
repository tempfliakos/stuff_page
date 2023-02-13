import React, {useState} from "react";
import {AddMovie} from "./AddMovie";
import {getDataFromEndpoint} from "../../services/axios";
import {AddMovieMobile} from "./AddMovieMobile";

export function NewMovie({movies}) {
	const [results, setResults] = useState([]);

	function handleSearch(event) {
		if (event.target.value.length >= 3) {
			getDataFromEndpoint('movies', event.target.value).then(
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

	return (
		// <Form inverted>
		// 	<Form.Field>
		// 		<Input placeholder="Film hozzáadása..." onChange={handleSearch}/>
		// 	</Form.Field>
		// 	{results ?
		// 		<>
		// 			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
		// 				<Card.Group relaxed="very" columns="equal" padded="vertically" centered
		// 				            itemsPerRow={window.screen.width > 800 ? 4 : 1}
		// 				            style={{backgroundColor: '#6f6f6f', borderRadius: '21px'}}>
		// 					{results.map(r =>
		// 						<AddMovie key={r.id} movie={r} movieAttributes={contains(r.id.toString())}/>
		// 					)}
		// 				</Card.Group>
		// 			</Responsive>
		//
		// 			<Responsive as={Grid} {...Responsive.onlyMobile}>
		// 				<Grid columns="equal" style={{backgroundColor: '#6f6f6f', borderRadius: '21px'}}>
		// 					{results.map(r =>
		// 						<AddMovieMobile key={r.id} movie={r} movieAttributes={contains(r.id.toString())}/>
		// 					)}
		// 				</Grid>
		// 			</Responsive>
		// 		</>
		// 		: null}
		// </Form>
		<div>NewMovie</div>
	);

}