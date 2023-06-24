import Articles from "../containers/Articles";
import Tags from "../containers/Tags";
import Menu from "./Menu";
import NewArticleBtn from "./NewArticleBtn";

const Sidebar = () => {
	return (
		<div className="flex flex-col gap-2 md:w-1/3 h-full">
			<Menu />
			<NewArticleBtn />
			<Articles />
			<Tags />
		</div>
	)
}

export default Sidebar;