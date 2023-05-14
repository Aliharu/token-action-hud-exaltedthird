import { SystemManager } from './system-manager.js'

Hooks.once('ready', async () => {
    const MODULE_ID = 'token-action-hud-exaltedthird';
    const REQUIRED_CORE_MODULE_VERSION = '1.4'
    const module = game.modules.get(MODULE_ID);
    module.api = {
        requiredCoreModuleVersion: REQUIRED_CORE_MODULE_VERSION,
        SystemManager: SystemManager
    }
    Hooks.call('tokenActionHudSystemReady', module)
});