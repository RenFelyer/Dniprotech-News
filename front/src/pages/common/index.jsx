import { Outlet } from "react-router-dom";
import Header from "./containers/Header";
import Footer from "./containers/Footer";

const Common = () => (
	<>
		<Header />
		<div className="md:flex grow bg-lights/30 max-w-[1154px] w-full mx-auto">
			<Outlet />
		</div>
		<Footer />
	</>)
	;

export default Common;