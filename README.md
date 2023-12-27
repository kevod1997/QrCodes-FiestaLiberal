# Aplicación de Control de Invitados con Códigos QR

Esta aplicación es un sistema sencillo para gestionar la entrada de invitados a una fiesta o evento utilizando códigos QR. Cada invitado recibe un código QR único que, al ser escaneado, registra su entrada al evento.

## Características

- Generación de códigos QR para cada invitado listado en `guests.json`.
- Registro de invitados al escanear su código QR.
- Control de acceso para evitar entradas duplicadas.
- Servidor Express para manejar peticiones y servir códigos QR.

## Requisitos

Para ejecutar la aplicación, necesitarás:
- Node.js
- npm (gestor de paquetes de Node.js)
- Acceso a un sistema de archivos para almacenar los códigos QR y la lista de invitados.

## Instalación

1. Clona el repositorio o descarga el código fuente.
2. Navega al directorio de la aplicación y ejecuta `npm install` para instalar las dependencias.

## Uso

1. Asegúrate de tener una lista de invitados en formato JSON (`guests.json`) en el directorio raíz de la aplicación.
2. Inicia el servidor ejecutando `node app.js`.
3. Accede a `http://localhost:3000/generate-qr` para generar y guardar los códigos QR de los invitados.
4. Los códigos QR se guardarán en el directorio `/qr_codes` y estarán disponibles para ser enviados a los invitados.
5. Al escanear los códigos QR en `http://localhost:3000/scan-qr/:guestName`, se registrará la entrada del invitado.
