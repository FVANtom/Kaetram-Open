import log from '@kaetram/common/util/log';
import { Packets } from '@kaetram/common/network';

export default class Messages {
    public handleData(data: [Packets, ...never[]]) {
        log.debug(`TerraGame stub messages handleData() called with [data:${data}]`);
        return false;
    }
    public handleUTF8(data: string) {
        log.debug(`TerraGame stub messages handleUTF8() called with [data:${data}]`);
        return false;
    }
}
