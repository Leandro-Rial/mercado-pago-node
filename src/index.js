const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// Middelware
app.use(bodyParser.urlencoded({ extended: false }))

// Mercado Pago SDK
const mercadopago = require("mercadopago");
// Add Your credentials
mercadopago.configure({
  access_token:
    "APP_USR-4945118799227098-053019-a75d914a4561a1e8f794f1e6ba1fed78-767583450",
});

// Routes
app.post("/checkout", (req, res) => {
  // Crea un objeto de preferencia
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {

      res.redirect(response.body.init_point);

    })
    .catch(function (error) {
      console.log(error);
    });
});

// Server
app.listen(5000, () => {
  console.log("Server running on port: 5000");
});
