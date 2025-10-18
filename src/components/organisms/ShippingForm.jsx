import React from 'react';

const ShippingForm = ({ formData, onFormChange }) => {
  const regions = [
    { value: 'metropolitana', label: 'Región Metropolitana' },
    { value: 'valparaiso', label: 'Valparaíso' },
    { value: 'biobio', label: 'Biobío' }
  ];

  const comunas = [
    { value: 'providencia', label: 'Providencia' },
    { value: 'las-condes', label: 'Las Condes' },
    { value: 'nunoa', label: 'Ñuñoa' }
  ];

  const renderField = (fieldName, label, type = 'text', options = []) => {
    if (type === 'select') {
      return (
        <div className="shipping-form__field">
          <label htmlFor={fieldName} className="shipping-form__label">
            {label} *
          </label>
          <select
            id={fieldName}
            name={fieldName}
            value={formData[fieldName]}
            onChange={onFormChange}
            required
            className="shipping-form__input"
          >
            <option value="">Selecciona {label.toLowerCase()}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className="shipping-form__field">
          <label htmlFor={fieldName} className="shipping-form__label">
            {label}
          </label>
          <textarea
            id={fieldName}
            name={fieldName}
            value={formData[fieldName]}
            onChange={onFormChange}
            placeholder="Ej: Timbre azul, dejar con conserjería..."
            className="shipping-form__input shipping-form__textarea"
          />
        </div>
      );
    }

    return (
      <div className="shipping-form__field">
        <label htmlFor={fieldName} className="shipping-form__label">
          {label} *
        </label>
        <input
          type={type}
          id={fieldName}
          name={fieldName}
          value={formData[fieldName]}
          onChange={onFormChange}
          placeholder={fieldName === 'direccion' ? 'Calle, número, departamento' : ''}
          required
          className="shipping-form__input"
        />
      </div>
    );
  };

  return (
    <div className="shipping-form">
      <h3 className="shipping-form__title">Información de Envío</h3>
      
      <div className="shipping-form__grid">
        <div className="shipping-form__row">
          {renderField('nombre', 'Nombre')}
          {renderField('apellido', 'Apellido')}
        </div>

        {renderField('direccion', 'Dirección')}

        <div className="shipping-form__row">
          {renderField('region', 'Región', 'select', regions)}
          {renderField('comuna', 'Comuna', 'select', comunas)}
        </div>

        <div className="shipping-form__row">
          {renderField('telefono', 'Teléfono', 'tel')}
          {renderField('email', 'Email', 'email')}
        </div>

        {renderField('instrucciones', 'Instrucciones especiales de entrega', 'textarea')}
      </div>
    </div>
  );
};

export default ShippingForm;