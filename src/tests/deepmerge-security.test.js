const merge = require('deepmerge');

describe('patched deepmerge prototype safety', () => {
  test('does not inherit attacker fields from an own __proto__ in the target', () => {
    const target = JSON.parse('{"__proto__":{"isAdmin":true},"safe":1}');
    const result = merge(target, { added: 2 });
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result.isAdmin).toBeUndefined();
    expect(result.safe).toBe(1);
    expect(result.added).toBe(2);
  });

  test('does not poison a result merged from a null-prototype target', () => {
    const source = JSON.parse('{"__proto__":{"isAdmin":true}}');
    const result = merge(Object.create(null), source);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result.isAdmin).toBeUndefined();
    expect({}.isAdmin).toBeUndefined();
  });

  test('preserves nested merges and array concatenation', () => {
    expect(merge({ nested: { a: 1 }, values: [1] }, { nested: { b: 2 }, values: [2] }))
      .toEqual({ nested: { a: 1, b: 2 }, values: [1, 2] });
  });
});
