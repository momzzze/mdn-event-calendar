import { useJsApiLoader, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from '../../config/googleMaps';
import { useEffect, useState } from 'react';
import { findLocationByAddress } from '../../services/map.services';

function Map({ address }) {
    const [mapCenter, setMapCenter] = useState({});
    const [markerPosition, setMarkerPosition] = useState(null);
    const [searchedAddress, setSearchedAddress] = useState('');
    const [directions, setDirections] = useState(null);


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY
    })
    const handleAddressSearch = async () => {
        try {
            const location = await findLocationByAddress(searchedAddress);
            if (isValidLocation(location)) {
                setMapCenter({ lat: location.lat, lng: location.lng, zoom: 15 });
                setMarkerPosition({ lat: location.lat, lng: location.lng });
                const eventLocation = await findLocationByAddress(address);
                const userLocation = await findLocationByAddress(searchedAddress);
                const directionsService = new window.google.maps.DirectionsService(); 
                directionsService.route(
                    {
                        origin: new window.google.maps.LatLng(eventLocation.lat, eventLocation.lng),
                        destination: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
                        travelMode: window.google.maps.TravelMode.DRIVING, 
                    },
                    (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            setDirections(result);
                        } else {
                            console.error('Error calculating directions:', status);
                        }
                    }
                );
            }
        } catch (error) {
            console.error('Error finding location:', error);
        }
    };
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
            const mapOptions = {
                zoomControl: true, // Show zoom control
                mapTypeControl: true, // Show map type control 
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
                    {directions && (
                        <DirectionsRenderer directions={directions} />
                    )}
                </GoogleMap>
                <div className="absolute bottom-4 left-4 z-2">
                    <input
                        type="text"
                        placeholder="Event Address"
                        value={address}
                        readOnly
                        className="bg-white rounded-md p-2 mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Your Address"
                        value={searchedAddress}
                        onChange={(e) => setSearchedAddress(e.target.value)}
                        className="bg-white rounded-md p-2 mb-2"
                    />
                    <button onClick={handleAddressSearch} className="bg-purple-800 text-white px-4 py-2 rounded-md">
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Map