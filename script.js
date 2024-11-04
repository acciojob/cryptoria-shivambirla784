//your JS code here. If required.
// Task 1: Caesar Cipher Decryption
function decryptMessage(encryptedMessage, shift) {
  let decryptedMessage = "";
  for (let i = 0; i < encryptedMessage.length; i++) {
    const char = encryptedMessage[i];
    if (char.match(/[a-z]/i)) {
      const code = encryptedMessage.charCodeAt(i);
      if (code >= 65 && code <= 90) { // Uppercase letters
        decryptedMessage += String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      } else if (code >= 97 && code <= 122) { // Lowercase letters
        decryptedMessage += String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      }
    } else {
      decryptedMessage += char; // Non-alphabetic characters
    }
  }
  return decryptedMessage;
}

// Task 2: Merge Sort for messages by date
function sortMessages(messages) {
  if (messages.length <= 1) return messages;

  const middle = Math.floor(messages.length / 2);
  const left = sortMessages(messages.slice(0, middle));
  const right = sortMessages(messages.slice(middle));

  return mergeSortedArrays(left, right);
}

function mergeSortedArrays(left, right) {
  let sortedArray = [];
  while (left.length && right.length) {
    if (new Date(left[0].date) < new Date(right[0].date)) {
      sortedArray.push(left.shift());
    } else {
      sortedArray.push(right.shift());
    }
  }
  return [...sortedArray, ...left, ...right];
}

// Task 3: Store messages in Local Storage
function storeMessages(messages) {
  localStorage.setItem('messages', JSON.stringify(messages));
}

// Display Messages Function (For the UI)
function displayMessages(messages) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerHTML = ""; // Clear existing messages

  messages.forEach(msg => {
    const messageItem = document.createElement("li");
    messageItem.classList.add("message-item");

    const dateElement = document.createElement("p");
    dateElement.classList.add("message-date");
    dateElement.textContent = `Date: ${msg.date}`;

    const contentElement = document.createElement("p");
    contentElement.classList.add("message-content");
    contentElement.textContent = `Message: ${msg.content}`;

    messageItem.appendChild(dateElement);
    messageItem.appendChild(contentElement);
    messageContainer.appendChild(messageItem);
  });
}



// Example Usage
document.addEventListener("DOMContentLoaded", () => {
  // Example encrypted messages
  const encryptedMessages = [
    { date: "2023-10-01", content: "Dwwdfn dw gdz!" },
    { date: "2023-09-30", content: "Ol gh fhfob gzud xmd!" },
    { date: "2023-10-02", content: "Wklv lv dq hqfubswlrq!" },
  ];

  const shift = 3; // Example shift for Caesar's cipher
  const decryptedMessages = encryptedMessages.map(msg => ({
    date: msg.date,
    content: decryptMessage(msg.content, shift)
  }));

  const sortedMessages = sortMessages(decryptedMessages);
  storeMessages(sortedMessages);
  displayMessages(sortedMessages); // Show sorted, decrypted messages on the page
});
