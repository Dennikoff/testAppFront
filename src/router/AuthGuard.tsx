import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function AuthGuard({ children }: { children: ReactNode }) {
	const navigate = useNavigate();
	const location = useLocation();


	useEffect(() => {
		console.log(location.pathname);
	}, [navigate, location.pathname]);

	return (
		<>
			{children}
		</>
	)
}
