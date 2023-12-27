const express = require('express');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const guestFilePath = path.join(__dirname, 'guests.json');

let guests = {};
try {
    const data = fs.readFileSync(guestFilePath, 'utf8');
    guests = JSON.parse(data);
} catch (error) {
    console.error('Error al leer el archivo:', error);
}

// Crear guestList a partir de las claves del objeto guests
const guestList = Object.keys(guests);

// Cargar o inicializar el archivo de invitados
if (fs.existsSync(guestFilePath)) {
    guests = JSON.parse(fs.readFileSync(guestFilePath, 'utf8'));
} else {
    guestList.forEach(guest => {
        guests[guest] = { hasEntered: false };
    });
    fs.writeFileSync(guestFilePath, JSON.stringify(guests, null, 2));
}

// Directorio para guardar los códigos QR
const qrDirectory = path.join(__dirname, 'qr_codes');
if (!fs.existsSync(qrDirectory)){
    fs.mkdirSync(qrDirectory);
}


// Generar códigos QR y guardar como archivos
app.get('/generate-qr', async (req, res) => {
    for (let guest of guestList) {
        try {
            // Asegúrate de reemplazar 'http://localhost:3000' con la URL real de tu servidor cuando esté en producción
            const qrData = `http://localhost:3000/scan-qr/${encodeURIComponent(guest)}`;
            const qrPath = path.join(qrDirectory, `${guest}.png`);
            await QRCode.toFile(qrPath, qrData);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al generar códigos QR');
            return;
        }
    }
    res.send('Códigos QR generados');
});

// Ruta para manejar el escaneo de códigos QR
app.get('/scan-qr/:guestName', (req, res) => {
    const guestName = req.params.guestName;
    if (guests[guestName] && !guests[guestName].hasEntered) {
        guests[guestName].hasEntered = true;
        fs.writeFileSync(guestFilePath, JSON.stringify(guests, null, 2));
        res.send(`${guestName} ha ingresado a la fiesta.`);
    } else {
        res.status(404).send('Invitado no encontrado o ya ingresó.');
    }
});


// Servir archivos QR
app.use('/qr_codes', express.static(qrDirectory));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
