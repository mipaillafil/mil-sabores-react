const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://18.207.129.61:9090";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "Error en la solicitud");
    throw new Error(msg || `Error ${res.status}`);
  }

  return res.status === 204 ? null : res.json();
}


// PUBLICO
// Catálogo público
export function getProducts() {
  return apiFetch("/products", {
    method: "GET",
  });
}

// Login
export function login(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// Registro
export function registerUser(data) {
  return apiFetch("/users/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

//ADMIN
// Obtener productos admin
export function getAdminProducts(token) {
  return apiFetch("/products/admin", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Crear producto
export function createProduct(token, data) {
  return apiFetch("/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

// Actualizar producto
export function updateProduct(token, id, data) {
  return apiFetch(`/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

// Eliminar producto
export function deleteProduct(token, id) {
  return apiFetch(`/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Listar usuarios admin
export function getAdminUsers(token) {
  return apiFetch("/admin/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Actualizar rol de usuario
export function updateUserRole(token, userId, newRole) {
  return apiFetch(`/admin/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role: newRole }),
  });
}
