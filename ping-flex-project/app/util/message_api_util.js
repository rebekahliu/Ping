const API_URL = 'https://1dd8c576.ngrok.io/api/';

export default class MessageAPI {

  static async createMessage(content, chatroomId) {
    try {
      let response = await fetch(API_URL + 'messages', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          chatroom_id: chatroomId
        })
      });
      let responseJSON = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async fetchMessages(chatroomId) {
    try {
      let response = await fetch(API_URL + `messages/${chatroomId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      let responseJSON = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
