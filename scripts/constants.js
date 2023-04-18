export const IDS = {
    COMBAT_ID: 'combat',
    WITHERING_ATTACK_ID: 'withering_attacks',
    DECISIVE_ATTACK_ID: 'decisive_attacks',
    GAMBIT_ATTACK_ID: 'gambit_attacks',
    ACTION_ROLL_ID: 'action_rolls',
    SAVED_ROLL_ID: 'saved_rolls',
    CRAFT_ID: 'crafts',
    MARTIAL_ARTS_ID: 'martialarts',
    ACTION_ID: 'actions',
    ABILITY_ID: 'abilities',
    COMBAT_ACTION_ID: 'combat_actions',
    DEFENSIVE_CHARM_ID: 'defensive_charms',
    CHARM_ID: 'charms',
    SPECIFIC_ACTION_ID: 'specific_actions',
    CRAFT_ACTION_ID: 'craft_actions'
}

export const ACTION_TYPES = {
    WITHERING_ATTACK: 'withering_attack',
    DECISIVE_ATTACK: 'decisive_attack',
    GAMBIT_ATTACK: 'gambit_attack',
    CHARM: 'charm',
    DEFENSIVE_CHARM: 'defensive_charm',
    SAVED_ROLL: 'saved_roll',
    MARTIAL_ART: 'martial_art',
    CRAFT: 'craft',
    ABILITY_ROLL: 'ability_roll',
    POOL_ROLL: 'pool_roll',
    ACTION_ROLL: 'action_roll',
    COMBAT_ACTION: 'combat_action',
    SPECIFIC_ACTION: 'specific_action',
    CRAFT_ACTION: 'craft_action'
}

export const SUBCATEGORY = {
    actions: { id: 'actions', name: 'Ex3.Actions', type: 'system', hasDerivedSubcategories: false },
    specific_actions: { id: 'specific_actions', name: 'Ex3.SpecificActions', type: 'system', hasDerivedSubcategories: false },
    craft_actions: { id: 'craft_actions', name: 'Ex3.Crafts', type: 'system', hasDerivedSubcategories: false },
    abilities: { id: 'abilities', name: 'Ex3.Abilities', type: 'system', hasDerivedSubcategories: false },
    crafts: { id: 'crafts', name: 'Ex3.Crafts', type: 'system', hasDerivedSubcategories: false },
    martialarts: { id: 'martialarts', name: 'Ex3.MartialArts', type: 'system', hasDerivedSubcategories: false },
    charms: { id: 'charms', name: 'Ex3.Charms', type: 'system', hasDerivedSubcategories: true },
    roll_charms: { id: 'roll_charms', name: 'Ex3.RollCharms', type: 'system', hasDerivedSubcategories: true },
    defensive_charms: { id: 'defensive_charms', name: 'Ex3.DefensiveCharms', type: 'system', hasDerivedSubcategories: true },
    combat_actions:  { id: 'combat_actions', name: 'Ex3.Actions', type: 'system', hasDerivedSubcategories: false },
    withering_attacks:  { id: 'withering_attacks', name: 'Ex3.WitheringAttacks', type: 'system', hasDerivedSubcategories: false },
    decisive_attacks:  { id: 'decisive_attacks', name: 'Ex3.DecisiveAttacks', type: 'system', hasDerivedSubcategories: false },
    gambit_attacks:  { id: 'gambit_attacks', name: 'Ex3.GambitAttacks', type: 'system', hasDerivedSubcategories: false },
    saved_rolls: { id: 'saved_rolls', name: 'Ex3.SavedRolls', type: 'system', hasDerivedSubcategories: false },
}