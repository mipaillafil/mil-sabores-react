import React from 'react';

const CashPayment = () => {
  const opcionesPago = [
    {
      metodo: "Efectivo al Recibir",
      descripcion: "Paga cuando recibas tu pedido en la puerta de tu casa",
      instrucciones: [
        "Prepara el monto exacto del pedido",
        "Nuestro repartidor llevará cambio limitado",
        "Recibirás tu comprobante de pago al momento"
      ],
      icono: "🏠"
    },
    {
      metodo: "Pago en Sucursal",
      descripcion: "Recoge y paga directamente en nuestra pastelería",
      instrucciones: [
        "Puedes recoger tu pedido en nuestro local",
        "Aceptamos efectivo y tarjetas en sucursal",
        "Horario de atención: Lunes a Domingo 8:00 - 20:00 hrs"
      ],
      icono: "🏪",
      direccion: "Av. Principal 123, Local 45, Santiago Centro"
    }
  ];

  return (
    <div className="efectivo-info">
      <div className="efectivo-info__header">
        <h4 className="efectivo-info__title">Opciones de Pago en Efectivo</h4>
        <p className="efectivo-info__subtitle">
          Elige la forma que más te convenga para realizar tu pago
        </p>
      </div>

      <div className="efectivo-info__opciones">
        {opcionesPago.map((opcion, index) => (
          <div key={index} className="opcion-pago">
            <div className="opcion-pago__header">
              <div className="opcion-pago__icono">{opcion.icono}</div>
              <div className="opcion-pago__info">
                <h5 className="opcion-pago__metodo">{opcion.metodo}</h5>
                <p className="opcion-pago__descripcion">{opcion.descripcion}</p>
              </div>
            </div>

            <div className="opcion-pago__instrucciones">
              <h6 className="instrucciones__titulo">Cómo funciona:</h6>
              <ul className="instrucciones__lista">
                {opcion.instrucciones.map((instruccion, idx) => (
                  <li key={idx}>{instruccion}</li>
                ))}
              </ul>
            </div>

            {opcion.direccion && (
              <div className="opcion-pago__direccion">
                <strong>📍 Dirección:</strong> {opcion.direccion}
              </div>
            )}

            <div className="opcion-pago__beneficios">
              <div className="beneficio">
                <span className="beneficio__icono">⚡</span>
                <span>Procesamiento inmediato</span>
              </div>
              <div className="beneficio">
                <span className="beneficio__icono">🛡️</span>
                <span>100% seguro</span>
              </div>
              <div className="beneficio">
                <span className="beneficio__icono">📞</span>
                <span>Soporte telefónico</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="efectivo-info__recomendaciones">
        <h5 className="recomendaciones__title">Recomendaciones importantes:</h5>
        <div className="recomendaciones__lista">
          <div className="recomendacion">
            <span className="recomendacion__icono">⏰</span>
            <span>Ten el dinero preparado al momento de la entrega</span>
          </div>
          <div className="recomendacion">
            <span className="recomendacion__icono">📱</span>
            <span>Mantén tu teléfono disponible para coordinaciones</span>
          </div>
          <div className="recomendacion">
            <span className="recomendacion__icono">📋</span>
            <span>Verifica tu pedido antes de realizar el pago</span>
          </div>
        </div>
      </div>

      <div className="efectivo-info__contacto">
        <p>
          <strong>¿Necesitas ayuda?</strong> Llámanos al <strong>+56 9 1234 5678</strong> 
          o escríbenos a <strong>hola@pasteleriadulce.com</strong>
        </p>
      </div>
    </div>
  );
};

export default CashPayment;