// 华润办公移动应用设计界面交互脚本

console.log('🚀 script.js 开始加载...');

// 立即检查DOM状态
if (document.readyState === 'loading') {
    console.log('📄 DOM 正在加载中...');
} else if (document.readyState === 'interactive') {
    console.log('📄 DOM 加载完成，资源可能还在加载...');
} else if (document.readyState === 'complete') {
    console.log('📄 页面完全加载完成');
}

// 备用页面跳转函数
function switchToPageDirect(pageNum) {
    console.log(`🔄 备用页面跳转: 第${pageNum}页`);

    // 隐藏所有页面
    document.querySelectorAll('.app-content').forEach(page => {
        page.classList.remove('active');
    });

    // 显示目标页面
    const targetPage = document.querySelector(`.page-${pageNum}`);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log(`✅ 成功显示第${pageNum}页`);

        // 更新页面指示器
        const indicators = document.querySelectorAll('.indicator-dot');
        indicators.forEach(indicator => indicator.classList.remove('active'));
        if (pageNum <= indicators.length) {
            indicators[pageNum - 1]?.classList.add('active');
        }

        // 更新底部导航状态
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') == pageNum) {
                item.classList.add('active');
            }
        });

    } else {
        console.warn(`⚠️ 未找到第${pageNum}页的元素`);
    }
}

// 立即执行的底部导航修复
(function() {
    console.log('🔧 立即执行底部导航修复...');

    function immediateNavFix() {
        const navItems = document.querySelectorAll('.nav-item[data-target]');
        console.log(`🔍 立即找到 ${navItems.length} 个导航项`);

        if (navItems.length > 0) {
            navItems.forEach((item, index) => {
                const target = item.getAttribute('data-target');
                const text = item.querySelector('.nav-text')?.textContent || '未知';

                console.log(`🔗 绑定导航项 ${index + 1}: ${text} -> 页面 ${target}`);

                // 强制绑定点击事件
                item.addEventListener('click', function(e) {
                    console.log(`🖱️ 立即修复 - 点击: ${text} -> 页面 ${target}`);
                    e.preventDefault();
                    e.stopPropagation();

                    // 更新激活状态
                    const parentNav = this.closest('.bottom-nav');
                    if (parentNav) {
                        parentNav.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                        this.classList.add('active');
                    }

                    // 跳转页面
                    const pageNum = Number(target);
                    if (!isNaN(pageNum) && pageNum > 0) {
                        console.log(`✅ 执行页面跳转: ${pageNum}`);

                        // 使用多种方式尝试页面跳转
                        if (typeof goTo === 'function') {
                            goTo(pageNum);
                        } else if (typeof window.goTo === 'function') {
                            window.goTo(pageNum);
                        } else {
                            console.warn('⚠️ goTo 函数尚未定义，使用备用方案');
                            // 备用页面跳转方案
                            switchToPageDirect(pageNum);
                        }
                    }

                    return false;
                }, true); // 使用捕获阶段

                // 添加视觉标识
                item.style.outline = '1px solid rgba(255, 0, 0, 0.3)';
            });

            console.log('✅ 立即修复完成');
        } else {
            console.log('⏳ 导航项尚未加载，稍后重试...');
            setTimeout(immediateNavFix, 100);
        }
    }

    // 立即尝试修复
    immediateNavFix();

    // 也在DOM加载完成后再次尝试
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', immediateNavFix);
    } else {
        setTimeout(immediateNavFix, 0);
    }
})();

// 全局测试函数 - 可在控制台直接调用
window.testNav = function() {
    console.log('🧪 手动测试底部导航...');

    // 先跳转到第二页
    if (typeof goTo === 'function') {
        goTo(2);
    } else {
        switchToPageDirect(2);
    }

    setTimeout(() => {
        const navItems = document.querySelectorAll('.nav-item[data-target]');
        console.log(`找到 ${navItems.length} 个导航项`);

        if (navItems.length > 0) {
            // 测试点击第一个导航项（消息）
            const messageBtn = document.querySelector('.nav-item[data-target="3"]');
            if (messageBtn) {
                console.log('🖱️ 模拟点击消息按钮...');
                messageBtn.click();
            } else {
                console.error('❌ 未找到消息按钮');
            }
        } else {
            console.error('❌ 未找到任何导航项');
        }
    }, 500);
};

// 全局强制修复函数
window.forceFixNav = function() {
    console.log('🔧 强制修复底部导航...');

    const navItems = document.querySelectorAll('.nav-item');
    console.log(`找到 ${navItems.length} 个导航项`);

    navItems.forEach((item, index) => {
        const target = item.getAttribute('data-target');
        if (target) {
            console.log(`修复导航项 ${index + 1}: 目标页面 ${target}`);

            // 强制添加点击事件
            item.onclick = function(e) {
                console.log(`🔥 强制点击处理: 跳转到页面 ${target}`);
                e.preventDefault();
                e.stopPropagation();

                const pageNum = Number(target);
                if (typeof goTo === 'function') {
                    goTo(pageNum);
                } else if (typeof window.goTo === 'function') {
                    window.goTo(pageNum);
                } else {
                    console.log('使用备用页面跳转方案');
                    switchToPageDirect(pageNum);
                }

                return false;
            };

            // 添加红色边框标识
            item.style.border = '2px solid red';
        }
    });

    console.log('✅ 强制修复完成，导航项已添加红色边框');
};

// 全局变量和函数定义
window.currentEditElement = null;
window.currentEditType = null;

// 打开编辑模态框 - 全局函数
window.openEditModal = function(title, currentValue, type) {
    console.log(`打开编辑模态框: ${title}, 当前值: ${currentValue}, 类型: ${type}`);

    const modal = document.getElementById('editModal');
    const modalTitle = document.getElementById('editModalTitle');
    const editInput = document.getElementById('editInput');

    console.log('模态框元素:', { modal, modalTitle, editInput });

    if (modal && modalTitle && editInput) {
        modalTitle.textContent = `编辑${title}`;
        editInput.value = currentValue;
        editInput.placeholder = `请输入新的${title}`;
        window.currentEditType = type;

        // 根据类型设置当前编辑元素
        if (type === 'name') {
            window.currentEditElement = document.getElementById('profileName');
        } else if (type === 'officePhone') {
            window.currentEditElement = document.getElementById('officePhone');
        } else if (type === 'mobilePhone') {
            window.currentEditElement = document.getElementById('mobilePhone');
        }

        console.log('当前编辑元素:', window.currentEditElement);

        modal.classList.add('active');
        editInput.focus();
        editInput.select();

        console.log('模态框已显示');
    } else {
        console.error('模态框元素未找到');
    }
};

// 关闭编辑模态框 - 全局函数
window.closeEditModal = function() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.remove('active');
        window.currentEditElement = null;
        window.currentEditType = null;
    }
};

// 保存编辑 - 全局函数
window.saveEdit = function() {
    console.log('=== 保存编辑函数被调用 ===');
    alert('保存函数被调用！'); // 添加弹窗确认函数被调用

    try {
        const editInput = document.getElementById('editInput');
        console.log('输入框元素:', editInput);

        if (!editInput) {
            alert('未找到输入框');
            return;
        }

        const newValue = editInput.value.trim();
        console.log('输入值:', newValue);

        if (!newValue) {
            alert('请输入有效的值');
            return;
        }

        if (!window.currentEditElement) {
            alert('未找到编辑元素');
            return;
        }

        // 更新显示
        window.currentEditElement.textContent = newValue;
        console.log('显示已更新');

        // 根据编辑类型进行相应处理
        if (window.currentEditType === 'name') {
            console.log('处理姓名更新...');
            // 同步更新所有页面的姓名
            if (typeof updateAllPagesName === 'function') {
                updateAllPagesName(newValue);
            }

            // 保存姓名数据到本地存储
            if (window.UserDataManager) {
                const userData = window.UserDataManager.loadUserData() || window.UserDataManager.getDefaultUserData();
                userData.name = newValue;
                window.UserDataManager.saveUserData(userData);
            }

            alert('姓名更新成功');
        } else if (window.currentEditType === 'officePhone' || window.currentEditType === 'mobilePhone') {
            console.log('处理电话号码更新...');
            // 保存电话号码到本地存储
            if (window.UserDataManager) {
                const userData = window.UserDataManager.loadUserData() || window.UserDataManager.getDefaultUserData();
                userData[window.currentEditType] = newValue;
                window.UserDataManager.saveUserData(userData);
            }

            alert('电话号码更新成功');
        }

        // 关闭模态框
        if (typeof window.closeEditModal === 'function') {
            window.closeEditModal();
        }

        console.log(`${window.currentEditType} 已更新为: ${newValue}`);

    } catch (error) {
        console.error('保存失败:', error);
        alert('保存失败：' + error.message);
    }
};

