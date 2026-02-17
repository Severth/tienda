import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await login(data.username, data.password);
            Swal.fire('¡Bienvenido!', 'Sesión iniciada correctamente', 'success');
            navigate('/');
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || 'Credenciales incorrectas';
            Swal.fire('Error', message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-center fade-in mt-5">
            <div className="col-md-5 col-lg-4">
                <div className="card shadow-lg p-4">
                    <div className="card-body">
                        <h2 className="text-center fw-bold mb-4 text-primary">Iniciar Sesión</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">USUARIO</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                                    {...register('username', { required: 'El usuario es obligatorio' })}
                                />
                                <div className="invalid-feedback">{errors.username?.message}</div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted">CONTRASEÑA</label>
                                <input
                                    type="password"
                                    className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                    {...register('password', { required: 'La contraseña es obligatoria' })}
                                />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold" disabled={loading}>
                                {loading ? 'Entrando...' : 'Ingresar'}
                            </button>
                        </form>
                        <hr className="my-4" />
                        <p className="text-center mb-0 text-muted small">
                            ¿No tienes cuenta? <Link to="/register" className="text-primary fw-bold text-decoration-none">Regístrate</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
