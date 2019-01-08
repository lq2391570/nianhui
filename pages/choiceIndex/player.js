const cax = require('../../component/cax/index.js')

class Player extends cax.Group {
  constructor() {
    super()
    this.sprite = new cax.Sprite({

      framerate: 4,
      imgs: ['../../assets/pig.png'],
      frames: [
        // x, y, width, height, originX, originY ,imageIndex 
        [0, 0, 50, 30],
        [50, 0, 50, 30],
        [100, 0, 50, 30],
        [150, 0, 50, 30]
      ],
      animations: {
        walk: {
          frames: [0, 1, 2, 3]
        }
      },
      currentAnimation: "walk"
    })

    this.sprite.originX = 0
    this.sprite.originY = 0
    this.sprite.scale = 0.6
    this.add(this.sprite)

    this.loading = new cax.Rect(25,20,{
      fillStyle: '#333'    })
    this.loading.y = 25
    this.add(this.loading)
  }

  update(width,callback) {
    if (!this.sprite.visible) {
      this.sprite.updateFrame()
    }
    if (this.sprite.x < width/5) {
      this.sprite.x += 0.9
      this.loading.width += 0.9
    } else if (this.sprite.x < width/2 - 30) {
      this.sprite.x += 2
      this.loading.width += 2
    } else if (this.sprite.x < width - 90) {
      this.sprite.x += 1.3
      this.loading.width += 1.3
    }
    if (this.sprite.x === width - 90) {
      callback()
    }
  }
  reset() {
    this.sprite.x = 0
    this.loading.width = 25
  }
}

module.exports = new Player()