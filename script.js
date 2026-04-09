const canvas = document.getElementById('heart');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 1200; // عدد النقاط المكونة للقلب

// معادلة رسم شكل القلب الرياضية
function getHeartPoint(t) {
    return {
        x: 160 * Math.pow(Math.sin(t), 3),
        y: -(130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t))
    };
}

// إنشاء النقاط
for (let i = 0; i < particleCount; i++) {
    const t = Math.random() * Math.PI * 2;
    const point = getHeartPoint(t);
    particles.push({
        x: point.x,
        y: point.y,
        baseX: point.x,
        baseY: point.y,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.05 + 0.01
    });
}

function animate() {
    // إنشاء تأثير التلاشي (الخلفية التي رأيتها في كود CSS)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);

    particles.forEach(p => {
        // حركة نبض خفيفة
        const pulse = Math.sin(Date.now() * 0.005) * 0.1 + 1;
        
        ctx.fillStyle = '#ff0000'; // لون القلب الأحمر
        ctx.beginPath();
        ctx.arc(p.x * pulse, p.y * pulse, p.size, 0, Math.PI * 2);
        ctx.fill();

        // إضافة حركة عشوائية بسيطة للذرات
        p.x += Math.random() * 1 - 0.5;
        p.y += Math.random() * 1 - 0.5;
    });

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    requestAnimationFrame(animate);
}

animate();

// تحديث الحجم عند تغيير حجم النافذة
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});