// entry file
console.log(`hi`)

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
}
