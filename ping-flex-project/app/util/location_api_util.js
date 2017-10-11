// const API_URL = 'https://gentle-anchorage-13426.herokuapp.com/api/';
const API_URL = 'http://localhost:3000/api/';

export default class LocationAPI {

  static async updateLocation(session_token, location) {
    try {
      let response = await fetch(API_URL + 'location', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
          session_token: session_token
        })
      });
      let responseJSON = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
