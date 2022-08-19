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
		//进入巡逻状态后，随机当前目标点
		this.curWayPointIndex = Math.floor(Math.random()*this.wayPoints.length);
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
		
		if(this.posDist(this.npc.location,this.wayPoints[this.curWayPointIndex].location)<100){
			this.timer = 1;
			this.wayPoints = MWCore.GameObject.getGameObjectsByName("WayPoint");
			this.curWayPointIndex=(this.curWayPointIndex+1)%this.wayPoints.length;
		}

	}

	public posDist(pos1:Type.Vector,pos2:Type.Vector){
		return Math.sqrt(Math.pow(pos1.x-pos2.x,2)+Math.pow(pos1.y-pos2.y,2)+Math.pow(pos1.z-pos2.z,2));
	}



}
