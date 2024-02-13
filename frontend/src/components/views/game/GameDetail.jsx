import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAchievementList} from "../../../store/achievement/actions";
import {Button} from "../../abstracts/Button";
import {AchievementTrophyComponent} from "./AchievementTrophyComponent";
import {trackPromise} from "react-promise-tracker";
import {gameService} from "../../../services/game-service";
import {getAchievements} from "../../../store/achievement/selectors";

export function GameDetail({game, closeFunction}) {

	const achievementList = useSelector(getAchievements);
	const [earned, setEarned] = useState(game.earned !== undefined && game.earned === game.sum);

	const dispatch = useDispatch();

	useEffect(() => {
		trackPromise(dispatch(getAchievementList(game)));
	}, [dispatch, game]);

	async function handleStarClicked() {
		game.star = !game.star;
		await gameService.update(game.id, game);
	}

	return <div className="d-flex flex-column bg-dark-grey p-3 border-radius-20-px overflow-hidden">
			<div className="d-flex justify-content-between position-relative">
				<Button icon="icon-back" text="Vissza" additionalClassNames="w-auto bg-light-black c-light-grey"
				        onClick={() => closeFunction()}/>
				{game.earned === undefined || game.earned !== game.sum ? <Button icon={earned ? "icon-lock" : "icon-open-lock"} text={earned ? "Hátralévők mutatása" : "Megszerzettek mutatása"}
				                                    additionalClassNames="w-auto bg-light-black c-light-grey"
				                                    onClick={() => setEarned(!earned)}/>
				: null}

			</div>
		<div className="d-flex align-items-center justify-content-center mb-3">
			<h1 className="c-light-grey">
				{game.title}
				<i className={"icon-star cursor-pointer " + (game.star ? "c-dark-green" : "c-white")}
				onClick={() => handleStarClicked()}/>
			</h1>
		</div>
		<div>
			{
				achievementList ? achievementList.map(achievement =>
					<AchievementTrophyComponent key={achievement.id} game={game} achievement={achievement} earned={earned}/>
				) : null
			}
		</div>
	</div>
}