# Actividad 13: Agregar una API GraphQL a Next.js
## Objetivo 
Aprender a integrar una API GraphQL en una aplicación Next.js para optimizar la gestión y obtención de datos, mejorando la eficiencia, flexibilidad y escalabilidad del desarrollo web. Esta integración permite a los desarrolladores definir esquemas robustos, realizar consultas precisas que minimizan la sobrecarga de datos, aprovechar herramientas avanzadas como Apollo Server y Apollo Client, y facilitar una colaboración más efectiva entre frontend y  ackend. Además, al combinar las capacidades de renderizado de Next.js con las ventajas de GraphQL, se potencia el rendimiento de la aplicación, se optimiza la experiencia del usuario y se asegura una arquitectura moderna y mantenible para proyectos web de alto rendimiento

## Introducción
Vamos a reestructurar la API de nuestra aplicación meteorológica para usar GraphQL. Para hacerlo, primero debemos agregar GraphQL al proyecto. GraphQL no es un patrón, sino un entorno que consta de un servidor y un lenguaje de consulta, ambos los  uales debemos agregar a Next.js. Instalaremos el servidor independiente Apollo, uno de los servidores GraphQL más populares, que también proporciona una integración con Next.js. Abre tu terminal y navega a la aplicación refactorizada que construiste en la actividad 11. En el nivel superior del directorio, junto al archivo package.json, ejecuta este comando:

```bash
npm install @apollo/server @as-integrations/next graphql graphql-tag
```

Este comando también instala el lenguaje GraphQL y los módulos graphql-tag que necesitaremos.

![imagen](https://github.com/user-attachments/assets/68f55bb1-64d4-4e3f-a996-1387ce231795)

# Ejercicios teóricos
## Conceptos básicos de GraphQL:
### Pregunta: ¿Cuál es la diferencia principal entre GraphQL y REST en términos de cómo manejan las solicitudes y las respuestas?
La principal diferencia entre GraphQL y REST radica en cómo manejan las solicitudes y respuestas. En REST, se crean múltiples endpoints para diferentes recursos, lo que puede provocar la entrega de datos innecesarios o insuficientes. Por otro lado, GraphQL utiliza un único endpoint donde los clientes pueden especificar exactamente los datos que necesitan, optimizando las consultas y evitando el overfetching (obtener datos no requeridos) o underfetching (falta de datos).

## Esquema de GraphQL:
### Pregunta: Explica la importancia de definir un esquema (typeDefs) en GraphQL y cómo influye en las consultas y mutaciones.
Definir un esquema en GraphQL mediante typeDefs es crucial porque establece la estructura de los datos, las consultas y las mutaciones que soportará la API. El esquema actúa como un contrato entre el cliente y el servidor, permitiendo que ambos sepan qué datos están disponibles y cómo pueden interactuar con ellos. Esto asegura consistencia y claridad en el desarrollo de la API.

## Resolvers:
### Pregunta: ¿Qué es un resolver en GraphQL y cuál es su función dentro de una API GraphQL?
Un resolver en GraphQL es una función que maneja las solicitudes de los clientes, determinando cómo obtener los datos especificados en una consulta o mutación. Los resolvers conectan las consultas o mutaciones definidas en el esquema con la lógica de negocio, bases de datos u otras fuentes de datos.

## CORS en APIs:
### Pregunta: ¿Por qué es necesario configurar los encabezados CORS en la API GraphQL y qué problemas podrían surgir si no se hace correctamente?
Configurar los encabezados CORS es esencial en una API GraphQL para permitir que los navegadores accedan a recursos desde diferentes dominios. Si no se configura correctamente, los navegadores bloquearán las solicitudes debido a restricciones de seguridad, lo que puede impedir el correcto funcionamiento de la aplicación en clientes que operen desde diferentes orígenes.

## Mutaciones vs consultas:
### Pregunta: ¿Cuál es la diferencia entre una consulta (Query) y una mutación (Mutation) en GraphQL?
En GraphQL, una consulta (Query) se utiliza para obtener datos del servidor, mientras que una mutación (Mutation) se utiliza para modificar o crear datos en el servidor. Las consultas son operaciones de solo lectura, mientras que las mutaciones son operaciones de escritura que pueden alterar el estado de los datos en la API.

# Ejercicios prácticos
## Extender el Esquema con nuevos tipos:
### Tarea: Agrega un nuevo tipo llamado User al esquema que incluya los campos id, name, email y location (que referencia a LocationWeatherType). Actualiza las consultas para permitir obtener usuarios junto con sus ubicaciones meteorológicas.
**Pasos sugeridos:**
- Define el tipo User en schema.ts.
- Actualiza el tipo Query para incluir una consulta users que retorne una lista de User.
- Implementa los resolvers necesarios en resolvers.ts.
- Actualiza el archivo data.ts para incluir datos de usuarios.

![imagen](https://github.com/user-attachments/assets/cf42e171-4b3a-46f8-9360-3a8198bab3f5)

## Implementar una mutación para agregar una nueva ubicación:
### Tarea: Crea una mutación que permita agregar una nueva ubicación meteorológica a la base de datos db.
**Pasos sugeridos:**
- Define una nueva mutación en el esquema para agregar una ubicación.
- Implementa el resolver correspondiente que añada la nueva ubicación al array db.
- Asegúrate de manejar posibles errores, como códigos postales duplicados

![imagen](https://github.com/user-attachments/assets/c8aee99f-fba2-435a-bb1a-7495416d0d3d)

## Crear consultas anidadas:
### Tarea: Modifica la consulta weather para que, además de los campos actuales, también retorne la información de los amigos (sus códigos postales y clima).
**Pasos sugeridos:**
- Actualiza el tipo LocationWeatherType para que el campo friends sea de tipo [LocationWeatherType].
- Ajusta los resolvers para resolver los datos de los amigos correctamente.
- Realiza una consulta en el sandbox de Apollo que obtenga, por ejemplo, el clima de una ubicación y el clima de sus amigos

![imagen](https://github.com/user-attachments/assets/63dd3b97-11ae-4a2d-9473-a0d73324f673)

## Añadir autenticación básica:
### Tarea: Implementa una autenticación básica en la API GraphQL que requiera un token de acceso en las solicitudes.
**Pasos sugeridos:**
- Configura middleware para verificar la presencia y validez del token en las solicitudes
- Modifica los resolvers para que verifiquen la autenticidad antes de procesar las consultas o mutaciones.
- Prueba el acceso a la API con y sin el token válido.

![imagen](https://github.com/user-attachments/assets/ddec4bdd-c153-4776-846a-b1e9c390592f)
