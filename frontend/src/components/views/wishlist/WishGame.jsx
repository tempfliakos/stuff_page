import {GameComponent} from "../game/GameComponent";
import {useState} from "react";
import {Modal} from "../../abstracts/Modal";
import {Button} from "../../abstracts/Button";

export function WishGame({game, deleteFunc}) {

	const [open, setOpen] = useState(false);

	const defaultFilter = {
		title: ''
	}

	function handleDelete() {
		deleteFunc(game.id).then(() => handleCloseModal());
	}

	function handleOpenModal() {
		setOpen(true);
		document.body.style.overflowY = "hidden";
	}

	function handleCloseModal() {
		setOpen(false);
		document.body.style.overflowY = "auto";
	}

	return <>
		<Modal title="Játék törlése" open={open} setOpen={setOpen}>
			<div className="d-grid justify-content-center">
				<span className="c-white font-size-18">{game.title}-t tényleg törlöd?</span>
				<div className="d-flex gap-5 mt-3">
					<Button text="Igen" onClick={() => handleDelete()}/>
					<Button text="Nem" onClick={() => handleCloseModal()}/>
				</div>
			</div>
		</Modal>
		<GameComponent game={game} filter={defaultFilter} onClick={() => handleOpenModal()}/>
	</>
}