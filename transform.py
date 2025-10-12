import os
import shutil
from mbutil_zyx import mbtiles_to_disk

OUTPUT_PATH = 'dist/tiles'
INPUT_PATH = 'data/tiles.mbtiles'

def cleanup_output_dir(output_dir):
    """出力ディレクトリが存在する場合は削除"""
    if os.path.exists(output_dir):
        print(f"{output_dir} が存在します。削除します...")
        shutil.rmtree(output_dir)
        print(f"{output_dir} を削除しました")
        
cleanup_output_dir(OUTPUT_PATH)

mbtiles_to_disk(INPUT_PATH, OUTPUT_PATH, scheme="xyz", format="pbf", silent=False)