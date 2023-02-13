import React, {useState} from "react";
import {Trophy} from "../views/playstation/Trophy";
import styles from "../styles/game.module.css";
import {getAchievementList} from "../../store/achievement/actions";
import {useDispatch, useSelector} from "react-redux";
import {getAchievements} from "../../store/achievement/selectors";

export function TrophyModal({trigger, game, open, setOpen, defaultState}) {

    const trophies = useSelector(getAchievements);
	const dispatch = useDispatch();

	function filterTrophies() {
		return trophies.filter(a => a.game_id === game.game_id)
	}

	const [earned, setEarned] = useState(isDefaultChecked());

	function handleOpen() {
		dispatch(getAchievementList(game));
	}

	function handleClose() {
		setOpen(false);
	}

	function handleEarnedToggle(event, data) {
		setEarned(data.checked);
	}

	function isDefaultChecked() {
		return defaultState == null ? game.earned === game.sum : defaultState;
	}

	return (
		// <Modal open={open} trigger={trigger} onOpen={handleOpen} onClose={handleClose} basic closeIcon>
		// 	<Form size='large'>
		// 		<List.Item content={game.title + " - Trófeák"}/>
		// 		<Segment stacked inverted>
		// 			<Checkbox toggle onChange={handleEarnedToggle}
		// 			          label={{children: earned ? "Kész trófeák megjelenítve" : "Szűrés a kész trófeákra"}}
		// 			          className={styles.achievementToggle} defaultChecked={isDefaultChecked()}/>
		// 			<List>
		// 				{filterTrophies() ? filterTrophies().map(tropy => (
		// 					<>
		// 						{tropy.earned === earned ?
		// 							<div key={tropy.id}>
		// 								<Trophy game={game} trophy={tropy}/>
		// 							</div> : null
		// 						}
		// 					</>
		// 				)) : null}
		// 			</List>
		// 		</Segment>
		// 	</Form>
		// </Modal>
		<div>TrophyModal</div>
	)
}