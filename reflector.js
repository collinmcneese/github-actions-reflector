module.exports = async({github, context, targetUrl}) => {
  const request = require('request');

  let options = {
    url: targetUrl,
    method: 'POST',
    headers: {
      'X-GitHub-Event': context.eventName,
      'Content-Type': 'application/json',
      'Content-Length': context.payload.length,
    },
    body: JSON.stringify(context.payload),
  };

  // Send the request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode < 200 || response.statusCode >= 300) {
        reject(new Error(`Error sending payload to ${targetUrl}: ${response.statusCode} - ${response.statusMessage}`));
      } else {
        resolve(`Payload sent to ${targetUrl}`);
      }
    });
  });
};
