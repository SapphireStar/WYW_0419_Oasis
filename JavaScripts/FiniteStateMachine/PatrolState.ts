import { Vector } from "ue";
import { BaseState } from "./BaseState";

export class PatrolState extends BaseState {

	timer: number = 0;
	wayPoints: MWCore.GameObject[];
	curWayPointIndex: number = 0;

	public constructor(npc: GamePlay.Humanoid) {
		super(npc);
	}

	public setWayPoint(index:number){
		this.curWayPointIndex = index;
	}

	public override enterState() {
		this.wayPoints = MWCore.GameObject.getGameObjectsByName("WayPoint");
		this.npc.enableCollision = true;
		this.npc.ragdoll(false);
	}

	public Update(dt: number) {
		if(this.timer<=0){
			if(this.curWayPointIndex>=this.wayPoints.length){
				this.curWayPointIndex = this.curWayPointIndex%this.wayPoints.length;
			}
			GamePlay.moveTo(this.npc, this.wayPoints[this.curWayPointIndex].location, 50);
		}
		else{
			this.timer-=dt;
		}

		if(Vector.Dist(new Vector(this.npc.location.x,this.npc.location.y,this.npc.location.z),new Vector(this.wayPoints[this.curWayPointIndex].location.x,this.wayPoints[this.curWayPointIndex].location.y,this.wayPoints[this.curWayPointIndex].location.z))<100){
			this.timer = 1;
			this.wayPoints = MWCore.GameObject.getGameObjectsByName("WayPoint");
			this.curWayPointIndex=(this.curWayPointIndex+1)%this.wayPoints.length;
		}

	}



}
