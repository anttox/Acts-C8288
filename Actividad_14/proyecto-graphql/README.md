# Actividad 14: Conectando a la API GraphQL a la base de datos
## Objetivo: 
Esta actividad proporciona una comprensión profunda de cómo integrar una API GraphQL con una base de datos MongoDB utilizando Mongoose, promoviendo buenas prácticas de desarrollo como la modularidad, la separación de responsabilidades y la optimización de conexiones. Los ejercicios teóricos refuerzan el entendimiento conceptual, mientras que los prácticos aseguran la aplicación efectiva de los conocimientos adquiridos.

## Introducción
Para esta actividad debes utilizar el código dado en la lectura de mongodb y mongoose dado. Rehagamos la API GraphQL de nuestra aplicación meteorológica para que lea los datos de respuesta desde la base de datos en lugar de desde un archivo JSON estático. El código te resultará familiar, ya que utilizaremos los mismos patrones que en el ejemplo de la API REST.
- Primero, verifica que has agregado la implementación de memoria de MongoDB y Mongoose a tu proyecto. A continuación, asegúrate de que has creado los archivos en las carpetas middleware y mongoose.
- Ahora, para conectar la API GraphQL a la base de datos, necesitamos hacer dos cosas: implementar la conexión a la base de datos y refactorizar los resolvers de GraphQL para que utilicen sus conjuntos de datos.

## Requisitos Previos
- Node.js: Asegúrate de tener instalado Node.js (versión 14 o superior).
- MongoDB Atlas: Configura una cuenta en MongoDB Atlas para manejar tu base de datos en la nube.

## Importante 
Configurar variables de entorno: Crea un archivo .env.local en la raíz del proyecto y define las siguientes variables:

Proporcionadas al crear tu cluster en MongoDB Atlas
``` bash
MONGO_URI=mongodb+srv://<USUARIO>:<CONTRASEÑA>@<CLUSTER>.mongodb.net/<NOMBRE_BD_PROD>?retryWrites=true&w=majority

MONGO_URI_DEV=mongodb+srv://<USUARIO>:<CONTRASEÑA>@<CLUSTER>.mongodb.net/<NOMBRE_BD_DEV>?retryWrites=true&w=majority
```


