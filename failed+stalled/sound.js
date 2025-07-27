(function (Scratch) {
  'use strict';

  class MyExtension {
    getInfo() {
      return {
        id: 'urlplaybackplus', // ID used in the URL, must be unique
        name: 'URL Playback+', // Display name
        color1: '#c7328eff', // Block color
        color2: '#a12070ff', // Outline color
        color3: '#c7328eff', // Text highlight color
        blocks: [
          {
            opcode: 'playSound',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start sound from url [URL] scope [SCOPE]',
            arguments: {
              URL: {
                type:Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/meow.mp3'
              },
              SCOPE: {
                type:Scratch.ArgumentType.STRING,
                defaultValue: 'defaultscope'
              }
            }
          },
          {
            opcode: 'playSoundUntil',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start sound from url [URL] scope [SCOPE] until done',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/meow.mp3'
              },
              SCOPE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 'defaultscope'
              }
            }
          },
          {
            opcode: 'stopSound',
            blockType: Scratch.BlockType.COMMAND,
            text: 'stop sound in scope [SCOPE]',
            arguments: {
              SCOPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultscope'
              }
            }
          }
        ],
      };
    }

    playSound({URL, SCOPE}) {
      if (sounds[SCOPE]) {
        sounds[SCOPE].pause();
        sounds[SCOPE].currentTime = 0;
      }
      const audio = new Audio(URL);
      audio.play();
      sounds[SCOPE] = audio;
    }

    stopSound({SCOPE}) {
      if(sounds[SCOPE]) {
        sounds[SCOPE].pause();
        sounds[SCOPE].currentTime = 0;
      }
    }

    async playSoundUntil({URL, SCOPE}) {
      if (sounds[SCOPE]) {
        sounds[SCOPE].pause();
        sounds[SCOPE].currentTime = 0;
      }
      const audio = new Audio(URL);
      audio.play();
      sounds[SCOPE] = audio;

        await new Promise((resolve) => {
        audio.addEventListener('ended', resolve);
        audio.play();
      })
    };
    }
  const sounds = {}

  Scratch.extensions.register(new MyExtension());
})(Scratch);
