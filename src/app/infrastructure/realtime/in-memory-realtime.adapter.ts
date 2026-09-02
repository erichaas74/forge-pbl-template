import { Subject } from 'rxjs';
import type {
  RealtimeListener,
  RuntimeChannel,
  WritableRealtimeAdapter,
} from '../../core/state/persistence-contracts';
import type { Unsubscribe } from '../../core/state/runtime-state-contracts';
import { runtimeScopeKey } from '../../core/state/runtime-scope';

export class InMemoryRealtimeAdapter<TSnapshot>
  implements WritableRealtimeAdapter<TSnapshot>
{
  private readonly channels = new Map<string, Subject<TSnapshot>>();

  subscribe(
    channel: RuntimeChannel,
    listener: RealtimeListener<TSnapshot>,
  ): Unsubscribe {
    const subscription = this.subjectFor(channel).subscribe(listener);
    return () => subscription.unsubscribe();
  }

  publish(channel: RuntimeChannel, snapshot: TSnapshot): void {
    this.subjectFor(channel).next(structuredClone(snapshot));
  }

  private subjectFor(channel: RuntimeChannel): Subject<TSnapshot> {
    const key = `${runtimeScopeKey(channel.scope)}::${channel.topic ?? 'runtime'}`;
    let subject = this.channels.get(key);
    if (subject === undefined) {
      subject = new Subject<TSnapshot>();
      this.channels.set(key, subject);
    }
    return subject;
  }
}

