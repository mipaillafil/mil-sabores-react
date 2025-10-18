import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BlogFilters from "./BlogFilters";

describe("BlogFilters component", () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it("renderiza todos los botones de filtro", () => {
    render(<BlogFilters activeFilter="all" onFilterChange={mockOnFilterChange} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);

    expect(screen.getByText(/Todos/i)).toBeInTheDocument();
    expect(screen.getByText(/Recetas/i)).toBeInTheDocument();
    expect(screen.getByText(/Consejos/i)).toBeInTheDocument();
    expect(screen.getByText(/Noticias/i)).toBeInTheDocument();
    expect(screen.getByText(/Estudiantes Duoc UC/i)).toBeInTheDocument();
  });

  it("marca el filtro activo con la clase 'active'", () => {
    render(<BlogFilters activeFilter="recetas" onFilterChange={mockOnFilterChange} />);

    const activeButton = screen.getByText(/Recetas/i);
    expect(activeButton).toHaveClass("active");

    const inactiveButton = screen.getByText(/Todos/i);
    expect(inactiveButton).not.toHaveClass("active");
  });

  it("llama a onFilterChange con el valor correcto al hacer click", () => {
    render(<BlogFilters activeFilter="all" onFilterChange={mockOnFilterChange} />);

    const button = screen.getByText(/Noticias/i);
    fireEvent.click(button);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("noticias");
  });
});
