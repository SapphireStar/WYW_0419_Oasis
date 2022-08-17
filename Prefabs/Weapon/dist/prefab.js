'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MWCore = require('MWCore');
var GamePlay = require('GamePlay');
var odin = require('odin');
var MWGameUI = require('MWGameUI');
var Events = require('Events');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var MWCore__default = /*#__PURE__*/_interopDefaultLegacy(MWCore);
var GamePlay__default = /*#__PURE__*/_interopDefaultLegacy(GamePlay);
var MWGameUI__default = /*#__PURE__*/_interopDefaultLegacy(MWGameUI);
var Events__default = /*#__PURE__*/_interopDefaultLegacy(Events);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var LanUtil;
(function (LanUtil) {
    function setUILanguage(ui) {
        if (!this.getLan) {
            return;
        }
        let key = null;
        if (ui instanceof MWGameUI__default['default'].MWUIButton) {
            key = ui.getButtonString();
        }
        else {
            key = ui.getText();
        }
        if (key) {
            let lan = this.getLan(key);
            if (lan) {
                if (ui instanceof MWGameUI__default['default'].MWUIButton) {
                    ui.setButtonString(lan.Value);
                }
                else {
                    ui.setText(lan.Value);
                }
            }
        }
    }
    LanUtil.setUILanguage = setUILanguage;
})(LanUtil || (LanUtil = {}));
class UI_GameUI extends odin.ViewBase {
    mJumpButton;
    mFireButton;
    mCrossHairs;
    constructor() {
        super("GameUI");
    }
    buildSelf() {
        this.mJumpButton = this.findChildByPath(MWGameUI__default['default'].MWUIButton, "Canvas/mJumpButton");
        this.mFireButton = this.findChildByPath(MWGameUI__default['default'].MWUIButton, "Canvas/mFireButton");
        this.mCrossHairs = this.findChildByPath(MWGameUI__default['default'].MWUIImage, "Canvas/CrossHairs/mCrossHairs");
        this.mJumpButton.onClicked().add(() => {
            Events__default['default'].dispatchLocal("PlayButtonClick", "mJumpButton");
        });
        LanUtil.setUILanguage(this.mJumpButton);
        this.mFireButton.onClicked().add(() => {
            Events__default['default'].dispatchLocal("PlayButtonClick", "mFireButton");
        });
        LanUtil.setUILanguage(this.mFireButton);
    }
}

let GameUI = class GameUI extends UI_GameUI {
    /** 仅在游戏时间对非模板实例调用一次 */
    onStart() {
        this.mFireButton.onPressed().add(() => {
            odin.ModuleManager.instance.getModule(WeaponModuleC).startShoot();
        });
        this.mFireButton.onReleased().add(() => {
            odin.ModuleManager.instance.getModule(WeaponModuleC).stopShoot();
        });
    }
    /**
     * 在构建底层slate小部件后调用
     * 取决于slate对象的使用方式
     * 由于在层次结构中添加和删除，可能会多次调用此事件
     * 如果需要在创建时调用一次的true事件，请使用onInitialized
     */
    construct() {
    }
    /**
     * 当slate小部件不再被引用导致slate资源被销毁时调用
     * 构造此事件可以多次调用。
     */
    destruct() {
    }
    /** 对象被销毁时调用 */
    onDestroy() {
    }
};
GameUI = __decorate([
    MWGameUI__default['default'].MWUIMono
], GameUI);
var GameUI$1 = GameUI;

class WeaponModuleC extends odin.ModuleC {
    isShoot = false;
    shootTime = 0;
    shootCD = 0.2;
    fireEffect;
    isEquipWeapon = false;
    onUpdate(dt) {
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
    pickWeapon(player, weaponObj, fireEffect) {
        this.isEquipWeapon = true;
        this.fireEffect = fireEffect;
        player.character.attachGameObjectToCharacter(weaponObj, GamePlay__default['default'].CharacterSocketType.Right_Hand);
        player.character.animationStance = GamePlay__default['default'].AnimationStanceType.RifleStand;
        player.character.moveFacingDirection = GamePlay__default['default'].MoveFacingDirection.ControllerDirection;
        player.character.movementDirection = GamePlay__default['default'].MovementDirection.ControllerDirection;
        //显示准心与开枪按钮
        let gameUI = odin.UI.instance.getPanel(GameUI$1);
        gameUI.mFireButton.setVisibility(MWGameUI__default['default'].ESlateVisibility.Visible);
        gameUI.mCrossHairs.setVisibility(MWGameUI__default['default'].ESlateVisibility.Visible);
    }
    startShoot() {
        this.isShoot = true;
    }
    stopShoot() {
        this.isShoot = false;
        this.currentPlayer.character.animationStance = GamePlay__default['default'].AnimationStanceType.RifleStand;
    }
    checkCollision() {
        if (this.currentPlayer.character.animationStance != GamePlay__default['default'].AnimationStanceType.RifleAimStand)
            this.currentPlayer.character.animationStance = GamePlay__default['default'].AnimationStanceType.RifleAimStand;
        odin.SoundManager.instance.play3DSound("12563", this.fireEffect, 1, 0.5);
        odin.EffectManager.instance.playEffectInGameObject("4388", this.fireEffect, 1);
        let startLoc = this.fireEffect.location;
        let endLoc = startLoc.addition(this.currentPlayer.character.cameraSystem.cameraWorldTransform.getForwardVector().multiply(10000));
        endLoc.y += this.randomRange(-200, 200);
        endLoc.z += this.randomRange(-200, 200);
        let hitResults = GamePlay__default['default'].lineTrace(this.currentPlayer, startLoc, endLoc, false, false);
        //判断当前击中的是什么物体
        if (GamePlay__default['default'].isCharacter(hitResults[0].gameObject)) {
            console.log("hit character");
            this.server.net_HitPlayer(hitResults[0].gameObject);
        }
        else if (GamePlay__default['default'].isAICharacter(hitResults[0].gameObject)) {
            console.log("hit NPC");
            this.server.net_HitNpc(hitResults[0].gameObject);
        }
        //让服务器播放击中特效
        this.server.net_PlayHitEffect(hitResults[0].location);
    }
    randomRange(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
}

let Rifle = class Rifle extends MWCore__default['default'].MWScript {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        let boxTrigger = this.gameObject.getChildByName("BoxTrigger");
        let fireEffect = this.gameObject.getChildByName("Fire");
        boxTrigger.onEnter.Add((gameObject) => {
            if (GamePlay__default['default'].isCharacter(gameObject)) {
                odin.ModuleManager.instance.getModule(WeaponModuleC).pickWeapon(gameObject.player, this.gameObject, fireEffect);
            }
        });
    }
};
Rifle = __decorate([
    MWCore__default['default'].MWClass
], Rifle);
var Rifle$1 = Rifle;

var foreign0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Rifle$1
});

const MWModuleMap = {
    'Script/Rifle': foreign0,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=prefab.js.map
