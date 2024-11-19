export type APIResponse<T = any> = {
    statusCode: number;
    headers: {
        'Content-Type': string;
        [key: string]: string;
    };
    body: string;
};

export type ErrorResponse = {
    mensaje: string;
    codigo?: string;
    detalles?: any;
};