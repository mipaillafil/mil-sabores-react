
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://18.207.129.61:9090";

async function apiFetch(path, options = {}) {
  const { token, ...restOptions } = options;

  const headers = {
    "Content-Type": "application/json",
    ...(restOptions.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "Error en la solicitud");
    throw new Error(msg || `Error ${res.status}`);
  }

  return res.status === 204 ? null : res.json();
}

/*PÚBLICO / USUARIOS*/

export function getProducts() {
  // para el catálogo público (solo activos)
  return apiFetch("/products", {
    method: "GET",
  });
}

export function login(email, password) {
  // POST /auth/login → { token, userDto }
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser(data) {
  return apiFetch("/users/register", {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      nombre: data.nombre,
      username: data.username,
      fechaNacimiento: data.fechaNacimiento,
      password: data.password,
      codigoPromo: data.codigoPromo || null,
    }),
  });
}

/*ADMIN – PRODUCTOS*/

export function getAdminProducts(token) {
  // GET /products/admin → todos los productos (activos e inactivos)
  return apiFetch("/products/admin", {
    method: "GET",
    token,
  });
}

export function createProduct(product, token) {
  // POST /products
  return apiFetch("/products", {
    method: "POST",
    token,
    body: JSON.stringify({
      nombre: product.nombre ?? product.name,
      descripcion: product.descripcion ?? product.description ?? "",
      precio: Number(product.precio ?? product.price),
      categoria: product.categoria ?? product.category,
      activo:
        typeof product.activo === "boolean"
          ? product.activo
          : product.status !== "inactive",
    }),
  });
}

export function updateProduct(id, product, token) {
  // PUT /products/{id}
  return apiFetch(`/products/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify({
      nombre: product.nombre ?? product.name,
      descripcion: product.descripcion ?? product.description ?? "",
      precio: Number(product.precio ?? product.price),
      categoria: product.categoria ?? product.category,
      activo:
        typeof product.activo === "boolean"
          ? product.activo
          : product.status !== "inactive",
    }),
  });
}

export function deleteProduct(id, token) {
  // DELETE /products/{id}
  return apiFetch(`/products/${id}`, {
    method: "DELETE",
    token,
  });
}

/* ADMIN – USUARIOS*/

// si quieres usar el panel de usuarios contra la API:
export function getAdminUsers(token) {
  // GET /admin/users → List<RemoteUserDto>
  return apiFetch("/admin/users", {
    method: "GET",
    token,
  });
}

export function updateAdminUser(id, data, token) {
  // PUT /admin/users/{id}
  return apiFetch(`/admin/users/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify({
      nombre: data.nombre ?? data.name,
      username: data.username,
      email: data.email,
      password: data.password || null, // si mandas null no cambia
      rol: data.rol, // "ADMIN" o "USER"
    }),
  });
}

export function deleteAdminUser(id, token) {
  // DELETE /admin/users/{id}
  return apiFetch(`/admin/users/${id}`, {
    method: "DELETE",
    token,
  });
}
