import {Button} from "../abstracts/Button";

export function DetailContainer({title, poster, posterSubText, genres, children, extraBlock, closeFunction}) {
	return <div className="d-flex flex-column bg-dark-grey p-3 border-radius-20-px overflow-hidden">
		<Button icon="icon-back" text="Vissza" additionalClassNames="position-absolute w-auto" onClick={() => closeFunction()}/>
		<div className="d-flex align-items-center justify-content-center">
			<h1 className="c-light-grey">{title}</h1>
		</div>
		<div className="d-flex justify-content-center h-50 mb-3">
			<img className="border-radius-20-px" src={poster} alt={title}/>
		</div>
		<div className="d-flex align-items-center justify-content-center">
			<h3 className="c-light-grey">{posterSubText}</h3>
		</div>

		<div className="d-flex align-items-baseline gap-2 mb-3">
			{genres ? genres.map(genre =>
				<div key={genre} className="bg-black c-light-grey border-radius-20-px p-2">
					<strong>{genre}</strong>
				</div>
			) : null}
		</div>

		<div className="d-flex align-items-center justify-content-center gap-3 mb-3">
			{children}
		</div>

		<div className="d-flex align-items-center gap-3 overflow-auto h-100 c-light-grey">
			{extraBlock}
		</div>
	</div>
}