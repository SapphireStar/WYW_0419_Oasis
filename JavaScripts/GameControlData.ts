import { DataInfo, ModuleData } from "odin";
class GameControlDataInfo extends DataInfo{
	//当前计时时间
	curTime:number;
}

export class GameControlData extends ModuleData<GameControlDataInfo> {

	public constructor(){
		super(GameControlDataInfo);
	}

	protected onDataInit(): void {

	}

	public setCurTime(value:number){
		this.dataInfo.curTime = value;
	}

	public get curTime(){
		return this.dataInfo.curTime;
	}
}
