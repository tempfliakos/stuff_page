import React, {useEffect} from "react";
import {Card, Grid, Label, Menu, Responsive, Tab} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {getGames} from "../../store/game/selectors";
import {getWishlist} from "../../store/game/actions";
import {NewWishGame} from "../new/NewWishGame";
import {WishGame} from "../views/wishlist/WishGame";
import {WishGameMobile} from "../views/wishlist/WishGameMobile";
import {trackPromise} from "react-promise-tracker";

export function Wishlist() {

	const games = useSelector(getGames);
	const dispatch = useDispatch();

	const panes = [getPanes("Xbox"), getPanes("Playstation"), getPanes("Switch")];
	const mobilePanes = [getMobileTabs("Xbox"), getMobileTabs("Playstation"), getMobileTabs("Switch")];

	useEffect(() => {
		trackPromise(dispatch(getWishlist()));
	}, [dispatch]);

	function getList(consoleParam) {
		return games.filter(g => g.console === consoleParam && g.wish === true);
	}

	function getGameList(consoleParam) {
		let result = [];
		for (let game of getList(consoleParam)) {
			result.push(<WishGame key={game.game_id} game={game}/>);
		}
		return result;
	}

	function getGameListMobile(consoleParam) {
		let result = [];
		for (let game of getList(consoleParam)) {
			result.push(<WishGameMobile key={game.game_id} game={game}/>);
		}
		return result;
	}

	function getIcon(consoleParam) {
		switch (consoleParam) {
			case "Xbox":
				return "xbox";
			case "Playstation":
				return "playstation";
			case "Switch":
				return "nintendo switch";
		}
	}

	function getPanes(consoleParam) {
		return {
			menuItem: (
				<Menu.Item key={consoleParam} icon={getIcon(consoleParam)} content={consoleParam}/>
			),
			render: () => <Tab.Pane className="componentWithBackGround">
				<Grid columns="equal" className="gridFull">
					<Grid.Row>
						<Card.Group relaxed="very" columns="equal" padded="vertically" centered
						            itemsPerRow={window.screen.width > 800 ? 4 : 1} className="gridFull">
							{getGameList(consoleParam)}
						</Card.Group>
					</Grid.Row>
				</Grid>
			</Tab.Pane>
		}
	}

	function getMobileTabs(consoleParam) {
		return {
			menuItem: (
				<Menu.Item key={consoleParam} icon={getIcon(consoleParam)} content={consoleParam}/>
			),
			render: () => <Tab.Pane className="componentWithBackGround">
				<Grid columns="equal">
					{getGameListMobile(consoleParam)}
				</Grid>
			</Tab.Pane>
		}
	}

	return (
		<Grid columns="equal" className="gridFull">
			<Grid.Row>
				<Grid.Column>
					<NewWishGame games={games}/>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row>
				<Responsive minWidth={Responsive.onlyComputer.minWidth}>
					<Grid.Column>
						<Tab panes={panes}/>
					</Grid.Column>
				</Responsive>

				<Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
					<Tab panes={mobilePanes}/>
				</Responsive>
			</Grid.Row>
		</Grid>
	)
}