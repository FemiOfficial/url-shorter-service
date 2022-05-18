import RandExp from 'randexp';
export const generateShortCode = () => {
  return new RandExp(/^[0-9a-zA-Z_]{6}$/).gen();
}