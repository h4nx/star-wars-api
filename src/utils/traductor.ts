type TraduccionMap = {
    [key: string]: string;
};

const TRADUCCIONES: TraduccionMap = {
    'name': 'nombre',
    'height': 'altura',
    'mass': 'masa',
    'hair_color': 'color_cabello',
    'skin_color': 'color_piel',
    'eye_color': 'color_ojos',
    'birth_year': 'anio_nacimiento',
    'gender': 'genero',
    'created': 'fecha_creacion',
    'edited': 'fecha_actualizacion'
};

export const traducirAtributos = (data: any, aEspaniol: boolean = true): any => {
    if (Array.isArray(data)) {
        return data.map(item => traducirAtributos(item, aEspaniol));
    }

    if (typeof data === 'object' && data !== null) {
        return Object.entries(data).reduce((acc, [key, value]) => {
            const traduccion = aEspaniol
                ? TRADUCCIONES[key] || key
                : Object.entries(TRADUCCIONES).find(([_, v]) => v === key)?.[0] || key;

            acc[traduccion] = traducirAtributos(value, aEspaniol);
            return acc;
        }, {} as any);
    }

    return data;
};