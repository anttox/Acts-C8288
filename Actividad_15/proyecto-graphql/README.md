![image](https://github.com/user-attachments/assets/e17686ad-aa96-4e2d-96b8-d4b2f4bcabf7)# Actividad 16: Agregar casos de pruebas usando Jest
## Objetivo
Aprender a implementar pruebas unitarias, de instantáneas y end-to-end en una aplicación del clima utilizando Jest. Además, entender cómo utilizar spies y mocks para aislar y verificar componentes específicos de la aplicación.

# Requisitos previos
- Conocimiento básico de TypeScript y JavaScript.
- Familiaridad con React y Mongoose.
- Comprensión de conceptos básicos de pruebas unitarias y Jest.
- Proyecto de la aplicación del clima ya configurado con una estructura similar a la mencionada en el ejercicio.

# Contenido de la actividad

- Configuración del entorno de pruebas para el middleware
- Escribir pruebas unitarias para dbConnect
- Crear mocks para los servicios de Mongoose
- Escribir pruebas unitarias para los servicios del clima
- Ejecutar y verificar las pruebas

# 1. Configuración del entorno de pruebas para el middleware
Antes de comenzar a escribir las pruebas, es esencial configurar el entorno de pruebas correctamente.

## Pasos:
**Crear la carpeta de pruebas:** 
- Navega a la carpeta raíz de tu proyecto.
- Crea una nueva carpeta llamada __tests__.
- Dentro de __tests__, crea una subcarpeta llamada middleware.
- Crear el archivo de pruebas para dbConnect: Dentro de la carpeta middleware, crea un archivo llamado db-connect.test.ts.
- Agregar el código de prueba inicial:
```bash
Abre db-connect.test.ts y copia el siguiente código:

        /**
        * @jest-environment node
        */

        import dbConnect from "../../middleware/db-connect";
        import mongoose from "mongoose";
        import { MongoMemoryServer } from "mongodb-memory-server";

        describe("dbConnect", () => {
            let connection: any;

            afterEach(async () => {
                jest.clearAllMocks();
                await connection.stop();
                await mongoose.disconnect();
            });

            afterAll(async () => {
                jest.restoreAllMocks();
            });

            test("calls MongoMemoryServer.create()", async () => {
                const spy = jest.spyOn(MongoMemoryServer, "create");
                connection = await dbConnect();
                expect(spy).toHaveBeenCalled();
            });

            test("calls mongoose.disconnect()", async () => {
                const spy = jest.spyOn(mongoose, "disconnect");
                connection = await dbConnect();
                expect(spy).toHaveBeenCalled();
            });

            test("calls mongoose.connect()", async () => {
                const spy = jest.spyOn(mongoose, "connect");
                connection = await dbConnect();
                const MONGO_URI = connection.getUri();
                expect(spy).toHaveBeenCalledWith(MONGO_URI, { dbName: "Weather" });
            });
        });
```

**Modificar dbConnect para retornar mongoServer:**
- Abre el archivo db-connect.ts ubicado en la carpeta middleware.
- Asegúrate de que la función dbConnect retorne mongoServer justo antes del cierre de la función. Por ejemplo:

```bash
        const dbConnect = async () => {
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri, { dbName: "Weather" });
        return mongoServer; // Agregar esta línea
    };
```
# 2. Escribir pruebas unitarias para dbConnect
Las pruebas unitarias verifican que cada parte de tu aplicación funcione correctamente de forma aislada.
**Descripción de las pruebas:**
- Prueba 1: Verifica que MongoMemoryServer.create() sea llamado.
- Prueba 2: Verifica que mongoose.disconnect() sea llamado.
- Prueba 3: Verifica que mongoose.connect() sea llamado con los argumentos correctos.

**Pasos:**
- Revisar el código de prueba:
- Asegúrate de que el código en db-connect.test.ts siga el patrón de preparar, actuar y afirmar.
- Cada prueba utiliza jest.spyOn para espiar métodos específicos y luego verifica si fueron llamados correctamente.

**Ejecutar las pruebas:**

En la terminal, ejecuta el comando:

```bash
npm test
```
Todas las pruebas deberían pasar con una cobertura de prueba del 100%.

# 3. Crear mocks para los servicios de Mongoose
Los mocks permiten aislar las partes de tu aplicación que deseas probar, reemplazando las dependencias reales por simulaciones controladas.

**Pasos:**
- Crear el mock de WeatherModel:
- Navega a mongoose/weather/ dentro de tu proyecto.
- Crea una carpeta llamada __mocks__.
- Dentro de __mocks__, crea un archivo llamado model.ts.
- Copia y pega el siguiente código en model.ts:
```bash
        import { WeatherInterface } from "../interface";

        type param = {
            [key: string]: string;
        };

        const WeatherModel = {
            create: jest.fn((newData: WeatherInterface) => Promise.resolve(true)),
            findOne: jest.fn(({ zip: paramZip }: param) => Promise.resolve(true)),
            updateOne: jest.fn(({ zip: paramZip }: param, newData: WeatherInterface) =>
                Promise.resolve(true)
            ),
            deleteOne: jest.fn(({ zip: paramZip }: param) => Promise.resolve(true))
        };
        export default WeatherModel;
```
**Descripción del mock:**
- Implementa WeatherInterface.
- Define un tipo param para tipificar los parámetros.
- Crea un objeto WeatherModel con métodos create, findOne, updateOne y deleteOne que son funciones simuladas (jest.fn) que devuelven una promesa resuelta con true.

# 4. Escribir pruebas unitarias para los servicios del clima

Ahora, escribiremos pruebas unitarias para los servicios que interactúan con WeatherModel.

**Pasos:**
- Crear el archivo de pruebas para los servicios:
- Dentro de la carpeta __tests__/mongoose/weather/, crea un archivo llamado services.test.ts.
- Agregar el código de prueba para los servicios:
```bash
        Abre services.test.ts y copia el siguiente código:

        /**
        * @jest-environment node
        */
        import { WeatherInterface } from "../../../mongoose/weather/interface";
        import {
            findByZip,
            storeDocument,
            updateByZip,
            deleteByZip,
        } from "../../../mongoose/weather/services";

        import WeatherModel from "../../../mongoose/weather/model";

        jest.mock("../../../mongoose/weather/model");

        describe("the weather services", () => {
            let doc: WeatherInterface = {
                zip: "test",
                weather: "weather",
                tempC: "00",
                tempF: "01",
                friends: []
            };

            afterEach(async () => {
                jest.clearAllMocks();
            });

            afterAll(async () => {
                jest.restoreAllMocks();
            });

            describe("API storeDocument", () => {
                test("returns true", async () => {
                    const result = await storeDocument(doc);
                    expect(result).toBeTruthy();
                });

                test("passes the document to Model.create()", async () => {
                    const spy = jest.spyOn(WeatherModel, "create");
                    await storeDocument(doc);
                    expect(spy).toHaveBeenCalledWith(doc);
                });
            });

            describe("API findByZip", () => {
                test("returns true", async () => {
                    const result = await findByZip(doc.zip);
                    expect(result).toBeTruthy();
                });

                test("passes the zip code to Model.findOne()", async () => {
                    const spy = jest.spyOn(WeatherModel, "findOne");
                    await findByZip(doc.zip);
                    expect(spy).toHaveBeenCalledWith({ zip: doc.zip });
                });
            });

            describe("API updateByZip", () => {
                test("returns true", async () => {
                    const result = await updateByZip(doc.zip, doc);
                    expect(result).toBeTruthy();
                });

                test("passes the zip code and the new data to Model.updateOne()", async () => {
                    const spy = jest.spyOn(WeatherModel, "updateOne");
                    const result = await updateByZip(doc.zip, doc);
                    expect(spy).toHaveBeenCalledWith({ zip: doc.zip }, doc);
                });
            });

            describe("API deleteByZip", () => {
                test("returns true", async () => {
                    const result = await deleteByZip(doc.zip);
                    expect(result).toBeTruthy();
                });

                test("passes the zip code Model.deleteOne()", async () => {
                    const spy = jest.spyOn(WeatherModel, "deleteOne");
                    const result = await deleteByZip(doc.zip);
                    expect(spy).toHaveBeenCalledWith({ zip: doc.zip });
                });
            });
        });
```
**Descripción de las pruebas:**
- Mocking del modelo:

Utiliza jest.mock para reemplazar el modelo real con el mock que creamos anteriormente.

- Definición del documento de prueba:

Crea un documento de prueba doc que se utilizará en las pruebas.
        
- Estructura de las pruebas:

Para cada servicio (storeDocument, findByZip, updateByZip, deleteByZip), se realizan dos pruebas:

- Verificar que la función del servicio retorne true.
- Verificar que el método correspondiente del WeatherModel sea llamado con los argumentos correctos.

# 5. Ejecutar y verificar las pruebas

Una vez que hayas configurado todas las pruebas, es momento de ejecutarlas y verificar los resultados.

**Pasos:**
- Ejecutar las pruebas:
- En la terminal, dentro de la carpeta raíz de tu proyecto, ejecuta:
```bash
npm test
```
- Interpretar el resultado de las pruebas:
```bash
    Deberías ver una salida similar a la siguiente:

    PASS  __tests__/mongoose/weather/services.test.ts
    PASS  __tests__/middleware/db-connect.test.ts

    --------------------|---------|----------|---------|---------|-------------------
    File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
    --------------------|---------|----------|---------|---------|-------------------
    All files           |   83.63 |      100 |   88.23 |   82.35 |
    middleware         |     100 |      100 |     100 |     100 |
      db-connect.test.ts|     100 |      100 |     100 |     100 |
    mongoose/weather.  |   77.41 |      100 |     100 |   75.86 |
      services.test.ts  |   70.83 |      100 |     100 |   70.83 |8,20-22,33-35,43-45
    --------------------|---------|----------|---------|---------|-------------------
```
**Interpretación:**
- Todas las pruebas deberían pasar (PASS).
- La cobertura de código debería ser alta, con algunas líneas no cubiertas relacionadas con console.log(err);.

**Análisis de la cobertura de código:**
- Observa el reporte de cobertura para identificar las partes del código que no están cubiertas por las pruebas.
- En este caso, las líneas no cubiertas contienen la salida console.log(err);.
- Para cubrir estas líneas, podrías agregar pruebas adicionales que simulen errores en las llamadas asíncronas.

![image](https://github.com/user-attachments/assets/fc1314a4-90c2-40f8-9737-53f375d2c74f)

![image](https://github.com/user-attachments/assets/5ad9f225-c10e-429f-8758-2bbba4f52307)

![image](https://github.com/user-attachments/assets/c7bbe428-cf03-499d-9099-dcd2befec6b1)

# Continuación - Pruebas end-to-end y de instantáneas en la aplicación del clima
## Objetivo
Expandir la cobertura de pruebas de la aplicación del clima mediante la implementación de una prueba end-to-end para la API REST y pruebas de instantáneas para los componentes de la interfaz de usuario utilizando Jest y React Testing Library.

# Requisitos previos
- Haber completado la actividad: agregar casos de prueba a la aplicación del clima.
- Tener configurado y ejecutándose el proyecto de la aplicación del clima.
- Familiaridad con Jest, React Testing Library, y React Test Renderer.

# Contenido de la actividad
- Realizar una prueba end-to-end de la API REST
- Configurar el entorno para pruebas de instantáneas
- Crear la primera versión de la prueba de instantáneas
- Actualizar la prueba de instantáneas para Cobertura Completa
- Ejecutar y Verificar las Pruebas Adicionales

# 1. Realizar una prueba end-to-end de la API REST

Las pruebas end-to-end verifican que todos los componentes de la aplicación funcionen juntos como se espera. En este caso, probaremos el punto final de la API REST /v1/weather/[zipcode] para asegurarnos de que devuelve los datos correctos.

**Pasos:**
## 1.1. Instalar dependencias necesarias
Aunque en este ejemplo usaremos fetch nativo, es recomendable tener herramientas como SuperTest para pruebas más sofisticadas en el futuro. Por ahora, asegúrate de que tu entorno de Node.js soporte fetch (a partir de Node.js v17.5).

- 1.2. Crear el archivo de prueba End-to-End

**Crear la carpeta y el archivo de prueba:**
```bash
    Navega a la carpeta __tests__/pages/api/v1/weather/.
    Crea un archivo llamado zipcode.e2e.test.ts.
```

**Agregar el código de prueba:**
```bash
    Abre zipcode.e2e.test.ts y copia el siguiente código:

    /**
     * @jest-environment node
     */

    describe("The API /v1/weather/[zipcode]", () => {
        test("returns the correct data for the zipcode 96815", async () => {
            const zip = "96815";
            let response = await fetch(`http://localhost:3000/api/v1/weather/${zip}`);
            let body = await response.json();
            expect(body.zip).toEqual(zip);
        });
    });

    export {};
