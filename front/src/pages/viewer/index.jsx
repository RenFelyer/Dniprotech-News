import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useFindArticleQuery } from "../../store";
import ViewerBtn from "./components/ViewerBtn";

const Viewer = () => {
	const { id } = useParams();
	const { data, isError } = useFindArticleQuery(id)
	const date = useMemo(() => {
		const date = new Date(data?.created)
		return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
		// eslint-disable-next-line
	}, [data]);
	return isError ? (
		<Navigate to={'/0'} />
	) : (
		<div className="flex flex-col md:p-8 p-4 md:w-[780px] w-full mx-auto">
			<div className="md:px-8 text-center">
				<p className="font-bold text-xl" children={data?.title} />
				<p className="my-3" children={data?.description} />
			</div>

			<img className="mb-3" src={data?.picture} alt="" />
			<div className="ndent-4 mt-4 text-justify" children={data?.content} />

			<div className="flex gap-2 text-accent select-none">
				{data?.tags?.map((value) => <ViewerBtn key={value.id} value={value} />)}
			</div>

			<div className="flex flex-col w-full items-end mt-5 text-text/50 ">
				<p>Опубліковано: <time dateTime={data?.created}>{date}</time></p>
				<p>Переглядів: {data?.viewed}</p>
			</div>
			<Link className="mt-7 mb-4 mx-auto underline text-accent" to={"/"} children={"На головну"} />
		</div>
	);
}

export default Viewer;