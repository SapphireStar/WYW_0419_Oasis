/*
 * @Author: Tianyi
 * @Date: 2022-08-15 14:57:43
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-20 18:28:40
 * @FilePath: \WYW_0419_Oasis\JavaScripts\GameStart.ts
 * @Description: 
 * 
 */
import { ModuleManager, OdinGame, UI } from "odin";
import { CoinData } from "./CoinData";
import { CoinModuleC } from "./CoinModuleC";
import { CoinModuleS } from "./CoinModuleS";
import { GameControlData } from "./GameControlData";
import { GameControlModuleC } from "./GameControlModuleC";
import { GameControlModuleS } from "./GameControlModuleS";
import GameUI from "./GameUI";
import { HitPromptModuleC } from "./HitPromptModuleC";
import { HitPromptModuleS } from "./HitPromptModuleS";
import HitPromptUI from "./HitPromptUI";
import { BoardModuleC } from "./LeaderBoardModuleC";
import { LeaderBoardModuleS } from "./LeaderBoardModuleS";
import { NpcModuleC } from "./NpcModuleC";
import { NpcModuleS } from "./NpcModuleS";
import { PlayerData } from "./PlayerData";
import { PlayerModuleC } from "./PlayerModuleC";
import { PlayerModuleS } from "./PlayerModuleS";
import { StartGameUI } from "./StartGameUI";
import { WeaponModuleC } from "./WeaponModuleC";
import { WeaponModuleS } from "./WeaponModuleS";

@MWCore.MWClass
export default class GameStart extends OdinGame {
	@MWCore.MWProperty({displayName:"预加载"})
	private preloadAssets: string = this.preloads;

	protected get preloads(){
		return "14639,4173,4172,4388,12563,13407,14088,19641,7990";
	}


	protected onRegisterModule(): void {
		ModuleManager.instance.register(CoinModuleS,CoinModuleC,CoinData);
		ModuleManager.instance.register(PlayerModuleS,PlayerModuleC,PlayerData);
		ModuleManager.instance.register(GameControlModuleS,GameControlModuleC,GameControlData);
		ModuleManager.instance.register(LeaderBoardModuleS,BoardModuleC,null);
		ModuleManager.instance.register(HitPromptModuleS,HitPromptModuleC,null);
		ModuleManager.instance.register(NpcModuleS,NpcModuleC,null);
		ModuleManager.instance.register(WeaponModuleS,WeaponModuleC,null);
		if(GamePlay.isClient()){
			UI.instance.showPanel(StartGameUI);
		}
	}



}
