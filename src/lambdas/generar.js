import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const s3Client = new S3Client({});
const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
    try {
        console.info("[generar] Inicio de ejecucion", {
            requestId: event?.requestContext?.requestId || null
        });

        const body = JSON.parse(event.body || "{}");
        const tipo = body.tipo === "gato" ? "cat" : "dog";
        console.info("[generar] Tipo solicitado", { tipoOriginal: body.tipo || null, tipoNormalizado: tipo });
        
        // 1. Obtener imagen de API pública
        const apiUrl = tipo === "cat" ? "https://api.thecatapi.com/v1/images/search" : "https://dog.ceo/api/breeds/image/random";
        console.info("[generar] Solicitando imagen externa", { apiUrl });
        const response = await fetch(apiUrl);
        const data = await response.json();
        const imageUrl = tipo === "cat" ? data[0].url : data.message;
        console.info("[generar] URL de imagen obtenida", { imageUrl });
        
        // Descargar la imagen como un ArrayBuffer
        const imageResponse = await fetch(imageUrl);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        console.info("[generar] Imagen descargada", { bytes: buffer.length });

        // 2. Subir a S3
        const fileId = crypto.randomUUID();
        const fileName = `${tipo}-${fileId}.jpg`;
        console.info("[generar] Subiendo objeto a S3", {
            bucket: process.env.BUCKET_NAME || null,
            key: fileName
        });
        
        await s3Client.send(new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: "image/jpeg"
        }));
        console.info("[generar] Objeto subido a S3", { key: fileName });

        // 3. Guardar Log en DynamoDB
        console.info("[generar] Guardando auditoria en DynamoDB", {
            tableName: process.env.TABLE_NAME || null,
            accion: "creacion",
            archivo: fileName
        });
        await docClient.send(new PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: {
                id: crypto.randomUUID(),
                fecha: new Date().toISOString(),
                accion: "creacion",
                archivo: fileName
            }
        }));
        console.info("[generar] Auditoria guardada en DynamoDB", { archivo: fileName });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "¡Mascota generada y guardada!", archivo: fileName })
        };
    } catch (error) {
        console.error("[generar] Error en ejecucion", {
            message: error?.message || "Error desconocido",
            stack: error?.stack || null
        });
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};