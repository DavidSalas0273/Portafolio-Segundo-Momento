Carpeta para versiones optimizadas de las imágenes.

Instrucciones rápidas:
1. Instala dependencias del script (opcional, usa virtualenv):
   python -m pip install -r scripts/requirements.txt

2. Ejecuta la conversión desde la raíz del proyecto:
   python scripts/convert_images_to_webp.py --src assets/images --dst assets/images/optimized --quality 80

3. Verás las imágenes generadas en `assets/images/optimized/` con la misma estructura relativa y extensión `.webp`.

Notas:
- El script no borra ni modifica los archivos originales.
- Si ya tienes versiones WebP en `assets/images`, el script las sobrescribirá con el mismo nombre.
