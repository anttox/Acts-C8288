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

## Iniciar servidor 
```bash
npm run dev
```
## Acceder a GraphQL Sandbox
```bash
http://localhost:3000/api/graphql
```
# Flujo de Trabajo
## Componentes principales

- Schemas (schema.ts): Define el esquema GraphQL con typeDefs y entradas de datos (types e inputs) para queries y mutaciones.
- Resolvers (resolvers.ts): Contiene la lógica que responde a las consultas y mutaciones del esquema.
- Servicios (services.ts): Separa la lógica de acceso a datos. Aquí se encuentran funciones para realizar operaciones en MongoDB como findByZip y updateByZip.
- Middleware (db-connect.ts): Gestiona la conexión con la base de datos MongoDB, optimizando las conexiones y reutilizándolas.

# Flujo general
- El cliente realiza una consulta o mutación a través de GraphQL Sandbox o cualquier cliente GraphQL.
- Resolvers interpretan la solicitud, invocan los métodos necesarios en los Servicios y devuelven la respuesta al cliente.
- Los Servicios acceden a la base de datos usando Mongoose para obtener o modificar datos.
- El middleware dbConnect asegura una conexión eficiente a MongoDB.

![image](https://github.com/user-attachments/assets/3d504963-256a-4145-9d2d-4b2b7f1fb339)

# Preguntas teoricas
## Explicación de componentes:
### Pregunta: ¿Cuál es el papel de typeDefs y resolvers en una API GraphQL?
- typeDefs: Define la estructura de los datos que la API puede manejar y las operaciones disponibles. Especifica los tipos de datos, queries y mutations que la API soporta. En otras palabras, actúa como el contrato entre el cliente y el servidor.
- resolvers: Contienen la lógica que se ejecuta cuando se realizan consultas (queries) o mutaciones (mutations) definidas en los typeDefs. Los resolvers son responsables de conectar las solicitudes con la lógica de negocio y/o las bases de datos.

Por ejemplo en la actividad 14, los typeDefs definen el esquema de los datos meteorológicos, y los resolvers implementan cómo esos datos son obtenidos o actualizados, generalmente a través de servicios que interactúan con MongoDB.

## Ventajas de usar servicios:
#### Pregunta: ¿Cuáles son las ventajas de separar la lógica de acceso a datos en servicios independientes en lugar de manejarla directamente en los resolvers?
Separar la lógica de acceso a datos en servicios tiene varias ventajas:
- Reutilización de Código: Los servicios pueden ser reutilizados en diferentes resolvers, evitando duplicación de código y reduciendo errores.
- Mantenimiento: La lógica de acceso a datos está centralizada, lo que facilita el mantenimiento y actualización del código sin afectar directamente los resolvers.
- Organización: Los resolvers permanecen limpios y enfocados únicamente en manejar la lógica específica de GraphQL, mientras que la interacción con la base de datos se delega a los servicios.
- Escalabilidad: Al separar responsabilidades, es más fácil escalar la aplicación y optimizar el acceso a datos sin romper la funcionalidad del resolver.

En la actiividad 14, los servicios findByZip y updateByZip encapsulan la lógica para buscar y actualizar datos meteorológicos en MongoDB, mientras que los resolvers simplemente los llaman para cumplir con las solicitudes de los clientes.

## Funcionamiento de Middleware
### Pregunta: ¿Cómo ayuda el middleware dbConnect a manejar las conexiones a la base de datos en una aplicación Next.js?
El middleware dbConnect es responsable de establecer y reutilizar conexiones a la base de datos en una aplicación Next.js. Su propósito principal es garantizar que:
- Conexión Persistente: La aplicación no crea múltiples conexiones innecesarias a MongoDB con cada solicitud, lo que podría sobrecargar el servidor o alcanzar los límites de conexión.
- Eficiencia: Si ya existe una conexión activa, dbConnect la reutiliza en lugar de establecer una nueva. Esto mejora el rendimiento de la aplicación.
- Manejo de Errores: dbConnect asegura que cualquier problema en la conexión a la base de datos sea detectado y manejado antes de que la lógica de la API continúe ejecutándose.

En la actividad 14, dbConnect se utiliza como middleware para garantizar que la API GraphQL siempre tenga una conexión válida a MongoDB antes de procesar las solicitudes.

# Ejercicios
## Configuración de la conexión a MongoDB:
### Tarea: Crea un archivo db-connect.ts en la carpeta middleware que establezca una conexión a MongoDB utilizando Mongoose. Asegúrate de manejar correctamente los errores y evitar múltiples conexiones.

![image](https://github.com/user-attachments/assets/f8132111-a899-4e50-b17a-b54262a8614b)

## Refactorización de Resolvers:
### Tarea: Modifica los resolvers en graphql/resolvers.ts para que utilicen los servicios findByZip y updateByZip en lugar de acceder directamente a datos estáticos

![image](https://github.com/user-attachments/assets/331e78a7-260e-422e-af79-4ef6ee1dc3c1)

## Implementación de una nueva mutación:
### Tarea: Añade una nueva mutación deleteWeather que permita eliminar un registro meteorológico por código postal. Implementa tanto el resolver como el servicio correspondiente.

![image](https://github.com/user-attachments/assets/a6a8061b-26d1-4924-91ce-cef670efc253)

## Pruebas en GraphQL Sandbox: (Por tiempo solo hice una prueba, pero las demas funcionan de la misma manera que el query de la imagen)
### Tarea: Utiliza GraphQL Sandbox en http://localhost:3000/api/graphql para realizar las siguientes acciones:**
- Consultar datos meteorológicos por código postal.
- Actualizar los datos meteorológicos de una ubicación específica.
- Eliminar un registro meteorológico

![image](https://github.com/user-attachments/assets/5eea1f6b-77ac-4552-84da-af42d0772dc0)

## Gestión de CORS:
### Tarea: Modifica las configuraciones de CORS en el archivo api/graphql.ts para restringir el acceso a orígenes específicos en lugar de permitir cualquier origen (*)

![image](https://github.com/user-attachments/assets/f6041139-48b2-4eaa-9b1c-e4a65acbfcb3)

## Optimización de conexiones: (El codigo ya presente un manejo de conexiones en db-connect.ts utilizando tecnicas de reutilizacion. Sin embargo, se puede mejorar el manejo de cadenas de conexion utilizando variables de entorno en produccion)
### Tarea: Investiga y aplica técnicas para optimizar las conexiones a la base de datos en entornos de producción, como el uso de variables de entorno para gestionar las cadenas de conexión.

![image](https://github.com/user-attachments/assets/5b6ff48b-8853-4d47-bd6b-2ea03f3a0815)
