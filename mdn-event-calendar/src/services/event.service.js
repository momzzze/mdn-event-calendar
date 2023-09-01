import { get, set, push, ref, query, orderByChild, equalTo, update, remove } from "firebase/database";
import { db } from '../config/firebase'
import { getUserData } from "./user.service";


export const createEventHandle = async (data, startDate, endDate, creatorId, username) => {
    try {
        const startTimeStamp = startDate ? new Date(startDate).getTime() : null;
        const endTimeStamp = endDate ? new Date(endDate).getTime() : null;

        const participants = [creatorId]
        const dataObj = { ...data, startDate: startTimeStamp, endDate: endTimeStamp, participants, creatorId };
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
                    const eventData = childSnapshot.val();

                    if (eventData.participants.includes(userId)) {
                        const event = { id: eventId, ...childSnapshot.val() };
                        events.push(event);
                    }
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
}

export const addParticipantToEvent = async (eventId, userId) => {
    try {
        const eventParticipantsRef = ref(db, `/events/${eventId}/participants`);
        const participantsSnapshot = await get(eventParticipantsRef);
        const currentParticipants = participantsSnapshot.val();
        currentParticipants.push(userId);
        await set(eventParticipantsRef, currentParticipants);
        return true;
    } catch (error) {
        console.error('Error adding participant to event:', error);
        return false;
    }
}

export const removeParticipantFromEvent = async (eventId, userId) => {
    if (eventId && userId) {
        try {
            const eventParticipantsRef = ref(db, `/events/${eventId}/participants`);
            const participantsSnapshot = await get(eventParticipantsRef);
            const currentParticipants = participantsSnapshot.val();
            const updatedParticipants = currentParticipants.filter(id => id !== userId);
            await set(eventParticipantsRef, updatedParticipants);
            return true
        } catch (error) {
            console.error('Error removing participant from event:', error);
            return false;
        }
    }
}

export const deleteEvent = async (eventId, userId) => {
    try {
        const eventRef = ref(db, `events/${eventId}`);
        const userDataQuery = query(ref(db, "users"), orderByChild("uid"), equalTo(userId));
        const userDataSnapshot = await get(userDataQuery);
        if (userDataSnapshot.exists()) {
            const userData = Object.values(userDataSnapshot.val())[0];
            if (userData.createdEvents && userData.createdEvents[eventId]) {
                delete userData.createdEvents[eventId];
                const userRef = ref(db, `users/${userData.username}`);
                await set(userRef, userData);
                await remove(eventRef);
                return true;
            }
        }

    } catch (error) {
        console.error('Error deleting event:', error);
        return false;
    }
}

export const editEventHandle = async (eventId, data) => {
    try {
        await set(ref(db, `events/${eventId}`), data);
        return true;
    } catch (error) {
        return false
    }
}