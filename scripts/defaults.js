import { GROUP } from './constants.js';

export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const groups = GROUP
    Object.values(groups).forEach(group => {
        group.name = coreModule.api.Utils.i18n(group.name)
        group.listName = `Group: ${coreModule.api.Utils.i18n(group.name)}`
    })
    const groupsArray  = Object.values(groups)
    DEFAULTS = {
        layout: [
            {
                nestId: 'actions',
                id: 'actions',
                name: coreModule.api.Utils.i18n('Ex3.Actions'),
                groups: [
                    { ...groups.actions, nestId: 'actions_actions' },
                    { ...groups.specific_actions, nestId: 'actions_specific-actions' },
                    { ...groups.craft_actions, nestId: 'actions_craft-actions' },
                ]
            },
            {
                nestId: 'abilities',
                id: 'abilities',
                name: coreModule.api.Utils.i18n('Ex3.Abilities'),
                groups: [
                    { ...groups.abilities, nestId: 'abilities_abilities' },
                ]
            },
            {
                nestId: 'charms',
                id: 'charms',
                name: coreModule.api.Utils.i18n('Ex3.Charms'),
                groups: [
                    { ...groups.charms, nestId: 'charms_charms' },
                    { ...groups.roll_charms, nestId: 'charms_roll-charms' },
                    { ...groups.defensive_charms, nestId: 'charms_defensive-charms' },
                ]
            },
            {
                nestId: 'combat',
                id: 'combat',
                name: coreModule.api.Utils.i18n('Ex3.Combat'),
                groups: [
                    { ...groups.combat_actions, nestId: 'combat_combat-actions' },
                    { ...groups.withering_attacks, nestId: 'combat_withering-attacks' },
                    { ...groups.decisive_attacks, nestId: 'combat_decisive-attacks' },
                    { ...groups.gambit_attacks, nestId: 'combat_gambit-attacks' },
                    { ...groups.split_withering_attacks, nestId: 'combat_split-withering-attacks' },
                    { ...groups.split_decisive_attacks, nestId: 'combat_split-decisive-attacks' },
                    { ...groups.split_gambit_attacks, nestId: 'combat_split-gambit-attacks' },

                ]
            },
            {
                nestId: 'saved-rolls',
                id: 'saved-rolls',
                name: coreModule.api.Utils.i18n('Ex3.SavedRolls'),
                groups: [
                    { ...groups.saved_rolls, nestId: 'saved-rolls_saved-rolls' }
                ]
            },
        ],
        groups: groupsArray 
    }
})