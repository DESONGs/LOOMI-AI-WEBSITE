// LOMI AI 主要交互功能
document.addEventListener('DOMContentLoaded', function() {

    // ===== 导航栏滚动效果 =====
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateNavbar() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.style.background = 'rgba(15, 20, 25, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 20, 25, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbar);

    // ===== 平滑滚动到锚点 =====
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // 减去导航栏高度
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是外部链接或页面链接，不阻止默认行为
            if (href.startsWith('http') || href.endsWith('.html')) {
                return; // 让浏览器处理默认的链接行为
            }
            
            // 只对锚点链接进行平滑滚动
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                smoothScrollTo(targetId);

                // 更新活跃状态
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // ===== 滚动指示器点击事件 =====
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            smoothScrollTo('features');
        });
    }

    // ===== 统计数字动画 =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let numbersAnimated = false;

    function animateNumbers() {
        if (numbersAnimated) return;

        statNumbers.forEach(number => {
            const target = parseFloat(number.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    number.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = target;
                }
            };

            updateNumber();
        });

        numbersAnimated = true;
    }

    // 当统计数据区域进入视窗时触发动画
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !numbersAnimated) {
                        animateNumbers();
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(statsSection);
    }

    // ===== 活跃导航高亮 =====
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ===== 按钮悬停效果增强 =====
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== 移动端菜单控制 =====
    let mobileMenuOpen = false;

    function createMobileMenu() {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = `
            <span class="menu-line"></span>
            <span class="menu-line"></span>
            <span class="menu-line"></span>
        `;

        const navContainer = document.querySelector('.nav-container');
        navContainer.appendChild(mobileMenuBtn);

        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    function toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        mobileMenuOpen = !mobileMenuOpen;

        if (mobileMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(15, 20, 25, 0.98)';
            navLinks.style.padding = '20px';
            navLinks.style.gap = '16px';
            navLinks.style.backdropFilter = 'blur(20px)';
            navLinks.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.right = '';
            navLinks.style.background = '';
            navLinks.style.padding = '';
            navLinks.style.gap = '';
            navLinks.style.backdropFilter = '';
            navLinks.style.borderTop = '';
        }
    }

    // 检查是否为移动端
    function checkMobile() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                createMobileMenu();
            }
            // 隐藏导航按钮在移动端
            const navActions = document.querySelector('.nav-actions');
            if (navActions) {
                navActions.style.display = 'none';
            }
        } else {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.remove();
            }
            // 显示导航按钮在桌面端
            const navActions = document.querySelector('.nav-actions');
            if (navActions) {
                navActions.style.display = 'flex';
            }
            // 重置导航链接样式
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = '';
        }
    }

    window.addEventListener('resize', checkMobile);
    checkMobile(); // 初始检查

    // ===== 表单处理 =====
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // 简单的表单验证
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4757';

                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 3000);
                }
            });

            if (isValid) {
                // 这里可以添加实际的表单提交逻辑
                showNotification('消息已发送！', 'success');
                form.reset();
            } else {
                showNotification('请填写所有必填字段', 'error');
            }
        });
    });

    // ===== 通知系统 =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // 样式
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '16px 24px';
        notification.style.borderRadius = '8px';
        notification.style.color = '#ffffff';
        notification.style.fontWeight = '500';
        notification.style.zIndex = '9999';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'transform 0.3s ease';

        // 根据类型设置颜色
        switch(type) {
            case 'success':
                notification.style.background = '#16b80d';
                break;
            case 'error':
                notification.style.background = '#ff4757';
                break;
            default:
                notification.style.background = '#246cf9';
        }

        document.body.appendChild(notification);

        // 动画显示
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自动消失
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // ===== 页面性能优化 =====

    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // 预加载重要资源
    function preloadResources() {
        const criticalImages = [
            'assets/images/lomi-ai-logo.svg',
            'assets/images/looloomibg.png'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    preloadResources();

    // ===== 键盘快捷键 =====
    document.addEventListener('keydown', function(e) {
        // ESC 键关闭模态框
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
            }
        }

        // 快速导航 (Ctrl + 数字键)
        if (e.ctrlKey && e.key >= '1' && e.key <= '5') {
            e.preventDefault();
            const sectionIds = ['home', 'features', 'analytics', 'security', 'docs'];
            const targetId = sectionIds[parseInt(e.key) - 1];
            if (targetId) {
                smoothScrollTo(targetId);
            }
        }
    });

    console.log('🚀 LOMI AI 网站已加载完成');
});