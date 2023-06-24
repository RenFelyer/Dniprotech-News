import { shallowEqual, useSelector } from "react-redux";
import Tag from "../components/Tag";

const Tags = () => {
	const { list } = useSelector(store => store.tag, shallowEqual);
	return (<div className="flex flex-wrap gap-2" children={list.map((value) => <Tag key={value.id} value={value} />)} />)
}

export default Tags