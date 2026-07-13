(function () {
  'use strict';

  const app = document.getElementById('arg-app');
  const engine = window.WARD13_ARG;
  const content = window.WARD13_ARG_CONTENT;
  const publicContent = window.WARD13_ARG_PUBLIC_2016;
  if (!app || !engine || !content) throw new Error('WARD_13 ARG runtime could not initialize');

  let state = engine.loadState();
  let feedback = '';
  let textSize = 'standard';
  const view = document.body.dataset.view || 'portal';
  const publicViews = new Set(['portal', 'about', 'news', 'cooperation', 'outpatient', 'departments', 'doctors', 'floor', 'access']);
  const isPublicView = publicViews.has(view);
  if (!content.locales[state.locale]) state.locale = content.defaultLocale || 'ja';

  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);

  function dig(root, path) {
    return path.split('.').reduce((value, key) => value && value[key], root);
  }

  function resolve(path) {
    return dig(publicContent?.locales?.[state.locale], path) ?? dig(content.locales[state.locale], path);
  }

  function t(path) {
    const value = resolve(path);
    return typeof value === 'string' ? value : `[${path}]`;
  }

  function nav() {
    const items = engine.manifest.views.filter(item => item.navigation === true);
    return `<nav class="arg-nav" aria-label="ARG navigation">${items.map(item => `<a href="${item.file}"${item.id === view ? ' aria-current="page"' : ''}>${escapeHtml(t(`nav.${item.id}`))}</a>`).join('')}</nav>`;
  }

  function splitItems(path) {
    return t(path).split('｜').map(item => item.trim()).filter(Boolean);
  }

  function publicHeading(section, label) {
    return `<div class="breadcrumb"><a href="index.html">${escapeHtml(t('nav.portal'))}</a><span aria-hidden="true">&gt;</span><span>${escapeHtml(t(`${section}.title`))}</span></div><div class="page-heading public-heading"><p class="system-label">${escapeHtml(label)}</p><h1>${escapeHtml(t(`${section}.title`))}</h1><p>${escapeHtml(t(`${section}.lead`))}</p></div>`;
  }

  function localeOptions() {
    const order = Array.isArray(content.localeOrder) ? content.localeOrder : Object.keys(content.locales);
    return order.filter(locale => content.locales[locale]).map(locale => {
      const selected = locale === state.locale ? ' selected' : '';
      return `<option value="${escapeHtml(locale)}"${selected}>${escapeHtml(content.localeLabels?.[locale] || locale)}</option>`;
    }).join('');
  }

  function applyDocumentLocale() {
    document.documentElement.lang = content.htmlLang?.[state.locale] || state.locale || 'ja';
  }

  function applyTextSize() {
    document.documentElement.dataset.siteText = textSize;
  }

  function utilityLink(file, id) {
    return `<a href="${file}"${id === view ? ' aria-current="page"' : ''}>${escapeHtml(t(`nav.${id}`))}</a>`;
  }

  function header() {
    const count = state.clues.length;
    return `<header class="site-header">
      ${isPublicView ? '' : `<div class="archive-ribbon">${escapeHtml(t('global.workLabel'))}</div>`}
      <div class="site-topline"><span>${escapeHtml(t('global.region'))}</span><div class="topline-tools">${isPublicView ? `<nav class="utility-nav">${utilityLink('about.html', 'about')}${utilityLink('news.html', 'news')}${utilityLink('cooperation.html', 'cooperation')}<a href="#footer-nav">${escapeHtml(t('ui.siteMap'))}</a></nav>` : ''}<label class="locale-picker"><span>${escapeHtml(t('global.language'))}</span><select data-action="locale" aria-label="${escapeHtml(t('global.language'))}">${localeOptions()}</select></label></div></div>
      <div class="brand-row"><div class="institution-lockup"><span class="corporate-mark" aria-hidden="true">潮</span><div><p class="institution">${escapeHtml(t('global.institution'))}</p></div></div>
      <div class="header-actions">${isPublicView ? `<span class="site-updated">${escapeHtml(t('ui.updated'))}</span><div class="text-controls"><span>${escapeHtml(t('ui.textSize'))}</span>${['small', 'standard', 'large'].map(size => `<button type="button" data-action="text-size" data-size="${size}" aria-pressed="${textSize === size}">${escapeHtml(t(`ui.${size}`))}</button>`).join('')}</div><button type="button" class="print-button" data-action="print">${escapeHtml(t('ui.print'))}</button>` : `<span class="fragment-counter">${escapeHtml(t('global.savedCount'))}: ${count}/${engine.manifest.clues.length}</span>`}</div></div>
      ${nav()}
    </header>`;
  }

  function footer() {
    const links = engine.manifest.views.filter(item => item.public === true).map(item => `<a href="${item.file}">${escapeHtml(t(`nav.${item.id}`))}</a>`).join('');
    return `<footer class="site-footer"><div class="footer-brand"><span class="footer-mark" aria-hidden="true">潮</span><strong>${escapeHtml(t('global.institution'))}</strong></div><nav class="footer-nav" id="footer-nav">${links}</nav><div class="footer-meta"><p>${escapeHtml(t('global.fictionNotice'))}</p><a href="../index.html">${escapeHtml(t('global.backToGame'))}</a></div></footer>`;
  }

  function clueButton(clueId, label) {
    const saved = state.clues.includes(clueId);
    return `<button type="button" class="clue-action${saved ? ' saved' : ''}" data-action="clue" data-clue="${clueId}"${saved ? ' disabled' : ''}>${escapeHtml(saved ? t('global.acquired') : label)}</button>`;
  }

  function renderPortal() {
    const quickLinks = [
      ['outpatient.html', 'outpatient', 'portal.quickOutpatient'],
      ['departments.html', 'departments', 'portal.quickDepartments'],
      ['doctors.html', 'doctors', 'portal.quickDoctors'],
      ['floor.html', 'floor', 'portal.quickFloor'],
      ['access.html', 'access', 'portal.quickAccess']
    ];
    return `<main class="page portal-page">
      <section class="hero"><img class="hero-photo" src="assets/img/hospital-exterior-2016.webp" alt="" width="1400" height="754" decoding="async"><div class="hero-copy-panel"><p class="system-label">PUBLIC INFORMATION</p><h1>${escapeHtml(t('portal.title'))}</h1><p class="hero-copy">${escapeHtml(t('portal.subtitle'))}</p><p>${escapeHtml(t('portal.intro'))}</p></div></section>
      <section class="notice critical"><h2>${escapeHtml(t('portal.emergency'))}</h2><p>${escapeHtml(t('portal.emergencyBody'))}</p></section>
      <section class="audience-services" aria-labelledby="audience-title"><h2 id="audience-title">${escapeHtml(t('portal2016.audienceTitle'))}</h2><div class="audience-grid"><a href="outpatient.html"><strong>${escapeHtml(t('portal2016.patientTitle'))}</strong><span>${escapeHtml(t('portal2016.patientBody'))}</span></a><a href="access.html"><strong>${escapeHtml(t('portal2016.visitorTitle'))}</strong><span>${escapeHtml(t('portal2016.visitorBody'))}</span></a><a href="cooperation.html"><strong>${escapeHtml(t('portal2016.professionalTitle'))}</strong><span>${escapeHtml(t('portal2016.professionalBody'))}</span></a></div></section>
      <section class="quick-services" aria-labelledby="quick-services-title"><div class="section-heading"><h2 id="quick-services-title">${escapeHtml(t('portal.quickTitle'))}</h2><p>${escapeHtml(t('portal.quickLead'))}</p></div><div class="quick-grid">${quickLinks.map(([href, id, copy]) => `<a href="${href}"><strong>${escapeHtml(t(`nav.${id}`))}</strong><span>${escapeHtml(t(copy))}</span><b aria-hidden="true">›</b></a>`).join('')}</div></section>
      <div class="portal-grid"><section><h2>NEWS / お知らせ</h2>
        <article class="notice-card"><time>${escapeHtml(t('portal.news1Date'))}</time><h3>${escapeHtml(t('portal.news1Title'))}</h3><p>${escapeHtml(t('portal.news1Body'))}</p>${clueButton('date_0715', t('global.open'))}</article>
        <article class="notice-card"><time>${escapeHtml(t('portal2016.news3Date'))}</time><h3>${escapeHtml(t('portal2016.news3Title'))}</h3><p>${escapeHtml(t('portal2016.news3Body'))}</p></article>
        <article class="notice-card"><time>${escapeHtml(t('portal.news2Date'))}</time><h3>${escapeHtml(t('portal.news2Title'))}</h3><p>${escapeHtml(t('portal.news2Body'))}</p><a class="text-link" href="archive.html">${escapeHtml(t('nav.archive'))}</a></article>
        <a class="news-index-link" href="news.html">${escapeHtml(t('portal2016.allNews'))}</a>
      </section><section class="floor-guide"><h2>${escapeHtml(t('portal.floorsTitle'))}</h2><p>${escapeHtml(t('portal.floorsLead'))}</p><ol><li>${escapeHtml(t('portal.floor12'))}</li><li class="floor-gap">${escapeHtml(t('portal.floorGap'))}</li><li>${escapeHtml(t('portal.floor14'))}</li></ol>${clueButton('floor_13_omitted', t('global.open'))}</section></div>
      <section class="hospital-profile-strip" aria-labelledby="profile-title"><h2 id="profile-title">${escapeHtml(t('portal2016.profileTitle'))}</h2><div><a href="about.html"><span>${escapeHtml(t('about.bedsLabel'))}</span><strong>412</strong></a><a href="departments.html"><span>${escapeHtml(t('about.departmentsLabel'))}</span><strong>28</strong></a><a href="about.html"><span>${escapeHtml(t('about.openedLabel'))}</span><strong>1998</strong></a><a href="outpatient.html"><span>${escapeHtml(t('about.emergencyStatLabel'))}</span><strong>9,642</strong></a></div></section>
      <p class="sync-status">${escapeHtml(t('portal.footerStatus'))}</p>
    </main>`;
  }

  function renderOutpatient() {
    const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];
    return `<main class="page public-page outpatient-page">${publicHeading('outpatient', 'OUTPATIENT GUIDE')}
      <section class="schedule-banner"><div><span>${escapeHtml(t('outpatient.receptionLabel'))}</span><strong>${escapeHtml(t('outpatient.receptionTime'))}</strong></div><div><span>${escapeHtml(t('outpatient.consultationLabel'))}</span><strong>${escapeHtml(t('outpatient.consultationTime'))}</strong></div><div><span>${escapeHtml(t('outpatient.closedLabel'))}</span><strong>${escapeHtml(t('outpatient.closedDays'))}</strong></div></section>
      <section class="notice"><h2>${escapeHtml(t('outpatient.emergencyTitle'))}</h2><p>${escapeHtml(t('outpatient.emergencyBody'))}</p></section>
      <div class="content-columns"><section class="info-card"><h2>${escapeHtml(t('outpatient.firstTitle'))}</h2><p>${escapeHtml(t('outpatient.firstBody'))}</p><h3>${escapeHtml(t('outpatient.referralTitle'))}</h3><p>${escapeHtml(t('outpatient.referralBody'))}</p></section><section class="info-card"><h2>${escapeHtml(t('outpatient.returnTitle'))}</h2><p>${escapeHtml(t('outpatient.returnBody'))}</p><h3>${escapeHtml(t('outpatient.bringTitle'))}</h3><p>${escapeHtml(t('outpatient.bringBody'))}</p></section></div>
      <section class="visit-flow"><h2>${escapeHtml(t('outpatient.flowTitle'))}</h2><ol>${steps.map((step, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${escapeHtml(t(`outpatient.${step}`))}</p></li>`).join('')}</ol></section>
      <p class="page-note">${escapeHtml(t('outpatient.note'))}</p>
    </main>`;
  }

  function renderDepartments() {
    const groups = [
      ['departments.internalTitle', 'departments.internalList'],
      ['departments.surgicalTitle', 'departments.surgicalList'],
      ['departments.specialtyTitle', 'departments.specialtyList'],
      ['departments.centersTitle', 'departments.centersList'],
      ['departments.clinicsTitle', 'departments.clinicsList']
    ];
    return `<main class="page public-page departments-page">${publicHeading('departments', 'DEPARTMENTS & CENTERS')}<div class="department-grid">${groups.map(([title, list]) => `<section class="department-card"><h2>${escapeHtml(t(title))}</h2><ul>${splitItems(list).map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>`).join('')}</div><section class="notice department-note"><h2>${escapeHtml(t('departments.reservationTitle'))}</h2><p>${escapeHtml(t('departments.reservationBody'))}</p></section><p class="page-note">${escapeHtml(t('departments.note'))}</p></main>`;
  }

  function renderDoctors() {
    const photoIds = ['takase-naoto', 'mizuki-haruka', 'kamiya-chikage', 'narumi-shuji', 'kuze-mio', 'shiraishi-toma', 'asakura-rena', 'aihara-ritsu'];
    const cards = Array.from({ length: 8 }, (_, index) => index + 1).map((number, index) => `<article class="doctor-card"><figure class="doctor-photo"><img src="assets/img/doctors/${photoIds[index]}.webp" alt="" width="240" height="320" decoding="async"><span class="doctor-monogram" aria-hidden="true">${String(number).padStart(2, '0')}</span></figure><div class="doctor-profile"><p class="doctor-department">${escapeHtml(t(`doctors.d${number}Department`))}</p><h2>${escapeHtml(t(`doctors.d${number}Name`))}</h2><p class="doctor-role">${escapeHtml(t(`doctors.d${number}Role`))}</p><dl><dt>${escapeHtml(t('doctors.fieldLabel'))}</dt><dd>${escapeHtml(t(`doctors.d${number}Field`))}</dd><dt>${escapeHtml(t('doctors.scheduleLabel'))}</dt><dd>${escapeHtml(t(`doctors.d${number}Schedule`))}</dd></dl></div></article>`).join('');
    return `<main class="page public-page doctors-page">${publicHeading('doctors', 'MEDICAL STAFF')}<div class="staff-update"><span>${escapeHtml(t('doctors.updatedLabel'))}</span><strong>${escapeHtml(t('doctors.updated'))}</strong></div><section class="doctor-grid">${cards}</section><p class="page-note">${escapeHtml(t('doctors.note'))}</p></main>`;
  }

  function renderFloor() {
    const floors = ['f14', 'gap', 'f12', 'f11', 'f10', 'f9', 'f8', 'f7', 'f6', 'f5', 'f4', 'f3', 'f2', 'f1', 'b1', 'b2'];
    return `<main class="page public-page floor-page">${publicHeading('floor', 'FLOOR DIRECTORY')}<p class="directory-note">${escapeHtml(t('floor.publicNote'))}</p><div class="floor-directory">${floors.map(id => `<section class="floor-row${id === 'gap' ? ' omitted' : ''}"><strong>${escapeHtml(t(`floor.${id}Label`))}</strong><div><h2>${escapeHtml(t(`floor.${id}Title`))}</h2><p>${escapeHtml(t(`floor.${id}Body`))}</p></div></section>`).join('')}</div><p class="page-note">${escapeHtml(t('floor.note'))}</p></main>`;
  }

  function renderAccess() {
    return `<main class="page public-page access-page">${publicHeading('access', 'ACCESS & VISITING')}<div class="access-layout"><section class="map-panel" aria-label="${escapeHtml(t('access.mapLabel'))}"><div class="water-line"></div><span class="map-station station-one">${escapeHtml(t('access.station1Short'))}</span><span class="map-station station-two">${escapeHtml(t('access.station2Short'))}</span><strong class="map-hospital">${escapeHtml(t('global.institution'))}</strong><p>${escapeHtml(t('access.mapNotice'))}</p></section><section class="access-details"><h2>${escapeHtml(t('access.locationTitle'))}</h2><p>${escapeHtml(t('access.address'))}</p><dl><dt>${escapeHtml(t('access.railTitle'))}</dt><dd>${escapeHtml(t('access.railBody'))}</dd><dt>${escapeHtml(t('access.busTitle'))}</dt><dd>${escapeHtml(t('access.busBody'))}</dd><dt>${escapeHtml(t('access.carTitle'))}</dt><dd>${escapeHtml(t('access.carBody'))}</dd></dl></section></div><div class="content-columns"><section class="info-card"><h2>${escapeHtml(t('access.visitTitle'))}</h2><p>${escapeHtml(t('access.visitBody'))}</p><h3>${escapeHtml(t('access.entryTitle'))}</h3><p>${escapeHtml(t('access.entryBody'))}</p></section><section class="info-card"><h2>${escapeHtml(t('access.contactTitle'))}</h2><p>${escapeHtml(t('access.contactBody'))}</p><h3>${escapeHtml(t('access.barrierTitle'))}</h3><p>${escapeHtml(t('access.barrierBody'))}</p></section></div><p class="page-note">${escapeHtml(t('access.note'))}</p></main>`;
  }

  function renderAbout() {
    const overview = [
      ['about.operatorLabel', t('about.operatorValue')],
      ['about.openedLabel', '1998/04/01'],
      ['about.bedsLabel', '412'],
      ['about.departmentsLabel', '28'],
      ['about.directorLabel', t('doctors.d1Name')],
      ['about.locationLabel', t('global.region')]
    ];
    const stats = [
      ['about.outpatientStatLabel', '827'],
      ['about.emergencyStatLabel', '9,642'],
      ['about.ambulanceStatLabel', '4,108']
    ];
    return `<main class="page public-page about-page">${publicHeading('about', 'HOSPITAL PROFILE')}
      <section class="mission-panel"><h2>${escapeHtml(t('about.principleTitle'))}</h2><p>${escapeHtml(t('about.principleBody'))}</p></section>
      <div class="about-layout"><section><h2 class="lined-heading">${escapeHtml(t('about.overviewTitle'))}</h2><dl class="hospital-overview">${overview.map(([label, value]) => `<div><dt>${escapeHtml(t(label))}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl></section><section><h2 class="lined-heading">${escapeHtml(t('about.designationTitle'))}</h2><ul class="designation-list">${splitItems('about.designationList').map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section></div>
      <section class="activity-panel"><h2>${escapeHtml(t('about.statsTitle'))}</h2><div>${stats.map(([label, value]) => `<article><strong>${escapeHtml(value)}</strong><span>${escapeHtml(t(label))}</span></article>`).join('')}</div></section>
      <section class="history-panel"><h2>${escapeHtml(t('about.historyTitle'))}</h2><p>${escapeHtml(t('about.historyBody'))}</p></section>
      <p class="page-note">${escapeHtml(t('about.note'))}</p>
    </main>`;
  }

  function renderCooperation() {
    const steps = ['step1', 'step2', 'step3', 'step4'];
    return `<main class="page public-page cooperation-page">${publicHeading('cooperation', 'REGIONAL MEDICAL LIAISON')}
      <p class="professional-notice">${escapeHtml(t('cooperation.audienceNote'))}</p>
      <section class="liaison-desk"><div><p class="system-label">REGIONAL MEDICAL LIAISON OFFICE</p><h2>${escapeHtml(t('cooperation.deskTitle'))}</h2><p>${escapeHtml(t('cooperation.deskBody'))}</p></div><strong>${escapeHtml(t('cooperation.deskHours'))}</strong></section>
      <section class="referral-process"><h2 class="lined-heading">${escapeHtml(t('cooperation.referralTitle'))}</h2><p>${escapeHtml(t('cooperation.referralBody'))}</p><ol>${steps.map((step, index) => `<li><b>${index + 1}</b><span>${escapeHtml(t(`cooperation.${step}`))}</span></li>`).join('')}</ol></section>
      <div class="content-columns"><section class="info-card"><h2>${escapeHtml(t('cooperation.documentsTitle'))}</h2><ul class="document-list">${splitItems('cooperation.documentsList').map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul><h3>${escapeHtml(t('cooperation.urgentTitle'))}</h3><p>${escapeHtml(t('cooperation.urgentBody'))}</p></section><section class="info-card"><h2>${escapeHtml(t('cooperation.returnTitle'))}</h2><p>${escapeHtml(t('cooperation.returnBody'))}</p><a class="text-link" href="departments.html">${escapeHtml(t('nav.departments'))}</a></section></div>
      <p class="page-note">${escapeHtml(t('cooperation.note'))}</p>
    </main>`;
  }

  function renderNews() {
    const rows = [
      { date: t('portal.news1Date'), category: t('news.categoryFacility'), title: t('portal.news1Title'), body: t('portal.news1Body'), clue: 'date_0715' },
      { date: t('news.n2Date'), category: t('news.categoryPatient'), title: t('news.n2Title'), body: t('news.n2Body') },
      { date: t('news.n3Date'), category: t('news.categoryEvent'), title: t('news.n3Title'), body: t('news.n3Body') },
      { date: t('news.n4Date'), category: t('news.categoryMedical'), title: t('news.n4Title'), body: t('news.n4Body') },
      { date: t('news.n5Date'), category: t('news.categoryFacility'), title: t('news.n5Title'), body: t('news.n5Body') },
      { date: t('portal.news2Date'), category: t('news.categoryAdmin'), title: t('portal.news2Title'), body: t('portal.news2Body'), archive: true }
    ];
    return `<main class="page public-page news-page">${publicHeading('news', 'NEWS & INFORMATION')}<section class="news-archive">${rows.map(row => `<article><div class="news-meta"><time>${escapeHtml(row.date)}</time><span>${escapeHtml(row.category)}</span></div><div><h2>${escapeHtml(row.title)}</h2><p>${escapeHtml(row.body)}</p>${row.clue ? clueButton(row.clue, t('global.open')) : ''}${row.archive ? `<a class="text-link" href="archive.html">${escapeHtml(t('nav.archive'))}</a>` : ''}</div></article>`).join('')}</section><p class="page-note">${escapeHtml(t('news.note'))}</p></main>`;
  }

  function renderArchive() {
    const cards = [
      ['archive_13_exists', 'archive.card1Title', 'archive.card1Meta', 'archive.card1Body'],
      ['maintenance_crt_w13', 'archive.card2Title', 'archive.card2Meta', 'archive.card2Body'],
      [null, 'archive.card3Title', 'archive.card3Meta', 'archive.card3Body']
    ];
    return `<main class="page archive-page"><div class="page-heading"><p class="system-label">READ-ONLY MIRROR</p><h1>${escapeHtml(t('archive.title'))}</h1><p>${escapeHtml(t('archive.subtitle'))}</p></div>
      <p class="archive-warning">${escapeHtml(t('archive.warning'))}</p>
      <section class="archive-list">${cards.map(([clue, title, meta, body]) => `<article class="archive-card"><p class="archive-meta">${escapeHtml(t(meta))}</p><h2>${escapeHtml(t(title))}</h2><p>${escapeHtml(t(body))}</p>${clue ? clueButton(clue, t('global.open')) : ''}</article>`).join('')}</section>
      <section class="removed-index"><h2>${escapeHtml(t('archive.removedTitle'))}</h2><code>${escapeHtml(t('archive.removedBody'))}</code><p>${escapeHtml(t('archive.removedStatus'))}</p><a class="stale-link" href="old/ward-13-observation/">${escapeHtml(t('archive.removedLink'))}</a>${clueButton('cicada_channel', t('global.open'))}</section>
      <a class="primary-link" href="records.html">${escapeHtml(t('archive.openRecords'))}</a>
    </main>`;
  }

  function gateForm(id, section) {
    const result = feedback ? `<p class="gate-feedback">${escapeHtml(feedback)}</p>` : '';
    return `<form class="gate-form" data-gate="${id}"><label>${escapeHtml(t(`${section}.prompt`) === `[${section}.prompt]` ? t(`${section}.subtitle`) : t(`${section}.prompt`))}<input name="answer" autocomplete="off" placeholder="${escapeHtml(t(`${section}.placeholder`))}"></label><button type="submit">${escapeHtml(t('global.submit'))}</button>${result}</form>`;
  }

  function renderRecords() {
    const open = Boolean(state.gates.records);
    return `<main class="page records-page"><div class="page-heading"><p class="system-label">RECORD LOOKUP</p><h1>${escapeHtml(t('records.title'))}</h1><p>${escapeHtml(t('records.subtitle'))}</p></div>${open ? `<section class="record-sheet"><p class="record-stamp">RESTRICTED COPY</p><h2>${escapeHtml(t('records.caseTitle'))}</h2><p class="status-line">${escapeHtml(t('records.caseStatus'))}</p><p>${escapeHtml(t('records.caseBody'))}</p><h3>${escapeHtml(t('records.aliasTitle'))}</h3><p class="alias">${escapeHtml(t('records.aliasBody'))}</p><a class="primary-link" href="staff.html">${escapeHtml(t('records.next'))}</a></section>` : gateForm('records', 'records')}</main>`;
  }

  function renderStaff() {
    const open = Boolean(state.gates.staff);
    return `<main class="page staff-page"><div class="page-heading"><p class="system-label">STAFF ONLY / ARCHIVED</p><h1>${escapeHtml(t('staff.title'))}</h1><p>${escapeHtml(t('staff.subtitle'))}</p></div>${open ? `<section class="staff-panel"><h2>${escapeHtml(t('staff.panelTitle'))}</h2><p>${escapeHtml(t('staff.panelBody'))}</p><code>${escapeHtml(t('staff.override'))}</code><a class="primary-link" href="terminal.html">${escapeHtml(t('staff.next'))}</a></section>` : gateForm('staff', 'staff')}</main>`;
  }

  function terminalHistory() {
    return state.terminalHistory.map(item => `<p><span>&gt; ${escapeHtml(item.command)}</span><br>${escapeHtml(t(item.responseKey))}</p>`).join('');
  }

  function renderTerminal() {
    const open = Boolean(state.gates.terminal);
    return `<main class="page terminal-page"><section class="terminal-window"><div class="terminal-bar"><span>CRT-W13</span><span>05:13:13</span></div><h1>${escapeHtml(t('terminal.title'))}</h1><p>${escapeHtml(t('terminal.subtitle'))}</p>${open ? `<div class="terminal-output"><p>${escapeHtml(t('terminal.welcome'))}</p>${terminalHistory()}</div><form class="terminal-form"><span>&gt;</span><input name="command" autocomplete="off" placeholder="${escapeHtml(t('terminal.commandPlaceholder'))}"><button type="submit">ENTER</button></form><a class="terminal-link" href="evidence.html">EVIDENCE BOARD</a>` : gateForm('terminal', 'terminal')}</section></main>`;
  }

  function renderEvidence() {
    const status = engine.finalStatus(state);
    const clues = engine.manifest.clues.filter(clue => state.clues.includes(clue.id));
    const complete = Boolean(state.completedAt);
    const list = clues.length ? `<ol class="evidence-list">${clues.map(clue => `<li><span>${escapeHtml(clue.id)}</span><p>${escapeHtml(t(`clue.${clue.id}`))}</p></li>`).join('')}</ol>` : `<p class="empty-evidence">${escapeHtml(t('evidence.empty'))}</p>`;
    const final = complete ? `<section class="final-record"><p class="system-label">RECOVERED</p><h2>${escapeHtml(t('evidence.finalTitle'))}</h2><p>${escapeHtml(t('evidence.finalBody'))}</p><p>${escapeHtml(t('evidence.finalNote'))}</p><a class="primary-link" href="../index.html">${escapeHtml(t('evidence.finalAction'))}</a></section>` : `<section class="final-gate"><p>${escapeHtml(status.ready ? t('evidence.ready') : t('evidence.missing'))}</p><button type="button" data-action="complete"${status.ready ? '' : ' disabled'}>${escapeHtml(t('evidence.openFinal'))}</button>${status.ready ? '' : `<code>${status.missing.map(escapeHtml).join(' / ')}</code>`}</section>`;
    return `<main class="page evidence-page"><div class="page-heading"><p class="system-label">LOCAL EVIDENCE</p><h1>${escapeHtml(t('evidence.title'))}</h1><p>${escapeHtml(t('evidence.subtitle'))}</p></div>${list}${final}</main>`;
  }

  function renderLost() {
    const requested = window.location.pathname.replace(/\/$/, '') || '/';
    return `<main class="page lost-page"><div class="error-heading"><p class="error-code">404</p><div><p class="system-label">PAGE NOT FOUND</p><h1>${escapeHtml(t('lost.title'))}</h1></div></div><p class="lost-lead">${escapeHtml(t('lost.body'))}</p><section class="error-help"><h2>${escapeHtml(t('lost.reasonTitle'))}</h2><ul><li>${escapeHtml(t('lost.reason1'))}</li><li>${escapeHtml(t('lost.reason2'))}</li><li>${escapeHtml(t('lost.reason3'))}</li></ul><p><strong>${escapeHtml(t('lost.requestedLabel'))}</strong> <code>${escapeHtml(requested)}</code></p></section><div class="lost-actions"><a class="primary-link" href="index.html">${escapeHtml(t('lost.home'))}</a><a class="text-link" href="archive.html">${escapeHtml(t('lost.return'))}</a></div><details class="legacy-check" data-action="legacy-check"><summary>${escapeHtml(t('lost.legacySummary'))}</summary><p>${escapeHtml(t('lost.legacyBody'))}</p><code>${escapeHtml(t('lost.marker'))}</code></details></main>`;
  }

  const renderers = { portal: renderPortal, about: renderAbout, news: renderNews, cooperation: renderCooperation, outpatient: renderOutpatient, departments: renderDepartments, doctors: renderDoctors, floor: renderFloor, access: renderAccess, archive: renderArchive, records: renderRecords, staff: renderStaff, terminal: renderTerminal, evidence: renderEvidence, lost: renderLost };

  function render() {
    applyDocumentLocale();
    applyTextSize();
    if (isPublicView) {
      const titlePath = view === 'portal' ? 'portal.title' : `${view}.title`;
      document.title = `${t(titlePath)}｜${t('global.institution')}`;
    }
    app.innerHTML = `${header()}${(renderers[view] || renderPortal)()}${footer()}<div id="arg-toast" class="arg-toast" role="status"></div>`;
    bindEvents();
  }

  function showToast(message) {
    const toast = document.getElementById('arg-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    window.setTimeout(() => toast.classList.remove('visible'), 1800);
  }

  function gateFeedback(gateId, result) {
    const section = gateId;
    if (result.ok) return '';
    if (result.hintLevel >= 2) return `${t(`${section}.denied`)} ${t(`${section}.hint2`)}`;
    if (result.hintLevel >= 1) return `${t(`${section}.denied`)} ${t(`${section}.hint1`)}`;
    return t(`${section}.denied`);
  }

  function bindEvents() {
    app.querySelector('[data-action="locale"]')?.addEventListener('change', event => {
      const nextLocale = event.currentTarget.value;
      if (!content.locales[nextLocale]) return;
      state.locale = nextLocale;
      engine.saveState(state);
      applyDocumentLocale();
      render();
    });
    app.querySelectorAll('[data-action="text-size"]').forEach(button => button.addEventListener('click', () => {
      const nextSize = button.dataset.size;
      if (!['small', 'standard', 'large'].includes(nextSize)) return;
      textSize = nextSize;
      render();
    }));
    app.querySelector('[data-action="print"]')?.addEventListener('click', () => window.print());
    app.querySelectorAll('[data-action="clue"]').forEach(button => button.addEventListener('click', () => {
      const added = engine.addClue(state, button.dataset.clue);
      state = engine.loadState();
      render();
      if (added) showToast(t('global.acquired'));
    }));
    app.querySelector('[data-action="legacy-check"]')?.addEventListener('toggle', event => {
      if (!event.currentTarget.open) return;
      const added = engine.addClue(state, 'seagull_marker');
      state = engine.loadState();
      if (added) showToast(t('global.acquired'));
    });
    app.querySelectorAll('.gate-form').forEach(form => form.addEventListener('submit', event => {
      event.preventDefault();
      const result = engine.solveGate(state, form.dataset.gate, new FormData(form).get('answer'));
      state = engine.loadState();
      feedback = gateFeedback(form.dataset.gate, result);
      render();
      if (result.ok) showToast(t('global.acquired'));
    }));
    app.querySelector('.terminal-form')?.addEventListener('submit', event => {
      event.preventDefault();
      const input = new FormData(event.currentTarget).get('command');
      engine.runTerminalCommand(state, input);
      state = engine.loadState();
      render();
    });
    app.querySelector('[data-action="complete"]')?.addEventListener('click', () => {
      if (!engine.finalStatus(state).ready) return;
      engine.addClue(state, 'final_open_door');
      state = engine.loadState();
      state.completedAt = new Date().toISOString();
      engine.saveState(state);
      render();
      showToast(t('global.acquired'));
    });
  }

  applyDocumentLocale();
  render();

  function reportPreviewMetrics() {
    if (window.parent === window || !window.location.pathname.includes('/preview/')) return;
    window.requestAnimationFrame(() => {
      const controls = [...document.querySelectorAll('button, a, input, select')].map(element => element.getBoundingClientRect()).filter(rect => rect.width > 0 && rect.height > 0);
      window.parent.postMessage({
        type: 'ward13-arg-preview-metrics',
        width: window.innerWidth,
        height: window.innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        minControlHeight: controls.length ? Math.min(...controls.map(rect => Math.round(rect.height))) : 0,
        controlsOutsideViewport: controls.filter(rect => rect.left < 0 || rect.right > window.innerWidth + 1).length,
        locale: state.locale,
        view
      }, '*');
    });
  }

  window.addEventListener('load', reportPreviewMetrics);
  window.addEventListener('resize', reportPreviewMetrics);
  reportPreviewMetrics();
})();
