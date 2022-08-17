import { DataCenterC, ModuleData, ModuleManager } from "odin";
import { CoinData } from "./CoinData";
import { GameControlData } from "./GameControlData";
import { PlayerData } from "./PlayerData";
import { PlayerModuleC } from "./PlayerModuleC";
import { UI_GameUI } from "./UITemplate";
import { WeaponModuleC } from "./WeaponModuleC";

@MWGameUI.MWUIMono
export default class GameUI extends UI_GameUI {
	/** 仅在游戏时间对非模板实例调用一次 */
	public override onStart() {
		if (GamePlay.isClient()) {
			//绑定金币数量UI
			let coinData = DataCenterC.instance.getModuleData(CoinData);
			this.mCoinCount.setText(coinData.count.toString());
			coinData.onDataChange.add(()=>{
				this.mCoinCount.setText(coinData.count.toString());
			})


			//绑定开火UI
			this.mFireJoyStick.onJoyStickDown().add(() => {
				ModuleManager.instance.getModule(WeaponModuleC).startShoot();
			});
			this.mFireJoyStick.onJoyStickUp().add(() => {
				ModuleManager.instance.getModule(WeaponModuleC).stopShoot();
			});


			//绑定飞行UI
			let playerData = DataCenterC.instance.getModuleData(PlayerData);
			playerData.onDataChange.add(()=>{
				if(playerData.canFly){
					this.mFlyButton.setVisibility(MWGameUI.ESlateVisibility.Visible);
					this.mFlyCountDown.setVisibility(MWGameUI.ESlateVisibility.Visible);
					if(playerData.flyCD>0){
						this.mFlyCountDown.setText(playerData.flyCD.toString());
					}
					else{
						this.mFlyCountDown.setText("飞行");
					}
				}
				else{
					this.mFlyButton.setVisibility(MWGameUI.ESlateVisibility.Hidden);
					this.mFlyCountDown.setVisibility(MWGameUI.ESlateVisibility.Hidden);
				}
			});
			
			this.mFlyButton.onReleased().add(() => {
				ModuleManager.instance.getModule(PlayerModuleC).startFly();
			});


			//绑定隐身UI
			playerData.onDataChange.add(()=>{
				if(playerData.canInvisible){
					this.mInvisibleButton.setVisibility(MWGameUI.ESlateVisibility.Visible);
					this.mInvisibleCountDown.setVisibility(MWGameUI.ESlateVisibility.Visible);
					if(playerData.invisibleCD>0){
						this.mInvisibleCountDown.setText(playerData.invisibleCD.toString());
					}
					else{
						this.mInvisibleCountDown.setText("隐身");
					}
				}
				else{
					this.mInvisibleButton.setVisibility(MWGameUI.ESlateVisibility.Hidden);
					this.mInvisibleCountDown.setVisibility(MWGameUI.ESlateVisibility.Hidden);
				}
			});

			this.mInvisibleButton.onReleased().add(()=>{
					ModuleManager.instance.getModule(PlayerModuleC).startInvisible();
			});


			//监听血量变化事件
			this.mHealthBar.setCurrentValue(playerData.hp);
			playerData.onDataChange.add(()=>{
				this.mHealthBar.setCurrentValue(playerData.hp);
			});

			//监听倒计时变化事件
			DataCenterC.instance.getModuleData(GameControlData).onDataChange.add(()=>{
				this.mCountDown.setText(DataCenterC.instance.getModuleData(GameControlData).curTime.toString());
			});
		}

	}


	/** 对象被销毁时调用 */
	public onDestroy() {
		if(GamePlay.isClient()){
			DataCenterC.instance.getModuleData(CoinData).onDataChange.clear();
			DataCenterC.instance.getModuleData(PlayerData).onDataChange.clear();
			DataCenterC.instance.getModuleData(GameControlData).onDataChange.clear();
		}
	}

	// /** 循环调用，性能较差尽量使用setInterval替代 */
	//public tick(inGeometry: mWGameUI.geometry, inDeltaTime: number) {

	//}

}
