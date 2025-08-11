import React from "react";

export const Signup = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);

        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const surname = e.target.surname.value;
        const address = e.target.address.value;
        const url = import.meta.env.VITE_BACKEND_URL + "/signup";
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name, surname, address }),
            });
            console.log("Response:", res);

            if (!res.ok) {
                alert("Error en el registro");
                return;
            }
            alert("Registro exitoso");
        } catch (err) {
            alert("Error de conexión");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form className="p-4 border rounded shadow bg-white" style={{ minWidth: 320 }} onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">Registro de usuario</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" placeholder="Contrañesa" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" placeholder="Indique su name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="surname" placeholder="Indique su surname" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="address" placeholder="Indique su address" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
        </div>
    );
};

export default Signup;