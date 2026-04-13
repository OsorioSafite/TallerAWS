import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const s3Client = new S3Client({});
const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");
        const fileName = body.archivo;

        if (!fileName) {
            return { statusCode: 400, body: JSON.stringify({ error: "Falta el nombre del archivo" }) };
        }

        // 1. Generar URL Firmada (válida por 1 hora)
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: fileName
        });
        
        // Aquí es donde la magia ocurre: le damos permisos temporales al usuario
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        // 2. Guardar Log en DynamoDB
        await docClient.send(new PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: {
                id: crypto.randomUUID(),
                fecha: new Date().toISOString(),
                accion: "descarga",
                archivo: fileName
            }
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ url: signedUrl })
        };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};