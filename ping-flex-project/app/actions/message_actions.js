import MessageAPI from '../util/message_api_util';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_ALL_MESSAGES = 'RECEIVE_ALL_MESSAGES';

const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  message
});

const receiveAllMessages = (messages) => ({
  type: RECEIVE_ALL_MESSAGES,
  messages
});

export const createMessage = (content, chatroomId) => (dispatch) => {
  return MessageAPI.createMessage(content, chatroomId)
                   .then( message => dispatch(receiveMessage(message)));
};

export const fetchMessages = (chatroomId) => (dispatch) => {
  return MessageAPI.fetchMessages(chatroomId)
                   .then( messages => dispatch(receiveAllMessages(messages)));
};
