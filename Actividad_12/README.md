# Actividad 12: Creación y exploración de aplicaciones web con Express
## Objetivo 
El objetivo de esta actividad es que los estudiantes se familiaricen con la creación de aplicaciones web utilizando el framework Express para Node.js. Al final de la actividad, los estudiantes habrán instalado y configurado una aplicación Express básica, utilizado plantillas para renderizar contenido dinámico, creado rutas estáticas y dinámicas, manejado solicitudes y respuestas HTTP, integrado middleware, y utilizado herramientas de depuración.

# Iniciar proyecto
```bash
npm init
```
# Instalacion de Express
Para instalar Express, debemos ejecutar el siguiente comando en un nuevo proyecto de Node.js:

```bash
npm install express@4
```
# Usando generador para Express
Express tiene una herramienta de línea de comandos para generar una aplicación básica. Para usarla, debemos ejecutar el siguiente comando:
```bash
npx express-generator@4
```
Luego, el siguiente paso es instalar las dependencias:
```bash
npm install
```
Finalmente, podemos iniciar la aplicación:
```bash
npm start
```
# Ejercicios teóricos
## Conceptos básicos de Express:
### Pregunta: ¿Qué es Express en el contexto de Node.js y cuáles son sus principales ventajas al desarrollar aplicaciones web?
Express es un framework minimalista para Node.js que facilita la creación de aplicaciones web y APIs mediante su flexibilidad, estructura ligera y soporte robusto para middlewares y rutas. Su popularidad se debe a su gran comunidad, extensa documentación y adaptabilidad a distintos proyectos, lo que lo hace una herramienta versátil para el desarrollo web.

## Generación de aplicaciones con express-generator:
### Pregunta: Explica qué es express-generator y cuáles son los beneficios de utilizar esta herramienta al iniciar un nuevo proyecto con Express.
El express-generator es una herramienta que genera automáticamente la estructura inicial de un proyecto Express, agilizando el desarrollo al proporcionar una base estándar con middlewares y rutas preconfiguradas. Esto ahorra tiempo y esfuerzo al evitar configuraciones manuales repetitivas y fomenta la consistencia en los proyectos.

# Motores de plantillas en Express:
## Pregunta: ¿Qué es un motor de plantillas en Express y por qué es importante? Menciona al menos dos motores de plantillas populares compatibles con Express.
Un motor de plantillas en Express permite renderizar contenido HTML dinámico utilizando datos y plantillas predefinidas, lo que es esencial para crear aplicaciones con contenido interactivo y personalizado. Algunos motores populares compatibles con Express son EJS y Pug, que simplifican la generación de páginas dinámicas y mejoran la experiencia del desarrollo.

# Manejo de solicitudes y respuestas HTTP:
## Pregunta: Describe los componentes clave del manejo de solicitudes y respuestas HTTP en Express, incluyendo los objetos req, res y la función next.
En el manejo de solicitudes y respuestas HTTP, los componentes clave son req, res y next. El objeto req representa la solicitud del cliente, permitiendo acceder a parámetros, cabeceras y datos enviados. El objeto res se utiliza para devolver respuestas al cliente, mientras que next permite pasar el control al siguiente middleware o ruta, asegurando un flujo ordenado en la ejecución.

# Importancia del orden en las rutas:
## Pregunta: ¿Por qué es crucial el orden en que se definen las rutas en una aplicación Express? Proporciona un ejemplo de cómo el orden puede afectar el comportamiento de la aplicación.
El orden en las rutas de una aplicación Express es crucial porque las rutas se evalúan en el orden en que son definidas. Si una ruta más genérica se coloca antes que una específica, esta última puede no ejecutarse. Por ejemplo, si se define app.get("/:id") antes de app.get("/users"), la ruta /users nunca será alcanzada porque la primera capturará todas las solicitudes que coincidan con el formato genérico. Este comportamiento resalta la importancia de planificar y estructurar las rutas de forma estratégica para evitar conflictos y garantizar la funcionalidad correcta.

# Ejercicios
## Ejercicio 1
1. Creación de una aplicación Hello World con Express

Objetivo: Familiarizarse con la instalación y configuración básica de Express creando una aplicación simple que responda con "Hello World desde Express!".

Instrucciones:

a. Inicializar un nuevo proyecto: Crea una nueva carpeta para tu proyecto y ejecuta npm init para
inicializar un archivo package.json.

b. Instalar Express: Ejecuta el comando de instalación de Express utilizando npm install express@4.

c. Crear el archivo principal: Crea un archivo llamado helloWorld.js y configura una aplicación Express que escuche en el puerto 3000 y responda con el mensaje especificado cuando se acceda a la ruta raíz /.

d. Ejecutar la aplicación: Inicia la aplicación utilizando node helloWorld.js y verifica que al acceder a
http://localhost:3000 en el navegador se muestre el mensaje esperado

