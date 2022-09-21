import { Constants } from '@kaetram/common/network/modules';

export const enum SotConstants {
    MAP_DIVISION_SIZE = '', // The size of a region the map is split into.
    SPAWN_POINT = '', // Default starting point outside the tutorial
    TUTORIAL_SPAWN_POINT = '' // 'x,y' values
}

export const getMapDivisionSize = () => {
    return (
        SotConstants.MAP_DIVISION_SIZE.toString() === ''
            ? Constants.MAP_DIVISION_SIZE
            : SotConstants.MAP_DIVISION_SIZE
    ) as number;
};

export const getSpawnPoint = () => {
    return (
        SotConstants.SPAWN_POINT.toString() === ''
            ? Constants.SPAWN_POINT
            : SotConstants.SPAWN_POINT
    ) as string;
};

export const getTutorialSpawnPoint = () => {
    return (
        SotConstants.TUTORIAL_SPAWN_POINT.toString() === ''
            ? Constants.TUTORIAL_SPAWN_POINT
            : SotConstants.TUTORIAL_SPAWN_POINT
    ) as string;
};
