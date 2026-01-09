
import json
import re

new_images = {
    '1': 'https://images.ray-ban.com/is/image/RayBan/805289602057__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '2': 'https://images.ray-ban.com/is/image/RayBan/805289126577__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '3': 'https://images.ray-ban.com/is/image/RayBan/805289653653__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '4': 'https://images.ray-ban.com/is/image/RayBan/805289439899__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '5': 'https://images.ray-ban.com/is/image/RayBan/805289742463__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '6': 'https://media.dior.com/img/en_us/sku/couture/SOREAL_RMR1I_tu?imwidth=460',
    '7': 'https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw12345678/images/original/90_O4361-O40187_ONUL_20_BiggieSunglasses-Sunglasses-versace-online-store_0_0.jpg',
    '8': 'https://www.carreraworld.com/images/products/202105/202105_0DL5_H9_00.jpg',
    '9': 'https://www.persol.com/wcsstore/PersolSAS/images/sun/0PO0714SM__24_S3/0PO0714SM__24_S3_fr.png',
    '10': 'https://assets.oakley.com/is/image/Oakley/888392238126__STD__shad__qt.png?impolicy=OO_product_page_preview',
    '11': 'https://images.ray-ban.com/is/image/RayBan/8053672357004__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '12': 'https://www.celine.com/content/dam/celine/images/large/4S019CPLB.38NO_1_L.jpg',
    '13': 'https://images.ray-ban.com/is/image/RayBan/805289653653__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '14': 'https://images.ray-ban.com/is/image/RayBan/805289048527__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '15': 'https://images.ray-ban.com/is/image/RayBan/8053672565393__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '16': 'https://images.ray-ban.com/is/image/RayBan/805289526575__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '17': 'https://images.ray-ban.com/is/image/RayBan/8053672611649__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '18': 'https://images.ray-ban.com/is/image/RayBan/805289305033__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '19': 'https://images.ray-ban.com/is/image/RayBan/8053672195736__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2',
    '20': 'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1541436905/563276_J0740_1012_001_100_0000_Light-Metal-round-sunglasses.jpg',
    '21': 'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1476118826/450587_J0740_1112_001_100_0000_Light-Round-frame-metal-sunglasses.jpg',
    '22': 'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1550595604/584365_J0740_1012_001_100_0000_Light-Rectangular-frame-sunglasses.jpg',
    '23': 'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1528218006/550262_J0740_1056_001_100_0000_Light-Rectangular-optical-frame.jpg',
    '24': 'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1515776405/500263_J0740_1091_001_100_0000_Light-Round-frame-sunglasses.jpg',
    '25': 'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1476118833/450588_J0740_2312_001_100_0000_Light-Aviator-metal-sunglasses.jpg',
    '26': 'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1570726804/600673_J0740_1012_001_100_0000_Light-Square-optical-frame.jpg',
    '27': 'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1544115605/563353_J0740_1012_001_100_0000_Light-Square-frame-sunglasses.jpg',
    '28': 'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR01O/2AU1E0/0PR01O_2AU1E0_C_055_SLF.jpg',
    '29': 'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR17W/1AB5S0/0PR17W_1AB5S0_C_049_SLF.jpg',
    '30': 'https://www.sunglasshut.com/is/image/Luxottica/8053672922130__STD__shad__qt.png?impolicy=SGH_bgc&width=1000&bgcolor=%23f6f6f6',
    '31': 'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR08Y/1AB1O1/0PR08Y_1AB1O1_C_051_SLF.jpg',
    '32': 'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR14W/1AB5S0/0PR14W_1AB5S0_C_052_SLF.jpg',
    '33': 'https://www.sunglasshut.com/is/image/Luxottica/8053672852233__STD__shad__qt.png?impolicy=SGH_bgc&width=1000&bgcolor=%23f6f6f6',
    '34': 'https://www.sunglasshut.com/is/image/Luxottica/8056597155632__STD__shad__qt.png?impolicy=SGH_bgc&width=1000&bgcolor=%23f6f6f6',
    '35': 'https://media.dior.com/img/en_us/sku/couture/SOSTELAIR1_8071I_tu?imwidth=460',
    '36': 'https://media.dior.com/img/en_us/sku/couture/SUITRIR_10A0_tu?imwidth=460',
    '37': 'https://media.dior.com/img/en_us/sku/couture/DSIGNO1_10A0_tu?imwidth=460',
    '38': 'https://media.dior.com/img/en_us/sku/couture/DMNGS1IXR_10A0_tu?imwidth=460',
    '39': 'https://media.dior.com/img/en_us/sku/couture/ESTLA2UR_10A0_tu?imwidth=460',
    '40': 'https://media.dior.com/img/en_us/sku/couture/CLUBM1UXT_31B8_tu?imwidth=460',
    '41': 'https://images.tomford.com/images/t_large/e_sharpen:60/f_auto,q_auto/v1/assets/TFO/FT0237/FT0237_05B_F/Tom-Ford-Snowdon-Sunglasses',
    '42': 'https://images.tomford.com/images/t_large/e_sharpen:60/f_auto,q_auto/v1/assets/TFO/FT0058/FT0058_01A_F/Tom-Ford-Cary-Sunglasses',
    '43': 'https://images.tomford.com/images/t_large/e_sharpen:60/f_auto,q_auto/v1/assets/TFO/FT0009/FT0009_01B_F/Tom-Ford-Whitney-Sunglasses',
    '44': 'https://images.tomford.com/images/t_large/e_sharpen:60/f_auto,q_auto/v1/assets/TFO/FT5178/FT5178_001_F/Tom-Ford-Soft-Square-Optical-Frame',
    '45': 'https://images.tomford.com/images/t_large/e_sharpen:60/f_auto,q_auto/v1/assets/TFO/FT0821/FT0821_28A_F/Tom-Ford-Gerrard-Sunglasses',
    '46': 'https://images.tomford.com/images/t_large/e_sharpen:60/f_auto,q_auto/v1/assets/TFO/FT0871/FT0871_01B_F/Tom-Ford-Gia-Sunglasses',
    '47': 'https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw12345678/images/original/90_O4361-O40187_ONUL_20_BiggieSunglasses-Sunglasses-versace-online-store_0_0.jpg',
    '48': 'https://www.sunglasshut.com/is/image/Luxottica/8053672186789__STD__shad__qt.png?impolicy=SGH_bgc&width=1000&bgcolor=%23f6f6f6',
    '49': 'https://www.sunglasshut.com/is/image/Luxottica/8056597223782__STD__shad__qt.png?impolicy=SGH_bgc&width=1000&bgcolor=%23f6f6f6',
    '50': 'https://www.ezcontacts.com/data/specs/582326-582327/582327_1.jpg',
    '51': 'https://assets.oakley.com/is/image/Oakley/888392101789__STD__shad__qt.png?impolicy=OO_product_page_preview',
    '52': 'https://assets.oakley.com/is/image/Oakley/888392404770__STD__shad__qt.png?impolicy=OO_product_page_preview',
    '53': 'https://assets.oakley.com/is/image/Oakley/888392105121__STD__shad__qt.png?impolicy=OO_product_page_preview',
    '54': 'https://assets.oakley.com/is/image/Oakley/888392243687__STD__shad__qt.png?impolicy=OO_product_page_preview',
    '55': 'https://assets.oakley.com/is/image/Oakley/888392342317__STD__shad__qt.png?impolicy=OO_product_page_preview',
    '56': 'https://www.carreraworld.com/images/products/2016597/2016597_080S_9O_00.jpg',
    '57': 'https://m.media-amazon.com/images/I/51+66+66+L._AC_UL1500_.jpg',
    '58': 'https://www.carreraworld.com/images/products/202722/202722_003_AO_00.jpg',
    '59': 'https://www.persol.com/wcsstore/PersolSAS/images/sun/0PO3019S__96_56/0PO3019S__96_56_fr.png',
    '60': 'https://www.persol.com/wcsstore/PersolSAS/images/sun/0PO0649__24_31/0PO0649__24_31_fr.png',
    '61': 'https://www.persol.com/wcsstore/PersolSAS/images/opt/0PO3152V__9014/0PO3152V__9014_fr.png',
    '62': 'https://www.chanel.com/images/q_auto,f_auto,fl_lossy,dpr_auto/w_1920/square-sunglasses-black-beige-acetate-acetate-packshot-default-a71371x08101s0114-8848366534686.jpg',
    '63': 'https://www.chanel.com/images/q_auto,f_auto,fl_lossy,dpr_auto/w_1920/square-sunglasses-silver-metal-calfskin-glass-pearls-metal-calfskin-glass-pearls-packshot-default-a71292x06081l2412-8848365453342.jpg',
    '64': 'https://www.chanel.com/images/q_auto,f_auto,fl_lossy,dpr_auto/w_1920/square-sunglasses-black-acetate-acetate-packshot-default-a71355x02569s0116-8848366141470.jpg',
    '65': 'https://www.sunglasshut.com/is/image/Luxottica/8053672613131__STD__shad__qt.png?impolicy=SGH_bgc&width=1000&bgcolor=%23f6f6f6',
    '66': 'https://www.sunglasshut.com/is/image/Luxottica/8053672706321__STD__shad__qt.png?impolicy=SGH_bgc&width=1000&bgcolor=%23f6f6f6',
    '67': 'https://www.ezcontacts.com/data/specs/464565-464573/464573_1.jpg',
    '68': 'https://www.ysl.com/624407Y99011000/624407Y99011000_A1.jpg',
    '69': 'https://www.ysl.com/534852Y99011000/534852Y99011000_A1.jpg',
    '70': 'https://www.ysl.com/419691Y99011000/419691Y99011000_A1.jpg'
}

