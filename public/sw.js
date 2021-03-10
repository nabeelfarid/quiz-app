// Give the service worker access to Firebase Messaging.
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAjpMiUfOWIzoOFGvIfVHsI4AowiUsp_YA",
    authDomain: "messaging-service-test-7ff87.firebaseapp.com",
    projectId: "messaging-service-test-7ff87",
    storageBucket: "messaging-service-test-7ff87.appspot.com",
    messagingSenderId: "429002687019",
    appId: "1:429002687019:web:554a8e945ef502a46e206e"
});

const messaging = firebase.messaging();

// A script has been added to build pipeline, in order to create a new version no for app (timestamp)
// This same app version no will be used for versioning SW Caches.
// The script will replace the <VERSION> to have a new corresponding cache version for each new intance of sw
// The script will also replace the <HASHED_BUILD_FILES> will the list of all the newly generated app shell hased files
const CACHE_NAME = 'quiz-app-<VERSION>';
const APP_SHELL_FILES = [
    '/',
    '/logo192.png',
    '/logo512.png',
    '/favicon.ico',
    '/manifest.json',
    '<HASHED_BUILD_FILES>'
];

// We will cache App Shell files in the install event, which gets fired only once
self.addEventListener('install', function (event) {
    console.log('SW Install ', CACHE_NAME);
    const CacheAppShell = async () => {
        try {
            console.log('Creating cache:', CACHE_NAME);
            const cache = await caches.open(CACHE_NAME);
            console.log('Caching App Shell in:', CACHE_NAME);
            await cache.addAll(APP_SHELL_FILES);
        } catch (error) {
            console.log('SW Install/Cache error:', CACHE_NAME, error);
            throw error;
        }
    };
    event.waitUntil(CacheAppShell());
});

// This event fires up for each request made from the browser
// It will intercept every request and will serve the response from cache
// If the response is not found in cache, then it will make network request, 
// cache the new response for next time and serve it   
self.addEventListener('fetch', function (event) {

    console.log('SW Fetch event for ', event.request.url, CACHE_NAME);

    // skip the request, if it is for any external resource
    if (!event.request.url.startsWith(self.registration.scope)) return;
    
    const FetchResponse = async () => {
        try {
            // serve the request from the version of the cache, 
            // that corresponds to the active version of SW
            const cache = await caches.open(CACHE_NAME);
            let response = await cache.match(event.request);
            // if cache has it, return response
            if (response) {
                console.log('Found ', event.request.url, ' in cache', CACHE_NAME);
                return response;
            }
            //if cache does not have it then make a network request
            console.log('Network request for ', event.request.url);
            response = await fetch(event.request);
            // Don't cache any errors, instead return the error response as it is
            if (response.status >= 400) {
                console.log('Response Status', response.status, event.request.url);
                return response;
            }
            //cache the response before serving it
            console.log('Caching Network request', event.request.url, ' in cache', CACHE_NAME);
            cache.put(event.request.url, response.clone());
            return response;
        } catch (error) {
            console.log('SW Fetch Error:', error);
            throw error;
        }
    };
    event.respondWith(FetchResponse())
});

// Once a new service worker has installed 
// and none of the previous versions are being used, 
// the new one activates, and the activate event fires. 
// Because the old version is out of the way, 
// it's a good time to delete unused caches.
self.addEventListener('activate', (event) => {
    console.log('SW Activating ', event);
    const RemoveAllUnusedCaches = async () => {
        const cacheNames = await caches.keys();
        console.log('Caches:', cacheNames);
        Promise.all(
            cacheNames.filter((cacheName) => {
                // filter out all previous unused caches that are not in use anymore;
                return cacheName !== CACHE_NAME;
            }).map(async (cacheName) => {
                // delte all these unused caches
                console.log('Deleting cache', cacheName);
                await caches.delete(cacheName);
            })
        );
    };
    event.waitUntil(RemoveAllUnusedCaches())
    console.log('SW Activated');
});