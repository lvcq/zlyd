self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/js-sha3/0.8.0/sha3.min.js');
self.addEventListener('message', (msg) => {
    const hash = sha3_256(msg.data);
    self.postMessage(hash);
})