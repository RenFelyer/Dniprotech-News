import { Link } from "react-router-dom";


const CardPosted = ({ article }) => {
	const date = new Date();
	return (
		<Link
			className="group/card bg-lights/40 select-none md:rounded-b-none rounded-lg p-2 cursor-pointer lg:basis-[calc((100%-2.5rem)/3)] md:basis-[calc((100%-1.25rem)/2)] basis-[100%] overflow-hidden"
			to={`/v/${article.id}`}
		>
			<div className="w-full h-full flex flex-col justify-between">
				<div className="grow overflow-hidden">
					<img className="md:rounded-b-none rounded-lg pointer-events-none" src={article?.picture} alt="" />
				</div>
				<span>
					<h1 className="font-bold break-words line-clamp-2 group-hover/card:underline" children={article?.title} />
					<p className="break-words line-clamp-3" children={article?.description} />
					<div className="flex flex-col gap-3">
						<div className="flex flex-col w-full items-end text-text/50">
							<div>Опубліковано: <time dateTime={article?.created}>{date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()}</time></div>
							<div>Переглядів: {article?.viewed}</div>
						</div>
					</div>
				</span>
			</div>
		</Link>
	);
}

export default CardPosted;