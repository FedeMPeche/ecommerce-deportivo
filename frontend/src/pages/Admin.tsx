import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import { getToken } from "../utils/authService";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  stock: number;
}

const Admin = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/productos", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setProductos(res.data);
    } catch (err) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleCreate = () => {
    setEditingProducto(null);
    setShowForm(true);
  };

  const handleEdit = (producto: Producto) => {
    setEditingProducto(producto);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que querés borrar este producto?")) return;
    try {
      await axios.delete(`/api/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      fetchProductos();
    } catch {
      alert("Error al borrar producto");
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      if (editingProducto) {
        await axios.put(`/api/productos/${editingProducto.id}`, formData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("/api/productos", formData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setShowForm(false);
      fetchProductos();
    } catch {
      alert("Error al guardar producto");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <h1>Administración de Productos</h1>
      <button onClick={handleCreate}>Nuevo Producto</button>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && productos.length === 0 && (
        <p>No hay productos.</p>
      )}

      {!loading && !error && productos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>${p.precio.toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Editar</button>
                  <button onClick={() => handleDelete(p.id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <ProductForm
          initialValues={editingProducto || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          submitLabel={editingProducto ? "Actualizar" : "Crear"}
        />
      )}
    </div>
  );
};

export default Admin;
