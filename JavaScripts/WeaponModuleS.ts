import { DataCenterS, EffectManager, ModuleManager, ModuleS } from "odin";
import { NpcModuleS } from "./NpcModuleS";
import { WeaponModuleC } from "./WeaponModuleC";
import { PlayerData } from "./PlayerData";
import { PlayerModuleS } from "./PlayerModuleS";

export class WeaponModuleS extends ModuleS<WeaponModuleC,null> {
	public net_Equiped(player:GamePlay.Player,weaponObj:MWCore.GameObject){
		player.character.attachGameObjectToCharacter(weaponObj,GamePlay.CharacterSocketType.Right_Hand);
	}

	public net_HitPlayer(player:GamePlay.Player){
		DataCenterS.instance.getModuleData(player,PlayerData).minusHp(30);
		DataCenterS.instance.getModuleData(player,PlayerData).saveData(true);
	}

	public net_HitNpc(npc:GamePlay.Humanoid){
		//随机给予玩家一个技能
		let playerData = DataCenterS.instance.getModuleData(this.currentPlayer,PlayerData);
		if(!playerData.canFly&&!playerData.canInvisible){
			if(Math.random()<0.5){
				playerData.setCanFly(true);
			}
			else{
				playerData.setCanInvisible(true);
			}
		}
		else if(!playerData.canFly){
			playerData.setCanFly(true);
		}
		else if(!playerData.canInvisible){
			playerData.setCanInvisible(true);
		}
		
		DataCenterS.instance.getModuleData(this.currentPlayer,PlayerData).saveData(true);

		//告诉NPC被击中
		ModuleManager.instance.getModule(NpcModuleS).net_GetHit(npc,30);
	}

	public net_PlayHitEffect(pos:Type.Vector){
		EffectManager.instance.playEffectInPos("13407",pos,1,Type.Rotation.zero,new Type.Vector(0.5,0.5,0.5));
	}
}
