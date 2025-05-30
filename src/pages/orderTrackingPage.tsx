import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import api from '../interceptors/axiosInterceptors';
import moto from '../images/logo/moto.svg';



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
        html: `<img src=${moto} style="width: 20px; height: 20px;" />`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
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
            <br />
            <button 
                type="button"
                onClick={() => navigate('/order/list')}
                className="py-2 px-6 rounded-md bg-gray text-black hover:bg-gray-800
                    dark:bg-white dark:text-black dark:hover:bg-gray-100
                    transition-colors duration-200"
            >
                Volver
            </button>
        </div>
    );
};

export default OrderTrackingPage;