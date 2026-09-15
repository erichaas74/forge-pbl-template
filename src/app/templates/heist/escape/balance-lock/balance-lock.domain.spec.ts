import previous from '../../testing/castle-escape-v3.3.fixture.json';
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import {
  balanceReading,
  balancePlacements,
  canPlaceBalanceWeight,
  emptyBalance,
  evaluateBalanceLock,
  formatPiece,
  pieceMass,
  validateBalanceLock,
  type BalanceLockDefinition,
} from './balance-lock.domain';

const lock = data.steps[0].puzzle.lock as BalanceLockDefinition;
const solution = [2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0];
describe('Exact reusable balance lock', () => {
  it('balances fractions, decimal sums and mixed numbers across all three seals', () => {
    validateBalanceLock(lock);
    expect(evaluateBalanceLock(lock, solution)).toBe(true);
    expect(balanceReading(lock, 0, solution).equation).toBe('1/2 + 1/4 = 3/4');
    expect(balanceReading(lock, 1, solution).equation).toBe('0.75 + 0.5 + 0.25 = 1.5');
    expect(balanceReading(lock, 2, solution).equation).toBe('1 3/4 + 3/4 = 2 1/2');
  });
  it('models actual relative mass and directional feedback, with no decimal rounding shortcut', () => {
    const classic: BalanceLockDefinition = { ...lock, mechanism: 'two-pan' };
    const half = lock.scales[0].pieces[0],
      quarter = lock.scales[0].pieces[1];
    expect(pieceMass(half)).toBe(2 * pieceMass(quarter));
    const positions = emptyBalance(lock);
    positions[0] = 2;
    positions[3] = 2;
    expect(balanceReading(classic, 0, positions).difference).toBe(-0.125);
    expect(balanceReading(classic, 0, positions).feedback).toContain('left pan is heavier');
    positions[1] = 2;
    expect(balanceReading(classic, 0, positions).feedback).toContain('right pan is heavier');
    positions[0] = 1;
    expect(balanceReading(classic, 0, positions).left).toBe(1.25);
    const decimal: BalanceLockDefinition = {
      ...lock,
      scales: [
        {
          ...lock.scales[0],
          left: [{ id: 't', value: { numerator: 3, denominator: 10 }, notation: 'decimal' }],
          pieces: [
            { id: 'a', value: { numerator: 1, denominator: 10 }, notation: 'decimal' },
            { id: 'b', value: { numerator: 2, denominator: 10 }, notation: 'decimal' },
          ],
        },
      ],
    };
    expect(evaluateBalanceLock(decimal, [2, 2])).toBe(true);
  });
  it('treats the piston as the opposite load and preserves legacy pan placements', () => {
    const positions = emptyBalance(lock);
    expect(balanceReading(lock, 0, positions).feedback).toContain('piston is heavier');
    expect(balanceReading(lock, 0, positions).difference).toBe(0.75);
    positions[0] = positions[1] = positions[3] = 2;
    expect(balanceReading(lock, 0, positions).feedback).toContain('pan is heavier');
    positions[3] = 1;
    expect(balancePlacements(lock, positions).slice(0, 4)).toEqual([2, 2, 0, 0]);
    expect(positions[3]).toBe(1);
    expect(balanceReading(lock, 0, positions).balanced).toBe(true);
    expect(canPlaceBalanceWeight(lock, 1)).toBe(false);
    expect(canPlaceBalanceWeight(lock, 2)).toBe(true);
  });
  it('rejects a piston inventory that can only balance by adding mass to the fixed side', () => {
    const definition: BalanceLockDefinition = {
      ...lock,
      scales: [
        {
          ...lock.scales[0],
          left: [{ ...lock.scales[0].left[0], value: { numerator: 1, denominator: 4 } }],
          pieces: [
            lock.scales[0].pieces[0],
            { ...lock.scales[0].pieces[1], value: { numerator: 3, denominator: 4 } },
          ],
        },
      ],
    };
    expect(() => validateBalanceLock(definition)).toThrow('no solution');
    expect(() => validateBalanceLock({ ...definition, mechanism: 'two-pan' })).not.toThrow();
  });
  it('requires every seal and one valid location per finite piece', () => {
    expect(evaluateBalanceLock(lock, emptyBalance(lock))).toBe(false);
    for (const bad of [
      solution.slice(1),
      [...solution, 2],
      solution.map(() => 3),
      solution.map(() => NaN),
    ])
      expect(evaluateBalanceLock(lock, bad)).toBe(false);
    expect(
      evaluateBalanceLock(
        lock,
        solution.map((p, i) => (i === 10 ? 0 : p)),
      ),
    ).toBe(false);
    // Another exact construction is accepted, rather than requiring an answer-key combination.
    const alternative = [...solution];
    alternative[1] = 0;
    alternative[3] = 2;
    alternative[4] = 2;
    expect(evaluateBalanceLock(lock, alternative)).toBe(true);
  });
  it('validates unsupported values, misleading labels, unsolvable inventories and duplicate blocks', () => {
    const scale = lock.scales[0];
    const invalid = [
      { ...lock, skin: 'unknown' },
      { ...lock, mechanism: 'unknown' },
      { ...lock, scales: [{ ...scale, right: scale.left }] },
      { ...lock, backdrop: 'https://example.com/bg.png' },
      { ...lock, tolerance: { numerator: 1, denominator: 0 } },
      { ...lock, scales: [{ ...scale, pieces: [scale.pieces[0], scale.pieces[0]] }] },
      { ...lock, scales: [{ ...scale, pieces: scale.pieces.slice(2, 4) }] },
      {
        ...lock,
        scales: [
          {
            ...scale,
            pieces: [
              { ...scale.pieces[0], value: { numerator: -1, denominator: 2 } },
              scale.pieces[1],
            ],
          },
        ],
      },
      {
        ...lock,
        scales: [
          { ...scale, pieces: [{ ...scale.pieces[2], notation: 'decimal' }, scale.pieces[1]] },
        ],
      },
    ];
    for (const value of invalid)
      expect(() => validateBalanceLock(value)).toThrow('INVALID_BALANCE_LOCK');
    expect(formatPiece(lock.scales[2].left[0])).toBe('2 1/2');
    expect(() => validateBalanceLock(previous.steps[4].puzzle.lock)).not.toThrow();
  });
});
