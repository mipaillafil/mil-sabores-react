// components/AdminProfile.js
import React, { useState, useEffect } from 'react';
import './AdminProfile.css';

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
    birthdayStudents: 0
  });

  // Datos específicos para Pastelería Mil Sabores
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Categorías según el documento
    const categoriesData = [
      'Tortas Cuadradas', 'Tortas Circulares', 'Postres Individuales',
      'Productos Sin Azúcar', 'Pastelería Tradicional', 'Productos Sin Gluten',
      'Productos Vegana', 'Tortas Especiales'
    ];
    setCategories(categoriesData);

    // Productos según la tabla del documento
    const productsData = [
      { id: 'TC001', name: 'Torta Cuadrada de Chocolate', category: 'Tortas Cuadradas', price: 45000, stock: 15, status: 'active' },
      { id: 'TC002', name: 'Torta Cuadrada de Frutas', category: 'Tortas Cuadradas', price: 50000, stock: 12, status: 'active' },
      { id: 'TT001', name: 'Torta Circular de Vainilla', category: 'Tortas Circulares', price: 40000, stock: 8, status: 'active' },
      { id: 'TT002', name: 'Torta Circular de Manjar', category: 'Tortas Circulares', price: 42000, stock: 10, status: 'active' },
      { id: 'PI001', name: 'Mousse de Chocolate', category: 'Postres Individuales', price: 5000, stock: 50, status: 'active' },
      { id: 'PI002', name: 'Tiramisú Clásico', category: 'Postres Individuales', price: 5500, stock: 45, status: 'active' },
      { id: 'PSA001', name: 'Torta Sin Azúcar de Naranja', category: 'Productos Sin Azúcar', price: 48000, stock: 6, status: 'active' },
      { id: 'PSA002', name: 'Cheesecake Sin Azúcar', category: 'Productos Sin Azúcar', price: 47000, stock: 7, status: 'active' },
      { id: 'PT001', name: 'Empanada de Manzana', category: 'Pastelería Tradicional', price: 3000, stock: 100, status: 'active' },
      { id: 'PT002', name: 'Tarta de Santiago', category: 'Pastelería Tradicional', price: 6000, stock: 30, status: 'active' },
      { id: 'PG001', name: 'Brownie Sin Gluten', category: 'Productos Sin Gluten', price: 4000, stock: 40, status: 'active' },
      { id: 'PG002', name: 'Pan Sin Gluten', category: 'Productos Sin Gluten', price: 3500, stock: 25, status: 'active' },
      { id: 'PV001', name: 'Torta Vegana de Chocolate', category: 'Productos Vegana', price: 50000, stock: 5, status: 'active' },
      { id: 'PV002', name: 'Galletas Veganas de Avena', category: 'Productos Vegana', price: 4500, stock: 60, status: 'active' },
      { id: 'TE001', name: 'Torta Especial de Cumpleaños', category: 'Tortas Especiales', price: 55000, stock: 8, status: 'active' },
      { id: 'TE002', name: 'Torta Especial de Boda', category: 'Tortas Especiales', price: 60000, stock: 3, status: 'active' }
    ];
    setProducts(productsData);

    // Usuarios con descuentos especiales
    const usersData = [
      { 
        id: 1, 
        name: 'Ana Martínez', 
        email: 'ana.martinez@duocuc.cl', 
        joinDate: '2024-01-10', 
        status: 'activo', 
        role: 'student',
        birthday: '2024-03-15',
        discount: 'Torta gratis en cumpleaños'
      },
      { 
        id: 2, 
        name: 'Carlos López', 
        email: 'carlos@email.com', 
        joinDate: '2024-01-12', 
        status: 'activo', 
        role: 'customer',
        age: 55,
        discount: '50% (Mayor de 50 años)'
      },
      { 
        id: 3, 
        name: 'María González', 
        email: 'maria@email.com', 
        joinDate: '2024-01-08', 
        status: 'activo', 
        role: 'customer',
        discount: '10% (Código FELICES50)'
      }
    ];
    setUsers(usersData);

    // Pedidos
    const ordersData = [
      { 
        id: 1001, 
        customer: 'María González', 
        date: '2024-01-16', 
        status: 'pending', 
        total: 85500, 
        items: [
          { product: 'Torta Especial de Cumpleaños', quantity: 1, price: 55000 },
          { product: 'Mousse de Chocolate', quantity: 3, price: 5000 }
        ],
        customization: 'Feliz Cumpleaños María'
      },
      { 
        id: 1002, 
        customer: 'Carlos Ruiz', 
        date: '2024-01-15', 
        status: 'completed', 
        total: 120750, 
        items: [
          { product: 'Torta Especial de Boda', quantity: 1, price: 60000 },
          { product: 'Tiramisú Clásico', quantity: 5, price: 5500 },
          { product: 'Galletas Veganas', quantity: 10, price: 4500 }
        ],
        customization: 'Felices 25 años de matrimonio'
      }
    ];
    setOrders(ordersData);

    setStats({
      totalOrders: 234,
      totalUsers: 89,
      totalProducts: 16,
      pendingOrders: 8,
      todayRevenue: 285000,
      monthlyRevenue: 12560750,
      birthdayStudents: 5
    });
  };

  // Funciones de gestión
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleUpdateProduct = (productId, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, ...updatedProduct } : product
    ));
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: `P${Date.now()}` }]);
  };

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
            <span className="stat-change">{stats.birthdayStudents} estudiantes Duoc</span>
          </div>
          <div className="stat-card accent">
            <h3>🍪 Productos</h3>
            <p className="stat-number">{stats.totalProducts}</p>
            <span className="stat-change">8 categorías</span>
          </div>
          <div className="stat-card revenue">
            <h3>💰 Ingresos Mensuales</h3>
            <p className="stat-number">${stats.monthlyRevenue.toLocaleString('es-CL')}</p>
            <span className="stat-change">CLP</span>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          <button className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </button>
          <button className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            🛒 Gestión de Pedidos
          </button>
          <button className={`tab-button ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            🍰 Gestión de Productos
          </button>
          <button className={`tab-button ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            👥 Gestión de Usuarios
          </button>
          <button className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
            🏷️ Categorías
          </button>
          <button className={`tab-button ${activeTab === 'discounts' ? 'active' : ''}`} onClick={() => setActiveTab('discounts')}>
            🎫 Sistema de Descuentos
          </button>
        </div>

        <div className="admin-main">
          {activeTab === 'dashboard' && <DashboardTab stats={stats} orders={orders} />}
          {activeTab === 'orders' && <OrdersTab orders={orders} onUpdateStatus={handleUpdateOrderStatus} />}
          {activeTab === 'products' && <ProductsTab products={products} onUpdate={handleUpdateProduct} onAdd={handleAddProduct} />}
          {activeTab === 'users' && <UsersTab users={users} onUpdateRole={handleUpdateUserRole} />}
          {activeTab === 'categories' && <CategoriesTab categories={categories} products={products} />}
          {activeTab === 'discounts' && <DiscountsTab users={users} />}
        </div>
      </div>
    </div>
  );
};

