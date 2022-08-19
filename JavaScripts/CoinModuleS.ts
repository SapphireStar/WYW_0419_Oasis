/*
 * @Author: Tianyi
 * @Date: 2022-08-15 14:57:43
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:42:38
 * @FilePath: \WYW_0419_Oasis\JavaScripts\CoinModuleS.ts
 * @Description: 接收客户端的请求，增加金币量，并播放声音
 * 
 */
import { ModuleS, SoundManager } from "odin";
import { CoinData } from "./CoinData";
import { CoinModuleC } from "./CoinModuleC";

export class CoinModuleS extends ModuleS<CoinModuleC,CoinData> {

	public override onStart(): void {

	}

	execute(param?: number, data?: any): void {
		this.currentData.initAllData();
		this.currentData.saveData(true);
	}

	public net_Eat(pos:Type.Vector){
		this.currentData.addCount(1);
		this.currentData.saveData(true);
		SoundManager.instance.play3DSound("14639",pos,1,0.5);

	}

	public net_SetTotalCoin(value:number){
		this.currentData.setTotalCoin(value);
	}
}
