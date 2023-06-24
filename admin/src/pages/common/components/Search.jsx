import { ReactComponent as Logo } from "../../../assets/Search.svg";

const Search = ({ handlerSubmit }) => {

	const onSubmit = event => {
		console.log(event.target.search.value)
		handlerSubmit(event.target.search.value);
		event.preventDefault();
	}

	return (
		<form
			className="w-full relative border-[8px] border-r-0 border-lights"
			onSubmit={onSubmit}>
			<input
				className="w-full bg-transparent p-1 pl-2 outline-none bg-white"
				name="search"
				maxLength="255"
				type="text"
				placeholder="Знайти..."
			/>
			<button
				className="absolute right-1 top-1 h-6 self-center pr-2"
				type="submit"
				children={<Logo />}
			/>
		</form>
	);
}

export default Search;