import { memo } from "react";
import { usePopularTagQuery } from "../../../store";
import SidebarBtn from "../components/SidebarBtn";

const Sidebar = () => {
	const { data = [] } = usePopularTagQuery(9);
	return (
		<div className="bg-lights min-w-[271px] pl-7 pb-7">
			<h1 className="text-black pt-7 pb-4 pr-5 font-bold">Найпопулярніші теми</h1>
			<div className="flex flex-col gap-2">
				{
					data.length > 0 && data.slice(3, 9).map((value) => <SidebarBtn key={value.id} tag={value} />)
				}
			</div>
		</div>
	);
}

export default memo(Sidebar);