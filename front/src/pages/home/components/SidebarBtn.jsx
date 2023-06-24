import { useDispatch } from "react-redux";
import { setTag } from "../../../store";

const SidebarBtn = ({ tag = {} }) => {
	const dispatch = useDispatch();

	const handlerClick = () => {
		dispatch(setTag(tag.content));
	}
	return (
		<div
			className="border-b border-balance/70 pb-1 select-none cursor-pointer"
			onClick={handlerClick}
		>
			<div className="text-text">#{tag?.content}</div>
			<div className="text-text/60">Переглядів: {tag?.viewed}</div>
		</div>
	);
}

export default SidebarBtn;