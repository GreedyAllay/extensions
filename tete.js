(function () {
  // Wait for Scratch to be defined
  if (!window.Scratch) {
    setTimeout(arguments.callee, 50); // Retry until it exists
    return;
  }

  class MyUIExtension {
    constructor() {
      this.offscreen = document.createElement('canvas');
      this.offscreen.width = 512;
      this.offscreen.height = 512;
      this.ctx = this.offscreen.getContext('2d');

      this.skinId = null;
    }

    getInfo() {
      return {
        id: 'customui',
        name: 'Custom UI',
        color1: '#4287f5',
        blocks: [
          {
            opcode: 'drawUI',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Draw UI to sprite',
          },
        ],
      };
    }

    drawUI() {
    const vm = Scratch.vm;
    const renderer = vm.renderer;
    const runtime = vm.runtime;
document.body.appendChild(this.offscreen); // temp debug

    this.ctx.clearRect(0, 0, this.offscreen.width, this.offscreen.height); // wipe any previous data
    this.ctx.fillStyle = '#333'; // non-gray color
    this.ctx.fillRect(0, 0, this.offscreen.width, this.offscreen.height); // solid fill

    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, 512, 512);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText('Hello UI', 50, 50);

    const skinId = renderer.createBitmapSkin(this.offscreen, 1);

    const target = runtime.targets.find(t => t.sprite?.name === 'UISprite');
    if (!target) {
        console.warn("[CustomUI] Sprite 'UISprite' not found.");
        return;
    }

    // Create a proper costume object
    const costumeName = 'CustomUI'; 
    const costume = {
        name: costumeName,
        bitmapResolution: 1,
        skinId: skinId,
        dataFormat: 'png', // doesn't matter much here
        asset: null // optional, usually for project serialization
    };

    // Add costume to the sprite
    target.sprite.costumes.push(costume);
    target.sprite.currentCostume = target.sprite.costumes.length - 1;

    console.log(`[CustomUI] Added costume '${costumeName}' to sprite '${target.sprite.name}'`);
    }

  }

  Scratch.extensions.register(new MyUIExtension());
})();
