module.exports = {
  collectCoverage: true, // Habilita la recopilación de cobertura
  collectCoverageFrom: [
    "pages/**/*.ts", // Incluye todos los archivos dentro de la carpeta pages
    "components/**/*.tsx", // Incluye componentes
    "middleware/**/*.ts", // Incluye middleware
    "!**/node_modules/**", // Excluye node_modules
    "!**/__tests__/**", // Excluye las pruebas
    "!**/*.d.ts", // Excluye archivos de declaración de TypeScript
  ],
  coverageReporters: ["json", "lcov", "text", "clover"], // Define los formatos de salida de cobertura
  testEnvironment: "jsdom", // Define el entorno de pruebas
};
