const API_URL = 'https://gentle-anchorage-13426.herokuapp.com/api/';

import { Permissions, Notifications } from 'expo';

const SUBSCRIBE_TOKEN_ENDPOINT = 'https://gentle-anchorage-13426.herokuapp.com/api/push_token';

const SEND_PUSH_ENDPOINT = 'https://gentle-anchorage-13426.herokuapp.com/api/send_push';

export default class API {

  static async sendPushNotificationAsync(friend_facebook_id, message) {
    // Send the push notification!
    return fetch(SEND_PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: "testing",
        friend_facebook_id: friend_facebook_id,
        message: message,
      }),
    });
  }

  static async registerForPushNotificationsAsync(session_token) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(SUBSCRIBE_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        session_token: session_token,
      }),
    });
  }

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
