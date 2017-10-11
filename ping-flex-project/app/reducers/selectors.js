export const allFriends = (state) => {
  const friends = state.session.current_user.friends;
  return Object.keys(friends).map(id=>{
    let friend = friends[id];

    friend.key = id;
    return friend;
  });
};

export const suggestedFriends = (state) => {
  const fbFriends = state.session.current_user.fb_friends;
  const pendingFriends = state.session.current_user.pending_friends;
  let suggestions = [];
  if (fbFriends) {
    Object.keys(fbFriends).forEach( id => {
      suggestions.push(fbFriends[id]);
    });
  }

  if (pendingFriends) {
    Object.keys(pendingFriends).forEach( id => {
      suggestions.push(pendingFriends[id]);
    });
  }

  suggestions.sort(function(a, b) {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });

  return suggestions;
};
