import { ModuleS, UI } from "odin";
import { GameControlData } from "./GameControlData";
import { GameControlModuleC } from "./GameControlModuleC";
import { StartGameUI } from "./StartGameUI";

export class GameControlModuleS extends ModuleS<GameControlModuleC,GameControlData> {
	onStart(): void {
		UI.instance.showPanel(StartGameUI);
	}

	execute(param?: number, data?: any): void {
		UI.instance.showPanel(StartGameUI);
	}

	public net_StartGame(){
		Events.dispatchLocal("startGame");
	}

	public net_UpdateTime(curTime:number){
		this.currentData.setCurTime(curTime);
		this.currentData.saveData(true);
	}

}
