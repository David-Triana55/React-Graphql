import { createPortal } from "react-dom";

export function Modal({ children }) {
	return createPortal(
		<div className="absolute w-full h-full z-20 top-0 bottom-0 left-0 right-0 bg-white">
			{children}
		</div>,
		document.getElementById("modal-root"),
	);
}
