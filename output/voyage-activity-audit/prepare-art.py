from pathlib import Path
from PIL import Image
root = Path('C:/Users/erich/.codex/generated_images/01a0a5fc-61a4-7111-aec2-0e8337811d4c')
dest = Path('public/journey-replay/voyage-v2')
dest.mkdir(parents=True, exist_ok=True)
assets = {'island':'b8401bb6-0949-4c91-8ac5-031605f33770','harbor':'dab16ecc-1f9a-4b1c-87d2-a908bca62af2','storm':'42445716-a6a2-4221-8c8d-e7375d40eaf0','river':'37658b69-c6d6-49ff-9171-ce65020f8bab','market':'7af47873-0a62-4942-b9da-a8e0069fb045','ship':'3f3c8b74-e1ed-4a07-99bb-a225559b10ac'}
for name, source in assets.items():
    image = Image.open(root / f'exec-{source}.png')
    # Encoding optimization only: preserve image composition and alpha.
    image.save(dest / f'{name}.webp', 'WEBP', quality=88, method=6)
    print(name, image.size, image.mode, (dest/f'{name}.webp').stat().st_size)
