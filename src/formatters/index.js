import stylish from './stylish.js';
import plain from './plain.js';
import formatJson from './json.js';

const format = (diff, formatName) => {
  const dispatchFormat = {
    stylish: (d) => stylish(d),
    plain: (d) => plain(d),
    json: (d) => formatJson(d),
  };

  return dispatchFormat[formatName](diff);
};

export default format;
