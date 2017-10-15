export const allFriends = (state) => {
  const friends = state.friends.friends;
  if (friends) {
    return sort(Object.keys(friends).map(id=>{
      let friend = friends[id];

      friend.key = id;
      return friend;
    }));
  } else {
    return [];
  }
};

export const suggestedFriends = (state) => {
  const fbFriends = state.friends.fbFriends;
  const pendingFriends = state.friends.pendingFriends;
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

  return sort(suggestions);
};

export const friendRequests = (state) => {
  const pendingFriends = state.friends.pendingFriends;
  let requests = [];
  if (pendingFriends) {
    Object.keys(pendingFriends).forEach( id => {
      if (pendingFriends[id].require_approval)
      requests.push(pendingFriends[id]);
    });
  }
  return sort(requests);
};

const sort = function(friends) {
  return friends.sort(function(a, b) {
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
};
