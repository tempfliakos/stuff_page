import {useState} from "react";
import {Button} from "../abstracts/Button";
import {Modal} from "../abstracts/Modal";

export function SearchContainer({children}) {

	const [showFilterModal, setShowFilterModal] = useState(false);

	return <>
		<Button onClick={() => setShowFilterModal(true)} icon="icon-search"
		        additionalClassNames="floating-button search font-size-24"/>
		{showFilterModal ? <Modal title="Szűrés" open={showFilterModal} setOpen={setShowFilterModal}>
			{children}
		</Modal> : null}
	</>
}