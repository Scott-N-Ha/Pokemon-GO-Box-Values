import { normalizePriceMap, resolveItemCost } from './livePricing';

describe('live pricing helpers', () => {
  test('normalizes API output into item-cost values', () => {
    const result = normalizePriceMap({
      incense: 32,
      lucky_egg: 65,
      lure_module: 90,
      max_potion: 20,
    });

    expect(result.incense).toBe(32);
    expect(result.lucky_egg).toBe(65);
    expect(result.lure_module).toBe(90);
    expect(result.max_potion).toBe(20);
  });

  test('falls back to default pricing if the item is missing', () => {
    expect(resolveItemCost('poke_ball')).toBe(4);
    expect(resolveItemCost('unknown_item')).toBe(0);
  });
});
