/* =========================================================
   UniTech — Link in bio
   1) Fundo interativo: partículas conectadas que reagem ao mouse
   2) Efeito "ripple" ao clicar nos cards de link
========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------
     1) FUNDO INTERATIVO (canvas de partículas)
  --------------------------------------------------- */
  var canvas = document.getElementById("bg-canvas");
  var ctx = canvas.getContext("2d");

  var particles = [];
  var mouse = { x: null, y: null, radius: 140 };

  // Quantidade de partículas: mude o divisor para deixar mais denso/esparso
  function particleCount() {
    return Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 16000));
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    var count = particleCount();
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // movimento
      p.x += p.vx;
      p.y += p.vy;

      // repele suavemente perto do mouse
      if (mouse.x !== null) {
        var dx = p.x - mouse.x;
        var dy = p.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          var force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / (dist || 1)) * force * 1.2;
          p.y += (dy / (dist || 1)) * force * 1.2;
        }
      }

      // volta pelo lado oposto quando sai da tela
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(150, 195, 255, 0.55)";
      ctx.fill();
    }

    // linhas entre partículas próximas
    for (var a = 0; a < particles.length; a++) {
      for (var b = a + 1; b < particles.length; b++) {
        var pa = particles[a], pb = particles[b];
        var ddx = pa.x - pb.x, ddy = pa.y - pb.y;
        var d = Math.sqrt(ddx * ddx + ddy * ddy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.strokeStyle = "rgba(63, 224, 232, " + (0.18 * (1 - d / 120)) + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }

  function initBackground() {
    resizeCanvas();
    createParticles();
    if (!reduceMotion) {
      requestAnimationFrame(step);
    } else {
      // ainda desenha um frame estático, sem animar
      step();
    }
  }

  window.addEventListener("resize", function () {
    resizeCanvas();
    createParticles();
  });

  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("mouseleave", function () {
    mouse.x = null;
    mouse.y = null;
  });
  // suporte básico a toque (mobile)
  window.addEventListener("touchmove", function (e) {
    if (e.touches && e.touches[0]) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  initBackground();

  /* ---------------------------------------------------
     2) EFEITO DE CLIQUE (ripple) NOS CARDS DE LINK
  --------------------------------------------------- */
  document.querySelectorAll(".link-card, .social-btn").forEach(function (el) {
    el.addEventListener("click", function (e) {
      var rect = el.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height) * 1.4;
      var ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      el.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });

})();
