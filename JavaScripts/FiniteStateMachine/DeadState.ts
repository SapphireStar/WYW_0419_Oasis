import { BaseState } from "./BaseState";

export class DeadState extends BaseState {

	public enterState() {
		this.npc.enableCollision = false;
		this.npc.ragdoll(true);
	}

	public Update(dt: number) {
		
	}

}
