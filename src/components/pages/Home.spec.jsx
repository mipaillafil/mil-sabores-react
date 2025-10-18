import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";

describe("Home component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  it("muestra el header y footer", () => {
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument(); // del Header
    expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument(); // del Footer
  });

  it("muestra el banner con título y botón", () => {
    expect(screen.getByText("50 años endulzando momentos")).toBeInTheDocument();
    expect(screen.getByText("Ver Productos")).toBeInTheDocument();
  });


});
