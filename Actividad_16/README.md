# Actividad 17: Comprendiendo y implementando OAuth
## Objetivo

Entender los conceptos fundamentales de OAuth, distinguir entre autenticación y autorización, y aprender a implementar el flujo de código de autorización mediante un ejemplo práctico utilizando cURL. Además, explorar la creación y firma de tokens JWT.

**Requisitos previos**
- Conocimientos básicos de HTTP y REST APIs.
- Familiaridad con cURL y la línea de comandos.
- Conocimientos básicos de JSON.
- Entender conceptos básicos de seguridad web.

**Contenido de la actividad**
- Autenticación vs. autorización
- El papel de OAuth
- Tipos de grants en OAuth
- Bearer tokens
- El flujo de código de autorización
- Creación de un token JWT
- Firma de tokens JWT
- Ejemplo práctico: acceso a un recurso ´rotegido
- Buenas prácticas

![image](https://github.com/user-attachments/assets/1bc71dc6-00fe-4b37-95dc-7dc606f5d7a8)

**Respuesta del servidor (HTTP 401 - Unauthorized)**
Este código HTTP significa que la solicitud no fue autenticada correctamente. En otras palabras, el servidor exige que proporciones credenciales válidas (como un token de acceso) para acceder al recurso.

# Configuración del cliente OAuth
Antes de poder obtener un token de acceso, necesitamos configurar un cliente OAuth.
```bash
    Crear una cuenta de usuario:
        Navega a https://www.usemodernfullstack.dev/register en tu navegador.
        Completa el formulario con un nombre de usuario y contraseña de tu elección.

    Registrar un cliente OAuth:
        Proporciona una URL de callback. Para este ejercicio, puedes usar http://localhost:3000/oauth/callback.
        Anota el ID de Cliente y el Secreto de Cliente que recibirás tras el registro.
```
Nota: La URL de callback no necesita existir realmente para este ejercicio, ya que no estaremos enviando datos reales a ella.

![image](https://github.com/user-attachments/assets/27aaba56-c22c-4aa2-a8f2-91bcc50a01c7)

**Iniciar Sesión para Recibir el Permiso de Autorización**

Utilizaremos el flujo de código de autorización para obtener un código de autorización.
```bash
$ curl -i \
    -X POST 'https://www.usemodernfullstack.dev/oauth/authenticate' \
    -H 'Accept: text/html' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d "response_type=code\
&client_id=<OAUTH_CLIENT_ID>\
&state=4nBjkh31\
&scope=read\
&redirect_uri=http://localhost:3000/oauth/callback\
&username=<OAUTH_USER>\
&password=<OAUTH_PASSWORD>"
```
**Reemplaza los siguientes placeholders:**
- <OAUTH_CLIENT_ID>: ID de cliente obtenido al registrar el cliente OAuth.
- <OAUTH_USER>: Nombre de usuario registrado.
- <OAUTH_PASSWORD>: Contraseña registrada.

![image](https://github.com/user-attachments/assets/34a17ace-b669-4c0d-a20d-caf451fc19b7)

Hemos recibido un código de autorización como parte de la redirección. Esto significa que la primera parte del flujo de autorización OAuth (obtener el código de autorización) se completó correctamente.

** Intercambio del código de autorización por un token de acceso**

Con el Código de autorización obtenido, solicitaremos un token de acceso.
```bash
$ curl -i \
    -X POST 'https://www.usemodernfullstack.dev/oauth/access_token' \
    -H 'Accept: text/html, application/json' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d "code=<AUTHORIZATION_GRANT>\
&grant_type=authorization_code\
&redirect_uri=http://localhost:3000/oauth/callback\
&client_id=<OAUTH_CLIENT_ID>\
&client_secret=<OAUTH_CLIENT_SECRET>"
```
**Reemplaza los siguientes placeholders:**
- <AUTHORIZATION_GRANT>: Código de autorización recibido en el paso anterior.
- <OAUTH_CLIENT_ID>: ID de cliente.
- <OAUTH_CLIENT_SECRET>: Secreto de cliente.

![image](https://github.com/user-attachments/assets/5e2e003d-0ff5-4e8d-b9ac-87375b69892c)

Si todo está correcto, recibirás un token de acceso en formato JSON como la imagen.

**Acceso al recurso protegido con el token de acceso**

Finalmente, utilizaremos el token de acceso para acceder al recurso protegido.
```bash
$ curl -i \
    -X GET 'https://www.usemodernfullstack.dev/protected/resource' \
    -H 'Accept: text/html' \
    -H 'Authorization: Bearer <ACCESS_TOKEN>'

Reemplaza el siguiente placeholder:

    <ACCESS_TOKEN>: Token de acceso obtenido en el paso anterior.
```
**Respuesta esperada:**
```bash
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8

<h1>This page is secured.</h1>
```

Esta respuesta confirma que el acceso al recurso protegido ha sido exitoso utilizando el token de acceso válido.

