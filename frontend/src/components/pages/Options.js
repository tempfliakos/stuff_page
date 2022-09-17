import React, {useState} from "react";
import {Card, Grid, Icon, Responsive} from "semantic-ui-react";
import {makeGetRequest} from "../../services/axios";
import {Movie} from "../views/movie/Movie";
import {MovieMobile} from "../views/movie/MovieMobile";
import {genres} from "../../store/catalogs/genres";

export function Options() {

	const REST_HOST = process.env.REACT_APP_SERVER_LINK;
	const [movieList, setMovieList] = useState();

	let defaultFilter = {
		title: "",
		genre: initGenres(),
		seen: null,
		owned: false,
		release: false,
		liza: null,
	};

	function initGenres() {
		return genres.map(g => g.text);
	}

	function handleAndroidDownload() {
		let link = document.createElement("a");
		// If you don't know the name or want to use
		// the webserver default set name = ''
		link.setAttribute('download', "stuff_pages.apk");
		link.href = "https://drive.google.com/u/0/uc?id=1zrNZCnHI7_zorussVvAWrFmYdRw7LvsF&export=download";
		document.body.appendChild(link);
		link.click();
		link.remove();
		return link.href;
	}

	function handleAppleDownload() {
		let link = document.createElement("a");
		// If you don't know the name or want to use
		// the webserver default set name = ''
		link.setAttribute('download', "stuff_pages.apk");
		link.href = "https://drive.google.com/u/0/uc?id=1zrNZCnHI7_zorussVvAWrFmYdRw7LvsF&export=download";
		document.body.appendChild(link);
		link.click();
		link.remove();
		return link.href;
	}

	async function handleUpdateJob() {
		const response = await makeGetRequest(REST_HOST + "update");
		setMovieList(response.data);
	}

	return (
		<Grid columns="equal">
			<Grid.Row>
				<Grid.Column>
					<a onClick={handleAppleDownload}
					   href="https://drive.google.com/u/0/uc?id=1zrNZCnHI7_zorussVvAWrFmYdRw7LvsF&export=download">
						<Icon name="apple" size="massive" color="black"/>
					</a>
				</Grid.Column>
				<Grid.Column>
					<a onClick={handleAndroidDownload}
					   href="https://drive.google.com/u/0/uc?id=1zrNZCnHI7_zorussVvAWrFmYdRw7LvsF&export=download">
						<Icon name="android" size="massive" color="green"/>
					</a>
				</Grid.Column>
				<Grid.Column>
					<Icon name="play" size="massive" color="green" onClick={handleUpdateJob}/>
				</Grid.Column>
			</Grid.Row>

			{
				movieList ?
					<Grid.Row>
						<Responsive minWidth={Responsive.onlyTablet.minWidth}>
							<Card.Group relaxed="very" columns="equal" padded="vertically" centered
							            itemsPerRow={window.screen.width > 800 ? 4 : 1} className="gridFull">
								{movieList.map(movie =>
									<Movie key={movie.movie_id} movie={movie} filter={defaultFilter}/>
								)}
							</Card.Group>
						</Responsive>

						<Responsive as={Grid} {...Responsive.onlyMobile}>
							<Grid columns="equal">
								{movieList.map(movie =>
									<MovieMobile key={movie.movie_id} movie={movie} filter={defaultFilter}/>
								)}
							</Grid>
						</Responsive>
					</Grid.Row>
					: null
			}
		</Grid>
	)
}