import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LogIn from "./LogIn";
import { MemoryRouter } from "react-router-dom";

describe("LogIn component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    );
  });

  it("renderiza los inputs y botón de login", () => {
    // Inputs
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();

    // Checkbox
    expect(screen.getByLabelText(/Recordarme/i)).toBeInTheDocument();

    // Botón de login
    expect(screen.getByRole("button", { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it("renderiza los enlaces correctamente", () => {
    expect(screen.getByText(/¿Olvidaste tu contraseña\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrarse/i)).toBeInTheDocument();
    expect(screen.getByText(/Volver a la página principal/i)).toBeInTheDocument();
  });

  it("permite escribir en los inputs", () => {
    const emailInput = screen.getByLabelText(/Correo/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput.value).toBe("test@gmail.com");
    expect(passwordInput.value).toBe("123456");
  });

  it("puede hacer submit del formulario", () => {
    const form = screen.getByTestId("login-form");
    const emailInput = screen.getByLabelText(/Correo/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    // spy para submit
    const submitSpy = jest.fn((e) => e.preventDefault());
    form.onsubmit = submitSpy;

    fireEvent.submit(form);

    expect(submitSpy).toHaveBeenCalled();
  });
});
