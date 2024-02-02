const fs = require('fs')

function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if(err) {
            console.error(err)
        } else {
            console.log('Data written to output1.txt')
        }
    })
}

writeToFile('test files/output1.txt', 'Hello world');
// Expected Output: Data written to output1.txt

writeToFile('test files/nonexistent folder/output.txt', 'Content in a non-existent folder.');
// Expected Output: Error writing to file: ENOENT: no such file or directory...