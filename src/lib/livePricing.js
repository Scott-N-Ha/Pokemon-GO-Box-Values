export const DEFAULT_ITEM_COSTS = {
  egg_incubator: 150,
  incense: 31.25,
  lucky_egg: 62.5,
  lure_module: 85,
  max_potion: 20,
  max_revive: 30,
  poffin: 100,
  poke_ball: 4,
  premium_battle_pass: 100,
  remote_raid_pass: 100,
  special_lure_module: 180,
  star_piece: 80,
  super_incubator: 200,
};

const normalizeKey = (value = '') => {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
};

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const addCandidate = (accumulator, sourceKey, value) => {
  const numericValue = toNumber(value);
  if (numericValue === null || !sourceKey) {
    return accumulator;
  }

  accumulator[normalizeKey(sourceKey)] = numericValue;
  return accumulator;
};

export const normalizePriceMap = (rawData = {}) => {
  const normalized = {};

  if (!rawData || typeof rawData !== 'object') {
    return normalized;
  }

  const visit = (value) => {
    if (!value || typeof value !== 'object') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => visit(entry));
      return;
    }

    Object.entries(value).forEach(([key, itemValue]) => {
      if (typeof itemValue === 'number' || typeof itemValue === 'string') {
        addCandidate(normalized, key, itemValue);
      } else if (itemValue && typeof itemValue === 'object') {
        const candidate = itemValue.cost ?? itemValue.price ?? itemValue.value ?? itemValue.coin_cost ?? itemValue.pokecoins ?? itemValue.coins;
        if (candidate !== undefined) {
          addCandidate(normalized, key, candidate);
        }
      }
    });
  };

  visit(rawData);

  if (rawData.items && Array.isArray(rawData.items)) {
    rawData.items.forEach((item) => {
      if (item && typeof item === 'object') {
        const key = item.item ?? item.name ?? item.slug ?? item.id;
        const value = item.cost ?? item.price ?? item.value ?? item.coin_cost;
        addCandidate(normalized, key, value);
      }
    });
  }

  if (rawData.item_details && Array.isArray(rawData.item_details)) {
    rawData.item_details.forEach((item) => {
      if (item && typeof item === 'object') {
        const key = item.item ?? item.name ?? item.slug ?? item.id;
        const value = item.cost ?? item.price ?? item.value ?? item.coin_cost;
        addCandidate(normalized, key, value);
      }
    });
  }

  return normalized;
};

export const resolveItemCost = (itemKey, itemMap = DEFAULT_ITEM_COSTS) => {
  const normalizedKey = normalizeKey(itemKey);
  const value = itemMap?.[normalizedKey];
  return toNumber(value) ?? 0;
};

export const fetchLiveItemCosts = async () => {
  const endpoints = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent('https://pogoapi.net/api/v1/raid_settings.json')}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent('https://pogoapi.net/api/v1/pokemon_names.json')}`,
    'https://pogoapi.net/api/v1/raid_settings.json',
    'https://pogoapi.net/api/v1/pokemon_names.json',
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        continue;
      }

      const rawJson = await response.json();
      const normalized = normalizePriceMap(rawJson);
      if (Object.keys(normalized).length > 0) {
        return { ...DEFAULT_ITEM_COSTS, ...normalized };
      }
    } catch (error) {
      console.warn(`Unable to load Pokémon GO pricing from ${endpoint}:`, error);
    }
  }

  return { ...DEFAULT_ITEM_COSTS };
};
