import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
    description: yup.string().max(200, 'Máximo 200 caracteres'),
    price: yup.number().typeError('El precio debe ser un número').positive('Debe ser positivo').required('El precio es obligatorio'),
    stock: yup.number().typeError('El stock debe ser un número').integer('Debe ser entero').min(0, 'No puede ser negativo').required('El stock es obligatorio'),
});

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (isEditMode) {
            const loadProduct = async () => {
                try {
                    const response = await api.get(`/products/${id}`);
                    const { name, description, price, stock } = response.data;
                    setValue('name', name);
                    setValue('description', description);
                    setValue('price', price);
                    setValue('stock', stock);
                } catch (error) {
                    Swal.fire('Error', 'No se pudo cargar el producto', 'error');
                    navigate('/');
                }
            };
            loadProduct();
        }
    }, [id, isEditMode, setValue, navigate]);

    const onSubmit = async (data) => {
        try {
            if (isEditMode) {
                await api.put(`/products/${id}`, { id: parseInt(id), ...data });
                Swal.fire('Actualizado!', 'Producto actualizado correctamente', 'success');
            } else {
                await api.post('/products', data);
                Swal.fire('Creado!', 'Producto creado correctamente', 'success');
            }
            navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Hubo un problema al guardar el producto', 'error');
        }
    };

    return (
        <div className="row justify-content-center fade-in">
            <div className="col-md-8 col-lg-6">
                <div className="card shadow-lg p-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="card-title fw-bold mb-0 text-primary">
                                {isEditMode ? '✏️ Editar Producto' : '✨ Nuevo Producto'}
                            </h2>
                            <Link to="/" className="btn btn-outline-secondary btn-sm">
                                Cancelar
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label fw-bold small text-uppercase text-muted">Nombre del Producto</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Ej. Laptop Gamer"
                                    {...register('name')}
                                />
                                <div className="invalid-feedback">{errors.name?.message}</div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold small text-uppercase text-muted">Descripción</label>
                                <textarea
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    rows="3"
                                    placeholder="Breve descripción del producto..."
                                    {...register('description')}
                                ></textarea>
                                <div className="invalid-feedback">{errors.description?.message}</div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold small text-uppercase text-muted">Precio ($)</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">$</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className={`form-control form-control-lg border-start-0 ${errors.price ? 'is-invalid' : ''}`}
                                            placeholder="0.00"
                                            {...register('price')}
                                        />
                                        <div className="invalid-feedback">{errors.price?.message}</div>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold small text-uppercase text-muted">Stock</label>
                                    <input
                                        type="number"
                                        className={`form-control form-control-lg ${errors.stock ? 'is-invalid' : ''}`}
                                        placeholder="0"
                                        {...register('stock')}
                                    />
                                    <div className="invalid-feedback">{errors.stock?.message}</div>
                                </div>
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <button type="submit" className="btn btn-primary btn-lg fw-bold" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Guardando...</span>
                                    ) : (
                                        isEditMode ? 'Actualizar Producto' : 'Guardar Producto'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
