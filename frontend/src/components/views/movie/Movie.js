import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {removeMovie, update} from "../../../store/movie/actions";
import {getYear} from "../../../utils/dateUtil"

import styles from '../../styles/movie.module.css';
import defaultPicture from "../../../resources/default-movie-back.jpg";
import {filterMovie} from "../../../utils/FilterUtil";
import {Card} from "../../abstracts/Card";
import {Button} from "../../abstracts/Button";
import {CardBackgroundItem} from "../../components/CardBackgroundItem";

export function Movie({movie, filter}) {

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	function handleDelete() {
		dispatch(removeMovie(movie));
	}

	function handleSeen() {
		if (!releaseInTheFuture() && movie.owned) {
			movie.seen = !movie.seen;
			dispatch(update(movie));
			setOpen(false);
		}
	}

	function handleOwned() {
		if (!releaseInTheFuture()) {
			movie.owned = !movie.owned;
			movie.seen = false;
			dispatch(update(movie));
		}
	}

	function handleLiza() {
		if (!releaseInTheFuture()) {
			movie.liza = !movie.liza;
			dispatch(update(movie));
		}
	}

	function picture() {
		if (movie.backdrop_path) {
			return process.env.REACT_APP_TMDB_IMG_LINK + movie.backdrop_path;
		} else {
			return defaultPicture;
		}
	}

	function releaseInTheFuture() {
		return Date.parse(movie.release_date) > new Date().getTime();
	}

	function showOrHide() {
		if (movie.owned) {
			if (movie.seen) {
				setOpen(!open);
			} else {
				handleSeen();
			}
		}
	}

	function showOrHideDelete() {
		setOpenDelete(!openDelete);
	}

	function getReleaseDate() {
		return new Date(Date.parse(movie.release_date)).getFullYear();
	}

	function getBackgroundItems() {
		return [
			<CardBackgroundItem id={1}
			                    icon="icon-clock"
			                    activeClass="c-light-green"
			                    label="Jövőbeni"
			                    render={releaseInTheFuture()}/>,

			<CardBackgroundItem id={2}
			                    icon="icon-download"
			                    activeClass="c-light-green"
			                    label="Beszerzett"
			                    onClick={handleOwned}
			                    isActive={movie.owned}/>,

			<CardBackgroundItem id={3}
			                    icon="icon-eye"
			                    activeClass="c-light-green"
			                    label="Megnézett"
			                    onClick={handleSeen}
			                    render={movie.owned}
			                    isActive={movie.seen}/>,

			<CardBackgroundItem id={4}
			                    icon="icon-star"
			                    activeClass="c-light-green"
			                    label="Speciális"
			                    onClick={handleLiza}
			                    isActive={movie.liza}/>,

			<CardBackgroundItem id={5}
			                    icon="icon-trash"
			                    activeClass="c-light-green"
			                    onClick={handleDelete}
			                    label="Törlés"/>
		];
	}

	return filterMovie(movie, filter) ?
		<Card key={movie.id} id={movie.id} imgSrc={picture()}
		      title={movie.title + " (" + getReleaseDate() + ")"}
		      cardBackContent={getBackgroundItems()}/>
		: null


}