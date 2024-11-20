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

![image](https://github.com/user-attachments/assets/27aaba56-c22c-4aa2-a8f2-91bcc50a01c7)

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
