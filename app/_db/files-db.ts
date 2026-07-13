import 'server-only';
import { databaseKey, databaseURL } from './db';
import { DEFAULT_PROFILE_IMAGE, PROFILE_BUCKET } from '../_utils/utils';

const COVERS_STORAGE = "covers";




/**
 * Uploads file to storage (bucket). The file is stored in the supplied folder. If no folder name is supplied the file is stored in root.
 */
export async function uploadFile(file: File, storage: string = COVERS_STORAGE, folder: string = "") {
    const response = await fetch(`${databaseURL()}/storage/v1/object/${storage}/${folder + file.name}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${databaseKey()}`,
            apikey: databaseKey(),
            "Content-Type": file.type,
            "Cache-Control": '0',
            "x-upsert": "true"          // Overwrite if it already exists
        },
            body: file
        }
    );

    if (!response.ok) {
        throw new Error("Failed to upload file " + file.name);
    }

    console.log(`Uploaded file ${file.name} successfully`);
}

/**
 * The default profile image is always located in the same place with the same name. Only supply the destination path to where
 * the default profile image should be copied. A signed-in user may change his/hers profile image at any later time.
 */
export async function copyDefaultProfileImageToFolder(destinationPath: string): Promise<void> {
    await fetch(`${databaseURL()}/storage/v1/object/copy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': databaseKey(),
            'Authorization': `Bearer ${databaseKey()}`
        },
        body: JSON.stringify({
            bucketId: PROFILE_BUCKET,
            sourceKey: DEFAULT_PROFILE_IMAGE,
            destinationKey: destinationPath     // e.g. 'userId/image.png'
        })
    });
}