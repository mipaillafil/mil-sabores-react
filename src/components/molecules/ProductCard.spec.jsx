import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import ProductCard from "./ProductCard"

beforeEach(()=>{
    Storage.prototype.getItem=jest.fn(()=>
        JSON.stringify([])
    )
    Storage.prototype.setItem=jest.fn()
    console.log(JSON.parse(JSON.stringify([])))
})

describe('Product component', ()=>{
    const mockProduct = {
        codigo: "TC001",
        imgClass: "torta-cuadrada-chocolate",
        titulo: "Torta Cuadrada de Chocolate",
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
        precio: "$45.000"
    }

    it('muestra producto correctamente', ()=>{
        render(<ProductCard {...mockProduct}/>)
        expect(screen.getByText("Torta Cuadrada de Chocolate")).toBeInTheDocument()
        expect(screen.getByText("Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.")).toBeInTheDocument()
        expect(screen.getByText("$45.000")).toBeInTheDocument()
    })

    it('se guarda en localStorage al hacer click en guardar',()=>{
        render(<ProductCard {...mockProduct}/>)
        const button = screen.getByText("Agregar al carrito")

        fireEvent.click(button)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'products',JSON.stringify([mockProduct])
        )
    })
})