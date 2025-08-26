// 华润办公移动应用设计界面交互脚本

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 页面开始加载 ===');

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
    const totalPages = document.querySelectorAll('.page-item').length || 21;
    let currentPage = 1; // 当前页码，初始根据侧边栏或激活页面再同步
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

    function getCurrentPageFromSidebar() {
        const items = Array.from(document.querySelectorAll('.page-item'));
        const idx = items.findIndex(i => i.classList.contains('active'));
        return idx >= 0 ? idx + 1 : 1;
    }

    function setSidebarActive(page) {
        const items = document.querySelectorAll('.page-item');
        if (!items?.length) return;
        items.forEach(i => i.classList.remove('active'));
        const target = items[page - 1];
        if (target) target.classList.add('active');
    }

    function switchContentForPage(page) {
        // 在切换有实际内容的页面(1-9)前，统一清空所有页面的 active，避免残留覆盖
        if (page <= 9) {
            document.querySelectorAll('.app-content').forEach(el => el.classList.remove('active'));
        }
        // 仅为 1-6 提供真实页面内容，其它页只更新左侧与页码
        if (page === 1) switchToPage1();
        else if (page === 2) switchToPage2();
        else if (page === 3) switchToPage3();
        else if (page === 4) switchToPage4();
        else if (page === 5) switchToPage5();
        else if (page === 6) switchToPage6();
        else if (page === 7) switchToPage7();
        else if (page === 8) switchToPage8();
        else if (page === 9) switchToPage9();
        else if (page === 10) switchToPage10();
        else if (page === 11) switchToPage11();
        else if (page === 12) switchToPage12();
        else if (page === 13) switchToPage13();
        else if (page === 14) switchToPage14();
        else if (page === 15) switchToPage15();
        else if (page === 16) switchToPage16();
        else if (page === 17) switchToPage17();
        else if (page === 18) switchToPage18();
        else if (page === 19) switchToPage19();
        else if (page === 20) switchToPage20();
        else if (page === 21) switchToPage21();
        else { setSidebarActive(page); setPageInfo(page); }
    }

    function goTo(page, opts = {}) {
        const { pushHistory = true } = opts;
        const target = Math.max(1, Math.min(totalPages, page));
        if (pushHistory && target !== currentPage) {
            navStack.push(currentPage);
        }
        setSidebarActive(target);
        switchContentForPage(target);
        currentPage = target;
        setPageInfo(currentPage);
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
    currentPage = getCurrentPageFromSidebar();
    setPageInfo(currentPage);

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
        const pageItems = document.querySelectorAll('.page-item');
        const pageInfo = document.querySelector('.page-info');

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

        // 更新左侧边栏页面选中状态 - 选中第1页（进入页面）
        pageItems.forEach(item => item.classList.remove('active'));
        pageItems[0].classList.add('active'); // 第1页是进入页面

        // 更新页面信息显示
        setPageInfo(1);
    }

    function switchToPage2() {
        const page1 = document.querySelector('.page-1');
        const page2 = document.querySelector('.page-2');
        const page3 = document.querySelector('.page-3');
        const page4 = document.querySelector('.page-4');
        const page5 = document.querySelector('.page-5');
        const page6 = document.querySelector('.page-6');
        const indicators = document.querySelectorAll('.indicator-dot');
        const pageItems = document.querySelectorAll('.page-item');
        const pageInfo = document.querySelector('.page-info');

        // 隐藏其他页面，显示第二个页面
        page1.classList.remove('active');
        page2.classList.add('active');
        page3.classList.remove('active');
        page4?.classList.remove('active');
        page5?.classList.remove('active');
        page6?.classList.remove('active');

        // 更新指示器
        indicators[0].classList.remove('active');
        indicators[1].classList.add('active');

        // 更新左侧边栏页面选中状态 - 选中第2页（润工作）
        pageItems.forEach(item => item.classList.remove('active'));
        pageItems[1].classList.add('active'); // 第2页是润工作页面

        // 更新页面信息显示
        setPageInfo(2);
    }

    function switchToPage3() {
        const page1 = document.querySelector('.page-1');
        const page2 = document.querySelector('.page-2');
        const page3 = document.querySelector('.page-3');
        const page4 = document.querySelector('.page-4');
        const page5 = document.querySelector('.page-5');
        const page6 = document.querySelector('.page-6');
        const indicators = document.querySelectorAll('.indicator-dot');
        const pageItems = document.querySelectorAll('.page-item');
        const pageInfo = document.querySelector('.page-info');

        // 隐藏其他页面，显示第三个页面
        page1.classList.remove('active');
        page2.classList.remove('active');
        page4?.classList.remove('active');
        page5?.classList.remove('active');
        page6?.classList.remove('active');
        page3.classList.add('active');

        // 更新指示器
        indicators[0].classList.remove('active');
        indicators[1].classList.remove('active');

        // 更新左侧边栏页面选中状态 - 选中第3页（消息）
        pageItems.forEach(item => item.classList.remove('active'));
        pageItems[2].classList.add('active'); // 第3页是消息页面

        // 更新页面信息显示
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




    // 页面项目点击交互
    const pageItems = document.querySelectorAll('.page-item');
    pageItems.forEach((item, index) => {
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
    document.querySelectorAll('.bottom-nav').forEach(nav => {
        const items = nav.querySelectorAll('.nav-item');
        items.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // 去掉同一导航内的激活态
                items.forEach(i => i.classList.remove('active'));
                this.classList.add('active');


                const target = Number(this.getAttribute('data-target'));
                if (!Number.isNaN(target)) {
                    goTo(target);
                }
            });
        });
    });



    // 页面切换函数已在上面定义

    // 个人名片页面编辑功能
    let currentEditElement = null;
    let currentEditType = null;

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
                const reader = new FileReader();
                reader.onload = function(e) {
                    const newAvatarSrc = e.target.result;
                    profileAvatar.src = newAvatarSrc;

                    // 同步更新所有页面的头像
                    updateAllPagesAvatar(newAvatarSrc);

                    // 保存头像数据到本地存储
                    const userData = UserDataManager.loadUserData() || UserDataManager.getDefaultUserData();
                    userData.avatar = newAvatarSrc;
                    UserDataManager.saveUserData(userData);

                    console.log('头像已更新并同步到所有页面');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 姓名点击编辑功能
    const profileName = document.getElementById('profileName');
    if (profileName) {
        profileName.addEventListener('click', function() {
            openEditModal('姓名', this.textContent, 'name');
        });
    }

    // 电话号码点击编辑功能
    const officePhone = document.getElementById('officePhone');
    const mobilePhone = document.getElementById('mobilePhone');

    if (officePhone) {
        officePhone.addEventListener('click', function() {
            openEditModal('办公电话', this.textContent, 'officePhone');
        });
    }

    if (mobilePhone) {
        mobilePhone.addEventListener('click', function() {
            openEditModal('手机号', this.textContent, 'mobilePhone');
        });
    }

    // 打开编辑模态框
    function openEditModal(title, currentValue, type) {
        const modal = document.getElementById('editModal');
        const modalTitle = document.getElementById('editModalTitle');
        const editInput = document.getElementById('editInput');

        if (modal && modalTitle && editInput) {
            modalTitle.textContent = `编辑${title}`;
            editInput.value = currentValue;
            editInput.placeholder = `请输入新的${title}`;
            currentEditType = type;

            // 根据类型设置当前编辑元素
            if (type === 'name') {
                currentEditElement = profileName;
            } else if (type === 'officePhone') {
                currentEditElement = officePhone;
            } else if (type === 'mobilePhone') {
                currentEditElement = mobilePhone;
            }

            modal.classList.add('active');
            editInput.focus();
            editInput.select();
        }
    }

    // 关闭编辑模态框
    function closeEditModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.classList.remove('active');
            currentEditElement = null;
            currentEditType = null;
        }
    }

    // 保存编辑
    function saveEdit() {
        const editInput = document.getElementById('editInput');
        if (editInput && currentEditElement) {
            const newValue = editInput.value.trim();
            if (newValue) {
                // 验证输入
                if (currentEditType === 'officePhone' || currentEditType === 'mobilePhone') {
                    // 简单的电话号码验证
                    const phoneRegex = /^[\d\-\+\*\s\(\)]+$/;
                    if (!phoneRegex.test(newValue)) {
                        alert('请输入有效的电话号码');
                        return;
                    }
                }

                currentEditElement.textContent = newValue;

                // 如果修改的是姓名，同步更新所有页面的姓名并保存数据
                if (currentEditType === 'name') {
                    updateAllPagesName(newValue);

                    // 保存姓名数据到本地存储
                    const userData = UserDataManager.loadUserData() || UserDataManager.getDefaultUserData();
                    userData.name = newValue;
                    UserDataManager.saveUserData(userData);
                }

                closeEditModal();

                // 这里可以添加保存到服务器的逻辑
                console.log(`${currentEditType} 已更新为: ${newValue}`);
            } else {
                alert('请输入有效的值');
            }
        }
    }

    // 绑定模态框按钮事件
    const cancelEdit = document.getElementById('cancelEdit');
    const saveEditBtn = document.getElementById('saveEdit');

    if (cancelEdit) {
        cancelEdit.addEventListener('click', closeEditModal);
    }

    if (saveEditBtn) {
        saveEditBtn.addEventListener('click', saveEdit);
    }

    // 模态框背景点击关闭
    const editModal = document.getElementById('editModal');
    if (editModal) {
        editModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeEditModal();
            }
        });
    }

    // 键盘事件处理
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('editModal');
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeEditModal();
            } else if (e.key === 'Enter') {
                saveEdit();
            }
        }
    });

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

    // 兼容旧函数名，保持向后兼容
    function updateMainPageAvatar(newAvatarSrc) {
        updateAllPagesAvatar(newAvatarSrc);
    }

    function updateMainPageName(newName) {
        updateAllPagesName(newName);
    }

    // 用户数据管理
    const UserDataManager = {
        // 保存用户数据到本地存储
        saveUserData: function(data) {
            try {
                localStorage.setItem('huarun_user_data', JSON.stringify(data));
                console.log('用户数据已保存到本地存储');
            } catch (error) {
                console.error('保存用户数据失败:', error);
            }
        },

        // 从本地存储加载用户数据
        loadUserData: function() {
            try {
                const data = localStorage.getItem('huarun_user_data');
                return data ? JSON.parse(data) : null;
            } catch (error) {
                console.error('加载用户数据失败:', error);
                return null;
            }
        },

        // 获取默认用户数据
        getDefaultUserData: function() {
            return {
                name: '张子滕',
                avatar: null, // 默认使用CSS中的头像
                company: '华润集团'
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
        }
    };

    // 页面初始化时同步所有用户信息
    function initializeUserInterface() {
        const userData = UserDataManager.initializeUserData();

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

        console.log('用户界面初始化完成:', userData);
    }

    // 页面加载完成后初始化用户界面
    initializeUserInterface();

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

// 全局暴露函数
window.goBackToTodo = goBackToTodo;
window.initMobileOptimizations = initMobileOptimizations;
