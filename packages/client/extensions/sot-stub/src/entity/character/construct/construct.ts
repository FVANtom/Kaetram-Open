import { Modules } from '@kaetram/common/network';
import Character from '../../../../../../src/entity/character/character';
import { EntityData } from '@kaetram/common/types/entity';
import Game from '@kaetram/client/src/game';

export default class Construct extends Character {
    public constructor(instance: string, private game: Game) {
        super(instance, Modules.EntityType.Construct);
    }

    /**
     * Creates a new construct object, sets data such as its health,
     * attack range, level, etc, and returns that object.
     * @param info The entity data object containing construct information.
     * @returns A new construct object.
     */

    public static createConstruct(info: EntityData, game: Game): Construct {
        return new Construct(info.instance, game);
    }
}
