import {useState} from "react";
import styles from "../../styles/game.module.css";
import {useDispatch} from "react-redux";
import {setDone} from "../../../store/achievement/actions";
import gamerscore from "../../../resources/gamer_score.svg";
import google from "../../../resources/google.svg";
import defaultAchievement from "../../../resources/locked_trophy.svg";
import {updateGame} from "../../../store/game/actions";

export function Achievement({game, achievement}) {

	const [isOpen, setOpen] = useState(false);
	const [showSecret, setShowSecret] = useState(false);
	const dispatch = useDispatch();
	const secretTitle = "Secret achievement ";
	const secretDescription = "This achievement is secret. The more you play, the more likely you are to unlock it!";

	function getYoutubeLink() {
		return "https://www.youtube.com/results?search_query=" + game.title + " " + achievement.title;
	}

	function getGoogleLink() {
		return "https://www.google.com/search?q=" + game.title + " " + achievement.title;
	}

	function handleSee() {
		setOpen(!isOpen);
	}

	function handleDone() {
		achievement.earned = !achievement.earned;
		dispatch(setDone(achievement));
		game.earned = achievement.earned ? game.earned + 1 : game.earned - 1;
		dispatch(updateGame(game));
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

	return <div>Achievement</div>
		// <>
		// 	<List.Item as="a" className={styles.achievement}>
		// 		<Image src={achievement.earned ? achievement.picture : defaultAchievement} size='tiny'
		// 		       onClick={achievement.earned ? handleSee : handleDone}/>
		// 		<List.Content className={styles.plus}>
		// 			<List.Header style={{color: "white"}} onClick={handleDone}>
		// 				{isShowable() ? achievement.title.concat(" ") : secretTitle}
		// 				<span>
        //                 <Image avatar src={gamerscore} size="mini" style={{width: "15px"}}/>
		// 					{achievement.value}
        //             </span>
		//
		// 			</List.Header>
		// 			<List.Description style={{color: "white"}}>
		// 				<List.Item onClick={handleDone}>
		// 					{isShowable() ? achievement.description : secretDescription}
		// 				</List.Item>
		// 				<List.Item className={styles.achievementButtons}>
		// 					<a href={getYoutubeLink()} target="_blank" rel="noopener noreferrer"
		// 					   style={{padding: "5px"}}>
		// 						<Icon name="youtube" size="large" color="red"/>
		// 					</a>
		//
		// 					<a href={getGoogleLink()} target="_blank" rel="noopener noreferrer"
		// 					   style={{padding: "5px"}}>
		// 						<Image avatar src={google} style={{width: "20px"}}/>
		// 					</a>
		//
		// 					{achievement.secret && !achievement.earned ?
		// 						<List.Item onClick={handleShowSecret}>
		// 							<Icon name={showSecret ? "eye" : "eye slash"} size="large" color="blue"/>
		// 						</List.Item> : null}
		// 				</List.Item>
		// 			</List.Description>
		// 		</List.Content>
		// 	</List.Item>
		// 	<Modal open={isOpen} onClose={handleSee} basic closeIcon>
		// 		<Image src={achievement.picture}/>
		// 	</Modal>
		{/*	<Divider/>*/}
		{/*</>*/}
}