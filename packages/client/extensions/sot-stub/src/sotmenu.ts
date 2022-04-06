import log from '@kaetram/common/util/log';
import { Modules, Packets } from '@kaetram/common/network';

export default class SotMenu {
    public handleData(data: [Packets, ...never[]]) {
        log.debug(`TerraGame stub messages handleData() called with [data:${data}]`);
        return false;
    }

    handleAction(selectedSlot: number, action: Modules.MenuActions) {
        log.debug(
            `SotMenu stub messages handleAction() called with [selectedSlot:${selectedSlot}, action:${action}]`
        );
        return false;
    }
}
