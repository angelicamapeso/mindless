AFRAME.registerComponent("light-controller", {
  init: function () {
    this.carLight = document.getElementById("car-light");
    this.isOn = false;
    this.handleClick = () => {
      this.isOn = !this.isOn;

      if (this.isOn) {
        this.carLight.setAttribute("light", "intensity", 1.49);
        this.carLight.setAttribute("material", "emissiveIntensity", 0.53);
      } else {
        this.carLight.setAttribute("light", "intensity", 0);
        this.carLight.setAttribute("material", "emissiveIntensity", 0.08);
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
