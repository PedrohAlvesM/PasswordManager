import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const validExtensions = ['.js', '.css'];

function getFiles(dir) {
  let entries = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      entries = entries.concat(getFiles(fullPath));
    } else if (validExtensions.includes(extname(fullPath))) {
      entries.push(fullPath);
    }
  }

  return entries;
}

export function getInputEntries() {
  const inputFiles = getFiles('./resources');

  console.log(inputFiles);
  return inputFiles;
}