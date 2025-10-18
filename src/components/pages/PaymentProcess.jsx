import React, { useState } from 'react';
import CheckoutTemplate from '../templates/CheckoutTemplate';

const PaymentProcess = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('tarjeta');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    region: '',
    comuna: '',
    telefono: '',
    email: '',
    instrucciones: '',
    numeroTarjeta: '',
    fechaVencimiento: '',
    cvv: '',
    nombreTarjeta: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormatCardNumber = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ');
    e.target.value = formattedValue || value;
    handleFormChange(e);
  };

  const handleFormatExpiryDate = (e) => {
    let value = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
    handleFormChange(e);
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleConfirmOrder = () => {
    alert('¡Pedido confirmado! Tu pago ha sido procesado exitosamente. Te enviaremos un email con los detalles de tu pedido.');
  };

  return (
    <CheckoutTemplate
      currentStep={currentStep}
      selectedMethod={selectedMethod}
      formData={formData}
      onStepChange={handleStepChange}
      onMethodChange={setSelectedMethod}
      onFormChange={handleFormChange}
      onFormatCardNumber={handleFormatCardNumber}
      onFormatExpiryDate={handleFormatExpiryDate}
      onConfirmOrder={handleConfirmOrder}
    />
  );
};

export default PaymentProcess;