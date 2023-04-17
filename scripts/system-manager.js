import { ActionHandler } from './action-handler.js';
import { RollHandler } from './roll-handler.js';
import { DEFAULTS } from './defaults.js';

import { CategoryManager } from '../../token-action-hud-core/scripts/token-action-hud-core.min.js'


export let SystemManager = null;

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    SystemManager = class SystemManager extends coreModule.api.SystemManager {
        /** @override */
        doGetCategoryManager() {
            return new CategoryManager()
        }

        /** @override */
        doGetActionHandler(categoryManager) {
            return new ActionHandler(categoryManager)
        }

        /** @override */
        getAvailableRollHandlers() {
            const choices = { core: "Exalted Third" };
            return choices
        }

        /** @override */
        doGetRollHandler(handlerId) {
            return new RollHandler()
        }

        async doRegisterDefaultFlags() {
            return DEFAULTS;
        }
    }
})