import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";

// API real
import {
  getAdminProducts,
  getAdminUsers,
  createProduct,
  updateProduct
} from "../../api";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
    birthdayStudents: 0
  });

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getToken = () => {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    try {
      return JSON.parse(raw).token;
    } catch {
      return null;
    }
  };

  //CARGAR DATOS DESDE API REAL
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/Inicio-Sesion");
      return;
    }

    loadData(token);
  }, []);

  const loadData = async (token) => {
    try {
      // Categorías disponibles
      const categoriesData = [
        "Tortas Cuadradas",
        "Tortas Circulares",
        "Postres Individuales",
        "Productos Sin Azúcar",
        "Pastelería Tradicional",
        "Productos Sin Gluten",
        "Productos Vegana",
        "Tortas Especiales"
      ];
      setCategories(categoriesData);

      // Productos reales desde Spring
      const apiProducts = await getAdminProducts(token);

      const mappedProducts = apiProducts.map((p) => ({
        id: p.id,
        name: p.nombre,
        category: p.categoria,
        price: p.precio,
        stock: 10, // sin stock en API → valor temporal
        status: p.activo ? "active" : "inactive"
      }));

      setProducts(mappedProducts);

      // Usuarios reales
      const apiUsers = await getAdminUsers(token);

      const mappedUsers = apiUsers.map((u) => ({
        id: u.id,
        name: u.nombre,
        email: u.email,
        joinDate: u.fechaNacimiento,
        role: u.rol,
        status: "activo",
        discount: null
      }));

      setUsers(mappedUsers);

      // Stats automáticos
      setStats((prev) => ({
        ...prev,
        totalProducts: mappedProducts.length,
        totalUsers: mappedUsers.length
      }));
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  };

  const handleAddProduct = async (newProduct) => {
    const token = getToken();
    if (!token) {
      navigate("/Inicio-Sesion");
      return;
    }

    try {
      const created = await createProduct(newProduct, token);

      const mapped = {
        id: created.id,
        name: created.nombre,
        category: created.categoria,
        price: created.precio,
        stock: 10,
        status: created.activo ? "active" : "inactive"
      };

      setProducts((prev) => [...prev, mapped]);
      setStats((prev) => ({
        ...prev,
        totalProducts: prev.totalProducts + 1
      }));
    } catch (err) {
      alert("Error creando producto: " + err.message);
    }
  };

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const token = getToken();
    if (!token) {
      navigate("/Inicio-Sesion");
      return;
    }

    try {
      const updated = await updateProduct(productId, updatedProduct, token);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? {
                id: updated.id,
                name: updated.nombre,
                category: updated.categoria,
                price: updated.precio,
                stock: p.stock
              }
            : p
        )
      );
    } catch (err) {
      alert("Error actualizando producto: " + err.message);
    }
  };

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };


  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // UI
  return (
    <div className="admin-profile">
      <div className="admin-header">
        <h1>🍰 Panel de Administración</h1>

        <div className="admin-stats">
          <div className="stat-card primary">
            <h3>📦 Pedidos Totales</h3>
            <p className="stat-number">{stats.totalOrders}</p>
            <span className="stat-change">{stats.pendingOrders} pendientes</span>
          </div>

          <div className="stat-card secondary">
            <h3>👥 Usuarios Registrados</h3>
            <p className="stat-number">{stats.totalUsers}</p>
            <span className="stat-change">Usuarios en API</span>
          </div>

          <div className="stat-card accent">
            <h3>🍪 Productos</h3>
            <p className="stat-number">{stats.totalProducts}</p>
            <span className="stat-change">API conectada</span>
          </div>

          <div className="stat-card revenue">
            <h3>💰 Ingresos Mensuales</h3>
            <p className="stat-number">
              ${stats.monthlyRevenue.toLocaleString("es-CL")}
            </p>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {/* SIDEBAR */}
        <div className="admin-sidebar">
          <button className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
            📊 Dashboard
          </button>
          <button className={`tab-button ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}>
            🛒 Gestión de Pedidos
          </button>
          <button className={`tab-button ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>
            🍰 Gestión de Productos
          </button>
          <button className={`tab-button ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
            👥 Gestión de Usuarios
          </button>
          <button className={`tab-button ${activeTab === "categories" ? "active" : ""}`} onClick={() => setActiveTab("categories")}>
            🏷️ Categorías
          </button>
          <button className={`tab-button ${activeTab === "discounts" ? "active" : ""}`} onClick={() => setActiveTab("discounts")}>
            🎫 Sistema de Descuentos
          </button>
        </div>

        {/* BODY */}
        <div className="admin-main">
          {activeTab === "dashboard" && <DashboardTab stats={stats} orders={orders} />}
          {activeTab === "orders" && (
            <OrdersTab orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
          )}
          {activeTab === "products" && (
            <ProductsTab products={products} onUpdate={handleUpdateProduct} onAdd={handleAddProduct} />
          )}
          {activeTab === "users" && (
            <UsersTab users={users} onUpdateRole={handleUpdateUserRole} />
          )}
          {activeTab === "categories" && (
            <CategoriesTab categories={categories} products={products} />
          )}
          {activeTab === "discounts" && <DiscountsTab users={users} />}
        </div>
      </div>
    </div>
  );
};


const DashboardTab = ({ stats, orders }) => (
  <div className="tab-content">
    <h2>📊 Resumen General</h2>
    <p>Panel conectado a API.</p>
  </div>
);




// PRODUCTS — CONECTADO A API (POST + PUT)
const ProductsTab = ({ products, onUpdate, onAdd }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: ""
  });

  const categories = [
    "Tortas Cuadradas",
    "Tortas Circulares",
    "Postres Individuales",
    "Productos Sin Azúcar",
    "Pastelería Tradicional",
    "Productos Sin Gluten",
    "Productos Vegana",
    "Tortas Especiales"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      nombre: newProduct.name,
      categoria: newProduct.category,
      precio: Number(newProduct.price),
      activo: true
    });
    setNewProduct({ name: "", category: "", price: "", stock: "" });
    setShowAddForm(false);
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>🍰 Gestión de Productos</h2>
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          + Agregar Producto
        </button>
      </div>

      {showAddForm && (
        <div className="add-form">
          <h3>Agregar Nuevo Producto</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              required
            >
              <option value="">Categoría</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Precio"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
            <button className="btn-success">Guardar</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price.toLocaleString("es-CL")}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UsersTab = ({ users, onUpdateRole }) => (
  <div className="tab-content">
    <h2>👥 Gestión de Usuarios</h2>

    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Registro</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.joinDate}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => onUpdateRole(u.id, e.target.value)}
                >
                  <option value="USER">Cliente</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ================================================================================

const OrdersTab = ({ orders }) => (
  <div className="tab-content">
    <h2>🛒 Órdenes</h2>
    <p>No hay endpoint aún — podemos conectarlo después.</p>
  </div>
);

// ================================================================================

const CategoriesTab = ({ categories }) => (
  <div className="tab-content">
    <h2>🏷️ Categorías</h2>
    <ul>
      {categories.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  </div>
);

const DiscountsTab = () => (
  <div className="tab-content">
    <h2>🎫 Descuentos</h2>
    <p>Próximamente conectaremos descuentos reales.</p>
  </div>
);

export default AdminProfile;