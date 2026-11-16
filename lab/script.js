/* 白芷的个人主页 - 导航 / 主题 / 轮播 / 本地表单 */
(function () {
  'use strict';

  // 当浏览器不允许持久存储时，交互仍可以在当前打开的页面中使用。
  const fallbackStore = {};
  function readStore(key) {
    try { return window.localStorage.getItem(key); }
    catch (_) { return fallbackStore[key] || null; }
  }
  function writeStore(key, value) {
    fallbackStore[key] = value;
    try { window.localStorage.setItem(key, value); } catch (_) { /* Private mode */ }
  }
  function removeStore(key) {
    delete fallbackStore[key];
    try { window.localStorage.removeItem(key); } catch (_) { /* Private mode */ }
  }

  // 1. 主题切换：保留用户在此设备上的显示偏好。
  const themeToggle = document.getElementById('theme-toggle');
  function applyTheme(dark) {
    document.body.classList.toggle('dark-mode', dark);
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? '切换为浅色模式' : '切换为深色模式');
    themeToggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
    themeToggle.querySelector('.theme-label').textContent = dark ? '日间' : '夜间';
  }
  const storedTheme = readStore('thq-theme');
  const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(storedTheme === null ? preferDark : storedTheme === 'dark');
  themeToggle.addEventListener('click', function () {
    const nextDark = !document.body.classList.contains('dark-mode');
    applyTheme(nextDark);
    writeStore('thq-theme', nextDark ? 'dark' : 'light');
  });

  // 2. 移动端折叠导航：关闭时还原 aria-expanded 状态。
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  function closeMenu() {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '展开导航菜单');
  }
  menuToggle.addEventListener('click', function () {
    const opened = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(opened));
    menuToggle.setAttribute('aria-label', opened ? '收起导航菜单' : '展开导航菜单');
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', function (event) {
    if (nav.classList.contains('is-open') && !nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 800) closeMenu(); });

  // 3. 项目轮播：用真实的研究方向作内容，不包含虚构论文/指标。
  const projects = [
    {
      theme: 'lilac', category: 'TIME-SERIES FORECASTING',
      title: '时间序列预测和 RAG',
      description: '最近在研究检索增强的时间序列预测。历史片段看起来相似，后面的走势却不一定一样，所以想弄清楚什么时候检索有用、什么时候会拖后腿。',
      tags: ['时间序列', '检索增强', '模型评估']
    },
    {
      theme: 'blue', category: 'AI IN EDUCATION',
      title: '课堂教学行为分析',
      description: '之前做过师生对话和教学行为分类，主要处理课堂文本，看看能不能用自然语言处理方法分析不同的教学互动。',
      tags: ['AI 教育', '文本分析', '课堂互动']
    },
    {
      theme: 'peach', category: 'OPEN-WORLD ANOMALY DETECTION',
      title: '开放世界异常检测',
      description: '还参与过异常检测相关项目，尝试让多个模型一起复核异常事件，减少单个模型判断不准的问题。',
      tags: ['异常检测', '多模型协作', '可靠性']
    }
  ];
  let activeProject = 0;
  const carousel = document.querySelector('.project-carousel');
  const carouselDots = document.getElementById('carousel-dots');
  const projectArt = document.getElementById('project-art');
  function setProject(index) {
    activeProject = (index + projects.length) % projects.length;
    const item = projects[activeProject];
    document.getElementById('project-index').textContent = 'PROJECT 0' + (activeProject + 1) + ' / 0' + projects.length;
    document.getElementById('project-category').textContent = item.category;
    document.getElementById('project-title').textContent = item.title;
    document.getElementById('project-description').textContent = item.description;
    projectArt.dataset.theme = item.theme;
    projectArt.querySelector('.project-art-center').textContent = '0' + (activeProject + 1);
    const tagsRoot = document.getElementById('project-tags');
    tagsRoot.replaceChildren();
    item.tags.forEach(function (tag) {
      const span = document.createElement('span');
      span.textContent = tag;
      tagsRoot.appendChild(span);
    });
    [...carouselDots.children].forEach(function (dot, index) {
      dot.setAttribute('aria-current', String(index === activeProject));
    });
  }
  projects.forEach(function (_, index) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', '跳转到第 ' + (index + 1) + ' 个研究项目');
    dot.addEventListener('click', function () { setProject(index); });
    carouselDots.appendChild(dot);
  });
  document.getElementById('project-prev').addEventListener('click', function () { setProject(activeProject - 1); });
  document.getElementById('project-next').addEventListener('click', function () { setProject(activeProject + 1); });
  carousel.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      setProject(activeProject + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  setProject(0);

  // 4. 留言演示：只写入浏览器 localStorage，绝不发送网络请求。
  const notesKey = 'thq-demo-notes';
  const noteForm = document.getElementById('note-form');
  const nickname = document.getElementById('nickname');
  const note = document.getElementById('note');
  const message = document.getElementById('form-message');
  function getNotes() {
    try {
      const parsed = JSON.parse(readStore(notesKey) || '[]');
      return Array.isArray(parsed) ? parsed.slice(0, 3) : [];
    } catch (_) { return []; }
  }
  function renderNotes() {
    const items = getNotes();
    const wrapper = document.getElementById('saved-notes');
    const list = document.getElementById('notes-list');
    wrapper.hidden = items.length === 0;
    list.replaceChildren();
    items.forEach(function (item) {
      const li = document.createElement('li');
      const name = document.createElement('strong');
      name.textContent = String(item.name || '访客') + '：';
      const content = document.createElement('span');
      content.textContent = String(item.text || '');
      li.append(name, content); // textContent 不会把用户输入解析成 HTML。
      list.appendChild(li);
    });
  }
  [nickname, note].forEach(function (field) {
    field.addEventListener('input', function () { field.removeAttribute('aria-invalid'); message.textContent = ''; });
  });
  noteForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = nickname.value.trim();
    const text = note.value.trim();
    if (name.length < 2) {
      nickname.setAttribute('aria-invalid', 'true');
      message.textContent = '请填写至少 2 个字的称呼。'; nickname.focus(); return;
    }
    if (text.length < 8) {
      note.setAttribute('aria-invalid', 'true');
      message.textContent = '留言至少需要 8 个字哦。'; note.focus(); return;
    }
    const items = getNotes();
    items.unshift({ name: name.slice(0, 24), text: text.slice(0, 240) });
    writeStore(notesKey, JSON.stringify(items.slice(0, 3)));
    noteForm.reset();
    nickname.removeAttribute('aria-invalid'); note.removeAttribute('aria-invalid');
    message.textContent = '便签已经保存在当前浏览器！这只是本地演示，没有发送给网站作者。';
    renderNotes();
  });
  document.getElementById('clear-notes').addEventListener('click', function () {
    removeStore(notesKey);
    renderNotes();
    message.textContent = '本机便签记录已清空。';
  });
  renderNotes();
  document.getElementById('year').textContent = String(new Date().getFullYear());
}());
