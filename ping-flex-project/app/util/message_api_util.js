export const createMessage = (content, channelId) => (
  $.ajax({
    url: `/api/messages`,
    method: 'POST',
    data: {content, channelId}
  })
);
