import React from "react";
import {useDrop} from "react-dnd";
import styles from '../styles/book.module.css';
import {useDispatch} from "react-redux";
import {update} from "../../store/book/actions";

export function Dropzone({accept, priority}) {

	const dispatch = useDispatch();

	function getPriority() {
		if(priority <= 1) {
			return 1;
		}
		return priority -1;
	}

	function updatePriority(book) {
		book.priority = getPriority();
		dispatch(update(book));
	}

	const [{ isOver }, dropRef] = useDrop({
		accept: accept,
		drop: (book) => updatePriority(book),
		collect: (monitor) => ({
			isOver: monitor.isOver()
		})
	});

	return (
		<div className={isOver ? styles.show : styles.hide} ref={dropRef}>
		</div>
	)
}