import { GetToken } from "./Services/FirebaseMsgService";

export const register = async () => {

    if ("serviceWorker" in navigator) {
        const publicUrl = `${process.env.PUBLIC_URL}/sw.js`;
	    console.log("SW url to be registered:", publicUrl);

        try {
            console.log("Registering SW...");
            let registration = await navigator.serviceWorker.register(publicUrl)
            console.log("SW Registered:", registration);

            console.log('Awaiting SW to be Ready...')
            registration = await navigator.serviceWorker.ready;
            console.log('SW is Ready:', registration)
            
            console.log('Retrieving FB Messaging Token...');
            const token = await GetToken(registration);
            console.log('FB Messaging Token retrieved')

            console.log('Send the token to the page to display it')
            const broadcast = new BroadcastChannel('quiz-app');
            broadcast.postMessage({ type: 'TOKEN', token: token });

        } catch (error) {
            console.log('An error occurred registering SW:', error);
        }
    } else {
        console.log("SW is not available");
    }
}
