import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TagEntity from "../../../shared/entities/TagEntity";
import { addTag, removeTag, useAddTagToArticleMutation, useDeleteTagMutation } from "../../../store";

const Tag = ({ value = TagEntity }) => {
	const [addTagToArticle] = useAddTagToArticleMutation();
	const [deleteTag] = useDeleteTagMutation();
	const dispatch = useDispatch();
	const { id } = useParams();

	const handlerDelete = () => {
		dispatch(removeTag(value));
		deleteTag(value.id);
	}
	const handlerAdd = () => {
		id && addTagToArticle({ articleId: id, tagId: value.id });
		dispatch(addTag(value));
	}

	return (
		<div className="flex justify-between">
			<button className="bg-lights hover:bg-info/20 text-black py-1 w-full" onClick={handlerAdd}>{value.content}</button>
			<button className="bg-lights hover:bg-info/20 text-black py-1 w-10" onClick={handlerDelete}>x</button>
		</div>
	);
}

export default Tag;