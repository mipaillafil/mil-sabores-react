import React, { useState } from 'react';
import TransferPayment from '../molecules/TransferPayment';
import CashPayment from '../molecules/CashPayment';
import PaymentMethod from '../molecules/PaymentMethod';

const PaymentForm = ({ 
  selectedMethod, 
  onMethodChange, 
  formData, 
  onFormChange,
  onFormatCardNumber,
  onFormatExpiryDate 
}) => {
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    
    switch (fieldName) {
      case 'numeroTarjeta':
        if (!value.trim()) {
          newErrors.numeroTarjeta = 'El número de tarjeta es obligatorio';
        } else if (value.replace(/\s/g, '').length < 16) {
          newErrors.numeroTarjeta = 'El número de tarjeta debe tener 16 dígitos';
        } else {
          delete newErrors.numeroTarjeta;
        }
        break;
      
      case 'fechaVencimiento':
        if (!value.trim()) {
          newErrors.fechaVencimiento = 'La fecha de vencimiento es obligatoria';
        } else if (!/^\d{2}\/\d{2}$/.test(value)) {
          newErrors.fechaVencimiento = 'Formato inválido (MM/AA)';
        } else {
          delete newErrors.fechaVencimiento;
        }
        break;
      
      case 'cvv':
        if (!value.trim()) {
          newErrors.cvv = 'El CVV es obligatorio';
        } else if (!/^\d{3,4}$/.test(value)) {
          newErrors.cvv = 'CVV debe tener 3 o 4 dígitos';
        } else {
          delete newErrors.cvv;
        }
        break;
      
      case 'nombreTarjeta':
        if (!value.trim()) {
          newErrors.nombreTarjeta = 'El nombre en la tarjeta es obligatorio';
        } else {
          delete newErrors.nombreTarjeta;
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e, formatFn = null) => {
    const { name, value } = e.target;
    
    // Aplicar formato si existe la función
    if (formatFn) {
      formatFn(e);
    } else {
      onFormChange(e);
    }
    
    // Validar el campo
    validateField(name, value);
  };

  const isFormValid = () => {
    if (selectedMethod !== 'tarjeta') return true;
    
    const requiredFields = ['numeroTarjeta', 'fechaVencimiento', 'cvv', 'nombreTarjeta'];
    return requiredFields.every(field => formData[field] && formData[field].trim() && !errors[field]);
  };

  const renderCardField = (fieldName, label, type = 'text', formatFn = null, maxLength = null) => (
    <div className="payment-form__field">
      <label htmlFor={fieldName} className="payment-form__label">
        {label} *
      </label>
      <input
        type={type}
        id={fieldName}
        name={fieldName}
        value={formData[fieldName]}
        onChange={(e) => handleInputChange(e, formatFn)}
        onBlur={(e) => validateField(fieldName, e.target.value)}
        placeholder={
          fieldName === 'numeroTarjeta' ? '1234 5678 9012 3456' :
          fieldName === 'fechaVencimiento' ? 'MM/AA' :
          fieldName === 'cvv' ? '123' : ''
        }
        required
        maxLength={maxLength}
        className={`payment-form__input ${errors[fieldName] ? 'payment-form__input--error' : ''}`}
      />
      {errors[fieldName] && (
        <span className="payment-form__error">{errors[fieldName]}</span>
      )}
    </div>
  );

  const renderPaymentDetails = () => {
    switch (selectedMethod) {
      case 'tarjeta':
        return (
          <div className="payment-form__card">
            {renderCardField('numeroTarjeta', 'Número de Tarjeta', 'text', onFormatCardNumber, 19)}
            
            <div className="payment-form__row">
              {renderCardField('fechaVencimiento', 'Fecha Vencimiento', 'text', onFormatExpiryDate, 5)}
              {renderCardField('cvv', 'CVV', 'text', null, 4)}
            </div>

            {renderCardField('nombreTarjeta', 'Nombre en la Tarjeta')}
          </div>
        );
      
      case 'transferencia':
        return <TransferPayment />;
      
      case 'efectivo':
        return <CashPayment />;
      
      default:
        return null;
    }
  };

  return (
    <div className="payment-form">
      <h3 className="payment-form__title">Método de Pago</h3>
      
      <PaymentMethod
        selectedMethod={selectedMethod} 
        onMethodChange={onMethodChange} 
      />

      {renderPaymentDetails()}
    </div>
  );
};

export default PaymentForm;