import React from "react";

export const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const url = import.meta.env.VITE_BACKEND_URL + "/login";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data[0]);

                if (data[0].access_token) {
                    // Guarda el token en localStorage
                    localStorage.setItem("token", data[0].access_token);
                    // Redirige o muestra mensaje de éxito
                    alert("Login exitoso");
                } else {
                    alert(data.error || "Credenciales incorrectas");
                }
            })
            .catch(() => {
                alert("Error al conectar con el servidor");
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form className="p-4 border rounded shadow bg-white" style={{ minWidth: 320 }} onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">Iniciar Sesión</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;