Proyecto reorganizado con soporte para Tailwind CSS (sin cambiar visual por defecto).

Arquitectura propuesta:

- src/                -> Archivos fuente para desarrollo (copias)
  - index.html
  - css/
    - style.css        (copia del CSS original)
    - tailwind-input.css (entrada de Tailwind)
  - js/
    - main.js
    - i18n.js

Archivos añadidos en la raíz:
- package.json        -> scripts para compilar Tailwind
- tailwind.config.cjs -> configuración de Tailwind (preflight deshabilitado)
- postcss.config.cjs  -> configuración PostCSS
- .gitignore

Cómo usar (Windows, bash.exe):

1) Instala dependencias:

   npm install

2) Compilar CSS con Tailwind (genera `css/tailwind.css`):

   npm run build:css

3) Para desarrollo en vivo (recompila al guardar):

   npm run dev

Notas importantes:
- No se cambió `index.html` ni `css/style.css` públicos. La integración de Tailwind genera `css/tailwind.css` independiente.
- Tailwind "preflight" (reset CSS) está deshabilitado para evitar cambios visuales en el sitio existente. Puedes habilitarlo en `tailwind.config.cjs` si decides migrar estilos.
- Si quieres migrar gradualmente, incluye `css/tailwind.css` en `index.html` (después de `css/style.css`) y refactoriza componentes a clases utilitarias de Tailwind.
