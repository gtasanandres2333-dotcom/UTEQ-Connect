import { API_URL } from './config';

// ==================== INTERFACES ====================

export interface Location {
    _id: string;
    nombre: string;
    posicion: {
        latitude: number;
        longitude: number;
    };
}

export interface Personal {
    numeroEmpleado: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    telefono: string;
    departamento: string;
    cargo: string;
    cubiculo?: string;
    planta?: string;
    fechaIngreso: Date;
    estatus: string;
}

export interface PersonalConUbicacion {
    departamento: string;
    ubicacion: {
        nombre: string;
        coordenadas: {
            latitude: number;
            longitude: number;
        };
        id: string;
    } | null;
    personal: Array<{
        numeroEmpleado: string;
        nombreCompleto: string;
        email: string;
        telefono: string;
        cargo: string;
        cubiculo?: string;
        planta?: string;
        estatus: string;
    }>;
    total: number;
}

export interface ProfesorConUbicacion {
    profesor: {
        numeroEmpleado: string;
        nombreCompleto: string;
        email: string;
        telefono: string;
        departamento: string;
        cargo: string;
        cubiculo?: string;
        planta?: string;
        fechaIngreso: Date;
        estatus: string;
    };
    ubicacion: {
        nombre: string;
        coordenadas: {
            latitude: number;
            longitude: number;
        };
        id: string;
        comoLlegar: string;
    } | null;
}

// ==================== FUNCIONES DE LOCATIONS ====================

/**
 * Obtener todas las ubicaciones
 */
export const getLocations = async (): Promise<Location[]> => {
    try {
        const response = await fetch(`${API_URL}/locations`);
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error obteniendo ubicaciones:', error);
        return [];
    }
};

/**
 * Buscar ubicación por nombre
 */
export const searchLocationByName = async (nombre: string): Promise<Location[]> => {
    try {
        const locations = await getLocations();
        return locations.filter(loc => 
            loc.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
    } catch (error) {
        console.error('Error buscando ubicación:', error);
        return [];
    }
};

// ==================== FUNCIONES DE PERSONAL ====================

/**
 * Obtener todo el personal
 */
export const getPersonal = async (): Promise<Personal[]> => {
    try {
        const response = await fetch(`${API_URL}/personal`);
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error obteniendo personal:', error);
        return [];
    }
};

/**
 * Buscar personal por nombre
 */
export const searchPersonalByName = async (nombre: string): Promise<Personal[]> => {
    try {
        const personal = await getPersonal();
        return personal.filter(p => 
            p.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
            p.apellidoPaterno.toLowerCase().includes(nombre.toLowerCase()) ||
            p.apellidoMaterno.toLowerCase().includes(nombre.toLowerCase())
        );
    } catch (error) {
        console.error('Error buscando personal:', error);
        return [];
    }
};

/**
 * Obtener personal por departamento
 */
export const getPersonalByDepartamento = async (departamento: string): Promise<Personal[]> => {
    try {
        const response = await fetch(`${API_URL}/personal/departamento/${encodeURIComponent(departamento)}`);
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error obteniendo personal por departamento:', error);
        return [];
    }
};

/**
 * Obtener personal de un departamento CON ubicación
 */
export const getPersonalConUbicacion = async (departamento: string): Promise<PersonalConUbicacion | null> => {
    try {
        const response = await fetch(`${API_URL}/personal/ubicacion/departamento/${encodeURIComponent(departamento)}`);
        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Error obteniendo personal con ubicación:', error);
        return null;
    }
};

/**
 * Obtener información de un profesor CON ubicación
 */
export const getProfesorConUbicacion = async (numeroEmpleado: string): Promise<ProfesorConUbicacion | null> => {
    try {
        const response = await fetch(`${API_URL}/personal/ubicacion/profesor/${numeroEmpleado}`);
        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Error obteniendo profesor con ubicación:', error);
        return null;
    }
};

/**
 * Obtener personal por número de empleado
 */
export const getPersonalById = async (numeroEmpleado: string): Promise<Personal | null> => {
    try {
        const response = await fetch(`${API_URL}/personal/${numeroEmpleado}`);
        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Error obteniendo personal por ID:', error);
        return null;
    }
};

/**
 * Buscar profesores y ubicaciones combinados
 */
export const searchProfesoresYLugares = async (query: string): Promise<{
    profesores: Personal[];
    lugares: Location[];
}> => {
    try {
        const [profesores, lugares] = await Promise.all([
            searchPersonalByName(query),
            searchLocationByName(query)
        ]);

        return {
            profesores,
            lugares
        };
    } catch (error) {
        console.error('Error en búsqueda combinada:', error);
        return {
            profesores: [],
            lugares: []
        };
    }
};