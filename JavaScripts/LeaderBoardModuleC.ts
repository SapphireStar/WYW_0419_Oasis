import { ModuleC, UI } from "odin";
import { LeaderBoardModuleS } from "./LeaderBoardModuleS";
import { LeaderBoardInfo, LeaderBoardUI } from "./LeaderBoardUI";


export class LeaderBoardModuleC extends ModuleC<LeaderBoardModuleS,null> {

	public async showLeaderBoard(){
		//等待数据获取完成后再显示排行榜
		let playerInfos =await this.server.net_GetData() as LeaderBoardInfo[];
		UI.instance.showPanel(LeaderBoardUI);
		UI.instance.getPanel(LeaderBoardUI).updateLeaderBoard(playerInfos);
	}


}
