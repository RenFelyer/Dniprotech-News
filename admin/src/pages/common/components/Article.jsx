import { useNavigate } from "react-router-dom";
import ArticleEntity from "../../../shared/entities/ArticleEntity";
import { useDeleteArticleMutation, useLockedArticleMutation } from "../../../store";

const Article = ({ article = ArticleEntity }) => {
	const [locked] = useLockedArticleMutation();
	const [delet] = useDeleteArticleMutation();
	const navigate = useNavigate();
	return (
		<article className="bg-lights rounded-l px-2 py-1">
			<header className="flex h-24 border-b border-dark select-none cursor-pointer" onClick={() => navigate(`/articles/${article.id}`)}>
				<img className="rounded-t border-t border-x border-dark pointer-events-none" src={article.picture} alt="" />
				<div className="h-full overflow-hidden ml-2">
					<h1 className="text-text text-xl line-clamp-1 font-bold">{article.title}</h1>
					<p className="text-accent text-justify leading-none line-clamp-4">{article.description}</p>
				</div>
			</header>
			<footer className="flex rounded-b overflow-hidden">
				<button
					className="w-full text-center hover:bg-info/20"
					onClick={() => article && locked(article.id)}
					children={article.locked ? 'Відкріпити' : 'Закріпити'}
				/>
				<button
					className="w-full text-center hover:bg-info/20"
					onClick={() => article && delet(article.id)}
					children={'Видалити'}
				/>
			</footer>
		</article>
	);
}

export default Article;