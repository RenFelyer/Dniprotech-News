import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Common from "./pages/common";
import Home from "./pages/home";
import Viewer from "./pages/viewer";

export default createBrowserRouter(createRoutesFromElements(
	<Route element={<Common />}>
		<Route path="/:page" element={<Home />} />
		<Route path="/v/:id" element={<Viewer />} />
		<Route index element={<Navigate to="/0" />} />
	</Route>
));