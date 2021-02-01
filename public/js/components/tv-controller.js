// Art 3D GIF By Todd Rochefor (http://gph.is/1AN0uzk)
const GIF_MATERIAL = {
  shader: "gif",
  src: "url(https://media.giphy.com/media/3o85xkFg46ZHS6vX8Y/giphy.gif)",
};

AFRAME.registerComponent("tv-controller", {
  init: function () {
    const scene1Objects = document.querySelectorAll(".scene-1");
    const scene2Objects = document.querySelectorAll(".scene-2");
    const screens = document.querySelectorAll(".screen");
    const inSceneTv = document.getElementById("tv-controller");
    const carMusic = document.getElementById("car-music");
    const carIgnition = document.getElementById("car-ignition");
    const carAmbience = document.getElementById("car-ambience");
    this.showScene2 = false;
    this.timeout = null;

    this.handleClick = () => {
      this.showScene2 = !this.showScene2;

      if (this.showScene2) {
        // play ignition and change screen first
        handleIgnition(true, carIgnition);
        handleScreen(true, screens);

        // handle scene change after delay
        this.timeout = setTimeout(() => {
          handleAmbience(true, carMusic, carAmbience);
          handleScene1(true, scene1Objects);
          handleScene2(true, scene2Objects);
          handleInSceneTV(true, inSceneTv);
        }, 1100);
      } else {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        handleIgnition(false, carIgnition);
        handleScreen(false, screens);
        handleAmbience(false, carMusic, carAmbience);
        handleScene1(false, scene1Objects);
        handleScene2(false, scene2Objects);
        handleInSceneTV(false, inSceneTv);
      }
    };
  },

  update: function () {
    const el = this.el;
    el.addEventListener("click", this.handleClick);
  },

  remove: function () {
    const el = this.el;
    el.removeEventListener("click", this.handleClick);
  },
});

function handleAmbience(showScene2, ...ambientAudio) {
  for (const audio of ambientAudio) {
    if (showScene2) {
      audio.components.sound.playSound();
    } else {
      audio.components.sound.pauseSound();
    }
  }
}

function handleIgnition(showScene2, ignition) {
  if (showScene2) {
    ignition.components.sound.playSound();
  } else {
    ignition.components.sound.stopSound();
  }
}

function handleScene2(showScene2, scene2Objects) {
  for (const obj of scene2Objects) {
    if (obj.getAttribute("environment")) {
      obj.setAttribute("environment", "active", showScene2);
    } else {
      obj.setAttribute("visible", showScene2);
    }
  }
}

function handleScene1(showScene2, scene1Objects) {
  for (const obj of scene1Objects) {
    obj.setAttribute("visible", !showScene2);
  }
}

function handleScreen(showScene2, screens) {
  for (const screen of screens) {
    screen.removeAttribute("material");
    if (showScene2) {
      screen.setAttribute("material", GIF_MATERIAL);
      screen.setAttribute("gif", "");
    } else {
      screen.setAttribute("material", "color", "#000000");
      screen.removeAttribute("gif");
    }
  }
}

function handleInSceneTV(showScene2, inSceneTv) {
  if (showScene2) {
    inSceneTv.setAttribute("position", "1.040 0.524 -0.950");
    inSceneTv.setAttribute("rotation", "-6.312 -65.282 -6.943");
  } else {
    inSceneTv.setAttribute("position", "0 0.332 -1.814");
    inSceneTv.setAttribute("rotation", "0 0 0");
  }
}
