import { useDispatch } from "react-redux";
import { removeTag, useDelTagInArticleMutation } from "../../store";
import { useParams } from "react-router-dom";

const Tag = ({ value = { id: 0, content: '' } }) => {
	const [delTagInArticle] = useDelTagInArticleMutation();
	const dispatch = useDispatch();
	const { id } = useParams();

	const handlerDelete = () => {
		dispatch(removeTag(value))
		delTagInArticle({ articleId: id, tagId: value.id });
	}
	const handlerAdd = event =>
		event.preventDefault();

	return (
		<div className="flex justify-between">
			<button className="bg-lights hover:bg-info/20 text-black py-1 w-full" onClick={handlerAdd}>{value.content}</button>
			<button className="bg-lights hover:bg-info/20 text-black py-1 w-10" onClick={handlerDelete}>x</button>
		</div>
	);
}

export default Tag;