export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';

import * as chatAPI from '../util/chat_api_util';

export const receiveChannel = (channel) => (
  {
    type: RECEIVE_CHANNEL,
    channel
  }
);

export const createChannel = (channel) => (dispatch) => {
  return (
    chatAPI.createChannel(channel)
           .then((newChannel) => dispatch(receiveChannel(newChannel)))
  );
};

export const getChannel = (channel) => (dispatch) => {
  return (
    chatAPI.showChannel(channel)
           .then((newChannel) => dispatch(receiveChannel(newChannel)))
  );
};
