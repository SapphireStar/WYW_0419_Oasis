/*
 * @Author: Tianyi
 * @Date: 2022-08-16 20:11:10
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:57:10
 * @FilePath: \WYW_0419_Oasis\JavaScripts\StartGameUI.ts
 * @Description: 开始游戏UI，监听玩家点击按钮事件，发送给游戏控制模块
 * 
 */
import { ModuleManager } from "odin";
import { GameControlModuleC } from "./GameControlModuleC";
import { UI_StartGameUI } from "./UITemplate";

export class StartGameUI extends UI_StartGameUI {

	override onStart(){
		this.mStartGameButton.onClicked().add(()=>{
			ModuleManager.instance.getModule(GameControlModuleC).StartGame();
		});
	}

}
