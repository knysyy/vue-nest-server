import { StrictEventEmitter } from 'nest-emitter';
import { EventEmitter } from 'events';

interface ErrorEvents {
  error: Error;
}

export type ErrorEventsEmitter = StrictEventEmitter<EventEmitter, ErrorEvents>;