```
**Descripción del código:**
- Entorno de pruebas: Se establece el entorno en node para simular un entorno de ejecución de Node.js.
- Descripción del conjunto de pruebas: Define un conjunto de pruebas para el punto final /v1/weather/[zipcode].
- Caso de prueba: Verifica que al proporcionar el código postal 96815, la API devuelve un objeto cuyo campo zip coincide con el código proporcionado.
- Exportación vacía: Define el archivo como un módulo ES6.

## 1.3. Configurar el tiempo de espera de Jest (Opcional)

Si encuentras errores relacionados con la conexión o el tiempo de espera, ajusta el tiempo de espera de Jest:
```bash
    Agregar la línea de configuración:

        En la parte superior de zipcode.e2e.test.ts, antes del describe, agrega:

        jest.setTimeout(20000);

        Esto aumenta el tiempo de espera de las pruebas a 20,000 ms (20 segundos).
```
## 1.4. Ejecutar la prueba end-to-end

**Iniciar la aplicación:**
```bash
    Asegúrate de que tu aplicación esté ejecutándose. En la terminal, ejecuta:

    npm run dev
```

**Ejecutar las pruebas:**
```bash
    En otra terminal, dentro de la carpeta raíz de tu proyecto, ejecuta:

    npm test
```

**Verificar los resultados:**
```bash
    Deberías ver una salida similar a:

    PASS  __tests__/pages/api/v1/weather/zipcode.e2e.test.ts

    ---------------------|---------|----------|---------|---------|-------------------
    File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
    ---------------------|---------|----------|---------|---------|-------------------
    All files            |   83.63 |      100 |   88.23 |   82.35 |
    middleware          |     100 |      100 |     100 |     100 |
      db-connect.test.ts |     100 |      100 |     100 |     100 |
    mongoose/weather    |   77.41 |      100 |     100 |   75.86 |
      services.test.ts   |   70.83 |      100 |     100 |   70.83 |8,20-22,33-35,43-45
    pages/api/v1/       |         |          |         |         |
      weather            |     100 |      100 |     100 |     100 |
        [zipcode].ts     |     100 |      100 |     100 |     100 |
    ---------------------|---------|----------|---------|---------|-------------------
