(function (Scratch) {
  'use strict';

  let elements = []
  let IDs = []
  let clicked = {}

  class MyExtension {
    getInfo() {
      return {
        id: 'html', // ID used in the URL, must be unique
        name: 'HTML', // Display name
        color1: '#ff6680', // Block color
        color2: '#ff4d6d', // Outline color
        color3: '#cc3355', // Text highlight color
        blocks: [
          {
            opcode: 'create',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create element type: [TYPE] id: [ID]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'div'
              }
              
            }
          },
          {
            opcode: 'set',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set properies of id: [ID] property: [PROP] value: [VALUE]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              },
              PROP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'textContent'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'hello'
              },
            }
          },
          {
            opcode: 'append',
            blockType: Scratch.BlockType.COMMAND,
            text: 'append [ID] to [TARGET]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              },
              TARGET: {
                type: Scratch.ArgumentType.NUMBER,
                menu: 'targets'
              }
            }
          },
          {
            opcode: 'remove',
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove [ID]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              }
            }
          },
          {
            opcode: 'run',
            blockType: Scratch.BlockType.COMMAND,
            text: 'JavaScript [CODE]',
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'alert("Are you good bro?")'
              }
            }
          },
          {
            opcode: 'runReturn',
            blockType: Scratch.BlockType.REPORTER,
            text: 'JavaScript [CODE]',
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'alert("Are you good bro?")'
              }
            }
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: ''
          },
          {
            opcode: 'clickevent',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Add click EventListener id: [ID]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              }
            }
          },
          {
            opcode: 'getClicked',
            blockType: Scratch.BlockType.HAT,
            text: 'when [ID] is clicked',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              }
            }
          },
          {
            opcode: 'hideall',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set visibility to [VISIBILITY]',
            arguments: {
              VISIBILITY: {
                type: Scratch.ArgumentType.STRING,
                menu: 'visibility'
              }
            }
          },
          {
            opcode: 'reset',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset'
          },
          
        ],
        menus: {
          targets: {
            acceptReporters: true,
            items: "getIDs"
          },
          visibility: {
            acceptReporters: true,
            items: ['visible', 'hidden']
          }
        }
      };
    }

    create({ID, TYPE}) {
      elements.push(document.createElement(TYPE))
      IDs.push(ID)

      const element = elements[IDs.indexOf(ID)]
      element.id = ID
      element.style.pointerEvents = 'auto';
      console.log(elements)
      console.log(IDs)
    }

    append({ID, TARGET}) {
      if(TARGET === 'stage') {
        Scratch.renderer.addOverlay(elements[IDs.indexOf(ID)], "scale")
      } else {
        IDs.indexOf(TARGET).appendChild(IDs.indexOf(ID))
      }
      
    }

    set({ID, PROP, VALUE}) {
      const index = IDs.indexOf(ID);
      if (index !== -1) {
        eval(`elements[${index}].${PROP} = "${VALUE}"`);
      } else {
        console.warn(`"${ID}" does not exist`);
      }
    }

    remove({ID}) {
      const index = IDs.indexOf(ID);
      if (index !== -1) {
        const element = elements[index];
        if (element) element.remove();
        elements.splice(index, 1);
        IDs.splice(index, 1);
        delete clicked[ID];
      }
    }

    getIDs() {
      let output = ['stage']
      return output.concat(IDs)
    }

    run({CODE}) {
      eval([CODE])
    }

    runReturn({CODE}) {
      return eval([CODE])
    }

    clickevent({ID}) {
      const element = elements[IDs.indexOf(ID)]
      if(element !== null) {
        element.addEventListener('mousedown', () => {
          clicked[ID] = true
        })
        element.addEventListener('mouseup', () => {
          clicked[ID] = false
        })
        element.addEventListener('touchdown', () => {
          clicked[ID] = true
        })
        element.addEventListener('touchup', () => {
          clicked[ID] = false
        })
        element.addEventListener('click', () => {
      console.log(clicked)

        })
      }
    }

    getClicked({ID}) {
      if(clicked[ID]) {
        return clicked[ID]
      } else {
        return false
      }
    }

    hideall({VISIBILITY}) {
      for(let i = 0; i < elements.length; i++) {
      if(VISIBILITY === 'hidden') {
        elements[i].hidden = true
      } else {
        elements[i].hidden = false
      }}}

    reset() {
      for(let i = 0; i < elements.length; i++) {
        elements[i].remove()
      }
      clicked = {}
      elements = []
      IDs = []
    }
  }

  Scratch.extensions.register(new MyExtension());
})(Scratch);
