import { get, set, push, ref, query, orderByChild, equalTo, remove, update } from "firebase/database";
import { auth, db } from '../config/firebase'
import { getUserData } from "./user.service";


export const createEventHandle = async (data, startDate, endDate, creatorId, username) => {
    try {
        const participants = [creatorId]
        const dataObj = { ...data, startDate, endDate, participants, creatorId };
        const eventsRef = ref(db, 'events');
        const newEventRef = push(eventsRef, dataObj);
        const eventId = newEventRef.key;
        const userRef = ref(db, `users/${username}`);
        const updates = {};
        updates[`createdEvents/${eventId}`] = true;
        await update(userRef, updates);
        return true;
    } catch (error) {
        console.error('Error creating event:', error);
        return false;
    }
}

export const getEventsCreatedByUser = async (username, userId) => {
    if (userId) {
        try {
            const userCreatedEventsRef = ref(db, `users/${username}/createdEvents`);
            const userCreatedEventsSnapshot = await get(userCreatedEventsRef);

            if (userCreatedEventsSnapshot.exists()) {
                const eventIds = Object.keys(userCreatedEventsSnapshot.val());
                const events = [];

                for (const eventId of eventIds) {
                    const eventRef = ref(db, `events/${eventId}`);
                    const eventSnapshot = await get(eventRef);

                    if (eventSnapshot.exists()) {
                        const eventData = { id: eventId, ...eventSnapshot.val() };
                        events.push(eventData);
                    }
                }
                return events;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error getting events:", error);
            return [];
        }
    }
};


export const getPublicEvents = async () => {
    try {
        const eventsRef = ref(db, 'events');
        const publicEventsQuery = query(eventsRef, orderByChild('publicity'), equalTo('public'));
        const publicEventsSnapshot = await get(publicEventsQuery);

        if (publicEventsSnapshot.exists()) {
            const events = [];
            publicEventsSnapshot.forEach((childSnapshot) => {
                const eventId = childSnapshot.key;

                const event = { id: eventId, ...childSnapshot.val() };
                events.push(event);
            });
            return events;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error getting public events:', error);
        return [];
    }

}


export const getPrivateEvents = async (userId) => {
    if (userId) {
        try {
            const eventsRef = ref(db, 'events');
            const publicEventsQuery = query(eventsRef, orderByChild('publicity'), equalTo('private'));
            const publicEventsSnapshot = await get(publicEventsQuery);

            if (publicEventsSnapshot.exists()) {
                const events = [];
                
                publicEventsSnapshot.forEach((childSnapshot) => {
                    const eventId = childSnapshot.key;
                    const eventData=childSnapshot.val();
    
                    if(eventData.participants.includes(userId)){
                        const event = { id: eventId, ...childSnapshot.val() };
                        events.push(event);
                    }                    
                });
                return events;
            }else{
                return [];
            }
        } catch (error) {
            console.error('Error getting public events:', error);
            return [];
        }

    }
}