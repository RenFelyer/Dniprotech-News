import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTag } from "../../../store";

const ViewerBtn = ({ value }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handlerClick = () => {
		dispatch(setTag(value.content));
		navigate('/0');
	}

	return <div
		className="cursor-pointer"
		children={'#' + value.content}
		onClick={handlerClick}
	/>;
}

export default ViewerBtn;