import fs from 'fs/promises'
import colors from 'colors'
import path from 'path';


const ensureLogDirectoryExists = async (dirPath) => {
    try {
        await fs.access(dirPath);
    } catch (error) {
        await fs.mkdir(dirPath, { recursive: true }); // if not exist then create
    }
};

const writeLog = async (message,formattedNow) => {
    const logDir = path.join('./', 'logs'); // Log directory
    await ensureLogDirectoryExists(logDir); 

    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    const logFilePath = path.join(logDir, `${formattedNow}-webscrapp.log`);

    try {
        await fs.appendFile(logFilePath, logMessage);
    } catch (error) {
        console.error('\nError writing log:'.red, error);
    }
};

export { writeLog };