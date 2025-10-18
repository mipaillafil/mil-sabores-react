import React from 'react';
import ProductSummary from '../molecules/ProductSummary';


const OrderSummary = ({ formData, selectedMethod, onStepChange, onConfirmOrder }) => {
  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      name: "Torta de Chocolate",
      quantity: 1,
      customization: '"Feliz Cumpleaños María"',
      price: 45000
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      name: "Mousse de Chocolate",
      quantity: 2,
      price: 10000
    }
  ];

  const getPaymentMethodText = () => {
    switch (selectedMethod) {
      case 'tarjeta':
        return 'Tarjeta de Crédito ****3456';
      case 'transferencia':
        return 'Transferencia Bancaria';
      case 'efectivo':
        return 'Efectivo al Recibir';
      default:
        return 'No seleccionado';
    }
  };

  return (
    <div className="order-summary">
      <h3 className="order-summary__title">Resumen del Pedido</h3>
      
      <div className="order-summary__content">
        <div className="order-summary__products">
          <h4 className="order-summary__subtitle">Tu Pedido</h4>
          {products.map(product => (
            <ProductSummary
              key={product.id}
              image={product.image}
              name={product.name}
              quantity={product.quantity}
              customization={product.customization}
              price={product.price}
            />
          ))}
        </div>
        
        <div className="order-summary__totals">
          <div className="order-summary__row">
            <span>Subtotal:</span>
            <span>$55.000</span>
          </div>
          <div className="order-summary__row">
            <span>Envío:</span>
            <span className="order-summary__free">Gratis</span>
          </div>
          <div className="order-summary__row">
            <span>Descuento:</span>
            <span className="order-summary__discount">-$27.500</span>
          </div>
          <div className="order-summary__row order-summary__total">
            <span>Total:</span>
            <span>$27.500</span>
          </div>
        </div>
        
        <div className="order-summary__shipping">
          <h4 className="order-summary__subtitle">Información de Entrega</h4>
          <p><strong>Dirección:</strong> {formData.direccion || 'Av. Los Leones 123, Providencia'}</p>
          <p><strong>Fecha estimada:</strong> Mañana, 15:00 - 17:00</p>
          <p><strong>Método de pago:</strong> {getPaymentMethodText()}</p>
        </div>

        <div className="order-summary__actions">
          <button 
            className="order-summary__btn order-summary__btn--secondary"
            onClick={() => onStepChange(2)}
          >
            Anterior
          </button>
          <button 
            className="order-summary__btn order-summary__btn--confirm"
            onClick={onConfirmOrder}
          >
            Confirmar y Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;