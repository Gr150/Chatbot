// Create Chatbot UI
const container = document.getElementById("chatbot-container");
container.innerHTML = `
  <div id="chatbot" style="
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    font-family: Arial, sans-serif;
    z-index: 1000;
  ">
    <div style="background: #222; color: #fff; padding: 10px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
      Chat with MK Prom
    </div>
    <div id="chat-log" style="padding: 10px; height: 250px; overflow-y: auto; font-size: 14px;"></div>
    <div style="display: flex; border-top: 1px solid #ddd;">
      <input type="text" id="chat-input" placeholder="Type a message..." style="flex: 1; padding: 10px; border: none;" />
      <button id="send-btn" style="background: #222; color: #fff; border: none; padding: 10px;">Send</button>
    </div>
  </div>
`;

// Add chat functionality
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("chat-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (!message) return;

  const chatLog = document.getElementById("chat-log");
  chatLog.innerHTML += `<div style="margin: 5px 0;"><strong>You:</strong> ${message}</div>`;
  input.value = "";
  chatLog.scrollTop = chatLog.scrollHeight;

  chatLog.innerHTML += `<div id="bot-typing">...</div>`;

  try {
    const res = await fetch("https://guru1234.app.n8n.cloud/webhook/c7ee7ac7-21bf-46aa-ab89-c7515fcf6f2a/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    document.getElementById("bot-typing").remove();
    chatLog.innerHTML += `<div style="margin: 5px 0;"><strong>MK Prom:</strong> ${data.reply || 'Sorry, I didn’t understand that.'}</div>`;
  } catch (err) {
    document.getElementById("bot-typing").remove();
    chatLog.innerHTML += `<div style="color: red; margin: 5px 0;">Error contacting chatbot</div>`;
  }

  chatLog.scrollTop = chatLog.scrollHeight;
}
