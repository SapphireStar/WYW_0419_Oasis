/*
 * @Author: Tianyi
 * @Date: 2022-08-16 16:36:32
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:46:47
 * @FilePath: \WYW_0419_Oasis\JavaScripts\GameControlModuleS.ts
 * @Description: 游戏控制模块服务端接收客户端请求，设置控制模块数据，供其他模块获取
 * 游戏结束后，重置所有服务端模块
 * 
 */
import { ModuleManager, ModuleS, UI } from "odin";
import { GameControlData } from "./GameControlData";
import { GameControlModuleC } from "./GameControlModuleC";
import { LeaderBoardUI } from "./LeaderBoardUI";
import { StartGameUI } from "./StartGameUI";

export class GameControlModuleS extends ModuleS<GameControlModuleC,GameControlData> {
	onStart(): void {

	}

	execute(param?: number, data?: any): void {
		console.log("server init");
	}

	public net_StartGame(){
		this.currentData.setGameStart(true);

		//通知GameControl mono类 有人要开始游戏
		Events.dispatchLocal("startGame");

		//允许玩家移动
		this.currentPlayer.character.canMove = true;
	}

	public net_UpdateTime(curTime:number){
		this.currentData.setCurTime(curTime);
		this.currentData.saveData(true);
	}

	public net_InitGame(){
		//游戏结束，不允许玩家移动
		this.currentPlayer.character.canMove = false;

		//将游戏状态设置为未开始
		this.currentData.setGameStart(false);
		this.currentData.saveData(true);

		//重置所有的模块
		ModuleManager.instance.forEachModule((module)=>{
			module.execute();
		});
	}

}
