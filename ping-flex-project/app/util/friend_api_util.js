const API_URL = 'https://gentle-anchorage-13426.herokuapp.com/api/';

export default class FriendAPI {

  static async getFriends(session_token) {
    try {
      let response = await fetch(API_URL + 'friends', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_token: session_token
        })
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async requestFriend(session_token, friend_id) {
    try {
      let response = await fetch(API_URL + 'request_friend', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_token: session_token,
          friend_id: friend_id
        })
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async approveFriend(session_token, friend_id) {
    try {
      let response = await fetch(API_URL + 'approve_friend', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_token: session_token,
          friend_id: friend_id
        })
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
