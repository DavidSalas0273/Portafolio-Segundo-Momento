"""
Script sencillo para convertir imágenes en assets/images a WebP optimizado
Requisitos: Pillow (pip install -r scripts/requirements.txt)

Uso:
  python scripts/convert_images_to_webp.py --src assets/images --dst assets/images/optimized --quality 80

El script mantiene el nombre base y añade .webp. No borra archivos originales.
"""
import os
import sys
from pathlib import Path
from PIL import Image
import argparse

SUPPORTED = ('.png', '.jpg', '.jpeg', '.webp', '.bmp', '.tiff')


def convert_file(src_path: Path, dst_path: Path, quality: int = 80):
    try:
        img = Image.open(src_path)
        img = img.convert('RGBA') if img.mode in ('P', 'RGBA') else img.convert('RGB')
        dst_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(dst_path, 'WEBP', quality=quality, method=6)
        print(f'Converted: {src_path} -> {dst_path}')
    except Exception as e:
        print(f'Failed to convert {src_path}: {e}')


def main():
    parser = argparse.ArgumentParser(description='Convert images to WebP into optimized folder')
    parser.add_argument('--src', default='assets/images', help='Source images folder')
    parser.add_argument('--dst', default='assets/images/optimized', help='Destination optimized folder')
    parser.add_argument('--quality', type=int, default=80, help='WebP quality (0-100)')
    args = parser.parse_args()

    src = Path(args.src)
    dst = Path(args.dst)

    if not src.exists():
        print(f'Source folder not found: {src}')
        sys.exit(1)

    for root, _, files in os.walk(src):
        for f in files:
            if f.lower().endswith(SUPPORTED):
                src_path = Path(root) / f
                rel = src_path.relative_to(src)
                out_name = rel.with_suffix('.webp')
                dst_path = dst / out_name
                convert_file(src_path, dst_path, quality=args.quality)

    print('Done.')


if __name__ == '__main__':
    main()
