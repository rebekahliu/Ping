// const API_URL = 'https://gentle-anchorage-13426.herokuapp.com/api/';
const API_URL = 'http://192.168.2.144:3000/api/';

export default class SessionAPI {
  static async login(user_id, session_token) {
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
}
