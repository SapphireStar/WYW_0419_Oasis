import { ModuleC } from "odin";
import { CoinData } from "./CoinData";
import { CoinModuleS } from "./CoinModuleS";

export class CoinModuleC extends ModuleC<CoinModuleS,CoinData> {
	
	coins:MWCore.GameObject[];
	//coinGuids:string[] = ["E9C6AEC54EDB12FE32BC6FB9EDAB3CE3EBFC3A2F48CF75EDB5D23880AA7C5C52","E9C6AEC54EDB12FE32BC6FB9EDAB3CE37E1E48FB439768CB10D07FA1E96252C5","E9C6AEC54EDB12FE32BC6FB9EDAB3CE3C663CC024506B2729E81AE8146967CE9"];
	_coinRotation:Type.Rotation = new Type.Rotation(0,0,0);
	override onAwake(): void {
		
		this.coins = [];
	}
	override onStart(): void {
		this.coins = MWCore.GameObject.getGameObjectsByName("Coin");
		this.coins.forEach((coin)=>{
			const trigger = coin.getChildByName("BoxTrigger") as GamePlay.BoxTrigger;
			trigger.onEnter.Add((gameobject:MWCore.GameObject)=>{
				if(GamePlay.isCharacter(gameobject)){
					const playerID = (gameobject as GamePlay.Character).player.getPlayerID();
					if(playerID == this.currentPlayerId){
						const coinIndex = this.coins.indexOf(coin);
						this.server.net_Eat(gameobject.location);
						this.coins.splice(coinIndex,1);
						coin.destroy();
					}
				}
			});
		});
	}

	override onUpdate(dt: number): void {
		this._coinRotation.z+=dt*100;
		this.coins.forEach((coin)=>{
			coin.rotation = this._coinRotation;
		});
	}


}
