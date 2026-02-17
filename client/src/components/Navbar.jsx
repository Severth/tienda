import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mb-4 py-3">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <i className="bi bi-shop"></i> Tienda App
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="bi bi-box-seam me-1"></i> Productos
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto align-items-center">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-light me-3">
                                        <i className="bi bi-person-circle me-1"></i> Hola, {user.username}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-light btn-sm me-2" to="/create">
                                        <i className="bi bi-plus-lg me-1"></i> Nuevo
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-danger btn-sm">
                                        <i className="bi bi-box-arrow-right me-1"></i> Salir
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Entrar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary btn-sm ms-lg-2" to="/register">Registrarse</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
