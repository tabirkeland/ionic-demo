import { Injectable } from '@angular/core';
import HedWebSocket from './hed-websocket';

@Injectable()
export class ChatWebSocket extends HedWebSocket
{
	protected appName:string = 'CHAT';

	protected digestParsedMessage(msg:any):void
	{

	}
}