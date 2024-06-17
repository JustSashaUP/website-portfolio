let scene, camera, renderer, mixer;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, 550 / 800, 0.1, 1000);
  camera.position.set(0, 1, 2);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(500, 700);
  renderer.setClearColor(0x000000, 0);
  document.getElementById("model-container").appendChild(renderer.domElement);

  const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemisphereLight);

  const pointLightFace = new THREE.PointLight(0xffffff, 2, 100);
  pointLightFace.position.set(5, 5, 5);
  scene.add(pointLightFace);

  const pointLightClothing = new THREE.PointLight(0xffffff, 1.5, 100);
  pointLightClothing.position.set(0, -5, 0);
  scene.add(pointLightClothing);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(-5, 10, 10);
  scene.add(directionalLight);

  const loader = new THREE.GLTFLoader();
  loader.load(
    "sources/models/model_animation_idle.glb",
    function (gltf) {
      const model = gltf.scene;
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });

      animate();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}

const clock = new THREE.Clock();

window.addEventListener("resize", () => {
  camera.aspect = 550 / 800;
  camera.updateProjectionMatrix();
  renderer.setSize(550, 800);
});

init();
