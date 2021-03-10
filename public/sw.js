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
