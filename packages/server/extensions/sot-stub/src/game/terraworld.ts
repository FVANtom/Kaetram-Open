import type World from '@kaetram/server/src/game/world';

import type Player from '@kaetram/server/src/game/entity/character/player/player';
import type Connection from '@kaetram/server/src/network/connection';
import Messages from '@kaetram/server/extensions/sot/src/game/messages';

export default class TerraWorld {
    public messages = new Messages();

    public constructor(public world: World) {}

    handleConnection(connection: Connection, player: Player) {
        console.debug(
            `Stub handleConnection called for connection [${connection.id}] and player [${player.instance}/${player.name}]`
        );
    }

    handleDisconnection(player: Player) {
        console.debug(
            `Stub handleDisconnection called for player [${player.instance}/${player.name}]`
        );
    }

    loadSotPlayer(instance: string) {
        console.debug(`Stub loadSotPlayer called for player [${instance}}]`);
    }
}
