import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import api from '../interceptors/axiosInterceptors';



const OrderTrackingPage: React.FC = () => {
    const navigate = useNavigate();
    const { plate } = useParams<{ plate: string }>();
    const [location, setLocation] = useState<[number, number] | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (plate) {
            // Conexión WebSocket
            const newSocket = io('http://127.0.0.1:5000');
            setSocket(newSocket);
            
            newSocket.on('connect', () => {
                console.log('Socket.IO conectado');
                api.post(`/motorcycles/track/${plate}`)
                    .then(response => console.log(response.data))
                    .catch(error => console.error("Error al iniciar tracking: ",error));
                
            });

            newSocket.on(plate, (data) => {
                console.log("Coordenada recibida:", data);
                if (typeof data?.lat === 'number' && typeof data?.lng === 'number') {
                    setLocation([data.lat, data.lng]);
                } else {
                    console.warn("Formato de coordenadas SOCKET.IO no reconodio", data);
                }
            });

            newSocket.on('disconnect', () => {
                console.log('Socket.IO desconectado');
                api.post(`/motorcycles/stop/${plate}`)
                    .then(response => console.log(response.data))
                    .catch(error => console.error("Error al detener el tracking: ", error));
            });

            return () => {
                newSocket.off(plate);
                newSocket.off('connect');
                newSocket.off('disconnect');
                newSocket.disconnect();
                api.post(`/motorcycles/stop/${plate}`)
                    .then(response => console.log(response.data))
                    .catch(error => console.error("Error al detener tracking:", error));
            };
        }
    }, [plate]);

    const defaultCenter: [number, number] = [4.0, -73.0];
    const zoomLevel = 6;

    const customIcon = location ? divIcon({
        className: 'custom-marker',
        html: `<svg stroke="currentColor" fill="blue" stroke-width="0" viewBox="0 0 24 24" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M20.91 11.06a1 1 0 0 0-.7-.29l-3.54-.52a1 1 0 0 0-.69.3l-1.17 2.48a1 1 0 0 1-.88.68h-3.8a1 1 0 0 1-.88-.68l-1.17-2.48a1 1 0 0 0-.69-.3l-3.54.52a1 1 0 0 0-.7.29 1 1 0 0 0 .29 1.71l1.44.21a1 1 0 0 1 .7.59l.9 1.9a1 1 0 0 1 .38.73l.2.42a1 1 0 0 0 .9.81h3.8a1 1 0 0 0 .9-.81l.2-.42a1 1 0 0 1 .38-.73l.9-1.9a1 1 0 0 1 .7-.59l1.44-.21a1 1 0 0 0 1-1.42z"></path><circle cx="16" cy="17" r="3"></circle><circle cx="8" cy="17" r="3"></circle></svg>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    }) : undefined
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <h1>Seguimiento de la Motocicleta: {plate}</h1>
            <MapContainer center={location || defaultCenter} zoom={location ? 15 : zoomLevel} style={{ height: '80%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {location && customIcon && (
                    <Marker position={location} icon={customIcon}>
                        <Popup>
                            Ubicación actual de la moto {plate}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
            <button 
                type="button"
                onClick={() => navigate('/order/list')}
                className="py-2 px-6 text-gray rounded-md bg-gray-500 hover:bg-gray-600"
            >
                Volver
            </button>
        </div>
    );
};

export default OrderTrackingPage;