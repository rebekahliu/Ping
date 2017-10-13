export const allFriends = (state) => {
  const friends = state.session.current_user.friends;
  if (friends) {
    return Object.keys(friends).map(id=>{
      let friend = friends[id];

      friend.key = id;
      return friend;
    });
  } else {
    return [];
  }
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
      if (!pendingFriends[id].require_approval)
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

export const friendRequests = (state) => {
  const pendingFriends = state.session.current_user.pending_friends;
  let requests = [];
  if (pendingFriends) {
    Object.keys(pendingFriends).forEach( id => {
      if (pendingFriends[id].require_approval)
      requests.push(pendingFriends[id]);
    });
  }
  return requests;
};
