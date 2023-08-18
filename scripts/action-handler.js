import { IDS, ACTION_TYPES } from './constants.js';

export let ActionHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
        /** @override */
        /** @override */
        async buildSystemActions(groupIds) {
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
            for (let [subList, charmList] of Object.entries(actor.rollcharms)) {
                this.addGroup({id: `roll_${subList}`, name: game.i18n.localize(charmList.name), type: 'system-derived'}, { id: IDS.ROLL_CHARM_ID, type: 'system' });
                const charms = charmList.list.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        img: item.img,
                        encodedValue: [ACTION_TYPES.ROLL_CHARM, actor.id, tokenId, item.id].join(this.delimiter),
                        selected: true,
                    }
                });
                this.addActions(charms, {id: `roll_${subList}`, name: game.i18n.localize(charmList.name), type: 'system-derived'});
            }
            for (let [subList, charmList] of Object.entries(actor.defensecharms)) {
                this.addGroup({id: `defense_${subList}`, name: game.i18n.localize(charmList.name), type: 'system-derived'}, { id: IDS.DEFENSIVE_CHARM_ID, type: 'system' });
                const charms = charmList.list.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        img: item.img,
                        encodedValue: [ACTION_TYPES.DEFENSIVE_CHARM, actor.id, tokenId, item.id].join(this.delimiter),
                        selected: true,
                    }
                });
                this.addActions(charms, {id: `defense_${subList}`, name: game.i18n.localize(charmList.name), type: 'system-derived'});
            }
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
            const poolIcons = {
                command: 'icons/environment/people/infantry-army.webp',
                grapple: 'icons/skills/melee/strike-chain-whip-blue.webp',
                joinbattle: 'icons/skills/melee/swords-parry-block-yellow.webp',
                movement: 'icons/skills/movement/feet-winged-boots-glowing-yellow.webp',
                readintentions: 'icons/skills/trades/academics-investigation-study-blue.webp',
                social: 'icons/skills/social/diplomacy-handshake-yellow.webp',
                sorcery: 'systems/exaltedthird/assets/icons/magic-swirl.svg',
            };
            const poolActions = [];
            for (let [id, pool] of Object.entries(pools)) {
                poolActions.push(
                    {
                        id: id,
                        img: poolIcons[id],
                        name: game.i18n.localize(pool),
                        encodedValue: [ACTION_TYPES.POOL_ROLL, actor.id, tokenId, id].join(this.delimiter),
                        selected: true,
                    }
                )
            }
            actor.items.filter(item => item.type === 'action').map(item => {
                poolActions.push({
                    id: item.id,
                    img: item.img,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.ACTION_ROLL, actor.id, tokenId, item.id].join(this.delimiter),
                    selected: true,
                });
            });
            this.addActions(poolActions, { id: IDS.ACTION_ID, type: 'system' });
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
            const abilityIcons = {
                archery: "icons/skills/ranged/arrow-flying-white-blue.webp", 
                athletics: "icons/skills/movement/feet-winged-boots-glowing-yellow.webp", 
                awareness: "icons/magic/control/hypnosis-mesmerism-eye-tan.webp", 
                brawl: "icons/skills/melee/unarmed-punch-fist-yellow-red.webp", 
                bureaucracy: "icons/skills/trades/academics-merchant-scribe.webp", 
                craft: "icons/skills/trades/smithing-anvil-silver-red.webp", 
                dodge: "icons/magic/movement/trail-streak-zigzag-yellow.webp", 
                integrity: "icons/magic/holy/meditation-chi-focus-blue.webp", 
                investigation: "icons/skills/trades/academics-investigation-study-blue.webp", 
                larceny: "icons/skills/trades/security-locksmith-key-gray.webp",
                linguistics: "icons/skills/trades/academics-scribe-quill-gray.webp",
                lore: "icons/skills/trades/academics-study-reading-book.webp", 
                martialarts: "icons/skills/melee/unarmed-punch-fist-yellow-red.webp",
                medicine: "icons/tools/cooking/mortar-stone-yellow.webp", 
                melee: "icons/skills/melee/weapons-crossed-swords-yellow.webp", 
                occult: "icons/magic/symbols/runes-star-pentagon-orange.webp", 
                performance: "icons/skills/trades/music-notes-sound-blue.webp", 
                presence: "icons/magic/control/silhouette-aura-energy.webp", 
                resistance: "icons/magic/defensive/shield-barrier-deflect-gold.webp", 
                ride: "icons/environment/creatures/horse-brown.webp", 
                sail: "icons/skills/trades/profession-sailing-ship.webp", 
                socialize: "icons/skills/social/diplomacy-handshake-yellow.webp", 
                stealth: "icons/magic/perception/shadow-stealth-eyes-purple.webp", 
                survival: "icons/magic/nature/wolf-paw-glow-large-green.webp", 
                thrown: "icons/skills/ranged/daggers-thrown-salvo-orange.webp", 
                war: "icons/environment/people/charge.webp", 
            }
            const customAbilities = actor.items.filter(item => item.type === 'customability').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    img: item.img,
                    encodedValue: [ACTION_TYPES.CUSTOM_ABILITY_ROLL, actor.id, tokenId, item.id].join(this.delimiter),
                    selected: true,
                }
            });
            let abilityActions = []
            for (let [id, ability] of Object.entries(abilities)) {
                abilityActions.push(
                    {
                        id: id,
                        img: abilityIcons[id],
                        name: game.i18n.localize(ability),
                        encodedValue: [ACTION_TYPES.ABILITY_ROLL, actor.id, tokenId, id].join(this.delimiter),
                        selected: true,
                    }
                )
            }
            abilityActions = abilityActions.concat(customAbilities);
            this.addActions(abilityActions, { id: IDS.ABILITY_ID, type: 'system' });
        }

        _getSpecificActions(actor, tokenId) {
            const specificActionList = [];
            if(actor.type === 'character' && actor.system.settings.iscrafter) {
                const craftActionList = [
                    {
                        id: 'basic',
                        name: game.i18n.localize('Ex3.Basic'),
                        img: "icons/skills/trades/smithing-anvil-silver-red.webp",
                        encodedValue: [ACTION_TYPES.CRAFT_ACTION, actor.id, tokenId, 'basic'].join(this.delimiter),
                        selected: true,
                    },
                    {
                        id: 'major',
                        img: "icons/skills/trades/smithing-anvil-silver-red.webp",
                        name: game.i18n.localize('Ex3.Major'),
                        encodedValue: [ACTION_TYPES.CRAFT_ACTION, actor.id, tokenId, 'major'].join(this.delimiter),
                        selected: true,
                    },
                    {
                        id: 'superior',
                        img: "icons/skills/trades/smithing-anvil-silver-red.webp",
                        name: game.i18n.localize('Ex3.Superior'),
                        encodedValue: [ACTION_TYPES.CRAFT_ACTION, actor.id, tokenId, 'superior'].join(this.delimiter),
                        selected: true,
                    },
                    {
                        id: 'legendary',
                        img: "icons/skills/trades/smithing-anvil-silver-red.webp",
                        name: game.i18n.localize('Ex3.Legendary'),
                        encodedValue: [ACTION_TYPES.CRAFT_ACTION, actor.id, tokenId, 'legendary'].join(this.delimiter),
                        selected: true,
                    },
                ]
                this.addActions(craftActionList, { id: IDS.CRAFT_ACTION_ID, type: 'system' });
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
                        img: id === 'social' ? 'icons/skills/social/diplomacy-handshake-yellow.webp' : 'icons/skills/trades/academics-investigation-study-blue.webp',
                        encodedValue: [ACTION_TYPES.SPECIFIC_ACTION, actor.id, tokenId, id].join(this.delimiter),
                        selected: true,
                    }
                )
            }
            if(actor.system.settings.issorcerer) {
                specificActionList.push(
                    {
                        id: 'sorcery',
                        img: 'systems/exaltedthird/assets/icons/magic-swirl.svg',
                        name: game.i18n.localize('Ex3.Sorcery'),
                        encodedValue: [ACTION_TYPES.SPECIFIC_ACTION, actor.id, tokenId, 'sorcery'].join(this.delimiter),
                        selected: true,
                    }
                )
                specificActionList.push(
                    {
                        id: 'working',
                        name: game.i18n.localize('Ex3.SorcerousWorking'),
                        img: 'icons/magic/symbols/runes-star-pentagon-orange.webp',
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
                        img: 'icons/environment/people/charge.webp',
                        encodedValue: [ACTION_TYPES.SPECIFIC_ACTION, actor.id, tokenId, 'rout'].join(this.delimiter),
                        selected: true,
                    }
                )
            }
            this.addActions(specificActionList, { id: IDS.SPECIFIC_ACTION_ID, type: 'system' });
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
            const combatActionIcons = {
                accuracy: 'icons/svg/target.svg',
                damage: 'icons/svg/blood.svg',
                command: 'icons/environment/people/infantry-army.webp',
                grappleControl: 'icons/skills/melee/strike-chain-whip-blue.webp',
                joinBattle: 'icons/skills/melee/swords-parry-block-yellow.webp',
                rush: 'icons/skills/movement/feet-winged-boots-glowing-yellow.webp',
                disengage: 'icons/skills/movement/feet-winged-boots-glowing-yellow.webp',
            };
            const combatActionsList = []
            for (let [id, action] of Object.entries(combatActions)) {
                combatActionsList.push(
                    {
                        id: id,
                        img: combatActionIcons[id],
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
                    img: coreModule.api.Utils.getImage(item),
                    selected: true,
                }
            });
            const decisiveActions = actor.items.filter(item => item.type === 'weapon').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.DECISIVE_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                    img: coreModule.api.Utils.getImage(item),
                    selected: true,
                }
            });
            const gambitActions = actor.items.filter(item => item.type === 'weapon').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.GAMBIT_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                    img: coreModule.api.Utils.getImage(item),
                    selected: true,
                }
            });
            //Split
            const splitWitheringActions = actor.items.filter(item => item.type === 'weapon').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.SPLIT_WITHERING_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                    img: coreModule.api.Utils.getImage(item),
                    selected: true,
                }
            });
            const splitDecisiveActions = actor.items.filter(item => item.type === 'weapon').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.SPLIT_DECISIVE_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                    img: coreModule.api.Utils.getImage(item),
                    selected: true,
                }
            });
            const splitGambitActions = actor.items.filter(item => item.type === 'weapon').map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    encodedValue: [ACTION_TYPES.SPLIT_GAMBIT_ATTACK, actor.id, tokenId, item.id].join(this.delimiter),
                    img: coreModule.api.Utils.getImage(item),
                    selected: true,
                }
            });
            this.addActions(combatActionsList, { id: IDS.COMBAT_ACTION_ID, type: 'system' });
            if (witheringActions) {
                if(game.settings.get("exaltedthird", "showFullAttacks")) {
                    this.addActions(witheringActions, { id: IDS.WITHERING_ATTACK_ID, type: 'system' });
                    this.addActions(decisiveActions, { id: IDS.DECISIVE_ATTACK_ID, type: 'system' });
                    this.addActions(gambitActions, { id: IDS.GAMBIT_ATTACK_ID, type: 'system' });
                }
                this.addActions(splitWitheringActions, { id: IDS.SPLIT_WITHERING_ATTACK_ID, type: 'system' });
                this.addActions(splitDecisiveActions, { id: IDS.SPLIT_DECISIVE_ATTACK_ID, type: 'system' });
                this.addActions(splitGambitActions, { id: IDS.SPLIT_GAMBIT_ATTACK_ID, type: 'system' });
            }
        }

        _getSavedRolls(actor, tokenId) {
            const rollTypeIcons = {
                accuracy: 'icons/svg/target.svg',
                damage: 'icons/svg/blood.svg',
                withering: 'systems/exaltedthird/assets/icons/sword-clash.svg',
                decisive: 'systems/exaltedthird/assets/icons/bloody-sword.svg',
                gambit: 'systems/exaltedthird/assets/icons/drop-weapon.svg',
                command: 'icons/environment/people/infantry-army.webp',
                grappleControl: 'icons/skills/melee/strike-chain-whip-blue.webp',
                joinBattle: 'icons/skills/melee/swords-parry-block-yellow.webp',
                rush: 'icons/skills/movement/feet-winged-boots-glowing-yellow.webp',
                disengage: 'icons/skills/movement/feet-winged-boots-glowing-yellow.webp',
                readIntentions: 'icons/skills/trades/academics-investigation-study-blue.webp',
                social: 'icons/skills/social/diplomacy-handshake-yellow.webp',
                working: 'icons/magic/symbols/runes-star-pentagon-orange.webp',
                craft: 'icons/skills/trades/smithing-anvil-silver-red.webp',
                rout: 'icons/environment/people/charge.webp',
            };
            if (actor.system.savedRolls) {
                var actions = []
                for (let [id, roll] of Object.entries(actor.system.savedRolls)) {
                    let img = 'systems/exaltedthird/assets/icons/d10.svg';
                    if(rollTypeIcons[roll.rollType]) {
                        img = rollTypeIcons[roll.rollType];
                    }
                    actions.push(
                        {
                            id: id,
                            name: roll.name,
                            encodedValue: [ACTION_TYPES.SAVED_ROLL, actor.id, tokenId, id].join(this.delimiter),
                            img: img,
                            selected: true,
                        }
                    )
                }
                this.addActions(actions, { id: IDS.SAVED_ROLL_ID, type: 'system' });
            }

        }
    }
})
