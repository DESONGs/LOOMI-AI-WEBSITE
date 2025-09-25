// 硅谷科技 Startup 动效系统
document.addEventListener('DOMContentLoaded', function() {

    // ===== 终端打字效果 =====
    function initTerminalTyping() {
        const typingLine = document.querySelector('.code-line.typing .command');
        const commands = [
            'loomi deploy contract.sol --gas-limit 500000',
            'loomi defi swap 1000 USDC → ETH --slippage 0.5%',
            'loomi ai analyze --token PEPE --sentiment bullish',
            'loomi rwa mint --asset real-estate --value 2.5M',
            'loomi yield farm WETH/USDC --strategy aggressive',
            'loomi meme launch --supply 1B --liquidity 100ETH',
            'loomi oracle query btc-price --network mainnet',
            'loomi governance vote --proposal 42 --choice yes'
        ];

        let commandIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeCommand() {
            const currentCommand = commands[commandIndex];

            if (isDeleting) {
                typingLine.textContent = currentCommand.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingLine.textContent = currentCommand.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = 80;

            if (isDeleting) {
                typeSpeed = 40;
            }

            if (!isDeleting && charIndex === currentCommand.length) {
                typeSpeed = 2500; // 暂停时间延长
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
                typeSpeed = 800;
            }

            setTimeout(typeCommand, typeSpeed);
        }

        if (typingLine) {
            typeCommand();
        }
    }

    // ===== 3D 卡片倾斜效果增强 =====
    function enhanced3DTilt() {
        const cards = document.querySelectorAll('.ecosystem-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 8;
                const rotateY = (centerX - x) / 8;

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(20px)
                    scale3d(1.02, 1.02, 1.02)
                `;

                // 光标跟随光效
                const glow = card.querySelector('.card-glow');
                if (glow) {
                    glow.style.background = `
                        radial-gradient(
                            600px circle at ${x}px ${y}px,
                            rgba(0, 255, 255, 0.4),
                            transparent 40%
                        )
                    `;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';

                const glow = card.querySelector('.card-glow');
                if (glow) {
                    glow.style.background = '';
                }
            });
        });
    }

    // ===== 粒子系统背景 =====
    function createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-system';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;

        // 创建粒子
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: ${i % 3 === 0 ? '#0066ff' : i % 3 === 1 ? '#00ffff' : '#8b5cf6'};
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
            `;

            particleContainer.appendChild(particle);
        }

        document.body.appendChild(particleContainer);
    }

    // ===== 滚动触发的数字动画增强 =====
    function enhancedNumberAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numbers = entry.target.querySelectorAll('.stat-number, .metric-value');

                    numbers.forEach(number => {
                        const finalValue = number.textContent;
                        const isPercentage = finalValue.includes('%');
                        const isCurrency = finalValue.includes('$');
                        const isDecimal = finalValue.includes('.');

                        let numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
                        let suffix = '';

                        if (finalValue.includes('B')) {
                            suffix = 'B';
                            numericValue = numericValue;
                        } else if (finalValue.includes('M')) {
                            suffix = 'M';
                            numericValue = numericValue;
                        } else if (finalValue.includes('K')) {
                            suffix = 'K';
                            numericValue = numericValue;
                        } else if (isPercentage) {
                            suffix = '%';
                        }

                        if (isCurrency) suffix = suffix ? suffix : '';

                        let currentValue = 0;
                        const increment = numericValue / 60; // 1秒动画，60fps

                        const animateNumber = () => {
                            currentValue += increment;

                            if (currentValue >= numericValue) {
                                currentValue = numericValue;
                            }

                            let displayValue = '';
                            if (isCurrency) displayValue += '$';

                            if (isDecimal) {
                                displayValue += currentValue.toFixed(1);
                            } else {
                                displayValue += Math.floor(currentValue);
                            }

                            displayValue += suffix;

                            number.textContent = displayValue;

                            if (currentValue < numericValue) {
                                requestAnimationFrame(animateNumber);
                            }
                        };

                        number.textContent = isCurrency ? '$0' + suffix : '0' + suffix;
                        animateNumber();
                    });
                }
            });
        }, { threshold: 0.5 });

        // 观察hero stats和ecosystem metrics
        document.querySelectorAll('.hero-stats, .ecosystem-metrics').forEach(section => {
            observer.observe(section);
        });
    }

    // ===== 鼠标光标效果 =====
    function createCursorEffects() {
        let cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #00ffff 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        let cursorTrail = [];

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';

            // 创建光标轨迹
            if (cursorTrail.length > 5) {
                const oldTrail = cursorTrail.shift();
                if (oldTrail && oldTrail.parentNode) {
                    oldTrail.parentNode.removeChild(oldTrail);
                }
            }

            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX - 3}px;
                top: ${e.clientY - 3}px;
                width: 6px;
                height: 6px;
                background: #0066ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                animation: trailFade 0.8s ease-out forwards;
            `;

            document.body.appendChild(trail);
            cursorTrail.push(trail);
        });

        // 悬停效果
        document.querySelectorAll('.ecosystem-card, .btn, .nav-link').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'radial-gradient(circle, #00ff88 0%, transparent 70%)';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, #00ffff 0%, transparent 70%)';
            });
        });
    }

    // ===== 滚动视差效果增强 =====
    function enhancedParallax() {
        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // 终端浮动效果
            const terminal = document.querySelector('.floating-terminal');
            if (terminal) {
                terminal.style.transform = `translateY(${rate * 0.3}px) rotateX(${scrolled * 0.02}deg)`;
            }

            // 背景渐变移动
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.backgroundPosition = `${scrolled * 0.1}px ${scrolled * 0.2}px`;
            }

            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // ===== 添加动画样式 =====
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }

            @keyframes trailFade {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0);
                }
            }

            .custom-cursor {
                display: none;
            }

            @media (min-width: 1024px) {
                .custom-cursor {
                    display: block;
                }

                * {
                    cursor: none !important;
                }
            }

            /* 高性能动画 */
            .ecosystem-card,
            .floating-terminal,
            .particle {
                will-change: transform;
                backface-visibility: hidden;
                transform-style: preserve-3d;
            }

            /* 减少动画偏好支持 */
            @media (prefers-reduced-motion: reduce) {
                .particle-system,
                .custom-cursor,
                .floating-terminal {
                    display: none !important;
                }

                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== 初始化所有效果 =====
    addAnimationStyles();
    initTerminalTyping();
    enhanced3DTilt();
    enhancedNumberAnimation();
    enhancedParallax();

    // 仅在桌面端启用粒子和光标效果
    if (window.innerWidth > 1024) {
        createParticleSystem();
        createCursorEffects();
    }

    // 窗口大小改变时重新检查
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1024) {
            const particles = document.querySelector('.particle-system');
            const cursor = document.querySelector('.custom-cursor');
            if (particles) particles.remove();
            if (cursor) cursor.remove();
        } else if (window.innerWidth > 1024) {
            if (!document.querySelector('.particle-system')) {
                createParticleSystem();
            }
            if (!document.querySelector('.custom-cursor')) {
                createCursorEffects();
            }
        }
    });

    console.log('🚀 LOMI AI Startup Effects Loaded');
});