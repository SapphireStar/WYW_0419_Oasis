import { DataInfo, ModuleData } from "odin";

class CoinDataInfo extends DataInfo{
	count:number;
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

	public addCount(count:number){
		this.dataInfo.count+=count;
		return this.dataInfo.count;
	}


	public get count(){
		return this.dataInfo.count;
	}

}
