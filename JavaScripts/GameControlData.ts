import { DataInfo, ModuleData } from "odin";
class GameControlDataInfo extends DataInfo{
	//当前计时时间
	curTime:number;

	//玩家是否选择开始游戏
	isGameStart:boolean;
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

	public setGameStart(value:boolean){
		this.dataInfo.isGameStart=value;
	}

	public get curTime(){
		return this.dataInfo.curTime;
	}

	public get isGameStart(){
		return this.dataInfo.isGameStart;
	}
}
