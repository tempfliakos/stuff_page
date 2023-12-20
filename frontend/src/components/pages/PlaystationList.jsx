import {AchievementGameList} from "../views/game/AchievementGameList";
import {PLAYSTATION} from "../constants/ConsoleConstants";

export function PlaystationList() {
	return <AchievementGameList consoleConstant={PLAYSTATION}/>
}