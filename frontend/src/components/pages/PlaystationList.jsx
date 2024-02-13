import {AchievementGameList} from "../views/game/AchievementGameList";
import {PLAYSTATION} from "../constants/PlatformConstants";

export function PlaystationList() {
	return <AchievementGameList platformConstant={PLAYSTATION}/>
}