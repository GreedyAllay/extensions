(function (Scratch) {
  'use strict';

  class MyExtension {
    getInfo() {
      return {
        id: 'myExtension', // ID used in the URL, must be unique
        name: 'My Extension', // Display name
        color1: '#ff6680', // Block color
        color2: '#ff4d6d', // Outline color
        color3: '#cc3355', // Text highlight color
        blocks: [
          {
            opcode: 'loadPage',
            blockType: Scratch.BlockType.REPORTER,
            text: 'load webpage [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://www.example.com"
              }
            }
          },
          {
            opcode: 'setProxy',
            blockType: Scratch.BlockType.REPORTER,
            text: 'set proxy to [PROXY]',
            arguments: {
              PROXY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://localhost:3000'
              }
            }
          }
        ],
      };
    }

    async loadPage({URL}) {
      try {
      console.log('yes we did get SOMETHING')
      console.log(proxy)
      console.log(URL)
      console.log(`${proxy}/${URL}`)
      const response = await fetch(`${proxy}/${URL}`)
      if(!response.ok) throw new Error(`woopsy daisy! You did something wrong there. Error: ${response.status}`)
        const text = await response.text();
      return text
      } catch (error) {
        console.log(error)
        return 'something got fucked up really really well' + error
      }
    }
    setProxy({PROXY}) {
      proxy = PROXY
    }
  }
  var proxy = "https://localhost:3000"

  Scratch.extensions.register(new MyExtension());
})(Scratch);
