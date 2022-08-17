import { ModuleS } from "odin";
import { NpcModuleC } from "./NpcModuleC";

export class NpcModuleS extends ModuleS<NpcModuleC,null> {
	//NPC最大血量
	npcHp:number = 30;

	//NPC血量字典
	npcHpMap:Map<GamePlay.Humanoid,number>;
	override onAwake(): void {
		this.npcHpMap = new Map<GamePlay.Humanoid,number>();
	}
	onStart(): void {
		
	}


	//供npc实例注册信息
	public net_AddNpc(npc:GamePlay.Humanoid){
		this.npcHpMap.set(npc,this.npcHp);
	}


	//收到伤害，修改收到伤害的npc的血量数据
	public net_GetHit(npc:GamePlay.Humanoid,damage:number){
		if(this.npcHpMap.has(npc)){
			this.npcHpMap.set(npc,this.npcHpMap.get(npc)-damage);
			if(this.npcHpMap.get(npc)<=0){
				Events.dispatchLocal("npcDead",npc);
				setTimeout(() => {
					Events.dispatchLocal("npcRecover",npc);
				}, 3000);
			}
		}

	}

	public net_GetHp(npc:GamePlay.Humanoid){
		return this.npcHpMap.get(npc);
	}

}
