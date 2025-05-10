// WebSocket Chat UI for Level N2
document.addEventListener('DOMContentLoaded', function() {
  const messagesContainer = document.getElementById('messages');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const connectionStatus = document.getElementById('connection-status');
  
  // Disable the input and button as per requirements
  messageInput.disabled = true;
  sendButton.disabled = true;
  
  // Function to add a message to the chat
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user-message' : 'message system-message';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);
    
    // Auto-scroll to the newest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Function to display error messages
  function addErrorMessage(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = `Error: ${error}`;
    messagesContainer.appendChild(errorDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Function to update connection status
  function updateConnectionStatus(status) {
    connectionStatus.textContent = status;
    connectionStatus.className = `status-${status.toLowerCase()}`;
  }
  
  // Track conversation state
  let messageCount = 0;
  
  // Simple delay function to add pause between messages
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Add a user message with a delay
  async function addUserMessage(content) {
    await delay(1000);
    addMessage(content, true);
  }
  
  // Connect to the actual websocket endpoint
  async function connectToWebSocket() {
    updateConnectionStatus('Connecting...');
    const socket = new WebSocket(`{{url_path_for('websocket_endpoint_n2')}}?session_id={{level_session.id}}`);
    
    socket.onopen = async function() {
      updateConnectionStatus('Connected');
      
      // Simulate chat startup with a greeting
      await delay(500);
      
      // First user message - mocked
      const userMessage = 'Hi there!';
      await addUserMessage(userMessage);

      // Send first message to server
      socket.send(userMessage);
    };
    
    socket.onmessage = async function(event) {
      // Parse the response
      const data = JSON.parse(event.data);
      
      messageCount++;
        try {
            await delay(1500);
            addMessage(data.message.length > 0 ? data.message : "No message received");
        } catch (error) {
            updateConnectionStatus('Disconnected');
            addErrorMessage("Error: " + error.message);
            throw error;
        }
      
      if (messageCount === 1) {
        // Send second user message after a delay
        const msg = 'Do you know what the secret is for this level?'
        await addUserMessage(msg);
        
        // Send second message to server
        socket.send(msg);
      } 
    };
    
    socket.onerror = function(error) {
      console.error("WebSocket error:", error);
      updateConnectionStatus('Error');
      addErrorMessage("WebSocket connection error");
    };
    
    socket.onclose = function() {
      console.log("WebSocket connection closed");
    };
  }
  
  // Start the WebSocket connection
  connectToWebSocket();
});