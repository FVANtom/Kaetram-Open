import log from '@kaetram/common/util/log';
import { Packets } from '@kaetram/common/network';
import Player from '@kaetram/server/src/game/entity/character/player/player';

export default class Messages {
    public onMessage(player: Player, packet: Packets, ...data: never[]): boolean {
        log.debug(
            `TerraWorld stub messages onMessage() called with [player:${player}, packet:${packet}, data:${data}]`
        );
        return false;
    }
}
