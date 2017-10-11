export const createChannel = channel => (
  $.ajax({
    url: `api/channels`,
    method: 'POST',
    data: { channel }
  })
);

export const showChannel = id => (
  $.ajax({
    url: `api/channels`,
    method: 'GET',
    data: {id}
  })
);
