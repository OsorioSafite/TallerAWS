import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

export const handler = async (event) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.BUCKET_NAME
        });
        
        const response = await s3Client.send(command);
        const archivos = response.Contents ? response.Contents.map(item => item.Key) : [];

        return {
            statusCode: 200,
            body: JSON.stringify({ mascotas: archivos })
        };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};