import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Article from "../../shared/containers/Article";
import { setTag, useFindArticleQuery, useUpdateArticlesMutation } from "../../store";

const UpdateArticle = () => {
	const { id } = useParams();
	const [update] = useUpdateArticlesMutation();
	const { data, isError } = useFindArticleQuery(id);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTag(data?.tags || []));
		// eslint-disable-next-line
	}, [data]);

	return isError ? <Navigate to="/articles" /> : <Article article={data} handlerSubmit={body => update({ id, body })} />;
}

export default UpdateArticle;