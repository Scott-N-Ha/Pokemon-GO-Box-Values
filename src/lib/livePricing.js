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

const fetchJsonWithTimeout = async (url, timeoutMs = 5500) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
};

const ITEM_KEY_ALIASES = {
  egg_incubator: ['egg_incubator', 'eggincubator', 'incubator'],
  incense: ['incense'],
  lucky_egg: ['lucky_egg', 'luckyegg'],
  lure_module: ['lure_module', 'luremodule', 'lure_module_including_special'],
  max_potion: ['max_potion', 'maxpotion'],
  max_revive: ['max_revive', 'maxrevive'],
  poffin: ['poffin'],
  poke_ball: ['poke_ball', 'pokeball', 'poke_ball'],
  premium_battle_pass: ['premium_battle_pass', 'premiumbattlepass', 'battle_pass'],
  remote_raid_pass: ['remote_raid_pass', 'remoteraidpass'],
  special_lure_module: ['special_lure_module', 'specialluremodule'],
  star_piece: ['star_piece', 'starpiece'],
  super_incubator: ['super_incubator', 'superincubator'],
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
      const aliasMatches = Object.entries(ITEM_KEY_ALIASES).find(([, aliases]) => aliases.includes(normalizeKey(key)));
      if (aliasMatches) {
        const normalizedKey = aliasMatches[0];
        const numericValue = toNumber(itemValue);
        if (numericValue !== null) {
          normalized[normalizedKey] = numericValue;
        }
      }

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

  const directCollections = [rawData.items, rawData.item_details, rawData.item_prices, rawData.items_by_name, rawData.costs];

  directCollections.forEach((collection) => {
    if (!Array.isArray(collection)) {
      return;
    }

    collection.forEach((item) => {
      if (!item || typeof item !== 'object') {
        return;
      }

      const key = item.item ?? item.name ?? item.slug ?? item.id ?? item.key;
      const value = item.cost ?? item.price ?? item.value ?? item.coin_cost ?? item.amount ?? item.poke_coins ?? item.pokecoins;
      if (key || value !== undefined) {
        const aliasMatches = Object.entries(ITEM_KEY_ALIASES).find(([, aliases]) => aliases.includes(normalizeKey(key ?? '')));
        if (aliasMatches) {
          const numericValue = toNumber(value);
          if (numericValue !== null) {
            normalized[aliasMatches[0]] = numericValue;
          }
          return;
        }

        addCandidate(normalized, key, value);
      }
    });
  });

  return normalized;
};

export const resolveItemCost = (itemKey, itemMap = DEFAULT_ITEM_COSTS) => {
  const normalizedKey = normalizeKey(itemKey);
  const value = itemMap?.[normalizedKey];
  return toNumber(value) ?? 0;
};