```
**Interpretación:**
- La prueba debería pasar exitosamente.
- La cobertura de código para el archivo [zipcode].ts debería ser del 100%.

![image](https://github.com/user-attachments/assets/e4c160c6-3316-49f2-bed4-0eca74f4bccd)

![image](https://github.com/user-attachments/assets/ba0c92c9-45f7-4329-bd00-e6b0af207312)

![image](https://github.com/user-attachments/assets/6582e348-66c2-41aa-a72d-18b667e3fe95)

# 2. Configurar el entorno para pruebas de instantáneas
Las pruebas de instantáneas verifican que el HTML renderizado de un componente no cambie inesperadamente entre ejecuciones de prueba.

**Pasos:**
## 2.1. Instalar dependencias para pruebas de instantáneas
Ejecuta los siguientes comandos para instalar las dependencias necesarias:

- npm install --save-dev jest-environment-jsdom
- npm install --save-dev @testing-library/react @testing-library/jest-dom
- npm install --save-dev @types/react-test-renderer react-test-renderer
```bash
    Descripción de las dependencias:
        jest-environment-jsdom: Simula un entorno de navegador para Jest.
        @testing-library/react y @testing-library/jest-dom: Proporcionan utilidades para probar componentes de React.
        @types/react-test-renderer y react-test-renderer: Permiten renderizar componentes de React para pruebas de instantáneas.
