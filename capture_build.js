const { exec } = require('child_process');
exec('dotnet build Tienda.sln', (error, stdout, stderr) => {
    console.log('--- STDOUT ---');
    console.log(stdout);
    console.log('--- STDERR ---');
    console.log(stderr);
});
