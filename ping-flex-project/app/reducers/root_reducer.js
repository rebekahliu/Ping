import { combineReducers } from 'redux';

import SessionReducer from './session_reducer';
import PingedFriendReducer from './pinged_friend_reducer';
import ErrorsReducer from './errors_reducer';
import ChatReducer from './chat_reducer';

const RootReducer = combineReducers({
    session: SessionReducer,
    pinged_friend: PingedFriendReducer,
    errors: ErrorsReducer,
    chats: ChatReducer,
});

export default RootReducer;
