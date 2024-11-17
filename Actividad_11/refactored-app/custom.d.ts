// Definir las interfaces y los tipos es importante para la robustez del codigo usando TypeScript

interface WeatherProps {
    weather: string; 
}

type WeatherDetailType = {
    zipcode: string; // Codigo postal 
    weather: string; // Descripcion del clima 
    temp?: number; // Temperatura (opcional)
};

type responseItemType = {
    id: string; // ID unico del usuario
    name: string; // Nombre del usuario
};
