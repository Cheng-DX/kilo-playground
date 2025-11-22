// 演示控制器
class LiquidGlassDemo {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.isFlowing = false;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupControls();
        this.setupInteractiveDemo();
        this.setupAnimations();
        this.startIntroAnimation();
    }

    // 导航设置
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }

    // 控制按钮设置
    setupControls() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.addEventListener('click', () => {
            this.previousSlide();
        });

        nextBtn.addEventListener('click', () => {
            this.nextSlide();
        });

        // 键盘导航
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    // 幻灯片切换
    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides) return;

        // 移除当前活动状态
        document.querySelectorAll('.slide').forEach(slide => {
            slide.classList.remove('active');
        });
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // 设置新的活动状态
        document.getElementById(`slide-${index}`).classList.add('active');
        document.querySelector(`[data-slide="${index}"]`).classList.add('active');

        // 更新计数器
        document.querySelector('.slide-counter').textContent = `${index + 1} / ${this.totalSlides}`;

        this.currentSlide = index;

        // 触发特定幻灯片的动画
        this.triggerSlideAnimations(index);
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    previousSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    // 交互式演示设置
    setupInteractiveDemo() {
        const liquidContainer = document.querySelector('.liquid-container');
        const createRippleBtn = document.getElementById('createRipple');
        const toggleFlowBtn = document.getElementById('toggleFlow');

        if (liquidContainer) {
            // 鼠标移动效果
            liquidContainer.addEventListener('mousemove', (e) => {
                this.createMouseEffect(e, liquidContainer);
            });

            // 触摸效果
            liquidContainer.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                this.createMouseEffect(touch, liquidContainer);
            });

            // 点击涟漪效果
            liquidContainer.addEventListener('click', (e) => {
                this.createRipple(e, liquidContainer);
            });
        }

        if (createRippleBtn) {
            createRippleBtn.addEventListener('click', () => {
                this.createRandomRipple();
            });
        }

        if (toggleFlowBtn) {
            toggleFlowBtn.addEventListener('click', () => {
                this.toggleFlow();
            });
        }
    }

    // 鼠标效果
    createMouseEffect(e, container) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const liquidSurface = container.querySelector('.liquid-surface');
        if (liquidSurface) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            liquidSurface.style.transform = `
                translateX(${deltaX * 10}px) 
                translateY(${deltaY * 10}px) 
                scale(${1 + Math.abs(deltaX + deltaY) * 0.05})
            `;
            liquidSurface.style.filter = `blur(${Math.abs(deltaX + deltaY) * 2}px)`;
        }
    }

    // 创建涟漪效果
    createRipple(e, container) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';

        const rippleContainer = container.querySelector('.ripple-container');
        if (rippleContainer) {
            rippleContainer.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        }
    }

    // 创建随机涟漪
    createRandomRipple() {
        const liquidContainer = document.querySelector('.liquid-container');
        if (!liquidContainer) return;

        const rect = liquidContainer.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;

        const fakeEvent = {
            clientX: rect.left + x,
            clientY: rect.top + y
        };

        this.createRipple(fakeEvent, liquidContainer);
    }

    // 切换流动效果
    toggleFlow() {
        this.isFlowing = !this.isFlowing;
        const liquidSurface = document.querySelector('.liquid-surface');
        const toggleFlowBtn = document.getElementById('toggleFlow');

        if (liquidSurface && toggleFlowBtn) {
            if (this.isFlowing) {
                liquidSurface.style.animation = 'liquidWave 1s ease-in-out infinite, flowDown 2s linear infinite';
                toggleFlowBtn.textContent = '停止流动';
            } else {
                liquidSurface.style.animation = 'liquidWave 4s ease-in-out infinite';
                toggleFlowBtn.textContent = '切换流动';
            }
        }
    }

    // 动画设置
    setupAnimations() {
        // 为所有玻璃元素添加随机延迟动画
        const glassElements = document.querySelectorAll('.glass-element, .glass-box, .morphing-glass');
        glassElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
        });

        // 添加闪烁效果
        this.addShimmerEffect();
    }

    // 添加闪烁效果
    addShimmerEffect() {
        const glassElements = document.querySelectorAll('.glass-element');
        glassElements.forEach(element => {
            element.classList.add('glass-shimmer');
        });
    }

    // 开始介绍动画
    startIntroAnimation() {
        const introDemo = document.querySelector('.intro-demo');
        if (introDemo) {
            setTimeout(() => {
                introDemo.style.opacity = '1';
                introDemo.style.transform = 'translateY(0)';
            }, 500);
        }
    }

    // 触发特定幻灯片的动画
    triggerSlideAnimations(slideIndex) {
        switch (slideIndex) {
            case 1: // 基础效果
                this.animateBasicEffects();
                break;
            case 2: // 交互演示
                this.animateInteractiveDemo();
                break;
            case 3: // 动画效果
                this.animateShowcase();
                break;
            case 4: // 实际应用
                this.animateApplications();
                break;
        }
    }

    // 基础效果动画
    animateBasicEffects() {
        const effectCards = document.querySelectorAll('.effect-card');
        effectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    // 交互演示动画
    animateInteractiveDemo() {
        const liquidContainer = document.querySelector('.liquid-container');
        if (liquidContainer) {
            liquidContainer.style.transform = 'scale(0.8)';
            liquidContainer.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                liquidContainer.style.transform = 'scale(1)';
            }, 300);
        }

        // 自动创建几个涟漪
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createRandomRipple();
            }, i * 800);
        }
    }

    // 动画展示
    animateShowcase() {
        const animationItems = document.querySelectorAll('.animation-item');
        animationItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                item.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            }, index * 300);
        });
    }

    // 应用演示动画
    animateApplications() {
        const appDemos = document.querySelectorAll('.app-demo');
        appDemos.forEach((demo, index) => {
            setTimeout(() => {
                demo.style.opacity = '0';
                demo.style.transform = 'translateX(-50px)';
                demo.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    demo.style.opacity = '1';
                    demo.style.transform = 'translateX(0)';
                }, 100);
            }, index * 250);
        });

        // 通知动画
        setTimeout(() => {
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach((notification, index) => {
                notification.style.animation = 'none';
                setTimeout(() => {
                    notification.style.animation = 'slideIn 0.5s ease-out';
                }, index * 500);
            });
        }, 1000);
    }

    // 添加粒子效果
    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;

        document.body.appendChild(particlesContainer);

        // 创建粒子
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            particlesContainer.appendChild(particle);
        }

        // 添加粒子动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { 
                    transform: translateY(0px) translateX(0px);
                    opacity: 0;
                }
                10% { opacity: 1; }
                90% { opacity: 1; }
                50% { 
                    transform: translateY(-100px) translateX(${Math.random() * 40 - 20}px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 添加音效（模拟）
    playSound(type) {
        // 这里可以添加实际的音效
        console.log(`Playing sound: ${type}`);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const demo = new LiquidGlassDemo();
    
    // 添加一些额外的效果
    setTimeout(() => {
        demo.createParticles();
    }, 2000);

    // 添加窗口调整大小处理
    window.addEventListener('resize', () => {
        // 重新计算某些动画的位置
        const liquidContainer = document.querySelector('.liquid-container');
        if (liquidContainer) {
            // 重新设置容器尺寸相关的动画
        }
    });
});

// 添加一些实用工具函数
const Utils = {
    // 缓动函数
    easeInOutQuad: (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },

    // 随机数生成
    random: (min, max) => {
        return Math.random() * (max - min) + min;
    },

    // 防抖函数
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// 添加一些额外的视觉效果
function addAdvancedEffects() {
    // 添加鼠标跟随光效
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.cursor-light');
        if (!cursor) {
            const newCursor = document.createElement('div');
            newCursor.className = 'cursor-light';
            newCursor.style.cssText = `
                position: fixed;
                width: 200px;
                height: 200px;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(newCursor);
        }

        const cursorLight = document.querySelector('.cursor-light');
        cursorLight.style.left = (e.clientX - 100) + 'px';
        cursorLight.style.top = (e.clientY - 100) + 'px';
    });

    // 添加滚动视差效果
    window.addEventListener('scroll', Utils.throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.glass-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 10));
}

// 初始化高级效果
setTimeout(addAdvancedEffects, 1000);