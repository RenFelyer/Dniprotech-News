import { Link, useParams } from "react-router-dom"

const NewArticleBtn = () => {
	const { type, id } = useParams();
	return id && (<Link
		className="w-full bg-info/70 hover:bg-balance/70 text-white rounded-t-xl py-2 text-center self-center text-xl select-none"
		to={'/' + type}
		children="Створити нову публікацію" />)
}

export default NewArticleBtn;