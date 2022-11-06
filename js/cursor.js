document.addEventListener('DOMContentLoaded', () => {

    const followCursor = () => { // объявляем функцию followCursor
      const el = document.querySelector('.follow-cursor') // ищем элемент, который будет следовать за курсором
  
      window.addEventListener('mousemove', e => { // при движении курсора
        const target = e.target // определяем, где находится курсор
        if (!target) return
  
        if (target.closest('a')) { // если курсор наведён на ссылку
          el.classList.add('follow-cursor_active') // элементу добавляем активный класс
        } else { // иначе
          el.classList.remove('follow-cursor_active') // удаляем активный класс
        }
  
        el.style.left = e.pageX + 'px' // задаём элементу позиционирование слева
        el.style.top = e.pageY + 'px' // задаём элементу позиционирование сверху
      })
    }
  
    followCursor() // вызываем функцию followCursor
  
  })

var canvas = document.getElementById("blur_cursor");
var context = canvas.getContext("2d");
var width = document.body.offsetWidth;
var height = document.body.offsetHeight;
var points = [], cursor = [-100, -100];
var t = 0;

var radius = 50;
var period = 1000;
var color = "#f00";
var blur = 50;
var cursorRadius = 10;

canvas.style.width = canvas.width = width;
canvas.style.height = canvas.height = height;
context.fillStyle = color;
var filter = context.filter = "blur(" + blur + "px)";
var dr = radius / period;

function draw() {
  context.clearRect(0, 0, width, height);
  let i = 0;
  let deleted = 0;
  let dt = -t + (t = window.performance.now());
  context.beginPath();
  while (i++ < points.length-1) {
    let p = points[i];
    let r = radius - (p[2] += dt) * dr;
    context.moveTo(p[0], p[1]);
    if (p[2] <= period) context.arc(p[0], p[1], r, 0, 2*Math.PI, true);
    else deleted = i;
  }
  context.fill();
  points.splice(0, deleted);
  context.beginPath();
  context.arc(cursor[0], cursor[1], cursorRadius, 0, 2*Math.PI, true);
  context.filter = "none";
  context.fill();
  context.filter = filter;
  window.requestAnimationFrame(draw);
}

window.onmousemove = function(event) {
  let x = event.pageX;
  let y = event.pageY;
  points.push([x, y, 0]);
  cursor = [x, y];
}

t = window.performance.now();
window.requestAnimationFrame(draw);
  