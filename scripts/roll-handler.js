import { ACTION_TYPES } from './constants.js';

export let RollHandler = null;

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    RollHandler = class RollHandler extends coreModule.api.RollHandler {
        handleActionClick(event, encodedValue) {
            let payload = encodedValue.split("|");

            if (payload.length != 4) {
                super.throwInvalidValueErr();
            }

            let macroType = payload[0];
            let actorId = payload[1];
            let tokenId = payload[2];
            let actionId = payload[3];

            let actor = coreModule.api.Utils.getActor(actorId, tokenId);
            if (this.isRightClick && actionId) {
                actor.items.get(actionId)?.sheet.render(true);
                return;
            }
            const item = actor.items.get(actionId);
            const poolMap = {
                working: 'intelligence',
                social: 'social',
                readIntentions: 'readintentions',
                sorcery: 'sorcery',
                command: 'command',
                grappleControl: 'grapple',
                disengage: 'movement',
                rush: 'movement',
                joinBattle: 'joinbattle',
            }
            let pool = poolMap[actionId];
            if (item) {
                switch (macroType) {
                    case ACTION_TYPES.WITHERING_ATTACK:
                        if (item?.parent) {
                            item.parent.actionRoll(
                                { rollType: 'withering', weapon: item.system }
                            );
                        }
                        break;
                    case ACTION_TYPES.DECISIVE_ATTACK:
                        if (item?.parent) {
                            item.parent.actionRoll(
                                { rollType: 'decisive', weapon: item.system }
                            );
                        }
                        break;
                    case ACTION_TYPES.GAMBIT_ATTACK:
                        if (item?.parent) {
                            item.parent.actionRoll(
                                { rollType: 'gambit', weapon: item.system }
                            );
                        }
                        break;
                    case ACTION_TYPES.SPLIT_WITHERING_ATTACK:
                        if (item?.parent) {
                            item.parent.actionRoll(
                                { rollType: 'withering-split', weapon: item.system }
                            );
                        }
                        break;
                    case ACTION_TYPES.SPLIT_DECISIVE_ATTACK:
                        if (item?.parent) {
                            item.parent.actionRoll(
                                { rollType: 'decisive-split', weapon: item.system }
                            );
                        }
                        break;
                    case ACTION_TYPES.SPLIT_GAMBIT_ATTACK:
                        if (item?.parent) {
                            item.parent.actionRoll(
                                { rollType: 'gambit-split', weapon: item.system }
                            );
                        }
                        break;
                    case ACTION_TYPES.ROLL_CHARM:
                        if (game.rollForm) {
                            game.rollForm.addCharm(item);
                        }
                        break;
                    case ACTION_TYPES.DEFENSIVE_CHARM:
                        if (item?.parent) {
                            game.socket.emit('system.exaltedthird', {
                                type: 'addOpposingCharm',
                                data: item,
                                actorId: item.parent._id,
                            });
                            if (game.rollForm) {
                                game.rollForm.addOpposingCharm(item);
                            }
                        }
                        break;
                    case (ACTION_TYPES.CUSTOM_ABILITY_ROLL):
                    case (ACTION_TYPES.ACTION_ROLL):
                        if (item?.parent) {
                            item.parent.actionRoll(
                                { rollType: 'ability', pool: item.id }
                            );
                        }
                        break;
                }
            }
            else {
                switch (macroType) {
                    case ACTION_TYPES.POOL_ROLL:
                        actor.actionRoll(
                            { rollType: 'ability', pool: actionId }
                        );
                        break;
                    case (ACTION_TYPES.SPECIFIC_ACTION):
                    case (ACTION_TYPES.COMBAT_ACTION):
                        if (actor.type === 'npc') {
                            if (pool) {
                                actor.actionRoll(
                                    {
                                        rollType: actionId,
                                        pool: pool
                                    }
                                );
                            }
                            else {
                                actor.actionRoll(
                                    {
                                        rollType: actionId,
                                    }
                                );
                            }
                        }
                        else {
                            actor.actionRoll(
                                {
                                    rollType: actionId,
                                }
                            );
                        }
                        break;
                    case ACTION_TYPES.CRAFT_ACTION:
                        actor.actionRoll(
                            { rollType: 'craft', ability: "craft", craftType: actionId, craftRating: 2 }
                        );
                        break;
                    case ACTION_TYPES.ABILITY_ROLL:
                        const abilityObject = actor.system.abilities[actionId];
                        actor.actionRoll(
                            { rollType: 'ability', ability: actionId, attribute: abilityObject.prefattribute }
                        );
                        break;
                    case ACTION_TYPES.SAVED_ROLL:
                        actor.actionRoll(
                            { rollId: actionId }
                        );
                        break;
                }
            }
        }
    }
})