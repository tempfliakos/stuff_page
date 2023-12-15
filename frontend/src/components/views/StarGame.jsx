import {useState} from "react";
import {AchievementModal} from "../modals/AchievementModal";
import {TrophyModal} from "../modals/TrophyModal";

export function StarGame({game}) {

	const [openStar, setOpenStar] = useState(false);

	const trigger = (
		<img src={game.picture} alt={game.title} onClick={() => setOpenStar(true)}/>
	)

	function getModal() {
		if(game.console === 'Xbox') {
			return <AchievementModal key={game.game_id} trigger={trigger} game={game} open={openStar} setOpen={setOpenStar} defaultState={false}/>
		}
		return <TrophyModal key={game.game_id} trigger={trigger} game={game} open={openStar} setOpen={setOpenStar} defaultState={false}/>
	}

	return getModal();
}