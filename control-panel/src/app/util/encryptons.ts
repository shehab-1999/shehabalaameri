import CryptoJS from 'crypto-js';

// دالة للتشفير

 const key="123456789"
 export function encrypt(message: string): string {
  const ciphertext = CryptoJS.AES.encrypt(message.replace(/"/g,' '), key).toString();
  return ciphertext;
}

// دالة لفك التشفير
export function decrypt(ciphertext: string): string {
  const bytes  = CryptoJS.AES.decrypt(ciphertext, key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

export function encryptArray(array: string[]): string[] {
  return array.map(item => CryptoJS.AES.encrypt(item, key).toString());
}
export function decryptArray(encryptedArray: string[]): string[] {
  if (!encryptedArray) {
    return []; 
  }

  return encryptedArray.map(item => {
    const bytes = CryptoJS.AES.decrypt(item, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  });
}