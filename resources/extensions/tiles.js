// name: Tiles
// by: Greedy Allay
// version: 1.1



(function (Scratch) {
  'use strict';

      
  let clickedButtons = {}

  let mouse = {}

  addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  let max = {}

  // const bounds = Scratch.vm.renderer.getBounds();
  // max.w = bounds.width / 480;
  // max.h = bounds.height / 360;

  // max.ox = bounds.left;
  // max.oy = bounds.top;

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
                defaultValue: 'Tile'
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
                defaultValue: 'cat'
              },
              MENU: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["cat", "dog"]'
              },
            }
          },
          {
            opcode: 'addTitle',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add new title name: [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'NEW TITLE'
              }
            }
          },
          {
            opcode: 'addButton',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add new button id: [ID]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              }
            }
          },
          {
            opcode: 'setStyle',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set [ELEMENT] [CSS] to [VALUE]',
            arguments: {
              ELEMENT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'elements'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'red'
              },
              CSS: {
                type: Scratch.ArgumentType.STRING,
                menu: 'css'
              }
            }
          },
          {
            opcode: 'removeWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove window',
          }, 
          {
            opcode: 'removeTile',
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove tile id: [ID]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultVAlue: 'cat'
              }
            }
          }, 
          {
            opcode: 'getClicked',
            blockType: Scratch.BlockType.HAT,
            text: 'when card [NAME] clicked',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
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
                defaultValue: 'cat'
              }
            }
          },
          {
            opcode: 'getClicked2',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get current clicked card',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              }
            }
          },
          {
            opcode: 'setMaxHeight',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set max card height: [HEIGHT] px',
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 'cat'
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '100'
              },
            }
          },
          {
            opcode: 'getClicked3',
            blockType: Scratch.BlockType.HAT,
            text: 'when any card clicked',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              }
            }
          },
          {
            opcode: 'addLine',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add new text line to tile: [ID] text: [TEXT] style: [CSS]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cat'
              },
              CSS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'font-size: 10px'
              }
            }
          },
        ],
        menus: {
          elements: {
            acceptReporters: true,
            items: ['card', 'title', 'description', 'background']
          },
          css: {
            acceptReporters: true,
            items: ['color', 'border']            
          }
        }
      };
    }

    initialise({X, Y, WIDTH, HEIGHT}) {
      if(document.getElementById('window') == null) {
      const panel = document.createElement("div")
      panel.style = `
      width: ${WIDTH};
      height: ${HEIGHT};
      background-color: #00000041;
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

    addTile({TITLE, DESC, THUMB, ID, MENU}) {
      const card = document.createElement('div')
      const title = document.createElement('span')
      const desc = document.createElement('span')
      const thumb = document.createElement('img')
      const options = document.createElement('div')
      // const menu = JSON.parse(MENU)

      if(THUMB == '') {
        thumb.src = 'https://greedyallay.github.io/extensions/resources/IMG_5205.jpg'
            } else {
        thumb.src = THUMB
      }
      
      desc.textContent = DESC
      title.textContent = TITLE
      // options.textContent = '...'

      title.className = 'title'
      card.className = 'tile'
      desc.className = 'desc'
      thumb.className = 'thumb'
      // options.className = 'options'

      card.id = `card${ID}`

      card.appendChild(thumb)
      card.appendChild(title)
      card.appendChild(desc)
      // card.appendChild(options)

      card.addEventListener('pointerdown', () => {
        clickedButtons[ID] = true
      })
      card.addEventListener('pointerup', () => {
        clickedButtons[ID] = false
      })

      options.addEventListener('click' , () => {
        const list = document.createElement('div')
        list.className = 'list'

        for(let i = 0; i < menu.length; i++) {
          const item = document.createElement('div')
          item.textContent = menu[i]
          item.className = 'item'
          
          list.appendChild(item)
        }
        list.style.left = mouse.x-400+'px'
        list.style.top = mouse.y-200+'px'

        // list.style.left = ((mouse.x - max.ox) / max.w) + 'px';
        // list.style.top  = ((mouse.y - max.oy) / max.h) + 'px';
        console.log(mouse.x+mouse.y)
      Scratch.renderer.addOverlay(list, "scale")
      })
      document.getElementById('window').appendChild(card)
    }

    removeWindow() {
      const window = document.getElementById('window')
      if(window) {
      clickedButtons = {}
      window.remove()
      }

    }

    setStyle({ELEMENT, VALUE, CSS}) {
      const card = document.getElementsByClassName('tile')
      const window = document.getElementById('window')
      const text = document.getElementsByClassName('title')
      const desc = document.getElementsByClassName('desc')
      if(CSS == 'color') {
        if(ELEMENT == 'card') {
          for(let i = 0; i < card.length; i++) {
            card[i].style.backgroundColor = VALUE
          }
        } else if(ELEMENT == 'title') {
          for(let i = 0; i < text.length; i++) {
            text[i].style.color = VALUE
          }          
        } else if(ELEMENT == 'description') {
          for(let i = 0; i < desc.length; i++) {
            desc[i].style.color = VALUE
          }          
        } else if(ELEMENT == 'background') {
          window.style.backgroundColor = VALUE        
        }
      } else if(CSS == 'border') {
          if(ELEMENT == 'card') {
          for(let i = 0; i < card.length; i++) {
            card[i].style.borderColor = VALUE
          }
        }
      }

    }

    removeTile({ID}) {
      const element = document.getElementById(`card${ID}`)
      if(element) { element.remove() }
    }

    getClicked({NAME}) {
      if(NAME !== '') { if(clickedButtons[NAME]) { return clickedButtons[NAME] } }
    }
    getClicked1({NAME}) {
      if(NAME !== '') { if(clickedButtons[NAME]) { return clickedButtons[NAME] } }
    }
    getClicked2({NAME}) {
      if (NAME !== '') { return Object.keys(clickedButtons).find(key => clickedButtons[key]) || ''; }
    }

    getClicked3({NAME}) {
      if (NAME !== '') { return Object.keys(clickedButtons).some(key => clickedButtons[key]);
      }
    }
    
    addTitle({NAME}) {
      const title = document.createElement('span')
      const hr = document.createElement('hr')
      const br = document.createElement('br')
      const container = document.createElement('div')
      title.style.fontSize = '30px'
      title.style.fontWeight = '50px'
      title.textContent = NAME
      const window = document.getElementById('window')
      container.style.display = 'block'
      container.style.width = '100%'
      container.appendChild(br)
      container.appendChild(title)
      container.appendChild(hr)
      window.appendChild(container)
      
    }
    addOptions({OPTIONS}) {
      const tiles = document.getElementsByClassName("tile")
      for(let i = 0; i < tiles[i].length; i++) {
        tiles[j].textContent = 'nope'
        console.log(tiles[j].innerHTML)
      }

    }

    setMaxHeight({HEIGHT}) {
      const tiles = document.getElementsByClassName("tile")
      for(let i = 0; i < tiles.length; i++) { tiles[i].style = `max-height: ${HEIGHT}px` }
    }

    addLine({ID, TEXT, CSS}) {
      const card = document.getElementById(`card${ID}`)
      const el = document.createElement('span')
      el.textContent = TEXT
      el.style = CSS
      if(card) { card.appendChild(el) }
      
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
    color: white;
    overflow-y: hidden;
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
    color: white;
  }
  .desc {
    font-size: 10px
  }
  .window {
  display: flex;
  flex-direction: column
  backdrop-filter: blur(5px);
  }
  ::-webkit-scrollbar {
  display: none
  }
  .options {
  background-color: green;
  }
  .list {
  position: absolute;
  width: 200px;
  height: 200px;
  }
  .item {
  width: 100%;
  background-color: blue;
  }
  
  `
document.body.appendChild(style)
  
})(Scratch);


 for(let j = 0; j < OPTIONS.length; j++) {
          tiles[j].textContent = 'nope'
  }
