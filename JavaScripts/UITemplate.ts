//工具自动生成请勿修改
import { ViewBase } from "odin";
export namespace LanUtil {
	export let getLan: (key: string) => { Value: string };
	export function setUILanguage(ui: MWGameUI.MWUIButton | MWGameUI.MWUITextblock) {
		if (!this.getLan) {
			return;
		}
		let key: string = null;
		if (ui instanceof MWGameUI.MWUIButton) {
			key = ui.getButtonString();
		}
		else {
			key = ui.getText();
		}

		if (key) {
			let lan = this.getLan(key);
			if (lan) {
				if (ui instanceof MWGameUI.MWUIButton) {
					ui.setButtonString(lan.Value)
				}
				else {
					ui.setText(lan.Value);
				}
			}
		}
	}
}
export class UI_DeadUI extends ViewBase {
	public mDeathCountDown: MWGameUI.MWUITextblock;

    constructor() {
        super("DeadUI");
    }
    public buildSelf(): void {
		this.mDeathCountDown = this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/mDeathCountDown");
		LanUtil.setUILanguage(this.mDeathCountDown);

    }
}
export class UI_GameUI extends ViewBase {
	public mJumpButton: MWGameUI.MWUIButton;
	public mCrossHairs: MWGameUI.MWUIImage;
	public mFireJoyStick: MWGameUI.MWUIVirtualJoystickPanel;
	public mFlyButton: MWGameUI.MWUIButton;
	public mFlyCountDown: MWGameUI.MWUITextblock;
	public mInvisibleButton: MWGameUI.MWUIButton;
	public mInvisibleCountDown: MWGameUI.MWUITextblock;
	public mCoinImage: MWGameUI.MWUIImage;
	public mCoinCount: MWGameUI.MWUITextblock;
	public mHealthBar: MWGameUI.MWUIProgressbar;
	public mCountDown: MWGameUI.MWUITextblock;
	public mProgressBar: MWGameUI.MWUIProgressbar;

    constructor() {
        super("GameUI");
    }
    public buildSelf(): void {
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
		LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/CollectText"));

    }
}
export class UI_HitPromptUI extends ViewBase {
	public mUp: MWGameUI.MWUIImage;
	public mUpRight: MWGameUI.MWUIImage;
	public mRight: MWGameUI.MWUIImage;
	public mLowRight: MWGameUI.MWUIImage;
	public mLow: MWGameUI.MWUIImage;
	public mLowLeft: MWGameUI.MWUIImage;
	public mLeft: MWGameUI.MWUIImage;
	public mUpLeft: MWGameUI.MWUIImage;

    constructor() {
        super("HitPromptUI");
    }
    public buildSelf(): void {
		this.mUp = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mUp");
		this.mUpRight = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mUpRight");
		this.mRight = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mRight");
		this.mLowRight = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mLowRight");
		this.mLow = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mLow");
		this.mLowLeft = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mLowLeft");
		this.mLeft = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mLeft");
		this.mUpLeft = this.findChildByPath(MWGameUI.MWUIImage, "Canvas/mUpLeft");

    }
}
export class UI_LeaderBoardSubUI extends ViewBase {

    constructor() {
        super("LeaderBoardSubUI");
    }
    public buildSelf(): void {
		LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MWTextBlock_1"));
		LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MWTextBlock_1_1"));
		LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MWTextBlock_1_2"));
		LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MWTextBlock_1_3"));
		LanUtil.setUILanguage(this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/MWTextBlock_1_4"));

    }
}
export class UI_LeaderBoardUI extends ViewBase {
	public mTitle_txt: MWGameUI.MWUITextblock;
	public mFieldName: MWGameUI.MWUICanvas;
	public mSelfList: MWGameUI.MWUICanvas;
	public mRank1: MWGameUI.MWUICanvas;
	public mRank2: MWGameUI.MWUICanvas;
	public mRank3: MWGameUI.MWUICanvas;
	public mRank4: MWGameUI.MWUICanvas;
	public mRank5: MWGameUI.MWUICanvas;
	public mRank6: MWGameUI.MWUICanvas;
	public mClose_btn: MWGameUI.MWUIButton;

    constructor() {
        super("LeaderBoardUI");
    }
    public buildSelf(): void {
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
}
export class UI_Main extends ViewBase {

    constructor() {
        super("Main");
    }
    public buildSelf(): void {

    }
}
export class UI_NewUI extends ViewBase {

    constructor() {
        super("NewUI");
    }
    public buildSelf(): void {

    }
}
export class UI_StartGameUI extends ViewBase {
	public mStartGameButton: MWGameUI.MWUIButton;

    constructor() {
        super("StartGameUI");
    }
    public buildSelf(): void {
		this.mStartGameButton = this.findChildByPath(MWGameUI.MWUIButton, "MWCanvas_2147482460/mStartGameButton");
		this.mStartGameButton.onClicked().add(() => {
			Events.dispatchLocal("PlayButtonClick", "mStartGameButton");
		});
		LanUtil.setUILanguage(this.mStartGameButton);

    }
}
export class UI_UIRoot extends ViewBase {

    constructor() {
        super("UIRoot");
    }
    public buildSelf(): void {

    }
}