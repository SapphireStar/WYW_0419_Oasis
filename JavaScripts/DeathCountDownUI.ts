import { DataCenterC } from "odin";
import { PlayerData } from "./PlayerData";
import { UI_DeadUI } from "./UITemplate";

export class DeathCountDownUI extends UI_DeadUI {

	public override onStart(){
		//监听死亡倒计时的事件
		DataCenterC.instance.getModuleData(PlayerData).onDataChange.add(()=>{
			this.mDeathCountDown.setText(DataCenterC.instance.getModuleData(PlayerData).deathCountDown.toString());
		});
	}

	public override onDestroy(){
		DataCenterC.instance.getModuleData(PlayerData).onDataChange.clear();
	}
}
