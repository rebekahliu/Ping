export const allFriends = (state) => {
  const friends = state.session.current_user.friends
  return Object.keys(friends).map(id=>{
    let friend = friends[id];

    friend.key = id;
    return friend;
  });
}
