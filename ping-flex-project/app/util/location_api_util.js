const API_URL = 'https://gentle-anchorage-13426.herokuapp.com/api/';

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
