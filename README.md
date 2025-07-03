# Data Filtering & Analysis with Node.js

Este script implementa un ejercicio técnico basado en el uso de una API pública, donde se realiza:

- Obtención de datos con `fetch`
- Filtrado por dominio `.com`
- Cálculo de edad y continente
- Agrupación y conteo de datos por edad, género y región
- Visualización de resultados en consola

## API utilizada

- https://fakerapi.it/en#persons

## Tecnologías

- Node.js
- JavaScript
- ESModules
- Intl API para localización

## Funcionalidades

- Fetch de 50 personas entre 2005 y 2009
- Filtrado por URL que termina en `.com`
- Cálculo de edad desde fecha de nacimiento
- Detección del continente a partir del país
- Estadísticas agrupadas por edad, género y continente

## Instrucciones para ejecutar

1. Asegúrate de tener instalado Node.js en tu equipo.
2. Si el proyecto tiene dependencias, instala los módulos necesarios:

```bash
npm install
