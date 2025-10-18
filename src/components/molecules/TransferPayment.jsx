import React from 'react';

const TransferPayment = () => {
  const bancos = [
    { nombre: 'Banco de Chile', cuenta: '123456789', tipo: 'Cuenta Corrente', rut: '12.345.678-9' },
    { nombre: 'Banco Estado', cuenta: '987654321', tipo: 'Cuenta Vista', rut: '12.345.678-9' },
    { nombre: 'Scotiabank', cuenta: '456789123', tipo: 'Cuenta Corriente', rut: '12.345.678-9' }
  ];

  return (
    <div className="transferencia-info">
      <div className="transferencia-info__header">
        <h4 className="transferencia-info__title">Información para Transferencia</h4>
        <p className="transferencia-info__subtitle">
          Realiza la transferencia a cualquiera de nuestras cuentas y envía el comprobante
        </p>
      </div>

      <div className="transferencia-info__bancos">
        {bancos.map((banco, index) => (
          <div key={index} className="banco-info">
            <div className="banco-info__header">
              <h5 className="banco-info__nombre">{banco.nombre}</h5>
              <span className="banco-info__tipo">{banco.tipo}</span>
            </div>
            <div className="banco-info__datos">
              <div className="banco-info__fila">
                <span className="banco-info__label">N° Cuenta:</span>
                <span className="banco-info__valor">{banco.cuenta}</span>
              </div>
              <div className="banco-info__fila">
                <span className="banco-info__label">RUT:</span>
                <span className="banco-info__valor">{banco.rut}</span>
              </div>
              <div className="banco-info__fila">
                <span className="banco-info__label">Titular:</span>
                <span className="banco-info__valor">Pastelería Dulce Tentación</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="transferencia-info__instrucciones">
        <h5 className="instrucciones__title">Instrucciones:</h5>
        <ol className="instrucciones__lista">
          <li>Realiza la transferencia por el monto total de tu pedido</li>
          <li>Guarda el comprobante de la transferencia</li>
          <li>Envía el comprobante a nuestro WhatsApp: +56 9 1234 5678</li>
          <li>Tu pedido será procesado una vez confirmemos el pago</li>
        </ol>
      </div>

      <div className="transferencia-info__nota">
        <p>
          <strong>Nota:</strong> El procesamiento de tu pedido puede tomar hasta 24 horas hábiles 
          después de confirmada la transferencia.
        </p>
      </div>
    </div>
  );
};

export default TransferPayment;