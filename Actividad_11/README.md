# Actividad 11: Refactorización de Aplicaciones Express.js y React a Next.js

## Objetivo
Refactorizar aplicaciones anteriores de Express.js y React en una aplicación Next.js. Esto incluye la migración de rutas API, el manejo de rutas dinámicas, la creación de interfaces personalizadas en TypeScript, y la creación de páginas con componentes personalizados de Next.js.

## Creación del proyecto
### 1. Crear la aplicación base con TypeScript:
```bash
npx create-next-app@latest refactored-app --typescript
```
### 2. Configuración correcta para la generación del proyecto

![imagen](https://github.com/user-attachments/assets/78075f54-62ce-4f14-9c9b-6d1a213717a5)

### 3. Intalacion de dependencias (opcional)
```bash
npm install
```
### 4. Estructura de la Actividad_11
```bash
refactored-app/
  ├── .next
  ├── pages/
  │     ├── hello.tsx
  │     ├── _app.tsx
  │     ├── _document.tsx
  │     ├── index.tsx
  │     ├── api/
  │     │     ├── actu-names.ts
  │     │     ├── names.ts
  │     │     ├── hello.ts 
  │     │     ├── weather/
  │     │            ├── [zipcode].ts
  │     ├── components/
  │           ├── weather.tsx
  ├── public
  ├── styles/
  │    ├── globals.css
  │    ├── Weather.module.css
  │    ├── Hello.module.css
  ├── custom.d.ts
  ├── next.config.ts
  ├── tsconfig.json
  ├── package.json
```
# Ejercicios
## Ejercicio 1: Agregar manejo de errores en las rutas de API
### Objetivo: Mejorar la robustez de la aplicación manejando errores de manera apropiada en las rutas de API.
1. En la ruta api/names.ts, modifica el código para manejar errores más detalladamente. En
lugar de simplemente devolver un error 500, devuelve un mensaje de error específico con el
código de estado adecuado (400, 404, etc.).
2. Haz lo mismo en la ruta api/weather/:zipcode.ts, incluyendo un caso en el que el
código postal no es válido (por ejemplo, si es un código que no cumple con los requisitos de
longitud).

![imagen](https://github.com/user-attachments/assets/8d379229-8ef5-4fe8-9d7c-d4f7f6a0d7ae)

![imagen](https://github.com/user-attachments/assets/008465c7-5f11-44a0-9e50-c41a68dbc81f)

![imagen](https://github.com/user-attachments/assets/d51cd537-d60c-4c01-b0d1-4346fdb066cf)

### Pregunta teórica: ¿Por qué es importante devolver códigos de estado HTTP adecuados en las API y cómo pueden afectar la experiencia del usuario o el comportamiento de los clientes que consumen la API.
Devolver códigos de estado HTTP adecuados es fundamental porque permite identificar claramente el resultado de una solicitud, ya sea exitosa o fallida, lo que mejora la claridad y depuración tanto para los desarrolladores como para los clientes que consumen la API. Por ejemplo, un código 400 indica que hubo un error en la solicitud del cliente, mientras que un 500 refleja un problema en el servidor. Esto ayuda a los clientes a manejar errores de manera proactiva, mostrando mensajes claros al usuario, como corregir un código postal inválido en lugar de un mensaje genérico.

## Ejercicio 2: Integración de CSS módular
### Objetivo: Refactorizar la aplicación para utilizar estilos CSS modulares.
1. Refactoriza las páginas hello.tsx y components/weather.tsx para que utilicen
archivos de estilos CSS modulares. Crea archivos como Hello.module.css y
Weather.module.css.
2. Asegúrate de que cada componente tenga su propio archivo de estilos para mantener los
estilos aislados.

![imagen](https://github.com/user-attachments/assets/0fdeee69-0448-47fd-b6a9-75375eb43cff)

### Pregunta teórica: Explica las ventajas de usar CSS modular en comparación con el uso de un archivo CSS global en una aplicación grande.
Los CSS modulares son archivos de estilo que encapsulan las clases dentro del componente donde se usan, evitando conflictos de nombres y asegurando estilos específicos para cada componente. Aportan ventajas como aislamiento de estilos, facilidad de mantenimiento al tener estilos asociados directamente a cada componente, eficiencia al cargar solo los estilos necesarios, escalabilidad en aplicaciones grandes al prevenir interferencias entre componentes y la eliminación de riesgos de que estilos globales afecten otros elementos inesperadamente.

## Ejercicio 3: Extender la funcionalidad del contador en weather.tsx
### Objetivo: Mejorar la funcionalidad del componente WeatherComponent.
1. Modifica el contador del componente WeatherComponent para que se guarde en
localStorage. De esta manera, cuando el usuario recargue la página, el contador
mantendrá su valor.
2. Utiliza useEffect para verificar si el valor del contador ya está almacenado en
localStorage al cargar la página.

![imagen](https://github.com/user-attachments/assets/daa82646-ffb1-497b-97fb-e8e0962316b5)

### Pregunta teórica: ¿Cómo puedes usar localStorage en una aplicación Next.js para guardar datos de sesión, y cuáles son las limitaciones de esta aproximación?.
En una aplicación Next.js, puedes usar localStorage para guardar datos de sesión accediendo al navegador después de que el componente haya sido montado, utilizando useEffect, ya que localStorage solo está disponible en el cliente. Esto permite guardar valores como contadores o preferencias del usuario y recuperarlos al recargar la página. Sin embargo, tiene limitaciones: no está disponible en el servidor (no se puede usar durante el renderizado inicial), el almacenamiento es limitado (5-10 MB según el navegador), los datos no están encriptados (no es seguro para información sensible), no hay sincronización automática entre pestañas, y los datos se pierden si el usuario limpia el almacenamiento del navegador.

## Ejercicio 4: Implementar parámetros opcionales en la API
### Objetivo: Extender la funcionalidad de la API para soportar parámetros opcionales.
1. Modifica la ruta api/weather/:zipcode para que también acepte un parámetro
opcional ?tempUnit=metric o imperial y ajuste la respuesta del objeto JSON en
consecuencia (por ejemplo, convertir la temperatura de Celsius a Fahrenheit).
2. Actualiza la lógica en el front-end para enviar este parámetro opcional en la petición API
desde components/weather.tsx.

![imagen](https://github.com/user-attachments/assets/cfd5978d-cf59-4dd3-918a-54cd31627939)

### Pregunta teórica: ¿Cómo gestionaría Next.js rutas con parámetros opcionales y cómo esto podría beneficiar la flexibilidad de la API?
Next.js gestiona parámetros opcionales utilizando la sintaxis de query strings (req.query). Esto permite enviar valores opcionales en la URL, como ?param=value, y manejarlos en el servidor para ajustar la respuesta en función de estos. Esto beneficia la flexibilidad de la API al permitir respuestas dinámicas sin necesidad de crear múltiples rutas, reduciendo la complejidad del código y mejorando la experiencia del cliente al proporcionar personalización según sus necesidades.

## Ejercicio 5: Agregar SEO con el componente next/head
### Objetivo: Mejorar el SEO de la aplicación con meta tags dinámicos.
1. Modifica el componente Hello para que los meta tags dentro del componente Head se
configuren dinámicamente dependiendo del contenido de la página.
2. Agrega meta tags que incluyan descripciones, palabras clave, y otras propiedades que
mejoren el SEO de la aplicación.

![imagen](https://github.com/user-attachments/assets/71fede93-cd18-447d-98ae-c54a4c4e7531)

### Pregunta teórica: ¿Por qué es importante el SEO en una aplicación web y cómo afecta la indexación de los motores de búsqueda al rendimiento de la misma?.
El SEO (Optimización para Motores de Búsqueda) es fundamental para mejorar la visibilidad de una aplicación web en los motores de búsqueda como Google. Un buen SEO aumenta la probabilidad de que los usuarios encuentren la página al buscar términos relevantes. Esto impacta positivamente en el tráfico orgánico, la experiencia del usuario y la credibilidad del sitio.

La indexación adecuada permite que los motores de búsqueda comprendan mejor el contenido de la página. Esto afecta el rendimiento de la aplicación, ya que un contenido optimizado y bien indexado tiene más probabilidades de aparecer en los primeros resultados de búsqueda, aumentando la tasa de clics y la conversión.

## Ejercicio 6: Implementar pre-renderización incremental en la página weather
#### Objetivo: Utilizar las capacidades de pre-renderizado incremental de Next.js.
1. Refactoriza la página components/weather.tsx para que utilice getStaticProps junto
con regeneración estática incremental (ISR). Configura que los datos del clima se actualicen
automáticamente cada 30 segundos.
2. Comprueba que la regeneración estática funcione correctamente haciendo cambios en los
datos de la API.

![imagen](https://github.com/user-attachments/assets/a75a81d2-3344-4fb0-bee3-5de58fbfba0c)

##### Pregunta teórica: ¿Cuáles son las principales diferencias entre SSR (Server-Side Rendering) y ISR (Incremental Static Regeneration) en términos de rendimiento y casos de uso?
SSR (Server-Side Rendering) genera una nueva página en el servidor para cada solicitud, lo que incrementa la carga en servidores con alto tráfico y es ideal para contenido que cambia constantemente o requiere personalización (como dashboards o perfiles). Por otro lado, ISR (Incremental Static Regeneration) combina las ventajas de las páginas estáticas y dinámicas, regenerando páginas en intervalos específicos, lo que reduce la carga del servidor y es adecuado para contenido semi-dinámico, como blogs o datos que cambian periódicamente.
