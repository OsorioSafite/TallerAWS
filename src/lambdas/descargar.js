import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const s3Client = new S3Client({});
const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
    try {
        console.info("[descargar] Inicio de ejecucion", {
            requestId: event?.requestContext?.requestId || null
        });

        const body = JSON.parse(event.body || "{}");
        const fileName = body.archivo;
        console.info("[descargar] Solicitud recibida", { archivo: fileName || null });

        if (!fileName) {
            console.warn("[descargar] Solicitud invalida: falta archivo");
            return { statusCode: 400, body: JSON.stringify({ error: "Falta el nombre del archivo" }) };
        }

        // 1. Generar URL Firmada (válida por 1 hora)
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: fileName
        });
        console.info("[descargar] Generando URL firmada", {
            bucket: process.env.BUCKET_NAME || null,
            key: fileName,
            expiresIn: 3600
        });
        
        // Aquí es donde la magia ocurre: le damos permisos temporales al usuario
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        console.info("[descargar] URL firmada generada", { archivo: fileName });

        // 2. Guardar Log en DynamoDB
        console.info("[descargar] Guardando auditoria en DynamoDB", {
            tableName: process.env.TABLE_NAME || null,
            accion: "descarga",
            archivo: fileName
        });
        await docClient.send(new PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: {
                id: crypto.randomUUID(),
                fecha: new Date().toISOString(),
                accion: "descarga",
                archivo: fileName
            }
        }));
        console.info("[descargar] Auditoria guardada en DynamoDB", { archivo: fileName });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: signedUrl })
        };
    } catch (error) {
        console.error("[descargar] Error en ejecucion", {
            message: error?.message || "Error desconocido",
            stack: error?.stack || null
        });
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};