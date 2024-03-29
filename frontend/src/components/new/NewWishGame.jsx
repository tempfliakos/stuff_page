import {useState} from "react";
import {AddGame} from "./AddGame";
import {getDataFromEndpoint} from "../../services/axios";

export function NewWishGame({games}) {

	const [searchInput, setSearchInput] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	function handleSearch() {
		if (searchInput.length >= 3) {
			setLoading(true);
			getDataFromEndpoint('wish', searchInput).then(
				res => {
					setResults(res.data);
					setLoading(false);
				});
		} else {
			setLoading(false);
			setResults([]);
		}
	}

	function contains(id) {
		const game = games.filter(g => g.game_id && g.game_id.toString() === id.toString())[0];
		return !!game;
	}

	function handleInputChange(event) {
		setSearchInput(event.target.value);
	}

	return (
		// <Form inverted>
		// 	<Form.Field>
		// 		<Input placeholder="Játék hozzáadása..." onChange={handleInputChange}
		// 		       value={searchInput}
		// 		       action={<Button onClick={handleSearch} content="Keresés" color="green" icon="search"
		// 		                       loading={loading} disabled={loading}/>}/>
		// 	</Form.Field>
		// 	{results ?
		// 		<>
		// 			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
		// 				<Card.Group relaxed="very" columns="equal" padded="vertically" centered
		// 				            itemsPerRow={window.screen.width > 800 ? 4 : 1}
		// 				            style={{backgroundColor: '#6f6f6f', borderRadius: '21px'}}>
		// 					{results.map(r =>
		// 						<AddGame key={r.game_id} game={r} alreadyAdded={contains(r.game_id)} wish={true}/>
		// 					)}
		// 				</Card.Group>
		// 			</Responsive>
		//
		// 			<Responsive as={Grid} {...Responsive.onlyMobile}>
		// 				<Grid columns="equal" style={{backgroundColor: '#6f6f6f', borderRadius: '21px'}}>
		// 					{results.map(r =>
		// 						<AddGameMobile key={r.game_id} game={r} alreadyAdded={contains(r.game_id)}/>
		// 					)}
		// 				</Grid>
		// 			</Responsive>
		// 		</>
		// 		: null}
		// </Form>
		<div>NewWishGame</div>
	)
}