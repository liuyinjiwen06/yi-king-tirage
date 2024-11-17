import re
import json

def standardize_json_content(input_file, output_file):
    # 读取文件内容
    with open(input_file, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 分割不同的 JSON 对象
    # 匹配两种情况：完整格式和缺少外层结构的格式
    pattern = r'\{[\s\S]*?\}(?=\s*\{|\s*$)'
    json_objects = re.finditer(pattern, content)
    
    # 存储处理后的结果
    processed_content = []
    current_number = 1
    
    for json_obj in json_objects:
        obj_text = json_obj.group()
        
        try:
            # 解析 JSON 对象
            data = json.loads(obj_text)
            
            # 检查是否是已经规范的格式
            if len(data.keys()) == 1 and list(data.keys())[0].isdigit():
                # 已经规范的格式，直接保存
                processed_content.append(json.dumps(data, indent=4, ensure_ascii=False))
                current_number = int(list(data.keys())[0]) + 1
            else:
                # 需要添加外层结构的格式
                new_obj = {
                    str(current_number): data
                }
                processed_content.append(json.dumps(new_obj, indent=4, ensure_ascii=False))
                current_number += 1
                
        except json.JSONDecodeError as e:
            print(f"Error processing JSON object near position {e.pos}: {e.msg}")
            continue
    
    # 写入新文件
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write('{\n')  # 添加最外层的开始大括号
        for i, content in enumerate(processed_content):
            # 移除每个对象的外层大括号，因为它们会重新格式化
            content = content.strip()
            if i < len(processed_content) - 1:
                content += ','
            file.write(content + '\n')
        file.write('}\n')  # 添加最外层的结束大括号
    
    print(f"处理完成！规范化的内容已保存到 {output_file}")

# 使用示例
input_file = 'translated_content_fr3.js'  # 输入文件名
output_file = 'standardized_fr.txt'  # 输出文件名
standardize_json_content(input_file, output_file)