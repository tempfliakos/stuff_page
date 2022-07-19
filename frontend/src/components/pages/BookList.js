import React, {useEffect} from "react";
import {Card, Grid, Responsive} from "semantic-ui-react";
import {NewBook} from "../new/NewBook";
import {getBooks} from "../../store/book/selectors";
import {useDispatch, useSelector} from "react-redux";
import {initBookList} from "../../store/book/actions";
import Cookies from "universal-cookie/lib";
import {Book} from "../views/book/Book";
import {BookMobile} from "../views/book/BookMobile";
import {trackPromise} from "react-promise-tracker";

export function BookList() {

	const books = useSelector(getBooks);
	const dispatch = useDispatch();

	useEffect(() => {
		const cookie = new Cookies();
		trackPromise(
		dispatch(initBookList(cookie.get("stuffPages")))
		);
	}, [dispatch]);

	return (
		<Grid columns="equal" className="gridFull">
			<Grid.Row>
				<Grid.Column>
					<NewBook books={books}/>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row>
				<Responsive minWidth={Responsive.onlyTablet.minWidth}>
					<Card.Group relaxed="very" columns="equal" padded="vertically" centered
					            itemsPerRow={window.screen.width > 800 ? 4 : 1} className="gridFull">
						{books ? books.map(book => (
							<Book key={book.book_id} book={book}/>
						)) : null}
					</Card.Group>
				</Responsive>

				<Responsive as={Grid} {...Responsive.onlyMobile}>
					<Grid columns="equal">
						{books ? books.map(book => (
							<BookMobile key={book.book_id} book={book}/>
						)) : null}
					</Grid>
				</Responsive>
			</Grid.Row>
		</Grid>
	);
}