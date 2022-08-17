'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MWCore = require('MWCore');
var GamePlay = require('GamePlay');
var Events = require('Events');
var odin = require('odin');
var Type = require('Type');
var ue = require('ue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var MWCore__default = /*#__PURE__*/_interopDefaultLegacy(MWCore);
var GamePlay__default = /*#__PURE__*/_interopDefaultLegacy(GamePlay);
var Events__default = /*#__PURE__*/_interopDefaultLegacy(Events);
var Type__default = /*#__PURE__*/_interopDefaultLegacy(Type);

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

class BaseState {
    npc;
    constructor(npc) {
        this.npc = npc;
    }
}

class DeadState extends BaseState {
    enterState() {
        this.npc.setCollision(Type__default['default'].PropertyStatus.Off);
        this.npc.enableCollision = false;
        this.npc.ragdoll(true);
    }
    Update(dt) {
    }
}

class PatrolState extends BaseState {
    timer = 0;
    wayPoints;
    curWayPointIndex = 0;
    constructor(npc) {
        super(npc);
    }
    setWayPoint(index) {
        this.curWayPointIndex = index;
    }
    enterState() {
        this.wayPoints = MWCore__default['default'].GameObject.getGameObjectsByName("WayPoint");
        this.npc.setCollision(Type__default['default'].PropertyStatus.On);
        this.npc.enableCollision = true;
        this.npc.ragdoll(false);
    }
    Update(dt) {
        if (this.timer <= 0) {
            if (this.curWayPointIndex >= this.wayPoints.length) {
                this.curWayPointIndex = this.curWayPointIndex % this.wayPoints.length;
            }
            GamePlay__default['default'].moveTo(this.npc, this.wayPoints[this.curWayPointIndex].location, 50);
        }
        else {
            this.timer -= dt;
        }
        if (ue.Vector.Dist(new ue.Vector(this.npc.location.x, this.npc.location.y, this.npc.location.z), new ue.Vector(this.wayPoints[this.curWayPointIndex].location.x, this.wayPoints[this.curWayPointIndex].location.y, this.wayPoints[this.curWayPointIndex].location.z)) < 100) {
            this.timer = 1;
            this.wayPoints = MWCore__default['default'].GameObject.getGameObjectsByName("WayPoint");
            this.curWayPointIndex = (this.curWayPointIndex + 1) % this.wayPoints.length;
        }
    }
}

class NpcModuleS extends odin.ModuleS {
    npcHpMap;
    onAwake() {
        this.npcHpMap = new Map();
    }
    onStart() {
    }
    //供npc实例注册信息
    net_AddNpc(npc) {
        this.npcHpMap.set(npc, 50);
    }
    //收到伤害，修改收到伤害的npc的血量数据
    net_GetHit(npc, damage, player) {
        if (this.npcHpMap.has(npc)) {
            this.npcHpMap.set(npc, this.npcHpMap.get(npc) - damage);
            if (this.npcHpMap.get(npc) <= 0) {
                Events__default['default'].dispatchLocal("npcDead", npc);
                setTimeout(() => {
                    Events__default['default'].dispatchLocal("npcRecover", npc);
                }, 3000);
            }
        }
    }
    net_GetHp(npc) {
        return this.npcHpMap.get(npc);
    }
}

let NPC = class NPC extends MWCore__default['default'].MWScript {
    curState;
    npcModule;
    InitialWayPoint = 0;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (GamePlay__default['default'].isServer()) {
            //向服务器注册当前npc
            this.npcModule = odin.ModuleManager.instance.getModule(NpcModuleS);
            this.npcModule.net_AddNpc(this.gameObject);
            //默认状态为巡逻状态
            this.curState = new PatrolState(this.gameObject);
            this.bUseUpdate = true;
            this.curState.setWayPoint(this.InitialWayPoint);
            this.curState.enterState();
            //如果接收到npc模块的死亡消息，则进入死亡状态
            Events__default['default'].addLocalListener("npcDead", (npc) => {
                if (npc == this.gameObject) {
                    this.curState = new DeadState(this.gameObject);
                    this.curState.enterState();
                }
            });
            //如果收到npc模块的复活消息，则复活，继续巡逻
            Events__default['default'].addLocalListener("npcRecover", (npc) => {
                console.log("npc recover");
                if (npc == this.gameObject) {
                    this.curState = new PatrolState(this.gameObject);
                    this.curState.setWayPoint(this.InitialWayPoint);
                    this.curState.enterState();
                    let waypoints = MWCore__default['default'].GameObject.getGameObjectsByName("WayPoint");
                    this.gameObject.location = waypoints[Math.floor(Math.random() * (waypoints.length))].location;
                }
            });
        }
    }
    /**
     * 每帧被执行,与上一帧的延迟 dt 秒
     * 此函数执行需要将this.bUseUpdate赋值为true
     */
    onUpdate(dt) {
        this.curState.Update(dt);
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
__decorate([
    MWCore__default['default'].MWProperty()
], NPC.prototype, "InitialWayPoint", void 0);
NPC = __decorate([
    MWCore__default['default'].MWClass
], NPC);
var NPC$1 = NPC;

var foreign0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': NPC$1
});

const MWModuleMap = {
    'Script/NPC': foreign0,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=prefab.js.map
