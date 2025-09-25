// LOMI AI 动画效果库
document.addEventListener('DOMContentLoaded', function() {

    // ===== 滚动动画观察器 =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // 如果是功能卡片，添加延迟动画
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // ===== 为元素添加动画观察 =====
    const animatedElements = document.querySelectorAll('.feature-card, .stat-item, .section-header, .partner-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        animationObserver.observe(el);
    });

    // ===== 鼠标跟随效果 =====
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;

        // 创建鼠标跟随光点
        createMouseTrail(mouseX, mouseY);
    });

    function createMouseTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #246cf9 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: trailFade 0.8s ease-out forwards;
        `;

        document.body.appendChild(trail);

        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 800);
    }

    // ===== 视差滚动效果 =====
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // 背景渐变动画
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const opacity = Math.max(0.3, 1 - scrolled / window.innerHeight);
            heroBackground.style.opacity = opacity;
        }
    }

    // ===== 打字机效果 =====
    function typewriterEffect(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // ===== 数字计数动画增强 =====
    function animateCountUp(element, start, end, duration = 2000) {
        const startTime = performance.now();
        const range = end - start;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用 easeOutCubic 缓动函数
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const current = start + (range * easedProgress);

            // 根据数字大小选择格式
            if (end > 1000) {
                element.textContent = Math.floor(current).toLocaleString();
            } else if (end % 1 !== 0) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // ===== 卡片倾斜效果 =====
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ===== 波纹点击效果 =====
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        ripple.className = 'ripple';
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // 为所有按钮添加波纹效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // ===== 滚动进度条 =====
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #246cf9 0%, #16b80d 100%);
            z-index: 9999;
            transition: width 0.3s ease;
        `;

        document.body.appendChild(progressBar);

        function updateScrollProgress() {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }

        window.addEventListener('scroll', updateScrollProgress);
    }

    createScrollProgress();

    // ===== 浮动元素动画 =====
    function createFloatingElements() {
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-elements';
        floatingContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;

        // 创建浮动的几何形状
        for (let i = 0; i < 6; i++) {
            const element = document.createElement('div');
            element.className = 'floating-shape';
            element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: rgba(36, 108, 249, ${Math.random() * 0.1 + 0.05});
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-${i} ${Math.random() * 20 + 10}s ease-in-out infinite;
            `;

            floatingContainer.appendChild(element);
        }

        document.body.appendChild(floatingContainer);
    }

    // ===== 添加动画 CSS =====
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes trailFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }

            @keyframes ripple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }

            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }

            .animate-on-scroll.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            @keyframes float-0 {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }

            @keyframes float-1 {
                0%, 100% { transform: translateX(0px) rotate(0deg); }
                50% { transform: translateX(20px) rotate(-180deg); }
            }

            @keyframes float-2 {
                0%, 100% { transform: translateY(0px) translateX(0px); }
                50% { transform: translateY(-15px) translateX(15px); }
            }

            @keyframes float-3 {
                0%, 100% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(360deg) scale(1.1); }
            }

            @keyframes float-4 {
                0%, 100% { transform: translateY(0px); }
                33% { transform: translateY(-10px); }
                66% { transform: translateY(10px); }
            }

            @keyframes float-5 {
                0%, 100% { transform: translateX(0px) scale(1); }
                50% { transform: translateX(-25px) scale(0.9); }
            }

            /* 移动端优化 */
            @media (max-width: 768px) {
                .floating-elements {
                    display: none;
                }

                .mouse-trail {
                    display: none;
                }
            }
        `;

        document.head.appendChild(style);
    }

    addAnimationStyles();

    // 在桌面端创建浮动元素
    if (window.innerWidth > 768) {
        createFloatingElements();
    }

    // ===== 性能优化的滚动监听 =====
    let ticking = false;

    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                parallaxScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // ===== 窗口大小改变时的优化 =====
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // 重新计算某些动画元素的位置
            const floatingElements = document.querySelector('.floating-elements');
            if (floatingElements && window.innerWidth <= 768) {
                floatingElements.style.display = 'none';
            } else if (floatingElements && window.innerWidth > 768) {
                floatingElements.style.display = 'block';
            }
        }, 150);
    });

    // ===== 页面可见性变化优化 =====
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // 页面不可见时暂停动画
            document.body.classList.add('paused-animations');
        } else {
            // 页面可见时恢复动画
            document.body.classList.remove('paused-animations');
        }
    });

    console.log('✨ LOMI AI 动画系统已初始化');
});