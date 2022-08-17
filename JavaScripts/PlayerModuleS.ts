import { ModuleS, UI } from "odin";
import { PlayerModuleC } from "./PlayerModuleC";
import { PlayerData } from "./PlayerData";

export class PlayerModuleS extends ModuleS<PlayerModuleC,PlayerData> {
	onStart(): void {
		
	}

	public net_PlayerDead(){
		this.currentPlayer.character.ragdoll(true);
		this.currentData.startDeathCount();
		this.currentData.initHp();
		this.currentData.saveData(true);
	}

	public net_PlayerRecover(){
		this.currentData.initHp();
		this.currentData.saveData(true);
		this.currentPlayer.character.ragdoll(false);
		let startPoints = MWCore.GameObject.getGameObjectsByName("StartPoint");
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
