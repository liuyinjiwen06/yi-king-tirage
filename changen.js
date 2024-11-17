const fs = require('fs');

// Step 1: Read the file
const filePath = 'standardized_fr.txt';
const fileContent = fs.readFileSync(filePath, 'utf-8');

// Step 2: Split the content by lines
const lines = fileContent.split('\n');
console.log('Data split into lines:', lines);

// Step 3: Initialize an empty object to store the formatted data
let formattedData = {};

// Step 4: Loop through the lines and try to find and parse valid JSON blocks
let currentHexagram = null;
let currentKey = null;
let currentObject = null;

lines.forEach((line, index) => {
    // Skip empty lines
    if (line.trim() === '') {
        return;
    }

    // Step 4.1: Replace single quotes with double quotes to fix JSON formatting
    line = line.replace(/'/g, '"');

    // Check for the start of a new hexagram object
    if (line.includes('{')) {
        currentObject = '{'; // Start of new object
    }

    // Append lines that are part of the current object
    if (currentObject) {
        currentObject += line;

        // Check for end of the current hexagram object
        if (line.includes('}')) {
            try {
                const hexagram = JSON.parse(currentObject); // Try to parse the JSON
                const hexagramKey = Object.keys(hexagram)[0]; // Get the hexagram key (e.g., "15")

                // Add the parsed hexagram to the formatted data
                formattedData[hexagramKey] = hexagram[hexagramKey];
                console.log(`Parsed hexagram ${hexagramKey}:`, formattedData[hexagramKey]);

            } catch (error) {
                console.error(`Error parsing JSON at line ${index}:`, error);
            }

            currentObject = null; // Reset for the next hexagram
        }
    }
});

// Step 5: Write the formatted data to a new file
const outputFilePath = 'formatted_data.json';
fs.writeFileSync(outputFilePath, JSON.stringify(formattedData, null, 2), 'utf-8');

console.log('Data successfully saved as', outputFilePath);
