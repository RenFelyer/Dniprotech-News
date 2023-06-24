import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { useSearchArticlesQuery } from "../../../store";
import Search from "../components/Search";
import Articles from "./Articles";

const Content = () => {
	const { page } = useParams();
	const { content, tag } = useSelector(store => store.search)
	const { data = [], isLoading } = useSearchArticlesQuery({ content, page, tag });

	return (isLoading && data.length === 0 && page > 0) ? (
		<Navigate to={`/${Number(page) - 1}`} />
	) : (
		<div className="flex flex-col grow md:pl-7 md:pt-7">
			<Search />
			<h1 className="text-black font-bold md:ml-0 ml-3 my-3">
				Знайдені публікації
				{content.length > 0 && `за запитом: '${content}'`}
				{content.length && tag.length > 0 ? ` та ` : ' '}
				{tag.length > 0 && `за тегом: '${tag}'`}
			</h1>
			<Articles articles={data} />
			<div className="flex justify-center gap-2 text-xl my-5">
				{page >= 1 && <Link className="bg-lights/40 hover:text-dark py-1 px-2" to={`/${Number(page) - 1}`}>назад</Link>}
				<h1 className="p-1 select-none">{page}</h1>
				{data.length === 6 && <Link className="bg-lights/40 hover:text-dark py-1 px-2" to={`/${Number(page) + 1}`}>вперёд</Link>}
			</div>
		</div>
	)
}

export default Content;