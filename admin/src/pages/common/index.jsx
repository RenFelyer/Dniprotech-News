import { Provider } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";
import store from "../../store";
import Sidebar from "./components/Sidebar";

const Common = () => {
	return (
		<Provider store={store} >
			<ScrollRestoration />
			<Outlet />
			<Sidebar />
		</Provider>
	)
}

export default Common;