export function Modal({title, open, setOpen, closeable = true, children}) {
	function handleCloseModal() {
		setOpen(false);
		document.body.style.overflowY = "auto";
	}

	return open ? <>
		<div className="modal fade show d-block">
			<div className="modal-dialog modal-dialog-centered">
				<div className={"modal-content p-3 bg-dark-grey "}>
					<div className="modal-header">
						<h5 className="c-white modal-title d-flex justify-content-between">{title}</h5>
						{
							closeable ? <button type="button" className="close bg-transparent w-auto c-white py-1 font-size-24"
							                    data-dismiss="modal" aria-label="Close"
							                    onClick={handleCloseModal}>
								<span aria-hidden="true">&times;</span>
							</button> : null
						}
					</div>
					<div className="modal-body border-0 pb-0">
						{children}
					</div>
				</div>
			</div>
		</div>
		<div className="modal-backdrop fade show"></div>
	</> : null
}