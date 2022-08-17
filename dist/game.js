(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('MWCore'), require('Events'), require('GamePlay'), require('DataStorage'), require('Type'), require('Global'), require('ue'), require('MWGameUI'), require('MWMGS'), require('MathLibrary')) :
    typeof define === 'function' && define.amd ? define(['exports', 'MWCore', 'Events', 'GamePlay', 'DataStorage', 'Type', 'Global', 'ue', 'MWGameUI', 'MWMGS', 'MathLibrary'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["mw-game"] = {}, global.MWCore, global.Events, global.GamePlay, global.require$$3, global.Type, global.require$$5, global.require$$6, global.MWGameUI, global.require$$8, global.require$$9));
})(this, (function (exports, MWCore, Events, GamePlay, require$$3, Type, require$$5, require$$6, MWGameUI, require$$8, require$$9) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var MWCore__default = /*#__PURE__*/_interopDefaultLegacy(MWCore);
    var Events__default = /*#__PURE__*/_interopDefaultLegacy(Events);
    var GamePlay__default = /*#__PURE__*/_interopDefaultLegacy(GamePlay);
    var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
    var Type__default = /*#__PURE__*/_interopDefaultLegacy(Type);
    var require$$5__default = /*#__PURE__*/_interopDefaultLegacy(require$$5);
    var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
    var MWGameUI__default = /*#__PURE__*/_interopDefaultLegacy(MWGameUI);
    var require$$8__default = /*#__PURE__*/_interopDefaultLegacy(require$$8);
    var require$$9__default = /*#__PURE__*/_interopDefaultLegacy(require$$9);

    var __defProp$8 = Object.defineProperty;
    var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
    var __decorateClass$8 = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp$8(target, key, result);
      return result;
    };
    let ClothTest = class extends MWCore__default["default"].MWScript {
      OnLoad() {
        Events__default["default"].AddPlayerJoinedListener((player) => {
          this.RandomChangeCloth(player);
        });
      }
      RandomChangeCloth(player) {
      }
      GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return Min + Math.round(Rand * Range);
      }
    };
    ClothTest = __decorateClass$8([
      MWCore__default["default"].MWClass
    ], ClothTest);
    var ClothTest$1 = ClothTest;

    var foreign0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        'default': ClothTest$1
    }, Symbol.toStringTag, { value: 'Module' }));

    var dist = {};

    (function (exports) {

    Object.defineProperty(exports, '__esModule', { value: true });

    var MWCore = MWCore__default["default"];
    var GamePlay = GamePlay__default["default"];
    var Events = Events__default["default"];
    var DataStorage = require$$3__default["default"];
    var Type = Type__default["default"];
    var Global = require$$5__default["default"];
    var ue = require$$6__default["default"];
    var MWGameUI = MWGameUI__default["default"];
    var MWMGS = require$$8__default["default"];
    var MathLibrary = require$$9__default["default"];

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var MWCore__default$1 = /*#__PURE__*/_interopDefaultLegacy(MWCore);
    var GamePlay__default$1 = /*#__PURE__*/_interopDefaultLegacy(GamePlay);
    var Events__default$1 = /*#__PURE__*/_interopDefaultLegacy(Events);
    var DataStorage__default = /*#__PURE__*/_interopDefaultLegacy(DataStorage);
    var Type__default$1 = /*#__PURE__*/_interopDefaultLegacy(Type);
    var Global__default = /*#__PURE__*/_interopDefaultLegacy(Global);
    var MWGameUI__default$1 = /*#__PURE__*/_interopDefaultLegacy(MWGameUI);
    var MWMGS__default = /*#__PURE__*/_interopDefaultLegacy(MWMGS);
    var MathLibrary__default = /*#__PURE__*/_interopDefaultLegacy(MathLibrary);

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

    //一个玩家的数据
    class PlayerData {
        playerId;
        dataMap; //数据源
        moduleDataMap = new Map();
        constructor(playerId, dataMap) {
            this.playerId = playerId;
            this.dataMap = dataMap;
        }
        //获取一个模块数据
        getModuleData(ModuleDataClass) {
            if (ModuleDataClass == null)
                return null;
            let moudleDataName = ModuleDataClass.name;
            if (!this.moduleDataMap.has(moudleDataName)) {
                let moudleData = new ModuleDataClass();
                moudleData["init"](this.playerId, this.dataMap);
                this.moduleDataMap.set(moudleDataName, moudleData);
            }
            return this.moduleDataMap.get(moudleDataName);
        }
        get dataInfoMap() {
            return this.dataMap;
        }
        //销毁
        destroy() {
            this.moduleDataMap.forEach((moudleData) => {
                moudleData["destroy"]();
            });
            this.moduleDataMap.clear();
        }
    }

    //自己角色的数据(客户端专用)
    class DataCenterC {
        static _instance;
        constructor() { }
        static get instance() {
            if (this._instance == null) {
                this._instance = new DataCenterC();
            }
            return this._instance;
        }
        destroy() {
            DataCenterC._instance = null;
        }
        INIT_PLAYER_DATA_ASK = "InitPlayerData_Ask"; //初始化玩家数据请求
        INIT_PLAYER_DATA_REPLY = "InitPlayerData_Reply"; //初始化玩家数据回应
        PLAYER_DATA_CHANGE_NOTIFY = "PlayerDataChange_Notify"; //玩家数据变化通知
        playerData;
        /**
         * 初始化，获取当前玩家的所有模块数据
         */
        init() {
            //请求初始化数据
            setTimeout(() => {
                Events__default$1["default"].dispatchToServer(this.INIT_PLAYER_DATA_ASK);
            }, 500);
            Events__default$1["default"].addServerListener(this.PLAYER_DATA_CHANGE_NOTIFY, (dataInfoName, dataInfo) => {
                if (this.playerData != null) {
                    this.playerData.dataInfoMap[dataInfoName] = dataInfo;
                }
            });
            return new Promise((resolve) => {
                //监听_初始化数据
                let listener = Events__default$1["default"].addServerListener(this.INIT_PLAYER_DATA_REPLY, (dataMap) => {
                    listener.disconnect();
                    this.playerData = new PlayerData(0, dataMap);
                    resolve();
                });
            });
        }
        /**
         * 获取自己的一个模块数据
         * @param ModuleDataClass 模块数据类
         * @returns 模块数据对象
         */
        getModuleData(ModuleDataClass) {
            if (this.playerData == null)
                return null;
            return this.playerData.getModuleData(ModuleDataClass);
        }
        /**判断UIRoot是否就绪*/
        async ready() {
            return new Promise((resolve) => {
                let id = setInterval(() => {
                    if (this.playerData != null) {
                        clearInterval(id);
                        resolve();
                    }
                }, 30);
            });
        }
    }

    let _isListenServer = -1; //-1未取值 0-不是 1-是
    let askMsgList = [];
    /**判断当前是否是单机模式 */
    function isListenServer() {
        if (_isListenServer < 0) {
            if (GamePlay__default$1["default"].isListenServer() || GamePlay__default$1["default"].isServer() && GamePlay__default$1["default"].isClient()) {
                _isListenServer = 1;
                GamePlay__default$1["default"].isClient = () => { return true; };
                GamePlay__default$1["default"].isServer = () => { return true; };
                Events__default$1["default"].addClientListener = (eventName, listener) => {
                    oTraceWarning("addClientListener " + eventName);
                    let l = Events__default$1["default"].addLocalListener(eventName, (params) => {
                        oTrace("                  [Server] [Receive]   " + eventName + " " + (eventName == "Ask" ? params[0] : ""));
                        listener(GamePlay__default$1["default"].getCurrentPlayer(), ...params);
                    });
                    return l;
                };
                Events__default$1["default"].dispatchToClient = (player, eventName, ...params) => {
                    oTrace("                  [Server] [Send]   " + eventName + " " + (eventName == "Reply" || eventName == "Notify" ? params[0] : ""));
                    return Events__default$1["default"].dispatchLocal(eventName, params);
                };
                Events__default$1["default"].dispatchToAllClient = (eventName, ...params) => {
                    oTrace("                  [Server] [Send]   " + eventName + " " + (eventName == "Reply" || eventName == "Notify" ? params[0] : ""));
                    return Events__default$1["default"].dispatchLocal(eventName, params);
                };
                Events__default$1["default"].dispatchToAllRoomClient = (eventName, ...params) => {
                    oTrace("                  [Server] [Send]   " + eventName + " " + (eventName == "Reply" || eventName == "Notify" ? params[0] : ""));
                    return Events__default$1["default"].dispatchLocal(eventName, params);
                };
                Events__default$1["default"].addServerListener = (eventName, listener) => {
                    return Events__default$1["default"].addLocalListener(eventName, (params) => {
                        oTrace("                  [Client] [Receive]   " + eventName + " " + (eventName == "Reply" || eventName == "Notify" ? params[0] : ""));
                        listener(...params);
                    });
                };
                Events__default$1["default"].dispatchToServer = (eventName, ...params) => {
                    oTrace("                  [Client] [Send]   " + eventName + " " + (eventName == "Ask" ? params[0] : ""));
                    askMsgList.push([eventName, params]);
                    return Events__default$1["default"].DispatchEventResult.SUCCESS;
                };
                setInterval(() => {
                    if (askMsgList.length > 0) {
                        let arr = askMsgList.shift();
                        Events__default$1["default"].dispatchLocal(arr[0], arr[1]);
                    }
                }, 10);
            }
            else {
                _isListenServer = 0;
            }
        }
        return _isListenServer > 0;
    }
    /**
     * 类装饰器-自动init，可以自动调用类的静态init方法
     * @param target 类目标
     */
    function AutoInit(target) {
        isListenServer();
        if (target["init"] != null) {
            target["init"]();
        }
    }
    /**
     * 方法装饰器-无返回服务器网络方法，用于装饰不需要给客户端返回reply的net方法
     * @param target 类实例
     * @param funName 方法名
     * @param descriptor 属性描述
     */
    function NoReply(target, funName, descriptor) {
        // const sourceMethod = descriptor.value;
        // descriptor.value = function (...args: any): void {
        //     sourceMethod.apply(this, args);
        // }
        descriptor.value["No_Reply"] = true;
    }
    /**回调体，用于Action和Event系统的辅助功能*/
    class CallBack {
        fun;
        thisArg;
        dirty = false; //脏标记
        constructor(fun, thisArg) {
            this.fun = fun;
            this.thisArg = thisArg;
        }
        call(...prames) {
            if (!this.dirty) {
                if (this.thisArg != null) {
                    return this.fun.call(this.thisArg, ...prames);
                }
                else {
                    this.fun(...prames);
                }
            }
        }
        //判断是否构建于fun和thisArg
        isOriginFrom(fun, thisArg) {
            return this.fun == fun && this.thisArg == thisArg;
        }
        get originFun() {
            return this.fun;
        }
        get originThisArg() {
            return this.thisArg;
        }
    }
    /**任意参数的代理*/
    class Action {
        callBackList = [];
        callingRemNum = -1; //调用时移除的数量
        countChangeCallback; //长度变化的回调
        /**
         * 添加一个监听方法(有重复过滤)
         * @param fn 方法
         * @param thisArg 域
         */
        add(fn, thisArg) {
            if (fn == null)
                return;
            let index = this.getFunIndex(fn, thisArg);
            if (index == -1)
                this.callBackList.push(new CallBack(fn, thisArg));
            if (this.countChangeCallback != null)
                this.countChangeCallback(this.count);
        }
        /**
         * 移除一个监听方法
         * @param fn 方法
         * @param thisArg 域
         */
        remove(fn, thisArg) {
            if (fn == null)
                return;
            if (this.callingRemNum >= 0) {
                this.callingRemNum++;
                let callBack = this.getCallBack(fn, thisArg);
                if (callBack != null)
                    callBack.dirty = true;
            }
            else {
                let index = this.getFunIndex(fn, thisArg);
                if (index != -1)
                    this.callBackList.splice(index, 1);
                if (this.countChangeCallback != null)
                    this.countChangeCallback(this.count);
            }
        }
        /**
         * 执行
         * @param prams 参数序列
         */
        call(...prams) {
            if (this.callBackList.length == 0)
                return;
            this.callingRemNum = 0;
            for (let i = 0; i < this.callBackList.length; i++) {
                this.callBackList[i].call(...prams);
            }
            if (this.callingRemNum > 0) { //Call的时候有方法被移除了
                for (let i = 0; i < this.callBackList.length;) {
                    if (this.callBackList[i].dirty)
                        this.callBackList.splice(i, 1);
                    else
                        i++;
                }
                if (this.countChangeCallback != null)
                    this.countChangeCallback(this.count);
            }
            this.callingRemNum = -1;
        }
        /**
         * 判断是否包含某个监听方法
         * @param fn 方法
         * @param thisArg 域
         * @returns 结果
         */
        includes(fn, thisArg) {
            if (fn == null)
                return false;
            return this.getFunIndex(fn, thisArg) != -1;
        }
        /**
         * 清除所有监听
         */
        clear() {
            while (this.callBackList.length > 0)
                this.callBackList.pop();
        }
        /**
         * 监听方法的数量
         */
        get count() {
            return this.callBackList.length;
        }
        /**
         * 设置长度变化的回调方法
         * @param callback 方法
         */
        setCountChangeCallback(callback) {
            this.countChangeCallback = callback;
        }
        getFunIndex(fn, thisArg) {
            for (let i = 0; i < this.callBackList.length; i++) {
                if (this.callBackList[i].isOriginFrom(fn, thisArg))
                    return i;
            }
            return -1;
        }
        getCallBack(fn, thisArg) {
            for (let i = 0; i < this.callBackList.length; i++) {
                if (this.callBackList[i].isOriginFrom(fn, thisArg))
                    return this.callBackList[i];
            }
            return null;
        }
    }
    /**一个参数的代理*/
    class Action1 extends Action {
        add(fn, thisArg) { super.add(fn, thisArg); }
        remove(fn, thisArg) { super.remove(fn, thisArg); }
        call(arg) { super.call(arg); }
    }
    /**二个参数的代理*/
    class Action2 extends Action {
        add(fn, thisArg) { super.add(fn, thisArg); }
        remove(fn, thisArg) { super.remove(fn, thisArg); }
        call(a, b) { super.call(a, b); }
    }
    //单例的装饰器
    const SINGLETON_KEY = Symbol();
    function Singleton() {
        return function (type) {
            const proxyType = new Proxy(type, {
                // this will hijack the constructor
                construct(target, argsList, newTarget) {
                    // we should skip the proxy for children of our target class
                    if (target.prototype !== newTarget.prototype) {
                        return Reflect.construct(target, argsList, newTarget);
                    }
                    // if our target class does not have an instance, create it
                    if (!target[SINGLETON_KEY]) {
                        target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
                    }
                    return target[SINGLETON_KEY];
                },
            });
            Reflect.defineProperty(proxyType, "instance", {
                get() {
                    if (!this[SINGLETON_KEY]) {
                        new this();
                    }
                    return this[SINGLETON_KEY];
                },
                set(next) {
                    this[SINGLETON_KEY] = next;
                }
            });
            return proxyType;
        };
    }

    var LogManager_1;
    /**
     * 输出Log
     * @param content 内容
     */
    function oTrace(...content) {
        exports.LogManager.instance.log(...content);
    }
    /**
     * 输出Warning
     * @param content 内容
     */
    function oTraceWarning(...content) {
        exports.LogManager.instance.logWarning(...content);
    }
    /**
     * 输出Error
     * @param content 内容
     */
    function oTraceError(...content) {
        exports.LogManager.instance.logError(...content);
    }
    //#region Debug
    exports.LogManager = LogManager_1 = class LogManager {
        static instance;
        logLevel = 3;
        _firstWithEnable = true;
        cs;
        constructor() {
            if (GamePlay__default$1["default"].isServer() && GamePlay__default$1["default"].isClient()) {
                this.cs = '';
            }
            else {
                this.cs = GamePlay__default$1["default"].isServer() ? "S" : "C";
            }
        }
        destroy() {
            LogManager_1.instance = null;
        }
        /**
         * 设置所有的打印是否带______[OdinLog]前缀
         */
        set firstWithEnable(value) {
            this._firstWithEnable = value;
        }
        /**
         * 设置输出的等级
         * @param value 等级值(0-全部 1-Error&Warning 2-Error)
         */
        setLogLevel(value) {
            this.logLevel = value;
        }
        //===============基础===============
        /**
         * 输出Log
         * @param content 内容
         */
        log(...content) {
            this.logWithTag(null, ...content);
        }
        /**
         * 输出Warning
         * @param content 内容
         */
        logWarning(...content) {
            this.logWarningWithTag(null, ...content);
        }
        /**
         * 输出Error
         * @param content 内容
         */
        logError(...content) {
            this.logErrorWithTag(null, ...content);
        }
        //=============WithTag==============
        /**
         * 输出带tag的Log，便于搜索
         * @param tag tag
         * @param content 内容
         */
        logWithTag(tag, ...content) {
            if (this.logLevel < 3)
                return;
            console.warn(`${this.getFirstWith(tag)}${content}`);
        }
        /**
         * 输出带tag的Warning，便于搜索
         * @param tag tag
         * @param content 内容
         */
        logWarningWithTag(tag, ...content) {
            if (this.logLevel < 2)
                return;
            console.warn(`${this.getFirstWith(tag)}${content}`);
        }
        /**
         * 输出带tag的Error，便于搜索
         * @param tag tag
         * @param content 内容
         */
        logErrorWithTag(tag, ...content) {
            if (this.logLevel < 1)
                return;
            console.error(`${this.getFirstWith(tag)}${content}`);
        }
        //===================================
        //获取前缀
        getFirstWith(tag) {
            if (this._firstWithEnable) {
                if (tag != null) {
                    return `[ _____OdinLog${this.cs}][${tag}_____ ]       `;
                }
                else {
                    return `[ _____OdinLog${this.cs}_____ ]       `;
                }
            }
            else {
                if (tag != null) {
                    return `[${tag}]`;
                }
                else {
                    return "";
                }
            }
        }
    };
    exports.LogManager = LogManager_1 = __decorate([
        Singleton()
    ], exports.LogManager);

    //数据中心，管理所有玩家的数据(服务端专用)
    class DataCenterS {
        static _instance;
        constructor() { }
        static get instance() {
            if (this._instance == null) {
                this._instance = new DataCenterS();
            }
            return this._instance;
        }
        destroy() {
            DataCenterS._instance = null;
        }
        INIT_PLAYER_DATA_ASK = "InitPlayerData_Ask"; //初始化玩家数据请求
        INIT_PLAYER_DATA_REPLY = "InitPlayerData_Reply"; //初始化玩家数据回应
        PLAYER_DATA_CHANGE_NOTIFY = "PlayerDataChange_Notify"; //玩家数据变化通知
        SAVE_DELAY_SECOND = 10; //每10秒保存一个数据
        onPlayerJoined = new Action1(); //玩家进入
        onPlayerLeft = new Action1(); //玩家离开(保存数据之前调用)
        playerDataMap = null;
        toBeSavedMap = new Map(); //要存储的玩家数据，10秒存 <platerId, time>
        onlinePlayerIds = []; //在线的玩家id
        /**初始化(框架方法，请勿调用) */
        init() {
            if (GamePlay__default$1["default"].isClient() || this.playerDataMap != null)
                return;
            this.playerDataMap = new Map();
            //玩家上线
            Events__default$1["default"].addPlayerJoinedListener((player) => {
                oTrace(`DataCenterS:Player enter game. playerID=${player.getPlayerID()}`);
                this.loadPlayerData(player);
            });
            //玩家下线
            Events__default$1["default"].addPlayerLeftListener((player) => {
                oTrace(`DataCenterS:Player left game. playerID=${player.getPlayerID()}`);
                this.onPlayerLeft.call(player);
                this.unloadPlayerData(player);
            });
            //玩家初始化数据的请求
            Events__default$1["default"].addClientListener(this.INIT_PLAYER_DATA_ASK, (player, data) => {
                oTrace(`DataCenterS:Player ask data. playerID=${player.getPlayerID()}`);
                let playerID = player.getPlayerID();
                if (this.playerDataMap.has(playerID)) {
                    Events__default$1["default"].dispatchToClient(player, this.INIT_PLAYER_DATA_REPLY, this.playerDataMap.get(playerID).dataInfoMap);
                }
                else {
                    oTraceError(`DataCenterS:Player data not found. playerID=${playerID}`);
                }
            });
            //10秒钟保存一次数据
            setInterval(this.savePlayerData.bind(this), 1000);
        }
        //装载玩家数据
        async loadPlayerData(player) {
            let data = await DataStorage__default["default"].asyncGetPlayerData(player);
            let playerID = player.getPlayerID();
            let isNewPlayer = (data == null || data == "");
            oTrace(`DataCenterS:Player joined. Load player data. playerID=${playerID} ${isNewPlayer ? "NewPlayer" : "OldPlayer"}`);
            if (isNewPlayer) {
                data = { playerID: playerID };
            }
            this.playerDataMap.set(playerID, new PlayerData(playerID, data));
            this.onlinePlayerIds.push(playerID);
            this.onPlayerJoined.call(player);
        }
        //卸载玩家数据
        unloadPlayerData(player) {
            let playerID = player.getPlayerID();
            oTrace(`DataCenterS:Player left. Save player data. playerID= ${playerID}`);
            DataStorage__default["default"].asyncSetPlayerData(player, this.getPlayerData(player).dataInfoMap);
            if (this.toBeSavedMap.has(playerID)) {
                this.toBeSavedMap.delete(playerID);
            }
            this.playerDataMap.get(playerID).destroy();
            this.playerDataMap.delete(playerID);
            let index = this.onlinePlayerIds.indexOf(playerID);
            this.onlinePlayerIds.splice(index, 1);
        }
        //保存玩家数据(真存)
        savePlayerData() {
            this.playerDataMap.forEach((data, playerID) => {
                if (this.toBeSavedMap.has(playerID)) {
                    let time = this.toBeSavedMap.get(playerID);
                    time++;
                    if (time >= this.SAVE_DELAY_SECOND) {
                        let player = GamePlay__default$1["default"].getPlayer(playerID);
                        DataStorage__default["default"].asyncSetPlayerData(player, this.getPlayerData(player).dataInfoMap);
                        this.toBeSavedMap.delete(playerID);
                    }
                    else {
                        this.toBeSavedMap.set(playerID, time);
                    }
                }
            });
        }
        /**
         * 获取一个玩家的数据
         * @param player 玩家
         * @returns 玩家数据
         */
        getPlayerData(player) {
            if (player == null)
                return;
            if (player instanceof GamePlay__default$1["default"].Player) {
                return this.playerDataMap.get(player.getPlayerID());
            }
            else {
                return this.playerDataMap.get(player);
            }
        }
        /**
         * 获取一个玩家的一个模块数据
         * @param player 玩家
         * @param ModuleDataClass 模块数据类
         * @returns 模块数据对象
         */
        getModuleData(player, ModuleDataClass) {
            return this.getPlayerData(player).getModuleData(ModuleDataClass);
        }
        /**
         * 存储模块数据
         * @param moduleData 模块数据
         * @returns 是否成功
         */
        saveModuleData(moduleData, syncToClient) {
            let player = GamePlay__default$1["default"].getPlayer(moduleData.playerId);
            let playerID = player.getPlayerID();
            let playerData = this.getPlayerData(player);
            if (playerData == null) {
                return false; //没有这个玩家的数据
            }
            if (!this.toBeSavedMap.has(playerID)) {
                this.toBeSavedMap.set(playerID, 0);
            }
            let dataInfoName = moduleData.dataName;
            let dataInfo = moduleData["dataInfo"];
            playerData.dataInfoMap[dataInfoName] = dataInfo;
            if (syncToClient) {
                Events__default$1["default"].dispatchToClient(player, this.PLAYER_DATA_CHANGE_NOTIFY, dataInfoName, dataInfo);
            }
            return true;
        }
        /**
         * 同步模块数据(只向客户端同步，不保存)
         * @param moduleData 模块数据对象
         */
        syncModuleData(moduleData) {
            let player = GamePlay__default$1["default"].getPlayer(moduleData.playerId);
            let dataInfoName = moduleData.dataName;
            let dataInfo = moduleData["dataInfo"];
            Events__default$1["default"].dispatchToClient(player, this.PLAYER_DATA_CHANGE_NOTIFY, dataInfoName, dataInfo);
        }
        /**
         * 获取在线的所有玩家的ID数组
         * @returns 在线玩家id数组
         */
        getPlayerIDs() {
            return this.onlinePlayerIds;
        }
    }

    class TimeUtil {
        /**进入帧事件(参数dt)*/
        static onEnterFrame = new Action1();
        static delayExecuteFun = [];
        static delayExecuteId = 0;
        static _delayTime = 0;
        /**每一帧经过的时间 (单位：秒) */
        static get delayTime() {
            return this._delayTime;
        }
        /** 游戏运行后所经过的总时长 (单位：秒)*/
        static get time() {
            return Global__default["default"].elapsedTime();
        }
        /**
         * 延迟一定帧数执行方法
         * @param fun 执行的方法
         * @param frameNum 要延迟的帧数
         * @returns 用于停止的id
         */
        static delayExecute(fun, frameNum = 1) {
            let id = ++this.delayExecuteId;
            this.delayExecuteFun.push({ id: id, fun, frame: frameNum });
            return id;
        }
        /**
         * 清除delayExecute
         * @param id delayExecute方法返回的id
         */
        static clearDelayExecute(id) {
            for (let i = 0; i < this.delayExecuteFun.length; i++) {
                if (this.delayExecuteFun[i].id == id) {
                    this.delayExecuteFun.splice(i, 1);
                    break;
                }
            }
        }
        /**
         * 延迟一定秒数,用于异步方法中间的等待
         * @param second 时间(单位：秒)
         * @returns Promise
         */
        static async delaySecond(second) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    return resolve();
                }, second * 1000);
            });
        }
        /**
         * 给主循环留的接口，不要调用
         * @param dt 两帧直接的时间差
         */
        static update(dt) {
            this._delayTime = dt;
            this.onEnterFrame.call(dt);
            this.delayExecuteUpdate();
        }
        static delayExecuteUpdate() {
            if (this.delayExecuteFun.length == 0)
                return;
            for (let i = 0; i < this.delayExecuteFun.length;) {
                this.delayExecuteFun[i].frame--;
                if (this.delayExecuteFun[i].frame <= 0) {
                    this.delayExecuteFun[i].fun();
                    this.delayExecuteFun.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
    }

    var NetManager_1;
    exports.NetManager = NetManager_1 = class NetManager {
        static _instance;
        static get instance() {
            if (NetManager_1._instance == null) {
                NetManager_1._instance = new NetManager_1();
            }
            return NetManager_1._instance;
        }
        constructor() { }
        static init() {
            this.instance.init();
        }
        destroy() {
            NetManager_1._instance = null;
        }
        ASK = "Ask";
        REPLY = "Reply";
        NOTIFY = "Notify";
        NO_REPLY = "No_Reply";
        _logVisible = true;
        funMap = new Map(); //注册的方法
        objFunMap = new Map(); //注册的对象的方法
        objMap = new Map(); //对远端开放调用的对象<netGuid, obj>
        waitServerResolveMap = new Map();
        noReplyFunNameMap = new Map();
        _currentPlayer;
        _rpcCount = 0;
        /**是否显示通信log */
        set logVisible(value) {
            this._logVisible = value;
        }
        /**当前调用服务器方法的玩家*/
        get currentPlayer() {
            return this._currentPlayer;
        }
        /**发送和接收的rpc总数量*/
        get rpcCount() {
            return this._rpcCount;
        }
        /**初始化(框架方法，请勿调用) */
        init() {
            if (GamePlay__default$1["default"].isClient()) {
                Events__default$1["default"].addServerListener(this.NO_REPLY, (funName) => {
                    this.showLog(`[NoReply]      ${funName}`);
                    if (this.waitServerResolveMap.has(funName)) {
                        let waitResolveArr = this.waitServerResolveMap.get(funName);
                        while (waitResolveArr.length > 0) {
                            let resolve = this.waitServerResolveMap.get(funName).shift();
                            resolve(null);
                        }
                        this.waitServerResolveMap.delete(funName);
                        this.noReplyFunNameMap.set(funName, true);
                    }
                    else {
                        oTraceError("NetObject(Client Reply): Function is not found. fun=" + funName);
                    }
                });
                Events__default$1["default"].addServerListener(this.REPLY, (funName, res) => {
                    this.showLog(`[Reply]      ${funName}`);
                    if (this.waitServerResolveMap.has(funName) && this.waitServerResolveMap.get(funName).length > 0) {
                        let resolve = this.waitServerResolveMap.get(funName).shift();
                        resolve(res);
                    }
                    else {
                        oTraceError("NetObject(Client Reply): Function is not found. fun=" + funName);
                    }
                });
                Events__default$1["default"].addServerListener(this.NOTIFY, (funName, ...params) => {
                    this.showLog(`[Notify]     ${funName}`);
                    let fun = this.getFunction(funName);
                    if (fun != null) {
                        fun.call(...params);
                    }
                    else {
                        oTraceError("NetObject(Client Notify): Function is not found. fun=" + funName);
                    }
                });
            }
            if (GamePlay__default$1["default"].isServer()) {
                Events__default$1["default"].addClientListener(this.ASK, (player, funName, ...params) => {
                    this.showLog(`   [Ask]       ${funName}`);
                    let fun = this.getFunction(funName);
                    if (fun != null) {
                        this._currentPlayer = player;
                        params.push(player);
                        let res = fun.call(...params);
                        this._currentPlayer = null;
                        if (fun[this.NO_REPLY] != null) { //不用返回值
                            if (!this.noReplyFunNameMap.has(funName)) {
                                this.noReplyFunNameMap.set(funName, true);
                                this.showLog(`[NoReply]      ${funName}`);
                                Events__default$1["default"].dispatchToClient(player, this.NO_REPLY, funName); //告诉客户端这个方法下次别监听了
                            }
                        }
                        else if (res instanceof Promise) {
                            res.then((result) => {
                                this.showLog(`[Reply]      ${funName}`);
                                Events__default$1["default"].dispatchToClient(player, this.REPLY, funName, result);
                            });
                        }
                        else {
                            this.showLog(`[Reply]      ${funName}`);
                            Events__default$1["default"].dispatchToClient(player, this.REPLY, funName, res);
                        }
                    }
                    else {
                        oTraceError("NetObject(Server Ask): Function is not found. fun=" + funName);
                    }
                });
            }
        }
        /**
         * 注册网络方法(网络方法是可以被远端调用的， 注意：注册的方法名不能重复)
         * @param fun 方法
         * @param thisArg 方法的域
         * @param callName 调用别名(默认为方法名)
         */
        registerFun(fun, thisArg, callName = null) {
            if (callName == null) {
                callName = fun.name;
            }
            if (!this.funMap.has(callName)) {
                let callback = new CallBack(fun, thisArg);
                this.funMap.set(callName, callback);
            }
            else {
                oTraceError("Repeated NET Function! funName=" + fun.name + " callName=" + callName);
            }
        }
        /**
         * 移除注册的网络方法
         * @param fun 方法
         */
        unRegisterFun(fun) {
            for (let [callName, callBack] of this.funMap) {
                if (callBack.originFun == fun) {
                    this.funMap.delete(callName);
                    return;
                }
            }
        }
        /**
         * 注册网络对象(网络对象里的方法都是可以被远端调用的)
         * @param netObj 网络对象
         * @param netGuid 通信id
         */
        registerObj(netObj, netGuid) {
            oTrace('Register NET Object! netGuid=' + netGuid);
            if (netGuid == null) {
                oTraceError("Register NET Obj Error! netGuid Is Null!");
            }
            else if (!this.objMap.has(netGuid)) {
                this.objMap.set(netGuid, netObj);
            }
            else {
                oTraceError("Register NET Obj Error! Repeated NET Guid! netGuid=" + netGuid);
            }
        }
        /**
         * 移除注册的网络对象
         * @param netObj 对象
         */
        unRegisterObj(netObj) {
            if (netObj == null)
                return;
            for (let [netGuid, obj] of this.objMap) {
                if (obj == netObj) {
                    this.objMap.delete(netGuid);
                    break;
                }
            }
            for (let [callName, callBack] of this.objFunMap) {
                if (callBack.originThisArg == netObj) {
                    this.funMap.delete(callName);
                    this.objFunMap.delete(callName);
                }
            }
        }
        /**
         * 调用服务端方法
         * @param fun 方法路径|方法
         * @param params 参数
         * @returns 服务端方法返回值(异步)
         */
        callServerFun(fun, ...params) {
            if (GamePlay__default$1["default"].isClient()) {
                let funName = (typeof fun === 'string') ? fun : fun.name;
                this.showLog(`   [Ask]        ${funName}`);
                if (this.noReplyFunNameMap.has(funName)) { //无需等待回值
                    Events__default$1["default"].dispatchToServer(this.ASK, funName, ...params);
                    return null;
                }
                else {
                    if (!this.waitServerResolveMap.has(funName)) {
                        this.waitServerResolveMap.set(funName, []);
                    }
                    return new Promise((resolve) => {
                        this.waitServerResolveMap.get(funName).push(resolve); //保存等待Reply的resolve
                        Events__default$1["default"].dispatchToServer(this.ASK, funName, ...params);
                    });
                }
            }
        }
        /**
         * 调用目标客户端的方法
         * @param player 目标玩家
         * @param fun 方法路径|方法
         * @param params 参数
         */
        callClientFun(player, fun, ...params) {
            if (GamePlay__default$1["default"].isServer()) {
                let funName = (typeof fun === 'string') ? fun : fun.name;
                this.showLog(`[Notify]   TargetCilent   ${funName}`);
                if (player instanceof GamePlay__default$1["default"].Player) {
                    Events__default$1["default"].dispatchToClient(player, this.NOTIFY, funName, ...params);
                }
                else {
                    Events__default$1["default"].dispatchToClient(GamePlay__default$1["default"].getPlayer(player), this.NOTIFY, funName, ...params);
                }
            }
        }
        /**
         * 调用目标玩家周围客户端的方法
         * @param fun 方法路径|方法
         * @param params 参数
         */
        callAroundClientFun(fun, ...params) {
            if (GamePlay__default$1["default"].isServer()) {
                let funName = (typeof fun === 'string') ? fun : fun.name;
                this.showLog(`[Notify]   AroundClient   ${funName}`);
                Events__default$1["default"].dispatchToAllClient(this.NOTIFY, funName, ...params);
            }
        }
        /**
         * 调用所有客户端的方法
         * @param fun 方法路径|方法
         * @param params 参数
         */
        callWorldClientFun(fun, ...params) {
            if (GamePlay__default$1["default"].isServer()) {
                let funName = (typeof fun === 'string') ? fun : fun.name;
                this.showLog(`[Notify]   WorldClient   ${funName}`);
                Events__default$1["default"].dispatchToAllRoomClient(this.NOTIFY, funName, ...params);
            }
        }
        //根据名称获取一个方法
        //funName可以是netGuid.FunName的形式
        getFunction(fun) {
            if (this.funMap.has(fun)) {
                return this.funMap.get(fun);
            }
            if (this.objFunMap.has(fun)) {
                return this.objFunMap.get(fun);
            }
            if (fun.includes('.')) {
                let strArr = fun.split('.');
                let netGuid = strArr[0];
                let funName = strArr[1];
                if (this.objMap.has(netGuid)) {
                    let obj = this.objMap.get(netGuid);
                    if (obj[funName] != null && typeof (obj[funName]) == "function") {
                        let callback = new CallBack(obj[funName], obj);
                        this.objFunMap.set(fun, callback);
                        return callback;
                    }
                }
            }
            return null;
        }
        //输出log
        showLog(content) {
            this._rpcCount++;
            if (!this._logVisible)
                return;
            oTraceWarning(content);
        }
    };
    exports.NetManager = NetManager_1 = __decorate([
        AutoInit
    ], exports.NetManager);

    exports.EffectPlayerType = void 0;
    (function (EffectPlayerType) {
        EffectPlayerType[EffectPlayerType["Pos"] = 1] = "Pos";
        EffectPlayerType[EffectPlayerType["Player"] = 2] = "Player";
        EffectPlayerType[EffectPlayerType["GameObject"] = 3] = "GameObject";
    })(exports.EffectPlayerType || (exports.EffectPlayerType = {}));
    class EffectData {
        static currentPlayId = 0;
        playId;
        resId;
        playType;
        loopNum;
        targetGoGuid;
        targetPlayerId;
        socketType;
        position;
        rotation;
        scale;
        constructor() {
        }
        /**
         * 获取在一个坐标播放特效的数据
         * @param resGuid 特效资源guid
         * @param position 坐标
         * @param loopNum 循环次数(0无限)
         * @param rotation 角度
         * @returns 特效播放数据
         */
        static getPlayInPos(resGuid, position, loopNum, rotation, scale) {
            let data = new EffectData();
            data.playId = EffectData.getNewPlayId();
            data.playType = exports.EffectPlayerType.Pos;
            data.resId = resGuid;
            data.position = position != null ? position : Type__default$1["default"].Vector.zero;
            data.loopNum = loopNum;
            data.rotation = rotation != null ? rotation : Type__default$1["default"].Rotation.zero;
            data.scale = scale != null ? scale : Type__default$1["default"].Vector.one;
            return data;
        }
        static getPlayInPlayer(resGuid, player, socketType, loopNum, offset, rotation, scale) {
            let data = new EffectData();
            data.playId = EffectData.getNewPlayId();
            data.playType = exports.EffectPlayerType.Player;
            data.resId = resGuid;
            data.position = offset != null ? offset : Type__default$1["default"].Vector.zero;
            data.loopNum = loopNum;
            data.rotation = rotation != null ? rotation : Type__default$1["default"].Rotation.zero;
            data.scale = scale != null ? scale : Type__default$1["default"].Vector.one;
            data.targetPlayerId = player.getPlayerID();
            data.socketType = socketType;
            return data;
        }
        static getPlayInGameObject(resGuid, target, loopNum = 1, offset, rotation, scale) {
            let data = new EffectData();
            data.playId = EffectData.getNewPlayId();
            data.playType = exports.EffectPlayerType.GameObject;
            data.resId = resGuid;
            data.position = offset != null ? offset : Type__default$1["default"].Vector.zero;
            data.loopNum = loopNum;
            data.rotation = rotation != null ? rotation : Type__default$1["default"].Rotation.zero;
            data.scale = scale != null ? scale : Type__default$1["default"].Vector.one;
            data.targetGoGuid = target.guid;
            return data;
        }
        /**
         * 判断数据依赖的对象是否就绪
         * @param data 特效数据
         * @returns 是否就绪
         */
        static isReady(data) {
            if (data.playType == exports.EffectPlayerType.Pos)
                return true;
            if (data.playType == exports.EffectPlayerType.GameObject)
                return MWCore__default$1["default"].GameObject.find(data.targetGoGuid) != null;
            if (data.playType == exports.EffectPlayerType.Player)
                return GamePlay__default$1["default"].GetPlayer(data.targetPlayerId) != null;
            return false;
        }
        /**
         * 判断一个特效数据是否依赖某个目标
         * @param effData 特效数据
         * @param targetId 目标id（GameObject的guid | 玩家的playerId）
         * @returns 是否依赖
         */
        static effIsDepend(effData, targetId) {
            if (effData.playType == exports.EffectPlayerType.Pos) {
                return targetId == null;
            }
            return effData.targetGoGuid == targetId || effData.targetPlayerId == targetId;
        }
        //生成一个新的播放id
        static getNewPlayId() {
            if (GamePlay__default$1["default"].isClient())
                return --this.currentPlayId;
            return ++this.currentPlayId;
        }
    }

    /**特效 */
    class Effect {
        _resId; //没什么实际意义，就是自定义的名字
        go;
        effectData; //特效的播放数据
        isWaitParent; //是否在等待将要依附的父节点
        startPlayTime = 0; //开始播放的时间(时间戳：秒)
        _isDone = true;
        loopTime = 0; //循环时长
        /**
         * 构造
         * @param resId 资源id
         */
        constructor(resId) {
            this._resId = resId;
            if (GamePlay__default$1["default"].isClient()) {
                if (resId != null) {
                    let go = null;
                    if (Effect.isAssetId(this.resId)) {
                        go = MWCore__default$1["default"].GameObject.spawnGameObject(resId);
                    }
                    else {
                        go = MWCore__default$1["default"].GameObject.find(resId);
                        go.setVisibility(Type__default$1["default"].PropertyStatus.On);
                    }
                    if (go != null) {
                        this.init(go);
                    }
                    else {
                        oTraceError("Effect: Creat effect fail! resId=" + resId);
                    }
                }
            }
            else {
                oTraceError("Effect: Cant't creat effect on server!");
            }
        }
        //判断自己的id是否是资源id（如果是，说是从库里出来的，如果不是，说明是从场景里找的）
        static isAssetId(id) {
            return id.length < 10;
        }
        init(go) {
            this.go = go;
            this.go.stop();
            return this;
        }
        /**
         * 播放
         * @param data 播放的数据
         * @returns 播放的唯一标识
         */
        play(data) {
            this._isDone = false;
            this.go.stop();
            this.effectData = data;
            this.startPlayTime = TimeUtil.time;
            if (this.effectData.loopNum <= 0) { //无限循环 | 时间循环
                this.go.setLoop(true);
            }
            else { //次数循环
                this.go.setLoop(false);
                this.go.setLoopCount(this.effectData.loopNum);
            }
            this.playHandle();
            return data.playId;
        }
        playHandle() {
            this.isWaitParent = !EffectData.isReady(this.effectData);
            if (this.isWaitParent)
                return;
            switch (this.effectData.playType) {
                case exports.EffectPlayerType.GameObject:
                    let target = MWCore__default$1["default"].GameObject.find(this.effectData.targetGoGuid);
                    this.go.attachToGameObject(target);
                    break;
                case exports.EffectPlayerType.Player:
                    let player = GamePlay__default$1["default"].getPlayer(this.effectData.targetPlayerId);
                    player.character.attachGameObjectToCharacter(this.go, this.effectData.socketType);
                    break;
                case exports.EffectPlayerType.Pos:
                    this.go.detachFromGameObject();
                    break;
            }
            this.go.play(() => {
                this._isDone = true;
            });
            this.go.setRelativeLocation(this.effectData.position);
            this.go.setRelativeRotation(this.effectData.rotation);
            this.go.scale = this.effectData.scale;
        }
        /**
         * 是否依赖一个对象
         * @param targetId gameObejct的guid|player的playerId
         * @returns 结果
         */
        isDepend(targetId) {
            return EffectData.effIsDepend(this.effectData, targetId);
        }
        /**停止*/
        stop() {
            this.go.detachFromGameObject();
            this.go.stop();
            this._isDone = true;
        }
        /**编辑器特效对象 */
        get mwEffect() {
            return this.go;
        }
        /**播放的唯一标识 */
        get playId() {
            return this.effectData.playId;
        }
        /**资源id*/
        get resId() {
            return this._resId;
        }
        /**是否播放完成*/
        get isDone() {
            return this._isDone;
            //return TimeUtil.time - this.startPlayTime >= this.totalPlayerTime;
        }
        /**
         * 刷新(架构方法请勿调用)
         * @returns 是否播放完成
         */
        update(dt) {
            if (this.isDone)
                return true;
            if (this.isWaitParent) {
                if (TimeUtil.time - this.startPlayTime > 10) { //10秒找不到宿主就停止吧
                    this.stop();
                }
                else {
                    this.playHandle();
                }
            }
            else if (this.effectData.loopNum < 0) { //按时间循环
                this.effectData.loopNum += dt;
                if (this.effectData.loopNum >= 0) {
                    this.stop();
                }
            }
            return false;
        }
        /**
         * 克隆
         * @returns 克隆的新对象
         */
        clone() {
            let go = this.go.clone();
            let effect = new Effect(null);
            effect._resId = this._resId;
            return effect.init(go);
        }
    }

    var EffectManager_1;
    /**特效管理类 */
    //@Singleton()
    exports.EffectManager = EffectManager_1 = class EffectManager {
        // public static instance: EffectManager;
        // public constructor() { }
        // public destroy() {
        //     EffectManager.instance = null;
        // }
        static _instance;
        static get instance() {
            if (EffectManager_1._instance == null) {
                EffectManager_1._instance = new EffectManager_1();
            }
            return EffectManager_1._instance;
        }
        constructor() { }
        static init() {
            this.instance.init();
        }
        destroy() {
            EffectManager_1._instance = null;
        }
        effectMap = new Map(); //原始的特效 <guid, Effect>
        pool = new Map(); //<guid, [Effect,...]>
        playingEffectArr = []; //当前处于播放状态的特效
        playingEffectMap = new Map(); //当前处于播放状态的特效<objId, Effect>
        loopEffectDataOnServer = new Map(); //<playID, EffectData>
        /**初始化(框架方法，请勿调用) */
        init() {
            if (isListenServer()) {
                TimeUtil.onEnterFrame.add(this.update, this);
            }
            else if (GamePlay__default$1["default"].isClient()) {
                TimeUtil.onEnterFrame.add(this.update, this);
                exports.NetManager.instance.registerFun(this.playEffect, this);
                exports.NetManager.instance.registerFun(this.stopEffect, this);
                exports.NetManager.instance.registerFun(this.stopAllEffect, this);
                exports.NetManager.instance.registerFun(this.stopEffectFromHost_Executor, this);
                //刚上线的时候，向服务器要当前循环播放的特效
                exports.NetManager.instance.callServerFun("getLoopEffect").then((dataArr) => {
                    dataArr.forEach((effData) => {
                        this.playEffect(effData);
                    });
                });
            }
            else {
                exports.NetManager.instance.registerFun(() => {
                    return this.loopEffectDataOnServer;
                }, this, "getLoopEffect");
            }
        }
        playEffect(data) {
            if (GamePlay__default$1["default"].isClient()) {
                let effect = this.spawnEffect(data.resId);
                if (effect == null)
                    return 0;
                effect.play(data);
                this.playingEffectArr.push(effect);
                this.playingEffectMap.set(data.playId, effect);
            }
            else {
                if (data.loopNum <= 0) {
                    this.loopEffectDataOnServer.set(data.playId, data);
                }
                exports.NetManager.instance.callWorldClientFun(this.playEffect, data);
            }
            return data.playId;
        }
        /**
         * 在一个角色的挂点上播放特效（可双端调用)
         * @param resId 特效资源id
         * @param player 玩家
         * @param socketType 挂点类型
         * @param loopNum 循环次数(0为无限)
         * @param offset 坐标偏移
         * @param rotation 角度
         * @param scale 缩放
         * @returns 本次播放的唯一标识，可用于停止
         */
        playEffectInPlayer(resId, player, socketType, loopNum = 1, offset = Type__default$1["default"].Vector.zero, rotation = null, scale = null) {
            let effectData = EffectData.getPlayInPlayer(resId, player, socketType, loopNum, offset, rotation, scale);
            return this.playEffect(effectData);
        }
        /**
         * 在一个GameObject上播放特效（可双端调用)
         * @param resId 特效资源id
         * @param target 目标GameObject | 目标GameObject的guid
         * @param loopNum 循环次数(0为无限)
         * @param offset 坐标偏移
         * @param rotation 角度
         * @param scale 缩放
         * @returns 本次播放的唯一标识，可用于停止
         */
        playEffectInGameObject(resId, target, loopNum = 1, offset = Type__default$1["default"].Vector.zero, rotation = null, scale = null) {
            let effectData = EffectData.getPlayInGameObject(resId, target, loopNum, offset, rotation, scale);
            return this.playEffect(effectData);
        }
        /**
         * 在一个坐标上播放特效（可双端调用)
         * @param resId 特效资源id
         * @param pos 世界坐标
         * @param loopNum 循环次数(0为无限)
         * @param rotation 角度
         * @param scale 缩放
         * @returns 本次播放的唯一标识，可用于停止
         */
        playEffectInPos(resId, pos, loopNum = 1, rotation = null, scale = null) {
            let effectData = EffectData.getPlayInPos(resId, pos, loopNum, rotation, scale);
            return this.playEffect(effectData);
        }
        /**
         * 停止目标对象上所有资源id的特效（可双端调用)
         * @param resId 特效资源id
         * @param target 目标对象(Player或者GameObject)
         */
        stopEffectFromHost(resId, target) {
            let hostId = null;
            if (target != null) {
                if (target instanceof GamePlay__default$1["default"].Player) {
                    hostId = target.getPlayerID();
                }
                else if (target instanceof MWCore__default$1["default"].GameObject) {
                    hostId = target.guid;
                }
            }
            this.stopEffectFromHost_Executor(resId, hostId);
        }
        stopEffectFromHost_Executor(resId, hostId) {
            if (GamePlay__default$1["default"].isClient()) {
                for (let i = 0; i < this.playingEffectArr.length; i++) {
                    if (this.playingEffectArr[i].resId == resId && this.playingEffectArr[i].isDepend(hostId)) {
                        this.playingEffectArr[i].stop();
                    }
                }
            }
            else {
                for (let [objId, effData] of this.loopEffectDataOnServer) {
                    if (effData.resId == resId && EffectData.effIsDepend(effData, hostId)) {
                        this.loopEffectDataOnServer.delete(objId);
                    }
                }
                exports.NetManager.instance.callWorldClientFun(this.stopEffectFromHost_Executor, resId, hostId);
            }
        }
        /**
         * 停止一个特效的播放（可双端调用)
         * @param playId 播放id
         */
        stopEffect(playId) {
            if (playId == 0)
                return;
            if (GamePlay__default$1["default"].isClient()) {
                let effect = this.getEffect(playId);
                if (effect != null)
                    effect.stop();
                //else oTraceError("EffectManager: No effect found to stop! objId = " + objId);
            }
            else {
                if (this.loopEffectDataOnServer.has(playId)) {
                    this.loopEffectDataOnServer.delete(playId);
                }
                exports.NetManager.instance.callWorldClientFun(this.stopEffect, playId);
            }
        }
        /**停止所有特效 */
        stopAllEffect() {
            if (GamePlay__default$1["default"].isClient()) {
                for (let i = 0; i < this.playingEffectArr.length; i++) {
                    let effect = this.playingEffectArr[i];
                    effect.stop();
                    this.returnEffect(effect);
                }
                this.playingEffectArr.length = 0;
                this.playingEffectMap.clear();
            }
            else {
                this.loopEffectDataOnServer.clear();
                exports.NetManager.instance.callWorldClientFun(this.stopAllEffect);
            }
        }
        /**
         * 根据播放id获取特效
         * @param playId 播放id
         * @returns 特效
         */
        getEffect(playId) {
            if (GamePlay__default$1["default"].isClient() && this.playingEffectMap.has(playId))
                return this.playingEffectMap.get(playId);
        }
        update(dt) {
            for (let i = 0; i < this.playingEffectArr.length;) {
                let effect = this.playingEffectArr[i];
                if (effect.update(dt)) {
                    this.returnEffect(effect);
                    this.playingEffectArr.splice(i, 1);
                    this.playingEffectMap.delete(effect.playId);
                }
                else {
                    i++;
                }
            }
        }
        //孵化一个特效
        spawnEffect(resId) {
            if (!this.effectMap.has(resId)) {
                let effect = new Effect(resId);
                if (effect.mwEffect == null)
                    return null;
                this.effectMap.set(resId, effect);
            }
            if (!this.pool.has(resId)) {
                this.pool.set(resId, []);
            }
            let effect = null;
            if (this.pool.get(resId).length == 0) {
                effect = this.effectMap.get(resId).clone();
            }
            else {
                effect = this.pool.get(resId).shift();
            }
            return effect;
        }
        //归还一个特效
        returnEffect(effect) {
            if (effect == null || !this.pool.has(effect.resId))
                return;
            effect.stop();
            this.pool.get(effect.resId).push(effect);
        }
    };
    exports.EffectManager = EffectManager_1 = __decorate([
        AutoInit
    ], exports.EffectManager);

    /**字符串工具*/
    class StringUtil {
        /**
         * 判断字符串是否为空(null或"")
         * @param str 要判断的字符串
         * @returns 结果
         */
        static isEmpty(str) {
            return str == null || str.length == 0;
        }
        /**
         * 将{i}中的内容依次替换为后续参数,i从0开始
         * @param str 要处理的字符串
         * @param param 替换序列
         * @returns 新的字符串
         */
        static format(str, ...param) {
            if (param == null || param.length == 0) {
                return str;
            }
            for (let i = 0; i < param.length; i++) {
                str = str.replace(`{${i}}`, param[i]);
            }
            return str;
        }
        /**
         * 将秒数转换为时分秒的形式
         * @param second 秒数
         * @param style 字符串样式默认为,默认为"{0}:{1}:{2}"
         * @returns 转化后的字符串
         */
        static secondToHMS(second, style = "{0}:{1}:{2}") {
            if (second < 0)
                second = 0;
            let h = Math.floor(second / 3600);
            second %= 3600;
            let m = Math.floor(second / 60);
            let s = second % 60;
            return this.format(style, h < 10 ? `0${h}` : h, m < 10 ? `0${m}` : m, s < 10 ? `0${s}` : s);
        }
    }

    //网络对象
    class NetObject {
        _netGuid = null;
        _friendNetGuid = null;
        constructor(netGuid, friendNetGuid) {
            this._netGuid = netGuid;
            this._friendNetGuid = friendNetGuid;
        }
        get friendNetGuid() {
            return this._friendNetGuid;
        }
        get netGuid() {
            return this._netGuid;
        }
        /**
         * 将自己注册到Net上，可供远端调用
         */
        registerToNet() {
            if (this._netGuid != null) {
                exports.NetManager.instance.registerObj(this, this._netGuid);
            }
            else {
                oTraceError("NetObject->registerToNet: error guid=" + this._netGuid);
            }
        }
    }

    //客户端的网络对象
    class NetObjectC extends NetObject {
        _server;
        netFunNameMap = new Map(); //因为方法被替换过 名字丢了 所以要记录一下
        /**
         * 构造
         * @param netGuid 通信id
         * @param ServerClass 服务端类
         * @param autoRegisterToNet 是否自动注册到网络
         */
        constructor(netGuid, ServerClass, autoRegisterToNet = true, friendNetGuid = null) {
            super(netGuid, friendNetGuid);
            if (ServerClass != null) { //避免循环构造
                this._server = new ServerClass();
                this.serverClassToCallHandler();
            }
            if (autoRegisterToNet && netGuid != null)
                this.registerToNet();
        }
        //服务器类转换为客户端调用的工具
        serverClassToCallHandler() {
            this.replaceNetFun(this.server, true);
            if (this.server["__proto__"] != null) { //基类
                this.replaceNetFun(this.server["__proto__"], false);
            }
        }
        //替换NET方法
        replaceNetFun(obj, deleteOther) {
            let prototype = Object.getPrototypeOf(obj);
            let funNames = Reflect.ownKeys(prototype);
            for (let i = 0; i < funNames.length; i++) {
                let funName = funNames[i].toString();
                if (funName.startsWith('net_') && typeof obj[funName] === 'function') {
                    let fun = this.creatCallServerFun(funName);
                    this.server[funName] = fun;
                    this.netFunNameMap.set(fun, funName);
                }
                else if (deleteOther) {
                    delete this.server[funName];
                }
            }
        }
        //生成可以供客户端调用的方法
        creatCallServerFun(funName) {
            return (...prames) => {
                return exports.NetManager.instance.callServerFun(`${this.friendNetGuid}.${funName}`, ...prames);
            };
        }
        /**
         * 调用服务端方法
         * @param fun 服务端方法名|服务端方法对象
         * @param prames 参数
         * @returns 方法返回值
         */
        async callServerFun(fun, ...prames) {
            if (fun == null)
                return;
            let funName;
            if (fun instanceof Function) {
                if (StringUtil.isEmpty(fun.name)) {
                    funName = this.netFunNameMap.get(fun);
                }
                else {
                    funName = fun.name;
                }
            }
            else {
                funName = fun;
            }
            let res = await exports.NetManager.instance.callServerFun(`${this.friendNetGuid}.${funName}`, ...prames);
            return res;
        }
        /**
         * 和自己绑定的服务端对象，可通过此对象直接调用net_开头的服务端方法
         */
        get server() {
            return this._server;
        }
        /**获取当前玩家*/
        get currentPlayer() {
            return GamePlay__default$1["default"].getCurrentPlayer();
        }
        /**获取当前玩家id*/
        get currentPlayerId() {
            return GamePlay__default$1["default"].getCurrentPlayer().getPlayerID();
        }
    }

    class ModuleC extends NetObjectC {
        ModuleDataClass;
        /**
         * 构造(不要手动构造模块，请在GameStart中注册)
         * @param ServerModuleClass 模块服务端类
         * @param ModuleDataClass 模块数据类
         * @param netGuid 通信id
         */
        constructor(ServerModuleClass, ModuleDataClass, netGuid, serverNetGuid) {
            super(netGuid, ServerModuleClass, false, serverNetGuid);
            this.ModuleDataClass = ModuleDataClass;
        }
        /**获取模块数据*/
        get data() {
            return DataCenterC.instance.getModuleData(this.ModuleDataClass);
        }
        /**创建调用*/
        onAwake() { }
        /**开始调用*/
        onStart() { }
        /**进入场景调用*/
        onEnterScene(sceneType) { }
        /**刷新调用*/
        onUpdate(dt) { }
        /**销毁调用*/
        onDestroy() { }
        /**
         * 外部调用本模块的某个操作
         * @type type 操作类型
         * @param param 参数
         */
        execute(type, param) { }
        /**预加载资源 */
        async onRreloadAsset(sceneType) { return null; }
    }

    //服务器端的网络对象
    class NetObjectS extends NetObject {
        _client;
        netFunNameMap = new Map(); //因为方法被替换过 名字丢了 所以要记录一下
        callClientObj = { funName: null, params: null };
        /**
         * 构造
         * @param netGuid 通信id
         * @param ClientClass 客户端类
         * @param autoRegister 是否自动注册
         */
        constructor(netGuid, ClientClass, autoRegister = true, friendNetGuid = null) {
            super(netGuid, friendNetGuid);
            if (ClientClass != null) { //避免循环构造
                this._client = new ClientClass();
                this.clientClassToCallHandler();
            }
            if (autoRegister && netGuid != null)
                this.registerToNet();
        }
        //客户端类转换为客户端调用的工具
        clientClassToCallHandler() {
            this.replaceNetFun(this.client, true);
            if (this.client["__proto__"] != null) {
                this.replaceNetFun(this.client["__proto__"], false);
            }
        }
        //替换NET方法
        replaceNetFun(obj, deleteOther) {
            let prototype = Object.getPrototypeOf(obj);
            let funNames = Reflect.ownKeys(prototype);
            for (let i = 0; i < funNames.length; i++) {
                let funName = funNames[i].toString();
                if (funName.startsWith('net_') && typeof obj[funName] === 'function') {
                    let fun = this.getCallClientFun(funName);
                    this.client[funName] = fun;
                    this.netFunNameMap.set(fun, funName);
                }
                else if (deleteOther) {
                    delete obj[funName];
                }
            }
        }
        //将客户端类的方法转换为傀儡方法
        getCallClientFun(funName) {
            return (...params) => {
                this.callClientObj.funName = funName;
                this.callClientObj.params = params;
            };
        }
        /**
         * 和自己绑定的客户端对象，可通过此对象直接调用net_开头的客户端方法
         */
        get client() {
            return this._client;
        }
        /** 当前调用服务器方法的玩家 */
        get currentPlayer() {
            return exports.NetManager.instance.currentPlayer;
        }
        /** 当前调用服务器方法的玩家ID */
        get currentPlayerId() {
            if (this.currentPlayer == null)
                return 0;
            return this.currentPlayer.getPlayerID();
        }
        /**
         * 调用目标客户端的方法
         * @param player 目标客户端
         * @param fun 方法名|方法对象|方法调用结果
         * @param params 参数
         */
        callClientFun(player, fun, ...params) {
            this.setCallClientObj(fun, params);
            exports.NetManager.instance.callClientFun(player, `${this.friendNetGuid}.${this.callClientObj.funName}`, ...this.callClientObj.params);
        }
        /**
         * 调用目标周围客户端的方法
         * @param fun 方法名|方法对象|方法调用结果
         * @param params 参数
         */
        callAroundClientFun(fun, ...params) {
            this.setCallClientObj(fun, params);
            exports.NetManager.instance.callAroundClientFun(`${this.friendNetGuid}.${this.callClientObj.funName}`, ...this.callClientObj.params);
        }
        /**
         * 调用所有客户端的方法
         * @param fun 方法名|方法对象|方法调用结果
         * @param params 参数
         */
        callWorldClientFun(fun, ...params) {
            this.setCallClientObj(fun, params);
            exports.NetManager.instance.callWorldClientFun(`${this.friendNetGuid}.${this.callClientObj.funName}`, ...this.callClientObj.params);
        }
        //设置调用的各种参数
        setCallClientObj(fun, params) {
            if (fun == undefined)
                return;
            if (typeof fun === 'string') {
                this.callClientObj.funName = fun;
                this.callClientObj.params = params;
            }
            else if (fun instanceof Function) {
                if (StringUtil.isEmpty(fun.name)) {
                    this.callClientObj.funName = this.netFunNameMap.get(fun);
                }
                else {
                    this.callClientObj.funName = fun.name;
                }
                this.callClientObj.params = params;
            }
        }
    }

    class ModuleS extends NetObjectS {
        ModuleDataClass;
        /**
         * 构造(不要手动构造模块，请在GameStart中注册)
         * @param ClientModuleClass 模块客户端类
         * @param ModuleDataClass 模块数据类
         * @param netGuid 通信id
         */
        constructor(ClientModuleClass, ModuleDataClass, netGuid, clientNetGuid) {
            super(netGuid, ClientModuleClass, true, clientNetGuid);
            this.ModuleDataClass = ModuleDataClass;
        }
        /** 获取当前请求玩家的本模块数据控制*/
        get currentData() {
            let platerData = DataCenterS.instance.getPlayerData(this.currentPlayer);
            if (platerData != null) {
                return platerData.getModuleData(this.ModuleDataClass);
            }
            return null;
        }
        /**进入游戏的玩家字典*/
        get enterGamePlayerMap() {
            return ModuleManager.instance["inGamePlayerMap"];
        }
        /**
         * 获取玩家的本模块数据
         * @param player 目标玩家|目标玩家id
         * @returns 数据
         */
        getPlayerData(player) {
            return DataCenterS.instance.getPlayerData(player).getModuleData(this.ModuleDataClass);
        }
        /**创建调用*/
        onAwake() { }
        /**开始调用*/
        onStart() { }
        /**刷新调用*/
        onUpdate(dt) { }
        /**销毁调用*/
        onDestroy() { }
        /**执行操作*/
        execute(param, data) { }
        /**玩家进入房间*/
        onPlayerJoined(player) { }
        /**玩家离开房间*/
        onPlayerLeft(player) { }
        /**玩家进入游戏*/
        onPlayerEnterGame(player, reenter) { }
    }

    /**模块管理*/
    class ModuleManager {
        static _instance;
        static get instance() {
            if (ModuleManager._instance == null) {
                ModuleManager._instance = new ModuleManager();
            }
            return ModuleManager._instance;
        }
        destroy() {
            ModuleManager._instance = null;
        }
        moduleMapType;
        moduleArr;
        ClientFirstStartModule = null;
        inGamePlayerMap;
        constructor() {
            this.moduleMapType = new Map();
            this.moduleArr = [];
        }
        /**
         * 注册模块
         * @param ServerModule 模块的服务端类型
         * @param ClientModule 模块的客户端类型
         * @param ModuleDataClass 模块的数据类型
         */
        register(ServerModule, ClientModule, ModuleDataClass) {
            //let netGuid = `${ServerModule.name}_${ClientModule.name}`;
            if (GamePlay__default$1["default"].isServer()) {
                this.registerModule(ServerModule, ClientModule, ModuleDataClass, ServerModule.name, ClientModule.name);
            }
            if (GamePlay__default$1["default"].isClient()) {
                this.registerModule(ClientModule, ServerModule, ModuleDataClass, ClientModule.name, ServerModule.name);
            }
        }
        /**
         * 设置客户端第一个要启动的模块
         * @param ModuleClass 模块类
         */
        setClientFirstStartModule(ModuleClass) {
            if (GamePlay__default$1["default"].isClient()) {
                this.ClientFirstStartModule = ModuleClass;
            }
        }
        //注册模块
        registerModule(ModuleClass, FriendClass, ModuleDataClass, netGuid, friendNetGuid) {
            let muduleType = ModuleClass.name;
            if (this.moduleMapType.has(muduleType)) {
                oTraceError("Module is repetitive! ModuleName=" + muduleType); //模块重复注册
                return;
            }
            oTrace("RegisterModule! ModuleName=" + muduleType); //模块重复注册
            let module = new ModuleClass(FriendClass, ModuleDataClass, netGuid, friendNetGuid);
            this.moduleMapType.set(muduleType, module);
            //替换onStart方法
            let startModuleFun = module.onStart.bind(module);
            module.onStart = () => {
                if (startModuleFun != null) {
                    this.moduleArr.push(module);
                    startModuleFun();
                    startModuleFun = null;
                }
            };
        }
        /**
         * 根据类型获取一个模块
         * @param ModuleClass 模块类型
         * @returns 模块
         */
        getModule(ModuleClass) {
            let key = ModuleClass.name;
            if (this.moduleMapType.has(key)) {
                return this.moduleMapType.get(key);
            }
            return null;
        }
        //刷新
        update(dt) {
            for (let i = 0; i < this.moduleArr.length; i++) {
                this.moduleArr[i].onUpdate(dt);
            }
        }
        /**唤醒所有模块 */
        awakeAllModule(SuperClass) {
            this.forEachModule((moudle) => {
                moudle.onAwake();
            }, SuperClass);
        }
        /**启动所有模块 */
        startAllModule(SuperClass) {
            this.forEachModule((moudle) => {
                this.startModule(moudle);
            }, SuperClass);
            if (SuperClass == ModuleS) {
                this.inGamePlayerMap = new Map();
                DataCenterS.instance.onPlayerJoined.add((player) => {
                    this.forEachModule((moudle) => {
                        moudle["onPlayerJoined"](player);
                    });
                }, ModuleS);
                DataCenterS.instance.onPlayerLeft.add((player) => {
                    this.forEachModule((moudle) => {
                        moudle["onPlayerLeft"](player);
                        let playerId = player.getPlayerID();
                        this.inGamePlayerMap.delete(playerId);
                    }, ModuleS);
                });
                Events__default$1["default"].addClientListener("PlayerEnterGame", (player) => {
                    let playerId = player.getPlayerID();
                    let reenter = this.inGamePlayerMap.has(playerId); //断线重连重新进入
                    this.inGamePlayerMap.set(playerId, player); //每次都要重新设置，因为断线重连player对象会变
                    this.forEachModule((moudle) => {
                        moudle["onPlayerEnterGame"](player, reenter);
                    }, ModuleS);
                });
            }
            TimeUtil.onEnterFrame.add(this.update, this);
        }
        //启动一个模块
        startModule(module) {
            if (module instanceof ModuleC) {
                module.registerToNet();
            }
            module.onStart();
        }
        /**
         * 启动第一个模块
         */
        async startClientFirstModule() {
            if (this.ClientFirstStartModule == null)
                return;
            return new Promise((resolve) => {
                this.getModule(this.ClientFirstStartModule).onStart();
                this.execut(this.ClientFirstStartModule, 0, () => {
                    resolve();
                });
                this.ClientFirstStartModule = null;
            });
        }
        /**
         * 所有模块等待资源
         * @param sceneType 场景类型
         */
        async preloadAssetAllModule(sceneType) {
            for (let i = 0; i < this.moduleArr.length; i++) {
                if (this.moduleArr[i] instanceof ModuleC) {
                    await this.moduleArr[i]["onRreloadAsset"](sceneType);
                }
            }
        }
        /**
         * 所有模块模块进入场景
         * @param sceneType 场景类型
         */
        enterSceneAllModule(sceneType) {
            this.forEachModule((moudle) => {
                moudle["onEnterScene"]();
            }, ModuleC);
            Events__default$1["default"].dispatchToServer("PlayerEnterGame");
        }
        /**销毁所有模块 */
        destroyAllModule() {
            this.forEachModule((moudle) => {
                moudle.onDestroy();
            });
            TimeUtil.onEnterFrame.remove(this.update, this);
        }
        /**
         * 遍历所有模块
         * @param executer 每个模块执行的方法
         */
        forEachModule(executer, TypeFilter) {
            for (let [moudleType, moduleObj] of this.moduleMapType) {
                if (TypeFilter == null || moduleObj instanceof TypeFilter) {
                    executer(moduleObj);
                }
            }
        }
        /**
         * 调用一个模块的Excut方法
         * @param ModuleClass 模块
         * @param type 操作类型
         * @param param 参数
         * @returns 结果
         */
        execut(ModuleClass, type, param) {
            let module = this.getModule(ModuleClass);
            if (module == null) {
                oTraceError("execut module not find! module=" + ModuleClass.name);
                return null;
            }
            return module.execute(type, param);
        }
        async start(onModuleAwake, onFirstModuleStart, onAllModuleStart, onModulePreloadAssets, onModuleEnterScene) {
            if (onModuleAwake != null)
                onModuleAwake();
            ModuleManager.instance["awakeAllModule"](ModuleC);
            if (onFirstModuleStart != null)
                onFirstModuleStart();
            await ModuleManager.instance["startClientFirstModule"]();
            if (onAllModuleStart != null)
                onAllModuleStart();
            ModuleManager.instance["startAllModule"](ModuleC); //所有模块start
            if (onModulePreloadAssets != null)
                onModulePreloadAssets();
            await ModuleManager.instance["preloadAssetAllModule"](1);
            if (onModuleEnterScene != null)
                onModuleEnterScene();
            ModuleManager.instance["enterSceneAllModule"](1); //所有模块进入场景
        }
    }

    class Sound {
        static volumeScale = 1; //音乐和音量缩放
        static bgmVolumeScale = 1; //背景音乐音量缩放
        onComplete = new Action();
        playId; //唯一id
        targetGuid; //依附的GameObject的guid
        go;
        loopNum; //循环次数
        _resId;
        _isDone = true;
        _isError = false;
        _volume; //音量
        constructor(resId) {
            if (resId != null) {
                let go = MWCore__default$1["default"].GameObject.spawnGameObject(resId); //同步
                if (go == null) {
                    oTraceError("Sound: Build Sound Fild! resId=" + resId);
                    this._isError = true;
                    return;
                }
                this.init(go, resId);
            }
        }
        init(go, resId) {
            this._resId = resId;
            this.go = go;
            this.go.volumeMultiplier = 0;
            this.go.stopVoice();
            this.go.OnSoundFinishDelegate.add(() => {
                this.loopNum--;
                if (this.loopNum == 0) {
                    this.stop();
                    this.onComplete.call();
                }
            });
            return this;
        }
        play(loopNum = 1, volume = 1) {
            this.targetGuid = null;
            this.loopNum = loopNum;
            this.go.setAllowSpatializationAndUISoundAndLoop(false, true, loopNum == 0 || loopNum > 1);
            this.go.playVoice();
            this._isDone = false;
            this.volume = volume;
        }
        playInTarget(target, loopNum = 1, volume = 1) {
            this.targetGuid = target.guid;
            this.go.attachToGameObject(target);
            this.go.setRelativeLocation(Type__default$1["default"].Vector.ZERO);
            this.play3D(loopNum, volume);
        }
        playInPos(pos, loopNum = 1, volume = 1) {
            this.targetGuid = null;
            this.go.detachFromGameObject();
            this.go.location = pos;
            this.play3D(loopNum, volume);
        }
        play3D(loopNum, volume) {
            this.loopNum = loopNum;
            this.go.setAllowSpatializationAndUISoundAndLoop(true, false, loopNum == 0 || loopNum > 1);
            this.go.setSoundSphere(1000, 1, false, GamePlay__default$1["default"].MWAttenuationDistanceModel.Linear);
            this.go.playVoice();
            this._isDone = false;
            this.volume = volume;
        }
        stop() {
            this._isDone = true;
            this.clear();
        }
        clear() {
            this.go.detachFromGameObject();
            this.go.stopVoice();
            this.targetGuid = null;
            this.playId = 0;
        }
        set volume(value) {
            this._volume = value;
            this.go.volumeMultiplier = value * Sound.volumeScale;
        }
        get volume() {
            return this._volume;
        }
        get resId() {
            return this._resId;
        }
        get isDone() {
            return this._isDone;
        }
        get isError() {
            return this._isError;
        }
        clone() {
            let sound = new Sound(null);
            let go = this.go.clone();
            return sound.init(go, this._resId);
        }
    }

    var SoundManager_1;
    //声音管理
    //@Singleton()
    exports.SoundManager = SoundManager_1 = class SoundManager {
        // public static instance: SoundManager;
        // public constructor() { this.init(); }
        // public destroy() {
        //     SoundManager.instance = null;
        // }
        static _instance;
        static get instance() {
            if (SoundManager_1._instance == null) {
                SoundManager_1._instance = new SoundManager_1();
            }
            return SoundManager_1._instance;
        }
        constructor() { }
        static init() {
            this.instance.init();
        }
        destroy() {
            SoundManager_1._instance = null;
        }
        onPlaySoundComplete = new Action1(); //播放声音完成的委托
        currentPlayId = 0;
        soundMap = new Map(); //<guid, Sound> 源声音，对象池从这里取，UI声音只播放这一份
        pool = new Map(); //<guid, [sound, ...]>
        playingSound = [];
        bgm;
        //private SoundMa:number = 1;//服务器播放声音的标记，用于关闭声音
        init() {
            if (isListenServer()) {
                TimeUtil.onEnterFrame.add(this.update, this);
            }
            else if (GamePlay__default$1["default"].isClient()) {
                TimeUtil.onEnterFrame.add(this.update, this);
                exports.NetManager.instance.registerFun(this.playBGM, this);
                exports.NetManager.instance.registerFun(this.stopBGM, this);
                exports.NetManager.instance.registerFun(this.playSound, this);
                exports.NetManager.instance.registerFun(this.stopSound, this);
                exports.NetManager.instance.registerFun(this.net_play3DSoundHandle, this);
                exports.NetManager.instance.registerFun(this.stop3DSound, this);
                exports.NetManager.instance.registerFun(this.stopAllSound, this);
                exports.NetManager.instance.registerFun(this.stopAll3DSound, this);
            }
        }
        /**
         * 根据资源id播放声音（可双端调用，不可叠加)
         * @param resId 资源id
         * @param loopNum 循环次数(0无限)
         * @param volume 音量
         * @returns 资源id
         */
        playSound(resId, loopNum = 1, volume = 1) {
            if (GamePlay__default$1["default"].isClient()) {
                let sound = this.getSound(resId);
                if (sound != null) {
                    sound.play(loopNum, volume);
                }
            }
            else {
                exports.NetManager.instance.callWorldClientFun(this.playSound, resId, loopNum, volume);
            }
            return resId;
        }
        /**
         * 根据资源id停止声音
         * @param resId 资源id
         */
        stopSound(resId) {
            if (GamePlay__default$1["default"].isClient()) {
                let sound = this.getSound(resId, false);
                if (sound != null)
                    sound.stop();
            }
            else {
                exports.NetManager.instance.callWorldClientFun(this.stopSound, resId);
            }
        }
        /**
         * 停止除BGM以外的一切2D声音
         */
        stopAllSound() {
            if (GamePlay__default$1["default"].isClient()) {
                for (let [resId, sound] of this.soundMap) {
                    if (sound != this.bgm) {
                        sound.stop();
                    }
                }
            }
            else {
                exports.NetManager.instance.callWorldClientFun(this.stopAllSound);
            }
        }
        /**
         * 播放背景音乐（可双端调用)
         * @param resId 资源id
         * @param volume 音量
         */
        playBGM(resId, volume = 1) {
            if (GamePlay__default$1["default"].isClient()) {
                this.stopBGM();
                this.bgm = this.getSound(resId);
                if (this.bgm != null) {
                    let befor = Sound.volumeScale;
                    Sound.volumeScale = Sound.bgmVolumeScale;
                    this.bgm.play(0, volume);
                    Sound.volumeScale = befor;
                }
            }
            else {
                exports.NetManager.instance.callWorldClientFun(this.playBGM, resId, volume);
            }
        }
        /**
         * 停止背景音乐（可双端调用)
         */
        stopBGM() {
            if (GamePlay__default$1["default"].isClient()) {
                if (this.bgm != null) {
                    this.bgm.stop();
                    this.bgm = null;
                }
            }
            else {
                exports.NetManager.instance.callWorldClientFun(this.stopBGM);
            }
        }
        /**
         * 在目标播放3D音效（可双端调用)
         * @param resId 资源id
         * @param target 播放目标 (GameObject的guid | GameObject | 世界坐标)
         * @param loopNum 循环次数
         * @param volume 音量
         * @returns 播放id，播放声音的唯一标识，可用于停止声音
         */
        play3DSound(resId, target, loopNum = 1, volume = 1) {
            let playId = this.getNewPlayId();
            this.net_play3DSoundHandle(resId, target, loopNum, volume, playId);
            return playId;
        }
        net_play3DSoundHandle(resId, target, loopNum = 1, volume = 1, playId = 0) {
            if (GamePlay__default$1["default"].isClient()) {
                let sound = this.spawn3DSound(resId, playId);
                if (sound == null)
                    return null;
                if (target instanceof MWCore__default$1["default"].GameObject) {
                    sound.playInTarget(target, loopNum, volume);
                }
                else if (target instanceof Type__default$1["default"].Vector) {
                    sound.playInPos(target, loopNum, volume);
                }
                else {
                    target = MWCore__default$1["default"].GameObject.find(target);
                    if (target != null) {
                        sound.playInTarget(target, loopNum, volume);
                    }
                }
            }
            else {
                if (target instanceof MWCore__default$1["default"].GameObject)
                    exports.NetManager.instance.callWorldClientFun(this.net_play3DSoundHandle, resId, target.guid, loopNum, volume, playId);
                else
                    exports.NetManager.instance.callWorldClientFun(this.net_play3DSoundHandle, resId, target, loopNum, volume, playId);
            }
        }
        /**
         * 停止3D声音（可双端调用)
         * @param playId 播放id
         */
        stop3DSound(playId) {
            if (GamePlay__default$1["default"].isClient()) {
                let targetSound = this.playingSound.find((ele) => { return ele.playId == playId; });
                if (targetSound != null)
                    targetSound.stop();
            }
            else {
                exports.NetManager.instance.callWorldClientFun(this.stop3DSound, playId);
            }
        }
        /**
         * 停止一切3D声音（可双端调用)
         */
        stopAll3DSound() {
            if (GamePlay__default$1["default"].isClient()) {
                for (let i = 0; i < this.playingSound.length; i++) {
                    this.playingSound[i].stop();
                }
            }
            else {
                exports.NetManager.instance.callWorldClientFun(this.stopAll3DSound);
            }
        }
        /**
         * 音效的音量(Client Only)
         */
        set volumeScale(value) {
            if (GamePlay__default$1["default"].isClient()) {
                Sound.volumeScale = value;
                for (let i = 0; i < this.playingSound.length; i++) {
                    this.playingSound[i].volume = this.playingSound[i].volume;
                }
                for (let [name, sound] of this.soundMap) {
                    sound.volume = sound.volume;
                }
            }
        }
        /**
         * 音效的音量(Client Only)
         */
        get volumeScale() {
            if (GamePlay__default$1["default"].isClient())
                return Sound.volumeScale;
            return 0;
        }
        /**
         * BGM音量(Client Only)
         */
        set bgmVolumeScale(value) {
            if (GamePlay__default$1["default"].isClient()) {
                Sound.bgmVolumeScale = value;
                if (this.bgm != null) {
                    let befor = Sound.volumeScale;
                    Sound.volumeScale = Sound.bgmVolumeScale;
                    this.bgm.volume = this.bgm.volume;
                    Sound.volumeScale = befor;
                }
            }
        }
        /**
         * BGM音量(Client Only)
         */
        get bgmVolumeScale() {
            if (GamePlay__default$1["default"].isClient())
                return Sound.bgmVolumeScale;
            return 0;
        }
        update(dt) {
            for (let i = 0; i < this.playingSound.length;) {
                let sound = this.playingSound[i];
                if (sound.isDone) {
                    this.playingSound.splice(i, 1);
                    this.return3DSound(sound);
                    if (this.onPlaySoundComplete.count > 0) {
                        this.onPlaySoundComplete.call(sound.playId > 0 ? sound.playId : sound.resId);
                        this.onPlaySoundComplete.clear();
                    }
                }
                else {
                    i++;
                }
            }
        }
        //获取一个音效(如果没有，则创建)
        getSound(resId, creat = true) {
            if (!this.soundMap.has(resId)) {
                if (!creat)
                    return null;
                this.soundMap.set(resId, new Sound(resId));
            }
            let sound = this.soundMap.get(resId);
            if (sound.isError) {
                oTrace("There's something wrong with the sound! resId=" + resId);
                return null;
            }
            sound.playId = 0;
            return sound;
        }
        //孵化3D音效
        spawn3DSound(resId, playId) {
            if (!this.pool.has(resId)) {
                this.pool.set(resId, []);
            }
            let sound = null;
            if (this.pool.get(resId).length == 0) {
                sound = this.getSound(resId).clone();
            }
            else {
                sound = this.pool.get(resId).shift();
            }
            this.playingSound.push(sound);
            sound.playId = playId;
            return sound;
        }
        //归还3D音效
        return3DSound(sound) {
            if (sound == null || !this.pool.has(sound.resId))
                return;
            this.pool.get(sound.resId).push(sound);
        }
        //生成一个新的播放id
        getNewPlayId() {
            if (GamePlay__default$1["default"].isClient())
                return --this.currentPlayId;
            return ++this.currentPlayId;
        }
    };
    exports.SoundManager = SoundManager_1 = __decorate([
        AutoInit
    ], exports.SoundManager);

    //GameObject的节点结构
    class GoNode {
        name;
        guid;
        parentGuid;
        children;
        /**
         * 获取gameObject的节点树数据
         * @param go GameObject
         * @param ignoreServerOnly 忽略单Server的节点(用于客户端请求)
         * @returns 节点树数据
         */
        static get(go, ignoreServerOnly) {
            if (go == null)
                return null;
            let node = { name: go.name, guid: go.guid, parentGuid: go.parent == null ? null : go.parent.guid, children: [] };
            let children = go.getChildren();
            for (let i = 0; i < children.length; i++) {
                if (ignoreServerOnly && children[i].actor.GetNetStatus() == ue.ENetStatus.Server)
                    continue;
                let childNode = this.get(children[i], ignoreServerOnly);
                node.children.push(childNode);
            }
            return node;
        }
        /**
         * 根据名字获取节点的一个子节点
         * @param goNode 目标节点
         * @param name 名字
         * @returns 子节点
         */
        static getChildByName(goNode, name) {
            for (let i = 0; i < goNode.children.length; i++) {
                if (goNode.children[i].name == name) {
                    return goNode.children[i];
                }
            }
            return null;
        }
        /**
         * 根据名字获取节点的所有同名子节点
         * @param goNode 目标节点
         * @param name 名字
         * @returns 子节点序列
         */
        static getChildrenByName(goNode, name) {
            let arr = [];
            for (let i = 0; i < goNode.children.length; i++) {
                if (goNode.children[i].name == name) {
                    arr.push(goNode.children[i]);
                }
            }
            return arr;
        }
        /**
         * 根据guid获取节点的一个子节点
         * @param goNode 目标节点
         * @param guid guid
         * @returns 子节点
         */
        static getChildByGuid(goNode, guid) {
            for (let i = 0; i < goNode.children.length; i++) {
                if (goNode.children[i].guid == guid) {
                    return goNode.children[i];
                }
            }
            return null;
        }
        /**
         * 根据路径获取节点的一个子节点
         * @param goNode 目标节点
         * @param path 路径
         * @returns 子节点
         */
        static getChildByPath(goNode, path) {
            let arr = path.split('/');
            let currentNode = goNode;
            for (let i = 0; i < arr.length; i++) {
                currentNode = this.getChildByName(currentNode, arr[i]);
                if (currentNode == null)
                    return null;
                if (i == arr.length - 1)
                    return currentNode;
            }
        }
        /**
         * 获取节点某个路径下的所有子节点
         * @param goNode 目标节点
         * @param path 路径
         * @returns 子节点序列
         */
        static getChildrenByPath(goNode, path) {
            let arr = path.split('/');
            let currentNode = goNode;
            for (let i = 0; i < arr.length; i++) {
                if (i == arr.length - 1) {
                    return this.getChildrenByName(currentNode, arr[i]);
                }
                currentNode = this.getChildByName(currentNode, arr[i]);
                if (currentNode == null)
                    return null;
            }
        }
        /**
         * 生成节点的树形结构字符串
         * @param goNode 目标节点
         * @returns 树形字符串
         */
        static getString(goNode) {
            return this.getStringHandle(goNode, 0);
        }
        static getStringHandle(goNode, depth = 0) {
            let str = '\n';
            for (let i = 0; i < depth; i++) {
                str += "  ";
            }
            str += goNode.name;
            for (let i = 0; i < goNode.children.length; i++) {
                str += GoNode.getStringHandle(goNode.children[i], depth + 1);
            }
            return str;
        }
    }

    var ResManager_1;
    //@Singleton()
    exports.ResManager = ResManager_1 = class ResManager {
        // public static instance: ResManager;
        // public constructor() { }
        // public destroy() {
        //     ResManager.instance = null;
        // }
        static _instance;
        static get instance() {
            if (ResManager_1._instance == null) {
                ResManager_1._instance = new ResManager_1();
            }
            return ResManager_1._instance;
        }
        constructor() { }
        static init() {
            this.instance.init();
        }
        destroy() {
            ResManager_1._instance = null;
        }
        _isInit = false;
        /**
         * 初始化，不要私自调用
         */
        init() {
            if (this._isInit)
                return;
            this._isInit = true;
            if (GamePlay__default$1["default"].isServer()) {
                exports.NetManager.instance.registerFun(this.netServerGetGameObjectNodeTreeByPath, this);
                exports.NetManager.instance.registerFun(this.netServerGetGameObjectNodeTreeByGuid, this);
                exports.NetManager.instance.registerFun(this.netServerGetGameObjectGuid, this);
                exports.NetManager.instance.registerFun(this.getChildGuidFromGo, this);
                exports.NetManager.instance.registerFun(this.getScriptGuidFromGo, this);
                exports.NetManager.instance.registerFun(this.findChildFromGo, this);
                exports.NetManager.instance.registerFun(this.findScriptFromGo, this);
            }
        }
        /**
         * 获取一个GameObject的节点结构(异步，双端调用)
         * @param guid gameObject的guid
         * @returns 节点树结构
         */
        async loadGoNode(guid) {
            if (GamePlay__default$1["default"].isServer()) {
                return this.netServerGetGameObjectNodeTreeByGuid(guid, false);
            }
            else {
                let goNode = await exports.NetManager.instance.callServerFun(this.netServerGetGameObjectNodeTreeByGuid, guid, true);
                if (goNode == null)
                    return null;
                let res = await this.gameObjectIsOK(goNode);
                return res ? goNode : null;
            }
        }
        /**
         * 根据路径查找场景中一个GameObject(异步，双端调用)
         * @param path 节点路径
         * @param waitTime 等待时间(单位：毫秒)
         * @returns GameObject
         */
        async findGameObjectByPath(path, waitTime = 10000) {
            let guid;
            if (GamePlay__default$1["default"].isServer()) {
                guid = this.netServerGetGameObjectGuid(path);
            }
            else {
                guid = await exports.NetManager.instance.callServerFun(this.netServerGetGameObjectGuid, path);
            }
            if (guid == null)
                return null;
            return this.findGameObjectByGuid(guid, waitTime);
        }
        /**
         * 根据guid查找场景中一个GameObject(异步，双端调用)
         * @param guid guid
         * @param waitTime 等待时间(单位：毫秒)
         * @returns GameObject
         */
        async findGameObjectByGuid(guid, waitTime = 10000) {
            let go = MWCore__default$1["default"].GameObject.find(guid);
            if (go != null)
                return go;
            return new Promise((resolve) => {
                let tickTime = 100;
                let id = setInterval(() => {
                    go = MWCore__default$1["default"].GameObject.find(guid);
                    waitTime -= tickTime;
                    if (go != null || waitTime <= 0) {
                        clearInterval(id);
                        resolve(go);
                    }
                }, tickTime);
            });
        }
        /**
         * 根据guid查找场景中一个脚本(异步，双端调用)
         * @param guid guid
         * @param waitTime 等待时间(毫秒)
         * @returns 脚本
         */
        async findScriptByGuid(guid, waitTime = 10000) {
            let sp = MWCore__default$1["default"].MWScriptManager.findScript(guid);
            if (sp != null)
                return sp;
            return new Promise((resolve) => {
                let tickTime = 100;
                let id = setInterval(() => {
                    sp = MWCore__default$1["default"].MWScriptManager.findScript(guid);
                    waitTime -= tickTime;
                    if (sp != null || waitTime <= 0) {
                        clearInterval(id);
                        resolve(sp);
                    }
                }, tickTime);
            });
        }
        //等待GameObject的所有节点就绪
        async gameObjectIsOK(nodeTree) {
            return new Promise((resolve) => {
                let time = 0;
                let arr = [nodeTree];
                let id = setInterval(() => {
                    time += 100;
                    while (arr.length > 0) {
                        let node = arr[0];
                        let guid = node.guid;
                        let go = MWCore__default$1["default"].GameObject.find(guid);
                        if (go != null) {
                            for (let i = 0; node.children != null && i < node.children.length; i++) {
                                arr.push(node.children[i]);
                            }
                            arr.shift();
                        }
                        else {
                            break;
                        }
                    }
                    if (arr.length == 0) {
                        clearInterval(id);
                        resolve(true);
                    }
                    else if (time > 30000) { //找3秒（30次）,如果还是找不到就算了
                        clearInterval(id);
                        resolve(false);
                    }
                }, 100);
            });
        }
        //根据路径获取GameObject的节点数据(Only Server)
        netServerGetGameObjectNodeTreeByPath(path, ignoreServerOnly) {
            if (GamePlay__default$1["default"].isServer()) {
                let go = this.getMWGameObject(path);
                if (go == null)
                    return;
                return GoNode.get(go, ignoreServerOnly);
            }
        }
        //根据路径获取GameObject的节点数据(Only Server)
        netServerGetGameObjectNodeTreeByGuid(guid, ignoreServerOnly) {
            if (GamePlay__default$1["default"].isServer()) {
                let go = MWCore__default$1["default"].GameObject.find(guid);
                if (go == null)
                    return;
                return GoNode.get(go, ignoreServerOnly);
            }
        }
        //根据路径获取GameObject的GUID(Only Server)
        netServerGetGameObjectGuid(path) {
            if (!GamePlay__default$1["default"].isServer())
                return null;
            let go = this.getMWGameObject(path);
            if (go != null)
                return go.guid;
            return null;
        }
        //按路径获取GameObject(Only Server)
        getMWGameObject(path) {
            if (!GamePlay__default$1["default"].isServer())
                return null;
            if (path.indexOf('/') == -1) {
                let name = path;
                return this.getRootMWGameObject(name);
            }
            else {
                let pathCells = path.split('/');
                let name = pathCells.shift();
                let go = this.getRootMWGameObject(name);
                if (go == null) {
                    return null;
                }
                for (let i = 0; i < pathCells.length; i++) {
                    go = go.getChildByName(pathCells[i]);
                    if (go == null) {
                        return null;
                    }
                }
                return go;
            }
        }
        //获取根节点下的GameObject(Only Server)
        getRootMWGameObject(name) {
            let gos = MWCore__default$1["default"].GameObject.getGameObjectsByName(name);
            for (let i = 0; i < gos.length; i++) {
                if (gos[i].parent == null) {
                    return gos[i];
                }
            }
            return null;
        }
        /**
         * 从GameObject获取子对象的guid (异步，双端调用)
         * @param targetGo 目标gameObject
         * @param path 节点路径
         * @returns guid
         */
        async getChildGuidFromGo(targetGo, path) {
            if (StringUtil.isEmpty(path))
                return null;
            let targetGuid = this.getGoGuid(targetGo);
            if (GamePlay__default$1["default"].isClient()) {
                return await exports.NetManager.instance.callServerFun(this.getChildGuidFromGo, targetGuid, path);
            }
            let arr = path.split('/');
            const maxFindTimes = 10;
            let findTimes = maxFindTimes; //找的次数
            let i = -1; //需要先找到GameObject，所以是-1
            let go = null;
            if (targetGo instanceof MWCore__default$1["default"].GameObject) {
                go = targetGo;
                i = 0;
            }
            return new Promise((resolve) => {
                let id = setInterval(() => {
                    let findRes = null;
                    if (i == -1) {
                        findRes = MWCore__default$1["default"].GameObject.find(targetGuid);
                    }
                    else if (arr[i] == '..') {
                        findRes = go.parent;
                    }
                    else {
                        findRes = go.getChildByName(arr[i]);
                    }
                    if (findRes != null) {
                        go = findRes;
                        i++;
                        findTimes = maxFindTimes;
                    }
                    else {
                        findTimes--;
                        oTraceError("ResManager.getChildGameObjectGuid file!   path=" + path + "   times=" + (maxFindTimes - findTimes));
                    }
                    if (i >= arr.length || findTimes == 0) {
                        clearInterval(id);
                        resolve(findTimes == 0 ? null : go.guid);
                    }
                }, 300);
            });
        }
        //从一个GameObject中获取脚本的guid
        async getScriptGuidFromGo(targetGo, path) {
            if (StringUtil.isEmpty(path))
                return null;
            let targetGuid = this.getGoGuid(targetGo);
            if (GamePlay__default$1["default"].isClient()) {
                return await exports.NetManager.instance.callServerFun(this.getScriptGuidFromGo, targetGuid, path);
            }
            let arr = path.split('/');
            const maxFindTimes = 10;
            let findTimes = maxFindTimes; //找的次数
            let i = -1; //需要先找到GameObject，所以是-1
            let go = null;
            let sp = null;
            if (targetGo instanceof MWCore__default$1["default"].GameObject) {
                go = targetGo;
                i = 0;
            }
            return new Promise((resolve) => {
                let id = setInterval(() => {
                    let findRes = null;
                    if (i == arr.length - 1) {
                        if (arr[i].endsWith('.ts'))
                            sp = go.getScriptByName(arr[i]);
                        else
                            sp = go.getScriptByName(`${arr[i]}.ts`);
                    }
                    else if (i == -1) {
                        findRes = MWCore__default$1["default"].GameObject.find(targetGuid);
                    }
                    else if (arr[i] == '..') {
                        findRes = go.parent;
                    }
                    else {
                        findRes = go.getChildByName(arr[i]);
                    }
                    if (findRes != null) {
                        go = findRes;
                        i++;
                        findTimes = maxFindTimes;
                    }
                    else {
                        findTimes--;
                        oTraceError("ResManager.getChildScriptGuid file!   path=" + path + "   times=" + (maxFindTimes - findTimes));
                    }
                    if (sp != null || findTimes == 0) {
                        clearInterval(id);
                        resolve(findTimes == 0 ? null : sp.guid);
                    }
                }, 100);
            });
        }
        /**
         * 根据路径从GameObject中查找一个子GameObject (异步 双端)
         * @param targetGo 目标GameObject
         * @param path 路径
         * @returns 子GameObject
         */
        async findChildFromGo(targetGo, path) {
            let targetGuid = this.getGoGuid(targetGo);
            let guid = await this.getChildGuidFromGo(targetGuid, path);
            if (guid == null) {
                oTraceError("ResManager.findChild: findChild fail!   path=" + path);
                return null;
            }
            return this.findGameObjectByGuid(guid);
        }
        /**
         * 根据路径从GameObject中查找一个脚本 (异步 双端)
         * @param targetGo 目标GameObject
         * @param path 路径
         * @returns 脚本对象
         */
        async findScriptFromGo(targetGo, path) {
            let targetGuid = this.getGoGuid(targetGo);
            let guid = await this.getScriptGuidFromGo(targetGuid, path);
            if (guid == null) {
                oTraceError("ResManager.findScript: findScript fail!   path=" + path);
                return null;
            }
            return this.findScriptByGuid(guid);
        }
        getGoGuid(targetGo) {
            if (targetGo instanceof MWCore__default$1["default"].GameObject) {
                return targetGo.guid;
            }
            return targetGo;
        }
    };
    exports.ResManager = ResManager_1 = __decorate([
        AutoInit
    ], exports.ResManager);

    var InputManager_1;
    exports.InputManager = InputManager_1 = class InputManager {
        static instance;
        constructor() { this.init(); }
        destroy() {
            InputManager_1.instance = null;
        }
        _onTouch;
        touchInput;
        beginMulFun;
        keyDownActionMap;
        init() {
            if (GamePlay__default$1["default"].isClient()) {
                this._onTouch = new Action1();
                this.keyDownActionMap = new Map();
                this._onTouch.setCountChangeCallback((count) => {
                    if (count == 1) {
                        if (this.touchInput == null) {
                            this.beginMulFun = this.touchBegin.bind(this);
                            this.initTouch();
                        }
                        this.touchInput.touchBeginMulDele.Add(this.beginMulFun);
                    }
                    else if (count = 0) {
                        this.touchInput.touchBeginMulDele.Remove(this.beginMulFun);
                    }
                });
            }
        }
        /**
         * 鼠标点击触发，返回点击的所有结果
         */
        get onTouch() {
            return this._onTouch;
        }
        /**
         * 按下键盘事件(增加了重复监听的判断，还可以移除监听方法)
         * @param key 按键类型
         * @returns 监听的Action方法
         */
        onKeyDown(key) {
            if (!this.keyDownActionMap.has(key)) {
                this.keyDownActionMap.set(key, new Action1());
                Events__default$1["default"].onKeyDown(key, () => {
                    this.keyDownActionMap.get(key).call(key);
                });
            }
            let action = this.keyDownActionMap.get(key);
            if (action.count > 0)
                return null;
            return action;
        }
        initTouch() {
            if (this.touchInput != null)
                return;
            this.touchInput = new GamePlay__default$1["default"].SysTouchInput();
            GamePlay__default$1["default"].asyncGetCurrentPlayer().then(player => {
                this.touchInput.setPlayerController();
            });
        }
        touchBegin() {
            let pos = this.touchInput.getPlayerControllTouches()[0];
            let list = GamePlay__default$1["default"].getClickGameObjectByScene(pos.x, pos.y, 50000, true, false);
            //this.log(list);
            let arr = [];
            for (let i = 0; list != null && i < list.length; i++) {
                if (arr.includes(list[i]))
                    continue;
                arr.push(list[i]);
            }
            if (list.length > 0) {
                this.onTouch.call(arr);
            }
        }
        log(list) {
            oTrace("------------Mouse Click……");
            for (let i = 0; list != null && i < list.length; i++) {
                oTrace("List: " + list[i].gameObject.name);
            }
        }
    };
    exports.InputManager = InputManager_1 = __decorate([
        Singleton()
    ], exports.InputManager);

    //UI的层级
    exports.UILayer = void 0;
    (function (UILayer) {
        /**底层 */
        UILayer[UILayer["Bottom"] = 0] = "Bottom";
        /**中层 */
        UILayer[UILayer["Middle"] = 1] = "Middle";
        /**独享层(调用此层会自动隐藏Bottom和Middle层) */
        UILayer[UILayer["Own"] = 2] = "Own";
        /**顶层 */
        UILayer[UILayer["Top"] = 3] = "Top";
    })(exports.UILayer || (exports.UILayer = {}));

    //UI管理类，需要有类继承此类，并挂在场景的一个UI对象的上，作为UI的总节点
    class UI extends MWGameUI__default$1["default"].MWUIBehaviour {
        static _instance;
        static get instance() {
            return this._instance;
        }
        //图层的数据
        LayerMap = new Map([
            [exports.UILayer.Bottom, { startZ: 0, z: 0, panels: [] }],
            [exports.UILayer.Middle, { startZ: 100000, z: 0, panels: [] }],
            [exports.UILayer.Own, { startZ: 20000, z: 0, panels: [] }],
            [exports.UILayer.Top, { startZ: 300000, z: 0, panels: [] }],
        ]);
        creatPanleMap = new Map(); //所有创建过的Panle
        uniquePanel; //独占Panel
        _canvas;
        //实例化调用(仅一次)
        onInitialized() {
            UI._instance = this;
        }
        //主画布
        get canvas() {
            if (this._canvas == null) {
                this._canvas = this.uiObjectAS().getRootContent();
                this._canvas.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
            }
            return this._canvas;
        }
        /**
         * 显示一个界面(字符串调用)
         * @param panel 界面
         * @param layer 图层
         * @returns 显示的界面
         */
        addChild(panel, layer = exports.UILayer.Middle) {
            if (panel == null)
                return;
            if (panel.uiObject.getParent() == null) {
                this.canvas.addChild(panel.uiObject);
            }
            let beforLayerType = this.getPanelLayer(panel); //获取以前的层
            //如果是独享层
            if (layer == exports.UILayer.Own) {
                //卸载掉独享层别的Panel
                let panels = this.LayerMap.get(exports.UILayer.Own).panels;
                if (panels.length > 0) {
                    this.uniquePanel = null;
                    this.removeChild(panels[0]);
                }
                this.uniquePanel = panel;
                //隐藏Middle和Bottom的Panel
                this.setAllMiddleAndBottomPanelVisible(false);
            }
            //从以前的层删除
            if (beforLayerType != null && beforLayerType != layer) {
                let beforLayer = this.LayerMap.get(beforLayerType);
                let index = beforLayer.panels.indexOf(panel);
                beforLayer.panels.splice(index, 1);
            }
            let currentLayer = this.LayerMap.get(layer);
            if (!currentLayer.panels.includes(panel)) {
                currentLayer.panels.push(panel);
            }
            let z = currentLayer.startZ + currentLayer.z++;
            panel.uiObject.getSlot().setZOrder(z);
            if (panel.visible) {
                panel.uiObject.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
            }
            //将窗口的尺寸设置给panel
            panel.uiObject.getSlot().setSize(Global__default["default"].getViewportSize());
            if (beforLayerType == null) {
                panel["enable"]();
            }
            return panel;
        }
        /**
         * 移除一个显示的界面(字符串调用)
         * @param panel 界面
         */
        removeChild(panel, destroy = false) {
            if (panel == null)
                return;
            if (destroy) {
                let name = panel.name;
                if (this.creatPanleMap.has(name) && this.creatPanleMap.get(name) == panel) {
                    this.creatPanleMap.delete(name);
                }
            }
            let isSuccess = false;
            for (let [key, uiLayer] of this.LayerMap) {
                let index = uiLayer.panels.indexOf(panel);
                if (index != -1) {
                    uiLayer.panels.splice(index, 1);
                    panel.uiObject.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.Collapsed);
                    isSuccess = true;
                    break;
                }
            }
            if (!isSuccess)
                return;
            if (panel == this.uniquePanel) {
                this.setAllMiddleAndBottomPanelVisible(true);
                this.uniquePanel = null;
            }
            panel["disable"]();
        }
        /**
         * 根据界面类获取界面的对象
         * @param PanelClass 界面类型
         * @returns 界面对象
         */
        getPanel(PanelClass) {
            let name = PanelClass.name;
            if (!this.creatPanleMap.has(name)) {
                let panel = PanelClass.creat();
                this.creatPanleMap.set(name, panel);
            }
            return this.creatPanleMap.get(name);
        }
        /**
         * 显示一个界面
         * @param PanelClass 界面的类
         * @param prames 显示参数(这个参数可以传递给界面的onShow方法)
         */
        showPanel(PanelClass, ...prames) {
            this.getPanel(PanelClass).show(...prames);
        }
        /**
         * 隐藏一个界面
         * @param PanelClass 界面的类
         */
        hidePanel(PanelClass) {
            let name = PanelClass.name;
            if (this.creatPanleMap.has(name)) {
                this.creatPanleMap.get(name).hide();
            }
        }
        /**
         * 销毁一个界面
         * @param PanelClass
         */
        destroyPanel(PanelClass) {
            let name = PanelClass.name;
            if (this.creatPanleMap.has(name)) {
                this.creatPanleMap.get(name).destroy();
            }
        }
        /**
         * 判断界面是否处于显示状态(字符串调用)
         * @param panel 界面
         * @returns 是否显示
         */
        panelIsShow(panel) {
            if (panel == null)
                return false;
            return this.getPanelLayer(panel) != null;
        }
        //设置Middle和Bottom层所有Panle的可见性
        setAllMiddleAndBottomPanelVisible(value) {
            let panels = this.LayerMap.get(exports.UILayer.Middle).panels;
            for (let i = 0; i < panels.length; i++) {
                panels[i].visible = value;
            }
            panels = this.LayerMap.get(exports.UILayer.Bottom).panels;
            for (let i = 0; i < panels.length; i++) {
                panels[i].visible = value;
            }
        }
        //获取一个Panel所在的UI层
        getPanelLayer(panel) {
            for (let [key, value] of this.LayerMap) {
                if (value.panels.indexOf(panel) != -1)
                    return key;
            }
            return null;
        }
        //布局
        layoutWidget(widget) {
            let size = UI.getCanvasSize();
            widget.getSlot().setSize(size);
        }
        /**判断UIRoot是否就绪*/
        static async ready() {
            return new Promise((resolve) => {
                let id = setInterval(() => {
                    if (UI._instance != null) {
                        //删除所有元素
                        while (UI._instance.canvas.getChildrenCount() > 0) {
                            let child = UI._instance.canvas.getChildAt(0);
                            child.destroyObject();
                        }
                        clearInterval(id);
                        resolve();
                    }
                }, 30);
            });
        }
        //#region Static Method
        //======================以下为工具方法====================
        /**
         * 获取屏幕尺寸
         * @returns 屏幕尺寸
         */
        static getCanvasSize() {
            return Global__default["default"].getViewportSize();
            //return UI.instance.canvas.getSlot().getSize();
        }
        /**
         * 将世界坐标转换到屏幕坐标
         * @param worldPos 世界坐标
         * @returns 屏幕坐标
         */
        static getCanvasPointByWorld(worldPos) {
            let res = GamePlay__default$1["default"].getCurrentPlayer().projectWorldLocationToWidgetPosition(worldPos, false);
            if (res.result)
                return res.screenPosition;
            return Type__default$1["default"].Vector.zero;
        }
    }

    class OdinGame extends MWCore__default$1["default"].MWScript {
        consoleLevel = "3";
        languageIndex = "-1";
        autoInit = true;
        onStart() {
            this.showLog("Script onStart");
            this.bUseUpdate = true;
            if (OdinGame.isListenServer()) {
                this.initServer();
                this.initClient();
            }
            else if (GamePlay__default$1["default"].isClient()) {
                DataCenterC.instance.init();
                this.initClient();
            }
            else {
                this.initServer();
            }
        }
        onUpdate(dt) {
            TimeUtil.update(dt);
        }
        onDestroy() {
            this.exitGame();
        }
        /**判断当前是否是单机模式 */
        static isListenServer() {
            return isListenServer();
        }
        /**手动初始化 */
        async onInitClientByHand() {
        }
        /**所选择的语言索引(-1:系统 0:英语 1:汉语 2:日语 3:德语)*/
        get selectedLanguageIndex() {
            return Number(this.languageIndex);
        }
        //离开游戏
        exitGame() {
            ModuleManager.instance["destroyAllModule"]();
            ModuleManager.instance.destroy();
            exports.NetManager.instance.destroy();
            exports.SoundManager.instance.destroy();
            exports.EffectManager.instance.destroy();
            exports.ResManager.instance.destroy();
            exports.InputManager.instance.destroy();
        }
        //初始化客户端
        initServer() {
            if (!OdinGame.isListenServer()) {
                DataCenterS.instance.init();
            }
            this.onRegisterModule();
            ModuleManager.instance["awakeAllModule"](ModuleS);
            ModuleManager.instance["startAllModule"](ModuleS);
            this.showLog("InitServer Complete");
            exports.LogManager.instance.setLogLevel(Number(this.consoleLevel));
        }
        /**初始化服务端*/
        async initClient() {
            if (!this.autoInit) { //手动初始化
                this.onRegisterModule();
                await this.onInitClientByHand();
                exports.LogManager.instance.setLogLevel(Number(this.consoleLevel));
                return;
            }
            this.showLog("Wait UIRoot");
            await UI.ready();
            this.showLoading("Start Init Client...", 0);
            if (!OdinGame.isListenServer()) {
                this.showLoading("Wait Data...", 0.1);
                await DataCenterC.instance.ready();
            }
            this.showLoading("Wait CurrentPlayer...", 0.2);
            await GamePlay__default$1["default"].asyncGetCurrentPlayer();
            this.showLoading("Register Modules...", 0.3);
            this.onRegisterModule();
            await ModuleManager.instance.start(() => { this.showLoading("Awake All Module...", 0.65); }, () => { this.showLoading("Start First Module...", 0.7, true); }, () => { this.showLoading("Start All Module...", 0.75); }, () => { this.showLoading("Preload Module Assets...", 0.8); }, () => { this.showLoading("Enter Game...", 1, true); });
            this.showLoading = null;
            this.showLog("InitClient Complete");
            exports.LogManager.instance.setLogLevel(Number(this.consoleLevel));
        }
        showLoading(msg, progress, completeAotoHide = false) {
            this.showLog(msg);
            this.onClientLoading(msg, progress, completeAotoHide);
        }
        showLog(content) {
            oTraceWarning(`____________________    Init    ${content}   ____________________`);
        }
        /**
         * 当需要显示loading调用，需要请重写
         * @param msg 显示的提示内容
         * @param progress 进度条进度(0-1)
         * @param completeAotoClose 完成后是否自动关闭
         */
        onClientLoading(msg, progress, completeAotoClose) {
        }
    }
    __decorate([
        MWCore__default$1["default"].MWProperty({ displayName: "Log级别", group: "Odin设置", selectOptions: { "None": "0", "Error": "1", "Warn": "2", "Log": "3" } }) //0-3 0:不输出 3:输出所有
    ], OdinGame.prototype, "consoleLevel", void 0);
    __decorate([
        MWCore__default$1["default"].MWProperty({ displayName: "语言类型", group: "Odin设置", selectOptions: { "系统默认": "-1", "English": "0", "简体中文": "1", "日本語": "2", "Deutsch": "3" } })
    ], OdinGame.prototype, "languageIndex", void 0);
    __decorate([
        MWCore__default$1["default"].MWProperty({ displayName: "自动初始化Client", group: "Odin设置" })
    ], OdinGame.prototype, "autoInit", void 0);

    //数据元素基类
    class DataInfo {
        version = 1;
    }

    /**
     * MapEx(可序列化)
     */
    exports.MapEx = void 0;
    (function (MapEx) {
        /**
         * 获取对象
         * @param map
         * @param key
         * @returns
         */
        function get(map, key) {
            if (map[key]) {
                return map[key];
            }
            return null;
        }
        MapEx.get = get;
        /**
         * 设置对象
         * @param map
         * @param key
         * @param value
         */
        function set(map, key, value) {
            map[key] = value;
        }
        MapEx.set = set;
        /**
         * 删除对象
         * @param map
         * @param key
         * @returns 成功/失败
         */
        function del(map, key) {
            if (map[key]) {
                delete map[key];
                return true;
            }
            return false;
        }
        MapEx.del = del;
        /**
         * 是否有指定对象
         * @param map
         * @param key
         * @returns
         */
        function has(map, key) {
            return map[key] != null;
        }
        MapEx.has = has;
        /**
         * 获取count数量
         * @param map
         * @param key
         * @returns
         */
        function count(map) {
            let res = 0;
            forEach(map, e => {
                ++res;
            });
            return res;
        }
        MapEx.count = count;
        /**
         * 遍历map
         * @param map
         * @param callback
         */
        function forEach(map, callback) {
            for (let key in map) {
                if (map[key]) {
                    callback(map[key]);
                }
            }
        }
        MapEx.forEach = forEach;
        /**
         * 拷贝，Val还是引用出来的，只是Map换了
         * @param map
         * @returns
         */
        function copy(map) {
            let res = {};
            for (let key in map) {
                res[key] = map[key];
            }
            return res;
        }
        MapEx.copy = copy;
        /**
         * 是否为空
         * @param map
         * @returns 是/否
         */
        function isNull(map) {
            return !map || map == null || map == undefined;
        }
        MapEx.isNull = isNull;
    })(exports.MapEx || (exports.MapEx = {}));

    //数据元素控制基类
    class ModuleData {
        /** 服务器同步数据的事件(Client Only)*/
        onDataChange = new Action();
        syncActionNetMsg; //同步Action调用
        _playerId;
        DataInfoClass;
        dataInfoMap;
        syncToClient;
        constructor(DataInfoClass) {
            this.DataInfoClass = DataInfoClass;
            this.syncActionNetMsg = "ModuleData_ActionSync_Msg_" + this.constructor.name;
            if (GamePlay__default$1["default"].isClient()) {
                Events__default$1["default"].addServerListener(this.syncActionNetMsg, (eventType, ...params) => {
                    this[eventType].call(...params);
                });
            }
        }
        //因为在构造方法里读不到派生类的属性，所以只能另起方法在外部调用(字符串调用)
        init(playerId, dataInfoMap) {
            this.dataInfoMap = dataInfoMap;
            this._playerId = playerId;
            if (dataInfoMap[this.dataName] == null) {
                dataInfoMap[this.dataName] = new this.DataInfoClass();
                this.initDefaultData();
            }
            if (GamePlay__default$1["default"].isServer()) {
                const keys = Object.keys(this);
                keys.forEach(key => {
                    //遍历所有Action，使这些Action一旦在服务器调用，就会自动同步到客户端也调用
                    if (this[key] instanceof Action) {
                        let actionName = key;
                        let action = this[actionName];
                        if (action != null) {
                            action.add((...params) => {
                                if (this.syncToClient) {
                                    oTrace(`syncAction  ${this.constructor.name}-${actionName}`);
                                    this.syncToClient = false;
                                    let player = GamePlay__default$1["default"].getPlayer(this._playerId);
                                    Events__default$1["default"].dispatchToClient(player, this.syncActionNetMsg, actionName, ...params);
                                }
                            }, this);
                        }
                    }
                });
            }
            this.onDataInit();
            return this;
        }
        //销毁(字符串调用)
        destroy() {
            const keys = Object.keys(this);
            keys.forEach(key => {
                //遍历所有Action，使这些Action一旦在服务器调用，就会自动同步到客户端也调用
                if (this[key] instanceof Action) {
                    let action = this[key];
                    if (action != null) {
                        action.clear();
                    }
                }
            });
        }
        /**数据体*/
        get dataInfo() {
            return this.dataInfoMap[this.dataName];
        }
        /**数据名称*/
        get dataName() {
            return this.DataInfoClass.name;
        }
        /**所属玩家id*/
        get playerId() {
            return this._playerId;
        }
        /**
         * 初始化默认数据，需要请复写
         */
        initDefaultData() {
        }
        /**
         * 数据初始化完成调用，需要请复写
         */
        onDataInit() {
        }
        /**
         * 保存模块数据(Server Only)
         * @param syncToClient 是否同步给客户端
         * @returns 模块数据自身
         */
        saveData(syncToClient) {
            if (GamePlay__default$1["default"].isServer()) {
                DataCenterS.instance.saveModuleData(this, syncToClient);
                this.syncToClient = syncToClient;
                this.onDataChange.call();
                this.syncToClient = syncToClient;
                return this;
            }
        }
        /**
         * 向客户端同步模块数据(Server Only)
         * @returns 模块数据自身
         */
        syncData() {
            if (GamePlay__default$1["default"].isServer()) {
                DataCenterS.instance.syncModuleData(this);
                this.onDataChange.call();
                this.syncToClient = true;
                return this;
            }
        }
    }

    class AIMachine {
        //当前状态
        currentState = null;
        //状态集合
        stateMap = new Map();
        //战斗对象
        owner;
        constructor(owner) {
            this.owner = owner;
        }
        /**
         * 注册状态
         * @param type 状态机类型
         * @param newstate 状态对象
         */
        register(type, newstate) {
            if (this.stateMap.has(type) == false) {
                this.stateMap.set(type, newstate);
            }
        }
        /**
        * 状态轮询：调用子状态
        */
        update() {
            if (this.currentState) {
                this.currentState.onUpdate();
            }
        }
        /**
        * 切换状态：立即转换到新的状态（参数自己注册时填写）
        * @param type 新的状态
        */
        changeState(type) {
            // 先退出当前状态
            if (this.currentState) {
                this.currentState.exit();
                this.currentState = null;
            }
            // 接着步入新状态：是否已存在了
            let state = this.stateMap.get(type);
            if (state == null) {
                return;
            }
            state.enter(this.owner);
            this.currentState = state;
        }
        destory() {
            if (this.changeState) {
                this.currentState.exit();
                this.changeState = null;
            }
            this.stateMap.forEach(state => {
                state.onDestory();
            });
            this.stateMap.clear();
            this.stateMap = null;
        }
    }

    class AIState {
        //战斗实体
        context;
        //状态机
        owner;
        constructor(owner) {
            this.owner = owner;
        }
        /**
         * 切换状态
         * @param type 状态类型
         */
        change2State(type) {
            this.owner.changeState(type);
        }
        /**
         * 状态进入，外部调用
         * @param context 战斗实体
         */
        enter(context) {
            this.context = context;
            this.onEnter();
        }
        /**
         * 退出状态外部调用
         */
        exit() {
            this.onExit();
        }
        /**
         * 销毁
         */
        onDestory() {
            this.context = null;
            this.owner = null;
        }
    }

    /**Canvas控制类的基类*/
    class CanvasController {
        _canvas;
        _visible;
        constructor(canvas) {
            this._canvas = canvas;
            let visibility = this._canvas.getVisibility();
            this.visible = visibility != MWGameUI__default$1["default"].ESlateVisibility.Collapsed && visibility != MWGameUI__default$1["default"].ESlateVisibility.Hidden;
        }
        /**
         * 创建一个CanvasController
         * @param canvas ui画布
         * @returns CanvasController
         */
        static creat(canvas) {
            let canvasController = new this(canvas);
            canvasController.buildSelf();
            return canvasController;
        }
        /**构建自己，可以在其中写一个要Find的子节点*/
        buildSelf() {
        }
        /**
         * 根据类型和路径查找子对象
         * @param ChildType 子对象的类型
         * @param path 节点路径
         * @returns 子节点对象
         */
        getChild(ChildType, path) {
            let child = this._canvas.findChildByPath(path);
            if (child == null) {
                oTraceError('CanvasController: The child was not found!  path=' + path);
                return null;
            }
            let widget = ChildType.Get(child);
            if (ChildType.name == MWGameUI__default$1["default"].MWUIButton.name) {
                widget.setFocusable(false); //设置了这个 按钮就不会按下后自动抛出抬起事件了
                widget.setTouchMethod(MWGameUI__default$1["default"].EButtonTouchMethod.PreciseTap); //设置了这个后 滑动列表里的按钮不用再单独设置了
            }
            return widget;
        }
        /**画布*/
        get canvas() {
            return this._canvas;
        }
        /**可见性*/
        set visible(value) {
            this._visible = value;
            if (value) {
                this._canvas.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
            }
            else {
                this._canvas.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.Collapsed);
            }
        }
        /**可见性*/
        get visible() {
            return this._visible;
        }
    }

    /**
     * 批量Events监听处理
     * 可以将一批注册的事件同时激活或屏蔽
     */
    class EventListenerBatch {
        _active;
        addMap = new Map();
        listenerMap = new Map();
        /**
         * 注册监听事件
         * @param eventName 事件名
         * @param callback 监听方法
         */
        add(eventName, callback) {
            this.addMap.set(eventName, callback);
        }
        /**
         * 移除监听事件
         * @param eventName 事件名
         */
        remove(eventName) {
            if (this.addMap.has(eventName)) {
                this.addMap.delete(eventName);
            }
            if (this.listenerMap.has(eventName)) {
                this.listenerMap.delete(eventName);
            }
        }
        /**
         * 清理所有监听事件
         */
        clear() {
            this.active = false;
            this.addMap.clear();
        }
        /**是否生效*/
        set active(value) {
            if (this._active == value)
                return;
            this._active = value;
            if (value) {
                this.addMap.forEach((callback, eventName) => {
                    let listener = Events__default$1["default"].addLocalListener(eventName, callback);
                    this.listenerMap.set(eventName, listener);
                });
            }
            else {
                this.listenerMap.forEach((listener) => {
                    listener.disconnect();
                });
                this.listenerMap.clear();
            }
        }
        /**是否生效*/
        get active() {
            return this._active;
        }
    }

    //挂载在ui文件上的UIpanel
    class PanelBase extends MWGameUI__default$1["default"].MWUIBehaviour {
        uiPrefab = null;
        _visible = true;
        _eventListener;
        isEnabel = false;
        /**
         * 根据prefab路径，创建一个Panel
         * @param prefabPath ui文件的路径
         * @returns Panel
         */
        static creat(prefabPath) {
            //oTrace(`PanelBase: Load UIPrefab prefabPath=${prefabPath}`);
            let uiPrefab = MWGameUI__default$1["default"].createUIPrefabByName(prefabPath); //这个加载是同步的，prefab上的脚本也会同步创建（直接构造）
            if (uiPrefab != null) {
                let panel = MWGameUI__default$1["default"].findUIWidgetScript(uiPrefab);
                if (panel != null && (panel instanceof PanelBase)) {
                    //oTrace('    Load Panel Success!');
                    return panel;
                }
                oTraceError(`    Load Panel Script Fail! path=${prefabPath}`);
            }
            else {
                oTraceError(`    Load Panel Load Fail! path=${prefabPath}`);
            }
            return null;
        }
        //实例化调用(仅一次)
        onInitialized() {
            this.uiPrefab = MWGameUI__default$1["default"].MWUIPanelWidget.get(this.uiObject);
            this.onAwake();
            this.onStart();
        }
        preConstruct() {
            //trace("PreConstruct " + this.constructor.name);
        }
        //第一次显示调用
        construct() {
            //trace("Construct " + this.constructor.name);
            if (this.canvas != null) {
                this.canvas.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
            }
            TimeUtil.delayExecute(() => {
                this.onLayout();
            });
        }
        /**
         * 根据节点路径查找一个界面元素
         * @param ObjClass 元素类型
         * @param path 节点路径
         * @returns 元素对象
         */
        findChildByPath(ObjClass, path) {
            let child = this.uiPrefab.findChildByPath(path);
            if (child == null) {
                oTraceError('PanelBase: Child not found in panel!  path=' + path);
                return null;
            }
            let widget = ObjClass.Get(child);
            if (ObjClass.name == MWGameUI__default$1["default"].MWUIButton.name) {
                let btn = widget;
                btn.setFocusable(false); //设置了这个 按钮就不会按下后自动抛出抬起事件了
                btn.setTouchMethod(MWGameUI__default$1["default"].EButtonTouchMethod.PreciseTap); //不设置这个，滑动列表里的按钮会阻止滑动
                if (btn.getVisibility() == MWGameUI__default$1["default"].ESlateVisibility.HitTestInvisible || btn.getVisibility() == MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible) {
                    btn.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.Visible); //不设置Visible，按钮就无法点击
                }
            }
            return widget;
        }
        //===================实现IPanel接口==================
        //获取画布
        get canvas() { return this.uiObjectAS().getRootContent(); }
        get uiObject() {
            return this.UIObject; //小写的,只要读就会报错
        }
        //可见性
        set visible(value) {
            this._visible = value;
            this.uiPrefab.setVisibility(value ? MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible : MWGameUI__default$1["default"].ESlateVisibility.Collapsed);
        }
        //可见性
        get visible() { return this._visible; }
        //显示Panel
        show(...params) {
            if (!this.isShow) {
                UI.instance["addChild"](this, this.getLayer());
                this.onShow(...params);
            }
            return this;
        }
        //关闭Panel
        hide() {
            if (this.isShow) {
                UI.instance["removeChild"](this);
                this.onHide();
            }
        }
        //==================================================
        /**是否处于显示状态*/
        get isShow() { return UI.instance["panelIsShow"](this); }
        /**名字*/
        get name() { return this.constructor.name; }
        /**事件批处理*/
        get localEventListener() {
            if (this._eventListener == null)
                this._eventListener = new EventListenerBatch();
            return this._eventListener;
        }
        /**
         * 获取这个Panle应该显示在的UI层，默认在Middle层，如果想换层请复写这个方法
         * @returns UI层
         */
        getLayer() {
            return exports.UILayer.Middle;
        }
        /**销毁Panel */
        destroy() {
            this.localEventListener.clear();
            TimeUtil.onEnterFrame.remove(this.onUpdate, this);
            this.uiObject.destroyObject();
        }
        //启用(字符串调用)
        enable() {
            if (this.isEnabel)
                return;
            this.isEnabel = true;
            this.localEventListener.active = true;
            this.onEnable();
            TimeUtil.onEnterFrame.add(this.onUpdate, this);
        }
        //禁用(字符串调用)
        disable() {
            if (!this.isEnabel)
                return;
            this.isEnabel = false;
            this.onDisable();
            TimeUtil.onEnterFrame.remove(this.onUpdate, this);
            this.localEventListener.active = false;
        }
        //=====================生命周期=====================
        /**
         * 创建调用
         */
        onAwake() { }
        /**
         * 开始调用
         */
        onStart() { }
        /**
         * 局部完成调用，隐藏的对象不参与UI布局，所以要布局完成后再隐藏，这个方法就是布局完成后调用
         */
        onLayout() { }
        /**
         * 激活调用(每次显示都会调用)
         */
        onEnable() { }
        /**
         * 禁用调用(每次隐藏都会调用)
         */
        onDisable() { }
        /**
         * show调用
         * @param params show方法传递的参数
         */
        onShow(...params) { }
        /**
         * close调用
         */
        onHide() { }
        ;
        /**
         * 销毁调用
         */
        onDestroy() { } //编辑器自带的
        /**
         * 刷新调用
         * @param dt 帧间隔时间
         */
        onUpdate(dt) { }
    }

    class SuperPanelBase {
        _view;
        ViewClass;
        /**
         * 不可以直接实例化
         * @param ViewClass view的类
         */
        constructor(ViewClass) {
            this.ViewClass = ViewClass;
        }
        get view() {
            return this._view;
        }
        /**
         * 从界面类型，创建一个Panel
         * @returns Panel
         */
        static creat() {
            //oTrace(`SuperPanelBase: Creat SuperPanel! Panel=${this.name}`);
            let panel = new this(null);
            if (panel.ViewClass == null) {
                oTraceError(`Creat ${this.name} Error! ViewClass is null~~~~~~~~~~~~~~~~~~~~~~~~`);
                return null;
            }
            panel._view = panel.ViewClass["creat"]();
            if (panel._view.uiObject != null) ;
            else {
                oTraceError(`    Creat Panel Fail! name=${this.name}`);
                return null;
            }
            panel.buildSelf();
            panel.onStart();
            TimeUtil.delayExecute(() => {
                panel.onLayout();
            });
            return panel;
        }
        buildSelf() {
        }
        //===================实现IPanel接口==================
        /**画布*/
        get canvas() {
            if (this.view == null)
                return null;
            return this.view.canvas;
        }
        /**UI对象*/
        get uiObject() {
            if (this.view == null)
                return null;
            return this.view.uiObject;
        }
        /**可见性*/
        set visible(value) {
            this.view.visible = value;
        }
        /**可见性*/
        get visible() {
            if (this.view == null)
                return false;
            return this.view.visible;
        }
        /**显示Panel*/
        show(...params) {
            if (!this.isShow) {
                UI.instance["addChild"](this, this.getLayer());
            }
            this.onShow(...params);
            return this;
        }
        /**隐藏Panel*/
        hide() {
            if (this.isShow) {
                UI.instance["removeChild"](this);
                this.onHide();
            }
        }
        /**是否处于显示状态*/
        get isShow() { return UI.instance["panelIsShow"](this); }
        /**名字*/
        get name() { return this.constructor.name; }
        /**
         * 获取这个Panle应该显示在的UI层，默认在Middle层，如果想换层请复写这个方法
         * @returns UI层
         */
        getLayer() {
            return exports.UILayer.Middle;
        }
        /**销毁Panel */
        destroy() {
            this.onDestroy();
            UI.instance["removeChild"](this, true);
            this._view.destroy();
            this._view = null;
        }
        //==================================================
        /**事件批处理*/
        get localEventListener() {
            if (this.view == null)
                return null;
            return this.view.localEventListener;
        }
        //启用(字符串调用)
        enable() {
            this.localEventListener.active = true;
            this.onEnable();
            TimeUtil.onEnterFrame.add(this.onUpdate, this);
        }
        //禁用(字符串调用)
        disable() {
            this.onDisable();
            TimeUtil.onEnterFrame.remove(this.onUpdate, this);
            this.localEventListener.active = false;
        }
        _size; // = new Type.Vector2(100, 100);
        /**界面尺寸 */
        get size() {
            return this._size;
        }
        /**界面尺寸 */
        set size(value) {
            this._size = value;
            if (this.uiObject != null && this.uiObject.getSlot() != null) {
                this.uiObject.getSlot().setSize(this._size);
            }
        }
        set position(pos) {
            if (this.uiObject != null && this.uiObject.getSlot() != null) {
                this.uiObject.getSlot().setPosition(pos);
            }
        }
        addToParent(parent) {
            parent.addChild(this.uiObject);
            this.uiObject.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
            if (this._size != null) {
                this.uiObject.getSlot().setSize(this._size);
            }
        }
        removeFromParent() {
            this.uiObject.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.Collapsed);
            // if (this.uiObject.GetParent() != null) {
            //     (this.uiObject.GetParent() as MWGameUI.MWUICanvas).RemoveChild(this.uiObject);
            // }
        }
        //=====================生命周期=====================
        /**
         * 开始调用
         */
        onStart() { }
        /**
         * 局部完成调用，隐藏的对象不参与UI布局，所以要布局完成后再隐藏，这个方法就是布局完成后调用
         */
        onLayout() { }
        /**
         * 激活调用
         */
        onEnable() { }
        /**
         * 禁用调用
         */
        onDisable() { }
        /**
         * show调用
         * @param params show方法传递的参数
         */
        onShow(...params) { }
        /**
         * hide调用
         */
        onHide() { }
        ;
        /**
         * 销毁调用
         */
        onDestroy() { }
        /**
         * 刷新调用
         * @param dt 帧间隔时间
         */
        onUpdate(dt) { }
    }

    //选项卡组
    class TabGroup {
        tabArr;
        selectCallBack;
        selectChecker; //检测是否可以切换
        tabStyleHandle; //设置标签的样式方法
        _currentIndex = -1;
        /**
         * 构造
         * @param tabArr 标签的按钮数组
         */
        constructor(tabArr) {
            this.tabArr = tabArr;
        }
        /**
         * 初始化
         * @param tabStyleHandle 设置标签的样式方法（方法参数：按钮）
         * @param selectCallBack 选择标签的回调方法
         * @param thisArg 域
         * @param defaultIndex 默认选择的标签索引
         */
        init(tabStyleHandle, selectCallBack, thisArg, defaultIndex = 0) {
            this.tabStyleHandle = tabStyleHandle.bind(thisArg);
            this.selectCallBack = selectCallBack.bind(thisArg);
            for (let i = 0; i < this.tabArr.length; i++) {
                this.tabArr[i].onClicked().add(() => {
                    this.select(i);
                });
            }
            this.select(defaultIndex);
        }
        /**
         * 设置标签是否可选择的判断方法
         * @param selectChecker 判断方法
         * @param thisArg 域
         */
        setSelectChecker(selectChecker, thisArg) {
            this.selectChecker = selectChecker.bind(thisArg);
        }
        /**
         * 设置当前的标签
         * @param index 标签索引
         * @param ignoreSame 是否忽略相同索引
         * @returns 是否成功
         */
        select(index, ignoreSame = true) {
            if (ignoreSame && this._currentIndex == index)
                return;
            if (this.selectChecker != null && !this.selectChecker(index)) {
                return false;
            }
            this._currentIndex = index;
            this.refreshTabs();
            this.selectCallBack(index);
            return true;
        }
        /**当前选择的标签索引 */
        get currentIndex() {
            return this._currentIndex;
        }
        //刷新所有便签的显示样式
        refreshTabs() {
            for (let i = 0; i < this.tabArr.length; i++) {
                this.tabStyleHandle(this.tabArr[i], i == this.currentIndex);
            }
        }
    }

    //UI工具自动生成代码的的基类
    class ViewBase {
        prefab;
        _visible = true;
        _eventListener;
        defaultPrefabPath;
        constructor(prefabPath) {
            this.defaultPrefabPath = prefabPath;
            //this.prefab = MWGameUI.CreateUIPrefabByName(prefabPath);
            //oTrace(`${this.constructor.name}: Load UIPrefab path=${prefabPath}`);
        }
        buildSelf() { }
        /**
         * 根据prefab路径，创建一个Panel
         * @param prefabPath ui文件的路径
         * @returns Panel
         */
        static creat(prefabPath) {
            let panel = new this(null);
            let path = prefabPath != null ? prefabPath : panel.defaultPrefabPath;
            //oTrace(`ViewBase: Load UIPrefab prefabPath=${path}`);
            panel.prefab = MWGameUI__default$1["default"].createUIPrefabByName(path);
            if (panel.prefab != null) {
                panel.prefab.getRootContent().setVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
                //oTrace('    Load View Success!');
            }
            else {
                oTraceError(`ViewBase:Load View Load Fail! path=${path}`);
            }
            panel.buildSelf();
            panel.onStart();
            TimeUtil.delayExecute(() => {
                panel.onLayout();
            });
            return panel;
        }
        /**
         * 根据节点路径查找一个界面元素
         * @param ObjClass 元素类型
         * @param path 节点路径
         * @returns 元素对象
         */
        findChildByPath(ObjClass, path) {
            let child = this.prefab.findChildByPath(path);
            if (child == null) {
                oTraceError(`${this.constructor.name}: Child not found in panel!  path = ${path}`);
                return null;
            }
            return ViewBase.widgetToUIElement(ObjClass, child);
        }
        /**
         * 获取一个节点下名字有规律的子对象，路径是这种形式：`Canvas/Con/Field{0}_txt`
         * @param ObjClass 子对象类型
         * @param path 节点路径
         * @param startIndex 规律标记的起始值
         * @param emdIndex 规律标记的结束值(不包含)
         * @returns 子对象队列
         */
        findChildrenByPath(ObjClass, path, startIndex = 1, endIndex = Number.MAX_VALUE) {
            let arr = [];
            for (let i = startIndex; i < endIndex; i++) {
                let childPath = StringUtil.format(path, i);
                let child = this.prefab.findChildByPath(childPath);
                if (child == null)
                    break;
                let obj = ViewBase.widgetToUIElement(ObjClass, child);
                if (obj == null)
                    break;
                arr.push(obj);
            }
            return arr;
        }
        /**
         * 根据类型，获取画布下的所有此类型的对象
         * @param canvas 画布
         * @param ObjClass 类型类型
         * @returns 对象数组
         */
        static getCanvasChildren(canvas, ObjClass) {
            let arr = [];
            if (canvas == null)
                return arr;
            let childNum = canvas.getChildrenCount();
            for (let i = 0; i < childNum; i++) {
                let child = canvas.getChildAt(i);
                let obj = ViewBase.widgetToUIElement(ObjClass, child);
                if (obj != null) {
                    arr.push(obj);
                }
            }
            return arr;
        }
        /**
         * 将UI节点转换为实际的UI元素对象
         * @param EleClass UI元素的类
         * @param widget 节点对象
         * @returns UI元素对象
         */
        static widgetToUIElement(EleClass, widget) {
            let element = EleClass.Get(widget);
            if (element == null || !(widget instanceof EleClass))
                return null;
            if (EleClass.name == MWGameUI__default$1["default"].MWUIButton.name) {
                let btn = element;
                btn.setFocusable(false); //设置了这个 按钮就不会按下后自动抛出抬起事件了
                btn.setTouchMethod(MWGameUI__default$1["default"].EButtonTouchMethod.PreciseTap); //不设置这个，滑动列表里的按钮会阻止滑动
                if (btn.getVisibility() == MWGameUI__default$1["default"].ESlateVisibility.HitTestInvisible || btn.getVisibility() == MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible) {
                    btn.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.Visible); //不设置Visible，按钮就无法点击
                }
            }
            return element;
        }
        /**
         * 根据路径获取一个Canvas，并返回控制这个Canvas的控制器对象
         * @param ControllerClass Canvas控制器类
         * @param path 路径
         * @returns Canvas控制器对象
         */
        findCanvasByPath(ControllerClass, path) {
            let canvas = this.findChildByPath(MWGameUI__default$1["default"].MWUICanvas, path);
            if (canvas == null)
                return null;
            return new ControllerClass(canvas);
        }
        //===================实现IPanel接口==================
        //获取画布
        get canvas() {
            if (this.uiObject == null)
                return null;
            return this.uiObject.getRootContent();
        }
        //UI对象
        get uiObject() {
            return this.prefab;
        }
        //可见性
        set visible(value) {
            this._visible = value;
            if (value) {
                this.uiObject.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
            }
            else {
                this.uiObject.setVisibility(MWGameUI__default$1["default"].ESlateVisibility.Collapsed);
            }
        }
        //可见性
        get visible() { return this._visible; }
        //显示Panel
        show(...params) {
            if (!this.isShow) {
                UI.instance["addChild"](this, this.getLayer());
            }
            this.onShow(...params);
            return this;
        }
        //关闭Panel
        hide() {
            if (this.isShow) {
                UI.instance["removeChild"](this);
                this.onHide();
            }
        }
        /**是否处于显示状态*/
        get isShow() { return UI.instance["panelIsShow"](this); }
        /**名字*/
        get name() { return this.constructor.name; }
        /**
         * 获取这个Panle应该显示在的UI层，默认在Middle层，如果想换层请复写这个方法
         * @returns UI层
         */
        getLayer() {
            return exports.UILayer.Middle;
        }
        /**销毁Panel */
        destroy() {
            this.onDestroy();
            UI.instance["removeChild"](this, true);
            this.uiObject.destroyObject();
            this.localEventListener.clear();
        }
        //==================================================
        /**事件批处理*/
        get localEventListener() {
            if (this._eventListener == null)
                this._eventListener = new EventListenerBatch();
            return this._eventListener;
        }
        //启用(字符串调用)
        enable() {
            this.localEventListener.active = true;
            this.onEnable();
            TimeUtil.onEnterFrame.add(this.onUpdate, this);
        }
        //禁用(字符串调用)
        disable() {
            this.onDisable();
            TimeUtil.onEnterFrame.remove(this.onUpdate, this);
            this.localEventListener.active = false;
        }
        //=====================生命周期=====================
        /**
         * 开始调用
         */
        onStart() { }
        /**
         * 局部完成调用，隐藏的对象不参与UI布局，所以要布局完成后再隐藏，这个方法就是布局完成后调用
         */
        onLayout() { }
        /**
         * 激活调用
         */
        onEnable() { }
        /**
         * 禁用调用
         */
        onDisable() { }
        /**
         * show调用
         * @param params show方法传递的参数
         */
        onShow(...params) { }
        /**
         * close调用
         */
        onHide() { }
        ;
        /**
         * 销毁调用
         */
        onDestroy() { }
        /**
         * 刷新调用
         * @param dt 帧间隔时间
         */
        onUpdate(dt) { }
    }

    var AnalyticsUtil_1;
    //埋点工具
    exports.AnalyticsUtil = AnalyticsUtil_1 = class AnalyticsUtil {
        static NET_MSG_SEND_MGS = "NET_MSG_SEND_MGS";
        static comData; //通用数据
        static msgMap;
        /** 初始化*/
        static init() {
            if (this.msgMap != null)
                return;
            this.msgMap = new Map();
            if (GamePlay__default$1["default"].isClient()) {
                Events__default$1["default"].addServerListener(AnalyticsUtil_1.NET_MSG_SEND_MGS, (eventName, eventDesc, jsonData) => {
                    MWMGS__default["default"].MWMGS_API.getInstance().reportLogInfo(eventName, eventDesc, jsonData);
                });
            }
        }
        /**
         * 设置公共数据，每个埋点数据都会附加的字段，由key,value的形式组织
         * @param comData 公共数据
         */
        static setCommonData(comData) {
            AnalyticsUtil_1.comData = comData;
        }
        /** 根据类型生成一个埋点数据对象
         * @param MsgClass 埋点数据类
         * @returns 数据对象
         */
        static get(MsgClass) {
            if (this.msgMap == null) {
                this.init();
            }
            if (!AnalyticsUtil_1.msgMap.has(MsgClass.name)) {
                let msg = new MsgClass();
                msg.data = {};
                if (!AnalyticsUtil_1.comData) {
                    for (const key in AnalyticsUtil_1.comData) {
                        msg[key] = AnalyticsUtil_1.comData[key];
                    }
                }
                AnalyticsUtil_1.msgMap.set(MsgClass.name, msg);
            }
            return AnalyticsUtil_1.msgMap.get(MsgClass.name);
        }
        /**
         * 上传埋点数据到潘多拉
         * @param player 在服务端调用时，指定埋点的玩家，如果不写则全房间玩家都上传
         */
        send(player) {
            let eventName = this.constructor.name.toLowerCase();
            if (eventName.endsWith("$1")) {
                eventName = eventName.substring(0, eventName.length - 2);
            }
            let eventDesc = this.desc;
            let jsonData = JSON.stringify(this.data).toLowerCase();
            if (GamePlay__default$1["default"].isClient()) {
                MWMGS__default["default"].MWMGS_API.getInstance().reportLogInfo(eventName, eventDesc, jsonData);
            }
            else {
                if (player == null) {
                    Events__default$1["default"].dispatchToAllRoomClient(AnalyticsUtil_1.NET_MSG_SEND_MGS, eventName, eventDesc, jsonData);
                }
                else {
                    Events__default$1["default"].dispatchToClient(player, AnalyticsUtil_1.NET_MSG_SEND_MGS, eventName, eventDesc, jsonData);
                }
            }
        }
    };
    exports.AnalyticsUtil = AnalyticsUtil_1 = __decorate([
        AutoInit
    ], exports.AnalyticsUtil);
    //埋点例子
    // //定义一个埋点消息类
    // class ZN_PlayerFirstLogin extends AnalyticsUtil{
    //     desc: string = '第一次登录';
    //     data: {loginTime:number};
    // }
    // //发送一个埋点
    // let msg = AnalyticsUtil.get(ZN_PlayerFirstLogin);//生成一个埋点
    // msg.data.loginTime = 100;//设置字段值
    // msg.send();//发送埋点
    class ts_splash_loading_start extends exports.AnalyticsUtil {
        desc = "ts游戏加载开始";
        data;
    }
    class ts_splash_loading_end extends exports.AnalyticsUtil {
        desc = "ts游戏加载完成";
        data;
    }

    /**
     * 摄像机工具类，用于实现震屏、摄像机跟随等效果
     */
    class CameraUtil {
        static _character;
        static forward;
        static speed = 800; //摄像机移动速度
        static maxRange = 20; //最大幅度
        static lastOffSize = -1; //上一帧的射线机偏移量
        static decay = 0.5; //抖动衰减(越小停的越快)
        static get character() {
            if (this._character == null)
                this._character = GamePlay__default$1["default"].getCurrentPlayer().character;
            return this._character;
        }
        /**
         * 震屏
         * @param maxRange 最大幅度
         * @param decay 每个周期的衰减
         * @param speed 速度
         */
        static screenShock(maxRange = 60, decay = 0.5, speed = 3000) {
            if (!TimeUtil.onEnterFrame.includes(this.screenShockUpdate, this)) {
                TimeUtil.onEnterFrame.add(this.screenShockUpdate, this);
            }
            this.lastOffSize = 0;
            this.maxRange = maxRange;
            this.decay = decay;
            this.speed = speed;
            this.forward = GamePlay__default$1["default"].getShootDir(GamePlay__default$1["default"].getCurrentPlayer().character, GamePlay__default$1["default"].getCurrentPlayer().character.location, 100).getNormalized();
        }
        static screenShockFinish() {
            TimeUtil.onEnterFrame.remove(this.screenShockUpdate, this);
            this.character.cameraSetting.SetCameraOffset(Type__default$1["default"].Vector.zero);
        }
        static screenShockUpdate(dt) {
            let offset = this.character.cameraSetting.GetCameraOffset();
            offset = offset.addition(this.forward.multiply(this.speed * dt));
            let currentZise = offset.size;
            if (currentZise > this.lastOffSize) { //增加的
                if (currentZise >= Math.abs(this.maxRange)) {
                    offset = this.forward.multiply(this.maxRange * this.speed / Math.abs(this.speed));
                    this.speed = -this.speed;
                    this.maxRange *= this.decay;
                    if (this.maxRange <= 0.01) {
                        this.screenShockFinish();
                        return;
                    }
                }
            }
            this.lastOffSize = currentZise;
            this.character.cameraSetting.SetCameraOffset(offset);
        }
        /**
         * 跟随目标
         * @param target 目标
         */
        static setFollowTarget(target) {
            GamePlay__default$1["default"].CameraManager.setCameraTarget(target);
        }
    }

    /*
     * @Author: quanyi.huang quanyi.huang@appshahe.com
     * @Date: 2022-05-15 08:45:58
     * @LastEditors: quanyi.huang quanyi.huang@appshahe.com
     * @LastEditTime: 2022-07-24 14:37:45
     * @FilePath: \JavaScripts\IAAServiceSDK.ts
     * @Description:
     * 广告服务接口
     * 区分平台类型，区分广告类型
     * 调用根据广告类型进行调用
     IAAServiceSDK.getInstance().show(ADSType.T_REWARDED,this.onRewardShow);

         private onRewardShow=(_message:boolean)=>
        {

        }
     *
     */
    /**
     *广告类型
     */
    exports.ADSType = void 0;
    (function (ADSType) {
        /**
         * 激励
         */
        ADSType["Reward"] = "reward";
        /**
         * 插屏
         */
        ADSType["Interstitial"] = "interstitial";
    })(exports.ADSType || (exports.ADSType = {}));
    var IAAActionType;
    (function (IAAActionType) {
        /**
        * 激励广告是否准备好
        */
        IAAActionType["Reward_isReady"] = "ts.ad.rewarded.isReady";
        /**
         * 激励广告加载
         */
        IAAActionType["Reward_Load"] = "ts.ad.rewarded.load";
        /**
         * 激励广告显示，同时会有两个回调，是否显示，和显示完毕
         */
        IAAActionType["Reward_Show"] = "ts.ad.rewarded.show";
        /**
         * 插屏广告是否准备好
         */
        IAAActionType["Interstitial_IsReady"] = "ts.ad.interstitial.isReady";
        /**
         * 插屏广告加载
         */
        IAAActionType["Interstitial_Load"] = "ts.ad.interstitial.load";
        /**
         * 插屏广告显示
         */
        IAAActionType["Interstitial_Show"] = "ts.ad.interstitial.show";
    })(IAAActionType || (IAAActionType = {}));
    /**
     * 触发广告后的回调类型
     */
    var IAACallBackName;
    (function (IAACallBackName) {
        //激励广告
        IAACallBackName["Reward_Load"] = "platform.ad.rewarded.load";
        IAACallBackName["Reward_IsReady"] = "platform.ad.rewarded.isReady";
        //显示成功
        IAACallBackName["Reward_Show"] = "platform.ad.rewarded.show";
        //显示播放完成
        IAACallBackName["Reward_Complete"] = "platform.ad.rewarded.showcomplete";
        //插屏广告
        IAACallBackName["Interstitial_Load"] = "platform.ad.interstitial.load";
        IAACallBackName["Intersititial_IsReady"] = "platform.ad.interstitial.isReady";
        IAACallBackName["Intersititial_Show"] = "platform.ad.interstitial.show";
    })(IAACallBackName || (IAACallBackName = {}));
    /**
     * 激励，插屏广告接口
     * 主要用于广告的是否准备好，预加载，显示
     *
     */
    class IAAServiceSDK {
        static _instance;
        static get instance() {
            if (!this._instance) {
                this._instance = new IAAServiceSDK();
                this._instance.register();
            }
            return IAAServiceSDK._instance;
        }
        needLog = true;
        map = new Map();
        register() {
            this.map.set(IAAActionType.Reward_isReady, new IAACallBack(IAAActionType.Reward_isReady, IAACallBackName.Reward_IsReady));
            this.map.set(IAAActionType.Reward_Load, new IAACallBack(IAAActionType.Reward_Load, IAACallBackName.Reward_Load));
            this.map.set(IAAActionType.Reward_Show, new IAACallBack(IAAActionType.Reward_Show, IAACallBackName.Reward_Show, IAACallBackName.Reward_Complete));
            this.map.set(IAAActionType.Interstitial_IsReady, new IAACallBack(IAAActionType.Interstitial_IsReady, IAACallBackName.Intersititial_IsReady));
            this.map.set(IAAActionType.Interstitial_Load, new IAACallBack(IAAActionType.Interstitial_Load, IAACallBackName.Interstitial_Load));
            this.map.set(IAAActionType.Interstitial_Show, new IAACallBack(IAAActionType.Interstitial_Show, IAACallBackName.Intersititial_Show));
        }
        /**
         *
         * @param _actionName
         * @param _func 是否播放成功
         * @param _func1 reward 激励视频show类型的时候播放完成回调，完成后可以进行奖励操作
         */
        send(_actionName, _func) {
            let iaaAction = this.map.get(_actionName);
            if (iaaAction) {
                iaaAction.bindCallback(_func);
                iaaAction.send();
            }
            else {
                console.log();
            }
        }
        callBack;
        /**
         *
         * @param _adsType 广告类型
         */
        show(_adsType, _callBack) {
            this.callBack = _callBack;
            if (_adsType == exports.ADSType.Reward) {
                this.send(IAAActionType.Reward_isReady, this.onRewardReady);
            }
            else if (_adsType == exports.ADSType.Interstitial) {
                this.send(IAAActionType.Interstitial_IsReady, this.onInterstitialReady);
            }
        }
        onRewardReady = (_message) => {
            let json = JSON.parse(_message);
            if (json && json.data) {
                if (this.needLog)
                    console.log("iaa:onRewardReady " + json.data.isReady);
                if (json.data.isReady) {
                    this.send(IAAActionType.Reward_Show, this.callBack);
                }
                else {
                    this.send(IAAActionType.Reward_Load, this.onRewardLoad);
                }
            }
            else {
                console.error("iaa:onRewardReady " + _message);
                if (this.callBack) {
                    this.callBack(false);
                }
            }
        };
        onRewardLoad = (_message) => {
            let json = JSON.parse(_message);
            if (json && json.data) {
                if (this.needLog)
                    console.log("iaa:onRewardLoad " + json.data.loadResult);
                if (json.data.loadResult) {
                    this.send(IAAActionType.Reward_Show, this.callBack);
                }
                else {
                    console.error("iaa:onRewardLoad  loadresult:" + json.data.loadResult);
                    if (this.callBack) {
                        this.callBack(false);
                    }
                }
            }
            else {
                console.error("iaa:onRewardLoad " + _message);
                if (this.callBack) {
                    this.callBack(false);
                }
            }
        };
        onInterstitialReady = (_message) => {
            let json = JSON.parse(_message);
            if (json && json.data) {
                if (json.data.isReady) {
                    this.send(IAAActionType.Interstitial_Show, this.callBack);
                }
                else {
                    this.send(IAAActionType.Interstitial_Load, this.onInterstitialLoad);
                }
            }
            else {
                console.error("iaa:onInterstitialReady " + _message);
                if (this.callBack) {
                    this.callBack(false);
                }
            }
        };
        onInterstitialLoad = (_message) => {
            let json = JSON.parse(_message);
            if (json && json.data) {
                if (json.data.loadResult) {
                    this.send(IAAActionType.Interstitial_Show, this.callBack);
                }
                else {
                    //console.error("iaa:onInterstitialLoad  loadResult:"+_message);
                    if (this.callBack) {
                        this.callBack(false);
                    }
                }
            }
            else {
                console.error("iaa:onInterstitialLoad " + _message);
                if (this.callBack) {
                    this.callBack(false);
                }
            }
        };
    }
    class IAACallBack {
        actionName;
        callBackName;
        callBackName1;
        constructor(_actionName, _callBackName, _callBackName1 = null) {
            this.actionName = _actionName;
            this.callBackName = _callBackName;
            this.callBackName1 = _callBackName1;
            this.register();
        }
        register() {
            if (this.callBackName != null && this.callBackName != undefined) ;
            if (this.callBackName1 != null && this.callBackName1 != undefined) ;
        }
        callBack;
        bindCallback(_callBack) {
            this.callBack = _callBack;
        }
        onCallBack = (_message) => {
            let json = JSON.parse(_message);
            if (json && json.data) {
                //console.log("iaa:"+this.callBackName+"  iaacallback _message:"+_message);
                if (this.callBackName == IAACallBackName.Intersititial_Show || this.callBackName == IAACallBackName.Reward_Show) {
                    if (!json.data.loadResult) {
                        if (this.callBack)
                            this.callBack(false);
                    }
                }
                else {
                    if (this.callBack)
                        this.callBack(_message);
                }
            }
            else {
                if (this.callBack)
                    this.callBack(false);
            }
        };
        onCallBack1 = (_message) => {
            if (this.callBack) {
                //console.log("iaacallback:"+JSON.stringify(_message));
                this.callBack(true);
            }
            else {
                console.error("iaacallback:not register onCallBack1 function");
            }
        };
        /**
         * 建造数据
         * @returns
         */
        buildData() {
            return { "action": this.actionName, "data": { "action": this.callBackName, "action1": this.callBackName1 } };
        }
        send() {
            //MWTSMessageChannel.MWMessageChannelAPI.GetInstance().Send(JSON.stringify(this.buildData()));
        }
    }

    /**
     * 数学工具
     */
    class MathUtil {
        /**
         * 获取两个向量之间的距离
         * @param v1 第一个向量
         * @param v2 第二个向量
         * @returns 距离
         */
        static distance(v1, v2) {
            return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
        }
        /**
         * 获取两个向量之间的距离的平方
         * @param v1 第一个向量
         * @param v2 第二个向量
         * @returns 距离
         */
        static distanceSquare(v1, v2) {
            return Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2);
        }
        /**
         * 一个点往目标点移动一个距离
         * @param currentPos 当前点
         * @param targetPos 目标点
         * @param moveDis 移动的距离
         * @param resPos 移动后得到的结果的点
         * @returns 是否移动到了目标点
         */
        static posMove(currentPos, targetPos, moveDis, resPos) {
            let dis = MathUtil.distance(currentPos, targetPos);
            if (dis <= moveDis) {
                resPos.x = targetPos.x;
                resPos.y = targetPos.y;
                resPos.z = targetPos.z;
                return true;
            }
            let movV = targetPos.subtraction(currentPos).getNormalized().multiply(moveDis);
            let newPos = currentPos.addition(movV);
            resPos.x = newPos.x;
            resPos.y = newPos.y;
            resPos.z = newPos.z;
            return false;
        }
        /**
         * 向量的线性插值
         * @param from 起始向量
         * @param to 目标向量
         * @param alpha alpha
         * @returns 新向量
         */
        static vectorLerp(from, to, alpha) {
            return from.addition(to.subtraction(from).multiply(alpha));
        }
        /**
         * 获取一个区间的整随机数
         * @param min 最小值
         * @param max 最大值(不包含)
         * @returns 随机数
         */
        static getRandom(min, max) {
            let range = max - min;
            let rand = Math.random();
            return (min + Math.floor(rand * range));
        }
        /**
         * 获取两个旋转之间的欧拉角
         * @param from 起始旋转
         * @param to 目标旋转
         * @returns 欧拉角
         */
        static getEulerAngles(from, to) {
            let angles = new Type__default$1["default"].Vector((to.x - from.x) % 360, (to.y - from.y) % 360, (to.z - from.z) % 360);
            if (Math.abs(angles.x) > 180)
                angles.x += -Math.sign(angles.x) * 360;
            if (Math.abs(angles.y) > 180)
                angles.y += -Math.sign(angles.y) * 360;
            if (Math.abs(angles.z) > 180)
                angles.z += -Math.sign(angles.z) * 360;
            return angles;
        }
        /**
         * Rotation转欧拉角
         * @param rotation Rotation
         * @returns 欧拉角
         */
        static rotationToAngles(rotation) {
            return new Type__default$1["default"].Vector(rotation.x, rotation.y, rotation.z);
        }
        /**
         * 获取局部欧拉角
         * @param go GameObject
         * @returns 欧拉角
         */
        static getLocalEulerAngles(go) {
            return this.rotationToAngles(go.getRelativeRotation());
        }
        /**
         * 向量点积
         * @param a 第一个向量
         * @param b 第二个向量
         * @returns 点积结果
         */
        static dot(a, b) {
            return MathLibrary__default["default"].dotVectorVector(a, b);
        }
        /**
         * 向量叉积
         * @param a 第一个向量
         * @param b 第二个向量
         * @returns 叉积结果
         */
        static cross(a, b) {
            return new Type__default$1["default"].Vector(a.y * b.z - b.y * a.z, a.z * b.x - a.x * b.z, a.x * b.y - b.x * a.y);
        }
        /**
         * 获取两个向量的旋转角
         * @param from 起始向量
         * @param to 目标向量
         * @param up 旋转轴
         * @returns 旋转的角度
         */
        static getSignedAngle(from, to, up) {
            let angle = Type__default$1["default"].Vector.angle(from, to);
            let sign = Math.sign(this.dot(up, this.cross(from, to)));
            let signed_angle = angle * sign;
            return signed_angle <= 0 ? 360 + signed_angle : signed_angle;
        }
    }

    var GoPool_1;
    var SourceType;
    (function (SourceType) {
        SourceType[SourceType["Error"] = 0] = "Error";
        SourceType[SourceType["Asset"] = 1] = "Asset";
        SourceType[SourceType["GameObject"] = 2] = "GameObject";
        SourceType[SourceType["Prefab"] = 3] = "Prefab"; //预制体
    })(SourceType || (SourceType = {}));
    //GameObject对象池
    exports.GoPool = GoPool_1 = class GoPool {
        static instance;
        constructor() { }
        destroy() {
            GoPool_1.instance = null;
        }
        POOL_RES_GUID = 'poolResGuid'; //原始对象的guid，还对象的时候使用
        sourceTypeMap = new Map();
        sceneSource = new Map();
        subPoolMap = new Map();
        /**
         * 生成一个对象
         * @param guid 场景对象的guid | 资源的guid | prefab的guid
         * @returns 对象
         */
        spawn(guid) {
            if (this.subPoolMap.has(guid) && this.subPoolMap.get(guid).length > 0) {
                let obj = this.subPoolMap.get(guid).pop();
                obj.setVisibility(Type__default$1["default"].PropertyStatus.On);
                return obj;
            }
            if (!this.sourceTypeMap.has(guid)) {
                this.sourceTypeMap.set(guid, this.getSourceType(guid));
            }
            let obj = null;
            switch (this.sourceTypeMap.get(guid)) {
                case SourceType.Asset:
                    obj = MWCore__default$1["default"].GameObject.spawnGameObject(guid);
                    break;
                case SourceType.GameObject:
                    obj = this.sceneSource.get(guid).clone();
                    break;
                case SourceType.Prefab:
                    obj = MWCore__default$1["default"].GameObject.spawnGameObject(guid);
                    break;
            }
            if (obj == null) {
                this.sourceTypeMap.set(guid, SourceType.Error);
            }
            else {
                obj.SetVisibility(Type__default$1["default"].PropertyStatus.On);
                obj.location = Type__default$1["default"].Vector.zero;
                obj[this.POOL_RES_GUID] = guid;
            }
            return obj;
        }
        //根据资源的guid获取资源的类型
        getSourceType(guid) {
            if (guid.length > 18) {
                let source = MWCore__default$1["default"].GameObject.find(guid);
                if (source != null) { //场景里的
                    source.detachFromGameObject();
                    source.setVisibility(Type__default$1["default"].PropertyStatus.Off);
                    source.staticStatus = false;
                    source.location = Type__default$1["default"].Vector.right.multiply(9999999);
                    this.sceneSource.set(guid, source);
                    return SourceType.GameObject;
                }
                else { //预制体
                    return SourceType.Prefab;
                }
            }
            else { //库里的
                return SourceType.Asset;
            }
        }
        /**
         * 归还一个对象
         * @param obj 对象
         */
        unSpawn(obj) {
            let guid = obj[this.POOL_RES_GUID];
            if (guid == null)
                return;
            if (!this.subPoolMap.has(guid))
                this.subPoolMap.set(guid, []);
            if (this.subPoolMap.get(guid).includes(obj))
                return;
            this.subPoolMap.get(guid).push(obj);
            obj.location = Type__default$1["default"].Vector.right.multiply(9999999);
            obj.detachFromGameObject();
            obj.setVisibility(Type__default$1["default"].PropertyStatus.Off);
        }
        /**
         * 清除对象池中所以guid对应的对象
         * @param guid 清除对象的guid
         */
        clear(guid) {
            if (!this.subPoolMap.has(guid) && this.subPoolMap.get(guid).length == 0) {
                return;
            }
            let arr = this.subPoolMap.get(guid);
            for (let i = 0; i < arr.length; i++) {
                arr[i].destroy();
            }
            arr.length = 0;
        }
    };
    exports.GoPool = GoPool_1 = __decorate([
        Singleton()
    ], exports.GoPool);
    //对象池
    class ObjPool {
        creatFunction;
        resetFunction;
        destroyFunction;
        freeObjs;
        /**
         * 构造一个对象池
         * @param creatObj 创建新对象的回调
         * @param onReset 重置对象的回调
         * @param onDestroy 销毁对象的回调
         * @param initNum 默认缓存对象数量
         */
        constructor(creatObj, onReset, onDestroy, initNum = 2) {
            this.creatFunction = creatObj;
            this.resetFunction = onReset;
            this.destroyFunction = onDestroy;
            this.freeObjs = new Array(initNum);
            for (let i = 0; i < initNum; i++) {
                this.freeObjs[i] = this.creatFunction();
            }
        }
        /**
         * 生成一个对象
         * @returns 对象
         */
        spawn() {
            let obj = null;
            if (this.freeObjs.length > 0) {
                obj = this.freeObjs.pop();
                if (this.resetFunction != null) {
                    this.resetFunction(obj);
                }
            }
            obj = this.creatFunction();
            return obj;
        }
        /**
         * 归还一个对象
         * @param obj 对象
         */
        unSpawn(obj) {
            if (obj == null)
                return;
            this.freeObjs.push(obj);
        }
        /**
         * 获取对象池中空闲对象的数量
         */
        get size() {
            return this.freeObjs.length;
        }
        /**
         * 清除
         */
        clear() {
            this.freeObjs.forEach(obj => {
                this.destroyFunction(obj);
            });
            this.freeObjs.length = 0;
        }
        getFreeObjs() {
            return this.freeObjs;
        }
    }

    /**
     * Tween.js - Licensed under the MIT license
     * https://github.com/tweenjs/tween.js
     * ----------------------------------------------
     *
     * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
     * Thank you all, you're awesome!
     */
    class Sequence {
        static _nextId = 0;
        static nextId() {
            return Sequence._nextId++;
        }
    }
    exports.now = void 0;
    // Include a performance.now polyfill.
    // In node.js, use process.hrtime.
    // eslint-disable-next-line
    // @ts-ignore
    if (typeof self === 'undefined' && typeof process !== 'undefined' && process.hrtime) {
        exports.now = function () {
            // eslint-disable-next-line
            // @ts-ignore
            const time = process.hrtime();
            // Convert [seconds, nanoseconds] to milliseconds.
            return time[0] * 1000 + time[1] / 1000000;
        };
    }
    // In a browser, use self.performance.now if it is available.
    else if (typeof self !== 'undefined' && self.performance !== undefined && self.performance.now !== undefined) {
        // This must be bound, because directly assigning this function
        // leads to an invocation exception in Chrome.
        exports.now = self.performance.now.bind(self.performance);
    }
    // Use Date.now if it is available.
    else if (Date.now !== undefined) {
        exports.now = Date.now;
    }
    // Otherwise, use 'new Date().getTime()'.
    else {
        exports.now = function () {
            return new Date().getTime();
        };
    }
    /**
     *
     */
    const Interpolation = {
        Linear: function (v, k) {
            const m = v.length - 1;
            const f = m * k;
            const i = Math.floor(f);
            const fn = Interpolation.Utils.Linear;
            if (k < 0) {
                return fn(v[0], v[1], f);
            }
            if (k > 1) {
                return fn(v[m], v[m - 1], m - f);
            }
            return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
        },
        Bezier: function (v, k) {
            let b = 0;
            const n = v.length - 1;
            const pw = Math.pow;
            const bn = Interpolation.Utils.Bernstein;
            for (let i = 0; i <= n; i++) {
                b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
            }
            return b;
        },
        CatmullRom: function (v, k) {
            const m = v.length - 1;
            let f = m * k;
            let i = Math.floor(f);
            const fn = Interpolation.Utils.CatmullRom;
            if (v[0] === v[m]) {
                if (k < 0) {
                    i = Math.floor((f = m * (1 + k)));
                }
                return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
            }
            else {
                if (k < 0) {
                    return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
                }
                if (k > 1) {
                    return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
                }
                return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
            }
        },
        Utils: {
            Linear: function (p0, p1, t) {
                return (p1 - p0) * t + p0;
            },
            Bernstein: function (n, i) {
                const fc = Interpolation.Utils.Factorial;
                return fc(n) / fc(i) / fc(n - i);
            },
            Factorial: (function () {
                const a = [1];
                return function (n) {
                    let s = 1;
                    if (a[n]) {
                        return a[n];
                    }
                    for (let i = n; i > 1; i--) {
                        s *= i;
                    }
                    a[n] = s;
                    return s;
                };
            })(),
            CatmullRom: function (p0, p1, p2, p3, t) {
                const v0 = (p2 - p0) * 0.5;
                const v1 = (p3 - p1) * 0.5;
                const t2 = t * t;
                const t3 = t * t2;
                return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
            },
        },
    };
    class Group {
        _tweens = {};
        _tweensAddedDuringUpdate = {};
        getAll() {
            return Object.keys(this._tweens).map(tweenId => {
                return this._tweens[tweenId];
            });
        }
        removeAll() {
            this._tweens = {};
        }
        add(tween) {
            this._tweens[tween.getId()] = tween;
            this._tweensAddedDuringUpdate[tween.getId()] = tween;
        }
        remove(tween) {
            delete this._tweens[tween.getId()];
            delete this._tweensAddedDuringUpdate[tween.getId()];
        }
        update(time = exports.now(), preserve = false) {
            let tweenIds = Object.keys(this._tweens);
            if (tweenIds.length === 0) {
                return false;
            }
            // Tweens are updated in "batches". If you add a new tween during an
            // update, then the new tween will be updated in the next batch.
            // If you remove a tween during an update, it may or may not be updated.
            // However, if the removed tween was added during the current batch,
            // then it will not be updated.
            while (tweenIds.length > 0) {
                this._tweensAddedDuringUpdate = {};
                for (let i = 0; i < tweenIds.length; i++) {
                    const tween = this._tweens[tweenIds[i]];
                    const autoStart = !preserve;
                    if (tween && tween.update(time, autoStart) === false && !preserve) {
                        delete this._tweens[tweenIds[i]];
                    }
                }
                tweenIds = Object.keys(this._tweensAddedDuringUpdate);
            }
            return true;
        }
    }
    const mainGroup = new Group();
    /**
     * The Ease class provides a collection of easing functions for use with tween.js.
     */
    const Easing = {
        Linear: {
            None: function (amount) {
                return amount;
            },
        },
        Quadratic: {
            In: function (amount) {
                return amount * amount;
            },
            Out: function (amount) {
                return amount * (2 - amount);
            },
            InOut: function (amount) {
                if ((amount *= 2) < 1) {
                    return 0.5 * amount * amount;
                }
                return -0.5 * (--amount * (amount - 2) - 1);
            },
        },
        Cubic: {
            In: function (amount) {
                return amount * amount * amount;
            },
            Out: function (amount) {
                return --amount * amount * amount + 1;
            },
            InOut: function (amount) {
                if ((amount *= 2) < 1) {
                    return 0.5 * amount * amount * amount;
                }
                return 0.5 * ((amount -= 2) * amount * amount + 2);
            },
        },
        Quartic: {
            In: function (amount) {
                return amount * amount * amount * amount;
            },
            Out: function (amount) {
                return 1 - --amount * amount * amount * amount;
            },
            InOut: function (amount) {
                if ((amount *= 2) < 1) {
                    return 0.5 * amount * amount * amount * amount;
                }
                return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
            },
        },
        Quintic: {
            In: function (amount) {
                return amount * amount * amount * amount * amount;
            },
            Out: function (amount) {
                return --amount * amount * amount * amount * amount + 1;
            },
            InOut: function (amount) {
                if ((amount *= 2) < 1) {
                    return 0.5 * amount * amount * amount * amount * amount;
                }
                return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
            },
        },
        Sinusoidal: {
            In: function (amount) {
                return 1 - Math.sin(((1.0 - amount) * Math.PI) / 2);
            },
            Out: function (amount) {
                return Math.sin((amount * Math.PI) / 2);
            },
            InOut: function (amount) {
                return 0.5 * (1 - Math.sin(Math.PI * (0.5 - amount)));
            },
        },
        Exponential: {
            In: function (amount) {
                return amount === 0 ? 0 : Math.pow(1024, amount - 1);
            },
            Out: function (amount) {
                return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
            },
            InOut: function (amount) {
                if (amount === 0) {
                    return 0;
                }
                if (amount === 1) {
                    return 1;
                }
                if ((amount *= 2) < 1) {
                    return 0.5 * Math.pow(1024, amount - 1);
                }
                return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
            },
        },
        Circular: {
            In: function (amount) {
                return 1 - Math.sqrt(1 - amount * amount);
            },
            Out: function (amount) {
                return Math.sqrt(1 - --amount * amount);
            },
            InOut: function (amount) {
                if ((amount *= 2) < 1) {
                    return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
                }
                return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
            },
        },
        Elastic: {
            In: function (amount) {
                if (amount === 0) {
                    return 0;
                }
                if (amount === 1) {
                    return 1;
                }
                return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            },
            Out: function (amount) {
                if (amount === 0) {
                    return 0;
                }
                if (amount === 1) {
                    return 1;
                }
                return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
            },
            InOut: function (amount) {
                if (amount === 0) {
                    return 0;
                }
                if (amount === 1) {
                    return 1;
                }
                amount *= 2;
                if (amount < 1) {
                    return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
                }
                return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
            },
        },
        Back: {
            In: function (amount) {
                const s = 1.70158;
                return amount === 1 ? 1 : amount * amount * ((s + 1) * amount - s);
            },
            Out: function (amount) {
                const s = 1.70158;
                return amount === 0 ? 0 : --amount * amount * ((s + 1) * amount + s) + 1;
            },
            InOut: function (amount) {
                const s = 1.70158 * 1.525;
                if ((amount *= 2) < 1) {
                    return 0.5 * (amount * amount * ((s + 1) * amount - s));
                }
                return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
            },
        },
        Bounce: {
            In: function (amount) {
                return 1 - Easing.Bounce.Out(1 - amount);
            },
            Out: function (amount) {
                if (amount < 1 / 2.75) {
                    return 7.5625 * amount * amount;
                }
                else if (amount < 2 / 2.75) {
                    return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
                }
                else if (amount < 2.5 / 2.75) {
                    return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
                }
                else {
                    return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
                }
            },
            InOut: function (amount) {
                if (amount < 0.5) {
                    return Easing.Bounce.In(amount * 2) * 0.5;
                }
                return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
            },
        },
        generatePow: function (power = 4) {
            power = power < Number.EPSILON ? Number.EPSILON : power;
            power = power > 10000 ? 10000 : power;
            return {
                In: function (amount) {
                    return amount ** power;
                },
                Out: function (amount) {
                    return 1 - (1 - amount) ** power;
                },
                InOut: function (amount) {
                    if (amount < 0.5) {
                        return (amount * 2) ** power / 2;
                    }
                    return (1 - (2 - amount * 2) ** power) / 2 + 0.5;
                },
            };
        },
    };
    class Tween {
        _object;
        _group;
        _isPaused = false;
        _pauseStart = 0;
        _valuesStart = {};
        _valuesEnd = {};
        _valuesStartRepeat = {};
        _duration = 1000;
        _initialRepeat = 0;
        _repeat = 0;
        _repeatDelayTime;
        _yoyo = false;
        _isPlaying = false;
        _reversed = false;
        _delayTime = 0;
        _startTime = 0;
        _easingFunction = Easing.Linear.None;
        _interpolationFunction = Interpolation.Linear;
        // eslint-disable-next-line
        _chainedTweens = [];
        _onStartCallback;
        _onStartCallbackFired = false;
        _onUpdateCallback;
        _onRepeatCallback;
        _onCompleteCallback;
        _onStopCallback;
        _id = Sequence.nextId();
        _isChainStopped = false;
        constructor(_object, _group = mainGroup) {
            this._object = _object;
            this._group = _group;
        }
        getId() {
            return this._id;
        }
        isPlaying() {
            return this._isPlaying;
        }
        isPaused() {
            return this._isPaused;
        }
        to(properties, duration) {
            // TODO? restore this, then update the 07_dynamic_to example to set fox
            // tween's to on each update. That way the behavior is opt-in (there's
            // currently no opt-out).
            // for (const prop in properties) this._valuesEnd[prop] = properties[prop]
            this._valuesEnd = Object.create(properties);
            if (duration !== undefined) {
                this._duration = duration;
            }
            return this;
        }
        duration(d = 1000) {
            this._duration = d;
            return this;
        }
        start(time = exports.now()) {
            if (this._isPlaying) {
                return this;
            }
            // eslint-disable-next-line
            this._group && this._group.add(this);
            this._repeat = this._initialRepeat;
            if (this._reversed) {
                // If we were reversed (f.e. using the yoyo feature) then we need to
                // flip the tween direction back to forward.
                this._reversed = false;
                for (const property in this._valuesStartRepeat) {
                    this._swapEndStartRepeatValues(property);
                    this._valuesStart[property] = this._valuesStartRepeat[property];
                }
            }
            this._isPlaying = true;
            this._isPaused = false;
            this._onStartCallbackFired = false;
            this._isChainStopped = false;
            this._startTime = time;
            this._startTime += this._delayTime;
            this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
            return this;
        }
        _setupProperties(_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
            for (const property in _valuesEnd) {
                const startValue = _object[property];
                const startValueIsArray = Array.isArray(startValue);
                const propType = startValueIsArray ? 'array' : typeof startValue;
                const isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
                // If `to()` specifies a property that doesn't exist in the source object,
                // we should not set that property in the object
                if (propType === 'undefined' || propType === 'function') {
                    continue;
                }
                // Check if an Array was provided as property value
                if (isInterpolationList) {
                    let endValues = _valuesEnd[property];
                    if (endValues.length === 0) {
                        continue;
                    }
                    // handle an array of relative values
                    endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
                    // Create a local copy of the Array with the start value at the front
                    _valuesEnd[property] = [startValue].concat(endValues);
                }
                // handle the deepness of the values
                if ((propType === 'object' || startValueIsArray) && startValue && !isInterpolationList) {
                    _valuesStart[property] = startValueIsArray ? [] : {};
                    // eslint-disable-next-line
                    for (const prop in startValue) {
                        // eslint-disable-next-line
                        // @ts-ignore FIXME?
                        _valuesStart[property][prop] = startValue[prop];
                    }
                    _valuesStartRepeat[property] = startValueIsArray ? [] : {}; // TODO? repeat nested values? And yoyo? And array values?
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
                }
                else {
                    // Save the starting value, but only once.
                    if (typeof _valuesStart[property] === 'undefined') {
                        _valuesStart[property] = startValue;
                    }
                    if (!startValueIsArray) {
                        // eslint-disable-next-line
                        // @ts-ignore FIXME?
                        _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                    }
                    if (isInterpolationList) {
                        // eslint-disable-next-line
                        // @ts-ignore FIXME?
                        _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
                    }
                    else {
                        _valuesStartRepeat[property] = _valuesStart[property] || 0;
                    }
                }
            }
        }
        stop() {
            if (!this._isChainStopped) {
                this._isChainStopped = true;
                this.stopChainedTweens();
            }
            if (!this._isPlaying) {
                return this;
            }
            // eslint-disable-next-line
            this._group && this._group.remove(this);
            this._isPlaying = false;
            this._isPaused = false;
            if (this._onStopCallback) {
                this._onStopCallback(this._object);
            }
            return this;
        }
        end() {
            this._goToEnd = true;
            this.update(Infinity);
            return this;
        }
        pause(time = exports.now()) {
            if (this._isPaused || !this._isPlaying) {
                return this;
            }
            this._isPaused = true;
            this._pauseStart = time;
            // eslint-disable-next-line
            this._group && this._group.remove(this);
            return this;
        }
        resume(time = exports.now()) {
            if (!this._isPaused || !this._isPlaying) {
                return this;
            }
            this._isPaused = false;
            this._startTime += time - this._pauseStart;
            this._pauseStart = 0;
            // eslint-disable-next-line
            this._group && this._group.add(this);
            return this;
        }
        stopChainedTweens() {
            for (let i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                this._chainedTweens[i].stop();
            }
            return this;
        }
        group(group = mainGroup) {
            this._group = group;
            return this;
        }
        delay(amount = 0) {
            this._delayTime = amount;
            return this;
        }
        repeat(times = 0) {
            this._initialRepeat = times;
            this._repeat = times;
            return this;
        }
        repeatDelay(amount) {
            this._repeatDelayTime = amount;
            return this;
        }
        yoyo(yoyo = false) {
            this._yoyo = yoyo;
            return this;
        }
        easing(easingFunction = Easing.Linear.None) {
            this._easingFunction = easingFunction;
            return this;
        }
        interpolation(interpolationFunction = Interpolation.Linear) {
            this._interpolationFunction = interpolationFunction;
            return this;
        }
        // eslint-disable-next-line
        chain(...tweens) {
            this._chainedTweens = tweens;
            return this;
        }
        onStart(callback) {
            this._onStartCallback = callback;
            return this;
        }
        onUpdate(callback) {
            this._onUpdateCallback = callback;
            return this;
        }
        onRepeat(callback) {
            this._onRepeatCallback = callback;
            return this;
        }
        onComplete(callback) {
            this._onCompleteCallback = callback;
            return this;
        }
        onStop(callback) {
            this._onStopCallback = callback;
            return this;
        }
        _goToEnd = false;
        /**
         * @returns true if the tween is still playing after the update, false
         * otherwise (calling update on a paused tween still returns true because
         * it is still playing, just paused).
         */
        update(time = exports.now(), autoStart = true) {
            if (this._isPaused)
                return true;
            let property;
            let elapsed;
            const endTime = this._startTime + this._duration;
            if (!this._goToEnd && !this._isPlaying) {
                if (time > endTime)
                    return false;
                if (autoStart)
                    this.start(time);
            }
            this._goToEnd = false;
            if (time < this._startTime) {
                return true;
            }
            if (this._onStartCallbackFired === false) {
                if (this._onStartCallback) {
                    this._onStartCallback(this._object);
                }
                this._onStartCallbackFired = true;
            }
            elapsed = (time - this._startTime) / this._duration;
            elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
            const value = this._easingFunction(elapsed);
            // properties transformations
            this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
            if (this._onUpdateCallback) {
                this._onUpdateCallback(this._object, elapsed);
            }
            if (elapsed === 1) {
                if (this._repeat > 0) {
                    if (isFinite(this._repeat)) {
                        this._repeat--;
                    }
                    // Reassign starting values, restart by making startTime = now
                    for (property in this._valuesStartRepeat) {
                        if (!this._yoyo && typeof this._valuesEnd[property] === 'string') {
                            this._valuesStartRepeat[property] =
                                // eslint-disable-next-line
                                // @ts-ignore FIXME?
                                this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                        }
                        if (this._yoyo) {
                            this._swapEndStartRepeatValues(property);
                        }
                        this._valuesStart[property] = this._valuesStartRepeat[property];
                    }
                    if (this._yoyo) {
                        this._reversed = !this._reversed;
                    }
                    if (this._repeatDelayTime !== undefined) {
                        this._startTime = time + this._repeatDelayTime;
                    }
                    else {
                        this._startTime = time + this._delayTime;
                    }
                    if (this._onRepeatCallback) {
                        this._onRepeatCallback(this._object);
                    }
                    return true;
                }
                else {
                    if (this._onCompleteCallback) {
                        this._onCompleteCallback(this._object);
                    }
                    for (let i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                        // Make the chained tweens start exactly at the time they should,
                        // even if the `update()` method was called way past the duration of the tween
                        this._chainedTweens[i].start(this._startTime + this._duration);
                    }
                    this._isPlaying = false;
                    return false;
                }
            }
            return true;
        }
        _updateProperties(_object, _valuesStart, _valuesEnd, value) {
            for (const property in _valuesEnd) {
                // Don't update properties that do not exist in the source object
                if (_valuesStart[property] === undefined) {
                    continue;
                }
                const start = _valuesStart[property] || 0;
                let end = _valuesEnd[property];
                const startIsArray = Array.isArray(_object[property]);
                const endIsArray = Array.isArray(end);
                const isInterpolationList = !startIsArray && endIsArray;
                if (isInterpolationList) {
                    _object[property] = this._interpolationFunction(end, value);
                }
                else if (typeof end === 'object' && end) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    this._updateProperties(_object[property], start, end, value);
                }
                else {
                    // Parses relative end values with start as base (e.g.: +10, -3)
                    end = this._handleRelativeValue(start, end);
                    // Protect against non numeric properties.
                    if (typeof end === 'number') {
                        // eslint-disable-next-line
                        // @ts-ignore FIXME?
                        _object[property] = start + (end - start) * value;
                    }
                }
            }
        }
        _handleRelativeValue(start, end) {
            if (typeof end !== 'string') {
                return end;
            }
            if (end.charAt(0) === '+' || end.charAt(0) === '-') {
                return start + parseFloat(end);
            }
            else {
                return parseFloat(end);
            }
        }
        _swapEndStartRepeatValues(property) {
            const tmp = this._valuesStartRepeat[property];
            const endValue = this._valuesEnd[property];
            if (typeof endValue === 'string') {
                this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
            }
            else {
                this._valuesStartRepeat[property] = this._valuesEnd[property];
            }
            this._valuesEnd[property] = tmp;
        }
    }
    const VERSION = '18.6.4';
    const nextId = Sequence.nextId;
    /**
     * Controlling groups of tweens
     *
     * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
     * In these cases, you may want to create your own smaller groups of tweens.
     */
    const TWEEN = mainGroup;
    // This is the best way to export things in a way that's compatible with both ES
    // Modules and CommonJS, without build hacks, and so as not to break the
    // existing API.
    // https://github.com/rollup/rollup/issues/1961#issuecomment-423037881
    const getAll = TWEEN.getAll.bind(TWEEN);
    const removeAll = TWEEN.removeAll.bind(TWEEN);
    const add = TWEEN.add.bind(TWEEN);
    const remove = TWEEN.remove.bind(TWEEN);
    const update = TWEEN.update.bind(TWEEN);

    exports.AIMachine = AIMachine;
    exports.AIState = AIState;
    exports.Action = Action;
    exports.Action1 = Action1;
    exports.Action2 = Action2;
    exports.AutoInit = AutoInit;
    exports.CallBack = CallBack;
    exports.CameraUtil = CameraUtil;
    exports.CanvasController = CanvasController;
    exports.DataCenterC = DataCenterC;
    exports.DataCenterS = DataCenterS;
    exports.DataInfo = DataInfo;
    exports.Easing = Easing;
    exports.Effect = Effect;
    exports.EffectData = EffectData;
    exports.EventListenerBatch = EventListenerBatch;
    exports.GoNode = GoNode;
    exports.Group = Group;
    exports.IAAServiceSDK = IAAServiceSDK;
    exports.Interpolation = Interpolation;
    exports.MathUtil = MathUtil;
    exports.ModuleC = ModuleC;
    exports.ModuleData = ModuleData;
    exports.ModuleManager = ModuleManager;
    exports.ModuleS = ModuleS;
    exports.NetObject = NetObject;
    exports.NetObjectC = NetObjectC;
    exports.NetObjectS = NetObjectS;
    exports.NoReply = NoReply;
    exports.ObjPool = ObjPool;
    exports.OdinGame = OdinGame;
    exports.PanelBase = PanelBase;
    exports.PlayerData = PlayerData;
    exports.Sequence = Sequence;
    exports.Singleton = Singleton;
    exports.Sound = Sound;
    exports.StringUtil = StringUtil;
    exports.SuperPanelBase = SuperPanelBase;
    exports.TabGroup = TabGroup;
    exports.TimeUtil = TimeUtil;
    exports.Tween = Tween;
    exports.UI = UI;
    exports.VERSION = VERSION;
    exports.ViewBase = ViewBase;
    exports.add = add;
    exports.getAll = getAll;
    exports.isListenServer = isListenServer;
    exports.mainGroup = mainGroup;
    exports.nextId = nextId;
    exports.oTrace = oTrace;
    exports.oTraceError = oTraceError;
    exports.oTraceWarning = oTraceWarning;
    exports.remove = remove;
    exports.removeAll = removeAll;
    exports.ts_splash_loading_end = ts_splash_loading_end;
    exports.ts_splash_loading_start = ts_splash_loading_start;
    exports.update = update;

    }(dist));

    class CoinDataInfo extends dist.DataInfo {
      count;
    }
    class CoinData extends dist.ModuleData {
      constructor() {
        super(CoinDataInfo);
      }
      initDefaultData() {
        this.dataInfo.count = 0;
      }
      onDataInit() {
        this.dataInfo.count = 0;
      }
      addCount(count) {
        this.dataInfo.count += count;
        return this.dataInfo.count;
      }
      get count() {
        return this.dataInfo.count;
      }
    }

    var foreign1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        CoinData: CoinData
    }, Symbol.toStringTag, { value: 'Module' }));

    class CoinModuleC extends dist.ModuleC {
      coins;
      _coinRotation = new Type__default["default"].Rotation(0, 0, 0);
      onAwake() {
        this.coins = [];
      }
      onStart() {
        this.coins = MWCore__default["default"].GameObject.getGameObjectsByName("Coin");
        this.coins.forEach((coin) => {
          const trigger = coin.getChildByName("BoxTrigger");
          trigger.onEnter.Add((gameobject) => {
            if (GamePlay__default["default"].isCharacter(gameobject)) {
              const playerID = gameobject.player.getPlayerID();
              if (playerID == this.currentPlayerId) {
                const coinIndex = this.coins.indexOf(coin);
                this.server.net_Eat(gameobject.location);
                this.coins.splice(coinIndex, 1);
                coin.destroy();
              }
            }
          });
        });
      }
      onUpdate(dt) {
        this._coinRotation.z += dt * 100;
        this.coins.forEach((coin) => {
          coin.rotation = this._coinRotation;
        });
      }
    }

    var foreign2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        CoinModuleC: CoinModuleC
    }, Symbol.toStringTag, { value: 'Module' }));

    class CoinModuleS extends dist.ModuleS {
      onStart() {
      }
      net_Eat(pos) {
        this.currentData.addCount(1);
        this.currentData.saveData(true);
        dist.SoundManager.instance.play3DSound("14639", pos, 1, 0.5);
      }
    }

    var foreign3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        CoinModuleS: CoinModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class PlayerDataInfo extends dist.DataInfo {
      hp;
      canFly;
      flyCD;
      canInvisible;
      invisibleCD;
      deathCountDown;
    }
    class PlayerData extends dist.ModuleData {
      constructor() {
        super(PlayerDataInfo);
      }
      initDefaultData() {
        this.dataInfo.hp = 100;
        this.dataInfo.flyCD = 0;
        this.dataInfo.invisibleCD = 0;
      }
      onDataInit() {
        this.dataInfo.hp = 100;
        this.dataInfo.flyCD = 0;
        this.dataInfo.invisibleCD = 0;
        this.dataInfo.canFly = false;
        this.dataInfo.canInvisible = false;
      }
      minusHp(damage) {
        this.dataInfo.hp -= damage;
      }
      initHp() {
        this.dataInfo.hp = 100;
      }
      setCanFly(value) {
        this.dataInfo.canFly = value;
      }
      startFlyCD() {
        this.dataInfo.flyCD = 10;
      }
      minusFlyCD() {
        this.dataInfo.flyCD--;
      }
      setCanInvisible(value) {
        this.dataInfo.canInvisible = value;
      }
      startInvisibleCD() {
        this.dataInfo.invisibleCD = 10;
      }
      minusInvisibleCD() {
        this.dataInfo.invisibleCD--;
      }
      startDeathCount() {
        this.dataInfo.deathCountDown = 5;
      }
      minusDeathCount() {
        this.dataInfo.deathCountDown--;
      }
      get hp() {
        return this.dataInfo.hp;
      }
      get deathCountDown() {
        return this.dataInfo.deathCountDown;
      }
      get canFly() {
        return this.dataInfo.canFly;
      }
      get flyCD() {
        return this.dataInfo.flyCD;
      }
      get canInvisible() {
        return this.dataInfo.canInvisible;
      }
      get invisibleCD() {
        return this.dataInfo.invisibleCD;
      }
    }

    var foreign18 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        PlayerData: PlayerData
    }, Symbol.toStringTag, { value: 'Module' }));

    var LanUtil;
    ((LanUtil2) => {
      function setUILanguage(ui) {
        if (!this.getLan) {
          return;
        }
        let key = null;
        if (ui instanceof MWGameUI__default["default"].MWUIButton) {
          key = ui.getButtonString();
        } else {
          key = ui.getText();
        }
        if (key) {
          let lan = this.getLan(key);
          if (lan) {
            if (ui instanceof MWGameUI__default["default"].MWUIButton) {
              ui.setButtonString(lan.Value);
            } else {
              ui.setText(lan.Value);
            }
          }
        }
      }
      LanUtil2.setUILanguage = setUILanguage;
    })(LanUtil || (LanUtil = {}));
    class UI_DeadUI extends dist.ViewBase {
      mDeathCountDown;
      constructor() {
        super("DeadUI");
      }
      buildSelf() {
        this.mDeathCountDown = this.findChildByPath(MWGameUI__default["default"].MWUITextblock, "Canvas/mDeathCountDown");
        LanUtil.setUILanguage(this.mDeathCountDown);
      }
    }
    class UI_GameUI extends dist.ViewBase {
      mJumpButton;
      mCrossHairs;
      mFireJoyStick;
      mFlyButton;
      mFlyCountDown;
      mInvisibleButton;
      mInvisibleCountDown;
      mCoinImage;
      mCoinCount;
      mHealthBar;
      mCountDown;
      constructor() {
        super("GameUI");
      }
      buildSelf() {
        this.mJumpButton = this.findChildByPath(MWGameUI__default["default"].MWUIButton, "Canvas/mJumpButton");
        this.mCrossHairs = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "Canvas/CrossHairs/mCrossHairs");
        this.mFireJoyStick = this.findChildByPath(MWGameUI__default["default"].MWUIVirtualJoystickPanel, "Canvas/mFireJoyStick");
        this.mFlyButton = this.findChildByPath(MWGameUI__default["default"].MWUIButton, "Canvas/mFlyButton");
        this.mFlyCountDown = this.findChildByPath(MWGameUI__default["default"].MWUITextblock, "Canvas/mFlyCountDown");
        this.mInvisibleButton = this.findChildByPath(MWGameUI__default["default"].MWUIButton, "Canvas/mInvisibleButton");
        this.mInvisibleCountDown = this.findChildByPath(MWGameUI__default["default"].MWUITextblock, "Canvas/mInvisibleCountDown");
        this.mCoinImage = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "Canvas/mCoinImage");
        this.mCoinCount = this.findChildByPath(MWGameUI__default["default"].MWUITextblock, "Canvas/mCoinCount");
        this.mHealthBar = this.findChildByPath(MWGameUI__default["default"].MWUIProgressbar, "Canvas/mHealthBar");
        this.mCountDown = this.findChildByPath(MWGameUI__default["default"].MWUITextblock, "Canvas/mCountDown");
        this.mJumpButton.onClicked().add(() => {
          Events__default["default"].dispatchLocal("PlayButtonClick", "mJumpButton");
        });
        LanUtil.setUILanguage(this.mJumpButton);
        this.mFlyButton.onClicked().add(() => {
          Events__default["default"].dispatchLocal("PlayButtonClick", "mFlyButton");
        });
        LanUtil.setUILanguage(this.mFlyButton);
        LanUtil.setUILanguage(this.mFlyCountDown);
        this.mInvisibleButton.onClicked().add(() => {
          Events__default["default"].dispatchLocal("PlayButtonClick", "mInvisibleButton");
        });
        LanUtil.setUILanguage(this.mInvisibleButton);
        LanUtil.setUILanguage(this.mInvisibleCountDown);
        LanUtil.setUILanguage(this.mCoinCount);
        LanUtil.setUILanguage(this.mCountDown);
      }
    }
    class UI_HitPromptUI extends dist.ViewBase {
      mUp;
      mUpRight;
      mRight;
      mLowRight;
      mLow;
      mLowLeft;
      mLeft;
      mUpLeft;
      constructor() {
        super("HitPromptUI");
      }
      buildSelf() {
        this.mUp = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "Canvas/mUp");
        this.mUpRight = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "Canvas/mUpRight");
        this.mRight = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "Canvas/mRight");
        this.mLowRight = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "Canvas/mLowRight");
        this.mLow = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "Canvas/mLow");
        this.mLowLeft = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "Canvas/mLowLeft");
        this.mLeft = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "Canvas/mLeft");
        this.mUpLeft = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "Canvas/mUpLeft");
      }
    }
    class UI_Main extends dist.ViewBase {
      constructor() {
        super("Main");
      }
      buildSelf() {
      }
    }
    class UI_StartGameUI extends dist.ViewBase {
      mStartGameButton;
      constructor() {
        super("StartGameUI");
      }
      buildSelf() {
        this.mStartGameButton = this.findChildByPath(MWGameUI__default["default"].MWUIButton, "MWCanvas_2147482460/mStartGameButton");
        this.mStartGameButton.onClicked().add(() => {
          Events__default["default"].dispatchLocal("PlayButtonClick", "mStartGameButton");
        });
        LanUtil.setUILanguage(this.mStartGameButton);
      }
    }
    class UI_UIRoot extends dist.ViewBase {
      constructor() {
        super("UIRoot");
      }
      buildSelf() {
      }
    }

    var foreign25 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get LanUtil () { return LanUtil; },
        UI_DeadUI: UI_DeadUI,
        UI_GameUI: UI_GameUI,
        UI_HitPromptUI: UI_HitPromptUI,
        UI_Main: UI_Main,
        UI_StartGameUI: UI_StartGameUI,
        UI_UIRoot: UI_UIRoot
    }, Symbol.toStringTag, { value: 'Module' }));

    class DeathCountDownUI extends UI_DeadUI {
      onStart() {
        dist.DataCenterC.instance.getModuleData(PlayerData).onDataChange.add(() => {
          this.mDeathCountDown.setText(dist.DataCenterC.instance.getModuleData(PlayerData).deathCountDown.toString());
        });
      }
      onDestroy() {
        dist.DataCenterC.instance.getModuleData(PlayerData).onDataChange.clear();
      }
    }

    var foreign4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        DeathCountDownUI: DeathCountDownUI
    }, Symbol.toStringTag, { value: 'Module' }));

    var __defProp$7 = Object.defineProperty;
    var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
    var __decorateClass$7 = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp$7(target, key, result);
      return result;
    };
    let GameControl = class extends MWCore__default["default"].MWScript {
      MaxGameTime = 300;
      curTime;
      timer = 0;
      isGameStart;
      onStart() {
        if (GamePlay__default["default"].isServer()) {
          this.bUseUpdate = true;
          Events__default["default"].addLocalListener("startGame", () => {
            this.curTime = this.MaxGameTime;
            this.isGameStart = true;
          });
        }
      }
      onUpdate(dt) {
        if (this.isGameStart) {
          if (this.timer < 1) {
            this.timer += dt;
          } else {
            this.timer = 0;
            this.curTime--;
            Events__default["default"].dispatchToAllClient("curTime", this.curTime);
          }
        }
      }
      onDestroy() {
      }
    };
    __decorateClass$7([
      MWCore__default["default"].MWProperty()
    ], GameControl.prototype, "MaxGameTime", 2);
    GameControl = __decorateClass$7([
      MWCore__default["default"].MWClass
    ], GameControl);

    var foreign5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get default () { return GameControl; }
    }, Symbol.toStringTag, { value: 'Module' }));

    class GameControlDataInfo extends dist.DataInfo {
      curTime;
    }
    class GameControlData extends dist.ModuleData {
      constructor() {
        super(GameControlDataInfo);
      }
      onDataInit() {
      }
      setCurTime(value) {
        this.dataInfo.curTime = value;
      }
      get curTime() {
        return this.dataInfo.curTime;
      }
    }

    var foreign6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        GameControlData: GameControlData
    }, Symbol.toStringTag, { value: 'Module' }));

    class PlayerModuleC extends dist.ModuleC {
      playerData;
      isDead = false;
      deadTimer = 0;
      flyTimer = 0;
      invisibleTimer = 0;
      onStart() {
        this.playerData = dist.DataCenterC.instance.getModuleData(PlayerData);
      }
      onUpdate(dt) {
        this.checkIsDead();
        this.deathCountDown(dt);
        this.flyCountDown(dt);
        this.invisibleCountDown(dt);
        this.checkOutOfMap();
      }
      checkOutOfMap() {
        if (!this.isDead && (this.currentPlayer.character.location.z < -1e3 || this.currentPlayer.character.location.y < -6e3 || this.currentPlayer.character.location.x > 6800 || this.currentPlayer.character.location.y > 7800 || this.currentPlayer.character.location.x < -11e3)) {
          this.isDead = true;
          this.server.net_PlayerDead();
          dist.UI.instance.hidePanel(GameUI);
          dist.UI.instance.showPanel(DeathCountDownUI);
        }
      }
      checkIsDead() {
        if (this.playerData.hp <= 0 && !this.isDead) {
          this.isDead = true;
          this.server.net_PlayerDead();
          dist.UI.instance.hidePanel(GameUI);
          dist.UI.instance.showPanel(DeathCountDownUI);
        }
      }
      deathCountDown(dt) {
        if (this.isDead) {
          if (this.deadTimer < 1) {
            this.deadTimer += dt;
          } else {
            this.deadTimer = 0;
            this.server.net_DeathCount();
            if (this.playerData.deathCountDown <= 0) {
              setTimeout(() => {
                this.isDead = false;
              }, 500);
              this.server.net_PlayerRecover();
              dist.UI.instance.showPanel(GameUI);
              dist.UI.instance.hidePanel(DeathCountDownUI);
            }
          }
        }
      }
      startFly() {
        this.server.net_PlayerFly();
      }
      startInvisible() {
        this.server.net_PlayerInvisible();
      }
      flyCountDown(dt) {
        if (this.playerData.flyCD > 0) {
          if (this.flyTimer < 1) {
            this.flyTimer += dt;
          } else {
            this.flyTimer = 0;
            this.server.net_PlayerFlyCount();
          }
        }
      }
      invisibleCountDown(dt) {
        if (this.playerData.invisibleCD > 0) {
          if (this.invisibleTimer < 1) {
            this.invisibleTimer += dt;
          } else {
            this.invisibleTimer = 0;
            this.server.net_PlayerInvisibleCount();
          }
        }
      }
    }

    var foreign19 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        PlayerModuleC: PlayerModuleC
    }, Symbol.toStringTag, { value: 'Module' }));

    class WeaponModuleC extends dist.ModuleC {
      isShoot = false;
      shootTime = 0;
      shootCD = 0.2;
      fireEffect;
      isEquipWeapon = false;
      onStart() {
        this.isEquipWeapon = false;
      }
      onUpdate(dt) {
        if (this.isShoot && this.isEquipWeapon) {
          if (this.shootTime < this.shootCD) {
            this.shootTime += dt;
          } else {
            this.shootTime = 0;
            this.checkCollision();
          }
        }
      }
      pickWeapon(player, weaponObj, fireEffect) {
        if (player == this.currentPlayer && !this.isEquipWeapon) {
          this.isEquipWeapon = true;
          this.fireEffect = fireEffect;
          weaponObj.getChildByName("BoxTrigger").destroy();
          this.server.net_Equiped(this.currentPlayer, weaponObj);
          player.character.animationStance = GamePlay__default["default"].AnimationStanceType.RifleStand;
          player.character.moveFacingDirection = GamePlay__default["default"].MoveFacingDirection.ControllerDirection;
          player.character.movementDirection = GamePlay__default["default"].MovementDirection.ControllerDirection;
          let gameUI = dist.UI.instance.getPanel(GameUI);
          gameUI.mFireJoyStick.setVisibility(MWGameUI__default["default"].ESlateVisibility.Visible);
          gameUI.mCrossHairs.setVisibility(MWGameUI__default["default"].ESlateVisibility.Visible);
        }
      }
      startShoot() {
        this.isShoot = true;
      }
      stopShoot() {
        this.isShoot = false;
        this.currentPlayer.character.animationStance = GamePlay__default["default"].AnimationStanceType.RifleStand;
      }
      checkCollision() {
        if (this.currentPlayer.character.animationStance != GamePlay__default["default"].AnimationStanceType.RifleAimStand)
          this.currentPlayer.character.animationStance = GamePlay__default["default"].AnimationStanceType.RifleAimStand;
        dist.SoundManager.instance.play3DSound("12563", this.fireEffect, 1, 0.5);
        dist.EffectManager.instance.playEffectInGameObject("4388", this.fireEffect, 1);
        let startLoc = this.fireEffect.location;
        let endLoc = startLoc.addition(this.currentPlayer.character.cameraSystem.cameraWorldTransform.getForwardVector().multiply(1e4));
        endLoc.y += this.randomRange(-200, 200);
        endLoc.z += this.randomRange(-200, 200);
        let hitResults = GamePlay__default["default"].lineTrace(this.currentPlayer, startLoc, endLoc, false, false);
        if (GamePlay__default["default"].isCharacter(hitResults[0].gameObject)) {
          console.log("hit character:");
          Events__default["default"].dispatchToServer("playerHit", hitResults[0].gameObject.player, this.currentPlayer.character.location);
          this.server.net_HitPlayer(hitResults[0].gameObject.player);
        } else if (GamePlay__default["default"].isAICharacter(hitResults[0].gameObject)) {
          console.log("hit NPC");
          this.server.net_HitNpc(hitResults[0].gameObject);
        }
        this.server.net_PlayHitEffect(hitResults[0].location);
      }
      randomRange(min, max) {
        return Math.random() * (max - min + 1) + min;
      }
    }

    var foreign26 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        WeaponModuleC: WeaponModuleC
    }, Symbol.toStringTag, { value: 'Module' }));

    var __defProp$6 = Object.defineProperty;
    var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
    var __decorateClass$6 = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp$6(target, key, result);
      return result;
    };
    let GameUI = class extends UI_GameUI {
      onStart() {
        if (GamePlay__default["default"].isClient()) {
          let coinData = dist.DataCenterC.instance.getModuleData(CoinData);
          this.mCoinCount.setText(coinData.count.toString());
          coinData.onDataChange.add(() => {
            this.mCoinCount.setText(coinData.count.toString());
          });
          this.mFireJoyStick.onJoyStickDown().add(() => {
            dist.ModuleManager.instance.getModule(WeaponModuleC).startShoot();
          });
          this.mFireJoyStick.onJoyStickUp().add(() => {
            dist.ModuleManager.instance.getModule(WeaponModuleC).stopShoot();
          });
          let playerData = dist.DataCenterC.instance.getModuleData(PlayerData);
          playerData.onDataChange.add(() => {
            if (playerData.canFly) {
              this.mFlyButton.setVisibility(MWGameUI__default["default"].ESlateVisibility.Visible);
              this.mFlyCountDown.setVisibility(MWGameUI__default["default"].ESlateVisibility.Visible);
              if (playerData.flyCD > 0) {
                this.mFlyCountDown.setText(playerData.flyCD.toString());
              } else {
                this.mFlyCountDown.setText("\u98DE\u884C");
              }
            } else {
              this.mFlyButton.setVisibility(MWGameUI__default["default"].ESlateVisibility.Hidden);
              this.mFlyCountDown.setVisibility(MWGameUI__default["default"].ESlateVisibility.Hidden);
            }
          });
          this.mFlyButton.onReleased().add(() => {
            dist.ModuleManager.instance.getModule(PlayerModuleC).startFly();
          });
          playerData.onDataChange.add(() => {
            if (playerData.canInvisible) {
              this.mInvisibleButton.setVisibility(MWGameUI__default["default"].ESlateVisibility.Visible);
              this.mInvisibleCountDown.setVisibility(MWGameUI__default["default"].ESlateVisibility.Visible);
              if (playerData.invisibleCD > 0) {
                this.mInvisibleCountDown.setText(playerData.invisibleCD.toString());
              } else {
                this.mInvisibleCountDown.setText("\u9690\u8EAB");
              }
            } else {
              this.mInvisibleButton.setVisibility(MWGameUI__default["default"].ESlateVisibility.Hidden);
              this.mInvisibleCountDown.setVisibility(MWGameUI__default["default"].ESlateVisibility.Hidden);
            }
          });
          this.mInvisibleButton.onReleased().add(() => {
            dist.ModuleManager.instance.getModule(PlayerModuleC).startInvisible();
          });
          this.mHealthBar.setCurrentValue(playerData.hp);
          playerData.onDataChange.add(() => {
            this.mHealthBar.setCurrentValue(playerData.hp);
          });
          dist.DataCenterC.instance.getModuleData(GameControlData).onDataChange.add(() => {
            this.mCountDown.setText(dist.DataCenterC.instance.getModuleData(GameControlData).curTime.toString());
          });
        }
      }
      onDestroy() {
        if (GamePlay__default["default"].isClient()) {
          dist.DataCenterC.instance.getModuleData(CoinData).onDataChange.clear();
          dist.DataCenterC.instance.getModuleData(PlayerData).onDataChange.clear();
          dist.DataCenterC.instance.getModuleData(GameControlData).onDataChange.clear();
        }
      }
    };
    GameUI = __decorateClass$6([
      MWGameUI__default["default"].MWUIMono
    ], GameUI);

    var foreign10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get default () { return GameUI; }
    }, Symbol.toStringTag, { value: 'Module' }));

    class StartGameUI extends UI_StartGameUI {
      onStart() {
        this.mStartGameButton.onClicked().add(() => {
          dist.ModuleManager.instance.getModule(GameControlModuleC).StartGame();
        });
      }
    }

    var foreign23 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        StartGameUI: StartGameUI
    }, Symbol.toStringTag, { value: 'Module' }));

    class GameControlModuleC extends dist.ModuleC {
      execute(type, param) {
        dist.UI.instance.showPanel(StartGameUI);
      }
      onStart() {
        dist.UI.instance.showPanel(StartGameUI);
        Events__default["default"].addServerListener("curTime", (curTime) => {
          this.server.net_UpdateTime(curTime);
        });
      }
      StartGame() {
        dist.UI.instance.hidePanel(StartGameUI);
        dist.UI.instance.showPanel(GameUI);
        this.server.net_StartGame();
      }
    }

    var foreign7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        GameControlModuleC: GameControlModuleC
    }, Symbol.toStringTag, { value: 'Module' }));

    class GameControlModuleS extends dist.ModuleS {
      onStart() {
        dist.UI.instance.showPanel(StartGameUI);
      }
      execute(param, data) {
        dist.UI.instance.showPanel(StartGameUI);
      }
      net_StartGame() {
        Events__default["default"].dispatchLocal("startGame");
      }
      net_UpdateTime(curTime) {
        this.currentData.setCurTime(curTime);
        this.currentData.saveData(true);
      }
    }

    var foreign8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        GameControlModuleS: GameControlModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class HitPromptUI extends UI_HitPromptUI {
      promptArr = [];
      onStart() {
        if (GamePlay__default["default"].isClient()) {
          this.promptArr.push(this.mUp);
          this.promptArr.push(this.mUpRight);
          this.promptArr.push(this.mRight);
          this.promptArr.push(this.mLowRight);
          this.promptArr.push(this.mLow);
          this.promptArr.push(this.mLowLeft);
          this.promptArr.push(this.mLeft);
          this.promptArr.push(this.mUpLeft);
        }
      }
      updatePrompt(dirArr) {
        if (GamePlay__default["default"].isClient()) {
          for (let i = 0; i < dirArr.length; i++) {
            if (dirArr[i] > 0) {
              this.promptArr[i].setVisibility(MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible);
              this.promptArr[i].setRenderOpacity(dirArr[i]);
            } else {
              this.promptArr[i].setVisibility(MWGameUI__default["default"].ESlateVisibility.Hidden);
            }
          }
        }
      }
    }

    var foreign13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        'default': HitPromptUI
    }, Symbol.toStringTag, { value: 'Module' }));

    class HitPromptModuleC extends dist.ModuleC {
      DirArr;
      onStart() {
        dist.UI.instance.showPanel(HitPromptUI);
        this.DirArr = [];
        for (let i = 0; i <= 7; i++) {
          this.DirArr[i] = 0;
        }
      }
      onUpdate(dt) {
        for (let i = 0; i < this.DirArr.length; i++) {
          if (this.DirArr[i] > 0) {
            this.DirArr[i] -= dt;
          }
        }
        dist.UI.instance.getPanel(HitPromptUI).updatePrompt(this.DirArr);
      }
      net_ShowHitPrompt(loc) {
        console.log("receive server showhitprompt");
        this.setDir(this.calculateLocation(loc));
      }
      setDir(index) {
        this.DirArr[index] = 1;
      }
      calculateLocation(loc) {
        let vec1 = this.currentPlayer.character.getForwardVector();
        let vector1 = new Type__default["default"].Vector2(vec1.x, vec1.y).getNormalized();
        vector1.y = -vector1.y;
        let vec2 = loc.subtraction(this.currentPlayer.character.location);
        let vector2 = new Type__default["default"].Vector2(vec2.x, vec2.y).getNormalized();
        vector2.y = -vector2.y;
        let num1 = vector1.x * vector2.x + vector1.y * vector2.y;
        let cos = num1 / 1;
        let angle = Math.acos(cos) * (180 / Math.PI);
        console.log("calculate angle: " + angle);
        let dir = vector1.x * vector2.y - vector1.y * vector2.x;
        if (dir < 0) {
          if (angle >= 0 && angle < 22.5) {
            return 0;
          } else if (angle >= 22.5 && angle < 67.5) {
            return 1;
          } else if (angle >= 67.5 && angle <= 112.5) {
            return 2;
          } else if (angle >= 112.5 && angle <= 157.5) {
            return 3;
          }
        } else {
          if (angle >= 22.5 && angle < 67.5) {
            return 7;
          } else if (angle >= 67.5 && angle < 112.5) {
            return 6;
          } else if (angle >= 112.5 && angle <= 157.5) {
            return 5;
          } else if (angle >= 157.5 && angle <= 180) {
            return 4;
          }
        }
      }
    }

    var foreign11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        HitPromptModuleC: HitPromptModuleC
    }, Symbol.toStringTag, { value: 'Module' }));

    class HitPromptModuleS extends dist.ModuleS {
      onStart() {
        Events__default["default"].addClientListener("playerHit", (attacker, player, loc) => {
          console.log(player.character.name);
          this.callClientFun(player, this.client.net_ShowHitPrompt, loc);
          console.log("tell client show");
        });
      }
      onUpdate(dt) {
      }
    }

    var foreign12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        HitPromptModuleS: HitPromptModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class NpcModuleC extends dist.ModuleC {
      onStart() {
      }
    }

    var foreign16 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        NpcModuleC: NpcModuleC
    }, Symbol.toStringTag, { value: 'Module' }));

    class NpcModuleS extends dist.ModuleS {
      npcHp = 30;
      npcHpMap;
      onAwake() {
        this.npcHpMap = /* @__PURE__ */ new Map();
      }
      onStart() {
      }
      net_AddNpc(npc) {
        this.npcHpMap.set(npc, this.npcHp);
      }
      net_GetHit(npc, damage) {
        if (this.npcHpMap.has(npc)) {
          this.npcHpMap.set(npc, this.npcHpMap.get(npc) - damage);
          if (this.npcHpMap.get(npc) <= 0) {
            Events__default["default"].dispatchLocal("npcDead", npc);
            setTimeout(() => {
              Events__default["default"].dispatchLocal("npcRecover", npc);
            }, 3e3);
          }
        }
      }
      net_GetHp(npc) {
        return this.npcHpMap.get(npc);
      }
    }

    var foreign17 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        NpcModuleS: NpcModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class PlayerModuleS extends dist.ModuleS {
      onStart() {
      }
      net_PlayerDead() {
        this.currentPlayer.character.ragdoll(true);
        this.currentData.startDeathCount();
        this.currentData.initHp();
        this.currentData.saveData(true);
      }
      net_PlayerRecover() {
        this.currentData.initHp();
        this.currentData.saveData(true);
        this.currentPlayer.character.ragdoll(false);
        let startPoints = MWCore__default["default"].GameObject.getGameObjectsByName("StartPoint");
        this.currentPlayer.character.setLocationAndRotation(startPoints[Math.floor(Math.random() * startPoints.length)].location, this.currentPlayer.character.rotation);
      }
      net_DeathCount() {
        this.currentData.minusDeathCount();
        this.currentData.saveData(true);
      }
      net_PlayerFly() {
        if (this.currentData.flyCD <= 0) {
          this.currentData.startFlyCD();
          this.currentPlayer.character.switchToFlying();
          this.currentData.saveData(true);
        }
      }
      net_PlayerFlyCount() {
        this.currentData.minusFlyCD();
        this.currentData.saveData(true);
        if (this.currentData.flyCD == 3)
          this.currentPlayer.character.switchToWalking();
      }
      net_PlayerInvisible() {
        if (this.currentData.invisibleCD <= 0) {
          this.currentData.startInvisibleCD();
          this.currentPlayer.character.isVisible = false;
          this.currentData.saveData(true);
        }
      }
      net_PlayerInvisibleCount() {
        this.currentData.minusInvisibleCD();
        this.currentData.saveData(true);
        if (this.currentData.invisibleCD == 6)
          this.currentPlayer.character.isVisible = true;
      }
    }

    var foreign20 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        PlayerModuleS: PlayerModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class WeaponModuleS extends dist.ModuleS {
      net_Equiped(player, weaponObj) {
        player.character.attachGameObjectToCharacter(weaponObj, GamePlay__default["default"].CharacterSocketType.Right_Hand);
      }
      net_HitPlayer(player) {
        dist.DataCenterS.instance.getModuleData(player, PlayerData).minusHp(30);
        dist.DataCenterS.instance.getModuleData(player, PlayerData).saveData(true);
      }
      net_HitNpc(npc) {
        let playerData = dist.DataCenterS.instance.getModuleData(this.currentPlayer, PlayerData);
        if (!playerData.canFly && !playerData.canInvisible) {
          if (Math.random() < 0.5) {
            playerData.setCanFly(true);
          } else {
            playerData.setCanInvisible(true);
          }
        } else if (!playerData.canFly) {
          playerData.setCanFly(true);
        } else if (!playerData.canInvisible) {
          playerData.setCanInvisible(true);
        }
        dist.DataCenterS.instance.getModuleData(this.currentPlayer, PlayerData).saveData(true);
        dist.ModuleManager.instance.getModule(NpcModuleS).net_GetHit(npc, 30);
      }
      net_PlayHitEffect(pos) {
        dist.EffectManager.instance.playEffectInPos("13407", pos, 1, Type__default["default"].Rotation.zero, new Type__default["default"].Vector(0.5, 0.5, 0.5));
      }
    }

    var foreign27 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        WeaponModuleS: WeaponModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    var __defProp$5 = Object.defineProperty;
    var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
    var __decorateClass$5 = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp$5(target, key, result);
      return result;
    };
    let GameStart = class extends dist.OdinGame {
      preloadAssets = this.preloads;
      get preloads() {
        return "14639,4173,4172,4388,12563,13407";
      }
      onRegisterModule() {
        dist.ModuleManager.instance.register(CoinModuleS, CoinModuleC, CoinData);
        dist.ModuleManager.instance.register(PlayerModuleS, PlayerModuleC, PlayerData);
        dist.ModuleManager.instance.register(GameControlModuleS, GameControlModuleC, GameControlData);
        dist.ModuleManager.instance.register(HitPromptModuleS, HitPromptModuleC, null);
        dist.ModuleManager.instance.register(NpcModuleS, NpcModuleC, null);
        dist.ModuleManager.instance.register(WeaponModuleS, WeaponModuleC, null);
        if (GamePlay__default["default"].isClient()) ;
      }
    };
    __decorateClass$5([
      MWCore__default["default"].MWProperty({ displayName: "\u9884\u52A0\u8F7D" })
    ], GameStart.prototype, "preloadAssets", 2);
    GameStart = __decorateClass$5([
      MWCore__default["default"].MWClass
    ], GameStart);

    var foreign9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get default () { return GameStart; }
    }, Symbol.toStringTag, { value: 'Module' }));

    var foreign14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null
    }, Symbol.toStringTag, { value: 'Module' }));

    var foreign15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null
    }, Symbol.toStringTag, { value: 'Module' }));

    var __defProp$4 = Object.defineProperty;
    var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
    var __decorateClass$4 = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp$4(target, key, result);
      return result;
    };
    let Rifle$1 = class extends MWCore__default["default"].MWScript {
      onStart() {
      }
      onUpdate(dt) {
      }
      onDestroy() {
      }
    };
    Rifle$1 = __decorateClass$4([
      MWCore__default["default"].MWClass
    ], Rifle$1);

    var foreign21 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get default () { return Rifle$1; }
    }, Symbol.toStringTag, { value: 'Module' }));

    var __defProp$3 = Object.defineProperty;
    var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
    var __decorateClass$3 = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp$3(target, key, result);
      return result;
    };
    let RiflePick = class extends MWCore__default["default"].MWScript {
      onStart() {
      }
      onUpdate(dt) {
      }
      onDestroy() {
      }
    };
    RiflePick = __decorateClass$3([
      MWCore__default["default"].MWClass
    ], RiflePick);

    var foreign22 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get default () { return RiflePick; }
    }, Symbol.toStringTag, { value: 'Module' }));

    var __defProp$2 = Object.defineProperty;
    var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
    var __decorateClass$2 = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp$2(target, key, result);
      return result;
    };
    let UIRoot = class extends dist.UI {
    };
    UIRoot = __decorateClass$2([
      MWGameUI__default["default"].MWUIMono
    ], UIRoot);

    var foreign24 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get default () { return UIRoot; }
    }, Symbol.toStringTag, { value: 'Module' }));

    class BaseState {
      npc;
      constructor(npc) {
        this.npc = npc;
      }
    }

    var foreign28 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        BaseState: BaseState
    }, Symbol.toStringTag, { value: 'Module' }));

    class DeadState extends BaseState {
      enterState() {
        this.npc.enableCollision = false;
        this.npc.ragdoll(true);
      }
      Update(dt) {
      }
    }

    var foreign29 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        DeadState: DeadState
    }, Symbol.toStringTag, { value: 'Module' }));

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
        this.wayPoints = MWCore__default["default"].GameObject.getGameObjectsByName("WayPoint");
        this.npc.enableCollision = true;
        this.npc.ragdoll(false);
      }
      Update(dt) {
        if (this.timer <= 0) {
          if (this.curWayPointIndex >= this.wayPoints.length) {
            this.curWayPointIndex = this.curWayPointIndex % this.wayPoints.length;
          }
          GamePlay__default["default"].moveTo(this.npc, this.wayPoints[this.curWayPointIndex].location, 50);
        } else {
          this.timer -= dt;
        }
        if (require$$6.Vector.Dist(new require$$6.Vector(this.npc.location.x, this.npc.location.y, this.npc.location.z), new require$$6.Vector(this.wayPoints[this.curWayPointIndex].location.x, this.wayPoints[this.curWayPointIndex].location.y, this.wayPoints[this.curWayPointIndex].location.z)) < 100) {
          this.timer = 1;
          this.wayPoints = MWCore__default["default"].GameObject.getGameObjectsByName("WayPoint");
          this.curWayPointIndex = (this.curWayPointIndex + 1) % this.wayPoints.length;
        }
      }
    }

    var foreign30 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        PatrolState: PatrolState
    }, Symbol.toStringTag, { value: 'Module' }));

    var __defProp$1 = Object.defineProperty;
    var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
    var __decorateClass$1 = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp$1(target, key, result);
      return result;
    };
    let NPC = class extends MWCore__default["default"].MWScript {
      curState;
      npcModule;
      InitialWayPoint = 0;
      onStart() {
        if (GamePlay__default["default"].isServer()) {
          this.npcModule = dist.ModuleManager.instance.getModule(NpcModuleS);
          this.npcModule.net_AddNpc(this.gameObject);
          this.curState = new PatrolState(this.gameObject);
          this.bUseUpdate = true;
          this.curState.setWayPoint(this.InitialWayPoint);
          this.curState.enterState();
          Events__default["default"].addLocalListener("npcDead", (npc) => {
            if (npc == this.gameObject) {
              this.curState = new DeadState(this.gameObject);
              this.curState.enterState();
            }
          });
          Events__default["default"].addLocalListener("npcRecover", (npc) => {
            console.log("npc recover");
            if (npc == this.gameObject) {
              this.curState = new PatrolState(this.gameObject);
              this.curState.setWayPoint(this.InitialWayPoint);
              this.curState.enterState();
              let waypoints = MWCore__default["default"].GameObject.getGameObjectsByName("WayPoint");
              this.gameObject.location = waypoints[Math.floor(Math.random() * waypoints.length)].location;
            }
          });
        }
      }
      onUpdate(dt) {
        this.curState.Update(dt);
      }
      onDestroy() {
      }
    };
    __decorateClass$1([
      MWCore__default["default"].MWProperty()
    ], NPC.prototype, "InitialWayPoint", 2);
    NPC = __decorateClass$1([
      MWCore__default["default"].MWClass
    ], NPC);

    var foreign31 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get default () { return NPC; }
    }, Symbol.toStringTag, { value: 'Module' }));

    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __decorateClass = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp(target, key, result);
      return result;
    };
    let Rifle = class extends MWCore__default["default"].MWScript {
      onStart() {
        let boxTrigger = this.gameObject.getChildByName("BoxTrigger");
        let fireEffect = this.gameObject.getChildByName("Fire");
        boxTrigger.onEnter.Add((gameObject) => {
          if (GamePlay__default["default"].isCharacter(gameObject)) {
            dist.ModuleManager.instance.getModule(WeaponModuleC).pickWeapon(gameObject.player, this.gameObject, fireEffect);
          }
        });
      }
    };
    Rifle = __decorateClass([
      MWCore__default["default"].MWClass
    ], Rifle);

    var foreign32 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get default () { return Rifle; }
    }, Symbol.toStringTag, { value: 'Module' }));

    const MWModuleMap = {
      "JavaScripts/ChangeClothes": foreign0,
      "JavaScripts/CoinData": foreign1,
      "JavaScripts/CoinModuleC": foreign2,
      "JavaScripts/CoinModuleS": foreign3,
      "JavaScripts/DeathCountDownUI": foreign4,
      "JavaScripts/GameControl": foreign5,
      "JavaScripts/GameControlData": foreign6,
      "JavaScripts/GameControlModuleC": foreign7,
      "JavaScripts/GameControlModuleS": foreign8,
      "JavaScripts/GameStart": foreign9,
      "JavaScripts/GameUI": foreign10,
      "JavaScripts/HitPromptModuleC": foreign11,
      "JavaScripts/HitPromptModuleS": foreign12,
      "JavaScripts/HitPromptUI": foreign13,
      "JavaScripts/NewScript": foreign14,
      "JavaScripts/NewScript1": foreign15,
      "JavaScripts/NpcModuleC": foreign16,
      "JavaScripts/NpcModuleS": foreign17,
      "JavaScripts/PlayerData": foreign18,
      "JavaScripts/PlayerModuleC": foreign19,
      "JavaScripts/PlayerModuleS": foreign20,
      "JavaScripts/Rifle": foreign21,
      "JavaScripts/RiflePick": foreign22,
      "JavaScripts/StartGameUI": foreign23,
      "JavaScripts/UIRoot": foreign24,
      "JavaScripts/UITemplate": foreign25,
      "JavaScripts/WeaponModuleC": foreign26,
      "JavaScripts/WeaponModuleS": foreign27,
      "JavaScripts/FiniteStateMachine/BaseState": foreign28,
      "JavaScripts/FiniteStateMachine/DeadState": foreign29,
      "JavaScripts/FiniteStateMachine/PatrolState": foreign30,
      "Prefabs/NPC/Script/NPC": foreign31,
      "Prefabs/Weapon/Script/Rifle": foreign32
    };

    exports.MWModuleMap = MWModuleMap;

    Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

}));
//# sourceMappingURL=game.js.map
