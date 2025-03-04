import { uid as uidSecure } from 'uid/secure';

export class UIDGenerator {
  static genRequestId(): string {
    return uidSecure(16);
  }

  static createJti(size: number = 20): string {
    return uidSecure(size);
  }
}
