// dataWorker.js
self.onmessage = function (event) {
    const pizzaData = event.data;
    const hasData = pizzaData.length > 0;
    postMessage(hasData);
  };
  