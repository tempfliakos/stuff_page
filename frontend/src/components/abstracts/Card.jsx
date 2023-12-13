export function Card({id, classNames = "", imgSrc, title, description, onClick}) {

	return <div key={id} id={id} className={"card " + classNames}>
		<div className="card-content">
			<div className="d-grid align-items-center justify-content-center w-100 h-100 card-front" onClick={onClick}>
				<div>
					<img src={imgSrc} alt={title + " logo"} className="logo w-100 aspect-ratio-3-2 object-fit-contain"/>
				</div>
				<div className="d-grid mt-1">
					<p className="c-white font-size-18 longtext-ellipsis width-15 m-0">{title}</p>
					{description ?
						<p className="c-white font-size-16 longtext-ellipsis width-15 p-0 m-0">{description}</p> : null}
				</div>
			</div>
			<div className="card-back">
				<div className="d-grid align-items-center justify-content-center w-100" onClick={onClick}>
					<p className="c-white font-size-18 font-weight-500 p-0 m-0 mt-1">{title}</p>
				</div>
			</div>
		</div>
	</div>
}