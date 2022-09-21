import rawData from '../../../../data/npcs.json';
import rawSotData from '../../../../extensions/sot/data/npcs.json';
import { NPC as NPCPacket } from '../../../network/packets';
import Entity from '../entity';

import { Modules, Opcodes } from '@kaetram/common/network';
import { SpecialEntityTypes } from '@kaetram/common/network/modules';
import log from '@kaetram/common/util/log';
import Utils from '@kaetram/common/util/utils';

import type { EntityDisplayInfo } from '@kaetram/common/types/entity';
import type { NPCData } from '@kaetram/common/types/npc';
import type Player from '../character/player/player';

import { Actor, DialogueItem } from '@kaetram/common/types/quest';
import Bubble from '../../../network/packets/bubble';

interface RawData {
    [key: string]: NPCData;
}

export default class NPC extends Entity {
    // talkIndex = 0;

    private data: NPCData;

    private text: DialogueItem[] = [];

    public role?: string;
    public store = '';

    public constructor(key: string, x: number, y: number) {
        super(Utils.createInstance(Modules.EntityType.NPC), key, x, y);

        this.data = (rawSotData as RawData)[key] || (rawData as RawData)[key];

        if (!this.data) {
            log.error(`[NPC] Could not find data for ${key}.`);
            return;
        }

        // Load default NPC data.
        this.name = this.data.name!;
        this.text = this.data.text || this.text;
        this.role = this.data.role!;
        this.store = this.data.store || '';
    }

    /**
     * Talks to an NPC and progresses the talking index of the player. It returns
     * the message the NPC is currently saying.
     * @param player The player to grab/compare talk index of.
     * @param text Optional parameter that uses default text in `npcs.json` if not specified.
     * @returns String of the current massage.
     */

    public talk(player?: Player, text = this.text): void {
        if (!(player && this.hasDialogue(text))) return;

        // Reset the talking index if we talk to a new NPC.
        if (player.npcTalk !== this.key) player.resetTalk(this.key);

        // Text to display at the current talking index.
        let message = text[player.talkIndex];

        /**
         * Reset the talking index when we reach the end or
         * continue progression otherwise.
         */

        if (player.talkIndex > text.length - 1) player.talkIndex = 0;
        else player.talkIndex++;

        let messageText,
            actor: Actor = 'npc';
        if (typeof message === 'string') messageText = message;
        else {
            messageText = message?.text || '';
            actor = <Actor>message?.actor;
        }

        // Send the network packet of the current dialogue index.
        if (actor === 'npc') {
            player.send(
                new Bubble({
                    instance: player.instance
                })
            );
            player.send(
                new NPCPacket(Opcodes.NPC.Talk, {
                    instance: this.instance,
                    text: messageText
                })
            );
        } else {
            player.send(
                new NPCPacket(Opcodes.NPC.Talk, {
                    instance: this.instance
                })
            );
            player.send(
                new Bubble({
                    instance: player.instance,
                    text: messageText
                })
            );
        }
    }

    /**
     * Checks if the NPC has a dialogue array.
     * @returns If the dialogue array length is greater than 0.
     */

    public hasDialogue(text: DialogueItem[]): boolean {
        return text.length > 0;
    }

    /**
     * Uses the player parameter to check if the NPC is currently present
     * in any of the player's active quests.
     * @param player Player we are checking achievement/quest status of.
     * @returns The RGB string of the NPC's name.
     */

    private getNameColour(player?: Player): string {
        if (player) {
            if (player.quests.getQuestFromNPC(this))
                return Modules.NameColours[SpecialEntityTypes.Quest];
            if (player?.achievements.getAchievementFromEntity(this))
                return Modules.NameColours[SpecialEntityTypes.Achievement];
        }

        return '';
    }

    /**
     * Grabs the display info for the NPC.
     * @param player Optional paramater to grab the display based on the player.
     * @returns An object containing display info data.
     */

    public override getDisplayInfo(player?: Player): EntityDisplayInfo {
        return {
            instance: this.instance,
            colour: this.getNameColour(player)
        };
    }

    /**
     * Checks whether or not the NPC is part of an active player's
     * achievement or quest if the parameter is specified.
     * @param player Optional parameter to check if the NPC is part of an active quest or achievement.
     * @returns Whether or not any display info data is present.
     */

    public override hasDisplayInfo(player?: Player): boolean {
        if (player) {
            if (player.quests.getQuestFromNPC(this)) return true;
            if (player.achievements.getAchievementFromEntity(this)) return true;
        }

        return false;
    }
}
