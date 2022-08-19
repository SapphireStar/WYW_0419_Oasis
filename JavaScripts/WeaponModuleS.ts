/*
 * @Author: Tianyi
 * @Date: 2022-08-15 14:57:43
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:23:52
 * @FilePath: \WYW_0419_Oasis\JavaScripts\WeaponModuleS.ts
 * @Description: 服务端武器模块，负责为角色装备武器和播放特效。接收到来自客户端的射线检测结果时，根据不同结果做出不同操作
 * 
 */
import { DataCenterS, EffectManager, ModuleManager, ModuleS, Sound, SoundManager } from "odin";
import { NpcModuleS } from "./NpcModuleS";
import { WeaponModuleC } from "./WeaponModuleC";
import { PlayerData } from "./PlayerData";
import { PlayerModuleS } from "./PlayerModuleS";

export class WeaponModuleS extends ModuleS<WeaponModuleC, null> {

	onStart(): void {

	}

	execute(param?: number, data?: any): void {

	}

	public net_Equiped(player: GamePlay.Player, weaponObj: MWCore.GameObject) {
		player.character.attachGameObjectToCharacter(weaponObj, GamePlay.CharacterSocketType.Right_Hand);
	}

	public net_UnEquip(weaponObj: MWCore.GameObject, weaponPos: Type.Vector, weaponRot: Type.Rotation) {
		if (weaponObj != null) {
			
			this.currentPlayer.character.detachGameObjectFormCharacterSlot(weaponObj);

			//若在角色隐身时接触装备，则可能为不可见状态，需要手动设为可见
			weaponObj.setVisibility(Type.PropertyStatus.On);

			//重置武器位置信息
			weaponObj.location = weaponPos;
			weaponObj.rotation = weaponRot;
		}

	}

	public net_HitPlayer(player: GamePlay.Player) {
		//若击中玩家hp大于0，则进行击中判定
		if (DataCenterS.instance.getModuleData(player, PlayerData).hp > 0) {
			DataCenterS.instance.getModuleData(player, PlayerData).minusHp(30);
			DataCenterS.instance.getModuleData(player, PlayerData).saveData(true);
			if (DataCenterS.instance.getModuleData(player, PlayerData).hp <= 0) {
				DataCenterS.instance.getModuleData(this.currentPlayer, PlayerData).addKill();
			}
		}

	}

	public net_HitNpc(npc: GamePlay.Humanoid) {
		//告诉NPC被击中
		ModuleManager.instance.getModule(NpcModuleS).net_GetHit(npc, 30,this.currentPlayer);
	}

	public net_PlayShootEffect(go: MWCore.GameObject) {
		//播放射击特效
		SoundManager.instance.play3DSound("7990", go, 1, 0.7);
		EffectManager.instance.playEffectInGameObject("4388", go, 1);
	}

	public net_PlayHitEffect(pos: Type.Vector) {
		EffectManager.instance.playEffectInPos("13407", pos, 1, Type.Rotation.zero, new Type.Vector(0.5, 0.5, 0.5));
	}

	
}
