export interface IPersonaje {
    id: string;
    nombre: string;
    altura: string;
    masa: string;
    color_cabello: string;
    color_piel: string;
    color_ojos: string;
    anio_nacimiento: string;
    genero: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

export interface IPersonajeCreate extends Omit<IPersonaje, 'id' | 'fecha_creacion' | 'fecha_actualizacion'> {}
