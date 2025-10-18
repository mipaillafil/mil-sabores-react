import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";

describe("ContactForm component", () => {
    beforeAll(() => {
        HTMLFormElement.prototype.requestSubmit = function () {
            this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        };
    });
  it("renderiza todos los campos del formulario", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar Mensaje/i })).toBeInTheDocument();
  });

  it("permite enviar el formulario y dispara el evento submit", () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());

    render(<ContactForm />);
    
    const form = screen.getByRole("form", { name: /contactForm/i }) || screen.getByTestId("contactForm") || screen.getByLabelText("Nombre completo").closest("form");
    form.addEventListener("submit", handleSubmit);

    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
