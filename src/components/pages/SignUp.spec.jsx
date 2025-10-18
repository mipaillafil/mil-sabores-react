import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";

describe("SignUp component", () => {

  it("muestra errores si no se completan los campos obligatorios", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: /Crear Cuenta/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/El email es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/El nombre completo es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/El usuario es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
    expect(screen.getByText(/Debes aceptar los términos y condiciones/i)).toBeInTheDocument();
  });

  it("muestra fuerza de contraseña correctamente", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText("Contraseña *");

    fireEvent.change(passwordInput, { target: { value: "abc" } });
    fireEvent.change(passwordInput, { target: { value: "abc12345" } });
    fireEvent.change(passwordInput, { target: { value: "Abc12345!" } });

    const strengthBar = document.querySelector(".password-strength-bar");
    expect(strengthBar.className).toContain("strong");
  });

  it("crea cuenta correctamente cuando los campos están completos", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "test@gmail.com" } });
    fireEvent.change(screen.getByLabelText("Nombre Completo *"), { target: { value: "Juan Pérez" } });
    fireEvent.change(screen.getByLabelText("Usuario *"), { target: { value: "juanito" } });
    fireEvent.change(screen.getByLabelText("Contraseña *"), { target: { value: "Abc12345!" } });
    fireEvent.change(screen.getByLabelText("Confirmar Contraseña *"), { target: { value: "Abc12345!" } });

    const tycCheckbox = screen.getByLabelText(/Acepto los/i);
    fireEvent.click(tycCheckbox);

    const submitButton = screen.getByRole("button", { name: /Crear Cuenta/i });

    // Mock alert
    window.alert = jest.fn();

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith(
      "¡Cuenta creada exitosamente! Bienvenido/a a Pastelería Mil Sabores"
    );

    expect(screen.getByLabelText("Email *").value).toBe("");
    expect(screen.getByLabelText("Nombre Completo *").value).toBe("");
    expect(screen.getByLabelText("Usuario *").value).toBe("");
    expect(screen.getByLabelText("Contraseña *").value).toBe("");
  });
});
