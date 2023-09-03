import {
    Box,
    Flex,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from '../../config/googleMaps';
import { useEffect, useState } from 'react';
import { findLocationByAddress } from '../../services/map.services';

function Map({ address }) {
    const [mapCenter, setMapCenter] = useState({});
    const [markerPosition, setMarkerPosition] = useState(null);


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY
    })

    useEffect(() => {
        if (isLoaded && address) {
            const updateMapCenter = async () => {
                try {
                    const location = await findLocationByAddress(address);
                    if (isValidLocation(location)) {
                        setMapCenter({ lat: location.lat, lng: location.lng, zoom: 15 });
                        setMarkerPosition({ lat: location.lat, lng: location.lng })
                    }
                } catch (error) {
                    console.error('Error finding location:', error);
                }
            };
            updateMapCenter();
        }
    }, [isLoaded, address]);

    useEffect(() => {
        if (isLoaded) {
            // Customize map controls by defining control options
            const mapOptions = {
                zoomControl: true, // Show zoom control
                mapTypeControl: true, // Show map type control (e.g., satellite view)
                streetViewControl: true, // Show street view control
                fullscreenControl: true, // Show fullscreen control
                scaleControl: true, // Show scale control
                rotateControl: true, // Show rotate control
                clickableIcons: false, // Disable clickable icons
                panControl: true, // Show pan control
            };
            setMapCenter({ lat: 48.8584, lng: 2.2945, zoom: 15, options: mapOptions });
        }
    }, [isLoaded]);

    const isValidLocation = (location) => {
        return (
            typeof location === 'object' &&
            typeof location.lat === 'number' &&
            typeof location.lng === 'number' &&
            isFinite(location.lat) &&
            isFinite(location.lng)
        );
    };
    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div className="relative h-full w-100%">
            <div className="absolute inset-0">
                <GoogleMap
                    center={mapCenter}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={mapCenter.options}
                >
                    {markerPosition && (
                        <Marker position={markerPosition} />
                    )}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map