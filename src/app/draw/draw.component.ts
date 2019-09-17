import {Component, OnInit} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  constructor() {
  }


  ngOnInit() {
    optionBar();
    const canvas = <HTMLCanvasElement> document.getElementById('my');

    var coords = [];
    var mousePosition;
    var offset = [0, 0];
    var context = canvas.getContext('2d');
    canvas.addEventListener('click', function(event) {


      var coord = {'x': event.clientX, 'y': event.clientY};

      document.getElementById('coords').innerText = '{' + coord.x + ', ' + coord.y + '}';
      coords.push(coord);
      var max = coords.length - 1;
      if (typeof coords[max - 1] !== 'undefined') {
        mousePosition = {

          x: event.clientX,
          y: event.clientY

        };
        var curr = coords[max], prev = coords[max - 1];
        context.beginPath();
        context.moveTo(prev.x-8, prev.y-100);
        context.lineTo(mousePosition.x-8, mousePosition.y-100);

        context.stroke();
      }

    });

    function optionBar() {

      var mousePosition;
      var offset = [0, 0];
      var div;
      var isDown = false;

      div = document.getElementById('ob');

      div.addEventListener('mousedown', function(e) {
        isDown = true;
        offset = [
          div.offsetLeft - e.clientX,
          div.offsetTop - e.clientY
        ];
      }, true);

      document.addEventListener('mouseup', function() {
        isDown = false;
      }, true);

      document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown) {
          mousePosition = {

            x: event.clientX,
            y: event.clientY

          };
          div.style.left = (mousePosition.x + offset[0]) + 'px';
          div.style.top = (mousePosition.y + offset[1]) + 'px';
        }
      }, true);
    }


  }


  minimize() {
    var div, div2;

    div = document.getElementById('ob2');
    div2 = document.getElementById('ob');
    const style = getComputedStyle(div);
    const flag = style.display;
    if (flag === 'block') {

      div.style.display = 'none';
      div2.style.height = '30px';
      return;
    }
    if (flag === 'none') {
      div.style.display = 'block';
      div2.style.height = '400px';
      return;
    }

  }

}


