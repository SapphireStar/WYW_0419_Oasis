/*
 * @Author: Tianyi
 * @Date: 2022-08-16 16:36:24
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-20 10:33:04
 * @FilePath: \WYW_0419_Oasis\JavaScripts\GameControlModuleC.ts
 * @Description: 游戏流程控制模块客户端，接收来自UI的开始游戏请求，和GameControl mono类的结束消息，向服务端请求游戏的开始和结束
 * 客户端主要负责UI的显隐，游戏结束后重置所有的客户端模块。
 * 
 */
import { ModuleC, ModuleManager, SoundManager, UI } from "odin";
import { GameControlData } from "./GameControlData";
import {GameControlModuleS} from "./GameControlModuleS";
import GameUI from "./GameUI";
import { BoardModuleC } from "./LeaderBoardModuleC";
import { LeaderBoardInfo, LeaderBoardUI } from "./LeaderBoardUI";
import { ScoreBoardUI } from "./ScoreBoardUI";
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
		UI.instance.getPanel(GameUI).canvas.setRenderOpacity(1);
		UI.instance.getPanel(GameUI).mFireJoyStick.setActiveOpacity(1);
		UI.instance.getPanel(GameUI).mFireJoyStick.setInActiveOpacity(0.2);
		this.server.net_StartGame();

		//播放BGM
		SoundManager.instance.playBGM("14088",0.4);
	}

	public async StopGame(){
		//停止播放BGM
		SoundManager.instance.stopBGM();
		SoundManager.instance.playSound("19641",1,0.5);

		//由于发现如果在按住摇杆的情况下，hidepanel后再showpanel，会出现摇杆卡住的情况，所以不对GameUI进行隐藏，直接让开始游戏界面覆盖GameUI
		//展示结算界面
		await ModuleManager.instance.getModule(BoardModuleC).showLeaderBoard();
		UI.instance.getPanel(GameUI).canvas.setRenderOpacity(0);
		UI.instance.getPanel(GameUI).mFireJoyStick.setActiveOpacity(0);
		UI.instance.getPanel(GameUI).mFireJoyStick.setInActiveOpacity(0);
		//UI.instance.hidePanel(GameUI);

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
