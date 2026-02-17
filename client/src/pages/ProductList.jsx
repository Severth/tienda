import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error loading products", error);
            Swal.fire('Error', 'No se pudieron cargar los productos. Asegúrate de que el backend esté corriendo.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (id, name) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar "${name}". No podrás revertir esto!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
                Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
            } catch (error) {
                console.error("Error deleting product", error);
                Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
            }
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    return (
        <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0 text-dark">📦 Productos</h2>
                <Link to="/create" className="btn btn-primary shadow-sm">
                    <i className="bi bi-plus-lg me-2"></i>Nuevo Producto
                </Link>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th className="text-end pe-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">
                                            No hay productos registrados. ¡Crea uno nuevo!
                                        </td>
                                    </tr>
                                ) : (
                                    products.map(product => (
                                        <tr key={product.id}>
                                            <td className="ps-4 fw-medium text-dark">{product.name}</td>
                                            <td className="text-muted">{product.description}</td>
                                            <td className="fw-bold text-success">${product.price.toFixed(2)}</td>
                                            <td>
                                                <span className={`badge ${product.stock > 0 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                    {product.stock > 0 ? `${product.stock} Unidades` : 'Agotado'}
                                                </span>
                                            </td>
                                            <td className="text-end pe-4">
                                                <Link to={`/edit/${product.id}`} className="btn btn-sm btn-outline-primary me-2">
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
