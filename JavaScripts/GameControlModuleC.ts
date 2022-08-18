import { ModuleC, ModuleManager, UI } from "odin";
import { GameControlData } from "./GameControlData";
import {GameControlModuleS} from "./GameControlModuleS";
import GameUI from "./GameUI";
import { LeaderBoardModuleC } from "./LeaderBoardModuleC";
import { LeaderBoardInfo, LeaderBoardUI } from "./LeaderBoardUI";
import { StartGameUI } from "./StartGameUI";

export class GameControlModuleC extends ModuleC<GameControlModuleS,GameControlData> {

	execute(type?: number, param?: any): void {

	}

	onStart(): void {
		UI.instance.showPanel(StartGameUI);
		//监听mono类GameControl的当前时间
		Events.addServerListener("curTime",(curTime:number)=>{
			this.server.net_UpdateTime(curTime);
		});

		//监听mono类GameControl的停止游戏事件
		Events.addServerListener("stopGame",()=>{
			this.StopGame();
		});
	}

	public StartGame(){
		UI.instance.hidePanel(StartGameUI);
		UI.instance.showPanel(GameUI);
		this.server.net_StartGame();
	}

	public async StopGame(){
		UI.instance.hidePanel(GameUI);
		//展示结算界面
		await ModuleManager.instance.getModule(LeaderBoardModuleC).showLeaderBoard();

		//等待排行榜加载完成后重置游戏和数据
		this.InitGame();
	}

	public InitGame(){
		//对所有客户端和服务端的模块执行初始化
		ModuleManager.instance.forEachModule((module)=>{
			module.execute();
		});
		this.server.net_InitGame();
	}

}
