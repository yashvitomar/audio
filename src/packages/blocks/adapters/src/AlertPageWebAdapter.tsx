import { v4 as uuidv4 } from 'uuid';
import { runEngine } from '../../../framework/src/RunEngine';
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import MessageEnum, {
  getName
} from '../../../framework/src/Messages/MessageEnum';

export default class AlertPageWebAdapter {
  send: (message: Message) => void;

  constructor() {
    const blockId = uuidv4();
    this.send = message => runEngine.sendMessage(blockId, message);
    console.log('initing AlertPageWebAdapter');
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationAlertWebMessage)
    ]);
  }

  convert = (from: Message): Message => {
    const to = new Message(getName(MessageEnum.NavigationMessage));

    to.addData(getName(MessageEnum.NavigationTargetMessage), 'AlertWeb');

    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.copyAllPropertiesOf(from);

    to.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    return to;
  };

  receive(from: string, message: Message): void {
    console.log(`receive AlertPageWebAdapter==>${JSON.stringify(message)}`);
    console.log(
      `Converted AlertPageWebAdapter==>${JSON.stringify(this.convert(message))}`
    );

    this.send(this.convert(message));
  }
}
