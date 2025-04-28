const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 5; i++) { // Create multiple particles per move
    particles.push(new Particle(e.x, e.y));
  }
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1; // Size between 1-6
    this.speedX = (Math.random() - 0.5) * 3;
    this.speedY = (Math.random() - 0.5) * 3;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.95; // Shrink over time
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  ctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; // Fade effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    if (particle.size < 0.5) {
      particles.splice(index, 1); // Remove small particles
    }
  });

  requestAnimationFrame(animate);
}

animate();
