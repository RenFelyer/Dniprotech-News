import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/images/logo-header.svg";
import { useFindLockedQuery, usePopularTagQuery } from "../../../store";
import CardGreeting from "../components/CardGreeting";
import CardLocked from "../components/CardLocked";
import HeaderBtn from "../components/HeaderBtn";

const Header = () => {
	const locked = useFindLockedQuery();
	const tags = usePopularTagQuery(9);

	return (<header className="bg-no-repeat bg-cover bg-center bg-sliderBackground p-3">
		<div className="max-w-[1152px] mx-auto">
			<div className="md:flex justify-between w-full">
				<Link className="h-auto px-2 cursor-pointer" to="/0"><Logo /></Link>
				<div className="flex flex-col select-none md:flex-row gap-2 md:mt-0 mt-5">
					<HeaderBtn children={"Всі новини"} />
					{tags.data?.length > 0 && tags.data?.slice(0, 3).map((value) => <HeaderBtn tags={value.content} key={value.id} />)}
				</div>
			</div>
			<div className="flex gap-8 items-stretch custom-scrollbar mt-5 h-[370px]">
				<CardGreeting />
				{locked.data?.length > 0 && locked.data?.map((value) => <CardLocked key={value.id} article={value} />)}
			</div>
		</div>
	</header>);
}

export default Header;