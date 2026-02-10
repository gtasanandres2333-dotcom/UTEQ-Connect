import { Coordinates } from "../types";

/**
 * Calcula la distancia en metros entre dos coordenadas usando la fórmula de Haversine
 */
export const calcularDistancia = (punto1: Coordinates, punto2: Coordinates): number => {
    const R = 6371000; // Radio de la Tierra en metros
    const lat1Rad = (punto1.latitude * Math.PI) / 180;
    const lat2Rad = (punto2.latitude * Math.PI) / 180;
    const deltaLat = ((punto2.latitude - punto1.latitude) * Math.PI) / 180;
    const deltaLon = ((punto2.longitude - punto1.longitude) * Math.PI) / 180;

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;

    return distancia;
};

/**
 * Encuentra el punto más cercano en la ruta a la posición actual
 */
export const encontrarPuntoMasCercano = (
    posicionActual: Coordinates,
    rutaPuntos: Coordinates[]
): { puntoMasCercano: Coordinates; distancia: number; indice: number } => {
    let distanciaMinima = Infinity;
    let puntoMasCercano = rutaPuntos[0];
    let indiceMasCercano = 0;

    rutaPuntos.forEach((punto, index) => {
        const distancia = calcularDistancia(posicionActual, punto);
        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            puntoMasCercano = punto;
            indiceMasCercano = index;
        }
    });

    return {
        puntoMasCercano,
        distancia: distanciaMinima,
        indice: indiceMasCercano,
    };
};

/**
 * Verifica si el usuario se ha desviado de la ruta
 */
export const estaFueraDeRuta = (
    posicionActual: Coordinates,
    rutaPuntos: Coordinates[],
    umbralMetros: number = 50 // 50 metros de tolerancia
): boolean => {
    const { distancia } = encontrarPuntoMasCercano(posicionActual, rutaPuntos);
    return distancia > umbralMetros;
};