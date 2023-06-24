import { useParams } from "react-router-dom";
import { useAllTagQuery, useCreateTagMutation } from "../../../store";
import Tag from "../components/Tag";
import Search from "../components/Search";
import { useState } from "react";

const Tags = () => {
	const { type } = useParams();
	const { data = [] } = useAllTagQuery();
	const [create] = useCreateTagMutation();

	const [text, setText] = useState('');

	return type === 'tags' && (
		<div className="flex flex-col gap-2 h-full custom-scrollbar">
			<Search handlerSubmit={text => {
				if (data.filter((value) => value.content.startsWith(text)).length === 0)
					create(text)
				setText(text);
			}} />
			{data.filter((value) => value.content.startsWith(text)).map((value) => <Tag key={value.id} value={value} />)}
		</div>
	);
}

export default Tags;