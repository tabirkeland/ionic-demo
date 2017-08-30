import { Injectable } from '@angular/core';
import HedWebSocket from './hed-websocket';

@Injectable()
export class VpcaWebSocket extends HedWebSocket
{
	protected appName:string = 'VPCA';

	private paramVals:Map<string,any> = new Map<string,any>();

	protected digestParsedMessage(msg:any):void
	{
		if (msg.MGP) {
			const param = msg.MGP;
			this.paramVals.set(param.MGPLabel, param);
		}
	}

	public getParam(label:string)
	{
		if (this.paramVals.has(label)) {
			return this.paramVals.get(label);
		}
		return null;
	}

	public getParamValue(label:string)
	{
		let param = this.getParam(label);
		if (param) {
			return param.ParamVal;
		}
		return null;
	}

	public getParamState(label:string)
	{
		let paramVal = this.getParamValue(label);
		if (!isNaN(paramVal)) {
			return parseInt(paramVal);
		}
		return null;
	}
}