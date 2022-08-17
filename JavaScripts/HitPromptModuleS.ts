import { DataCenterS, ModuleS } from "odin";
import { HitPromptModuleC } from "./HitPromptModuleC";

export class HitPromptModuleS extends ModuleS<HitPromptModuleC,null> {
	override onStart(): void {
		Events.addClientListener("playerHit",(attacker,player:GamePlay.Player,loc:Type.Vector)=>{
			console.log(player.character.name);
			this.callClientFun(player,this.client.net_ShowHitPrompt,loc);
			console.log("tell client show");
		});
	}

	override onUpdate(dt: number): void {

	}


}
