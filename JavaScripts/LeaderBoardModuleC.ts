/*
 * @Author: Tianyi
 * @Date: 2022-08-17 16:27:33
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:52:24
 * @FilePath: \WYW_0419_Oasis\JavaScripts\LeaderBoardModuleC.ts
 * @Description: 排行榜模块客户端，负责接收来自游戏控制模块的请求，向服务端模块请求所有玩家的数据，并显示排行榜UI
 * 
 */
import { ModuleC, UI } from "odin";
import { LeaderBoardModuleS } from "./LeaderBoardModuleS";
import { LeaderBoardInfo, LeaderBoardUI } from "./LeaderBoardUI";


export class LeaderBoardModuleC extends ModuleC<LeaderBoardModuleS,null> {

	public async showLeaderBoard(){
		//等待数据获取完成后再显示排行榜
		let playerInfos =await this.server.net_GetData() as LeaderBoardInfo[];
		UI.instance.showPanel(LeaderBoardUI);
		UI.instance.getPanel(LeaderBoardUI).updateLeaderBoard(playerInfos);
	}


}
