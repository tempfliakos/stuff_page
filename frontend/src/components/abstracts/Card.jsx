export function Card({id, classNames = "", imgSrc, title, description, cardBackContent, onClick}) {

	function addFlip() {
		if (cardBackContent) {
			for (let element of document.getElementsByClassName("flipped")) {
				if (element.id !== id) {
					element.classList.remove("flipped");
				}
			}
			document.getElementById(id).classList.toggle("flipped");
		}
	}

	return <div key={id} id={id} className={"card " + classNames}>
		<div class="card-content">
			<div class="d-grid align-items-center justify-content-center w-100 h-100 card-front"  onClick={onClick}>
				<img src={imgSrc} alt={title + " logo"} class="logo w-100 aspect-ratio-3-2 object-fit-contain"/>
				<div class="data-container d-flex justify-content-center">
					<p class="d-flex align-items-center justify-content-center width-10 height-4 c-white font-size-18 font-weight-500 p-0 mt-1">{title}</p>
					{description ? <p class="c-white font-size-16 font-weight-500 p-0 m-0">{description}</p> : null}
				</div>
			</div>
			<div class="card-back">
				<div class="d-grid align-items-center justify-content-center w-100" onClick={onClick}>
					<p className="c-white font-size-18 font-weight-500 p-0 m-0 mt-1">{title}</p>
				</div>
				<div className="d-grid pt-4">
					{cardBackContent}
				</div>
			</div>
		</div>
	</div>
}