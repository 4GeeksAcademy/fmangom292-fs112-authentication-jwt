import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

	const navigate = useNavigate();

	const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

	useEffect(() => {
		document.title = "React Boilerplate";
		localStorage.getItem("token") ? setIsLogged(true) : setIsLogged(false);
	}, []);

	function logout() {
		localStorage.removeItem("token");
		setIsLogged(false);
		navigate("/login");
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{
						isLogged ? (
							<Link to="/login" onClick={logout}>
								<button className="btn btn-primary">Cerrar Sesión</button>
							</Link>
						) : (
							<Link to="/login">
								<button className="btn btn-primary">Iniciar Sesión</button>
							</Link>
						)
					}

				</div>
			</div>
		</nav>
	);
};