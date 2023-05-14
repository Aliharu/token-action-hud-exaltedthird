import { ActionHandler } from './action-handler.js';
import { RollHandler } from './roll-handler.js';
import { DEFAULTS } from './defaults.js';

export let SystemManager = null;

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    SystemManager = class SystemManager extends coreModule.api.SystemManager {
        /** @override */
        doGetCategoryManager() {
            return new coreModule.api.CategoryManager()
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