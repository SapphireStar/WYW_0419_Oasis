/*
 * @Author: Tianyi
 * @Date: 2022-08-15 16:30:01
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:38:26
 * @FilePath: \WYW_0419_Oasis\JavaScripts\PlayerModuleS.ts
 * @Description: 接收客户端的倒计时信息，修改玩家的模块数据。接收来自UI的技能使用请求，若CD冷却完成，则允许使用技能
 * 
 */
import { DataCenterS, ModuleS, UI } from "odin";
import { PlayerModuleC } from "./PlayerModuleC";
import { PlayerData } from "./PlayerData";
import { GameControlData } from "./GameControlData";

export class PlayerModuleS extends ModuleS<PlayerModuleC,PlayerData> {
	onStart(): void {
		
	}

	execute(param?: number, data?: any): void {
		//重置模块数据
		this.currentData.initAllData();
		this.currentPlayer.character.switchToWalking();
		this.currentPlayer.character.isVisible = true;
		this.currentData.saveData(true);

		//所有玩家回到初生点
		this.currentPlayer.character.location = this.currentData.spawnPoint;
		
	}

	public net_SetSpawnPoint(pos:Type.Vector){
		this.currentData.setSpawnPoint(pos);
	}

	public net_SetName(){
		this.currentData.setName(this.currentPlayer.character.name);
		this.currentData.saveData(true);
	}

	public net_PlayerDead(){
		this.currentPlayer.character.ragdoll(true);
		this.currentData.startDeathCount();
		this.currentData.initHp();
		this.currentData.addDeath();
		this.currentData.saveData(true);
	}

	public net_PlayerRecover(){
		this.currentData.initHp();
		this.currentData.saveData(true);
		this.currentPlayer.character.ragdoll(false);
		let startPoints = MWCore.GameObject.getGameObjectsByName("StartPoint");

		//若游戏还在进行，就随机一个初生点复活
		if(DataCenterS.instance.getModuleData(this.currentPlayer,GameControlData).isGameStart)
			this.currentPlayer.character.setLocationAndRotation(startPoints[Math.floor(Math.random()*startPoints.length)].location,this.currentPlayer.character.rotation);
		
	}

	public net_DeathCount(){
		this.currentData.minusDeathCount();
		this.currentData.saveData(true);
	}

	
	public net_PlayerFly(){
		if(this.currentData.flyCD<=0){
			this.currentData.startFlyCD();
			this.currentPlayer.character.switchToFlying();
			this.currentData.saveData(true);
		}
	}

	public net_PlayerFlyCount(){
		this.currentData.minusFlyCD();
		this.currentData.saveData(true);
		if(this.currentData.flyCD == 3)
			this.currentPlayer.character.switchToWalking();
	}

	public net_PlayerInvisible(){
		if(this.currentData.invisibleCD<=0){
			this.currentData.startInvisibleCD();
			this.currentPlayer.character.isVisible = false;
			this.currentData.saveData(true);
		}
	}

	public net_PlayerInvisibleCount(){
		this.currentData.minusInvisibleCD();
		this.currentData.saveData(true);
		if(this.currentData.invisibleCD==6)
			this.currentPlayer.character.isVisible = true;
	}




}
