import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import "./AdminProfile.css";

// API real
import {
  getAdminProducts,
  getAdminUsers,
  createProduct,
  updateProduct
} from "../../services/api";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState({
    totalOrders: 5,
    totalUsers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    monthlyRevenue: 2500000,
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
        status: p.activo ? "activo" : "inactivo"
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
              <th>Acciones</th>
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
                <td>
                  <button
                    className="btn-warning"
                    onClick={() => onHide(p.id)}
                  >
                    Ocultar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => onDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
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

const OrdersTab = ({ orders, onUpdateStatus }) => {
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "warning";
      case "processing": return "info";
      case "ready": return "primary";
      case "completed": return "success";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>🛒 Gestión de Pedidos</h2>

        <div className="filter-controls">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="processing">En preparación</option>
            <option value="ready">Listo para entrega</option>
            <option value="completed">Completados</option>
            <option value="cancelled">Cancelados</option>
          </select>
        </div>
      </div>

      {/* MISMO ESTILO DE TABLAS QUE PRODUCTOS Y USUARIOS */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Personalización</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>

                <td>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item-detail">
                        {item.quantity}x {item.product}
                      </div>
                    ))}
                  </div>
                </td>

                <td>{order.customization || "Sin personalización"}</td>

                <td>${order.total.toLocaleString("es-CL")}</td>

                <td>
                  <span className={`status-badge status-${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="processing">En preparación</option>
                    <option value="ready">Listo para entrega</option>
                    <option value="completed">Completado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>

                  <button className="btn-view">Ver Detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



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

// Componente Sistema de Descuentos
const DiscountsTab = ({ users }) => {
  const seniorUsers = users.filter(user => user.age > 50);
  const studentUsers = users.filter(user => user.email.includes('duocuc.cl'));
  const codeUsers = users.filter(user => user.discount && user.discount.includes('10%'));

  return (
    <div className="tab-content">
      <h2>🎫 Sistema de Descuentos</h2>
      
      <div className="discounts-grid">
        <div className="discount-card">
          <h3>👴 Descuento 50% Mayores de 50 años</h3>
          <div className="discount-stats">
            <span className="stat-number">{seniorUsers.length}</span>
            <span className="stat-label">Usuarios beneficiados</span>
          </div>
          <div className="discount-actions">
            <button className="btn-primary">Gestionar Descuento</button>
          </div>
        </div>

        <div className="discount-card">
          <h3>🎓 Torta Gratis Estudiantes Duoc</h3>
          <div className="discount-stats">
            <span className="stat-number">{studentUsers.length}</span>
            <span className="stat-label">Estudiantes registrados</span>
          </div>
          <div className="discount-info">
            <p>Correos institucionales: @duocuc.cl</p>
            <p>Torta gratis en su cumpleaños</p>
          </div>
        </div>

        <div className="discount-card">
          <h3>🎂 10% Descuento Código FELICES50</h3>
          <div className="discount-stats">
            <span className="stat-number">{codeUsers.length}</span>
            <span className="stat-label">Usuarios registrados</span>
          </div>
          <div className="discount-info">
            <p>Descuento de por vida</p>
            <p>Código promocional activo</p>
          </div>
        </div>
      </div>

      <div className="discounts-management">
        <h3>Configuración de Descuentos</h3>
        <div className="config-form">
          <div className="config-item">
            <label>Edad mínima descuento adulto mayor:</label>
            <input type="number" defaultValue="50" />
          </div>
          <div className="config-item">
            <label>Porcentaje descuento adultos mayores:</label>
            <input type="number" defaultValue="50" />%
          </div>
          <div className="config-item">
            <label>Dominios de correo estudiantil:</label>
            <input type="text" defaultValue="duocuc.cl" />
          </div>
          <button className="btn-success">Guardar Configuración</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;