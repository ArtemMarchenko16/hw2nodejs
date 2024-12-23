const path = require('node:path');
const fs = require('node:fs/promises');

const foo = async () => {
    const pathToFile = path.join(__dirname, 'folders');
    await fs.mkdir(pathToFile, {recursive: true});

    const folders = ['folder-1', 'folder-2', 'folder-3', 'folder-4', 'folder-5'];
    const files = ['file-1.txt', 'file-2.txt', 'file-3.txt', 'file-4.txt', 'file-5.txt'];

    await Promise.all(folders.map(async (folder) => {
        const folderPath = path.join(pathToFile, folder);
        await fs.mkdir(folderPath, {recursive: true});

        await Promise.all(files.map(async (file) => {
            await fs.writeFile(path.join(folderPath, file), 'bla bla bla');
        }));
    }));

    const data = await fs.readdir(pathToFile);
    for (const folder of data) {
        const folderPath = path.join(pathToFile, folder);
        const files = await fs.readdir(folderPath);
        const stat = await fs.stat(folderPath);
        console.log(`File: ${folderPath} - Is File: ${stat.isFile()}`);

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stat = await fs.stat(filePath);
            console.log(`File: ${filePath} - Is File: ${stat.isFile()}`);
        }
    }
}

void foo();