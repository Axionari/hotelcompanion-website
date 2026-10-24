/** The same commercial model is used by the homepage and the pilot details. */
export const pilotCommercial = {
  en: {
    title: ['A clear model.', 'Shared upside.'],
    overview: 'An initial setup and integration fee, a minimum monthly platform fee, and a success fee tied to verified additional contribution.',
    tailored: 'Pricing is tailored to your hotel’s scope and agreed together before launch.',
    fees: [
      { id: 'setup', label: 'Initial setup & integration fee', description: 'A one-time fee for hotel and destination knowledge, workflows and the agreed system connections.' },
      { id: 'platform', label: 'Minimum monthly platform fee', description: 'A recurring fee for the platform, based on your hotel’s agreed scope.' },
      { id: 'success', label: 'Success fee on additional contribution', description: 'An agreed share of verified additional contribution after agreed costs.' },
    ],
    pricingQuestion: 'How is pricing structured?',
    pricingAnswer: 'The proposal has three parts: a one-time setup and integration fee, a minimum monthly platform fee, and a success fee on verified additional contribution. Fees, scope and payment terms are agreed for each hotel before launch. Optional hardware and any additional work are included in the proposal where needed.',
    successAnswer: 'The success fee is an agreed percentage of positive, verified additional contribution, after agreed costs, cancellations, refunds and reconciliation. Assisted gross revenue is reported separately. The hotel and HC review the calculation together before billing. The initial setup fee and minimum monthly platform fee are separate from this performance component.',
  },
  es: {
    title: ['Un modelo claro.', 'Éxito compartido.'],
    overview: 'Una tarifa inicial de configuración e integración, una cuota mensual mínima de plataforma y una comisión ligada a la contribución adicional verificada.',
    tailored: 'Los precios se adaptan al alcance de tu hotel y se acuerdan juntos antes del lanzamiento.',
    fees: [
      { id: 'setup', label: 'Tarifa inicial de configuración e integración', description: 'Un pago único por el conocimiento del hotel y destino, los flujos de trabajo y las conexiones acordadas.' },
      { id: 'platform', label: 'Cuota mensual mínima de plataforma', description: 'Una cuota recurrente por la plataforma, según el alcance acordado para tu hotel.' },
      { id: 'success', label: 'Comisión sobre contribución adicional', description: 'Un porcentaje acordado de la contribución adicional verificada, después de los costos acordados.' },
    ],
    pricingQuestion: '¿Cómo se estructura el precio?',
    pricingAnswer: 'La propuesta tiene tres partes: un pago único de configuración e integración, una cuota mensual mínima de plataforma y una comisión sobre la contribución adicional verificada. Los precios, el alcance y las condiciones de pago se acuerdan con cada hotel antes del lanzamiento. El hardware opcional y cualquier trabajo adicional se incluyen en la propuesta cuando se requieren.',
    successAnswer: 'La comisión es un porcentaje acordado de la contribución adicional positiva y verificada, después de costos, cancelaciones, devoluciones y conciliación. Los ingresos brutos asistidos se reportan aparte. El hotel y HC revisan el cálculo antes de facturar. La tarifa inicial y la cuota mensual mínima de plataforma son independientes de este componente por resultados.',
  },
} as const
