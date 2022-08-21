/*
 * @Author: Tianyi
 * @Date: 2022-08-17 16:27:41
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-21 09:30:06
 * @FilePath: \WYW_0419_Oasis\JavaScripts\LeaderBoardModuleS.ts
 * @Description: 排行榜模块服务端，接收来自客户端的数据请求，获取所有玩家数据后进行排序，再发送给客户端
 * 
 */
import { DataCenterS, ModuleManager, ModuleS } from "odin";
import { CoinData } from "./CoinData";
import { BoardModuleC } from "./LeaderBoardModuleC";
import { LeaderBoardInfo } from "./LeaderBoardUI";
import { PlayerData } from "./PlayerData";



export class LeaderBoardModuleS extends ModuleS<BoardModuleC,null> {
	
	//返回排行榜数据
	public async net_GetLeaderBoardData(){
		let players = GamePlay.getAllPlayers();
		let playerInfos = [];
		for(let i = 0;i<players.length;i++){
			let playerInfo = new LeaderBoardInfo();

			let playerData = DataCenterS.instance.getModuleData(players[i],PlayerData);
			playerInfo.name = playerData.name;
			playerInfo.kill = playerData.kill;
			playerInfo.death = playerData.death;
			playerInfo.gold = DataCenterS.instance.getModuleData(players[i],CoinData).count;
			playerInfos.push(playerInfo);
		}
		await this.sortLeaderBoardData(playerInfos);
		return playerInfos;
	}

	sortLeaderBoardData(playerInfos:LeaderBoardInfo[]){
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

	//返回积分榜数据
	public async net_GetScoreBoardData(){
		let players = GamePlay.getAllPlayers();
		let playerInfos = [];
		for(let i = 0;i<players.length;i++){
			let playerInfo = new LeaderBoardInfo();
			playerInfo.name = players[i].character.characterName;
			playerInfo.gold = DataCenterS.instance.getModuleData(players[i],CoinData).count;
			playerInfos.push(playerInfo);
		}
		await this.sortScoreBoardData(playerInfos);
		return playerInfos;
	}

	sortScoreBoardData(playerInfos:LeaderBoardInfo[]){
		for(let i = 0;i<playerInfos.length-1;i++){
			for(let j = 0;j<playerInfos.length-1-i;j++){
				if(playerInfos[j].gold<playerInfos[j+1].gold){
					let temp = playerInfos[j];
					playerInfos[j]=playerInfos[j+1];
					playerInfos[j+1]=temp;
				}
			}
		}
	}

}
