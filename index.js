const bd = require('./bd');


const express = require("express");
const app = express();

const expand = (idExpanded, tag, expandee) => {
  return expandee.find((expandeeElement, index) => {
    if (expandeeElement[ tag ] == idExpanded) {
      return expandeeElement;
    }
  });
};

const expansor = (expanded, expandeeTag, elementTag, expandee) => {
  return expanded[ expandeeTag ].map((element, index) => {
    return expand(element, elementTag, expandee);
  }).filter(element => typeof element != 'undefined');
};

const productExpander = (bd) => {
  return bd.products.map( (product) => {
    const expandedTaxes  = expansor(product, 'taxes', 'id', bd.taxes);
    const expandedSaleMoney = expand(product.salePrice.idMoney, 'id', bd.currencies);
    const expandedCostMoney = expand(product.cost.idMoney, 'id', bd.currencies);
    const expandedProduct = { ...product };
    expandedProduct.salePrice = { ...expandedSaleMoney, ...product.salePrice };
    expandedProduct.cost = { ...expandedCostMoney, ...product.cost };
    expandedProduct.taxes = expandedTaxes;
    return expandedProduct;
  } );
}

const getProduct = (params) => {
  const id = parseInt(params.id);
  const product = bd.products.find( (prod) => { 
    if (prod.id == id) {
      return prod
    } 
  });

  if (!!product) {
    product.taxes = expansor(product, 'taxes', 'id', bd.taxes);
    product.salePrice = { ...(expand(product.salePrice.idMoney, 'id', bd.currencies)), ...product.salePrice };
    product.cost = { ...(expand(product.cost.idMoney, 'id', bd.currencies)), ...product.cost };
  }

  return product;
};

const getModel = (params, modelTag) => {
  const id = parseInt(params.id);
  const model = bd[ modelTag ].find( (mdl) => { 
    if (mdl.id == id) {
      return mdl
    } 
  });

  return model;
};

const getMoneys = () => {
  return bd.currencies;
};

const getAllTaxes = () => {
  return bd.taxes;
};

const getMoney = (params) => { return getModel(params, 'currencies') };
const getTaxes = (params) => { return getModel(params, 'taxes') };


app.get('/', (req, res) => {
  res.send("Vira de aquí machucao");
});

app.get('/api', (req, res) => {
  res.send("Tah cerraoh choro!");
});

app.get('/api/version', (req, res) => {
  res.json({ msg: "Estimade troesma, si pregunta por la versión de esta api, es la 1.0rc", version: "v1.0rc"});
});

app.get('/api/v1/products', (req, res) => {
  const products = productExpander(bd);
  res.json( { data: products, count: products.length });
});

app.get('/api/v1/products/:id.json', (req, res) => {  
  const prod = getProduct(req.params) ?? null;
  const count = !!prod ? 1 : 0;
  res.json( { data: prod, count: count } );
});


app.get('/api/v1/moneys', (req, res) => {
  const moneys = getMoneys() ?? [];
  res.json( { data: moneys, count: moneys.length });
});

app.get('/api/v1/taxes', (req, res) => {
  const taxes = getAllTaxes() ?? [];
  res.json( { data: taxes, count: taxes.length });
});


app.get('/api/v1/moneys/:id.json', (req, res) => {  
  const money = getMoney(req.params) ?? null;
  const count = !!money ? 1 : 0;
  res.json( { data: money, count: count } );
});


app.get('/api/v1/taxes/:id.json', (req, res) => {  
  const tax = getTaxes(req.params) ?? null;
  const count = !!tax ? 1 : 0;
  res.json( { data: tax, count: count } );
});



server = app.listen(3000, () => {
  console.log("We are online. Yippy Yeah Yeeah!");
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log("Por los bigotes de Sam bigotes! Estamos cerrando");
  });

});