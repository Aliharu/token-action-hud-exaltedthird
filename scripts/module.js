// FOR LIVE
import { ActionHandler, CategoryManager, RollHandler, SystemManager, Utils } from '../../token-action-hud-core/scripts/token-action-hud-core.min.js'

// For DEBUGGING
/*
import { ActionHandler   } from '../../token-action-hud-core/scripts/action-handlers/action-handler.js'
import { CategoryManager } from '../../token-action-hud-core/scripts/category-manager.js'
import { RollHandler     } from '../../token-action-hud-core/scripts/roll-handlers/roll-handler.js'
import { SystemManager   } from '../../token-action-hud-core/scripts/system-manager.js'
import { Utils           } from '../../token-action-hud-core/scripts/utilities/utils.js'
*/

const COMBAT_ID = 'combat';
const WITHERING_ATTACK_ID = 'withering_attacks';
const DECISIVE_ATTACK_ID = 'decisive_attacks';
const GAMBIT_ATTACK_ID = 'gambit_attacks';

const SAVED_ROLL_ID = 'saved_rolls';

const WITHERING_ATTACK = 'withering_attack';
const DECISIVE_ATTACK = 'decisive_attack';
const GAMBIT_ATTACK = 'gambit_attack';
const SAVED_ROLL = 'saved_roll';



/* ACTIONS */

class MyActionHandler extends ActionHandler {
    constructor(categoryManager) {
        super(categoryManager);
    }

    /** @override */
    async buildSystemActions(subcategoryIds) {
        const token = this?.token;
        if (!token) return;
        const tokenId = token.id;
        const actor = this?.actor;
        if (!actor) return;

        if (actor.type !== 'character') {
            return;
        }
        this._getCombat(actor, tokenId);
        this._getSavedRolls(actor, tokenId);
    }

    createList(parent, actor, tokenId, itemtype, checksort, sorting, label, selectedfunc = undefined) {
        // create one sublist
        const actions = actor.items.filter(item => item.type === itemtype)
            .map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [itemtype, actor.id, tokenId, item.id].join(this.delimiter),
                    cssClass: selectedfunc ? (selectedfunc(item) ? 'toggle active' : 'toggle') : '',
                    img: Utils.getImage(item),
                    selected: true,
                }
            })
        if (actions.length) {
            const subcat = { id: sorting, name: Utils.i18n(label), type: 'system-derived' };
            this.addSubcategoryToActionList(parent, subcat);
            this.addActionsToActionList(actions, subcat);
        }
    }

    _getCombat(actor, tokenId) {
        const witheringActions = actor.items.filter(item => item.type === 'weapon').map(item => {
            return {
                id: item.id,
                name: item.name,
                encodedValue: [WITHERING_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                img: Utils.getImage(item),
                selected: true,
            }
        });
        const decisiveActions = actor.items.filter(item => item.type === 'weapon').map(item => {
            return {
                id: item.id,
                name: item.name,
                encodedValue: [DECISIVE_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                img: Utils.getImage(item),
                selected: true,
            }
        });
        const gambitActions = actor.items.filter(item => item.type === 'weapon').map(item => {
            return {
                id: item.id,
                name: item.name,
                encodedValue: [GAMBIT_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                img: Utils.getImage(item),
                selected: true,
            }
        });
        if (witheringActions) {
            // this.addSubcategoryToActionList({id: COMBAT_ID, type: 'system'}, {id: WITHERING_ATTACK_ID, name: Utils.i18n('Ex3.WitheringAttack'), type: 'system-derived'});
            this.addActionsToActionList(witheringActions, { id: WITHERING_ATTACK_ID, type: 'system' });
            // this.addSubcategoryToActionList({id: COMBAT_ID, type: 'system'}, {id: DECISIVE_ATTACK_ID, name: Utils.i18n('Ex3.DecisiveAttack'), type: 'system-derived'});
            // this.addActionsToActionList(decisiveActions, {id: DECISIVE_ATTACK_ID, type: 'system-derived'});
            // this.addSubcategoryToActionList({id: COMBAT_ID, type: 'system'}, {id: GAMBIT_ATTACK_ID, name: Utils.i18n('Ex3.GambitAttack'), type: 'system-derived'});
            // this.addActionsToActionList(gambitActions, {id: GAMBIT_ATTACK_ID, type: 'system-derived'});
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
                        encodedValue: [SAVED_ROLL, actor.id, tokenId, id].join(this.delimiter),
                        img: 'systems/exaltedthird/assets/icons/d10.svg',
                        selected: true,
                    }
                )
            }
            this.addActionsToActionList(actions, { id: SAVED_ROLL_ID, type: 'system' });
        }

    }

    // _getCombat(actor, tokenId, parent) {
    //     // just one long list of actions for the combat category
    //     const actions = actor.items.filter(item => item.type === 'weapon').map(item => {
    //             return {
    //                 id: item.id,
    //                 name: item.name,
    //                 encodedValue: [WITHERING_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
    //                 img: Utils.getImage(item),
    //                 selected: true,
    //             }
    //         })
    //     this.addActionsToActionList(actions, parent);
    // }
}


