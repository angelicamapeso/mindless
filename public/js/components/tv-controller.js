const GIF_MATERIAL = {
  shader: "gif",
  src: "url(https://media.giphy.com/media/3o85xkFg46ZHS6vX8Y/giphy.gif)",
};

AFRAME.registerComponent("tv-controller", {
  init: function () {
    this.scene1Objects = document.querySelectorAll(".scene-1");
    this.scene2Objects = document.querySelectorAll(".scene-2");
    this.screens = document.querySelectorAll(".screen");
    this.inSceneTv = document.getElementById("tv-controller");
    this.carMusic = document.getElementById("car-music");
    this.carIgnition = document.getElementById("car-ignition");
    this.carAmbience = document.getElementById("car-ambience");
    this.showScene2 = false;

    this.handleClick = () => {
      this.showScene2 = !this.showScene2;

      for (const obj of this.scene2Objects) {
        if (obj.getAttribute("environment")) {
          obj.setAttribute("environment", "active", this.showScene2);
        } else {
          obj.setAttribute("visible", this.showScene2);
        }
      }
      for (const obj of this.scene1Objects) {
        obj.setAttribute("visible", !this.showScene2);
      }

      for (const screen of this.screens) {
        screen.removeAttribute("material");
        if (this.showScene2) {
          screen.setAttribute("material", GIF_MATERIAL);
          screen.setAttribute("gif", "");
        } else {
          screen.setAttribute("material", "color", "#000000");
          screen.removeAttribute("gif");
        }
      }

      if (this.showScene2) {
        this.inSceneTv.setAttribute("position", "1.040 0.524 -0.950");
        this.inSceneTv.setAttribute("rotation", "-6.312 -65.282 -6.943");

        this.carMusic.components.sound.playSound();
        this.carIgnition.components.sound.playSound();
        this.carAmbience.components.sound.playSound();
      } else {
        this.inSceneTv.setAttribute("position", "0 0.332 -1.814");
        this.inSceneTv.setAttribute("rotation", "0 0 0");

        this.carMusic.components.sound.pauseSound();
        this.carAmbience.components.sound.pauseSound();
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
