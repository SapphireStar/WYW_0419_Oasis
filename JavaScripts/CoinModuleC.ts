/*
 * @Author: Tianyi
 * @Date: 2022-08-15 14:57:43
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:41:39
 * @FilePath: \WYW_0419_Oasis\JavaScripts\CoinModuleC.ts
 * @Description: 金币模块客户端，获取所有的金币对象，并添加玩家进入事件，玩家获取金币后调用服务器方法增加金币数。游戏重置后，重置所有金币
 * 
 */
import { ModuleC } from "odin";
import { CoinData } from "./CoinData";
import { CoinModuleS } from "./CoinModuleS";

export class CoinModuleC extends ModuleC<CoinModuleS,CoinData> {
	
	coins:MWCore.GameObject[];
	_coinRotation:Type.Rotation = new Type.Rotation(0,0,0);
	override onAwake(): void {
		
		this.coins = [];
	}

	override onStart(): void {
		this.coins = MWCore.GameObject.getGameObjectsByName("Coin");
		this.server.net_SetTotalCoin(this.coins.length);
		this.coins.forEach((coin)=>{
			const trigger = coin.getChildByName("BoxTrigger") as GamePlay.BoxTrigger;
			trigger.onEnter.Add((gameobject:MWCore.GameObject)=>{
				if(GamePlay.isCharacter(gameobject)){
					const playerID = (gameobject as GamePlay.Character).player.getPlayerID();
					if(playerID == this.currentPlayerId){
						const coinIndex = this.coins.indexOf(coin);
						this.server.net_Eat(gameobject.location);
						coin.getChildByName("model").setVisibility(Type.PropertyStatus.Off);
						trigger.setCollisionEnabled(false);
						
					}
				}
			});
		});
	}

	execute(type?: number, param?: any): void {
		this.coins.forEach((coin)=>{
			coin.getChildByName("model").setVisibility(Type.PropertyStatus.On);
			(coin.getChildByName("BoxTrigger") as GamePlay.BoxTrigger).setCollisionEnabled(true);
		});
	}

	override onUpdate(dt: number): void {
		this._coinRotation.z+=dt*100;
		this.coins.forEach((coin)=>{
			coin.rotation = this._coinRotation;
		});
	}


}
