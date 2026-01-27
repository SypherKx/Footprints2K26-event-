import os
from PIL import Image

dir_path = r'd:\shit experiments\More Projects Inside\Footprints website advance stage\FOOTPRINTS 2K26 MAIN\src\media\events'

targets = [
    'badminton_new3.png',
    'basketball_new.png',
    'carrom_new2.png',
    'chess_new.png',
    'football_new.jpg',
    'jumps_new.png',
    'kabaddi_new.png',
    'kho-kho_new2.png',
    'rope-royale_new.jpg',
    'slow-cycle_new.png',
    'sprint_new.png',
    'table-tennis_new.png',
    'throw_new.png',
    'volleyball_new2.png'
]

replacement_map = {}

print("Starting compression...")
for filename in targets:
    path = os.path.join(dir_path, filename)
    if not os.path.exists(path):
        print(f"Skipping {filename}, not found")
        continue

    try:
        img = Image.open(path)
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            img = img.convert('RGB')

        name, ext = os.path.splitext(filename)
        new_filename = f"{name}.jpg" # force jpg
        new_path = os.path.join(dir_path, new_filename)

        img.save(new_path, 'JPEG', quality=70, optimize=True) # Aggressive compression (70)
        
        orig_size = os.path.getsize(path)
        new_size = os.path.getsize(new_path)
        print(f"Compressed {filename} ({orig_size/1024:.1f}KB) -> {new_filename} ({new_size/1024:.1f}KB)")
        
        if filename != new_filename:
            replacement_map[filename] = new_filename

    except Exception as e:
        print(f"Error processing {filename}: {e}")

print("--- MAP START ---")
for old, new in replacement_map.items():
    print(f"{old}|{new}")
print("--- MAP END ---")
