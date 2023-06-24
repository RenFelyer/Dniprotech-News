import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "../../../assets/images/Search.svg";
import { setContent } from "../../../store";


const Search = () => {
	const { content } = useSelector(store => store.search, shallowEqual)
	const dispatch = useDispatch();

	const handlerSubmit = event => {
		dispatch(setContent(event.target.search.value));
		event.preventDefault();
	}

	return (
		<form
			className="flex flex-row relative border-[8px] border-lights"
			onSubmit={handlerSubmit}>
			<input
				className="grow bg-transparent p-1 pl-2 outline-none"
				name="search"
				maxLength="255"
				type="text"
				placeholder="Знайти публікацію..."
				defaultValue={content}
			/>
			<button
				className="right-1 top-1 h-6 self-center pr-2"
				type="submit"
				children={<Logo />}
			/>
		</form>
	);
}

export default Search;