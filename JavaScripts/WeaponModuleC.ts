import { DataCenterC, EffectManager, ModuleC, SoundManager, UI } from "odin";
import GameUI from "./GameUI";
import { PlayerData } from "./PlayerData";
import { WeaponModuleS } from "./WeaponModuleS";

export class WeaponModuleC extends ModuleC<WeaponModuleS, null> {
	//当前是否在射击
	isShoot: boolean = false;

	//射击间隔计时器
	shootTime: number = 0;

	//射击CD
	shootCD: number = 0.2;

	//枪口火焰特效
	fireEffect: GamePlay.EffectSystem;

	//判断当前是否装备热武器
	isEquipWeapon: boolean = false;

	//当前装备的热武器
	weaponObj: MWCore.GameObject = null;

	//当前装备的武器的原位置，用于重置武器
	weaponPos: Type.Vector;
	weaponRot: Type.Rotation;

	public override onStart(): void {
		this.isEquipWeapon = false;
		this.currentPlayer.character.moveFacingDirection = GamePlay.MoveFacingDirection.ControllerDirection;
	}

	execute(type?: number, param?: any): void {
		//停止射击
		this.stopShoot();

		//隐藏准心和开火按钮
		let gameUI = UI.instance.getPanel(GameUI);
		gameUI.mFireJoyStick.setVisibility(MWGameUI.ESlateVisibility.Collapsed);
		gameUI.mCrossHairs.setVisibility(MWGameUI.ESlateVisibility.Hidden);

		//解除装备热武器，并将热武器的位置重置回光圈
		//让服务器重置武器位置信息
		this.server.net_UnEquip(this.weaponObj, this.weaponPos, this.weaponRot);
		this.weaponObj = null;


		//重置角色姿态
		this.currentPlayer.character.animationStance = GamePlay.AnimationStanceType.Empty;
		this.currentPlayer.character.moveFacingDirection = GamePlay.MoveFacingDirection.ControllerDirection;
		this.currentPlayer.character.movementDirection = GamePlay.MovementDirection.ViewDirection;

		//重置角色装备热武器状态
		this.isEquipWeapon = false;

	}

	override onUpdate(dt: number): void {
		if (this.isShoot && this.isEquipWeapon) {
			if (this.shootTime < this.shootCD) {
				this.shootTime += dt;
			}
			else {
				this.shootTime = 0;
				this.checkCollision();

			}
		}

	}

	public pickWeapon(player: GamePlay.Player, weaponObj: MWCore.GameObject, fireEffect: GamePlay.EffectSystem) {
		if (player == this.currentPlayer && (!this.isEquipWeapon)) {
			this.isEquipWeapon = true;
			this.fireEffect = fireEffect;

			//记录原位置
			this.weaponPos = new Type.Vector(weaponObj.location.x, weaponObj.location.y, weaponObj.location.z);
			this.weaponRot = new Type.Rotation(weaponObj.rotation.x, weaponObj.rotation.y, weaponObj.rotation.z);

			//给当前装备热武器赋值
			this.weaponObj = weaponObj;
			
			//告诉服务器改武器已经被装备
			this.server.net_Equiped(this.currentPlayer, weaponObj);

			//调整拿起武器后，玩家外观姿态
			player.character.animationStance = GamePlay.AnimationStanceType.RifleStand;
			player.character.moveFacingDirection = GamePlay.MoveFacingDirection.ControllerDirection;
			player.character.movementDirection = GamePlay.MovementDirection.ControllerDirection;

			//显示准心与开枪按钮
			let gameUI = UI.instance.getPanel(GameUI);
			gameUI.mFireJoyStick.setVisibility(MWGameUI.ESlateVisibility.Visible);
			gameUI.mCrossHairs.setVisibility(MWGameUI.ESlateVisibility.Visible);




		}
	}

	public startShoot() {
		this.isShoot = true;

	}

	public stopShoot() {
		this.isShoot = false;
		//若装备了热武器，则停止开火后保持持枪姿态
		if (this.isEquipWeapon)
			this.currentPlayer.character.animationStance = GamePlay.AnimationStanceType.RifleStand;
	}

	checkCollision() {
		if (this.currentPlayer.character.animationStance != GamePlay.AnimationStanceType.RifleAimStand)
			this.currentPlayer.character.animationStance = GamePlay.AnimationStanceType.RifleAimStand;

		//让服务器播放射击特效
		this.server.net_PlayShootEffect(this.fireEffect);

		//射线检测
		let startLoc = this.fireEffect.location;
		let endLoc = startLoc.addition(this.currentPlayer.character.cameraSystem.cameraWorldTransform.getForwardVector().multiply(10000));
		endLoc.y += this.randomRange(-200, 200);
		endLoc.z += this.randomRange(-200, 200);
		let hitResults = GamePlay.lineTrace(this.currentPlayer, startLoc, endLoc, false, false);

		//判断当前击中的是什么物体
		if (GamePlay.isCharacter(hitResults[0].gameObject)) {
			console.log("hit character:");
			//发送事件来显示受击提示
			Events.dispatchToServer("playerHit", (hitResults[0].gameObject as GamePlay.Character).player, this.currentPlayer.character.location)

			//告诉服务器对击中玩家扣血
			this.server.net_HitPlayer((hitResults[0].gameObject as GamePlay.Character).player);
		}
		else if (GamePlay.isAICharacter(hitResults[0].gameObject)) {
			console.log("hit NPC");
			this.server.net_HitNpc(hitResults[0].gameObject as GamePlay.Humanoid);
		}

		//让服务器播放击中特效
		this.server.net_PlayHitEffect(hitResults[0].location);
	}

	randomRange(min: number, max: number) {
		return Math.random() * (max - min + 1) + min;
	}




}
