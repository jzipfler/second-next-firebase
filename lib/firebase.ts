import * as admin from "firebase-admin";

try {
    admin.initializeApp({
        credential: admin.credential.cert({
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            projectId: process.env.FIREBASE_PROJECT_ID
        }),
        databaseURL: "https://first-firebase-cc122.firebaseio.com"
    });
} catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
        // eslint-disable-next-line no-console
        console.error('Firebase admin initialization error', error.stack);
    }
}

const firestore = admin.firestore();

export default firestore;
