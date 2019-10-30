import { StrictEventEmitter } from 'nest-emitter';
import { EventEmitter } from 'events';

interface AuthEvents {
  signup: SignupContext;
}

export interface SignupContext {
  name: string;
  email: string;
  verificationToken: string;
}

export type AuthEventEmitter = StrictEventEmitter<EventEmitter, AuthEvents>;