/* ROLL HANDLER */

class MyRollHandler extends RollHandler {

    doHandleActionEvent(event, encodedValue) {
        let payload = encodedValue.split("|");

        if (payload.length != 4) {
            super.throwInvalidValueErr();
        }

        let macroType = payload[0];
        let actorId = payload[1];
        let tokenId = payload[2];
        let actionId = payload[3];

        let actor = Utils.getActor(actorId, tokenId);
        if (this.isRightClick(event) && actionId) {
            actor.items.get(actionId)?.sheet.render(true);
            return;
        }
        if (macroType !== SAVED_ROLL) {
            const item = actor.items.get(actionId);
            switch (macroType) {
                case WITHERING_ATTACK:
                    if (item?.parent) {
                        game.rollForm = new game.exaltedthird.RollForm(item.parent, {}, {}, { rollType: 'withering', weapon: item.system }).render(true);
                    }
                    break;
                case DECISIVE_ATTACK:
                    if (item?.parent) {
                        game.rollForm = new game.exaltedthird.RollForm(item.parent, {}, {}, { rollType: 'decisive', weapon: item.system }).render(true);
                    }
                    break;
                case GAMBIT_ATTACK:
                    if (item?.parent) {
                        game.rollForm = new game.exaltedthird.RollForm(item.parent, {}, {}, { rollType: 'gambit', weapon: item.system }).render(true);
                    }
                    break;
            }
        }
        else {
            game.rollForm = game.exaltedthird.RollForm(actor, {}, {}, { rollId: actionId }).render(true);
        }
    }
}

// Core Module Imports

export class MySystemManager extends SystemManager {
    /** @override */
    doGetCategoryManager() {
        return new CategoryManager()
    }

    /** @override */
    doGetActionHandler(categoryManager) {
        return new MyActionHandler(categoryManager)
    }

    /** @override */
    getAvailableRollHandlers() {
        const choices = { core: "Exalted Third" };
        return choices
    }

    /** @override */
    doGetRollHandler(handlerId) {
        return new MyRollHandler()
    }

    async doRegisterDefaultFlags() {
        const COMBAT_NAME = game.i18n.localize('Ex3.Combat');
        const SAVED_ROLL_NAME = game.i18n.localize('Ex3.SavedRoll');
        const WITHERING_ATTACK_NAME = game.i18n.localize('Ex3.WitheringAttacks');

        const DEFAULTS = {
            categories: [
                {
                    nestId: COMBAT_ID,
                    id: COMBAT_ID,
                    name: COMBAT_NAME,
                    type: 'system',
                    subcategories: [
                        {
                            nestId: 'combat_withering_attacks',
                            id: WITHERING_ATTACK_ID,
                            name: WITHERING_ATTACK_NAME,
                            type: 'system',
                            hasDerivedSubcategories: false
                        }
                    ]
                },
                {
                    nestId: SAVED_ROLL_ID,
                    id: SAVED_ROLL_ID,
                    name: SAVED_ROLL_NAME,
                    type: 'system',
                    subcategories: [
                        {
                            nestId: 'saved_rolls_saved_rolls',
                            id: SAVED_ROLL_ID,
                            name: SAVED_ROLL_NAME,
                            type: 'system',
                            hasDerivedSubcategories: false
                        }
                    ]
                },
            ],
            // subcategories: [
            //     { id: SAVED_ROLL_ID, name: SAVED_ROLL_NAME, type: 'system', hasDerivedSubcategories: false },
            // ]
        }
        return DEFAULTS;
    }
}

/* STARTING POINT */

Hooks.once('ready', async () => {
    const MODULE_ID = 'token-action-hud-exaltedthird';
    const REQUIRED_CORE_MODULE_VERSION = '1.3'
    const module = game.modules.get(MODULE_ID);
    module.api = {
        requiredCoreModuleVersion: REQUIRED_CORE_MODULE_VERSION,
        SystemManager: MySystemManager
    }
    Hooks.call('tokenActionHudSystemReady', module)
});