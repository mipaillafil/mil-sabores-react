import React from 'react';
import ShippingForm from '../organisms/ShippingForm';
import PaymentForm from '../organisms/PaymentForm';
import OrderSummary from '../organisms/OrderSummary';
import StepIndicator from '../atoms/StepIndicator';


const CheckoutTemplate = ({
  currentStep,
  selectedMethod,
  formData,
  onStepChange,
  onMethodChange,
  onFormChange,
  onFormatCardNumber,
  onFormatExpiryDate,
  onConfirmOrder
}) => {
  const steps = [
    { number: 1, label: 'Información de Envío' },
    { number: 2, label: 'Método de Pago' },
    { number: 3, label: 'Confirmación' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShippingForm 
            formData={formData} 
            onFormChange={onFormChange} 
          />
        );
      case 2:
        return (
          <PaymentForm
            selectedMethod={selectedMethod}
            onMethodChange={onMethodChange}
            formData={formData}
            onFormChange={onFormChange}
            onFormatCardNumber={onFormatCardNumber}
            onFormatExpiryDate={onFormatExpiryDate}
          />
        );
      case 3:
        return (
          <OrderSummary
            formData={formData} 
            selectedMethod={selectedMethod}
            onStepChange={onStepChange}
            onConfirmOrder={onConfirmOrder}
          />
        );
      default:
        return null;
    }
  };

  const renderStepActions = () => {
    if (currentStep === 3) return null; // Los botones están en OrderSummary

    return (
      <div className="checkout-template__actions">
        {currentStep > 1 && (
          <button 
            className="checkout-template__btn checkout-template__btn--secondary"
            onClick={() => onStepChange(currentStep - 1)}
          >
            Anterior
          </button>
        )}
        
        <button 
          className="checkout-template__btn checkout-template__btn--primary"
          onClick={() => onStepChange(currentStep + 1)}
        >
          {currentStep === 1 ? 'Continuar al Pago' : 'Revisar Pedido'}
        </button>
      </div>
    );
  };

  return (
    <section className="checkout-template">
      <div className="checkout-template__container">
        <h2 className="checkout-template__title">Proceder al Pago</h2>
        
        <div className="checkout-template__steps">
          {steps.map((step, index) => (
            <StepIndicator
              key={step.number}
              number={step.number}
              label={step.label}
              isActive={currentStep >= step.number}
            />
          ))}
        </div>

        <div className="checkout-template__content">
          {renderStepContent()}
          {renderStepActions()}
        </div>
      </div>
    </section>
  );
};

export default CheckoutTemplate;