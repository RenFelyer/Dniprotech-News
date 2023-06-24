import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAllArticlesQuery } from "../../../store";
import Article from "../components/Article";
import Search from "../components/Search";

const Articles = () => {
	const { type } = useParams();
	const { data = [] } = useAllArticlesQuery();
	const [text, setText] = useState('');
	return type === 'articles' && (
		<div className="flex flex-col gap-2 h-full custom-scrollbar">
			<Search handlerSubmit={setText} />
			{
				data.filter((value) => value?.title?.includes(text) || value?.content?.includes(text) || value?.description?.includes(text))
					.map((value) => <Article key={value.id} article={value} />)
			}
		</div>
	);
}

export default Articles;