const express = require("express");
const bp = require("body-parser");
const qr = require("qrcode");

const app = express();

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {
    const nome = req.body.nome;
    const funcao = req.body.funcao;
    const endereco = req.body.endereco;
    const contato = req.body.contato;
    const whats = req.body.whats;

    if (whats.length === 0)
        res.send("Dados Invalidos");
    qr.toDataURL(whats, (err, src) => {
        if (err) res.send("Erro!");
        res.render("scan", { corpo: req.body, src });
    });
});

const port = 5000;
app.listen(port, () => console.log("Rodando..."));