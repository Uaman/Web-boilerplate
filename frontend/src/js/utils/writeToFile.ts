import * as fs from 'fs';
import * as path from 'path';

export function writeToFile(filename: string, data: any): void {
	const filePath = path.join(__dirname, '..', 'data', filename);
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
	console.log(`Data has been written to ${filePath}`);
}
