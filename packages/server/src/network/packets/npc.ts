import Packet from '../packet';
import { Opcodes, Packets } from '@kaetram/common/network';
import { NPCPacket } from '@kaetram/common/types/messages/outgoing';

export default class NPC extends Packet {
    public constructor(opcode: Opcodes.NPC, data: NPCPacket) {
        super(Packets.NPC, opcode, data);
    }
}
