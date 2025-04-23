console.log('Testing server connectivity...');

// Test API endpoint
fetch('/api/health')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Health check successful!', data);
  })
  .catch(error => {
    console.error('Health check failed:', error);
  });

// Test WebSocket connectivity
const testWebSocket = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}`;
  
  console.log(`Attempting to connect to WebSocket at ${wsUrl}`);
  
  const ws = new WebSocket(wsUrl);
  
  ws.onopen = () => {
    console.log('WebSocket connection successful!');
    ws.close();
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket connection failed:', error);
  };
};

// Wait for DOM to load before testing WebSocket
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testWebSocket);
} else {
  testWebSocket();
}