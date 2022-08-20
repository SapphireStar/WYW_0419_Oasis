/*
 * @Author: Tianyi
 * @Date: 2022-08-20 10:27:36
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-20 10:31:00
 * @FilePath: \WYW_0419_Oasis\JavaScripts\ScoreBoardUI.ts
 * @Description: 
 * 
 */
import { LeaderBoardInfo } from "./LeaderBoardUI";
import { UI_ScoreBoardUI } from "./UITemplate";

export  class ScoreBoardUI extends UI_ScoreBoardUI {

	public updateScoreBoard(playerInfos:LeaderBoardInfo[]){
		for(let i =0;i<playerInfos.length;i++){
			let subUI = this.mSelfList.getChildByName("mRank"+(i+1).toString()) as MWGameUI.MWUICanvas;
			subUI.setVisibility(MWGameUI.ESlateVisibility.Visible);
			(subUI.getChildByName("Rank") as MWGameUI.MWUITextblock).setText((i+1).toString());
			(subUI.getChildByName("Name") as MWGameUI.MWUITextblock).setText(playerInfos[i].name);
			(subUI.getChildByName("Gold") as MWGameUI.MWUITextblock).setText(playerInfos[i].gold.toString());
		}
		for(let i = playerInfos.length;i<6;i++){
			let subUI = this.mSelfList.getChildByName("mRank"+(i+1).toString()) as MWGameUI.MWUICanvas;
			subUI.setVisibility(MWGameUI.ESlateVisibility.Hidden);
		}
	}

}
