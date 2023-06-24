import { Link } from "react-router-dom";

const CardLocked = ({ article }) => {
	return (
		<Link
			className="group/card bg-white/80 select-none rounded-t-lg p-2 cursor-pointer"
			to={`/v/${article.id}`}
		>
			<div className="flex flex-col justify-between w-[262px] h-full">
				<div className="grow overflow-hidden">
					<img className="rounded-t-lg mx-auto w-full object-cover pointer-events-none " src={article?.picture} alt="" />
				</div>
				<span>
					<h1 className="font-bold mt-2 break-words line-clamp-2 group-hover/card:underline" children={article?.title} />
					<p className="mt-1 break-words line-clamp-3" children={article?.description} />
				</span>
			</div>
		</Link>
	);
}

export default CardLocked;