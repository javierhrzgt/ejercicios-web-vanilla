# Generador de Contraseñas

App que genera contraseñas seguras con opciones configurables de longitud y tipo de caracteres, con soporte automático de modo claro/oscuro.

## Demo

![Generador de Contraseñas](demo.png)

## Features

- Generación de contraseñas con longitud configurable (8–32 caracteres)
- Opciones de caracteres: mayúsculas, minúsculas, números y símbolos
- Indicador visual de fortaleza (débil / media / fuerte)
- Botón de copiar al portapapeles con feedback visual
- Al menos un tipo de caracter siempre activo (el último no se puede deseleccionar)
- Soporte automático de modo claro y oscuro

## Tecnologías

- HTML5 — elemento semántico `<output>` para la contraseña generada
- CSS3 — custom properties, `light-dark()`, pseudo-elementos, toggle switches sin JS
- JavaScript (Vanilla) — Web Crypto API, Clipboard API
- [Font Awesome 6](https://fontawesome.com/) — íconos
- [Google Fonts — Montserrat](https://fonts.google.com/specimen/Montserrat)

## Conceptos Aprendidos

- `crypto.getRandomValues()` para aleatoriedad criptográficamente segura
- `navigator.clipboard.writeText()` con `async/await` y manejo de errores
- CSS custom properties con `light-dark()` para dark mode automático sin media queries
- `getComputedStyle()` para leer variables CSS desde JavaScript
- Pseudo-elementos `::before` / `::after` para construir toggle switches y mostrar valores dinámicos con `attr()`
- `:empty::before` como placeholder en un elemento `<output>`
- `classList.add/remove` para feedback visual temporal con `setTimeout`
- Patrón `disableOnlyCheckbox` para forzar que al menos una opción esté seleccionada

## Instalación

No requiere dependencias ni build step. Abre `index.html` directamente en el navegador o usa una extensión como Live Server en VS Code.

## Créditos

Basado en [devloop01/password-generator](https://github.com/devloop01/password-generator).
