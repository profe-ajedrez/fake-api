module.exports.currencies = [
  { id : 1, "name": "CLP", "isoDecimals": 0, "calculationDecimals": 6 },
  { id : 2, "name": "USD", "isoDecimals": 2, "calculationDecimals": 6 }
];

module.exports.taxes = [
  {
    id: 1,
    name: "IVA",
    type: "percentual",
    tasa: "19",
  },
  {
    id: 2,
    name: "AVI POR MONTO",
    type: "ammount",
    tasa: "200",
  }
];

module.exports.products = [
  {  
    href: "/v1/products/1.json",
    id: 1,
    name: "El producto comunista",
    description: "Este producto es comunista. Defiende a Cuba y la caida de los capitales. Tiene conciencia social y ecologica, pero le cuesta reconocer las dictaduras de izquierda.",
    classification: 1,    
    state: 0,
    salePrice: { "ammount" : 3000, "idMoney": 1 },
    cost: { "ammount" : 999, "idMoney": 1 },
    discounts: [],
    taxes: [1]
  },
  {  
    href: "/v1/products/2.json",
    id: 2,
    name: "El producto socialdemocrata",
    description: "Este producto es socialdemocrata. Tiene conciencia social, pero no se atreve a renunciar a las ventajas que da estar cerca del capital.",
    classification: 1,    
    state: 0,
    salePrice: { ammount : 2400, idMoney: 1 },
    cost: { ammount : 1100, idMoney: 1 },
    discounts: [],
    taxes: [1]
  },
  {  
    href: "/v1/products/3.json",
    id: 3,
    name: "El producto fascista",
    description: "Este producto es fascista. Cree en la concentración personalista del poder y de los medios de producción. Otros productos desaparecen cuando este anda cerca.",
    classification: 1,    
    state: 0,
    salePrice: { ammount : 73.56, idMoney: 2 },
    cost: { ammount : 23.77, idMoney: 2 },
    discounts: [],
    taxes: [2]
  }
];