import { Link } from "react-router-dom";


export default function Navigation() {
	return (
		<>
			<Link to={'/login'}>login</Link>
			<Link to={'/'}>home</Link>
		</>
	)
}
