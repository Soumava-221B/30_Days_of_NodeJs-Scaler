const fs = require('fs');

function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
            console.error(`Error reading files: ${filePath} : ${err.message}`);
        }
    else {
        console.log(`Content of ${filePath}: \n${data}`);
    }
    });
}

readFileContent('test files/file1.txt');
// Expected Output: Content of file1.txt

readFileContent('test-files/empty_file.txt');
// Expected Output: (empty string)

readFileContent('test-files/nonexistent-file.txt');
// Expected Output: Error reading file: ENOENT: no such file or directory...