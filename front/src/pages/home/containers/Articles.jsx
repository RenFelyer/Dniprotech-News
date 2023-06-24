import CardPosted from "../components/CardPosted";

const Articles = ({ articles = [] }) => {
	return (
		<div className="flex flex-wrap items-stretch justify-left gap-5">
			{articles.map((value) => <CardPosted key={value.id} article={value} />)}
		</div>
	);
}

export default Articles;