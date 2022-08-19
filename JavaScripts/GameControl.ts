/*
 * @Author: Tianyi
 * @Date: 2022-08-16 19:35:06
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:43:12
 * @FilePath: \WYW_0419_Oasis\JavaScripts\GameControl.ts
 * @Description: GameContro mono类，负责游戏的倒计时功能，倒计时结束发送游戏结束消息
 * 
 */
import { DataCenterS, ModuleManager, UI } from "odin";
import { GameControlData } from "./GameControlData";
import { PlayerData } from "./PlayerData";
import { PlayerModuleS } from "./PlayerModuleS";

@MWCore.MWClass
export default class GameControl extends MWCore.MWScript {
	//最大游戏时间
	@MWCore.MWProperty()
	public MaxGameTime:number = 5;

	//当前游戏时间
	curTime:number;

	//计时器
	timer:number = 0;

	//游戏是否开始
	isGameStart:boolean;

	protected onStart(): void {
		if(GamePlay.isServer()){
			this.bUseUpdate = true;
			//监听开始游戏事件，开始计时
			Events.addLocalListener("startGame",()=>{
				if(!this.isGameStart){
					this.curTime = this.MaxGameTime;
					this.isGameStart = true;
				}
			});


		}
	}

	protected onUpdate(dt: number): void {
		if(this.isGameStart){
			if(this.timer<1){
				this.timer+=dt;
			}
			else{
				this.timer=0;
				this.curTime--;
				Events.dispatchToAllClient("curTime",this.curTime);
				if(this.curTime<=0){
					this.isGameStart = false;
					Events.dispatchToAllClient("stopGame");
				}
			}
		}
	}

	protected onDestroy(): void {

	}

}
