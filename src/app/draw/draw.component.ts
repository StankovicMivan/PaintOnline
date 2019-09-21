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

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    // alert(window.innerHeight);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var mouse = false;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    var positionX, positionY;

    var brush = document.getElementById("brush"); //Brush
    var eraser = document.getElementById("erase"); //Eraser
    var color = document.getElementById("myColor") as HTMLElement; //Color
    var size = document.getElementById("myRange"); //Size
    var reset = document.getElementById("reset"); //reset
    var saveLink = document.getElementById("saveLink"); //saveLink element

    var myColor = color.value;
    ctx.strokeStyle = myColor;
//Set initial size conditions
    var mySize = size.value;
    ctx.lineWidth = mySize;

    brush.style.border = "2px solid red";
    canvas.style.cursor = "pointer";

    canvas.addEventListener("mousedown", brushDown, false);
    canvas.addEventListener("mousemove", brushMove, false);
    canvas.addEventListener("mouseup", brushUp, false);

//4. Color change conditions
    function colorChange() {
      myColor = color.value;
      ctx.strokeStyle = myColor;
    }

//5. Size change conditions
    function sizeChange() {
      mySize = size.value;
      ctx.lineWidth = mySize;
    }

//2.Make brush work
    function getCoordinates(canvas, e) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    function brushDraw(canvas, positionX, positionY) {
      if(mouse) {
        ctx.lineTo(positionX, positionY);
        ctx.stroke();
        canvas.style.cursor = "pointer";
      }
    }

    function brushDown(e) {
      mouse = true;
      var coordinates = getCoordinates(canvas, e);
      canvas.style.cursor = "pointer";
      positionX = coordinates.x;
      positionY = coordinates.y;
      ctx.beginPath();
      ctx.moveTo(positionX, positionY);
      ctx.lineTo(positionX, positionY);
      ctx.stroke();
    }

    function brushMove(e) {
      var coordinates = getCoordinates(canvas, e);
      positionX = coordinates.x;
      positionY = coordinates.y;
      brushDraw(canvas, positionX, positionY);
    }

    function brushUp() {
      mouse = false;
      canvas.style.cursor = "default";
    }

    function brushClick() {
      var brushColor = document.getElementById("myColor");
      ctx.strokeStyle = brushColor.value;
      brush.style.border = "2px solid red";
      eraser.style.border = "none";

      canvas.addEventListener("mousedown", brushDown, false); //bubble phase
      canvas.addEventListener("mousemove", brushMove, false);
      canvas.addEventListener("mouseup", brushUp, false);
    }

//3. Making the eraser work
    function eraserClick() {
      ctx.strokeStyle = "white";
      eraser.style.border = "2px solid red";
      brush.style.border = "none";

      canvas.addEventListener("mousedown", brushDown, false);
      canvas.addEventListener("mousemove", brushMove, false);
      canvas.addEventListener("mouseup", brushUp, false);
    }

//6. Making the reset button work
    function resetClick() {
      window.location.reload();
    }

//7. Making the save button work
    function saveClick() {
      var data = canvas.toDataURL(); //encodes image information into a base 64 format
      console.log(data);
      saveLink.href = data;
      saveLink.download = "myImage.png";
    }

//Event Listeners for tools
    brush.addEventListener("click", brushClick); //Brush click event
    eraser.addEventListener("click", eraserClick); //Eraser click event
    color.addEventListener("change", colorChange); //Color change event
    size.addEventListener("change", sizeChange); //Size change event
    reset.addEventListener("click", resetClick); //Reset click event
    saveLink.addEventListener("click", saveClick); //Save click event

    optionBar();


    function optionBar() {

      let mousePosition;
      let offset = [0, 0];
      let div;
      let isDown = false;

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



  cursor() {
    let button;
    let mousePosition;
    button = document.getElementById('cursor');
    const canvas = document.getElementById('my') as HTMLCanvasElement;
    let context = canvas.getContext('2d');
    canvas.addEventListener('click', function(event) {
      context.beginPath();
      // context.rect("500","500","200","100");
      // context.strokeRect(event.clientX,event.clientY,"200","100");
    });
    alert("selected");
    // button.classList.add("btn-disable");

  }
  drawLine() {
    const canvas = document.getElementById('my') as HTMLCanvasElement;

    let coords = [];
    let mousePosition;
    let offset = [0, 0];
    let context = canvas.getContext('2d');
    canvas.addEventListener('click', function(event) {


      let coord = {x: event.clientX, y: event.clientY};

      // document.getElementById('coords').innerText = '{' + coord.x + ', ' + coord.y + '}';
      coords.push(coord);
      let max = coords.length - 1;
      if (typeof coords[max - 1] !== 'undefined') {
        mousePosition = {

          x: event.clientX,
          y: event.clientY

        };
        let curr = coords[max], prev = coords[max - 1];
        context.beginPath();
        context.moveTo(prev.x - 8, prev.y - 70);
        context.lineTo(mousePosition.x - 8, mousePosition.y - 70);

        context.stroke();
        return context;

      }

    });
  }

  minimize() {
    let div, div2;

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


