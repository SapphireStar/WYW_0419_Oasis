/*
 * @Author: Tianyi
 * @Date: 2022-08-16 16:36:24
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:50:38
 * @FilePath: \WYW_0419_Oasis\JavaScripts\GameControlModuleC.ts
 * @Description: 游戏流程控制模块客户端，接收来自UI的开始游戏请求，和GameControl mono类的结束消息，向服务端请求游戏的开始和结束
 * 客户端主要负责UI的显隐，游戏结束后重置所有的客户端模块。
 * 
 */
import { ModuleC, ModuleManager, SoundManager, UI } from "odin";
import { GameControlData } from "./GameControlData";
import {GameControlModuleS} from "./GameControlModuleS";
import GameUI from "./GameUI";
import { LeaderBoardModuleC } from "./LeaderBoardModuleC";
import { LeaderBoardInfo, LeaderBoardUI } from "./LeaderBoardUI";
import { StartGameUI } from "./StartGameUI";

export class GameControlModuleC extends ModuleC<GameControlModuleS,GameControlData> {

	execute(type?: number, param?: any): void {

	}

	onStart(): void {
		UI.instance.showPanel(StartGameUI);
		//监听mono类GameControl的当前时间
		Events.addServerListener("curTime",(curTime:number)=>{
			this.server.net_UpdateTime(curTime);
		});

		//监听mono类GameControl的停止游戏事件
		Events.addServerListener("stopGame",()=>{
			this.StopGame();
		});
	}

	public StartGame(){
		UI.instance.hidePanel(StartGameUI);
		UI.instance.showPanel(GameUI);
		this.server.net_StartGame();

		//播放BGM
		SoundManager.instance.playBGM("14088",0.4);
	}

	public async StopGame(){
		//停止播放BGM
		SoundManager.instance.stopBGM();
		SoundManager.instance.playSound("19641",1,0.5);

		UI.instance.hidePanel(GameUI);
		//展示结算界面
		await ModuleManager.instance.getModule(LeaderBoardModuleC).showLeaderBoard();

		//等待排行榜加载完成后重置游戏和数据
		this.InitGame();
	}

	public InitGame(){
		//对所有客户端和服务端的模块执行初始化
		ModuleManager.instance.forEachModule((module)=>{
			module.execute();
		});
		this.server.net_InitGame();
	}

}
