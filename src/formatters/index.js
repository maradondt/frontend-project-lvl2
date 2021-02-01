import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, formatName) => {
  const dispatchFormat = {
    stylish: (d) => stylish(d),
    plain: (d) => plain(d),
  };

  return dispatchFormat[formatName](diff);
};

export default format;
