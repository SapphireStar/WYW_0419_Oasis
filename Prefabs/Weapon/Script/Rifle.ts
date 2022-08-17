import { ModuleManager } from "odin";
import { WeaponModuleC } from "../../../JavaScripts/WeaponModuleC";

@MWCore.MWClass
export default class Rifle extends MWCore.MWScript {

	
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		let boxTrigger = this.gameObject.getChildByName("BoxTrigger") as GamePlay.BoxTrigger;
		let fireEffect = this.gameObject.getChildByName("Fire") as GamePlay.EffectSystem;
		boxTrigger.onEnter.Add((gameObject)=>{
			if(GamePlay.isCharacter(gameObject)){
				ModuleManager.instance.getModule(WeaponModuleC).pickWeapon((gameObject as GamePlay.Character).player,this.gameObject,fireEffect);
			}
		});
	}


}
