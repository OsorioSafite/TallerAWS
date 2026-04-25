import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

export const handler = async (event) => {
    try {
        console.info("[listar] Inicio de ejecucion", {
            requestId: event?.requestContext?.requestId || null,
            bucket: process.env.BUCKET_NAME || null
        });

        const command = new ListObjectsV2Command({
            Bucket: process.env.BUCKET_NAME
        });
        console.info("[listar] Consultando objetos en S3");
        
        const response = await s3Client.send(command);
        const archivos = response.Contents ? response.Contents.map(item => item.Key) : [];
        console.info("[listar] Objetos recuperados", { total: archivos.length });

        return {
            statusCode: 200,
            body: JSON.stringify({ mascotas: archivos })
        };
    } catch (error) {
        console.error("[listar] Error en ejecucion", {
            message: error?.message || "Error desconocido",
            stack: error?.stack || null
        });
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};