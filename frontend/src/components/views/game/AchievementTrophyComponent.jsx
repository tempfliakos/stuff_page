import {useState} from "react";
import {useDispatch} from "react-redux";
import {setDone} from "../../../store/achievement/actions";
import locked_img from "../../../resources/locked_trophy.svg";
import {PLAYSTATION, XBOX} from "../../constants/PlatformConstants";

export function AchievementTrophyComponent({game, achievement, earned}) {

	const [showSecret, setShowSecret] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const dispatch = useDispatch();
	const secretTitle = XBOX.gameType === game.console ? XBOX.secretTitle : PLAYSTATION.secretTitle;
	const secretDescription = XBOX.gameType === game.console ? XBOX.secretDescription : PLAYSTATION.secretDescription;

	function getYoutubeLink() {
		return "https://www.youtube.com/results?search_query=" + game.title + " " + achievement.title;
	}

	function getGoogleLink() {
		return "https://www.google.com/search?q=" + game.title + " " + achievement.title;
	}

	function handleDone() {
		achievement.earned = !achievement.earned;
		dispatch(setDone(achievement));
		game.earned = achievement.earned ? game.earned + 1 : game.earned - 1;
	}

	function handleShowSecret() {
		setShowSecret(!showSecret);
	}

	function isShowable() {
		if (achievement.secret) {
			return achievement.earned || showSecret;
		}
		return true;
	}

	return earned === achievement.earned ?
		<div className={"mb-3 px-2 border-radius-20-px bg-light-black-hover c-light-grey cursor-pointer " + (expanded ? "bg-light-black" : "")}>
			<div className="d-flex align-items-center justify-content-between">
				<div className="d-flex align-items-center gap-3">
					<div className="d-flex d-lg-flex d-none justify-content-center h-50 py-3">
						<img className={"width-5 " + (achievement.earned ? "border-radius-20-px" : "")}
						     src={achievement.earned ? achievement.picture : locked_img}
						     alt={achievement.title}/>
					</div>
					<div className="d-flex flex-column">
						{isShowable() ?
							<>
								<strong>{achievement.title}</strong>
								<p>{achievement.description}</p>
							</>
							:
							<>
								<strong>{secretTitle}</strong>
								<p>{secretDescription}</p>
							</>
						}
					</div>
				</div>

				<div className="d-flex align-items-center gap-1">
					{isShowable() ?
						<>
							<i className="icon-file icon-gamer-score"/>
							{achievement.value}
							<i className={"hover-opacity-50 font-size-24 " + (expanded ? "icon-expand-off" : "icon-expand-on")}
							   onClick={() => setExpanded(!expanded)}/>
							{
								achievement.secret ? <i className="icon-file icon-open-lock font-size-24"
								                        onClick={() => {
									                        setExpanded(false);
									                        setShowSecret(false);
								                        }}/>
									: null
							}
							<i className={"font-size-24 hover-opacity-50 " + (earned ? "icon-done-remove" : "icon-done")}
							   onClick={() => handleDone()}/>
						</> :
						<i className="icon-file icon-lock font-size-24" onClick={() => setShowSecret(true)}/>
					}

				</div>

			</div>
			{
				expanded ? <div className="d-flex flex-column">
						<a href={getGoogleLink()} target="_blank" rel="noreferrer"
						   className="d-flex text-decoration-none bg-dark-grey-hover border-radius-20-px p-2 mb-3">
							<i className="icon-file icon-google hover-opacity-50"/>
							<p className="c-light-grey m-0">Leirás keresése a Google-n</p>
						</a>
						<a href={getYoutubeLink()} target="_blank" rel="noreferrer"
						   className="d-flex text-decoration-none bg-dark-grey-hover border-radius-20-px p-2 mb-3">
							<i className="icon-file icon-youtube hover-opacity-50"/>
							<p className="c-light-grey m-0">Videó mutatása a Youtube-on</p>
						</a>
					</div>
					: null
			}
		</div>
		: null
}