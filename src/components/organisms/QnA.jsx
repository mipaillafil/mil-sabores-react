import React, { useState } from "react";

const faqs = [
  {
    pregunta: '¿Hacen envíos a todo Santiago?',
    respuesta: 'Sí, realizamos envíos a toda la Región Metropolitana. Los envíos dentro de Providencia, Las Condes y Vitacura son gratuitos en compras superiores a $50.000. Para otras comunas, el costo de envío se calcula al momento de la compra.'
  },
  {
    pregunta: '¿Cómo puedo pagar mi pedido?',
    respuesta: 'Aceptamos múltiples métodos de pago: tarjetas de crédito/débito, transferencia bancaria, Webpay y efectivo al momento de la entrega.'
  },
  {
    pregunta: '¿Ofrecen opciones para personas con restricciones alimentarias?',
    respuesta: 'Sí, contamos con una variedad de productos sin azúcar, sin gluten y veganos. Especifica tus requerimientos al hacer el pedido y nos aseguraremos de prepararlo según tus necesidades.'
  },
  {
    pregunta: '¿Puedo modificar o cancelar mi pedido?',
    respuesta: 'Puedes modificar o cancelar tu pedido sin costo hasta 24 horas antes de la fecha de entrega programada. Después de ese plazo, podría aplicarse un cargo por cancelación.'
  }
];

const QnA = () => {
  const [abiertas, setAbiertas] = useState(Array(faqs.length).fill(false));

  const togglePregunta = (index) => {
    setAbiertas(prev =>
      prev.map((abierta, i) => (i === index ? !abierta : abierta))
    );
  };

  return (
    <div className="preguntas">
      <h2>Preguntas Frecuentes</h2>
      {faqs.map((item, index) => (
        <div className="preguntas-item" key={index}>
          <div
            className="pgta"
            onClick={() => togglePregunta(index)}
            style={{ cursor: 'pointer' }}
          >
            {item.pregunta}
            <span>{abiertas[index] ? '−' : '+'}</span>
          </div>
          {abiertas[index] && (
            <div className="respuesta">
              <p>{item.respuesta}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QnA;
