export const createChannel = channel => (
  $.ajax({
    url: `https://1dd8c576.ngrok.io/api/channels`,
    method: 'POST',
    data: { channel }
  })
);

export const showChannel = id => (
  $.ajax({
    url: `https://1dd8c576.ngrok.io/api/channels`,
    method: 'GET',
    data: {id}
  })
);
