import { ACTION_TYPES } from './constants.js';
import { Utils } from '../../token-action-hud-core/scripts/token-action-hud-core.min.js'

export let RollHandler = null;

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    RollHandler = class RollHandler extends coreModule.api.RollHandler {
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
            if (macroType !== ACTION_TYPES.SAVED_ROLL) {
                const item = actor.items.get(actionId);
                switch (macroType) {
                    case ACTION_TYPES.WITHERING_ATTACK:
                        if (item?.parent) {
                            game.rollForm = new game.exaltedthird.RollForm(item.parent, {}, {}, { rollType: 'withering', weapon: item.system }).render(true);
                        }
                        break;
                    case ACTION_TYPES.DECISIVE_ATTACK:
                        if (item?.parent) {
                            game.rollForm = new game.exaltedthird.RollForm(item.parent, {}, {}, { rollType: 'decisive', weapon: item.system }).render(true);
                        }
                        break;
                    case ACTION_TYPES.GAMBIT_ATTACK:
                        if (item?.parent) {
                            game.rollForm = new game.exaltedthird.RollForm(item.parent, {}, {}, { rollType: 'gambit', weapon: item.system }).render(true);
                        }
                        break;
                }
            }
            else {
                game.rollForm = new game.exaltedthird.RollForm(actor, {}, {}, { rollId: actionId }).render(true);
            }
        }
    }
})