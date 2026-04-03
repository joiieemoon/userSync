self.onmessage = function (event) {
    console.log("this is worker recived data", event.data);


    const mul = event.data * 3;

    self.postMessage(mul);
}