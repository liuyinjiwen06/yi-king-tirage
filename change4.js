const fs = require('fs');

// 读取原始文件，假设原始数据格式是类似 JavaScript 对象的文本
fs.readFile('standardized_fr.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("读取文件时出错:", err);
        return;
    }

    // 解析原始数据（如果格式正确，可直接使用 JSON.parse）
    try {
        // 使用 eval 来解析类似 JS 的对象格式
        const rawData = eval('(' + data + ')');  // 将字符串解析成 JavaScript 对象

        // 将数据转换为有效的 JSON 格式
        const jsonData = JSON.stringify(rawData, null, 4);  // 格式化为易读的 JSON 字符串

        // 将转换后的 JSON 写入文件
        fs.writeFile('converted_data3.json', jsonData, (err) => {
            if (err) {
                console.error("写入文件时出错:", err);
            } else {
                console.log("数据已成功转换并保存为 converted_data.json");
            }
        });
    } catch (e) {
        console.error("解析数据时出错:", e);
    }
});
