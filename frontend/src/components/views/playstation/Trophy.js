import React, {useState} from "react";
import styles from "../../styles/game.module.css";
import {useDispatch} from "react-redux";
import {setDone} from "../../../store/achievement/actions";
import defaultTrophy from "../../../resources/locked_trophy.svg";
import {updateGame} from "../../../store/game/actions";
import google from "../../../resources/google.svg";

export function Trophy({game, trophy}) {

	const [isOpen, setOpen] = useState(false);
	const [showSecret, setShowSecret] = useState(false);
	const dispatch = useDispatch();
	const secretTitle = "Hidden Trophy";
	const secretDescription = "";

	function getYoutubeLink() {
		return "https://www.youtube.com/results?search_query=" + game.title + " " + trophy.title;
	}

	function getGoogleLink() {
		return "https://www.google.com/search?q=" + game.title + " " + trophy.title;
	}

	function handleSee() {
		setOpen(!isOpen);
	}

	function handleDone() {
		trophy.earned = !trophy.earned;
		dispatch(setDone(trophy));
		game.earned = trophy.earned ? game.earned + 1 : game.earned - 1;
		dispatch(updateGame(game));
	}

	function getValue() {
		// if (trophy.value === "Bronze") {
		// 	return <Icon name="trophy" color="brown"/>
		// } else if (trophy.value === "Silver") {
		// 	return <Icon name="trophy" color="grey"/>
		// } else if (trophy.value === "Gold") {
		// 	return <Icon name="trophy" color="yellow"/>
		// } else {
		// 	return <Icon name="trophy" style={{color: "#95b3ce"}}/>
		// }
	}

	function handleShowSecret() {
		setShowSecret(!showSecret);
	}

	function isShowable() {
		if (trophy.secret) {
			return trophy.earned || showSecret;
		}
		return true;
	}

	return <div>Trophy</div>
		// <>
		// 	<List.Item as="a" className={styles.trophy}>
		// 		<Image src={trophy.earned ? trophy.picture : defaultTrophy} size='tiny'
		// 		       onClick={trophy.earned ? handleSee : handleDone}/>
		// 		<List.Content className={styles.plus}>
		// 			<List.Header style={{color: "white"}} onClick={handleDone}>
        //             <span>
        //                 {getValue()}
        //             </span>
		// 				{isShowable() ? trophy.title : secretTitle}
		// 			</List.Header>
		// 			<List.Description style={{color: "white"}}>
		// 				<List.Item onClick={handleDone}>
		// 					{isShowable() ? trophy.description : secretDescription}
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
		// 					{trophy.secret && !trophy.earned ?
		// 						<List.Item onClick={handleShowSecret}>
		// 							<Icon name={showSecret ? "eye" : "eye slash"} size="large" color="blue"/>
		// 						</List.Item> : null}
		// 				</List.Item>
		// 			</List.Description>
		// 		</List.Content>
		// 	</List.Item>
		{/*	<Divider/>*/}
		{/*</>*/}

}