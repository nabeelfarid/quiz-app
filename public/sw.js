const CACHE_NAME = 'quiz-app';
const APP_SHELL_FILES = [
    '/',
    '/logo192.png',
    '/favicon.ico',
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
    event.respondWith(async () => {
        try {
            // serve the request from the cache
            const cache = await caches.open(CACHE_NAME);
            const response = await cache.match(event.request);
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
            cache.put(event.request.url, response_1.clone());
            return response;
        } catch (error) {
            console.log('SW Fetch Error:', error);
            throw error;
        }
    })
});

