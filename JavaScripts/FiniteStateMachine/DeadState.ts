/*
 * @Author: Tianyi
 * @Date: 2022-08-15 11:58:57
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:29:51
 * @FilePath: \WYW_0419_Oasis\JavaScripts\FiniteStateMachine\DeadState.ts
 * @Description: 
 * 
 */
import { BaseState } from "./BaseState";

export class DeadState extends BaseState {

	public enterState() {
		this.npc.ragdoll(true);
	}

	public Update(dt: number) {
		
	}

}
