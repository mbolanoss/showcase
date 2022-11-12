let myShader;
let brightnessRadio;

let img;

let kernels = {
  none: [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],

  sharpen: [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ],

  emboss: [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2],
  ],

  blur: [
    [0.0625, 0.125, 0.0625],
    [0.125, 0.25, 0.125],
    [0.0625, 0.125, 0.0625],
  ],
};

function preload() {
  myShader = readShader("/showcase/sketches/image_processing/color.frag", {
    varyings: Tree.texcoords2,
  });

  img = loadImage("/showcase/sketches/image_processing/animal.jpg");
}

function setup() {
  createCanvas(img.width, img.height, WEBGL);
  noStroke();

  textureMode(NORMAL);
  shader(myShader);

  // User interaction
  brightnessRadio = createRadio();
  brightnessRadio.option(0, "None");
  brightnessRadio.option(1, "Luma");
  brightnessRadio.option(2, "Mean");
  brightnessRadio.option(3, "HSV");
  brightnessRadio.option(4, "HSL");
  brightnessRadio.selected(0);

  brightnessRadio.changed(() => {
    let mode = brightnessRadio.value();
    myShader.setUniform("brightnessTool", mode);
  });

  myShader.setUniform("texture", img);
  myShader.setUniform("brightnessTool", 1);
}

function draw() {
  background(0);

  quad(
    -width / 2,
    -height / 2,
    width / 2,
    -height / 2,
    width / 2,
    height / 2,
    -width / 2,
    height / 2
  );
}

function keyPressed() {
  // if (key == "c") {
  //   cmy = !cmy;
  //   // https://p5js.org/reference/#/p5.Shader/setUniform
  //   colorShader.setUniform("cmy", cmy);
  // }
}
