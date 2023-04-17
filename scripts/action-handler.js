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
            if(actor.type === 'character') {
                this._getCombat(actor, tokenId);
            }
            this._getCombat(actor, tokenId);
            this._getSavedRolls(actor, tokenId);
        }

        _getAbilities(actor, tokenId) {

        }

        _getCombat(actor, tokenId) {
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
            if (witheringActions) {
                // this.addSubcategoryToActionList({id: IDS.COMBAT_ID, type: 'system'}, {id: IDS.WITHERING_ATTACK_ID, name: game.i18n.localize('Ex3.WitheringAttacks'), type: 'system-derived'});
                this.addActionsToActionList(witheringActions, { id: IDS.WITHERING_ATTACK_ID, type: 'system' });
                // this.addSubcategoryToActionList({id: IDS.COMBAT_ID, type: 'system'}, {id: IDS.DECISIVE_ATTACK_ID, name: game.i18n.localize('Ex3.DecisiveAttacks'), type: 'system-derived'});
                this.addActionsToActionList(decisiveActions, {id: IDS.DECISIVE_ATTACK_ID, type: 'system'});
                // this.addSubcategoryToActionList({id: IDS.COMBAT_ID, type: 'system'}, {id: IDS.GAMBIT_ATTACK_ID, name: game.i18n.localize('Ex3.GambitAttacks'), type: 'system-derived'});
                this.addActionsToActionList(gambitActions, {id: IDS.GAMBIT_ATTACK_ID, type: 'system'});
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
