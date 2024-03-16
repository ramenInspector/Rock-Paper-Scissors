class hitParticle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.rot = random(0, 360);
        this.xSpeed = random(-4, 4);
        // Random initial upward velocity added
        this.ySpeed = random(-6, -2); // Adjusted range for upward velocity
        this.xAcc = 0; // No initial horizontal acceleration
        this.yAcc = 0.4; // Gravity
        this.size = size;
        this.alpha = 255;
    }

    update() {
        // Update x and y positions based on speed
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Update x and y speeds based on acceleration
        this.xSpeed += this.xAcc;
        this.ySpeed += this.yAcc;

        // Add rotation
        this.rot += 1;

        // Decrease alpha for fade-out effect
        this.alpha -= 7;

        // Draw the particle
        push();
        angleMode(DEGREES);
        rectMode(CENTER);
        translate(this.x, this.y);
        rotate(this.rot);
        noStroke();
        fill(255, 255, 255, this.alpha);
        rect(0, 0, this.size);
        pop();
    }

    isDead() {
        // Check if particle's alpha has faded out
        return this.alpha <= 0;
    }
}