```
## 2.2. Actualizar la configuración de Jest
```bash
Abrir jest.config.js:

    En el directorio raíz de tu proyecto, abre el archivo jest.config.js.

Reemplazar el contenido con el código:

const nextJest = require("next/jest");

const createJestConfig = nextJest({});

module.exports = createJestConfig(nextJest({}));
```
**Descripción del código:**
- Importación de next/jest: Utiliza la configuración predeterminada de Jest para proyectos Next.js.
- Creación de la configuración de Jest: Crea una configuración personalizada de Jest basada en las propiedades predeterminadas de Next.js.
- Exportación de la configuración: Exporta la configuración para que Jest la utilice.

![image](https://github.com/user-attachments/assets/5b8b1d69-8f46-471c-8087-96451075888b)

![image](https://github.com/user-attachments/assets/37a5579c-f128-48b0-b822-87b5877a4adf)

![image](https://github.com/user-attachments/assets/47f915fc-7253-460f-99e0-71aceabdf700)

# 3. Crear la primera versión de la prueba de instantáneas
Implementaremos una prueba de instantáneas para el componente de la interfaz de usuario PageComponentWeather.

**Pasos:**
## 3.1. Crear el archivo de prueba de instantáneas
```bash
Crear la carpeta y el archivo de prueba:

    Dentro de la carpeta __tests__/pages/components/, crea un archivo llamado weather.snapshot.test.tsx.

