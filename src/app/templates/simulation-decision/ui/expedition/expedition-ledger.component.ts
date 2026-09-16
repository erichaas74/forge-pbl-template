import { Component, computed, input, output, signal } from '@angular/core';
import { formatMoney } from '../../domain/money';
import { expeditionTotals } from '../../domain/expedition-course.engine';
import type {
  ExpeditionAction,
  ExpeditionCycle,
  ExpeditionState,
  ReceiptBin,
} from '../../domain/expedition-course.models';

@Component({
  selector: 'app-expedition-ledger',
  templateUrl: './expedition-ledger.component.html',
  styleUrl: './expedition-ledger.component.scss',
})
export class ExpeditionLedgerComponent {
  readonly cycle = input.required<ExpeditionCycle>();
  readonly state = input.required<ExpeditionState>();
  readonly practice = input(false);
  readonly action = output<ExpeditionAction>();
  readonly selected = signal('');
  readonly money = formatMoney;
  readonly totals = computed(() => expeditionTotals(this.cycle(), this.state()));
  readonly columns: readonly { id: ReceiptBin; label: string }[] = [
    { id: 'income', label: 'Money in' },
    { id: 'expense', label: 'Money out' },
    { id: 'noncash', label: 'Stock loss' },
  ];
  readonly activeReceipt = computed(() =>
    this.state().receipts.find((r) => r.id === this.selected()),
  );
  readonly unfiled = computed(() => this.state().receipts.filter((r) => !this.state().bins[r.id]));
  file(bin: ReceiptBin): void {
    if (!this.activeReceipt()) return;
    this.action.emit({ type: 'file', receiptId: this.selected(), bin });
    this.selected.set('');
  }
}
