var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

var monSprite;

var game = new Phaser.Game(config);

function preload()
{    
    this.load.image('background', 'assets/background.png');
    this.load.image('water', 'assets/water.png');
    this.load.spritesheet('ball', 'assets/ball.png', { frameWidth: 50, frameHeight: 50 });
    this.load.image('wall', 'assets/wall.png');
    this.load.image('flag', 'assets/flag.png');
}

function create()
{
//création du fond et des platforms
    this.add.image(400, 300, 'background');
    water = this.physics.add.image(Phaser.Math.Between(100, 400),525, 'water');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 120, 'wall');
    platforms.create(Phaser.Math.Between(100, 400), 210, 'wall');
    platforms.create(Phaser.Math.Between(100, 400), 300, 'wall');
    platforms.create(Phaser.Math.Between(100, 400), 400, 'wall');
    platforms.create(Phaser.Math.Between(100, 400), 450, 'wall');
    platforms.create(Phaser.Math.Between(800, 400), 210, 'wall');
    platforms.create(Phaser.Math.Between(800, 400), 300, 'wall');
    platforms.create(Phaser.Math.Between(800, 400), 400, 'wall');
    platforms.create(Phaser.Math.Between(800, 400), 450, 'wall');
    

// Creation du drapeau

    flag = this.physics.add.image(400, 20, 'flag');
    flag.setScale(0.3);
    flag.setSize(100,300);

// Charcgement et configuration de la ball
    monSprite = this.physics.add.sprite(600, 500, 'ball');
    monSprite.body.collideWorldBounds= true;
    monSprite.setBounce(0.45);

// Input des touches
    cursors = this.input.keyboard.createCursorKeys();

// Animation de la balle
    this.anims.create({
        key: 'animation',
        frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: 1
    });

    this.physics.add.collider(monSprite, platforms);
    this.physics.add.collider(monSprite, water, green, null, this);
    water.body.collideWorldBounds= true;
    this.physics.add.collider(flag, platforms);
    this.physics.add.collider(monSprite, flag, finish, null, this)
}

function update()
{
    if (cursors.up.isDown && monSprite.body.onFloor())
    {
        monSprite.setVelocityY(-600);
    }

    if (cursors.left.isDown)
    {
        monSprite.setVelocityX(-160);
        monSprite.angle = monSprite.angle-10
        monSprite.anims.play('animation', true);
        monSprite.setDamping(true);

    }
    else if (cursors.right.isDown)
    {
        monSprite.setVelocityX(160);
        monSprite.angle = monSprite.angle+10
        monSprite.anims.play('animation', true);
        monSprite.setDamping(true);
    }
    else
    {
        monSprite.setVelocityX(0);
        monSprite.setBounce(0.2);
    }
}

function finish()
{
    const textFinish = this.add.text(200, 100, "Finish !").setFont('128px Arial').setColor('#FF6600');
}

function green()
{
    monSprite.setX(600).setY(500);
}