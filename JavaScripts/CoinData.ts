import { DataInfo, ModuleData } from "odin";

class CoinDataInfo extends DataInfo{
	//已收集金币数
	count:number;

	//总金币量，用于显示进度
	totalCoin:number;
}

export class CoinData extends ModuleData<CoinDataInfo> {

	public constructor(){
		super(CoinDataInfo);
	}

	protected override initDefaultData(): void {
		this.dataInfo.count = 0;
	}

	protected onDataInit(): void {
		this.dataInfo.count = 0;
	}

	public initAllData(){
		this.dataInfo.count = 0;
	}

	public addCount(count:number){
		this.dataInfo.count+=count;
		return this.dataInfo.count;
	}

	public setTotalCoin(value:number){
		this.dataInfo.totalCoin = value;
	}


	public get count(){
		return this.dataInfo.count;
	}

	public get totalCoin(){
		return this.dataInfo.totalCoin;
	}

}
