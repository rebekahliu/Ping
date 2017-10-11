export const allFriends = (state) => {
  const friends = state.session.current_user.friends;
  return Object.keys(friends).map(id=>{
    let friend = friends[id];

    friend.key = id;
    return friend;
  });
};

export const suggestedFriends = (state) => {
  const friends = state.session.current_user.fb_friends;
  return Object.keys(friends).map( id => friends[id] );
};
