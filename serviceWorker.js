const staticDevCoffee = "dev-coffee-site-v1";
const staticCosts = "tblTest"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg"
];


// Save files to cache for offline use (Service Worker Install)
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Fetch files from cache for offline use (Service Worker Fetch)
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

// Delete old caches (Service Worker Activate)
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
      caches.open("tblTest").then(cache => {
        cache.addAll(assets);
      })
  );
});

