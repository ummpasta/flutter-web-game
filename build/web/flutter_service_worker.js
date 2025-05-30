'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "cb1499490dd93d0a0a3aa9a16e94d9db",
"assets/AssetManifest.bin.json": "eb57967cac11204755e4b17622a3b407",
"assets/AssetManifest.json": "d7f3608bf28f4e78ef13835980c3320a",
"assets/assets/audio/collect.mp3": "5f5dbccc998759acffa4e997dd5555bd",
"assets/assets/audio/correct.mp3": "20d3aeb8f0d44bd1f0df1fe87184889e",
"assets/assets/audio/great_job.mp3": "b231080c79a79e18daf2fcded726122e",
"assets/assets/audio/help_en.mp3": "adcaf723ccb92da04bae327a8e2024f6",
"assets/assets/audio/help_ms.mp3": "7b944a2a943bdf4948d33368c36b8c4c",
"assets/assets/audio/help_ta.mp3": "5d103381dfe2d2534ddaab149d1edf93",
"assets/assets/audio/help_zh.mp3": "5dc566e47efc091cb3407503efc8b1ae",
"assets/assets/audio/menu_music.mp3": "a3bf9112f0af4d63713f9f62e423317b",
"assets/assets/audio/music-for-puzzle-game-146738.mp3": "a3bf9112f0af4d63713f9f62e423317b",
"assets/assets/audio/well_done.mp3": "bdf39fa8b12336a3ba48d2472ae1188a",
"assets/assets/audio/wrong.mp3": "1c211e73b020d1335a59057b2e4d780f",
"assets/assets/audio/you_did_it.mp3": "5f56de5c303b6b3e554542936c51ae2a",
"assets/assets/i18n/en.json": "52ee7f6b4b1fbc45f8bd703768c3b0f7",
"assets/assets/i18n/ms.json": "e985218f5dd5090e25b9b08c362316a3",
"assets/assets/i18n/ta.json": "668ec444cbb13b626c14e6c0df7f6aac",
"assets/assets/i18n/zh.json": "3db3b0dbb83a3a9c80efc3dfc51de940",
"assets/assets/legits/1.png": "403442e19937da21f39628eb0980b9c5",
"assets/assets/legits/10.png": "5ca752a896ede188ab0f3b24c93d4fc2",
"assets/assets/legits/2.png": "9ca71ac9105cbc56c80fda1986590315",
"assets/assets/legits/3.png": "82f2c47cb400a010689c22f4e7df76a1",
"assets/assets/legits/4.png": "3f0c31e0300d78f27b81db4ffdbd3657",
"assets/assets/legits/5.png": "e0abc8e35d571b6d738d53bf0f2f2c9c",
"assets/assets/legits/6.png": "48c86f6f7c4fbe45ef450f279f3c61cc",
"assets/assets/legits/7.png": "e1032d46d9186e9b3e7ad78407f60e51",
"assets/assets/legits/8.png": "c7d6a84cc871ce5903a7741add6de284",
"assets/assets/legits/9.png": "4f2e25d10ef8783843949ad1fc14e984",
"assets/assets/scams/1.png": "cafa1884b7c5643b56785587dc4aaaf1",
"assets/assets/scams/10.png": "c4423bdfb723ff59317e93924f80a821",
"assets/assets/scams/2.png": "55aa67f7797ae7cd56faebfd9ecba562",
"assets/assets/scams/3.png": "0fa65c635c8e94bc57f9d1c83f2d2265",
"assets/assets/scams/4.png": "9ff2acba00e7dabef68b21a63ea744f9",
"assets/assets/scams/5.png": "24abc928f56e031b6874996295229682",
"assets/assets/scams/6.png": "14ca66e319940fa024842d7c62ec48fc",
"assets/assets/scams/7.png": "15af98dbbc3d3cb86d90b694656ea7e1",
"assets/assets/scams/8.png": "cf6c9b3144603a947c0884c51cd727d0",
"assets/assets/scams/9.png": "626a4c7574f60c36573013228a363b25",
"assets/assets/video/en_tut.mp4": "3b87fa1ff64136d4a9682409790e43b9",
"assets/assets/video/ms_tut.mp4": "b571d0be4c87a1ef88685339aa6d357c",
"assets/assets/video/ta_tut.mp4": "47a98a3706f156ee65da51a756705032",
"assets/assets/video/zh_tut.mp4": "e097c8a392b2f663c8321a5c9dd7909e",
"assets/assets/word%2520lists/word_list_en.txt": "5450e6201179b2c90f6ef03177bb3d44",
"assets/assets/word%2520lists/word_list_ms.txt": "6d4ffb68bdd3b7bccb45c6e4a8790239",
"assets/assets/word%2520lists/word_list_ta.txt": "d35d4dadc5af40419fa27d364979cfb0",
"assets/assets/word%2520lists/word_list_zh.txt": "2d6c5cd2ee89b974ea5bf21cd497470a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "de4dec7d45c1111d96f68fdb80b10407",
"assets/NOTICES": "49b2f37ad999bcc487d871259559d137",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "d7d83bd9ee909f8a9b348f56ca7b68c6",
"assets/packages/wakelock_plus/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "08cba339607892dca4b53e8d7bba9ce8",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "5b71649f6c218109510e3f1c6158a8dc",
"/": "5b71649f6c218109510e3f1c6158a8dc",
"main.dart.js": "362c5c17cc2aea9baff7458887e6dfbe",
"manifest.json": "fd057264bde73f2d32011f6dc43f43e6",
"version.json": "91e257f0f87bfea69e291d3a87d56500"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
