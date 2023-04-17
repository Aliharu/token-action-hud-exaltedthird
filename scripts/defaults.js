import { SUBCATEGORY } from './constants.js';
/**
 * Default categories and subcategories
 */
export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const subcategories = SUBCATEGORY
    Object.values(subcategories).forEach(subcategory => {
        subcategory.name = coreModule.api.Utils.i18n(subcategory.name)
        subcategory.listName = `Subcategory: ${coreModule.api.Utils.i18n(subcategory.name)}`
    })
    const subcategoriesArray = Object.values(subcategories)
    DEFAULTS = {
        categories: [
            // {
            //     nestId: 'abilities',
            //     id: 'abilities',
            //     name: coreModule.api.Utils.i18n('Ex3.Abilities'),
            //     subcategories: [
            //         { ...subcategories.abilities, nestId: 'abilities_abilities' },
            //     ]
            // },
            {
                nestId: 'combat',
                id: 'combat',
                name: coreModule.api.Utils.i18n('Ex3.Combat'),
                subcategories: [
                    { ...subcategories.withering_attacks, nestId: 'combat_withering_attacks' },
                    { ...subcategories.decisive_attacks, nestId: 'combat_decisive_attacks' },
                    { ...subcategories.gambit_attacks, nestId: 'combat_gambit_attacks' }
                ]
            },
            {
                nestId: 'saved_rolls',
                id: 'saved_rolls',
                name: coreModule.api.Utils.i18n('Ex3.SavedRolls'),
                subcategories: [
                    { ...subcategories.saved_rolls, nestId: 'saved_rolls_saved_rolls' }
                ]
            },
        ],
        subcategories: subcategoriesArray
    }
})