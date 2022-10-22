import React from 'react';

import EggIncubator from '../images/EggIncubator.png';
import Incense from '../images/Incense.png';
import LuckyEgg from '../images/LuckyEgg.png';
import LureModule from '../images/LureModule.png';
import MaxPotion from '../images/MaxPotion.png';
import MaxRevive from '../images/MaxRevive.png';
import Poffin from '../images/Poffin.png';
import PokeBall from '../images/PokeBall.png';
import PremiumBattlePass from '../images/PremiumBattlePass.png';
import RemoteRaidPass from '../images/RemoteRaidPass.png';
import SpecialLureModule from '../images/SpecialLureModule.png';
import StarPiece from '../images/StarPiece.png';
import SuperIncubator from '../images/SuperIncubator.png';

const item_costs = {
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

const ItemLib = {
  egg_incubator: {
    name: 'Egg Incubator',
    image: EggIncubator,
    imageComponent: <img src={EggIncubator} alt='Egg Incubator' />,
    cost: item_costs.egg_incubator,
  },
  incense: {
    name: 'Incense',
    image: Incense,
    imageComponent: <img src={Incense} alt='Incense' />,
    cost: item_costs.incense,
  },
  lucky_egg: {
    name: 'Lucky Egg',
    image: LuckyEgg,
    imageComponent: <img src={LuckyEgg} alt='Lucky Egg' />,
    cost: item_costs.lucky_egg,
  },
  lure_module: {
    name: 'Lure Module',
    image: LureModule,
    imageComponent: <img src={LureModule} alt='Lure Module' />,
    cost: item_costs.lure_module,
  },
  max_potion: {
    name: 'Max Potion',
    image: MaxPotion,
    imageComponent: <img src={MaxPotion} alt='Max Potion' />,
    cost: item_costs.max_potion,
  },
  max_revive: {
    name: 'Max Revive',
    image: MaxRevive,
    imageComponent: <img src={MaxRevive} alt='Max Revive' />,
    cost: item_costs.max_revive,
  },
  poffin: {
    name: 'Poffin',
    image: Poffin,
    imageComponent: <img src={Poffin} alt='Poffin' />,
    cost: item_costs.poffin,
  },
  poke_ball: {
    name: 'Poke Ball',
    image: PokeBall,
    imageComponent: <img src={PokeBall} alt='Poke Ball' />,
    cost: item_costs.poke_ball,
  },
  premium_battle_pass: {
    name: 'Premium Battle Pass',
    image: PremiumBattlePass,
    imageComponent: <img src={PremiumBattlePass} alt='Premium Battle Pass' />,
    cost: item_costs.premium_battle_pass,
  },
  remote_raid_pass: {
    name: 'Remote Raid Pass',
    image: RemoteRaidPass,
    imageComponent: <img src={RemoteRaidPass} alt='Remote Raid Pass' />,
    cost: item_costs.remote_raid_pass,
  },
  special_lure_module: {
    name: 'Special Lure Module (Glacial, Magnetic, Mossy, Rainy)',
    image: SpecialLureModule,
    imageComponent: <img src={SpecialLureModule} alt='Special Lure Module' />,
    cost: item_costs.special_lure_module,
  },
  star_piece: {
    name: 'Star Piece',
    image: StarPiece,
    imageComponent: <img src={StarPiece} alt='Star Piece' />,
    cost: item_costs.star_piece,
  },
  super_incubator: {
    name: 'Super Incubator',
    image: SuperIncubator,
    imageComponent: <img src={SuperIncubator} alt='Super Incubator' />,
    cost: item_costs.super_incubator,
  },
};

export default ItemLib;
