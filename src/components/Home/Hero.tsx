import type { JSXElement } from "solid-js";

import "./hero.scss";

// const adjectives = ["Passionate", "Meticulous", "Mediocre  "];

// const nouns = ["Engineer ", "Developer", "Artist   "];

export function Hero(): JSXElement {
  // const [word, setWord] = createSignal(0);

  // let timer: NodeJS.Timer | null = null;

  // onMount(() => {
  //   if (!timer) {
  //     timer = setInterval(() => {
  //       setWord((p) => (p === 2 ? 0 : p + 1));
  //     }, 4200);
  //   }
  // });

  // onCleanup(() => {
  //   if (timer) {
  //     clearInterval(timer);
  //   }
  // });

  return (
    <div class="HOMEHERO relative h-screen">
      <span
        class="HOMEHERO_hero-title-row flex justify-between text-8xl"
        id="hero-container"
      >
        {/* <div class="top-text absolute">
          {adjectives?.[0]?.split("").map((_, k) => (
            <Presence exitBeforeEnter>
              <Rerun on={word()}>
                <Motion.span
                  class="font-serif motion-span"
                  initial={{ opacity: 0, scale: 0.6, y: -50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: -50 }}
                  transition={{
                    duration: 0.1,
                    delay: k * 0.03,
                    easing: "ease-in-out",
                  }}
                >
                  {(adjectives[word()] as string)[k]}
                </Motion.span>
              </Rerun>
            </Presence>
          ))}
        </div>

        <div class="bottom-text absolute">
          {nouns?.[0]?.split("").map((_, k) => (
            <Presence exitBeforeEnter>
              <Rerun on={word()}>
                <Motion.span
                  class="font-serif motion-span"
                  initial={{ opacity: 0, scale: 0.6, y: 80 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: 80 }}
                  transition={{
                    duration: 0.1,
                    delay: k * 0.01 + 0.25,
                    easing: "ease-out",
                  }}
                >
                  {(nouns[word()] as string)[k]}
                </Motion.span>
              </Rerun>
            </Presence>
          ))}
        </div> */}
      </span>
      <div class="circle">
        <div class="logo"></div>
        <div class="text">
          {" Aviral Kulshreshtha | Aviral Kulshreshtha |"
            .split("")
            .map((char, i) => (
              <span style={{ transform: `rotate(${i * 8.2}deg)` }}>{char}</span>
            ))}
        </div>
      </div>
      <span class="HOMEHERO_line"></span>
    </div>
  );
}
