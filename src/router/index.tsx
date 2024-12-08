import { createBrowserRouter } from "react-router-dom";
import Layout from "../shared/Layout";
import Home from "../pages/Home";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '',
				element: <Home/>
			},
			{
				path: '/login',
				element: <Home/>
			},
		]
	}
])

const publicRoutes = [
	'login'
]


export default router;