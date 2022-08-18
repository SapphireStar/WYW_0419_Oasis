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
		//随机给予玩家一个技能
		let playerData = DataCenterS.instance.getModuleData(this.currentPlayer, PlayerData);
		if (!playerData.canFly && !playerData.canInvisible) {
			if (Math.random() < 0.5) {
				playerData.setCanFly(true);
			}
			else {
				playerData.setCanInvisible(true);
			}
		}
		else if (!playerData.canFly) {
			playerData.setCanFly(true);
		}
		else if (!playerData.canInvisible) {
			playerData.setCanInvisible(true);
		}

		DataCenterS.instance.getModuleData(this.currentPlayer, PlayerData).saveData(true);

		//告诉NPC被击中
		ModuleManager.instance.getModule(NpcModuleS).net_GetHit(npc, 30);
	}

	public net_PlayShootEffect(go: MWCore.GameObject) {
		//播放射击特效
		SoundManager.instance.play3DSound("12563", go, 1, 0.5);
		EffectManager.instance.playEffectInGameObject("4388", go, 1);
	}

	public net_PlayHitEffect(pos: Type.Vector) {
		EffectManager.instance.playEffectInPos("13407", pos, 1, Type.Rotation.zero, new Type.Vector(0.5, 0.5, 0.5));
	}

	
}
