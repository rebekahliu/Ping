const API_URL = 'https://gentle-anchorage-13426.herokuapp.com/api/';

export default class PingAPI {

  static async pingFriend(session_token, fbid, emergency){
    try {
      let response = await fetch(API_URL + 'ping_friend', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_token: session_token,
          friend_facebook_id: fbid,
          emergency: emergency
        })
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

}
