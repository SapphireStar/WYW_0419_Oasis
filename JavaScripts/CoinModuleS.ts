import { ModuleS, SoundManager } from "odin";
import { CoinData } from "./CoinData";
import { CoinModuleC } from "./CoinModuleC";

export class CoinModuleS extends ModuleS<CoinModuleC,CoinData> {

	public override onStart(): void {
	}

	public net_Eat(pos:Type.Vector){
		this.currentData.addCount(1);
		this.currentData.saveData(true);
		SoundManager.instance.play3DSound("14639",pos,1,0.5);

	}
}
