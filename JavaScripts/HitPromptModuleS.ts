/*
 * @Author: Tianyi
 * @Date: 2022-08-15 18:43:23
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:51:48
 * @FilePath: \WYW_0419_Oasis\JavaScripts\HitPromptModuleS.ts
 * @Description: 受击提示模块服务端，负责接收来自武器模块的攻击消息，将信息交给客户端模块处理
 * 
 */
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
