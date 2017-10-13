export const createChannel = channel => (
  $.ajax({
    url: `https://7c6a6c85.ngrok.io/api/channels`,
    method: 'POST',
    data: { channel }
  })
);

export const showChannel = id => (
  $.ajax({
    url: `https://7c6a6c85.ngrok.io/api/channels`,
    method: 'GET',
    data: {id}
  })
);
