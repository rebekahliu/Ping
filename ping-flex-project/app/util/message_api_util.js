// const API_URL = 'https://gentle-anchorage-13426.herokuapp.com/api/';
const API_URL = 'http://192.168.2.144:3000/api/';

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
