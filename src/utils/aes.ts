import CryptoJS from 'crypto-js';  //引用AES源码js

const key = CryptoJS.enc.Hex.parse("746d2553492b5939233258576e7941743255684f5a6823456e67313433616648");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Hex.parse('30313233343536373839414243444546');   //十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt(word: string) {
  if (word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    // let decrypt = CryptoJS.AES.decrypt(srcs, key, {  mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  } else {
    return ''
  }
}

//加密方法
function Encrypt(word: string) {
  // let srcs = CryptoJS.enc.Hex.parse(word);
  let encrypted = CryptoJS.AES.encrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  // let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}
export default {
  Decrypt,
  Encrypt
};
