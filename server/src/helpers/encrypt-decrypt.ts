import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';
import { config } from 'src/config';

const algorithm = 'aes-256-cbc';
const secretKey = config.PERSONAL_DECRYPT;
const ivLength = 16;

export function encrypt(text: string): { iv: string; content: string } {
  const iv = randomBytes(ivLength);
  const key = scryptSync(secretKey, 'salt', 32);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
}

export function decrypt(hash: { iv: string; content: string }): string {
  const iv = Buffer.from(hash.iv, 'hex');
  const key = scryptSync(secretKey, 'salt', 32);
  const decipher = createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
}
