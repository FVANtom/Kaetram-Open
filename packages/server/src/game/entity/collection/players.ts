import Collection from '@kaetram/server/src/game/entity/collection/collection';

import type Player from '@kaetram/server/src/game/entity/character/player/player';

/**
 * A class for collections of entities of a certain type in the game.
 */
export default class PlayerCollection extends Collection<Player> {
    public createEntity(): Player | undefined {
        // We should not try to spawn a player this way, add() will not be called
        return undefined;
    }

    public override onRemove(entity: Player): void {
        if (entity.ready) entity.save();

        this.world.terraWorld.handleDisconnection(entity);

        this.world.network.deletePacketQueue(entity);
    }
}
