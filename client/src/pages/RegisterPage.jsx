import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await api.post('/auth/register', data);
            Swal.fire('¡Éxito!', 'Usuario creado correctamente, ya puedes iniciar sesión', 'success');
            navigate('/login');
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || 'Error al registrar usuario';
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
                        <h2 className="text-center fw-bold mb-4 text-primary">Crear Cuenta</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">NUEVO USUARIO</label>
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
                                {loading ? 'Registrando...' : 'Registrarme'}
                            </button>
                        </form>
                        <hr className="my-4" />
                        <p className="text-center mb-0 text-muted small">
                            ¿Ya tienes cuenta? <Link to="/login" className="text-primary fw-bold text-decoration-none">Inicia Sesión</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
