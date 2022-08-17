import { EffectManager, ModuleManager } from "odin";
import { BaseState } from "../../../JavaScripts/FiniteStateMachine/BaseState";
import { DeadState } from "../../../JavaScripts/FiniteStateMachine/DeadState";
import { PatrolState } from "../../../JavaScripts/FiniteStateMachine/PatrolState";
import { NpcModuleS } from "../../../JavaScripts/NpcModuleS";

@MWCore.MWClass
export default class NPC extends MWCore.MWScript {
	curState:BaseState;
	npcModule:NpcModuleS;
	
	@MWCore.MWProperty()
	InitialWayPoint:number = 0;
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		if(GamePlay.isServer()){
			//向服务器注册当前npc
			this.npcModule = ModuleManager.instance.getModule(NpcModuleS);
			this.npcModule.net_AddNpc(this.gameObject as GamePlay.Humanoid);

			//默认状态为巡逻状态
			this.curState = new PatrolState(this.gameObject as GamePlay.Humanoid);
			this.bUseUpdate = true;

			(this.curState as PatrolState).setWayPoint(this.InitialWayPoint);
			this.curState.enterState();


			//如果接收到npc模块的死亡消息，则进入死亡状态
			Events.addLocalListener("npcDead",(npc)=>{
				if(npc==this.gameObject){
					this.curState = new DeadState(this.gameObject as GamePlay.Humanoid);
					this.curState.enterState();
				}
			});

			//如果收到npc模块的复活消息，则复活，继续巡逻
			Events.addLocalListener("npcRecover",(npc)=>{
				console.log("npc recover");
				if(npc==this.gameObject){
					this.curState = new PatrolState(this.gameObject as GamePlay.Humanoid);
					(this.curState as PatrolState).setWayPoint(this.InitialWayPoint);
					this.curState.enterState();
					let waypoints = MWCore.GameObject.getGameObjectsByName("WayPoint");
					this.gameObject.location = waypoints[Math.floor(Math.random()*(waypoints.length))].location;
				}
			});
			
		}
	}



	/** 
	 * 每帧被执行,与上一帧的延迟 dt 秒
	 * 此函数执行需要将this.bUseUpdate赋值为true
	 */
	protected onUpdate(dt: number): void {
		this.curState.Update(dt);
	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {

	}


}
