import { Injectable } from '@angular/core';
import HedWebSocket from './hed-websocket';

@Injectable()
export class WifiDevWebSocket extends HedWebSocket
{
	protected appName:string = 'WIFIDEV';

	protected digestParsedMessage(msg:any):void
	{
	}

	public setApn(ssid:string, pwd:string, ch:number):void
	{
		this.send({
			WSETSAPN : {
				SSID : ssid,
				PWD : pwd,
				CH : ch
			}
		});
	}

	public setClient(ssid:string, pwd:string, priority:number):void
	{
		this.send({
			WSETSCLIENT : {
				SSID : ssid,
				PWD : pwd,
				PRIORITY : priority
			}
		});
	}

	public removeClient(ssid:string):void
	{
		this.send({
			WREMOVECLIENT : {
				SSID : ssid
			}
		});
	}

	public clearClients():void
	{
		this.send({WCLEARCLIENTS : ''});
	}

	public getClientList():void
	{
		this.send({WLISTCLIENTS : ''});
	}

	public getWifiVersion():void
	{
		this.send({WVERSION : ''});
	}
}