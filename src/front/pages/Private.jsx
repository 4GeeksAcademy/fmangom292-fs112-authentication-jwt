import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Esta es la parte privada de la aplicación, solo accesible después de logear</h1>
        </div>
    );
}; 