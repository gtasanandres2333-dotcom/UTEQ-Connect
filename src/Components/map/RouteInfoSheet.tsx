import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Modal } from "react-native";
import { RouteInfo } from "../../types";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../../styles/RouteInfoSheetStyle";
import LocationInformation from "./LocationInformation";

interface RouteInfoSheetProps {
    routeInfo: RouteInfo | null;
    destinationName?: string;
    selectedLocation?: any;
    onClose: () => void;
    onStartNavigation?: () => void;
    isNavigating?: boolean;
    isRecalculating?: boolean;
}

const RouteInfoSheet: React.FC<RouteInfoSheetProps> = ({
    routeInfo,
    destinationName,
    selectedLocation,
    onClose,
    onStartNavigation,
    isNavigating = false,
    isRecalculating = false
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showLocationInfo, setShowLocationInfo] = useState(false);

    if (!routeInfo) return null;

    const handleStartNavigation = () => {
        if (onStartNavigation) {
            onStartNavigation();
            setIsExpanded(false);
        }
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.handleContainer}
                    onPress={toggleExpanded}
                    activeOpacity={0.7}
                >
                    <View style={styles.handle} />
                </TouchableOpacity>

                <View style={styles.content}>
                    {!isExpanded && (
                        <View style={styles.minimizedView}>
                            <View style={styles.minimizedHeader}>
                                <View style={styles.minimizedIcon}>
                                    <Ionicons name="navigate" size={20} color="white" />
                                </View>
                                <View style={styles.minimizedInfo}>
                                    <Text style={styles.minimizedDestination} numberOfLines={1}>
                                        {destinationName || "Destino"}
                                    </Text>
                                    <View style={styles.minimizedStats}>
                                        <Text style={styles.minimizedStat}>
                                            {routeInfo.distancia}
                                        </Text>
                                        <Text style={styles.minimizedDivider}>•</Text>
                                        <Text style={styles.minimizedStat}>
                                            {routeInfo.duracion}
                                        </Text>
                                        {isNavigating && (
                                            <>
                                                <Text style={styles.minimizedDivider}>•</Text>
                                                <View style={styles.minimizedPulse} />
                                                <Text style={[styles.minimizedStat, { color: '#34A853' }]}>
                                                    Navegando
                                                </Text>
                                            </>
                                        )}
                                    </View>
                                </View>
                                <TouchableOpacity onPress={toggleExpanded}>
                                    <Ionicons name="chevron-up" size={24} color="#5F6368" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {isExpanded && (
                        <>
                            <View style={styles.header}>
                                <View style={styles.headerLeft}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name="location" size={24} color="#4285F4" />
                                    </View>
                                    <View style={styles.headerText}>
                                        <Text style={styles.title}>Ruta hacia</Text>
                                        <Text style={styles.destination} numberOfLines={1}>
                                            {destinationName || "Destino"}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.infoContainer}>
                                <View style={styles.infoCard}>
                                    <View style={styles.iconCircle}>
                                        <Ionicons name="navigate" size={20} color="#4285F4" />
                                    </View>
                                    <Text style={styles.infoLabel}>Distancia</Text>
                                    <Text style={styles.infoValue}>{routeInfo.distancia}</Text>
                                </View>

                                <View style={styles.infoCard}>
                                    <View style={styles.iconCircle}>
                                        <Ionicons name="time" size={20} color="#34A853" />
                                    </View>
                                    <Text style={styles.infoLabel}>Tiempo estimado</Text>
                                    <Text style={styles.infoValue}>{routeInfo.duracion}</Text>
                                </View>
                            </View>

                            {isRecalculating && (
                                <View style={styles.recalculatingBanner}>
                                    <ActivityIndicator size="small" color="#4285F4" />
                                    <Text style={styles.recalculatingText}>Recalculando ruta...</Text>
                                </View>
                            )}

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.startButton,
                                        (isNavigating || isRecalculating) && styles.startButtonDisabled
                                    ]}
                                    activeOpacity={0.8}
                                    onPress={handleStartNavigation}
                                    disabled={isNavigating || isRecalculating}
                                >
                                    {isRecalculating ? (
                                        <>
                                            <ActivityIndicator size="small" color="white" />
                                            <Text style={styles.startButtonText}>Recalculando...</Text>
                                        </>
                                    ) : isNavigating ? (
                                        <>
                                            <View style={styles.pulseIndicator} />
                                            <Ionicons name="navigate" size={20} color="white" />
                                            <Text style={styles.startButtonText}>Navegando...</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Ionicons name="play" size={20} color="white" />
                                            <Text style={styles.startButtonText}>Iniciar navegación</Text>
                                        </>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons name="close-circle-outline" size={20} color="#666" />
                                    <Text style={styles.closeButtonText}>
                                        {isNavigating ? 'Detener navegación' : 'Cerrar'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={{
                                    padding: 16,
                                    backgroundColor: '#4285F4',
                                    borderRadius: 12,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    shadowColor: '#4285F4',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 6,
                                    marginTop: 12,
                                    gap: 8,
                                }}
                                activeOpacity={0.8}
                                onPress={() => setShowLocationInfo(true)}
                            >
                                <Ionicons name="information-circle" size={20} color="white" />
                                <Text style={{
                                    color: 'white',
                                    fontSize: 15,
                                    fontWeight: '600',
                                    letterSpacing: 0.3,
                                }}>
                                    Información de la ubicación
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>

            <Modal
                visible={showLocationInfo}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowLocationInfo(false)}
            >
                <LocationInformation
                    location={selectedLocation}
                    onClose={() => setShowLocationInfo(false)}
                />
            </Modal>
        </>
    );
};

export default RouteInfoSheet;