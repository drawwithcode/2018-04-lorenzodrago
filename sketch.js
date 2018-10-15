var balls = [];
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    noStroke();
    strokeWeight(1);
    rectMode(CENTER);
    var ballNumber = 50;
    for (i=0;i<ballNumber;i++) {
        var newBall = new Ball(random(100,width-100),random(100,height-100),random(-3,3),random(-3,3),0,0,random(20,80));
        balls.push(newBall);

    }
    mouseX = width/2;
    mouseY = height/2;


}
var posX, posY, gravX, gravY;
var rectSize = 100;
var tutOver = false;
function draw() {
    background(20,30,40);
    noFill();
    stroke(50);
    if (mouseX>width/2-rectSize/2 && mouseX<width/2+rectSize/2) {
        fill(50);
    } else {
        noFill();
    }
    rect(width/2,height/4, rectSize, height/2);
    rect(width/2,height*0.75, rectSize, height/2);
    if (mouseY>height/2-rectSize/2 && mouseY<height/2+rectSize/2) {
        fill(50);
    } else {
        noFill();
    }
    rect(width/4,height/2, width/2, rectSize);
    rect(width*0.75,height/2,width/2,rectSize);
    fill(50);
    if (mouseX>width/2-rectSize/2 && mouseX<width/2+rectSize/2 && mouseY>height/2-rectSize/2 && mouseY<height/2+rectSize/2) {
        fill(20,30,40);
    } else {
        fill(50);
    }
    rect(width/2,height/2,rectSize,rectSize);
    if (mouseX<width/2+rectSize/2 && mouseX>width/2-rectSize/2) {
        posX = width/2;
    } else {
        posX = mouseX;
    }
    if (mouseY<height/2+rectSize/2 && mouseY>height/2-rectSize/2) {
        posY = height/2;
    } else {
        posY = mouseY;
    }
    fill(50);
    gravX = (posX-width/2)/width*0.5;
    gravY = (posY-height/2)/height*0.5;
    push();
    noFill()
    stroke(200);
    ellipse(width/2,height/2,70);
    translate(width/2,height/2);
    line(0,0,gravX*100,gravY*100);
    pop();
    for(j=0;j<balls.length;j++){
        var gravity = createVector(gravX*balls[j].mass,gravY*balls[j].mass);

        balls[j].applyForce(gravity);
        balls[j].update();

        if (mouseIsPressed) {
            fill(200);
            balls[j].velocity.x += random(-3,3);
            balls[j].velocity.y += random(-3,3);
            tutOver=true;
        }
        balls[j].display();
        balls[j].checkEdges();

    }
    noStroke();
    //fill(255,100);
    //text('Y Gravity: '+Math.floor(gravX*1000), 50, 50);
    //text('X Gravity: '+Math.floor(gravY*1000), 50, 70);



    textSize(20);
    textAlign(CENTER);
    if (!tutOver) {
      fill(0);
      //rect(width/2, height/2, width, height);
      fill(255);
      text('Control gravity with mouse movement. Click to scatter.', width/2, height*0.9);
    }


}

function Ball(x,y,velX,velY,accX,accY,diameter) {
    this.color = [random(100,250),random(10,150),200];
    this.diameter = diameter;
    this.position = createVector(x,y);
    this.velocity = createVector(velX,velY);
    this.acceleration = createVector(accX,accY);
    this.mass = this.diameter^2/1000;
    this.display = function() {
        noStroke();
        stroke(this.color);
        ellipse(this.position.x,this.position.y,this.diameter);
    }
}

Ball.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force,this.mass);
  this.acceleration.add(f);
};

Ball.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acceleration);
  // position changes by velocity
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acceleration.mult(0);
};
var dampFactor = -0.8;
Ball.prototype.checkEdges = function() {
  if (this.position.y > (height - this.diameter/2)) {
    // A little dampening when hitting the bottom
    this.velocity.y *= dampFactor;
    this.velocity.x *= 0.99;
    this.position.y = (height - this.diameter/2);
  }
  if (this.position.x > (width - this.diameter/2)) {
    // A little dampening when hitting the bottom
    this.velocity.x *= dampFactor;
    this.velocity.y *= 0.99;
    this.position.x = (width - this.diameter/2);
  }
  if (this.position.y < (this.diameter/2)) {
    // A little dampening when hitting the bottom
    this.velocity.y *= dampFactor;
    this.velocity.x *= 0.99;
    this.position.y = (this.diameter/2);
  }
  if (this.position.x < (this.diameter/2)) {
    // A little dampening when hitting the bottom
    this.velocity.x *= dampFactor;
    this.velocity.y *= 0.99;
    this.position.x = (this.diameter/2);
  }


};
function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
