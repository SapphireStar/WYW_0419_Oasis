import { DataInfo, ModuleData } from "odin";

class PlayerDataInfo extends DataInfo{
	hp:number;
	canFly:boolean;
	flyCD:number;
	canInvisible:boolean;
	invisibleCD:number;
	deathCountDown:number;
}

export class PlayerData extends ModuleData<PlayerDataInfo> {
	public constructor(){
		super(PlayerDataInfo);
	}

	protected override initDefaultData(): void {
		this.dataInfo.hp = 100;
		this.dataInfo.flyCD = 0;
		this.dataInfo.invisibleCD = 0;
	}

	protected onDataInit(): void {
		this.dataInfo.hp = 100;
		this.dataInfo.flyCD = 0;
		this.dataInfo.invisibleCD = 0;
		this.dataInfo.canFly = false;
		this.dataInfo.canInvisible = false;
	}

	//血量数据逻辑
	public minusHp(damage:number){
		this.dataInfo.hp-=damage;
	}

	public initHp(){
		this.dataInfo.hp = 100;
	}


	//飞行数据逻辑
	public setCanFly(value:boolean){
		this.dataInfo.canFly = value;
	}

	public startFlyCD(){
		this.dataInfo.flyCD = 10;
	}

	public minusFlyCD(){
		this.dataInfo.flyCD--;
	}

	//隐身数据逻辑
	public setCanInvisible(value:boolean){
		this.dataInfo.canInvisible = value;
	}

	public startInvisibleCD(){
		this.dataInfo.invisibleCD = 10;
	}

	public minusInvisibleCD(){
		this.dataInfo.invisibleCD--;
	}

	//死亡数据逻辑
	public startDeathCount(){
		this.dataInfo.deathCountDown = 5;
	}

	public minusDeathCount(){
		this.dataInfo.deathCountDown--;
	}


	public get hp(){
		return this.dataInfo.hp;
	}

	public get deathCountDown(){
		return this.dataInfo.deathCountDown;
	}

	public get canFly(){
		return this.dataInfo.canFly;
	}

	public get flyCD(){
		return this.dataInfo.flyCD;
	}

	public get canInvisible(){
		return this.dataInfo.canInvisible;
	}

	public get invisibleCD(){
		return this.dataInfo.invisibleCD;
	}



}
