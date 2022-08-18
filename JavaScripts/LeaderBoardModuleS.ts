import { DataCenterS, ModuleManager, ModuleS } from "odin";
import { CoinData } from "./CoinData";
import { LeaderBoardModuleC } from "./LeaderBoardModuleC";
import { LeaderBoardInfo } from "./LeaderBoardUI";
import { PlayerData } from "./PlayerData";



export class LeaderBoardModuleS extends ModuleS<LeaderBoardModuleC,null> {

	public async net_GetData(){
		let players = GamePlay.getAllPlayers();
		let playerInfos = [];
		for(let i = 0;i<players.length;i++){
			let playerInfo = new LeaderBoardInfo();

			let playerData = DataCenterS.instance.getModuleData(players[i],PlayerData);
			playerInfo.name = playerData.name;
			playerInfo.kill = playerData.kill;
			playerInfo.death = playerData.death;
			playerInfo.gold = DataCenterS.instance.getModuleData(players[i],CoinData).count;
			console.log("gold num:"+playerInfo.gold);
			playerInfos.push(playerInfo);
		}
		await this.sort(playerInfos);
		return playerInfos;
	}

	sort(playerInfos:LeaderBoardInfo[]){
		for(let i = 0;i<playerInfos.length-1;i++){
			for(let j = 0;j<playerInfos.length-1-i;j++){
				if(playerInfos[j].kill<playerInfos[j+1].kill){
					let temp = playerInfos[j];
					playerInfos[j]=playerInfos[j+1];
					playerInfos[j+1]=temp;
				}
			}
		}
	}

}
