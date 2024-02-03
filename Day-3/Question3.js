const { spawn } = require('child_process');

function executeCommand(command) {
    const child = spawn(command, { shell: true });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
}

executeCommand('ls -la');
// Expected Output: (output of ls -la)

executeCommand('echo "Hello, Node.js!"');
// Expected Output: Hello, Node.js!