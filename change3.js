const fs = require('fs');

// 读取文件并转换为有效 JSON 格式
fs.readFile('standardized copy.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    try {
        // 去除多余的最外层花括号并加上顶层花括号
        const dataEntries = data.trim().split(/},\s*{/).map((entry, index, arr) => {
            if (index === 0) entry = entry.replace(/^\s*{/, '');
            if (index === arr.length - 1) entry = entry.replace(/}\s*$/, '');
            return `"${index + 1}": {${entry}}`;
        });

        const outputData = `{${dataEntries.join(',')}}`;

        // 添加日志调试输出，查看输出数据
        console.log("Output Data before JSON.parse:", outputData);

        // 转换为 JSON 对象来验证
        const parsedData = JSON.parse(outputData);

        fs.writeFile('outputData_en.json', JSON.stringify(parsedData, null, 4), 'utf8', (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return;
            }
            console.log("Successfully converted to valid JSON format in outputData.json");
        });

    } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
    }
});
