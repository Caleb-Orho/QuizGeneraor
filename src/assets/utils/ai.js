import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://api.cohere.ai/v1/generate',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer aKEn2quoJSbVbeqviRLMGgvxz86VKgN6YibWpnQm'
  },
  data: {
    max_tokens: 20,
    truncate: 'END',
    return_likelihoods: 'NONE',
    prompt: 'what is 2 * 2'
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

