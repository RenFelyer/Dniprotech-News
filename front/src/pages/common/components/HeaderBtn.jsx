import { useDispatch } from "react-redux";
import { setTag } from "../../../store";

const HeaderBtn = ({ children, tags = '' }) => {
	const dispatch = useDispatch();

	const handlerClick = () => {
		dispatch(setTag(tags));
	}

	return (
		<div
			onClick={handlerClick}
			className="text-lights bg-info/70 hover:text-dark hover:bg-balance/70 transition-[500ms] md:rounded-b-none rounded-md p-2 cursor-pointer"
			children={tags.length > 0 ? tags : children}
		/>
	);
}

export default HeaderBtn;