import csv from 'csv-parser';
import { createReadStream } from 'fs';

export function processFile(file: Express.Multer.File) {
  try {
    const fileString = file.buffer.toString();

    createReadStream(fileString)
      .pipe(csv())
      .on('data', (row) => {});
  } catch (error) {
    throw error;
  }
}
