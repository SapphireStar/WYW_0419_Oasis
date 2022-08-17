import { DataCenterC, ModuleC, UI } from "odin";
import { DeathCountDownUI } from "./DeathCountDownUI";
import GameUI from "./GameUI";
import { PlayerData } from "./PlayerData";
import { PlayerModuleS } from "./PlayerModuleS";

export class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerData> {
    playerData: PlayerData;

    isDead: boolean = false;
    deadTimer: number = 0;

    flyTimer: number = 0;

    invisibleTimer:number = 0;

    public override onStart(): void {
        this.playerData = DataCenterC.instance.getModuleData(PlayerData);
    }

    public override onUpdate(dt: number): void {
        this.checkIsDead();
        this.deathCountDown(dt);
        this.flyCountDown(dt);
        this.invisibleCountDown(dt);
        this.checkOutOfMap();
    }

    checkOutOfMap(){
        if((!this.isDead)&&(this.currentPlayer.character.location.z<-1000||this.currentPlayer.character.location.y<-6000||this.currentPlayer.character.location.x>6800||this.currentPlayer.character.location.y>7800||this.currentPlayer.character.location.x<-11000)){
            this.isDead = true;
            this.server.net_PlayerDead();
            UI.instance.hidePanel(GameUI);
            UI.instance.showPanel(DeathCountDownUI);
        }
    }

    checkIsDead() {
        if (this.playerData.hp <= 0 && (!this.isDead)) {
            this.isDead = true;
            this.server.net_PlayerDead();
            UI.instance.hidePanel(GameUI);
            UI.instance.showPanel(DeathCountDownUI);

        }
    }

    deathCountDown(dt: number) {
        if (this.isDead) {
            if (this.deadTimer < 1) {
                this.deadTimer += dt;
            }
            else {
                this.deadTimer = 0;
                this.server.net_DeathCount();
                if (this.playerData.deathCountDown <= 0) {
                    setTimeout(() => {
                        this.isDead = false;
                    }, 500);
                    this.server.net_PlayerRecover();
                    UI.instance.showPanel(GameUI);
                    UI.instance.hidePanel(DeathCountDownUI);
                }
            }

        }
    }

    public startFly() {
        this.server.net_PlayerFly();
    }

    public startInvisible(){
        this.server.net_PlayerInvisible();
    }

    flyCountDown(dt: number) {
        if (this.playerData.flyCD > 0) {
            if (this.flyTimer < 1) {
                this.flyTimer += dt;
            }
            else {
                this.flyTimer = 0;
                this.server.net_PlayerFlyCount();
            }
        }

    }

    invisibleCountDown(dt:number){
        if(this.playerData.invisibleCD>0){
            if(this.invisibleTimer<1){
                this.invisibleTimer+=dt;
            }
            else{
                this.invisibleTimer=0;
                this.server.net_PlayerInvisibleCount();
            }
        }
    }

}
