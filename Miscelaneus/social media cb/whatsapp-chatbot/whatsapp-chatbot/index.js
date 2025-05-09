// index.js

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;

app.post("/webhook", (req, res) => {
    const message = req.body.entry[0].changes[0].value.messages[0];
    const from = message.from; // Número de teléfono del usuario
    const text = message.text.body; // Mensaje del usuario

    console.log(`Mensaje recibido de ${from}: ${text}`);

    // Respuesta automática
    const responseMessage = "¡Hola! Gracias por contactar con nosotros. ¿En qué puedo ayudarte hoy?";

    axios.post(`https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_ID}/messages`, {
        messaging_product: "whatsapp",
        to: from,
        text: {
            body: responseMessage,
        },
    }, {
        headers: {
            "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log("Mensaje enviado:", response.data);
    }).catch(error => {
        console.error("Error al enviar el mensaje:", error.response.data);
    });

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
