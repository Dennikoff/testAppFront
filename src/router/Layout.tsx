import { Outlet } from "react-router-dom";
import Navigation from "@/shared/Navigation/Navigation";

export default function Layout() {
	return (
		<div>
			<Navigation/>
			<Outlet/>
		</div>
	)
}