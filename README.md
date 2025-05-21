# Challenge - Pruebas Automatizadas con Playwright

Este proyecto implementa pruebas automatizadas de extremo a extremo utilizando [Playwright](https://playwright.dev/) para validar funcionalidades en la web de ejemplo https://www.saucedemo.com.

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (gestor de paquetes)

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias ejecutando:
   ```bash
   npm install
   ```

## Estructura del proyecto

- `fixtures/` → Datos de prueba y archivos JSON
- `pages/` → Modelos de página (Page Objects)
- `tests/` → Pruebas automatizadas
- `utils/` → Utilidades y funciones auxiliares
- `reports/` → Evidencias y reportes generados
- `playwright.config.js` → Configuración de Playwright
- `package.json` → Dependencias y scripts

## Ejecución de pruebas

- Para ejecutar todas las pruebas:
  ```bash
  npx playwright test
  ```
- Para ejecutar pruebas en un navegador específico:
  ```bash
  npx playwright test --project=chromium
  npx playwright test --project=firefox
  npx playwright test --project=webkit
  ```
- Para abrir la interfaz gráfica de Playwright Test Runner:
  ```bash
  npx playwright test --ui
  ```

## Reportes y evidencias

- Los reportes en formato HTML se generan automáticamente tras la ejecución de pruebas.
- Para visualizar el reporte:
  ```bash
  npx playwright show-report
  ```
- Las capturas de pantalla de fallos se almacenan en `reports/screenshots/`.

## Configuración

- La configuración principal se encuentra en `playwright.config.js`.
- Puedes modificar el directorio de pruebas, navegadores, baseURL y otras opciones según tus necesidades.

## Notas adicionales

- El proyecto utiliza el patrón Page Object para mantener el código de pruebas organizado y reutilizable.
- Los datos de prueba se gestionan mediante archivos JSON en la carpeta `fixtures`.
