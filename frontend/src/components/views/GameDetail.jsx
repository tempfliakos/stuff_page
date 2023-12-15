import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAchievementList} from "../../store/achievement/actions";
import {Button} from "../abstracts/Button";
import {Achievement} from "./xbox/Achievement";

export function GameDetail({game, closeFunction}) {

	const [achievementList, setAchievementList] = useState([]);
	const [earned, setEarned] = useState(game?.earned === game?.sum);

	const dispatch = useDispatch();

	useEffect(() => {

		async function getList() {
			return await dispatch(getAchievementList(game));
		}

		async function setData() {
			let tempList = await getList();
			setAchievementList(tempList);
		}

		setData();
	}, []);

	return <div className="d-flex flex-column bg-light-grey p-3 border-radius-20-px overflow-hidden">
			<div className="d-flex justify-content-between position-relative">
				<Button icon="icon-back" text="Vissza" additionalClassNames="w-auto"
				        onClick={() => closeFunction()}/>
				<Button text={earned ? "Hátralévők mutatása" : "Megszerzettek mutatása"} additionalClassNames="w-auto"
				        onClick={() => setEarned(!earned)}/>
			</div>
		<div className="d-flex align-items-center justify-content-center mb-3">
			<h1>{game.title}</h1>
		</div>
		<div>
			{
				achievementList ? achievementList.map(achievement =>
					<Achievement key={achievement.id} game={game} achievement={achievement} earned={earned}/>
				) : null
			}
		</div>
	</div>
}