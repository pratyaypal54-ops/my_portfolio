/**
 * Pratyay Pal — Interactive Portfolio Engine
 * Features:
 * - Particle Constellation Background Canvas
 * - Live Embedded Sorting Algorithm Visualizer Sandbox
 * - Interactive Developer Terminal / CLI Console
 * - Interactive Cat Playground & Scenic Companion
 * - Animated Metric Counters (IntersectionObserver)
 * - 3D Perspective Tilt on Cards
 * - ScrollSpy, Scroll Progress & Circular Back-To-Top Ring
 * - Mobile Drawer & Toast System
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. SOUND EFFECTS (MUTED / DISABLED BY PREFERENCE)
     ========================================================================== */
  const playClick = () => {};
  const playSuccess = () => {};
  const playMeow = () => {};
  const playPurr = () => {};


  /* ==========================================================================
     2. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(msg, duration = 3000) {
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }


  /* ==========================================================================
     3. HERO CANVAS: COSMIC STARDUST & PARTICLE CONSTELLATION NETWORK
     ========================================================================== */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // 1. Ambient Twinkling Cosmic Stars (Soft, gentle background depth)
    const cosmicStars = [];
    const starCount = Math.min(Math.floor((width * height) / 8000), 75);

    function initCosmicStars() {
      cosmicStars.length = 0;
      for (let i = 0; i < starCount; i++) {
        cosmicStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.1 + 0.4,
          baseAlpha: Math.random() * 0.45 + 0.25,
          twinkleSpeed: Math.random() * 0.02 + 0.008,
          phase: Math.random() * Math.PI * 2,
          isCyan: Math.random() > 0.65
        });
      }
    }
    initCosmicStars();

    // 2. Drifting Cosmic Stardust Motes
    const stardustMotes = [];
    const moteCount = 22;
    function initStardustMotes() {
      stardustMotes.length = 0;
      for (let i = 0; i < moteCount; i++) {
        stardustMotes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -Math.random() * 0.22 - 0.06,
          radius: Math.random() * 1.6 + 0.8,
          alpha: Math.random() * 0.35 + 0.15
        });
      }
    }
    initStardustMotes();

    // 3. Interactive Constellation Nodes
    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 16000), 45);
    const mouse = { x: null, y: null, maxDist: 140 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.8 + 1;
        this.baseColor = Math.random() > 0.4 ? 'rgba(96, 165, 250,' : 'rgba(6, 182, 212,';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.maxDist) {
            const force = (mouse.maxDist - dist) / mouse.maxDist;
            this.x -= (dx / dist) * force * 1.2;
            this.y -= (dy / dist) * force * 1.2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor + ' 0.75)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // A. Render Ambient Cosmic Stars with gentle twinkling
      for (let i = 0; i < cosmicStars.length; i++) {
        const s = cosmicStars[i];
        s.phase += s.twinkleSpeed;
        const currentAlpha = s.baseAlpha + Math.sin(s.phase) * (s.baseAlpha * 0.55);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.isCyan 
          ? `rgba(103, 232, 249, ${Math.max(0.1, currentAlpha)})`
          : `rgba(241, 245, 249, ${Math.max(0.1, currentAlpha)})`;
        ctx.fill();
      }

      // B. Render Floating Cosmic Stardust Motes
      for (let i = 0; i < stardustMotes.length; i++) {
        const m = stardustMotes[i];
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < 0) { m.y = height; m.x = Math.random() * width; }
        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${m.alpha})`;
        ctx.fill();
      }

      // C. Draw Constellation Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // D. Draw Lines to Mouse
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.maxDist) {
            const alpha = (1 - dist / mouse.maxDist) * 0.45;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initCosmicStars();
      initStardustMotes();
    });

    const heroSection = document.getElementById('top');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      heroSection.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
      });
    }
  }


  /* ==========================================================================
     4. TYPEWRITER ANIMATION (HERO)
     ========================================================================== */
  const typedWords = [
    "Pratyay Pal",
    "a Software Engineer",
    "a Frontend Developer",
    "a Backend Developer",
    "a Full Stack Web Developer",
    "a Problem Solver"
  ];

  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 65;
    const DELETE_SPEED = 35;
    const PAUSE_AFTER_TYPE = 1200;
    const PAUSE_AFTER_DELETE = 250;

    function tick() {
      const currentWord = typedWords[wordIndex];

      if (!isDeleting) {
        charIndex++;
        typedEl.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        typedEl.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % typedWords.length;
          setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    }
    tick();
  }


  /* ==========================================================================
     5. CYBERCAT SCENIC COMPANION (PEACEFUL STROLL & INTERACTIVE PETTING)
     ========================================================================== */
  const catTrack = document.getElementById('cat-track');
  const catEffectsLayer = document.getElementById('cat-effects-layer');
  const catBubble = document.getElementById('cat-bubble');
  const interactiveCat = document.getElementById('interactive-cat');

  let speechTimeout = null;
  let isPetted = false;

  const catIdleQuotes = [
    "Purrr... peaceful evening stroll! 🌙",
    "Soft paws, sharp mind! 🐾",
    "Strolling by the village cottages! 🏡",
    "Meow! Thanks for visiting! ✨",
    "Writing clean code & staying cozy! ☕",
    "Basking under the cyber moonlight! 🌟",
    "*stretches happily* Meow! 😸"
  ];

  const catPetQuotes = [
    "Purrrrrr! ❤️ That feels so nice!",
    "Meow! *nuzzles hand softly* ✨",
    "*content purring sounds* 🐾",
    "You're awesome! Keep building great things! 🚀",
    "Purrr... don't forget to take breaks! ☕",
    "Happy cat vibes activated! 💖"
  ];

  function showCatBubble(msg, duration = 3000) {
    if (!catBubble) return;
    catBubble.textContent = msg;
    catBubble.classList.add('show');
    clearTimeout(speechTimeout);
    speechTimeout = setTimeout(() => {
      catBubble.classList.remove('show');
    }, duration);
  }

  function spawnCatHeart(x, y) {
    if (!catEffectsLayer) return;
    const heart = document.createElement('div');
    heart.className = 'cat-heart';
    const icons = ["<i class='bx bxs-heart'></i>", "<i class='bx bxs-star'></i>", "<i class='bx bx-sparkles'></i>"];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = `${x}px`;
    heart.style.bottom = `${y}px`;
    catEffectsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 1400);
  }

  // Interactive Petting Reaction
  function petCat(clientX, clientY) {
    playPurr();
    if (catTrack) {
      const rect = catTrack.getBoundingClientRect();
      const clickX = clientX ? Math.max(20, Math.min(rect.width - 30, clientX - rect.left)) : 140;
      const clickY = clientY ? Math.max(20, rect.bottom - clientY) : 40;
      spawnCatHeart(clickX, clickY);
    }
    showCatBubble(catPetQuotes[Math.floor(Math.random() * catPetQuotes.length)], 3200);

    if (interactiveCat && !isPetted) {
      isPetted = true;
      interactiveCat.classList.add('is-petted');
      setTimeout(() => {
        if (interactiveCat) interactiveCat.classList.remove('is-petted');
        isPetted = false;
      }, 1800);
    }
  }

  if (catTrack) {
    catTrack.addEventListener('click', (e) => {
      petCat(e.clientX, e.clientY);
    });

    catTrack.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        petCat(e.touches[0].clientX, e.touches[0].clientY);
      } else {
        petCat();
      }
    }, { passive: true });
  }

  // Periodic sweet thoughts while strolling
  setInterval(() => {
    if (catBubble && !catBubble.classList.contains('show')) {
      if (Math.random() < 0.45) {
        showCatBubble(catIdleQuotes[Math.floor(Math.random() * catIdleQuotes.length)], 3500);
      }
    }
  }, 16000);

  /* ==========================================================================
     6. DEVELOPER TERMINAL / CLI CONSOLE
     ========================================================================== */
  const terminalModal = document.getElementById('terminal-modal');
  const termInput = document.getElementById('terminal-input');
  const termHistory = document.getElementById('terminal-history');
  const termCloseDot = document.getElementById('term-close-dot');
  const termClearDot = document.getElementById('term-minimize-dot');
  const termHelpDot = document.getElementById('term-maximize-dot');

  const cmdHistory = [];
  let historyIdx = -1;

  function openTerminal() {
    if (!terminalModal) return;
    playClick();
    terminalModal.classList.add('open');
    if (termInput) {
      setTimeout(() => termInput.focus(), 150);
    }
  }

  function closeTerminal() {
    if (!terminalModal) return;
    playClick();
    terminalModal.classList.remove('open');
  }

  // Trigger buttons
  const navTermBtn = document.getElementById('nav-term-btn');
  const heroTermBtn = document.getElementById('hero-term-btn');
  const drawerTermBtn = document.getElementById('drawer-term-btn');

  if (navTermBtn) navTermBtn.addEventListener('click', openTerminal);
  if (heroTermBtn) heroTermBtn.addEventListener('click', openTerminal);
  if (drawerTermBtn) {
    drawerTermBtn.addEventListener('click', () => {
      closeDrawer();
      openTerminal();
    });
  }

  if (termCloseDot) termCloseDot.addEventListener('click', closeTerminal);
  if (termClearDot) termClearDot.addEventListener('click', () => {
    if (termHistory) termHistory.innerHTML = '';
  });
  if (termHelpDot) termHelpDot.addEventListener('click', () => executeCommand('help'));

  // Terminal shortcut keys (` or Esc)
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' && !e.ctrlKey && !e.metaKey && document.activeElement !== termInput && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (terminalModal && terminalModal.classList.contains('open')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && terminalModal && terminalModal.classList.contains('open')) {
      closeTerminal();
    }
  });

  // Close modal when clicking outside terminal window
  if (terminalModal) {
    terminalModal.addEventListener('click', (e) => {
      if (e.target === terminalModal) {
        closeTerminal();
      }
    });
  }

  // Terminal command executor
  function appendTermOutput(text, type = 'info') {
    if (!termHistory) return;
    const line = document.createElement('div');
    line.className = `terminal-output-line ${type}`;
    line.innerHTML = text;
    termHistory.appendChild(line);

    const termContent = document.getElementById('terminal-content');
    if (termContent) termContent.scrollTop = termContent.scrollHeight;
  }

  function executeCommand(cmd) {
    const raw = cmd.trim();
    if (!raw) return;

    cmdHistory.push(raw);
    historyIdx = cmdHistory.length;

    appendTermOutput(`<span style="color:var(--accent-cyan);">guest@pratyay-pal:~$</span> ${raw}`, 'cmd-echo');
    const lower = raw.toLowerCase();

    switch (lower) {
      case 'help':
        appendTermOutput(`Available commands:
  <strong style="color:var(--accent-light);">about</strong>     - View summary bio & engineering profile
  <strong style="color:var(--accent-light);">skills</strong>    - View technical languages, frameworks & concepts
  <strong style="color:var(--accent-light);">projects</strong>  - View featured software engineering projects
  <strong style="color:var(--accent-light);">stats</strong>     - View LeetCode solved count & academic record
  <strong style="color:var(--accent-light);">cat</strong>       - ASCII cat easter egg & cheerful meow
  <strong style="color:var(--accent-light);">matrix</strong>    - Launch green matrix digital rain mode
  <strong style="color:var(--accent-light);">contact</strong>   - Display direct email, phone & social coordinates
  <strong style="color:var(--accent-light);">hire</strong>      - Express hiring interest & get instant reach out
  <strong style="color:var(--accent-light);">clear</strong>     - Clear terminal display buffer
  <strong style="color:var(--accent-light);">date</strong>      - Show current system date & time
  <strong style="color:var(--accent-light);">exit</strong>      - Close this terminal modal window`);
        break;

      case 'about':
        appendTermOutput(`[PROFILE] Pratyay Pal
--------------------------------------------------
Final-year B.Tech Information Technology student at RCC Institute of Information Technology (MAKAUT), Kolkata.
Curious engineer focused on Data Structures, Algorithms, Object-Oriented Software Design, and Web Systems.`);
        break;

      case 'skills':
        appendTermOutput(`[TECH STACK]
--------------------------------------------------
Languages: Java, JavaScript (ES6+), Python, HTML5, CSS3
Concepts:  Data Structures & Algorithms (100+ Solved), OOP, DBMS & SQL
Tools:     Git, GitHub, VS Code, Browser DevTools
Other:     Engineering Mathematics, Generative AI & Prompting`);
        break;

      case 'projects':
        appendTermOutput(`[FLAGSHIP BUILDS & SYSTEMS]
--------------------------------------------------
1. PharmCare — Pharmacy ERP & POS Suite (Major Project)
   - Real-time shop dashboard & low-stock action alerts
   - Keyboard-accelerated cash memo POS billing (F1/F2/Ctrl+S)
   - Inventory batch restock, rack mapping, & discrepancy audits
   - Sales revenue analytics & 100% offline-ready PDF backups
   - Multi-role staff access control (RBAC)

2. Sorting Algorithm Visualizer (Interactive CS Suite)
   - Step-by-step animation of 5 sorting algorithms
   - Real-time telemetry: comparisons, swaps, Big-O analysis
   - HTML5 Web Audio API procedural sound synthesis

3. DSA CodeVault & Problem Tracker (Algorithms Engine)
   - 100+ solved algorithmic problems categorized by pattern
   - Complexity HUD, Two Pointers, Trees, Graphs, DP

4. Interactive Developer Portfolio & Terminal CLI
   - Custom developer platform with interactive UNIX shell emulator
   - Web Audio synthesizer & responsive particle physics canvas`);
        break;

      case 'stats':
        appendTermOutput(`[METRICS & ACHIEVEMENTS]
--------------------------------------------------
- Problems Solved: 100+ (LeetCode & GeeksforGeeks)
- Degree CGPA:     7.34 / 10.0 (till 6th Semester)
- Secondary Exam:  81.14% (WBBSE)
- Higher Sec.:     76.20% (WBCHSE)
- Graduating:      2027`);
        break;

      case 'cat':
        playMeow();
        appendTermOutput(`
    /\\_/\\  
   ( o.o )  *meow*! Thanks for checking my human's portfolio!
    > ^ <   Pratyay loves writing algorithms and petting cats.
   /  |  \\
  (___|___)
`, 'success');
        break;

      case 'matrix':
        appendTermOutput(`Initiating Matrix digital stream...`, 'success');
        let count = 0;
        const matrixInt = setInterval(() => {
          let line = '';
          for (let i = 0; i < 40; i++) {
            line += String.fromCharCode(33 + Math.floor(Math.random() * 90));
          }
          appendTermOutput(line, 'success');
          count++;
          if (count > 8) clearInterval(matrixInt);
        }, 80);
        break;

      case 'contact':
        appendTermOutput(`[GET IN TOUCH]
--------------------------------------------------
Email:    pratyaypal54@gmail.com
Phone:    +91-8945092290
LinkedIn: linkedin.com/in/pratyay-pal-953b45332
GitHub:   github.com/pratyaypal54-ops
Location: Kolkata, West Bengal, India`);
        break;

      case 'hire':
        playSuccess();
        appendTermOutput(`⚡ Thank you for your interest in hiring Pratyay!
He is actively seeking engineering internships & junior developer roles.
Email has been copied to your clipboard. Redirecting to contact section...`, 'success');
        copyEmailToClipboard();
        setTimeout(() => {
          closeTerminal();
          window.location.hash = '#contact';
        }, 1200);
        break;

      case 'clear':
      case 'cls':
        if (termHistory) termHistory.innerHTML = '';
        break;

      case 'date':
        appendTermOutput(new Date().toString());
        break;

      case 'exit':
      case 'close':
      case 'quit':
        closeTerminal();
        break;

      default:
        appendTermOutput(`command not found: "${raw}". Type <strong style="color:var(--accent-light);">'help'</strong> for a list of commands.`, 'error');
        break;
    }
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = termInput.value;
        termInput.value = '';
        executeCommand(cmd);
      } else if (e.key === 'ArrowUp') {
        if (cmdHistory.length > 0 && historyIdx > 0) {
          historyIdx--;
          termInput.value = cmdHistory[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < cmdHistory.length - 1) {
          historyIdx++;
          termInput.value = cmdHistory[historyIdx];
        } else {
          historyIdx = cmdHistory.length;
          termInput.value = '';
        }
      }
    });
  }

  // Quick Command Shortcut Buttons
  document.querySelectorAll('.term-tag[data-cmd]').forEach(tag => {
    tag.addEventListener('click', () => {
      playClick();
      const cmd = tag.dataset.cmd;
      executeCommand(cmd);
    });
  });


  /* ==========================================================================
     8. ANIMATED STATS NUMBER COUNTERS (IntersectionObserver)
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  let statsTriggered = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.dataset.target);
      const isDecimal = stat.dataset.decimals === '2';
      const noPlus = stat.dataset.noPlus === 'true';
      const duration = 1600;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeOut;

        if (isDecimal) {
          stat.textContent = currentVal.toFixed(2);
        } else {
          stat.textContent = Math.floor(currentVal) + (noPlus ? '' : '+');
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = isDecimal ? target.toFixed(2) : (target + (noPlus ? '' : '+'));
        }
      }
      requestAnimationFrame(updateCounter);
    });
  }

  const statsSection = document.getElementById('overview');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsTriggered) {
          statsTriggered = true;
          animateCounters();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(statsSection);
  } else {
    animateCounters();
  }


  /* ==========================================================================
     9. SKILLS FILTERING
     ========================================================================== */
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      playClick();
      document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.skill-group').forEach(g => {
        g.style.display = (f === 'all' || g.dataset.cat === f) ? '' : 'none';
      });
    });
  });


  /* ==========================================================================
     10. SCROLL PROGRESS, SCROLLSPY & FLOATING BACK-TO-TOP
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.querySelector('.progress-ring-circle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('header[id], section[id]');

  const circleLength = 2 * Math.PI * 22; // ~138.2
  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circleLength}`;
    progressCircle.style.strokeDashoffset = `${circleLength}`;
  }

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;

    // Scroll reading progress bar
    if (scrollProgress) {
      scrollProgress.style.width = `${progress * 100}%`;
    }

    // Navbar shadow on scroll
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility & circular progress
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      if (progressCircle) {
        const offset = circleLength - (progress * circleLength);
        progressCircle.style.strokeDashoffset = `${offset}`;
      }
    }

    // ScrollSpy active link update
    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollTop >= top && scrollTop < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    if (currentSection) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      playClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ==========================================================================
     11. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const closeDrawerBtn = document.getElementById('close-drawer');

  function openDrawer() {
    playClick();
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
  }

  function closeDrawer() {
    playClick();
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
  }

  if (navToggle) navToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  /* ==========================================================================
     12. 3D PERSPECTIVE TILT ON CARDS
     ========================================================================== */
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ==========================================================================
     13. CLIPBOARD COPY & CONTACT FORM
     ========================================================================== */
  function copyEmailToClipboard() {
    const email = 'pratyaypal54@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      playClick();
      showToast('Copied pratyaypal54@gmail.com to clipboard! 📋');
    }).catch(() => {
      showToast('Email: pratyaypal54@gmail.com');
    });
  }

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmailToClipboard();
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playSuccess();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const msg = document.getElementById('contact-msg').value;

      const mailtoUrl = `mailto:pratyaypal54@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + msg)}`;

      showToast('Opening default email client... ✉️');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 300);

      contactForm.reset();
    });
  }


  /* ==========================================================================
     13. PROJECT IMAGE CAROUSELS & FULLSCREEN LIGHTBOX
     ========================================================================== */
  const lightboxModal = document.getElementById('project-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxThumbs = document.getElementById('lightbox-thumbnails');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  let activeLightboxSlides = [];
  let currentLightboxIndex = 0;
  let activeLightboxProjectTitle = '';

  function openLightbox(slides, startIndex, projectTitle) {
    if (!lightboxModal || !slides || slides.length === 0) return;
    activeLightboxSlides = slides;
    currentLightboxIndex = startIndex || 0;
    activeLightboxProjectTitle = projectTitle || 'Project Preview';

    updateLightboxUI();
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightboxUI() {
    if (activeLightboxSlides.length === 0) return;
    const currentSlide = activeLightboxSlides[currentLightboxIndex];
    if (!currentSlide) return;

    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = currentSlide.src;
        lightboxImg.alt = currentSlide.caption || 'Project screenshot';
        lightboxImg.style.opacity = '1';
      }, 80);
    }

    if (lightboxTitle) lightboxTitle.textContent = activeLightboxProjectTitle;
    if (lightboxCaption) lightboxCaption.textContent = currentSlide.caption || '';
    if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${activeLightboxSlides.length}`;

    // Render / update thumbnails
    if (lightboxThumbs) {
      if (activeLightboxSlides.length > 1) {
        lightboxThumbs.style.display = 'flex';
        lightboxThumbs.innerHTML = '';
        activeLightboxSlides.forEach((slide, idx) => {
          const thumb = document.createElement('div');
          thumb.className = `lightbox-thumb ${idx === currentLightboxIndex ? 'active' : ''}`;
          thumb.innerHTML = `<img src="${slide.src}" alt="${slide.caption || 'thumb'}">`;
          thumb.addEventListener('click', () => {
            currentLightboxIndex = idx;
            updateLightboxUI();
          });
          lightboxThumbs.appendChild(thumb);
        });
      } else {
        lightboxThumbs.style.display = 'none';
      }
    }

    if (lightboxPrev && lightboxNext) {
      lightboxPrev.style.display = activeLightboxSlides.length > 1 ? 'flex' : 'none';
      lightboxNext.style.display = activeLightboxSlides.length > 1 ? 'flex' : 'none';
    }
  }

  function stepLightbox(dir) {
    if (activeLightboxSlides.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + dir + activeLightboxSlides.length) % activeLightboxSlides.length;
    updateLightboxUI();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => stepLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => stepLightbox(1));

  window.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    }
  });

  // Initialize all project carousels dynamically
  const projectCarousels = document.querySelectorAll('.proj-carousel');
  projectCarousels.forEach(carousel => {
    const card = carousel.closest('.proj-card');
    const projectTitle = card ? (card.querySelector('h3')?.textContent || 'Project') : 'Project';
    const captionDisplay = card ? card.querySelector('.carousel-caption-text') : null;
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-nav-btn.prev-btn');
    const nextBtn = carousel.querySelector('.carousel-nav-btn.next-btn');
    const counterBadge = carousel.querySelector('.carousel-info-badge');
    const slideNum = carousel.querySelector('.slide-num');
    const slideTotal = carousel.querySelector('.slide-total');
    const dotsContainer = carousel.querySelector('.carousel-dots-container');
    const zoomBtn = carousel.querySelector('.carousel-zoom-btn');

    const slideData = slides.map((slide, idx) => {
      const img = slide.querySelector('img');
      return {
        index: idx,
        src: img ? img.getAttribute('src') : '',
        caption: slide.getAttribute('data-caption') || img?.getAttribute('alt') || `Screenshot ${idx + 1}`
      };
    });

    let activeIndex = 0;

    function goToSlide(newIndex) {
      if (slides.length === 0) return;
      activeIndex = (newIndex + slides.length) % slides.length;

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === activeIndex);
      });

      if (slideNum) slideNum.textContent = activeIndex + 1;
      if (captionDisplay && slideData[activeIndex]) {
        captionDisplay.textContent = slideData[activeIndex].caption;
      }

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === activeIndex);
        });
      }
    }

    if (slides.length > 1) {
      if (slideTotal) slideTotal.textContent = slides.length;
      if (slideNum) slideNum.textContent = 1;

      // Build pagination dots
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
          const dot = document.createElement('button');
          dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
          dot.addEventListener('click', (e) => {
            e.stopPropagation();
            goToSlide(idx);
          });
          dotsContainer.appendChild(dot);
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          goToSlide(activeIndex - 1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          goToSlide(activeIndex + 1);
        });
      }

      // Touch swipe support
      let touchStartX = 0;
      carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) goToSlide(activeIndex + 1);
          else goToSlide(activeIndex - 1);
        }
      }, { passive: true });

    } else {
      // Single slide: hide navigation buttons and dots
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (counterBadge) counterBadge.style.display = 'none';
      if (dotsContainer) dotsContainer.style.display = 'none';
    }

    // Zoom button opens lightbox
    if (zoomBtn) {
      zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(slideData, activeIndex, projectTitle);
      });
    }

    // Allow clicking on slide to zoom
    slides.forEach((slide, idx) => {
      slide.style.cursor = 'zoom-in';
      slide.addEventListener('click', (e) => {
        if (e.target.closest('.carousel-nav-btn') || e.target.closest('.carousel-dot') || e.target.closest('.carousel-zoom-btn')) return;
        openLightbox(slideData, idx, projectTitle);
      });
    });

    // Handle "Browse Screens" buttons if present in card
    if (card) {
      const browseBtns = card.querySelectorAll('.open-gallery-btn');
      browseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openLightbox(slideData, activeIndex, projectTitle);
        });
      });
    }
  });


  /* ==========================================================================
     14. CUSTOM CURSOR INTERPOLATION (DESKTOP)
     ========================================================================== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const interactiveTargets = document.querySelectorAll('a, button, input, select, textarea, .stat-card, .skill-card, .act-card, .cat-track, .term-tag, .proj-card, .carousel-nav-btn, .carousel-zoom-btn, .carousel-dot, .lightbox-arrow, .lightbox-close-btn, .lightbox-thumb');
    interactiveTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  }

});