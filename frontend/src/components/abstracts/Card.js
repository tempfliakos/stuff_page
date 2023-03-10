import React from "react";

export function Card({id, imgSrc, title, description, cardBackContent}) {

	function addFlip() {
		document.getElementById(id).classList.toggle("flipped");
	}

	return <div id={id} class="card" onClick={addFlip}>
		<div class="card-content">
			<div class="d-grid align-items-center justify-content-center w-100 h-100 card-front">
				<img src={imgSrc} alt={title + " logo"} class="logo"/>
				<div class="data-container">
					<p class="c-white font-size-18 font-weight-500 p-0 mt-1">{title}</p>
					{description ? <p class="c-white font-size-16 font-weight-500 p-0 m-0">{description}</p> : null}
				</div>
			</div>
			<div class="card-back">
				<div class="d-grid align-items-center justify-content-center w-100 h-100">
					<p className="c-white font-size-18 font-weight-500 p-0 m-0 mt-1">{title}</p>
					{cardBackContent}
				</div>
			</div>
		</div>
	</div>
}