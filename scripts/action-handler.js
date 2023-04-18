import { Utils } from '../../token-action-hud-core/scripts/token-action-hud-core.min.js'
import { IDS, ACTION_TYPES } from './constants.js';

export let ActionHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
        /** @override */
        /** @override */
        async buildSystemActions(subcategoryIds) {
            const token = this?.token;
            if (!token) return;
            const tokenId = token.id;
            const actor = this?.actor;
            if (!actor) return;
            if (actor.type === 'character') {
                this._getAbilities(actor, tokenId);
            }
            else {
                this._getActions(actor, tokenId);
            }
            this._getCharms(actor, tokenId);
            this._getCombat(actor, tokenId);
            this._getSpecificActions(actor, tokenId);
            this._getSavedRolls(actor, tokenId);
        }

        _getCharms(actor, tokenId) {
            // const rollCharms = actor.items.filter(item => item.type === 'charm' && item.system.diceroller.enabled).map(item => {
            //     return {
            //         id: item.id,
            //         name: item.name,
            //         encodedValue: [ACTION_TYPES.DEFENSIVE_CHARM, actor.id, tokenId, item.id].join(this.delimiter),
            //         selected: true,
            //     }
            // });
            const defensiveCharms = actor.items.filter(item => item.type === 'charm' && item.system.diceroller.opposedbonuses.enabled).map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.DEFENSIVE_CHARM, actor.id, tokenId, item.id].join(this.delimiter),
                    selected: true,
                }
            });
            this.addActionsToActionList(defensiveCharms, { id: IDS.DEFENSIVE_CHARM_ID, type: 'system' });
        }

        _getActions(actor, tokenId) {
            const pools = {
                command: 'Ex3.Command',
                grapple: 'Ex3.GrappleControl',
                joinbattle: 'Ex3.JoinBattle',
                movement: 'Ex3.Movement',
                readintentions: 'Ex3.ReadIntentions',
                social: 'Ex3.Social',
                sorcery: 'Ex3.Sorcery',
            };
            const poolActions = [];
            for (let [id, pool] of Object.entries(pools)) {
                poolActions.push(
                    {
                        id: id,
                        name: game.i18n.localize(pool),
                        encodedValue: [ACTION_TYPES.POOL_ROLL, actor.id, tokenId, id].join(this.delimiter),
                        selected: true,
                    }
                )
            }
            actor.items.filter(item => item.type === 'action').map(item => {
                poolActions.push({
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.ACTION_ROLL, actor.id, tokenId, item.id].join(this.delimiter),
                    selected: true,
                });
            });
            this.addActionsToActionList(poolActions, { id: IDS.ACTION_ID, type: 'system' });
        }

        _getAbilities(actor, tokenId) {
            const abilities = {
                archery: 'Ex3.Archery',
                athletics: 'Ex3.Athletics',
                awareness: 'Ex3.Awareness',
                brawl: 'Ex3.Brawl',
                bureaucracy: 'Ex3.Bureaucracy',
                craft: 'Ex3.Craft',
                dodge: 'Ex3.Dodge',
                integrity: 'Ex3.Integrity',
                investigation: 'Ex3.Investigation',
                larceny: 'Ex3.Larceny',
                linguistics: 'Ex3.Linguistics',
                lore: 'Ex3.Lore',
                martialarts: 'Ex3.MartialArts',
                medicine: 'Ex3.Medicine',
                melee: 'Ex3.Melee',
                occult: 'Ex3.Occult',
                performance: 'Ex3.Performance',
                presence: 'Ex3.Presence',
                resistance: 'Ex3.Resistance',
                ride: 'Ex3.Ride',
                sail: 'Ex3.Sail',
                socialize: 'Ex3.Socialize',
                stealth: 'Ex3.Stealth',
                survival: 'Ex3.Survival',
                thrown: 'Ex3.Thrown',
                war: 'Ex3.War',
            };
            const crafts = actor.items.filter(item => item.type === 'craft').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.CRAFT, actor.id, tokenId, item.id].join(this.delimiter),
                    selected: true,
                }
            });
            const martialarts = actor.items.filter(item => item.type === 'martialart').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.MARTIAL_ART, actor.id, tokenId, item.id].join(this.delimiter),
                    selected: true,
                }
            });
            const abilityActions = []
            for (let [id, ability] of Object.entries(abilities)) {
                abilityActions.push(
                    {
                        id: id,
                        name: game.i18n.localize(ability),
                        encodedValue: [ACTION_TYPES.ABILITY_ROLL, actor.id, tokenId, id].join(this.delimiter),
                        selected: true,
                    }
                )
            }
            this.addActionsToActionList(crafts, { id: IDS.CRAFT_ID, type: 'system' });
            this.addActionsToActionList(martialarts, { id: IDS.MARTIAL_ARTS_ID, type: 'system' });
            this.addActionsToActionList(abilityActions, { id: IDS.ABILITY_ID, type: 'system' });
        }

        _getSpecificActions(actor, tokenId) {
            const specificActionList = [];
            if(actor.type === 'character' && actor.system.settings.iscrafter) {
                const craftActionList = [
                    {
                        id: 'basic',
                        name: game.i18n.localize('Ex3.Basic'),
                        encodedValue: [ACTION_TYPES.CRAFT_ACTION, actor.id, tokenId, 'basic'].join(this.delimiter),
                        selected: true,
                    },
                    {
                        id: 'major',
                        name: game.i18n.localize('Ex3.Major'),
                        encodedValue: [ACTION_TYPES.CRAFT_ACTION, actor.id, tokenId, 'major'].join(this.delimiter),
                        selected: true,
                    },
                    {
                        id: 'superior',
                        name: game.i18n.localize('Ex3.Superior'),
                        encodedValue: [ACTION_TYPES.CRAFT_ACTION, actor.id, tokenId, 'superior'].join(this.delimiter),
                        selected: true,
                    },
                    {
                        id: 'legendary',
                        name: game.i18n.localize('Ex3.Legendary'),
                        encodedValue: [ACTION_TYPES.CRAFT_ACTION, actor.id, tokenId, 'legendary'].join(this.delimiter),
                        selected: true,
                    },
                ]
                this.addActionsToActionList(craftActionList, { id: IDS.CRAFT_ACTION_ID, type: 'system' });
            }
            const specificActions = {
                readintentions: 'Ex3.ReadIntentions',
                social: 'Ex3.SocialInfluence',
            };
            for (let [id, action] of Object.entries(specificActions)) {
                specificActionList.push(
                    {
                        id: id,
                        name: game.i18n.localize(action),
                        encodedValue: [ACTION_TYPES.SPECIFIC_ACTION, actor.id, tokenId, id].join(this.delimiter),
                        selected: true,
                    }
                )
            }
            if(actor.system.settings.issorcerer) {
                specificActionList.push(
                    {
                        id: 'sorcery',
                        name: game.i18n.localize('Ex3.Sorcery'),
                        encodedValue: [ACTION_TYPES.SPECIFIC_ACTION, actor.id, tokenId, 'sorcery'].join(this.delimiter),
                        selected: true,
                    }
                )
                specificActionList.push(
                    {
                        id: 'working',
                        name: game.i18n.localize('Ex3.SorcerousWorking'),
                        encodedValue: [ACTION_TYPES.SPECIFIC_ACTION, actor.id, tokenId, 'working'].join(this.delimiter),
                        selected: true,
                    }
                )
            }
            if(actor.type === 'npc' && actor.system.battlegroup) {
                specificActionList.push(
                    {
                        id: 'rout',
                        name: game.i18n.localize('Ex3.Rout'),
                        encodedValue: [ACTION_TYPES.SPECIFIC_ACTION, actor.id, tokenId, 'rout'].join(this.delimiter),
                        selected: true,
                    }
                )
            }
            this.addActionsToActionList(specificActionList, { id: IDS.SPECIFIC_ACTION_ID, type: 'system' });
        }

        _getCombat(actor, tokenId) {
            const combatActions = {
                accuracy: 'Ex3.Accuracy',
                damage: 'Ex3.Damage',
                joinBattle: 'Ex3.JoinBattle',
                command: 'Ex3.Command',
                grappleControl: 'Ex3.GrappleControl',
                rush: 'Ex3.Rush',
                disengage: 'Ex3.Disengage',
            };
            const combatActionsList = []
            for (let [id, action] of Object.entries(combatActions)) {
                combatActionsList.push(
                    {
                        id: id,
                        name: game.i18n.localize(action),
                        encodedValue: [ACTION_TYPES.COMBAT_ACTION, actor.id, tokenId, id].join(this.delimiter),
                        selected: true,
                    }
                )
            }
            const witheringActions = actor.items.filter(item => item.type === 'weapon').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.WITHERING_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                    img: Utils.getImage(item),
                    selected: true,
                }
            });
            const decisiveActions = actor.items.filter(item => item.type === 'weapon').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.DECISIVE_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                    img: Utils.getImage(item),
                    selected: true,
                }
            });
            const gambitActions = actor.items.filter(item => item.type === 'weapon').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.GAMBIT_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                    img: Utils.getImage(item),
                    selected: true,
                }
            });
            this.addActionsToActionList(combatActionsList, { id: IDS.COMBAT_ACTION_ID, type: 'system' });
            if (witheringActions) {
                this.addActionsToActionList(witheringActions, { id: IDS.WITHERING_ATTACK_ID, type: 'system' });
                this.addActionsToActionList(decisiveActions, { id: IDS.DECISIVE_ATTACK_ID, type: 'system' });
                this.addActionsToActionList(gambitActions, { id: IDS.GAMBIT_ATTACK_ID, type: 'system' });
            }
        }

        _getSavedRolls(actor, tokenId) {
            if (actor.system.savedRolls) {
                var actions = []
                for (let [id, roll] of Object.entries(actor.system.savedRolls)) {
                    actions.push(
                        {
                            id: id,
                            name: roll.name,
                            encodedValue: [ACTION_TYPES.SAVED_ROLL, actor.id, tokenId, id].join(this.delimiter),
                            img: 'systems/exaltedthird/assets/icons/d10.svg',
                            selected: true,
                        }
                    )
                }
                this.addActionsToActionList(actions, { id: IDS.SAVED_ROLL_ID, type: 'system' });
            }

        }
    }
})
