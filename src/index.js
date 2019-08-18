// import { Blotter } from '../libs/blotter.min.js'
// import { LiquidDistortMaterial } from '../materials/liquidDistortMaterial.min.js'

let textArray = Array.from("Physics").map(
  char =>
    new Blotter.Text(String(char), {
      family: "Berkshire Swash",
      weight: 180,
      size: "100",
      fill: "#ffffFF",
      paddingLeft: 4,
      paddingRight: 15
    })
);

const material = new Blotter.LiquidDistortMaterial();
material.uniforms.uSpeed.value = 0.5;
material.uniforms.uVolatility.value = 0.02;
let touched = "notTouched";

for (let v in textArray) {
  const div = document.createElement("div");
  div.id = `panel${v}`;
  document.body.appendChild(div);

  const incrVolatility = event => {
    let timeout = 0;
    if (touched === "notTouched") {
      touched = "touched";
    }
    console.log(touched);
    if (touched === "touched") {
      for (let i = material.uniforms.uVolatility.value; i < 0.2; i += 0.005) {
        timeout += 50;
        setTimeout(() => {
          material.uniforms.uVolatility.value = i;
          material.uniforms.uSpeed.value -= 0.0005;
        }, timeout);
      }
    }
  };

  const decrVolatility = event => {
    let timeout = 0;

    if (touched === "touched") {
      for (let i = material.uniforms.uVolatility.value; i > 0.02; i -= 0.005) {
        timeout += 50;
        setTimeout(() => {
          material.uniforms.uVolatility.value = i;
        }, timeout);
      }
    }
  };

  // Input Listeners
  div.addEventListener("mouseenter", incrVolatility);
  div.addEventListener("mouseleave", decrVolatility);
  div.addEventListener("touchstart", incrVolatility);
  div.addEventListener("touchend", decrVolatility);

  const blotter = new Blotter(material, { texts: textArray[v] });
  const scope = blotter.forText(textArray[v]);
  scope.appendTo(div);
}
