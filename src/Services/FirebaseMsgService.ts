import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyAjpMiUfOWIzoOFGvIfVHsI4AowiUsp_YA",
    authDomain: "messaging-service-test-7ff87.firebaseapp.com",
    projectId: "messaging-service-test-7ff87",
    storageBucket: "messaging-service-test-7ff87.appspot.com",
    messagingSenderId: "429002687019",
    appId: "1:429002687019:web:554a8e945ef502a46e206e"
}

firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging()

export const InitFirebaseMessaging = async (registration : ServiceWorkerRegistration) => {
    try {
        const token = await messaging.getToken({
            vapidKey: 'BJs87dcoo3tADXYtDqyjCgzhpVxNMJBTltkpfI1K2iTo-eyZhSJm_H8TeplO8kNFi2Vbc92wc2InP9kbCLCeqPY',
            serviceWorkerRegistration: registration
        });
        console.log(token);
        return token;

    } catch (error) {
        console.log('An error occured while retrieving token: ', error)
        throw error;
    }
}


