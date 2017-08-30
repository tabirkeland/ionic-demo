import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { VpcaWebSocket } from '../../providers/websocket/vpca-websocket';

export const NULL = 'NULL';
export const MAX_RATE:number = 100;
export const MIN_RATE:number = 1000;

// DEFINE YOUR GROUP HERE
export const PARAM_GROUP = 'Live_Data_View';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage
{
	private vpcaSubscription:Subscription;

	public liveDataParameters:any=[];

	public constructor(private vpca: VpcaWebSocket) {}

	public ionViewDidEnter()
	{
		this.initWebSockets();
	}

	private initWebSockets()
	{
		// Subscribe to the websocket messages
		this.vpcaSubscription = this.vpca.connect().messages.subscribe((message:any) => {
			console.log(message);

			if (message.MGPMG && message.MGPMG == PARAM_GROUP) {
				// Parse meta
				this.parseParamMetaMessage(message.Values);


				// SEND REQUEST FOR GROUP VALUES
				this.vpca.requestPushGroupValues(PARAM_GROUP, MAX_RATE, MIN_RATE);
			}

			if (message.MGP) {
				// Parse param value message
				this.parseParamValueMessage(message.MGP);
			}
		});

		// SEND REQUEST FOR GROUP METATDATA
		this.vpca.requestPushGroupMeta(PARAM_GROUP);
	}

	private parseParamValueMessage(msg:any)
	{
		if (msg.ParamVal != NULL) {
			let foundParam = this.liveDataParameters.find(param => param.label == msg.MGPLabel);
			if (foundParam) {
				let val = msg.ParamVal;
				if (val != NULL) {
					val = Number(val).toFixed(2);
				}

				foundParam.value = val;
			}
		}
	}

	private parseParamMetaMessage(values:Array<any>)
	{
		if (!this.liveDataParameters.length) {
			this.liveDataParameters = values.map((value:any) => {
				let meta = value.MGPM;
				return {
					label : meta.MGPMLabel,
					name : meta.MGPMName,
					units : meta.UnitsStr,
					value : null
				};
			}).sort((a, b) => b.units.length - a.units.length);
		}
	}

	public ionViewWillLeave()
	{
		this.vpcaSubscription.unsubscribe();
		this.vpca.clearPushTopics();
	}
}