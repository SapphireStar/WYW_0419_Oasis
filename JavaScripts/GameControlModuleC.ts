import { ModuleC, UI } from "odin";
import { GameControlData } from "./GameControlData";
import {GameControlModuleS} from "./GameControlModuleS";
import GameUI from "./GameUI";
import { StartGameUI } from "./StartGameUI";

export class GameControlModuleC extends ModuleC<GameControlModuleS,GameControlData> {

	execute(type?: number, param?: any): void {
		//初始化时显示开始游戏UI
		UI.instance.showPanel(StartGameUI);
	}

	onStart(): void {
		UI.instance.showPanel(StartGameUI);
		//监听mono类GameControl的当前时间
		Events.addServerListener("curTime",(curTime:number)=>{
			this.server.net_UpdateTime(curTime);
		});
	}

	public StartGame(){
		UI.instance.hidePanel(StartGameUI);
		UI.instance.showPanel(GameUI);
		this.server.net_StartGame();
	}

}
