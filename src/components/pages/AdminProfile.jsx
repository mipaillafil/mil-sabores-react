// components/AdminProfile.js
import React, { useState, useEffect } from 'react';

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingReviews: 0,
    pendingOrders: 0,
    todayRecipes: 0,
    revenue: 0
  });

  // Datos de ejemplo
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Simular carga de datos
    setRecipes([
      { id: 1, name: "Paella Valenciana", author: "Juan Pérez", status: "aprobado", date: "2024-01-15", category: "Platos Principales" },
      { id: 2, name: "Tacos al Pastor", author: "María García", status: "pendiente", date: "2024-01-16", category: "Platos Principales" },
      { id: 3, name: "Sushi Casero", author: "Carlos López", status: "rechazado", date: "2024-01-14", category: "Internacional" }
    ]);

    setUsers([
      { id: 1, name: "Ana Martínez", email: "ana@email.com", joinDate: "2024-01-10", status: "activo", role: "user", recipes: 5 },
      { id: 2, name: "Luis Rodríguez", email: "luis@email.com", joinDate: "2024-01-12", status: "activo", role: "user", recipes: 3 },
      { id: 3, name: "Chef Profesional", email: "chef@email.com", joinDate: "2024-01-08", status: "activo", role: "vendedor", recipes: 0}
    ]);

    setOrders([
      { id: 1001, customer: "María González", date: "2024-01-16", status: "pendiente", total: 45.50, items: 3 },
      { id: 1002, customer: "Carlos Ruiz", date: "2024-01-15", status: "completado", total: 120.75, items: 5 },
      { id: 1003, customer: "Ana Torres", date: "2024-01-16", status: "procesando", total: 89.99, items: 2 }
    ]);

    setProducts([
      { id: 1, name: "Kit de Especias Premium", category: "Utensilios", price: 29.99, stock: 45, status: "active" },
      { id: 2, name: "Libro de Recetas Tradicionales", category: "Libros", price: 24.99, stock: 12, status: "active" },
      { id: 3, name: "Aceite de Oliva Extra Virgen", category: "Ingredientes", price: 15.99, stock: 0, status: "out-of-stock" }
    ]);

    setStats({
      totalRecipes: 156,
      totalUsers: 89,
      totalOrders: 234,
      totalProducts: 45,
      pendingReviews: 5,
      pendingOrders: 8,
      todayRecipes: 12,
      revenue: 12560.75
    });
  };

  // Funciones para gestionar recetas
  const handleApproveRecipe = (recipeId) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === recipeId ? { ...recipe, status: 'approved' } : recipe
    ));
  };

  const handleRejectRecipe = (recipeId) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === recipeId ? { ...recipe, status: 'rejected' } : recipe
    ));
  };

  // Funciones para gestionar usuarios
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  // Funciones para gestionar pedidos
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Funciones para gestionar productos
  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const handleUpdateProduct = (productId, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, ...updatedProduct } : product
    ));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="admin-profile">
      <div className="admin-header">
        <h1>Panel de Administración - Mil Sabores</h1>
        <div className="admin-stats">
          <div className="stat-card primary">
            <h3>Total Recetas</h3>
            <p className="stat-number">{stats.totalRecipes}</p>
            <span className="stat-change">+{stats.todayRecipes} hoy</span>
          </div>
          <div className="stat-card secondary">
            <h3>Usuarios Registrados</h3>
            <p className="stat-number">{stats.totalUsers}</p>
            <span className="stat-change">+12 este mes</span>
          </div>
          <div className="stat-card accent">
            <h3>Pedidos Totales</h3>
            <p className="stat-number">{stats.totalOrders}</p>
            <span className="stat-change">{stats.pendingOrders} pendientes</span>
          </div>
          <div className="stat-card success">
            <h3>Productos</h3>
            <p className="stat-number">{stats.totalProducts}</p>
            <span className="stat-change">En stock</span>
          </div>
          <div className="stat-card revenue">
            <h3>Ingresos</h3>
            <p className="stat-number">${stats.revenue.toLocaleString()}</p>
            <span className="stat-change">Total</span>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          <button 
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`tab-button ${activeTab === 'recipes' ? 'active' : ''}`}
            onClick={() => setActiveTab('recipes')}
          >
            📝 Gestión de Recetas
          </button>
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Gestión de Usuarios
          </button>
          <button 
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            🛒 Gestión de Pedidos
          </button>
          <button 
            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Gestión de Productos
          </button>
          <button 
            className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            🏷️ Categorías
          </button>
        </div>

        <div className="admin-main">
          {activeTab === 'dashboard' && <DashboardTab stats={stats} />}
          {activeTab === 'recipes' && (
            <RecipesTab 
              recipes={recipes} 
              onApprove={handleApproveRecipe}
              onReject={handleRejectRecipe}
            />
          )}
          {activeTab === 'users' && (
            <UsersTab 
              users={users} 
              onDelete={handleDeleteUser}
              onUpdateRole={handleUpdateUserRole}
            />
          )}
          {activeTab === 'orders' && (
            <OrdersTab 
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          )}
          {activeTab === 'products' && (
            <ProductsTab 
              products={products}
              onAdd={handleAddProduct}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
            />
          )}
          {activeTab === 'categories' && <CategoriesTab />}
        </div>
      </div>
    </div>
  );
};

