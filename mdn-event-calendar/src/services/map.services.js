import axios from 'axios';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from '../config/googleMaps';

export async function findLocationByAddress(address) {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return location;
        } else {
            throw new Error('Address not found or API error');
        }
    } catch (error) {
        return null;
    }
}


export async function findLocationByLatitudeAndLongitude(latitude, longitude) {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`);
        const data = await response.json();
        if (data.status === 'OK' && data.results && data.results.length > 0) {
            const result = data.results[0];
            for (const component of result.address_components) {
                if (component.types.includes('locality')) {
                    return component.long_name;
                }
            }
        }
    } catch (error) {
        console.error('Error in reverse geocoding:', error);
    }

    return null; 
}