// 消息显示辅助函数 - 全局函数
function showSuccessMessage(message) {
    // 创建成功消息提示
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(messageDiv);

    // 3秒后自动移除
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

function showErrorMessage(message) {
    // 创建错误消息提示
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(messageDiv);

    // 5秒后自动移除
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// 全局同步更新所有页面的头像
function updateAllPagesAvatar(newAvatarSrc) {
    // 创建头像HTML
    const avatarHTML = `<img src="${newAvatarSrc}" alt="头像" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;

    // 更新所有页面的用户头像
    const avatarSelectors = [
        '.page-2 .user-avatar',           // 主页首层界面
        '.page-4 .user-avatar',           // 日历页面
        '.page-5 .user-avatar.small',     // 邮箱页面
        '.page-6 .user-avatar.small',     // 通讯录页面
        '.page-3 .user-avatar.small',     // 消息页面
        '.qr-user-avatar img',            // 二维码页面头像
        '.drawer-avatar'                  // 侧边栏头像
    ];

    avatarSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            if (selector === '.qr-user-avatar img') {
                // 二维码页面直接更新img的src
                element.src = newAvatarSrc;
            } else {
                // 其他页面替换整个内容
                element.innerHTML = avatarHTML;
            }
            console.log(`头像已同步更新: ${selector}`);
        }
    });
}

// 全局同步更新所有页面的姓名
function updateAllPagesName(newName) {
    // 更新所有页面的用户姓名
    const nameSelectors = [
        '.page-2 .app-header-title',      // 主页首层界面标题
        '.page-3 .msg-title',             // 消息页面标题
        '.qr-user-name',                  // 二维码页面用户名
        '.drawer-user .name'              // 侧边栏用户名
    ];

    nameSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = newName;
            console.log(`姓名已同步更新: ${selector} -> ${newName}`);
        }
    });

    // 更新水印中的姓名
    updateWatermarkName(newName);

    // 更新华南区域页面中的员工姓名
    updateStaffListName(newName);
}

// 更新水印中的姓名
function updateWatermarkName(newName) {
    // 更新所有水印文本
    const watermarkElements = document.querySelectorAll('.wm-row, .watermark-text');
    watermarkElements.forEach(element => {
        if (element.textContent.includes('张子滕')) {
            element.textContent = element.textContent.replace(/张子滕/g, newName);
            console.log('水印姓名已同步更新');
        }
    });
}

// 更新华南区域页面中的员工姓名
function updateStaffListName(newName) {
    // 查找华南区域页面中的张子滕员工项
    const staffItems = document.querySelectorAll('.staff-name');
    staffItems.forEach(element => {
        if (element.textContent === '张子滕') {
            element.textContent = newName;
            console.log('员工列表姓名已同步更新');
        }
    });
}

// 用户数据管理 - 全局对象
window.UserDataManager = {
    // 保存用户数据到本地存储
    saveUserData: function(data) {
        try {
            // 验证数据结构
            if (!data || typeof data !== 'object') {
                throw new Error('无效的用户数据格式');
            }

            // 检查localStorage是否可用
            if (typeof Storage === 'undefined') {
                throw new Error('浏览器不支持localStorage');
            }

            // 尝试保存数据
            const jsonData = JSON.stringify(data);
            localStorage.setItem('huarun_user_data', jsonData);

            // 验证保存是否成功
            const savedData = localStorage.getItem('huarun_user_data');
            if (savedData !== jsonData) {
                throw new Error('数据保存验证失败');
            }

            console.log('✅ 用户数据已成功保存到本地存储:', data);
            return true;
        } catch (error) {
            console.error('❌ 保存用户数据失败:', error);

            // 尝试降级处理
            this.fallbackSave(data);
            return false;
        }
    },

    // 从本地存储加载用户数据
    loadUserData: function() {
        try {
            // 检查localStorage是否可用
            if (typeof Storage === 'undefined') {
                console.warn('浏览器不支持localStorage，使用默认数据');
                return this.getDefaultUserData();
            }

            const data = localStorage.getItem('huarun_user_data');
            if (!data) {
                console.log('未找到保存的用户数据，将使用默认数据');
                return null;
            }

            const parsedData = JSON.parse(data);

            // 验证数据完整性
            if (!this.validateUserData(parsedData)) {
                console.warn('用户数据格式无效，使用默认数据');
                return this.getDefaultUserData();
            }

            console.log('✅ 用户数据加载成功:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('❌ 加载用户数据失败:', error);

            // 尝试从降级存储加载
            return this.fallbackLoad() || this.getDefaultUserData();
        }
    },

    // 获取默认用户数据
    getDefaultUserData: function() {
        return {
            name: '张子滕',
            avatar: null, // 默认使用CSS中的头像
            company: '华润集团',
            officePhone: '0755-25856668',
            mobilePhone: '+86-180****7040'
        };
    },

    // 初始化用户数据
    initializeUserData: function() {
        let userData = this.loadUserData();
        if (!userData) {
            userData = this.getDefaultUserData();
            this.saveUserData(userData);
        }
        return userData;
    },

    // 验证用户数据格式
    validateUserData: function(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }

        // 检查必需字段
        const requiredFields = ['name', 'company'];
        for (const field of requiredFields) {
            if (!data.hasOwnProperty(field) || typeof data[field] !== 'string') {
                console.warn(`用户数据缺少必需字段: ${field}`);
                return false;
            }
        }

        return true;
    },

    // 降级保存（使用内存存储）
    fallbackSave: function(data) {
        try {
            if (!window.fallbackUserData) {
                window.fallbackUserData = {};
            }
            window.fallbackUserData = JSON.parse(JSON.stringify(data));
            console.log('⚠️ 使用内存存储保存用户数据');
            return true;
        } catch (error) {
            console.error('❌ 降级保存也失败了:', error);
            return false;
        }
    },

    // 降级加载（从内存存储）
    fallbackLoad: function() {
        try {
            if (window.fallbackUserData) {
                console.log('⚠️ 从内存存储加载用户数据');
                return JSON.parse(JSON.stringify(window.fallbackUserData));
            }
            return null;
        } catch (error) {
            console.error('❌ 降级加载失败:', error);
            return null;
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 页面开始加载 ===');
    console.log('DOMContentLoaded 事件已触发');

    // 移动端优化初始化
    initMobileOptimizations();
    // 导航按钮交互
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有活动状态
            navButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的活动状态
            this.classList.add('active');
        });
    });

    // 底部预览导航：通用页码与跳转工具
    const totalPages = 21; // 总共21个页面
    let currentPage = 1; // 当前页码
    const navStack = []; // 自定义返回栈

    function setPageInfo(page) {
        const info = document.querySelector('.page-info');
        if (!info) return;
        const curEl = info.querySelector?.('.current');
        const totalEl = info.querySelector?.('.total');
        if (curEl && totalEl) {
            curEl.textContent = String(page);
            totalEl.textContent = String(totalPages);
        } else {
            info.textContent = `${page} / ${totalPages}`;
        }
        // 同步按钮禁用态
        const btnFirst = document.getElementById('btn-first');
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        const btnBack = document.getElementById('btn-back');
        if (btnFirst) btnFirst.disabled = page <= 1;
        if (btnPrev) btnPrev.disabled = page <= 1;
        if (btnNext) btnNext.disabled = page >= totalPages;
        if (btnBack) btnBack.disabled = navStack.length === 0;
    }

    function setBottomNavActive(page) {
        // 更新底部导航栏的页面网格
        const gridItems = document.querySelectorAll('.page-grid-item');
        if (!gridItems?.length) return;
        gridItems.forEach(i => i.classList.remove('active'));
        const target = gridItems[page - 1];
        if (target) target.classList.add('active');
    }

    function switchContentForPage(page) {
        console.log(`切换到第${page}页`);

        // 隐藏所有页面
        document.querySelectorAll('.app-content').forEach(pageEl => {
            pageEl.classList.remove('active');
        });

        // 显示目标页面
        const targetPage = document.querySelector(`.page-${page}`);
        if (targetPage) {
            targetPage.classList.add('active');
            console.log(`成功显示第${page}页`);
        } else {
            console.warn(`未找到第${page}页的元素`);
        }

        // 更新指示器（仅对前几页有效）
        const indicators = document.querySelectorAll('.indicator-dot');
        indicators.forEach(indicator => indicator.classList.remove('active'));
        if (page <= indicators.length) {
            indicators[page - 1]?.classList.add('active');
        }

        // 更新底部导航栏和页面信息
        setBottomNavActive(page);
        setPageInfo(page);

        // 特定页面的初始化处理
        if (page === 10) {
            // 确保第10页的交互功能正确初始化
            setTimeout(() => {
                initializeProfilePageInteractions();
                console.log('第10页交互功能已重新初始化');
            }, 100);
        }
    }

    function goTo(page, opts = {}) {
        const { pushHistory = true } = opts;
        const target = Math.max(1, Math.min(totalPages, page));
        console.log(`goTo: 从第${currentPage}页跳转到第${target}页`);

        if (pushHistory && target !== currentPage) {
            navStack.push(currentPage);
        }

        switchContentForPage(target);
        currentPage = target;

        console.log(`goTo: 当前页面已更新为第${currentPage}页`);
    }

    function goBack() {
        if (navStack.length === 0) return;
        const prev = navStack.pop();
        goTo(prev, { pushHistory: false });
    }

    function goBackToTodo() {
        goTo(2); // 返回到第二个页面（润工作主页）
    }

    // 绑定底部预览导航按钮
    const btnFirst = document.getElementById('btn-first');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    btnFirst?.addEventListener('click', () => goTo(1));
    btnPrev?.addEventListener('click', () => goTo(currentPage - 1));
    btnNext?.addEventListener('click', () => goTo(currentPage + 1));
    btnBack?.addEventListener('click', () => goBack());

    // 初始化当前页与显示
    currentPage = 1; // 默认显示第一页
    setPageInfo(currentPage);
    setBottomNavActive(currentPage);

    // 添加快速测试页面的功能（开发测试用）
    document.addEventListener('keydown', function(e) {
        // 按 Ctrl+0 快速跳转到个人名片页面
        if ((e.ctrlKey || e.metaKey) && e.key === '0') {
            e.preventDefault();
            goTo(10);
        }
        // 按 Ctrl+1 快速跳转到华南区域页面
        if ((e.ctrlKey || e.metaKey) && e.key === '1') {
            e.preventDefault();
            goTo(12);
        }
        // 按 Ctrl+2 快速跳转到办公室页面
        if ((e.ctrlKey || e.metaKey) && e.key === '2') {
            e.preventDefault();
            goTo(13);
        }
        // 按 Ctrl+3 快速跳转到设置页面
        if ((e.ctrlKey || e.metaKey) && e.key === '3') {
            e.preventDefault();
            goTo(14);
        }
        // 按 Ctrl+4 快速跳转到状态页面
        if ((e.ctrlKey || e.metaKey) && e.key === '4') {
            e.preventDefault();
            goTo(16);
        }
        // 按 Ctrl+5 快速跳转到收藏页面
        if ((e.ctrlKey || e.metaKey) && e.key === '5') {
            e.preventDefault();
            goTo(17);
        }
        // 按 Ctrl+T 测试编辑功能
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            goTo(10);
            setTimeout(() => {
                console.log('测试编辑功能...');
                const profileName = document.getElementById('profileName');
                if (profileName) {
                    console.log('模拟点击姓名元素');
                    profileName.click();
                }
            }, 500);
        }
    });

    // 页面切换函数
    function switchToPage1() {
        const page1 = document.querySelector('.page-1');
        const page2 = document.querySelector('.page-2');
        const page3 = document.querySelector('.page-3');
        const page4 = document.querySelector('.page-4');
        const page5 = document.querySelector('.page-5');
        const page6 = document.querySelector('.page-6');
        const indicators = document.querySelectorAll('.indicator-dot');
        // 显示第一个页面，隐藏其他页面
        page1.classList.add('active');
        page2.classList.remove('active');
        page3.classList.remove('active');
        page4?.classList.remove('active');
        page5?.classList.remove('active');
        page6?.classList.remove('active');

        // 更新指示器
        indicators[0].classList.add('active');
        indicators[1].classList.remove('active');

        // 更新底部导航栏和页面信息
        setBottomNavActive(1);
        setPageInfo(1);
    }

    function switchToPage2() {
        // 隐藏所有页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示第二个页面
        const page2 = document.querySelector('.page-2');
        if (page2) {
            page2.classList.add('active');
        }

        // 更新指示器
        const indicators = document.querySelectorAll('.indicator-dot');
        if (indicators.length >= 2) {
            indicators[0].classList.remove('active');
            indicators[1].classList.add('active');
        }

        // 更新底部导航栏和页面信息
        setBottomNavActive(2);
        setPageInfo(2);
    }

    function switchToPage3() {
        // 隐藏所有页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示第三个页面
        const page3 = document.querySelector('.page-3');
        if (page3) {
            page3.classList.add('active');
        }

        // 更新指示器（如果存在）
        const indicators = document.querySelectorAll('.indicator-dot');
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // 更新底部导航栏和页面信息
        setBottomNavActive(3);
        setPageInfo(3);
    }
    function switchToPage4() {
        const page1 = document.querySelector('.page-1');
        const page2 = document.querySelector('.page-2');


        const page3 = document.querySelector('.page-3');
        const page4 = document.querySelector('.page-4');
        const page5 = document.querySelector('.page-5');
        const page6 = document.querySelector('.page-6');
        const indicators = document.querySelectorAll('.indicator-dot');
        const pageItems = document.querySelectorAll('.page-item');
        const pageInfo = document.querySelector('.page-info');

        page1.classList.remove('active');
        page2.classList.remove('active');
        page3.classList.remove('active');
        page5?.classList.remove('active');
        page6?.classList.remove('active');
        page4.classList.add('active');

        indicators[0]?.classList.remove('active');
        indicators[1]?.classList.remove('active');


        pageItems.forEach(item => item.classList.remove('active'));
        pageItems[3]?.classList.add('active'); // 第4页 日历

        setPageInfo(4);
    }

    function switchToPage5() {
        const page1 = document.querySelector('.page-1');
        const page2 = document.querySelector('.page-2');
        const page3 = document.querySelector('.page-3');
        const page4 = document.querySelector('.page-4');
        const page5 = document.querySelector('.page-5');
        const page6 = document.querySelector('.page-6');
        const indicators = document.querySelectorAll('.indicator-dot');
        const pageItems = document.querySelectorAll('.page-item');
        const pageInfo = document.querySelector('.page-info');

        page1.classList.remove('active');
        page2.classList.remove('active');
        page3.classList.remove('active');
        page4?.classList.remove('active');
        page6?.classList.remove('active');
        page5.classList.add('active');

        indicators[0]?.classList.remove('active');
        indicators[1]?.classList.remove('active');

        pageItems.forEach(item => item.classList.remove('active'));
        pageItems[4]?.classList.add('active'); // 第5页 邮箱

        setPageInfo(5);
        // 切到第5页时计算6行高度
        setTimeout(adjustMailRowsForSix, 0);
    }

    function switchToPage6() {
        const page1 = document.querySelector('.page-1');
        const page2 = document.querySelector('.page-2');


        const page3 = document.querySelector('.page-3');
        const page4 = document.querySelector('.page-4');
        const page5 = document.querySelector('.page-5');
        const page6 = document.querySelector('.page-6');
        const indicators = document.querySelectorAll('.indicator-dot');
        const pageItems = document.querySelectorAll('.page-item');
        const pageInfo = document.querySelector('.page-info');

        page1.classList.remove('active');
        page2.classList.remove('active');
        page3.classList.remove('active');
        page4?.classList.remove('active');
        page5?.classList.remove('active');
        page6.classList.add('active');

        indicators[0]?.classList.remove('active');
        indicators[1]?.classList.remove('active');

        pageItems.forEach(item => item.classList.remove('active'));
        pageItems[5]?.classList.add('active'); // 第6页 通讯录

        setPageInfo(6);
    }

    // 新增：第7-9页页面切换
    function switchToPage7() {
        document.querySelectorAll('.app-content').forEach(el => el.classList.remove('active'));
        document.querySelector('.page-8')?.classList.add('active');
        setSidebarActive(7); setPageInfo(7);
    }
    function switchToPage8() {
        document.querySelectorAll('.app-content').forEach(el => el.classList.remove('active'));
        document.querySelector('.page-7')?.classList.add('active');
        setSidebarActive(8); setPageInfo(8);
    }
    function switchToPage9() {
        document.querySelectorAll('.app-content').forEach(el => el.classList.remove('active'));
        document.querySelector('.page-9')?.classList.add('active');
        setSidebarActive(9); setPageInfo(9);
    }

    function switchToPage10() {
        document.querySelectorAll('.app-content').forEach(el => el.classList.remove('active'));
        document.querySelector('.page-10')?.classList.add('active');
        setSidebarActive(10); setPageInfo(10);
        console.log('已切换到个人名片页面');
    }

    // 根据可用高度动态设置第5页每行高度，使正好显示6条
    function adjustMailRowsForSix() {
        const page = document.querySelector('.page-5');
        if (!page || !page.classList.contains('active')) return;
        const header = page.querySelector('.mail-header');
        const subbar = page.querySelector('.mail-subbar');
        const quick = page.querySelector('.mail-quickbar');
        const bottomNav = page.querySelector('.bottom-nav');
        const compose = page.querySelector('.mail-compose');
        const list = page.querySelector('.mail-list');
        if (!list) return;
        // 计算可用高度（内容区域减去悬浮按钮不占流高度）
        const pageRect = page.getBoundingClientRect();
        const headerH = header?.getBoundingClientRect().height || 0;
        const subbarH = subbar?.getBoundingClientRect().height || 0;
        const quickH = quick?.getBoundingClientRect().height || 0;
        const bottomH = bottomNav?.getBoundingClientRect().height || 0;
        const padding = 8; // list 的上下padding约4+4
        const available = pageRect.height - headerH - subbarH - quickH - bottomH - padding;
        if (available > 0) {
            const rowH = Math.floor(available / 6);
            document.documentElement.style.setProperty('--mail-row-h', `${rowH}px`);
        }
    }

    const resizeObserver = new ResizeObserver(() => {
        adjustMailRowsForSix();
    });
    resizeObserver.observe(document.body);




    // 底部导航栏页面网格点击交互
    const pageGridItems = document.querySelectorAll('.page-grid-item');
    pageGridItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const pageNumber = index + 1;
            goTo(pageNumber);
        });
    });

    // 应用图标点击效果和页面切换
    const appIcons = document.querySelectorAll('.app-icon');

    appIcons.forEach((icon, index) => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();


            e.stopPropagation();




            // 添加点击动画效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // 检查是否是润工作应用
            if (this.dataset.app === 'rungongzuo') {
                // 切换到第二个页面
                setTimeout(() => {
                    goTo(2);
                }, 200);
            }
        });
    });

    // 应用图标容器悬停效果和点击事件
    const appIconContainers = document.querySelectorAll('.app-icon-container');

    appIconContainers.forEach((container, index) => {
        const icon = container.querySelector('.app-icon');

        // 悬停效果
        container.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.app-icon');
            if (icon) {
                icon.style.transform = 'scale(1.05)';
                icon.style.transition = 'transform 0.2s ease';
            }
        });

        container.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.app-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });

        // 点击事件
        container.addEventListener('click', function(e) {
            const icon = this.querySelector('.app-icon');
            if (icon) {
                e.preventDefault();
                e.stopPropagation();

                // 添加点击动画效果
                icon.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 150);

                // 检查是否是润工作应用
                if (icon.dataset.app === 'rungongzuo') {
                    // 切换到第二个页面
                    setTimeout(() => {
                        goTo(2);
                    }, 200);
                }
            }
        });
    });

    // 控制按钮交互
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 添加点击反馈
            this.style.opacity = '0.6';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });

    // 全屏按钮功能
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    fullscreenBtn.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // 搜索按钮功能
    const searchButtons = document.querySelectorAll('.search-btn');
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 模拟搜索功能
            const searchTerm = prompt('请输入搜索内容:');
            if (searchTerm) {
                console.log('搜索:', searchTerm);
                // 这里可以添加实际的搜索逻辑
            }
        });
    });

    // 登录按钮功能
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', function() {
        alert('登录功能');
    });

    // 免费使用按钮功能
    const shareBtn = document.querySelector('.share-btn');
    shareBtn.addEventListener('click', function() {
        alert('免费使用功能');
    });

    // 手机屏幕滑动效果模拟
    const phoneScreen = document.querySelector('.phone-screen');
    let startY = 0;
    let currentY = 0;

    phoneScreen.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });

    phoneScreen.addEventListener('touchmove', function(e) {
        e.preventDefault();
        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;

        // 添加滑动视觉反馈
        if (Math.abs(deltaY) > 10) {
            this.style.transform = `translateY(${deltaY * 0.1}px)`;
        }
    });

    phoneScreen.addEventListener('touchend', function() {
        // 重置位置
        this.style.transform = 'translateY(0)';
        this.style.transition = 'transform 0.3s ease';

        setTimeout(() => {
            this.style.transition = '';
        }, 300);
    });

    // 鼠标滚轮缩放功能
    const designArea = document.querySelector('.design-area');
    let scale = 1;

    designArea.addEventListener('wheel', function(e) {
        e.preventDefault();

        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        scale = Math.max(0.5, Math.min(2, scale + delta));

        const phoneContainer = document.querySelector('.phone-container');
        phoneContainer.style.transform = `scale(${scale})`;

        // 更新缩放显示
        const zoomDisplay = document.querySelector('.zoom');
        zoomDisplay.textContent = `${Math.round(scale * 100)}%`;
    });

    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + S 保存
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            console.log('保存项目');
            alert('项目已保存');
        }

        // Ctrl/Cmd + P 预览
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            console.log('切换到预览模式');
            const previewBtn = document.querySelector('.nav-btn.active');
            if (previewBtn) {
                previewBtn.click();
            }
        }

        // ESC 退出全屏
        if (e.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen();
        }
    });

    // 添加加载动画
    const phoneFrame = document.querySelector('.iphone-frame');
    phoneFrame.style.opacity = '0';
    phoneFrame.style.transform = 'translateY(20px)';

    setTimeout(() => {
        phoneFrame.style.transition = 'all 0.6s ease';
        phoneFrame.style.opacity = '1';
        phoneFrame.style.transform = 'translateY(0)';
    }, 100);

    // 应用图标悬停效果
    appIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // 底部导航栏点击事件（支持多个页面各自的底部导航）
    function initBottomNavigation() {
        console.log('初始化底部导航事件');

        // 使用事件委托来处理底部导航点击
        document.addEventListener('click', function(e) {
            // 检查是否点击了底部导航项
            const navItem = e.target.closest('.nav-item[data-target]');
            if (navItem) {
                console.log('检测到底部导航项点击:', navItem);

                e.preventDefault();
                e.stopPropagation();

                const target = Number(navItem.getAttribute('data-target'));
                console.log(`底部导航项被点击，目标页面: ${target}`);

                // 去掉同一导航内的激活态
                const parentNav = navItem.closest('.bottom-nav');
                if (parentNav) {
                    const allItems = parentNav.querySelectorAll('.nav-item');
                    allItems.forEach(i => i.classList.remove('active'));
                    navItem.classList.add('active');
                }

                if (!Number.isNaN(target) && target > 0) {
                    console.log(`跳转到页面 ${target}`);
                    goTo(target);
                } else {
                    console.warn('无效的目标页面:', target);
                }

                return false; // 阻止事件继续传播
            }
        }, true); // 使用捕获阶段，确保优先处理

        // 为底部导航项添加视觉反馈
        document.querySelectorAll('.nav-item[data-target]').forEach(item => {
            item.style.cursor = 'pointer';

            item.addEventListener('mouseenter', function() {
                this.style.opacity = '0.8';
            });

            item.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
            });
        });

        console.log('底部导航事件委托已设置');
    }

    // 初始化底部导航
    initBottomNavigation();



    // 页面切换函数已在上面定义

// 注意：全局变量和编辑函数已在文件开头定义

    // 初始化个人名片页面交互功能
    function initializeProfilePageInteractions() {
        console.log('初始化个人名片页面交互功能');
        
        // 重新绑定头像编辑功能
        const avatarContainer = document.getElementById('avatarContainer');
        const avatarUpload = document.getElementById('avatarUpload');
        const profileAvatar = document.getElementById('profileAvatar');

        if (avatarContainer && avatarUpload && profileAvatar) {
            // 移除旧的事件监听器（如果存在）
            avatarContainer.replaceWith(avatarContainer.cloneNode(true));
            const newAvatarContainer = document.getElementById('avatarContainer');
            
            newAvatarContainer.addEventListener('click', function() {
                console.log('头像容器被点击');
                avatarUpload.click();
            });

            avatarUpload.addEventListener('change', function(e) {
                console.log('文件选择发生变化');
                const file = e.target.files[0];
                if (file) {
                    handleAvatarUpload(file);
                }
            });
            
            console.log('头像编辑功能已重新绑定');
        } else {
            console.warn('头像相关元素未找到');
        }

        // 重新绑定姓名编辑功能
        const profileName = document.getElementById('profileName');
        if (profileName) {
            profileName.replaceWith(profileName.cloneNode(true));
            const newProfileName = document.getElementById('profileName');

            // 确保姓名元素有 editable 类
            if (!newProfileName.classList.contains('editable')) {
                newProfileName.classList.add('editable');
            }

            newProfileName.addEventListener('click', function() {
                console.log('姓名被点击，当前内容:', this.textContent);
                window.openEditModal('姓名', this.textContent.trim(), 'name');
            });

            // 添加视觉提示
            newProfileName.style.cursor = 'pointer';
            newProfileName.title = '点击编辑姓名';

            console.log('姓名编辑功能已重新绑定');
        } else {
            console.warn('姓名元素未找到');
        }

        // 重新绑定电话号码编辑功能
        const officePhone = document.getElementById('officePhone');
        const mobilePhone = document.getElementById('mobilePhone');

        if (officePhone) {
            officePhone.replaceWith(officePhone.cloneNode(true));
            const newOfficePhone = document.getElementById('officePhone');
            
            newOfficePhone.addEventListener('click', function() {
                console.log('办公电话被点击，当前内容:', this.textContent);
                window.openEditModal('办公电话', this.textContent.trim(), 'officePhone');
            });
            
            // 添加视觉提示
            newOfficePhone.style.cursor = 'pointer';
            newOfficePhone.title = '点击编辑办公电话';
            
            console.log('办公电话编辑功能已重新绑定');
        } else {
            console.warn('办公电话元素未找到');
        }

        if (mobilePhone) {
            mobilePhone.replaceWith(mobilePhone.cloneNode(true));
            const newMobilePhone = document.getElementById('mobilePhone');

            // 确保手机号元素有 editable 类
            if (!newMobilePhone.classList.contains('editable')) {
                newMobilePhone.classList.add('editable');
            }

            newMobilePhone.addEventListener('click', function() {
                console.log('手机号被点击，当前内容:', this.textContent);
                window.openEditModal('手机号', this.textContent.trim(), 'mobilePhone');
            });

            // 添加视觉提示
            newMobilePhone.style.cursor = 'pointer';
            newMobilePhone.title = '点击编辑手机号';

            console.log('手机号编辑功能已重新绑定');
        } else {
            console.warn('手机号元素未找到');
        }
    }

    // 处理头像上传
    function handleAvatarUpload(file) {
        console.log('开始处理头像上传:', file.name);
        
        // 验证文件类型
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('不支持的图片格式，请选择 JPG、PNG、GIF 或 WebP 格式的图片');
            return;
        }

        // 验证文件大小 (5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('图片文件过大，请选择小于 5MB 的图片');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const newAvatarSrc = e.target.result;
                const profileAvatar = document.getElementById('profileAvatar');
                
                if (profileAvatar) {
                    profileAvatar.src = newAvatarSrc;
                    console.log('头像显示已更新');
                }

                // 同步更新所有页面的头像
                if (typeof updateAllPagesAvatar === 'function') {
                    updateAllPagesAvatar(newAvatarSrc);
                    console.log('头像已同步到所有页面');
                } else {
                    console.warn('updateAllPagesAvatar函数不存在');
                }

                // 保存头像数据到本地存储
                if (typeof window.UserDataManager === 'object' && window.UserDataManager.saveUserData) {
                    const userData = window.UserDataManager.loadUserData() || window.UserDataManager.getDefaultUserData();
                    userData.avatar = newAvatarSrc;
                    window.UserDataManager.saveUserData(userData);
                    console.log('头像数据已保存到本地存储');
                } else {
                    console.warn('UserDataManager不可用');
                }

                // 提供视觉反馈
                if (typeof showSuccessMessage === 'function') {
                    showSuccessMessage('头像更新成功');
                } else {
                    alert('头像更新成功');
                }
                
            } catch (error) {
                console.error('头像更新失败:', error);
                if (typeof showErrorMessage === 'function') {
                    showErrorMessage('头像更新失败，请重试');
                } else {
                    alert('头像更新失败，请重试');
                }
            }
        };
        
        reader.onerror = function() {
            console.error('图片读取失败');
            if (typeof showErrorMessage === 'function') {
                showErrorMessage('图片读取失败，请重试');
            } else {
                alert('图片读取失败，请重试');
            }
        };
        
        reader.readAsDataURL(file);
    }

    // 头像点击编辑功能
    const avatarContainer = document.getElementById('avatarContainer');
    const avatarUpload = document.getElementById('avatarUpload');
    const profileAvatar = document.getElementById('profileAvatar');

    if (avatarContainer && avatarUpload && profileAvatar) {
        avatarContainer.addEventListener('click', function() {
            avatarUpload.click();
        });

        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // 验证文件类型
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                if (!validTypes.includes(file.type)) {
                    alert('不支持的图片格式，请选择 JPG、PNG、GIF 或 WebP 格式的图片');
                    return;
                }

                // 验证文件大小 (5MB)
                const maxSize = 5 * 1024 * 1024;
                if (file.size > maxSize) {
                    alert('图片文件过大，请选择小于 5MB 的图片');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const newAvatarSrc = e.target.result;
                        profileAvatar.src = newAvatarSrc;

                        // 同步更新所有页面的头像
                        updateAllPagesAvatar(newAvatarSrc);

                        // 保存头像数据到本地存储
                        const userData = window.UserDataManager.loadUserData() || window.UserDataManager.getDefaultUserData();
                        userData.avatar = newAvatarSrc;
                        window.UserDataManager.saveUserData(userData);

                        console.log('头像已更新并同步到所有页面');
                        
                        // 提供视觉反馈
                        showSuccessMessage('头像更新成功');
                    } catch (error) {
                        console.error('头像更新失败:', error);
                        alert('头像更新失败，请重试');
                    }
                };
                
                reader.onerror = function() {
                    console.error('图片读取失败');
                    alert('图片读取失败，请重试');
                };
                
                reader.readAsDataURL(file);
            }
        });
    }

    // 注意：姓名和电话号码的编辑功能在 initializeProfilePageInteractions() 函数中处理
    // 这里不再重复绑定事件，避免冲突

    // 注意：编辑模态框函数已在文件开头定义为全局函数

    // 绑定模态框按钮事件 - 使用事件委托
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'cancelEdit') {
            console.log('取消按钮被点击');
            window.closeEditModal();
        } else if (e.target && e.target.id === 'saveEdit') {
            console.log('保存按钮被点击');
            e.preventDefault();
            e.stopPropagation();
            window.saveEdit();
        }
    });

    // 模态框背景点击关闭
    const editModal = document.getElementById('editModal');
    if (editModal) {
        editModal.addEventListener('click', function(e) {
            if (e.target === this) {
                window.closeEditModal();
            }
        });
    }

    // 键盘事件处理
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('editModal');
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                console.log('ESC键被按下，关闭模态框');
                window.closeEditModal();
            } else if (e.key === 'Enter') {
                console.log('回车键被按下，保存编辑');
                e.preventDefault();
                window.saveEdit();
            }
        }
    });

    // 注意：同步更新函数已在文件开头定义为全局函数

    // 注意：消息显示函数已在文件开头定义为全局函数

    // 注意：UserDataManager 已在文件开头定义为全局对象

    // 页面初始化时同步所有用户信息
    function initializeUserInterface() {
        const userData = window.UserDataManager.initializeUserData();

        // 如果有保存的头像，同步到所有页面
        if (userData.avatar) {
            updateAllPagesAvatar(userData.avatar);
            // 更新个人名片页面的头像
            const profileAvatar = document.getElementById('profileAvatar');
            if (profileAvatar) {
                profileAvatar.src = userData.avatar;
            }
        }

        // 如果姓名不是默认值，同步到所有页面
        if (userData.name && userData.name !== '张子滕') {
            updateAllPagesName(userData.name);
            // 更新个人名片页面的姓名
            const profileName = document.getElementById('profileName');
            if (profileName) {
                profileName.textContent = userData.name;
            }
        }

        // 恢复电话号码数据
        if (userData.officePhone) {
            const officePhoneElement = document.getElementById('officePhone');
            if (officePhoneElement) {
                officePhoneElement.textContent = userData.officePhone;
            }
        }

        if (userData.mobilePhone) {
            const mobilePhoneElement = document.getElementById('mobilePhone');
            if (mobilePhoneElement) {
                mobilePhoneElement.textContent = userData.mobilePhone;
            }
        }

        console.log('用户界面初始化完成:', userData);
    }

    // 页面加载完成后初始化用户界面
    initializeUserInterface();

    // 立即检查底部导航
    console.log('=== 立即检查底部导航 ===');
    const immediateNavItems = document.querySelectorAll('.nav-item[data-target]');
    console.log('立即找到的导航项数量:', immediateNavItems.length);

    // 确保底部导航在页面完全加载后重新初始化
    setTimeout(function() {
        console.log('=== 延迟初始化底部导航 ===');
        initBottomNavigation();

        // 强制性修复：直接为每个底部导航项添加点击事件
        const navItems = document.querySelectorAll('.nav-item[data-target]');
        console.log('延迟找到的导航项数量:', navItems.length);

        if (navItems.length === 0) {
            console.error('❌ 未找到任何底部导航项！');
            // 尝试查找所有可能的导航项
            const allNavItems = document.querySelectorAll('.nav-item');
            console.log('所有 .nav-item 元素数量:', allNavItems.length);
            allNavItems.forEach((item, index) => {
                console.log(`导航项 ${index + 1}:`, item, '属性:', item.attributes);
            });
        }

        navItems.forEach((item, index) => {
            const target = item.getAttribute('data-target');
            const text = item.querySelector('.nav-text')?.textContent || '未知';
            console.log(`导航项 ${index + 1}: ${text} -> 页面 ${target}`);

            // 移除所有现有的点击事件监听器
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);

            // 添加新的点击事件
            newItem.onclick = function(e) {
                console.log(`🔥 强制点击处理: ${text} -> 跳转到页面 ${target}`);
                e.preventDefault();
                e.stopPropagation();

                // 更新激活状态
                const parentNav = this.closest('.bottom-nav');
                if (parentNav) {
                    parentNav.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                }

                // 跳转页面
                const pageNum = Number(target);
                if (!isNaN(pageNum) && pageNum > 0) {
                    console.log(`✅ 执行页面跳转: ${pageNum}`);
                    goTo(pageNum);
                } else {
                    console.error('❌ 无效的页面号:', target);
                }

                return false;
            };

            // 添加触摸事件支持
            newItem.ontouchend = function(e) {
                console.log(`👆 触摸结束: ${text} -> 跳转到页面 ${target}`);
                e.preventDefault();
                this.onclick(e);
            };

            // 添加调试样式
            newItem.style.border = '1px solid red';
            newItem.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        });

        console.log('✅ 强制性底部导航修复完成');
    }, 500);

    // 初始化个人名片页面交互功能（确保在页面加载时就绑定事件）
    setTimeout(function() {
        initializeProfilePageInteractions();
        console.log('个人名片页面交互功能初始化完成');

        // 添加调试信息
        const profileName = document.getElementById('profileName');
        const mobilePhone = document.getElementById('mobilePhone');
        const officePhone = document.getElementById('officePhone');

        console.log('调试信息:');
        console.log('- 姓名元素:', profileName, '是否有editable类:', profileName?.classList.contains('editable'));
        console.log('- 手机号元素:', mobilePhone, '是否有editable类:', mobilePhone?.classList.contains('editable'));
        console.log('- 办公电话元素:', officePhone, '是否有editable类:', officePhone?.classList.contains('editable'));

        // 添加全局测试函数
        window.testEditFunction = function() {
            console.log('=== 测试编辑功能 ===');
            goTo(10);
            setTimeout(() => {
                const profileName = document.getElementById('profileName');
                const mobilePhone = document.getElementById('mobilePhone');

                console.log('姓名元素:', profileName);
                console.log('手机号元素:', mobilePhone);

                if (profileName) {
                    console.log('模拟点击姓名...');
                    profileName.click();
                }
            }, 500);
        };

        console.log('可以在控制台中运行 testEditFunction() 来测试编辑功能');

        // 添加底部导航测试函数
        window.testBottomNav = function() {
            console.log('=== 测试底部导航功能 ===');

            // 先跳转到第二页
            goTo(2);

            setTimeout(() => {
                const bottomNav = document.querySelector('.page-2 .bottom-nav');
                console.log('第二页底部导航:', bottomNav);

                if (bottomNav) {
                    const navItems = bottomNav.querySelectorAll('.nav-item');
                    console.log('导航项数量:', navItems.length);

                    navItems.forEach((item, index) => {
                        const target = item.getAttribute('data-target');
                        const text = item.querySelector('.nav-text')?.textContent;
                        console.log(`导航项 ${index + 1}: ${text} -> 页面 ${target}`);
                    });

                    // 测试点击消息按钮
                    const messageBtn = bottomNav.querySelector('[data-target="3"]');
                    if (messageBtn) {
                        console.log('测试点击消息按钮...');
                        messageBtn.click();
                    }
                } else {
                    console.error('未找到第二页的底部导航');
                }
            }, 1000);
        };

        console.log('可以在控制台中运行 testBottomNav() 来测试底部导航功能');

        // 添加简单的底部导航测试
        window.quickTestNav = function() {
            console.log('=== 快速测试底部导航 ===');

            // 跳转到第二页
            goTo(2);

            setTimeout(() => {
                // 直接模拟点击消息按钮
                console.log('尝试点击消息按钮...');
                const messageBtn = document.querySelector('.page-2 .nav-item[data-target="3"]');
                console.log('找到消息按钮:', messageBtn);

                if (messageBtn) {
                    // 手动触发点击事件
                    const clickEvent = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    messageBtn.dispatchEvent(clickEvent);
                    console.log('已触发消息按钮点击事件');
                } else {
                    console.error('未找到消息按钮');
                }
            }, 500);
        };

        console.log('可以在控制台中运行 quickTestNav() 来快速测试');

        // 添加全局测试函数
        window.testAllNavButtons = function() {
            console.log('=== 测试所有底部导航按钮 ===');

            // 跳转到第二页
            goTo(2);

            setTimeout(() => {
                const navItems = document.querySelectorAll('.page-2 .nav-item[data-target]');
                console.log('第二页导航项:', navItems.length);

                navItems.forEach((item, index) => {
                    const target = item.getAttribute('data-target');
                    const text = item.querySelector('.nav-text')?.textContent;
                    console.log(`${index + 1}. ${text} -> 页面 ${target}`);

                    // 测试每个按钮
                    setTimeout(() => {
                        console.log(`测试点击: ${text}`);
                        item.click();
                    }, (index + 1) * 1000);
                });
            }, 500);
        };

        console.log('=== 底部导航修复完成 ===');
        console.log('可以运行以下测试函数:');
        console.log('- testBottomNav() - 详细测试');
        console.log('- quickTestNav() - 快速测试');
        console.log('- testAllNavButtons() - 测试所有按钮');
        console.log('- debugNavigation() - 调试导航状态');
    }, 100);

    // 全局调试函数
    window.debugNavigation = function() {
        console.log('=== 调试导航状态 ===');

        // 检查当前页面
        const currentPageElements = document.querySelectorAll('.app-content.active');
        console.log('当前激活的页面:', currentPageElements.length);
        currentPageElements.forEach((page, index) => {
            console.log(`激活页面 ${index + 1}:`, page.className);
        });

        // 检查所有底部导航
        const bottomNavs = document.querySelectorAll('.bottom-nav');
        console.log('找到的底部导航数量:', bottomNavs.length);

        bottomNavs.forEach((nav, navIndex) => {
            console.log(`底部导航 ${navIndex + 1}:`, nav);
            const items = nav.querySelectorAll('.nav-item');
            console.log(`  - 导航项数量: ${items.length}`);

            items.forEach((item, itemIndex) => {
                const target = item.getAttribute('data-target');
                const text = item.querySelector('.nav-text')?.textContent || '未知';
                const isActive = item.classList.contains('active');
                console.log(`  - 项目 ${itemIndex + 1}: ${text} -> 页面 ${target} (激活: ${isActive})`);
            });
        });

        // 手动测试第一个导航项
        const firstNavItem = document.querySelector('.nav-item[data-target]');
        if (firstNavItem) {
            console.log('尝试手动点击第一个导航项...');
            firstNavItem.click();
        } else {
            console.error('未找到任何导航项');
        }
    };

    // 立即运行调试
    setTimeout(() => {
        console.log('=== 自动运行导航调试 ===');
        window.debugNavigation();
    }, 1000);

    // 全局测试函数
    window.testEditFunction = function() {
        console.log('=== 开始测试编辑功能 ===');

        // 跳转到第10页
        goTo(10);

        setTimeout(() => {
            console.log('已跳转到第10页，开始测试编辑功能');

            // 测试姓名编辑
            const profileName = document.getElementById('profileName');
            const mobilePhone = document.getElementById('mobilePhone');

            console.log('姓名元素:', profileName);
            console.log('手机号元素:', mobilePhone);

            if (profileName) {
                console.log('测试姓名编辑...');
                console.log('姓名当前值:', profileName.textContent);
                console.log('姓名是否有editable类:', profileName.classList.contains('editable'));

                // 模拟点击姓名
                profileName.click();
            } else {
                console.error('未找到姓名元素');
            }
        }, 1000);
    };

    // 直接测试保存功能
    window.testSaveFunction = function() {
        console.log('=== 直接测试保存功能 ===');

        // 设置测试数据
        window.currentEditType = 'name';
        window.currentEditElement = document.getElementById('profileName');

        // 创建测试输入框
        const testInput = document.createElement('input');
        testInput.id = 'editInput';
        testInput.value = '测试姓名';
        document.body.appendChild(testInput);

        console.log('测试数据已设置，调用保存函数...');
        window.saveEdit();

        // 清理测试元素
        document.body.removeChild(testInput);
    };

    // 测试按钮点击
    window.testButtonClick = function() {
        console.log('=== 测试按钮点击 ===');

        // 跳转到第10页
        goTo(10);

        setTimeout(() => {
            // 打开编辑模态框
            window.openEditModal('测试', '测试值', 'name');

            setTimeout(() => {
                // 查找保存按钮并模拟点击
                const saveBtn = document.getElementById('saveEdit');
                console.log('保存按钮:', saveBtn);

                if (saveBtn) {
                    console.log('模拟点击保存按钮...');
                    saveBtn.click();
                } else {
                    console.error('未找到保存按钮');
                }
            }, 500);
        }, 500);
    };

    // 第十一页 - 组织架构页面
    function switchToPage11() {
        // 隐藏所有其他页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示组织架构页面
        const page11 = document.querySelector('.page-11');
        if (page11) {
            page11.classList.add('active');
        }

        // 更新左侧边栏页面选中状态
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('active'));
        if (pageItems[10]) { // 第11页（索引为10）
            pageItems[10].classList.add('active');
        }

        // 更新页面信息显示
        setPageInfo(11);
    }

    // 第十二页 - 华南区域页面
    function switchToPage12() {
        console.log('切换到华南区域页面');

        // 隐藏所有其他页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示华南区域页面
        const page12 = document.querySelector('.page-12');
        console.log('找到华南区域页面元素:', page12);
        if (page12) {
            page12.classList.add('active');
            console.log('华南区域页面已激活');
        } else {
            console.error('未找到华南区域页面元素');
        }

        // 更新左侧边栏页面选中状态
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('active'));
        if (pageItems[11]) { // 第12页（索引为11）
            pageItems[11].classList.add('active');
        }

        // 更新页面信息显示
        setPageInfo(12);
    }

    // 第十三页 - 办公室页面
    function switchToPage13() {
        console.log('切换到办公室页面');

        // 隐藏所有其他页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示办公室页面
        const page13 = document.querySelector('.page-13');
        console.log('找到办公室页面元素:', page13);
        if (page13) {
            page13.classList.add('active');
            console.log('办公室页面已激活');
        } else {
            console.error('未找到办公室页面元素');
        }

        // 更新左侧边栏页面选中状态
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('active'));
        if (pageItems[12]) { // 第13页（索引为12）
            pageItems[12].classList.add('active');
        }

        // 更新页面信息显示
        setPageInfo(13);
    }

    // 第十四页 - 设置页面
    function switchToPage14() {
        console.log('切换到设置页面');

        // 隐藏所有其他页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示设置页面
        const page14 = document.querySelector('.page-14');
        console.log('找到设置页面元素:', page14);
        if (page14) {
            page14.classList.add('active');
            console.log('设置页面已激活');
        } else {
            console.error('未找到设置页面元素');
        }

        // 更新左侧边栏页面选中状态
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('active'));
        if (pageItems[13]) { // 第14页（索引为13）
            pageItems[13].classList.add('active');
        }

        // 更新页面信息显示
        setPageInfo(14);
    }

    // 第十五页 - 待办详情页面
    function switchToPage15() {
        console.log('切换到待办详情页面');

        // 隐藏所有其他页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示待办详情页面
        const page15 = document.querySelector('.page-15');
        console.log('找到待办详情页面元素:', page15);
        if (page15) {
            page15.classList.add('active');
            console.log('待办详情页面已激活');
        } else {
            console.error('未找到待办详情页面元素');
        }

        // 更新左侧边栏页面选中状态
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('active'));
        if (pageItems[14]) { // 第15页（索引为14）
            pageItems[14].classList.add('active');
        }

        // 更新页面信息显示
        setPageInfo(15);
    }

    // 第十六页 - 状态页面
    function switchToPage16() {
        console.log('切换到状态页面');

        // 隐藏所有其他页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示状态页面
        const page16 = document.querySelector('.page-16');
        console.log('找到状态页面元素:', page16);
        if (page16) {
            page16.classList.add('active');
            console.log('状态页面已激活');
        } else {
            console.error('未找到状态页面元素');
        }

        // 更新左侧边栏页面选中状态
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('active'));
        if (pageItems[15]) { // 第16页（索引为15）
            pageItems[15].classList.add('active');
        }

        // 更新页面信息显示
        setPageInfo(16);
    }

    // 第十七页 - 收藏页面
    function switchToPage17() {
        console.log('切换到收藏页面');

        // 隐藏所有其他页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示收藏页面
        const page17 = document.querySelector('.page-17');
        console.log('找到收藏页面元素:', page17);
        if (page17) {
            page17.classList.add('active');
            console.log('收藏页面已激活');
        } else {
            console.error('未找到收藏页面元素');
        }

        // 更新左侧边栏页面选中状态
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('active'));
        if (pageItems[16]) { // 第17页（索引为16）
            pageItems[16].classList.add('active');
        }

        // 更新页面信息显示
        setPageInfo(17);
    }

    // 第十八页 - 集团部室页面
    function switchToPage18() {
        console.log('切换到集团部室页面');

        // 隐藏所有其他页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示集团部室页面
        const page18 = document.querySelector('.page-18');
        console.log('找到集团部室页面元素:', page18);
        if (page18) {
            page18.classList.add('active');
            console.log('集团部室页面已激活');
        } else {
            console.error('未找到集团部室页面元素');
        }

        // 更新左侧边栏页面选中状态
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('active'));
        if (pageItems[17]) { // 第18页（索引为17）
            pageItems[17].classList.add('active');
        }

        // 更新页面信息显示
        setPageInfo(18);
    }

    // 第19页 - 邮箱内容4页面切换函数
    function switchToPage19() {
        console.log('切换到邮箱内容4页面');

        // 隐藏所有页面
        document.querySelectorAll('.app-content').forEach(page => {
            page.classList.remove('active');
        });

        // 显示邮箱内容4页面
        const page19 = document.querySelector('.page-19');
        console.log('找到邮箱内容4页面元素:', page19);
        if (page19) {
            page19.classList.add('active');
            console.log('邮箱内容4页面已激活');
        } else {
            console.error('未找到邮箱内容4页面元素');
        }

        // 更新左侧边栏页面选中状态
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('active'));
        if (pageItems[18]) {
            pageItems[18].classList.add('active');
        }

        // 更新页面信息显示
        setPageInfo(19);
    }

    // 第二十页 - 邮箱内页2
    function switchToPage20() {
        // 隐藏所有页面
        document.querySelectorAll('.app-content').forEach(p => p.classList.remove('active'));
        // 显示page-20
        const page20 = document.querySelector('.page-20');
        if (page20) page20.classList.add('active');
        // 更新侧边栏与页码
        setSidebarActive(20);
        setPageInfo(20);
    }

    // 第二十一个页面 - 二维码界面2
    function switchToPage21() {
        // 隐藏所有页面
        document.querySelectorAll('.app-content').forEach(p => p.classList.remove('active'));
        // 显示page-21
        const page21 = document.querySelector('.page-21');
        if (page21) {
            page21.classList.add('active');
            console.log('二维码页面已激活');

            // 绑定二维码页面的按钮事件
            bindQRPageEvents();
        } else {
            console.error('未找到二维码页面元素');
        }
        // 更新侧边栏与页码
        setSidebarActive(21);
        setPageInfo(21);
    }

    // 二维码页面按钮事件绑定
    function bindQRPageEvents() {
        // 返回按钮
        const backBtn = document.querySelector('.qr-back-btn');
        if (backBtn) {
            backBtn.onclick = function() {
                // 返回到通讯录页面
                goTo(6);
            };
        }

        // 链接按钮
        const linkBtn = document.querySelector('.qr-link-btn');
        if (linkBtn) {
            linkBtn.onclick = function() {
                alert('复制链接功能');
            };
        }

        // 保存图片按钮
        const saveBtn = document.querySelector('.qr-save-btn');
        if (saveBtn) {
            saveBtn.onclick = function() {
                alert('保存图片功能');
            };
        }

        // 分享按钮
        const shareBtn = document.querySelector('.qr-share-btn');
        if (shareBtn) {
            shareBtn.onclick = function() {
                alert('分享功能');
            };
        }
    }

    // 待办项目点击交互
    document.addEventListener('click', function(e) {
        const todoItem = e.target.closest('.todo-item[data-target]');
        if (todoItem) {
            e.preventDefault();
            e.stopPropagation();

            const targetPage = todoItem.getAttribute('data-target');
            console.log('点击待办项目，目标页面:', targetPage);

            if (targetPage === '15') {
                // 特殊处理page-15
                testClickTodo();
            } else if (targetPage) {
                // 处理其他页面
                document.querySelectorAll('.app-content').forEach(page => {
                    page.classList.remove('active');
                });

                const targetPageElement = document.querySelector(`.app-content.page-${targetPage}`);
                if (targetPageElement) {
                    targetPageElement.classList.add('active');
                }
            }
        }

        // 通讯录页面"我的二维码"按钮点击交互
        const qrContactItem = e.target.closest('.contact-item[data-target="21"]');
        if (qrContactItem) {
            e.preventDefault();
            e.stopPropagation();

            console.log('点击我的二维码按钮');

            // 添加点击动画效果
            qrContactItem.style.backgroundColor = '#333';
            setTimeout(() => {
                qrContactItem.style.backgroundColor = '';
            }, 150);

            // 跳转到二维码页面
            setTimeout(() => {
                goTo(21);
            }, 200);
        }
    });

    // 待办展开页面返回按钮
    document.addEventListener('click', function(e) {
        if (e.target.closest('.todo-header .back-btn')) {
            e.preventDefault();
            e.stopPropagation();

            // 返回到润工作页面
            document.querySelectorAll('.app-content').forEach(page => {
                page.classList.remove('active');
            });

            const workPage = document.querySelector('.app-content.page-2');
            if (workPage) {
                workPage.classList.add('active');
            }
        }
    });

    // 华南区域页面部门项目点击交互
    document.addEventListener('click', function(e) {
        const departmentItem = e.target.closest('.department-item');
        if (departmentItem) {
            const departmentName = departmentItem.querySelector('.department-name').textContent;

            // 添加点击动画效果
            departmentItem.style.backgroundColor = '#3a3a3a';
            setTimeout(() => {
                departmentItem.style.backgroundColor = '';
            }, 200);

            console.log(`点击了部门: ${departmentName}`);

            // 跳转到具体部门页面的逻辑
            if (departmentName === '办公室') {
                setTimeout(() => {
                    goTo(13); // 跳转到办公室页面
                }, 300);
            }
        }

        // 办公室页面人员项目点击交互
        const staffItem = e.target.closest('.staff-item');
        if (staffItem) {
            const staffName = staffItem.querySelector('.staff-name').textContent;

            // 添加点击动画效果
            staffItem.style.backgroundColor = '#3a3a3a';
            setTimeout(() => {
                staffItem.style.backgroundColor = '';
            }, 200);

            console.log(`点击了员工: ${staffName}`);

            // 这里可以添加跳转到个人详情页面的逻辑
            // 例如：goTo(10) 跳转到个人名片页面
        }

        // 设置页面项目点击交互
        const settingsItem = e.target.closest('.settings-item');
        if (settingsItem) {
            const settingsName = settingsItem.querySelector('.settings-name').textContent;

            // 添加点击动画效果
            settingsItem.style.backgroundColor = '#3a3a3a';
            setTimeout(() => {
                settingsItem.style.backgroundColor = '';
            }, 200);

            console.log(`点击了设置项: ${settingsName}`);

            // 这里可以添加跳转到具体设置页面的逻辑
        }

        // 退出登录按钮点击交互
        const logoutBtn = e.target.closest('.logout-btn');
        if (logoutBtn) {
            // 添加点击动画效果
            logoutBtn.style.opacity = '0.6';
            setTimeout(() => {
                logoutBtn.style.opacity = '1';
            }, 200);

            console.log('点击了退出登录');

            // 这里可以添加退出登录的逻辑
            if (confirm('确定要退出登录吗？')) {
                alert('已退出登录');
                // 可以跳转到登录页面或首页
                goTo(1);
            }
        }
    });

    console.log('=== 华润办公移动应用设计界面已加载完成 ===');

    // 检查状态页面是否存在
    const page16 = document.querySelector('.app-content.page-16');
    console.log('检查page-16是否存在:', page16);
    if (page16) {
        console.log('page-16元素找到，当前类名:', page16.className);
    } else {
        console.error('page-16元素未找到！');
    }

    // 检查收藏页面是否存在
    const page17 = document.querySelector('.app-content.page-17');
    console.log('检查page-17是否存在:', page17);
    if (page17) {
        console.log('page-17元素找到，当前类名:', page17.className);
    } else {
        console.error('page-17元素未找到！');
    }

    // 检查page-15是否存在
    const page15 = document.querySelector('.app-content.page-15');
    console.log('检查page-15是否存在:', page15);
    if (page15) {
        console.log('page-15元素找到，当前类名:', page15.className);
    } else {
        console.error('page-15元素未找到！');
    }
});

// 测试待办项目点击
function testClickTodo() {
    console.log('=== 待办项目被点击 ===');

    // 隐藏所有页面
    document.querySelectorAll('.app-content').forEach(page => {
        page.classList.remove('active');
        console.log('隐藏页面:', page.className);
    });

    // 显示page-15
    const page15 = document.querySelector('.app-content.page-15');
    console.log('找到page-15:', page15);

    if (page15) {
        // 添加active类
        page15.classList.add('active');

        // 移除所有可能的隐藏样式
        page15.style.removeProperty('display');
        page15.style.removeProperty('visibility');
        page15.style.removeProperty('opacity');

        // 创建并添加强制显示的CSS规则
        const style = document.createElement('style');
        style.textContent = `
            .app-content.page-15.active {
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                z-index: 10 !important;
                position: relative !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: calc(100% - 44px) !important;
                background-color: #1a1a1a !important;
                color: white !important;
                flex-direction: column !important;
                padding: 0 !important;
                margin: 0 !important;
                box-sizing: border-box !important;
            }
        `;
        document.head.appendChild(style);

        console.log('已激活page-15，类名:', page15.className);
        console.log('添加了强制CSS规则');



        // 检查计算样式
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(page15);
            console.log('延迟检查 - 计算后的display:', computedStyle.display);
            console.log('延迟检查 - 计算后的visibility:', computedStyle.visibility);
            console.log('延迟检查 - 计算后的background:', computedStyle.background);
        }, 100);
    } else {
        console.error('未找到page-15元素');
    }
}

// 状态页面和收藏页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 状态卡片点击交互
    document.addEventListener('click', function(e) {
        const statusCard = e.target.closest('.status-card');
        if (statusCard) {
            // 移除所有卡片的激活状态
            document.querySelectorAll('.status-card').forEach(card => {
                card.classList.remove('status-card-active');
            });

            // 添加当前卡片的激活状态
            statusCard.classList.add('status-card-active');

            // 添加点击动画效果
            statusCard.style.transform = 'scale(0.98)';
            setTimeout(() => {
                statusCard.style.transform = '';
            }, 150);

            console.log('状态卡片被点击:', statusCard.querySelector('.status-card-title').textContent);
        }

        // 状态添加按钮点击
        const statusAddBtn = e.target.closest('.status-add-btn');
        if (statusAddBtn) {
            // 添加点击动画效果
            statusAddBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                statusAddBtn.style.transform = '';
            }, 150);

            console.log('添加状态按钮被点击');
            // 这里可以添加打开状态选择器的逻辑
        }

        // 状态设置按钮点击
        const statusSettingsBtn = e.target.closest('.status-settings-btn');
        if (statusSettingsBtn) {
            // 添加点击动画效果
            statusSettingsBtn.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                statusSettingsBtn.style.transform = '';
            }, 150);

            console.log('状态设置按钮被点击');
            // 这里可以添加跳转到设置页面的逻辑
        }

        // 状态卡片菜单按钮点击
        const statusCardMenu = e.target.closest('.status-card-menu');
        if (statusCardMenu) {
            e.stopPropagation(); // 阻止事件冒泡到卡片

            // 添加点击动画效果
            statusCardMenu.style.transform = 'scale(0.9)';
            setTimeout(() => {
                statusCardMenu.style.transform = '';
            }, 150);

            console.log('状态卡片菜单按钮被点击');
            // 这里可以添加显示菜单的逻辑
        }

        // 收藏页面返回按钮点击
        const favoritesBackBtn = e.target.closest('.favorites-back-btn');
        if (favoritesBackBtn) {
            // 添加点击动画效果
            favoritesBackBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                favoritesBackBtn.style.transform = '';
            }, 150);

            console.log('收藏页面返回按钮被点击');
            // 返回到上一页或主页
            goBack();
        }

        // 集团部室页面返回按钮点击
        const departmentBackBtn = e.target.closest('.department-back-btn');
        if (departmentBackBtn) {
            // 添加点击动画效果
            departmentBackBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                departmentBackBtn.style.transform = '';
            }, 150);

            console.log('集团部室页面返回按钮被点击');
            // 返回到通讯录页面（第6页）
            goTo(6);
        }
    });
});

// 邮箱内容4页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 邮箱内容4页面返回按钮
    document.addEventListener('click', function(e) {
        if (e.target.closest('.page-19 .email-detail-back-btn')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('邮箱内容4页面返回按钮被点击');

            // 返回到邮箱列表页面（第5页）
            goTo(5);
        }
    });

    // 邮箱内容4页面上下导航按钮
    document.addEventListener('click', function(e) {
        if (e.target.closest('.page-19 .email-detail-up-btn')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('邮箱内容4页面上一封邮件按钮被点击');
            // 这里可以添加切换到上一封邮件的逻辑
        }

        if (e.target.closest('.page-19 .email-detail-down-btn')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('邮箱内容4页面下一封邮件按钮被点击');
            // 这里可以添加切换到下一封邮件的逻辑
        }
    });

    // 邮箱内容4页面底部操作按钮
    document.addEventListener('click', function(e) {
        if (e.target.closest('.page-19 .email-action-btn')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('邮箱内容4页面操作按钮被点击');

            // 添加点击反馈效果
            const btn = e.target.closest('.email-action-btn');
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// 移动端优化函数
function initMobileOptimizations() {
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isMobile) {
        document.body.classList.add('mobile-device');

        // iOS 特殊处理
        if (isIOS) {
            document.body.classList.add('ios-device');

            // 防止 iOS Safari 地址栏影响布局
            function setViewportHeight() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }

            setViewportHeight();
            window.addEventListener('resize', setViewportHeight);
            window.addEventListener('orientationchange', () => {
                setTimeout(setViewportHeight, 100);
            });
        }

        // 优化触摸响应
        addTouchOptimizations();

        // 防止双击缩放
        preventDoubleTapZoom();

        // 优化滚动性能
        optimizeScrolling();
    }
}

// 添加触摸优化
function addTouchOptimizations() {
    // 为所有可点击元素添加触摸反馈
    const clickableElements = document.querySelectorAll('button, .nav-item, .page-item, .todo-item, .mail-item, .contact-item, .app-icon');

    clickableElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        }, { passive: true });

        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '';
            }, 150);
        }, { passive: true });

        element.addEventListener('touchcancel', function() {
            this.style.opacity = '';
        }, { passive: true });
    });
}

// 防止双击缩放
function preventDoubleTapZoom() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// 优化滚动性能
function optimizeScrolling() {
    // 为滚动容器添加 momentum scrolling
    const scrollContainers = document.querySelectorAll('.pages-section, .mail-content, .contacts-content');

    scrollContainers.forEach(container => {
        container.style.webkitOverflowScrolling = 'touch';
        container.style.overflowScrolling = 'touch';
    });
}

// 添加移动端手势支持
function addMobileGestures() {
    const phoneScreen = document.querySelector('.phone-screen');
    if (!phoneScreen) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    phoneScreen.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    phoneScreen.addEventListener('touchmove', function(e) {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;

        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // 水平滑动切换页面
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // 向右滑动，上一页
                const prevBtn = document.getElementById('btn-prev');
                if (prevBtn && !prevBtn.disabled) {
                    prevBtn.click();
                }
            } else {
                // 向左滑动，下一页
                const nextBtn = document.getElementById('btn-next');
                if (nextBtn && !nextBtn.disabled) {
                    nextBtn.click();
                }
            }
        }
    }, { passive: true });
}

// PWA功能增强
function initPWAFeatures() {
    console.log('🚀 初始化PWA功能...');

    // 检查是否在独立模式下运行（已安装到主屏幕）
    if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
        console.log('📱 应用正在独立模式下运行');
        document.body.classList.add('standalone-mode');

        // 隐藏浏览器相关的UI元素
        const browserElements = document.querySelectorAll('.browser-only');
        browserElements.forEach(el => el.style.display = 'none');
    }

    // 监听网络状态变化
    window.addEventListener('online', function() {
        console.log('🌐 网络已连接');
        showNetworkStatus('已连接到网络', 'success');
    });

    window.addEventListener('offline', function() {
        console.log('📵 网络已断开');
        showNetworkStatus('网络连接已断开，应用将在离线模式下运行', 'warning');
    });

    // 检查当前网络状态
    if (!navigator.onLine) {
        showNetworkStatus('当前处于离线模式', 'info');
    }

    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + H: 返回首页
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            goTo(1);
        }

        // 左右箭头键切换页面
        if (e.key === 'ArrowLeft') {
            const currentPage = getCurrentPage();
            if (currentPage > 1) {
                goTo(currentPage - 1);
            }
        } else if (e.key === 'ArrowRight') {
            const currentPage = getCurrentPage();
            if (currentPage < 21) {
                goTo(currentPage + 1);
            }
        }
    });

    console.log('✅ PWA功能初始化完成');
}

// 显示网络状态提示
function showNetworkStatus(message, type = 'info') {
    const statusDiv = document.createElement('div');
    statusDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        border-radius: 8px;
        color: white;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        z-index: 10001;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;

    // 根据类型设置颜色
    const colors = {
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3'
    };

    statusDiv.style.background = colors[type] || colors.info;
    statusDiv.textContent = message;

    document.body.appendChild(statusDiv);

    // 3秒后自动移除
    setTimeout(() => {
        statusDiv.style.opacity = '0';
        statusDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (statusDiv.parentElement) {
                statusDiv.remove();
            }
        }, 300);
    }, 3000);
}

// 获取当前页面号
function getCurrentPage() {
    const activePage = document.querySelector('.app-content.active');
    if (activePage) {
        const classList = Array.from(activePage.classList);
        const pageClass = classList.find(cls => cls.startsWith('page-'));
        if (pageClass) {
            return parseInt(pageClass.split('-')[1]);
        }
    }
    return 1;
}

// 全局暴露函数
window.goBackToTodo = goBackToTodo;
window.initMobileOptimizations = initMobileOptimizations;
window.initPWAFeatures = initPWAFeatures;
window.showNetworkStatus = showNetworkStatus;
window.getCurrentPage = getCurrentPage;
