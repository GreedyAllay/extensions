//Name: On-screen controls
//ID: gaOSC
//Description: Customisable multitouch controls for any game



(function (Scratch) {
  'use strict';

  class MyExtension {
    getInfo() {
      return {
        id: 'gaOSC', // ID used in the URL, must be unique
        name: 'On-screen controls', // Display name
        color1: '#4ca880', // Block color
        color2: '#3f8f6cff', // Outline color
        color3: '#398061ff', // Text highlight color
        blocks: [
          {
            opcode: 'createButton',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create new button text: [TEXT] x: [X] y: [Y] scale: [SIZE] id: [ID]',
            arguments: {
                X: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0
                },
                Y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0
                },
                SIZE: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1
                },
                TEXT: {
                    type:Scratch.ArgumentType.STRING,
                    defaultValue: "hello"
                },
                ID: {
                    type:Scratch.ArgumentType.STRING,
                    defaultValue: `1`
                }
            }
          },
          {
            opcode: 'removeButton',
            blockType: Scratch.BlockType.COMMAND,
            text: "remove button id: [ID]",
            arguments: {
                ID: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "1"
                }
            }
          },
          {
            opcode: 'checkButton',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'button [ID] pressed?',
            arguments: {
                ID: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "1"
                }
            }
          },
          // {
          //   opcode: 'setButtonColor',
          //   blockType: Scratch.BlockType.COMMAND,
          //   text: 'set button [ID] color to: [COLOR] text: [TXTCOLOR]',
          //   arguments: {
          //     ID: {
          //       type: Scratch.ArgumentType.STRING,
          //       defaultValue: 1,
          //     },
          //     COLOR: {
          //       type: Scratch.ArgumentType.STRING,
          //       defaultValue: 1,
          //     },
          //     TXTCOLOR: {
          //       type: Scratch.ArgumentType.STRING,
          //       defaultValue: 1,
          //     },

          //   }
          // },
          {
            opcode: 'getError',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last error',
          }
        ],
      };
    }
    createButton({X, Y, SIZE, TEXT, ACTION, ID}) {
      if(!existingButtons.includes(ID)) {
        const button = document.createElement("button")
        button.style = `
        background-color: green;
        padding: 20px;
        background-color: rgba(14, 14, 14, 0.64);
        border-radius: 100%;
        border-style: solid;
        border-color: rgba(14, 14, 14, 1);
        margin-left: ${X}px;
        margin-top: ${Y}px;
        min-width: ${SIZE};
        min-height: ${SIZE};
        backdrop-filter: blur(10px);
        aspect-ratio: 1/1;
        `
        button.style.pointerEvents = 'auto';
        button.textContent = TEXT
        button.id = ID
        existingButtons.push(ID)
        button.addEventListener("mousedown", function() {
            pressedButtons.push(button.id)
        console.log(`pressed   ${button.id}`)

        })
        button.addEventListener("mouseup", () => {
        const newArray = pressedButtons.filter(item => item !== button.id)
        pressedButtons = newArray
        console.log(`unpressed ${button.id}`)
        })
        Scratch.renderer.addOverlay(button, "scale")
      } else {
        error = 'this button already exists'
      }
    }
    removeButton({ID}) {
        const element = document.getElementById(ID)
        const index = existingButtons.indexOf(ID)
        if(existingButtons.includes(ID)) {
        const newArray = existingButtons.filter(item => item !== ID)
        existingButtons = newArray
        } else {
          console.log("couldn't find that button")
        }
        element.remove()
    }
    checkButton({ID}) {
        return pressedButtons.includes(ID)
    }
    setButtonColor({ID, COLOR, TXTCOLOR}) {
      style = document.getElementById(ID).style 
      document.getElementById(ID).style = style + `background-color: ${COLOR}; color: ${TXTCOLOR};`
    }
    getError() {
      return error
    }

  }
  let pressedButtons = []
  let existingButtons = []
  let error = ""

  Scratch.extensions.register(new MyExtension());
})(Scratch);
