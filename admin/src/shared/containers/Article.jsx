import { useState } from "react";
import ArticleEntity from "../entities/ArticleEntity";
import Tags from "./Tags";

const Article = ({ article = ArticleEntity, handlerSubmit }) => {
	const [image, setImage] = useState();

	const onSubmit = async (event) => {
		event.preventDefault();
		const title = event.target.title.value;
		const description = event.target.description.value;
		const content = event.target.content.value;
		const picture = event.target.picture.files[0];

		if (title && description && content) {
			const data = new FormData();
			data.append('title', title)
			data.append('description', description)
			data.append('content', content)
			picture && data.append('picture', picture)
			handlerSubmit(data);
		}
	}

	return (
		<form className="flex flex-col gap-2 md:w-2/3 h-full" onSubmit={onSubmit}>
			<input
				className="h-12 p-1 border-[8px] border-lights outline-none"
				defaultValue={article?.title}
				placeholder="Заголовок статті..."
				name="title"
				type="text"
			/>

			<textarea
				className="min-h-[112px] px-1 resize-none border-[8px] border-lights outline-none"
				defaultValue={article?.description}
				placeholder="Опис статті..."
				name="description"
				maxLength={255} />

			<label>
				<img className="bg-black h-48 mx-auto" src={image ? image : article.picture} alt="" />
				<input
					src={image ? image : article.picture}
					onChange={e => setImage(URL.createObjectURL(e.target.files[0]))}
					className="hidden"
					name='picture'
					type="file" />
			</label>

			<textarea
				className="h-full px-1 border-[8px] border-lights outline-none resize-none"
				defaultValue={article?.content}
				placeholder="Головний контент статті..."
				name="content" />

			<Tags />

			<button className="bg-lights hover:bg-info/20 py-1">Зберегти</button>
		</form>
	);
}

export default Article;