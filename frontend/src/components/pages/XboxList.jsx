import {AchievementGameList} from "../views/game/AchievementGameList";
import {XBOX} from "../constants/PlatformConstants";

export function XboxList() {
	return <AchievementGameList platformConstant={XBOX}/>
}