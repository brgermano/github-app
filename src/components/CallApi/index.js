import axios from 'axios';
import config from '../../config.json';

function* CallApi(method, endpoint, data, type, responsetype) {
  const { apiEndpoint } = config;
  const responseType = responsetype === undefined ? 'json' : responsetype;
  const contentType = type === undefined ? 'application/json' : 'multipart/form-data';
  const bodyRequest = contentType === 'application/json' ? data : 'multipart/form-data';

  const call = yield axios(`${apiEndpoint}${endpoint}`, {
    method,
    data: contentType === 'application/json' ? bodyRequest : 'multipart/form-data',
    /* eslint-disable comma-dangle */
    headers: {
      Accept: 'application/json,application/vnd.github.symmetra-preview+json,application/vnd.github.cloak-preview',
      'Content-Type': `${contentType}`,
    },
    responseType
    /* eslint-enable */
  })
    .then(response => response)
    .catch(e => e);

  return call;
}

export default CallApi;
