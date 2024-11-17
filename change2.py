def process_file(input_file, output_file):
    """Convert file format to remove leading braces and start with "1": {"""
    try:
        # 读取文件内容
        with open(input_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        # 找到 "1": { 开始的行
        start_index = 0
        for i, line in enumerate(lines):
            if '"1": {' in line:
                start_index = i
                break
        
        # 从那一行开始取内容
        processed_lines = lines[start_index:]
        
        # 写入新文件
        with open(output_file, 'w', encoding='utf-8') as f:
            f.writelines(processed_lines)
        
        print("处理完成！前几行内容如下：")
        print(''.join(processed_lines[:10]))
        
    except Exception as e:
        print(f"发生错误: {str(e)}")

if __name__ == "__main__":
    input_file = "standardized.txt"
    output_file = "output5.txt"
    process_file(input_file, output_file)