/*
 * @Author: Tianyi
 * @Date: 2022-08-17 16:27:33
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-20 10:49:49
 * @FilePath: \WYW_0419_Oasis\JavaScripts\LeaderBoardModuleC.ts
 * @Description: 排行榜模块客户端，负责接收来自游戏控制模块的请求，向服务端模块请求所有玩家的数据，并显示排行榜UI
 * 
 */
import { DataCenterC, ModuleC, UI } from "odin";
import GameUI from "./GameUI";
import { LeaderBoardModuleS as BoardModuleS } from "./LeaderBoardModuleS";
import { LeaderBoardInfo as BoardInfo, LeaderBoardUI } from "./LeaderBoardUI";
import { PlayerData } from "./PlayerData";
import { ScoreBoardUI } from "./ScoreBoardUI";


export class BoardModuleC extends ModuleC<BoardModuleS,null> {
	onStart(): void {
		Events.addServerListener("curTime",()=>{
			if(UI.instance.getPanel(GameUI).mScoreBoard.getVisibility()==MWGameUI.ESlateVisibility.SelfHitTestInvisible)
				this.updateScoreBoard();
		});
	}

	public async showLeaderBoard(){
		//等待数据获取完成后再显示排行榜
		let playerInfos =await this.server.net_GetLeaderBoardData() as BoardInfo[];
		UI.instance.showPanel(LeaderBoardUI);
		UI.instance.getPanel(LeaderBoardUI).updateLeaderBoard(playerInfos);
	}

	public async updateScoreBoard(){
		let playerInfos = await this.server.net_GetScoreBoardData() as BoardInfo[];
		UI.instance.getPanel(GameUI).updateScoreBoard(playerInfos);
	}


}
