import { ModuleManager } from "odin";
import { GameControlModuleC } from "./GameControlModuleC";
import { UI_StartGameUI } from "./UITemplate";

export class StartGameUI extends UI_StartGameUI {

	override onStart(){
		this.mStartGameButton.onClicked().add(()=>{
			ModuleManager.instance.getModule(GameControlModuleC).StartGame();
		});
	}

}