Agregar el código de prueba:

    Abre weather.snapshot.test.tsx y copia el siguiente código:

    /**
     * @jest-environment node
     */

    import { act, create } from "react-test-renderer";
    import PageComponentWeather from "../../../pages/components/weather";

    describe("PageComponentWeather", () => {
        test("renders correctly", async () => {
            let component: any;

            await act(async () => {
                component = await create(<PageComponentWeather></PageComponentWeather>);
            });

            expect(component.toJSON()).toMatchSnapshot();
        });
    });

        Descripción del código:
            Entorno de pruebas: Se establece en node.
            Importaciones:
                act y create de react-test-renderer para simular interacciones y renderizar el componente.
                PageComponentWeather es el componente que se va a probar.
            Conjunto de pruebas: Define una prueba para verificar que el componente se renderiza correctamente.
            Caso de prueba:
                Renderiza el componente dentro de act para asegurarse de que todas las actualizaciones del DOM se completen.
                Compara la salida JSON del componente renderizado con la instantánea almacenada utilizando toMatchSnapshot().
```
## 3.2. Ejecutar la prueba de instantáneas

**Ejecutar las pruebas:**
```bash
    En la terminal, ejecuta:

    npm test
```

**Verificar los resultados:**
```bash
    Deberías ver una salida similar a:

    PASS  __tests__/pages/components/weather.snapshot.test.tsx

    Snapshot Summary

    › 1 snapshot written from 1 test suite.
```
**Interpretación:**
- La prueba ha pasado y se ha creado una instantánea inicial.
- La cobertura de código para weather.tsx debería ser del 81%.

**Revisar la instantánea creada:**
```bash
    Navega a la carpeta __tests__/pages/components/__snapshots__/.

    Abre el archivo weather.snapshot.test.tsx.snap y observa el HTML serializado del componente renderizado, similar a:

    // Jest Snapshot v1, https://goo.gl/fbAQLP

    exports[`PageComponentWeather renders correctly 1`] = `
    <h1
        data-testid="h1"
        onClick={[Function]}
    >
        The weather is
        sunny
        , and the counter shows
        0
    </h1>
    `;

        Nota: El contenido exacto puede variar dependiendo de cómo esté implementado tu componente PageComponentWeather.
```
![image](https://github.com/user-attachments/assets/3df15c1b-ba2c-4a94-872f-b68c3c86b45e)

![image](https://github.com/user-attachments/assets/29997240-63fe-46f9-9181-1b81b8e3b407)

# 4. Actualizar la Prueba de Instantáneas para Cobertura Completa

Para cubrir todas las funcionalidades del componente, agregaremos una segunda versión de la prueba que simula un clic en el elemento h1 y verifica que el estado counter se actualice.

**Pasos:**
## 4.1. Modificar el archivo de prueba de instantáneas
**Abrir weather.snapshot.test.tsx:**
```bash
    Navega a __tests__/pages/components/weather.snapshot.test.tsx y reemplaza su contenido con el código:

    /**
     * @jest-environment node
     */

    import { act, create } from "react-test-renderer";
    import PageComponentWeather from "../../../pages/components/weather";

    describe("PageComponentWeather", () => {
        test("renders correctly", async () => {
            let component: any;

            await act(async () => {
                component = await create(<PageComponentWeather></PageComponentWeather>);
            });

            expect(component.toJSON()).toMatchSnapshot();
        });

        test("clicks the h1 element and updates the state", async () => {
            let component: any;

            await act(async () => {
                component = await create(<PageComponentWeather></PageComponentWeather>);
                component.root.findByType("h1").props.onClick();
            });

            expect(component.toJSON()).toMatchSnapshot();
        });
    });
```
**Descripción del código actualizado:**
- Nuevo caso de prueba: clicks the h1 element and updates the state.
- Simulación de clic: Encuentra el elemento h1 y simula un clic llamando a su propiedad onClick.
- Verificación de la instantánea: Compara el estado actualizado del componente con una nueva instantánea.

## 4.2. Ejecutar las pruebas actualizadas

**Ejecutar las pruebas:**
```bash
    En la terminal, ejecuta nuevamente:

    npm test
