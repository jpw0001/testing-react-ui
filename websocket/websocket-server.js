const WebSocket = require('websocket').server;
const http = require('http');

const server = http.createServer((request, response) => {
  // You can ignore this code for the purpose of this example
});

server.listen(8080, () => {
  console.log('WebSocket server is listening on port 8080');
});

const wsServer = new WebSocket({
  httpServer: server,
});

const orderBook = {
  bids: [ 
  {"price":10.00,"quantity":100},
  {"price":9.00,"quantity":200},
  {"price":8.00,"quantity":400},
  {"price":7.00,"quantity":300}
  ],
  asks: [ 
  {"price":11.00,"quantity":500},
  {"price":12.00,"quantity":200},
  {"price":13.00,"quantity":1200},
  {"price":14.00,"quantity":100},
  ],
};

function broadcastOrderBook() {
  const message = JSON.stringify(orderBook);
  wsServer.broadcastUTF(message);
}

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);

  // Send the current order book to the new connection
  connection.sendUTF(JSON.stringify(orderBook));

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      const order = JSON.parse(message.utf8Data);
      // Handle the received order and update the order book accordingly
      // This is where you would implement your order matching logic

      // After updating the order book, broadcast the updated order book to all connected clients
      broadcastOrderBook();
    }
  });

  connection.on('close', () => {
    // Handle connection closure
  });
});