// Componente Dashboard Específico
const DashboardTab = ({ stats, orders }) => (
  <div className="tab-content">
    <h2>📊 Resumen General - Pastelería Mil Sabores</h2>
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h3>🎂 Pedidos Recientes</h3>
        <div className="recent-orders">
          {orders.slice(0, 5).map(order => (
            <div key={order.id} className="order-item">
              <span className="order-id">#{order.id}</span>
              <span className="order-customer">{order.customer}</span>
              <span className="order-total">${order.total.toLocaleString('es-CL')}</span>
              <span className={`status-badge status-${order.status}`}>{order.status}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="dashboard-card">
        <h3>📈 Métricas Clave</h3>
        <div className="metrics">
          <div className="metric-item">
            <span>Ticket promedio:</span>
            <strong>$53.750 CLP</strong>
          </div>
          <div className="metric-item">
            <span>Productos más vendidos:</span>
            <strong>Tortas Circulares</strong>
          </div>
          <div className="metric-item">
            <span>Descuentos aplicados:</span>
            <strong>45 este mes</strong>
          </div>
          <div className="metric-item">
            <span>Satisfacción cliente:</span>
            <strong>4.8/5 ⭐</strong>
          </div>
        </div>
      </div>
      
      <div className="dashboard-card">
        <h3>🎉 Sistema de Descuentos</h3>
        <div className="discounts-overview">
          <div className="discount-item">
            <strong>👴 50% Mayores de 50 años</strong>
            <span>12 usuarios activos</span>
          </div>
          <div className="discount-item">
            <strong>🎓 Torta gratis estudiantes Duoc</strong>
            <span>5 cumpleaños este mes</span>
          </div>
          <div className="discount-item">
            <strong>🎂 10% Código FELICES50</strong>
            <span>28 usuarios registrados</span>
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

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>🛒 Gestión de Pedidos</h2>
        <div className="filter-controls">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="processing">En preparación</option>
            <option value="ready">Listo para entrega</option>
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
              <th>Productos</th>
              <th>Personalización</th>
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
                <td>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item-detail">
                        {item.quantity}x {item.product}
                      </div>
                    ))}
                  </div>
                </td>
                <td>{order.customization || 'Sin personalización'}</td>
                <td>${order.total.toLocaleString('es-CL')}</td>
                <td>
                  <span className={`status-badge status-${order.status}`}>
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

// Componente Gestión de Productos
const ProductsTab = ({ products, onUpdate, onAdd }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  });

  const categories = [
    'Tortas Cuadradas', 'Tortas Circulares', 'Postres Individuales',
    'Productos Sin Azúcar', 'Pastelería Tradicional', 'Productos Sin Gluten',
    'Productos Vegana', 'Tortas Especiales'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...newProduct,
      price: parseInt(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: 'active'
    });
    setNewProduct({ name: '', category: '', price: '', stock: '' });
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
            <div className="form-row">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <input
                type="number"
                placeholder="Precio (CLP)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Stock disponible"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-success">Guardar Producto</button>
              <button type="button" onClick={() => setShowAddForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Código</th>
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
                <td>${product.price.toLocaleString('es-CL')}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status-badge status-${product.stock > 0 ? 'active' : 'inactive'}`}>
                    {product.stock > 0 ? 'En stock' : 'Agotado'}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn-edit">Editar</button>
                  <button className="btn-view">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente Gestión de Usuarios
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
            <th>Fecha Registro</th>
            <th>Rol</th>
            <th>Descuento Aplicado</th>
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
                  <option value="customer">Cliente</option>
                  <option value="student">Estudiante Duoc</option>
                  <option value="senior">Adulto Mayor</option>
                  <option value="admin">Administrador</option>
                </select>
              </td>
              <td>
                {user.discount ? (
                  <span className="discount-badge">{user.discount}</span>
                ) : (
                  'Sin descuento'
                )}
              </td>
              <td>
                <span className="status-badge status-active">{user.status}</span>
              </td>
              <td className="actions">
                <button className="btn-edit">Editar</button>
                <button className="btn-view">Ver Pedidos</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

// Componente Categorías
const CategoriesTab = ({ categories, products }) => (
  <div className="tab-content">
    <h2>🏷️ Gestión de Categorías</h2>
    
    <div className="categories-grid">
      {categories.map(category => {
        const categoryProducts = products.filter(p => p.category === category);
        return (
          <div key={category} className="category-card">
            <h3>{category}</h3>
            <div className="category-stats">
              <span>{categoryProducts.length} productos</span>
              <span>Stock total: {categoryProducts.reduce((sum, p) => sum + p.stock, 0)}</span>
            </div>
            <div className="category-actions">
              <button className="btn-edit">Editar</button>
              <button className="btn-view">Ver Productos</button>
            </div>
          </div>
        );
      })}
    </div>

    <div className="add-category-section">
      <h3>Agregar Nueva Categoría</h3>
      <div className="add-category-form">
        <input type="text" placeholder="Nombre de la categoría" />
        <button className="btn-primary">Agregar Categoría</button>
      </div>
    </div>
  </div>
);

export default AdminProfile;