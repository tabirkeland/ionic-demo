import { Injectable } from '@angular/core';
import HedWebSocket from './hed-websocket';

@Injectable()
export class FwuaWebSocket extends HedWebSocket
{
	protected appName:string = 'FWUA';

	protected digestParsedMessage(msg:any):void
	{
	}

	public requestSoftwareVersion()
	{
		this.send({WVERSION : ''});
	}

	public requestStatus()
	{
		this.send({WFGAS:''});
	}

	public requestUploadedFileInfo()
	{
		this.send({WFUPD : ''});
	}

	public uploadDone()
	{
		this.send({WFUPD : 1});
	}

	public requestReset()
	{
		this.send({WFUPD : 2});
	}

	public sendStartUpdateRequest()
	{
		this.send({WFANS : ''});
	}
}