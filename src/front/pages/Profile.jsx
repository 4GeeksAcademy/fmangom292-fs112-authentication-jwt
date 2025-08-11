import React from "react";
import { useEffect } from "react";

useEffect(() => {
    const fetchProfile = async () => {
        const url = import.meta.env.VITE_BACKEND_URL + "/profile";
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                document.getElementById("email").value = data.email || "";
                document.getElementById("name").value = data.name || "";
                document.getElementById("surname").value = data.surname || "";
                document.getElementById("address").value = data.address || "";
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };
    fetchProfile();
}, []);



export const Profile = () => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Perfil de Usuario</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo" />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" />
                </div>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="surname" placeholder="Ingresa tu apellido" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="address" placeholder="Ingresa tu dirección" />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
};

export default Profile;