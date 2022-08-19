/*
 * @Author: Tianyi
 * @Date: 2022-08-17 10:36:51
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:56:33
 * @FilePath: \WYW_0419_Oasis\JavaScripts\LeaderBoardUI.ts
 * @Description: 排行榜UI，接收来自排行榜模块客户端的数据，更新UI
 * 
 */
import { ModuleManager, UI } from "odin";
import { GameControlModuleC } from "./GameControlModuleC";
import { StartGameUI } from "./StartGameUI";
import { UI_LeaderBoardUI } from "./UITemplate";


/**
 * @description: 排行榜UI信息类，方便更新UI信息
 */
export class LeaderBoardInfo{
	name:string;
	kill:number;
	death:number;
	gold:number;
	
}

export class LeaderBoardUI extends UI_LeaderBoardUI  {
	selfLists:MWGameUI.MWUIWidget[];
	onStart(){
		if(GamePlay.isClient()){
			this.mClose_btn.onClicked().add(()=>{
				//初始化游戏，重新开始
				UI.instance.hidePanel(LeaderBoardUI);
				UI.instance.showPanel(StartGameUI);
			});
		}


	}
	

	public updateLeaderBoard(playerInfos:LeaderBoardInfo[]){
		for(let i =0;i<playerInfos.length;i++){
			let subUI = this.mSelfList.getChildByName("mRank"+(i+1).toString()) as MWGameUI.MWUICanvas;
			subUI.setVisibility(MWGameUI.ESlateVisibility.Visible);
			(subUI.getChildByName("Rank") as MWGameUI.MWUITextblock).setText(i.toString());
			(subUI.getChildByName("Name") as MWGameUI.MWUITextblock).setText(playerInfos[i].name);
			(subUI.getChildByName("Kill") as MWGameUI.MWUITextblock).setText(playerInfos[i].kill.toString());
			(subUI.getChildByName("Death") as MWGameUI.MWUITextblock).setText(playerInfos[i].death.toString());
			(subUI.getChildByName("Gold") as MWGameUI.MWUITextblock).setText(playerInfos[i].gold.toString());
		}
	}
}
