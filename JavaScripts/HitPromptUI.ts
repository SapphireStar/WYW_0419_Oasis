/*
 * @Author: Tianyi
 * @Date: 2022-08-16 10:08:17
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 15:21:58
 * @FilePath: \WYW_0419_Oasis\JavaScripts\HitPromptUI.ts
 * @Description: 受击提示UI，由受击提示模块客户端负责更新
 * 
 */
import { UI_GameUI, UI_HitPromptUI } from "./UITemplate";

export default class HitPromptUI extends UI_HitPromptUI {
	//用于存放所有的受击提示图标
	promptArr:MWGameUI.MWUIImage[] = [];
	public override onStart(){
		if(GamePlay.isClient()){
			this.promptArr.push(this.mUp);
			this.promptArr.push(this.mUpRight);
			this.promptArr.push(this.mRight);
			this.promptArr.push(this.mLowRight);
			this.promptArr.push(this.mLow);
			this.promptArr.push(this.mLowLeft);
			this.promptArr.push(this.mLeft);
			this.promptArr.push(this.mUpLeft);
		}

	}

	public updatePrompt(dirArr:number[]){
		if(GamePlay.isClient()){
			for(let i = 0;i<dirArr.length;i++){
				if(dirArr[i]>0){
					this.promptArr[i].setVisibility(MWGameUI.ESlateVisibility.SelfHitTestInvisible);
					this.promptArr[i].setRenderOpacity(dirArr[i]);
				}
				else{
					this.promptArr[i].setVisibility(MWGameUI.ESlateVisibility.Hidden);
	
				}
			}
		}
	}

}
