export const IDS = {
    COMBAT_ID: 'combat',
    WITHERING_ATTACK_ID: 'withering_attacks',
    DECISIVE_ATTACK_ID: 'decisive_attacks',
    GAMBIT_ATTACK_ID: 'gambit_attacks',
    SAVED_ROLL_ID: 'saved_rolls',
}

export const ACTION_TYPES = {
    WITHERING_ATTACK: 'withering_attack',
    DECISIVE_ATTACK: 'decisive_attack',
    GAMBIT_ATTACK: 'gambit_attack',
    SAVED_ROLL: 'saved_roll'
}

export const SUBCATEGORY = {
    // abilities: { id: 'abilities', name: 'Ex3.Abilities', type: 'system', hasDerivedSubcategories: false },
    withering_attacks:  { id: 'withering_attacks', name: 'Ex3.WitheringAttacks', type: 'system', hasDerivedSubcategories: false },
    decisive_attacks:  { id: 'decisive_attacks', name: 'Ex3.DecisiveAttacks', type: 'system', hasDerivedSubcategories: false },
    gambit_attacks:  { id: 'gambit_attacks', name: 'Ex3.GambitAttacks', type: 'system', hasDerivedSubcategories: false },
    saved_rolls: { id: 'saved_rolls', name: 'Ex3.SavedRolls', type: 'system', hasDerivedSubcategories: false },
}