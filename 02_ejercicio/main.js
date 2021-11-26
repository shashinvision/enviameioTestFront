// JSON values
let values = {
  1: {
    carrier: "CCH",
    service: "DEX",
  },
  17: {
    carrier: "CHP",
    service: "express",
  },
};
// JSON Ciudades
let json = {
  data: {
    BUIN: {
      limit: 1,
      over_carrier_service_id: 17,
      under_carrier_service_id: 17,
    },
    LAJA: {
      limit: 1,
      over_carrier_service_id: 1,
      under_carrier_service_id: 1,
    },
    LEBU: {
      limit: 1,
      over_carrier_service_id: 1,
      under_carrier_service_id: 1,
    },
    LOTA: {
      limit: 1,
      over_carrier_service_id: 17,
      under_carrier_service_id: 17,
    },
  },
};

/* 
solución: 
- Primero recorremos el JSON de ciudades
- Segundo: en cada iteración se extrae el id del over y under con sus respectivos carrier y service entregando el id según el "over" y "under" id's extraidos en cada iteración
*/
let result = {};
Object.keys(json.data).forEach((ciudad) => {
  console.log("ciudad", ciudad);

  const limit = json.data[ciudad].limit;
  const over = json.data[ciudad].over_carrier_service_id;
  const under = json.data[ciudad].under_carrier_service_id;

  result[ciudad] = {
    limit: limit,
    over: {
      carrier: values[over].carrier,
      service: values[over].service,
    },
    under: {
      carrier: values[under].carrier,
      service: values[under].service,
    },
  };
});
console.log(result);

document.getElementById("resultado").innerText = JSON.stringify(
  result,
  null,
  2
);
