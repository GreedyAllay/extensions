(function (Scratch) {
  'use strict';

  let clickedButtons = {}

  class MyExtension {
    getInfo() {
      return {
        id: 'tiles', // ID used in the URL, must be unique
        name: 'Tiles', // Display name
        color1: '#e93a3aff', // Block color
        color2: '#bb2d2dff', // Outline color
        color3: '#972222ff', // Text highlight color
        blocks: [
          {
            opcode: 'initialise',
            blockType: Scratch.BlockType.COMMAND,
            text: 'initialize x: [X] y: [Y] width: [WIDTH] height: [HEIGHT]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
              Y: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
              WIDTH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '100%'
              },
              HEIGHT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '100%'
              },
            }
          },
          {
            opcode: 'addTile',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add tile name: [TITLE] description: [DESC] thumbnail: [THUMB] id: [ID]',
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Unnamed Tile'
              },
              DESC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Descriptions are awesome'
              },
              THUMB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://greedyallay.github.io/extensions/resources/IMG_5205.jpg'
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'abc'
              },
            }
          },
          {
            opcode: 'removeWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove window',
          },
          {
            opcode: 'getClicked',
            blockType: Scratch.BlockType.HAT,
            text: 'when card [NAME] clicked',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'abc'
              }
            }
          },
          {
            opcode: 'getClicked1',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'when card [NAME] clicked',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'abc'
              }
            }
          },
        ],
      };
    }

    initialise({X, Y, WIDTH, HEIGHT}) {
      if(document.getElementById('window') == null) {
      const panel = document.createElement("div")
      panel.style = `
      width: ${WIDTH};
      height: ${HEIGHT};
      background-color: #00000063;
      display: flex;
      flex-wrap: wrap;
      overflow-y: scroll;
      position: absolute;
      left: ${X}px;
      top: ${Y}px
      `
      panel.style.pointerEvents = 'auto';
      panel.id = 'window'
      Scratch.renderer.addOverlay(panel, "scale")
      }
    }

    addTile({TITLE, DESC, THUMB, ID}) {
      const card = document.createElement('div')
      const title = document.createElement('span')
      const desc = document.createElement('span')
      const thumb = document.createElement('img')

      if(THUMB == '') {
        thumb.src = 'https://greedyallay.github.io/extensions/resources/IMG_5205.jpg'
            } else {
        thumb.src = THUMB
      }
      
      desc.textContent = DESC
      title.textContent = TITLE

      title.className = 'title'
      card.className = 'tile'
      desc.className = 'desc'
      thumb.className = 'thumb'

      card.appendChild(thumb)
      card.appendChild(title)
      card.appendChild(desc)

      card.addEventListener('mousedown', () => {
        clickedButtons[ID] = true
      })
      card.addEventListener('mouseup', () => {
        clickedButtons[ID] = false
      })

      document.getElementById('window').appendChild(card)
    }

    removeWindow() {
      const window = document.getElementById('window')
      if(window)
      window.remove()
    }

    getClicked({NAME}) {
      if(NAME !== '')
      {
        if(clickedButtons[NAME]) {
          return clickedButtons[NAME]
        }
      }
    }
    getClicked1({NAME}) {
      if(NAME !== '')
      {
        if(clickedButtons[NAME]) {
          return clickedButtons[NAME]
        }
      }
    }    
  }

  Scratch.extensions.register(new MyExtension());


  const style = document.createElement('style')
  style.textContent = `
  .tile {
    background-color: rgb(58, 58, 58);
    padding: 5px;
    width: 110px;
    height: fit-content;
    border-color: rgb(54, 54, 54);
    border-style: solid;
    border-width: 1px;
    margin: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    transition: .075s;
  }
  .tile:hover {
  cursor: pointer;
  filter: brightness(1.25);
  }
  .tile:active {
  transform: scale(0.98);
  filter: brightness(.75);
  }
  .thumb {
    width: 100%;
    aspect-ratio: 16/9;
  }
  .title {
    font-size: 15px
  }
  .desc {
    font-size: 10px
  }
  .window {
  display: flex;
  flex-direction: column
  }
  ::-webkit-scrollbar {
  display: none
  }
  
  `
document.body.appendChild(style)
  
})(Scratch);
