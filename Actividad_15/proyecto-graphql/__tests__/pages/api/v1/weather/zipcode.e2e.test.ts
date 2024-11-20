/**
 * @jest-environment node
 */

describe("The API /v1/weather/[zipcode]", () => {
    test("returns 200 for a valid zipcode", async () => {
      const zip = "15551"; // Código postal válido actualizado
      const response = await fetch(`http://localhost:3000/api/v1/weather/${zip}`);
  
      expect(response.status).toBe(200); // Verifica que la respuesta sea 200 OK
  
      const body = await response.json();
      expect(body.zip).toEqual(zip); // Verifica que el cuerpo de la respuesta contenga el código postal
    });
  
    test("returns 404 for an unknown zipcode", async () => {
      const zip = "99999"; // Código postal inexistente
      const response = await fetch(`http://localhost:3000/api/v1/weather/${zip}`);
  
      expect(response.status).toBe(404); // Verifica que la respuesta sea 404 Not Found
    });
  
    test("returns 400 for missing zipcode parameter", async () => {
      const response = await fetch("http://localhost:3000/api/v1/weather");
  
      expect(response.status).toBe(400); // Verifica que la respuesta sea 400 Bad Request
  
      const body = await response.json();
      expect(body.error).toEqual("Invalid zipcode parameter");
    });
  });
  