![imagen](https://github.com/user-attachments/assets/a9200711-22ac-463c-b61d-aafdc89edb2f)

## Ejercicio 2
2. Generación de una aplicación con express-generator

Objetivo: Utilizar express-generator para crear una estructura de aplicación Express y explorar los archivos y carpetas generados.

Instrucciones:

a. Instalar express-generator: Asegúrate de tener instalado express-generator ejecutando npx express-generator@4.

b. Generar la aplicación: Dentro de una nueva carpeta, ejecuta el comando para generar la estructura básica de la aplicación.

c. Instalar dependencias: Navega a la carpeta generada y ejecuta npm install para instalar las dependencias necesarias.

d. Iniciar la aplicación: Inicia la aplicación utilizando npm start y accede a http://localhost:3000 para ver la aplicación generada. Explora las diferentes rutas y archivos generados, como routes/index.js y views/index.jade (o views/index.ejs si se ha configurado).

![imagen](https://github.com/user-attachments/assets/364d4517-8dcc-4ee0-b70f-b80a31520c15)

## Ejercicio 3
3. Configuración y uso de un motor de plantillas (EJS)

Objetivo: Configurar un motor de plantillas EJS en una aplicación Express y renderizar una página dinámica con datos interpolados.

Instrucciones:

a. Instalar EJS: Ejecuta npm install ejs@3 para agregar EJS como dependencia.

b. Configurar el motor de plantillas: En tu archivo principal de Express (por ejemplo, helloWorldTemplate.js), configura EJS como el motor de plantillas utilizando app.set('view engine', 'ejs').

c. Crear una vista EJS: Dentro de la carpeta views, crea un archivo index.ejs que contenga etiquetas para interpolar variables como <%= title %> y <%= subtitle %>.

d. Renderizar la vista: Define una ruta en Express que renderice index.ejs pasando un objeto con title y subtitle.

e. Ejecutar y verificar: Inicia la aplicación y accede a http://localhost:3000 para ver la página renderizada con los valores interpolados

![imagen](https://github.com/user-attachments/assets/a783d949-1155-433d-b7d5-06417233e928)

## Ejercicio 4
4. Definición de rutas estáticas y dinámicas en express

Objetivo: Practicar la creación de rutas estáticas y dinámicas en una aplicación Express, incluyendo el manejo de parámetros opcionales y expresiones regulares.

Instrucciones:

a. Crear rutas estáticas: Define rutas como /, /users, y /about que respondan con mensajes o rendericen vistas específicas.

b. Implementar rutas dinámicas: Crea rutas que incluyan parámetros dinámicos, por ejemplo, /users/:id, y maneja las solicitudes extrayendo los parámetros desde req.params.

c. Añadir parámetros opcionales: Implementa una ruta con parámetros opcionales, como /invoice/:id?, y maneja casos donde el parámetro puede estar presente o ausente.

d. Utilizar expresiones regulares en rutas: Define una ruta que utilice una expresión regular para coincidir con patrones específicos, por ejemplo, rutas que terminen con fly.

e. Verificar el orden de las rutas: Experimenta cambiando el orden de las rutas definidas y observa cómo afecta a la coincidencia de rutas específicas y dinámicas.

![imagen](https://github.com/user-attachments/assets/d0b5617b-bbee-4baa-b076-dd5191ce99e6)

![imagen](https://github.com/user-attachments/assets/70082b5b-e893-4ecd-a916-077f761fc72a)

![imagen](https://github.com/user-attachments/assets/f4770288-6fdd-45f7-ba80-3d3732d16597)

![imagen](https://github.com/user-attachments/assets/7a896502-dcb6-487a-abcc-e670a44456de)

![imagen](https://github.com/user-attachments/assets/7528d640-60d7-4390-94a8-8ff5b2719690)

![imagen](https://github.com/user-attachments/assets/04b8bf14-1be0-4a81-9060-a3b099e4c48f)

## Ejercicio 5
5. Manejo de respuestas HTTP en Express

Objetivo: Comprender y practicar el manejo de diferentes tipos de respuestas HTTP, incluyendo la configuración de encabezados, códigos de estado, redirecciones y el envío de datos o archivos.

Instrucciones:

a. Configurar encabezados: Define rutas que configuren diferentes encabezados en las respuestas utilizando res.set().

b. Establecer códigos de estado: Implementa respuestas que utilicen diferentes códigos de estado HTTP, como 200 OK, 404 Not Found, y 500 Internal Server Error, utilizando res.status() o res.sendStatus().

c. Realizar redirecciones: Crea rutas que redirijan a otras URLs, ya sean externas (por ejemplo, https://example.com) o internas (otras rutas dentro de la aplicación), utilizando res.redirect().

d. Enviar datos en fiferentes formatos: Practica el envío de respuestas en formato de texto, JSON y archivos utilizando métodos como res.send(), res.json() y res.sendFile().

e.Probar las respuestas: Accede a las diferentes rutas definidas y utiliza herramientas como el navegador o curl para verificar que las respuestas se manejan correctamente según lo configurado.

![imagen](https://github.com/user-attachments/assets/517f9d36-4185-4f0d-922a-ca66d29f03b7)

![imagen](https://github.com/user-attachments/assets/7e35d607-708b-419b-8e50-0d14cbf5fe5a)

![imagen](https://github.com/user-attachments/assets/744c4785-df0e-4366-8519-75aefc39c685)

![imagen](https://github.com/user-attachments/assets/bb159401-6722-48d1-8bdf-81a312073597)

## Ejercicio 6
6. Implementación de middleware para manejo de errores

Objetivo: Aprender a crear e integrar middleware personalizado para manejar errores en una aplicación Express.

Instrucciones:

a. Definir middleware de error: Crea una función middleware que capture errores y envíe una respuesta adecuada al cliente.

b. Integrar middleware en la aplicación: Asegúrate de que el middleware de error esté definido después de todas las rutas para que pueda capturar cualquier error que ocurra durante el manejo de las solicitudes.

c. Generar errores intencionalmente: Define rutas que generen errores intencionales para probar el funcionamiento del middleware de error.

d. Verificar la respuesta de errores: Accede a las rutas que generan errores y confirma que el middleware maneja y responde correctamente a los errores.

![imagen](https://github.com/user-attachments/assets/2adf29e9-41dc-4562-b305-fff5aac0a85a)

![imagen](https://github.com/user-attachments/assets/784f6c12-d85f-4d82-852b-35db3083e5aa)

![imagen](https://github.com/user-attachments/assets/0a2999af-7922-46c3-a4e3-513114cbd5cf)

## Ejercicio 7
7. Uso de la herramienta debug para depuración en Express

Objetivo: Utilizar la herramienta debug para obtener información detallada sobre las solicitudes y respuestas en una aplicación Express.

Instrucciones:

a. Iniciar la aplicación con DEBUG: Ejecuta la aplicación Express utilizando la variable de entorno DEBUG=* o una específica como DEBUG=express:* para habilitar la salida de depuración.

b. Analizar la información de depuración: Observa la información detallada que se muestra en la terminal sobre las solicitudes entrantes, respuestas enviadas y otros eventos internos de Express.

c. Filtrar información de depuración: Experimenta utilizando diferentes patrones en la variable DEBUG para filtrar la información de depuración relevante.

d. Aplicar depuración en casos de errores: Utiliza la herramienta debug para identificar y resolver problemas en la aplicación mediante el análisis de la información proporcionada.

![imagen](https://github.com/user-attachments/assets/772ef895-a73c-4049-a176-938cb11f1d09)

![imagen](https://github.com/user-attachments/assets/51581012-9f62-4e4f-9207-2e6fd99e9fd4)

**Solo logs generales, no errores**

![imagen](https://github.com/user-attachments/assets/17d1a24c-0532-467a-87ef-7e887d0f604b)

**Solo errores**

![imagen](https://github.com/user-attachments/assets/c076847e-3b06-46a4-b6ae-de19a1c9f7a9)

## Ejercicio 8
8. Envío de archivos estáticos y descargas en Express

Objetivo: Implementar rutas que sirvan archivos estáticos y permitan a los usuarios descargar archivos específicos desde la aplicación Express.

Instrucciones:

a. Servir archivos estáticos: Configura Express para servir archivos estáticos desde una carpeta específica utilizando express.static().

b. Enviar archivos específicos: Define rutas que utilicen res.sendFile() para enviar archivos específicos al cliente.

c. Implementar descargas de archivos: Crea rutas que permitan a los usuarios descargar archivos utilizando res.download(), configurando encabezados apropiados para la descarga.

d. Verificar el envío y descarga de archivos: Accede a las rutas definidas y confirma que los archivos se sirven correctamente y que las descargas funcionan como se espera.

![imagen](https://github.com/user-attachments/assets/f807e552-71a3-40cd-acc9-41777d3a7c71)

**Archivo especifico usando file**

![imagen](https://github.com/user-attachments/assets/628f2511-dd33-4c2f-b61a-ac735830d265)

**Descargar archivos**

![imagen](https://github.com/user-attachments/assets/0cd2a65c-1bce-4181-be5a-c0f36c7ede12)

## Ejercicio 9
9. Configuración de middleware para procesamiento de datos de solicitud

Objetivo: Integrar y utilizar middleware en Express para procesar datos enviados en las solicitudes, como cuerpos JSON o formularios.

Instrucciones:

a. Instalar middleware necesario: Añade y configura middleware como express.json() y express.urlencoded() para manejar datos JSON y formularios.

b. Definir rutas que reciban datos: Crea rutas que reciban datos enviados en el cuerpo de la solicitud y procesa estos datos dentro de los manejadores de rutas.

c. Validar y responder a los datos recibidos: Implementa lógica para validar los datos recibidos y envía respuestas adecuadas al cliente basadas en la validación.

d. Probar el envío de datos: Utiliza herramientas como Postman o curl para enviar solicitudes con diferentes tipos de datos y verifica que la aplicación los maneje correctamente.

![imagen](https://github.com/user-attachments/assets/880817db-33d3-4b99-bc47-b236c85dfbc8)


