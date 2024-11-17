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
1. Creación de una aplicación Hello World con Express/
Objetivo: Familiarizarse con la instalación y configuración básica de Express creando una aplicación/
simple que responda con "Hello World desde Express!".
Instrucciones:
a. Inicializar un nuevo proyecto: Crea una nueva carpeta para tu proyecto y ejecuta npm init para
inicializar un archivo package.json.
b. Instalar Express: Ejecuta el comando de instalación de Express utilizando npm install express@4.
c. Crear el archivo principal: Crea un archivo llamado helloWorld.js y configura una aplicación
Express que escuche en el puerto 3000 y responda con el mensaje especificado cuando se acceda a
la ruta raíz /.
d. Ejecutar la aplicación: Inicia la aplicación utilizando node helloWorld.js y verifica que al acceder a
http://localhost:3000 en el navegador se muestre el mensaje esperado

![imagen](https://github.com/user-attachments/assets/a9200711-22ac-463c-b61d-aafdc89edb2f)

## Ejercicio 2
2. Generación de una aplicación con express-generator
Objetivo: Utilizar express-generator para crear una estructura de aplicación Express y explorar
los archivos y carpetas generados.
Instrucciones:
a. Instalar express-generator: Asegúrate de tener instalado express-generator ejecutando npx
express-generator@4.
b. Generar la aplicación: Dentro de una nueva carpeta, ejecuta el comando para generar la
estructura básica de la aplicación.
c. Instalar dependencias: Navega a la carpeta generada y ejecuta npm install para instalar las
dependencias necesarias.
d. Iniciar la aplicación: Inicia la aplicación utilizando npm start y accede a http://localhost:3000 para
ver la aplicación generada. Explora las diferentes rutas y archivos generados, como routes/index.js y
views/index.jade (o views/index.ejs si se ha configurado)

![imagen](https://github.com/user-attachments/assets/364d4517-8dcc-4ee0-b70f-b80a31520c15)

## Ejercicio 3
3. Configuración y uso de un motor de plantillas (EJS)
Objetivo: Configurar un motor de plantillas EJS en una aplicación Express y renderizar una página
dinámica con datos interpolados.
Instrucciones:
a. Instalar EJS: Ejecuta npm install ejs@3 para agregar EJS como dependencia.
b. Configurar el motor de plantillas: En tu archivo principal de Express (por ejemplo,
helloWorldTemplate.js), configura EJS como el motor de plantillas utilizando app.set('view engine',
'ejs').
c. Crear una vista EJS: Dentro de la carpeta views, crea un archivo index.ejs que contenga etiquetas
para interpolar variables como <%= title %> y <%= subtitle %>.
d. Renderizar la vista: Define una ruta en Express que renderice index.ejs pasando un objeto con
title y subtitle.
e. Ejecutar y verificar: Inicia la aplicación y accede a http://localhost:3000 para ver la página
renderizada con los valores interpolados

![imagen](https://github.com/user-attachments/assets/a783d949-1155-433d-b7d5-06417233e928)

## Ejercicio 4
4. Definición de rutas estáticas y dinámicas en express
Objetivo: Practicar la creación de rutas estáticas y dinámicas en una aplicación Express, incluyendo
el manejo de parámetros opcionales y expresiones regulares.
Instrucciones:
a. Crear rutas estáticas: Define rutas como /, /users, y /about que respondan con mensajes o
rendericen vistas específicas.
b. Implementar rutas dinámicas: Crea rutas que incluyan parámetros dinámicos, por ejemplo,
/users/:id, y maneja las solicitudes extrayendo los parámetros desde req.params.
c. Añadir parámetros opcionales: Implementa una ruta con parámetros opcionales, como
/invoice/:id?, y maneja casos donde el parámetro puede estar presente o ausente.
d. Utilizar expresiones regulares en rutas: Define una ruta que utilice una expresión regular para
coincidir con patrones específicos, por ejemplo, rutas que terminen con fly.
e. Verificar el orden de las rutas: Experimenta cambiando el orden de las rutas definidas y observa
cómo afecta a la coincidencia de rutas específicas y dinámicas.