// Componente Dashboard
const DashboardTab = ({ stats }) => (
  <div className="tab-content">
    <h2>Resumen General</h2>
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h3>📈 Actividad Reciente</h3>
        <ul className="activity-list">
          <li>✅ Nuevo pedido #1004 - $75.50</li>
          <li>👤 Usuario registrado: Pedro Sánchez</li>
          <li>📝 Receta aprobada: "Brownies de Chocolate"</li>
          <li>🛒 Producto agotado: "Aceite de Oliva"</li>
          <li>⭐ Nueva reseña: "Excelente receta de paella"</li>
        </ul>
      </div>
      <div className="dashboard-card">
        <h3>📊 Métricas Clave</h3>
        <div className="metrics">
          <div className="metric-item">
            <span>Tasa de conversión:</span>
            <strong>3.2%</strong>
          </div>
          <div className="metric-item">
            <span>Recetas por usuario:</span>
            <strong>1.8</strong>
          </div>
          <div className="metric-item">
            <span>Ticket promedio:</span>
            <strong>$53.75</strong>
          </div>
          <div className="metric-item">
            <span>Satisfacción:</span>
            <strong>4.7/5</strong>
          </div>
        </div>
      </div>
      <div className="dashboard-card">
        <h3>🚨 Alertas y Pendientes</h3>
        <div className="alerts">
          <div className="alert-item warning">
            <strong>5 recetas pendientes de revisión</strong>
          </div>
          <div className="alert-item info">
            <strong>8 pedidos pendientes de procesar</strong>
          </div>
          <div className="alert-item error">
            <strong>3 productos agotados</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Componente Gestión de Pedidos
const OrdersTab = ({ orders, onUpdateStatus }) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pendiente': return 'warning';
      case 'procesando': return 'info';
      case 'completado': return 'success';
      case 'cancelado': return 'error';
      default: return 'pendiente';
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Gestión de Pedidos</h2>
        <div className="filter-controls">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="processing">En proceso</option>
            <option value="completed">Completados</option>
            <option value="cancelled">Cancelados</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Items</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.items}</td>
                <td>${order.total}</td>
                <td>
                  <span className={`status-badge status-${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="actions">
                  <select 
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="processing">En proceso</option>
                    <option value="completed">Completado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                  <button className="btn-view">Detalles</button>
                  <button className="btn-edit">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente Gestión de Productos
const ProductsTab = ({ products, onAdd, onUpdate, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: 'active'
    });
    setNewProduct({ name: '', category: '', price: '', stock: '' });
    setShowAddForm(false);
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Gestión de Productos</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          + Agregar Producto
        </button>
      </div>

      {showAddForm && (
        <div className="add-form">
          <h3>Agregar Nuevo Producto</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Categoría"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="number"
                placeholder="Precio"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-success">Guardar</button>
              <button type="button" onClick={() => setShowAddForm(false)}>Cancelar</button>
            </div>
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
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status-badge status-${product.stock > 0 ? 'active' : 'rejected'}`}>
                    {product.stock > 0 ? 'En stock' : 'Agotado'}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn-edit">Editar</button>
                  <button className="btn-view">Ver</button>
                  <button 
                    className="btn-delete"
                    onClick={() => onDelete(product.id)}
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

// UsersTab actualizado
const UsersTab = ({ users, onDelete, onUpdateRole }) => (
  <div className="tab-content">
    <h2>Gestión de Usuarios</h2>
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha Registro</th>
            <th>Rol</th>
            <th>Recetas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.joinDate}</td>
              <td>
                <select 
                  value={user.role}
                  onChange={(e) => onUpdateRole(user.id, e.target.value)}
                  className="role-select"
                >
                  <option value="user">Usuario</option>
                  <option value="chef">Chef</option>
                  <option value="moderator">Moderador</option>
                  <option value="admin">Administrador</option>
                </select>
              </td>
              <td>{user.recipes}</td>
              <td>
                <span className="status-badge status-active">
                  {user.status}
                </span>
              </td>
              <td className="actions">
                <button className="btn-edit">Editar</button>
                <button 
                  className="btn-delete"
                  onClick={() => onDelete(user.id)}
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
// Componente para Gestión de Recetas
const RecipesTab = ({ recipes, onApprove, onReject }) => (
  <div className="tab-content">
    <h2>Gestión de Recetas</h2>
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Autor</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.name}</td>
              <td>{recipe.author}</td>
              <td>{recipe.date}</td>
              <td>
                <span className={`status-badge status-${recipe.status}`}>
                  {recipe.status}
                </span>
              </td>
              <td className="actions">
                {recipe.status === 'pending' && (
                  <>
                    <button 
                      className="btn-approve"
                      onClick={() => onApprove(recipe.id)}
                    >
                      Aprobar
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => onReject(recipe.id)}
                    >
                      Rechazar
                    </button>
                  </>
                )}
                <button className="btn-view">Ver</button>
                <button className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
// Componente para Gestión de Categorías
const CategoriesTab = () => (
  <div className="tab-content">
    <h2>Gestión de Categorías</h2>
    <div className="categories-management">
      <div className="add-category-form">
        <h3>Agregar Nueva Categoría</h3>
        <input type="text" placeholder="Nombre de categoría" />
        <button className="btn-primary">Agregar</button>
      </div>
      <div className="categories-list">
        <h3>Categorías Existentes</h3>
        <ul>
          <li>Postres <button className="btn-edit">Editar</button></li>
          <li>Platos Principales <button className="btn-edit">Editar</button></li>
          <li>Ensaladas <button className="btn-edit">Editar</button></li>
          <li>Bebidas <button className="btn-edit">Editar</button></li>
        </ul>
      </div>
    </div>
  </div>
);
export default AdminProfile;