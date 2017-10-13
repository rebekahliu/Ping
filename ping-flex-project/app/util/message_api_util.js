export const createMessage = (content, channelId) => (
  $.ajax({
    url: `https://1dd8c576.ngrok.io/api/messages`,
    method: 'POST',
    data: {content, channelId}
  })
);
