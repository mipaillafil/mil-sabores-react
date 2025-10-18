import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import { MemoryRouter } from "react-router-dom";

describe("Cart - botón Eliminar", () => {
  const mockProducts = [
    {
      codigo: "TC001",
      titulo: "Torta Cuadrada de Chocolate",
      descripcion: "Deliciosa torta de chocolate con capas de ganache.",
      precio: "$45.000",
    },
    {
      codigo: "TC002",
      titulo: "Torta Cuadrada de Frutas",
      descripcion: "Exquisita torta con frutas frescas.",
      precio: "$50.000",
    },
  ];

  beforeEach(() => {
    localStorage.setItem("products", JSON.stringify(mockProducts));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("elimina un producto al hacer clic en el botón 'Eliminar'", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    // Comprobar que ambos productos están en el documento
    expect(screen.getByText("Torta Cuadrada de Chocolate")).toBeInTheDocument();
    expect(screen.getByText("Torta Cuadrada de Frutas")).toBeInTheDocument();

    // Obtener el primer botón "Eliminar"
    const deleteButtons = screen.getAllByText("Eliminar");
    fireEvent.click(deleteButtons[0]); // elimina el primer producto

    // El producto eliminado ya no debería estar
    expect(screen.queryByText("Torta Cuadrada de Chocolate")).not.toBeInTheDocument();

    // El otro producto sigue ahí
    expect(screen.getByText("Torta Cuadrada de Frutas")).toBeInTheDocument();

    // Comprobar que localStorage se actualizó
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    expect(storedProducts.length).toBe(1);
    expect(storedProducts[0].codigo).toBe("TC002");
  });
});
