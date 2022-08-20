var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/odin/dist/index.js
var require_dist = __commonJS({
  "node_modules/odin/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MWCore2 = require("MWCore");
    var GamePlay2 = require("GamePlay");
    var Events2 = require("Events");
    var DataStorage = require("DataStorage");
    var Type2 = require("Type");
    var Global = require("Global");
    var ue = require("ue");
    var MWGameUI2 = require("MWGameUI");
    var MWMGS = require("MWMGS");
    var MathLibrary = require("MathLibrary");
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var MWCore__default = /* @__PURE__ */ _interopDefaultLegacy(MWCore2);
    var GamePlay__default = /* @__PURE__ */ _interopDefaultLegacy(GamePlay2);
    var Events__default = /* @__PURE__ */ _interopDefaultLegacy(Events2);
    var DataStorage__default = /* @__PURE__ */ _interopDefaultLegacy(DataStorage);
    var Type__default = /* @__PURE__ */ _interopDefaultLegacy(Type2);
    var Global__default = /* @__PURE__ */ _interopDefaultLegacy(Global);
    var MWGameUI__default = /* @__PURE__ */ _interopDefaultLegacy(MWGameUI2);
    var MWMGS__default = /* @__PURE__ */ _interopDefaultLegacy(MWMGS);
    var MathLibrary__default = /* @__PURE__ */ _interopDefaultLegacy(MathLibrary);
    function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    var PlayerData2 = class {
      playerId;
      dataMap;
      moduleDataMap = /* @__PURE__ */ new Map();
      constructor(playerId, dataMap) {
        this.playerId = playerId;
        this.dataMap = dataMap;
      }
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
      destroy() {
        this.moduleDataMap.forEach((moudleData) => {
          moudleData["destroy"]();
        });
        this.moduleDataMap.clear();
      }
    };
    var _DataCenterC = class {
      constructor() {
      }
      static get instance() {
        if (this._instance == null) {
          this._instance = new _DataCenterC();
        }
        return this._instance;
      }
      destroy() {
        _DataCenterC._instance = null;
      }
      INIT_PLAYER_DATA_ASK = "InitPlayerData_Ask";
      INIT_PLAYER_DATA_REPLY = "InitPlayerData_Reply";
      PLAYER_DATA_CHANGE_NOTIFY = "PlayerDataChange_Notify";
      playerData;
      init() {
        setTimeout(() => {
          Events__default["default"].dispatchToServer(this.INIT_PLAYER_DATA_ASK);
        }, 500);
        Events__default["default"].addServerListener(this.PLAYER_DATA_CHANGE_NOTIFY, (dataInfoName, dataInfo) => {
          if (this.playerData != null) {
            this.playerData.dataInfoMap[dataInfoName] = dataInfo;
          }
        });
        return new Promise((resolve) => {
          let listener = Events__default["default"].addServerListener(this.INIT_PLAYER_DATA_REPLY, (dataMap) => {
            listener.disconnect();
            this.playerData = new PlayerData2(0, dataMap);
            resolve();
          });
        });
      }
      getModuleData(ModuleDataClass) {
        if (this.playerData == null)
          return null;
        return this.playerData.getModuleData(ModuleDataClass);
      }
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
    };
    var DataCenterC6 = _DataCenterC;
    __publicField(DataCenterC6, "_instance");
    var _isListenServer = -1;
    var askMsgList = [];
    function isListenServer() {
      if (_isListenServer < 0) {
        if (GamePlay__default["default"].isListenServer() || GamePlay__default["default"].isServer() && GamePlay__default["default"].isClient()) {
          _isListenServer = 1;
          GamePlay__default["default"].isClient = () => {
            return true;
          };
          GamePlay__default["default"].isServer = () => {
            return true;
          };
          Events__default["default"].addClientListener = (eventName, listener) => {
            oTraceWarning("addClientListener " + eventName);
            let l = Events__default["default"].addLocalListener(eventName, (params) => {
              oTrace("                  [Server] [Receive]   " + eventName + " " + (eventName == "Ask" ? params[0] : ""));
              listener(GamePlay__default["default"].getCurrentPlayer(), ...params);
            });
            return l;
          };
          Events__default["default"].dispatchToClient = (player, eventName, ...params) => {
            oTrace("                  [Server] [Send]   " + eventName + " " + (eventName == "Reply" || eventName == "Notify" ? params[0] : ""));
            return Events__default["default"].dispatchLocal(eventName, params);
          };
          Events__default["default"].dispatchToAllClient = (eventName, ...params) => {
            oTrace("                  [Server] [Send]   " + eventName + " " + (eventName == "Reply" || eventName == "Notify" ? params[0] : ""));
            return Events__default["default"].dispatchLocal(eventName, params);
          };
          Events__default["default"].dispatchToAllRoomClient = (eventName, ...params) => {
            oTrace("                  [Server] [Send]   " + eventName + " " + (eventName == "Reply" || eventName == "Notify" ? params[0] : ""));
            return Events__default["default"].dispatchLocal(eventName, params);
          };
          Events__default["default"].addServerListener = (eventName, listener) => {
            return Events__default["default"].addLocalListener(eventName, (params) => {
              oTrace("                  [Client] [Receive]   " + eventName + " " + (eventName == "Reply" || eventName == "Notify" ? params[0] : ""));
              listener(...params);
            });
          };
          Events__default["default"].dispatchToServer = (eventName, ...params) => {
            oTrace("                  [Client] [Send]   " + eventName + " " + (eventName == "Ask" ? params[0] : ""));
            askMsgList.push([eventName, params]);
            return Events__default["default"].DispatchEventResult.SUCCESS;
          };
          setInterval(() => {
            if (askMsgList.length > 0) {
              let arr = askMsgList.shift();
              Events__default["default"].dispatchLocal(arr[0], arr[1]);
            }
          }, 10);
        } else {
          _isListenServer = 0;
        }
      }
      return _isListenServer > 0;
    }
    function AutoInit(target) {
      isListenServer();
      if (target["init"] != null) {
        target["init"]();
      }
    }
    function NoReply(target, funName, descriptor) {
      descriptor.value["No_Reply"] = true;
    }
    var CallBack = class {
      fun;
      thisArg;
      dirty = false;
      constructor(fun, thisArg) {
        this.fun = fun;
        this.thisArg = thisArg;
      }
      call(...prames) {
        if (!this.dirty) {
          if (this.thisArg != null) {
            return this.fun.call(this.thisArg, ...prames);
          } else {
            this.fun(...prames);
          }
        }
      }
      isOriginFrom(fun, thisArg) {
        return this.fun == fun && this.thisArg == thisArg;
      }
      get originFun() {
        return this.fun;
      }
      get originThisArg() {
        return this.thisArg;
      }
    };
    var Action = class {
      callBackList = [];
      callingRemNum = -1;
      countChangeCallback;
      add(fn, thisArg) {
        if (fn == null)
          return;
        let index = this.getFunIndex(fn, thisArg);
        if (index == -1)
          this.callBackList.push(new CallBack(fn, thisArg));
        if (this.countChangeCallback != null)
          this.countChangeCallback(this.count);
      }
      remove(fn, thisArg) {
        if (fn == null)
          return;
        if (this.callingRemNum >= 0) {
          this.callingRemNum++;
          let callBack = this.getCallBack(fn, thisArg);
          if (callBack != null)
            callBack.dirty = true;
        } else {
          let index = this.getFunIndex(fn, thisArg);
          if (index != -1)
            this.callBackList.splice(index, 1);
          if (this.countChangeCallback != null)
            this.countChangeCallback(this.count);
        }
      }
      call(...prams) {
        if (this.callBackList.length == 0)
          return;
        this.callingRemNum = 0;
        for (let i = 0; i < this.callBackList.length; i++) {
          this.callBackList[i].call(...prams);
        }
        if (this.callingRemNum > 0) {
          for (let i = 0; i < this.callBackList.length; ) {
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
      includes(fn, thisArg) {
        if (fn == null)
          return false;
        return this.getFunIndex(fn, thisArg) != -1;
      }
      clear() {
        while (this.callBackList.length > 0)
          this.callBackList.pop();
      }
      get count() {
        return this.callBackList.length;
      }
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
    };
    var Action1 = class extends Action {
      add(fn, thisArg) {
        super.add(fn, thisArg);
      }
      remove(fn, thisArg) {
        super.remove(fn, thisArg);
      }
      call(arg) {
        super.call(arg);
      }
    };
    var Action2 = class extends Action {
      add(fn, thisArg) {
        super.add(fn, thisArg);
      }
      remove(fn, thisArg) {
        super.remove(fn, thisArg);
      }
      call(a, b) {
        super.call(a, b);
      }
    };
    var SINGLETON_KEY = Symbol();
    function Singleton() {
      return function(type) {
        const proxyType = new Proxy(type, {
          construct(target, argsList, newTarget) {
            if (target.prototype !== newTarget.prototype) {
              return Reflect.construct(target, argsList, newTarget);
            }
            if (!target[SINGLETON_KEY]) {
              target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
            }
            return target[SINGLETON_KEY];
          }
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
    function oTrace(...content) {
      exports.LogManager.instance.log(...content);
    }
    function oTraceWarning(...content) {
      exports.LogManager.instance.logWarning(...content);
    }
    function oTraceError(...content) {
      exports.LogManager.instance.logError(...content);
    }
    var _a;
    exports.LogManager = LogManager_1 = (_a = class {
      logLevel = 3;
      _firstWithEnable = true;
      cs;
      constructor() {
        if (GamePlay__default["default"].isServer() && GamePlay__default["default"].isClient()) {
          this.cs = "";
        } else {
          this.cs = GamePlay__default["default"].isServer() ? "S" : "C";
        }
      }
      destroy() {
        LogManager_1.instance = null;
      }
      set firstWithEnable(value) {
        this._firstWithEnable = value;
      }
      setLogLevel(value) {
        this.logLevel = value;
      }
      log(...content) {
        this.logWithTag(null, ...content);
      }
      logWarning(...content) {
        this.logWarningWithTag(null, ...content);
      }
      logError(...content) {
        this.logErrorWithTag(null, ...content);
      }
      logWithTag(tag, ...content) {
        if (this.logLevel < 3)
          return;
        console.warn(`${this.getFirstWith(tag)}${content}`);
      }
      logWarningWithTag(tag, ...content) {
        if (this.logLevel < 2)
          return;
        console.warn(`${this.getFirstWith(tag)}${content}`);
      }
      logErrorWithTag(tag, ...content) {
        if (this.logLevel < 1)
          return;
        console.error(`${this.getFirstWith(tag)}${content}`);
      }
      getFirstWith(tag) {
        if (this._firstWithEnable) {
          if (tag != null) {
            return `[ _____OdinLog${this.cs}][${tag}_____ ]       `;
          } else {
            return `[ _____OdinLog${this.cs}_____ ]       `;
          }
        } else {
          if (tag != null) {
            return `[${tag}]`;
          } else {
            return "";
          }
        }
      }
    }, __publicField(_a, "instance"), _a);
    exports.LogManager = LogManager_1 = __decorate([
      Singleton()
    ], exports.LogManager);
    var _DataCenterS = class {
      constructor() {
      }
      static get instance() {
        if (this._instance == null) {
          this._instance = new _DataCenterS();
        }
        return this._instance;
      }
      destroy() {
        _DataCenterS._instance = null;
      }
      INIT_PLAYER_DATA_ASK = "InitPlayerData_Ask";
      INIT_PLAYER_DATA_REPLY = "InitPlayerData_Reply";
      PLAYER_DATA_CHANGE_NOTIFY = "PlayerDataChange_Notify";
      SAVE_DELAY_SECOND = 10;
      onPlayerJoined = new Action1();
      onPlayerLeft = new Action1();
      playerDataMap = null;
      toBeSavedMap = /* @__PURE__ */ new Map();
      onlinePlayerIds = [];
      init() {
        if (GamePlay__default["default"].isClient() || this.playerDataMap != null)
          return;
        this.playerDataMap = /* @__PURE__ */ new Map();
        Events__default["default"].addPlayerJoinedListener((player) => {
          oTrace(`DataCenterS:Player enter game. playerID=${player.getPlayerID()}`);
          this.loadPlayerData(player);
        });
        Events__default["default"].addPlayerLeftListener((player) => {
          oTrace(`DataCenterS:Player left game. playerID=${player.getPlayerID()}`);
          this.onPlayerLeft.call(player);
          this.unloadPlayerData(player);
        });
        Events__default["default"].addClientListener(this.INIT_PLAYER_DATA_ASK, (player, data) => {
          oTrace(`DataCenterS:Player ask data. playerID=${player.getPlayerID()}`);
          let playerID = player.getPlayerID();
          if (this.playerDataMap.has(playerID)) {
            Events__default["default"].dispatchToClient(player, this.INIT_PLAYER_DATA_REPLY, this.playerDataMap.get(playerID).dataInfoMap);
          } else {
            oTraceError(`DataCenterS:Player data not found. playerID=${playerID}`);
          }
        });
        setInterval(this.savePlayerData.bind(this), 1e3);
      }
      async loadPlayerData(player) {
        let data = await DataStorage__default["default"].asyncGetPlayerData(player);
        let playerID = player.getPlayerID();
        let isNewPlayer = data == null || data == "";
        oTrace(`DataCenterS:Player joined. Load player data. playerID=${playerID} ${isNewPlayer ? "NewPlayer" : "OldPlayer"}`);
        if (isNewPlayer) {
          data = { playerID };
        }
        this.playerDataMap.set(playerID, new PlayerData2(playerID, data));
        this.onlinePlayerIds.push(playerID);
        this.onPlayerJoined.call(player);
      }
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
      savePlayerData() {
        this.playerDataMap.forEach((data, playerID) => {
          if (this.toBeSavedMap.has(playerID)) {
            let time = this.toBeSavedMap.get(playerID);
            time++;
            if (time >= this.SAVE_DELAY_SECOND) {
              let player = GamePlay__default["default"].getPlayer(playerID);
              DataStorage__default["default"].asyncSetPlayerData(player, this.getPlayerData(player).dataInfoMap);
              this.toBeSavedMap.delete(playerID);
            } else {
              this.toBeSavedMap.set(playerID, time);
            }
          }
        });
      }
      getPlayerData(player) {
        if (player == null)
          return;
        if (player instanceof GamePlay__default["default"].Player) {
          return this.playerDataMap.get(player.getPlayerID());
        } else {
          return this.playerDataMap.get(player);
        }
      }
      getModuleData(player, ModuleDataClass) {
        return this.getPlayerData(player).getModuleData(ModuleDataClass);
      }
      saveModuleData(moduleData, syncToClient) {
        let player = GamePlay__default["default"].getPlayer(moduleData.playerId);
        let playerID = player.getPlayerID();
        let playerData = this.getPlayerData(player);
        if (playerData == null) {
          return false;
        }
        if (!this.toBeSavedMap.has(playerID)) {
          this.toBeSavedMap.set(playerID, 0);
        }
        let dataInfoName = moduleData.dataName;
        let dataInfo = moduleData["dataInfo"];
        playerData.dataInfoMap[dataInfoName] = dataInfo;
        if (syncToClient) {
          Events__default["default"].dispatchToClient(player, this.PLAYER_DATA_CHANGE_NOTIFY, dataInfoName, dataInfo);
        }
        return true;
      }
      syncModuleData(moduleData) {
        let player = GamePlay__default["default"].getPlayer(moduleData.playerId);
        let dataInfoName = moduleData.dataName;
        let dataInfo = moduleData["dataInfo"];
        Events__default["default"].dispatchToClient(player, this.PLAYER_DATA_CHANGE_NOTIFY, dataInfoName, dataInfo);
      }
      getPlayerIDs() {
        return this.onlinePlayerIds;
      }
    };
    var DataCenterS7 = _DataCenterS;
    __publicField(DataCenterS7, "_instance");
    var TimeUtil = class {
      static get delayTime() {
        return this._delayTime;
      }
      static get time() {
        return Global__default["default"].elapsedTime();
      }
      static delayExecute(fun, frameNum = 1) {
        let id = ++this.delayExecuteId;
        this.delayExecuteFun.push({ id, fun, frame: frameNum });
        return id;
      }
      static clearDelayExecute(id) {
        for (let i = 0; i < this.delayExecuteFun.length; i++) {
          if (this.delayExecuteFun[i].id == id) {
            this.delayExecuteFun.splice(i, 1);
            break;
          }
        }
      }
      static async delaySecond(second) {
        return new Promise((resolve) => {
          setTimeout(() => {
            return resolve();
          }, second * 1e3);
        });
      }
      static update(dt) {
        this._delayTime = dt;
        this.onEnterFrame.call(dt);
        this.delayExecuteUpdate();
      }
      static delayExecuteUpdate() {
        if (this.delayExecuteFun.length == 0)
          return;
        for (let i = 0; i < this.delayExecuteFun.length; ) {
          this.delayExecuteFun[i].frame--;
          if (this.delayExecuteFun[i].frame <= 0) {
            this.delayExecuteFun[i].fun();
            this.delayExecuteFun.splice(i, 1);
          } else {
            i++;
          }
        }
      }
    };
    __publicField(TimeUtil, "onEnterFrame", new Action1());
    __publicField(TimeUtil, "delayExecuteFun", []);
    __publicField(TimeUtil, "delayExecuteId", 0);
    __publicField(TimeUtil, "_delayTime", 0);
    var NetManager_1;
    var _a2;
    exports.NetManager = NetManager_1 = (_a2 = class {
      static get instance() {
        if (NetManager_1._instance == null) {
          NetManager_1._instance = new NetManager_1();
        }
        return NetManager_1._instance;
      }
      constructor() {
      }
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
      funMap = /* @__PURE__ */ new Map();
      objFunMap = /* @__PURE__ */ new Map();
      objMap = /* @__PURE__ */ new Map();
      waitServerResolveMap = /* @__PURE__ */ new Map();
      noReplyFunNameMap = /* @__PURE__ */ new Map();
      _currentPlayer;
      _rpcCount = 0;
      set logVisible(value) {
        this._logVisible = value;
      }
      get currentPlayer() {
        return this._currentPlayer;
      }
      get rpcCount() {
        return this._rpcCount;
      }
      init() {
        if (GamePlay__default["default"].isClient()) {
          Events__default["default"].addServerListener(this.NO_REPLY, (funName) => {
            this.showLog(`[NoReply]      ${funName}`);
            if (this.waitServerResolveMap.has(funName)) {
              let waitResolveArr = this.waitServerResolveMap.get(funName);
              while (waitResolveArr.length > 0) {
                let resolve = this.waitServerResolveMap.get(funName).shift();
                resolve(null);
              }
              this.waitServerResolveMap.delete(funName);
              this.noReplyFunNameMap.set(funName, true);
            } else {
              oTraceError("NetObject(Client Reply): Function is not found. fun=" + funName);
            }
          });
          Events__default["default"].addServerListener(this.REPLY, (funName, res) => {
            this.showLog(`[Reply]      ${funName}`);
            if (this.waitServerResolveMap.has(funName) && this.waitServerResolveMap.get(funName).length > 0) {
              let resolve = this.waitServerResolveMap.get(funName).shift();
              resolve(res);
            } else {
              oTraceError("NetObject(Client Reply): Function is not found. fun=" + funName);
            }
          });
          Events__default["default"].addServerListener(this.NOTIFY, (funName, ...params) => {
            this.showLog(`[Notify]     ${funName}`);
            let fun = this.getFunction(funName);
            if (fun != null) {
              fun.call(...params);
            } else {
              oTraceError("NetObject(Client Notify): Function is not found. fun=" + funName);
            }
          });
        }
        if (GamePlay__default["default"].isServer()) {
          Events__default["default"].addClientListener(this.ASK, (player, funName, ...params) => {
            this.showLog(`   [Ask]       ${funName}`);
            let fun = this.getFunction(funName);
            if (fun != null) {
              this._currentPlayer = player;
              params.push(player);
              let res = fun.call(...params);
              this._currentPlayer = null;
              if (fun[this.NO_REPLY] != null) {
                if (!this.noReplyFunNameMap.has(funName)) {
                  this.noReplyFunNameMap.set(funName, true);
                  this.showLog(`[NoReply]      ${funName}`);
                  Events__default["default"].dispatchToClient(player, this.NO_REPLY, funName);
                }
              } else if (res instanceof Promise) {
                res.then((result) => {
                  this.showLog(`[Reply]      ${funName}`);
                  Events__default["default"].dispatchToClient(player, this.REPLY, funName, result);
                });
              } else {
                this.showLog(`[Reply]      ${funName}`);
                Events__default["default"].dispatchToClient(player, this.REPLY, funName, res);
              }
            } else {
              oTraceError("NetObject(Server Ask): Function is not found. fun=" + funName);
            }
          });
        }
      }
      registerFun(fun, thisArg, callName = null) {
        if (callName == null) {
          callName = fun.name;
        }
        if (!this.funMap.has(callName)) {
          let callback = new CallBack(fun, thisArg);
          this.funMap.set(callName, callback);
        } else {
          oTraceError("Repeated NET Function! funName=" + fun.name + " callName=" + callName);
        }
      }
      unRegisterFun(fun) {
        for (let [callName, callBack] of this.funMap) {
          if (callBack.originFun == fun) {
            this.funMap.delete(callName);
            return;
          }
        }
      }
      registerObj(netObj, netGuid) {
        oTrace("Register NET Object! netGuid=" + netGuid);
        if (netGuid == null) {
          oTraceError("Register NET Obj Error! netGuid Is Null!");
        } else if (!this.objMap.has(netGuid)) {
          this.objMap.set(netGuid, netObj);
        } else {
          oTraceError("Register NET Obj Error! Repeated NET Guid! netGuid=" + netGuid);
        }
      }
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
      callServerFun(fun, ...params) {
        if (GamePlay__default["default"].isClient()) {
          let funName = typeof fun === "string" ? fun : fun.name;
          this.showLog(`   [Ask]        ${funName}`);
          if (this.noReplyFunNameMap.has(funName)) {
            Events__default["default"].dispatchToServer(this.ASK, funName, ...params);
            return null;
          } else {
            if (!this.waitServerResolveMap.has(funName)) {
              this.waitServerResolveMap.set(funName, []);
            }
            return new Promise((resolve) => {
              this.waitServerResolveMap.get(funName).push(resolve);
              Events__default["default"].dispatchToServer(this.ASK, funName, ...params);
            });
          }
        }
      }
      callClientFun(player, fun, ...params) {
        if (GamePlay__default["default"].isServer()) {
          let funName = typeof fun === "string" ? fun : fun.name;
          this.showLog(`[Notify]   TargetCilent   ${funName}`);
          if (player instanceof GamePlay__default["default"].Player) {
            Events__default["default"].dispatchToClient(player, this.NOTIFY, funName, ...params);
          } else {
            Events__default["default"].dispatchToClient(GamePlay__default["default"].getPlayer(player), this.NOTIFY, funName, ...params);
          }
        }
      }
      callAroundClientFun(fun, ...params) {
        if (GamePlay__default["default"].isServer()) {
          let funName = typeof fun === "string" ? fun : fun.name;
          this.showLog(`[Notify]   AroundClient   ${funName}`);
          Events__default["default"].dispatchToAllClient(this.NOTIFY, funName, ...params);
        }
      }
      callWorldClientFun(fun, ...params) {
        if (GamePlay__default["default"].isServer()) {
          let funName = typeof fun === "string" ? fun : fun.name;
          this.showLog(`[Notify]   WorldClient   ${funName}`);
          Events__default["default"].dispatchToAllRoomClient(this.NOTIFY, funName, ...params);
        }
      }
      getFunction(fun) {
        if (this.funMap.has(fun)) {
          return this.funMap.get(fun);
        }
        if (this.objFunMap.has(fun)) {
          return this.objFunMap.get(fun);
        }
        if (fun.includes(".")) {
          let strArr = fun.split(".");
          let netGuid = strArr[0];
          let funName = strArr[1];
          if (this.objMap.has(netGuid)) {
            let obj = this.objMap.get(netGuid);
            if (obj[funName] != null && typeof obj[funName] == "function") {
              let callback = new CallBack(obj[funName], obj);
              this.objFunMap.set(fun, callback);
              return callback;
            }
          }
        }
        return null;
      }
      showLog(content) {
        this._rpcCount++;
        if (!this._logVisible)
          return;
        oTraceWarning(content);
      }
    }, __publicField(_a2, "_instance"), _a2);
    exports.NetManager = NetManager_1 = __decorate([
      AutoInit
    ], exports.NetManager);
    exports.EffectPlayerType = void 0;
    (function(EffectPlayerType) {
      EffectPlayerType[EffectPlayerType["Pos"] = 1] = "Pos";
      EffectPlayerType[EffectPlayerType["Player"] = 2] = "Player";
      EffectPlayerType[EffectPlayerType["GameObject"] = 3] = "GameObject";
    })(exports.EffectPlayerType || (exports.EffectPlayerType = {}));
    var _EffectData = class {
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
      static getPlayInPos(resGuid, position, loopNum, rotation, scale) {
        let data = new _EffectData();
        data.playId = _EffectData.getNewPlayId();
        data.playType = exports.EffectPlayerType.Pos;
        data.resId = resGuid;
        data.position = position != null ? position : Type__default["default"].Vector.zero;
        data.loopNum = loopNum;
        data.rotation = rotation != null ? rotation : Type__default["default"].Rotation.zero;
        data.scale = scale != null ? scale : Type__default["default"].Vector.one;
        return data;
      }
      static getPlayInPlayer(resGuid, player, socketType, loopNum, offset, rotation, scale) {
        let data = new _EffectData();
        data.playId = _EffectData.getNewPlayId();
        data.playType = exports.EffectPlayerType.Player;
        data.resId = resGuid;
        data.position = offset != null ? offset : Type__default["default"].Vector.zero;
        data.loopNum = loopNum;
        data.rotation = rotation != null ? rotation : Type__default["default"].Rotation.zero;
        data.scale = scale != null ? scale : Type__default["default"].Vector.one;
        data.targetPlayerId = player.getPlayerID();
        data.socketType = socketType;
        return data;
      }
      static getPlayInGameObject(resGuid, target, loopNum = 1, offset, rotation, scale) {
        let data = new _EffectData();
        data.playId = _EffectData.getNewPlayId();
        data.playType = exports.EffectPlayerType.GameObject;
        data.resId = resGuid;
        data.position = offset != null ? offset : Type__default["default"].Vector.zero;
        data.loopNum = loopNum;
        data.rotation = rotation != null ? rotation : Type__default["default"].Rotation.zero;
        data.scale = scale != null ? scale : Type__default["default"].Vector.one;
        data.targetGoGuid = target.guid;
        return data;
      }
      static isReady(data) {
        if (data.playType == exports.EffectPlayerType.Pos)
          return true;
        if (data.playType == exports.EffectPlayerType.GameObject)
          return MWCore__default["default"].GameObject.find(data.targetGoGuid) != null;
        if (data.playType == exports.EffectPlayerType.Player)
          return GamePlay__default["default"].GetPlayer(data.targetPlayerId) != null;
        return false;
      }
      static effIsDepend(effData, targetId) {
        if (effData.playType == exports.EffectPlayerType.Pos) {
          return targetId == null;
        }
        return effData.targetGoGuid == targetId || effData.targetPlayerId == targetId;
      }
      static getNewPlayId() {
        if (GamePlay__default["default"].isClient())
          return --this.currentPlayId;
        return ++this.currentPlayId;
      }
    };
    var EffectData = _EffectData;
    __publicField(EffectData, "currentPlayId", 0);
    var Effect = class {
      _resId;
      go;
      effectData;
      isWaitParent;
      startPlayTime = 0;
      _isDone = true;
      loopTime = 0;
      constructor(resId) {
        this._resId = resId;
        if (GamePlay__default["default"].isClient()) {
          if (resId != null) {
            let go = null;
            if (Effect.isAssetId(this.resId)) {
              go = MWCore__default["default"].GameObject.spawnGameObject(resId);
            } else {
              go = MWCore__default["default"].GameObject.find(resId);
              go.setVisibility(Type__default["default"].PropertyStatus.On);
            }
            if (go != null) {
              this.init(go);
            } else {
              oTraceError("Effect: Creat effect fail! resId=" + resId);
            }
          }
        } else {
          oTraceError("Effect: Cant't creat effect on server!");
        }
      }
      static isAssetId(id) {
        return id.length < 10;
      }
      init(go) {
        this.go = go;
        this.go.stop();
        return this;
      }
      play(data) {
        this._isDone = false;
        this.go.stop();
        this.effectData = data;
        this.startPlayTime = TimeUtil.time;
        if (this.effectData.loopNum <= 0) {
          this.go.setLoop(true);
        } else {
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
            let target = MWCore__default["default"].GameObject.find(this.effectData.targetGoGuid);
            this.go.attachToGameObject(target);
            break;
          case exports.EffectPlayerType.Player:
            let player = GamePlay__default["default"].getPlayer(this.effectData.targetPlayerId);
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
      isDepend(targetId) {
        return EffectData.effIsDepend(this.effectData, targetId);
      }
      stop() {
        this.go.detachFromGameObject();
        this.go.stop();
        this._isDone = true;
      }
      get mwEffect() {
        return this.go;
      }
      get playId() {
        return this.effectData.playId;
      }
      get resId() {
        return this._resId;
      }
      get isDone() {
        return this._isDone;
      }
      update(dt) {
        if (this.isDone)
          return true;
        if (this.isWaitParent) {
          if (TimeUtil.time - this.startPlayTime > 10) {
            this.stop();
          } else {
            this.playHandle();
          }
        } else if (this.effectData.loopNum < 0) {
          this.effectData.loopNum += dt;
          if (this.effectData.loopNum >= 0) {
            this.stop();
          }
        }
        return false;
      }
      clone() {
        let go = this.go.clone();
        let effect = new Effect(null);
        effect._resId = this._resId;
        return effect.init(go);
      }
    };
    var EffectManager_1;
    var _a3;
    exports.EffectManager = EffectManager_1 = (_a3 = class {
      static get instance() {
        if (EffectManager_1._instance == null) {
          EffectManager_1._instance = new EffectManager_1();
        }
        return EffectManager_1._instance;
      }
      constructor() {
      }
      static init() {
        this.instance.init();
      }
      destroy() {
        EffectManager_1._instance = null;
      }
      effectMap = /* @__PURE__ */ new Map();
      pool = /* @__PURE__ */ new Map();
      playingEffectArr = [];
      playingEffectMap = /* @__PURE__ */ new Map();
      loopEffectDataOnServer = /* @__PURE__ */ new Map();
      init() {
        if (isListenServer()) {
          TimeUtil.onEnterFrame.add(this.update, this);
        } else if (GamePlay__default["default"].isClient()) {
          TimeUtil.onEnterFrame.add(this.update, this);
          exports.NetManager.instance.registerFun(this.playEffect, this);
          exports.NetManager.instance.registerFun(this.stopEffect, this);
          exports.NetManager.instance.registerFun(this.stopAllEffect, this);
          exports.NetManager.instance.registerFun(this.stopEffectFromHost_Executor, this);
          exports.NetManager.instance.callServerFun("getLoopEffect").then((dataArr) => {
            dataArr.forEach((effData) => {
              this.playEffect(effData);
            });
          });
        } else {
          exports.NetManager.instance.registerFun(() => {
            return this.loopEffectDataOnServer;
          }, this, "getLoopEffect");
        }
      }
      playEffect(data) {
        if (GamePlay__default["default"].isClient()) {
          let effect = this.spawnEffect(data.resId);
          if (effect == null)
            return 0;
          effect.play(data);
          this.playingEffectArr.push(effect);
          this.playingEffectMap.set(data.playId, effect);
        } else {
          if (data.loopNum <= 0) {
            this.loopEffectDataOnServer.set(data.playId, data);
          }
          exports.NetManager.instance.callWorldClientFun(this.playEffect, data);
        }
        return data.playId;
      }
      playEffectInPlayer(resId, player, socketType, loopNum = 1, offset = Type__default["default"].Vector.zero, rotation = null, scale = null) {
        let effectData = EffectData.getPlayInPlayer(resId, player, socketType, loopNum, offset, rotation, scale);
        return this.playEffect(effectData);
      }
      playEffectInGameObject(resId, target, loopNum = 1, offset = Type__default["default"].Vector.zero, rotation = null, scale = null) {
        let effectData = EffectData.getPlayInGameObject(resId, target, loopNum, offset, rotation, scale);
        return this.playEffect(effectData);
      }
      playEffectInPos(resId, pos, loopNum = 1, rotation = null, scale = null) {
        let effectData = EffectData.getPlayInPos(resId, pos, loopNum, rotation, scale);
        return this.playEffect(effectData);
      }
      stopEffectFromHost(resId, target) {
        let hostId = null;
        if (target != null) {
          if (target instanceof GamePlay__default["default"].Player) {
            hostId = target.getPlayerID();
          } else if (target instanceof MWCore__default["default"].GameObject) {
            hostId = target.guid;
          }
        }
        this.stopEffectFromHost_Executor(resId, hostId);
      }
      stopEffectFromHost_Executor(resId, hostId) {
        if (GamePlay__default["default"].isClient()) {
          for (let i = 0; i < this.playingEffectArr.length; i++) {
            if (this.playingEffectArr[i].resId == resId && this.playingEffectArr[i].isDepend(hostId)) {
              this.playingEffectArr[i].stop();
            }
          }
        } else {
          for (let [objId, effData] of this.loopEffectDataOnServer) {
            if (effData.resId == resId && EffectData.effIsDepend(effData, hostId)) {
              this.loopEffectDataOnServer.delete(objId);
            }
          }
          exports.NetManager.instance.callWorldClientFun(this.stopEffectFromHost_Executor, resId, hostId);
        }
      }
      stopEffect(playId) {
        if (playId == 0)
          return;
        if (GamePlay__default["default"].isClient()) {
          let effect = this.getEffect(playId);
          if (effect != null)
            effect.stop();
        } else {
          if (this.loopEffectDataOnServer.has(playId)) {
            this.loopEffectDataOnServer.delete(playId);
          }
          exports.NetManager.instance.callWorldClientFun(this.stopEffect, playId);
        }
      }
      stopAllEffect() {
        if (GamePlay__default["default"].isClient()) {
          for (let i = 0; i < this.playingEffectArr.length; i++) {
            let effect = this.playingEffectArr[i];
            effect.stop();
            this.returnEffect(effect);
          }
          this.playingEffectArr.length = 0;
          this.playingEffectMap.clear();
        } else {
          this.loopEffectDataOnServer.clear();
          exports.NetManager.instance.callWorldClientFun(this.stopAllEffect);
        }
      }
      getEffect(playId) {
        if (GamePlay__default["default"].isClient() && this.playingEffectMap.has(playId))
          return this.playingEffectMap.get(playId);
      }
      update(dt) {
        for (let i = 0; i < this.playingEffectArr.length; ) {
          let effect = this.playingEffectArr[i];
          if (effect.update(dt)) {
            this.returnEffect(effect);
            this.playingEffectArr.splice(i, 1);
            this.playingEffectMap.delete(effect.playId);
          } else {
            i++;
          }
        }
      }
      spawnEffect(resId) {
        if (!this.effectMap.has(resId)) {
          let effect2 = new Effect(resId);
          if (effect2.mwEffect == null)
            return null;
          this.effectMap.set(resId, effect2);
        }
        if (!this.pool.has(resId)) {
          this.pool.set(resId, []);
        }
        let effect = null;
        if (this.pool.get(resId).length == 0) {
          effect = this.effectMap.get(resId).clone();
        } else {
          effect = this.pool.get(resId).shift();
        }
        return effect;
      }
      returnEffect(effect) {
        if (effect == null || !this.pool.has(effect.resId))
          return;
        effect.stop();
        this.pool.get(effect.resId).push(effect);
      }
    }, __publicField(_a3, "_instance"), _a3);
    exports.EffectManager = EffectManager_1 = __decorate([
      AutoInit
    ], exports.EffectManager);
    var StringUtil = class {
      static isEmpty(str) {
        return str == null || str.length == 0;
      }
      static format(str, ...param) {
        if (param == null || param.length == 0) {
          return str;
        }
        for (let i = 0; i < param.length; i++) {
          str = str.replace(`{${i}}`, param[i]);
        }
        return str;
      }
      static secondToHMS(second, style = "{0}:{1}:{2}") {
        if (second < 0)
          second = 0;
        let h = Math.floor(second / 3600);
        second %= 3600;
        let m = Math.floor(second / 60);
        let s = second % 60;
        return this.format(style, h < 10 ? `0${h}` : h, m < 10 ? `0${m}` : m, s < 10 ? `0${s}` : s);
      }
    };
    var NetObject = class {
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
      registerToNet() {
        if (this._netGuid != null) {
          exports.NetManager.instance.registerObj(this, this._netGuid);
        } else {
          oTraceError("NetObject->registerToNet: error guid=" + this._netGuid);
        }
      }
    };
    var NetObjectC = class extends NetObject {
      _server;
      netFunNameMap = /* @__PURE__ */ new Map();
      constructor(netGuid, ServerClass, autoRegisterToNet = true, friendNetGuid = null) {
        super(netGuid, friendNetGuid);
        if (ServerClass != null) {
          this._server = new ServerClass();
          this.serverClassToCallHandler();
        }
        if (autoRegisterToNet && netGuid != null)
          this.registerToNet();
      }
      serverClassToCallHandler() {
        this.replaceNetFun(this.server, true);
        if (this.server["__proto__"] != null) {
          this.replaceNetFun(this.server["__proto__"], false);
        }
      }
      replaceNetFun(obj, deleteOther) {
        let prototype = Object.getPrototypeOf(obj);
        let funNames = Reflect.ownKeys(prototype);
        for (let i = 0; i < funNames.length; i++) {
          let funName = funNames[i].toString();
          if (funName.startsWith("net_") && typeof obj[funName] === "function") {
            let fun = this.creatCallServerFun(funName);
            this.server[funName] = fun;
            this.netFunNameMap.set(fun, funName);
          } else if (deleteOther) {
            delete this.server[funName];
          }
        }
      }
      creatCallServerFun(funName) {
        return (...prames) => {
          return exports.NetManager.instance.callServerFun(`${this.friendNetGuid}.${funName}`, ...prames);
        };
      }
      async callServerFun(fun, ...prames) {
        if (fun == null)
          return;
        let funName;
        if (fun instanceof Function) {
          if (StringUtil.isEmpty(fun.name)) {
            funName = this.netFunNameMap.get(fun);
          } else {
            funName = fun.name;
          }
        } else {
          funName = fun;
        }
        let res = await exports.NetManager.instance.callServerFun(`${this.friendNetGuid}.${funName}`, ...prames);
        return res;
      }
      get server() {
        return this._server;
      }
      get currentPlayer() {
        return GamePlay__default["default"].getCurrentPlayer();
      }
      get currentPlayerId() {
        return GamePlay__default["default"].getCurrentPlayer().getPlayerID();
      }
    };
    var ModuleC8 = class extends NetObjectC {
      ModuleDataClass;
      constructor(ServerModuleClass, ModuleDataClass, netGuid, serverNetGuid) {
        super(netGuid, ServerModuleClass, false, serverNetGuid);
        this.ModuleDataClass = ModuleDataClass;
      }
      get data() {
        return DataCenterC6.instance.getModuleData(this.ModuleDataClass);
      }
      onAwake() {
      }
      onStart() {
      }
      onEnterScene(sceneType) {
      }
      onUpdate(dt) {
      }
      onDestroy() {
      }
      execute(type, param) {
      }
      async onRreloadAsset(sceneType) {
        return null;
      }
    };
    var NetObjectS = class extends NetObject {
      _client;
      netFunNameMap = /* @__PURE__ */ new Map();
      callClientObj = { funName: null, params: null };
      constructor(netGuid, ClientClass, autoRegister = true, friendNetGuid = null) {
        super(netGuid, friendNetGuid);
        if (ClientClass != null) {
          this._client = new ClientClass();
          this.clientClassToCallHandler();
        }
        if (autoRegister && netGuid != null)
          this.registerToNet();
      }
      clientClassToCallHandler() {
        this.replaceNetFun(this.client, true);
        if (this.client["__proto__"] != null) {
          this.replaceNetFun(this.client["__proto__"], false);
        }
      }
      replaceNetFun(obj, deleteOther) {
        let prototype = Object.getPrototypeOf(obj);
        let funNames = Reflect.ownKeys(prototype);
        for (let i = 0; i < funNames.length; i++) {
          let funName = funNames[i].toString();
          if (funName.startsWith("net_") && typeof obj[funName] === "function") {
            let fun = this.getCallClientFun(funName);
            this.client[funName] = fun;
            this.netFunNameMap.set(fun, funName);
          } else if (deleteOther) {
            delete obj[funName];
          }
        }
      }
      getCallClientFun(funName) {
        return (...params) => {
          this.callClientObj.funName = funName;
          this.callClientObj.params = params;
        };
      }
      get client() {
        return this._client;
      }
      get currentPlayer() {
        return exports.NetManager.instance.currentPlayer;
      }
      get currentPlayerId() {
        if (this.currentPlayer == null)
          return 0;
        return this.currentPlayer.getPlayerID();
      }
      callClientFun(player, fun, ...params) {
        this.setCallClientObj(fun, params);
        exports.NetManager.instance.callClientFun(player, `${this.friendNetGuid}.${this.callClientObj.funName}`, ...this.callClientObj.params);
      }
      callAroundClientFun(fun, ...params) {
        this.setCallClientObj(fun, params);
        exports.NetManager.instance.callAroundClientFun(`${this.friendNetGuid}.${this.callClientObj.funName}`, ...this.callClientObj.params);
      }
      callWorldClientFun(fun, ...params) {
        this.setCallClientObj(fun, params);
        exports.NetManager.instance.callWorldClientFun(`${this.friendNetGuid}.${this.callClientObj.funName}`, ...this.callClientObj.params);
      }
      setCallClientObj(fun, params) {
        if (fun == void 0)
          return;
        if (typeof fun === "string") {
          this.callClientObj.funName = fun;
          this.callClientObj.params = params;
        } else if (fun instanceof Function) {
          if (StringUtil.isEmpty(fun.name)) {
            this.callClientObj.funName = this.netFunNameMap.get(fun);
          } else {
            this.callClientObj.funName = fun.name;
          }
          this.callClientObj.params = params;
        }
      }
    };
    var ModuleS9 = class extends NetObjectS {
      ModuleDataClass;
      constructor(ClientModuleClass, ModuleDataClass, netGuid, clientNetGuid) {
        super(netGuid, ClientModuleClass, true, clientNetGuid);
        this.ModuleDataClass = ModuleDataClass;
      }
      get currentData() {
        let platerData = DataCenterS7.instance.getPlayerData(this.currentPlayer);
        if (platerData != null) {
          return platerData.getModuleData(this.ModuleDataClass);
        }
        return null;
      }
      get enterGamePlayerMap() {
        return ModuleManager13.instance["inGamePlayerMap"];
      }
      getPlayerData(player) {
        return DataCenterS7.instance.getPlayerData(player).getModuleData(this.ModuleDataClass);
      }
      onAwake() {
      }
      onStart() {
      }
      onUpdate(dt) {
      }
      onDestroy() {
      }
      execute(param, data) {
      }
      onPlayerJoined(player) {
      }
      onPlayerLeft(player) {
      }
      onPlayerEnterGame(player, reenter) {
      }
    };
    var _ModuleManager = class {
      static get instance() {
        if (_ModuleManager._instance == null) {
          _ModuleManager._instance = new _ModuleManager();
        }
        return _ModuleManager._instance;
      }
      destroy() {
        _ModuleManager._instance = null;
      }
      moduleMapType;
      moduleArr;
      ClientFirstStartModule = null;
      inGamePlayerMap;
      constructor() {
        this.moduleMapType = /* @__PURE__ */ new Map();
        this.moduleArr = [];
      }
      register(ServerModule, ClientModule, ModuleDataClass) {
        if (GamePlay__default["default"].isServer()) {
          this.registerModule(ServerModule, ClientModule, ModuleDataClass, ServerModule.name, ClientModule.name);
        }
        if (GamePlay__default["default"].isClient()) {
          this.registerModule(ClientModule, ServerModule, ModuleDataClass, ClientModule.name, ServerModule.name);
        }
      }
      setClientFirstStartModule(ModuleClass) {
        if (GamePlay__default["default"].isClient()) {
          this.ClientFirstStartModule = ModuleClass;
        }
      }
      registerModule(ModuleClass, FriendClass, ModuleDataClass, netGuid, friendNetGuid) {
        let muduleType = ModuleClass.name;
        if (this.moduleMapType.has(muduleType)) {
          oTraceError("Module is repetitive! ModuleName=" + muduleType);
          return;
        }
        oTrace("RegisterModule! ModuleName=" + muduleType);
        let module3 = new ModuleClass(FriendClass, ModuleDataClass, netGuid, friendNetGuid);
        this.moduleMapType.set(muduleType, module3);
        let startModuleFun = module3.onStart.bind(module3);
        module3.onStart = () => {
          if (startModuleFun != null) {
            this.moduleArr.push(module3);
            startModuleFun();
            startModuleFun = null;
          }
        };
      }
      getModule(ModuleClass) {
        let key = ModuleClass.name;
        if (this.moduleMapType.has(key)) {
          return this.moduleMapType.get(key);
        }
        return null;
      }
      update(dt) {
        for (let i = 0; i < this.moduleArr.length; i++) {
          this.moduleArr[i].onUpdate(dt);
        }
      }
      awakeAllModule(SuperClass) {
        this.forEachModule((moudle) => {
          moudle.onAwake();
        }, SuperClass);
      }
      startAllModule(SuperClass) {
        this.forEachModule((moudle) => {
          this.startModule(moudle);
        }, SuperClass);
        if (SuperClass == ModuleS9) {
          this.inGamePlayerMap = /* @__PURE__ */ new Map();
          DataCenterS7.instance.onPlayerJoined.add((player) => {
            this.forEachModule((moudle) => {
              moudle["onPlayerJoined"](player);
            });
          }, ModuleS9);
          DataCenterS7.instance.onPlayerLeft.add((player) => {
            this.forEachModule((moudle) => {
              moudle["onPlayerLeft"](player);
              let playerId = player.getPlayerID();
              this.inGamePlayerMap.delete(playerId);
            }, ModuleS9);
          });
          Events__default["default"].addClientListener("PlayerEnterGame", (player) => {
            let playerId = player.getPlayerID();
            let reenter = this.inGamePlayerMap.has(playerId);
            this.inGamePlayerMap.set(playerId, player);
            this.forEachModule((moudle) => {
              moudle["onPlayerEnterGame"](player, reenter);
            }, ModuleS9);
          });
        }
        TimeUtil.onEnterFrame.add(this.update, this);
      }
      startModule(module3) {
        if (module3 instanceof ModuleC8) {
          module3.registerToNet();
        }
        module3.onStart();
      }
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
      async preloadAssetAllModule(sceneType) {
        for (let i = 0; i < this.moduleArr.length; i++) {
          if (this.moduleArr[i] instanceof ModuleC8) {
            await this.moduleArr[i]["onRreloadAsset"](sceneType);
          }
        }
      }
      enterSceneAllModule(sceneType) {
        this.forEachModule((moudle) => {
          moudle["onEnterScene"]();
        }, ModuleC8);
        Events__default["default"].dispatchToServer("PlayerEnterGame");
      }
      destroyAllModule() {
        this.forEachModule((moudle) => {
          moudle.onDestroy();
        });
        TimeUtil.onEnterFrame.remove(this.update, this);
      }
      forEachModule(executer, TypeFilter) {
        for (let [moudleType, moduleObj] of this.moduleMapType) {
          if (TypeFilter == null || moduleObj instanceof TypeFilter) {
            executer(moduleObj);
          }
        }
      }
      execut(ModuleClass, type, param) {
        let module3 = this.getModule(ModuleClass);
        if (module3 == null) {
          oTraceError("execut module not find! module=" + ModuleClass.name);
          return null;
        }
        return module3.execute(type, param);
      }
      async start(onModuleAwake, onFirstModuleStart, onAllModuleStart, onModulePreloadAssets, onModuleEnterScene) {
        if (onModuleAwake != null)
          onModuleAwake();
        _ModuleManager.instance["awakeAllModule"](ModuleC8);
        if (onFirstModuleStart != null)
          onFirstModuleStart();
        await _ModuleManager.instance["startClientFirstModule"]();
        if (onAllModuleStart != null)
          onAllModuleStart();
        _ModuleManager.instance["startAllModule"](ModuleC8);
        if (onModulePreloadAssets != null)
          onModulePreloadAssets();
        await _ModuleManager.instance["preloadAssetAllModule"](1);
        if (onModuleEnterScene != null)
          onModuleEnterScene();
        _ModuleManager.instance["enterSceneAllModule"](1);
      }
    };
    var ModuleManager13 = _ModuleManager;
    __publicField(ModuleManager13, "_instance");
    var _Sound = class {
      onComplete = new Action();
      playId;
      targetGuid;
      go;
      loopNum;
      _resId;
      _isDone = true;
      _isError = false;
      _volume;
      constructor(resId) {
        if (resId != null) {
          let go = MWCore__default["default"].GameObject.spawnGameObject(resId);
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
        this.go.setRelativeLocation(Type__default["default"].Vector.ZERO);
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
        this.go.setSoundSphere(1e3, 1, false, GamePlay__default["default"].MWAttenuationDistanceModel.Linear);
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
        this.go.volumeMultiplier = value * _Sound.volumeScale;
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
        let sound = new _Sound(null);
        let go = this.go.clone();
        return sound.init(go, this._resId);
      }
    };
    var Sound2 = _Sound;
    __publicField(Sound2, "volumeScale", 1);
    __publicField(Sound2, "bgmVolumeScale", 1);
    var SoundManager_1;
    var _a4;
    exports.SoundManager = SoundManager_1 = (_a4 = class {
      static get instance() {
        if (SoundManager_1._instance == null) {
          SoundManager_1._instance = new SoundManager_1();
        }
        return SoundManager_1._instance;
      }
      constructor() {
      }
      static init() {
        this.instance.init();
      }
      destroy() {
        SoundManager_1._instance = null;
      }
      onPlaySoundComplete = new Action1();
      currentPlayId = 0;
      soundMap = /* @__PURE__ */ new Map();
      pool = /* @__PURE__ */ new Map();
      playingSound = [];
      bgm;
      init() {
        if (isListenServer()) {
          TimeUtil.onEnterFrame.add(this.update, this);
        } else if (GamePlay__default["default"].isClient()) {
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
      playSound(resId, loopNum = 1, volume = 1) {
        if (GamePlay__default["default"].isClient()) {
          let sound = this.getSound(resId);
          if (sound != null) {
            sound.play(loopNum, volume);
          }
        } else {
          exports.NetManager.instance.callWorldClientFun(this.playSound, resId, loopNum, volume);
        }
        return resId;
      }
      stopSound(resId) {
        if (GamePlay__default["default"].isClient()) {
          let sound = this.getSound(resId, false);
          if (sound != null)
            sound.stop();
        } else {
          exports.NetManager.instance.callWorldClientFun(this.stopSound, resId);
        }
      }
      stopAllSound() {
        if (GamePlay__default["default"].isClient()) {
          for (let [resId, sound] of this.soundMap) {
            if (sound != this.bgm) {
              sound.stop();
            }
          }
        } else {
          exports.NetManager.instance.callWorldClientFun(this.stopAllSound);
        }
      }
      playBGM(resId, volume = 1) {
        if (GamePlay__default["default"].isClient()) {
          this.stopBGM();
          this.bgm = this.getSound(resId);
          if (this.bgm != null) {
            let befor = Sound2.volumeScale;
            Sound2.volumeScale = Sound2.bgmVolumeScale;
            this.bgm.play(0, volume);
            Sound2.volumeScale = befor;
          }
        } else {
          exports.NetManager.instance.callWorldClientFun(this.playBGM, resId, volume);
        }
      }
      stopBGM() {
        if (GamePlay__default["default"].isClient()) {
          if (this.bgm != null) {
            this.bgm.stop();
            this.bgm = null;
          }
        } else {
          exports.NetManager.instance.callWorldClientFun(this.stopBGM);
        }
      }
      play3DSound(resId, target, loopNum = 1, volume = 1) {
        let playId = this.getNewPlayId();
        this.net_play3DSoundHandle(resId, target, loopNum, volume, playId);
        return playId;
      }
      net_play3DSoundHandle(resId, target, loopNum = 1, volume = 1, playId = 0) {
        if (GamePlay__default["default"].isClient()) {
          let sound = this.spawn3DSound(resId, playId);
          if (sound == null)
            return null;
          if (target instanceof MWCore__default["default"].GameObject) {
            sound.playInTarget(target, loopNum, volume);
          } else if (target instanceof Type__default["default"].Vector) {
            sound.playInPos(target, loopNum, volume);
          } else {
            target = MWCore__default["default"].GameObject.find(target);
            if (target != null) {
              sound.playInTarget(target, loopNum, volume);
            }
          }
        } else {
          if (target instanceof MWCore__default["default"].GameObject)
            exports.NetManager.instance.callWorldClientFun(this.net_play3DSoundHandle, resId, target.guid, loopNum, volume, playId);
          else
            exports.NetManager.instance.callWorldClientFun(this.net_play3DSoundHandle, resId, target, loopNum, volume, playId);
        }
      }
      stop3DSound(playId) {
        if (GamePlay__default["default"].isClient()) {
          let targetSound = this.playingSound.find((ele) => {
            return ele.playId == playId;
          });
          if (targetSound != null)
            targetSound.stop();
        } else {
          exports.NetManager.instance.callWorldClientFun(this.stop3DSound, playId);
        }
      }
      stopAll3DSound() {
        if (GamePlay__default["default"].isClient()) {
          for (let i = 0; i < this.playingSound.length; i++) {
            this.playingSound[i].stop();
          }
        } else {
          exports.NetManager.instance.callWorldClientFun(this.stopAll3DSound);
        }
      }
      set volumeScale(value) {
        if (GamePlay__default["default"].isClient()) {
          Sound2.volumeScale = value;
          for (let i = 0; i < this.playingSound.length; i++) {
            this.playingSound[i].volume = this.playingSound[i].volume;
          }
          for (let [name, sound] of this.soundMap) {
            sound.volume = sound.volume;
          }
        }
      }
      get volumeScale() {
        if (GamePlay__default["default"].isClient())
          return Sound2.volumeScale;
        return 0;
      }
      set bgmVolumeScale(value) {
        if (GamePlay__default["default"].isClient()) {
          Sound2.bgmVolumeScale = value;
          if (this.bgm != null) {
            let befor = Sound2.volumeScale;
            Sound2.volumeScale = Sound2.bgmVolumeScale;
            this.bgm.volume = this.bgm.volume;
            Sound2.volumeScale = befor;
          }
        }
      }
      get bgmVolumeScale() {
        if (GamePlay__default["default"].isClient())
          return Sound2.bgmVolumeScale;
        return 0;
      }
      update(dt) {
        for (let i = 0; i < this.playingSound.length; ) {
          let sound = this.playingSound[i];
          if (sound.isDone) {
            this.playingSound.splice(i, 1);
            this.return3DSound(sound);
            if (this.onPlaySoundComplete.count > 0) {
              this.onPlaySoundComplete.call(sound.playId > 0 ? sound.playId : sound.resId);
              this.onPlaySoundComplete.clear();
            }
          } else {
            i++;
          }
        }
      }
      getSound(resId, creat = true) {
        if (!this.soundMap.has(resId)) {
          if (!creat)
            return null;
          this.soundMap.set(resId, new Sound2(resId));
        }
        let sound = this.soundMap.get(resId);
        if (sound.isError) {
          oTrace("There's something wrong with the sound! resId=" + resId);
          return null;
        }
        sound.playId = 0;
        return sound;
      }
      spawn3DSound(resId, playId) {
        if (!this.pool.has(resId)) {
          this.pool.set(resId, []);
        }
        let sound = null;
        if (this.pool.get(resId).length == 0) {
          sound = this.getSound(resId).clone();
        } else {
          sound = this.pool.get(resId).shift();
        }
        this.playingSound.push(sound);
        sound.playId = playId;
        return sound;
      }
      return3DSound(sound) {
        if (sound == null || !this.pool.has(sound.resId))
          return;
        this.pool.get(sound.resId).push(sound);
      }
      getNewPlayId() {
        if (GamePlay__default["default"].isClient())
          return --this.currentPlayId;
        return ++this.currentPlayId;
      }
    }, __publicField(_a4, "_instance"), _a4);
    exports.SoundManager = SoundManager_1 = __decorate([
      AutoInit
    ], exports.SoundManager);
    var GoNode = class {
      name;
      guid;
      parentGuid;
      children;
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
      static getChildByName(goNode, name) {
        for (let i = 0; i < goNode.children.length; i++) {
          if (goNode.children[i].name == name) {
            return goNode.children[i];
          }
        }
        return null;
      }
      static getChildrenByName(goNode, name) {
        let arr = [];
        for (let i = 0; i < goNode.children.length; i++) {
          if (goNode.children[i].name == name) {
            arr.push(goNode.children[i]);
          }
        }
        return arr;
      }
      static getChildByGuid(goNode, guid) {
        for (let i = 0; i < goNode.children.length; i++) {
          if (goNode.children[i].guid == guid) {
            return goNode.children[i];
          }
        }
        return null;
      }
      static getChildByPath(goNode, path) {
        let arr = path.split("/");
        let currentNode = goNode;
        for (let i = 0; i < arr.length; i++) {
          currentNode = this.getChildByName(currentNode, arr[i]);
          if (currentNode == null)
            return null;
          if (i == arr.length - 1)
            return currentNode;
        }
      }
      static getChildrenByPath(goNode, path) {
        let arr = path.split("/");
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
      static getString(goNode) {
        return this.getStringHandle(goNode, 0);
      }
      static getStringHandle(goNode, depth = 0) {
        let str = "\n";
        for (let i = 0; i < depth; i++) {
          str += "  ";
        }
        str += goNode.name;
        for (let i = 0; i < goNode.children.length; i++) {
          str += GoNode.getStringHandle(goNode.children[i], depth + 1);
        }
        return str;
      }
    };
    var ResManager_1;
    var _a5;
    exports.ResManager = ResManager_1 = (_a5 = class {
      static get instance() {
        if (ResManager_1._instance == null) {
          ResManager_1._instance = new ResManager_1();
        }
        return ResManager_1._instance;
      }
      constructor() {
      }
      static init() {
        this.instance.init();
      }
      destroy() {
        ResManager_1._instance = null;
      }
      _isInit = false;
      init() {
        if (this._isInit)
          return;
        this._isInit = true;
        if (GamePlay__default["default"].isServer()) {
          exports.NetManager.instance.registerFun(this.netServerGetGameObjectNodeTreeByPath, this);
          exports.NetManager.instance.registerFun(this.netServerGetGameObjectNodeTreeByGuid, this);
          exports.NetManager.instance.registerFun(this.netServerGetGameObjectGuid, this);
          exports.NetManager.instance.registerFun(this.getChildGuidFromGo, this);
          exports.NetManager.instance.registerFun(this.getScriptGuidFromGo, this);
          exports.NetManager.instance.registerFun(this.findChildFromGo, this);
          exports.NetManager.instance.registerFun(this.findScriptFromGo, this);
        }
      }
      async loadGoNode(guid) {
        if (GamePlay__default["default"].isServer()) {
          return this.netServerGetGameObjectNodeTreeByGuid(guid, false);
        } else {
          let goNode = await exports.NetManager.instance.callServerFun(this.netServerGetGameObjectNodeTreeByGuid, guid, true);
          if (goNode == null)
            return null;
          let res = await this.gameObjectIsOK(goNode);
          return res ? goNode : null;
        }
      }
      async findGameObjectByPath(path, waitTime = 1e4) {
        let guid;
        if (GamePlay__default["default"].isServer()) {
          guid = this.netServerGetGameObjectGuid(path);
        } else {
          guid = await exports.NetManager.instance.callServerFun(this.netServerGetGameObjectGuid, path);
        }
        if (guid == null)
          return null;
        return this.findGameObjectByGuid(guid, waitTime);
      }
      async findGameObjectByGuid(guid, waitTime = 1e4) {
        let go = MWCore__default["default"].GameObject.find(guid);
        if (go != null)
          return go;
        return new Promise((resolve) => {
          let tickTime = 100;
          let id = setInterval(() => {
            go = MWCore__default["default"].GameObject.find(guid);
            waitTime -= tickTime;
            if (go != null || waitTime <= 0) {
              clearInterval(id);
              resolve(go);
            }
          }, tickTime);
        });
      }
      async findScriptByGuid(guid, waitTime = 1e4) {
        let sp = MWCore__default["default"].MWScriptManager.findScript(guid);
        if (sp != null)
          return sp;
        return new Promise((resolve) => {
          let tickTime = 100;
          let id = setInterval(() => {
            sp = MWCore__default["default"].MWScriptManager.findScript(guid);
            waitTime -= tickTime;
            if (sp != null || waitTime <= 0) {
              clearInterval(id);
              resolve(sp);
            }
          }, tickTime);
        });
      }
      async gameObjectIsOK(nodeTree) {
        return new Promise((resolve) => {
          let time = 0;
          let arr = [nodeTree];
          let id = setInterval(() => {
            time += 100;
            while (arr.length > 0) {
              let node = arr[0];
              let guid = node.guid;
              let go = MWCore__default["default"].GameObject.find(guid);
              if (go != null) {
                for (let i = 0; node.children != null && i < node.children.length; i++) {
                  arr.push(node.children[i]);
                }
                arr.shift();
              } else {
                break;
              }
            }
            if (arr.length == 0) {
              clearInterval(id);
              resolve(true);
            } else if (time > 3e4) {
              clearInterval(id);
              resolve(false);
            }
          }, 100);
        });
      }
      netServerGetGameObjectNodeTreeByPath(path, ignoreServerOnly) {
        if (GamePlay__default["default"].isServer()) {
          let go = this.getMWGameObject(path);
          if (go == null)
            return;
          return GoNode.get(go, ignoreServerOnly);
        }
      }
      netServerGetGameObjectNodeTreeByGuid(guid, ignoreServerOnly) {
        if (GamePlay__default["default"].isServer()) {
          let go = MWCore__default["default"].GameObject.find(guid);
          if (go == null)
            return;
          return GoNode.get(go, ignoreServerOnly);
        }
      }
      netServerGetGameObjectGuid(path) {
        if (!GamePlay__default["default"].isServer())
          return null;
        let go = this.getMWGameObject(path);
        if (go != null)
          return go.guid;
        return null;
      }
      getMWGameObject(path) {
        if (!GamePlay__default["default"].isServer())
          return null;
        if (path.indexOf("/") == -1) {
          let name = path;
          return this.getRootMWGameObject(name);
        } else {
          let pathCells = path.split("/");
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
      getRootMWGameObject(name) {
        let gos = MWCore__default["default"].GameObject.getGameObjectsByName(name);
        for (let i = 0; i < gos.length; i++) {
          if (gos[i].parent == null) {
            return gos[i];
          }
        }
        return null;
      }
      async getChildGuidFromGo(targetGo, path) {
        if (StringUtil.isEmpty(path))
          return null;
        let targetGuid = this.getGoGuid(targetGo);
        if (GamePlay__default["default"].isClient()) {
          return await exports.NetManager.instance.callServerFun(this.getChildGuidFromGo, targetGuid, path);
        }
        let arr = path.split("/");
        const maxFindTimes = 10;
        let findTimes = maxFindTimes;
        let i = -1;
        let go = null;
        if (targetGo instanceof MWCore__default["default"].GameObject) {
          go = targetGo;
          i = 0;
        }
        return new Promise((resolve) => {
          let id = setInterval(() => {
            let findRes = null;
            if (i == -1) {
              findRes = MWCore__default["default"].GameObject.find(targetGuid);
            } else if (arr[i] == "..") {
              findRes = go.parent;
            } else {
              findRes = go.getChildByName(arr[i]);
            }
            if (findRes != null) {
              go = findRes;
              i++;
              findTimes = maxFindTimes;
            } else {
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
      async getScriptGuidFromGo(targetGo, path) {
        if (StringUtil.isEmpty(path))
          return null;
        let targetGuid = this.getGoGuid(targetGo);
        if (GamePlay__default["default"].isClient()) {
          return await exports.NetManager.instance.callServerFun(this.getScriptGuidFromGo, targetGuid, path);
        }
        let arr = path.split("/");
        const maxFindTimes = 10;
        let findTimes = maxFindTimes;
        let i = -1;
        let go = null;
        let sp = null;
        if (targetGo instanceof MWCore__default["default"].GameObject) {
          go = targetGo;
          i = 0;
        }
        return new Promise((resolve) => {
          let id = setInterval(() => {
            let findRes = null;
            if (i == arr.length - 1) {
              if (arr[i].endsWith(".ts"))
                sp = go.getScriptByName(arr[i]);
              else
                sp = go.getScriptByName(`${arr[i]}.ts`);
            } else if (i == -1) {
              findRes = MWCore__default["default"].GameObject.find(targetGuid);
            } else if (arr[i] == "..") {
              findRes = go.parent;
            } else {
              findRes = go.getChildByName(arr[i]);
            }
            if (findRes != null) {
              go = findRes;
              i++;
              findTimes = maxFindTimes;
            } else {
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
      async findChildFromGo(targetGo, path) {
        let targetGuid = this.getGoGuid(targetGo);
        let guid = await this.getChildGuidFromGo(targetGuid, path);
        if (guid == null) {
          oTraceError("ResManager.findChild: findChild fail!   path=" + path);
          return null;
        }
        return this.findGameObjectByGuid(guid);
      }
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
        if (targetGo instanceof MWCore__default["default"].GameObject) {
          return targetGo.guid;
        }
        return targetGo;
      }
    }, __publicField(_a5, "_instance"), _a5);
    exports.ResManager = ResManager_1 = __decorate([
      AutoInit
    ], exports.ResManager);
    var InputManager_1;
    var _a6;
    exports.InputManager = InputManager_1 = (_a6 = class {
      constructor() {
        this.init();
      }
      destroy() {
        InputManager_1.instance = null;
      }
      _onTouch;
      touchInput;
      beginMulFun;
      keyDownActionMap;
      init() {
        if (GamePlay__default["default"].isClient()) {
          this._onTouch = new Action1();
          this.keyDownActionMap = /* @__PURE__ */ new Map();
          this._onTouch.setCountChangeCallback((count) => {
            if (count == 1) {
              if (this.touchInput == null) {
                this.beginMulFun = this.touchBegin.bind(this);
                this.initTouch();
              }
              this.touchInput.touchBeginMulDele.Add(this.beginMulFun);
            } else if (count = 0) {
              this.touchInput.touchBeginMulDele.Remove(this.beginMulFun);
            }
          });
        }
      }
      get onTouch() {
        return this._onTouch;
      }
      onKeyDown(key) {
        if (!this.keyDownActionMap.has(key)) {
          this.keyDownActionMap.set(key, new Action1());
          Events__default["default"].onKeyDown(key, () => {
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
        this.touchInput = new GamePlay__default["default"].SysTouchInput();
        GamePlay__default["default"].asyncGetCurrentPlayer().then((player) => {
          this.touchInput.setPlayerController();
        });
      }
      touchBegin() {
        let pos = this.touchInput.getPlayerControllTouches()[0];
        let list = GamePlay__default["default"].getClickGameObjectByScene(pos.x, pos.y, 5e4, true, false);
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
        oTrace("------------Mouse Click\u2026\u2026");
        for (let i = 0; list != null && i < list.length; i++) {
          oTrace("List: " + list[i].gameObject.name);
        }
      }
    }, __publicField(_a6, "instance"), _a6);
    exports.InputManager = InputManager_1 = __decorate([
      Singleton()
    ], exports.InputManager);
    exports.UILayer = void 0;
    (function(UILayer) {
      UILayer[UILayer["Bottom"] = 0] = "Bottom";
      UILayer[UILayer["Middle"] = 1] = "Middle";
      UILayer[UILayer["Own"] = 2] = "Own";
      UILayer[UILayer["Top"] = 3] = "Top";
    })(exports.UILayer || (exports.UILayer = {}));
    var _UI = class extends MWGameUI__default["default"].MWUIBehaviour {
      static get instance() {
        return this._instance;
      }
      LayerMap = /* @__PURE__ */ new Map([
        [exports.UILayer.Bottom, { startZ: 0, z: 0, panels: [] }],
        [exports.UILayer.Middle, { startZ: 1e5, z: 0, panels: [] }],
        [exports.UILayer.Own, { startZ: 2e4, z: 0, panels: [] }],
        [exports.UILayer.Top, { startZ: 3e5, z: 0, panels: [] }]
      ]);
      creatPanleMap = /* @__PURE__ */ new Map();
      uniquePanel;
      _canvas;
      onInitialized() {
        _UI._instance = this;
      }
      get canvas() {
        if (this._canvas == null) {
          this._canvas = this.uiObjectAS().getRootContent();
          this._canvas.setVisibility(MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible);
        }
        return this._canvas;
      }
      addChild(panel, layer = exports.UILayer.Middle) {
        if (panel == null)
          return;
        if (panel.uiObject.getParent() == null) {
          this.canvas.addChild(panel.uiObject);
        }
        let beforLayerType = this.getPanelLayer(panel);
        if (layer == exports.UILayer.Own) {
          let panels = this.LayerMap.get(exports.UILayer.Own).panels;
          if (panels.length > 0) {
            this.uniquePanel = null;
            this.removeChild(panels[0]);
          }
          this.uniquePanel = panel;
          this.setAllMiddleAndBottomPanelVisible(false);
        }
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
          panel.uiObject.setVisibility(MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible);
        }
        panel.uiObject.getSlot().setSize(Global__default["default"].getViewportSize());
        if (beforLayerType == null) {
          panel["enable"]();
        }
        return panel;
      }
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
            panel.uiObject.setVisibility(MWGameUI__default["default"].ESlateVisibility.Collapsed);
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
      getPanel(PanelClass) {
        let name = PanelClass.name;
        if (!this.creatPanleMap.has(name)) {
          let panel = PanelClass.creat();
          this.creatPanleMap.set(name, panel);
        }
        return this.creatPanleMap.get(name);
      }
      showPanel(PanelClass, ...prames) {
        this.getPanel(PanelClass).show(...prames);
      }
      hidePanel(PanelClass) {
        let name = PanelClass.name;
        if (this.creatPanleMap.has(name)) {
          this.creatPanleMap.get(name).hide();
        }
      }
      destroyPanel(PanelClass) {
        let name = PanelClass.name;
        if (this.creatPanleMap.has(name)) {
          this.creatPanleMap.get(name).destroy();
        }
      }
      panelIsShow(panel) {
        if (panel == null)
          return false;
        return this.getPanelLayer(panel) != null;
      }
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
      getPanelLayer(panel) {
        for (let [key, value] of this.LayerMap) {
          if (value.panels.indexOf(panel) != -1)
            return key;
        }
        return null;
      }
      layoutWidget(widget) {
        let size = _UI.getCanvasSize();
        widget.getSlot().setSize(size);
      }
      static async ready() {
        return new Promise((resolve) => {
          let id = setInterval(() => {
            if (_UI._instance != null) {
              while (_UI._instance.canvas.getChildrenCount() > 0) {
                let child = _UI._instance.canvas.getChildAt(0);
                child.destroyObject();
              }
              clearInterval(id);
              resolve();
            }
          }, 30);
        });
      }
      static getCanvasSize() {
        return Global__default["default"].getViewportSize();
      }
      static getCanvasPointByWorld(worldPos) {
        let res = GamePlay__default["default"].getCurrentPlayer().projectWorldLocationToWidgetPosition(worldPos, false);
        if (res.result)
          return res.screenPosition;
        return Type__default["default"].Vector.zero;
      }
    };
    var UI12 = _UI;
    __publicField(UI12, "_instance");
    var OdinGame2 = class extends MWCore__default["default"].MWScript {
      consoleLevel = "3";
      languageIndex = "-1";
      autoInit = true;
      onStart() {
        this.showLog("Script onStart");
        this.bUseUpdate = true;
        if (OdinGame2.isListenServer()) {
          this.initServer();
          this.initClient();
        } else if (GamePlay__default["default"].isClient()) {
          DataCenterC6.instance.init();
          this.initClient();
        } else {
          this.initServer();
        }
      }
      onUpdate(dt) {
        TimeUtil.update(dt);
      }
      onDestroy() {
        this.exitGame();
      }
      static isListenServer() {
        return isListenServer();
      }
      async onInitClientByHand() {
      }
      get selectedLanguageIndex() {
        return Number(this.languageIndex);
      }
      exitGame() {
        ModuleManager13.instance["destroyAllModule"]();
        ModuleManager13.instance.destroy();
        exports.NetManager.instance.destroy();
        exports.SoundManager.instance.destroy();
        exports.EffectManager.instance.destroy();
        exports.ResManager.instance.destroy();
        exports.InputManager.instance.destroy();
      }
      initServer() {
        if (!OdinGame2.isListenServer()) {
          DataCenterS7.instance.init();
        }
        this.onRegisterModule();
        ModuleManager13.instance["awakeAllModule"](ModuleS9);
        ModuleManager13.instance["startAllModule"](ModuleS9);
        this.showLog("InitServer Complete");
        exports.LogManager.instance.setLogLevel(Number(this.consoleLevel));
      }
      async initClient() {
        if (!this.autoInit) {
          this.onRegisterModule();
          await this.onInitClientByHand();
          exports.LogManager.instance.setLogLevel(Number(this.consoleLevel));
          return;
        }
        this.showLog("Wait UIRoot");
        await UI12.ready();
        this.showLoading("Start Init Client...", 0);
        if (!OdinGame2.isListenServer()) {
          this.showLoading("Wait Data...", 0.1);
          await DataCenterC6.instance.ready();
        }
        this.showLoading("Wait CurrentPlayer...", 0.2);
        await GamePlay__default["default"].asyncGetCurrentPlayer();
        this.showLoading("Register Modules...", 0.3);
        this.onRegisterModule();
        await ModuleManager13.instance.start(() => {
          this.showLoading("Awake All Module...", 0.65);
        }, () => {
          this.showLoading("Start First Module...", 0.7, true);
        }, () => {
          this.showLoading("Start All Module...", 0.75);
        }, () => {
          this.showLoading("Preload Module Assets...", 0.8);
        }, () => {
          this.showLoading("Enter Game...", 1, true);
        });
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
      onClientLoading(msg, progress, completeAotoClose) {
      }
    };
    __decorate([
      MWCore__default["default"].MWProperty({ displayName: "Log\u7EA7\u522B", group: "Odin\u8BBE\u7F6E", selectOptions: { "None": "0", "Error": "1", "Warn": "2", "Log": "3" } })
    ], OdinGame2.prototype, "consoleLevel", void 0);
    __decorate([
      MWCore__default["default"].MWProperty({ displayName: "\u8BED\u8A00\u7C7B\u578B", group: "Odin\u8BBE\u7F6E", selectOptions: { "\u7CFB\u7EDF\u9ED8\u8BA4": "-1", "English": "0", "\u7B80\u4F53\u4E2D\u6587": "1", "\u65E5\u672C\u8A9E": "2", "Deutsch": "3" } })
    ], OdinGame2.prototype, "languageIndex", void 0);
    __decorate([
      MWCore__default["default"].MWProperty({ displayName: "\u81EA\u52A8\u521D\u59CB\u5316Client", group: "Odin\u8BBE\u7F6E" })
    ], OdinGame2.prototype, "autoInit", void 0);
    var DataInfo4 = class {
      version = 1;
    };
    exports.MapEx = void 0;
    (function(MapEx) {
      function get(map, key) {
        if (map[key]) {
          return map[key];
        }
        return null;
      }
      MapEx.get = get;
      function set(map, key, value) {
        map[key] = value;
      }
      MapEx.set = set;
      function del(map, key) {
        if (map[key]) {
          delete map[key];
          return true;
        }
        return false;
      }
      MapEx.del = del;
      function has(map, key) {
        return map[key] != null;
      }
      MapEx.has = has;
      function count(map) {
        let res = 0;
        forEach(map, (e) => {
          ++res;
        });
        return res;
      }
      MapEx.count = count;
      function forEach(map, callback) {
        for (let key in map) {
          if (map[key]) {
            callback(map[key]);
          }
        }
      }
      MapEx.forEach = forEach;
      function copy(map) {
        let res = {};
        for (let key in map) {
          res[key] = map[key];
        }
        return res;
      }
      MapEx.copy = copy;
      function isNull(map) {
        return !map || map == null || map == void 0;
      }
      MapEx.isNull = isNull;
    })(exports.MapEx || (exports.MapEx = {}));
    var ModuleData5 = class {
      onDataChange = new Action();
      syncActionNetMsg;
      _playerId;
      DataInfoClass;
      dataInfoMap;
      syncToClient;
      constructor(DataInfoClass) {
        this.DataInfoClass = DataInfoClass;
        this.syncActionNetMsg = "ModuleData_ActionSync_Msg_" + this.constructor.name;
        if (GamePlay__default["default"].isClient()) {
          Events__default["default"].addServerListener(this.syncActionNetMsg, (eventType, ...params) => {
            this[eventType].call(...params);
          });
        }
      }
      init(playerId, dataInfoMap) {
        this.dataInfoMap = dataInfoMap;
        this._playerId = playerId;
        if (dataInfoMap[this.dataName] == null) {
          dataInfoMap[this.dataName] = new this.DataInfoClass();
          this.initDefaultData();
        }
        if (GamePlay__default["default"].isServer()) {
          const keys = Object.keys(this);
          keys.forEach((key) => {
            if (this[key] instanceof Action) {
              let actionName = key;
              let action = this[actionName];
              if (action != null) {
                action.add((...params) => {
                  if (this.syncToClient) {
                    oTrace(`syncAction  ${this.constructor.name}-${actionName}`);
                    this.syncToClient = false;
                    let player = GamePlay__default["default"].getPlayer(this._playerId);
                    Events__default["default"].dispatchToClient(player, this.syncActionNetMsg, actionName, ...params);
                  }
                }, this);
              }
            }
          });
        }
        this.onDataInit();
        return this;
      }
      destroy() {
        const keys = Object.keys(this);
        keys.forEach((key) => {
          if (this[key] instanceof Action) {
            let action = this[key];
            if (action != null) {
              action.clear();
            }
          }
        });
      }
      get dataInfo() {
        return this.dataInfoMap[this.dataName];
      }
      get dataName() {
        return this.DataInfoClass.name;
      }
      get playerId() {
        return this._playerId;
      }
      initDefaultData() {
      }
      onDataInit() {
      }
      saveData(syncToClient) {
        if (GamePlay__default["default"].isServer()) {
          DataCenterS7.instance.saveModuleData(this, syncToClient);
          this.syncToClient = syncToClient;
          this.onDataChange.call();
          this.syncToClient = syncToClient;
          return this;
        }
      }
      syncData() {
        if (GamePlay__default["default"].isServer()) {
          DataCenterS7.instance.syncModuleData(this);
          this.onDataChange.call();
          this.syncToClient = true;
          return this;
        }
      }
    };
    var AIMachine = class {
      currentState = null;
      stateMap = /* @__PURE__ */ new Map();
      owner;
      constructor(owner) {
        this.owner = owner;
      }
      register(type, newstate) {
        if (this.stateMap.has(type) == false) {
          this.stateMap.set(type, newstate);
        }
      }
      update() {
        if (this.currentState) {
          this.currentState.onUpdate();
        }
      }
      changeState(type) {
        if (this.currentState) {
          this.currentState.exit();
          this.currentState = null;
        }
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
        this.stateMap.forEach((state) => {
          state.onDestory();
        });
        this.stateMap.clear();
        this.stateMap = null;
      }
    };
    var AIState = class {
      context;
      owner;
      constructor(owner) {
        this.owner = owner;
      }
      change2State(type) {
        this.owner.changeState(type);
      }
      enter(context) {
        this.context = context;
        this.onEnter();
      }
      exit() {
        this.onExit();
      }
      onDestory() {
        this.context = null;
        this.owner = null;
      }
    };
    var CanvasController = class {
      _canvas;
      _visible;
      constructor(canvas) {
        this._canvas = canvas;
        let visibility = this._canvas.getVisibility();
        this.visible = visibility != MWGameUI__default["default"].ESlateVisibility.Collapsed && visibility != MWGameUI__default["default"].ESlateVisibility.Hidden;
      }
      static creat(canvas) {
        let canvasController = new this(canvas);
        canvasController.buildSelf();
        return canvasController;
      }
      buildSelf() {
      }
      getChild(ChildType, path) {
        let child = this._canvas.findChildByPath(path);
        if (child == null) {
          oTraceError("CanvasController: The child was not found!  path=" + path);
          return null;
        }
        let widget = ChildType.Get(child);
        if (ChildType.name == MWGameUI__default["default"].MWUIButton.name) {
          widget.setFocusable(false);
          widget.setTouchMethod(MWGameUI__default["default"].EButtonTouchMethod.PreciseTap);
        }
        return widget;
      }
      get canvas() {
        return this._canvas;
      }
      set visible(value) {
        this._visible = value;
        if (value) {
          this._canvas.setVisibility(MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible);
        } else {
          this._canvas.setVisibility(MWGameUI__default["default"].ESlateVisibility.Collapsed);
        }
      }
      get visible() {
        return this._visible;
      }
    };
    var EventListenerBatch = class {
      _active;
      addMap = /* @__PURE__ */ new Map();
      listenerMap = /* @__PURE__ */ new Map();
      add(eventName, callback) {
        this.addMap.set(eventName, callback);
      }
      remove(eventName) {
        if (this.addMap.has(eventName)) {
          this.addMap.delete(eventName);
        }
        if (this.listenerMap.has(eventName)) {
          this.listenerMap.delete(eventName);
        }
      }
      clear() {
        this.active = false;
        this.addMap.clear();
      }
      set active(value) {
        if (this._active == value)
          return;
        this._active = value;
        if (value) {
          this.addMap.forEach((callback, eventName) => {
            let listener = Events__default["default"].addLocalListener(eventName, callback);
            this.listenerMap.set(eventName, listener);
          });
        } else {
          this.listenerMap.forEach((listener) => {
            listener.disconnect();
          });
          this.listenerMap.clear();
        }
      }
      get active() {
        return this._active;
      }
    };
    var PanelBase = class extends MWGameUI__default["default"].MWUIBehaviour {
      uiPrefab = null;
      _visible = true;
      _eventListener;
      isEnabel = false;
      static creat(prefabPath) {
        let uiPrefab = MWGameUI__default["default"].createUIPrefabByName(prefabPath);
        if (uiPrefab != null) {
          let panel = MWGameUI__default["default"].findUIWidgetScript(uiPrefab);
          if (panel != null && panel instanceof PanelBase) {
            return panel;
          }
          oTraceError(`    Load Panel Script Fail! path=${prefabPath}`);
        } else {
          oTraceError(`    Load Panel Load Fail! path=${prefabPath}`);
        }
        return null;
      }
      onInitialized() {
        this.uiPrefab = MWGameUI__default["default"].MWUIPanelWidget.get(this.uiObject);
        this.onAwake();
        this.onStart();
      }
      preConstruct() {
      }
      construct() {
        if (this.canvas != null) {
          this.canvas.setVisibility(MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible);
        }
        TimeUtil.delayExecute(() => {
          this.onLayout();
        });
      }
      findChildByPath(ObjClass, path) {
        let child = this.uiPrefab.findChildByPath(path);
        if (child == null) {
          oTraceError("PanelBase: Child not found in panel!  path=" + path);
          return null;
        }
        let widget = ObjClass.Get(child);
        if (ObjClass.name == MWGameUI__default["default"].MWUIButton.name) {
          let btn = widget;
          btn.setFocusable(false);
          btn.setTouchMethod(MWGameUI__default["default"].EButtonTouchMethod.PreciseTap);
          if (btn.getVisibility() == MWGameUI__default["default"].ESlateVisibility.HitTestInvisible || btn.getVisibility() == MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible) {
            btn.setVisibility(MWGameUI__default["default"].ESlateVisibility.Visible);
          }
        }
        return widget;
      }
      get canvas() {
        return this.uiObjectAS().getRootContent();
      }
      get uiObject() {
        return this.UIObject;
      }
      set visible(value) {
        this._visible = value;
        this.uiPrefab.setVisibility(value ? MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible : MWGameUI__default["default"].ESlateVisibility.Collapsed);
      }
      get visible() {
        return this._visible;
      }
      show(...params) {
        if (!this.isShow) {
          UI12.instance["addChild"](this, this.getLayer());
          this.onShow(...params);
        }
        return this;
      }
      hide() {
        if (this.isShow) {
          UI12.instance["removeChild"](this);
          this.onHide();
        }
      }
      get isShow() {
        return UI12.instance["panelIsShow"](this);
      }
      get name() {
        return this.constructor.name;
      }
      get localEventListener() {
        if (this._eventListener == null)
          this._eventListener = new EventListenerBatch();
        return this._eventListener;
      }
      getLayer() {
        return exports.UILayer.Middle;
      }
      destroy() {
        this.localEventListener.clear();
        TimeUtil.onEnterFrame.remove(this.onUpdate, this);
        this.uiObject.destroyObject();
      }
      enable() {
        if (this.isEnabel)
          return;
        this.isEnabel = true;
        this.localEventListener.active = true;
        this.onEnable();
        TimeUtil.onEnterFrame.add(this.onUpdate, this);
      }
      disable() {
        if (!this.isEnabel)
          return;
        this.isEnabel = false;
        this.onDisable();
        TimeUtil.onEnterFrame.remove(this.onUpdate, this);
        this.localEventListener.active = false;
      }
      onAwake() {
      }
      onStart() {
      }
      onLayout() {
      }
      onEnable() {
      }
      onDisable() {
      }
      onShow(...params) {
      }
      onHide() {
      }
      onDestroy() {
      }
      onUpdate(dt) {
      }
    };
    var SuperPanelBase = class {
      _view;
      ViewClass;
      constructor(ViewClass) {
        this.ViewClass = ViewClass;
      }
      get view() {
        return this._view;
      }
      static creat() {
        let panel = new this(null);
        if (panel.ViewClass == null) {
          oTraceError(`Creat ${this.name} Error! ViewClass is null~~~~~~~~~~~~~~~~~~~~~~~~`);
          return null;
        }
        panel._view = panel.ViewClass["creat"]();
        if (panel._view.uiObject != null)
          ;
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
      get canvas() {
        if (this.view == null)
          return null;
        return this.view.canvas;
      }
      get uiObject() {
        if (this.view == null)
          return null;
        return this.view.uiObject;
      }
      set visible(value) {
        this.view.visible = value;
      }
      get visible() {
        if (this.view == null)
          return false;
        return this.view.visible;
      }
      show(...params) {
        if (!this.isShow) {
          UI12.instance["addChild"](this, this.getLayer());
        }
        this.onShow(...params);
        return this;
      }
      hide() {
        if (this.isShow) {
          UI12.instance["removeChild"](this);
          this.onHide();
        }
      }
      get isShow() {
        return UI12.instance["panelIsShow"](this);
      }
      get name() {
        return this.constructor.name;
      }
      getLayer() {
        return exports.UILayer.Middle;
      }
      destroy() {
        this.onDestroy();
        UI12.instance["removeChild"](this, true);
        this._view.destroy();
        this._view = null;
      }
      get localEventListener() {
        if (this.view == null)
          return null;
        return this.view.localEventListener;
      }
      enable() {
        this.localEventListener.active = true;
        this.onEnable();
        TimeUtil.onEnterFrame.add(this.onUpdate, this);
      }
      disable() {
        this.onDisable();
        TimeUtil.onEnterFrame.remove(this.onUpdate, this);
        this.localEventListener.active = false;
      }
      _size;
      get size() {
        return this._size;
      }
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
        this.uiObject.setVisibility(MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible);
        if (this._size != null) {
          this.uiObject.getSlot().setSize(this._size);
        }
      }
      removeFromParent() {
        this.uiObject.setVisibility(MWGameUI__default["default"].ESlateVisibility.Collapsed);
      }
      onStart() {
      }
      onLayout() {
      }
      onEnable() {
      }
      onDisable() {
      }
      onShow(...params) {
      }
      onHide() {
      }
      onDestroy() {
      }
      onUpdate(dt) {
      }
    };
    var TabGroup = class {
      tabArr;
      selectCallBack;
      selectChecker;
      tabStyleHandle;
      _currentIndex = -1;
      constructor(tabArr) {
        this.tabArr = tabArr;
      }
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
      setSelectChecker(selectChecker, thisArg) {
        this.selectChecker = selectChecker.bind(thisArg);
      }
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
      get currentIndex() {
        return this._currentIndex;
      }
      refreshTabs() {
        for (let i = 0; i < this.tabArr.length; i++) {
          this.tabStyleHandle(this.tabArr[i], i == this.currentIndex);
        }
      }
    };
    var ViewBase2 = class {
      prefab;
      _visible = true;
      _eventListener;
      defaultPrefabPath;
      constructor(prefabPath) {
        this.defaultPrefabPath = prefabPath;
      }
      buildSelf() {
      }
      static creat(prefabPath) {
        let panel = new this(null);
        let path = prefabPath != null ? prefabPath : panel.defaultPrefabPath;
        panel.prefab = MWGameUI__default["default"].createUIPrefabByName(path);
        if (panel.prefab != null) {
          panel.prefab.getRootContent().setVisibility(MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible);
        } else {
          oTraceError(`ViewBase:Load View Load Fail! path=${path}`);
        }
        panel.buildSelf();
        panel.onStart();
        TimeUtil.delayExecute(() => {
          panel.onLayout();
        });
        return panel;
      }
      findChildByPath(ObjClass, path) {
        let child = this.prefab.findChildByPath(path);
        if (child == null) {
          oTraceError(`${this.constructor.name}: Child not found in panel!  path = ${path}`);
          return null;
        }
        return ViewBase2.widgetToUIElement(ObjClass, child);
      }
      findChildrenByPath(ObjClass, path, startIndex = 1, endIndex = Number.MAX_VALUE) {
        let arr = [];
        for (let i = startIndex; i < endIndex; i++) {
          let childPath = StringUtil.format(path, i);
          let child = this.prefab.findChildByPath(childPath);
          if (child == null)
            break;
          let obj = ViewBase2.widgetToUIElement(ObjClass, child);
          if (obj == null)
            break;
          arr.push(obj);
        }
        return arr;
      }
      static getCanvasChildren(canvas, ObjClass) {
        let arr = [];
        if (canvas == null)
          return arr;
        let childNum = canvas.getChildrenCount();
        for (let i = 0; i < childNum; i++) {
          let child = canvas.getChildAt(i);
          let obj = ViewBase2.widgetToUIElement(ObjClass, child);
          if (obj != null) {
            arr.push(obj);
          }
        }
        return arr;
      }
      static widgetToUIElement(EleClass, widget) {
        let element = EleClass.Get(widget);
        if (element == null || !(widget instanceof EleClass))
          return null;
        if (EleClass.name == MWGameUI__default["default"].MWUIButton.name) {
          let btn = element;
          btn.setFocusable(false);
          btn.setTouchMethod(MWGameUI__default["default"].EButtonTouchMethod.PreciseTap);
          if (btn.getVisibility() == MWGameUI__default["default"].ESlateVisibility.HitTestInvisible || btn.getVisibility() == MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible) {
            btn.setVisibility(MWGameUI__default["default"].ESlateVisibility.Visible);
          }
        }
        return element;
      }
      findCanvasByPath(ControllerClass, path) {
        let canvas = this.findChildByPath(MWGameUI__default["default"].MWUICanvas, path);
        if (canvas == null)
          return null;
        return new ControllerClass(canvas);
      }
      get canvas() {
        if (this.uiObject == null)
          return null;
        return this.uiObject.getRootContent();
      }
      get uiObject() {
        return this.prefab;
      }
      set visible(value) {
        this._visible = value;
        if (value) {
          this.uiObject.setVisibility(MWGameUI__default["default"].ESlateVisibility.SelfHitTestInvisible);
        } else {
          this.uiObject.setVisibility(MWGameUI__default["default"].ESlateVisibility.Collapsed);
        }
      }
      get visible() {
        return this._visible;
      }
      show(...params) {
        if (!this.isShow) {
          UI12.instance["addChild"](this, this.getLayer());
        }
        this.onShow(...params);
        return this;
      }
      hide() {
        if (this.isShow) {
          UI12.instance["removeChild"](this);
          this.onHide();
        }
      }
      get isShow() {
        return UI12.instance["panelIsShow"](this);
      }
      get name() {
        return this.constructor.name;
      }
      getLayer() {
        return exports.UILayer.Middle;
      }
      destroy() {
        this.onDestroy();
        UI12.instance["removeChild"](this, true);
        this.uiObject.destroyObject();
        this.localEventListener.clear();
      }
      get localEventListener() {
        if (this._eventListener == null)
          this._eventListener = new EventListenerBatch();
        return this._eventListener;
      }
      enable() {
        this.localEventListener.active = true;
        this.onEnable();
        TimeUtil.onEnterFrame.add(this.onUpdate, this);
      }
      disable() {
        this.onDisable();
        TimeUtil.onEnterFrame.remove(this.onUpdate, this);
        this.localEventListener.active = false;
      }
      onStart() {
      }
      onLayout() {
      }
      onEnable() {
      }
      onDisable() {
      }
      onShow(...params) {
      }
      onHide() {
      }
      onDestroy() {
      }
      onUpdate(dt) {
      }
    };
    var AnalyticsUtil_1;
    var _a7;
    exports.AnalyticsUtil = AnalyticsUtil_1 = (_a7 = class {
      static init() {
        if (this.msgMap != null)
          return;
        this.msgMap = /* @__PURE__ */ new Map();
        if (GamePlay__default["default"].isClient()) {
          Events__default["default"].addServerListener(AnalyticsUtil_1.NET_MSG_SEND_MGS, (eventName, eventDesc, jsonData) => {
            MWMGS__default["default"].MWMGS_API.getInstance().reportLogInfo(eventName, eventDesc, jsonData);
          });
        }
      }
      static setCommonData(comData) {
        AnalyticsUtil_1.comData = comData;
      }
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
      send(player) {
        let eventName = this.constructor.name.toLowerCase();
        if (eventName.endsWith("$1")) {
          eventName = eventName.substring(0, eventName.length - 2);
        }
        let eventDesc = this.desc;
        let jsonData = JSON.stringify(this.data).toLowerCase();
        if (GamePlay__default["default"].isClient()) {
          MWMGS__default["default"].MWMGS_API.getInstance().reportLogInfo(eventName, eventDesc, jsonData);
        } else {
          if (player == null) {
            Events__default["default"].dispatchToAllRoomClient(AnalyticsUtil_1.NET_MSG_SEND_MGS, eventName, eventDesc, jsonData);
          } else {
            Events__default["default"].dispatchToClient(player, AnalyticsUtil_1.NET_MSG_SEND_MGS, eventName, eventDesc, jsonData);
          }
        }
      }
    }, __publicField(_a7, "NET_MSG_SEND_MGS", "NET_MSG_SEND_MGS"), __publicField(_a7, "comData"), __publicField(_a7, "msgMap"), _a7);
    exports.AnalyticsUtil = AnalyticsUtil_1 = __decorate([
      AutoInit
    ], exports.AnalyticsUtil);
    var ts_splash_loading_start = class extends exports.AnalyticsUtil {
      desc = "ts\u6E38\u620F\u52A0\u8F7D\u5F00\u59CB";
      data;
    };
    var ts_splash_loading_end = class extends exports.AnalyticsUtil {
      desc = "ts\u6E38\u620F\u52A0\u8F7D\u5B8C\u6210";
      data;
    };
    var CameraUtil = class {
      static get character() {
        if (this._character == null)
          this._character = GamePlay__default["default"].getCurrentPlayer().character;
        return this._character;
      }
      static screenShock(maxRange = 60, decay = 0.5, speed = 3e3) {
        if (!TimeUtil.onEnterFrame.includes(this.screenShockUpdate, this)) {
          TimeUtil.onEnterFrame.add(this.screenShockUpdate, this);
        }
        this.lastOffSize = 0;
        this.maxRange = maxRange;
        this.decay = decay;
        this.speed = speed;
        this.forward = GamePlay__default["default"].getShootDir(GamePlay__default["default"].getCurrentPlayer().character, GamePlay__default["default"].getCurrentPlayer().character.location, 100).getNormalized();
      }
      static screenShockFinish() {
        TimeUtil.onEnterFrame.remove(this.screenShockUpdate, this);
        this.character.cameraSetting.SetCameraOffset(Type__default["default"].Vector.zero);
      }
      static screenShockUpdate(dt) {
        let offset = this.character.cameraSetting.GetCameraOffset();
        offset = offset.addition(this.forward.multiply(this.speed * dt));
        let currentZise = offset.size;
        if (currentZise > this.lastOffSize) {
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
      static setFollowTarget(target) {
        GamePlay__default["default"].CameraManager.setCameraTarget(target);
      }
    };
    __publicField(CameraUtil, "_character");
    __publicField(CameraUtil, "forward");
    __publicField(CameraUtil, "speed", 800);
    __publicField(CameraUtil, "maxRange", 20);
    __publicField(CameraUtil, "lastOffSize", -1);
    __publicField(CameraUtil, "decay", 0.5);
    exports.ADSType = void 0;
    (function(ADSType) {
      ADSType["Reward"] = "reward";
      ADSType["Interstitial"] = "interstitial";
    })(exports.ADSType || (exports.ADSType = {}));
    var IAAActionType;
    (function(IAAActionType2) {
      IAAActionType2["Reward_isReady"] = "ts.ad.rewarded.isReady";
      IAAActionType2["Reward_Load"] = "ts.ad.rewarded.load";
      IAAActionType2["Reward_Show"] = "ts.ad.rewarded.show";
      IAAActionType2["Interstitial_IsReady"] = "ts.ad.interstitial.isReady";
      IAAActionType2["Interstitial_Load"] = "ts.ad.interstitial.load";
      IAAActionType2["Interstitial_Show"] = "ts.ad.interstitial.show";
    })(IAAActionType || (IAAActionType = {}));
    var IAACallBackName;
    (function(IAACallBackName2) {
      IAACallBackName2["Reward_Load"] = "platform.ad.rewarded.load";
      IAACallBackName2["Reward_IsReady"] = "platform.ad.rewarded.isReady";
      IAACallBackName2["Reward_Show"] = "platform.ad.rewarded.show";
      IAACallBackName2["Reward_Complete"] = "platform.ad.rewarded.showcomplete";
      IAACallBackName2["Interstitial_Load"] = "platform.ad.interstitial.load";
      IAACallBackName2["Intersititial_IsReady"] = "platform.ad.interstitial.isReady";
      IAACallBackName2["Intersititial_Show"] = "platform.ad.interstitial.show";
    })(IAACallBackName || (IAACallBackName = {}));
    var _IAAServiceSDK = class {
      static get instance() {
        if (!this._instance) {
          this._instance = new _IAAServiceSDK();
          this._instance.register();
        }
        return _IAAServiceSDK._instance;
      }
      needLog = true;
      map = /* @__PURE__ */ new Map();
      register() {
        this.map.set(IAAActionType.Reward_isReady, new IAACallBack(IAAActionType.Reward_isReady, IAACallBackName.Reward_IsReady));
        this.map.set(IAAActionType.Reward_Load, new IAACallBack(IAAActionType.Reward_Load, IAACallBackName.Reward_Load));
        this.map.set(IAAActionType.Reward_Show, new IAACallBack(IAAActionType.Reward_Show, IAACallBackName.Reward_Show, IAACallBackName.Reward_Complete));
        this.map.set(IAAActionType.Interstitial_IsReady, new IAACallBack(IAAActionType.Interstitial_IsReady, IAACallBackName.Intersititial_IsReady));
        this.map.set(IAAActionType.Interstitial_Load, new IAACallBack(IAAActionType.Interstitial_Load, IAACallBackName.Interstitial_Load));
        this.map.set(IAAActionType.Interstitial_Show, new IAACallBack(IAAActionType.Interstitial_Show, IAACallBackName.Intersititial_Show));
      }
      send(_actionName, _func) {
        let iaaAction = this.map.get(_actionName);
        if (iaaAction) {
          iaaAction.bindCallback(_func);
          iaaAction.send();
        } else {
          console.log();
        }
      }
      callBack;
      show(_adsType, _callBack) {
        this.callBack = _callBack;
        if (_adsType == exports.ADSType.Reward) {
          this.send(IAAActionType.Reward_isReady, this.onRewardReady);
        } else if (_adsType == exports.ADSType.Interstitial) {
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
          } else {
            this.send(IAAActionType.Reward_Load, this.onRewardLoad);
          }
        } else {
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
          } else {
            console.error("iaa:onRewardLoad  loadresult:" + json.data.loadResult);
            if (this.callBack) {
              this.callBack(false);
            }
          }
        } else {
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
          } else {
            this.send(IAAActionType.Interstitial_Load, this.onInterstitialLoad);
          }
        } else {
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
          } else {
            if (this.callBack) {
              this.callBack(false);
            }
          }
        } else {
          console.error("iaa:onInterstitialLoad " + _message);
          if (this.callBack) {
            this.callBack(false);
          }
        }
      };
    };
    var IAAServiceSDK = _IAAServiceSDK;
    __publicField(IAAServiceSDK, "_instance");
    var IAACallBack = class {
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
        if (this.callBackName != null && this.callBackName != void 0)
          ;
        if (this.callBackName1 != null && this.callBackName1 != void 0)
          ;
      }
      callBack;
      bindCallback(_callBack) {
        this.callBack = _callBack;
      }
      onCallBack = (_message) => {
        let json = JSON.parse(_message);
        if (json && json.data) {
          if (this.callBackName == IAACallBackName.Intersititial_Show || this.callBackName == IAACallBackName.Reward_Show) {
            if (!json.data.loadResult) {
              if (this.callBack)
                this.callBack(false);
            }
          } else {
            if (this.callBack)
              this.callBack(_message);
          }
        } else {
          if (this.callBack)
            this.callBack(false);
        }
      };
      onCallBack1 = (_message) => {
        if (this.callBack) {
          this.callBack(true);
        } else {
          console.error("iaacallback:not register onCallBack1 function");
        }
      };
      buildData() {
        return { "action": this.actionName, "data": { "action": this.callBackName, "action1": this.callBackName1 } };
      }
      send() {
      }
    };
    var MathUtil = class {
      static distance(v1, v2) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
      }
      static distanceSquare(v1, v2) {
        return Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2);
      }
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
      static vectorLerp(from, to, alpha) {
        return from.addition(to.subtraction(from).multiply(alpha));
      }
      static getRandom(min, max) {
        let range = max - min;
        let rand = Math.random();
        return min + Math.floor(rand * range);
      }
      static getEulerAngles(from, to) {
        let angles = new Type__default["default"].Vector((to.x - from.x) % 360, (to.y - from.y) % 360, (to.z - from.z) % 360);
        if (Math.abs(angles.x) > 180)
          angles.x += -Math.sign(angles.x) * 360;
        if (Math.abs(angles.y) > 180)
          angles.y += -Math.sign(angles.y) * 360;
        if (Math.abs(angles.z) > 180)
          angles.z += -Math.sign(angles.z) * 360;
        return angles;
      }
      static rotationToAngles(rotation) {
        return new Type__default["default"].Vector(rotation.x, rotation.y, rotation.z);
      }
      static getLocalEulerAngles(go) {
        return this.rotationToAngles(go.getRelativeRotation());
      }
      static dot(a, b) {
        return MathLibrary__default["default"].dotVectorVector(a, b);
      }
      static cross(a, b) {
        return new Type__default["default"].Vector(a.y * b.z - b.y * a.z, a.z * b.x - a.x * b.z, a.x * b.y - b.x * a.y);
      }
      static getSignedAngle(from, to, up) {
        let angle = Type__default["default"].Vector.angle(from, to);
        let sign = Math.sign(this.dot(up, this.cross(from, to)));
        let signed_angle = angle * sign;
        return signed_angle <= 0 ? 360 + signed_angle : signed_angle;
      }
    };
    var GoPool_1;
    var SourceType;
    (function(SourceType2) {
      SourceType2[SourceType2["Error"] = 0] = "Error";
      SourceType2[SourceType2["Asset"] = 1] = "Asset";
      SourceType2[SourceType2["GameObject"] = 2] = "GameObject";
      SourceType2[SourceType2["Prefab"] = 3] = "Prefab";
    })(SourceType || (SourceType = {}));
    var _a8;
    exports.GoPool = GoPool_1 = (_a8 = class {
      constructor() {
      }
      destroy() {
        GoPool_1.instance = null;
      }
      POOL_RES_GUID = "poolResGuid";
      sourceTypeMap = /* @__PURE__ */ new Map();
      sceneSource = /* @__PURE__ */ new Map();
      subPoolMap = /* @__PURE__ */ new Map();
      spawn(guid) {
        if (this.subPoolMap.has(guid) && this.subPoolMap.get(guid).length > 0) {
          let obj2 = this.subPoolMap.get(guid).pop();
          obj2.setVisibility(Type__default["default"].PropertyStatus.On);
          return obj2;
        }
        if (!this.sourceTypeMap.has(guid)) {
          this.sourceTypeMap.set(guid, this.getSourceType(guid));
        }
        let obj = null;
        switch (this.sourceTypeMap.get(guid)) {
          case SourceType.Asset:
            obj = MWCore__default["default"].GameObject.spawnGameObject(guid);
            break;
          case SourceType.GameObject:
            obj = this.sceneSource.get(guid).clone();
            break;
          case SourceType.Prefab:
            obj = MWCore__default["default"].GameObject.spawnGameObject(guid);
            break;
        }
        if (obj == null) {
          this.sourceTypeMap.set(guid, SourceType.Error);
        } else {
          obj.SetVisibility(Type__default["default"].PropertyStatus.On);
          obj.location = Type__default["default"].Vector.zero;
          obj[this.POOL_RES_GUID] = guid;
        }
        return obj;
      }
      getSourceType(guid) {
        if (guid.length > 18) {
          let source = MWCore__default["default"].GameObject.find(guid);
          if (source != null) {
            source.detachFromGameObject();
            source.setVisibility(Type__default["default"].PropertyStatus.Off);
            source.staticStatus = false;
            source.location = Type__default["default"].Vector.right.multiply(9999999);
            this.sceneSource.set(guid, source);
            return SourceType.GameObject;
          } else {
            return SourceType.Prefab;
          }
        } else {
          return SourceType.Asset;
        }
      }
      unSpawn(obj) {
        let guid = obj[this.POOL_RES_GUID];
        if (guid == null)
          return;
        if (!this.subPoolMap.has(guid))
          this.subPoolMap.set(guid, []);
        if (this.subPoolMap.get(guid).includes(obj))
          return;
        this.subPoolMap.get(guid).push(obj);
        obj.location = Type__default["default"].Vector.right.multiply(9999999);
        obj.detachFromGameObject();
        obj.setVisibility(Type__default["default"].PropertyStatus.Off);
      }
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
    }, __publicField(_a8, "instance"), _a8);
    exports.GoPool = GoPool_1 = __decorate([
      Singleton()
    ], exports.GoPool);
    var ObjPool = class {
      creatFunction;
      resetFunction;
      destroyFunction;
      freeObjs;
      constructor(creatObj, onReset, onDestroy, initNum = 2) {
        this.creatFunction = creatObj;
        this.resetFunction = onReset;
        this.destroyFunction = onDestroy;
        this.freeObjs = new Array(initNum);
        for (let i = 0; i < initNum; i++) {
          this.freeObjs[i] = this.creatFunction();
        }
      }
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
      unSpawn(obj) {
        if (obj == null)
          return;
        this.freeObjs.push(obj);
      }
      get size() {
        return this.freeObjs.length;
      }
      clear() {
        this.freeObjs.forEach((obj) => {
          this.destroyFunction(obj);
        });
        this.freeObjs.length = 0;
      }
      getFreeObjs() {
        return this.freeObjs;
      }
    };
    var _Sequence = class {
      static nextId() {
        return _Sequence._nextId++;
      }
    };
    var Sequence = _Sequence;
    __publicField(Sequence, "_nextId", 0);
    exports.now = void 0;
    if (typeof self === "undefined" && typeof process !== "undefined" && process.hrtime) {
      exports.now = function() {
        const time = process.hrtime();
        return time[0] * 1e3 + time[1] / 1e6;
      };
    } else if (typeof self !== "undefined" && self.performance !== void 0 && self.performance.now !== void 0) {
      exports.now = self.performance.now.bind(self.performance);
    } else if (Date.now !== void 0) {
      exports.now = Date.now;
    } else {
      exports.now = function() {
        return new Date().getTime();
      };
    }
    var Interpolation = {
      Linear: function(v, k) {
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
      Bezier: function(v, k) {
        let b = 0;
        const n = v.length - 1;
        const pw = Math.pow;
        const bn = Interpolation.Utils.Bernstein;
        for (let i = 0; i <= n; i++) {
          b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }
        return b;
      },
      CatmullRom: function(v, k) {
        const m = v.length - 1;
        let f = m * k;
        let i = Math.floor(f);
        const fn = Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
          if (k < 0) {
            i = Math.floor(f = m * (1 + k));
          }
          return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        } else {
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
        Linear: function(p0, p1, t) {
          return (p1 - p0) * t + p0;
        },
        Bernstein: function(n, i) {
          const fc = Interpolation.Utils.Factorial;
          return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: function() {
          const a = [1];
          return function(n) {
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
        }(),
        CatmullRom: function(p0, p1, p2, p3, t) {
          const v0 = (p2 - p0) * 0.5;
          const v1 = (p3 - p1) * 0.5;
          const t2 = t * t;
          const t3 = t * t2;
          return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        }
      }
    };
    var Group = class {
      _tweens = {};
      _tweensAddedDuringUpdate = {};
      getAll() {
        return Object.keys(this._tweens).map((tweenId) => {
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
    };
    var mainGroup = new Group();
    var Easing = {
      Linear: {
        None: function(amount) {
          return amount;
        }
      },
      Quadratic: {
        In: function(amount) {
          return amount * amount;
        },
        Out: function(amount) {
          return amount * (2 - amount);
        },
        InOut: function(amount) {
          if ((amount *= 2) < 1) {
            return 0.5 * amount * amount;
          }
          return -0.5 * (--amount * (amount - 2) - 1);
        }
      },
      Cubic: {
        In: function(amount) {
          return amount * amount * amount;
        },
        Out: function(amount) {
          return --amount * amount * amount + 1;
        },
        InOut: function(amount) {
          if ((amount *= 2) < 1) {
            return 0.5 * amount * amount * amount;
          }
          return 0.5 * ((amount -= 2) * amount * amount + 2);
        }
      },
      Quartic: {
        In: function(amount) {
          return amount * amount * amount * amount;
        },
        Out: function(amount) {
          return 1 - --amount * amount * amount * amount;
        },
        InOut: function(amount) {
          if ((amount *= 2) < 1) {
            return 0.5 * amount * amount * amount * amount;
          }
          return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
        }
      },
      Quintic: {
        In: function(amount) {
          return amount * amount * amount * amount * amount;
        },
        Out: function(amount) {
          return --amount * amount * amount * amount * amount + 1;
        },
        InOut: function(amount) {
          if ((amount *= 2) < 1) {
            return 0.5 * amount * amount * amount * amount * amount;
          }
          return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
        }
      },
      Sinusoidal: {
        In: function(amount) {
          return 1 - Math.sin((1 - amount) * Math.PI / 2);
        },
        Out: function(amount) {
          return Math.sin(amount * Math.PI / 2);
        },
        InOut: function(amount) {
          return 0.5 * (1 - Math.sin(Math.PI * (0.5 - amount)));
        }
      },
      Exponential: {
        In: function(amount) {
          return amount === 0 ? 0 : Math.pow(1024, amount - 1);
        },
        Out: function(amount) {
          return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
        },
        InOut: function(amount) {
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
        }
      },
      Circular: {
        In: function(amount) {
          return 1 - Math.sqrt(1 - amount * amount);
        },
        Out: function(amount) {
          return Math.sqrt(1 - --amount * amount);
        },
        InOut: function(amount) {
          if ((amount *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
          }
          return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
        }
      },
      Elastic: {
        In: function(amount) {
          if (amount === 0) {
            return 0;
          }
          if (amount === 1) {
            return 1;
          }
          return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        },
        Out: function(amount) {
          if (amount === 0) {
            return 0;
          }
          if (amount === 1) {
            return 1;
          }
          return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function(amount) {
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
        }
      },
      Back: {
        In: function(amount) {
          const s = 1.70158;
          return amount === 1 ? 1 : amount * amount * ((s + 1) * amount - s);
        },
        Out: function(amount) {
          const s = 1.70158;
          return amount === 0 ? 0 : --amount * amount * ((s + 1) * amount + s) + 1;
        },
        InOut: function(amount) {
          const s = 1.70158 * 1.525;
          if ((amount *= 2) < 1) {
            return 0.5 * (amount * amount * ((s + 1) * amount - s));
          }
          return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
        }
      },
      Bounce: {
        In: function(amount) {
          return 1 - Easing.Bounce.Out(1 - amount);
        },
        Out: function(amount) {
          if (amount < 1 / 2.75) {
            return 7.5625 * amount * amount;
          } else if (amount < 2 / 2.75) {
            return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
          } else if (amount < 2.5 / 2.75) {
            return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
          } else {
            return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
          }
        },
        InOut: function(amount) {
          if (amount < 0.5) {
            return Easing.Bounce.In(amount * 2) * 0.5;
          }
          return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
        }
      },
      generatePow: function(power = 4) {
        power = power < Number.EPSILON ? Number.EPSILON : power;
        power = power > 1e4 ? 1e4 : power;
        return {
          In: function(amount) {
            return amount ** power;
          },
          Out: function(amount) {
            return 1 - (1 - amount) ** power;
          },
          InOut: function(amount) {
            if (amount < 0.5) {
              return (amount * 2) ** power / 2;
            }
            return (1 - (2 - amount * 2) ** power) / 2 + 0.5;
          }
        };
      }
    };
    var Tween = class {
      _object;
      _group;
      _isPaused = false;
      _pauseStart = 0;
      _valuesStart = {};
      _valuesEnd = {};
      _valuesStartRepeat = {};
      _duration = 1e3;
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
        this._valuesEnd = Object.create(properties);
        if (duration !== void 0) {
          this._duration = duration;
        }
        return this;
      }
      duration(d = 1e3) {
        this._duration = d;
        return this;
      }
      start(time = exports.now()) {
        if (this._isPlaying) {
          return this;
        }
        this._group && this._group.add(this);
        this._repeat = this._initialRepeat;
        if (this._reversed) {
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
          const propType = startValueIsArray ? "array" : typeof startValue;
          const isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
          if (propType === "undefined" || propType === "function") {
            continue;
          }
          if (isInterpolationList) {
            let endValues = _valuesEnd[property];
            if (endValues.length === 0) {
              continue;
            }
            endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
            _valuesEnd[property] = [startValue].concat(endValues);
          }
          if ((propType === "object" || startValueIsArray) && startValue && !isInterpolationList) {
            _valuesStart[property] = startValueIsArray ? [] : {};
            for (const prop in startValue) {
              _valuesStart[property][prop] = startValue[prop];
            }
            _valuesStartRepeat[property] = startValueIsArray ? [] : {};
            this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
          } else {
            if (typeof _valuesStart[property] === "undefined") {
              _valuesStart[property] = startValue;
            }
            if (!startValueIsArray) {
              _valuesStart[property] *= 1;
            }
            if (isInterpolationList) {
              _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
            } else {
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
        this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
        if (this._onUpdateCallback) {
          this._onUpdateCallback(this._object, elapsed);
        }
        if (elapsed === 1) {
          if (this._repeat > 0) {
            if (isFinite(this._repeat)) {
              this._repeat--;
            }
            for (property in this._valuesStartRepeat) {
              if (!this._yoyo && typeof this._valuesEnd[property] === "string") {
                this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
              }
              if (this._yoyo) {
                this._swapEndStartRepeatValues(property);
              }
              this._valuesStart[property] = this._valuesStartRepeat[property];
            }
            if (this._yoyo) {
              this._reversed = !this._reversed;
            }
            if (this._repeatDelayTime !== void 0) {
              this._startTime = time + this._repeatDelayTime;
            } else {
              this._startTime = time + this._delayTime;
            }
            if (this._onRepeatCallback) {
              this._onRepeatCallback(this._object);
            }
            return true;
          } else {
            if (this._onCompleteCallback) {
              this._onCompleteCallback(this._object);
            }
            for (let i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
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
          if (_valuesStart[property] === void 0) {
            continue;
          }
          const start = _valuesStart[property] || 0;
          let end = _valuesEnd[property];
          const startIsArray = Array.isArray(_object[property]);
          const endIsArray = Array.isArray(end);
          const isInterpolationList = !startIsArray && endIsArray;
          if (isInterpolationList) {
            _object[property] = this._interpolationFunction(end, value);
          } else if (typeof end === "object" && end) {
            this._updateProperties(_object[property], start, end, value);
          } else {
            end = this._handleRelativeValue(start, end);
            if (typeof end === "number") {
              _object[property] = start + (end - start) * value;
            }
          }
        }
      }
      _handleRelativeValue(start, end) {
        if (typeof end !== "string") {
          return end;
        }
        if (end.charAt(0) === "+" || end.charAt(0) === "-") {
          return start + parseFloat(end);
        } else {
          return parseFloat(end);
        }
      }
      _swapEndStartRepeatValues(property) {
        const tmp = this._valuesStartRepeat[property];
        const endValue = this._valuesEnd[property];
        if (typeof endValue === "string") {
          this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
        } else {
          this._valuesStartRepeat[property] = this._valuesEnd[property];
        }
        this._valuesEnd[property] = tmp;
      }
    };
    var VERSION = "18.6.4";
    var nextId = Sequence.nextId;
    var TWEEN = mainGroup;
    var getAll = TWEEN.getAll.bind(TWEEN);
    var removeAll = TWEEN.removeAll.bind(TWEEN);
    var add = TWEEN.add.bind(TWEEN);
    var remove = TWEEN.remove.bind(TWEEN);
    var update = TWEEN.update.bind(TWEEN);
    exports.AIMachine = AIMachine;
    exports.AIState = AIState;
    exports.Action = Action;
    exports.Action1 = Action1;
    exports.Action2 = Action2;
    exports.AutoInit = AutoInit;
    exports.CallBack = CallBack;
    exports.CameraUtil = CameraUtil;
    exports.CanvasController = CanvasController;
    exports.DataCenterC = DataCenterC6;
    exports.DataCenterS = DataCenterS7;
    exports.DataInfo = DataInfo4;
    exports.Easing = Easing;
    exports.Effect = Effect;
    exports.EffectData = EffectData;
    exports.EventListenerBatch = EventListenerBatch;
    exports.GoNode = GoNode;
    exports.Group = Group;
    exports.IAAServiceSDK = IAAServiceSDK;
    exports.Interpolation = Interpolation;
    exports.MathUtil = MathUtil;
    exports.ModuleC = ModuleC8;
    exports.ModuleData = ModuleData5;
    exports.ModuleManager = ModuleManager13;
    exports.ModuleS = ModuleS9;
    exports.NetObject = NetObject;
    exports.NetObjectC = NetObjectC;
    exports.NetObjectS = NetObjectS;
    exports.NoReply = NoReply;
    exports.ObjPool = ObjPool;
    exports.OdinGame = OdinGame2;
    exports.PanelBase = PanelBase;
    exports.PlayerData = PlayerData2;
    exports.Sequence = Sequence;
    exports.Singleton = Singleton;
    exports.Sound = Sound2;
    exports.StringUtil = StringUtil;
    exports.SuperPanelBase = SuperPanelBase;
    exports.TabGroup = TabGroup;
    exports.TimeUtil = TimeUtil;
    exports.Tween = Tween;
    exports.UI = UI12;
    exports.VERSION = VERSION;
    exports.ViewBase = ViewBase2;
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
  }
});

// JavaScripts/NewScript.ts
var require_NewScript = __commonJS({
  "JavaScripts/NewScript.ts"() {
  }
});

// build.ts
var build_exports3 = {};
__export(build_exports3, {
  MWModuleMap: () => MWModuleMap3
});
module.exports = __toCommonJS(build_exports3);

// JavaScripts/ChangeClothes.ts
var ChangeClothes_exports = {};
__export(ChangeClothes_exports, {
  default: () => ChangeClothes_default
});
var ClothTest = class extends MWCore.MWScript {
};
ClothTest = __decorateClass([
  MWCore.MWClass
], ClothTest);
var ChangeClothes_default = ClothTest;

// JavaScripts/CoinData.ts
var CoinData_exports = {};
__export(CoinData_exports, {
  CoinData: () => CoinData
});
var import_odin = __toESM(require_dist());
var CoinDataInfo = class extends import_odin.DataInfo {
  count;
  totalCoin;
};
var CoinData = class extends import_odin.ModuleData {
  constructor() {
    super(CoinDataInfo);
  }
  initDefaultData() {
    this.dataInfo.count = 0;
  }
  onDataInit() {
    this.dataInfo.count = 0;
  }
  initAllData() {
    this.dataInfo.count = 0;
  }
  addCount(count) {
    this.dataInfo.count += count;
    return this.dataInfo.count;
  }
  setTotalCoin(value) {
    this.dataInfo.totalCoin = value;
  }
  get count() {
    return this.dataInfo.count;
  }
  get totalCoin() {
    return this.dataInfo.totalCoin;
  }
};

// JavaScripts/CoinModuleC.ts
var CoinModuleC_exports = {};
__export(CoinModuleC_exports, {
  CoinModuleC: () => CoinModuleC
});
var import_odin2 = __toESM(require_dist());
var CoinModuleC = class extends import_odin2.ModuleC {
  coins;
  _coinRotation = new Type.Rotation(0, 0, 0);
  onAwake() {
    this.coins = [];
  }
  onStart() {
    this.coins = MWCore.GameObject.getGameObjectsByName("Coin");
    this.server.net_SetTotalCoin(this.coins.length);
    this.coins.forEach((coin) => {
      const trigger = coin.getChildByName("BoxTrigger");
      trigger.onEnter.Add((gameobject) => {
        if (GamePlay.isCharacter(gameobject)) {
          const playerID = gameobject.player.getPlayerID();
          if (playerID == this.currentPlayerId) {
            const coinIndex = this.coins.indexOf(coin);
            this.server.net_Eat(gameobject.location);
            coin.getChildByName("model").setVisibility(Type.PropertyStatus.Off);
            trigger.setCollisionEnabled(false);
          }
        }
      });
    });
  }
  execute(type, param) {
    this.coins.forEach((coin) => {
      coin.getChildByName("model").setVisibility(Type.PropertyStatus.On);
      coin.getChildByName("BoxTrigger").setCollisionEnabled(true);
    });
  }
  onUpdate(dt) {
    this._coinRotation.z += dt * 100;
    this.coins.forEach((coin) => {
      coin.rotation = this._coinRotation;
    });
  }
};

// JavaScripts/CoinModuleS.ts
var CoinModuleS_exports = {};
__export(CoinModuleS_exports, {
  CoinModuleS: () => CoinModuleS
});
var import_odin3 = __toESM(require_dist());
var CoinModuleS = class extends import_odin3.ModuleS {
  onStart() {
  }
  execute(param, data) {
    this.currentData.initAllData();
    this.currentData.saveData(true);
  }
  net_Eat(pos) {
    this.currentData.addCount(1);
    this.currentData.saveData(true);
    import_odin3.SoundManager.instance.play3DSound("14639", pos, 1, 0.5);
  }
  net_SetTotalCoin(value) {
    this.currentData.setTotalCoin(value);
  }
};

// JavaScripts/DeathCountDownUI.ts
var DeathCountDownUI_exports = {};
__export(DeathCountDownUI_exports, {
  DeathCountDownUI: () => DeathCountDownUI
});
var import_odin6 = __toESM(require_dist());

// JavaScripts/PlayerData.ts
var PlayerData_exports = {};
__export(PlayerData_exports, {
  PlayerData: () => PlayerData
});
var import_odin4 = __toESM(require_dist());
var PlayerDataInfo = class extends import_odin4.DataInfo {
  name;
  hp;
  canFly;
  flyCD;
  canInvisible;
  invisibleCD;
  deathCountDown;
  kill;
  death;
  spawnPointx;
  spawnPointy;
  spawnPointz;
};
var PlayerData = class extends import_odin4.ModuleData {
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
    this.dataInfo.kill = 0;
    this.dataInfo.death = 0;
  }
  initAllData() {
    this.dataInfo.hp = 100;
    this.dataInfo.canFly = false;
    this.dataInfo.flyCD = 0;
    this.dataInfo.canInvisible = false;
    this.dataInfo.invisibleCD = 0;
    this.dataInfo.deathCountDown = 0;
    this.dataInfo.kill = 0;
    this.dataInfo.death = 0;
  }
  setName(name) {
    this.dataInfo.name = name;
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
  addKill() {
    this.dataInfo.kill++;
  }
  addDeath() {
    this.dataInfo.death++;
  }
  setSpawnPoint(pos) {
    this.dataInfo.spawnPointx = pos.x;
    this.dataInfo.spawnPointy = pos.y;
    this.dataInfo.spawnPointz = pos.z;
  }
  get name() {
    return this.dataInfo.name;
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
  get kill() {
    return this.dataInfo.kill;
  }
  get death() {
    return this.dataInfo.death;
  }
  get spawnPoint() {
    return new Type.Vector(this.dataInfo.spawnPointx, this.dataInfo.spawnPointy, this.dataInfo.spawnPointz);
  }
};

// JavaScripts/UITemplate.ts
var UITemplate_exports = {};
__export(UITemplate_exports, {
  LanUtil: () => LanUtil,
  UI_DeadUI: () => UI_DeadUI,
  UI_GameUI: () => UI_GameUI,
  UI_HitPromptUI: () => UI_HitPromptUI,
  UI_LeaderBoardSubUI: () => UI_LeaderBoardSubUI,
  UI_LeaderBoardUI: () => UI_LeaderBoardUI,
  UI_Main: () => UI_Main,
  UI_ScoreBoardUI: () => UI_ScoreBoardUI,
  UI_StartGameUI: () => UI_StartGameUI,
  UI_UIRoot: () => UI_UIRoot
});
var import_odin5 = __toESM(require_dist());
var LanUtil;
((LanUtil2) => {
  function setUILanguage(ui) {
    if (!this.getLan) {
      return;
    }
    let key = null;
    if (ui instanceof MWGameUI.MWUIButton) {
      key = ui.getButtonString();
    } else {
      key = ui.getText();
    }
    if (key) {
      let lan = this.getLan(key);
      if (lan) {
        if (ui instanceof MWGameUI.MWUIButton) {
          ui.setButtonString(lan.Value);
        } else {
          ui.setText(lan.Value);
        }
      }
    }
  }
  LanUtil2.setUILanguage = setUILanguage;
})(LanUtil || (LanUtil = {}));
var UI_DeadUI = class extends import_odin5.ViewBase {
  mDeathCountDown;
  constructor() {
    super("DeadUI");
  }
  buildSelf() {
    this.mDeathCountDown = this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mDeathCountDown");
    LanUtil.setUILanguage(this.mDeathCountDown);
  }
};
var UI_GameUI = class extends import_odin5.ViewBase {
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
  mProgressBar;
  mScoreBoard;
  mFieldName;
  mSelfList;
  mRank1;
  mRank2;
  mRank3;
  mRank4;
  mRank5;
  mRank6;
  mShowScoreBoard;
  constructor() {
    super("GameUI");
  }
  buildSelf() {
    this.mJumpButton = this.findChildByPath(MWGameUI.MWUIButton, "Canvas/mJumpButton");
    this.mCrossHairs = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/CrossHairs/mCrossHairs");
    this.mFireJoyStick = this.findChildByPath(MWGameUI.MWUIVirtualJoystickPanel, "Canvas/mFireJoyStick");
    this.mFlyButton = this.findChildByPath(MWGameUI.MWUIButton, "Canvas/mFlyButton");
    this.mFlyCountDown = this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mFlyCountDown");
    this.mInvisibleButton = this.findChildByPath(MWGameUI.MWUIButton, "Canvas/mInvisibleButton");
    this.mInvisibleCountDown = this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mInvisibleCountDown");
    this.mCoinImage = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mCoinImage");
    this.mCoinCount = this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mCoinCount");
    this.mHealthBar = this.findChildByPath(MWGameUI.MWUIProgressbar, "Canvas/mHealthBar");
    this.mCountDown = this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mCountDown");
    this.mProgressBar = this.findChildByPath(MWGameUI.MWUIProgressbar, "Canvas/mProgressBar");
    this.mScoreBoard = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/mScoreBoard");
    this.mFieldName = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/mScoreBoard/mFieldName");
    this.mSelfList = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/mScoreBoard/mSelfList");
    this.mRank1 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/mScoreBoard/mSelfList/mRank1");
    this.mRank2 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/mScoreBoard/mSelfList/mRank2");
    this.mRank3 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/mScoreBoard/mSelfList/mRank3");
    this.mRank4 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/mScoreBoard/mSelfList/mRank4");
    this.mRank5 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/mScoreBoard/mSelfList/mRank5");
    this.mRank6 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/mScoreBoard/mSelfList/mRank6");
    this.mShowScoreBoard = this.findChildByPath(MWGameUI.MWUIButton, "Canvas/mShowScoreBoard");
    this.mJumpButton.onClicked().add(() => {
      Events.dispatchLocal("PlayButtonClick", "mJumpButton");
    });
    LanUtil.setUILanguage(this.mJumpButton);
    this.mFlyButton.onClicked().add(() => {
      Events.dispatchLocal("PlayButtonClick", "mFlyButton");
    });
    LanUtil.setUILanguage(this.mFlyButton);
    LanUtil.setUILanguage(this.mFlyCountDown);
    this.mInvisibleButton.onClicked().add(() => {
      Events.dispatchLocal("PlayButtonClick", "mInvisibleButton");
    });
    LanUtil.setUILanguage(this.mInvisibleButton);
    LanUtil.setUILanguage(this.mInvisibleCountDown);
    LanUtil.setUILanguage(this.mCoinCount);
    LanUtil.setUILanguage(this.mCountDown);
    this.mShowScoreBoard.onClicked().add(() => {
      Events.dispatchLocal("PlayButtonClick", "mShowScoreBoard");
    });
    LanUtil.setUILanguage(this.mShowScoreBoard);
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/CollectText"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mFieldName/Field1_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mFieldName/Field2_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mFieldName/Field5_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank1/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank1/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank1/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank2/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank2/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank2/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank3/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank3/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank3/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank4/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank4/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank4/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank5/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank5/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank5/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank6/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank6/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mScoreBoard/mSelfList/mRank6/Gold"));
  }
};
var UI_HitPromptUI = class extends import_odin5.ViewBase {
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
    this.mUp = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mUp");
    this.mUpRight = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mUpRight");
    this.mRight = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mRight");
    this.mLowRight = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mLowRight");
    this.mLow = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mLow");
    this.mLowLeft = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mLowLeft");
    this.mLeft = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mLeft");
    this.mUpLeft = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mUpLeft");
  }
};
var UI_LeaderBoardSubUI = class extends import_odin5.ViewBase {
  constructor() {
    super("LeaderBoardSubUI");
  }
  buildSelf() {
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MWTextBlock_1"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MWTextBlock_1_1"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MWTextBlock_1_2"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MWTextBlock_1_3"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MWTextBlock_1_4"));
  }
};
var UI_LeaderBoardUI = class extends import_odin5.ViewBase {
  mTitle_txt;
  mFieldName;
  mSelfList;
  mRank1;
  mRank2;
  mRank3;
  mRank4;
  mRank5;
  mRank6;
  mClose_btn;
  constructor() {
    super("LeaderBoardUI");
  }
  buildSelf() {
    this.mTitle_txt = this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mTitle_txt");
    this.mFieldName = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/MainView/mFieldName");
    this.mSelfList = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/MainView/mSelfList");
    this.mRank1 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/MainView/mSelfList/mRank1");
    this.mRank2 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/MainView/mSelfList/mRank2");
    this.mRank3 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/MainView/mSelfList/mRank3");
    this.mRank4 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/MainView/mSelfList/mRank4");
    this.mRank5 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/MainView/mSelfList/mRank5");
    this.mRank6 = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/MainView/mSelfList/mRank6");
    this.mClose_btn = this.findChildByPath(MWGameUI.MWUIButton, "Canvas/mClose_btn");
    LanUtil.setUILanguage(this.mTitle_txt);
    this.mClose_btn.onClicked().add(() => {
      Events.dispatchLocal("PlayButtonClick", "mClose_btn");
    });
    LanUtil.setUILanguage(this.mClose_btn);
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mFieldName/Field1_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mFieldName/Field2_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mFieldName/Field3_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mFieldName/Field4_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mFieldName/Field5_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank1/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank1/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank1/Kill"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank1/Death"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank1/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank2/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank2/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank2/Kill"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank2/Death"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank2/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank3/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank3/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank3/Kill"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank3/Death"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank3/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank4/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank4/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank4/Kill"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank4/Death"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank4/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank5/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank5/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank5/Kill"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank5/Death"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank5/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank6/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank6/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank6/Kill"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank6/Death"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MainView/mSelfList/mRank6/Gold"));
  }
};
var UI_Main = class extends import_odin5.ViewBase {
  constructor() {
    super("Main");
  }
  buildSelf() {
  }
};
var UI_ScoreBoardUI = class extends import_odin5.ViewBase {
  mFieldName;
  mSelfList;
  mRank1;
  mRank2;
  mRank3;
  mRank4;
  mRank5;
  mRank6;
  constructor() {
    super("ScoreBoardUI");
  }
  buildSelf() {
    this.mFieldName = this.findChildByPath(MWGameUI.MWUICanvas, "ScoreBoard/mFieldName");
    this.mSelfList = this.findChildByPath(MWGameUI.MWUICanvas, "ScoreBoard/mSelfList");
    this.mRank1 = this.findChildByPath(MWGameUI.MWUICanvas, "ScoreBoard/mSelfList/mRank1");
    this.mRank2 = this.findChildByPath(MWGameUI.MWUICanvas, "ScoreBoard/mSelfList/mRank2");
    this.mRank3 = this.findChildByPath(MWGameUI.MWUICanvas, "ScoreBoard/mSelfList/mRank3");
    this.mRank4 = this.findChildByPath(MWGameUI.MWUICanvas, "ScoreBoard/mSelfList/mRank4");
    this.mRank5 = this.findChildByPath(MWGameUI.MWUICanvas, "ScoreBoard/mSelfList/mRank5");
    this.mRank6 = this.findChildByPath(MWGameUI.MWUICanvas, "ScoreBoard/mSelfList/mRank6");
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mFieldName/Field1_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mFieldName/Field2_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mFieldName/Field5_txt"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank1/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank1/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank1/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank2/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank2/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank2/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank3/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank3/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank3/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank4/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank4/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank4/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank5/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank5/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank5/Gold"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank6/Rank"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank6/Name"));
    LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "ScoreBoard/mSelfList/mRank6/Gold"));
  }
};
var UI_StartGameUI = class extends import_odin5.ViewBase {
  mStartGameButton;
  constructor() {
    super("StartGameUI");
  }
  buildSelf() {
    this.mStartGameButton = this.findChildByPath(MWGameUI.MWUIButton, "MWCanvas_2147482460/mStartGameButton");
    this.mStartGameButton.onClicked().add(() => {
      Events.dispatchLocal("PlayButtonClick", "mStartGameButton");
    });
    LanUtil.setUILanguage(this.mStartGameButton);
  }
};
var UI_UIRoot = class extends import_odin5.ViewBase {
  constructor() {
    super("UIRoot");
  }
  buildSelf() {
  }
};

// JavaScripts/DeathCountDownUI.ts
var DeathCountDownUI = class extends UI_DeadUI {
  onStart() {
    import_odin6.DataCenterC.instance.getModuleData(PlayerData).onDataChange.add(() => {
      this.mDeathCountDown.setText(import_odin6.DataCenterC.instance.getModuleData(PlayerData).deathCountDown.toString());
    });
  }
  onDestroy() {
    import_odin6.DataCenterC.instance.getModuleData(PlayerData).onDataChange.clear();
  }
};

// JavaScripts/FiniteStateMachine/BaseState.ts
var BaseState_exports = {};
__export(BaseState_exports, {
  BaseState: () => BaseState
});
var BaseState = class {
  npc;
  constructor(npc) {
    this.npc = npc;
  }
};

// JavaScripts/FiniteStateMachine/DeadState.ts
var DeadState_exports = {};
__export(DeadState_exports, {
  DeadState: () => DeadState
});
var DeadState = class extends BaseState {
  enterState() {
    this.npc.ragdoll(true);
  }
  Update(dt) {
  }
};

// JavaScripts/FiniteStateMachine/PatrolState.ts
var PatrolState_exports = {};
__export(PatrolState_exports, {
  PatrolState: () => PatrolState
});
var PatrolState = class extends BaseState {
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
    this.wayPoints = MWCore.GameObject.getGameObjectsByName("WayPoint");
    this.curWayPointIndex = Math.floor(Math.random() * this.wayPoints.length);
    this.npc.enableCollision = true;
    this.npc.ragdoll(false);
  }
  Update(dt) {
    if (this.timer <= 0) {
      if (this.curWayPointIndex >= this.wayPoints.length) {
        this.curWayPointIndex = this.curWayPointIndex % this.wayPoints.length;
      }
      GamePlay.moveTo(this.npc, this.wayPoints[this.curWayPointIndex].location, 50);
    } else {
      this.timer -= dt;
    }
    if (this.posDist(this.npc.location, this.wayPoints[this.curWayPointIndex].location) < 100) {
      this.timer = 1;
      this.wayPoints = MWCore.GameObject.getGameObjectsByName("WayPoint");
      this.curWayPointIndex = (this.curWayPointIndex + 1) % this.wayPoints.length;
    }
  }
  posDist(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) + Math.pow(pos1.z - pos2.z, 2));
  }
};

// JavaScripts/GameControl.ts
var GameControl_exports = {};
__export(GameControl_exports, {
  default: () => GameControl
});
var import_odin7 = __toESM(require_dist());
var GameControl = class extends MWCore.MWScript {
  MaxGameTime = 5;
  curTime;
  timer = 0;
  isGameStart;
  onStart() {
    if (GamePlay.isServer()) {
      this.bUseUpdate = true;
      Events.addLocalListener("startGame", () => {
        if (!this.isGameStart) {
          this.curTime = this.MaxGameTime;
          this.isGameStart = true;
        }
      });
      console.log("check point");
      let spawnPoints;
      let spawnPointMap;
      setTimeout(() => {
        spawnPoints = MWCore.GameObject.getGameObjectsByName("StartPoint");
        spawnPointMap = /* @__PURE__ */ new Map();
      }, 200);
      Events.addPlayerJoinedListener((player) => {
        setTimeout(() => {
          for (let i = 0; i < spawnPoints.length; i++) {
            if (!spawnPointMap.has(spawnPoints[i])) {
              spawnPointMap.set(spawnPoints[i], player);
              import_odin7.DataCenterS.instance.getModuleData(player, PlayerData).setSpawnPoint(spawnPoints[i].location);
              player.character.setLocationAndRotation(spawnPoints[i].location, player.character.rotation);
              break;
            } else if (spawnPointMap.get(spawnPoints[i]) == null) {
              spawnPointMap.set(spawnPoints[i], player);
              import_odin7.DataCenterS.instance.getModuleData(player, PlayerData).setSpawnPoint(spawnPoints[i].location);
              player.character.setLocationAndRotation(spawnPoints[i].location, player.character.rotation);
              break;
            }
          }
        }, 500);
      });
      Events.addPlayerLeftListener((player) => {
        spawnPoints.forEach((spawnpoint) => {
          if (spawnPointMap.get(spawnpoint) == player) {
            spawnPointMap.set(spawnpoint, null);
          }
        });
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
        Events.dispatchToAllClient("curTime", this.curTime);
        if (this.curTime <= 0) {
          this.isGameStart = false;
          Events.dispatchToAllClient("stopGame");
        }
      }
    }
  }
  onDestroy() {
  }
};
__decorateClass([
  MWCore.MWProperty()
], GameControl.prototype, "MaxGameTime", 2);
GameControl = __decorateClass([
  MWCore.MWClass
], GameControl);

// JavaScripts/GameControlData.ts
var GameControlData_exports = {};
__export(GameControlData_exports, {
  GameControlData: () => GameControlData
});
var import_odin8 = __toESM(require_dist());
var GameControlDataInfo = class extends import_odin8.DataInfo {
  curTime;
  isGameStart;
};
var GameControlData = class extends import_odin8.ModuleData {
  constructor() {
    super(GameControlDataInfo);
  }
  onDataInit() {
  }
  setCurTime(value) {
    this.dataInfo.curTime = value;
  }
  setGameStart(value) {
    this.dataInfo.isGameStart = value;
  }
  get curTime() {
    return this.dataInfo.curTime;
  }
  get isGameStart() {
    return this.dataInfo.isGameStart;
  }
};

// JavaScripts/GameControlModuleC.ts
var GameControlModuleC_exports = {};
__export(GameControlModuleC_exports, {
  GameControlModuleC: () => GameControlModuleC
});
var import_odin15 = __toESM(require_dist());

// JavaScripts/GameUI.ts
var GameUI_exports = {};
__export(GameUI_exports, {
  default: () => GameUI
});
var import_odin11 = __toESM(require_dist());

// JavaScripts/PlayerModuleC.ts
var PlayerModuleC_exports = {};
__export(PlayerModuleC_exports, {
  PlayerModuleC: () => PlayerModuleC
});
var import_odin9 = __toESM(require_dist());
var PlayerModuleC = class extends import_odin9.ModuleC {
  playerData;
  isDead = false;
  deadTimer = 0;
  flyTimer = 0;
  invisibleTimer = 0;
  onStart() {
    this.playerData = import_odin9.DataCenterC.instance.getModuleData(PlayerData);
    this.server.net_SetName();
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
      import_odin9.UI.instance.getPanel(GameUI).canvas.setRenderOpacity(0);
      import_odin9.UI.instance.getPanel(GameUI).mFireJoyStick.setActiveOpacity(0);
      import_odin9.UI.instance.getPanel(GameUI).mFireJoyStick.setInActiveOpacity(0);
      import_odin9.UI.instance.showPanel(DeathCountDownUI);
    }
  }
  checkIsDead() {
    if (this.playerData.hp <= 0 && !this.isDead) {
      this.isDead = true;
      this.server.net_PlayerDead();
      import_odin9.UI.instance.getPanel(GameUI).canvas.setRenderOpacity(0);
      import_odin9.UI.instance.getPanel(GameUI).mFireJoyStick.setActiveOpacity(0);
      import_odin9.UI.instance.getPanel(GameUI).mFireJoyStick.setInActiveOpacity(0);
      if (import_odin9.DataCenterC.instance.getModuleData(GameControlData).isGameStart) {
        import_odin9.UI.instance.showPanel(DeathCountDownUI);
      }
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
          import_odin9.UI.instance.hidePanel(DeathCountDownUI);
          if (import_odin9.DataCenterC.instance.getModuleData(GameControlData).curTime > 0 && import_odin9.DataCenterC.instance.getModuleData(GameControlData).isGameStart) {
            import_odin9.UI.instance.getPanel(GameUI).canvas.setRenderOpacity(1);
            import_odin9.UI.instance.getPanel(GameUI).mFireJoyStick.setActiveOpacity(1);
            import_odin9.UI.instance.getPanel(GameUI).mFireJoyStick.setInActiveOpacity(0.2);
          }
        }
      }
    }
  }
  jump() {
    this.currentPlayer.character.jump();
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
};

// JavaScripts/WeaponModuleC.ts
var WeaponModuleC_exports = {};
__export(WeaponModuleC_exports, {
  WeaponModuleC: () => WeaponModuleC
});
var import_odin10 = __toESM(require_dist());
var WeaponModuleC = class extends import_odin10.ModuleC {
  isShoot = false;
  shootTime = 0;
  shootCD = 0.2;
  fireEffect;
  isEquipWeapon = false;
  weaponObj = null;
  weaponPos;
  weaponRot;
  onStart() {
    this.isEquipWeapon = false;
    this.currentPlayer.character.moveFacingDirection = GamePlay.MoveFacingDirection.ControllerDirection;
  }
  execute(type, param) {
    this.stopShoot();
    let gameUI = import_odin10.UI.instance.getPanel(GameUI);
    gameUI.mFireJoyStick.setVisibility(MWGameUI.ESlateVisibility.Collapsed);
    gameUI.mCrossHairs.setVisibility(MWGameUI.ESlateVisibility.Hidden);
    this.server.net_UnEquip(this.weaponObj, this.weaponPos, this.weaponRot);
    this.weaponObj = null;
    this.currentPlayer.character.animationStance = GamePlay.AnimationStanceType.Empty;
    this.currentPlayer.character.moveFacingDirection = GamePlay.MoveFacingDirection.ControllerDirection;
    this.currentPlayer.character.movementDirection = GamePlay.MovementDirection.ViewDirection;
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
      this.weaponPos = new Type.Vector(weaponObj.location.x, weaponObj.location.y, weaponObj.location.z);
      this.weaponRot = new Type.Rotation(weaponObj.rotation.x, weaponObj.rotation.y, weaponObj.rotation.z);
      this.weaponObj = weaponObj;
      this.server.net_Equiped(this.currentPlayer, weaponObj);
      player.character.animationStance = GamePlay.AnimationStanceType.RifleStand;
      player.character.moveFacingDirection = GamePlay.MoveFacingDirection.ControllerDirection;
      player.character.movementDirection = GamePlay.MovementDirection.ControllerDirection;
      let gameUI = import_odin10.UI.instance.getPanel(GameUI);
      gameUI.mFireJoyStick.setVisibility(MWGameUI.ESlateVisibility.Visible);
      gameUI.mCrossHairs.setVisibility(MWGameUI.ESlateVisibility.Visible);
    }
  }
  startShoot() {
    this.isShoot = true;
  }
  stopShoot() {
    this.isShoot = false;
    if (this.isEquipWeapon)
      this.currentPlayer.character.animationStance = GamePlay.AnimationStanceType.RifleStand;
  }
  checkCollision() {
    if (this.currentPlayer.character.animationStance != GamePlay.AnimationStanceType.RifleAimStand)
      this.currentPlayer.character.animationStance = GamePlay.AnimationStanceType.RifleAimStand;
    this.server.net_PlayShootEffect(this.fireEffect);
    let startLoc = this.fireEffect.location;
    let endLoc = startLoc.addition(this.currentPlayer.character.cameraSystem.cameraWorldTransform.getForwardVector().multiply(1e4));
    endLoc.y += this.randomRange(-200, 200);
    endLoc.z += this.randomRange(-200, 200);
    let hitResults = GamePlay.lineTrace(this.currentPlayer, startLoc, endLoc, false, false);
    if (GamePlay.isCharacter(hitResults[0].gameObject)) {
      console.log("hit character:");
      Events.dispatchToServer("playerHit", hitResults[0].gameObject.player, this.currentPlayer.character.location);
      this.server.net_HitPlayer(hitResults[0].gameObject.player);
    } else if (GamePlay.isAICharacter(hitResults[0].gameObject)) {
      console.log("hit NPC");
      this.server.net_HitNpc(hitResults[0].gameObject);
    }
    this.server.net_PlayHitEffect(hitResults[0].location);
  }
  randomRange(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
};

// JavaScripts/GameUI.ts
var GameUI = class extends UI_GameUI {
  onStart() {
    if (GamePlay.isClient()) {
      let coinData = import_odin11.DataCenterC.instance.getModuleData(CoinData);
      this.mCoinCount.setText(coinData.count.toString());
      coinData.onDataChange.add(() => {
        this.mCoinCount.setText(coinData.count.toString());
        this.mProgressBar.setCurrentValue(coinData.count / coinData.totalCoin);
      });
      this.mJumpButton.onClicked().add(() => {
        import_odin11.ModuleManager.instance.getModule(PlayerModuleC).jump();
      });
      this.mFireJoyStick.onJoyStickDown().add(() => {
        import_odin11.ModuleManager.instance.getModule(WeaponModuleC).startShoot();
      });
      this.mFireJoyStick.onJoyStickUp().add(() => {
        import_odin11.ModuleManager.instance.getModule(WeaponModuleC).stopShoot();
      });
      let playerData = import_odin11.DataCenterC.instance.getModuleData(PlayerData);
      playerData.onDataChange.add(() => {
        if (playerData.canFly) {
          this.mFlyButton.setVisibility(MWGameUI.ESlateVisibility.Visible);
          this.mFlyCountDown.setVisibility(MWGameUI.ESlateVisibility.Visible);
          if (playerData.flyCD > 0) {
            this.mFlyCountDown.setText(playerData.flyCD.toString());
          } else {
            this.mFlyCountDown.setText("\u98DE\u884C");
          }
        } else {
          this.mFlyButton.setVisibility(MWGameUI.ESlateVisibility.Hidden);
          this.mFlyCountDown.setVisibility(MWGameUI.ESlateVisibility.Hidden);
        }
      });
      this.mFlyButton.onReleased().add(() => {
        import_odin11.ModuleManager.instance.getModule(PlayerModuleC).startFly();
      });
      playerData.onDataChange.add(() => {
        if (playerData.canInvisible) {
          this.mInvisibleButton.setVisibility(MWGameUI.ESlateVisibility.Visible);
          this.mInvisibleCountDown.setVisibility(MWGameUI.ESlateVisibility.Visible);
          if (playerData.invisibleCD > 0) {
            this.mInvisibleCountDown.setText(playerData.invisibleCD.toString());
          } else {
            this.mInvisibleCountDown.setText("\u9690\u8EAB");
          }
        } else {
          this.mInvisibleButton.setVisibility(MWGameUI.ESlateVisibility.Hidden);
          this.mInvisibleCountDown.setVisibility(MWGameUI.ESlateVisibility.Hidden);
        }
      });
      this.mInvisibleButton.onReleased().add(() => {
        import_odin11.ModuleManager.instance.getModule(PlayerModuleC).startInvisible();
      });
      this.mHealthBar.setCurrentValue(playerData.hp);
      playerData.onDataChange.add(() => {
        this.mHealthBar.setCurrentValue(playerData.hp);
      });
      import_odin11.DataCenterC.instance.getModuleData(GameControlData).onDataChange.add(() => {
        this.mCountDown.setText(import_odin11.DataCenterC.instance.getModuleData(GameControlData).curTime.toString());
      });
      this.mShowScoreBoard.onClicked().add(() => {
        if (this.mScoreBoard.getVisibility() == MWGameUI.ESlateVisibility.Hidden) {
          this.mScoreBoard.setVisibility(MWGameUI.ESlateVisibility.SelfHitTestInvisible);
        } else {
          this.mScoreBoard.setVisibility(MWGameUI.ESlateVisibility.Hidden);
        }
      });
      Events.addServerListener("stopGame", () => {
        this.mScoreBoard.setVisibility(MWGameUI.ESlateVisibility.Hidden);
      });
    }
  }
  updateScoreBoard(playerInfos) {
    for (let i = 0; i < playerInfos.length; i++) {
      let subUI = this.mSelfList.getChildByName("mRank" + (i + 1).toString());
      subUI.setVisibility(MWGameUI.ESlateVisibility.SelfHitTestInvisible);
      subUI.getChildByName("Rank").setText((i + 1).toString());
      subUI.getChildByName("Name").setText(playerInfos[i].name);
      subUI.getChildByName("Gold").setText(playerInfos[i].gold.toString());
    }
    for (let i = playerInfos.length; i < 6; i++) {
      let subUI = this.mSelfList.getChildByName("mRank" + (i + 1).toString());
      subUI.setVisibility(MWGameUI.ESlateVisibility.Hidden);
    }
  }
  onDestroy() {
    if (GamePlay.isClient()) {
      import_odin11.DataCenterC.instance.getModuleData(CoinData).onDataChange.clear();
      import_odin11.DataCenterC.instance.getModuleData(PlayerData).onDataChange.clear();
      import_odin11.DataCenterC.instance.getModuleData(GameControlData).onDataChange.clear();
    }
  }
};
GameUI = __decorateClass([
  MWGameUI.MWUIMono
], GameUI);

// JavaScripts/LeaderBoardModuleC.ts
var LeaderBoardModuleC_exports = {};
__export(LeaderBoardModuleC_exports, {
  BoardModuleC: () => BoardModuleC
});
var import_odin14 = __toESM(require_dist());

// JavaScripts/LeaderBoardUI.ts
var LeaderBoardUI_exports = {};
__export(LeaderBoardUI_exports, {
  LeaderBoardInfo: () => LeaderBoardInfo,
  LeaderBoardUI: () => LeaderBoardUI
});
var import_odin13 = __toESM(require_dist());

// JavaScripts/StartGameUI.ts
var StartGameUI_exports = {};
__export(StartGameUI_exports, {
  StartGameUI: () => StartGameUI
});
var import_odin12 = __toESM(require_dist());
var StartGameUI = class extends UI_StartGameUI {
  onStart() {
    this.mStartGameButton.onClicked().add(() => {
      import_odin12.ModuleManager.instance.getModule(GameControlModuleC).StartGame();
    });
  }
};

// JavaScripts/LeaderBoardUI.ts
var LeaderBoardInfo = class {
  name;
  kill;
  death;
  gold;
};
var LeaderBoardUI = class extends UI_LeaderBoardUI {
  selfLists;
  onStart() {
    if (GamePlay.isClient()) {
      this.mClose_btn.onClicked().add(() => {
        import_odin13.UI.instance.hidePanel(LeaderBoardUI);
        import_odin13.UI.instance.showPanel(StartGameUI);
      });
    }
  }
  updateLeaderBoard(playerInfos) {
    for (let i = 0; i < playerInfos.length; i++) {
      let subUI = this.mSelfList.getChildByName("mRank" + (i + 1).toString());
      subUI.setVisibility(MWGameUI.ESlateVisibility.Visible);
      subUI.getChildByName("Rank").setText((i + 1).toString());
      subUI.getChildByName("Name").setText(playerInfos[i].name);
      subUI.getChildByName("Kill").setText(playerInfos[i].kill.toString());
      subUI.getChildByName("Death").setText(playerInfos[i].death.toString());
      subUI.getChildByName("Gold").setText(playerInfos[i].gold.toString());
    }
    for (let i = playerInfos.length; i < 6; i++) {
      let subUI = this.mSelfList.getChildByName("mRank" + (i + 1).toString());
      subUI.setVisibility(MWGameUI.ESlateVisibility.Hidden);
    }
  }
};

// JavaScripts/LeaderBoardModuleC.ts
var BoardModuleC = class extends import_odin14.ModuleC {
  onStart() {
    Events.addServerListener("curTime", () => {
      if (import_odin14.UI.instance.getPanel(GameUI).mScoreBoard.getVisibility() == MWGameUI.ESlateVisibility.SelfHitTestInvisible)
        this.updateScoreBoard();
    });
  }
  async showLeaderBoard() {
    let playerInfos = await this.server.net_GetLeaderBoardData();
    import_odin14.UI.instance.showPanel(LeaderBoardUI);
    import_odin14.UI.instance.getPanel(LeaderBoardUI).updateLeaderBoard(playerInfos);
  }
  async updateScoreBoard() {
    let playerInfos = await this.server.net_GetScoreBoardData();
    import_odin14.UI.instance.getPanel(GameUI).updateScoreBoard(playerInfos);
  }
};

// JavaScripts/GameControlModuleC.ts
var GameControlModuleC = class extends import_odin15.ModuleC {
  execute(type, param) {
  }
  onStart() {
    import_odin15.UI.instance.showPanel(StartGameUI);
    Events.addServerListener("curTime", (curTime) => {
      this.server.net_UpdateTime(curTime);
    });
    Events.addServerListener("stopGame", () => {
      this.StopGame();
    });
  }
  StartGame() {
    import_odin15.UI.instance.hidePanel(StartGameUI);
    import_odin15.UI.instance.showPanel(GameUI);
    import_odin15.UI.instance.getPanel(GameUI).canvas.setRenderOpacity(1);
    import_odin15.UI.instance.getPanel(GameUI).mFireJoyStick.setActiveOpacity(1);
    import_odin15.UI.instance.getPanel(GameUI).mFireJoyStick.setInActiveOpacity(0.2);
    this.server.net_StartGame();
    import_odin15.SoundManager.instance.playBGM("14088", 0.4);
  }
  async StopGame() {
    import_odin15.SoundManager.instance.stopBGM();
    import_odin15.SoundManager.instance.playSound("19641", 1, 0.5);
    await import_odin15.ModuleManager.instance.getModule(BoardModuleC).showLeaderBoard();
    import_odin15.UI.instance.getPanel(GameUI).canvas.setRenderOpacity(0);
    import_odin15.UI.instance.getPanel(GameUI).mFireJoyStick.setActiveOpacity(0);
    import_odin15.UI.instance.getPanel(GameUI).mFireJoyStick.setInActiveOpacity(0);
    this.InitGame();
  }
  InitGame() {
    import_odin15.ModuleManager.instance.forEachModule((module2) => {
      module2.execute();
    });
    this.server.net_InitGame();
  }
};

// JavaScripts/GameControlModuleS.ts
var GameControlModuleS_exports = {};
__export(GameControlModuleS_exports, {
  GameControlModuleS: () => GameControlModuleS
});
var import_odin16 = __toESM(require_dist());
var GameControlModuleS = class extends import_odin16.ModuleS {
  onStart() {
  }
  execute(param, data) {
    console.log("server init");
  }
  net_StartGame() {
    this.currentData.setGameStart(true);
    Events.dispatchLocal("startGame");
    this.currentPlayer.character.canMove = true;
  }
  net_UpdateTime(curTime) {
    this.currentData.setCurTime(curTime);
    this.currentData.saveData(true);
  }
  net_InitGame() {
    this.currentPlayer.character.canMove = false;
    this.currentData.setGameStart(false);
    this.currentData.saveData(true);
    import_odin16.ModuleManager.instance.forEachModule((module2) => {
      module2.execute();
    });
  }
};

// JavaScripts/GameStart.ts
var GameStart_exports = {};
__export(GameStart_exports, {
  default: () => GameStart
});
var import_odin24 = __toESM(require_dist());

// JavaScripts/HitPromptModuleC.ts
var HitPromptModuleC_exports = {};
__export(HitPromptModuleC_exports, {
  HitPromptModuleC: () => HitPromptModuleC
});
var import_odin17 = __toESM(require_dist());

// JavaScripts/HitPromptUI.ts
var HitPromptUI_exports = {};
__export(HitPromptUI_exports, {
  default: () => HitPromptUI
});
var HitPromptUI = class extends UI_HitPromptUI {
  promptArr = [];
  onStart() {
    if (GamePlay.isClient()) {
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
    if (GamePlay.isClient()) {
      for (let i = 0; i < dirArr.length; i++) {
        if (dirArr[i] > 0) {
          this.promptArr[i].setVisibility(MWGameUI.ESlateVisibility.SelfHitTestInvisible);
          this.promptArr[i].setRenderOpacity(dirArr[i]);
        } else {
          this.promptArr[i].setVisibility(MWGameUI.ESlateVisibility.Hidden);
        }
      }
    }
  }
};

// JavaScripts/HitPromptModuleC.ts
var HitPromptModuleC = class extends import_odin17.ModuleC {
  DirArr;
  onStart() {
    import_odin17.UI.instance.showPanel(HitPromptUI);
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
    import_odin17.UI.instance.getPanel(HitPromptUI).updatePrompt(this.DirArr);
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
    let vector1 = new Type.Vector2(vec1.x, vec1.y).getNormalized();
    vector1.y = -vector1.y;
    let vec2 = loc.subtraction(this.currentPlayer.character.location);
    let vector2 = new Type.Vector2(vec2.x, vec2.y).getNormalized();
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
};

// JavaScripts/HitPromptModuleS.ts
var HitPromptModuleS_exports = {};
__export(HitPromptModuleS_exports, {
  HitPromptModuleS: () => HitPromptModuleS
});
var import_odin18 = __toESM(require_dist());
var HitPromptModuleS = class extends import_odin18.ModuleS {
  onStart() {
    Events.addClientListener("playerHit", (attacker, player, loc) => {
      console.log(player.character.name);
      this.callClientFun(player, this.client.net_ShowHitPrompt, loc);
      console.log("tell client show");
    });
  }
  onUpdate(dt) {
  }
};

// JavaScripts/LeaderBoardModuleS.ts
var LeaderBoardModuleS_exports = {};
__export(LeaderBoardModuleS_exports, {
  LeaderBoardModuleS: () => LeaderBoardModuleS
});
var import_odin19 = __toESM(require_dist());
var LeaderBoardModuleS = class extends import_odin19.ModuleS {
  async net_GetLeaderBoardData() {
    let players = GamePlay.getAllPlayers();
    let playerInfos = [];
    for (let i = 0; i < players.length; i++) {
      let playerInfo = new LeaderBoardInfo();
      let playerData = import_odin19.DataCenterS.instance.getModuleData(players[i], PlayerData);
      playerInfo.name = playerData.name;
      playerInfo.kill = playerData.kill;
      playerInfo.death = playerData.death;
      playerInfo.gold = import_odin19.DataCenterS.instance.getModuleData(players[i], CoinData).count;
      playerInfos.push(playerInfo);
    }
    await this.sortLeaderBoardData(playerInfos);
    return playerInfos;
  }
  sortLeaderBoardData(playerInfos) {
    for (let i = 0; i < playerInfos.length - 1; i++) {
      for (let j = 0; j < playerInfos.length - 1 - i; j++) {
        if (playerInfos[j].kill < playerInfos[j + 1].kill) {
          let temp = playerInfos[j];
          playerInfos[j] = playerInfos[j + 1];
          playerInfos[j + 1] = temp;
        }
      }
    }
  }
  async net_GetScoreBoardData() {
    let players = GamePlay.getAllPlayers();
    let playerInfos = [];
    for (let i = 0; i < players.length; i++) {
      let playerInfo = new LeaderBoardInfo();
      playerInfo.name = players[i].character.characterName;
      playerInfo.gold = import_odin19.DataCenterS.instance.getModuleData(players[i], CoinData).count;
      playerInfos.push(playerInfo);
    }
    await this.sortScoreBoardData(playerInfos);
    return playerInfos;
  }
  sortScoreBoardData(playerInfos) {
    for (let i = 0; i < playerInfos.length - 1; i++) {
      for (let j = 0; j < playerInfos.length - 1 - i; j++) {
        if (playerInfos[j].gold < playerInfos[j + 1].gold) {
          let temp = playerInfos[j];
          playerInfos[j] = playerInfos[j + 1];
          playerInfos[j + 1] = temp;
        }
      }
    }
  }
};

// JavaScripts/NpcModuleC.ts
var NpcModuleC_exports = {};
__export(NpcModuleC_exports, {
  NpcModuleC: () => NpcModuleC
});
var import_odin20 = __toESM(require_dist());
var NpcModuleC = class extends import_odin20.ModuleC {
  onStart() {
  }
};

// JavaScripts/NpcModuleS.ts
var NpcModuleS_exports = {};
__export(NpcModuleS_exports, {
  NpcModuleS: () => NpcModuleS
});
var import_odin21 = __toESM(require_dist());
var NpcModuleS = class extends import_odin21.ModuleS {
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
  net_GetHit(npc, damage, player) {
    if (this.npcHpMap.has(npc) && this.npcHpMap.get(npc) > 0) {
      this.npcHpMap.set(npc, this.npcHpMap.get(npc) - damage);
      if (this.npcHpMap.get(npc) <= 0) {
        let playerData = import_odin21.DataCenterS.instance.getModuleData(player, PlayerData);
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
        import_odin21.DataCenterS.instance.getModuleData(player, PlayerData).saveData(true);
        Events.dispatchLocal("npcDead", npc);
        setTimeout(() => {
          Events.dispatchLocal("npcRecover", npc);
          this.npcHpMap.set(npc, 30);
        }, 3e3);
      }
    }
  }
  net_GetHp(npc) {
    return this.npcHpMap.get(npc);
  }
};

// JavaScripts/PlayerModuleS.ts
var PlayerModuleS_exports = {};
__export(PlayerModuleS_exports, {
  PlayerModuleS: () => PlayerModuleS
});
var import_odin22 = __toESM(require_dist());
var PlayerModuleS = class extends import_odin22.ModuleS {
  onStart() {
  }
  execute(param, data) {
    this.currentData.initAllData();
    this.currentPlayer.character.switchToWalking();
    this.currentPlayer.character.isVisible = true;
    this.currentData.saveData(true);
    this.currentPlayer.character.location = this.currentData.spawnPoint;
  }
  net_SetSpawnPoint(pos) {
    this.currentData.setSpawnPoint(pos);
  }
  net_SetName() {
    this.currentData.setName(this.currentPlayer.character.characterName);
    this.currentData.saveData(true);
  }
  net_PlayerDead() {
    this.currentPlayer.character.ragdoll(true);
    this.currentData.startDeathCount();
    this.currentData.initHp();
    this.currentData.addDeath();
    this.currentData.saveData(true);
  }
  net_PlayerRecover() {
    this.currentData.initHp();
    this.currentData.saveData(true);
    this.currentPlayer.character.ragdoll(false);
    let startPoints = MWCore.GameObject.getGameObjectsByName("StartPoint");
    if (import_odin22.DataCenterS.instance.getModuleData(this.currentPlayer, GameControlData).isGameStart)
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
};

// JavaScripts/WeaponModuleS.ts
var WeaponModuleS_exports = {};
__export(WeaponModuleS_exports, {
  WeaponModuleS: () => WeaponModuleS
});
var import_odin23 = __toESM(require_dist());
var WeaponModuleS = class extends import_odin23.ModuleS {
  onStart() {
  }
  execute(param, data) {
  }
  net_Equiped(player, weaponObj) {
    player.character.attachGameObjectToCharacter(weaponObj, GamePlay.CharacterSocketType.Right_Hand);
  }
  net_UnEquip(weaponObj, weaponPos, weaponRot) {
    if (weaponObj != null) {
      this.currentPlayer.character.detachGameObjectFormCharacterSlot(weaponObj);
      weaponObj.setVisibility(Type.PropertyStatus.On);
      weaponObj.location = weaponPos;
      weaponObj.rotation = weaponRot;
    }
  }
  net_HitPlayer(player) {
    if (import_odin23.DataCenterS.instance.getModuleData(player, PlayerData).hp > 0) {
      import_odin23.DataCenterS.instance.getModuleData(player, PlayerData).minusHp(30);
      import_odin23.DataCenterS.instance.getModuleData(player, PlayerData).saveData(true);
      if (import_odin23.DataCenterS.instance.getModuleData(player, PlayerData).hp <= 0) {
        import_odin23.DataCenterS.instance.getModuleData(this.currentPlayer, PlayerData).addKill();
      }
    }
  }
  net_HitNpc(npc) {
    import_odin23.ModuleManager.instance.getModule(NpcModuleS).net_GetHit(npc, 30, this.currentPlayer);
  }
  net_PlayShootEffect(go) {
    import_odin23.SoundManager.instance.play3DSound("7990", go, 1, 0.7);
    import_odin23.EffectManager.instance.playEffectInGameObject("4388", go, 1);
  }
  net_PlayHitEffect(pos) {
    import_odin23.EffectManager.instance.playEffectInPos("13407", pos, 1, Type.Rotation.zero, new Type.Vector(0.5, 0.5, 0.5));
  }
};

// JavaScripts/GameStart.ts
var GameStart = class extends import_odin24.OdinGame {
  preloadAssets = this.preloads;
  get preloads() {
    return "14639,4173,4172,4388,12563,13407,14088,19641,7990";
  }
  onRegisterModule() {
    import_odin24.ModuleManager.instance.register(CoinModuleS, CoinModuleC, CoinData);
    import_odin24.ModuleManager.instance.register(PlayerModuleS, PlayerModuleC, PlayerData);
    import_odin24.ModuleManager.instance.register(GameControlModuleS, GameControlModuleC, GameControlData);
    import_odin24.ModuleManager.instance.register(LeaderBoardModuleS, BoardModuleC, null);
    import_odin24.ModuleManager.instance.register(HitPromptModuleS, HitPromptModuleC, null);
    import_odin24.ModuleManager.instance.register(NpcModuleS, NpcModuleC, null);
    import_odin24.ModuleManager.instance.register(WeaponModuleS, WeaponModuleC, null);
    if (GamePlay.isClient()) {
    }
  }
};
__decorateClass([
  MWCore.MWProperty({ displayName: "\u9884\u52A0\u8F7D" })
], GameStart.prototype, "preloadAssets", 2);
GameStart = __decorateClass([
  MWCore.MWClass
], GameStart);

// build.ts
var foreign21 = __toESM(require_NewScript());

// JavaScripts/NewScript1.ts
var NewScript1_exports = {};
__export(NewScript1_exports, {
  default: () => NewScript1
});
var NewScript1 = class extends MWCore.MWScript {
  onStart() {
  }
  onUpdate(dt) {
  }
  onDestroy() {
  }
};
NewScript1 = __decorateClass([
  MWCore.MWClass
], NewScript1);

// JavaScripts/NPC.ts
var NPC_exports = {};
__export(NPC_exports, {
  default: () => NPC
});
var import_odin25 = __toESM(require_dist());
var NPC = class extends MWCore.MWScript {
  curState;
  npcModule;
  InitialWayPoint = 0;
  onStart() {
    if (GamePlay.isServer()) {
      console.log("npc init");
      this.npcModule = import_odin25.ModuleManager.instance.getModule(NpcModuleS);
      this.npcModule.net_AddNpc(this.gameObject);
      this.curState = new PatrolState(this.gameObject);
      this.bUseUpdate = true;
      this.curState.setWayPoint(this.InitialWayPoint);
      this.curState.enterState();
      console.log("start patrol");
      Events.addLocalListener("npcDead", (npc) => {
        if (npc == this.gameObject) {
          this.curState = new DeadState(this.gameObject);
          this.curState.enterState();
        }
      });
      Events.addLocalListener("npcRecover", (npc) => {
        console.log("npc recover");
        if (npc == this.gameObject) {
          this.curState = new PatrolState(this.gameObject);
          this.curState.setWayPoint(this.InitialWayPoint);
          this.curState.enterState();
          let waypoints = MWCore.GameObject.getGameObjectsByName("WayPoint");
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
__decorateClass([
  MWCore.MWProperty()
], NPC.prototype, "InitialWayPoint", 2);
NPC = __decorateClass([
  MWCore.MWClass
], NPC);

// JavaScripts/ScoreBoardUI.ts
var ScoreBoardUI_exports = {};
__export(ScoreBoardUI_exports, {
  ScoreBoardUI: () => ScoreBoardUI
});
var ScoreBoardUI = class extends UI_ScoreBoardUI {
  updateScoreBoard(playerInfos) {
    for (let i = 0; i < playerInfos.length; i++) {
      let subUI = this.mSelfList.getChildByName("mRank" + (i + 1).toString());
      subUI.setVisibility(MWGameUI.ESlateVisibility.Visible);
      subUI.getChildByName("Rank").setText((i + 1).toString());
      subUI.getChildByName("Name").setText(playerInfos[i].name);
      subUI.getChildByName("Gold").setText(playerInfos[i].gold.toString());
    }
    for (let i = playerInfos.length; i < 6; i++) {
      let subUI = this.mSelfList.getChildByName("mRank" + (i + 1).toString());
      subUI.setVisibility(MWGameUI.ESlateVisibility.Hidden);
    }
  }
};

// JavaScripts/UIRoot.ts
var UIRoot_exports = {};
__export(UIRoot_exports, {
  default: () => UIRoot
});
var import_odin26 = __toESM(require_dist());
var UIRoot = class extends import_odin26.UI {
};
UIRoot = __decorateClass([
  MWGameUI.MWUIMono
], UIRoot);

// Prefabs/NPC/build.ts
var build_exports = {};
__export(build_exports, {
  MWModuleMap: () => MWModuleMap
});
var MWModuleMap = {};

// Prefabs/NPC/Script/NPC.ts
var NPC_exports2 = {};
__export(NPC_exports2, {
  default: () => NPC2
});
var import_odin27 = __toESM(require_dist());
var NPC2 = class extends MWCore.MWScript {
  curState;
  npcModule;
  InitialWayPoint = 0;
  onStart() {
    console.log("npc init");
    if (GamePlay.isServer()) {
      this.npcModule = import_odin27.ModuleManager.instance.getModule(NpcModuleS);
      this.npcModule.net_AddNpc(this.gameObject);
      this.curState = new PatrolState(this.gameObject);
      this.bUseUpdate = true;
      this.curState.setWayPoint(this.InitialWayPoint);
      this.curState.enterState();
      console.log("start patrol");
      Events.addLocalListener("npcDead", (npc) => {
        if (npc == this.gameObject) {
          this.curState = new DeadState(this.gameObject);
          this.curState.enterState();
        }
      });
      Events.addLocalListener("npcRecover", (npc) => {
        console.log("npc recover");
        if (npc == this.gameObject) {
          this.curState = new PatrolState(this.gameObject);
          this.curState.setWayPoint(this.InitialWayPoint);
          this.curState.enterState();
          let waypoints = MWCore.GameObject.getGameObjectsByName("WayPoint");
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
__decorateClass([
  MWCore.MWProperty()
], NPC2.prototype, "InitialWayPoint", 2);
NPC2 = __decorateClass([
  MWCore.MWClass
], NPC2);

// Prefabs/Weapon/build.ts
var build_exports2 = {};
__export(build_exports2, {
  MWModuleMap: () => MWModuleMap2
});

// Prefabs/Weapon/Script/Rifle.ts
var Rifle_exports = {};
__export(Rifle_exports, {
  default: () => Rifle
});
var import_odin28 = __toESM(require_dist());
var Rifle = class extends MWCore.MWScript {
  initPos;
  initRot;
  curPlayer;
  isEquiped = false;
  onStart() {
    this.initPos = this.gameObject.location;
    this.initRot = this.gameObject.rotation;
    let boxTrigger = this.gameObject.getChildByName("BoxTrigger");
    boxTrigger.onEnter.Add((gameObject) => {
      if (GamePlay.isCharacter(gameObject)) {
        this.curPlayer = gameObject;
        if (GamePlay.isClient() && !this.isEquiped) {
          this.isEquiped = true;
          let fireEffect = this.gameObject.getChildByName("Fire");
          import_odin28.ModuleManager.instance.getModule(WeaponModuleC).pickWeapon(gameObject.player, this.gameObject, fireEffect, boxTrigger);
        }
      }
    });
    if (GamePlay.isClient()) {
      Events.addServerListener("stopGame", () => {
        this.isEquiped = false;
      });
      Events.addServerListener("enableWeapon", (obj) => {
        if (obj == this.gameObject) {
          this.isEquiped = false;
        }
      });
    }
    if (GamePlay.isServer()) {
      Events.addPlayerLeftListener((player) => {
        if (player.character == this.curPlayer) {
          setTimeout(() => {
            this.gameObject.location = this.initPos;
            this.gameObject.rotation = this.initRot;
            Events.dispatchToAllClient("enableWeapon", this.gameObject);
          }, 100);
        }
      });
    }
  }
};
Rifle = __decorateClass([
  MWCore.MWClass
], Rifle);

// Prefabs/Weapon/build.ts
var MWModuleMap2 = {
  "Script/Rifle": Rifle_exports
};

// build.ts
var MWModuleMap3 = {
  "build": build_exports3,
  "JavaScripts/ChangeClothes": ChangeClothes_exports,
  "JavaScripts/CoinData": CoinData_exports,
  "JavaScripts/CoinModuleC": CoinModuleC_exports,
  "JavaScripts/CoinModuleS": CoinModuleS_exports,
  "JavaScripts/DeathCountDownUI": DeathCountDownUI_exports,
  "JavaScripts/FiniteStateMachine/BaseState": BaseState_exports,
  "JavaScripts/FiniteStateMachine/DeadState": DeadState_exports,
  "JavaScripts/FiniteStateMachine/PatrolState": PatrolState_exports,
  "JavaScripts/GameControl": GameControl_exports,
  "JavaScripts/GameControlData": GameControlData_exports,
  "JavaScripts/GameControlModuleC": GameControlModuleC_exports,
  "JavaScripts/GameControlModuleS": GameControlModuleS_exports,
  "JavaScripts/GameStart": GameStart_exports,
  "JavaScripts/GameUI": GameUI_exports,
  "JavaScripts/HitPromptModuleC": HitPromptModuleC_exports,
  "JavaScripts/HitPromptModuleS": HitPromptModuleS_exports,
  "JavaScripts/HitPromptUI": HitPromptUI_exports,
  "JavaScripts/LeaderBoardModuleC": LeaderBoardModuleC_exports,
  "JavaScripts/LeaderBoardModuleS": LeaderBoardModuleS_exports,
  "JavaScripts/LeaderBoardUI": LeaderBoardUI_exports,
  "JavaScripts/NewScript": foreign21,
  "JavaScripts/NewScript1": NewScript1_exports,
  "JavaScripts/NPC": NPC_exports,
  "JavaScripts/NpcModuleC": NpcModuleC_exports,
  "JavaScripts/NpcModuleS": NpcModuleS_exports,
  "JavaScripts/PlayerData": PlayerData_exports,
  "JavaScripts/PlayerModuleC": PlayerModuleC_exports,
  "JavaScripts/PlayerModuleS": PlayerModuleS_exports,
  "JavaScripts/ScoreBoardUI": ScoreBoardUI_exports,
  "JavaScripts/StartGameUI": StartGameUI_exports,
  "JavaScripts/UIRoot": UIRoot_exports,
  "JavaScripts/UITemplate": UITemplate_exports,
  "JavaScripts/WeaponModuleC": WeaponModuleC_exports,
  "JavaScripts/WeaponModuleS": WeaponModuleS_exports,
  "Prefabs/NPC/build": build_exports,
  "Prefabs/NPC/Script/NPC": NPC_exports2,
  "Prefabs/Weapon/build": build_exports2,
  "Prefabs/Weapon/Script/Rifle": Rifle_exports
};
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
//# sourceMappingURL=game.js.map
