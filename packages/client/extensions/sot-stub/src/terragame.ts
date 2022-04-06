import type App from '@kaetram/client/src/app';
import type Game from '@kaetram/client/src/game';
import log from '@kaetram/common/util/log';

import { ShowCodingPacket } from '@kaetram/common/extensions/sot/types/messages/toclient';
import Input from '@kaetram/client/src/controllers/input';
import Messages from '@kaetram/client/extensions/sot/src/messages';
import SotMenu from '@kaetram/client/extensions/sot/src/sotmenu';

export default class TerraGame {
    public messages = new Messages();
    public sotMenu = new SotMenu();

    public constructor(public app: App, public game: Game) {}

    public connect() {
        log.debug(`TerraGame stub connect() called.`);
    }

    public handleDisconnection(noError = false): void {
        log.debug(`TerraGame stub handleDisconnection() called with [noError=${noError}]`);
    }

    public hide() {
        log.debug(`TerraGame stub hide() called.`);
    }

    public showWith(data: ShowCodingPacket) {
        log.debug(`TerraGame stub handleDisconnection() called with [data=${data}]`);
    }

    public onMove(inputController: Input, position: Position) {
        log.debug(
            `TerraGame stub onMove() called with [inputController=${inputController}, position=${position}]`
        );
        return false;
    }
}
