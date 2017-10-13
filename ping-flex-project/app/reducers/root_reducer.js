import { combineReducers } from 'redux';

import SessionReducer from './session_reducer';
import PingedFriendReducer from './pinged_friend_reducer';
import ErrorsReducer from './errors_reducer';
import MessageReducer from './message_reducer';

const RootReducer = combineReducers({
    session: SessionReducer,
    pinged_friend: PingedFriendReducer,
    errors: ErrorsReducer,
    messages: MessageReducer,
});

export default RootReducer;
