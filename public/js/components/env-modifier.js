AFRAME.registerComponent("env-modifier", {
  // Runs when object created
  init: function () {
    // setting scene variables
    this.scenes = ["ground", "water", "air"];
    [this.GROUND, this.WATER, this.AIR] = this.scenes;
    this.currentSceneIndex = 0;
    this.currentScene = this.GROUND;

    // Grab all scene objects
    this.sceneObjects = document.querySelectorAll(".scene-object");
    // Grab all scene environments
    this.sceneEnvironments = document.querySelectorAll(".scene-env");

    this.handleClick = () => {
      // set the scene index
      this.currentSceneIndex =
        this.currentSceneIndex + 1 >= this.scenes.length
          ? 0
          : this.currentSceneIndex + 1;

      // set the current scene
      this.currentScene = this.scenes[this.currentSceneIndex];
      clearScene(this.sceneObjects, this.sceneEnvironments);
      switch (this.currentScene) {
        case this.GROUND:
          setGroundScene(this.sceneObjects, this.sceneEnvironments);
          break;
        case this.WATER:
          console.log("Set water scene");
          break;
        case this.AIR:
          console.log("Set air scene");
          break;
        default:
          console.log("Invalid scene!");
      }
    };
  },

  // Runs after init and if object changes properties
  update: function () {
    const el = this.el;
    el.addEventListener("click", this.handleClick);
  },

  // Handle component removal
  remove: function () {
    const el = this.el;
    el.removeEventListener("click", this.handleClick);
  },
});

function clearScene(sceneObjects, sceneEnvironments) {
  sceneObjects.forEach((object) => object.setAttribute("visible", false));
  sceneEnvironments.forEach((environment) => {
    if (environment.id != "ground-env") {
      environment.setAttribute("visible", false);
    } else {
      environment.setAttribute("environment", "active", false);
    }
  });
}

function getSceneModel(id, sceneModels) {
  for (const sceneModel of sceneModels) {
    if (sceneModel.getAttribute("id") === id) {
      return sceneModel;
    }
  }
}

function setGroundScene(sceneObjects, sceneEnvironments) {
  // Get ground obj
  const groundObject = getSceneModel("ground-object", sceneObjects);
  // Get ground env
  const groundEnvironment = getSceneModel("ground-env", sceneEnvironments);

  groundObject.setAttribute("visible", true);
  groundEnvironment.setAttribute("environment", "active", true);
}
