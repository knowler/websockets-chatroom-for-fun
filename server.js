const WebSocket = require('ws');
const wss = new WebSocket.Server({host: 'localhost', port: 9000});

wss.on('connection', ws => {
  const {clients} = wss;

  // Helper to broadcast a message to all clients (with optional exclusions)
  function broadcast(message, exclusions = []) {
    const excludedClients = new Set(exclusions);
    [...clients.values()]
      .filter(client => !excludedClients.has(client))
      .forEach(client => {
        client.send(message);
      });
  }

  // Welcome the client to the server
  ws.send(`Welcome to the server. Total clients: ${clients.size}`);

  // Announce when a client joins a server to its peers
  if (clients.size > 1) {
    broadcast(`Someone joined. Total clients: ${clients.size}`, [ws]);
  }

  // Broadcast what a client says to its peers
  ws.on('message', message => {
    broadcast(`Someone says: ${message}`, [ws]);
  });

  // Broadcast when a client leaves
  ws.on('close', () => {
    broadcast(`Someone left. Total clients: ${clients.size}`);
  });
});
