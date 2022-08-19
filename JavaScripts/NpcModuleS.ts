/*
 * @Author: Tianyi
 * @Date: 2022-08-15 14:57:43
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:32:04
 * @FilePath: \WYW_0419_Oasis\JavaScripts\NpcModuleS.ts
 * @Description: 接收来自NPC mono类的注册消息，以及来自WeaponModuleS的攻击消息，若发现被攻击后死亡，则给予玩家一个技能
 * 
 */
import { DataCenterS, ModuleS } from "odin";
import { NpcModuleC } from "./NpcModuleC";
import { PlayerData } from "./PlayerData";

export class NpcModuleS extends ModuleS<NpcModuleC, null> {
	//NPC最大血量
	npcHp: number = 30;

	//NPC血量字典
	npcHpMap: Map<GamePlay.Humanoid, number>;
	override onAwake(): void {
		this.npcHpMap = new Map<GamePlay.Humanoid, number>();
	}
	onStart(): void {

	}


	//供npc实例注册信息
	public net_AddNpc(npc: GamePlay.Humanoid) {
		this.npcHpMap.set(npc, this.npcHp);
	}


	//收到伤害，修改收到伤害的npc的血量数据
	public net_GetHit(npc: GamePlay.Humanoid, damage: number, player: GamePlay.Player) {
		if (this.npcHpMap.has(npc)&&this.npcHpMap.get(npc)>0) {
			this.npcHpMap.set(npc, this.npcHpMap.get(npc) - damage);
			if (this.npcHpMap.get(npc) <= 0) {
				//随机给予玩家一个技能
				let playerData = DataCenterS.instance.getModuleData(player, PlayerData);
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
				DataCenterS.instance.getModuleData(player, PlayerData).saveData(true);

				Events.dispatchLocal("npcDead", npc);
				setTimeout(() => {
					Events.dispatchLocal("npcRecover", npc);
					this.npcHpMap.set(npc,30);
				}, 3000);
			}
		}

	}

	public net_GetHp(npc: GamePlay.Humanoid) {
		return this.npcHpMap.get(npc);
	}

}
