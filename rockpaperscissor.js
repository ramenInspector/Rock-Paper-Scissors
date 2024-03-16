class rpsInstance {
    constructor(type, size) {
        this.radius = size
        this.realPosition = createVector(this.realX, this.realY)
        this.position = createVector(this.x, this.y)
        this.realPosition.realX = random(100, width - 100 - this.radius)
        this.realPosition.realY = random(100, height - 100 - this.radius)
        this.position.x = this.realPosition.realX
        this.position.y = this.realPosition.realY
        this.rot = random(1, 360)
        this.rotDir = random([-1, 1])
        this.rotSpeed = 1
        this.xDir = random([-1, 1])
        this.yDir = random([-1, 1])
        this.speed = this.radius / 5
        this.type = type
        this.tint = 255
        this.lerpSpeed = 0.2

        this.padding = 40
    }

    update() {
        //MOVING AND ROTATES THE RECTANGLES
        
        this.xDir = random([-1, 1])
        this.yDir = random([-1, 1])

        if (this.realPosition.realX < 0 + this.padding) {
            this.realPosition.realX += this.speed
        }
        if (this.realPosition.realX > width - this.padding) {
            this.realPosition.realX += -this.speed
        }
        if (this.realPosition.realY < 0 + this.padding) {
            this.realPosition.realY += this.speed
        }
        if (this.realPosition.realY > height - this.padding) {
            this.realPosition.realY += -this.speed
        }

        this.position.x = lerp(this.position.x, this.realPosition.realX, this.lerpSpeed)
        this.position.y = lerp(this.position.y, this.realPosition.realY, this.lerpSpeed)

        this.rot += this.rotDir * this.rotSpeed

        this.realPosition.realX += this.xDir * this.speed
        this.realPosition.realY += this.yDir * this.speed

        this.tint += 10
    }

    show() {
        //SHOWS THE RECTANGLES

        push()

        translate(this.position.x, this.position.y)
        angleMode(DEGREES)
        rotate(this.rot)

        strokeWeight(5)
        noFill()

        tint(255, this.tint, this.tint)

        rectMode(CENTER)
        if (this.type == 'rock') {
            image(rock, 0, 0, this.radius, this.radius)
        } else if (this.type == 'paper') {
            image(paper, 0, 0, this.radius, this.radius)
        } else if (this.type == 'scissors') {
            image(scissors, 0, 0, this.radius, this.radius)
        }

        pop()
    }

    detectFor(other) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (distance < this.radius + other.radius) {
            //WINS
            if (this.type == 'rock' && other.type == 'scissors') {
                return true
            } else if (this.type == 'paper' && other.type == 'rock') {
                return true
            } else if (this.type == 'scissors' && other.type == 'paper') {
                return true
            }
            //LOSSES
            if (this.type == 'rock' && other.type == 'paper') {
                return false
            } else if (this.type == 'paper' && other.type == 'scissors') {
                return false
            } else if (this.type == 'scissors' && other.type == 'rock') {
                return false
            }
            //TIE
            if (this.type == other.type) {
                return false
            }
        }
    }
}