import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewsletterForm from "./NewsletterForm";

describe("NewsletterForm", () => {
  beforeAll(() => {
    HTMLFormElement.prototype.requestSubmit = function () {
      this.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    };
  });
  it("muestra el input y el botón", () => {
    render(<NewsletterForm />);
    

    const input = screen.getByPlaceholderText(/Tu correo electrónico/i);
    expect(input).toBeInTheDocument();


    const button = screen.getByRole("button", { name: /suscribirme/i });
    expect(button).toBeInTheDocument();
  });

  it("permite hacer submit del formulario", () => {
    render(<NewsletterForm />);

    const form = screen.getByTestId("newsletter-form", { hidden: true }) || screen.getByRole("form", { hidden: false });

    // Fire submit simulando envío
    const input = screen.getByPlaceholderText(/Tu correo electrónico/i);
    const button = screen.getByRole("button", { name: /suscribirme/i });

    fireEvent.change(input, { target: { value: "test@gmail.com" } });

    fireEvent.submit(form);

    // verifica que el valor del input es correcto
    expect(input.value).toBe("test@gmail.com");
  });
});
