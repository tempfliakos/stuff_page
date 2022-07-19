import React, {useEffect, useState} from "react";
import {Button, Grid, Input, Image, Form, Label} from "semantic-ui-react";
import logo from "../../resources/mi.jpg";
import Cookies from "universal-cookie/lib";
import {RadioButton} from "../views/RadioButton";

export function Birthday() {
	const [secret1, setSecret1] = useState("");
	const [secret2, setSecret2] = useState("");
	const [secret3, setSecret3] = useState("");
	const [secret4, setSecret4] = useState("");
	const secretList = ["0823689849", "2861108619", "4700356239", "7016735490"];
	const solutions = ["Egyéb válasz", "God of War", "Ákos odaköltözése", "London és Koppenhága", "Tabulátor"];
	const [button, setButton] = useState("Teszt");

	const [elsoKerdes, setElsoKerdes] = useState("");
	const [masodikKerdes, setMasodikKerdes] = useState("");
	const [harmadikKerdes, setHarmadikKerdes] = useState("");
	const [negyedikKerdes, setNegyedikKerdes] = useState("");
	const [otodikKerdes, setOtodikKerdes] = useState("");

	useEffect(() => {
		const cookie = new Cookies();
		cookie.set("secret", "4700356239");
		console.log("ez mi lehet?", "7016735490");
	}, [check]);

	function handleSecret1Change(event, data) {
		setSecret1(data.value);
	}

	function handleSecret2Change(event, data) {
		setSecret2(data.value);
	}

	function handleSecret3Change(event, data) {
		setSecret3(data.value);
	}

	function handleSecret4Change(event, data) {
		setSecret4(data.value);
	}

	function handle1Change(event, data) {
		setElsoKerdes(data.label)
	}

	function handle2Change(event, data) {
		setMasodikKerdes(data.label)
	}

	function handle3Change(event, data) {
		setHarmadikKerdes(data.label)
	}

	function handle4Change(event, data) {
		setNegyedikKerdes(data.label)
	}

	function handle5Change(event, data) {
		setOtodikKerdes(data.label)
	}

	function check() {
		let copyList = secretList;
		if (secret1 && secret2 && secret3 && secret4) {
			copyList = copyList.filter(f => f !== secret1);
			copyList = copyList.filter(f => f !== secret2);
			copyList = copyList.filter(f => f !== secret3);
			copyList = copyList.filter(f => f !== secret4);
		}
		return copyList.length === 0;
	}

	function checkTest() {
		if (elsoKerdes === solutions[0] && masodikKerdes === solutions[1] && harmadikKerdes === solutions[2] && negyedikKerdes === solutions[3] && otodikKerdes === solutions[4]) {
			setButton("A oszlop 1-es mező")
		}
	}

	return (
		<Grid columns="equal" className="gridFull">
			<Grid.Row centered>
				<Image src={logo}/>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<Input placeholder='1. Titkos kód' fluid onChange={handleSecret1Change}/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<Input placeholder='2. Titkos kód' fluid onChange={handleSecret2Change}/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<Input placeholder='3. Titkos kód' fluid onChange={handleSecret3Change}/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<Input placeholder='4. Titkos kód' fluid onChange={handleSecret4Change}/>
				</Grid.Column>
			</Grid.Row>
			{
				check() ? <Grid.Row>
					<Form>
						<Grid columns={"equal"}>
							<Grid.Row>
								<Label content="Ákos kedvenc videójátéka?"/>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<RadioButton handleChange={handle1Change} label="God of War" value={'1'}
									             selectedinGroup={elsoKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle1Change} label="Assassin's Creed" value={'1'}
									             selectedinGroup={elsoKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle1Change} label="Dark Souls" value={'1'}
									             selectedinGroup={elsoKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle1Change} label="Egyéb válasz" value={'1'}
									             selectedinGroup={elsoKerdes}/>
								</Grid.Column>
							</Grid.Row>

							<Grid.Row>
								<Label content="Lizus és Ákos átlagául vett kedvenc videójáték cím?"/>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<RadioButton handleChange={handle2Change} label="God of War" value={'2'}
									             selectedinGroup={masodikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle2Change} label="Assassin's Creed" value={'2'}
									             selectedinGroup={masodikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle2Change} label="Crash Bandicoot" value={'2'}
									             selectedinGroup={masodikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle2Change} label="Alan Wake" value={'2'}
									             selectedinGroup={masodikKerdes}/>
								</Grid.Column>
							</Grid.Row>

							<Grid.Row>
								<Label content="A kapcsolat legjobb momentuma?"/>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<RadioButton handleChange={handle3Change} label="Első randi" value={'3'}
									             selectedinGroup={harmadikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle3Change} label="Első csók" value={'3'}
									             selectedinGroup={harmadikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle3Change} label="Visegrád" value={'3'}
									             selectedinGroup={harmadikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle3Change} label="Ákos odaköltözése" value={'3'}
									             selectedinGroup={harmadikKerdes}/>
								</Grid.Column>
							</Grid.Row>

							<Grid.Row>
								<Label content="A tökéletes nyaralás?"/>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<RadioButton handleChange={handle4Change} label="Visegrád" value={'4'}
									             selectedinGroup={negyedikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle4Change} label="Otthon pihizni egy hetet"
									             value={'4'}
									             selectedinGroup={negyedikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle4Change} label="London és Koppenhága" value={'4'}
									             selectedinGroup={negyedikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle4Change} label="1 hét Bugyi/Győr" value={'4'}
									             selectedinGroup={negyedikKerdes}/>
								</Grid.Column>
							</Grid.Row>

							<Grid.Row>
								<Label content="Ákos leendő kutyájának a neve?"/>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<RadioButton handleChange={handle5Change} label="Voldemort" value={'5'}
									             selectedinGroup={otodikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle5Change} label="Invito" value={'5'}
									             selectedinGroup={otodikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle5Change} label="Tabulátor" value={'5'}
									             selectedinGroup={otodikKerdes}/>
								</Grid.Column>
								<Grid.Column>
									<RadioButton handleChange={handle5Change} label="Úgyse lesz kutya" value={'5'}
									             selectedinGroup={otodikKerdes}/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Form>
					<Button content={button} onClick={checkTest}/>
				</Grid.Row> : null
			}


		</Grid>
	)
}