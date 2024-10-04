import React, { useEffect, useRef, useState } from "react";
import "./error404.css";

const Error404 = () => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const smokeImage = useRef(null);

  useEffect(() => {
    // RequestAnimationFrame Polyfill
    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    window.requestAnimationFrame = requestAnimationFrame;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.height = 210;
    canvas.width = 300;

    let parts = [];
    const minSpawnTime = 100;
    let lastTime = new Date().getTime();
    const maxLifeTime = Math.min(6000, (canvas.height / (1.5 * 60)) * 1000);
    const emitterX = canvas.width / 2 - 50;
    const emitterY = canvas.height - 10;

    // Smoke class
    function Smoke(x, y) {
      this.x = x;
      this.y = y;
      this.size = 1;
      this.startSize = 60;
      this.endSize = 69;
      this.angle = Math.random() * 359;
      this.startLife = new Date().getTime();
      this.lifeTime = 0;
      this.velY = -1 - Math.random() * 0.5;
      this.velX = Math.floor(Math.random() * -6 + 3) / 10;
    }

    Smoke.prototype.update = function () {
      this.lifeTime = new Date().getTime() - this.startLife;
      this.angle += 0.2;
      const lifePerc = (this.lifeTime / maxLifeTime) * 100;
      this.size =
        this.startSize + (this.endSize - this.startSize) * lifePerc * 0.1;
      this.alpha = 1 - lifePerc * 0.01;
      this.alpha = Math.max(this.alpha, 0);
      this.x += this.velX;
      this.y += this.velY;
    };

    const spawn = () => {
      if (new Date().getTime() > lastTime + minSpawnTime) {
        lastTime = new Date().getTime();
        parts.push(new Smoke(emitterX, emitterY));
      }
    };

    const render = () => {
      if (loading) {
        setTimeout(() => {
          setLoading(false);
          render();
        }, 3000);
        return;
      }
      const len = parts.length;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = len - 1; i >= 0; i--) {
        if (parts[i].y < 0 || parts[i].lifeTime > maxLifeTime) {
          parts.splice(i, 1);
        } else {
          parts[i].update();
          ctx.save();
          const offsetX = -parts[i].size / 2;
          const offsetY = -parts[i].size / 2;
          ctx.translate(parts[i].x - offsetX, parts[i].y - offsetY);
          ctx.rotate((parts[i].angle / 180) * Math.PI);
          ctx.globalAlpha = parts[i].alpha;
          ctx.drawImage(
            smokeImage.current,
            offsetX,
            offsetY,
            parts[i].size,
            parts[i].size
          );
          ctx.restore();
        }
      }
      spawn();
      requestAnimationFrame(render);
    };

    smokeImage.current = new Image();
    smokeImage.current.src =
      "https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/404-error-smoke-from-toaster/images/smoke.png";
    smokeImage.current.onload = () => {
      setLoading(false);
    };

    // Start rendering
    render();

    setTimeout(() => {
      document.querySelector(".js-toaster_lever").style.top = "30px";
      document
        .querySelector(".js-toaster_toast")
        .classList.remove("js-ag-hide");
      document
        .querySelector(".js-toaster_toast")
        .classList.add("js-ag-animated", "js-ag-bounce-in-up");
    }, 800);
  }, [loading]);

  return (
    <div className="ag-page-404">
      <div className="ag-toaster-wrap">
        <div className="ag-toaster">
          <div className="ag-toaster_back"></div>
          <div className="ag-toaster_front">
            <div className="js-toaster_lever ag-toaster_lever"></div>
          </div>
          <div className="ag-toaster_toast-handler">
            <div className="js-toaster_toast ag-toaster_toast js-ag-hide"></div>
          </div>
        </div>

        <canvas
          id="canvas-404"
          className="ag-canvas-404"
          ref={canvasRef}
        ></canvas>
        <img
          className="ag-canvas-404_img"
          src="https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/404-error-smoke-from-toaster/images/smoke.png"
          alt="smoke"
        />
      </div>
    </div>
  );
};

export default Error404;
