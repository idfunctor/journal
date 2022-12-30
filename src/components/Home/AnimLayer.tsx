import { JSXElement, onMount } from "solid-js";

import { animate, scroll } from "motion";

import "./anim-layer.scss";

export function AnimLayer(): JSXElement {
  onMount(() => {
    scroll(
      animate(document.querySelector("#asterisk-container")!, {
        transform: ["translateY(-10rem)", "translateY(-10vh) rotate(90deg)", "translateY(-10vh) rotate(270deg)", "translateY(-30vh)"],
      }),
      {
        offset: ["start end", "end end"],
      }
    );

    scroll(
      animate(document.querySelector("#asterisk-container > img")!, {
        opacity: [1, 0.4, 0.1],
      }),
      {
        target: document.querySelector('.HOMEHERO')!,
        offset: ["center", "end start"],
      }
    );


    scroll(
      animate(document.querySelector("#asterisk-container > img")!, {
        scale: [0.8, 0.9, 1, 3, 12, 30, 70, 100],
        rotate: [0, -90, 180],
        opacity: [1.8],
      }),
      {
        target: document.querySelector('#bottom-section')!,
        offset: ["start end", "end end"],
      }
    );
  });

  return (
    <div class="ANIMLAYER object-layer-one fixed">
      <div class="astrx object-layer-1" id="asterisk-container">
        <img src="/creatives/astrx.svg" />
      </div>
    </div>
  );
}