```
**Verificar los resultados:**
```bash
    Es probable que veas un fallo en la prueba debido a la discrepancia en las instantáneas:

    FAIL  __tests__/pages/components/weather.snapshot.test.tsx

      • PageComponentWeather › renders correctly

    › 1 snapshot failed.

    Snapshot Summary

    › 1 snapshot failed from 1 test suite.

    › Inspect your code changes or run `npm test -- -u` to update them.
```
**Interpretación:**
- La instantánea existente ya no coincide con la salida actual del componente después de la interacción simulada (clic en h1).
- Esto es esperado ya que el estado counter ha cambiado de 0 a 1, afectando el HTML renderizado.

## 4.3. Actualizar la instantánea

**Actualizar las instantáneas:**
```bash
    Ejecuta el siguiente comando para actualizar las instantáneas:

    npm test -- -u
```
**Descripción:**

El flag -u le indica a Jest que actualice las instantáneas existentes en lugar de compararlas con las nuevas salidas.

**Verificar los resultados:**
```bash
    Deberías ver una salida similar a:

    PASS  __tests__/pages/components/weather.snapshot.test.tsx

    Snapshot Summary

    › 1 snapshot written from 2 test suites.
```
**Interpretación:**
- Las instantáneas han sido actualizadas para reflejar el nuevo estado del componente después del clic.
- La cobertura de código para weather.tsx ahora debería ser del 100%.

**Revisar la nueva instantánea:**
```bash
    Abre nuevamente el archivo weather.snapshot.test.tsx.snap en la carpeta __snapshots__/ y observa el nuevo contenido, similar pero con el estado actualizado:

    // Jest Snapshot v1, https://goo.gl/fbAQLP

    exports[`PageComponentWeather renders correctly 1`] = `
    <h1
        data-testid="h1"
        onClick={[Function]}
    >
        The weather is
        sunny
        , and the counter shows
        0
    </h1>
    `;

    exports[`PageComponentWeather clicks the h1 element and updates the state 1`] = `
    <h1
        data-testid="h1"
        onClick={[Function]}
    >
        The weather is
        sunny
        , and the counter shows
        1
    </h1>
    `;

Nota: La segunda instantánea refleja que el contador ha incrementado a 1 después del clic.
```
![image](https://github.com/user-attachments/assets/0e9f9e02-750f-414c-b069-17ad757cebd2)

![image](https://github.com/user-attachments/assets/c2352829-0a3c-4669-a164-8db747c93019)

# 5. Ejecutar y verificar las pruebas adicionales
Después de actualizar las pruebas, es crucial ejecutar todas las pruebas nuevamente para asegurar que todo funcione correctamente.

**Pasos:**
```bash
    Ejecutar todas las pruebas:

        En la terminal, ejecuta:

        npm test
```
**Verificar los resultados completos:**
```bash
    Deberías ver una salida similar a:

    PASS  __tests__/mongoose/weather/services.test.ts
    PASS  __tests__/pages/api/v1/weather/zipcode.e2e.test.ts
    PASS  __tests__/middleware/db-connect.test.ts
    PASS  __tests__/pages/components/weather.snapshot.test.tsx

    ---------------------|---------|----------|---------|---------|-------------------
    File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
    ---------------------|---------|----------|---------|---------|-------------------
    All files            |   83.63 |      100 |   88.23 |   82.35 |
    middleware          |     100 |      100 |     100 |     100 |
      db-connect.test.ts |     100 |      100 |     100 |     100 |
    mongoose/weather    |   77.41 |      100 |     100 |   75.86 |
      services.test.ts   |   70.83 |      100 |     100 |   70.83 |8,20-22,33-35,43-45
    pages/api/v1/       |         |          |         |         |
      weather            |     100 |      100 |     100 |     100 |
        [zipcode].ts     |     100 |      100 |     100 |     100 |
    pages/components    |   81.81 |      100 |      60 |      80 |
      weather.tsx        |   100   |      100 |      60 |      100 |8,12
    ---------------------|---------|----------|---------|---------|-------------------
    Snapshot Summary

    › 2 snapshots written from 1 test suite.
```
**Interpretación:**
- Todas las pruebas deberían pasar exitosamente.
- La cobertura de código para weather.tsx ahora es del 100%, incluyendo las funcionalidades del manejador de clics y el hook useEffect.

**Análisis de la cobertura de código:**
Observa que todas las líneas están cubiertas, especialmente las relacionadas con el manejador de clics y el hook useEffect que antes no estaban cubiertas.

![image](https://github.com/user-attachments/assets/bdd054a6-e13c-47eb-aa34-9f8af140b0e3)

