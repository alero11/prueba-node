var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// habilitacion de cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, agencia, authorization, clientid, clientsecret, pid, rid, uid, uname, usector"
    );
    next();
});

const PORT = process.env.PORT || 3000;

//start application server on port 3000
app.listen(PORT, console.log(`Se ha iniciado el servicio ${PORT}`));

app.get("/", function(req, res) {
    console.log("prueba servicio");
    res.send("hola mundo");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/crearCliente", (req, res) => {
    var datosCliente = req.body;

    console.log("rubro: " + datosCliente.rubro);

    var resultado = new Object();

    if (datosCliente.email_solicitante !== undefined) {
        resultado.Correcto = true;
        resultado.Notificacion = "Se ha registrado el cliente";
        resultado.DatoAdicional = datosCliente;
    } else {
        resultado.Correcto = false;
        resultado.Notificacion = "No se ha podido registrar el cliente";
        resultado.DatoAdicional = null;
    }
    // var user = req.body;
    res.send(resultado);
});