import * as UE from "ue";
import * as puerts from "puerts";

@MWCore.MWClass
class ClothTest extends MWCore.MWScript
{
    OnLoad(): void
    {
        Events.AddPlayerJoinedListener((player: GamePlay.Player) => {
            this.RandomChangeCloth(player);
        });
    }

    RandomChangeCloth(player: GamePlay.Player): void
    {
        // let fashionID = this.GetRandomNum(0, 9);
        // player.Character.SetCloth(GamePlay.HumanFashionType.HumanTemp_Body, fashionID);
        // console.log("Character Body changed to " + fashionID);

        // fashionID = this.GetRandomNum(10, 13)
        // player.Character.SetCloth(GamePlay.HumanFashionType.HumanTemp_Face, fashionID);
        // console.log("Character Face changed to " + fashionID);

        // fashionID = this.GetRandomNum(14, 23)
        // player.Character.SetCloth(GamePlay.HumanFashionType.HumanTemp_Hair, fashionID);
        // console.log("Character Hair changed to " + fashionID);
    }

    GetRandomNum(Min, Max): number {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
}

export default ClothTest;