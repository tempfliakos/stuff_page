import {AchievementGameList} from "../views/game/AchievementGameList";
import {XBOX} from "../constants/ConsoleConstants";

export function XboxList() {
	return <AchievementGameList consoleConstant={XBOX}/>
}