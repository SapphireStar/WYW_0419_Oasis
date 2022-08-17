export abstract class BaseState{
    npc:GamePlay.Humanoid;
    public constructor(npc:GamePlay.Humanoid){
        this.npc = npc;
    }

    public abstract enterState();

    public abstract Update(dt:number);

}