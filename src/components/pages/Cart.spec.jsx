import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "./Cart";
import { MemoryRouter } from "react-router-dom";

describe("Cart component", () => {
  const mockProducts = [
    {
      id: 1,
      titulo: "Torta Cuadrada de Chocolate",
      descripcion:"Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
      precio: "$45.000",
    },
    {
      id: 2,
      titulo: "Torta Cuadrada de Frutas",
      descripcion:"Exquisita torta con frutas frescas de la estación, bañada en gelatina brillante. Perfecta para celebraciones.",
      precio: "$50.000",
    },
  ];

  beforeEach(() => {
    localStorage.setItem("products", JSON.stringify(mockProducts));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("muestra los productos en el carrito", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.queryByText("Tu carrito está vacío 🛒")).not.toBeInTheDocument();

    mockProducts.forEach((producto) => {
      expect(screen.getByText(producto.titulo)).toBeInTheDocument();
      expect(screen.getByText(producto.descripcion)).toBeInTheDocument();
      expect(screen.getByText(producto.precio)).toBeInTheDocument();
    });
  });
});

