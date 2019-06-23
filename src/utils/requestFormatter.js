export const getRequestParameters = ({ query, selectedOption }) => {
  const result = {
    APPID: '6e3d46c3297a91e7de6d22cb4e483570',
    units: 'imperial'
  };
  if (selectedOption === 'city') {
    result.q = `${query},us`;
  } else {
    const [lat, lon] = query.split(',');
    result.lat = lat.trim();
    result.lon = lon.trim();
  }
  return result;
};
