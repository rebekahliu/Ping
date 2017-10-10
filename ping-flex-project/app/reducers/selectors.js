export const allFriends = (state) => {
  return Object.values(state.session.current_user.friends);
}
