const CACHE_NAME = "v1_cache_contador_app_vue";
const urlsToCache = [
  "./",
  "./resources/favicon.png",
  "./resources/icon_x32.png",
  "./resources/icon_x64.png",
  "./resources/icon_x128.png",
  "./resources/icon_x256.png",
  "./resources/icon_x512.png",
  "./resources/icon_x1024.png",
  "./js/main.js",
  "https://unpkg.com/vue@next",
  "./js/mount.js",
  "./css/style.css",
  "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache
        .addAll(urlsToCache)
        .then(() => self.skipWaiting())
        .catch((err) => console.log(err))
    )
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res){    
                    return res
                }
                return fetch(e.request)
            }
        )
    )
})