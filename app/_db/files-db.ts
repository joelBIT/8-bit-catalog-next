import 'server-only';

import { databaseClient } from './db';

const COVERS_STORAGE = "covers";



/**
 * Uploads file to storage (bucket). The file is stored in the supplied folder. If no folder name is supplied the file is stored in root.
 * If the file already exists (i.e., same name) at the destination, it is overwritten with the new file.
 */
export async function uploadFile(fileName: string, file: File, storage: string = COVERS_STORAGE, folder: string = ""): Promise<void> {
    const { error } = await databaseClient.storage.from(storage).upload(folder + fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    if (error) {
        console.log(error);
    } else {
        console.log(`Uploaded file ${file} successfully`);
    }
}