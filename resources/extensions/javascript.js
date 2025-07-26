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
            opcode: 'constVar',
            blockType: Scratch.BlockType.COMMAND,
            text: '[TYPE] [NAME] = [VALUE]',
            arguments: {
                TYPE: {
                    type:Scratch.ArgumentType.STRING,
                    menu: 'varInitMenu'
                },
                NAME: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'foo'
                },
                VALUE: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'bar'
                }
            }
          },
          {
            opcode: 'getVar',
            blockType: Scratch.BlockType.REPORTER,
            text: 'variable [VARIABLE]',
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'foo'
              },
            }
          },
          {
            opcode: 'menuBlock',
            blockType: Scratch.BlockType.REPORTER,
            text: 'selected [CHOICE]',
            arguments: {
              CHOICE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'choicesMenu'
              }
            }
          }
        ],
        menus: {
          choicesMenu: {
            acceptReporters: true,
            items: ['Option A', 'Option B', 'Option C']
          },
          varInitMenu: {
            acceptReporters: true,
            items: ['var', 'let', 'const']
          }
        }
      };
    }

    constVar({TYPE, NAME, VALUE}) {
        eval(`${TYPE} ${NAME} = "${VALUE}"`)
        console.log(`${TYPE} ${NAME} = "${VALUE}"`)

    }
    getVar({VARIABLE}) {
        return window[VARIABLE]
    }

    repeatText({ TEXT, TIMES }) {
      return TEXT.repeat(Number(TIMES));
    }

    menuBlock({ CHOICE }) {
      return `You chose: ${CHOICE}`;
    }
  }

const testvar = "gay pron"
  Scratch.extensions.register(new MyExtension());
})(Scratch);
