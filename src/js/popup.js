import { getDataCount, getCurrentUrl } from "./models/actions.js";

getDataCount();
getCurrentUrl();
//functions

function toggleActiveState() {
    this.classList.toggle('active');
}

var btns = document.querySelectorAll('.btn');
[].forEach.call(btns, function (btn) {
    btn.addEventListener('click', toggleActiveState, false);
});
