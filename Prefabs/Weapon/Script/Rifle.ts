/*
 * @Author: Tianyi
 * @Date: 2022-08-17 20:03:16
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 16:11:02
 * @FilePath: \WYW_0419_Oasis\Prefabs\Weapon\Script\Rifle.ts
 * @Description: 武器mono类，接收游戏控制模块的消息，当重置游戏时，将武器回归原位，有人退出时，将退出玩家的武器回归原位
 * 
 */
import { ModuleManager } from "odin";
import { WeaponModuleC } from "../../../JavaScripts/WeaponModuleC";

@MWCore.MWClass
export default class Rifle extends MWCore.MWScript {

	initPos: Type.Vector;
	initRot: Type.Rotation;

	curPlayer: GamePlay.Character;
	isEquiped:boolean = false;

	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		this.initPos = this.gameObject.location;
		this.initRot = this.gameObject.rotation;

		let boxTrigger = this.gameObject.getChildByName("BoxTrigger") as GamePlay.BoxTrigger;
		boxTrigger.onEnter.Add((gameObject) => {
			if (GamePlay.isCharacter(gameObject)) {
				this.curPlayer = gameObject;
				if (GamePlay.isClient()&&(!this.isEquiped)) {
					this.isEquiped = true;
					let fireEffect = this.gameObject.getChildByName("Fire") as GamePlay.EffectSystem;
					ModuleManager.instance.getModule(WeaponModuleC).pickWeapon((gameObject as GamePlay.Character).player, this.gameObject, fireEffect, boxTrigger);
				}
			}
		});

		if(GamePlay.isClient()){
			Events.addServerListener("stopGame",()=>{
				this.isEquiped = false;
			});
			Events.addServerListener("enableWeapon",(obj)=>{
				if(obj==this.gameObject)
				{
					this.isEquiped = false;
				}
			});
		}

		//若有人退出游戏，则将他的武器归位
		if (GamePlay.isServer()) {
			Events.addPlayerLeftListener((player: GamePlay.Player) => {
				if (player.character == this.curPlayer) {
					setTimeout(() => {
						this.gameObject.location = this.initPos;
						this.gameObject.rotation = this.initRot;
						Events.dispatchToAllClient("enableWeapon",this.gameObject); 
					}, 100);
				}
			});
		}
	}


}
