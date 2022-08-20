/*
 * @Author: Tianyi
 * @Date: 2022-08-15 16:29:54
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-20 15:54:51
 * @FilePath: \WYW_0419_Oasis\JavaScripts\PlayerModuleC.ts
 * @Description: 客户端玩家模块负责检查玩家是否出界，判断玩家的死亡情况，并且负责技能CD和死亡的倒计时逻辑
 * 
 */
import { DataCenterC, ModuleC, UI } from "odin";
import { DeathCountDownUI } from "./DeathCountDownUI";
import GameControl from "./GameControl";
import { GameControlData } from "./GameControlData";
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
        this.server.net_SetName();

        //让服务器记录初始初生点
        //this.server.net_SetSpawnPoint(this.currentPlayer.character.location);
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

            //由于发现如果在按住摇杆的情况下，hidepanel后再showpanel，会出现摇杆卡住的情况，所以通过设置透明度解决
            //UI.instance.hidePanel(GameUI);
            UI.instance.getPanel(GameUI).canvas.setRenderOpacity(0);
            UI.instance.getPanel(GameUI).mFireJoyStick.setActiveOpacity(0);
            UI.instance.getPanel(GameUI).mFireJoyStick.setInActiveOpacity(0);
            UI.instance.showPanel(DeathCountDownUI);
        }
    }

    checkIsDead() {
        if (this.playerData.hp <= 0 && (!this.isDead)) {
            this.isDead = true;
            this.server.net_PlayerDead();
            
            //由于发现如果在按住摇杆的情况下，hidepanel后再showpanel，会出现摇杆卡住的情况，所以通过设置透明度解决
            //UI.instance.hidePanel(GameUI);
            UI.instance.getPanel(GameUI).canvas.setRenderOpacity(0);
            UI.instance.getPanel(GameUI).mFireJoyStick.setActiveOpacity(0);
            UI.instance.getPanel(GameUI).mFireJoyStick.setInActiveOpacity(0);

            //若玩家选择游戏开始，则显示死亡UI
            if(DataCenterC.instance.getModuleData(GameControlData).isGameStart){
                UI.instance.showPanel(DeathCountDownUI);
            }

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
                    UI.instance.hidePanel(DeathCountDownUI);

                    //检查游戏时间，若游戏未结束，则继续显示游戏UI
                    if(DataCenterC.instance.getModuleData(GameControlData).curTime>0&&DataCenterC.instance.getModuleData(GameControlData).isGameStart){
                        //由于发现如果在按住摇杆的情况下，hidepanel后再showpanel，会出现摇杆卡住的情况，所以通过设置透明度解决
                        //UI.instance.showPanel(GameUI);  
                        UI.instance.getPanel(GameUI).canvas.setRenderOpacity(1);
                        UI.instance.getPanel(GameUI).mFireJoyStick.setActiveOpacity(1);
                        UI.instance.getPanel(GameUI).mFireJoyStick.setInActiveOpacity(0.2);
                    }

                }
            }

        }
    }

    public jump(){
        this.currentPlayer.character.jump();
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
