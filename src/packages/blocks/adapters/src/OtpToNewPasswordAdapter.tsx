import {runEngine} from '../../../framework/src/RunEngine'
import {IBlock} from '../../../framework/src/IBlock';
import {Message} from '../../../framework/src/Message';
import MessageEnum, {getName } from '../../../framework/src/Messages/MessageEnum';

export default class OtpToNewPasswordAdapter  {
    send: (message: Message) => void;
    constructor() {
        const uuidv4 = require('uuid/v4');
        let blockId = uuidv4();
        this.send = message => runEngine.sendMessage(blockId, message);
        runEngine.attachBuildingBlock(this as IBlock, [getName(MessageEnum.NavigationNewPasswordMessage)]);
    }
    convert(from: Message): Message {   

        const to = new Message(getName(MessageEnum.NavigationMessage));

        to.addData(getName(MessageEnum.NavigationTargetMessage), "NewPassword")

        to.addData(getName(MessageEnum.NavigationPropsMessage), 
            from.getData(getName(MessageEnum.NavigationPropsMessage)))
            
        const raiseMessage:Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        raiseMessage.addData(
            getName(MessageEnum.AuthTokenDataMessage),
            from.getData(getName(MessageEnum.AuthTokenDataMessage))
        );

        to.addData(getName(MessageEnum.NavigationRaiseMessage),
            raiseMessage)
        
        return to;
    }
    receive(from: string, message: Message): void {
        this.send(this.convert(message));
    }
}