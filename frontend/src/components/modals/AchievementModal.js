import React, {useState} from "react";
import {Achievement} from "../views/xbox/Achievement";
import styles from "../styles/game.module.css";
import {getAchievementList} from "../../store/achievement/actions";
import {useDispatch, useSelector} from "react-redux";
import {getAchievements} from "../../store/achievement/selectors";

export function AchievementModal({trigger, game, open, setOpen, defaultState}) {

	const achievements = useSelector(getAchievements);
	const dispatch = useDispatch();

	function filterAchievement() {
		return achievements.filter(a => a.game_id === game.game_id)
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
		// 		<List.Item content={game.title + " - Achievementek"}/>
		// 		<Segment stacked inverted>
		// 			<Checkbox toggle onChange={handleEarnedToggle}
		// 			          label={{children: earned ? "Kész achievementek megjelenítve" : "Szűrés a kész achievementekre"}}
		// 			          className={styles.achievementToggle} defaultChecked={isDefaultChecked()}/>
		// 			<List>
		// 				{filterAchievement() ? filterAchievement().map(achievement => (
		// 					<div key={achievement.id}>
		// 						{achievement.earned === earned ?
		// 							<Achievement game={game} achievement={achievement}/> : null
		// 						}
		// 					</div>
		// 				)) : null}
		// 			</List>
		// 		</Segment>
		// 	</Form>
		// </Modal>
		<div>AchievementModal</div>
	)
}