// https://www.materialpalette.com/colors
const COLORS = [
  "#cc1b0c", // DARK RED
  "#f44336", // RED
  "#e91e63", // PINK
  "#9c27b0", // PURPLE
  "#673ab7", // DEEP PURPLE
  "#3f51b5", // INDIGO
  "#2196f3", // BLUE
  "#29b6f6", // LIGHT BLUE
  "#4dd0e1", // CYAN
  "#4db6ac", // TEAL
  "#21ffc4", // BRIGHT TEAL
  "#198552", // DARKER GREEN
  "#4caf50", // GREEN
  "#8bc34a", // LIGHT GREEN
  "#d4e157", // LIME
  "#ffeb3b", // YELLOW
  "#ffb300", // AMBER
  "#fb8c00", // ORANGE
  "#ff5722", // DEEP ORANGE
  "#8d6e63", // BROWN
  "#9e9e9e", // GREY
  "#607d8b", // BLUE GREY
  "#000", // BLACK
  "#FFF", // WHITE
];


class ColorPicker {
  constructor(boardId) {
    this.keyboard = document.getElementById("keyboard");
    this.keys = keyboard.querySelectorAll('[data-key]');
    this.current = "#333";
  }

  init() {
    for (let i = 0; i < this.keys.length; i++) {
      const keyNum = Number(this.keys[i].getAttribute("data-key"));

      this.keys[i].style.backgroundColor = COLORS[keyNum];
      this.keys[i].setAttribute("color", COLORS[keyNum]);
      this.keys[i].addEventListener("click", (e) => {
        this.current = e.target.getAttribute("color");
        this.setKeyActive(keyNum)
      });
    }
  }

  setKeyActive(selectedKey) {
    for (let i = 0; i < this.keys.length; i++) {
      const keyNum = Number(this.keys[i].getAttribute("data-key"));

      if (keyNum === selectedKey) {
        this.keys[i].classList.add("active");
      } else {
        this.keys[i].classList.remove("active");
      }
    }
  }

  pick(key) {
    this.current = COLORS[key%(COLORS.length)];
    this.setKeyActive(key);
  }

}

export default ColorPicker;


