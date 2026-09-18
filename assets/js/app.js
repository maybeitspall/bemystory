/**
 * DIGITAL WEDDING INVITATION — MAIN CONTROLLER (app.js)
 * Modular Vanilla ES6+ Architecture
 * Features: Gate Unlocking, Audio Player, Countdown, Lightbox, RSVP, Clipboard, Animations
 */

(function () {
  'use strict';

  // --- CONFIG SHORTCUT ---
  const config = window.WEDDING_CONFIG || {};

  // --- HELPER: HTML Sanitizer ---
  function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // =========================================================================
  // 1. GUEST MANAGER (URL Parameter Parsing & Personalization)
  // =========================================================================
  const GuestManager = {
    guestName: 'Bapak / Ibu / Saudara / i',

    init() {
      const urlParams = new URLSearchParams(window.location.search);
      const guestParam = urlParams.get('to') || urlParams.get('nama') || urlParams.get('guest');

      if (guestParam && guestParam.trim().length > 0) {
        this.guestName = guestParam.trim();
      }

      // Populate Cover Greeting
      const coverGuestEl = document.getElementById('cover-guest-name');
      if (coverGuestEl) {
        coverGuestEl.textContent = this.guestName;
      }

      // Pre-fill RSVP Name input if not default
      const rsvpNameInput = document.getElementById('rsvp-name');
      if (rsvpNameInput && guestParam) {
        rsvpNameInput.value = this.guestName;
      }
    }
  };

  // =========================================================================
  // 2. AUDIO MANAGER (Song: Akad - Payung Teduh)
  // =========================================================================
  const AudioManager = {
    audio: null,
    isPlaying: false,
    floatingBtn: null,

    init() {
      this.audio = document.getElementById('wedding-audio');
      this.floatingBtn = document.getElementById('floating-music-btn');

      if (!this.audio || !this.floatingBtn) return;

      this.floatingBtn.addEventListener('click', () => this.toggle());

      // Sync state with audio events
      this.audio.addEventListener('play', () => this.setPlayingState(true));
      this.audio.addEventListener('pause', () => this.setPlayingState(false));
      this.audio.addEventListener('ended', () => this.setPlayingState(false));
    },

    play() {
      if (!this.audio) return;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.setPlayingState(true);
          })
          .catch(err => {
            console.warn('Audio autoplay prevented or error:', err);
            this.setPlayingState(false);
          });
      }
    },

    pause() {
      if (!this.audio) return;
      this.audio.pause();
      this.setPlayingState(false);
    },

    toggle() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },

    setPlayingState(playing) {
      this.isPlaying = playing;
      if (this.floatingBtn) {
        if (playing) {
          this.floatingBtn.classList.add('playing');
        } else {
          this.floatingBtn.classList.remove('playing');
        }
      }
    }
  };

  // =========================================================================
  // 3. GATE MANAGER (Cover Gate Unlocking & Smooth Transitions)
  // =========================================================================
  const GateManager = {
    coverEl: null,
    openBtn: null,
    musicBtn: null,
    navDock: null,

    init() {
      this.coverEl = document.getElementById('cover-gate');
      this.openBtn = document.getElementById('btn-open-gate');
      this.musicBtn = document.getElementById('floating-music-btn');
      this.navDock = document.getElementById('floating-nav-dock');

      if (!this.openBtn) return;

      this.openBtn.addEventListener('click', () => this.unlock());
    },

    unlock() {
      // 1. Play Background Song (Akad - Payung Teduh)
      AudioManager.play();

      // 2. Animate Cover Curtain Slide-Up
      if (this.coverEl) {
        this.coverEl.classList.add('gate-opened');
      }

      // 3. Unlock Body Scroll
      document.body.classList.remove('gate-locked');

      // 4. Immediately reveal Hero section
      const heroEl = document.getElementById('hero');
      if (heroEl) heroEl.classList.add('revealed');

      // 5. Reveal Floating UI Controls
      setTimeout(() => {
        if (this.musicBtn) this.musicBtn.classList.add('active');
        if (this.navDock) this.navDock.classList.add('active');
      }, 500);

      // 6. Trigger Initial Scroll Animations
      setTimeout(() => {
        ScrollObserver.checkVisibility();
      }, 150);
    }
  };

  // =========================================================================
  // 4. COUNTDOWN MANAGER (Accurate Time-Delta Ticker)
  // =========================================================================
  const CountdownManager = {
    daysEl: null,
    hoursEl: null,
    minutesEl: null,
    secondsEl: null,
    timerId: null,

    init() {
      this.daysEl = document.getElementById('countdown-days');
      this.hoursEl = document.getElementById('countdown-hours');
      this.minutesEl = document.getElementById('countdown-minutes');
      this.secondsEl = document.getElementById('countdown-seconds');

      if (!this.daysEl) return;

      this.tick();
      this.timerId = setInterval(() => this.tick(), 1000);
    },

    tick() {
      const targetStr = config.events?.countdownTarget || '2025-12-21T09:00:00+07:00';
      const targetDate = new Date(targetStr).getTime();
      const now = new Date().getTime();
      const delta = targetDate - now;

      if (delta <= 0) {
        this.updateDOM('00', '00', '00', '00');
        if (this.timerId) clearInterval(this.timerId);
        return;
      }

      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((delta % (1000 * 60)) / 1000);

      this.updateDOM(
        String(days).padStart(2, '0'),
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
      );
    },

    updateDOM(d, h, m, s) {
      if (this.daysEl) this.daysEl.textContent = d;
      if (this.hoursEl) this.hoursEl.textContent = h;
      if (this.minutesEl) this.minutesEl.textContent = m;
      if (this.secondsEl) this.secondsEl.textContent = s;
    }
  };

  // =========================================================================
  // 5. CALENDAR HELPER (Google Calendar & iCal Download)
  // =========================================================================
  const CalendarHelper = {
    init() {
      const gcalBtn = document.getElementById('btn-add-gcal');
      const icalBtn = document.getElementById('btn-download-ics');

      if (gcalBtn) {
        gcalBtn.addEventListener('click', () => this.openGoogleCalendar());
      }
      if (icalBtn) {
        icalBtn.addEventListener('click', () => this.downloadICal());
      }
    },

    openGoogleCalendar() {
      const evt = config.events?.resepsi?.calendar || {
        title: "The Wedding of " + (config.couple?.nickname?.combined || "Anindya & Raditya"),
        details: "Pernikahan " + (config.couple?.nickname?.combined || "Anindya & Raditya"),
        location: config.events?.resepsi?.venueName || "Hadrah Wedding Garden",
        start: "20251221T040000Z",
        end: "20251221T090000Z"
      };

      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title)}&dates=${evt.start}/${evt.end}&details=${encodeURIComponent(evt.details)}&location=${encodeURIComponent(evt.location)}`;
      window.open(gcalUrl, '_blank');
    },

    downloadICal() {
      const evt = config.events?.resepsi?.calendar || {
        title: "The Wedding of " + (config.couple?.nickname?.combined || "Anindya & Raditya"),
        details: "Pernikahan " + (config.couple?.nickname?.combined || "Anindya & Raditya"),
        location: config.events?.resepsi?.venueName || "Hadrah Wedding Garden",
        start: "20251221T040000Z",
        end: "20251221T090000Z"
      };

      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Digital Wedding Invitation//EN",
        "BEGIN:VEVENT",
        `SUMMARY:${evt.title}`,
        `DESCRIPTION:${evt.details}`,
        `LOCATION:${evt.location}`,
        `DTSTART:${evt.start}`,
        `DTEND:${evt.end}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'wedding-invitation.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // =========================================================================
  // 6. LIGHTBOX MODAL (Responsive Fullscreen Gallery Viewer)
  // =========================================================================
  const LightboxManager = {
    modalEl: null,
    imgEl: null,
    counterEl: null,
    images: [],
    currentIndex: 0,
    touchStartX: 0,
    touchEndX: 0,

    init() {
      this.modalEl = document.getElementById('lightbox-modal');
      this.imgEl = document.getElementById('lightbox-img');
      this.counterEl = document.getElementById('lightbox-counter');

      if (!this.modalEl) return;

      // Collect all gallery items
      const items = document.querySelectorAll('.gallery-item');
      this.images = Array.from(items).map(item => {
        const img = item.querySelector('img');
        return {
          src: item.getAttribute('data-full') || img.src,
          alt: img.alt || 'Wedding Gallery'
        };
      });

      // Attach click listeners to gallery items
      items.forEach((item, index) => {
        item.addEventListener('click', () => this.open(index));
      });

      // Controls
      const closeBtn = document.getElementById('lightbox-close');
      const prevBtn = document.getElementById('lightbox-prev');
      const nextBtn = document.getElementById('lightbox-next');

      if (closeBtn) closeBtn.addEventListener('click', () => this.close());
      if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
      if (nextBtn) nextBtn.addEventListener('click', () => this.next());

      // Backdrop click to close
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) this.close();
      });

      // Keyboard Controls
      document.addEventListener('keydown', (e) => {
        if (!this.modalEl.classList.contains('active')) return;
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });

      // Touch swipe gestures
      this.modalEl.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.modalEl.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, { passive: true });
    },

    open(index) {
      this.currentIndex = index;
      this.render();
      this.modalEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.modalEl.classList.remove('active');
      document.body.style.overflow = '';
    },

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.render();
    },

    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.render();
    },

    render() {
      const current = this.images[this.currentIndex];
      if (!current) return;
      if (this.imgEl) {
        this.imgEl.src = current.src;
        this.imgEl.alt = current.alt;
      }
      if (this.counterEl) {
        this.counterEl.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
      }
    },

    handleSwipe() {
      const deltaX = this.touchEndX - this.touchStartX;
      if (Math.abs(deltaX) > 45) {
        if (deltaX < 0) this.next();
        else this.prev();
      }
    }
  };

  // =========================================================================
  // 7. CLIPBOARD MANAGER (1-Click Copy with Toast Notification)
  // =========================================================================
  const ClipboardManager = {
    toastEl: null,
    toastTimeout: null,

    init() {
      this.toastEl = document.getElementById('toast-box');

      document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const textToCopy = btn.getAttribute('data-copy');
          const customLabel = btn.getAttribute('data-copy-label') || 'Nomor rekening';
          this.copy(textToCopy, `${customLabel} berhasil disalin!`);
        });
      });
    },

    copy(text, successMessage) {
      if (!text) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
          .then(() => this.showToast(successMessage))
          .catch(() => this.fallbackCopy(text, successMessage));
      } else {
        this.fallbackCopy(text, successMessage);
      }
    },

    fallbackCopy(text, successMessage) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        this.showToast(successMessage);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
    },

    showToast(message) {
      if (!this.toastEl) return;
      const textSpan = this.toastEl.querySelector('.toast-text');
      if (textSpan) textSpan.textContent = message;

      this.toastEl.classList.add('active');

      if (this.toastTimeout) clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.toastEl.classList.remove('active');
      }, 2500);
    }
  };

  // =========================================================================
  // 8. RSVP & WISHES GUESTBOOK MANAGER (LocalStorage Persistence)
  // =========================================================================
  const RSVPManager = {
    STORAGE_KEY: 'WEDDING_TEMPLATE_RSVP_V1',
    wishes: [],

    init() {
      this.loadWishes();
      this.render();
      this.updateStats();

      const form = document.getElementById('rsvp-form');
      if (form) {
        form.addEventListener('submit', (e) => this.handleSubmit(e));
      }
    },

    loadWishes() {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          this.wishes = JSON.parse(stored);
        } else {
          // Initialize with realistic seed wishes from config
          this.wishes = config.starterWishes ? [...config.starterWishes] : [];
          this.save();
        }
      } catch (e) {
        this.wishes = config.starterWishes ? [...config.starterWishes] : [];
      }
    },

    save() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.wishes));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
    },

    handleSubmit(e) {
      e.preventDefault();

      const nameInput = document.getElementById('rsvp-name');
      const messageInput = document.getElementById('rsvp-message');
      const statusInput = document.querySelector('input[name="attendance"]:checked');

      const name = nameInput ? nameInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      const status = statusInput ? statusInput.value : 'hadir';

      if (!name || !message) {
        alert('Mohon lengkapi nama dan pesan ucapan Anda.');
        return;
      }

      const newWish = {
        name: name,
        status: status,
        message: message,
        timestamp: 'Baru saja'
      };

      // Add to top of list
      this.wishes.unshift(newWish);
      this.save();
      this.render();
      this.updateStats();

      // Reset Form fields
      if (messageInput) messageInput.value = '';
      ClipboardManager.showToast('Ucapan dan konfirmasi berhasil dikirim!');

      // Scroll to feed top
      const feed = document.getElementById('wishes-feed');
      if (feed) feed.scrollTop = 0;
    },

    render() {
      const feedEl = document.getElementById('wishes-feed');
      if (!feedEl) return;

      feedEl.innerHTML = '';

      if (this.wishes.length === 0) {
        feedEl.innerHTML = '<p style="text-align:center; color: var(--color-text-light); padding: 1rem;">Belum ada ucapan. Jadilah yang pertama memberikan doa!</p>';
        return;
      }

      this.wishes.forEach(item => {
        const isHadir = item.status === 'hadir';
        const badgeClass = isHadir ? 'hadir' : 'tidak_hadir';
        const badgeLabel = isHadir ? 'Hadir' : 'Berhalangan';

        const card = document.createElement('div');
        card.className = 'wish-item';
        card.innerHTML = `
          <div class="wish-header">
            <span class="wish-sender">${escapeHTML(item.name)}</span>
            <span class="wish-status-badge ${badgeClass}">${badgeLabel}</span>
          </div>
          <p class="wish-text">${escapeHTML(item.message)}</p>
          <span class="wish-time">${escapeHTML(item.timestamp)}</span>
        `;
        feedEl.appendChild(card);
      });
    },

    updateStats() {
      const totalCount = this.wishes.length;
      const attendCount = this.wishes.filter(w => w.status === 'hadir').length;
      const absentCount = this.wishes.filter(w => w.status === 'tidak_hadir').length;

      const totalEl = document.getElementById('stat-total-wishes');
      const attendEl = document.getElementById('stat-attend-wishes');
      const absentEl = document.getElementById('stat-absent-wishes');

      if (totalEl) totalEl.textContent = totalCount;
      if (attendEl) attendEl.textContent = attendCount;
      if (absentEl) absentEl.textContent = absentCount;
    }
  };

  // =========================================================================
  // 9. SCROLL ANIMATION OBSERVER (IntersectionObserver)
  // =========================================================================
  const ScrollObserver = {
    observer: null,

    init() {
      if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('section, .reveal').forEach(el => el.classList.add('revealed'));
        return;
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
      });

      this.checkVisibility();
    },

    checkVisibility() {
      document.querySelectorAll('section:not(.revealed), .reveal:not(.revealed)').forEach(el => {
        if (this.observer) this.observer.observe(el);
      });
    }
  };

  // =========================================================================
  // 10. FLOATING NAVIGATION DOCK (Active Highlight & Smooth Scroll)
  // =========================================================================
  const NavDockManager = {
    init() {
      const navLinks = document.querySelectorAll('.nav-dock-item');
      if (!navLinks.length) return;

      window.addEventListener('scroll', () => {
        let currentSection = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 250;

        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
          }
        });
      }, { passive: true });
    }
  };

  // =========================================================================
  // APP BOOTSTRAPPER
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    GuestManager.init();
    GateManager.init();
    AudioManager.init();
    CountdownManager.init();
    CalendarHelper.init();
    LightboxManager.init();
    ClipboardManager.init();
    RSVPManager.init();
    ScrollObserver.init();
    NavDockManager.init();
  });

})();
