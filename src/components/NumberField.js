import styled from 'styled-components'
import {useState, useEffect, useRef} from 'react';
import { lerp } from '../utils/mathUtils';

export default function NumberField({count = 100,  min = 10, max = 100, minSize = 0, maxSize = 50, colorMin = "#000000", colorMax = "#ffffff", colorBlink = "#ffffff", background = '#232323'}) {
    var updateNums = (numberData, count, direction, fillViewPort) => {
        let newNums = numberData.filter(x => x.x > -1.5 && x.x < 1.5 && x.y > -1.5 && x.y < 1.5 && x.z > 0);
        
        while(newNums.length < count) {
            let x = Math.random() * 3 - 1.5, y = Math.random() * 3 - 1.5;
            if(!fillViewPort) {
                var selection = Math.random();
                if(selection < 0.5) { // x: in view, y: out of view
                    y = Math.random() * 0.5 + (Math.random() > 0.9 ? 1 : -2);
                } else { 
                    x = Math.random() * 0.5 + (Math.random() > 0.9 ? 1 : -2);
                }
            }
            var baseColor =  interpolateHexColor(colorMin, colorMax, Math.random())
            newNums.push({
                x, y, z: Math.random() * 2,
                baseColor,
                color: baseColor,
                fontSize: lerp(minSize, maxSize, Math.random()),
                val: Math.floor(lerp(min, max, Math.random())), 
                // Animation
                blink: 0,
                lerpVal: 0,
            })
        }

        if(direction) {
            newNums.forEach(x => {
                let speed = 0.01;
                x.x += direction.x * speed * x.z;
                x.y += direction.y * speed * x.z;

                if(x.blink === 0) {
                    var rd = Math.random();
                    if(rd > 0.999) x.blink = 1;
                } else {
                    x.lerpVal = clamp(x.lerpVal + 0.05 * x.blink, 0, 1);
                    x.color = interpolateHexColor(x.baseColor, colorBlink, x.lerpVal);
                    if(x.lerpVal === 1) x.blink = -1;
                    else if(x.lerpVal === 0) x.blink = 0;
                }
            });
        }

        return newNums;
    }

    const canvas = useRef();
    const [nums, setNums] = useState([...updateNums([], 150, null, true)]);
    const [direction, setDirection] = useState({x: 0.2, y: 0.2});
    useEffect(() => {
        renderNums(nums);
        setTimeout(() => setNums(updateNums(nums, count, direction)), 25);
    }, [nums])

    useEffect(() => {
        var handleMouseMove = (e) => {
            let rect = canvas.current && canvas.current.getBoundingClientRect();
            if(rect) {
                var x = (e.screenX - rect.x - rect.width / 2) / (rect.width / 2);
                var y = (e.screenY - rect.y - rect.height / 2) / (rect.height / 2);
                setDirection({
                    x: Math.min(Math.max(x, -2), 2),  
                    y: Math.min(Math.max(y, -2), 2),
                })
            }
        };

        console.log(canvas.current.getBoundingClientRect());
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

   

    var renderNums = (numberData) => {
        let rect = canvas.current.getBoundingClientRect();
        var ctx = setupCanvas(canvas.current);
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, rect.width, rect.height);

        numberData.forEach(x => {
            ctx.fillStyle = `${x.color}`;
            ctx.font = `900 ${x.fontSize}px san-serif`;
            var pespX = x.x;
            var pespY = x.y;
            var screenX = (pespX + 1) * rect.width / 2;
            var screenY = (pespY + 1) * rect.height / 2 + ctx.measureText('foo').actualBoundingBoxAscent;
            ctx.fillText(x.val, screenX , screenY);
        })
    }

    return (
        <Wrapper>
            <canvas ref={canvas} ></canvas>
        </Wrapper>
    );
}

const Wrapper = styled.section``;


function setupCanvas(canvas) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}



function interpolateHexColor(from, to, val, isArgb = false) {
    var c1 = Math.floor(lerp(parseInt(from.slice(1, 3), 16), parseInt(to.slice(1, 3), 16), val));
    var c2 = Math.floor(lerp(parseInt(from.slice(3, 5), 16), parseInt(to.slice(3, 5), 16), val));
    var c3 = Math.floor(lerp(parseInt(from.slice(5, 7), 16), parseInt(to.slice(5, 7), 16), val));
    if(isArgb) {
        var c4 = Math.floor(lerp(parseInt(from.slice(7, 9), 16), parseInt(to.slice(7, 9), 16), val));
        return `#${c1.toString(16)}${c2.toString(16)}${c3.toString(16)}${c4.toString(16)}`;
    } else {
        return `#${c1.toString(16)}${c2.toString(16)}${c3.toString(16)}`;
    }
}

const clamp = (val, min, max) => {
    return Math.min(Math.max(val, min), max);
}