const API_URL = 'https://7c6a6c85.ngrok.io/api/';

export default class MessageAPI {

  static async createMessage(content, chatroomId, token) {
    try {
      let response = await fetch(API_URL + 'messages', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          chatroom_id: chatroomId,
          session_token: token
        })
      });
      return response.json();
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
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
