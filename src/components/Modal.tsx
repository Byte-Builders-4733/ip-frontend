export default function Modal({shown, children, onOverlayClick}: {shown?: boolean, children: any, onOverlayClick:any}) {
	return shown ? <div
		className="overlay w-full h-full fixed top-0 left-0 z-50 bg-shadow/30 flex justify-center items-center"
		onClick={(e) => {if ((e.target as HTMLElement).classList.contains('overlay')) onOverlayClick(e);}}>
		<div className="py-8 px-6 bg-white rounded-2xl shadow">
			{children}
		</div>
	</div> : <></>
}