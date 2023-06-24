import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import CreateArticle from "./pages/create";
import UpdateArticle from "./pages/update";
import Common from "./pages/common";

export default createBrowserRouter(createRoutesFromElements(
	<Route element={<Common />}>
		<Route path="/:type" element={<CreateArticle />} />
		<Route path="/:type/:id" element={<UpdateArticle />} />
		<Route index element={<Navigate to="/articles" />} />
	</Route>
))