export const fetchLiveItemCosts = async () => {
  const endpoints = [
    'https://pogoapi.net/api/v1/raid_settings.json',
    'https://pogoapi.net/api/v1/pokemon_names.json',
    `https://api.allorigins.win/raw?url=${encodeURIComponent('https://pogoapi.net/api/v1/raid_settings.json')}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent('https://pogoapi.net/api/v1/pokemon_names.json')}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const rawJson = await fetchJsonWithTimeout(endpoint);

      if (!rawJson) {
        continue;
      }

      const normalized = normalizePriceMap(rawJson);
      const priceMap = { ...DEFAULT_ITEM_COSTS, ...normalized };

      if (Object.keys(normalized).length > 0) {
        return priceMap;
      }
    } catch (error) {
      console.warn(`Unable to load Pokémon GO pricing from ${endpoint}:`, error);
    }
  }

  return { ...DEFAULT_ITEM_COSTS };
};

const normalizeItemName = (value = '') => {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
};

const ITEM_NAME_TO_KEY = {
  poke_ball: 'poke_ball',
  pokeball: 'poke_ball',
  incense: 'incense',
  lucky_egg: 'lucky_egg',
  lure_module: 'lure_module',
  egg_incubator: 'egg_incubator',
  max_potion: 'max_potion',
  max_revive: 'max_revive',
  premium_battle_pass: 'premium_battle_pass',
  remote_raid_pass: 'remote_raid_pass',
  super_incubator: 'super_incubator',
  star_piece: 'star_piece',
  poffin: 'poffin',
};

const API_BOX_IMAGE_KEYS = [
  'freebox1',
  'greatbox',
  'specialbox',
  'ultrabox',
  'adventure_box',
  'goldbox',
  'raid_premiumbox',
  'raid_remotebox',
];

const DEFAULT_LIVE_BOXES_FALLBACK = [
  {
    id: 'fallback-level-40',
    title: 'Level 40 Reward Box',
    price: 0,
    boxKey: 'ultrabox',
    items: [
      { key: 'egg_incubator', count: 4 },
      { key: 'incense', count: 4 },
      { key: 'lucky_egg', count: 4 },
      { key: 'lure_module', count: 4 },
      { key: 'max_revive', count: 40 },
      { key: 'max_potion', count: 40 },
      { key: 'poke_ball', count: 40 },
    ],
  },
  {
    id: 'fallback-level-45',
    title: 'Level 45 Reward Box',
    price: 0,
    boxKey: 'specialbox',
    items: [
      { key: 'super_incubator', count: 1 },
      { key: 'incense', count: 2 },
      { key: 'lucky_egg', count: 2 },
      { key: 'lure_module', count: 2 },
      { key: 'max_revive', count: 40 },
      { key: 'poke_ball', count: 40 },
    ],
  },
  {
    id: 'fallback-level-50',
    title: 'Level 50 Reward Box',
    price: 0,
    boxKey: 'adventure_box',
    items: [
      { key: 'super_incubator', count: 5 },
      { key: 'incense', count: 5 },
      { key: 'lucky_egg', count: 5 },
      { key: 'lure_module', count: 5 },
      { key: 'max_potion', count: 50 },
      { key: 'poke_ball', count: 50 },
    ],
  },
];

const mapLevelupRewardsToBoxes = (rawRewards = []) => {
  if (!Array.isArray(rawRewards)) {
    return [];
  }

  const validRewards = rawRewards
    .filter((entry) => !entry?.reward_retrospectively_given)
    .filter((entry) => Array.isArray(entry?.items_received) && entry.items_received.length > 0)
    .map((entry) => {
      const mappedItems = entry.items_received
        .map((item) => {
          const normalizedName = normalizeItemName(item?.item ?? '');
          const key = ITEM_NAME_TO_KEY[normalizedName];
          const count = Number(item?.amount_received);

          if (!key || !Number.isFinite(count) || count <= 0) {
            return null;
          }

          return {
            key,
            count,
          };
        })
        .filter(Boolean);

      return {
        level: Number(entry.level) || 0,
        items: mappedItems,
      };
    })
    .filter((entry) => entry.items.length > 0)
    .sort((a, b) => b.level - a.level)
    .slice(0, 8)
    .reverse();

  return validRewards.map((entry, index) => ({
    id: `pogo-level-${entry.level}-${index}`,
    title: `Level ${entry.level} Reward Box`,
    price: 0,
    boxKey: API_BOX_IMAGE_KEYS[index % API_BOX_IMAGE_KEYS.length],
    items: entry.items,
  }));
};

export const fetchLiveBoxes = async () => {
  const endpoints = [
    'https://pogoapi.net/api/v1/levelup_rewards.json',
    `https://api.allorigins.win/raw?url=${encodeURIComponent('https://pogoapi.net/api/v1/levelup_rewards.json')}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const rawJson = await fetchJsonWithTimeout(endpoint);

      if (!rawJson) {
        continue;
      }

      const boxes = mapLevelupRewardsToBoxes(rawJson);

      if (boxes.length > 0) {
        return boxes;
      }
    } catch (error) {
      console.warn(`Unable to load Pokémon GO boxes from ${endpoint}:`, error);
    }
  }

  return DEFAULT_LIVE_BOXES_FALLBACK;
};
