import { useNavigate, useParams } from "react-router-dom";
import Article from "../../shared/containers/Article";
import { useCreateArticlesMutation } from "../../store";

const CreateArticle = () => {
	const [create] = useCreateArticlesMutation();
	const navigate = useNavigate();
	const { type } = useParams();

	return (
		<Article handlerSubmit={(body) => {
			create(body).unwrap()
				.then(value => navigate(`/${type}/${value.id}`))
				.catch(console.log);
		}} />
	);
}

export default CreateArticle;