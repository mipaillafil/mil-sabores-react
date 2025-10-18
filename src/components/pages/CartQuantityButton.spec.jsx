import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import { MemoryRouter } from "react-router-dom";

describe("Cart quantity buttons", () => {
  const mockProducts = [
    {
      codigo: "TC001",
      titulo: "Torta Cuadrada de Chocolate",
      descripcion: "Deliciosa torta de chocolate",
      precio: "$45.000",
      quantity: 1,
    },
  ];

  beforeEach(() => {
    localStorage.setItem("products", JSON.stringify(mockProducts));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("aumenta la cantidad al hacer clic en +", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);

    expect(screen.getByText("2")).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem("products"));
    expect(stored[0].quantity).toBe(2);
  });

  it("disminuye la cantidad al hacer clic en - pero no menos de 1", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);

    // No puede bajar de 1
    expect(screen.getByText("1")).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem("products"));
    expect(stored[0].quantity).toBe(1);
  });
});
