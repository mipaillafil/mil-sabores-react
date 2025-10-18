import React from 'react';

const PaymentMethod = ({ selectedMethod, onMethodChange }) => {
  const methods = [
    {
      id: 'tarjeta',
      value: 'tarjeta',
      label: 'Tarjeta de Crédito/Débito',
      icon: '💳'
    },
    {
      id: 'transferencia',
      value: 'transferencia',
      label: 'Transferencia Bancaria',
      icon: '🏦'
    },
    {
      id: 'efectivo',
      value: 'efectivo',
      label: 'Efectivo al Recibir',
      icon: '💵'
    }
  ];

  return (
    <div className="payment-methods">
      {methods.map(method => (
        <div key={method.id} className="payment-option">
          <input
            type="radio"
            id={method.id}
            name="payment-method"
            value={method.value}
            checked={selectedMethod === method.value}
            onChange={() => onMethodChange(method.value)}
            className="payment-option__input"
          />
          <label htmlFor={method.id} className="payment-option__label">
            <span className="payment-option__icon">{method.icon}</span>
            {method.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;