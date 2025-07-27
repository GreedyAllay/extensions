(function (Scratch) {
  'use strict';

  class MyExtension {
    getInfo() {
      return {
        id: 'simpleJS', // ID used in the URL, must be unique
        name: 'Simple JS', // Display name
        color1: '#ff2e2e', // Block color
        color2: '#bb0000ff', // Outline color
        color3: '#b90000ff', // Text highlight color
        blocks: [
          {
            opcode: 'eval',
            blockType: Scratch.BlockType.REPORTER,
            text: 'eval([COMMAND])',
            arguments: {
                COMMAND: {
                    type:Scratch.ArgumentType.STRING,
                    defaultValue: ""
                }
            }
          },
          {
            opcode: 'run',
            blockType: Scratch.BlockType.COMMAND,
            text: 'void [RUN]',
            arguments: {
                RUN: {
                    type:Scratch.ArgumentType.STRING,
                    defaultValue: ""
                }
            }
          },
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
            opcode: 'console',
            blockType: Scratch.BlockType.REPORTER,
            text: 'console.[ACTION]([ARGS])',
            arguments: {
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'consoleMenu'
              },
              ARGS: {
                type:Scratch.ArgumentType.STRING,
                defaultValue: "pink cats"
              }
            }
          },
          {
            opcode: 'alert',
            blockType: Scratch.BlockType.REPORTER,
            text: '[ACTION]([ARGS])',
            arguments: {
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'alertMenu'
              },
              ARGS: {
                type:Scratch.ArgumentType.STRING,
                defaultValue: "pink cats"
              }
            }
          },
          {
            opcode: 'function',
            blockType: Scratch.BlockType.COMMAND,
            text: 'function [NAME]([ARGS]) {',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myFunction"
              },
              ARGS: {
                type:Scratch.ArgumentType.STRING,
                defaultValue: "arg1, arg2"
              },
              SUBSTACK: {
              type: Scratch.ArgumentType.SUBSTACK
            }
            },
          },
          {
            opcode: 'functionStart',
            blockType: Scratch.BlockType.COMMAND,
            text: 'run [NAME]([ARGS]) {',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myFunction"
              },
              ARGS: {
                type:Scratch.ArgumentType.STRING,
                defaultValue: "arg1, arg2"
              }
            },
          }
        ],
        menus: {
          consoleMenu: {
            acceptReporters: true,
            items: ['log', 'warn', 'error']
          },
          varInitMenu: {
            acceptReporters: true,
            items: ['var', 'let', 'const']
          },
          alertMenu: {
            acceptReporters: true,
            items: ['alert', 'confirm', 'prompt']
          }
        }
      };
    }

    constVar({TYPE, NAME, VALUE}) {
        window.eval(`${TYPE} ${NAME} = "${VALUE}"`)
        console.log(`${TYPE} ${NAME} = "${VALUE}"`)

    }
    getVar({VARIABLE}) {
        return window[VARIABLE]
    }

    console({ACTION, ARGS}) {
      window.eval(`console.${ACTION}("${ARGS}")`)
    }

    alert({ACTION, ARGS}) {
      return eval(`${ACTION}("${ARGS}")`)
    }
    eval({COMMAND}) {
      return eval(`"${COMMAND}"`)
    }
    run() {
    }
    functionStart({NAME, ARGS}) {
      return util 
    }
    function({NAME,ARGS, SUBSTACK}, util) {
    window.eval(`function ${NAME}(${ARGS}) {
        }`)
      return util.startBranch(SUBSTACK)
    }
  }

const testvar = "gay pron"
  Scratch.extensions.register(new MyExtension());
})(Scratch);
