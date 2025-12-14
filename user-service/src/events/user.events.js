const axios = require('axios');

const emitEvent = async (event, data) => {
  await axios.post(`${process.env.GATEWAY_URL}/socket/emit`, {
    event,
    data,
  });
};

module.exports = { emitEvent };
