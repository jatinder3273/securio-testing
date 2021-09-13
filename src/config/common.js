import CryptoJS from "crypto-js";
import config from "./index";
export function Encrypt(values) {
  let encJson = CryptoJS.AES.encrypt(JSON.stringify(values), config.cryptoSecret).toString();
  let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
  return encData;
}
export function Decrypt(values) {
  let decData = CryptoJS.enc.Base64.parse(values).toString(CryptoJS.enc.Utf8);
  let bytes = CryptoJS.AES.decrypt(decData, config.cryptoSecret).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes);
}

export function calculatePercentageForYear(price, percentage) {
  const yearlyPrice = price * 12;
  const yearlyPercentage = (yearlyPrice * percentage) / 100;
  const finalPrice = yearlyPrice - yearlyPercentage;
  return finalPrice;
}
