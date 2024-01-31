console.log('Hey, I am a service worker.')

self.addEventListener('activate', event => {
  console.log('activate 123')
})

self.addEventListener('fetch', event => {
  console.log('fetch', event)

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('install', event => {
  console.log('install 123')
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['./assets/', './index.html', './snake.svg'])
    })
  )
})
