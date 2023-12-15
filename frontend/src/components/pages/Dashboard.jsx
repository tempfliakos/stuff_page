import {useEffect, useState} from "react";
import {getDashboardData} from "../../services/axios";
import {PieChart} from "../charts/PieChart";
import {BarChart} from "../charts/BarChart";
import {DoughnutChart} from "../charts/DoughnutChart";
import {PolarChart} from "../charts/PolarChart";
import {trackPromise} from "react-promise-tracker";

export function Dashboard() {

	const [seen, setSeen] = useState([]);
	const [liza, setLiza] = useState([]);
	const [release, setRelease] = useState([]);
	const [done, setDone] = useState([]);
	const [consoleData, setConsoleData] = useState([]);
	const [achievement, setAchievement] = useState([]);
	const [wishlist, setWishlist] = useState([]);

	async function fetchData(endpoint) {
		return await getDashboardData(endpoint);
	}

	useEffect(() => {
		function makeRequest() {
			return [
				fetchData('movie/seen').then((res) => setSeen(res)),
				fetchData('movie/liza').then((res) => setLiza(res)),
				fetchData('movie/release').then((res) => setRelease(res)),
				fetchData('game/done').then((res) => setDone(res)),
				fetchData('game/console').then((res) => setConsoleData(res)),
				fetchData('game/achievement').then((res) => setAchievement(res)),
				fetchData('game/wishlist').then((res) => setWishlist(res)),
			];
		}

		trackPromise(Promise.all(makeRequest()));
	}, []);

	function getAchievementData() {
		if (achievement && achievement.xbox && achievement.playstation) {
			return [achievement.xbox.earned, achievement.xbox.notEarned, achievement.playstation.earned, achievement.playstation.notEarned];
		}
	}

	return (
	// 	<>
	// 		<CardGroup relaxed="very" columns="equal" padded="vertically" className="gridFull" centered>
	//
	// 			<Card as="a">
	// 				<Card.Content className={styles.textContent}>
	// 					<Card.Header>Filmek évenkénti bontása</Card.Header>
	// 				</Card.Content>
	// 				<Card.Content>
	// 					<BarChart labels={release.years} backgroundColor={'#C5C5C5'} hoverColor={'#107C10A0'}
	// 					          values={release.movieCount}
	// 					          name={'Évenkénti bontás'}/>
	// 				</Card.Content>
	// 			</Card>
	//
	// 			<Card as="a">
	// 				<Card.Content className={styles.textContent}>
	// 					<Card.Header>Megnézettek</Card.Header>
	// 				</Card.Content>
	// 				<Card.Content>
	// 					<DoughnutChart labels={['Megnézettek', 'Nem nézettek', 'Nincs beszerezve']}
	// 					               values={[seen.seen, seen.notSeen, seen.notBought]}
	// 					               backgroundColor={['#14B814', '#FF0202', '#C5C5C5']}
	// 					               hoverColor={['#14B814A0', '#FF0202A0', '#C5C5C5A0']}/>
	// 				</Card.Content>
	// 			</Card>
	//
	// 			<Card as="a">
	// 				<Card.Content className={styles.textContent}>
	// 					<Card.Header>Liza</Card.Header>
	// 				</Card.Content>
	// 				<Card.Content>
	// 					<PieChart labels={['Liza film', 'Nem liza film']} values={[liza.liza, liza.notLiza]}
	// 					          backgroundColor={['#000000', '#0D62B5']}
	// 					          hoverColor={['#000000A0', '#0D62B5A0']}
	// 					/>
	// 				</Card.Content>
	// 			</Card>
	// 		</CardGroup>
	// 		<CardGroup relaxed="very" columns="equal" padded="vertically" className="gridFull" centered>
	// 			<Card as="a">
	// 				<Card.Content className={styles.textContent}>
	// 					<Card.Header>Befejezett játékok megoszlása</Card.Header>
	// 				</Card.Content>
	// 				<Card.Content>
	// 					<PieChart labels={['Befejezett', 'Nem befejezett']}
	// 					          values={[done.finished, done.notFinished]}
	// 					          backgroundColor={['#17D117', '#C5C5C5']}
	// 					          hoverColor={['#17D117A0', '#C5C5C5A0']}
	// 					/>
	// 				</Card.Content>
	// 			</Card>
	//
	// 			<Card as="a">
	// 				<Card.Content className={styles.textContent}>
	// 					<Card.Header>Játékok megoszlása</Card.Header>
	// 				</Card.Content>
	// 				<Card.Content>
	// 					<DoughnutChart labels={['Xbox', 'Playstation', 'Switch']}
	// 					               values={[consoleData.xbox, consoleData.playstation, consoleData.switch]}
	// 					               backgroundColor={['#107C10', '#4183C4', '#FF0202']}
	// 					               hoverColor={['#107C10A0', '#4183C4A0', '#FF0202A0']}
	// 					/>
	// 				</Card.Content>
	// 			</Card>
	//
	// 			<Card as="a">
	// 				<Card.Content className={styles.textContent}>
	// 					<Card.Header>Achievement és Trófea teljesítési megoszlás</Card.Header>
	// 				</Card.Content>
	// 				<Card.Content>
	// 					<PolarChart
	// 						labels={['Kész', 'Nem kész', 'Kész', 'Nem kész']}
	// 						values={getAchievementData()}
	// 						backgroundColor={['#107C10', '#91BF91', '#4183C4', '#85A7C9']}
	// 						hoverColor={['#107C10A0', '#91BF91A0', '#4183C4A0', '#85A7C9A0']}/>
	// 				</Card.Content>
	// 			</Card>
	//
	// 			<Card as="a">
	// 				<Card.Content className={styles.textContent}>
	// 					<Card.Header>Wishlist megoszlása</Card.Header>
	// 				</Card.Content>
	// 				<Card.Content>
	// 					<DoughnutChart labels={['Xbox', 'Playstation', 'Switch']}
	// 					               values={[wishlist.xbox, wishlist.playstation, wishlist.switch]}
	// 					               backgroundColor={['#107C10', '#4183C4', '#FF0202']}
	// 					               hoverColor={['#107C10A0', '#4183C4A0', '#FF0202A0']}
	// 					/>
	// 				</Card.Content>
	// 			</Card>
	//
	//
	// 		</CardGroup>
	// 	</>
		<div>Dashboard</div>
	)
}