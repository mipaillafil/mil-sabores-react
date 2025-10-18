import React from 'react';
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
        onChange={formatFn || onFormChange}
        placeholder={
          fieldName === 'numeroTarjeta' ? '1234 5678 9012 3456' :
          fieldName === 'fechaVencimiento' ? 'MM/AA' :
          fieldName === 'cvv' ? '123' : ''
        }
        required
        maxLength={maxLength}
        className="payment-form__input"
      />
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
              {renderCardField('cvv', 'CVV', 'text', null, 3)}
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