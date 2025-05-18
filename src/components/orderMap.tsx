import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importa los iconos de Leaflet (solución para el problema de los marcadores)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

interface OrderMapProps {
    licensePlate: string | undefined;
}

const OrderMap: React.FC<OrderMapProps> = ({ licensePlate }) => {
    const [location, setLocation] = useState<[number, number] | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        if (licensePlate) {
            // Conexión WebSocket
            const ws = new WebSocket(`ws://127.0.0.1:5000`); // Ajusta la URL si es diferente

            ws.onopen = () => {
                console.log('WebSocket conectado');
                // Enviar mensaje para iniciar el tracking para esta placa (si es necesario)
                // fetch(`http://localhost:5000/motorcycles/track/${licensePlate}`, { method: 'POST' });
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    // formato esperado { "lat": number, "lng": number }
                    if (typeof data.lat === 'number' && typeof data.lng === 'number') {
                        setLocation([data.lat, data.lng]);
                    } else {
                        console.warn('Formato de coordenada WebSocket no reconocido:', data);
                    }
                } catch (error) {
                    console.error('Error al parsear mensaje WebSocket:', error, event.data);
                }
            };

            ws.onclose = () => {
                console.log('WebSocket desconectado');
            };

            ws.onerror = (error) => {
                console.error('Error en WebSocket:', error);
            };

            setSocket(ws);

            // Limpieza al desmontar el componente
            return () => {
                if (ws && ws.readyState === WebSocket.OPEN) {
                    // Enviar mensaje para detener el tracking (si es necesario)
                    // fetch(`http://localhost:5000/motorcycles/stop/${licensePlate}`, { method: 'POST' });
                    ws.close();
                }
            };
        }
    }, [licensePlate]);

    const defaultCenter: [number, number] = [4.0, -73.0]; // Centro de Colombia por defecto
    const zoomLevel = 6;

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <MapContainer center={location || defaultCenter} zoom={location ? 15 : zoomLevel} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {location && (
                    <Marker position={location}>
                        <Popup>
                            Ubicación actual de la moto {licensePlate}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default OrderMap;