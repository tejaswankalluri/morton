import Scrypt from "scrypt-kdf";

class HashPassword {
  static async hash(textPassword, logN = 15) {
    const keyBuf = await Scrypt.kdf(textPassword, { logN });
    return keyBuf.toString('base64');
  }
  static async verify(textPassword, hashedPassword) {
    const keyBuf = Buffer.from(hashedPassword, 'base64');
    const ok = await Scrypt.verify(keyBuf, textPassword);
    return ok;
  }
}

export default HashPassword;
