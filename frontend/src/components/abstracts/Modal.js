import React, {Component} from "react";


export function Modal({children, trigger, isOpen, onOpen, onClose}) {

	return isOpen ?
		<div class="modal-container">
			<div class="content">{children}</div>
		</div>
		:
		<div onClick={onOpen}>{trigger}</div>
		;

	// return isOpen ? <>
	// 	<div onClick={isOpen} />
	// 	<div>
	// 		<div>
	// 			<div>
	// 				<h5>Dialog</h5>
	// 			</div>
	// 			<button onClick={isOpen}>
	// 				Asd
	// 			</button>
	// 			<div>
	// 				Are you sure you want to delete the item?
	// 			</div>
	// 			<div>
	// 				<div>
	// 					<button onClick={onClose}>
	// 						Delete
	// 					</button>
	// 					<button
	// 						onClick={isOpen}
	// 					>
	// 						Cancel
	// 					</button>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// </>
	// 	: <div onClick={onOpen}>{trigger}</div>
}