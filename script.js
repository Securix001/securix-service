const topbar = document.querySelector('.topbar');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const end = Number(counter.dataset.count);
    const duration = 900;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = String(Math.floor(progress * end)).padStart(end > 99 ? 3 : 2, '0');
      if (progress < 1) requestAnimationFrame(tick);
      else counter.textContent = `${String(end).padStart(end > 99 ? 3 : 2, '0')}${end === 24 ? '/7' : '+'}`;
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.8 });
document.querySelectorAll('[data-count]').forEach(counter => counterObserver.observe(counter));

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.action = 'https://formspree.io/f/maeybrdb';
  contactForm.method = 'POST';
  contactForm.querySelector('input[placeholder="Your name"]').name = 'name';
  contactForm.querySelector('input[placeholder="you@company.com"]').name = 'email';
  contactForm.querySelector('input[placeholder="Company name"]').name = 'company';
  contactForm.querySelector('select').name = 'service';
  contactForm.querySelector('textarea').name = 'message';
}

const leadDeveloper = document.querySelector('.team-card img[src="visnuvaratha.jpeg"]');
if (leadDeveloper) {
  leadDeveloper.alt = 'Vishnuvarathaa, CFO';
  leadDeveloper.closest('.team-card').querySelector('h3').textContent = 'Vishnuvarathaa';
  leadDeveloper.closest('.team-card').querySelector('p').textContent = 'CFO';
}

const pravinImage = document.querySelector('.team-card img[src="pravin.png"]');
if (pravinImage) {
  pravinImage.src = 'pravin-new.jpeg';
  pravinImage.alt = 'Pravin, Information Security Officer';
}
const pravinNewImage = document.querySelector('.team-card img[src="pravin-new.jpeg"]');
if (pravinNewImage) pravinNewImage.closest('.team-card').classList.add('team-card-pravin');

const teamGrid = document.querySelector('.team-grid');
if (teamGrid && ![...teamGrid.querySelectorAll('h3')].some(member => member.textContent === 'Jegan' || member.textContent === 'Jagan')) {
  teamGrid.insertAdjacentHTML('beforeend', '<article class="team-card reveal visible"><div class="team-photo"><img src="jegan.png" alt="Jegan, Lead Developer"><span>13</span></div><div class="team-info"><h3>Jegan</h3><p>Lead Developer</p></div></article>');
}

const jeganCard = [...document.querySelectorAll('.team-card')].find(card => {
  const name = card.querySelector('h3')?.textContent;
  return name === 'Jegan' || name === 'Jagan';
});
if (jeganCard) {
  jeganCard.classList.remove('team-card-initials');
  jeganCard.querySelector('.team-photo').innerHTML = '<img src="jegan.png" alt="Jegan, Lead Developer"><span>13</span>';
  jeganCard.querySelector('h3').textContent = 'Jegan';
}

const yaseenCard = [...document.querySelectorAll('.team-card')].find(card => card.querySelector('h3')?.textContent === 'Mohamed Yaseen');
if (yaseenCard) {
  yaseenCard.classList.remove('team-card-initials');
  yaseenCard.querySelector('.team-photo').innerHTML = '<img src="mohamed-yaseen.png" alt="Mohamed Yaseen, Lead Designer"><span>12</span>';
}

const projectLinks = document.querySelectorAll('.project-card .text-link');
const projectRepositories = [
  'https://github.com/Venkatesan-2007/mediai',
  'https://github.com/hajmalirfan/CYBERLENS-'
];
projectLinks.forEach((link, index) => {
  if (!projectRepositories[index]) return;
  link.href = projectRepositories[index];
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const liveWebHackingCard = [...document.querySelectorAll('.event-card')].find(card => card.textContent.includes('Live web hacking'));
const liveWebHackingLink = liveWebHackingCard?.querySelector('.text-link');
if (liveWebHackingLink) {
  liveWebHackingLink.href = 'https://youtu.be/zxiM1tKSrZo';
  liveWebHackingLink.textContent = 'Watch video ↗';
  liveWebHackingLink.target = '_blank';
  liveWebHackingLink.rel = 'noopener noreferrer';
}

const hackifyCard = [...document.querySelectorAll('.event-card')].find(card => card.textContent.includes('Securix community meetup'));
if (hackifyCard) {
  hackifyCard.classList.add('event-card-hackify');
  hackifyCard.querySelector('.event-image').className = 'event-image event-image-hackify';
  hackifyCard.querySelector('.event-image').innerHTML = `<div class="hackify-gallery">${Array.from({length: 9}, (_, index) => `<img src="hackify-${index + 1}.jpeg" alt="Hackify workshop photo ${index + 1}">`).join('')}</div><span>OFFLINE WORKSHOP / 03</span>`;
  hackifyCard.querySelector('.event-copy small').textContent = 'OFFLINE / CHENNAI';
  hackifyCard.querySelector('.event-copy h3').textContent = 'Hackify: Cybersecurity & Cloud';
  hackifyCard.querySelector('.event-copy .text-link').textContent = 'Learn more ↗';
  hackifyCard.querySelector('.event-copy').insertAdjacentHTML('beforeend', '<p class="event-description">An offline, hands-on workshop with Mr. Abrar Ahmed and Hariharan covering practical cybersecurity, real-world security practices, Google Cloud Platform fundamentals, services, infrastructure, deployment, and cloud security through live demonstrations and technical activities.</p>');
}

const missionGrid = document.querySelector('.mission-grid');
if (missionGrid && !document.querySelector('.ceo-message')) {
  missionGrid.insertAdjacentHTML('afterend', `<div class="ceo-message reveal visible"><div class="ceo-message-label"><span>CEO's message</span><span>SECURIX SERVICE / 2026</span></div><div class="ceo-message-copy"><p class="ceo-lead">Welcome to <strong>Securix Service.</strong></p><p>In a world where technology is evolving faster than ever, cybersecurity is no longer an option—it is a necessity. At Securix Service, we believe that every organization deserves the confidence to innovate, grow, and operate securely in the digital world.</p><p>Our journey began with a simple vision: <strong>to make cybersecurity more proactive, accessible, and impactful.</strong> We are committed to helping organizations identify vulnerabilities before attackers do, protect their critical digital assets, and build stronger security foundations.</p><p>Through services such as penetration testing, digital forensics, secure application development, cloud security, and emerging AI-driven security solutions, our goal is not simply to respond to cyber threats, but to stay one step ahead of them.</p><p>As we continue to grow, our commitment remains clear—to innovate continuously, learn continuously, and deliver security solutions built on <strong>trust, integrity, and excellence.</strong></p><p>Thank you for being part of the Securix journey. Together, let us build a <strong>safer, smarter, and more secure digital future.</strong></p><div class="ceo-signature"><span>Founder &amp; CEO</span><strong>Securix Service</strong></div></div></div>`);
}
