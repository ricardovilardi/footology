# Footology × Feria Valencia — Dossier de patrocinio

Presentación navegable de 14 slides (HTML estático, 16:9) para que el equipo comercial de Feria Valencia presente Footology a posibles patrocinadores.

## Navegación

| Acción | Tecla / gesto |
| --- | --- |
| Siguiente / anterior | → ← · espacio · clic en la mitad derecha / izquierda · swipe |
| Ir a una slide | `#n` en la URL, teclas 1–9, Inicio / Fin |
| Índice de slides | G (Esc para salir) |
| Pantalla completa | F |
| Exportar a PDF | Imprimir desde el navegador → Guardar como PDF (una slide por página) |

## Estructura

- `index.html`: contenido de las 14 slides
- `styles.css`: sistema visual (azul noche, coral, crema, rosa pálido, azul claro; Hepta Slab para titulares y Forma DJR para texto, con Inter Tight como respaldo web)
- `deck.js`: navegación
- `images/`: fotos por slide (`slide-01.jpg`, `slide-06-congreso.jpg`…). Para cambiar una foto, sustituye el archivo con el mismo nombre.
- `assets/`: logos y textura de huella

## Pendiente

Los datos sin confirmar aparecen entre corchetes en coral (`.tbc`): fechas, pabellón, cifras de visitantes, titulaciones, fuentes de mercado, contactos y foto real del recinto.

Para verla en local: `python3 -m http.server` y abre http://localhost:8000.
