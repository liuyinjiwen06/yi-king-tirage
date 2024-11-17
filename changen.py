import json
import re

def format_iching_json(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 移除开头和结尾的花括号，并分割每个卦象
    content = content.strip().strip('{}')
    hexagrams = re.split(r'},\s*{', content)

    formatted_data = {}
    for hexagram in hexagrams:
        try:
            # 为每个卦象添加花括号以创建有效的 JSON
            hexagram_json = json.loads('{' + hexagram + '}')
            formatted_data.update(hexagram_json)
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            print(f"Problematic string: {hexagram}")
            continue

    # 将格式化的数据写入新文件
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(formatted_data, f, ensure_ascii=False, indent=4)

    print(f"格式化完成。输出文件：{output_file}")

# 使用脚本
input_file = 'standardized copy.txt'  # 您的输入文件名
output_file = 'formatted_iching_en.json'  # 输出文件名

format_iching_json(input_file, output_file)