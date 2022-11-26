import React, {useState} from "react";
import styles from "../styles/game.module.css";
import {AchievementModal} from "../modals/AchievementModal";
import {TrophyModal} from "../modals/TrophyModal";

export function StarGame({game}) {

	const [openStar, setOpenStar] = useState(false);

	function getStyle() {
		return game.console === 'Xbox' ? styles.highlightXbox : styles.highlightPs;
	}

	const trigger = (
		<img src={game.picture} className={getStyle()} alt={game.title} onClick={() => setOpenStar(true)}/>
	)

	function getModal() {
		if(game.console === 'Xbox') {
			return <AchievementModal key={game.game_id} trigger={trigger} game={game} open={openStar} setOpen={setOpenStar} defaultState={false}/>
		}
		return <TrophyModal key={game.game_id} trigger={trigger} game={game} open={openStar} setOpen={setOpenStar} defaultState={false}/>
	}

	return getModal();
}