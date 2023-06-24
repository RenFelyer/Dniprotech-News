import { Link, useParams } from "react-router-dom";

const Menu = () => {
	const { id } = useParams();
	return (
		<div className="flex gap-1 rounded-b-xl overflow-hidden">
			<Link
				to={'/articles' + (id ? ('/' + id) : '')}
				className="w-full bg-info/70 hover:bg-balance/70 text-white py-2 text-center self-center text-xl select-none"
				children="Статті" />
			<Link
				to={'/tags' + (id ? ('/' + id) : '')}
				className="w-full bg-info/70 hover:bg-balance/70 text-white py-2 text-center self-center text-xl select-none"
				children="Теги" />
		</div>
	);
}

export default Menu;