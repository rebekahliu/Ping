const API_URL = 'https://gentle-anchorage-13426.herokuapp.com/api/';

export default class API {

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

  static async getPings(session_token) {
    try {
      let response = await fetch(API_URL + 'get_pings', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_token: session_token,
        })
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async doLogin(user_id, session_token) {
    try {
      let response = await fetch(API_URL + 'session', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facebook_id: user_id,
          session_token: session_token
        })
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async updateLocation(session_token, location) {
    try {
      let response = await fetch(API_URL + 'location', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: location.latitude,
          lng: location.longitude,
          session_token: session_token
        })
      });
      let responseJSON = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