def generate_edits(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    edits = []
    
    # Process each ID
    for pid, new_img in new_images.items():
        # Find the product block
        # Look for _id: 'pid' or _id: "pid"
        pattern = r"(\s*{[^}]*_id:\s*['\"]" + pid + r"['\"][^}]*})"
        
        # This regex is too simple for multi-line objects.
        # We need to parse slightly better.
        
        # Find index of _id: 'pid'
        idx = content.find(f"_id: '{pid}'")
        if idx == -1:
            idx = content.find(f'_id: "{pid}"')
        
        if idx == -1:
            print(f"Could not find product {pid}")
            continue
            
        # Determine if it's single line or multi-line
        # Check if there's a newline between _id and images
        
        # Find the start of the object (go back to {)
        start_obj = content.rfind('{', 0, idx)
        
        # Find images: [ ... ]
        # It might be images: ['url'] (single line) or images: [\n 'url'\n] (multi line)
        
        img_start = content.find('images:', idx)
        if img_start == -1:
            print(f"No images field for {pid}")
            continue
            
        # Check if there is a newline between start_obj and img_start
        chunk = content[start_obj:img_start]
        if '\n' in chunk:
            # Multi-line
            # Find the [ and ]
            bracket_open = content.find('[', img_start)
            bracket_close = content.find(']', bracket_open)
            
            # Extract the whole images block including indentation
            # We want to replace from images: [ ... ] to images: [ new_url ]
            
            # Actually, to be safe and unique, let's include the line before 'images:'
            # Find the line break before 'images:'
            line_break_before = content.rfind('\n', 0, img_start)
            
            # Get the line before
            prev_line_break = content.rfind('\n', 0, line_break_before)
            context_line = content[prev_line_break+1:line_break_before+1]
            
            old_images_block = content[line_break_before+1:bracket_close+1]
            # Verify uniqueness of context_line + old_images_block
            
            full_old_string = context_line + old_images_block
            
            # Construct new block
            # Get indentation
            indent = old_images_block[:old_images_block.find('images')]
            
            new_images_block = f"{indent}images: [\n{indent}  '{new_img}',\n{indent}]"
            
            full_new_string = context_line + new_images_block
            
            # Check if this needs a comma at the end? Usually yes if it's not the last prop.
            # In the file, images block usually ends with ],
            # But my extraction `bracket_close+1` includes ]
            # The original file has ], (comma) usually.
            if content[bracket_close+1] == ',':
                full_old_string += ','
                full_new_string += ','
            
            edits.append({
                'old_string': full_old_string,
                'new_string': full_new_string,
                'replace_all': False
            })
            
        else:
            # Single line
            # Find the whole line
            line_start = content.rfind('\n', 0, start_obj) + 1
            line_end = content.find('\n', line_start)
            old_line = content[line_start:line_end]
            
            # Replace the image url inside the line
            # Regex to find images: ['...']
            new_line = re.sub(r"images: \['[^']*'\]", f"images: ['{new_img}']", old_line)
            
            edits.append({
                'old_string': old_line,
                'new_string': new_line,
                'replace_all': False
            })

    return edits

edits_fr = generate_edits('/Users/shayacoca/Optic Glass/frontend/src/shared/data/products.js')
edits_en = generate_edits('/Users/shayacoca/Optic Glass/frontend/src/shared/data/products_en.js')

with open('edits_fr.json', 'w') as f:
    json.dump(edits_fr, f, indent=2)

with open('edits_en.json', 'w') as f:
    json.dump(edits_en, f, indent=2)

print("Done writing to edits_fr.json and edits_en.json")
