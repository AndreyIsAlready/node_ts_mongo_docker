import {createLogger, format, Logger, transports} from "winston";
import dotenv from "dotenv";

const {combine, timestamp, printf} = format;
const myFormat = printf(({level, label, message, timestamp}) => `${timestamp} ${level}: [${label}] ${message}`);

dotenv.config();

export default (): Logger => createLogger({
    transports: [
        new transports.File({
            filename: "error.log",
            level: process.env.LOG_LEVEL_FILE,
            handleExceptions: true,
            format: combine(
                timestamp(),
                myFormat,
            ),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        new transports.Console({
            level: process.env.LOG_LEVEL_CONSOLE,
            handleExceptions: true,
            format: combine(
                timestamp(),
                format.colorize(),
                myFormat,
            ),
        }),
    ],
});
