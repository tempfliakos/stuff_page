
export function CardBackgroundItem({id, icon, activeClass, label, onClick, isActive = true, render = true}) {
	return render ? <div key={id} className="d-flex align-items-center justify-content-center" onClick={onClick}>
		<a class="hover-opacity-50 text-decoration-none">
			<label className={"cursor-pointer " + (isActive ? activeClass : "c-white")}>{label}</label>
			<i className={(isActive ? activeClass : "c-white") + " " + icon}/>
		</a>
	</div> : null;
}