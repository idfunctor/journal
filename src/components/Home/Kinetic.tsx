// @ts-nocheck

import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { onMount } from "solid-js";
import { simplexNoise } from "./simplexNoise";

export function Kinetic() {
  onMount(() => {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color("#f5f5f5");
    let camera = new THREE.PerspectiveCamera(
      60,
      innerWidth / innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 1).setLength(650);
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    document.querySelector("#threejs-scene")!.appendChild(renderer.domElement);
    window.addEventListener("resize", (event) => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });

    let gu = {
      time: { value: 0 },
    };

    const loader = new FontLoader();
    loader.load(
      "/fonts/display.json",
      // "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      function (font) {
        const color = new THREE.Color("#444").getHex();

        const matDark = new THREE.LineBasicMaterial({
          color: color,
          onBeforeCompile: (shader) => {
            shader.uniforms.time = gu.time;
            shader.vertexShader = `
          uniform float time;
          attribute float phase;
          ${simplexNoise}
          ${shader.vertexShader}
        `.replace(
              `#include <begin_vertex>`,
              `#include <begin_vertex>
            float t = time * 0.1;
            vec3 pos = position;
            pos.x += sin(phase + t) * 300.;
            
            float nX = snoise(vec3(pos.xy / 500. + 500., t));
            float nY = snoise(vec3(pos.xy / 500. + 1000., t));
            float nZ = snoise(vec3(pos.xy / 500. + 1500., t));
            
            pos += vec3(nX, nY, nZ) * vec3(3, 1, 3) * 20.;
            
            transformed = pos;
          `
            );
          },
        });
        const tileGs = makeFontShapes(font, "PASSIONATE ENGINEER * MEDIOCRE ARTIST *");

        let tiles = BufferGeometryUtils.mergeBufferGeometries(tileGs);

        const line = new THREE.LineSegments(tiles, matDark);
        line.rotation.set(-0.75, 0.1, 0.1);
        scene.add(line);
      }
    );

    let clock = new THREE.Clock();

    renderer.setAnimationLoop(() => {
      let t = clock.getElapsedTime();
      gu.time.value = t;
      renderer.render(scene, camera);
    });
  });

  return (
    <div id="threejs-scene" />
  )
}

function makeFontShapes(font, message: string) {
  const shapes = font.generateShapes(message, 60);

  // make line shape ( N.B. edge view remains visible )

  const holeShapes = [];

  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];

    if (shape.holes && shape.holes.length > 0) {
      for (let j = 0; j < shape.holes.length; j++) {
        const hole = shape.holes[j];
        holeShapes.push(hole);
      }
    }
  }

  shapes.push.apply(shapes, holeShapes);

  let gs = [];
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];

    const points = getSegments(shape.getSpacedPoints(200));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    gs.push(geometry);
  }

  let geometry = BufferGeometryUtils.mergeBufferGeometries(gs);
  geometry.center();

  let box3 = new THREE.Box3().setFromBufferAttribute(
    geometry.attributes.position
  );
  let size = new THREE.Vector3();
  box3.getSize(size.multiplyScalar(10));

  const tileGs = [];
  const tileCount = 7;
  for (let i = 0; i < tileCount; i++) {
    let phase = Math.random() * Math.PI * 2;
    for (let j = 0; j < tileCount; j++) {
      let gTile = geometry.clone();
      gTile.translate(
        (-(tileCount - 1) * 0.5 + j) * size.x * 1.2,
        (-(tileCount - 1) * 0.5 + i) * size.y * 1.2,
        0
      );
      setAttributes(gTile, phase);
      tileGs.push(gTile);
    }
  }

  return tileGs;
}

function setAttributes(g, phase) {
  let arrPhase = new Array(g.attributes.position.count).fill(phase);
  g.setAttribute("phase", new THREE.Float32BufferAttribute(arrPhase, 1));
}

function getSegments(pts) {
  let points = [];
  for (let i = 0; i < pts.length - 1; i++) {
    points.push(pts[i].clone(), pts[i + 1].clone());
  }
  return points;
}