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

Pregunta teórica: ¿Por qué es importante devolver códigos de estado HTTP adecuados en las API y
cómo pueden afectar la experiencia del usuario o el comportamiento de los clientes que consumen
la API.

Devolver códigos de estado HTTP adecuados es fundamental porque permite identificar claramente el resultado de una solicitud, ya sea exitosa o fallida, lo que mejora la claridad y depuración tanto para los desarrolladores como para los clientes que consumen la API. Por ejemplo, un código 400 indica que hubo un error en la solicitud del cliente, mientras que un 500 refleja un problema en el servidor. Esto ayuda a los clientes a manejar errores de manera proactiva, mostrando mensajes claros al usuario, como corregir un código postal inválido en lugar de un mensaje genérico.

