/*
 * @Author: Tianyi
 * @Date: 2022-08-15 18:43:15
 * @LastEditors: Tianyi
 * @LastEditTime: 2022-08-19 10:49:54
 * @FilePath: \WYW_0419_Oasis\JavaScripts\HitPromptModuleC.ts
 * @Description: 受击提示模块客户端，负责接收服务端的受击信息，然后使用向量的点乘和叉乘，来判断攻击者与角色前向量的角度和左右位置，
 * 将计算后的信息发送给受击提示UI，更新UI状态
 * 
 */
import { ModuleC, UI } from "odin";
import { HitPromptModuleS } from "./HitPromptModuleS";
import HitPromptUI from "./HitPromptUI";

export class HitPromptModuleC extends ModuleC<HitPromptModuleS, null> {
	DirArr: number[];
	override onStart(): void {
		UI.instance.showPanel(HitPromptUI);
		this.DirArr = [];
		for (let i = 0; i <= 7; i++) {
			this.DirArr[i] = 0;
		}
	}

	override onUpdate(dt: number): void {
		//减少当前出现的受击提示的alpha值
		for (let i = 0; i < this.DirArr.length; i++) {
			if (this.DirArr[i] > 0) {
				this.DirArr[i] -= dt;
			}
		}
		UI.instance.getPanel(HitPromptUI).updatePrompt(this.DirArr);
	}

	public net_ShowHitPrompt(loc: Type.Vector) {
		console.log("receive server showhitprompt");
		this.setDir(this.calculateLocation(loc));

	}

	//从客户端接收受击提示出现的位置
	setDir(index: number) {
		this.DirArr[index] = 1;
	}

	calculateLocation(loc: Type.Vector) {
		let vec1 = this.currentPlayer.character.getForwardVector();
		let vector1 = new Type.Vector2(vec1.x, vec1.y).getNormalized();
		vector1.y = -vector1.y;
		let vec2 = loc.subtraction(this.currentPlayer.character.location);
		let vector2 = new Type.Vector2(vec2.x, vec2.y).getNormalized();
		vector2.y = -vector2.y;

		//使用点乘计算攻击者与玩家前方之间的角度
		let num1 = vector1.x * vector2.x + vector1.y * vector2.y;
		//let num2 = Math.sqrt(vector1.x*vector1.x+vector1.y*vector1.y)*Math.sqrt(vector2.x*vector2.x+vector2.y*vector2.y);
		let cos = num1 / 1;
		let angle = Math.acos(cos) * (180 / Math.PI);
		console.log("calculate angle: " + angle);

		//使用叉乘计算攻击者左右位置
		let dir = vector1.x * vector2.y - vector1.y * vector2.x;

		if (dir < 0) {
			if (angle >= 0 && angle < 22.5) {
				return 0;
			}
			else if (angle >= 22.5 && angle < 67.5) {
				return 1;
			}
			else if (angle >= 67.5 && angle <= 112.5) {
				return 2;
			}
			else if (angle >= 112.5 && angle <= 157.5) {
				return 3;
			}
		}
		else {
			if (angle >= 22.5 && angle < 67.5) {
				return 7;
			}
			else if (angle >= 67.5 && angle < 112.5) {
				return 6;
			}
			else if (angle >= 112.5 && angle <= 157.5) {
				return 5;
			}
			else if (angle >= 157.5 && angle <= 180) {
				return 4;
			}
		}

	}

}
