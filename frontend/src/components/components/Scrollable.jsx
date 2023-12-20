
export function Scrollable({scrollFunction, children}) {

	const paneDidMount = () => {
		document.addEventListener("scroll", () => {
			scrollFunction();
		});
	}

	return <div ref={paneDidMount}>{children}</div>;
}