const attendance = {
  day: { title: 'اليوم', labels: ['اليوم'], company: [93], rental: [89] },
  week: { title: 'الأسبوع', labels: ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'], company: [70, 82, 79, 85, 73, 78, 66], rental: [58, 76, 74, 83, 87, 78, 71] },
  month: { title: 'الشهر', labels: ['أسبوع ١', 'أسبوع ٢', 'أسبوع ٣', 'أسبوع ٤'], company: [76, 81, 73, 84], rental: [68, 78, 72, 80] },
};

const arabicNumber = new Intl.NumberFormat('ar-EG');
const root = document.documentElement;
const app = document.querySelector('#app');
const toast = document.querySelector('[data-toast]');
let toastTimer = null;

function renderAttendance(period = 'week') {
  const data = attendance[period] || attendance.week;
  const host = document.querySelector('[data-attendance-bars]');
  if (!host) return;
  host.replaceChildren();

  data.labels.forEach((label, index) => {
    const column = document.createElement('div');
    column.className = 'day-column';

    const pair = document.createElement('div');
    pair.className = 'bar-pair';

    for (const [type, values] of [['company', data.company], ['rental', data.rental]]) {
      const bar = document.createElement('span');
      bar.className = `day-bar ${type}`;
      bar.style.height = `${values[index]}%`;
      bar.setAttribute('aria-hidden', 'true');
      pair.append(bar);
    }

    const caption = document.createElement('small');
    caption.textContent = label;
    column.append(pair, caption);
    host.append(column);
  });

  document.querySelector('[data-period-title]').textContent = data.title;
  document.querySelector('.attendance-panel .attendance-chart').setAttribute(
    'aria-label',
    `رسم توضيحي لنسبة الحضور خلال ${data.title}`,
  );
}

for (const button of document.querySelectorAll('[data-period]')) {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-period]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderAttendance(button.dataset.period);
  });
}

const savedTheme = localStorage.getItem('nagm-theme');
if (savedTheme === 'dark') root.dataset.theme = 'dark';

document.querySelector('[data-theme-toggle]').addEventListener('click', (event) => {
  const dark = root.dataset.theme !== 'dark';
  if (dark) root.dataset.theme = 'dark';
  else delete root.dataset.theme;
  localStorage.setItem('nagm-theme', dark ? 'dark' : 'light');
  event.currentTarget.setAttribute('aria-label', dark ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي');
});

function closeMenu() {
  app.classList.remove('menu-open');
  document.querySelector('[data-menu-toggle]').setAttribute('aria-expanded', 'false');
}

document.querySelector('[data-menu-toggle]').addEventListener('click', (event) => {
  const open = app.classList.toggle('menu-open');
  event.currentTarget.setAttribute('aria-expanded', String(open));
});
document.querySelector('[data-menu-close]').addEventListener('click', closeMenu);
document.querySelectorAll('.side-nav .nav-link[data-not-ready], .text-action[data-not-ready]').forEach((button) => {
  button.addEventListener('click', () => {
    toast.textContent = 'هذا القسم سيُصمَّم ضمن مراحل التنفيذ التالية.';
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2200);
    closeMenu();
  });
});

const employeeRecords = [
  { id: 'EMP-001', name: 'موظف تجريبي 01', job: 'مهندس موقع', status: 'active', nationality: 'سعودي', religion: 'مسلم', identity: '10••••••31', bank: 'SA•••••••7042', payment: 'تحويل بنكي', sponsor: 'الشركة', department: 'المشروعات', site: 'موقع العيون', residence: 'حي النخيل — الرياض', joined: '١٢ يناير ٢٠٢٤' },
  { id: 'EMP-002', name: 'موظف تجريبي 02', job: 'محاسب', status: 'active', nationality: 'مصري', religion: 'مسلم', identity: '24••••••68', bank: 'SA•••••••1265', payment: 'تحويل بنكي', sponsor: 'الشركة', department: 'الإدارة المالية', site: 'الإدارة الرئيسية', residence: 'حي الندى — الرياض', joined: '٠٥ مارس ٢٠٢٣' },
  { id: 'EMP-003', name: 'موظف تجريبي 03', job: 'فني كهرباء', status: 'leave', nationality: 'أردني', religion: 'مسلم', identity: '19••••••42', bank: 'SA•••••••8531', payment: 'تحويل بنكي', sponsor: 'الشركة', department: 'الصيانة', site: 'موقع المربع', residence: 'حي الروضة — الرياض', joined: '٢٢ أغسطس ٢٠٢٢', directManagerId: 'EMP-001' },
  { id: 'EMP-004', name: 'موظف تجريبي 04', job: 'مسؤول موارد بشرية', status: 'active', nationality: 'سعودي', religion: 'مسلم', identity: '10••••••97', bank: 'SA•••••••4008', payment: 'تحويل بنكي', sponsor: 'الشركة', department: 'الموارد البشرية', site: 'الإدارة الرئيسية', residence: 'حي المونسية — الرياض', joined: '١٧ يونيو ٢٠٢٥' },
  { id: 'EMP-005', name: 'موظف تجريبي 05', job: 'سائق معدات', status: 'stopped', nationality: 'سوداني', religion: 'مسلم', identity: '23••••••15', bank: 'غير مسجل', payment: 'غير محدد', sponsor: 'الشركة', department: 'التشغيل', site: 'موقع المطار', residence: 'سكن الشركة — الرياض', joined: '٠٩ نوفمبر ٢٠٢١' },
  { id: 'EMP-006', name: 'موظف تجريبي 06', job: 'مراقب سلامة', status: 'active', nationality: 'يمني', religion: 'مسلم', identity: '25••••••83', bank: 'SA•••••••9814', payment: 'تحويل بنكي', sponsor: 'الشركة', department: 'السلامة', site: 'موقع العيون', residence: 'حي الرمال — الرياض', joined: '٢٨ فبراير ٢٠٢٤', directManagerId: 'EMP-001' },
];
const employeeStatus = { active: 'نشط', leave: 'إجازة', stopped: 'موقوف' };
const employeeDirectManagers = (() => { try { return JSON.parse(localStorage.getItem('nagm-employee-direct-managers') || '{}') || {}; } catch { return {}; } })();
employeeRecords.forEach((employee) => { if (Object.hasOwn(employeeDirectManagers, employee.id)) employee.directManagerId = employeeDirectManagers[employee.id] || ''; });
function saveEmployeeDirectManagers() { localStorage.setItem('nagm-employee-direct-managers', JSON.stringify(employeeDirectManagers)); }
function saudiTodayISO() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh' }).format(new Date());
}
const employeeLeaveRecords = JSON.parse(localStorage.getItem('nagm-employee-leaves') || '{}');
const employeeLeaveRequests = (() => { try { const value = JSON.parse(localStorage.getItem('nagm-employee-leave-requests') || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } })();
const demoLeaveRequestId = 'DEMO-LEAVE-2026-001';
if (!employeeLeaveRequests.some((request) => request.id === demoLeaveRequestId)) {
  const demoEmployee = employeeRecords.find((employee) => employee.id === 'EMP-006');
  if (demoEmployee) {
    employeeLeaveRequests.unshift({ id: demoLeaveRequestId, employeeId: demoEmployee.id, requesterType: 'employee', requesterName: demoEmployee.name, requestedBy: `demo:${demoEmployee.id}`, requestedByName: demoEmployee.name, startDate: '2026-12-01', endDate: '2026-12-05', leaveType: 'إجازة سنوية', employeeNote: 'طلب تجريبي لمراجعة مسار الإجازة والاعتمادات.', site: demoEmployee.site, approvalStages: [], stageIndex: 0, approvalHistory: [], status: 'pending-hr-review', createdAt: new Date().toISOString(), demo: true });
    localStorage.setItem('nagm-employee-leave-requests', JSON.stringify(employeeLeaveRequests));
  }
}
let leaveHistoryLinksMigrated = false;
for (const [employeeId, leaveRecord] of Object.entries(employeeLeaveRecords)) {
  const history = Array.isArray(leaveRecord?.history) ? leaveRecord.history : [];
  const linkedRequestIds = new Set(history.map((entry) => entry.requestId).filter(Boolean));
  for (const entry of history) {
    if (entry.requestId) continue;
    const match = employeeLeaveRequests.find((request) => request.employeeId === employeeId && request.status === 'approved' && request.startDate === entry.startDate && (request.endDate || '') === (entry.endDate || '') && !linkedRequestIds.has(request.id));
    if (match) { entry.requestId = match.id; linkedRequestIds.add(match.id); leaveHistoryLinksMigrated = true; }
  }
}
if (leaveHistoryLinksMigrated) localStorage.setItem('nagm-employee-leaves', JSON.stringify(employeeLeaveRecords));
const employeeFinancialItems = (() => { try { const value = JSON.parse(localStorage.getItem('nagm-employee-financial-items') || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } })();
function saveEmployeeFinancialItems() { localStorage.setItem('nagm-employee-financial-items', JSON.stringify(employeeFinancialItems)); }
const employeeLeaveSettlements = (() => { try { const value = JSON.parse(localStorage.getItem('nagm-employee-leave-settlements') || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } })();
function saveEmployeeLeaveSettlements() { localStorage.setItem('nagm-employee-leave-settlements', JSON.stringify(employeeLeaveSettlements)); }
const leaveApproverSignatures = (() => { try { return JSON.parse(localStorage.getItem('nagm-leave-approver-signatures') || '{}') || {}; } catch { return {}; } })();
const employeeLeaveSignatures = (() => { try { return JSON.parse(localStorage.getItem('nagm-employee-leave-signatures') || '{}') || {}; } catch { return {}; } })();
function saveEmployeeLeaveSignatures() { localStorage.setItem('nagm-employee-leave-signatures', JSON.stringify(employeeLeaveSignatures)); }
function leaveSignatureForAccount(accountId) {
  const account = registeredAccounts.find((item) => accountIdentifier(item) === accountId);
  return (account?.employeeId && employeeLeaveSignatures[account.employeeId]) || leaveApproverSignatures[accountId] || '';
}
const leaveAuditEvents = (() => { try { const value = JSON.parse(localStorage.getItem('nagm-leave-audit-events') || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } })();
function saveLeaveAuditEvents() { localStorage.setItem('nagm-leave-audit-events', JSON.stringify(leaveAuditEvents)); }
function leaveAudit(eventType, subjectId, details = {}) {
  const session = window.NAGM_SESSION || {};
  leaveAuditEvents.unshift({ id: `LEAVE-AUDIT-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, eventType, subjectId, actorId: sessionIdentifier(), actorName: session.displayName || session.fullName || session.name || session.account || sessionIdentifier(), at: new Date().toISOString(), details });
  saveLeaveAuditEvents();
}
const attendanceCorrectionRequests = (() => { try { const value = JSON.parse(localStorage.getItem('nagm-attendance-correction-requests') || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } })();
function saveAttendanceCorrectionRequests() { localStorage.setItem('nagm-attendance-correction-requests', JSON.stringify(attendanceCorrectionRequests)); }
const alternateAttendanceRequests = (() => { try { const value = JSON.parse(localStorage.getItem('nagm-alternate-attendance-requests') || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } })();
function saveAlternateAttendanceRequests() { localStorage.setItem('nagm-alternate-attendance-requests', JSON.stringify(alternateAttendanceRequests)); }
const alternateAttendanceSettings = (() => { try { return { requirePhoto: true, approvalSequence: true, ...(JSON.parse(localStorage.getItem('nagm-alternate-attendance-settings') || '{}') || {}) }; } catch { return { requirePhoto: true, approvalSequence: true }; } })();
function saveAlternateAttendanceSettings() { localStorage.setItem('nagm-alternate-attendance-settings', JSON.stringify(alternateAttendanceSettings)); }
const employeeGeneralRequests = (() => { try { const value = JSON.parse(localStorage.getItem('nagm-employee-general-requests') || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } })();
function saveEmployeeGeneralRequests() { localStorage.setItem('nagm-employee-general-requests', JSON.stringify(employeeGeneralRequests)); }
const employeeRatings = (() => { try { const value = JSON.parse(localStorage.getItem('nagm-employee-ratings') || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } })();
function saveEmployeeRatings() { localStorage.setItem('nagm-employee-ratings', JSON.stringify(employeeRatings)); }
const employeeStatusDetails = (() => { try { return JSON.parse(localStorage.getItem('nagm-employee-status-details') || '{}') || {}; } catch { return {}; } })();
const employeeWorkPeriods = JSON.parse(localStorage.getItem('nagm-employee-work-periods') || '{}');
const storedEmployeePeriodAssignments = JSON.parse(localStorage.getItem('nagm-employee-work-period-assignments') || 'null');
const employeeWorkPeriodAssignments = storedEmployeePeriodAssignments && typeof storedEmployeePeriodAssignments === 'object' && !Array.isArray(storedEmployeePeriodAssignments)
  ? storedEmployeePeriodAssignments : {};
let migratedEmployeePeriodAssignments = false;
Object.entries(employeeWorkPeriods).forEach(([employeeId, period]) => {
  if (period && !Array.isArray(employeeWorkPeriodAssignments[employeeId])) {
    employeeWorkPeriodAssignments[employeeId] = [{ ...period, assignmentId: `legacy-${employeeId}`, fromDate: period.fromDate || '', toDate: period.toDate || '', assignedAt: period.assignedAt || new Date(0).toISOString() }];
    migratedEmployeePeriodAssignments = true;
  }
});
if (migratedEmployeePeriodAssignments) localStorage.setItem('nagm-employee-work-period-assignments', JSON.stringify(employeeWorkPeriodAssignments));
const savedEmployeePeriodDefinitions = JSON.parse(localStorage.getItem('nagm-employee-period-definitions') || 'null');
let employeePeriodDefinitions = Array.isArray(savedEmployeePeriodDefinitions) ? savedEmployeePeriodDefinitions : [];
let editingEmployeePeriodId = null;
const savedEmployeeCustodyRecords = JSON.parse(localStorage.getItem('nagm-employee-custodies') || 'null');
const employeeCustodyRecords = Array.isArray(savedEmployeeCustodyRecords) ? savedEmployeeCustodyRecords : [];
let employeeCustodyFilter = 'all';
let employeeCustodySearch = '';
let employeeReturnsSearch = '';
let openEmployeeCustodyAction = null;
let profileCustodyUrls = [];
const defaultEmployeeSiteNames = [...new Set([...employeeRecords.map((employee) => employee.site), 'الورشة'])];
const storedEmployeeSiteNames = JSON.parse(localStorage.getItem('nagm-employee-location-sites') || 'null');
let employeeSiteNames = Array.isArray(storedEmployeeSiteNames) ? storedEmployeeSiteNames : defaultEmployeeSiteNames;
const employeeSiteGeofences = JSON.parse(localStorage.getItem('nagm-employee-site-geofences') || '{}');
const employeeAllowedSites = JSON.parse(localStorage.getItem('nagm-employee-allowed-sites') || '{}');
let punchRange = 'today';
let punchEmployeeId = 'all';
let punchFromDate = saudiTodayISO();
let punchToDate = saudiTodayISO();
let punchQuery = '';
let punchSourceFilter = 'all';
let visibleCompanyPunches = [];
let manualAttendanceEmployeeId = '';
let manualAttendanceDate = saudiTodayISO();
const faceAttendanceEnabled = (() => { try { const ids = JSON.parse(localStorage.getItem('nagm-face-attendance-enabled') || '[]'); return new Set(Array.isArray(ids) ? ids : []); } catch { return new Set(); } })();
function saveFaceAttendanceEnabled() { localStorage.setItem('nagm-face-attendance-enabled', JSON.stringify([...faceAttendanceEnabled])); }
function canAppearInAssistedAttendance(employee) { return Boolean(employee && employee.status === 'active' && !employee.archived && !employee.systemHidden && employee.sponsor === 'الشركة' && faceAttendanceEnabled.has(employee.id)); }
function punchMethodLabel(record) {
  if (['camera-face', 'face-camera', 'camera-face-verified'].includes(record.attendanceMethod) || ['camera-face-verified', 'face-camera'].includes(record.source)) return 'حضور بالكاميرا';
  if (['manual', 'manual-full-shift'].includes(record.source)) return 'تحضير يدوي';
  if (record.source === 'approved-punch-correction' || record.correctionRequestId) return 'تصحيح بصمة معتمد';
  if (record.source === 'alternate-face-approved' || record.source === 'alternate-device-approved' || record.attendanceType === 'alternate-face' || record.attendanceType === 'alternate-device') return 'حضور بديل';
  if (['gps', 'gps-verified', 'geofence'].includes(record.source) || record.verificationMode === 'gps-geofence') return 'GPS';
  return record.source === 'بيانات تجريبية' ? 'بيانات تجريبية' : 'بصمة الجهاز';
}
function punchDeviceLabel(record) {
  const device = record.deviceLabel || record.deviceName || record.deviceInfo?.model || record.userAgentLabel;
  const holder = record.deviceOwnerName ? `مع ${record.deviceOwnerName}${record.deviceOwnerRole ? ` · ${record.deviceOwnerRole}` : ''}` : '';
  return [device, holder].filter(Boolean).join(' · ') || 'غير مسجل';
}
function attendanceDeviceLabel() {
  const ua = navigator.userAgent || '';
  const platform = navigator.userAgentData?.platform || navigator.platform || '';
  const mobile = navigator.userAgentData?.mobile || /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  const family = /Android/i.test(ua) ? 'Android' : /iPhone|iPad|iPod/i.test(ua) ? 'iPhone / iPad' : /Windows/i.test(platform + ua) ? 'Windows' : /Mac/i.test(platform + ua) ? 'Mac' : /Linux/i.test(platform + ua) ? 'Linux' : 'جهاز غير معروف';
  return `${mobile ? 'هاتف' : 'جهاز'} · ${family}`;
}
function shiftSaudiDate(dateValue, offset) {
  const [year, month, day] = dateValue.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + offset));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}
const companyPunchRecords = [
  ['EMP-001', 0, '07:11:41'], ['EMP-002', 0, '07:16:28'], ['EMP-004', 0, '07:24:04'],
  ['EMP-006', 0, '07:32:46'], ['EMP-001', 0, '12:01:17'], ['EMP-002', 1, '08:12:00'],
  ['EMP-004', 1, '08:32:11'], ['EMP-006', 1, '07:51:35'],
].map(([employeeId, daysAgo, time], index) => {
  const employee = employeeRecords.find((record) => record.id === employeeId);
  const date = shiftSaudiDate(saudiTodayISO(), -daysAgo);
  return { id: `DEMO-PUNCH-${index + 1}`, employeeId, date, time, timestamp: new Date(`${date}T${time}+03:00`).toISOString(), site: (employeeAllowedSites[employeeId] || [])[0] || employee.site, department: employee.department, source: 'بيانات تجريبية' };
});
const savedManualCompanyAttendance = JSON.parse(localStorage.getItem('nagm-company-manual-attendance') || 'null');
const manualCompanyAttendanceRecords = Array.isArray(savedManualCompanyAttendance) ? savedManualCompanyAttendance : [];
let manualAttendanceFormOpen = false;
function getCompanyAttendanceRecords() {
  const knownEmployees = new Set(employeeRecords.map((employee) => employee.id));
  return [...companyPunchRecords, ...manualCompanyAttendanceRecords].filter((record) => knownEmployees.has(record.employeeId));
}
let employeeSiteMap = null;
let employeeSiteMarker = null;
let employeeSiteCircle = null;
let selectedEmployeeSiteCoordinates = null;
let editingEmployeeSite = null;
for (const employee of employeeRecords) {
  const leave = employeeLeaveRecords[employee.id];
  if (!leave) continue;
  employee.leaveStartDate = leave.startDate || '';
  employee.leaveReturnDate = leave.returnDate || '';
  employee.statusBeforeLeave = leave.statusBeforeLeave || 'active';
  if (leave.returnDate) employee.status = 'active';
  else if (leave.startDate && leave.startDate <= saudiTodayISO()) employee.status = 'leave';
  else if (leave.startDate) employee.status = employee.statusBeforeLeave;
}
const employeeList = document.querySelector('[data-employee-list]');
const employeeSearch = document.querySelector('[data-employee-search]');
const employeeProfile = document.querySelector('[data-employee-profile]');
let employeeFilter = 'all';
let employeeMode = 'rows';
let selectedEmployee = null;
let editingEmployeeProfilePeriod = false;
let employeeManagerAssignmentFilter = 'unassigned';
let employeeManagerAssignmentQuery = '';
let showArchivedEmployees = false;
const archivedEmployeeIds = new Set(JSON.parse(localStorage.getItem('nagm-archived-employees') || '[]'));
employeeRecords.forEach((employee) => { employee.archived = archivedEmployeeIds.has(employee.id); });
const hiddenEmployeeIds = new Set(JSON.parse(localStorage.getItem('nagm-system-hidden-employees') || '[]'));
employeeRecords.forEach((employee) => { employee.systemHidden = hiddenEmployeeIds.has(employee.id); });

function saveHiddenEmployeeIds() {
  localStorage.setItem('nagm-system-hidden-employees', JSON.stringify([...hiddenEmployeeIds]));
}

const EMPLOYEE_FILES_DB = 'nagm-employee-files';
let employeeFilesDatabase;
let attachmentObjectUrls = [];

function openEmployeeFilesDatabase() {
  if (!('indexedDB' in window)) return Promise.reject(new Error('التخزين المحلي للملفات غير متاح في هذا المتصفح.'));
  if (!employeeFilesDatabase) employeeFilesDatabase = new Promise((resolve, reject) => {
    const request = indexedDB.open(EMPLOYEE_FILES_DB, 1);
    request.onupgradeneeded = () => request.result.createObjectStore('files', { keyPath: 'id' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('تعذر فتح مساحة مرفقات المعاينة.'));
  });
  return employeeFilesDatabase;
}

async function getEmployeeFiles(employeeId) {
  const db = await openEmployeeFilesDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction('files', 'readonly').objectStore('files').getAll();
    request.onsuccess = () => resolve(request.result.filter((record) => record.employeeId === employeeId));
    request.onerror = () => reject(request.error || new Error('تعذر قراءة المرفقات.'));
  });
}

async function getAllEmployeeFiles() {
  const db = await openEmployeeFilesDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction('files', 'readonly').objectStore('files').getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error || new Error('تعذر قراءة ملفات التوقيعات.'));
  });
}

async function putEmployeeFile(record) {
  const db = await openEmployeeFilesDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('files', 'readwrite');
    transaction.objectStore('files').put(record);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error('تعذر حفظ الملف في المعاينة.'));
  });
}

async function removeEmployeeFile(fileId) {
  const db = await openEmployeeFilesDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('files', 'readwrite');
    transaction.objectStore('files').delete(fileId);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error('تعذر حذف الملف.'));
  });
}

async function getCustodyAttachment(custodyId) {
  const db = await openEmployeeFilesDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction('files', 'readonly').objectStore('files').get(`custody-document-${custodyId}`);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error || new Error('تعذر قراءة مرفق العهدة.'));
  });
}

async function putCustodyAttachment(custodyId, file) {
  await putEmployeeFile({ id: `custody-document-${custodyId}`, employeeId: '', custodyId, kind: 'custody-document', fileName: file.name, blob: file, createdAt: new Date().toISOString() });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function saveArchivedEmployeeIds() {
  localStorage.setItem('nagm-archived-employees', JSON.stringify([...archivedEmployeeIds]));
}

function saveEmployeeLeaveRecords() {
  localStorage.setItem('nagm-employee-leaves', JSON.stringify(employeeLeaveRecords));
}

function saveEmployeeStatusDetails() {
  localStorage.setItem('nagm-employee-status-details', JSON.stringify(employeeStatusDetails));
}

function saveEmployeeLeaveRequests() {
  localStorage.setItem('nagm-employee-leave-requests', JSON.stringify(employeeLeaveRequests));
}

function leaveProceduresAreClosed(request) {
  return Boolean(request?.proceduresCompletedAt && (!request.proceduresReopenedAt || request.proceduresReopenedAt <= request.proceduresCompletedAt));
}

function leaveProcedureStatusDisplay(request) {
  if (leaveProceduresAreClosed(request)) return `مكتملة ${new Date(request.proceduresCompletedAt).toLocaleString('ar-SA')}`;
  if (request?.proceduresReopenedAt && request.proceduresCompletedAt) return `أعيد فتحها ${new Date(request.proceduresReopenedAt).toLocaleString('ar-SA')} · ${request.proceduresReopenReason || 'حركة مالية جديدة'}`;
  return 'لم تكتمل';
}

function reopenEmployeeLeaveProcedures(employeeId, reason, relatedId = '') {
  const at = new Date().toISOString();
  const actorId = sessionIdentifier();
  const actorName = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.fullName || window.NAGM_SESSION?.name || actorId;
  const item = employeeFinancialItems.find((record) => record.id === relatedId);
  const linkedRequestId = item?.proposalForLeaveId || employeeLeaveRecords[employeeId]?.requestId || '';
  const request = (linkedRequestId && employeeLeaveRequests.find((record) => record.id === linkedRequestId))
    || employeeLeaveRequests.filter((record) => record.employeeId === employeeId && record.status === 'approved' && record.proceduresCompletedAt).sort((a, b) => String(b.proceduresCompletedAt).localeCompare(String(a.proceduresCompletedAt)))[0];
  if (!request?.proceduresCompletedAt) return;
  request.procedureReopenEvents ||= [];
  request.proceduresReopenedAt = at;
  request.proceduresReopenedById = actorId;
  request.proceduresReopenedBy = actorName;
  request.proceduresReopenReason = reason;
  request.procedureReopenEvents.push({ at, actorId, actorName, reason, relatedId });
  leaveAudit('employee-leave-procedures-reopened', request.id, { employeeId, reason, relatedId });
  saveEmployeeLeaveRequests();
}

function isSystemAdmin() {
  const role = String(window.NAGM_SESSION?.role || 'owner').trim().toLocaleLowerCase('ar');
  return ['owner', 'system-admin', 'system_admin', 'مدير النظام', 'مالك النظام'].includes(role) || role.includes('مدير النظام');
}

function syncScheduledEmployeeLeaves() {
  const today = saudiTodayISO();
  let changed = false;
  for (const employee of employeeRecords) {
    const leave = employeeLeaveRecords[employee.id];
    if (!leave?.startDate || leave.returnDate) continue;
    if (leave.startDate <= today && employee.status !== 'leave') {
      employee.status = 'leave';
      changed = true;
    }
  }
  if (changed) {
    document.querySelectorAll('[data-status-filter].active').forEach((button) => button.setAttribute('aria-pressed', 'true'));
    renderEmployeeList();
    if (selectedEmployee) renderEmployeeProfile(selectedEmployee, employeeProfile.dataset.profileSection || 'overview');
  }
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2400);
}

function field(label, value) {
  return `<div class="employee-field"><small>${label}</small><strong>${value}</strong></div>`;
}

function visibleEmployees() {
  const query = employeeSearch.value.trim().toLocaleLowerCase('ar');
  const job = document.querySelector('[data-job-filter]').value;
  return employeeRecords.filter((employee) => {
    if (showArchivedEmployees ? !(employee.archived || employee.systemHidden) : (employee.archived || employee.systemHidden)) return false;
    const matchesStatus = employeeFilter === 'all' || employee.status === employeeFilter;
    const matchesJob = !job || employee.job === job;
    const matchesQuery = !query || [employee.name, employee.id, employee.identity, employee.job].some((value) => value.toLocaleLowerCase('ar').includes(query));
    return matchesStatus && matchesJob && matchesQuery;
  });
}

function renderEmployeeList() {
  const rows = visibleEmployees();
  const countableEmployees = employeeRecords.filter((employee) => showArchivedEmployees ? (employee.archived || employee.systemHidden) : (!employee.archived && !employee.systemHidden));
  document.querySelectorAll('[data-count]').forEach((node) => {
    const status = node.dataset.count;
    node.textContent = arabicNumber.format(status === 'all' ? countableEmployees.length : countableEmployees.filter((employee) => employee.status === status).length);
  });
  employeeList.classList.toggle('rows', employeeMode === 'rows');
  document.querySelector('[data-employee-empty]').hidden = rows.length > 0;
  if (employeeMode === 'cards') {
    employeeList.innerHTML = rows.map((employee) => `<article class="employee-card" role="button" tabindex="0" data-open-employee="${employee.id}" aria-label="فتح لوحة ${employee.name}">
      <div class="employee-card-head"><span class="employee-avatar" data-employee-avatar="${employee.id}">${arabicNumber.format(Number(employee.id.slice(-1)))}</span><div class="employee-name"><strong>${employee.name}</strong><small>${employee.id} · ${employee.job}${employee.systemHidden ? ' · مخفي من النظام' : ''}</small></div><span class="status-badge ${employee.status}">${employeeStatus[employee.status]}</span></div>
      <div class="employee-fields">${field('الهوية / الإقامة', employee.identity)}${field('الجنسية', employee.nationality)}${field('الديانة', employee.religion)}${field('القسم', employee.department)}${field('صرف الراتب', employee.payment)}${field('الحساب البنكي', employee.bank)}${field('الكفالة', employee.sponsor)}${field('موقع العمل', employee.site)}${field('موقع السكن', employee.residence)}</div>
      <div class="employee-card-foot"><button type="button" data-profile-action="details" data-employee-id="${employee.id}">عرض اللوحة</button><button type="button" class="primary-button" data-profile-action="edit" data-employee-id="${employee.id}">تعديل</button></div>
    </article>`).join('');
  } else {
    employeeList.innerHTML = `<table class="employee-table employee-directory-table"><thead><tr><th>الموظف</th><th>المهنة</th><th>الهوية / الإقامة</th><th>الجنسية</th><th>موقع السكن</th><th>صرف الراتب</th><th>الحساب البنكي</th><th>الكفالة</th><th>الحالة</th></tr></thead><tbody>${rows.map((employee) => `<tr data-open-employee="${employee.id}" tabindex="0"><td><div class="employee-name-cell"><span class="employee-avatar" data-employee-avatar="${employee.id}">${arabicNumber.format(Number(employee.id.slice(-1)))}</span><span>${employee.name}<small style="display:block;color:var(--muted);font-size:8px;font-weight:400">${employee.id}${employee.systemHidden ? ' · مخفي من النظام' : ''}</small></span></div></td><td>${employee.job}</td><td>${employee.identity}</td><td>${employee.nationality}</td><td>${employee.residence}</td><td>${employee.payment}</td><td>${employee.bank}</td><td>${employee.sponsor}</td><td><span class="status-badge ${employee.status}">${employeeStatus[employee.status]}</span></td></tr>`).join('')}</tbody></table>`;
  }
  employeeList.querySelectorAll('[data-employee-avatar]').forEach(async (avatar) => {
    try {
      const photo = (await getEmployeeFiles(avatar.dataset.employeeAvatar)).find((record) => record.kind === 'photo');
      if (!photo || !avatar.isConnected) return;
      const image = document.createElement('img');
      image.alt = '';
      image.src = URL.createObjectURL(photo.blob);
      avatar.replaceChildren(image);
    } catch { /* The initials remain visible when browser storage is unavailable. */ }
  });
}

function employeeEvaluationsMarkup(targetType, targetId) {
  const rows = employeeRatings.filter((rating) => rating.targetType === targetType && rating.targetId === targetId).sort((a, b) => String(b.month).localeCompare(String(a.month)));
  return rows.length ? `<div class="evaluation-history-list">${rows.map((rating) => `<article class="evaluation-history-row"><div><strong>${escapeHtml(rating.month)} · ${escapeHtml(rating.site)}</strong><span class="evaluation-score">${arabicNumber.format(rating.score)} / 5</span></div><p>${escapeHtml(rating.note)}</p><small>تقييم ${escapeHtml(rating.evaluatorName)} · ${new Date(rating.updatedAt || rating.createdAt).toLocaleDateString('ar-SA')}</small></article>`).join('')}</div>` : '<div class="profile-empty-state">لا توجد تقييمات مسجلة لهذا الموظف.</div>';
}

function employeeProfileSectionContent(employee, section) {
  const safe = escapeHtml;
  const workPeriod = currentEmployeeWorkPeriod(employee.id);
  const workPeriodHistory = employeeWorkPeriodHistory(employee.id);
  const leaveRecord = employeeLeaveRecords[employee.id];
  const directManager = employee.directManagerId && employeeRecords.find((item) => item.id === employee.directManagerId);
  const leaveStart = leaveRecord?.startDate || '';
  const leaveReturn = leaveRecord?.returnDate || '';
  const leaveIsScheduled = Boolean(leaveStart && !leaveReturn && leaveStart > saudiTodayISO());
  const leaveStateLabel = !isSystemAdmin() && leaveRecord?.startDate ? 'على إجازة' : leaveReturn ? `عاد الموظف بتاريخ ${leaveReturn}` : leaveStart && !leaveIsScheduled ? `على الإجازة منذ ${leaveStart}` : leaveIsScheduled ? `إجازة مجدولة من ${leaveStart}` : 'لا توجد إجازة مسجلة';
  const personal = `<section class="profile-panel"><h3>البيانات الشخصية</h3><div class="profile-details profile-details-wide"><div><small>رقم الهوية</small><strong>${safe(employee.identity)}</strong></div><div><small>الجنسية</small><strong>${safe(employee.nationality)}</strong></div><div><small>الديانة</small><strong>${safe(employee.religion)}</strong></div><div><small>رقم الموظف</small><strong>${safe(employee.id)}</strong></div><div><small>موقع السكن</small><strong>${safe(employee.residence)}</strong></div></div><p class="profile-note">رقم الهوية والحساب البنكي معروضان بشكل مخفي في بيانات المعاينة.</p></section>`;
  const work = `<section class="profile-panel"><h3>البيانات الوظيفية</h3><div class="profile-details profile-details-wide"><div><small>المسمى الوظيفي</small><strong>${safe(employee.job)}</strong></div><div><small>القسم</small><strong>${safe(employee.department)}</strong></div><div><small>موقع العمل</small><strong>${safe(employee.site)}</strong></div><div><small>المدير المباشر</small><strong>${safe(directManager?.name || 'لا يوجد مدير مباشر')}</strong></div><div><small>تاريخ الانضمام</small><strong>${safe(employee.joined)}</strong></div><div><small>الحالة</small><strong>${employeeStatus[employee.status]}</strong></div><div><small>الكفالة</small><strong>${safe(employee.sponsor)}</strong></div><div><small>طريقة الصرف</small><strong>${safe(employee.payment)}</strong></div><div><small>الحساب البنكي</small><strong>${safe(employee.bank)}</strong></div></div></section>`;
  if (section === 'evaluations') return `<div class="profile-section-stack"><section class="profile-panel"><div class="panel-title"><div><h3>تقييمات ${safe(employee.name)}</h3><p>التقييمات الشهرية التي سجلها مهندس الموقع</p></div></div>${employeeEvaluationsMarkup('company', employee.id)}</section></div>`;
  if (section === 'signature') {
    const accountIds = registeredAccounts.filter((account) => account.employeeId === employee.id).map(accountIdentifier);
    const signatureId = employeeLeaveSignatures[employee.id] || accountIds.map((id) => leaveApproverSignatures[id]).find(Boolean) || '';
    const canEditSignature = isSystemAdmin() || currentEmployeeForSession()?.id === employee.id;
    return `<div class="profile-section-stack"><section class="profile-panel employee-signature-panel"><div class="panel-title"><div><h3>توقيع الموظف للاعتمادات</h3><p>إضافة التوقيع اختيارية. كل توقيع جديد يحفظ نسخة مستقلة، وتبقى توقيعات الاعتمادات السابقة كما استُخدمت.</p></div><span class="request-status-pill">${signatureId ? 'توقيع محفوظ' : 'بدون توقيع'}</span></div><div class="employee-signature-preview" data-employee-signature-preview data-signature-id="${safe(signatureId)}"><span>${signatureId ? 'جاري تحميل التوقيع…' : 'لم تتم إضافة توقيع'}</span></div>${canEditSignature ? `<form class="employee-signature-form" data-employee-signature-form data-employee-id="${safe(employee.id)}"><label>صورة التوقيع (PNG أو JPG)<input type="file" name="signature" accept="image/png,image/jpeg,image/webp" required></label><button class="primary-button" type="submit">${signatureId ? 'حفظ نسخة توقيع جديدة' : 'إضافة التوقيع'}</button></form>` : '<p class="profile-note">إضافة التوقيع متاحة لمدير النظام أو الموظف نفسه.</p>'}</section></div>`;
  }
  if (section === 'disbursements') return renderEmployeeDisbursementProfile(employee);
  if (section === 'alternate-attendance') return renderEmployeeAlternateAttendanceProfile(employee);

  const periodSummary = workPeriod
    ? `${workPeriod.periodName ? `${workPeriod.periodName} · ` : ''}${periodDisplay(workPeriod)} · ${workPeriod.fromDate || 'بلا تاريخ بداية'} إلى ${workPeriod.toDate || 'بلا تاريخ نهاية'} · عمل فعلي ${arabicNumber.format(Math.floor(periodWorkMinutes(workPeriod) / 60))} س ${arabicNumber.format(periodWorkMinutes(workPeriod) % 60)} د · سماح ${workPeriod.beforeMinutes} دقيقة قبل و${workPeriod.afterMinutes} دقيقة بعد`
    : 'لم تُحدد فترة عمل لهذا الموظف بعد.';
  const employeeAttendance = getCompanyAttendanceRecords().filter((record) => record.employeeId === employee.id).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  const latestAttendance = employeeAttendance[0];
  const attendanceDates = new Set(employeeAttendance.map((record) => record.date));
  const attendanceSummary = `<section class="profile-panel profile-attendance-summary"><div class="panel-title"><div><h3>ملخص الحضور</h3><p>عرض مختصر؛ السجلات التفصيلية تفتح عند الطلب</p></div><button class="secondary-button" type="button" data-profile-attendance-management>عرض سجل الحضور الكامل</button></div><div class="profile-details profile-details-wide"><div><small>أيام حضور مسجلة</small><strong>${arabicNumber.format(attendanceDates.size)}</strong></div><div><small>عدد سجلات البصمة</small><strong>${arabicNumber.format(employeeAttendance.length)}</strong></div><div><small>آخر حضور</small><strong>${latestAttendance ? `${safe(latestAttendance.date)} · ${safe(latestAttendance.time)}` : 'لا يوجد حضور مسجل'}</strong></div><div><small>آخر موقع</small><strong>${latestAttendance ? safe(latestAttendance.site) : '—'}</strong></div></div></section>`;
  if (section === 'overview') {
    const statusDetails = employeeStatusDetails[employee.id] || {};
    const statusPanel = employee.status === 'stopped' && isSystemAdmin() ? `<section class="profile-panel"><h3>تفاصيل الإيقاف <span class="private-data-tag">خاص بمدير النظام</span></h3><div class="profile-stat"><span>التصنيف الحالي</span><strong>${safe(statusDetails.category || 'غير محدد')}</strong></div><p class="profile-note">${safe(statusDetails.reason || 'لم يُكتب سبب الإيقاف بعد.')}</p><form class="leave-form" data-suspension-form data-employee-id="${safe(employee.id)}"><label>تصنيف الإيقاف<select name="category"><option value="نهائي" ${statusDetails.category === 'نهائي' ? 'selected' : ''}>نهائي</option><option value="مؤقت" ${statusDetails.category === 'مؤقت' ? 'selected' : ''}>مؤقت</option><option value="سبب آخر" ${statusDetails.category === 'سبب آخر' ? 'selected' : ''}>سبب آخر</option></select></label><label>السبب<textarea name="reason" maxlength="300" required>${safe(statusDetails.reason || '')}</textarea></label><button class="primary-button" type="submit">حفظ سبب الإيقاف</button></form>${!employee.systemHidden ? `<button class="danger-button" type="button" data-hide-employee-system="${safe(employee.id)}">إخفاء الموظف من النظام مع حفظ تقاريره</button><p class="profile-note">بعد الموافقة، لن يظهر في القوائم والتقارير التشغيلية، وتبقى سجلاته محفوظة في الأرشيف.</p>` : '<p class="profile-note">هذا الموظف مخفي من النظام؛ سجلاته وتقاريره محفوظة.</p>'}</section>` : '';
    const privateLeave = isSystemAdmin() && leaveRecord?.reason ? `<p class="profile-note"><span class="private-data-tag">خاص بمدير النظام</span> ${safe(leaveRecord.reasonCategory)} · ${safe(leaveRecord.reason)}</p>` : '';
    return `<div class="profile-section-stack">${personal}${work}${attendanceSummary}${statusPanel}<section class="profile-panel"><h3>الإجازة</h3><div class="profile-stat"><span>${safe(leaveStateLabel)}</span><strong>${employeeStatus[employee.status]}</strong></div>${privateLeave}<p class="profile-note">تُدار الطلبات والاعتمادات من صفحة «إجازات الموظفين».</p></section><section class="profile-panel"><h3>تفاصيل الفترة</h3><p class="profile-note">${safe(periodSummary)}</p><button class="secondary-button" type="button" data-profile-section="period">عرض تفاصيل الفترة</button></section></div>`;
  }
  if (section === 'period') {
    const isEditing = editingEmployeeProfilePeriod;
    const currentPeriodName = workPeriod?.periodName || (workPeriod ? 'فترة مخصصة' : 'لا توجد فترة معينة');
    const savedPeriodOptions = employeePeriodDefinitions.map((period) => `<label class="period-choice" data-profile-period-choice><input type="radio" name="profile-period-choice" value="${safe(period.id)}" ${workPeriod?.periodId === period.id ? 'checked' : ''}><span><strong>${safe(period.name)}</strong><small>${safe(periodDisplay(period))} · عمل ${arabicNumber.format(Math.floor(periodWorkMinutes(period) / 60))} س ${arabicNumber.format(periodWorkMinutes(period) % 60)} د · سماح ${arabicNumber.format(period.beforeMinutes)} قبل و${arabicNumber.format(period.afterMinutes)} بعد</small></span></label>`).join('');
    const periodDetails = workPeriod ? `<div class="profile-details profile-details-wide period-profile-details"><div><small>الفترة</small><strong>${safe(currentPeriodName)}</strong></div><div><small>جدول الدوام</small><strong>${safe(periodDisplay(workPeriod))}</strong></div><div><small>إجمالي العمل الفعلي</small><strong>${arabicNumber.format(Math.floor(periodWorkMinutes(workPeriod) / 60))} س ${arabicNumber.format(periodWorkMinutes(workPeriod) % 60)} د</strong></div><div><small>تاريخ السريان من</small><strong>${safe(workPeriod.fromDate || 'غير محدد')}</strong></div><div><small>تاريخ السريان إلى</small><strong>${safe(workPeriod.toDate || 'غير محدد')}</strong></div><div><small>السماح قبل أول جزء</small><strong>${arabicNumber.format(workPeriod.beforeMinutes)} دقيقة</strong></div><div><small>السماح بعد آخر جزء</small><strong>${arabicNumber.format(workPeriod.afterMinutes)} دقيقة</strong></div></div>` : '<div class="profile-empty-state"><strong>لم تُعيّن فترة عمل لهذا الموظف.</strong><p>استخدم زر «تعديل» لاختيار فترة من الفترات المحفوظة.</p></div>';
    const historyRows = [...workPeriodHistory].reverse().map((period, reverseIndex) => {
      const originalIndex = workPeriodHistory.length - reverseIndex - 1;
      const isCurrent = originalIndex === workPeriodHistory.length - 1;
      return `<article class="employee-period-history-row"><div><strong>${safe(period.periodName || period.name || 'فترة مخصصة')}${isCurrent ? ' <span class="current-period-tag">الأحدث · المعتمدة</span>' : ''}</strong><small>${safe(period.fromDate || '؟')} إلى ${safe(period.toDate || '؟')} · ${safe(periodDisplay(period))}</small></div><button class="danger-button" type="button" data-delete-profile-period-assignment="${safe(period.assignmentId || '')}">حذف</button></article>`;
    }).join('');
    return `<div class="profile-section-stack"><section class="profile-panel"><h3>تفاصيل فترة العمل</h3><p class="profile-note">${safe(employee.name)} · ${safe(employee.id)}. فترة السريان المحددة أدناه محفوظة لهذا الموظف، والأحدث هي المعتمدة حاليًا.</p>${isEditing ? `<form class="profile-period-edit-form" data-period-form><div class="period-choice-list">${savedPeriodOptions || '<div class="profile-empty-state"><strong>لا توجد فترات محفوظة.</strong><p>أضف فترة أولًا من صفحة «الفترات» ثم ارجع لاختيارها هنا.</p></div>'}</div><div class="period-assignment-dates"><label>تاريخ السريان من<input type="date" data-profile-period-from value="${safe(workPeriod?.fromDate || '')}" required></label><label>تاريخ السريان إلى<input type="date" data-profile-period-to value="${safe(workPeriod?.toDate || '')}" required></label></div><div class="period-profile-actions"><button class="primary-button" type="submit" ${employeePeriodDefinitions.length ? '' : 'disabled'}>حفظ الفترة</button><button class="secondary-button" type="button" data-clear-profile-period ${workPeriod ? '' : 'disabled'}>مسح الفترة الحالية</button><button class="secondary-button" type="button" data-cancel-profile-period-edit>إلغاء</button></div></form>` : `${periodDetails}<div class="period-profile-actions"><button class="secondary-button" type="button" data-edit-profile-period>تعديل</button></div>`}<section class="employee-period-history"><h4>سجل فترات الموظف</h4><div class="employee-period-history-list">${historyRows || '<p class="profile-note">لا يوجد سجل فترات سابق لهذا الموظف.</p>'}</div></section><p class="profile-note">عند تعيين فترة جديدة تبقى الفترات السابقة في السجل، وتصبح الأحدث هي المعتمدة حتى تحذفها.</p></section></div>`;
  }
  if (section === 'locations') return `<section class="profile-panel"><h3>مواقع البصمة المسموح بها</h3><p class="profile-note">اختر موقعًا أو أكثر لهذا الموظف. يتم التحقق من GPS عند محاولة تسجيل البصمة فقط.</p>${employeeLocationAssignmentForm(employee, 'profile')}</section>`;
  if (section === 'leave') {
    const isAdmin = leaveFinanceManager();
    const statusDetails = employeeStatusDetails[employee.id] || {};
    const leaveStart = leaveRecord?.startDate || '';
    const leaveEnd = leaveRecord?.endDate || '';
    const actualReturn = leaveRecord?.actualReturnDate || (employee.status !== 'leave' ? leaveRecord?.returnDate : '') || '';
    const currentLeave = leaveRecord?.history?.[leaveRecord.history.length - 1];
    const leaveType = leaveRecord?.reasonCategory || currentLeave?.reasonCategory || 'إجازة';
    const leaveReturnForm = isAdmin && employee.status === 'leave' && leaveStart && leaveStart <= saudiTodayISO()
      ? `<form class="leave-form return-work-form" data-management-return-form data-employee-id="${safe(employee.id)}"><label>تاريخ العودة الفعلية<input type="date" name="returnDate" max="${saudiTodayISO()}" value="${saudiTodayISO()}" required></label><button class="primary-button" type="submit">تسجيل العودة</button></form>` : '';
    const suspensionReturnForm = isAdmin && employee.status === 'stopped'
      ? `<form class="leave-form return-work-form" data-suspension-return-form data-employee-id="${safe(employee.id)}"><label>تاريخ العودة للعمل<input type="date" name="returnDate" max="${saudiTodayISO()}" value="${saudiTodayISO()}" required></label><button class="primary-button" type="submit">إنهاء الإيقاف وتسجيل العودة</button></form>` : '';
    const directForm = isAdmin && !['stopped', 'leave'].includes(employee.status) ? renderDirectLeaveForm(employee) : '';
    const employeeLeaveCases = employeeLeaveRequests.filter((request) => request.employeeId === employee.id).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const historicalRows = employeeLeaveCases.map((request) => `<article class="leave-history-case"><strong>${safe(request.leaveType || request.reasonCategory || 'إجازة')} · ${safe(request.startDate || '—')} إلى ${safe(request.endDate || '—')}</strong><span class="request-status-pill">${safe(leaveRequestStatusLabel(request))}</span><small>الطلب ${safe(request.id)} · ${safe(request.createdAt?.slice(0, 10) || '—')}</small>${request.status === 'approved' ? `<button class="secondary-button" type="button" data-print-leave-document="${safe(request.id)}">طباعة نموذج الإجازة وإخلاء الطرف</button>` : ''}</article>`).join('');
    return `<div class="profile-section-stack"><section class="profile-panel"><div class="panel-title"><div><h3>الإجازة</h3><p>ملخص الحالة الحالية والعودة</p></div><span class="status-badge ${employee.status}">${employeeStatus[employee.status]}</span></div><div class="profile-details profile-details-wide"><div><small>النوع</small><strong>${safe(leaveType)}</strong></div><div><small>من تاريخ</small><strong>${safe(leaveStart || '—')}</strong></div><div><small>إلى تاريخ</small><strong>${safe(leaveEnd || '—')}</strong></div><div><small>العودة الفعلية</small><strong>${safe(actualReturn || 'لم تسجل')}</strong></div></div>${isAdmin && leaveRecord?.reason ? `<p class="profile-note"><span class="private-data-tag">خاص بمدير النظام</span> ${safe(leaveRecord.reasonCategory || leaveType)} · ${safe(leaveRecord.reason)}</p>` : ''}${leaveReturnForm}${suspensionReturnForm}${isAdmin && employee.status === 'stopped' ? `<p class="profile-note"><span class="private-data-tag">سبب الإيقاف خاص بالإدارة</span> ${safe(statusDetails.category || 'غير محدد')} · ${safe(statusDetails.reason || 'لم يُكتب سبب الإيقاف.')}</p>` : ''}</section>${directForm}<details class="profile-panel"><summary>سجل الإجازات والاعتمادات · ${arabicNumber.format(employeeLeaveCases.length)}</summary><div class="leave-history-list">${historicalRows || '<div class="profile-empty-state">لا توجد طلبات إجازة سابقة.</div>'}</div></details></div>`;
  }
  if (section === 'leave-legacy-disabled') {
    const isAdmin = leaveFinanceManager();
    const employeeLeaveCases = employeeLeaveRequests.filter((request) => request.employeeId === employee.id).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const statusDetails = employeeStatusDetails[employee.id] || {};
    const leaveReturnForm = isAdmin && employee.status === 'leave' && leaveRecord?.startDate && leaveRecord.startDate <= saudiTodayISO()
      ? `<form class="leave-form return-work-form" data-management-return-form data-employee-id="${safe(employee.id)}"><label>تاريخ العودة الفعلية من الإجازة<input type="date" name="returnDate" max="${saudiTodayISO()}" value="${saudiTodayISO()}" required></label><button class="primary-button" type="submit">تسجيل العودة للعمل</button></form>` : '';
    const suspensionReturnForm = isAdmin && employee.status === 'stopped'
      ? `<form class="leave-form return-work-form" data-suspension-return-form data-employee-id="${safe(employee.id)}"><label>تاريخ العودة للعمل<input type="date" name="returnDate" max="${saudiTodayISO()}" value="${saudiTodayISO()}" required></label><button class="primary-button" type="submit">إنهاء الإيقاف وتسجيل العودة</button></form>` : '';
    const suspensionNote = isAdmin && employee.status === 'stopped' ? `<p class="profile-note"><span class="private-data-tag">سبب الإيقاف خاص بالإدارة</span> ${safe(statusDetails.category || 'غير محدد')} · ${safe(statusDetails.reason || 'لم يُكتب سبب الإيقاف.')}</p>` : '';
    const returnHistory = isAdmin ? (statusDetails.returnHistory || []).slice(-3).reverse().map((item) => `<p class="profile-note">عودة من إيقاف بتاريخ ${safe(item.date)} · سُجلت بواسطة ${safe(item.by)}</p>`).join('') : '';
    const pastLeaveHistory = isAdmin ? (leaveRecord?.history || []).slice(-5).reverse().map((item) => `<p class="profile-note">إجازة ${safe(item.reasonCategory || '')} من ${safe(item.startDate)} إلى ${safe(item.endDate || item.returnDate || 'غير محدد')} · عودة سجلها ${safe(item.returnedBy || 'غير مسجل')}</p>`).join('') : '';
    const leaveCaseRows = employeeLeaveCases.map((request) => {
      const approvals = (request.approvalHistory || []).map((item) => `<div class="leave-history-approval"><strong>${safe(item.stage)}</strong><span>${safe(item.name || item.account || '')} · ${safe(item.action === 'approved' ? 'اعتماد' : item.action === 'routed' ? 'توجيه' : item.action === 'skipped-by-owner' ? 'تجاوز' : item.action)}</span><small>${safe(item.at ? new Date(item.at).toLocaleString('ar-SA') : '')}${item.note ? ` · ${safe(item.note)}` : ''}</small></div>`).join('');
      const settlement = employeeLeaveSettlements.find((item) => item.leaveRequestId === request.id);
      const financialHistory = isAdmin && settlement ? employeeFinancialItems.filter((item) => item.employeeId === employee.id && settlement.lines?.some((line) => line.financialItemId === item.id)).map((item) => `<div class="leave-history-approval"><strong>${safe(leaveFinancialTypes[item.type] || item.type)} · ${arabicNumber.format(Number(item.amount) || 0)} ر.س</strong><span>${safe(item.description)} · ${safe(leaveFinancialItemState(item))}</span><small>${safe(item.date || '')}${item.settlementNumber ? ` · التصفية ${safe(item.settlementNumber)} · الصرف ${safe(item.paidAt || '')}` : ''}</small></div>`).join('') : '';
      return `<article class="leave-history-case"><div class="management-employee-head"><div><strong>${safe(request.leaveType || request.reasonCategory || 'طلب إجازة')} · ${safe(request.startDate || '—')} إلى ${safe(request.endDate || '—')}</strong><small>تقديم ${safe(request.createdAt?.slice(0, 10) || '—')} بواسطة ${safe(request.requesterName || '—')} · ${safe(request.id)}</small></div><span class="request-status-pill">${safe(leaveRequestStatusLabel(request))}</span></div><p class="profile-note">اعتماد الإجازة: ${safe(request.fullyApprovedAt ? new Date(request.fullyApprovedAt).toLocaleString('ar-SA') : 'لم يكتمل')} · إغلاق المستحقات: ${safe(leaveProcedureStatusDisplay(request))}</p><div class="leave-history-approvals">${approvals || '<small>لا توجد اعتمادات مسجلة بعد.</small>'}</div>${settlement ? `<p class="profile-note">التصفية ${safe(settlement.number)} · ${safe(settlement.statusLabel || settlement.status)} · صافي ${arabicNumber.format(Number(settlement.netAmount) || 0)} ر.س ${settlement.paidAt ? `· صرف ${safe(settlement.paidAt)} · ${safe(settlement.method || '')} · مرجع ${safe(settlement.reference || '')}` : ''}${settlement.receiptFileId ? ` · <button type="button" class="secondary-button" data-open-leave-receipt="${safe(settlement.id)}">فتح إثبات الصرف</button>` : ''}</p>` : ''}${financialHistory ? `<div class="leave-history-approvals">${financialHistory}</div>` : ''}${request.status === 'approved' ? `<button class="secondary-button" type="button" data-print-leave-document="${safe(request.id)}">طباعة نموذج الإجازة وإخلاء الطرف</button>` : ''}</article>`;
    }).join('');
    const employeeFinancialTimeline = isAdmin ? employeeFinancialItems.filter((item) => item.employeeId === employee.id && !item.archived).sort((a,b) => String(b.createdAt).localeCompare(String(a.createdAt))).map((item) => { const history = [...(item.history || []), ...(item.approvalHistory || [])].sort((a,b) => String(a.at).localeCompare(String(b.at))).map((entry) => `<small>${safe(entry.actorName || entry.name || entry.stage || '')} · ${safe(entry.action || '')} · ${safe(entry.at ? new Date(entry.at).toLocaleString('ar-SA') : '')}${entry.note ? ` · ${safe(entry.note)}` : ''}</small>`).join(''); return `<div class="leave-history-approval"><strong>${safe(leaveFinancialTypes[item.type] || item.type)} · ${arabicNumber.format(Number(item.amount) || 0)} ر.س</strong><span>${safe(item.description)} · اعتماد: ${safe(item.approvalStatus || 'معلق')} · الصرف: ${safe(leaveFinancialItemState(item).split(' · ')[1] || 'غير مصروف')}</span><small>${safe(item.date || '')} · أضافه ${safe(item.createdByName || '—')}${item.settlementNumber ? ` · التصفية ${safe(item.settlementNumber)}` : ''}</small>${history}</div>`; }).join('') : '';
    const directForm = isAdmin && !['stopped', 'leave'].includes(employee.status) ? renderDirectLeaveForm(employee) : '';
    return `<div class="profile-section-stack"><section class="profile-panel"><h3>الإجازة والعودة للعمل</h3><div class="leave-current-state"><span class="status-badge ${employee.status}">${employeeStatus[employee.status]}</span><strong>${safe(leaveStateLabel)}</strong></div>${isAdmin && leaveRecord?.reason ? `<div class="profile-stat"><span>سبب الإجازة · خاص بمدير النظام</span><strong>${safe(leaveRecord.reasonCategory)} — ${safe(leaveRecord.reason)}</strong></div>` : '<p class="profile-note">تفاصيل الإجازة وأسبابها تظهر لحساب مالك النظام أو مدير النظام فقط.</p>'}${suspensionNote}${leaveReturnForm}${suspensionReturnForm}${returnHistory}${pastLeaveHistory}<p class="profile-note">تتحول حالة الموظف إلى إجازة عند حلول تاريخ البداية بعد الاعتماد النهائي. تسجيل العودة يبقى إجراءً منفصلًا لتوثيق العودة الفعلية.</p></section>${directForm}<section class="profile-panel"><div class="panel-title"><div><h3>سجل الإجازات والتصفيات</h3><p>${arabicNumber.format(employeeLeaveCases.length)} طلبًا مستقلًا محفوظًا لهذا الموظف</p></div></div><div class="leave-history-list">${leaveCaseRows || '<div class="profile-empty-state">لا توجد إجازات مسجلة لهذا الموظف.</div>'}</div></section>${employeeFinancialTimeline ? `<section class="profile-panel"><div class="panel-title"><div><h3>سجل الإضافيات والمستحقات</h3><p>حالة اعتماد كل بند وصرفه، وربطه بالتصفية إن وُجد.</p></div></div><div class="leave-history-approvals">${employeeFinancialTimeline}</div></section>` : ''}</div>`;
  }
  if (section === 'custody') {
    const assigned = employeeCustodyRecords.filter((item) => item.employeeId === employee.id && item.status === 'assigned');
    const officeItems = employeeCustodyRecords.filter((item) => item.status === 'office');
    const custodyRows = assigned.map((item) => `<article class="custody-row"><div class="custody-row-main"><strong>${safe(item.statement)}</strong><small>السيريال: ${safe(item.serial || 'غير مسجل')} · رقم الخط: ${safe(item.phoneNumber || 'لا ينطبق')} · القيمة: ${arabicNumber.format(Number(item.value) || 0)} ر.س</small><small>تاريخ استلام الموظف: ${safe(item.receivedDate || 'غير مسجل')} <span data-custody-attachment="${safe(item.id)}"></span></small></div><form class="custody-return-form" data-profile-custody-return data-custody-id="${safe(item.id)}"><label>تاريخ تسليمها للمكتب<input type="date" name="returnDate" value="${saudiTodayISO()}" required></label><button class="secondary-button" type="submit">تسليم العهدة للمكتب</button></form></article>`).join('');
    return `<div class="profile-section-stack"><section class="profile-panel"><div class="panel-title"><div><h3>العهد المسلّمة للموظف</h3><p>${safe(employee.name)} · ${arabicNumber.format(assigned.length)} عهدة حالية</p></div></div><div class="custody-record-list">${custodyRows || '<div class="profile-empty-state"><strong>لا توجد عهد مسلّمة لهذا الموظف.</strong><p>يمكنك إضافة عهدة من المخزون الموجود في المكتب.</p></div>'}</div></section><section class="profile-panel"><h3>إضافة عهدة من المكتب</h3>${officeItems.length ? `<form class="profile-custody-assign-form" data-profile-custody-assign><label>اختر العهدة<select name="custodyId" required><option value="">اختر عهدة من المكتب</option>${officeItems.map((item) => `<option value="${safe(item.id)}">${safe(item.statement)} · ${safe(item.serial || 'بلا سيريال')}</option>`).join('')}</select></label><label>تاريخ استلام الموظف<input type="date" name="receivedDate" value="${saudiTodayISO()}" required></label><button class="primary-button" type="submit">إضافة العهدة للموظف</button></form>` : '<div class="profile-empty-state"><strong>لا توجد عهد متاحة في المكتب.</strong><p>أضف عهدة من صفحة «العهد» في قائمة الموظفين، ثم أعد فتح ملف الموظف.</p></div>'}</section></div>`;
  }
  return '<section class="profile-panel"><h3>مرفقات الموظف</h3><div class="profile-empty-state" data-attachments-loading>جارٍ تحميل المرفقات من هذه المعاينة…</div></section>';
}

function periodTimeMinutes(value) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatPeriodMinute(value) {
  const dayOffset = Math.floor(value / 1440);
  const minutesInDay = ((value % 1440) + 1440) % 1440;
  const time = `${String(Math.floor(minutesInDay / 60)).padStart(2, '0')}:${String(minutesInDay % 60).padStart(2, '0')}`;
  const day = dayOffset < 0 ? 'اليوم السابق' : dayOffset > 0 ? 'اليوم التالي' : 'نفس اليوم';
  return `${day} ${time}`;
}

function periodSegments(period) {
  if (Array.isArray(period?.segments) && period.segments.length) return period.segments;
  return period?.startTime && period?.endTime ? [{ startTime: period.startTime, endTime: period.endTime, endDay: period.endDay || 'same' }] : [];
}

function periodStartTime(period) { return periodSegments(period)[0]?.startTime || period?.startTime || ''; }
function periodEndTime(period) { const segments = periodSegments(period); return segments.at(-1)?.endTime || period?.endTime || ''; }

function periodWorkMinutes(period) {
  return periodSegments(period).reduce((total, segment) => {
    const start = periodTimeMinutes(segment.startTime);
    let end = periodTimeMinutes(segment.endTime);
    if (segment.endDay === 'next' || end <= start) end += 1440;
    return total + (end - start);
  }, 0);
}

function periodBreakMinutes(period) {
  const segments = periodSegments(period);
  if (segments.length < 2) return 0;
  const previousEnd = periodTimeMinutes(segments[0].endTime);
  const nextStart = periodTimeMinutes(segments[1].startTime);
  return nextStart - previousEnd;
}

function periodDisplay(period) {
  const segments = periodSegments(period);
  if (segments.length > 1) return `فترتان: ${segments.map((segment) => `${segment.startTime}–${segment.endTime}`).join(' ثم ')} · فاصل ${arabicNumber.format(Math.floor(periodBreakMinutes(period) / 60))} س ${arabicNumber.format(periodBreakMinutes(period) % 60)} د`;
  const segment = segments[0];
  if (!segment) return 'غير محددة';
  return `${segment.startTime}–${segment.endTime}${segment.endDay === 'next' ? ' · اليوم التالي' : ''}`;
}

function updatePeriodFormMode(form) {
  if (!form) return;
  const split = form.querySelector('[data-period-mode]')?.value === 'split';
  const singleFields = form.querySelector('[data-single-period-fields]');
  const splitFields = form.querySelector('[data-split-period-fields]');
  if (singleFields) singleFields.hidden = split;
  if (splitFields) splitFields.hidden = !split;
  form.querySelectorAll('[data-single-period-fields] input, [data-single-period-fields] select').forEach((input) => { input.disabled = split; });
  form.querySelectorAll('[data-split-period-fields] input').forEach((input) => { input.disabled = !split; });
}

function defaultEmployeeSiteGeofence(site, index) {
  const settings = employeeSiteGeofences[site] || { locationId: `LOC-${String(index + 1).padStart(3, '0')}`, latitude: '', longitude: '', radiusMeters: '' };
  return { ...settings, active: settings.active !== false };
}

function employeeLocationAssignmentForm(employee, scope) {
  const selectedSites = new Set(employeeAllowedSites[employee.id] || []);
  const siteOptions = employeeSiteNames.map((site, index) => {
    const geofence = defaultEmployeeSiteGeofence(site, index);
    const status = geofence.latitude && geofence.longitude && geofence.radiusMeters ? `نطاق ${geofence.radiusMeters} م` : 'إعداد الموقع غير مكتمل';
    const selected = selectedSites.has(site);
    const inactive = !geofence.active;
    return `<label class="site-assignment-option ${inactive ? 'site-assignment-inactive' : ''}"><input type="checkbox" name="employee-site" value="${escapeHtml(site)}" ${selected ? 'checked' : ''} ${inactive && !selected ? 'disabled' : ''}><span><strong>${escapeHtml(site)}${inactive ? ' · معطل' : ''}</strong><small>${escapeHtml(geofence.locationId)} · ${status}</small></span></label>`;
  }).join('');
  return `<form class="employee-location-assignment" data-location-assignment data-location-scope="${scope}" data-employee-id="${employee.id}"><div class="site-assignment-options">${siteOptions || '<p class="profile-note">لم تتم إضافة مواقع بعد.</p>'}</div><button class="primary-button" type="submit">حفظ المواقع المسموح بها</button><p class="profile-note">التعيين يستمر حتى تعديله. لإزالة موقع من الموظف، أزل علامة الاختيار ثم احفظ؛ يمكن إزالة كل المواقع أيضًا.</p></form>`;
}

function renderWorkPeriodPreview(form) {
  if (!form) return;
  const preview = form.querySelector('[data-period-preview]');
  updatePeriodFormMode(form);
  const before = Number(form.querySelector('[data-period-before]').value);
  const after = Number(form.querySelector('[data-period-after]').value);
  const mode = form.querySelector('[data-period-mode]')?.value || 'single';
  const startValue = form.querySelector('[data-period-start]')?.value;
  const endValue = form.querySelector('[data-period-end]')?.value;
  if (mode === 'split') {
    const start1 = form.querySelector('[data-period-start-1]')?.value;
    const end1 = form.querySelector('[data-period-end-1]')?.value;
    const start2 = form.querySelector('[data-period-start-2]')?.value;
    const end2 = form.querySelector('[data-period-end-2]')?.value;
    if (![start1, end1, start2, end2].every(Boolean)) { preview.textContent = 'أدخل بداية ونهاية كل جزء من الدوام.'; return; }
    const firstStart = periodTimeMinutes(start1);
    const firstEnd = periodTimeMinutes(end1);
    const secondStart = periodTimeMinutes(start2);
    const secondEnd = periodTimeMinutes(end2);
    if (firstEnd <= firstStart || secondStart <= firstEnd || secondEnd <= secondStart) { preview.textContent = 'تأكد أن الجزء الأول ينتهي بعد بدايته، والفاصل موجود، والجزء الثاني ينتهي بعد بدايته.'; preview.classList.add('invalid'); return; }
    preview.classList.remove('invalid');
    const workMinutes = firstEnd - firstStart + secondEnd - secondStart;
    const breakMinutes = secondStart - firstEnd;
    preview.textContent = `الدوام: ${start1}–${end1} ثم ${start2}–${end2} · عمل فعلي ${arabicNumber.format(Math.floor(workMinutes / 60))} س ${arabicNumber.format(workMinutes % 60)} د · فاصل ${arabicNumber.format(Math.floor(breakMinutes / 60))} س ${arabicNumber.format(breakMinutes % 60)} د · السماح قبل أول جزء ${arabicNumber.format(before)} د وبعد آخر جزء ${arabicNumber.format(after)} د.`;
    return;
  }
  const endDay = form.querySelector('[data-period-end-day]').value;
  if (!startValue || !endValue) { preview.textContent = 'أدخل وقت البداية والنهاية لعرض نافذة البصمة المسموحة.'; return; }
  const start = periodTimeMinutes(startValue);
  const end = periodTimeMinutes(endValue) + (endDay === 'next' ? 1440 : 0);
  if (endDay === 'same' && end <= start) { preview.textContent = 'وقت النهاية يجب أن يكون بعد البداية، أو اختر أن تنتهي الفترة في اليوم التالي.'; preview.classList.add('invalid'); return; }
  preview.classList.remove('invalid');
  preview.textContent = `نافذة البصمة المسموحة: ${formatPeriodMinute(start - before)} إلى ${formatPeriodMinute(end + after)}.`;
}

async function renderEmployeeProfile(employee, section = 'overview') {
  if (section !== 'period') editingEmployeeProfilePeriod = false;
  selectedEmployee = employee;
  employeeProfile.dataset.profileSection = section;
  const status = `<span class="status-badge ${employee.status}">${employeeStatus[employee.status]}</span>`;
  const archiveButton = employee.systemHidden
    ? `<button type="button" class="primary-button" data-restore-system-hidden-employee="${employee.id}">إظهار الموظف في النظام</button>`
    : employee.archived
    ? `<button type="button" class="primary-button" data-restore-employee="${employee.id}">استعادة الموظف</button>`
    : `<button type="button" class="secondary-button" data-archive-employee="${employee.id}">أرشفة الموظف</button>`;
  employeeProfile.innerHTML = `<button class="profile-back" type="button" data-back-employees>← العودة لقائمة الموظفين</button>
    <div class="profile-hero"><div class="profile-avatar" data-profile-avatar>${arabicNumber.format(Number(employee.id.slice(-1)))}</div><div class="profile-hero-main"><h2>${escapeHtml(employee.name)}</h2><p>${escapeHtml(employee.job)} · ${employee.id} · ${escapeHtml(employee.department)}</p></div>${status}<button type="button" class="primary-button" data-photo-trigger>إضافة / تغيير الصورة</button><input class="visually-hidden" type="file" accept="image/*" data-photo-input aria-label="اختر صورة الموظف">${archiveButton}</div>
    <div class="employee-profile-layout"><nav class="employee-profile-nav" aria-label="أقسام ملف الموظف">
      <button type="button" data-profile-section="overview" class="${section === 'overview' ? 'active' : ''}">البيانات الشخصية والوظيفية</button>
      <button type="button" data-profile-section="attachments" class="${section === 'attachments' ? 'active' : ''}">المرفقات</button>
      <button type="button" data-profile-section="custody" class="${section === 'custody' ? 'active' : ''}">العهد</button>
      <button type="button" data-profile-section="period" class="${section === 'period' ? 'active' : ''}">تفاصيل الفترة</button>
      <button type="button" data-profile-section="locations" class="${section === 'locations' ? 'active' : ''}">مواقع البصمة</button>
      <button type="button" data-profile-section="leave" class="${section === 'leave' ? 'active' : ''}">إجازة الموظف</button>
      <button type="button" data-profile-section="signature" class="${section === 'signature' ? 'active' : ''}">التوقيع الإلكتروني</button>
      <button type="button" data-profile-section="disbursements" class="${section === 'disbursements' ? 'active' : ''}">المبالغ المنصرفة</button>
      <button type="button" data-profile-section="alternate-attendance" class="${section === 'alternate-attendance' ? 'active' : ''}">الحضور البديل</button>
      <button type="button" data-profile-section="evaluations" class="${section === 'evaluations' ? 'active' : ''}">التقييمات</button>
    </nav><div class="employee-profile-main" data-profile-main data-section="${section}">${employeeProfileSectionContent(employee, section)}</div></div>`;
  bindEmployeeProfilePeriodActions(employee);
  document.querySelector('[data-employees-view]').hidden = true;
  employeeProfile.hidden = false;
  setCurrentView('profile', employee.name);
  try {
    const files = await getEmployeeFiles(employee.id);
    if (selectedEmployee?.id !== employee.id || employeeProfile.dataset.profileSection !== section) return;
    const photo = files.find((record) => record.kind === 'photo');
    const avatar = employeeProfile.querySelector('[data-profile-avatar]');
    if (photo && avatar) {
      const image = document.createElement('img');
      image.alt = `صورة ${employee.name}`;
      image.src = URL.createObjectURL(photo.blob);
      avatar.replaceChildren(image);
    }
    if (section === 'signature') {
      const preview = employeeProfile.querySelector('[data-employee-signature-preview]');
      const signatureId = preview?.dataset.signatureId;
      if (preview && signatureId) {
        const allFiles = await getAllEmployeeFiles();
        const signature = allFiles.find((record) => record.id === signatureId && ['employee-leave-signature', 'leave-signature'].includes(record.kind));
        if (signature) { const image = document.createElement('img'); image.src = URL.createObjectURL(signature.blob); image.alt = `توقيع ${employee.name}`; preview.replaceChildren(image); }
        else preview.innerHTML = '<span>ملف التوقيع غير موجود</span>';
      }
    }
    if (section === 'attachments') renderEmployeeAttachments(employee, files);
    if (section === 'custody') await renderEmployeeCustodyAttachments(employee);
  } catch (error) {
    if (section === 'attachments' || section === 'custody') notify(error.message);
  }
}

function bindEmployeeProfilePeriodActions(employee) {
  employeeProfile.querySelector('[data-edit-profile-period]')?.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    editingEmployeeProfilePeriod = true;
    await renderEmployeeProfile(employee, 'period');
  });
  employeeProfile.querySelector('[data-cancel-profile-period-edit]')?.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    editingEmployeeProfilePeriod = false;
    await renderEmployeeProfile(employee, 'period');
  });
  employeeProfile.querySelector('[data-clear-profile-period]')?.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const history = employeeWorkPeriodHistory(employee.id);
    if (!history.length) return;
    const latest = history[history.length - 1];
    if (!window.confirm(`مسح الفترة الحالية «${latest.periodName || latest.name || 'مخصصة'}» من ${employee.name}؟ ستبقى الفترات السابقة في السجل.`)) return;
    history.pop();
    saveEmployeeWorkPeriodHistory(employee.id, history);
    editingEmployeeProfilePeriod = false;
    await renderEmployeeProfile(employee, 'period');
    notify('تم مسح الفترة الحالية، وأصبحت الفترة السابقة هي المعتمدة.');
  });
  employeeProfile.querySelectorAll('[data-delete-profile-period-assignment]').forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const assignmentId = button.dataset.deleteProfilePeriodAssignment;
      const history = employeeWorkPeriodHistory(employee.id);
      const record = history.find((period) => period.assignmentId === assignmentId);
      if (!record || !window.confirm(`حذف فترة «${record.periodName || record.name || 'مخصصة'}» (${record.fromDate || '؟'} إلى ${record.toDate || '؟'}) من سجل ${employee.name}؟`)) return;
      saveEmployeeWorkPeriodHistory(employee.id, history.filter((period) => period.assignmentId !== assignmentId));
      await renderEmployeeProfile(employee, 'period');
      notify('تم حذف الفترة من سجل الموظف.');
    });
  });
}

function renderEmployeeAttachments(employee, files) {
  const host = employeeProfile.querySelector('[data-profile-main]');
  if (!host) return;
  const attachments = files.filter((record) => record.kind === 'attachment');
  attachmentObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  attachmentObjectUrls = [];
  const fileRows = attachments.length ? attachments.map((record) => {
    const url = URL.createObjectURL(record.blob);
    attachmentObjectUrls.push(url);
    return `<article class="attachment-row"><span class="attachment-file-icon">▧</span><div class="attachment-row-main"><strong>${escapeHtml(record.label)}</strong><small>${escapeHtml(record.fileName)} · ${new Intl.DateTimeFormat('ar-EG').format(new Date(record.createdAt))}</small></div><span class="attachment-visibility">${record.visibility === 'employee' ? 'المالك والموظف' : 'المالك فقط'}</span><a class="secondary-button" href="${url}" target="_blank" rel="noopener" download="${escapeHtml(record.fileName)}">فتح المرفق</a></article>`;
  }).join('') : '<div class="profile-empty-state"><strong>لا توجد مرفقات لهذا الموظف.</strong><p>أضف صورة الإقامة أو أي مستند، واكتب اسمًا واضحًا وحدد من يمكنه رؤيته.</p></div>';
  const workerOptions = employeeRecords.filter((record) => ((!record.archived && !record.systemHidden) || record.id === employee.id))
    .map((record) => `<option value="${record.id}" ${record.id === employee.id ? 'selected' : ''}>${escapeHtml(record.name)} · ${record.id}</option>`).join('');
  host.innerHTML = `<section class="profile-panel attachment-section"><h3>إضافة مرفق للموظف</h3>
    <form class="attachment-form" data-attachment-form>
      <label>الموظف<select data-attachment-employee>${workerOptions}</select></label>
      <label>اسم المرفق<input type="text" maxlength="80" placeholder="مثال: صورة الإقامة" data-attachment-label required></label>
      <label>من يمكنه الاطلاع؟<select data-attachment-visibility><option value="owner">المالك أو الحساب بصلاحياته فقط</option><option value="employee">المالك والموظف</option></select></label>
      <label class="attachment-file-picker">اختر صورة أو مستند<input type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" data-attachment-file required></label>
      <button class="primary-button" type="submit">حفظ المرفق</button>
    </form>
    <p class="profile-note">معاينة محلية: الملفات محفوظة في هذا المتصفح. تقييد الاطلاع فعليًا على المالك أو الموظف يحتاج ربط الصلاحيات بتسجيل الدخول عند تجهيز قاعدة البيانات.</p>
    <div class="attachment-list"><h3>مرفقات ${escapeHtml(employee.name)}</h3>${fileRows}</div>
  </section>`;
}

async function renderEmployeeCustodyAttachments(employee) {
  profileCustodyUrls.forEach((url) => URL.revokeObjectURL(url));
  profileCustodyUrls = [];
  const attachmentHosts = [...employeeProfile.querySelectorAll('[data-custody-attachment]')];
  for (const host of attachmentHosts) {
    const item = employeeCustodyRecords.find((record) => record.id === host.dataset.custodyAttachment && record.employeeId === employee.id);
    if (!item) continue;
    try {
      const attachment = await getCustodyAttachment(item.id);
      if (!attachment || selectedEmployee?.id !== employee.id || employeeProfile.dataset.profileSection !== 'custody') continue;
      const url = URL.createObjectURL(attachment.blob);
      profileCustodyUrls.push(url);
      host.innerHTML = ` · <a href="${url}" target="_blank" rel="noopener">فتح ورقة العهدة</a>`;
    } catch (error) { notify(error.message); }
  }
}

function leaveEmployeeProfile() {
  selectedEmployee = null;
  employeeProfile.hidden = true;
  document.querySelector('[data-employees-view]').hidden = false;
  setCurrentView('employees');
  renderEmployeeList();
}

function managementEmployeeCard(employee, content) {
  return `<article class="management-employee-card"><div class="management-employee-head"><div><strong>${escapeHtml(employee.name)}</strong><small>${employee.id} · ${escapeHtml(employee.job)}</small></div><span class="status-badge ${employee.status}">${employeeStatus[employee.status]}</span><button class="secondary-button" type="button" data-open-employee-profile="${employee.id}">ملف الموظف</button></div>${content}</article>`;
}

function saveEmployeeWorkPeriod(employee, values) {
  const { startTime, endTime, endDay, beforeMinutes, afterMinutes } = values;
  const error = validateWorkPeriodValues(values);
  if (error) return error;
  employeeWorkPeriods[employee.id] = { startTime, endTime, endDay, beforeMinutes, afterMinutes, periodName: 'مخصص', periodId: '' };
  localStorage.setItem('nagm-employee-work-periods', JSON.stringify(employeeWorkPeriods));
  return '';
}

function employeeWorkPeriodHistory(employeeId) {
  const history = employeeWorkPeriodAssignments[employeeId];
  return Array.isArray(history) ? history : [];
}

function currentEmployeeWorkPeriod(employeeId) {
  const history = employeeWorkPeriodHistory(employeeId);
  return history.length ? history[history.length - 1] : employeeWorkPeriods[employeeId];
}

function saveEmployeeWorkPeriodHistory(employeeId, history) {
  if (history.length) {
    employeeWorkPeriodAssignments[employeeId] = history;
    employeeWorkPeriods[employeeId] = history[history.length - 1];
  } else {
    delete employeeWorkPeriodAssignments[employeeId];
    delete employeeWorkPeriods[employeeId];
  }
  localStorage.setItem('nagm-employee-work-period-assignments', JSON.stringify(employeeWorkPeriodAssignments));
  localStorage.setItem('nagm-employee-work-periods', JSON.stringify(employeeWorkPeriods));
}

function validatePeriodAssignmentDates(fromDate, toDate) {
  if (!fromDate || !toDate) return 'حدد تاريخ بداية الفترة ونهايتها.';
  if (toDate < fromDate) return 'تاريخ نهاية الفترة يجب ألا يسبق تاريخ بدايتها.';
  return '';
}

function validateWorkPeriodValues(values) {
  if (values.mode === 'split') {
    const [first, second] = values.segments || [];
    if (![first?.startTime, first?.endTime, second?.startTime, second?.endTime].every(Boolean)) return 'أدخل بداية ونهاية كل جزء من الدوام.';
    if (periodTimeMinutes(first.endTime) <= periodTimeMinutes(first.startTime)) return 'نهاية الجزء الأول يجب أن تكون بعد بدايته.';
    if (periodTimeMinutes(second.startTime) <= periodTimeMinutes(first.endTime)) return 'بداية الجزء الثاني يجب أن تكون بعد نهاية الجزء الأول حتى يظهر الفاصل.';
    if (periodTimeMinutes(second.endTime) <= periodTimeMinutes(second.startTime)) return 'نهاية الجزء الثاني يجب أن تكون بعد بدايته.';
  } else {
    if (!values.startTime || !values.endTime) return 'أدخل وقت بداية الفترة ونهايتها.';
    if (values.endDay === 'same' && periodTimeMinutes(values.endTime) <= periodTimeMinutes(values.startTime)) return 'وقت النهاية يجب أن يكون بعد البداية، أو اختر أن تنتهي الفترة في اليوم التالي.';
  }
  if (![values.beforeMinutes, values.afterMinutes].every((minutes) => Number.isInteger(minutes) && minutes >= 0 && minutes <= 720)) return 'فترة السماح يجب أن تكون بين صفر و720 دقيقة.';
  return '';
}

function saveEmployeeReturn(employee, returnDate) {
  const leave = employeeLeaveRecords[employee.id];
  if (!leave?.startDate) return 'سجّل تاريخ بداية الإجازة أولًا.';
  if (!returnDate || returnDate > saudiTodayISO()) return 'أدخل تاريخ العودة الفعلي اليوم أو تاريخًا سابقًا.';
  if (returnDate < leave.startDate) return 'تاريخ العودة لا يمكن أن يسبق بداية الإجازة.';
  if (leave.startDate > saudiTodayISO()) return 'الإجازة مجدولة ولم تبدأ بعد.';
  leave.returnDate = returnDate;
  leave.returnedBy = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.account || 'مدير النظام';
  leave.returnedAt = new Date().toISOString();
  employee.leaveReturnDate = returnDate;
  employee.status = 'active';
  saveEmployeeLeaveRecords();
  return '';
}

function saveEmployeeSuspensionReturn(employee, returnDate) {
  if (employee.status !== 'stopped') return 'الموظف ليس موقوفًا حاليًا.';
  if (!returnDate || returnDate > saudiTodayISO()) return 'أدخل تاريخ العودة الفعلي اليوم أو تاريخًا سابقًا.';
  const details = employeeStatusDetails[employee.id] ||= {};
  details.returnHistory ||= [];
  details.returnHistory.push({
    date: returnDate,
    by: window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.account || 'مدير النظام',
    at: new Date().toISOString(),
    suspensionCategory: details.category || '',
    suspensionReason: details.reason || '',
  });
  details.returnDate = returnDate;
  details.returnedBy = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.account || 'مدير النظام';
  details.returnedAt = new Date().toISOString();
  employee.status = 'active';
  saveEmployeeStatusDetails();
  return '';
}

function renderEmployeePeriodManagement() {
  const host = document.querySelector('[data-all-employee-periods]');
  if (!host) return;
  const period = employeePeriodDefinitions.find((item) => item.id === editingEmployeePeriodId) || {};
  const cards = employeePeriodDefinitions.map((item) => `<article class="saved-period-row"><div class="saved-period-info"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(periodDisplay(item))} · عمل ${arabicNumber.format(Math.floor(periodWorkMinutes(item) / 60))} س ${arabicNumber.format(periodWorkMinutes(item) % 60)} د · سماح ${arabicNumber.format(item.beforeMinutes)} دقيقة قبل و${arabicNumber.format(item.afterMinutes)} دقيقة بعد</small></div><div class="saved-period-actions"><button type="button" class="secondary-button" data-edit-employee-period="${escapeHtml(item.id)}">تعديل</button><button type="button" class="danger-button" data-delete-employee-period="${escapeHtml(item.id)}">حذف</button></div></article>`).join('');
  host.innerHTML = `<section class="profile-panel period-definition-panel"><div class="panel-title"><div><h2>${editingEmployeePeriodId ? 'تعديل فترة' : 'إضافة فترة جديدة'}</h2><p>سمّ الفترة وحدد نافذة البصمة وفترات السماح</p></div></div><form class="work-period-form" data-period-definition-form>
      <label>اسم الفترة<input type="text" data-period-name maxlength="80" placeholder="مثال: فترة الصباح" value="${escapeHtml(period.name || '')}" required></label>
      <label>نظام الدوام<select data-period-mode><option value="single" ${!Array.isArray(period.segments) || period.segments.length < 2 ? 'selected' : ''}>فترة واحدة متصلة</option><option value="split" ${Array.isArray(period.segments) && period.segments.length > 1 ? 'selected' : ''}>فترتان وبينهما فاصل</option></select></label>
      <div class="period-time-fields" data-single-period-fields><label>بداية الفترة<input type="time" data-period-start value="${escapeHtml(period.startTime || period.segments?.[0]?.startTime || '')}" required></label><label>نهاية الفترة<input type="time" data-period-end value="${escapeHtml(period.endTime || period.segments?.[0]?.endTime || '')}" required></label><label>موعد الانتهاء<select data-period-end-day><option value="same" ${period.endDay !== 'next' ? 'selected' : ''}>في نفس اليوم</option><option value="next" ${period.endDay === 'next' ? 'selected' : ''}>في اليوم التالي</option></select></label></div>
      <div class="period-time-fields split-period-fields" data-split-period-fields hidden><h3>الجزء الأول</h3><label>من الساعة<input type="time" data-period-start-1 value="${escapeHtml(period.segments?.[0]?.startTime || '')}" required></label><label>إلى الساعة<input type="time" data-period-end-1 value="${escapeHtml(period.segments?.[0]?.endTime || '')}" required></label><h3>الجزء الثاني</h3><label>من الساعة<input type="time" data-period-start-2 value="${escapeHtml(period.segments?.[1]?.startTime || '')}" required></label><label>إلى الساعة<input type="time" data-period-end-2 value="${escapeHtml(period.segments?.[1]?.endTime || '')}" required></label><p class="profile-note">يكون الجزء الثاني بعد انتهاء الأول وفي اليوم نفسه. يظهر الفاصل تلقائيًا.</p></div>
      <label>سماح قبل البداية (دقيقة)<input type="number" min="0" max="720" step="1" data-period-before value="${escapeHtml(period.beforeMinutes ?? 0)}" required></label>
      <label>سماح بعد النهاية (دقيقة)<input type="number" min="0" max="720" step="1" data-period-after value="${escapeHtml(period.afterMinutes ?? 0)}" required></label>
      <div class="period-preview" data-period-preview>أدخل الأوقات لعرض نافذة البصمة.</div><p class="profile-note period-definition-note">تعديل الفترة يغيّر الاختيار عند التعيين القادم، ولا يغيّر سجل الموظف السابق.</p><div class="period-definition-actions"><button class="primary-button" type="submit">${editingEmployeePeriodId ? 'حفظ تعديلات الفترة' : 'حفظ الفترة'}</button>${editingEmployeePeriodId ? '<button class="secondary-button" type="button" data-cancel-edit-period>إلغاء التعديل</button>' : ''}</div>
    </form></section><section class="saved-period-section"><div class="panel-title"><div><h2>الفترات المحفوظة</h2><p>${arabicNumber.format(employeePeriodDefinitions.length)} فترات</p></div></div><div class="saved-period-list">${cards || '<div class="profile-empty-state">لا توجد فترات محفوظة. أضف فترة باسم واضح ثم انتقل إلى «تعيين فترة».</div>'}</div></section>`;
  renderWorkPeriodPreview(host.querySelector('[data-period-definition-form]'));
}

function nextEmployeePeriodId() {
  const highest = employeePeriodDefinitions.reduce((max, period) => Math.max(max, Number(String(period.id).match(/(\d+)$/)?.[1] || 0)), 0);
  return `PER-${String(highest + 1).padStart(3, '0')}`;
}

function employeesAssignedToPeriod(periodId) {
  return Object.entries(employeeWorkPeriodAssignments)
    .filter(([, history]) => Array.isArray(history) && history.some((period) => period.periodId === periodId))
    .map(([employeeId]) => employeeId);
}

function employeeIsManagerCandidate(employee) {
  const title = String(employee?.job || '').toLocaleLowerCase('ar');
  const accountHasManagerRole = registeredAccounts.some((account) => account.employeeId === employee?.id && /manager|director|مدير|مشاريع|تشغيل/i.test(String(account.role || account.roles || '')));
  return Boolean(employee && (accountHasManagerRole || /مدير|manager|director/i.test(title)));
}

function applyEmployeeManagerAssignmentFilters() {
  const host = document.querySelector('[data-employee-manager-assignment]');
  if (!host) return;
  const rows = [...host.querySelectorAll('[data-manager-assignment-row]')];
  const filter = host.querySelector('[data-manager-assignment-filter]')?.value || employeeManagerAssignmentFilter;
  const query = (host.querySelector('[data-manager-assignment-search]')?.value || employeeManagerAssignmentQuery).trim().toLocaleLowerCase('ar');
  rows.forEach((row) => {
    const matchesFilter = filter === 'all'
      || (filter === 'unassigned' && row.dataset.hasManager !== 'true')
      || (filter === 'assigned' && row.dataset.hasManager === 'true')
      || (filter === 'manager-no-manager' && row.dataset.isManager === 'true' && row.dataset.hasManager !== 'true');
    row.hidden = !matchesFilter || Boolean(query && !row.dataset.search.includes(query));
  });
  const visible = rows.filter((row) => !row.hidden).length;
  const note = host.querySelector('[data-manager-assignment-results]');
  if (note) note.textContent = `المعروض ${arabicNumber.format(visible)} من ${arabicNumber.format(rows.length)}`;
}

function renderEmployeeManagerAssignment() {
  const host = document.querySelector('[data-employee-manager-assignment]');
  if (!host) return;
  if (!isSystemAdmin()) { host.innerHTML = '<div class="profile-empty-state">تعيين المدير المباشر متاح لمدير النظام فقط.</div>'; return; }
  const employees = employeeRecords.filter((employee) => employee.sponsor === 'الشركة' && !employee.archived && !employee.systemHidden);
  const managerOptions = employees.filter((employee) => employeeIsManagerCandidate(employee) && !employee.directManagerId).map((employee) => `<option value="${escapeHtml(employee.id)}">${escapeHtml(employee.name)} · ${escapeHtml(employee.id)} · ${escapeHtml(employee.job)}</option>`).join('');
  const rows = employees.map((employee) => {
    const manager = employeeRecords.find((item) => item.id === employee.directManagerId);
    const managerCandidate = employeeIsManagerCandidate(employee);
    return `<tr data-manager-assignment-row data-has-manager="${Boolean(manager)}" data-is-manager="${managerCandidate}" data-search="${escapeHtml(`${employee.name} ${employee.id} ${employee.job} ${manager?.name || 'بدون مدير'}`.toLocaleLowerCase('ar'))}"><td><input type="checkbox" name="employeeId" value="${escapeHtml(employee.id)}" aria-label="اختيار ${escapeHtml(employee.name)}"></td><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.id)}</small></td><td>${escapeHtml(employee.job)}</td><td>${managerCandidate ? '<span class="request-status-pill">مدير</span>' : 'موظف'}</td><td>${escapeHtml(manager?.name || 'بانتظار تعيين مدير')}</td></tr>`;
  }).join('');
  const unassignedCount = employees.filter((employee) => !employee.directManagerId).length;
  const managerUnassignedCount = employees.filter((employee) => employeeIsManagerCandidate(employee) && !employee.directManagerId).length;
  host.innerHTML = `<section class="profile-panel"><form class="employee-manager-assignment-form" data-employee-manager-assignment-form><div class="bulk-assignment-filters"><label>المدير المباشر<select name="managerEmployeeId" data-manager-assignment-target><option value="">اختر المدير الذي ستسند إليه الموظفون</option>${managerOptions}</select></label><label>عرض الموظفين<select data-manager-assignment-filter><option value="unassigned" ${employeeManagerAssignmentFilter === 'unassigned' ? 'selected' : ''}>بانتظار تعيين مدير · ${arabicNumber.format(unassignedCount)}</option><option value="manager-no-manager" ${employeeManagerAssignmentFilter === 'manager-no-manager' ? 'selected' : ''}>مديرون بلا مدير مباشر · ${arabicNumber.format(managerUnassignedCount)}</option><option value="assigned" ${employeeManagerAssignmentFilter === 'assigned' ? 'selected' : ''}>لديهم مدير مباشر</option><option value="all" ${employeeManagerAssignmentFilter === 'all' ? 'selected' : ''}>كل الموظفين</option></select></label><label class="employee-search"><span aria-hidden="true">⌕</span><input type="search" data-manager-assignment-search value="${escapeHtml(employeeManagerAssignmentQuery)}" placeholder="ابحث بالاسم أو الكود أو الوظيفة"></label></div><div class="request-actions"><button class="secondary-button" type="button" data-select-manager-visible>تحديد الموظفين الظاهرين</button><button class="primary-button" type="submit" data-manager-assignment-action="assign">تعيين المدير للموظفين المحددين</button><button class="danger-button" type="submit" data-manager-assignment-action="clear">إزالة المدير عن المحددين</button></div><p class="profile-note" data-manager-assignment-results></p><div class="employee-list rows"><table class="employee-table"><thead><tr><th><input type="checkbox" data-manager-select-all aria-label="تحديد الكل"></th><th>الموظف</th><th>الوظيفة</th><th>التصنيف</th><th>المدير المباشر الحالي</th></tr></thead><tbody>${rows || '<tr><td colspan="5" class="log-empty">لا توجد سجلات موظفين.</td></tr>'}</tbody></table></div></form></section>`;
  applyEmployeeManagerAssignmentFilters();
}

function renderEmployeePeriodAssignment() {
  const host = document.querySelector('[data-all-employee-period-assignments]');
  if (!host) return;
  const periodOptions = employeePeriodDefinitions.map((period) => `<label class="period-choice" data-period-choice><input type="radio" name="assignment-period" value="${escapeHtml(period.id)}"><span><strong>${escapeHtml(period.name)}</strong><small>${escapeHtml(periodDisplay(period))} · عمل ${arabicNumber.format(Math.floor(periodWorkMinutes(period) / 60))} س ${arabicNumber.format(periodWorkMinutes(period) % 60)} د · سماح ${arabicNumber.format(period.beforeMinutes)} قبل و${arabicNumber.format(period.afterMinutes)} بعد</small></span></label>`).join('');
  const employees = employeeRecords.filter((employee) => !employee.archived && !employee.systemHidden).map((employee) => {
    const assigned = currentEmployeeWorkPeriod(employee.id);
    return `<label class="bulk-employee-choice" data-period-employee-choice><input type="checkbox" name="period-employee" value="${employee.id}"><span><strong>${escapeHtml(employee.name)}</strong><small>${employee.id} · ${escapeHtml(employee.job)}${assigned ? ` · الفترة الحالية: ${escapeHtml(assigned.periodName || 'مخصصة')} · ${escapeHtml(assigned.fromDate || '؟')} إلى ${escapeHtml(assigned.toDate || '؟')}` : ' · بلا فترة'}</small></span><i class="status-badge ${employee.status}">${employeeStatus[employee.status]}</i></label>`;
  }).join('');
  host.innerHTML = `<form class="period-assignment-form" data-period-assignment-form><section class="bulk-selection-panel"><div class="bulk-selection-title"><h3>١. اختر الفترة</h3><span class="selection-step-note">فترة واحدة لكل عملية تعيين</span></div><div class="period-picker-tools"><input type="search" class="bulk-employee-search" placeholder="ابحث عن فترة بالاسم" data-period-definition-search aria-label="بحث الفترات"><button type="button" class="secondary-button" data-toggle-period-list aria-expanded="false" ${employeePeriodDefinitions.length ? '' : 'disabled'}>إظهار كل الفترات</button></div><div class="period-choice-list collapsed" data-period-choice-list>${periodOptions || '<p class="profile-note">أضف فترة أولًا من صفحة «الفترات».</p>'}</div></section><section class="bulk-selection-panel"><div class="bulk-selection-title"><h3>٢. حدد تاريخ الفترة</h3></div><div class="period-assignment-dates"><label>من تاريخ<input type="date" data-period-assignment-from required></label><label>إلى تاريخ<input type="date" data-period-assignment-to required></label></div></section><section class="bulk-selection-panel"><div class="bulk-selection-title"><h3>٣. اختر الموظفين</h3><label class="select-all-control"><input type="checkbox" data-select-all-period-employees><span>اختيار كل الموظفين</span></label></div><input type="search" class="bulk-employee-search" placeholder="ابحث باسم الموظف أو رقمه" data-period-employee-search aria-label="بحث الموظفين لتعيين فترة"><p class="bulk-search-hint">اختيار الكل يحدد نتائج البحث الظاهرة.</p><div class="bulk-choice-list bulk-employee-list">${employees || '<p class="profile-note">لا يوجد موظفون في القائمة الحالية.</p>'}</div><div class="bulk-selection-count" data-selected-period-employees-count>لم يتم اختيار موظفين</div></section><div class="bulk-assignment-actions"><span class="profile-note">يُحفظ كل تعيين في سجل الموظف؛ أحدث فترة هي المعتمدة حاليًا.</span><button class="primary-button" type="submit" ${employeePeriodDefinitions.length ? '' : 'disabled'}>تعيين الفترة للموظفين المحددين</button></div></form>`;
  updatePeriodAssignmentCount();
}

function updatePeriodAssignmentCount() {
  const selected = document.querySelectorAll('[data-period-assignment-form] input[name="period-employee"]:checked').length;
  const count = document.querySelector('[data-selected-period-employees-count]');
  if (count) count.textContent = selected ? `تم اختيار ${arabicNumber.format(selected)} موظفين` : 'لم يتم اختيار موظفين';
  const visible = [...document.querySelectorAll('[data-period-employee-choice]')].filter((choice) => !choice.hidden);
  const visibleSelected = visible.filter((choice) => choice.querySelector('input')?.checked).length;
  const selectAll = document.querySelector('[data-select-all-period-employees]');
  if (selectAll) {
    selectAll.checked = visible.length > 0 && visibleSelected === visible.length;
    selectAll.indeterminate = visibleSelected > 0 && visibleSelected < visible.length;
  }
}

function applyPeriodEmployeeSearch(query) {
  const normalized = query.trim().toLocaleLowerCase('ar');
  document.querySelectorAll('[data-period-employee-choice]').forEach((choice) => {
    choice.hidden = Boolean(normalized) && !choice.textContent.toLocaleLowerCase('ar').includes(normalized);
  });
  updatePeriodAssignmentCount();
}

function applyPeriodDefinitionSearch(query) {
  const normalized = query.trim().toLocaleLowerCase('ar');
  document.querySelectorAll('[data-period-choice]').forEach((choice) => {
    choice.hidden = Boolean(normalized) && !choice.textContent.toLocaleLowerCase('ar').includes(normalized);
  });
  const list = document.querySelector('[data-period-choice-list]');
  const toggle = document.querySelector('[data-toggle-period-list]');
  if (normalized && list?.classList.contains('collapsed')) {
    list.classList.remove('collapsed');
    if (toggle) { toggle.setAttribute('aria-expanded', 'true'); toggle.textContent = 'إخفاء الفترات الإضافية'; }
  }
}

function registerDirectEmployeeLeave(employeeId, startDate, endDate, reasonCategory, reason) {
  if (!isSystemAdmin()) return 'تسجيل الإجازة مباشرة متاح لمالك النظام أو مدير النظام فقط.';
  const employee = employeeRecords.find((record) => record.id === employeeId && !record.archived && !record.systemHidden && record.sponsor === 'الشركة');
  if (!employee || employee.status === 'stopped' || employee.status === 'leave') return 'اختر موظفًا نشطًا في النظام وغير موقوف أو على إجازة.';
  if (!startDate || !endDate || endDate < startDate || !reasonCategory || !reason.trim()) return 'أكمل نوع الإجازة وسببها وفترة البداية والنهاية بصورة صحيحة.';
  const currentLeave = employeeLeaveRecords[employee.id];
  if (currentLeave?.startDate && !currentLeave.returnDate) return 'للموظف إجازة قائمة أو مجدولة؛ سجّل عودته أو عالج الإجازة الحالية أولًا.';
  if (employeeLeaveRequests.some((request) => request.employeeId === employee.id && !['approved', 'rejected'].includes(request.status))) return 'للموظف طلب إجازة بانتظار الاعتماد؛ عالج الطلب قبل التسجيل المباشر.';
  const statusBeforeLeave = employee.status;
  const leaveHistory = [...(currentLeave?.history || [])];
  if (currentLeave?.startDate && currentLeave.returnDate) {
    leaveHistory.push({
      startDate: currentLeave.startDate, endDate: currentLeave.endDate || '', returnDate: currentLeave.returnDate,
      reasonCategory: currentLeave.reasonCategory || '', reason: currentLeave.reason || '',
      requestId: currentLeave.requestId || '',
      enteredBy: currentLeave.enteredBy || currentLeave.approvedBy || '',
      enteredAt: currentLeave.enteredAt || currentLeave.approvedAt || '',
      returnedBy: currentLeave.returnedBy || '', returnedAt: currentLeave.returnedAt || '',
    });
  }
  employeeLeaveRecords[employee.id] = {
    startDate, endDate, returnDate: '', statusBeforeLeave, reasonCategory, reason: reason.trim(),
    directEntry: true,
    history: leaveHistory,
    enteredBy: window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.account || 'مالك النظام',
    enteredAt: new Date().toISOString(),
  };
  const request = { id: `LEAVE-DIRECT-${Date.now()}`, employeeId: employee.id, requesterType: 'system-admin', requesterName: window.NAGM_SESSION?.displayName || 'مدير النظام', requestedBy: sessionIdentifier(), startDate, endDate, leaveType: reasonCategory, reasonCategory, ownerReason: reason.trim(), approvalStages: [], stageIndex: 0, approvalHistory: [{ stage: 'اعتماد مباشر من الموارد البشرية', account: sessionIdentifier(), name: window.NAGM_SESSION?.displayName || sessionIdentifier(), action: 'approved', note: reason.trim(), signatureFileId: leaveSignatureForAccount(sessionIdentifier()), direct: true, at: new Date().toISOString() }], status: 'approved', approvedAt: new Date().toISOString(), fullyApprovedAt: new Date().toISOString(), approvedBy: window.NAGM_SESSION?.displayName || sessionIdentifier() };
  employeeLeaveRequests.unshift(request); employeeLeaveRecords[employee.id].requestId = request.id;
  employee.leaveStartDate = startDate;
  if (startDate <= saudiTodayISO()) employee.status = 'leave';
  saveEmployeeLeaveRecords(); saveEmployeeLeaveRequests(); leaveAudit('leave-approved-directly', request.id, { employeeId: employee.id, startDate, endDate, reasonCategory, reason: reason.trim() });
  renderEmployeeList(); renderEmployeeLeaveManagement(); renderDashboardSummary();
  if (selectedEmployee?.id === employee.id) renderEmployeeProfile(employee, 'leave');
  return startDate <= saudiTodayISO() ? `تم تسجيل إجازة ${employee.name} مباشرة دون اعتمادات.` : `تم اعتماد إجازة ${employee.name} المجدولة لتبدأ في ${startDate} دون اعتمادات.`;
}

function renderDirectLeaveForm(employee = null) {
  if (!isSystemAdmin()) return '';
  const canReceiveDirectLeave = (record) => !record.archived && !record.systemHidden && record.sponsor === 'الشركة' && !['stopped', 'leave'].includes(record.status) && !(employeeLeaveRecords[record.id]?.startDate && !employeeLeaveRecords[record.id]?.returnDate);
  const options = employeeRecords.filter(canReceiveDirectLeave);
  if (employee && !canReceiveDirectLeave(employee)) return '<section class="profile-panel direct-leave-panel"><h3>تسجيل إجازة مباشرة</h3><p class="profile-note">لا يمكن تسجيل إجازة جديدة لهذا الموظف قبل تسجيل عودته أو معالجة حالته الحالية.</p></section>';
  const employeeField = employee
    ? `<input type="hidden" name="employeeId" value="${escapeHtml(employee.id)}"><div class="profile-stat"><span>الموظف</span><strong>${escapeHtml(employee.name)} · ${escapeHtml(employee.id)}</strong></div>`
    : `<label>الموظف<select name="employeeId" required><option value="">اختر الموظف</option>${options.map((record) => `<option value="${escapeHtml(record.id)}">${escapeHtml(record.name)} · ${escapeHtml(record.id)}</option>`).join('')}</select></label>`;
  return `<section class="profile-panel direct-leave-panel"><div class="panel-title"><div><h3>تسجيل إجازة مباشرة</h3><p>تعتمد فورًا دون سلسلة موافقات، وتحفظ كسجل مستقل</p></div><span class="private-data-tag">خاص بمالك النظام / مدير النظام</span></div><form class="leave-form" data-direct-leave-form data-employee-id="${employee ? escapeHtml(employee.id) : ''}">${employeeField}<label>من تاريخ<input type="date" name="startDate" value="${saudiTodayISO()}" required></label><label>إلى تاريخ<input type="date" name="endDate" value="${saudiTodayISO()}" required></label><label>نوع الإجازة<select name="reasonCategory" required><option value="">اختر نوع الإجازة</option><option>إجازة سنوية</option><option>إجازة اعتيادية</option><option>إجازة مرضية</option><option>إجازة بدون راتب</option><option>أخرى</option></select></label><label>السبب<textarea name="reason" maxlength="300" placeholder="تفاصيل خاصة بمالك النظام / مدير النظام" required></textarea></label><button class="primary-button" type="submit">اعتماد الإجازة مباشرة</button></form></section>`;
}

function leaveApprovalTargetOptions(employee) {
  const roleTargets = ['engineer', 'direct-manager', 'engineering-manager', 'custody-finance', 'finance-manager', 'project-manager', 'operations-manager'];
  const roles = roleTargets.map((role) => `<option value="role:${role}">${escapeHtml(approverRoleLabels[role])}</option>`).join('');
  const accounts = registeredAccounts.map((account) => `<option value="account:${escapeHtml(accountIdentifier(account))}">${escapeHtml(account.displayName || account.fullName || account.name || account.email || accountIdentifier(account))}</option>`).join('');
  const manager = employee?.directManagerId && employeeRecords.find((item) => item.id === employee.directManagerId);
  const managerAccount = manager && registeredAccounts.find((account) => account.employeeId === manager.id);
  const managerOption = managerAccount ? `<option value="account:${escapeHtml(accountIdentifier(managerAccount))}">المدير المباشر · ${escapeHtml(manager.name)}</option>` : '';
  const siteEngineerId = employee && rentalSiteEngineerAssignments[employee.site];
  const engineerAccount = siteEngineerId && registeredAccounts.find((account) => accountIdentifier(account) === siteEngineerId);
  const engineerOption = engineerAccount ? `<option value="account:${escapeHtml(accountIdentifier(engineerAccount))}">مهندس الموقع · ${escapeHtml(engineerAccount.displayName || engineerAccount.name || siteEngineerId)}</option>` : '';
  return `<option value="">اختر المسؤول</option><optgroup label="المسؤولون حسب الصلاحية">${roles}</optgroup><optgroup label="المسؤولون بالاسم">${managerOption}${engineerOption}${accounts}</optgroup>`;
}

function leaveApprovalStageRow(employee, target = '', parallel = false) {
  return `<div class="leave-chain-row" data-leave-chain-row><span class="approval-stage-number" data-leave-chain-number></span><label>المسؤول<select data-leave-chain-target required>${leaveApprovalTargetOptions(employee).replace(`value="${escapeHtml(target)}"`, `value="${escapeHtml(target)}" selected`)}</select></label><label class="leave-parallel-choice"><input type="checkbox" data-leave-parallel ${parallel ? 'checked' : ''}> بالتوازي مع المرحلة السابقة</label><button class="danger-button" type="button" data-remove-leave-stage>حذف المرحلة</button></div>`;
}

function updateLeaveChainNumbers(host) {
  host?.querySelectorAll('[data-leave-chain-number]').forEach((node, index) => { node.textContent = arabicNumber.format(index + 1); });
}

function leaveIntakeFormMarkup(request, employee) {
  const chainRows = '';
  return `<form class="leave-intake-form" data-leave-intake-form="${escapeHtml(request.id)}"><div class="leave-intake-summary"><div><small>الموظف</small><strong>${escapeHtml(employee.name)} · ${escapeHtml(employee.id)}</strong></div><div><small>الموقع</small><strong>${escapeHtml(employee.site)}</strong></div><div><small>مقدم الطلب</small><strong>${escapeHtml(request.requesterName || 'غير مسجل')}</strong></div><div><small>تاريخ الطلب</small><strong>${escapeHtml(request.createdAt?.slice(0, 10) || '—')}</strong></div></div><div class="leave-intake-fields"><label>نوع الإجازة<select name="leaveType" required><option value="">اختر نوع الإجازة</option><option ${request.leaveType === 'إجازة سنوية' ? 'selected' : ''}>إجازة سنوية</option><option ${request.leaveType === 'إجازة اعتيادية' ? 'selected' : ''}>إجازة اعتيادية</option><option ${request.leaveType === 'إجازة مرضية' ? 'selected' : ''}>إجازة مرضية</option><option ${request.leaveType === 'إجازة بدون راتب' ? 'selected' : ''}>إجازة بدون راتب</option><option ${request.leaveType === 'أخرى' ? 'selected' : ''}>أخرى</option></select></label><label>من تاريخ<input type="date" name="startDate" value="${escapeHtml(request.startDate || '')}" required></label><label>إلى تاريخ<input type="date" name="endDate" value="${escapeHtml(request.endDate || '')}" required></label><label>ملاحظات الموارد البشرية<input name="hrNote" maxlength="500" value="${escapeHtml(request.hrNote || '')}" placeholder="ملاحظة خاصة للمراجعة"></label></div><div class="panel-title"><div><h4>سلسلة الاعتماد وإخلاء الطرف</h4><p>أضف المسؤولين ورتبهم لكل طلب. يمكنك إرسال مرحلة بالتوازي أو اعتماد الإجازة مباشرة.</p></div><button class="secondary-button" type="button" data-add-leave-stage>إضافة مرحلة</button></div><div class="leave-chain-rows" data-leave-chain-rows>${chainRows}</div><template data-leave-chain-template>${leaveApprovalStageRow(employee)}</template><label class="leave-direct-approval-choice"><input type="checkbox" name="directApproval"> اعتماد الإجازة مباشرةً دون موافقات أو إخلاء طرف</label><label class="leave-owner-note">سبب التوجيه / الإعفاء<textarea name="directApprovalReason" rows="2" maxlength="500" placeholder="مطلوب عند الاعتماد المباشر"></textarea></label><button class="primary-button" type="submit">حفظ التوجيه وإرسال الاعتمادات</button></form>`;
}

function saveApprovedLeaveRequest(request, employee, reasonCategory, reason, direct = false) {
  const approvedAt = new Date().toISOString();
  const priorStatus = employee.status;
  const priorLeave = employeeLeaveRecords[employee.id];
  const leaveHistory = [...(priorLeave?.history || [])];
  if (priorLeave?.startDate && priorLeave.returnDate) leaveHistory.push({ startDate: priorLeave.startDate, endDate: priorLeave.endDate || '', returnDate: priorLeave.returnDate, reasonCategory: priorLeave.reasonCategory || '', reason: priorLeave.reason || '', requestId: priorLeave.requestId || '', enteredBy: priorLeave.enteredBy || priorLeave.approvedBy || '', enteredAt: priorLeave.enteredAt || priorLeave.approvedAt || '', returnedBy: priorLeave.returnedBy || '', returnedAt: priorLeave.returnedAt || '' });
  employeeLeaveRecords[employee.id] = { startDate: request.startDate, endDate: request.endDate || '', returnDate: '', statusBeforeLeave: priorStatus, reasonCategory, reason, history: leaveHistory, requestId: request.id, approvedBy: window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.account || 'مدير النظام', approvedAt };
  employee.leaveStartDate = request.startDate;
  request.status = 'approved'; request.reasonCategory = reasonCategory; request.ownerReason = reason; request.approvedAt = approvedAt; request.fullyApprovedAt = approvedAt; request.approvedBy = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.account || 'مدير النظام';
  request.approvalHistory ||= [];
  request.approvalHistory.push({ stage: 'الاعتماد النهائي للموارد البشرية', account: sessionIdentifier(), name: request.approvedBy, action: 'approved', note: reason, signatureFileId: leaveSignatureForAccount(sessionIdentifier()), direct, at: approvedAt });
  if (request.startDate <= saudiTodayISO()) employee.status = 'leave';
  leaveAudit(direct ? 'leave-approved-directly' : 'leave-fully-approved', request.id, { employeeId: employee.id, reasonCategory, reason, startDate: request.startDate, endDate: request.endDate || '' });
  saveEmployeeLeaveRecords(); saveEmployeeLeaveRequests(); renderEmployeeList(); renderEmployeeLeaveManagement(); renderDashboardSummary(); renderMyApprovals(); renderMyRequests();
}

function leaveSignaturesManagerMarkup() {
  const canSelfSign = Boolean(registeredAccounts.find((item) => accountIdentifier(item) === sessionIdentifier()));
  if (!isSystemAdmin() && !canSelfSign) return '';
  const accountOptions = registeredAccounts.map((account) => `<option value="${escapeHtml(accountIdentifier(account))}">${escapeHtml(account.displayName || account.fullName || account.name || account.email || accountIdentifier(account))} · ${escapeHtml(account.role || 'مسؤول')}</option>`).join('');
  const current = Object.entries(leaveApproverSignatures).map(([accountId, fileId]) => {
    const account = registeredAccounts.find((item) => accountIdentifier(item) === accountId);
    return `<div class="leave-signature-current"><span>${escapeHtml(account?.displayName || account?.name || accountId)}</span><small>توقيع محفوظ · ${escapeHtml(fileId)}</small></div>`;
  }).join('');
  const accountField = isSystemAdmin() ? `<label>المسؤول<select name="accountId" required><option value="">اختر المسؤول</option>${accountOptions}</select></label>` : `<input type="hidden" name="accountId" value="${escapeHtml(sessionIdentifier())}"><p class="profile-note">ارفع توقيعك لحسابك الحالي. يظهر التوقيع في الاعتمادات الجديدة فقط.</p>`;
  return `<section class="profile-panel leave-signature-manager"><div class="panel-title"><div><h3>${isSystemAdmin() ? 'توقيعات مسؤولي الاعتماد' : 'توقيعي الإلكتروني'}</h3><p>كل رفع ينشئ نسخة جديدة؛ التوقيع المستخدم سابقًا يبقى مرتبطًا بنموذجه.</p></div>${isSystemAdmin() ? '<span class="private-data-tag">إدارة النظام</span>' : ''}</div><form class="leave-signature-form" data-leave-signature-form>${accountField}<label>صورة التوقيع<input type="file" name="signature" accept="image/png,image/jpeg,image/webp" required></label><button class="primary-button" type="submit">حفظ نسخة توقيع جديدة</button></form>${isSystemAdmin() ? `<div class="leave-signature-list">${current || '<p class="profile-note">لم تُرفع توقيعات بعد. يمكن إكمال الموافقات دون توقيع صورة.</p>'}</div>` : ''}</section>`;
}

async function printLeaveDocument(requestId) {
  const request = employeeLeaveRequests.find((item) => item.id === requestId && item.status === 'approved');
  const employee = request && employeeRecords.find((item) => item.id === request.employeeId);
  if (!request || !employee) throw new Error('نموذج الإجازة غير متاح أو لم يكتمل اعتماده.');
  const printWindow = window.open('', '_blank');
  if (!printWindow) throw new Error('اسمح بفتح نافذة جديدة لطباعة نموذج الإجازة.');
  const signatureFiles = (await getAllEmployeeFiles()).filter((record) => ['leave-signature', 'employee-leave-signature'].includes(record.kind));
  const settlement = employeeLeaveSettlements.find((item) => item.leaveRequestId === request.id);
  const rows = [
    ['الموظف', employee.name], ['كود الموظف', employee.id], ['المسمى الوظيفي', employee.job], ['القسم', employee.department], ['الموقع', request.site || employee.site], ['نوع الإجازة', request.leaveType || request.reasonCategory || '—'], ['من تاريخ', request.startDate], ['إلى تاريخ', request.endDate || '—'], ['مقدم الطلب', request.requesterName || '—'], ['تاريخ تقديم الطلب', request.createdAt ? new Date(request.createdAt).toLocaleString('ar-SA') : '—'], ['تاريخ اكتمال الاعتماد', request.fullyApprovedAt ? new Date(request.fullyApprovedAt).toLocaleString('ar-SA') : '—'], ['ملاحظات الموارد البشرية', request.ownerReason || request.hrNote || '—'],
  ];
  if (settlement) rows.push(['رقم التصفية', settlement.number], ['حالة التصفية', settlement.statusLabel || settlement.status], ['إجمالي المستحقات', `${arabicNumber.format(Number(settlement.credits) || 0)} ر.س`], ['إجمالي الخصومات', `${arabicNumber.format(Number(settlement.deductions) || 0)} ر.س`], ['صافي التصفية', `${arabicNumber.format(Number(settlement.netAmount) || 0)} ر.س`], ['تاريخ الصرف', settlement.paidAt || 'لم يتم الصرف'], ['طريقة الصرف / المرجع', [settlement.method, settlement.reference].filter(Boolean).join(' · ') || '—']);
  if (request.proceduresCompletedAt) rows.push(['تاريخ اكتمال الإجراءات', new Date(request.proceduresCompletedAt).toLocaleString('ar-SA')], ['أغلق الإجراءات', request.proceduresCompletedBy || '—'], ['استثناءات الإغلاق', request.proceduresException || 'لا يوجد']);
  const signatures = (request.approvalHistory || []).filter((item) => item.action === 'approved').map((item) => {
    const signature = signatureFiles.find((record) => record.id === item.signatureFileId);
    const imageUrl = signature ? URL.createObjectURL(signature.blob) : '';
    return `<div class="signature"><strong>${escapeHtml(item.stage)}</strong><span>${escapeHtml(item.name || item.account || '')}</span><small>${escapeHtml(item.at ? new Date(item.at).toLocaleString('ar-SA') : '')}</small>${imageUrl ? `<img src="${imageUrl}" alt="توقيع ${escapeHtml(item.name || '')}">` : '<small>لا توجد صورة توقيع محفوظة</small>'}</div>`;
  }).join('');
  const companyLogoUrl = new URL('./assets/najm-logo-reference.jpg', window.location.href).href;
  printWindow.document.write(`<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>إجازة وإخلاء طرف · ${escapeHtml(employee.name)}</title><style>body{font:14px Arial,sans-serif;max-width:900px;margin:28px auto;padding:24px;color:#162430}header{text-align:center;border-bottom:2px solid #2189a9;padding-bottom:15px}header img{width:100px;max-height:72px;object-fit:contain}h1{font-size:22px}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #b8c5ce;padding:9px;text-align:right}th{width:30%;background:#f1f5f7}.signatures{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:50px}.signature{border-top:1px solid #35434d;padding-top:8px;display:grid;gap:6px;min-height:95px}.signature img{max-width:120px;max-height:55px;object-fit:contain}.print-action{text-align:center;margin:18px}@media print{.print-action{display:none}body{margin:0}}</style><header><img src="${escapeHtml(companyLogoUrl)}" alt="شعار الشركة"><h1>نموذج إجازة وإخلاء طرف</h1><strong>نجم الغدراء للمقاولات</strong></header><div class="print-action"><button onclick="window.print()">طباعة / حفظ PDF</button></div><table>${rows.map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join('')}</table><h2>الاعتمادات والتوقيعات</h2><div class="signatures">${signatures || '<p>لا توجد توقيعات محفوظة.</p>'}</div></html>`);
  printWindow.document.close();
}

function handleLeaveIntake(form) {
  if (!leaveFinanceManager()) { notify('توجيه طلب الإجازة متاح للموارد البشرية أو مدير النظام.'); return; }
  const request = employeeLeaveRequests.find((item) => item.id === form.dataset.leaveIntakeForm && item.status === 'pending-hr-review');
  const employee = request && employeeRecords.find((item) => item.id === request.employeeId && !item.archived && !item.systemHidden);
  const data = new FormData(form);
  const startDate = String(data.get('startDate') || '');
  const endDate = String(data.get('endDate') || '');
  const leaveType = String(data.get('leaveType') || '');
  const direct = data.get('directApproval') === 'on';
  const rows = [...form.querySelectorAll('[data-leave-chain-row]')];
  const targets = rows.map((row) => {
    const [kind, value] = String(row.querySelector('[data-leave-chain-target]')?.value || '').split(':');
    if (!value) return null;
    if (kind === 'account') { const account = registeredAccounts.find((item) => accountIdentifier(item) === value); return { mode: 'account', value, label: account?.displayName || account?.fullName || account?.name || account?.email || value }; }
    return { mode: 'role', value, label: approverRoleLabels[value] || value };
  });
  if (!employee || !startDate || !endDate || endDate < startDate || !leaveType) { notify('راجع الموظف ونوع الإجازة وفترة من وإلى.'); return; }
  const selectedTargets = targets.filter(Boolean);
  if (direct && !String(data.get('directApprovalReason') || '').trim()) { notify('اكتب سبب اعتماد الإجازة المباشر دون سلسلة.'); return; }
  if (!direct && !selectedTargets.length) { notify('اختر مسؤولًا واحدًا على الأقل أو فعّل الاعتماد المباشر مع كتابة سببه.'); return; }
  const stages = [];
  for (let index = 0; index < selectedTargets.length; index += 1) {
    const target = selectedTargets[index];
    const parallel = form.querySelectorAll('[data-leave-chain-row]')[index]?.querySelector('[data-leave-parallel]')?.checked;
    if (parallel && stages.length) {
      const previous = stages[stages.length - 1];
      previous.parallelApprovers ||= [{ mode: previous.mode, value: previous.value, label: previous.label }];
      previous.parallelApprovers.push(target);
    } else stages.push(target);
  }
  request.startDate = startDate; request.endDate = endDate; request.leaveType = leaveType; request.reasonCategory = leaveType; request.hrNote = String(data.get('hrNote') || '').trim();
  request.hrReviewedAt = new Date().toISOString(); request.hrReviewedBy = window.NAGM_SESSION?.displayName || sessionIdentifier();
  request.approvalHistory ||= [];
  request.approvalHistory.push({ stage: 'مراجعة الموارد البشرية', account: sessionIdentifier(), name: request.hrReviewedBy, action: direct ? 'direct-approval-selected' : 'routed', note: direct ? String(data.get('directApprovalReason') || '').trim() : request.hrNote, signatureFileId: leaveSignatureForAccount(sessionIdentifier()), at: request.hrReviewedAt });
  if (direct) {
    request.approvalStages = []; request.stageIndex = 0;
    saveApprovedLeaveRequest(request, employee, leaveType, String(data.get('directApprovalReason') || '').trim(), true);
    notify(`تم اعتماد إجازة ${employee.name} مباشرةً وحفظ تاريخها.`);
    return;
  }
  request.approvalStages = stages; request.stageIndex = 0; request.parallelApprovals = {}; request.status = 'pending-approval';
  leaveAudit('leave-routed', request.id, { stages: stages.map(approverStageLabel), startDate, endDate, leaveType });
  saveEmployeeLeaveRequests(); renderEmployeeLeaveManagement(); renderMyApprovals(); renderMyRequests();
  notify(`تم توجيه طلب إجازة ${employee.name} إلى ${approverStageLabel(stages[0])}.`);
}

function leaveFinanceManager() { return isSystemAdmin() || sessionRoleValues().has('hr') || ['موارد بشرية', 'مسؤول الموارد البشرية'].includes(String(window.NAGM_SESSION?.role || '').trim()); }
const leaveFinancialTypes = { overtime: 'عمل إضافي', bonus: 'مكافأة', addition: 'إضافة مالية', advance: 'سلفة', deduction: 'خصم', custody: 'عهدة مالية', other: 'مستحق / التزام آخر' };
function leaveFinancialItemState(item) {
  const approval = { pending: 'بانتظار الاعتماد', approved: 'معتمد', rejected: 'مرفوض' }[item.approvalStatus] || item.approvalStatus || 'بانتظار الاعتماد';
  const payment = item.paymentStatus === 'paid-with-settlement' ? `صُرف مع التصفية ${item.settlementNumber || ''}` : item.paymentStatus === 'paid' ? `صُرف ${item.paidAt || ''} · مرجع ${item.paymentReference || ''}` : item.reservedSettlementId ? 'محجوز في تصفية' : 'غير مصروف';
  return `${approval} · ${payment}`;
}
function financialPaymentFilterValue(item) {
  if (item.paymentStatus === 'paid-with-settlement' || item.paymentStatus === 'paid') return item.paymentStatus;
  if (item.reservedSettlementId) return 'reserved';
  return item.paymentStatus || 'unpaid';
}
function overtimeRoleAllowed() { const roles = sessionRoleValues(); return roles.has('engineer') || roles.has('employee'); }
function overtimeDirectory() {
  const company = employeeRecords.filter((item) => item.sponsor === 'الشركة' && !item.archived && !item.systemHidden).map((item) => ({ id: item.id, employeeId: item.id, name: item.name, code: item.id, identity: item.identityNumber || item.nationalId || '', job: item.job || '', site: item.site || '', paymentMethod: item.paymentMethod || '—', workerType: 'company', active: item.status === 'active' }));
  const rental = (typeof rentalRecords === 'undefined' ? [] : rentalRecords).filter((item) => !item.archived && !item.systemHidden).map((item) => ({ id: `rental:${item.id}`, employeeId: `rental:${item.id}`, workerId: item.id, name: item.name, code: rentalWorkerCode(item), identity: item.residency || '', job: item.job || '', site: rentalWorkerCurrentSite(item) || '', paymentMethod: item.paymentMethod || '—', workerType: 'rental', active: item.status === 'active' }));
  return [...company, ...rental];
}
function overtimeEngineerSites() {
  const assigned = Object.entries(rentalSiteEngineerAssignments).filter(([,accountId]) => accountId === sessionIdentifier()).map(([site]) => site);
  const account = rentalEngineerAccounts().find((item) => accountIdentifier(item) === sessionIdentifier());
  return [...new Set([...(account?.responsibleSite ? [account.responsibleSite] : []), ...assigned])];
}
function overtimeSubmissionSites() {
  const account=registeredAccounts.find((item)=>accountIdentifier(item)===sessionIdentifier());
  const mapped=Object.entries(rentalSiteEngineerAssignments).filter(([,accountId])=>accountId===sessionIdentifier()).map(([site])=>site);
  const extra=Array.isArray(account?.assignedSites)?account.assignedSites:[];
  return [...new Set([account?.responsibleSite,account?.site,...extra,...mapped].filter(Boolean))];
}
function overtimeCanSubmit() { if (isSystemAdmin()) return false; const roles=sessionRoleValues(); return (roles.has('engineer') || roles.has('monitor')) && overtimeSubmissionSites().length > 0; }
function renderOvertimeControlCenter() {
  const host=document.querySelector('[data-employee-extras-content]'); if(!host)return false;
  const canManage=isSystemAdmin(); const isSubmitter=!canManage&&overtimeCanSubmit(); if(!canManage&&!isSubmitter)return false;
  const assignedSites=isSubmitter?overtimeSubmissionSites():[];
  const eligible=overtimeDirectory().filter((person)=>person.active && (person.site && assignedSites.includes(person.site) || person.workerType==='company' && (employeeAllowedSites[person.id]||[]).some((site)=>assignedSites.includes(site))));
  const assignedFor=(person)=>person.site&&assignedSites.includes(person.site)?person.site:(employeeAllowedSites[person.id]||[]).find((site)=>assignedSites.includes(site))||'';
  if(isSubmitter){
    host.innerHTML=`<div class="overtime-workspace"><section class="profile-panel"><div class="panel-title"><div><h3>تسجيل إضافي لموقعك</h3><p>اختر التاريخ والموقع والعاملين الذين عملوا إضافيًا. لا تظهر لك القيم المالية أو سجل الإضافيات.</p></div><span class="panel-chip">${escapeHtml(assignedSites.join('، '))}</span></div><form class="leave-form overtime-create-form" data-create-overtime-batch><label>نوع الإضافي<select name="overtimeKind"><option value="holiday">جمع / مناسبة</option><option value="monthly-hours">ساعات إضافية شهرية</option></select></label><label>التاريخ<input name="date" type="date" value="${saudiTodayISO()}" required></label><label>الموقع<select name="site" required>${assignedSites.map((site)=>`<option value="${escapeHtml(site)}">${escapeHtml(site)}</option>`).join('')}</select></label><label>عدد الساعات / الأيام<input name="quantity" type="number" min="0.25" step="0.25" placeholder="اختياري"></label><label>البيان<input name="description" maxlength="240" required placeholder="مثال: إضافي جمعة الموقع"></label><div class="overtime-employee-picker">الموظفون<input type="search" data-overtime-employee-search placeholder="ابحث بالاسم أو الكود"><button type="button" class="secondary-button" data-overtime-select-visible>تحديد النتائج الظاهرة</button><select name="employeeIds" multiple hidden>${eligible.map((person)=>`<option value="${escapeHtml(person.employeeId)}" data-site="${escapeHtml(assignedFor(person))}">${escapeHtml(person.name)} · ${escapeHtml(person.code||'—')} · ${escapeHtml(person.workerType==='rental'?'إيجارات':'الشركة')}</option>`).join('')}</select></div><label class="overtime-note-wide">ملاحظات<textarea name="note" rows="2" maxlength="500"></textarea></label><button class="primary-button" type="submit">إرسال لمدير النظام</button></form><p class="profile-note">بعد مراجعة الطلب، يحدد مدير النظام سلسلة الاعتماد. جميع الموافقات تظهر في «موافقاتي».</p></section></div>`;
    setupOvertimeEmployeePicker(host); return true;
  }
  const items=employeeFinancialItems.filter((item)=>item.overtimeBatchId&&!item.archived);
  const byBatch=new Map(); for(const item of items){const list=byBatch.get(item.overtimeBatchId)||[];list.push(item);byBatch.set(item.overtimeBatchId,list);}
  const grouped=[...byBatch.entries()].map(([id,rows])=>({id,rows,first:rows[0]})).sort((a,b)=>String(b.first.date).localeCompare(String(a.first.date)));
  const chainAccounts=registeredAccounts.filter((account)=>!account.disabled&&!account.archived);
  const options=(role)=>chainAccounts.filter((account)=>{const text=`${account.role||''} ${account.roleName||''} ${account.permissions||''}`.toLocaleLowerCase('ar');return role==='engineer'?text.includes('مهندس')||text.includes('engineer'):text.includes('مشروع')||text.includes('project-manager')||text.includes('projects-manager');}).map((account)=>`<option value="${escapeHtml(accountIdentifier(account))}">${escapeHtml(account.displayName||account.fullName||account.name||accountIdentifier(account))}</option>`).join('');
  const ownerDirectory=overtimeDirectory().filter((person)=>person.active);
  const ownerSites=[...new Set([...employeeSiteNames,...ownerDirectory.map((person)=>person.site)].filter(Boolean))];
  const ownerEntry=`<details class="owner-overtime-entry"><summary class="secondary-button">＋ إضافة إضافي</summary><form class="leave-form overtime-create-form" data-create-overtime-batch><label>نوع الإضافي<select name="overtimeKind"><option value="holiday">جمع / مناسبة</option><option value="monthly-hours">ساعات إضافية شهرية</option></select></label><label>التاريخ<input name="date" type="date" value="${saudiTodayISO()}" required></label><label>الموقع<select name="site" required><option value="">اختر الموقع</option>${ownerSites.map((site)=>`<option value="${escapeHtml(site)}">${escapeHtml(site)}</option>`).join('')}</select></label><label>عدد الساعات / الأيام<input name="quantity" type="number" min="0.25" step="0.25" placeholder="اختياري"></label><label>القيمة الافتراضية (ريال)<input name="amount" type="number" min="0" step="0.01" value="0"></label><label>البيان<input name="description" maxlength="240" required placeholder="مثال: إضافي جمعة الموقع"></label><div class="overtime-employee-picker">الموظفون<input type="search" data-overtime-employee-search placeholder="ابحث بالاسم أو الكود"><button type="button" class="secondary-button" data-overtime-select-visible>تحديد النتائج الظاهرة</button><select name="employeeIds" multiple hidden>${ownerDirectory.map((person)=>`<option value="${escapeHtml(person.employeeId)}" data-site="${escapeHtml(person.site)}">${escapeHtml(person.name)} · ${escapeHtml(person.code||'—')} · ${escapeHtml(person.workerType==='rental'?'إيجارات':'الشركة')}</option>`).join('')}</select></div><label>مهندس الاعتماد<select name="engineerId" required><option value="">اختر المهندس</option>${options('engineer')}</select></label><label>مدير المشاريع<select name="projectManagerId" required><option value="">اختر مدير المشاريع</option>${options('project-manager')}</select></label><label class="overtime-note-wide">ملاحظات<textarea name="note" rows="2" maxlength="500"></textarea></label><button class="primary-button" type="submit">تسجيل وإرسال للاعتماد</button></form></details>`;
  const layoutPreview=`<details class="overtime-layout-preview" data-overtime-layout-preview><summary class="secondary-button">معاينة العرض</summary><div class="overtime-preview-popover"><section><h4>واجهة المهندس / مسؤول الموقع</h4><p>تسجيل إضافي لموقعه فقط — دون مبالغ أو سجل مالي.</p><div class="overtime-preview-engineer"><b>جمع / مناسبة · ١٤٤٨/٠٥/١٢ · موقع العيون</b><span>ابحث عن الموظف وحدد العاملين:</span><span class="overtime-preview-person">□ أحمد محمد · ١٠٢٤ · الشركة</span><span class="overtime-preview-person">☑ سالم علي · إيجارات</span><span class="overtime-preview-person">☑ فهد ناصر · ٤١٠٨ · الشركة</span><button type="button" class="primary-button" disabled>إرسال لمدير النظام</button></div></section><section><h4>شكل المجموعات عندك</h4><p>كل جمعة أو مناسبة مجموعة مستقلة، ومجموعات الساعات في قسم منفصل.</p><div class="overtime-preview-group"><b>الجمع والمناسبات</b><div class="overtime-batch-grid"><article class="overtime-batch-tile"><strong>جمعة موقع العيون</strong><span>١٤٤٨/٠٥/١٢ · موقع العيون</span><small>١٨ موظف · معتمد</small></article><article class="overtime-batch-tile"><strong>جمعة مشروع الرياض</strong><span>١٤٤٨/٠٥/١٩ · الرياض</span><small>١٢ موظف · بانتظار الاعتماد</small></article></div></div><div class="overtime-preview-group"><b>ساعات الشهور الإضافية</b><div class="overtime-batch-grid"><article class="overtime-batch-tile"><strong>ساعات نوفمبر</strong><span>نوفمبر ٢٠٢٦ · موقع العيون</span><small>٩ موظفين · معتمد</small></article><article class="overtime-batch-tile"><strong>ساعات ديسمبر</strong><span>ديسمبر ٢٠٢٦ · مشروع الرياض</span><small>٦ موظفين · بانتظار الاعتماد</small></article></div></div></section><small class="profile-note">هذه أمثلة توضيحية للشكل فقط، وليست سجلات فعلية.</small></div></details>`;
  const routing=grouped.filter(({first})=>first.overtimeNeedsRouting).map(({id,rows,first})=>`<section class="profile-panel overtime-routing-panel"><div class="panel-title"><div><h3>طلبات واردة تحتاج توجيهًا</h3><p>${escapeHtml(first.description)} · ${escapeHtml(first.site)} · ${escapeHtml(first.date)} · ${arabicNumber.format(rows.length)} موظف</p></div><span class="request-status-pill">بانتظارك</span></div><form class="overtime-route-form" data-overtime-route-batch="${escapeHtml(id)}"><label>المهندس<select name="engineerId" required><option value="">اختر المهندس</option>${options('engineer')}</select></label><label>مدير المشاريع<select name="projectManagerId" required><option value="">اختر مدير المشاريع</option>${options('project-manager')}</select></label><button class="primary-button" type="submit">إرسال لسلسلة الاعتماد</button></form></section>`).join('');
  const categories=[['holiday','الجمع والمناسبات'],['monthly-hours','ساعات الشهور الإضافية']].map(([kind,label])=>{const batches=grouped.filter(({first})=>(first.overtimeKind||'holiday')===kind);return `<section class="profile-panel overtime-type-panel"><div class="panel-title"><div><h3>${label}</h3><p>${arabicNumber.format(batches.filter(({rows})=>rows.every((row)=>row.approvalStatus==='approved')).length)} معتمد · ${arabicNumber.format(batches.filter(({rows})=>rows.some((row)=>row.approvalStatus==='pending')).length)} بانتظار الاعتماد</p></div><span class="panel-chip">${arabicNumber.format(batches.length)} مجموعة</span></div><div class="overtime-batch-grid">${batches.map(({id,rows,first})=>`<button type="button" class="overtime-batch-tile" data-overtime-tile data-overtime-batch-open="${escapeHtml(id)}" data-site="${escapeHtml(first.site||'')}" data-date="${escapeHtml(first.date||'')}" data-kind="${kind}" data-has-pending="${rows.some((row)=>row.approvalStatus==='pending')}" data-has-approved="${rows.some((row)=>row.approvalStatus==='approved')}"><strong>${escapeHtml(first.description||label)}</strong><span>${escapeHtml(first.date)} · ${escapeHtml(first.site||'—')}</span><small>${arabicNumber.format(rows.length)} موظف · ${rows.some((row)=>row.approvalStatus==='pending')?'بانتظار الاعتماد':rows.every((row)=>row.approvalStatus==='approved')?'معتمد':'مراجعة'}</small></button>`).join('')||'<p class="profile-empty-state">لا توجد مجموعات مسجلة.</p>'}</div></section>`;}).join('');
  const rows=grouped.flatMap(({id,rows})=>rows.map((item,index)=>{const p=employeeRecords.find((employee)=>employee.id===String(item.employeeId).replace(/^rental:/,''))||{};const name=item.employeeName||p.name||item.employeeId;const status=item.approvalStatus==='approved'?'معتمد':item.approvalStatus==='rejected'?'مرفوض':'بانتظار الاعتماد';return `<tr data-overtime-detail-row data-record-id="${escapeHtml(item.id)}" data-batch="${escapeHtml(id)}" data-kind="${escapeHtml(item.overtimeKind||'holiday')}" data-date="${escapeHtml(item.date||'')}" data-site="${escapeHtml(item.site||'')}" data-state="${escapeHtml(item.approvalStatus||'pending')}" data-payment="${escapeHtml(item.paymentStatus||'unpaid')}" data-search="${escapeHtml(`${name} ${item.employeeCode||''} ${item.identityNumber||''} ${item.site||''}`.toLocaleLowerCase('ar'))}"><td>${arabicNumber.format(index+1)}</td><td>${escapeHtml(name)}</td><td>${escapeHtml(item.employeeCode||'—')}</td><td>${escapeHtml(item.identityNumber||'—')}</td><td>${escapeHtml(item.jobTitle||'—')}</td><td>${escapeHtml(item.site||'—')}</td><td>${escapeHtml(item.paymentMethod||'—')}</td><td><input type="number" min="0" step="0.01" value="${escapeHtml(item.amount||0)}" data-overtime-amount="${escapeHtml(item.id)}"></td><td>${status}</td><td>${escapeHtml(item.paymentStatus||'unpaid')}</td><td><button class="secondary-button" type="button" data-overtime-save-amount="${escapeHtml(item.id)}">حفظ القيمة</button></td></tr>`;})).join('');
  host.innerHTML=`<div class="overtime-workspace"><section class="profile-panel"><div class="panel-title"><div><h3>الإضافيات الواردة من المواقع</h3><p>تسجل الأسماء من المهندسين ومسؤولي المواقع. الموارد البشرية لا تدخل الموظفين في الإضافيات.</p></div><div class="overtime-owner-actions">${ownerEntry}${layoutPreview}<button class="secondary-button" type="button" data-overtime-export>تصدير Excel (CSV)</button></div></div><div class="overtime-status-tabs"><button class="is-active" type="button" data-overtime-status-tab="">الكل</button><button type="button" data-overtime-status-tab="approved">تم التعميد</button><button type="button" data-overtime-status-tab="pending">في انتظار التعميد</button><button class="secondary-button" type="button" data-overtime-show-all hidden>عرض كل المجموعات</button></div><div class="leave-financial-filters overtime-filters"><label>الموقع<select data-overtime-site-filter><option value="">كل المواقع</option>${[...new Set(items.map((item)=>item.site).filter(Boolean))].map((site)=>`<option>${escapeHtml(site)}</option>`).join('')}</select></label><label>نوع الإضافي<select data-overtime-kind-filter><option value="">الكل</option><option value="holiday">الجمع والمناسبات</option><option value="monthly-hours">ساعات الشهور</option></select></label><label>بحث الموظف<input type="search" data-overtime-search placeholder="الاسم أو الكود"></label><label>من تاريخ<input type="date" data-overtime-from></label><label>إلى تاريخ<input type="date" data-overtime-to></label><label class="secondary-button overtime-import-label">استيراد Excel/CSV<input type="file" accept=".csv,text/csv" data-overtime-import hidden></label></div></section>${routing}${categories}<section class="profile-panel"><div class="employee-list rows overtime-table-wrap"><table class="employee-table"><thead><tr><th>م</th><th>اسم الموظف</th><th>الكود</th><th>الهوية</th><th>المهنة</th><th>الموقع</th><th>طريقة الصرف</th><th>قيمة اليوم</th><th>الاعتماد</th><th>الصرف</th><th>إجراء</th></tr></thead><tbody>${rows||'<tr><td colspan="11" class="log-empty">لا توجد إضافيات واردة.</td></tr>'}</tbody></table></div></section></div>`;
  setupOvertimeEmployeePicker(host);
  return true;
}
function refreshOvertimeEmployeePicker(form) {
  const select=form?.querySelector('[name="employeeIds"]'); const list=form?.querySelector('[data-overtime-selected-list]'); const count=form?.querySelector('[data-overtime-selection-count]'); if(!select||!list)return;
  list.replaceChildren(); const chosen=[...select.options].filter((option)=>option.selected);
  chosen.forEach((option)=>{ const chip=document.createElement('button'); chip.type='button'; chip.className='overtime-selected-chip'; chip.dataset.overtimeRemoveSelected=option.value; chip.textContent=`${option.textContent} ×`; list.append(chip); });
  form.querySelectorAll('[data-overtime-employee-toggle]').forEach((button)=>{ const option=[...select.options].find((item)=>item.value===button.dataset.overtimeEmployeeToggle); button.classList.toggle('is-selected',Boolean(option?.selected)); const mark=button.querySelector('b'); if(mark)mark.textContent=option?.selected?'✓':'+'; });
  if(count)count.textContent=chosen.length?`تم اختيار ${arabicNumber.format(chosen.length)} موظف`:'لم يتم اختيار موظفين';
}
function setupOvertimeEmployeePicker(host) {
  const form=host.querySelector('[data-create-overtime-batch]'); const select=form?.querySelector('[name="employeeIds"]'); const search=form?.querySelector('[data-overtime-employee-search]'); if(!form||!select||form.dataset.pickerReady)return;
  form.dataset.pickerReady='true'; select.required=false; select.hidden=true;
  const results=document.createElement('div'); results.className='overtime-employee-results'; results.dataset.overtimeEmployeeResults='';
  const selected=document.createElement('div'); selected.className='overtime-selected-list'; selected.dataset.overtimeSelectedList='';
  const count=document.createElement('span'); count.className='overtime-selection-count'; count.dataset.overtimeSelectionCount='';
  select.after(results,selected,count);
  [...select.options].forEach((option)=>{ const button=document.createElement('button'); button.type='button'; button.className='overtime-employee-option'; button.dataset.overtimeEmployeeToggle=option.value; button.dataset.search=option.textContent.toLocaleLowerCase('ar'); button.dataset.site=option.dataset.site||''; button.disabled=option.disabled; const text=document.createElement('span'); text.textContent=option.textContent; const mark=document.createElement('b'); mark.textContent='+'; button.append(text,mark); results.append(button); });
  const filter=()=>{const query=search?.value.trim().toLocaleLowerCase('ar')||'';const site=form.querySelector('[name="site"]')?.value||'';results.querySelectorAll('[data-overtime-employee-toggle]').forEach((button)=>{button.hidden=!button.dataset.search.includes(query)||(site&&button.dataset.site!==site);});};
  search?.addEventListener('input',filter); form.querySelector('[name="site"]')?.addEventListener('change',()=>{[...select.options].forEach((option)=>{if(option.selected&&option.dataset.site!==form.querySelector('[name="site"]').value)option.selected=false;});refreshOvertimeEmployeePicker(form);filter();}); filter();
  refreshOvertimeEmployeePicker(form);
}
function applyOvertimeWorkspaceFilters() {
  const host = document.querySelector('[data-employee-extras-content]'); if (!host) return;
  const text = host.querySelector('[data-overtime-search]')?.value.trim().toLocaleLowerCase('ar') || ''; const kind = host.querySelector('[data-overtime-kind-filter]')?.value || ''; const state = host.querySelector('[data-overtime-status-tab].is-active')?.dataset.overtimeStatusTab || ''; const payment = host.querySelector('[data-overtime-payment-filter]')?.value || ''; const site = host.querySelector('[data-overtime-site-filter]')?.value || ''; const from = host.querySelector('[data-overtime-from]')?.value || ''; const to = host.querySelector('[data-overtime-to]')?.value || ''; const selectedBatch=host.dataset.overtimeSelectedBatch||'';
  host.querySelectorAll('[data-overtime-detail-row]').forEach((row) => { row.hidden = Boolean((selectedBatch && row.dataset.batch!==selectedBatch) || (text && !row.dataset.search.includes(text)) || (kind && row.dataset.kind !== kind) || (state && row.dataset.state !== state) || (payment && row.dataset.payment !== payment) || (site && row.dataset.site !== site) || (from && row.dataset.date < from) || (to && row.dataset.date > to)); });
  host.querySelectorAll('[data-overtime-tile]').forEach((tile)=>{const stateMismatch=state==='approved'&&tile.dataset.hasApproved!=='true'||state==='pending'&&tile.dataset.hasPending!=='true';tile.hidden=Boolean((kind&&tile.dataset.kind!==kind)||stateMismatch||(site&&tile.dataset.site!==site)||(from&&tile.dataset.date<from)||(to&&tile.dataset.date>to));});
  const showAll=host.querySelector('[data-overtime-show-all]');if(showAll)showAll.hidden=!selectedBatch;
}
function overtimeCsvCell(value) { return `"${String(value ?? '').replaceAll('"','""')}"`; }
function exportOvertimeCsv() {
  const columns = ['رقم المجموعة','معرف الموظف','اسم الموظف','الكود','الهوية','المهنة','نوع الموظف','الموقع','التاريخ','القسم','البيان','الكمية','الوحدة','القيمة بالريال','حالة الاعتماد','حالة الصرف','ملاحظة الصرف'];
  const visibleIds=new Set([...document.querySelectorAll('[data-overtime-detail-row]:not([hidden])')].map((row)=>row.dataset.recordId));
  const hasWorkspace=Boolean(document.querySelector('.overtime-table-wrap'));
  const rows = employeeFinancialItems.filter((item) => item.overtimeBatchId && !item.archived && (!hasWorkspace||visibleIds.has(item.id))).map((item) => [item.overtimeBatchId,item.employeeId,item.employeeName,item.employeeCode,item.identityNumber,item.jobTitle,item.workerType,item.site,item.date,item.overtimeKind,item.description,item.quantity,item.unit,item.amount,item.approvalStatus,item.paymentStatus,item.paymentNote]);
  const csv = `\uFEFF${[columns,...rows].map((row)=>row.map(overtimeCsvCell).join(',')).join('\r\n')}`; const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); const link=document.createElement('a'); link.href=url; link.download=`الإضافيات-${saudiTodayISO()}.csv`; link.click(); URL.revokeObjectURL(url);
}
function importOvertimeCsv(input) {
  const file = input.files?.[0]; if (!file) return; if (!isSystemAdmin()) { notify('استيراد سجل الإضافيات متاح لمالك النظام فقط.'); input.value=''; return; }
  const reader = new FileReader(); reader.onload = () => {
    const lines = String(reader.result || '').replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean); if (lines.length < 2) { notify('ملف CSV لا يحتوي على صفوف بيانات.'); return; }
    const parse = (line) => { const cells=[]; let value=''; let quoted=false; for (let index=0; index<line.length; index+=1) { const char=line[index]; if (char==='"' && quoted && line[index+1]==='"') { value+='"'; index+=1; } else if (char==='"') quoted=!quoted; else if (char===',' && !quoted) { cells.push(value); value=''; } else value+=char; } cells.push(value); return cells; };
    const headers=parse(lines[0]); let updated=0; let unknown=0;
    for (const line of lines.slice(1)) { const row=parse(line); const value=(name)=>row[headers.indexOf(name)] || ''; const item=employeeFinancialItems.find((record)=>record.overtimeBatchId===value('رقم المجموعة') && record.employeeId===value('معرف الموظف')); if (!item) { unknown+=1; continue; } const amount=Number(value('القيمة بالريال')); if (Number.isFinite(amount) && amount>=0) item.amount=Math.round(amount*100)/100; if (['paid','paid-with-settlement','unpaid','transferred-to-account'].includes(value('حالة الصرف'))) item.paymentStatus=value('حالة الصرف'); item.paymentNote=value('ملاحظة الصرف'); item.history ||= []; item.history.push({action:'excel-import-updated',actorId:sessionIdentifier(),actorName:window.NAGM_SESSION?.displayName||sessionIdentifier(),at:new Date().toISOString()}); updated+=1; }
    saveEmployeeFinancialItems(); renderEmployeeFinancialManagement(); notify(`تم تحديث ${arabicNumber.format(updated)} سجل من الملف${unknown ? `، وتجاهل ${arabicNumber.format(unknown)} صف غير مطابق` : ''}.`);
  }; reader.onerror=()=>notify('تعذر قراءة ملف CSV.'); reader.readAsText(file,'utf-8'); input.value='';
}
function renderOvertimeSubmissionForm(employees) {
  if (!overtimeRoleAllowed()) return '';
  const roles = sessionRoleValues(); const ownEmployee = currentEmployeeForSession(); const isEmployeeOnly = roles.has('employee') && !roles.has('engineer') && !leaveFinanceManager();
  if (isEmployeeOnly && !ownEmployee) return '';
  const eligible = employees.filter((item) => item.status === 'active' && !item.archived && !item.systemHidden);
  const sites = [...new Set([...employeeSiteNames, ...eligible.map((item) => item.site)].filter(Boolean))];
  const siteSelect = isEmployeeOnly ? `<input type="hidden" name="site" value="${escapeHtml(ownEmployee.site)}"><p class="profile-note">الموقع المرتبط بملفك: ${escapeHtml(ownEmployee.site)}</p>` : `<label>الموقع<select name="site" required><option value="">اختر الموقع</option>${sites.map((site) => `<option>${escapeHtml(site)}</option>`).join('')}</select></label>`;
  const employeeSelect = isEmployeeOnly ? `<input type="hidden" name="employeeId" value="${escapeHtml(ownEmployee.id)}"><p class="profile-note">تُسجل الإضافة على ملفك الوظيفي.</p>` : `<label>الموظف<select name="employeeId" required><option value="">اختر الموظف</option>${eligible.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)} · ${escapeHtml(item.id)}</option>`).join('')}</select></label>`;
  return `<section class="profile-panel overtime-submit-panel"><div class="panel-title"><div><h3>تسجيل عمل إضافي</h3><p>يُحفظ الطلب في سجل الموظف ويرسل إلى سلسلة اعتمادات الإضافيات. المبلغ يدخله مقدم الطلب؛ لا يحسب النظام أجرًا تلقائيًا.</p></div></div><form class="leave-form financial-item-create-form" data-overtime-submission>${employeeSelect}${siteSelect}<label>تاريخ العمل<input name="date" type="date" value="${saudiTodayISO()}" required></label><label>عدد الساعات<input name="hours" type="number" min="0.25" step="0.25" value="0" required></label><label>المبلغ المطلوب (ريال)<input name="amount" type="number" min="0.01" step="0.01" required></label><label>البيان<input name="description" maxlength="240" required placeholder="مثال: عمل يوم الجمعة"></label><button class="primary-button" type="submit">إرسال للاعتماد</button></form></section>`;
}
function renderEmployeeFinancialManagement() {
  const host = document.querySelector('[data-employee-extras-content]');
  if (!host) return;
  const employees = employeeRecords.filter((employee) => employee.sponsor === 'الشركة' && !employee.archived && !employee.systemHidden);
  const canManage = isSystemAdmin();
  if (canManage && renderOvertimeControlCenter()) return;
  if (!canManage && overtimeCanSubmit() && renderOvertimeControlCenter()) return;
  if (!canManage) { host.innerHTML = '<section class="profile-panel"><p class="profile-note">سجل الإضافيات وبياناتها المالية متاحة لمالك النظام فقط. مسؤول الموقع يسجل أسماء العاملين في موقعه.</p></section>'; return; }
  const activeItems = employeeFinancialItems.filter((item) => !item.archived && (!item.systemAdminOnly || isSystemAdmin()));
  const financialSites = [...new Set(activeItems.map((item) => item.site).filter(Boolean))];
  const pendingCount = activeItems.filter((item) => item.approvalStatus === 'pending').length;
  const waitingPayment = activeItems.filter((item) => item.approvalStatus === 'approved' && !['paid', 'paid-with-settlement'].includes(item.paymentStatus)).length;
  const itemRows = [...activeItems].sort((a,b) => String(b.createdAt).localeCompare(String(a.createdAt))).map((item) => {
    const employee = employeeRecords.find((record) => record.id === item.employeeId);
    const actions = canManage && item.approvalStatus === 'pending' && !item.workflowRequest && (!item.systemAdminOnly || isSystemAdmin()) ? `<div class="request-actions"><button class="primary-button" type="button" data-financial-decision="approve" data-financial-id="${escapeHtml(item.id)}">اعتماد البند</button><button class="danger-button" type="button" data-financial-decision="reject" data-financial-id="${escapeHtml(item.id)}">رفض</button></div>` : canManage && item.approvalStatus === 'approved' && !['paid','paid-with-settlement'].includes(item.paymentStatus) && !item.reservedSettlementId && (!item.systemAdminOnly || isSystemAdmin()) ? `<form class="financial-item-pay-form" data-pay-financial-item="${escapeHtml(item.id)}"><input type="date" name="paidAt" value="${saudiTodayISO()}" aria-label="تاريخ الصرف" required><input name="reference" maxlength="100" placeholder="رقم المرجع" required><button class="secondary-button" type="submit">تسجيل الصرف</button></form>` : item.reservedSettlementId ? `<small>ضمن التصفية ${escapeHtml(item.reservedSettlementNumber || '')}</small>` : '';
    return `<tr data-financial-row data-employee="${escapeHtml(`${employee?.name || item.employeeId} ${item.employeeId}`)}" data-date="${escapeHtml(item.date || '')}" data-site="${escapeHtml(item.site || '')}" data-status="${escapeHtml(item.approvalStatus || '')}" data-payment="${escapeHtml(financialPaymentFilterValue(item))}"><td>${escapeHtml(employee?.name || item.employeeId)}</td><td>${escapeHtml(item.site || '—')}</td><td>${escapeHtml(leaveFinancialTypes[item.type] || item.type)}</td><td>${escapeHtml(item.description)}</td><td>${escapeHtml(item.date || '—')}</td><td>${arabicNumber.format(Number(item.quantity) || 0)} ${escapeHtml(item.unit || '')}</td><td>${arabicNumber.format(Number(item.amount) || 0)} ر.س</td><td>${escapeHtml(item.createdByName || '—')}</td><td>${escapeHtml(leaveFinancialItemState(item))}</td><td>${actions}</td></tr>`;
  }).join('');
  const leaveRows = employeeLeaveRequests.filter((request) => request.status === 'approved').map((request) => {
    const employee = employeeRecords.find((record) => record.id === request.employeeId);
    if (!employee) return '';
    const settlement = employeeLeaveSettlements.find((record) => record.leaveRequestId === request.id);
    const eligible = employeeFinancialItems.filter((item) => item.employeeId === employee.id && item.approvalStatus === 'approved' && !['paid','paid-with-settlement'].includes(item.paymentStatus) && !item.reservedSettlementId && !item.archived && (!item.systemAdminOnly || isSystemAdmin()));
    const unresolvedEmployeeItems = employeeFinancialItems.filter((item) => item.employeeId === employee.id && !item.archived && (item.approvalStatus === 'pending' || (item.approvalStatus === 'approved' && !['paid', 'paid-with-settlement'].includes(item.paymentStatus))));
    const unpaidEmployeeSettlements = employeeLeaveSettlements.filter((item) => item.employeeId === employee.id && item.status !== 'paid');
    const priorClosureHistory = (request.procedureClosureHistory || []).map((closure) => `<small class="profile-note">إغلاق سابق ${escapeHtml(closure.completedAt ? new Date(closure.completedAt).toLocaleString('ar-SA') : '—')} · ${escapeHtml(closure.completedBy || '—')}${closure.exception ? ` · الاستثناء: ${escapeHtml(closure.exception)}` : ''}</small>`).join('');
    const settlementMarkup = settlement ? renderLeaveSettlementCard(settlement, employee) : `<form class="leave-settlement-form" data-create-settlement="${escapeHtml(request.id)}"><div class="panel-title"><div><h4>تصفية ${escapeHtml(request.startDate)} إلى ${escapeHtml(request.endDate)}</h4><p>حدد البنود المعتمدة التي ستدخل في هذه التصفية. الاعتماد لا يسجل الصرف.</p></div></div>${eligible.length ? `<div class="settlement-items">${eligible.map((item) => { const deduction = ['advance','deduction','custody'].includes(item.type); return `<label class="settlement-item-choice"><input type="checkbox" name="financialItemId" value="${escapeHtml(item.id)}" data-settlement-item data-kind="${deduction ? 'deduction' : 'credit'}" data-amount="${escapeHtml(Number(item.amount) || 0)}"><span>${escapeHtml(leaveFinancialTypes[item.type] || item.type)} · ${escapeHtml(item.description)} · ${arabicNumber.format(Number(item.amount) || 0)} ر.س ${deduction ? 'خصم' : 'مستحق'}</span></label>`; }).join('')}</div><div class="settlement-live-totals" data-settlement-totals aria-live="polite"><div><span>إجمالي المستحقات</span><strong data-settlement-credits>٠ ر.س</strong></div><div><span>إجمالي الخصومات</span><strong data-settlement-deductions>٠ ر.س</strong></div><div><span>صافي التصفية</span><strong data-settlement-net>٠ ر.س</strong></div></div>` : '<p class="profile-note">لا توجد بنود معتمدة وغير مصروفة لهذا الموظف حاليًا.</p>'}<label>ملاحظة التصفية<textarea name="note" rows="2" maxlength="500"></textarea></label>${canManage ? '<button class="primary-button" type="submit">إنشاء مسودة تصفية</button>' : ''}</form>`;
    const proceduresClosed = leaveProceduresAreClosed(request);
    const reopenNotice = request.proceduresReopenedAt && !proceduresClosed ? `<p class="profile-note">أُعيد فتح الإجراءات بعد إغلاقها في ${new Date(request.proceduresCompletedAt).toLocaleString('ar-SA')} بسبب: ${escapeHtml(request.proceduresReopenReason || 'حركة مالية جديدة')} · ${escapeHtml(request.proceduresReopenedBy || '')}</p>` : '';
    const closeForm = leaveFinanceManager() && !proceduresClosed ? `${reopenNotice}<form class="procedure-close-form" data-close-leave-procedures="${escapeHtml(request.id)}"><p class="profile-note">${unresolvedEmployeeItems.length ? `يوجد ${arabicNumber.format(unresolvedEmployeeItems.length)} بند مالي غير مسوّى` : 'لا توجد بنود مالية مفتوحة'}، و${arabicNumber.format(unpaidEmployeeSettlements.length)} تصفية لم يتم صرفها. عالج البنود أو سجّل استثناءً مسببًا قبل الإغلاق.</p><label>استثناء مسبب عند الحاجة<textarea name="exceptionReason" rows="2" maxlength="500" ${unresolvedEmployeeItems.length || unpaidEmployeeSettlements.length ? 'required' : ''} placeholder="اتركه فارغًا إذا تمت تسوية جميع البنود"></textarea></label><button class="secondary-button" type="submit">تأكيد انتهاء جميع الإجراءات</button></form>` : proceduresClosed ? `<p class="profile-note">اكتملت جميع الإجراءات ${new Date(request.proceduresCompletedAt).toLocaleString('ar-SA')} · ${escapeHtml(request.proceduresCompletedBy || '')}${request.proceduresException ? ` · الاستثناء: ${escapeHtml(request.proceduresException)}` : ''}</p>` : '';
    return `<article class="leave-history-case"><div class="management-employee-head"><div><strong>${escapeHtml(employee.name)} · ${escapeHtml(request.leaveType || 'إجازة')}</strong><small>${escapeHtml(employee.id)} · ${escapeHtml(request.startDate)} إلى ${escapeHtml(request.endDate)} · اعتماد ${request.fullyApprovedAt ? new Date(request.fullyApprovedAt).toLocaleString('ar-SA') : '—'}</small></div><span class="request-status-pill">${settlement ? escapeHtml(settlement.statusLabel || settlement.status) : 'بانتظار التصفية'}</span></div>${settlementMarkup}${closeForm}${priorClosureHistory}</article>`;
  }).join('');
  const leaveReportRows = employeeLeaveRequests.map((request) => {
    const employee = employeeRecords.find((item) => item.id === request.employeeId); if (!employee) return '';
    const manager = employeeRecords.find((item) => item.id === employee.directManagerId)?.name || '';
    const settlement = employeeLeaveSettlements.find((item) => item.leaveRequestId === request.id);
    const waitingAt = leaveRequestWaitingLabel(request);
    const operational = leaveRequestOperationalStatus(request);
    return `<tr data-leave-report-row data-employee="${escapeHtml(employee.name)} ${escapeHtml(employee.id)}" data-site="${escapeHtml(request.site || employee.site)}" data-department="${escapeHtml(employee.department)}" data-manager="${escapeHtml(manager)}" data-status="${escapeHtml(request.status)}" data-operational="${escapeHtml(operational.key)}" data-waiting="${escapeHtml(waitingAt)}" data-created="${escapeHtml(request.createdAt?.slice(0,10) || '')}"><td>${escapeHtml(employee.name)}</td><td>${escapeHtml(employee.id)}</td><td>${escapeHtml(employee.site)}</td><td>${escapeHtml(employee.department)}</td><td>${escapeHtml(manager || '—')}</td><td>${escapeHtml(request.createdAt?.slice(0,10) || '—')}</td><td>${escapeHtml(request.startDate || '—')} إلى ${escapeHtml(request.endDate || '—')}</td><td>${escapeHtml(leaveRequestStatusLabel(request))}</td><td>${escapeHtml(operational.label)}</td><td>${escapeHtml(waitingAt || '—')}</td><td>${escapeHtml(request.fullyApprovedAt ? new Date(request.fullyApprovedAt).toLocaleDateString('ar-SA') : '—')}</td><td>${escapeHtml(settlement?.statusLabel || 'غير مصفاة')}</td><td>${escapeHtml(request.proceduresCompletedAt ? new Date(request.proceduresCompletedAt).toLocaleDateString('ar-SA') : 'غير مكتملة')}</td></tr>`;
  }).join('');
  const pendingLeaveApprovers = [...new Set(employeeLeaveRequests.map(leaveRequestWaitingLabel).filter(Boolean))];
  const operationalStatusOptions = [['approved-not-started','معتمدة ولم تبدأ'],['currently-on-leave','على إجازة حاليًا'],['leave-ended-no-return','انتهت الإجازة ولم يعد'],['leave-record-missing','سجل الإجازة غير موجود'],['settlement-not-started','بانتظار التصفية'],['settlement-not-paid','بانتظار صرف التصفية'],['returned-procedures-open','عاد وإجراءاته مفتوحة'],['procedures-open','التصفية صُرفت والإجراءات مفتوحة'],['procedures-reopened','إجراءات مكتملة أُعيد فتحها'],['procedures-complete','اكتملت الإجراءات']];
  const leaveReportMarkup = `<section class="profile-panel"><div class="panel-title"><div><h3>تقارير طلبات الإجازة والتصفية</h3><p>سجل كامل للطلبات، المسؤولين، مواقع العمل، حالات الاعتماد والإغلاق.</p></div><div><button class="secondary-button" type="button" data-export-leave-requests>تصدير Excel (CSV)</button><button class="secondary-button" type="button" data-print-leave-report>طباعة / PDF</button></div></div><div class="leave-financial-filters"><label>الموظف أو الكود<input type="search" data-leave-report-text placeholder="ابحث بالاسم أو الكود"></label><label>حالة الطلب<select data-leave-report-status><option value="">كل الحالات</option>${Object.entries({ 'pending-hr-review':'بانتظار توجيه الموارد البشرية','pending-approval':'بانتظار الاعتماد','approved':'معتمد','rejected':'مرفوض','needs-revision':'للاستكمال' }).map(([value,label]) => `<option value="${value}">${label}</option>`).join('')}</select></label><label>الحالة التشغيلية<select data-leave-report-operational><option value="">كل الحالات التشغيلية</option>${operationalStatusOptions.map(([value,label]) => `<option value="${value}">${label}</option>`).join('')}</select></label><label>متوقف عند المسؤول<select data-leave-report-waiting><option value="">كل المسؤولين</option>${pendingLeaveApprovers.map((approver) => `<option>${escapeHtml(approver)}</option>`).join('')}</select></label><label>الموقع<select data-leave-report-site><option value="">كل المواقع</option>${[...new Set(employees.map((item) => item.site))].map((site) => `<option>${escapeHtml(site)}</option>`).join('')}</select></label><label>القسم<select data-leave-report-department><option value="">كل الأقسام</option>${[...new Set(employees.map((item) => item.department))].map((department) => `<option>${escapeHtml(department)}</option>`).join('')}</select></label><label>المدير المباشر<select data-leave-report-manager><option value="">كل المديرين</option>${[...new Set(employees.map((item) => employeeRecords.find((manager) => manager.id === item.directManagerId)?.name).filter(Boolean))].map((manager) => `<option>${escapeHtml(manager)}</option>`).join('')}</select></label><label>من تاريخ الطلب<input type="date" data-leave-report-from></label><label>إلى تاريخ الطلب<input type="date" data-leave-report-to></label></div><div class="employee-list rows"><table class="employee-table"><thead><tr><th>الموظف</th><th>الكود</th><th>الموقع</th><th>القسم</th><th>المدير المباشر</th><th>تاريخ الطلب</th><th>فترة الإجازة</th><th>حالة الطلب</th><th>الحالة التشغيلية</th><th>متوقف عند</th><th>تاريخ الاعتماد</th><th>التصفية</th><th>إغلاق الإجراءات</th></tr></thead><tbody>${leaveReportRows || '<tr><td colspan="13" class="log-empty">لا توجد طلبات إجازة مسجلة.</td></tr>'}</tbody></table></div></section>`;
  const paidSettlementRows = employeeFinancialItems.filter((item) => item.paymentStatus === 'paid-with-settlement' && (!item.systemAdminOnly || isSystemAdmin())).map((item) => {
    const employee = employeeRecords.find((record) => record.id === item.employeeId);
    const settlement = employeeLeaveSettlements.find((record) => record.id === (item.settlementId || item.reservedSettlementId));
    const paidAt = item.paidAt || settlement?.paidAt || '';
    const site = item.site || employee?.site || '';
    const kind = item.settlementKind || (['advance','deduction','custody'].includes(item.type) ? 'deduction' : 'credit');
    const paidAmount = Number(item.paidAmount ?? item.amount) || 0;
    const method = item.paymentMethod || settlement?.method || '';
    const reference = item.paymentReference || settlement?.reference || '';
    return `<tr data-paid-settlement-row data-search="${escapeHtml(`${employee?.name || ''} ${item.employeeId} ${item.description || ''}`.toLocaleLowerCase('ar'))}" data-paid-date="${escapeHtml(paidAt)}" data-site="${escapeHtml(site)}" data-kind="${kind}" data-amount="${paidAmount}"><td>${escapeHtml(employee?.name || item.employeeId)}${employee?.archived ? ' · مؤرشف' : ''}</td><td>${escapeHtml(item.employeeId)}</td><td>${escapeHtml(site || '—')}</td><td>${escapeHtml(leaveFinancialTypes[item.type] || item.type)}</td><td>${escapeHtml(item.description || '')}</td><td>${escapeHtml(item.date || '—')}</td><td>${escapeHtml(item.settlementNumber || settlement?.number || '—')}</td><td>${escapeHtml(paidAt || '—')}</td><td>${arabicNumber.format(paidAmount)} ر.س · ${kind === 'deduction' ? 'خصم' : 'مستحق'}</td><td>${escapeHtml(method || '—')}</td><td>${escapeHtml(reference || '—')}</td></tr>`;
  }).join('');
  const paidSettlementReportMarkup = `<section class="profile-panel"><div class="panel-title"><div><h3>تقرير الإضافيات والبنود المصروفة مع التصفية</h3><p>يعتمد نطاق هذا التقرير على تاريخ الصرف الفعلي، ويعرض البنود المرتبطة برقم التصفية.</p></div><div><button class="secondary-button" type="button" data-export-paid-settlement-report>تصدير Excel (CSV)</button><button class="secondary-button" type="button" data-print-paid-settlement-report>طباعة / PDF</button></div></div><div class="leave-financial-filters"><label>بحث الموظف أو البيان<input type="search" data-paid-settlement-search placeholder="الاسم أو الكود أو البيان"></label><label>من تاريخ الصرف<input type="date" data-paid-settlement-from></label><label>إلى تاريخ الصرف<input type="date" data-paid-settlement-to></label><label>الموقع<select data-paid-settlement-site><option value="">كل المواقع</option>${[...new Set(paidSettlementRows ? employeeFinancialItems.filter((item) => item.paymentStatus === 'paid-with-settlement' && (!item.systemAdminOnly || isSystemAdmin())).map((item) => item.site || employeeRecords.find((record) => record.id === item.employeeId)?.site).filter(Boolean) : [])].map((site) => `<option>${escapeHtml(site)}</option>`).join('')}</select></label></div><div class="settlement-live-totals"><div><span>إجمالي المستحقات المصروفة</span><strong data-paid-settlement-credits>٠ ر.س</strong></div><div><span>إجمالي الخصومات المسجلة</span><strong data-paid-settlement-deductions>٠ ر.س</strong></div><div><span>عدد البنود</span><strong data-paid-settlement-count>٠</strong></div></div><div class="employee-list rows"><table class="employee-table"><thead><tr><th>الموظف</th><th>الكود</th><th>الموقع</th><th>نوع البند</th><th>البيان</th><th>تاريخ البند</th><th>رقم التصفية</th><th>تاريخ الصرف</th><th>القيمة</th><th>طريقة الصرف</th><th>رقم المرجع</th></tr></thead><tbody>${paidSettlementRows || '<tr><td colspan="11" class="log-empty">لا توجد بنود صُرفت مع تصفية حتى الآن.</td></tr>'}</tbody></table></div></section>`;
  host.innerHTML = `${renderOvertimeSubmissionForm(employees)}<section class="profile-panel"><div class="panel-title"><div><h3>الإضافيات والمكافآت والمستحقات</h3><p>البند المالي يحتفظ بحالة اعتماد مستقلة عن حالة صرفه، ويُسجل المسؤول الذي أضافه.</p></div><span class="panel-chip">${arabicNumber.format(pendingCount)} بانتظار الاعتماد · ${arabicNumber.format(waitingPayment)} معتمد غير مصروف</span></div>${canManage ? `<form class="leave-form financial-item-create-form" data-create-financial-item><label>الموظف<select name="employeeId" required><option value="">اختر الموظف</option>${employees.map((employee) => `<option value="${escapeHtml(employee.id)}">${escapeHtml(employee.name)} · ${escapeHtml(employee.id)}</option>`).join('')}</select></label><label>نوع البند<select name="type" required>${Object.entries(leaveFinancialTypes).filter(([key]) => key !== 'bonus' || isSystemAdmin()).map(([key,label]) => `<option value="${key}">${label}</option>`).join('')}</select></label><label>البيان<input name="description" maxlength="240" required></label><label>التاريخ<input name="date" type="date" required value="${saudiTodayISO()}"></label><label>عدد الساعات / الأيام<input name="quantity" type="number" min="0" step="0.25" value="0"></label><label>الوحدة<input name="unit" maxlength="30" placeholder="ساعة / يوم / مبلغ"></label><label>القيمة (ريال)<input name="amount" type="number" min="0.01" step="0.01" required></label><button class="primary-button" type="submit">حفظ كبند بانتظار الاعتماد</button></form>` : '<p class="profile-note">إضافة البنود المالية ومراجعتها متاحة للموارد البشرية ومدير النظام.</p>'}</section><section class="profile-panel"><div class="panel-title"><div><h3>سجل البنود المالية</h3><p>يمكن مراجعة البنود المعلقة والمعتمدة والمرفوضة والمصروفة، مع تقرير مستقل للمبالغ المصروفة مع التصفية.</p></div><button class="secondary-button" type="button" data-export-leave-financial-report>تصدير CSV</button></div><div class="leave-financial-filters"><label>بحث الموظف / البيان<input type="search" data-financial-filter-text placeholder="اكتب اسم الموظف أو البيان"></label><label>حالة الاعتماد<select data-financial-filter-status><option value="">كل الحالات</option><option value="pending">بانتظار الاعتماد</option><option value="approved">معتمد</option><option value="rejected">مرفوض</option></select></label><label>حالة الصرف<select data-financial-filter-payment><option value="">كل حالات الصرف</option><option value="unpaid">غير مصروف</option><option value="reserved">محجوز في تصفية</option><option value="paid-with-settlement">صُرفت مع التصفية</option><option value="paid">صُرفت مباشرة</option></select></label><label>الموقع<select data-financial-filter-site><option value="">كل المواقع</option>${financialSites.map((site) => `<option>${escapeHtml(site)}</option>`).join('')}</select></label><label>من تاريخ<input type="date" data-financial-filter-from></label><label>إلى تاريخ<input type="date" data-financial-filter-to></label></div><div class="employee-list rows"><table class="employee-table"><thead><tr><th>الموظف</th><th>الموقع</th><th>النوع</th><th>البيان</th><th>التاريخ</th><th>الكمية</th><th>القيمة</th><th>أضافه</th><th>الحالة</th><th>الإجراء</th></tr></thead><tbody>${itemRows || '<tr><td colspan="10" class="log-empty">لا توجد بنود مالية مسجلة.</td></tr>'}</tbody></table></div></section><section class="profile-panel"><div class="panel-title"><div><h3>تصفية الإجازات وإغلاق الإجراءات</h3><p>الإجازة المعتمدة مستقلة عن تصفية مستحقاتها وإغلاقها.</p></div></div><div class="leave-request-list">${leaveRows || '<div class="profile-empty-state">لا توجد إجازات معتمدة جاهزة للتصفية.</div>'}</div></section>${paidSettlementReportMarkup}${leaveReportMarkup}`;
  const activeSettlementPanel = [...host.querySelectorAll('.profile-panel')].find((panel) => panel.querySelector('.leave-request-list') && panel.textContent.includes('تصفية الإجازات وإغلاق الإجراءات'))?.cloneNode(true);
  if (canManage && renderOvertimeControlCenter()) {
    if (activeSettlementPanel) document.querySelector('[data-employee-extras-content] .overtime-workspace')?.append(activeSettlementPanel);
    return;
  }
  applyPaidSettlementReportFilters(host.querySelector('.profile-panel [data-paid-settlement-search]')?.closest('.profile-panel'));
}
function renderLeaveSettlementEditor(employee, request, settlement = null) {
  const currentIds = new Set((settlement?.lines || []).map((line) => line.financialItemId));
  const eligible = employeeFinancialItems.filter((item) => item.employeeId === employee.id && item.approvalStatus === 'approved' && !['paid','paid-with-settlement'].includes(item.paymentStatus) && !item.archived && (!item.reservedSettlementId || item.reservedSettlementId === settlement?.id) && (!item.systemAdminOnly || isSystemAdmin()));
  const formKey = settlement ? `data-update-settlement="${escapeHtml(settlement.id)}"` : `data-create-settlement="${escapeHtml(request.id)}"`;
  const selectedTotals = eligible.reduce((totals, item) => {
    if (!currentIds.has(item.id)) return totals;
    const isDeduction = ['advance', 'deduction', 'custody'].includes(item.type);
    totals[isDeduction ? 'deductions' : 'credits'] += Number(item.amount) || 0;
    return totals;
  }, { credits: 0, deductions: 0 });
  const format = (value) => `${arabicNumber.format(Math.round(value * 100) / 100)} ر.س`;
  const itemChoices = eligible.map((item) => {
    const deduction = ['advance','deduction','custody'].includes(item.type);
    return `<label class="settlement-item-choice"><input type="checkbox" name="financialItemId" value="${escapeHtml(item.id)}" data-settlement-item data-kind="${deduction ? 'deduction' : 'credit'}" data-amount="${escapeHtml(Number(item.amount) || 0)}" ${currentIds.has(item.id) ? 'checked' : ''}><span>${escapeHtml(leaveFinancialTypes[item.type] || item.type)} · ${escapeHtml(item.description)} · ${arabicNumber.format(Number(item.amount) || 0)} ر.س ${deduction ? 'خصم' : 'مستحق'} · ${escapeHtml(item.date || '—')}</span></label>`;
  }).join('');
  const button = settlement ? 'حفظ تعديلات المسودة' : 'إنشاء مسودة تصفية';
  return `<form class="leave-settlement-form" ${formKey}><div class="panel-title"><div><h4>${settlement ? `تعديل مسودة ${escapeHtml(settlement.number)}` : `تصفية ${escapeHtml(request.startDate)} إلى ${escapeHtml(request.endDate)}`}</h4><p>اختر البنود المعتمدة التي ستدخل في التصفية. الاعتماد لا يسجل الصرف.</p></div></div>${itemChoices ? `<div class="settlement-items">${itemChoices}</div>` : '<p class="profile-note">لا توجد بنود مالية معتمدة متاحة للتصفية.</p>'}<div class="settlement-live-totals" data-settlement-totals aria-live="polite"><div><span>إجمالي المستحقات</span><strong data-settlement-credits>${format(selectedTotals.credits)}</strong></div><div><span>إجمالي الخصومات</span><strong data-settlement-deductions>${format(selectedTotals.deductions)}</strong></div><div><span>صافي التصفية</span><strong data-settlement-net>${format(selectedTotals.credits - selectedTotals.deductions)}</strong></div></div><label>ملاحظة التصفية<textarea name="note" rows="2" maxlength="500">${escapeHtml(settlement?.note || '')}</textarea></label>${leaveFinanceManager() ? `<button class="primary-button" type="submit">${button}</button>` : ''}</form>`;
}
function renderLeaveSettlementCard(settlement, employee) {
  const lines = (settlement.lines || []).map((line) => `<li>${escapeHtml(line.description)} · ${arabicNumber.format(Number(line.amount) || 0)} ر.س · ${line.kind === 'deduction' ? 'خصم' : 'مستحق'}</li>`).join('');
  const action = leaveFinanceManager() && settlement.status === 'draft' ? `<div class="request-actions"><button class="primary-button" type="button" data-settlement-action="approve" data-settlement-id="${escapeHtml(settlement.id)}">اعتماد التصفية</button></div>` : settlement.status === 'approved' && leaveFinanceManager() ? `<form class="leave-form settlement-payment-form" data-pay-settlement="${escapeHtml(settlement.id)}"><label>تاريخ الصرف<input name="paidAt" type="date" value="${saudiTodayISO()}" required></label><label>طريقة الصرف<select name="method" required><option>تحويل بنكي</option><option>نقدًا</option><option>شيك</option><option>أخرى</option></select></label><label>رقم المرجع / سند الصرف<input name="reference" maxlength="100" required></label><label>إثبات الصرف<input name="receipt" type="file" accept="image/*,.pdf"></label><button class="primary-button" type="submit">تأكيد الصرف الفعلي</button></form>` : settlement.status === 'paid' ? `<p class="profile-note">تم الصرف ${escapeHtml(settlement.paidAt || '')} · ${escapeHtml(settlement.method || '')} · مرجع ${escapeHtml(settlement.reference || '—')}</p>${settlement.receiptFileId ? `<button class="secondary-button" type="button" data-open-leave-receipt="${escapeHtml(settlement.id)}">فتح إثبات الصرف</button>` : ''}` : '';
  const request = employeeLeaveRequests.find((item) => item.id === settlement.leaveRequestId);
  const editor = leaveFinanceManager() && settlement.status === 'draft' && request ? renderLeaveSettlementEditor(employee, request, settlement) : '';
  return `<div class="settlement-card"><div class="panel-title"><div><strong>التصفية ${escapeHtml(settlement.number)} · ${escapeHtml(settlement.statusLabel || settlement.status)}</strong><small>${escapeHtml(employee.name)} · إجمالي المستحقات ${arabicNumber.format(Number(settlement.credits) || 0)} · الخصومات ${arabicNumber.format(Number(settlement.deductions) || 0)} · الصافي ${arabicNumber.format(Number(settlement.netAmount) || 0)} ر.س</small></div></div><ul>${lines}</ul>${settlement.note ? `<p>${escapeHtml(settlement.note)}</p>` : ''}${editor}${action}</div>`;
}
function updateLeaveSettlementTotals(form) {
  if (!form) return;
  const totals = [...form.querySelectorAll('[data-settlement-item]:checked')].reduce((sum, input) => {
    const amount = Number(input.dataset.amount) || 0;
    if (input.dataset.kind === 'deduction') sum.deductions += amount;
    else sum.credits += amount;
    return sum;
  }, { credits: 0, deductions: 0 });
  const net = totals.credits - totals.deductions;
  const format = (amount) => `${arabicNumber.format(Math.round(amount * 100) / 100)} ر.س`;
  const creditsNode = form.querySelector('[data-settlement-credits]');
  const deductionsNode = form.querySelector('[data-settlement-deductions]');
  const netNode = form.querySelector('[data-settlement-net]');
  if (creditsNode) creditsNode.textContent = format(totals.credits);
  if (deductionsNode) deductionsNode.textContent = format(totals.deductions);
  if (netNode) netNode.textContent = format(net);
}
function applyPaidSettlementReportFilters(panel) {
  if (!panel) return;
  const search = panel.querySelector('[data-paid-settlement-search]')?.value.trim().toLocaleLowerCase('ar') || '';
  const from = panel.querySelector('[data-paid-settlement-from]')?.value || '';
  const to = panel.querySelector('[data-paid-settlement-to]')?.value || '';
  const site = panel.querySelector('[data-paid-settlement-site]')?.value || '';
  let credits = 0; let deductions = 0; let count = 0;
  panel.querySelectorAll('[data-paid-settlement-row]').forEach((row) => {
    const visible = (!search || row.dataset.search.includes(search)) && (!from || row.dataset.paidDate >= from) && (!to || row.dataset.paidDate <= to) && (!site || row.dataset.site === site);
    row.hidden = !visible;
    if (!visible) return;
    count += 1;
    const amount = Number(row.dataset.amount) || 0;
    if (row.dataset.kind === 'deduction') deductions += amount;
    else credits += amount;
  });
  const format = (amount) => `${arabicNumber.format(Math.round(amount * 100) / 100)} ر.س`;
  const creditNode = panel.querySelector('[data-paid-settlement-credits]');
  const deductionNode = panel.querySelector('[data-paid-settlement-deductions]');
  const countNode = panel.querySelector('[data-paid-settlement-count]');
  if (creditNode) creditNode.textContent = format(credits);
  if (deductionNode) deductionNode.textContent = format(deductions);
  if (countNode) countNode.textContent = arabicNumber.format(count);
}
function currentPaidSettlementRows(panel) {
  return [...(panel?.querySelectorAll('[data-paid-settlement-row]:not([hidden])') || [])].map((row) => [...row.cells].map((cell) => cell.textContent.trim()));
}
function applyLeaveFinancialFilters(panel) {
  if (!panel) return;
  const search = panel.querySelector('[data-financial-filter-text]')?.value.trim().toLocaleLowerCase('ar') || '';
  const status = panel.querySelector('[data-financial-filter-status]')?.value || '';
  const payment = panel.querySelector('[data-financial-filter-payment]')?.value || '';
  const site = panel.querySelector('[data-financial-filter-site]')?.value || '';
  const from = panel.querySelector('[data-financial-filter-from]')?.value || '';
  const to = panel.querySelector('[data-financial-filter-to]')?.value || '';
  panel.querySelectorAll('[data-financial-row]').forEach((row) => {
    const textMatch = !search || `${row.dataset.employee} ${row.children[2]?.textContent || ''}`.toLocaleLowerCase('ar').includes(search);
    row.hidden = !(textMatch && (!status || row.dataset.status === status) && (!payment || row.dataset.payment === payment) && (!site || row.dataset.site === site) && (!from || row.dataset.date >= from) && (!to || row.dataset.date <= to));
  });
}
function applyLeaveRequestReportFilters(panel) {
  if (!panel) return;
  const text = panel.querySelector('[data-leave-report-text]')?.value.trim().toLocaleLowerCase('ar') || '';
  const status = panel.querySelector('[data-leave-report-status]')?.value || '';
  const operational = panel.querySelector('[data-leave-report-operational]')?.value || '';
  const waiting = panel.querySelector('[data-leave-report-waiting]')?.value || '';
  const site = panel.querySelector('[data-leave-report-site]')?.value || '';
  const department = panel.querySelector('[data-leave-report-department]')?.value || '';
  const manager = panel.querySelector('[data-leave-report-manager]')?.value || '';
  const from = panel.querySelector('[data-leave-report-from]')?.value || '';
  const to = panel.querySelector('[data-leave-report-to]')?.value || '';
  panel.querySelectorAll('[data-leave-report-row]').forEach((row) => { row.hidden = !((!text || row.dataset.employee.toLocaleLowerCase('ar').includes(text)) && (!status || row.dataset.status === status) && (!operational || row.dataset.operational === operational) && (!waiting || row.dataset.waiting === waiting) && (!site || row.dataset.site === site) && (!department || row.dataset.department === department) && (!manager || row.dataset.manager === manager) && (!from || row.dataset.created >= from) && (!to || row.dataset.created <= to)); });
}
function currentLeaveReportRows(panel) { return [...(panel?.querySelectorAll('[data-leave-report-row]:not([hidden])') || [])].map((row) => [...row.cells].map((cell) => cell.textContent.trim())); }

function renderEmployeeLeaveManagement() {
  const host = document.querySelector('[data-all-employee-leaves]');
  if (!host) return;
  const employees = employeeRecords.filter((employee) => !employee.archived && !employee.systemHidden && employee.sponsor === 'الشركة');
  const directLeaveForm = isSystemAdmin() ? renderDirectLeaveForm() : '';
  const ownerLeaveCandidates = isSystemAdmin() ? employees.filter((employee) => !['stopped', 'leave'].includes(employee.status) && !(employeeLeaveRecords[employee.id]?.startDate && !employeeLeaveRecords[employee.id]?.returnDate)) : [];
  const ownerLeaveRequestForm = isSystemAdmin() ? `<section class="profile-panel"><div class="panel-title"><div><h3>طلب إجازة نيابةً عن موظف</h3><p>أرسل الطلب للمراجعة، ثم اختر له سلسلة الاعتماد أو اعتمده مباشرةً.</p></div></div><form class="leave-form" data-owner-leave-request><label>الموظف<select name="employeeId" required><option value="">اختر الموظف</option>${ownerLeaveCandidates.map((employee) => `<option value="${escapeHtml(employee.id)}">${escapeHtml(employee.name)} · ${escapeHtml(employee.id)}</option>`).join('')}</select></label><label>نوع الإجازة<select name="leaveType" required><option value="">اختر النوع</option><option>إجازة سنوية</option><option>إجازة اعتيادية</option><option>إجازة مرضية</option><option>إجازة بدون راتب</option><option>أخرى</option></select></label><label>من تاريخ<input type="date" name="startDate" required></label><label>إلى تاريخ<input type="date" name="endDate" required></label><label>ملاحظات الطلب<textarea name="employeeNote" rows="2" maxlength="500"></textarea></label><button class="primary-button" type="submit">إرسال الطلب للمراجعة</button></form></section>` : '';
  const engineer = !isSystemAdmin() && sessionRoleValues().has('engineer');
  const engineerAccount = rentalEngineerAccounts().find((account) => accountIdentifier(account) === sessionIdentifier());
  const engineerSite = engineerAccount?.responsibleSite || Object.entries(rentalSiteEngineerAssignments).find(([, id]) => id === sessionIdentifier())?.[0] || '';
  const engineerEmployees = employeeRecords.filter((employee) => employee.status === 'active' && !employee.archived && !employee.systemHidden && employee.sponsor === 'الشركة' && (!engineerSite || employee.site === engineerSite || (employeeAllowedSites[employee.id] || []).includes(engineerSite)));
  const engineerLeaveForm = engineer ? `<section class="profile-panel"><div class="panel-title"><div><h3>طلب إجازة نيابةً عن موظف</h3><p>يُسجل باسمك ويرسل أولًا إلى الموارد البشرية لتوجيهه</p></div></div>${engineerSite ? `<form class="leave-form" data-engineer-leave-request><label>الموظف<select name="employeeId" required><option value="">اختر الموظف</option>${engineerEmployees.map((employee) => `<option value="${escapeHtml(employee.id)}">${escapeHtml(employee.name)} · ${escapeHtml(employee.id)}</option>`).join('')}</select></label><label>نوع الإجازة<select name="leaveType" required><option value="">اختر النوع</option><option>إجازة سنوية</option><option>إجازة اعتيادية</option><option>إجازة مرضية</option><option>إجازة بدون راتب</option><option>أخرى</option></select></label><label>من تاريخ<input type="date" name="startDate" required></label><label>إلى تاريخ<input type="date" name="endDate" required></label><label>ملاحظات الطلب<textarea name="employeeNote" rows="2" maxlength="500"></textarea></label><button class="primary-button" type="submit">إرسال للموارد البشرية</button></form>` : '<p class="profile-note">عيّن موقع مسؤولية لحساب المهندس أولًا لعرض الموظفين.</p>'}</section>` : '';
  const requestRows = employeeLeaveRequests.map((request) => {
    const employee = employees.find((record) => record.id === request.employeeId);
    if (!employee) return '';
    const approvalState = request.status === 'approved' || request.fullyApprovedAt ? 'approved' : request.status === 'pending-hr-review' ? 'routing' : request.status === 'pending-approval' ? 'waiting' : 'closed';
    const privateReason = isSystemAdmin() && request.ownerReason ? `<p class="profile-note"><span class="private-data-tag">خاص بمدير النظام</span> ${escapeHtml(request.reasonCategory)} · ${escapeHtml(request.ownerReason)}</p>` : '';
    const history = (request.approvalHistory || []).map((entry) => `${entry.stage || 'اعتماد'}: ${entry.name || entry.account || 'مسؤول'} — ${entry.action === 'approved' ? 'اعتمد' : entry.action === 'rejected' ? 'رفض' : entry.action === 'routed' ? 'أرسل للاعتماد' : entry.action || ''} · ${entry.at ? new Date(entry.at).toLocaleString('ar-SA') : ''}${entry.note ? ` · ${entry.note}` : ''}`).join(' | ');
    const intake = request.status === 'pending-hr-review' && isSystemAdmin() ? leaveIntakeFormMarkup(request, employee) : '';
    const print = approvalState === 'approved' ? `<button class="secondary-button" type="button" data-print-leave-document="${escapeHtml(request.id)}">طباعة نموذج الإجازة</button>` : '';
    return `<details class="leave-request-card leave-request-compact-row" data-leave-request-card data-leave-state="${approvalState}"><summary class="leave-request-summary"><span class="leave-request-person"><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.id)} · ${escapeHtml(request.requesterName || 'مقدم الطلب غير محدد')}</small></span><span class="leave-request-period"><strong>${escapeHtml(request.startDate || '—')} – ${escapeHtml(request.endDate || '—')}</strong><small>${escapeHtml(request.leaveType || request.reasonCategory || 'نوع غير محدد')}</small></span><span class="request-status-pill">${escapeHtml(leaveRequestStatusLabel(request))}</span><span class="leave-request-expand-label">التفاصيل <i aria-hidden="true">⌄</i></span></summary><div class="leave-request-expanded"><div class="leave-request-facts"><span>الموقع <b>${escapeHtml(employee.site || 'غير محدد')}</b></span><span>طريقة التقديم <b>${escapeHtml(request.requesterType === 'engineer' ? 'المهندس نيابةً عن الموظف' : request.requesterType === 'system-admin' ? 'مدير النظام نيابةً عن الموظف' : 'الموظف لنفسه')}</b></span><span>تاريخ التقديم <b>${escapeHtml(request.createdAt?.slice(0, 10) || '—')}</b></span><span>اكتمال الاعتماد <b>${escapeHtml(request.fullyApprovedAt ? new Date(request.fullyApprovedAt).toLocaleString('ar-SA') : 'لم يكتمل')}</b></span></div>${privateReason}${history ? `<p class="approval-trace">${escapeHtml(history)}</p>` : '<p class="profile-note">لا توجد قرارات اعتماد مسجلة حتى الآن.</p>'}<div class="request-actions">${intake}${print}</div></div></details>`;
  }).filter(Boolean).join('');
    const counts = { all: employeeLeaveRequests.length, waiting: employeeLeaveRequests.filter((request) => request.status === 'pending-approval').length, routing: employeeLeaveRequests.filter((request) => request.status === 'pending-hr-review').length, approved: employeeLeaveRequests.filter((request) => request.status === 'approved' || request.fullyApprovedAt).length, closed: employeeLeaveRequests.filter((request) => ['rejected', 'cancelled', 'needs-revision'].includes(request.status)).length };
  host.innerHTML = `${directLeaveForm}${ownerLeaveRequestForm}${engineerLeaveForm}<section class="profile-panel leave-request-create-panel"><div class="panel-title"><div><h3>طلبات الإجازات الواردة</h3><p>الموظف يرفع طلبه لنفسه، والمهندس المخوّل يرفعه نيابةً عن موظف. تختار أنت سلسلة الاعتماد والتوقيعات لكل طلب أو تتجاوزها.</p></div><span class="panel-chip">${arabicNumber.format(counts.waiting)} بانتظار التعميد</span></div><p class="profile-note">يمكن اعتماد الطلب مباشرةً من مدير النظام مع حفظ الإجراء في السجل.</p></section><section class="leave-request-list"><div class="panel-title"><div><h3>سجل طلبات الإجازة</h3><p>${arabicNumber.format(employeeLeaveRequests.length)} طلبات، وكل إجازة محفوظة كسجل مستقل.</p></div></div><div class="leave-management-filters" role="group" aria-label="تصفية طلبات الإجازة"><button type="button" class="secondary-button is-active" data-leave-management-filter="all">كل الإجازات <b>${arabicNumber.format(counts.all)}</b></button><button type="button" class="secondary-button" data-leave-management-filter="waiting">في انتظار التعميد <b>${arabicNumber.format(counts.waiting)}</b></button>${isSystemAdmin() ? `<button type="button" class="secondary-button" data-leave-management-filter="routing">بانتظار توجيه السلسلة <b>${arabicNumber.format(counts.routing)}</b></button>` : ''}<button type="button" class="secondary-button" data-leave-management-filter="approved">الإجازات المعتمدة <b>${arabicNumber.format(counts.approved)}</b></button><button type="button" class="secondary-button" data-leave-management-filter="closed">مرفوضة / للاستكمال <b>${arabicNumber.format(counts.closed)}</b></button></div>${requestRows || '<div class="profile-empty-state">لا توجد طلبات إجازة حتى الآن.</div>'}</section>${employees.filter((employee) => employee.status === 'leave').map((employee) => { const leave = employeeLeaveRecords[employee.id] || {}; const privateReason = isSystemAdmin() && leave.reason ? `<p class="profile-note"><span class="private-data-tag">خاص بمدير النظام</span> ${escapeHtml(leave.reasonCategory)} · ${escapeHtml(leave.reason)}</p>` : '<p class="profile-note">تفاصيل الإجازة محجوبة للحسابات غير المخوّلة.</p>'; return `<article class="management-employee-card"><div class="management-employee-head"><div><strong>${escapeHtml(employee.name)}</strong><small>${employee.id} · ${isSystemAdmin() && leave.startDate ? `على الإجازة منذ ${escapeHtml(leave.startDate)}` : 'على إجازة'}</small></div><span class="status-badge leave">إجازة</span></div>${privateReason}</article>`; }).join('')}`;
}

function renderEmployeeReturns() {
  const host = document.querySelector('[data-employee-returns-list]');
  if (!host) return;
  if (!isSystemAdmin()) { host.innerHTML = '<div class="profile-empty-state">هذه الصفحة متاحة لمالك النظام أو مدير النظام فقط.</div>'; return; }
  const query = employeeReturnsSearch.trim().toLocaleLowerCase('ar');
  const eligibleEmployees = employeeRecords.filter((employee) => !employee.archived && !employee.systemHidden && ['leave', 'stopped'].includes(employee.status));
  const filteredEmployees = eligibleEmployees.filter((employee) => !query || [employee.name, employee.id, employee.job].some((value) => String(value || '').toLocaleLowerCase('ar').includes(query)));
  const resultLimit = 25;
  const employees = filteredEmployees.slice(0, resultLimit);
  const resultNote = query
    ? `النتائج ${arabicNumber.format(employees.length)} من ${arabicNumber.format(filteredEmployees.length)}`
    : `${arabicNumber.format(eligibleEmployees.length)} موظفًا لديهم إجازة أو إيقاف · اكتب الاسم أو رقم الموظف للعثور بسرعة`;
  const searchBox = `<label class="employee-search return-employee-search"><span aria-hidden="true">⌕</span><input type="search" data-employee-return-search value="${escapeHtml(employeeReturnsSearch)}" placeholder="ابحث باسم الموظف أو رقمه أو وظيفته" aria-label="البحث عن موظف لتسجيل العودة"></label><p class="profile-note" data-return-results-note>${resultNote}${filteredEmployees.length > resultLimit ? ` · اعرض البحث لتضييق النتائج (${arabicNumber.format(resultLimit)} نتيجة كحد أقصى)` : ''}</p>`;
  if (!eligibleEmployees.length) { host.innerHTML = `${searchBox}<div class="profile-empty-state">لا يوجد موظفون حاليًا في إجازة أو إيقاف يحتاجون إلى تسجيل عودة.</div>`; return; }
  host.innerHTML = `${searchBox}${employees.length ? '' : '<div class="profile-empty-state">لا توجد نتائج مطابقة. جرّب الاسم أو رقم الموظف.</div>'}${employees.map((employee) => {
    const leave = employeeLeaveRecords[employee.id] || {};
    const suspension = employeeStatusDetails[employee.id] || {};
    const isOnLeave = employee.status === 'leave';
    const detail = isOnLeave
      ? `إجازة منذ ${leave.startDate || 'تاريخ غير مسجل'}${leave.reasonCategory ? ` · ${leave.reasonCategory}` : ''}`
      : `إيقاف · ${suspension.category || 'سبب غير محدد'}${suspension.reason ? ` · ${suspension.reason}` : ''}`;
    const returnForm = isOnLeave
      ? leave.startDate && leave.startDate > saudiTodayISO()
        ? '<p class="profile-note">إجازة مجدولة ولم يبدأ وقت العودة بعد.</p>'
        : `<form class="leave-form return-work-form" data-management-return-form data-employee-id="${escapeHtml(employee.id)}"><label>تاريخ العودة الفعلية<input type="date" name="returnDate" max="${saudiTodayISO()}" value="${saudiTodayISO()}" required></label><button class="primary-button" type="submit">تسجيل العودة للعمل</button></form>`
      : `<form class="leave-form return-work-form" data-suspension-return-form data-employee-id="${escapeHtml(employee.id)}"><label>تاريخ العودة الفعلية<input type="date" name="returnDate" max="${saudiTodayISO()}" value="${saudiTodayISO()}" required></label><button class="primary-button" type="submit">إنهاء الإيقاف وتسجيل العودة</button></form>`;
    return `<article class="management-employee-card"><div class="management-employee-head"><div><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.id)} · ${escapeHtml(employee.job)}</small></div><span class="status-badge ${employee.status}">${isOnLeave ? 'إجازة' : 'موقوف'}</span></div><p class="profile-note">${escapeHtml(detail)}</p>${returnForm}</article>`;
  }).join('')}`;
}

let leafletLoadingPromise;
function ensureLeafletLoaded() {
  if (window.L) return Promise.resolve();
  if (leafletLoadingPromise) return leafletLoadingPromise;
  leafletLoadingPromise = new Promise((resolve, reject) => {
    if (!document.querySelector('[data-leaflet-css]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
      stylesheet.dataset.leafletCss = 'true';
      document.head.append(stylesheet);
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
    script.onload = resolve;
    script.onerror = () => reject(new Error('تعذر تحميل مكتبة الخريطة.'));
    document.head.append(script);
  });
  return leafletLoadingPromise;
}

function updateEmployeeSiteMapSelection(latitude, longitude, zoom = false) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;
  selectedEmployeeSiteCoordinates = { latitude, longitude };
  const coordinates = document.querySelector('[data-selected-site-coordinates]');
  if (coordinates) coordinates.textContent = `خط العرض ${latitude.toFixed(6)} · خط الطول ${longitude.toFixed(6)}`;
  if (!employeeSiteMap || !window.L) return;
  const point = [latitude, longitude];
  if (!employeeSiteMarker) employeeSiteMarker = window.L.marker(point).addTo(employeeSiteMap);
  else employeeSiteMarker.setLatLng(point);
  const radius = Math.max(0, Number(document.querySelector('[data-new-site-radius]')?.value) || 0);
  if (!employeeSiteCircle) employeeSiteCircle = window.L.circle(point, { radius, weight: 2, color: '#72951c', fillColor: '#c8ef35', fillOpacity: .2 }).addTo(employeeSiteMap);
  else employeeSiteCircle.setLatLng(point).setRadius(radius);
  if (zoom) employeeSiteMap.setView(point, 15);
}

async function initializeEmployeeSiteMap() {
  const mapElement = document.querySelector('#employee-site-map');
  if (!mapElement) return;
  try {
    await ensureLeafletLoaded();
    if (!mapElement.isConnected) return;
    if (employeeSiteMap) employeeSiteMap.remove();
    mapElement.textContent = '';
    employeeSiteMap = window.L.map(mapElement, { scrollWheelZoom: true }).setView([24.7136, 46.6753], 5);
    employeeSiteMarker = null;
    employeeSiteCircle = null;
    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(employeeSiteMap);
    employeeSiteMap.on('click', (event) => updateEmployeeSiteMapSelection(event.latlng.lat, event.latlng.lng));
    if (selectedEmployeeSiteCoordinates) updateEmployeeSiteMapSelection(selectedEmployeeSiteCoordinates.latitude, selectedEmployeeSiteCoordinates.longitude);
    window.setTimeout(() => employeeSiteMap?.invalidateSize(), 80);
    mapElement.dataset.ready = 'true';
    mapElement.setAttribute('aria-label', 'خريطة تفاعلية: اضغط لتحديد مركز الموقع');
  } catch (error) {
    mapElement.textContent = `${error.message} تحقق من اتصال الإنترنت ثم أعد فتح صفحة معرف اللوكيشن.`;
    mapElement.classList.add('map-load-error');
  }
}

function nextEmployeeLocationId() {
  const ids = employeeSiteNames.map((site, index) => defaultEmployeeSiteGeofence(site, index).locationId);
  const highest = ids.reduce((max, id) => Math.max(max, Number(id.match(/(\d+)$/)?.[1] || 0)), 0);
  return `LOC-${String(highest + 1).padStart(3, '0')}`;
}

function renderEmployeeLocationManagement() {
  const host = document.querySelector('[data-all-employee-locations]');
  if (!host) return;
  const savedSites = employeeSiteNames.map((site, index) => {
    const settings = defaultEmployeeSiteGeofence(site, index);
    const ready = Boolean(settings.latitude && settings.longitude && settings.radiusMeters);
    return `<article class="saved-site-row"><span class="saved-site-status ${ready ? 'ready' : ''} ${settings.active ? '' : 'inactive'}"></span><div class="saved-site-info"><strong>${escapeHtml(site)} <span class="site-state-label ${settings.active ? 'active' : 'inactive'}">${settings.active ? 'نشط' : 'معطل'}</span></strong><small>${escapeHtml(settings.locationId)} · ${ready ? `نطاق السماح ${escapeHtml(settings.radiusMeters)} م` : 'يحتاج تحديده على الخريطة'}</small></div><div class="saved-site-actions"><button type="button" class="secondary-button" data-edit-employee-site="${escapeHtml(site)}">تعديل</button><button type="button" class="secondary-button" data-toggle-employee-site="${escapeHtml(site)}">${settings.active ? 'تعطيل' : 'تشغيل'}</button><button type="button" class="danger-button" data-delete-employee-site="${escapeHtml(site)}">حذف</button></div></article>`;
  }).join('');
  host.innerHTML = `<section class="site-geofence-section">
    <div class="panel-title"><div><h2>إضافة موقع على الخريطة</h2><p>اضغط على الخريطة لتحديد مركز الموقع ثم أدخل اسمه ونطاق البصمة</p></div></div>
    <div class="site-map-editor"><div id="employee-site-map" class="employee-site-map" aria-label="خريطة تفاعلية لاختيار الموقع">جارٍ تحميل الخريطة…</div><form class="site-map-form" data-site-map-form>
      <label>اسم الموقع<input type="text" maxlength="80" placeholder="مثال: موقع المشروع الجديد" data-new-site-name required></label>
      <label>معرف اللوكيشن<input type="text" value="${escapeHtml(editingEmployeeSite ? defaultEmployeeSiteGeofence(editingEmployeeSite, employeeSiteNames.indexOf(editingEmployeeSite)).locationId : nextEmployeeLocationId())}" data-new-site-id readonly></label>
      <label>نطاق السماح بالبصمة (متر)<input type="number" min="1" step="1" data-new-site-radius value="${escapeHtml(editingEmployeeSite ? defaultEmployeeSiteGeofence(editingEmployeeSite, employeeSiteNames.indexOf(editingEmployeeSite)).radiusMeters : '')}" required></label>
      <div class="selected-map-coordinates" data-selected-site-coordinates>${selectedEmployeeSiteCoordinates ? `خط العرض ${selectedEmployeeSiteCoordinates.latitude.toFixed(6)} · خط الطول ${selectedEmployeeSiteCoordinates.longitude.toFixed(6)}` : 'اضغط على الخريطة لاختيار الموقع'}</div>
      <button class="primary-button" type="submit">${editingEmployeeSite ? 'حفظ تعديلات الموقع' : 'حفظ الموقع الجديد'}</button>
      ${editingEmployeeSite ? '<button class="secondary-button" type="button" data-cancel-edit-site>إلغاء التعديل</button>' : ''}
    </form></div>
    <p class="profile-note">GPS يُستخدم لحظة البصمة للتحقق من أن الموظف داخل النطاق المسموح، ولا يوجد تتبع مستمر.</p>
  </section>
  <section class="saved-site-section"><div class="panel-title"><div><h2>المواقع المضافة</h2><p>${arabicNumber.format(employeeSiteNames.length)} مواقع محفوظة</p></div></div><div class="saved-site-list">${savedSites || '<div class="profile-empty-state">لم تضف مواقع بعد.</div>'}</div></section>`;
  initializeEmployeeSiteMap();
}

function renderEmployeeLocationAssignment() {
  const host = document.querySelector('[data-all-employee-location-assignments]');
  if (!host) return;
  const employeeChoices = employeeRecords.filter((employee) => !employee.archived && !employee.systemHidden).map((employee) => `<label class="bulk-employee-choice" data-bulk-employee-choice><input type="checkbox" name="bulk-employee" value="${employee.id}"><span><strong>${escapeHtml(employee.name)}</strong><small>${employee.id} · ${escapeHtml(employee.job)}</small></span><i class="status-badge ${employee.status}">${employeeStatus[employee.status]}</i></label>`).join('');
  const bulkSites = employeeSiteNames.map((site, index) => {
    const settings = defaultEmployeeSiteGeofence(site, index);
    return `<label class="bulk-site-choice ${settings.active ? '' : 'inactive'}" data-bulk-site-choice><input type="checkbox" name="bulk-site" value="${escapeHtml(site)}" ${settings.active ? '' : 'disabled'}><span><strong>${escapeHtml(site)}${settings.active ? '' : ' · معطل'}</strong><small>${escapeHtml(settings.locationId)} · ${settings.radiusMeters ? `نطاق ${escapeHtml(settings.radiusMeters)} م` : 'يحتاج إعداد النطاق'}</small></span></label>`;
  }).join('');
  host.innerHTML = `<form class="bulk-location-assignment" data-bulk-location-assignment>
    <div class="panel-title"><div><h2>اختيار المواقع</h2><p>اختر أو ابحث باسم الموقع، أو أظهر كل المواقع وحدد ما تريده</p></div></div>
    <section class="bulk-selection-panel"><div class="bulk-selection-title"><h3>١. المواقع المضافة</h3><label class="select-all-control"><input type="checkbox" data-select-all-sites><span>تحديد كل المواقع</span></label></div><div class="bulk-site-tools"><input type="search" class="bulk-employee-search" placeholder="اختر أو اكتب اسم الموقع" data-location-site-search aria-label="بحث المواقع المضافة"><button type="button" class="secondary-button" data-toggle-all-sites-visibility aria-expanded="false">إظهار كل المواقع</button></div><div class="bulk-choice-list bulk-site-list collapsed" data-bulk-site-list>${bulkSites || '<p class="profile-note">أضف المواقع أولًا من صفحة معرف لوكيشن.</p>'}</div><div class="bulk-selection-count" data-selected-sites-count>لم يتم اختيار مواقع</div></section>
    <section class="bulk-selection-panel"><div class="bulk-selection-title"><h3>٢. الموظفون</h3><label class="select-all-control"><input type="checkbox" data-select-all-employees><span>اختيار كل الموظفين</span></label></div><input type="search" class="bulk-employee-search" placeholder="ابحث باسم الموظف أو رقمه" data-location-employee-search aria-label="بحث الموظفين للتعيين"><p class="bulk-search-hint">تحديد الكل يختار نتائج البحث الظاهرة.</p><div class="bulk-choice-list bulk-employee-list">${employeeChoices || '<p class="profile-note">لا يوجد موظفون في القائمة الحالية.</p>'}</div><div class="bulk-selection-count" data-selected-employees-count>لم يتم اختيار موظفين</div></section>
    <div class="bulk-assignment-actions"><label>طريقة التطبيق<select data-location-assignment-mode><option value="replace">استبدال المواقع المحددة وإزالة المواقع الحالية</option><option value="add">إضافة المواقع المحددة إلى المواقع الحالية</option></select></label><button class="primary-button" type="submit">تطبيق على الموظفين المحددين</button></div>
  </form>`;
  updateBulkLocationSelectionCounts();
}

function saveEmployeeCustodyRecords() {
  localStorage.setItem('nagm-employee-custodies', JSON.stringify(employeeCustodyRecords));
}

function renderEmployeeCustodyManagement() {
  const host = document.querySelector('[data-all-employee-custodies]');
  if (!host) return;
  const query = employeeCustodySearch.trim().toLocaleLowerCase('ar');
  const visibleRecords = employeeCustodyRecords.filter((item) => {
    if (employeeCustodyFilter === 'office' && item.status !== 'office') return false;
    if (employeeCustodyFilter === 'employees' && item.status !== 'assigned') return false;
    const employee = employeeRecords.find((record) => record.id === item.employeeId);
    if (item.status === 'assigned' && employee?.systemHidden) return false;
    return !query || [item.statement, item.serial, item.phoneNumber, employee?.name, employee?.id].some((value) => String(value || '').toLocaleLowerCase('ar').includes(query));
  });
  const rows = visibleRecords.map((item) => {
    const employee = employeeRecords.find((record) => record.id === item.employeeId);
    const formerEmployee = employeeRecords.find((record) => record.id === item.lastEmployeeId);
    const status = item.status === 'assigned' ? `مع الموظف: ${employee ? `${escapeHtml(employee.name)} · ${employee.id}` : 'غير محدد'}` : `في المكتب${item.lastReturnDate ? ` · آخر عودة من ${escapeHtml(formerEmployee?.name || 'موظف')} بتاريخ ${escapeHtml(item.lastReturnDate)}` : ''}`;
    const action = item.status === 'office'
      ? openEmployeeCustodyAction?.id === item.id && openEmployeeCustodyAction.action === 'assign'
        ? `<form class="custody-inline-form" data-custody-assign-form data-custody-id="${escapeHtml(item.id)}"><label>الموظف<select name="employeeId" required><option value="">اختر الموظف</option>${employeeRecords.filter((record) => !record.archived && !record.systemHidden).map((record) => `<option value="${record.id}">${escapeHtml(record.name)} · ${record.id}</option>`).join('')}</select></label><label>تاريخ استلام الموظف<input type="date" name="receivedDate" value="${saudiTodayISO()}" required></label><button class="primary-button" type="submit">تأكيد التسليم</button><button class="secondary-button" type="button" data-cancel-custody-action>إلغاء</button></form>`
        : `<button type="button" class="primary-button" data-assign-custody="${escapeHtml(item.id)}">تسليم لموظف</button>`
      : openEmployeeCustodyAction?.id === item.id && openEmployeeCustodyAction.action === 'return'
        ? `<form class="custody-inline-form" data-custody-return-form data-custody-id="${escapeHtml(item.id)}"><label>تاريخ استلام المكتب<input type="date" name="returnDate" value="${saudiTodayISO()}" required></label><button class="primary-button" type="submit">تأكيد استلام المكتب</button><button class="secondary-button" type="button" data-cancel-custody-action>إلغاء</button></form>`
        : `<button type="button" class="secondary-button" data-return-custody="${escapeHtml(item.id)}">تسليم العهدة للمكتب</button>`;
    return `<article class="custody-row"><div class="custody-row-main"><strong>${escapeHtml(item.statement)}</strong><small>${status} · ${item.status === 'assigned' ? `استلام ${escapeHtml(item.receivedDate || 'غير مسجل')}` : 'متاحة للتسليم'}</small><small>السيريال: ${escapeHtml(item.serial || 'غير مسجل')} · رقم الخط: ${escapeHtml(item.phoneNumber || 'لا ينطبق')} · القيمة: ${arabicNumber.format(Number(item.value) || 0)} ر.س${item.documentName ? ` · مرفق: ${escapeHtml(item.documentName)}` : ''}</small></div><div class="custody-row-actions">${action}</div></article>`;
  }).join('');
  const visibleEmployeeCustodies = employeeCustodyRecords.filter((item) => item.status === 'assigned' && !employeeRecords.find((employee) => employee.id === item.employeeId)?.systemHidden);
  const counts = { all: employeeCustodyRecords.filter((item) => item.status === 'office').length + visibleEmployeeCustodies.length, office: employeeCustodyRecords.filter((item) => item.status === 'office').length, employees: visibleEmployeeCustodies.length };
  host.innerHTML = `<section class="profile-panel custody-create-panel"><h3>تسجيل عهدة جديدة</h3><p class="profile-note">سجّل بيانات الصنف مرة واحدة؛ يبقى في المكتب حتى تسليمه لموظف.</p><form class="custody-create-form" data-custody-create-form><label>بيان العهدة<input name="statement" type="text" maxlength="140" placeholder="مثال: هاتف جوال أو شريحة اتصال" required></label><label>السيريال<input name="serial" type="text" maxlength="80" placeholder="الرقم التسلسلي"></label><label>رقم الخط<input name="phoneNumber" type="tel" maxlength="30" placeholder="رقم الشريحة إن وجد"></label><label>القيمة (ر.س)<input name="value" type="number" min="0" step="0.01" placeholder="0" required></label><label>ورقة / مستند<input name="document" type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"></label><button class="primary-button" type="submit">حفظ العهدة في المكتب</button></form><p class="profile-note">المرفقات محفوظة محليًا في هذه المعاينة، ويمكن فتحها من سجل العهدة وملف الموظف.</p></section><section class="profile-panel"><div class="panel-title"><div><h3>سجل العهد</h3><p>العهد في المكتب والعهد المسلّمة للموظفين</p></div></div><div class="custody-toolbar"><div class="custody-filters" role="group" aria-label="تصفية العهد">${[['all','كل العهد'],['office','في المكتب'],['employees','على الموظفين']].map(([key,label]) => `<button type="button" class="count-filter ${employeeCustodyFilter === key ? 'active' : ''}" data-custody-filter="${key}" aria-pressed="${employeeCustodyFilter === key}">${label} <b>${arabicNumber.format(counts[key])}</b></button>`).join('')}</div><input type="search" class="bulk-employee-search" data-custody-search placeholder="ابحث بالبيان أو السيريال أو الموظف" aria-label="بحث العهد"></div><div class="custody-record-list">${rows || '<div class="profile-empty-state">لا توجد عهد مطابقة. سجّل عهدة جديدة أو غيّر البحث.</div>'}</div></section>`;
}

function updateBulkLocationSelectionCounts() {
  const siteInputs = [...document.querySelectorAll('[data-bulk-location-assignment] input[name="bulk-site"]')].filter((input) => !input.disabled);
  const siteCount = siteInputs.filter((input) => input.checked).length;
  const employeeCount = document.querySelectorAll('[data-bulk-location-assignment] input[name="bulk-employee"]:checked').length;
  const sitesCount = document.querySelector('[data-selected-sites-count]');
  const employeesCount = document.querySelector('[data-selected-employees-count]');
  if (sitesCount) sitesCount.textContent = siteCount ? `تم اختيار ${arabicNumber.format(siteCount)} مواقع` : 'لم يتم اختيار مواقع';
  if (employeesCount) employeesCount.textContent = employeeCount ? `تم اختيار ${arabicNumber.format(employeeCount)} موظفًا` : 'لم يتم اختيار موظفين';
  const employeeInputs = [...document.querySelectorAll('[data-bulk-location-assignment] input[name="bulk-employee"]:not([hidden])')];
  const allSites = document.querySelector('[data-select-all-sites]');
  const allEmployees = document.querySelector('[data-select-all-employees]');
  if (allSites) { allSites.checked = siteInputs.length > 0 && siteCount === siteInputs.length; allSites.indeterminate = siteCount > 0 && siteCount < siteInputs.length; allSites.disabled = siteInputs.length === 0; }
  if (allEmployees) {
    const visible = employeeInputs.filter((input) => !input.closest('[data-bulk-employee-choice]')?.hidden);
    const visibleSelected = visible.filter((input) => input.checked).length;
    allEmployees.checked = visible.length > 0 && visibleSelected === visible.length;
    allEmployees.indeterminate = visibleSelected > 0 && visibleSelected < visible.length;
  }
}

function applyBulkEmployeeSearch(query) {
  const normalized = query.trim().toLocaleLowerCase('ar');
  document.querySelectorAll('[data-bulk-employee-choice]').forEach((choice) => {
    const matches = !normalized || choice.textContent.toLocaleLowerCase('ar').includes(normalized);
    choice.hidden = !matches;
  });
  updateBulkLocationSelectionCounts();
}

function applyBulkSiteSearch(query) {
  const normalized = query.trim().toLocaleLowerCase('ar');
  document.querySelectorAll('[data-bulk-site-choice]').forEach((choice) => {
    choice.hidden = Boolean(normalized) && !choice.textContent.toLocaleLowerCase('ar').includes(normalized);
  });
  const siteList = document.querySelector('[data-bulk-site-list]');
  const toggle = document.querySelector('[data-toggle-all-sites-visibility]');
  if (normalized && siteList?.classList.contains('collapsed')) {
    siteList.classList.remove('collapsed');
    if (toggle) { toggle.setAttribute('aria-expanded', 'true'); toggle.textContent = 'إخفاء المواقع الإضافية'; }
  }
  updateBulkLocationSelectionCounts();
}

function punchPeriodStatus(punch, employeeId) {
  const assignment = punch.periodSnapshot || employeeWorkPeriodForDate(employeeId, punch.date);
  if (!assignment && currentEmployeeWorkPeriod(employeeId)) {
    const current = currentEmployeeWorkPeriod(employeeId);
    return { label: 'خارج تاريخ سريان الفترة', window: periodDisplay(current), kind: 'outside' };
  }
  if (!assignment) return { label: 'لا توجد فترة معيّنة', window: 'غير محددة', kind: 'no-period' };
  if ((assignment.fromDate && punch.date < assignment.fromDate) || (assignment.toDate && punch.date > assignment.toDate)) {
    return { label: 'خارج تاريخ سريان الفترة', window: periodDisplay(assignment), kind: 'outside' };
  }
  const segments = periodSegments(assignment);
  if (segments.length > 1) {
    const punchMinutes = periodTimeMinutes(punch.time.slice(0, 5));
    const before = Number(assignment.beforeMinutes) || 0;
    const after = Number(assignment.afterMinutes) || 0;
    const firstStart = periodTimeMinutes(segments[0].startTime);
    const lastEnd = periodTimeMinutes(segments.at(-1).endTime);
    const candidates = [punchMinutes, punchMinutes + 1440, punchMinutes - 1440];
    let label = 'خارج وقت الفترتين';
    let kind = 'outside';
    for (const minute of candidates) {
      const segmentIndex = segments.findIndex((segment) => minute >= periodTimeMinutes(segment.startTime) && minute <= periodTimeMinutes(segment.endTime));
      if (segmentIndex >= 0) { label = `داخل الجزء ${segmentIndex + 1}`; kind = 'on-time'; break; }
      if (minute >= firstStart - before && minute < firstStart) { label = 'سماح قبل الجزء الأول'; kind = 'grace'; break; }
      if (minute > lastEnd && minute <= lastEnd + after) { label = 'سماح بعد الجزء الثاني'; kind = 'grace'; break; }
    }
    return { label, window: periodDisplay(assignment), kind };
  }
  const start = periodTimeMinutes(assignment.startTime);
  let end = periodTimeMinutes(assignment.endTime);
  if (assignment.endDay === 'next' || end <= start) end += 1440;
  const punchMinutes = periodTimeMinutes(punch.time.slice(0, 5));
  const before = Number(assignment.beforeMinutes) || 0;
  const after = Number(assignment.afterMinutes) || 0;
  const minuteCandidates = [punchMinutes, punchMinutes + 1440, punchMinutes - 1440];
  let label = 'خارج وقت الفترة';
  let kind = 'outside';
  for (const minute of minuteCandidates) {
    if (minute >= start && minute <= end) { label = 'داخل الفترة'; kind = 'on-time'; break; }
    if (minute >= start - before && minute < start) { label = 'سماح قبل البداية'; kind = 'grace'; break; }
    if (minute > end && minute <= end + after) { label = 'سماح بعد النهاية'; kind = 'grace'; break; }
  }
  return { label, window: `${assignment.startTime}–${assignment.endTime}${assignment.endDay === 'next' ? ' · اليوم التالي' : ''}`, kind };
}

function employeeWorkPeriodForDate(employeeId, date) {
  const history = employeeWorkPeriodHistory(employeeId);
  if (history.length) return [...history].reverse().find((period) => (!period.fromDate || date >= period.fromDate) && (!period.toDate || date <= period.toDate));
  const legacy = employeeWorkPeriods[employeeId];
  if (!legacy || (legacy.fromDate && date < legacy.fromDate) || (legacy.toDate && date > legacy.toDate)) return null;
  return legacy;
}

function renderCompanyPunchTable() {
  const body = document.querySelector('[data-punch-table-body]');
  if (!body) return;
  const dateError = punchRange === 'custom' && (!punchFromDate || !punchToDate
    ? 'حدد تاريخ البداية والنهاية لعرض السجلات.'
    : punchToDate < punchFromDate ? 'تاريخ «إلى» يجب أن يكون في نفس تاريخ «من» أو بعده.' : '');
  const warning = document.querySelector('[data-punch-date-warning]');
  warning.textContent = dateError;
  warning.hidden = !dateError;
  let fromDate = saudiTodayISO();
  let toDate = fromDate;
  if (punchRange === 'yesterday') fromDate = toDate = shiftSaudiDate(saudiTodayISO(), -1);
  if (punchRange === 'custom') { fromDate = punchFromDate; toDate = punchToDate; }
  visibleCompanyPunches = dateError ? [] : getCompanyAttendanceRecords().filter((punch) => {
    if (punch.date < fromDate || punch.date > toDate) return false;
    if (punchEmployeeId !== 'all' && punch.employeeId !== punchEmployeeId) return false;
    if (punchSourceFilter !== 'all' && punchMethodLabel(punch) !== punchSourceFilter) return false;
    const employee = employeeRecords.find((record) => record.id === punch.employeeId);
    const explicitlyViewingArchivedEmployee = isSystemAdmin() && punchEmployeeId === employee?.id;
    return employee && (!employee.systemHidden || explicitlyViewingArchivedEmployee) && (!employee.archived || explicitlyViewingArchivedEmployee) && employee.sponsor === 'الشركة' && (!punchQuery || `${employee.name} ${employee.id} ${employee.job} ${punch.site}`.toLocaleLowerCase('ar').includes(punchQuery));
  }).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  body.innerHTML = visibleCompanyPunches.map((punch) => {
    const employee = employeeRecords.find((record) => record.id === punch.employeeId);
    const period = punchPeriodStatus(punch, punch.employeeId);
    const date = new Intl.DateTimeFormat('ar-EG', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(punch.timestamp));
    const time = new Intl.DateTimeFormat('ar-EG', { timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).format(new Date(punch.timestamp));
    const branch = employee.residence.split('—').pop().trim() || '—';
    const method = punchMethodLabel(punch);
    const isManual = method === 'تحضير يدوي';
    const isAlternate = method === 'حضور بديل';
    const methodDetail = method === 'GPS' ? `داخل نطاق ${escapeHtml(punch.geofenceRadiusMeters || '')} م` : method === 'تصحيح بصمة معتمد' ? `طلب ${escapeHtml(punch.correctionRequestId || 'معتمد')}` : isAlternate ? `${escapeHtml(punchDeviceLabel(punch))} · معتمد ${punch.alternateRequestId ? `<button class="secondary-button" type="button" data-open-alternate-photo="${escapeHtml(punch.alternateRequestId)}">عرض صورة الإثبات</button>` : ''}` : method;
    return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${employee.id} · ${escapeHtml(employee.job)}</small></td><td>${escapeHtml(branch)}</td><td>${escapeHtml(punch.department)}</td><td><strong>${escapeHtml(punch.site)}</strong></td><td><span class="punch-time">${escapeHtml(time)}</span><small>${escapeHtml(date)}</small></td><td><span>${escapeHtml(period.window)}</span>${isManual || isAlternate ? `<small>نهاية الدوام ${escapeHtml(punch.departureTime || '')}</small>` : ''}</td><td><span class="punch-period-status ${isManual || isAlternate ? 'on-time' : period.kind}">${escapeHtml(period.label)}</span></td><td><span class="punch-method-tag">${escapeHtml(method)}</span><small>${methodDetail}</small></td><td>${escapeHtml(punchDeviceLabel(punch))}</td></tr>`;
  }).join('');
  document.querySelector('[data-punch-count]').textContent = arabicNumber.format(visibleCompanyPunches.length);
  document.querySelector('[data-punch-empty]').hidden = visibleCompanyPunches.length > 0 || Boolean(dateError);
  document.querySelector('[data-punch-updated]').textContent = new Intl.DateTimeFormat('ar-EG', { timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).format(new Date());
}

function attendanceSiteForEmployee(employee) {
  const allowed = employeeAllowedSites[employee.id] || [];
  const activeAssignedSite = allowed.find((site) => {
    const index = employeeSiteNames.indexOf(site);
    return index >= 0 && defaultEmployeeSiteGeofence(site, index).active;
  });
  return activeAssignedSite || employee.site;
}

function manualAttendancePlan(employeeId, date) {
  const employee = employeeRecords.find((record) => record.id === employeeId && !record.archived && !record.systemHidden && record.sponsor === 'الشركة');
  if (!employee || !date) return { error: 'اختر الموظف وتاريخ الدوام.' };
  const period = employeeWorkPeriodForDate(employee.id, date);
  if (!period) return { error: 'لا توجد فترة عمل سارية لهذا الموظف في التاريخ المحدد. عيّن له فترة تغطي هذا التاريخ أولًا.' };
  if (getCompanyAttendanceRecords().some((record) => record.employeeId === employee.id && record.date === date)) return { error: 'يوجد حضور أو بصمة مسجلة لهذا الموظف في التاريخ المحدد، ولن نكررها.' };
  return { employee, date, period, site: attendanceSiteForEmployee(employee) };
}

function renderManualAttendancePreview() {
  const form = document.querySelector('[data-manual-attendance-form]');
  if (!form) return;
  const preview = form.querySelector('[data-manual-attendance-preview]');
  const submit = form.querySelector('[data-save-manual-attendance]');
  const plan = manualAttendancePlan(manualAttendanceEmployeeId, manualAttendanceDate);
  if (plan.error) {
    preview.textContent = manualAttendanceEmployeeId ? plan.error : 'اختر الموظف والتاريخ لعرض الفترة والموقع.';
    submit.disabled = true;
    return;
  }
  const endDate = plan.period.endDay === 'next' ? shiftSaudiDate(plan.date, 1) : plan.date;
  preview.textContent = `سيُسجّل دوام كامل لـ${plan.employee.name} يوم ${plan.date}: ${periodDisplay(plan.period)} · إجمالي العمل الفعلي ${arabicNumber.format(Math.floor(periodWorkMinutes(plan.period) / 60))} س ${arabicNumber.format(periodWorkMinutes(plan.period) % 60)} د${plan.period.endDay === 'next' ? ` · ينتهي ${endDate}` : ''} · ${plan.site}.`;
  submit.disabled = false;
}

function renderAttendanceManagement() {
  const reportMode = app.dataset.currentView === 'attendance-report';
  document.querySelector('.attendance-management-heading h2').textContent = reportMode ? 'تقرير الحضور اليومي' : 'إدارة البصمات';
  document.querySelector('[data-toggle-manual-attendance]').hidden = reportMode;
  const employeeSelect = document.querySelector('[data-punch-employee]');
  if (!employeeSelect) return;
  employeeSelect.length = 1;
  const reportEmployees = employeeRecords.filter((employee) =>
    employee.sponsor === 'الشركة' && ((!employee.archived && !employee.systemHidden) || (isSystemAdmin() && employee.id === punchEmployeeId)),
  );
  reportEmployees.forEach((employee) => employeeSelect.add(new Option(`${employee.name} · ${employee.id}`, employee.id)));
  if (punchEmployeeId !== 'all' && !reportEmployees.some((employee) => employee.id === punchEmployeeId)) punchEmployeeId = 'all';
  employeeSelect.value = punchEmployeeId;
  const fromInput = document.querySelector('[data-punch-from]');
  const toInput = document.querySelector('[data-punch-to]');
  fromInput.value = punchFromDate;
  toInput.value = punchToDate;
  document.querySelector('[data-punch-custom-dates]').hidden = punchRange !== 'custom';
  document.querySelectorAll('[data-punch-range]').forEach((button) => {
    const active = button.dataset.punchRange === punchRange;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelector('[data-punch-search]').value = punchQuery;
  const sourceSelect = document.querySelector('[data-punch-source]');
  if (sourceSelect) sourceSelect.value = punchSourceFilter;
  const manualPanel = document.querySelector('[data-manual-attendance-panel]');
  manualPanel.hidden = !manualAttendanceFormOpen || reportMode;
  const manualEmployeeSelect = document.querySelector('[data-manual-attendance-employee]');
  manualEmployeeSelect.length = 1;
  reportEmployees.forEach((employee) => manualEmployeeSelect.add(new Option(`${employee.name} · ${employee.id}`, employee.id)));
  if (!reportEmployees.some((employee) => employee.id === manualAttendanceEmployeeId)) manualAttendanceEmployeeId = '';
  manualEmployeeSelect.value = manualAttendanceEmployeeId;
  const manualDateInput = document.querySelector('[data-manual-attendance-date]');
  manualDateInput.value = manualAttendanceDate;
  renderManualAttendancePreview();
  renderCompanyPunchTable();
}

function exportCompanyPunches() {
  if (!visibleCompanyPunches.length) { notify('لا توجد بصمات لتصديرها ضمن الاختيار الحالي.'); return; }
  const columns = ['اسم الموظف', 'رقم الموظف', 'الوظيفة', 'الفرع', 'الإدارة', 'الموقع', 'التاريخ', 'وقت الحضور', 'وقت الانصراف المحدد', 'الفترة المحددة', 'طريقة التحضير', 'الجهاز المستخدم', 'حالة الفترة'];
  const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const rows = visibleCompanyPunches.map((punch) => {
    const employee = employeeRecords.find((record) => record.id === punch.employeeId);
    const period = punchPeriodStatus(punch, employee.id);
    const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh' }).format(new Date(punch.timestamp));
    return [employee.name, employee.id, employee.job, employee.residence.split('—').pop().trim(), punch.department, punch.site, date, punch.time, punch.departureTime || '', period.window, punchMethodLabel(punch), punchDeviceLabel(punch), period.label];
  });
  const csv = `\uFEFF${[columns, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n')}`;
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = `بصمات-موظفي-الشركة-${punchRange}.csv`; link.click(); URL.revokeObjectURL(url);
}

function renderEmployeeManagementPage(view) {
  if (view === 'employee-manager-assignments') renderEmployeeManagerAssignment();
  if (view === 'employee-periods') renderEmployeePeriodManagement();
  if (view === 'employee-period-assignments') renderEmployeePeriodAssignment();
  if (view === 'employee-leaves') renderEmployeeLeaveManagement();
  if (view === 'employee-extras') renderEmployeeFinancialManagement();
  if (view === 'employee-returns') renderEmployeeReturns();
  if (view === 'employee-locations') renderEmployeeLocationManagement();
  if (view === 'employee-location-assignments') renderEmployeeLocationAssignment();
  if (view === 'employee-custody') renderEmployeeCustodyManagement();
  if (view === 'attendance-management' || view === 'attendance-report') renderAttendanceManagement();
}

function setCurrentView(view, title) {
  if (view === 'employee-location-ids') view = 'employee-location-assignments';
  if (view === 'employee-extras' && !isSystemAdmin() && !overtimeCanSubmit()) { notify('الإضافيات المالية ظاهرة لمالك النظام فقط، وتسجيل العمل متاح لمهندس الموقع أو مسؤول الموقع المعيّن.'); view = 'employees'; }
  if (view === 'daily-disbursements' && !canManageDailyDisbursements()) { notify('المبالغ المنصرفة اليومية متاحة لمالك النظام أو موظفي الموارد البشرية.'); view = 'dashboard'; }
  if (view === 'approval-settings' && !isSystemAdmin()) { notify('إعداد سلاسل الاعتماد متاح لمالك النظام أو مدير النظام فقط.'); view = 'my-approvals'; }
  if (view === 'accounts' && !isSystemAdmin()) { notify('إدارة الحسابات متاحة لمالك النظام أو مدير النظام فقط.'); view = 'dashboard'; }
  if (view === 'ratings' && !isSystemAdmin() && !sessionRoleValues().has('engineer')) { notify('صفحة التقييمات متاحة للمهندسين ومالك النظام فقط.'); view = 'dashboard'; }
  if (view === 'my-approvals' && !canAccessMyApprovals()) { notify('لا توجد موافقات مسندة إلى الحساب الحالي.'); view = 'dashboard'; }
  if (view === 'rental-assignment' && !canCreateRentalDirectHire()) { notify('صفحة تعيين العمالة الإيجارية متاحة للمهندس أو مالك النظام.'); view = 'dashboard'; }
  if (view === 'change-requests' && !isSystemAdmin()) { notify('طلبات التعديل والحذف متاحة لمالك النظام أو مدير النظام فقط.'); view = 'dashboard'; }
  if (view === 'employee-returns' && !isSystemAdmin()) { notify('تسجيل العودة للعمل متاح لمالك النظام أو مدير النظام فقط.'); view = 'dashboard'; }
  if (view === 'employee-manager-assignments' && !isSystemAdmin()) { notify('تعيين المدير المباشر متاح لمالك النظام أو مدير النظام فقط.'); view = 'employees'; }
  const dashboard = view === 'dashboard';
  app.dataset.currentView = view;
  document.querySelector('.period-control').hidden = !dashboard;
  document.querySelector('.dashboard-content').hidden = !dashboard;
  document.querySelector('[data-attendance-management]').hidden = view !== 'attendance-management' && view !== 'attendance-report';
  document.querySelector('[data-employees-view]').hidden = view !== 'employees';
  document.querySelector('[data-employee-profile]').hidden = view !== 'profile';
  document.querySelectorAll('[data-employee-management]').forEach((section) => { section.hidden = !(view === `employee-${section.dataset.employeeManagement}`); });
  document.querySelector('[data-rental-workers]').hidden = view !== 'rental-workers';
  document.querySelector('[data-rental-profile]').hidden = view !== 'rental-profile';
  document.querySelector('[data-rental-assignment]').hidden = view !== 'rental-assignment';
  document.querySelector('[data-preparation-view]').hidden = view !== 'preparation';
  document.querySelectorAll('[data-rental-placeholder]').forEach((section) => { section.hidden = section.dataset.rentalPlaceholder !== view; });
  document.querySelector('[data-my-approvals]').hidden = view !== 'my-approvals';
  document.querySelector('[data-my-requests]').hidden = view !== 'my-requests';
  document.querySelector('[data-approval-settings]').hidden = view !== 'approval-settings';
  document.querySelector('[data-accounts]').hidden = view !== 'accounts';
  document.querySelector('[data-ratings]').hidden = view !== 'ratings';
  document.querySelector('[data-change-requests]').hidden = view !== 'change-requests';
  document.querySelector('[data-daily-disbursements]').hidden = view !== 'daily-disbursements';
  document.querySelector('[data-alternate-attendance]').hidden = view !== 'alternate-attendance';
  const sectionTitles = {
    employees: 'الموظفون', profile: 'لوحة الموظف',
    'attendance-management': 'إدارة البصمات',
    'attendance-report': 'تقرير الحضور اليومي',
    'employee-manager-assignments': 'تعيين مدير مباشر', 'employee-periods': 'الفترات', 'employee-period-assignments': 'تعيين فترة', 'employee-locations': 'معرف لوكيشن', 'employee-location-assignments': 'تعيين معرف لوكيشن', 'employee-custody': 'العهد', 'employee-leaves': 'إجازات الموظفين', 'employee-extras': 'الإضافيات', 'employee-returns': 'العودة للعمل',
    'rental-workers': 'قائمة العمالة الإيجارية', 'rental-profile': 'ملف العامل الإيجاري', 'rental-assignment': 'تعيين عمالة إيجارية',
    preparation: 'تحضير العمالة الإيجارية', 'rental-payroll': 'مسيرات العمالة الإيجارية',
    'rental-statements': 'كشف حسابات العمالة الإيجارية',
    'my-approvals': 'موافقاتي', 'my-requests': 'طلباتي', ratings: 'التقييمات', 'approval-settings': 'إعداد سلاسل الاعتماد', 'change-requests': 'طلبات التعديل والحذف', 'daily-disbursements': 'المبالغ المنصرفة اليومية', accounts: 'الحسابات والصلاحيات',
    'alternate-attendance': 'الحضور البديل',
  };
  const sectionTitle = sectionTitles[view] || 'الموظفون';
  document.querySelector('.page-title h1').textContent = title || (dashboard ? 'لوحة التحكم' : sectionTitle);
  const pageSubtitle = dashboard ? 'نجم الغدراء للمقاولات <span>·</span> مركز تكلفة العمالة' : `${sectionTitle} <span>·</span> ${view.endsWith('profile') || view === 'profile' ? 'اللوحة الداخلية' : 'القائمة'}`;
  document.querySelector('.page-title p').innerHTML = pageSubtitle;
  const selectedNav = dashboard ? 'dashboard' : view === 'preparation' || view.startsWith('rental') ? 'rental-group' : 'employees';
  document.querySelectorAll('.side-nav [data-view]').forEach((button) => button.classList.toggle('selected', button.dataset.view === view || (view === 'rental-profile' && button.dataset.view === 'rental-workers')));
  const employeeGroup = document.querySelector('[data-employee-nav-group]');
  const employeeToggle = document.querySelector('[data-employee-nav-toggle]');
  const employeeSubnav = document.querySelector('[data-employee-subnav]');
  const isEmployeeView = view === 'employees' || view === 'profile' || view.startsWith('employee-');
  employeeGroup.classList.toggle('has-selected', isEmployeeView);
  if (isEmployeeView) { employeeSubnav.hidden = false; employeeToggle.setAttribute('aria-expanded', 'true'); }
  else { employeeSubnav.hidden = true; employeeToggle.setAttribute('aria-expanded', 'false'); }
  document.querySelectorAll('[data-employee-subnav] [data-view]').forEach((button) => button.classList.toggle('selected', button.dataset.view === view || (view === 'profile' && button.dataset.view === 'employees')));
  if (view.startsWith('employee-') || view === 'attendance-management' || view === 'attendance-report') renderEmployeeManagementPage(view);
  if (view === 'my-approvals') renderMyApprovals();
  if (view === 'my-requests') renderMyRequests();
  if (view === 'rental-assignment') renderRentalAssignmentPage();
  if (view === 'approval-settings') renderApprovalSettings();
  if (view === 'accounts') renderAccounts();
  if (view === 'ratings') renderRatings();
  if (view === 'change-requests') renderChangeRequests();
  if (view === 'daily-disbursements') renderDailyDisbursements();
  if (view === 'alternate-attendance') renderAlternateAttendance();
  const rentalGroup = document.querySelector('[data-rental-nav-group]');
  const rentalToggle = document.querySelector('[data-rental-nav-toggle]');
  const rentalSubnav = document.querySelector('[data-rental-subnav]');
  const isRentalView = selectedNav === 'rental-group';
  rentalGroup.classList.toggle('has-selected', isRentalView);
  if (isRentalView) { rentalSubnav.hidden = false; rentalToggle.setAttribute('aria-expanded', 'true'); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelector('[data-rental-nav-toggle]').addEventListener('click', (event) => {
  const toggle = event.currentTarget;
  const submenu = document.querySelector('[data-rental-subnav]');
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  submenu.hidden = expanded;
});

document.querySelector('[data-employee-nav-toggle]').addEventListener('click', () => {
  selectedEmployee = null;
  setCurrentView('employees');
  closeMenu();
});

document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => {
  selectedEmployee = null;
  document.querySelector('.system-view-shortcuts')?.removeAttribute('open');
  setCurrentView(button.dataset.view);
  closeMenu();
}));

app.addEventListener('click', (event) => {
  const engineerPreviewLink=event.target.closest('[data-system-engineer-preview]');
  if(engineerPreviewLink){document.querySelector('.system-view-shortcuts')?.removeAttribute('open');setCurrentView('employee-extras');const preview=document.querySelector('[data-overtime-layout-preview]');if(preview){preview.open=true;preview.scrollIntoView({behavior:'smooth',block:'center'});}return;}
  if (event.target.closest('[data-overtime-export]')) { if (!isSystemAdmin()) return; exportOvertimeCsv(); return; }
  const statusTab=event.target.closest('[data-overtime-status-tab]');
  if(statusTab){const host=statusTab.closest('[data-employee-extras-content]');host.dataset.overtimeSelectedBatch='';host.querySelectorAll('[data-overtime-status-tab]').forEach((tab)=>tab.classList.toggle('is-active',tab===statusTab));applyOvertimeWorkspaceFilters();return;}
  if(event.target.closest('[data-overtime-show-all]')){const host=event.target.closest('[data-employee-extras-content]');host.dataset.overtimeSelectedBatch='';applyOvertimeWorkspaceFilters();return;}
  const overtimeTile = event.target.closest('[data-overtime-batch-open]');
  if (overtimeTile) { const id = overtimeTile.dataset.overtimeBatchOpen; const host=overtimeTile.closest('[data-employee-extras-content]');host.dataset.overtimeSelectedBatch=id;applyOvertimeWorkspaceFilters();const table = host.querySelector('.overtime-table-wrap'); table?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  const overtimeEmployeeToggle = event.target.closest('[data-overtime-employee-toggle]');
  if (overtimeEmployeeToggle) { const form=overtimeEmployeeToggle.closest('[data-create-overtime-batch]'); const select=form?.querySelector('[name="employeeIds"]'); const option=[...select?.options || []].find((item)=>item.value===overtimeEmployeeToggle.dataset.overtimeEmployeeToggle); if(option&&!option.disabled)option.selected=!option.selected; refreshOvertimeEmployeePicker(form); return; }
  const overtimeRemoveSelected = event.target.closest('[data-overtime-remove-selected]');
  if (overtimeRemoveSelected) { const form=overtimeRemoveSelected.closest('[data-create-overtime-batch]'); const option=[...form?.querySelector('[name="employeeIds"]')?.options || []].find((item)=>item.value===overtimeRemoveSelected.dataset.overtimeRemoveSelected); if(option)option.selected=false; refreshOvertimeEmployeePicker(form); return; }
  if (event.target.closest('[data-overtime-select-visible]')) { const form=event.target.closest('[data-create-overtime-batch]'); const select=form?.querySelector('[name="employeeIds"]'); form?.querySelectorAll('.overtime-employee-results [data-overtime-employee-toggle]:not([hidden])').forEach((button)=>{ const option=[...select.options].find((item)=>item.value===button.dataset.overtimeEmployeeToggle); if(option&&!option.disabled)option.selected=true; }); refreshOvertimeEmployeePicker(form); return; }
  const overtimeDemo = event.target.closest('[data-overtime-demo]');
  if (overtimeDemo) {
    if (!isSystemAdmin()) return;
    const people = overtimeDirectory().filter((person) => person.active).slice(0, 3); if (!people.length) { notify('أضف موظفًا واحدًا على الأقل لعرض بيانات التجربة.'); return; }
    const batch = `DEMO-${Date.now()}`; const today = new Date(); today.setDate(today.getDate() - ((today.getDay() + 1) % 7 || 7)); const date = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`; const actor = window.NAGM_SESSION?.displayName || 'مدير النظام';
    people.forEach((person,index) => { const status = index < 2 ? 'approved' : 'pending'; employeeFinancialItems.unshift({ id:`OT-${Date.now()}-${index}`, employeeId:person.employeeId, employeeName:person.name, employeeCode:person.code, identityNumber:person.identity, jobTitle:person.job, workerType:person.workerType, paymentMethod:person.paymentMethod, type:'overtime', overtimeKind:'holiday', overtimeBatchId:batch, description:'جمعة تجريبية — موقع العيون', site:'موقع العيون', date, quantity:1, unit:'يوم', amount: index === 0 ? 250 : 0, approvalStatus:status, paymentStatus:index === 0 ? 'paid' : 'unpaid', paidAt:index === 0 ? saudiTodayISO() : '', paymentNote:index === 0 ? 'تم الصرف في التصفية' : '', approvalStages:[], stageIndex:0, approvalHistory:status==='approved'?[{stage:'مهندس الموقع',name:'م. أحمد — تجربة',account:'demo-engineer',action:'approved',at:new Date().toISOString()},{stage:'مدير المشاريع',name:'مدير المشاريع — تجربة',account:'demo-pm',action:'approved',at:new Date().toISOString()}]:[], createdAt:new Date().toISOString(), createdById:sessionIdentifier(), createdByName:actor, demoRecord:true, history:[{action:'demo-created',actorId:sessionIdentifier(),actorName:actor,at:new Date().toISOString()}] }); }); saveEmployeeFinancialItems(); renderEmployeeFinancialManagement(); notify('أضيفت مجموعة تجربة: جمعة معتمدة، موظف مصروف له، وطلب بانتظار الاعتماد.'); return;
  }
  if (event.target.closest('[data-overtime-demo-clear]')) { if (!isSystemAdmin()) return; const count=employeeFinancialItems.filter((item)=>item.demoRecord).length; for (let index=employeeFinancialItems.length-1; index>=0; index-=1) if (employeeFinancialItems[index].demoRecord) employeeFinancialItems.splice(index,1); saveEmployeeFinancialItems(); renderEmployeeFinancialManagement(); notify(`تم مسح ${arabicNumber.format(count)} سجلًا تجريبيًا.`); return; }
  const overtimeAction = event.target.closest('[data-overtime-approve], [data-overtime-mark-paid], [data-overtime-transfer], [data-overtime-save-amount]');
  if (overtimeAction) {
    if (!isSystemAdmin()) { notify('الإجراء المالي متاح لمالك النظام فقط.'); return; }
    const item = employeeFinancialItems.find((record) => record.id === (overtimeAction.dataset.overtimeApprove || overtimeAction.dataset.overtimeMarkPaid || overtimeAction.dataset.overtimeTransfer || overtimeAction.dataset.overtimeSaveAmount) && record.overtimeBatchId);
    if (!item) return;
    const now = new Date().toISOString(); const actor = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.fullName || sessionIdentifier();
    if (overtimeAction.hasAttribute('data-overtime-approve')) {
      if (item.approvalStatus !== 'pending') { notify('هذه الإضافة ليست بانتظار اعتماد.'); return; }
      const stage = overtimeCurrentStage(item); if (!isSystemAdmin() && (stage.mode !== 'account' || stage.value !== sessionIdentifier())) { notify('الإضافة تنتظر حساب المسؤول المحدد في السلسلة.'); return; }
      const signatureFileId = leaveSignatureForAccount(stage.value) || '';
      item.approvalHistory ||= []; item.approvalHistory.push({ stage:stage.label || approverStageLabel(stage), stageIndex:stage.index, account:sessionIdentifier(), name:actor, signatureFileId, action:'approved', at:now }); item.stageIndex = stage.index + 1;
      if (item.stageIndex >= (item.approvalStages || []).length) { item.approvalStatus = 'approved'; item.fullyApprovedAt = now; item.fullyApprovedById = sessionIdentifier(); item.fullyApprovedByName = actor; }
      item.history ||= []; item.history.push({ action:item.approvalStatus === 'approved' ? 'fully-approved' : 'stage-approved', actorId:sessionIdentifier(), actorName:actor, stage:stage.label || approverStageLabel(stage), at:now }); saveEmployeeFinancialItems(); leaveAudit('overtime-batch-stage-approved',item.id,{stage:stage.label || approverStageLabel(stage),status:item.approvalStatus}); renderEmployeeFinancialManagement(); notify(item.approvalStatus === 'approved' ? 'اكتملت سلسلة اعتماد الإضافي.' : 'تم اعتماد مرحلة المهندس، وانتقل الطلب إلى مدير المشاريع.'); return;
    }
    if (overtimeAction.hasAttribute('data-overtime-save-amount')) { const amount = Number(document.querySelector(`[data-overtime-amount="${CSS.escape(item.id)}"]`)?.value); if (!Number.isFinite(amount) || amount < 0) { notify('أدخل قيمة صحيحة.'); return; } item.amount = Math.round(amount*100)/100; item.history ||= []; item.history.push({action:'amount-updated',actorId:sessionIdentifier(),actorName:actor,at:now}); saveEmployeeFinancialItems(); renderEmployeeFinancialManagement(); notify('حُفظت قيمة الإضافي.'); return; }
    if (item.approvalStatus !== 'approved') { notify('لا يمكن تسجيل الصرف قبل اكتمال الاعتماد.'); return; }
    item.paymentNote = document.querySelector(`[data-overtime-payment-note="${CSS.escape(item.id)}"]`)?.value.trim() || '';
    if (overtimeAction.hasAttribute('data-overtime-transfer')) { if (item.workerType !== 'rental' || item.accountTransferredAt) { notify('الترحيل متاح للعامل الإيجاري غير المرحّل فقط.'); return; } item.paymentStatus = 'transferred-to-account'; item.accountTransferredAt = saudiTodayISO(); item.accountTransferredBy = actor; item.accountCredit = Number(item.amount) || 0; item.paymentNote ||= 'ترحيل موجب إلى حساب العامل الإيجاري'; rentalStatementEntries.unshift({ id:`LEDGER-OT-${item.id}`, workerId:String(item.employeeId).replace(/^rental:/,''), type:'addition', date:item.date, description:`إضافي ${item.description} — ترحيل من سجل الإضافيات`, amount:Number(item.amount)||0, status:'active', source:'overtime-transfer', financialItemId:item.id, createdAt:now, createdBy:sessionIdentifier(), createdByName:actor, history:[{action:'added-from-overtime',actorId:sessionIdentifier(),actorName:actor,at:now,description:item.description,amount:Number(item.amount)||0,type:'addition'}] }); saveRentalStatementEntries(); }
    else { if (item.accountTransferredAt || ['paid','paid-with-settlement'].includes(item.paymentStatus)) { notify('تم صرف هذا البند أو ترحيله مسبقًا، ولن يُسجل مرة أخرى.'); return; } item.paymentStatus = 'paid'; item.paidAt = saudiTodayISO(); item.paidById = sessionIdentifier(); item.paidByName = actor; }
    item.history ||= []; item.history.push({ action:item.paymentStatus, actorId:sessionIdentifier(),actorName:actor,at:now,note:item.paymentNote,amount:item.amount }); saveEmployeeFinancialItems(); leaveAudit('overtime-payment-updated',item.id,{status:item.paymentStatus,amount:item.amount,note:item.paymentNote}); renderEmployeeFinancialManagement(); notify(item.paymentStatus === 'paid' ? 'تم تسجيل الصرف.' : 'رُحّل المبلغ إلى حساب العامل الإيجاري بالموجب.'); return;
  }
  const leaveFilter = event.target.closest('[data-leave-management-filter]');
  if (leaveFilter) {
    const list = leaveFilter.closest('.leave-request-list');
    list?.querySelectorAll('[data-leave-management-filter]').forEach((button) => button.classList.toggle('is-active', button === leaveFilter));
    list?.querySelectorAll('[data-leave-request-card]').forEach((card) => { card.hidden = leaveFilter.dataset.leaveManagementFilter !== 'all' && card.dataset.leaveState !== leaveFilter.dataset.leaveManagementFilter; });
    return;
  }
  const selectManagerVisible = event.target.closest('[data-select-manager-visible]');
  if (selectManagerVisible) {
    const host = selectManagerVisible.closest('[data-employee-manager-assignment]');
    host?.querySelectorAll('[data-manager-assignment-row]:not([hidden]) input[name="employeeId"]').forEach((input) => { input.checked = true; });
    return;
  }
  if (event.target.matches('[data-manager-select-all]')) {
    const host = event.target.closest('[data-employee-manager-assignment]');
    host?.querySelectorAll('[data-manager-assignment-row]:not([hidden]) input[name="employeeId"]').forEach((input) => { input.checked = event.target.checked; });
    return;
  }
  const overtimeDecision = event.target.closest('[data-overtime-decision]');
  if (overtimeDecision) {
    const record = employeeFinancialItems.find((item) => item.id === overtimeDecision.dataset.overtimeId && item.workflowRequest && item.approvalStatus === 'pending');
    if (!record || !overtimeCanApprove(record)) { notify('طلب الإضافي لا ينتظر إجراءً من الحساب الحالي.'); return; }
    const stage = overtimeCurrentStage(record); const now = new Date().toISOString(); const note = overtimeDecision.closest('.overtime-approval-card')?.querySelector('[data-overtime-note]')?.value.trim() || '';
    if (overtimeDecision.dataset.overtimeDecision === 'reject') {
      if (note.length < 5) { notify('اكتب سبب رفض الإضافة في الملاحظات.'); return; }
      record.approvalStatus = 'rejected'; record.rejectedAt = now; record.rejectedById = sessionIdentifier(); record.rejectedByName = window.NAGM_SESSION?.displayName || sessionIdentifier(); record.rejectionReason = note;
      record.approvalHistory ||= []; record.approvalHistory.push({ stage: approverStageLabel(stage), action: 'rejected', account: sessionIdentifier(), name: record.rejectedByName, note, at: now });
      record.history ||= []; record.history.push({ action: 'rejected', actorId: sessionIdentifier(), actorName: record.rejectedByName, at: now, note });
      saveEmployeeFinancialItems(); leaveAudit('employee-overtime-rejected', record.id, { note, stage: approverStageLabel(stage) }); renderMyApprovals(); renderEmployeeFinancialManagement(); notify('تم رفض طلب العمل الإضافي مع حفظ السبب.'); return;
    }
    if (isSystemAdmin() && !stage.final) {
      record.approvalHistory ||= [];
      for (const skipped of record.approvalStages.slice(stage.index)) record.approvalHistory.push({ stage: approverStageLabel(skipped), action: 'skipped-by-owner', account: sessionIdentifier(), name: window.NAGM_SESSION?.displayName || sessionIdentifier(), note, at: now });
      record.stageIndex = record.approvalStages.length;
      record.approvalStatus = 'approved'; record.fullyApprovedAt = now; record.fullyApprovedById = sessionIdentifier(); record.fullyApprovedByName = window.NAGM_SESSION?.displayName || sessionIdentifier();
      record.approvalHistory.push({ stage: 'الاعتماد النهائي للموارد البشرية', action: 'approved', account: sessionIdentifier(), name: record.fullyApprovedByName, note, at: now });
    } else if (stage.final) {
      record.approvalStatus = 'approved'; record.fullyApprovedAt = now; record.fullyApprovedById = sessionIdentifier(); record.fullyApprovedByName = window.NAGM_SESSION?.displayName || sessionIdentifier();
      record.approvalHistory ||= []; record.approvalHistory.push({ stage: 'الاعتماد النهائي للموارد البشرية', action: 'approved', account: sessionIdentifier(), name: record.fullyApprovedByName, note, at: now });
    } else {
      record.approvalHistory ||= []; record.approvalHistory.push({ stage: approverStageLabel(stage), stageIndex: stage.index, action: 'approved', account: sessionIdentifier(), name: window.NAGM_SESSION?.displayName || sessionIdentifier(), signatureFileId: leaveSignatureForAccount(sessionIdentifier()) || '', note, at: now });
      record.stageIndex = stage.index + 1;
      if (record.stageIndex >= record.approvalStages.length && (isSystemAdmin() || record.ownerApprovalRequired === false)) { record.approvalStatus = 'approved'; record.fullyApprovedAt = now; record.fullyApprovedById = sessionIdentifier(); record.fullyApprovedByName = window.NAGM_SESSION?.displayName || sessionIdentifier(); }
    }
    if (record.approvalStatus === 'pending') record.history.push({ action: 'stage-approved', actorId: sessionIdentifier(), actorName: window.NAGM_SESSION?.displayName || sessionIdentifier(), at: now, stage: approverStageLabel(stage), note });
    if (record.approvalStatus === 'approved') { record.history.push({ action: 'fully-approved', actorId: sessionIdentifier(), actorName: window.NAGM_SESSION?.displayName || sessionIdentifier(), at: now, note }); }
    reopenEmployeeLeaveProcedures(record.employeeId, 'تحديث حالة اعتماد العمل الإضافي', record.id);
    saveEmployeeFinancialItems(); leaveAudit(record.approvalStatus === 'approved' ? 'employee-overtime-approved' : 'employee-overtime-stage-approved', record.id, { stage: approverStageLabel(stage), note, approvalStatus: record.approvalStatus }); renderMyApprovals(); renderEmployeeFinancialManagement(); notify(record.approvalStatus === 'approved' ? 'اكتملت اعتمادات الإضافة؛ لم يتم تسجيل صرفها.' : `تم اعتماد المرحلة. الطلب الآن عند ${approverStageLabel(overtimeCurrentStage(record))}.`); return;
  }
  const financialDecision = event.target.closest('[data-financial-decision]');
  if (financialDecision) {
    if (!leaveFinanceManager()) { notify('مراجعة البنود المالية متاحة للموارد البشرية ومدير النظام.'); return; }
    const item = employeeFinancialItems.find((record) => record.id === financialDecision.dataset.financialId && record.approvalStatus === 'pending');
    if (!item || item.workflowRequest) { notify('هذا الطلب يتبع سلسلة اعتماد؛ راجعه من قسم الإضافيات في موافقاتي.'); return; }
    if (item.systemAdminOnly && !isSystemAdmin()) { notify('مراجعة اقتراح المكافأة متاحة لمدير النظام فقط.'); return; }
    item.approvalStatus = financialDecision.dataset.financialDecision === 'approve' ? 'approved' : 'rejected';
    item.reviewedAt = new Date().toISOString(); item.reviewedById = sessionIdentifier(); item.reviewedByName = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.fullName || sessionIdentifier();
    item.history ||= []; item.history.push({ action: item.approvalStatus, actorId: item.reviewedById, actorName: item.reviewedByName, at: item.reviewedAt });
    if (item.approvalStatus === 'approved') reopenEmployeeLeaveProcedures(item.employeeId, 'اعتماد بند مالي جديد', item.id);
    saveEmployeeFinancialItems(); leaveAudit(`financial-item-${item.approvalStatus}`, item.id, { employeeId: item.employeeId, amount: item.amount }); renderEmployeeFinancialManagement();
    notify(item.approvalStatus === 'approved' ? 'تم اعتماد البند؛ لم يُسجل كمدفوع.' : 'تم رفض البند المالي.'); return;
  }
  const settlementAction = event.target.closest('[data-settlement-action="approve"]');
  if (settlementAction) {
    if (!leaveFinanceManager()) { notify('اعتماد التصفية متاح للموارد البشرية أو مدير النظام.'); return; }
    const settlement = employeeLeaveSettlements.find((item) => item.id === settlementAction.dataset.settlementId && item.status === 'draft');
    if (!settlement) { notify('مسودة التصفية غير متاحة للاعتماد.'); return; }
    settlement.status = 'approved'; settlement.statusLabel = 'معتمدة · بانتظار الصرف'; settlement.approvedAt = new Date().toISOString(); settlement.approvedById = sessionIdentifier(); settlement.approvedByName = window.NAGM_SESSION?.displayName || sessionIdentifier();
    settlement.history ||= []; settlement.history.push({ action: 'approved', actorId: settlement.approvedById, actorName: settlement.approvedByName, at: settlement.approvedAt });
    saveEmployeeLeaveSettlements(); leaveAudit('leave-settlement-approved', settlement.id, { leaveRequestId: settlement.leaveRequestId, amount: settlement.netAmount }); renderEmployeeFinancialManagement(); notify('اعتمدت التصفية. لم يتم تسجيل الصرف؛ أكّد الصرف الفعلي بعد التنفيذ.'); return;
  }
  const exportFinancials = event.target.closest('[data-export-leave-financial-report]');
  if (exportFinancials) {
    const search = exportFinancials.closest('.profile-panel')?.querySelector('[data-financial-filter-text]')?.value.trim().toLocaleLowerCase('ar') || '';
    const status = exportFinancials.closest('.profile-panel')?.querySelector('[data-financial-filter-status]')?.value || '';
    const payment = exportFinancials.closest('.profile-panel')?.querySelector('[data-financial-filter-payment]')?.value || '';
    const site = exportFinancials.closest('.profile-panel')?.querySelector('[data-financial-filter-site]')?.value || '';
    const from = exportFinancials.closest('.profile-panel')?.querySelector('[data-financial-filter-from]')?.value || '';
    const to = exportFinancials.closest('.profile-panel')?.querySelector('[data-financial-filter-to]')?.value || '';
    const rows = employeeFinancialItems.filter((item) => {
      if (item.systemAdminOnly && !isSystemAdmin()) return false;
      const employee = employeeRecords.find((record) => record.id === item.employeeId);
      return (!search || `${employee?.name || ''} ${item.employeeId} ${item.description}`.toLocaleLowerCase('ar').includes(search)) && (!status || item.approvalStatus === status) && (!payment || financialPaymentFilterValue(item) === payment) && (!site || item.site === site) && (!from || item.date >= from) && (!to || item.date <= to);
    });
    const columns = ['الموظف','كود الموظف','الموقع','النوع','البيان','التاريخ','الكمية','الوحدة','القيمة','حالة الاعتماد','حالة الصرف','رقم التصفية','أضافه'];
    const cell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
    const csv = `\uFEFF${[columns, ...rows.map((item) => { const employee = employeeRecords.find((record) => record.id === item.employeeId); return [employee?.name || '', item.employeeId, item.site || '', leaveFinancialTypes[item.type] || item.type, item.description, item.date, item.quantity, item.unit, item.amount, item.approvalStatus, financialPaymentFilterValue(item), item.settlementNumber || item.reservedSettlementNumber || '', item.createdByName || '']; })].map((row) => row.map(cell).join(',')).join('\r\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = `تقرير-مستحقات-الإجازات-${saudiTodayISO()}.csv`; link.click(); URL.revokeObjectURL(url); return;
  }
  const exportPaidSettlementReport = event.target.closest('[data-export-paid-settlement-report]');
  if (exportPaidSettlementReport) {
    if (!leaveFinanceManager()) { notify('تقرير تصفيات الإجازات متاح للموارد البشرية ومدير النظام.'); return; }
    const panel = exportPaidSettlementReport.closest('.profile-panel'); const rows = currentPaidSettlementRows(panel);
    const headings = ['الموظف','الكود','الموقع','نوع البند','البيان','تاريخ البند','رقم التصفية','تاريخ الصرف','القيمة','طريقة الصرف','رقم المرجع'];
    const cell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
    const credits = panel?.querySelector('[data-paid-settlement-credits]')?.textContent || '0';
    const deductions = panel?.querySelector('[data-paid-settlement-deductions]')?.textContent || '0';
    const csv = `\uFEFF${[headings, ...rows, ['إجمالي المستحقات المصروفة', '', '', '', '', '', '', '', credits], ['إجمالي الخصومات المسجلة', '', '', '', '', '', '', '', deductions]].map((row) => row.map(cell).join(',')).join('\r\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = `الإضافيات-المصروفة-مع-التصفية-${saudiTodayISO()}.csv`; link.click(); URL.revokeObjectURL(url); return;
  }
  const printPaidSettlementReport = event.target.closest('[data-print-paid-settlement-report]');
  if (printPaidSettlementReport) {
    if (!leaveFinanceManager()) { notify('تقرير تصفيات الإجازات متاح للموارد البشرية ومدير النظام.'); return; }
    const panel = printPaidSettlementReport.closest('.profile-panel'); const rows = currentPaidSettlementRows(panel);
    const headings = ['الموظف','الكود','الموقع','نوع البند','البيان','تاريخ البند','رقم التصفية','تاريخ الصرف','القيمة','طريقة الصرف','رقم المرجع'];
    const printWindow = window.open('', '_blank');
    if (!printWindow) { notify('اسمح بفتح نافذة جديدة لطباعة التقرير أو حفظه PDF.'); return; }
    const credits = panel?.querySelector('[data-paid-settlement-credits]')?.textContent || '0';
    const deductions = panel?.querySelector('[data-paid-settlement-deductions]')?.textContent || '0';
    const count = panel?.querySelector('[data-paid-settlement-count]')?.textContent || '0';
    printWindow.document.write(`<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>الإضافيات المصروفة مع التصفية</title><style>body{font:12px Arial;margin:20px;color:#162430}h1{text-align:center}.totals{display:flex;gap:20px;justify-content:space-around;padding:10px;background:#edf3f5}table{border-collapse:collapse;width:100%}th,td{border:1px solid #8999a3;padding:6px;text-align:right}th{background:#edf3f5}button{margin:12px}@media print{button{display:none}}</style><h1>الإضافيات والبنود المصروفة مع التصفية</h1><p class="totals"><span>المستحقات: ${escapeHtml(credits)}</span><span>الخصومات: ${escapeHtml(deductions)}</span><span>عدد البنود: ${escapeHtml(count)}</span></p><button onclick="window.print()">طباعة / حفظ PDF</button><table><thead><tr>${headings.map((value) => `<th>${escapeHtml(value)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></html>`);
    printWindow.document.close(); return;
  }
  const exportLeaveRequests = event.target.closest('[data-export-leave-requests]');
  if (exportLeaveRequests) {
    const panel = exportLeaveRequests.closest('.profile-panel'); const rows = currentLeaveReportRows(panel); const headings = ['الموظف','الكود','الموقع','القسم','المدير المباشر','تاريخ الطلب','فترة الإجازة','حالة الطلب','الحالة التشغيلية','متوقف عند','تاريخ الاعتماد','التصفية','إغلاق الإجراءات'];
    const cell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`; const csv = `\uFEFF${[headings, ...rows].map((row) => row.map(cell).join(',')).join('\r\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = `تقرير-الإجازات-${saudiTodayISO()}.csv`; link.click(); URL.revokeObjectURL(url); return;
  }
  const printLeaveReport = event.target.closest('[data-print-leave-report]');
  if (printLeaveReport) {
    const panel = printLeaveReport.closest('.profile-panel'); const rows = currentLeaveReportRows(panel); const headings = ['الموظف','الكود','الموقع','القسم','المدير المباشر','تاريخ الطلب','فترة الإجازة','حالة الطلب','الحالة التشغيلية','متوقف عند','تاريخ الاعتماد','التصفية','إغلاق الإجراءات']; const printWindow = window.open('', '_blank');
    if (!printWindow) { notify('اسمح بفتح نافذة جديدة لطباعة التقرير أو حفظه PDF.'); return; }
    printWindow.document.write(`<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>تقرير الإجازات</title><style>body{font:12px Arial;margin:20px;color:#162430}h1{text-align:center}table{border-collapse:collapse;width:100%}th,td{border:1px solid #8999a3;padding:6px;text-align:right}th{background:#edf3f5}button{margin:12px}@media print{button{display:none}}</style><h1>تقرير طلبات الإجازة والتصفية</h1><button onclick="window.print()">طباعة / حفظ PDF</button><table><thead><tr>${headings.map((value) => `<th>${escapeHtml(value)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></html>`); printWindow.document.close(); return;
  }
  const addLeaveStage = event.target.closest('[data-add-leave-stage]');
  if (addLeaveStage) {
    const form = addLeaveStage.closest('form'); const template = form?.querySelector('[data-leave-chain-template]'); const rows = form?.querySelector('[data-leave-chain-rows]');
    if (template && rows) { rows.append(template.content.firstElementChild.cloneNode(true)); updateLeaveChainNumbers(rows); }
    return;
  }
  const removeLeaveStage = event.target.closest('[data-remove-leave-stage]');
  if (removeLeaveStage) { const rows = removeLeaveStage.closest('[data-leave-chain-rows]'); removeLeaveStage.closest('[data-leave-chain-row]')?.remove(); if (rows) updateLeaveChainNumbers(rows); return; }
  const printLeave = event.target.closest('[data-print-leave-document]');
  if (printLeave) { printLeaveDocument(printLeave.dataset.printLeaveDocument).catch((error) => notify(error.message || 'تعذر تجهيز نموذج الإجازة للطباعة.')); return; }
  const openLeaveReceipt = event.target.closest('[data-open-leave-receipt]');
  if (openLeaveReceipt) {
    const settlement = employeeLeaveSettlements.find((item) => item.id === openLeaveReceipt.dataset.openLeaveReceipt && item.receiptFileId);
    if (!settlement || (!isSystemAdmin() && !leaveFinanceManager())) { notify('إثبات الصرف غير متاح لهذا الحساب.'); return; }
    getEmployeeFiles(settlement.employeeId).then((files) => { const file = files.find((item) => item.id === settlement.receiptFileId); if (!file) { notify('لم يتم العثور على ملف إثبات الصرف.'); return; } window.open(URL.createObjectURL(file.blob), '_blank', 'noopener'); }).catch((error) => notify(error.message || 'تعذر فتح إثبات الصرف.'));
    return;
  }
  const openAlternatePhoto = event.target.closest('[data-open-alternate-photo]');
  if (openAlternatePhoto) {
    const request = alternateAttendanceRequests.find((item) => item.id === openAlternatePhoto.dataset.openAlternatePhoto);
    const allowed = request && (isSystemAdmin() || request.employeeId === currentEmployeeForSession()?.id || request.requestedBy === sessionIdentifier() || alternateAttendanceCanApprove(request));
    if (!allowed || !request.photoFileId) { notify('صورة إثبات الحضور غير متاحة لهذا الحساب.'); return; }
    getEmployeeFiles(request.employeeId).then((files) => { const file = files.find((item) => item.id === request.photoFileId); if (!file) { notify('لم يتم العثور على صورة إثبات الحضور.'); return; } window.open(URL.createObjectURL(file.blob), '_blank', 'noopener'); }).catch((error) => notify(error.message || 'تعذر فتح الصورة.'));
    return;
  }
  const hireProof = event.target.closest('[data-open-hire-proof]');
  if (hireProof && !rentalAssignmentView.contains(hireProof)) { openRentalHireProof(hireProof.dataset.openHireProof); return; }
  const approveDeletion = event.target.closest('[data-approve-deletion-request]');
  if (approveDeletion) {
    if (!isSystemAdmin()) { notify('الموافقة على طلبات الحذف متاحة لمالك النظام أو مدير النظام فقط.'); return; }
    const request = changeDeletionRequests.find((item) => item.id === approveDeletion.dataset.approveDeletionRequest && item.status === 'pending');
    if (!request) { notify('طلب الحذف غير موجود أو تمت مراجعته بالفعل.'); renderChangeRequests(); return; }
    request.reviewedAt = new Date().toISOString(); request.reviewedById = sessionIdentifier(); request.reviewedBy = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.account || 'مدير النظام';
    applyApprovedDeletion(request).then(() => {
      request.status = 'approved';
      saveChangeDeletionRequests(); renderChangeRequests();
      if (request.type === 'rental-account-entry' && selectedRentalWorker?.id === request.employeeId) renderRentalProfileSection(selectedRentalWorker, 'statement');
      notify(`تمت الموافقة وحذف «${request.recordLabel}».`);
    }).catch((error) => { delete request.reviewedAt; delete request.reviewedById; delete request.reviewedBy; notify(error.message || 'تعذر تنفيذ الحذف بعد الموافقة.'); });
    return;
  }
  const rejectDeletion = event.target.closest('[data-reject-deletion-request]');
  if (rejectDeletion) {
    if (!isSystemAdmin()) { notify('رفض طلبات الحذف متاح لمالك النظام أو مدير النظام فقط.'); return; }
    const request = changeDeletionRequests.find((item) => item.id === rejectDeletion.dataset.rejectDeletionRequest && item.status === 'pending');
    if (!request) { notify('طلب الحذف غير موجود أو تمت مراجعته بالفعل.'); renderChangeRequests(); return; }
    request.status = 'rejected'; request.reviewedAt = new Date().toISOString(); request.reviewedById = sessionIdentifier(); request.reviewedBy = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.account || 'مدير النظام';
    if (request.type === 'rental-account-entry') {
      const entry = rentalStatementEntries.find((item) => item.id === request.recordId && item.workerId === request.employeeId);
      if (entry) { const actor = { actorId: request.reviewedById, actorName: request.reviewedBy }; entry.history ||= []; entry.history.push({ action: 'delete-request-rejected', ...actor, at: request.reviewedAt, requesterId: request.requesterId, requesterName: request.requesterName, description: entry.description, amount: entry.amount }); saveRentalStatementEntries(); if (selectedRentalWorker?.id === entry.workerId) renderRentalProfileSection(selectedRentalWorker, 'statement'); }
    } else if (request.type === 'daily-disbursement') {
      const entry = dailyDisbursements.find((item) => item.id === request.recordId);
      if (entry) { entry.history ||= []; entry.history.push({ action: 'delete-request-rejected', actorId: request.reviewedById, actorName: request.reviewedBy, at: request.reviewedAt, requesterId: request.requesterId, requesterName: request.requesterName }); saveDailyDisbursements(); renderDailyDisbursements(); }
    }
    saveChangeDeletionRequests(); renderChangeRequests(); notify('تم رفض الطلب، وظل السجل كما هو.'); return;
  }
  const approvalTab = event.target.closest('[data-my-approvals-filter]');
  if (approvalTab) { myApprovalsFilter = approvalTab.dataset.myApprovalsFilter; renderMyApprovals(); return; }
  const approveCorrection = event.target.closest('[data-approve-correction]');
  if (approveCorrection) { notify(approveCorrectionRequest(approveCorrection.dataset.approveCorrection)); return; }
  const rejectCorrection = event.target.closest('[data-reject-correction]');
  if (rejectCorrection) { notify(rejectCorrectionRequest(rejectCorrection.dataset.rejectCorrection)); return; }
  const approveAlternateAttendance = event.target.closest('[data-approve-alternate-attendance]');
  if (approveAlternateAttendance) { notify(decideAlternateAttendance(approveAlternateAttendance.dataset.approveAlternateAttendance, 'approve')); return; }
  const rejectAlternateAttendance = event.target.closest('[data-reject-alternate-attendance]');
  if (rejectAlternateAttendance) { notify(decideAlternateAttendance(rejectAlternateAttendance.dataset.rejectAlternateAttendance, 'reject')); return; }
  const employeeRequestDecision = event.target.closest('[data-decide-employee-request]');
  if (employeeRequestDecision) { notify(decideEmployeeGeneralRequest(employeeRequestDecision.dataset.requestId, employeeRequestDecision.dataset.decideEmployeeRequest)); return; }
  const approveLeaveStage = event.target.closest('[data-approve-leave-stage]');
  if (approveLeaveStage) {
    const requestId = approveLeaveStage.dataset.approveLeaveStage;
    const note = document.querySelector(`[data-leave-approval-note="${CSS.escape(requestId)}"]`)?.value || '';
    notify(requestApprovalStep(requestId, note)); return;
  }
  const returnLeave = event.target.closest('[data-return-leave-request]');
  if (returnLeave) {
    const request = employeeLeaveRequests.find((item) => item.id === returnLeave.dataset.returnLeaveRequest && !['approved', 'rejected'].includes(item.status));
    const stage = request && leaveRequestCurrentStage(request);
    const note = returnLeave.closest('.leave-approval-action')?.querySelector('[data-leave-revision-note]')?.value.trim() || '';
    if (!request || request.requestedBy === sessionIdentifier() || (!isSystemAdmin() && !userCanApproveStage(stage))) { notify('إعادة الطلب متاحة للمسؤول الحالي في سلسلة الاعتماد أو مدير النظام.'); return; }
    if (!note) { notify('اكتب ملاحظة توضح ما يلزم استكماله.'); return; }
    request.status = 'needs-revision'; request.revisionNote = note; request.returnedAt = new Date().toISOString(); request.returnedBy = window.NAGM_SESSION?.displayName || sessionIdentifier();
    request.approvalHistory ||= []; request.approvalHistory.push({ stage: approverStageLabel(stage), account: sessionIdentifier(), name: request.returnedBy, action: 'returned-for-revision', note, at: request.returnedAt });
    leaveAudit('leave-returned-for-revision', request.id, { note }); saveEmployeeLeaveRequests(); renderEmployeeLeaveManagement(); renderMyApprovals(); renderMyRequests(); notify('أُعيد طلب الإجازة للاستكمال مع حفظ ملاحظتك.'); return;
  }
  const approveDirectHire = event.target.closest('[data-approve-direct-hire]');
  if (approveDirectHire) { notify(advanceDirectHireStage(approveDirectHire.dataset.approveDirectHire)); return; }
  const finalizeHire = event.target.closest('[data-finalize-direct-hire]');
  if (finalizeHire) {
    const card = finalizeHire.closest('.management-employee-card');
    const note = card?.querySelector('.direct-hire-review-note textarea')?.value || '';
    const wage = card?.querySelector('[name="approvedWage"]')?.value || '';
    finalizeDirectHire(finalizeHire.dataset.finalizeDirectHire, note, wage).then(notify).catch((error) => notify(error.message));
    return;
  }
  const returnHire = event.target.closest('[data-return-direct-hire]');
  if (returnHire) {
    const note = returnHire.closest('.management-employee-card')?.querySelector('.direct-hire-review-note textarea')?.value || '';
    notify(returnDirectHireForRevision(returnHire.dataset.returnDirectHire, note)); return;
  }
  const submitPreparation = event.target.closest('[data-submit-rental-preparation]');
  if (submitPreparation) {
    const selected = rentalRecords.filter((worker) => selectedPrepWorkerIds.has(worker.id));
    const config = approvalChainConfigs['rental-preparation'];
    const allowedSubmitter = !isSystemAdmin() && config.submitters.some((role) => sessionRoleValues().has(role));
    if (!allowedSubmitter) { notify('رفع تحضير العمالة الإيجارية متاح للمهندس أو المراقب المحدد في سلسلة الاعتماد.'); return; }
    if (!isPrepRangeValid() || !selected.length || selected.some(hasPreparationDuplicate)) { notify('تغيرت البيانات أو يوجد عامل سبق تحضيره؛ حدّث الاختيارات ثم أعد المعاينة.'); renderPrepWorkers(); return; }
    if (!config.stages.length || config.stages.some((stage) => stage.mode === 'account' && stage.value === sessionIdentifier())) { notify('سلسلة الاعتماد غير مكتملة أو تتضمن حساب مُعدّ التحضير نفسه. عدّل سلسلة الاعتماد أولًا.'); return; }
    const siteRouting = rentalPreparationApprovalStages(prepSite.value, sessionIdentifier());
    if (siteRouting.error) { notify(siteRouting.error); return; }
    const session = window.NAGM_SESSION || {};
    rentalPreparationRequests.unshift({
      id: `PREP-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      workerIds: selected.map((worker) => worker.id), site: prepSite.value,
      startDate: prepDateStart.value, endDate: prepDateEnd.value,
      siteEngineerId: siteRouting.engineerId,
      requesterName: preparerName, requestedBy: sessionIdentifier(),
      requesterType: [...sessionRoleValues()].find((role) => config.submitters.includes(role)) || 'system-admin',
      approvalStages: siteRouting.stages, stageIndex: 0, approvalHistory: [],
      status: 'pending-approval', createdAt: new Date().toISOString(),
    });
    saveRentalPreparationRequests();
    selectedPrepWorkerIds.clear();
    document.querySelector('[data-prep-preview]').hidden = true;
    renderPrepWorkers(); renderPreparationLog(); renderMyApprovals();
    notify('تم إرسال التحضير للاعتماد وحفظه في قائمة الطلبات.');
    return;
  }
  const approvePreparation = event.target.closest('[data-approve-preparation]');
  if (approvePreparation) { notify(advancePreparationApproval(approvePreparation.dataset.approvePreparation)); return; }
  const rejectPreparation = event.target.closest('[data-reject-preparation]');
  if (rejectPreparation) { notify(rejectPreparationRequest(rejectPreparation.dataset.rejectPreparation)); return; }
  const addApprovalStage = event.target.closest('[data-add-approval-stage]');
  if (addApprovalStage) {
    const type = readApprovalChainDraft();
    approvalChainDrafts[type].stages.push({ mode: 'role', value: '' });
    renderApprovalSettings(type); return;
  }
  const removeApprovalStage = event.target.closest('[data-remove-approval-stage]');
  if (removeApprovalStage) {
    const type = readApprovalChainDraft();
    const index = Number(removeApprovalStage.closest('[data-approval-stage]').querySelector('.approval-stage-number').textContent.replace(/[٠-٩]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))-1;
    approvalChainDrafts[type].stages.splice(index, 1);
    renderApprovalSettings(type); return;
  }
  if (event.target.closest('[data-save-site-engineer-assignments]')) {
    if (!isSystemAdmin()) { notify('تعيين مهندس لكل موقع متاح لمالك النظام أو مدير النظام فقط.'); return; }
    const assignments = {};
    document.querySelectorAll('[data-site-engineer-assignment]').forEach((select) => { if (select.value) assignments[select.dataset.siteEngineerAssignment] = select.value; });
    rentalSiteEngineerAssignments = assignments;
    for (const account of rentalEngineerAccounts()) account.responsibleSite = Object.entries(assignments).find(([, engineerId]) => engineerId === accountIdentifier(account))?.[0] || '';
    localStorage.setItem('nagm-registered-accounts', JSON.stringify(registeredAccounts));
    localStorage.setItem('nagm-rental-site-engineers', JSON.stringify(rentalSiteEngineerAssignments));
    const unassigned = rentalPreparationSites().filter((site) => !rentalSiteEngineerAssignments[site]);
    renderApprovalSettings('rental-preparation');
    notify(unassigned.length ? `تم حفظ التعيينات. بقي ${arabicNumber.format(unassigned.length)} مواقع بلا مهندس، ولا يمكن إرسال تحضير لها حتى تعيين مسؤول.` : 'تم حفظ مهندس مسؤول لكل موقع تحضير.');
    return;
  }
  if (event.target.closest('[data-save-approval-config]')) {
    const type = readApprovalChainDraft();
    const config = approvalChainDrafts[type];
    if (!isSystemAdmin()) { notify('إعداد سلاسل الاعتماد متاح لمالك النظام أو مدير النظام فقط.'); return; }
    if (!config.submitters.length) { notify('حدد الموظف أو المهندس أو كليهما لرفع هذا النوع من الطلبات.'); return; }
    if (config.stages.some((stage) => !stage.value || (stage.mode === 'account' && !registeredAccounts.some((account) => accountIdentifier(account) === stage.value)))) { notify('أكمل اختيار الصلاحية أو الحساب في كل مرحلة.'); return; }
    approvalChainConfigs[type] = structuredClone(config);
    localStorage.setItem('nagm-approval-chain-configs', JSON.stringify(approvalChainConfigs));
    applyApprovalPermissions();
    notify(`تم حفظ سلسلة «${approvalRequestTypes.find((item) => item.id === type)?.name || type}». الطلبات الجديدة ستستخدم هذا المسار.`); return;
  }
  const rejectLeave = event.target.closest('[data-reject-leave-request]');
  if (rejectLeave) {
    const request = employeeLeaveRequests.find((item) => item.id === rejectLeave.dataset.rejectLeaveRequest && !['approved', 'rejected'].includes(item.status));
    if (!request) return;
    const stage = leaveRequestCurrentStage(request);
    if (request.requestedBy === sessionIdentifier() || (!isSystemAdmin() && !userCanApproveStage(stage))) { notify('هذا الطلب لا ينتظر إجراء الحساب الحالي.'); return; }
    request.status = 'rejected'; request.rejectedAt = new Date().toISOString(); request.rejectedBy = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.account || 'الحساب الحالي';
    request.approvalHistory ||= []; request.approvalHistory.push({ stage: approverStageLabel(stage), account: sessionIdentifier(), name: request.rejectedBy, action: 'rejected', signatureFileId: leaveSignatureForAccount(sessionIdentifier()), at: request.rejectedAt });
    leaveAudit('leave-rejected', request.id, { stage: approverStageLabel(stage) });
    saveEmployeeLeaveRequests(); renderEmployeeLeaveManagement(); renderMyApprovals(); notify('تم رفض طلب الإجازة.'); return;
  }
  if (event.target.closest('[data-toggle-manual-attendance]')) {
    manualAttendanceFormOpen = !manualAttendanceFormOpen;
    renderAttendanceManagement();
    return;
  }
  if (event.target.closest('[data-cancel-manual-attendance]')) {
    manualAttendanceFormOpen = false;
    manualAttendanceEmployeeId = '';
    renderAttendanceManagement();
    return;
  }
  const punchRangeButton = event.target.closest('[data-punch-range]');
  if (punchRangeButton) {
    punchRange = punchRangeButton.dataset.punchRange;
    if (punchRange === 'custom' && (!punchFromDate || !punchToDate)) punchFromDate = punchToDate = saudiTodayISO();
    renderAttendanceManagement();
    return;
  }
  if (event.target.closest('[data-punch-export]')) { exportCompanyPunches(); return; }
  const custodyFilter = event.target.closest('[data-custody-filter]');
  if (custodyFilter) {
    employeeCustodyFilter = custodyFilter.dataset.custodyFilter;
    renderEmployeeCustodyManagement();
    return;
  }
  const assignCustody = event.target.closest('[data-assign-custody]');
  if (assignCustody) {
    openEmployeeCustodyAction = { id: assignCustody.dataset.assignCustody, action: 'assign' };
    renderEmployeeCustodyManagement();
    return;
  }
  const returnCustody = event.target.closest('[data-return-custody]');
  if (returnCustody) {
    openEmployeeCustodyAction = { id: returnCustody.dataset.returnCustody, action: 'return' };
    renderEmployeeCustodyManagement();
    return;
  }
  if (event.target.closest('[data-cancel-custody-action]')) {
    openEmployeeCustodyAction = null;
    renderEmployeeCustodyManagement();
    return;
  }
  const editPeriod = event.target.closest('[data-edit-employee-period]');
  if (editPeriod) {
    editingEmployeePeriodId = editPeriod.dataset.editEmployeePeriod;
    renderEmployeePeriodManagement();
    document.querySelector('[data-period-definition-form]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (event.target.closest('[data-cancel-edit-period]')) {
    editingEmployeePeriodId = null;
    renderEmployeePeriodManagement();
    return;
  }
  const deletePeriodButton = event.target.closest('[data-delete-employee-period]');
  if (deletePeriodButton) {
    const periodId = deletePeriodButton.dataset.deleteEmployeePeriod;
    const period = employeePeriodDefinitions.find((item) => item.id === periodId);
    if (!period) return;
    const assignedCount = employeesAssignedToPeriod(periodId).length;
    const warning = assignedCount
      ? `تنبيه: الفترة «${period.name}» معيّنة على ${arabicNumber.format(assignedCount)} موظفين. حذفها يزيلها من قائمة الفترات، لكن سجلاتها السابقة ستظل محفوظة في ملفات الموظفين. هل تريد المتابعة؟`
      : `حذف الفترة «${period.name}»؟`;
    if (!window.confirm(warning)) return;
    employeePeriodDefinitions = employeePeriodDefinitions.filter((item) => item.id !== periodId);
    localStorage.setItem('nagm-employee-period-definitions', JSON.stringify(employeePeriodDefinitions));
    if (editingEmployeePeriodId === periodId) editingEmployeePeriodId = null;
    renderEmployeePeriodManagement();
    notify(assignedCount ? `تم حذف تعريف الفترة، وسجلاتها محفوظة لـ${arabicNumber.format(assignedCount)} موظفين.` : 'تم حذف الفترة.');
    return;
  }
  const periodListToggle = event.target.closest('[data-toggle-period-list]');
  if (periodListToggle) {
    const list = document.querySelector('[data-period-choice-list]');
    if (!list) return;
    const expanded = list.classList.toggle('collapsed') === false;
    periodListToggle.setAttribute('aria-expanded', String(expanded));
    periodListToggle.textContent = expanded ? 'إخفاء الفترات الإضافية' : 'إظهار كل الفترات';
    return;
  }
  const siteListToggle = event.target.closest('[data-toggle-all-sites-visibility]');
  if (siteListToggle) {
    const siteList = document.querySelector('[data-bulk-site-list]');
    if (!siteList) return;
    const expanded = siteList.classList.toggle('collapsed') === false;
    siteListToggle.setAttribute('aria-expanded', String(expanded));
    siteListToggle.textContent = expanded ? 'إخفاء المواقع الإضافية' : 'إظهار كل المواقع';
    return;
  }
  const openProfile = event.target.closest('[data-open-employee-profile]');
  if (openProfile) {
    const employee = employeeRecords.find((record) => record.id === openProfile.dataset.openEmployeeProfile);
    if (employee) renderEmployeeProfile(employee);
    return;
  }
  const toggleSite = event.target.closest('[data-toggle-employee-site]');
  if (toggleSite) {
    const site = toggleSite.dataset.toggleEmployeeSite;
    const index = employeeSiteNames.indexOf(site);
    if (index < 0) return;
    const settings = defaultEmployeeSiteGeofence(site, index);
    settings.active = !settings.active;
    employeeSiteGeofences[site] = settings;
    localStorage.setItem('nagm-employee-site-geofences', JSON.stringify(employeeSiteGeofences));
    renderEmployeeLocationManagement();
    notify(settings.active ? `تم تشغيل موقع ${site}.` : `تم تعطيل موقع ${site}.`);
    return;
  }
  const deleteSite = event.target.closest('[data-delete-employee-site]');
  if (deleteSite) {
    const site = deleteSite.dataset.deleteEmployeeSite;
    if (!window.confirm(`سيُحذف موقع «${site}» من القائمة ومن تعيينات جميع الموظفين. هل تريد المتابعة؟`)) return;
    employeeSiteNames = employeeSiteNames.filter((item) => item !== site);
    delete employeeSiteGeofences[site];
    let removedAssignments = 0;
    Object.entries(employeeAllowedSites).forEach(([employeeId, sites]) => {
      const remainingSites = sites.filter((item) => item !== site);
      if (remainingSites.length !== sites.length) removedAssignments += 1;
      employeeAllowedSites[employeeId] = remainingSites;
    });
    localStorage.setItem('nagm-employee-location-sites', JSON.stringify(employeeSiteNames));
    localStorage.setItem('nagm-employee-site-geofences', JSON.stringify(employeeSiteGeofences));
    localStorage.setItem('nagm-employee-allowed-sites', JSON.stringify(employeeAllowedSites));
    if (editingEmployeeSite === site) { editingEmployeeSite = null; selectedEmployeeSiteCoordinates = null; }
    renderEmployeeLocationManagement();
    notify(`تم حذف ${site}${removedAssignments ? ` وإزالته من تعيينات ${arabicNumber.format(removedAssignments)} موظفين` : ''}.`);
    return;
  }
  const editSite = event.target.closest('[data-edit-employee-site]');
  if (editSite) {
    const site = editSite.dataset.editEmployeeSite;
    const settings = defaultEmployeeSiteGeofence(site, employeeSiteNames.indexOf(site));
    editingEmployeeSite = site;
    selectedEmployeeSiteCoordinates = settings.latitude && settings.longitude
      ? { latitude: Number(settings.latitude), longitude: Number(settings.longitude) } : null;
    const nameInput = document.querySelector('[data-new-site-name]');
    const radiusInput = document.querySelector('[data-new-site-radius]');
    const idInput = document.querySelector('[data-new-site-id]');
    if (nameInput) nameInput.value = site;
    if (radiusInput) radiusInput.value = settings.radiusMeters || '';
    if (idInput) idInput.value = settings.locationId;
    if (selectedEmployeeSiteCoordinates) updateEmployeeSiteMapSelection(selectedEmployeeSiteCoordinates.latitude, selectedEmployeeSiteCoordinates.longitude, true);
    else if (employeeSiteMap) {
      if (employeeSiteMarker) employeeSiteMap.removeLayer(employeeSiteMarker);
      if (employeeSiteCircle) employeeSiteMap.removeLayer(employeeSiteCircle);
      employeeSiteMarker = null;
      employeeSiteCircle = null;
    }
    document.querySelector('[data-site-map-form]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (event.target.closest('[data-cancel-edit-site]')) {
    editingEmployeeSite = null;
    selectedEmployeeSiteCoordinates = null;
    renderEmployeeLocationManagement();
  }
});

app.addEventListener('input', (event) => {
  if (event.target.matches('[data-overtime-search]')) applyOvertimeWorkspaceFilters();
  if (event.target.matches('[data-manager-assignment-search]')) { employeeManagerAssignmentQuery = event.target.value; applyEmployeeManagerAssignmentFilters(); }
  if (event.target.matches('[data-paid-settlement-search]')) applyPaidSettlementReportFilters(event.target.closest('.profile-panel'));
  if (event.target.matches('[data-financial-filter-text], [data-financial-filter-from], [data-financial-filter-to]')) applyLeaveFinancialFilters(event.target.closest('.profile-panel'));
  if (event.target.matches('[data-leave-report-text], [data-leave-report-from], [data-leave-report-to]')) applyLeaveRequestReportFilters(event.target.closest('.profile-panel'));
  if (event.target.matches('[data-punch-search]')) {
    punchQuery = event.target.value.trim().toLocaleLowerCase('ar');
    renderCompanyPunchTable();
  }
  if (event.target.matches('[data-custody-search]')) {
    employeeCustodySearch = event.target.value;
    renderEmployeeCustodyManagement();
    const search = document.querySelector('[data-custody-search]');
    search?.focus();
    search?.setSelectionRange(employeeCustodySearch.length, employeeCustodySearch.length);
  }
  if (event.target.matches('[data-employee-return-search]')) {
    employeeReturnsSearch = event.target.value;
    renderEmployeeReturns();
    const search = document.querySelector('[data-employee-return-search]');
    search?.focus();
    search?.setSelectionRange(employeeReturnsSearch.length, employeeReturnsSearch.length);
  }
  const form = event.target.closest('[data-management-period-form], [data-period-definition-form]');
  if (form) renderWorkPeriodPreview(form);
  if (event.target.matches('[data-period-employee-search]')) applyPeriodEmployeeSearch(event.target.value);
  if (event.target.matches('[data-period-definition-search]')) applyPeriodDefinitionSearch(event.target.value);
  if (event.target.matches('[data-location-employee-search]')) applyBulkEmployeeSearch(event.target.value);
  if (event.target.matches('[data-location-site-search]')) applyBulkSiteSearch(event.target.value);
  if (event.target.matches('[data-new-site-radius]') && employeeSiteCircle) {
    const radius = Math.max(0, Number(event.target.value) || 0);
    employeeSiteCircle.setRadius(radius);
  }
});
app.addEventListener('change', (event) => {
  if (event.target.matches('[data-overtime-kind-filter], [data-overtime-site-filter], [data-overtime-payment-filter], [data-overtime-from], [data-overtime-to]')) {const host=event.target.closest('[data-employee-extras-content]');if(host)host.dataset.overtimeSelectedBatch='';applyOvertimeWorkspaceFilters();}
  if (event.target.matches('[data-overtime-import]')) importOvertimeCsv(event.target);
  if (event.target.matches('[data-manager-assignment-filter]')) { employeeManagerAssignmentFilter = event.target.value; applyEmployeeManagerAssignmentFilters(); }
  if (event.target.matches('[data-settlement-item]')) updateLeaveSettlementTotals(event.target.closest('[data-create-settlement], [data-update-settlement]'));
  if (event.target.matches('[data-paid-settlement-from], [data-paid-settlement-to], [data-paid-settlement-site]')) applyPaidSettlementReportFilters(event.target.closest('.profile-panel'));
  if (event.target.matches('[data-financial-filter-status], [data-financial-filter-payment], [data-financial-filter-site]')) applyLeaveFinancialFilters(event.target.closest('.profile-panel'));
  if (event.target.matches('[data-leave-report-status], [data-leave-report-operational], [data-leave-report-waiting], [data-leave-report-site], [data-leave-report-department], [data-leave-report-manager]')) applyLeaveRequestReportFilters(event.target.closest('.profile-panel'));
  if (event.target.matches('[data-punch-source]')) { punchSourceFilter = event.target.value; renderCompanyPunchTable(); return; }
  if (event.target.matches('[data-ratings-month]')) { ratingsMonth = event.target.value || saudiTodayISO().slice(0, 7); renderRatings(); return; }
  if (event.target.matches('[data-ratings-site]')) { ratingsSite = event.target.value; renderRatings(); return; }
  if (event.target.matches('[data-employee-request-type]')) {
    const form = event.target.closest('[data-employee-request-form]');
    const type = event.target.value;
    form?.querySelectorAll('[data-request-fields]').forEach((panel) => {
      const active = panel.dataset.requestFields === type;
      panel.hidden = !active;
      panel.querySelectorAll('input,select,textarea').forEach((field) => { field.required = active && ({ punchDate: 1, site: 1, punchReason: 1, startDate: 1, endDate: 1, leaveType: 1, amount: 1, advanceDetails: 1, subject: 1, otherDetails: 1 }[field.name] === 1); });
    });
    return;
  }
  if (event.target.matches('[data-approval-chain-type]')) {
    readApprovalChainDraft();
    renderApprovalSettings(event.target.value);
    return;
  }
  if (event.target.matches('[data-approval-stage] [name="stage-mode"]')) {
    const type = readApprovalChainDraft();
    renderApprovalSettings(type);
    return;
  }
  if (event.target.matches('[data-manual-attendance-employee]')) {
    manualAttendanceEmployeeId = event.target.value;
    renderManualAttendancePreview();
  }
  if (event.target.matches('[data-manual-attendance-date]')) {
    manualAttendanceDate = event.target.value;
    renderManualAttendancePreview();
  }
  if (event.target.matches('[data-period-mode]')) {
    const form = event.target.closest('[data-period-definition-form]');
    updatePeriodFormMode(form);
    renderWorkPeriodPreview(form);
  }
  if (event.target.matches('[data-punch-employee]')) {
    punchEmployeeId = event.target.value;
    renderCompanyPunchTable();
  }
  if (event.target.matches('[data-punch-from]')) { punchFromDate = event.target.value; renderCompanyPunchTable(); }
  if (event.target.matches('[data-punch-to]')) { punchToDate = event.target.value; renderCompanyPunchTable(); }
  const form = event.target.closest('[data-management-period-form], [data-period-definition-form]');
  if (form) renderWorkPeriodPreview(form);
  if (event.target.matches('[data-select-all-period-employees]')) {
    document.querySelectorAll('[data-period-employee-choice]:not([hidden]) input[name="period-employee"]').forEach((input) => { input.checked = event.target.checked; });
  }
  if (event.target.matches('[data-period-assignment-form] input[name="period-employee"]')) updatePeriodAssignmentCount();
  if (event.target.matches('[data-select-all-sites]')) {
    document.querySelectorAll('[data-bulk-location-assignment] input[name="bulk-site"]:not(:disabled)').forEach((input) => { input.checked = event.target.checked; });
  }
  if (event.target.matches('[data-select-all-employees]')) {
    document.querySelectorAll('[data-bulk-employee-choice]:not([hidden]) input[name="bulk-employee"]').forEach((input) => { input.checked = event.target.checked; });
  }
  if (event.target.matches('[data-bulk-location-assignment] input[type="checkbox"]')) updateBulkLocationSelectionCounts();
  if (event.target.matches('[data-new-site-radius]') && employeeSiteCircle) {
    employeeSiteCircle.setRadius(Math.max(0, Number(event.target.value) || 0));
  }
});
app.addEventListener('submit', async (event) => {
  const overtimeRouteForm = event.target.closest('[data-overtime-route-batch]');
  if (overtimeRouteForm) {
    event.preventDefault(); if (!isSystemAdmin()) { notify('تحديد سلسلة الاعتماد متاح لمالك النظام فقط.'); return; }
    const data=new FormData(overtimeRouteForm); const engineerId=String(data.get('engineerId')||''); const projectManagerId=String(data.get('projectManagerId')||'');
    if(!engineerId||!projectManagerId||engineerId===projectManagerId){notify('اختر مهندسًا ومدير مشاريع مختلفين.');return;}
    const batch=overtimeRouteForm.dataset.overtimeRouteBatch; const rows=employeeFinancialItems.filter((item)=>item.overtimeBatchId===batch&&item.overtimeNeedsRouting&&item.approvalStatus==='pending'); if(!rows.length){notify('المجموعة لم تعد بانتظار تعيين السلسلة.');return;}
    const stages=[{mode:'account',value:engineerId,label:'المهندس'},{mode:'account',value:projectManagerId,label:'مدير المشاريع'}]; const now=new Date().toISOString(); const actor=window.NAGM_SESSION?.displayName||sessionIdentifier();
    rows.forEach((item)=>{item.approvalStages=structuredClone(stages);item.stageIndex=0;item.overtimeNeedsRouting=false;item.ownerApprovalRequired=false;item.history||=[];item.history.push({action:'approval-chain-assigned',actorId:sessionIdentifier(),actorName:actor,at:now,stages});});
    saveEmployeeFinancialItems(); leaveAudit('overtime-approval-chain-assigned',batch,{engineerId,projectManagerId,employeeIds:rows.map((item)=>item.employeeId)}); renderEmployeeFinancialManagement(); renderMyApprovals(); notify('تم تعيين السلسلة، وستظهر الاعتمادات في صفحة موافقاتي.'); return;
  }
  const overtimeBatchForm = event.target.closest('[data-create-overtime-batch]');
  if (overtimeBatchForm) {
    event.preventDefault(); const canManage=isSystemAdmin(); const isEngineer=overtimeCanSubmit(); if (!isEngineer && !canManage) { notify('تسجيل الإضافي متاح لمهندس الموقع أو مسؤول الموقع أو مدير النظام.'); return; }
    const data = new FormData(overtimeBatchForm); const ids = [...overtimeBatchForm.querySelector('[name="employeeIds"]').selectedOptions].map((option) => option.value); const date = String(data.get('date') || ''); const site = String(data.get('site') || ''); const description = String(data.get('description') || '').trim(); const engineerId = String(data.get('engineerId') || ''); const projectManagerId = String(data.get('projectManagerId') || '');
    if (!ids.length || !date || !site || !description || (canManage && (!engineerId || !projectManagerId || engineerId === projectManagerId))) { notify('اختر الموظفين وأكمل الموقع والتاريخ والبيان وسلسلة الاعتماد المطلوبة.'); return; }
    const directory = overtimeDirectory(); const assignedSites=isEngineer?overtimeSubmissionSites():[]; if(isEngineer&&!assignedSites.includes(site)){notify('يمكنك تسجيل الإضافي في موقع مسؤوليتك فقط.');return;}
    const selected = ids.map((id) => directory.find((person) => person.employeeId === id)).filter((person) => person && person.active && (person.site===site || (person.workerType==='company'&&(employeeAllowedSites[person.id]||[]).includes(site)))); if (selected.length!==ids.length) { notify('تأكد أن كل الموظفين المحددين نشطون ومسموح بهم في الموقع المختار.'); return; }
    const batch = `OTB-${Date.now()}-${Math.random().toString(36).slice(2,5)}`; const kind = String(data.get('overtimeKind') || 'holiday'); const stages = canManage ? [{mode:'account',value:engineerId,label:'المهندس'},{mode:'account',value:projectManagerId,label:'مدير المشاريع'}] : []; const session = window.NAGM_SESSION || {}; const now = new Date().toISOString();
    const batchAmount = canManage ? Math.max(0,Number(data.get('amount')) || 0) : 0; for (const person of selected) { const item = { id:`OT-${Date.now()}-${Math.random().toString(36).slice(2,7)}`, employeeId:person.employeeId, employeeName:person.name, employeeCode:person.code, identityNumber:person.identity, jobTitle:person.job, workerType:person.workerType, paymentMethod:person.paymentMethod, type:'overtime', overtimeKind:kind, overtimeBatchId:batch, description, site, date, quantity:Number(data.get('quantity')) || (kind==='holiday'?1:0), unit:kind==='holiday'?'يوم':'ساعة', amount:batchAmount, approvalStatus:'pending', paymentStatus:'unpaid', workflowRequest:true, overtimeNeedsRouting:isEngineer, allowRequesterApproval:isEngineer, ownerApprovalRequired:false, approvalStages:structuredClone(stages), stageIndex:0, approvalHistory:[], requestedBy:sessionIdentifier(), requestedByName:session.displayName || session.fullName || session.name || sessionIdentifier(), createdAt:now, createdById:sessionIdentifier(), createdByName:session.displayName || session.fullName || session.name || sessionIdentifier(), paymentNote:'', notes:String(data.get('note') || '').trim(), history:[{action:'created',actorId:sessionIdentifier(),actorName:session.displayName || sessionIdentifier(),at:now}] }; employeeFinancialItems.unshift(item); }
    saveEmployeeFinancialItems(); leaveAudit('overtime-batch-created',batch,{employeeIds:ids,site,date,kind,createdBy:sessionIdentifier(),awaitingChain:isEngineer,enteredByOwner:canManage}); renderEmployeeFinancialManagement(); renderMyApprovals(); notify(isEngineer?'تم تسجيل الإضافي وإرساله لمدير النظام لتحديد سلسلة الاعتماد.':'تم تسجيل الإضافي وإرساله إلى المهندس ثم مدير المشاريع.'); return;
  }
  const managerAssignmentForm = event.target.closest('[data-employee-manager-assignment-form]');
  if (managerAssignmentForm) {
    event.preventDefault();
    if (!isSystemAdmin()) { notify('تعيين المدير المباشر متاح لمدير النظام فقط.'); return; }
    const action = event.submitter?.dataset.managerAssignmentAction || 'assign';
    const managerId = action === 'clear' ? '' : String(new FormData(managerAssignmentForm).get('managerEmployeeId') || '');
    const selectedEmployees = [...managerAssignmentForm.querySelectorAll('[data-manager-assignment-row]:not([hidden]) input[name="employeeId"]:checked')].map((input) => employeeRecords.find((item) => item.id === input.value && item.sponsor === 'الشركة' && !item.archived && !item.systemHidden)).filter(Boolean);
    const manager = managerId && employeeRecords.find((item) => item.id === managerId && item.sponsor === 'الشركة' && !item.archived && !item.systemHidden);
    if (!selectedEmployees.length) { notify('حدد موظفًا واحدًا على الأقل من القائمة الظاهرة.'); return; }
    if (action !== 'clear' && !manager) { notify('اختر مديرًا مباشرًا صالحًا قبل التعيين.'); return; }
    if (selectedEmployees.some((employee) => employee.id === managerId)) { notify('لا يمكن للموظف أن يكون مديرًا مباشرًا لنفسه.'); return; }
    const wouldCreateCycle = (employeeId) => {
      let cursorId = managerId; const visited = new Set();
      while (cursorId && !visited.has(cursorId)) {
        if (cursorId === employeeId) return true;
        visited.add(cursorId); cursorId = employeeRecords.find((item) => item.id === cursorId)?.directManagerId || '';
      }
      return false;
    };
    if (managerId && selectedEmployees.some((employee) => wouldCreateCycle(employee.id))) { notify('التعيين سيُنشئ حلقة في تسلسل المديرين. اختر مديرًا آخر.'); return; }
    const at = new Date().toISOString(); const actor = window.NAGM_SESSION?.displayName || sessionIdentifier();
    for (const employee of selectedEmployees) {
      const previousManagerId = employee.directManagerId || '';
      employee.directManagerId = managerId; employeeDirectManagers[employee.id] = managerId;
      leaveAudit('direct-manager-updated', employee.id, { previousManagerId, managerId, assignedBy: actor, at });
    }
    saveEmployeeDirectManagers(); renderEmployeeManagerAssignment(); renderEmployeeList();
    if (selectedEmployee && selectedEmployees.some((employee) => employee.id === selectedEmployee.id)) renderEmployeeProfile(selectedEmployee, employeeProfile.dataset.profileSection || 'overview');
    notify(action === 'clear' ? `أزيل المدير المباشر عن ${arabicNumber.format(selectedEmployees.length)} موظف.` : `عُيّن ${manager.name} مديرًا مباشرًا لـ${arabicNumber.format(selectedEmployees.length)} موظف.`);
    return;
  }
  const overtimeForm = event.target.closest('[data-overtime-submission]');
  if (overtimeForm) {
    event.preventDefault();
    const roles = sessionRoleValues(); const employee = employeeRecords.find((item) => item.id === String(new FormData(overtimeForm).get('employeeId') || '') && item.status === 'active' && item.sponsor === 'الشركة' && !item.archived && !item.systemHidden);
    const data = new FormData(overtimeForm); const site = String(data.get('site') || ''); const date = String(data.get('date') || ''); const hours = Number(data.get('hours')); const amount = Number(data.get('amount')); const description = String(data.get('description') || '').trim();
    const submitterRole = roles.has('engineer') ? 'engineer' : roles.has('employee') ? 'employee' : '';
    const config = approvalChainConfigs.overtime || defaultApprovalConfigs.overtime;
    if (!submitterRole || !config?.submitters?.includes(submitterRole)) { notify('صلاحية الحساب الحالي غير مفعّلة لتقديم طلبات العمل الإضافي.'); return; }
    if (!employee || !site || !employeeSiteNames.includes(site) && site !== employee.site || !date || date > saudiTodayISO() || !Number.isFinite(hours) || hours <= 0 || !Number.isFinite(amount) || amount <= 0 || !description) { notify('أكمل الموظف والموقع والتاريخ والساعات والمبلغ والبيان بصورة صحيحة.'); return; }
    if (submitterRole === 'employee' && employee.id !== currentEmployeeForSession()?.id) { notify('الموظف يستطيع تقديم العمل الإضافي على ملفه فقط.'); return; }
    if (submitterRole === 'engineer') {
      const assignedSites = Object.entries(rentalSiteEngineerAssignments).filter(([, accountId]) => accountId === sessionIdentifier()).map(([assignedSite]) => assignedSite);
      const accountSite = rentalEngineerAccounts().find((account) => accountIdentifier(account) === sessionIdentifier())?.responsibleSite;
      if (!assignedSites.includes(site) && accountSite !== site) { notify('يمكن للمهندس تسجيل الإضافي لموقع مسؤوليته فقط. عيّن الموقع للمهندس في إعداد الاعتمادات أولًا.'); return; }
      if (!(employee.site === site || (employeeAllowedSites[employee.id] || []).includes(site))) { notify('الموظف غير مرتبط بالموقع المختار.'); return; }
    }
    const stages = structuredClone(config.stages || []);
    if (stages.some((stage) => stage.mode === 'account' && stage.value === sessionIdentifier()) || stages.some((stage) => stage.mode !== 'account' && roles.has(stage.value))) { notify('لا يمكن لمقدم الطلب أن يكون ضمن سلسلة اعتماد إضافيته بنفس الحساب. عدّل السلسلة أو فوّض مسؤولًا آخر.'); return; }
    const session = window.NAGM_SESSION || {}; const record = { id: `OT-${Date.now()}-${Math.random().toString(36).slice(2,7)}`, employeeId: employee.id, type: 'overtime', description, site, date, quantity: hours, unit: 'ساعة', amount: Math.round(amount * 100) / 100, approvalStatus: 'pending', paymentStatus: 'unpaid', workflowRequest: true, approvalStages: stages, stageIndex: 0, approvalHistory: [], requestedBy: sessionIdentifier(), requestedByName: session.displayName || session.fullName || session.name || sessionIdentifier(), createdAt: new Date().toISOString(), history: [{ action: 'submitted', actorId: sessionIdentifier(), actorName: session.displayName || sessionIdentifier(), at: new Date().toISOString() }] };
    employeeFinancialItems.unshift(record); saveEmployeeFinancialItems(); reopenEmployeeLeaveProcedures(employee.id, 'تقديم طلب عمل إضافي جديد', record.id); leaveAudit('employee-overtime-submitted', record.id, { employeeId: employee.id, site, date, hours, amount, approvalStages: stages });
    renderEmployeeFinancialManagement(); renderMyApprovals(); renderMyRequests(); notify(`سُجل العمل الإضافي لـ${employee.name} وأُرسل إلى سلسلة الاعتماد.`); return;
  }
  const payFinancialItem = event.target.closest('[data-pay-financial-item]');
  if (payFinancialItem) {
    event.preventDefault(); if (!leaveFinanceManager()) { notify('تسجيل صرف الإضافيات متاح للموارد البشرية أو مدير النظام.'); return; }
    const item = employeeFinancialItems.find((record) => record.id === payFinancialItem.dataset.payFinancialItem && record.approvalStatus === 'approved' && !['paid', 'paid-with-settlement'].includes(record.paymentStatus) && !record.reservedSettlementId && !record.archived);
    const data = new FormData(payFinancialItem); const paidAt = String(data.get('paidAt') || ''); const reference = String(data.get('reference') || '').trim();
    if (!item || !paidAt || !reference) { notify('تأكد أن الإضافة معتمدة وغير محجوزة، وأدخل تاريخ الصرف ورقم المرجع.'); return; }
    item.paymentStatus = 'paid'; item.paidAt = paidAt; item.paymentReference = reference; item.paidById = sessionIdentifier(); item.paidByName = window.NAGM_SESSION?.displayName || sessionIdentifier(); item.history ||= []; item.history.push({ action: 'paid', actorId: item.paidById, actorName: item.paidByName, at: new Date().toISOString(), paidAt, reference });
    saveEmployeeFinancialItems(); leaveAudit('financial-item-paid-directly', item.id, { employeeId: item.employeeId, paidAt, reference, amount: item.amount }); renderEmployeeFinancialManagement(); notify('تم تسجيل صرف الإضافة دون ترحيلها إلى نظام رواتب الشركة.'); return;
  }
  const createFinancialItem = event.target.closest('[data-create-financial-item]');
  if (createFinancialItem) {
    event.preventDefault();
    if (!leaveFinanceManager()) { notify('إضافة مستحق مالي متاحة للموارد البشرية ومدير النظام.'); return; }
    const data = new FormData(createFinancialItem); const employeeId = String(data.get('employeeId') || ''); const amount = Number(data.get('amount'));
    const employee = employeeRecords.find((record) => record.id === employeeId && record.sponsor === 'الشركة' && !record.archived && !record.systemHidden);
    const type = String(data.get('type') || ''); const description = String(data.get('description') || '').trim(); const date = String(data.get('date') || '');
    if (!employee || !leaveFinancialTypes[type] || !description || !date || !Number.isFinite(amount) || amount <= 0) { notify('أكمل الموظف ونوع البند والبيان والتاريخ والقيمة الصحيحة.'); return; }
    const session = window.NAGM_SESSION || {};
    employeeFinancialItems.unshift({ id: `FIN-${Date.now()}-${Math.random().toString(36).slice(2,6)}`, employeeId, type, description, date, quantity: Number(data.get('quantity')) || 0, unit: String(data.get('unit') || '').trim(), amount: Math.round(amount * 100) / 100, approvalStatus: 'pending', paymentStatus: 'unpaid', systemAdminOnly: type === 'bonus', createdAt: new Date().toISOString(), createdById: sessionIdentifier(), createdByName: session.displayName || session.fullName || session.name || sessionIdentifier(), history: [{ action: 'created', actorId: sessionIdentifier(), actorName: session.displayName || sessionIdentifier(), at: new Date().toISOString() }] });
    saveEmployeeFinancialItems(); reopenEmployeeLeaveProcedures(employeeId, 'إضافة بند مالي جديد', employeeFinancialItems[0].id); leaveAudit('financial-item-created', employeeFinancialItems[0].id, { employeeId, type, amount }); renderEmployeeFinancialManagement(); notify('أُضيف البند بانتظار الاعتماد.'); return;
  }
  const bonusProposal = event.target.closest('[data-propose-leave-bonus]');
  if (bonusProposal) {
    event.preventDefault();
    const request = employeeLeaveRequests.find((item) => item.id === bonusProposal.dataset.proposeLeaveBonus && !['approved','rejected','needs-revision'].includes(item.status));
    const stage = request && leaveRequestCurrentStage(request); const data = new FormData(bonusProposal); const description = String(data.get('description') || '').trim(); const amount = Number(data.get('amount'));
    if (!request || request.requestedBy === sessionIdentifier() || !userCanApproveStage(stage) || !description || !Number.isFinite(amount) || amount <= 0) { notify('اقتراح المكافأة متاح للمسؤول الحالي في سلسلة الطلب فقط.'); return; }
    const employee = employeeRecords.find((item) => item.id === request.employeeId); if (!employee) return;
    const session = window.NAGM_SESSION || {}; const proposal = { id: `BONUS-${Date.now()}`, employeeId: employee.id, type: 'bonus', description, date: saudiTodayISO(), quantity: 0, unit: 'مبلغ', amount: Math.round(amount * 100) / 100, approvalStatus: 'pending', paymentStatus: 'unpaid', systemAdminOnly: true, proposalForLeaveId: request.id, createdAt: new Date().toISOString(), createdById: sessionIdentifier(), createdByName: session.displayName || session.fullName || session.name || sessionIdentifier(), history: [{ action: 'proposed', actorId: sessionIdentifier(), actorName: session.displayName || sessionIdentifier(), at: new Date().toISOString() }] };
    employeeFinancialItems.unshift(proposal); saveEmployeeFinancialItems(); reopenEmployeeLeaveProcedures(employee.id, 'اقتراح مكافأة جديدة', proposal.id); leaveAudit('leave-bonus-proposed', proposal.id, { requestId: request.id, employeeId: employee.id, amount: proposal.amount }); renderMyApprovals(); notify('وصل اقتراح المكافأة إلى مدير النظام للمراجعة، ولم يظهر في بقية مسارات الاعتماد.'); return;
  }
  const createSettlement = event.target.closest('[data-create-settlement]');
  if (createSettlement) {
    event.preventDefault();
    if (!leaveFinanceManager()) { notify('إعداد تصفية الإجازة متاح للموارد البشرية ومدير النظام.'); return; }
    const request = employeeLeaveRequests.find((item) => item.id === createSettlement.dataset.createSettlement && item.status === 'approved');
    const ids = [...createSettlement.querySelectorAll('input[name="financialItemId"]:checked')].map((input) => input.value);
    if (!request || !ids.length) { notify('اختر إجازة معتمدة وبندًا ماليًا واحدًا على الأقل.'); return; }
    if (employeeLeaveSettlements.some((item) => item.leaveRequestId === request.id)) { notify('توجد تصفية مسجلة لهذا الطلب بالفعل.'); return; }
    const selectedItems = ids.map((id) => employeeFinancialItems.find((item) => item.id === id && item.employeeId === request.employeeId && item.approvalStatus === 'approved' && !['paid','paid-with-settlement'].includes(item.paymentStatus) && !item.reservedSettlementId && !item.archived));
    if (selectedItems.some((item) => !item)) { notify('تغيرت حالة أحد البنود؛ حدّث الصفحة واختر البنود المتاحة من جديد.'); return; }
    const lines = selectedItems.map((item) => ({ financialItemId: item.id, description: `${leaveFinancialTypes[item.type] || item.type}: ${item.description}`, amount: Number(item.amount) || 0, kind: ['advance','deduction','custody'].includes(item.type) ? 'deduction' : 'credit' }));
    const credits = lines.filter((line) => line.kind === 'credit').reduce((sum, line) => sum + line.amount, 0);
    const deductions = lines.filter((line) => line.kind === 'deduction').reduce((sum, line) => sum + line.amount, 0);
    const id = `SET-${Date.now()}`; const number = `LS-${saudiTodayISO().replaceAll('-','')}-${String(employeeLeaveSettlements.length + 1).padStart(4,'0')}`;
    const settlement = { id, number, employeeId: request.employeeId, leaveRequestId: request.id, status: 'draft', statusLabel: 'مسودة', lines, credits: Math.round(credits * 100) / 100, deductions: Math.round(deductions * 100) / 100, netAmount: Math.round((credits - deductions) * 100) / 100, note: String(new FormData(createSettlement).get('note') || '').trim(), createdAt: new Date().toISOString(), createdById: sessionIdentifier(), createdByName: window.NAGM_SESSION?.displayName || sessionIdentifier(), history: [] };
    employeeLeaveSettlements.unshift(settlement); selectedItems.forEach((item) => { item.reservedSettlementId = id; item.reservedSettlementNumber = number; });
    saveEmployeeLeaveSettlements(); saveEmployeeFinancialItems(); leaveAudit('leave-settlement-created', id, { leaveRequestId: request.id, financialItemIds: ids, netAmount: settlement.netAmount }); renderEmployeeFinancialManagement(); notify(`أُنشئت مسودة التصفية ${number}.`); return;
  }
  const updateSettlement = event.target.closest('[data-update-settlement]');
  if (updateSettlement) {
    event.preventDefault();
    if (!leaveFinanceManager()) { notify('تعديل مسودة التصفية متاح للموارد البشرية ومدير النظام فقط.'); return; }
    const settlement = employeeLeaveSettlements.find((item) => item.id === updateSettlement.dataset.updateSettlement && item.status === 'draft');
    const request = settlement && employeeLeaveRequests.find((item) => item.id === settlement.leaveRequestId && item.employeeId === settlement.employeeId && item.status === 'approved');
    const ids = [...updateSettlement.querySelectorAll('input[name="financialItemId"]:checked')].map((input) => input.value);
    if (!settlement || !request || !ids.length || new Set(ids).size !== ids.length) { notify('المسودة غير قابلة للتعديل أو لم تختر بندًا واحدًا على الأقل.'); return; }
    const selectedItems = ids.map((id) => employeeFinancialItems.find((item) => item.id === id && item.employeeId === settlement.employeeId && item.approvalStatus === 'approved' && !['paid','paid-with-settlement'].includes(item.paymentStatus) && !item.archived && (!item.reservedSettlementId || item.reservedSettlementId === settlement.id) && (!item.systemAdminOnly || isSystemAdmin())));
    if (selectedItems.some((item) => !item)) { notify('تغيرت حالة أحد البنود أو حُجز لتصفية أخرى؛ لم تُحفظ التعديلات. حدّث السجل واختر البنود المتاحة.'); return; }
    const previousIds = settlement.lines.map((line) => line.financialItemId);
    const previousNet = Number(settlement.netAmount) || 0;
    const selectedIdSet = new Set(ids);
    for (const previousId of previousIds) {
      if (selectedIdSet.has(previousId)) continue;
      const item = employeeFinancialItems.find((record) => record.id === previousId && record.reservedSettlementId === settlement.id);
      if (item) { delete item.reservedSettlementId; delete item.reservedSettlementNumber; }
    }
    const lines = selectedItems.map((item) => {
      item.reservedSettlementId = settlement.id; item.reservedSettlementNumber = settlement.number;
      return { financialItemId: item.id, description: `${leaveFinancialTypes[item.type] || item.type}: ${item.description}`, amount: Number(item.amount) || 0, kind: ['advance','deduction','custody'].includes(item.type) ? 'deduction' : 'credit' };
    });
    const credits = lines.filter((line) => line.kind === 'credit').reduce((sum, line) => sum + line.amount, 0);
    const deductions = lines.filter((line) => line.kind === 'deduction').reduce((sum, line) => sum + line.amount, 0);
    const netAmount = Math.round((credits - deductions) * 100) / 100;
    const at = new Date().toISOString(); const note = String(new FormData(updateSettlement).get('note') || '').trim();
    settlement.lines = lines; settlement.credits = Math.round(credits * 100) / 100; settlement.deductions = Math.round(deductions * 100) / 100; settlement.netAmount = netAmount; settlement.note = note; settlement.updatedAt = at; settlement.updatedById = sessionIdentifier(); settlement.updatedByName = window.NAGM_SESSION?.displayName || sessionIdentifier();
    settlement.history ||= []; settlement.history.push({ action: 'draft-edited', actorId: settlement.updatedById, actorName: settlement.updatedByName, at, previousFinancialItemIds: previousIds, financialItemIds: ids, previousNetAmount: previousNet, netAmount });
    saveEmployeeLeaveSettlements(); saveEmployeeFinancialItems(); leaveAudit('leave-settlement-draft-edited', settlement.id, { leaveRequestId: request.id, previousFinancialItemIds: previousIds, financialItemIds: ids, previousNetAmount: previousNet, netAmount });
    renderEmployeeFinancialManagement(); notify('حُفظت تعديلات المسودة وسُجلت في سجل التصفية.'); return;
  }
  const paySettlement = event.target.closest('[data-pay-settlement]');
  if (paySettlement) {
    event.preventDefault();
    if (!leaveFinanceManager()) { notify('تسجيل الصرف الفعلي متاح للموارد البشرية أو مدير النظام.'); return; }
    const settlement = employeeLeaveSettlements.find((item) => item.id === paySettlement.dataset.paySettlement && item.status === 'approved');
    const settlementRequest = settlement && employeeLeaveRequests.find((request) => request.id === settlement.leaveRequestId && request.employeeId === settlement.employeeId && request.status === 'approved');
    const settlementItemIds = settlement?.lines.map((line) => line.financialItemId) || [];
    const paymentItems = settlement?.lines.map((line) => {
      const item = employeeFinancialItems.find((record) => record.id === line.financialItemId && record.employeeId === settlement.employeeId);
      return item && item.reservedSettlementId === settlement.id && item.approvalStatus === 'approved' && !item.archived && !['paid', 'paid-with-settlement'].includes(item.paymentStatus) && Math.abs((Number(item.amount) || 0) - (Number(line.amount) || 0)) < 0.005 ? item : null;
    }) || [];
    if (!settlement || !settlementRequest || !settlement.lines?.length || new Set(settlementItemIds).size !== settlementItemIds.length || paymentItems.some((item) => !item)) { notify('توقف الصرف: تعذر مطابقة التصفية المعتمدة مع كل بنودها المحجوزة، أو صُرف/تغير أحدها سابقًا. لم يُسجل أي تغيير.'); return; }
    const data = new FormData(paySettlement); const paidAt = String(data.get('paidAt') || ''); const method = String(data.get('method') || ''); const reference = String(data.get('reference') || '').trim(); const receipt = data.get('receipt');
    if (!settlement || !paidAt || !method || !reference) { notify('أكمل تاريخ الصرف وطريقته ورقم المرجع قبل تأكيد الدفع.'); return; }
    let receiptFileId = '';
    if (receipt instanceof File && receipt.size) {
      if (receipt.size > 10 * 1024 * 1024 || !(receipt.type.startsWith('image/') || receipt.type === 'application/pdf')) { notify('إثبات الصرف يجب أن يكون صورة أو PDF بحجم لا يتجاوز 10 ميجابايت.'); return; }
      receiptFileId = `leave-settlement-receipt-${settlement.id}`;
      try { await putEmployeeFile({ id: receiptFileId, employeeId: settlement.employeeId, kind: 'leave-settlement-receipt', settlementId: settlement.id, fileName: receipt.name, blob: receipt, createdAt: new Date().toISOString() }); }
      catch (error) { notify(error.message || 'تعذر حفظ إثبات الصرف.'); return; }
    }
    settlement.status = 'paid'; settlement.statusLabel = 'صُرفت'; settlement.paidAt = paidAt; settlement.method = method; settlement.reference = reference; settlement.receiptFileId = receiptFileId; settlement.paidById = sessionIdentifier(); settlement.paidByName = window.NAGM_SESSION?.displayName || sessionIdentifier(); settlement.history ||= []; settlement.history.push({ action: 'paid', actorId: settlement.paidById, actorName: settlement.paidByName, at: new Date().toISOString(), paidAt, method, reference });
    for (const line of settlement.lines) {
      const item = employeeFinancialItems.find((record) => record.id === line.financialItemId);
      item.paymentStatus = 'paid-with-settlement'; item.settlementId = settlement.id; item.settlementNumber = settlement.number; item.settlementKind = line.kind; item.paidAt = paidAt; item.paidAmount = line.amount; item.paymentReference = reference; item.paymentMethod = method; item.paidById = settlement.paidById; item.paidByName = settlement.paidByName;
      item.history ||= []; item.history.push({ action: 'paid-with-settlement', actorId: settlement.paidById, actorName: settlement.paidByName, at: new Date().toISOString(), settlementId: settlement.id, settlementNumber: settlement.number, paidAt, method, reference, amount: line.amount });
    }
    saveEmployeeLeaveSettlements(); saveEmployeeFinancialItems(); leaveAudit('leave-settlement-paid', settlement.id, { paidAt, method, reference, netAmount: settlement.netAmount }); renderEmployeeFinancialManagement(); notify('سُجل الصرف الفعلي وربطت بنوده بالتصفية لمنع صرفها مرة أخرى.'); return;
  }
  const closeProcedures = event.target.closest('[data-close-leave-procedures]');
  if (closeProcedures) {
    event.preventDefault();
    if (!leaveFinanceManager()) { notify('إغلاق إجراءات الموظف متاح للموارد البشرية أو مدير النظام.'); return; }
    const request = employeeLeaveRequests.find((item) => item.id === closeProcedures.dataset.closeLeaveProcedures && item.status === 'approved' && !leaveProceduresAreClosed(item));
    if (!request) { notify('طلب الإجازة غير متاح للإغلاق أو سبق إغلاقه.'); return; }
    const employee = employeeRecords.find((item) => item.id === request.employeeId); const unresolved = employeeFinancialItems.filter((item) => item.employeeId === request.employeeId && !item.archived && (item.approvalStatus === 'pending' || (item.approvalStatus === 'approved' && !['paid', 'paid-with-settlement'].includes(item.paymentStatus))));
    const unpaidSettlements = employeeLeaveSettlements.filter((item) => item.employeeId === request.employeeId && item.status !== 'paid');
    const exception = String(new FormData(closeProcedures).get('exceptionReason') || '').trim();
    if ((unresolved.length || unpaidSettlements.length) && exception.length < 10) { notify(`لا يمكن الإغلاق دون معالجة ${unresolved.length} بنود مالية و${unpaidSettlements.length} تصفيات غير مدفوعة. إذا كان هناك استثناء، اكتب سببًا واضحًا من 10 أحرف على الأقل.`); return; }
    request.procedureClosureHistory ||= [];
    if (request.proceduresCompletedAt) request.procedureClosureHistory.push({ completedAt: request.proceduresCompletedAt, completedBy: request.proceduresCompletedBy || '', completedById: request.proceduresCompletedById || '', exception: request.proceduresException || '', openFinancialItemIds: request.proceduresOpenFinancialItemIds || [], unpaidSettlementIds: request.proceduresUnpaidSettlementIds || [] });
    request.proceduresCompletedAt = new Date().toISOString(); request.proceduresCompletedBy = window.NAGM_SESSION?.displayName || sessionIdentifier(); request.proceduresCompletedById = sessionIdentifier(); request.proceduresException = exception; request.proceduresOpenFinancialItemIds = unresolved.map((item) => item.id); request.proceduresUnpaidSettlementIds = unpaidSettlements.map((item) => item.id);
    saveEmployeeLeaveRequests(); leaveAudit('employee-leave-procedures-closed', request.id, { employeeId: employee?.id, exception, unresolvedItemIds: request.proceduresOpenFinancialItemIds, unpaidSettlementIds: request.proceduresUnpaidSettlementIds }); renderEmployeeFinancialManagement(); notify('تم تسجيل انتهاء الإجراءات بتاريخ واسم المسؤول مع حفظ الاستثناء إن وجد.'); return;
  }
  const signatureForm = event.target.closest('[data-leave-signature-form]');
  if (signatureForm) {
    event.preventDefault();
    if (!isSystemAdmin() && String(new FormData(signatureForm).get('accountId') || '') !== sessionIdentifier()) { notify('يمكنك رفع توقيعك لحسابك فقط؛ تغيير توقيع مسؤول آخر متاح لمدير النظام.'); return; }
    const data = new FormData(signatureForm); const accountId = String(data.get('accountId') || ''); const file = data.get('signature');
    if (!accountId || !file || !file.size || !file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) { notify('اختر مسؤولًا وارفع صورة توقيع PNG أو JPG أو WebP بحجم لا يتجاوز 5 ميجابايت.'); return; }
    const id = `leave-signature-${accountId}-${Date.now()}`;
    try { await putEmployeeFile({ id, employeeId: '', kind: 'leave-signature', accountId, fileName: file.name, blob: file, createdAt: new Date().toISOString(), createdBy: sessionIdentifier() }); }
    catch (error) { notify(error.message || 'تعذر حفظ التوقيع في المعاينة.'); return; }
    leaveApproverSignatures[accountId] = id; localStorage.setItem('nagm-leave-approver-signatures', JSON.stringify(leaveApproverSignatures)); leaveAudit('approver-signature-version-added', accountId, { signatureFileId: id, fileName: file.name });
    renderEmployeeLeaveManagement(); notify('تم حفظ نسخة توقيع جديدة؛ النماذج السابقة تحتفظ بنسختها.'); return;
  }
  const resubmitLeaveForm = event.target.closest('[data-resubmit-leave]');
  if (resubmitLeaveForm) {
    event.preventDefault();
    const request = employeeLeaveRequests.find((item) => item.id === resubmitLeaveForm.dataset.resubmitLeave && item.status === 'needs-revision' && item.requestedBy === sessionIdentifier());
    const data = new FormData(resubmitLeaveForm); const startDate = String(data.get('startDate') || ''); const endDate = String(data.get('endDate') || ''); const leaveType = String(data.get('leaveType') || '');
    if (!request || !startDate || !endDate || endDate < startDate || !leaveType) { notify('أكمل بيانات الإجازة وتأكد من صحة فترة من وإلى.'); return; }
    request.revisionHistory ||= []; request.revisionHistory.push({ note: request.revisionNote || '', returnedAt: request.returnedAt, returnedBy: request.returnedBy, resubmittedAt: new Date().toISOString() });
    request.startDate = startDate; request.endDate = endDate; request.leaveType = leaveType; request.employeeNote = String(data.get('employeeNote') || '').trim(); request.status = 'pending-hr-review'; request.approvalStages = []; request.stageIndex = 0; request.parallelApprovals = {}; request.approvalHistory ||= []; request.approvalHistory.push({ stage: 'إعادة التقديم للموارد البشرية', account: sessionIdentifier(), name: window.NAGM_SESSION?.displayName || sessionIdentifier(), action: 'resubmitted', note: request.employeeNote, at: new Date().toISOString() });
    leaveAudit('leave-resubmitted', request.id, { startDate, endDate, leaveType }); saveEmployeeLeaveRequests(); renderEmployeeLeaveManagement(); renderMyApprovals(); renderMyRequests(); notify('أُعيد إرسال طلب الإجازة إلى الموارد البشرية.'); return;
  }
  const managerForm = event.target.closest('[data-direct-manager-form]');
  if (managerForm) {
    event.preventDefault();
    if (!isSystemAdmin()) { notify('تعديل المدير المباشر متاح لمدير النظام فقط.'); return; }
    const employee = employeeRecords.find((item) => item.id === managerForm.dataset.employeeId);
    const managerId = String(new FormData(managerForm).get('managerEmployeeId') || '');
    if (!employee || managerId === employee.id) { notify('لا يمكن تعيين الموظف مديرًا مباشرًا لنفسه.'); return; }
    employee.directManagerId = managerId; employeeDirectManagers[employee.id] = managerId; saveEmployeeDirectManagers(); leaveAudit('direct-manager-updated', employee.id, { managerId });
    renderEmployeeProfile(employee, 'leave'); renderEmployeeLeaveManagement(); notify('تم حفظ المدير المباشر.'); return;
  }
  const leaveIntakeForm = event.target.closest('[data-leave-intake-form]');
  if (leaveIntakeForm) { event.preventDefault(); handleLeaveIntake(leaveIntakeForm); return; }
  const engineerLeaveForm = event.target.closest('[data-engineer-leave-request]');
  const ownerLeaveForm = event.target.closest('[data-owner-leave-request]');
  if (ownerLeaveForm) {
    event.preventDefault();
    if (!isSystemAdmin()) { notify('رفع طلب إجازة نيابةً عن موظف متاح لمدير النظام فقط.'); return; }
    const data = new FormData(ownerLeaveForm);
    const employee = employeeRecords.find((item) => item.id === String(data.get('employeeId') || '') && item.sponsor === 'الشركة' && !item.archived && !item.systemHidden && !['stopped', 'leave'].includes(item.status));
    const startDate = String(data.get('startDate') || '');
    const endDate = String(data.get('endDate') || '');
    const leaveType = String(data.get('leaveType') || '');
    if (!employee || (employeeLeaveRecords[employee.id]?.startDate && !employeeLeaveRecords[employee.id]?.returnDate) || !startDate || !endDate || endDate < startDate || !leaveType) { notify('اختر موظفًا نشطًا وأكمل نوع الإجازة وتاريخي البداية والنهاية بصورة صحيحة.'); return; }
    if (employeeLeaveRequests.some((item) => item.employeeId === employee.id && !['approved', 'rejected', 'cancelled'].includes(item.status))) { notify('للموظف طلب إجازة مفتوح بالفعل؛ راجعه قبل إنشاء طلب جديد.'); return; }
    const session = window.NAGM_SESSION || {};
    const request = { id: `LEAVE-${Date.now()}`, employeeId: employee.id, requesterType: 'system-admin', requesterName: session.displayName || session.fullName || session.name || session.account || 'مدير النظام', requestedBy: sessionIdentifier(), startDate, endDate, leaveType, employeeNote: String(data.get('employeeNote') || '').trim(), site: employee.site || '', approvalStages: [], stageIndex: 0, approvalHistory: [], status: 'pending-hr-review', createdAt: new Date().toISOString() };
    employeeLeaveRequests.unshift(request); saveEmployeeLeaveRequests(); leaveAudit('leave-request-submitted', request.id, { employeeId: employee.id, requesterType: 'system-admin', startDate, endDate, leaveType, site: employee.site || '' });
    renderEmployeeLeaveManagement(); renderMyApprovals(); renderMyRequests(); notify(`تم تسجيل طلب إجازة ${employee.name} وإضافته لسجل الطلبات لتوجيهه للاعتماد.`); return;
  }
  if (engineerLeaveForm) {
    event.preventDefault();
    if (!sessionRoleValues().has('engineer')) { notify('رفع طلب إجازة نيابةً عن موظف متاح للمهندس المخوّل فقط.'); return; }
    const data = new FormData(engineerLeaveForm);
    const engineerAccount = rentalEngineerAccounts().find((account) => accountIdentifier(account) === sessionIdentifier());
    const engineerSite = engineerAccount?.responsibleSite || Object.entries(rentalSiteEngineerAssignments).find(([, id]) => id === sessionIdentifier())?.[0] || '';
    const employee = employeeRecords.find((item) => item.id === String(data.get('employeeId') || '') && item.status === 'active' && !item.archived && !item.systemHidden && item.sponsor === 'الشركة');
    const startDate = String(data.get('startDate') || ''); const endDate = String(data.get('endDate') || ''); const leaveType = String(data.get('leaveType') || '');
    if (!employee || !engineerSite || !(employee.site === engineerSite || (employeeAllowedSites[employee.id] || []).includes(engineerSite)) || !startDate || !endDate || endDate < startDate || !leaveType) { notify('اختر موظفًا نشطًا في موقع مسؤوليتك وأكمل نوع الإجازة وتاريخي البداية والنهاية.'); return; }
    if (employeeLeaveRecords[employee.id]?.startDate && !employeeLeaveRecords[employee.id]?.returnDate) { notify('للموظف إجازة قائمة؛ سجّل عودته قبل إنشاء طلب جديد.'); return; }
    if (employeeLeaveRequests.some((item) => item.employeeId === employee.id && !['approved', 'rejected'].includes(item.status))) { notify('للموظف طلب إجازة مفتوح بالفعل.'); return; }
    const session = window.NAGM_SESSION || {};
    const request = { id: `LEAVE-${Date.now()}`, employeeId: employee.id, requesterType: 'engineer', requesterName: session.displayName || session.fullName || session.name || session.account || sessionIdentifier(), requestedBy: sessionIdentifier(), startDate, endDate, leaveType, employeeNote: String(data.get('employeeNote') || '').trim(), site: engineerSite, approvalStages: [], stageIndex: 0, approvalHistory: [], status: 'pending-hr-review', createdAt: new Date().toISOString() };
    employeeLeaveRequests.unshift(request); saveEmployeeLeaveRequests(); leaveAudit('leave-request-submitted', request.id, { employeeId: employee.id, requesterType: 'engineer', startDate, endDate, leaveType, site: engineerSite });
    renderEmployeeLeaveManagement(); renderMyApprovals(); renderMyRequests(); notify(`تم إرسال طلب إجازة ${employee.name} إلى الموارد البشرية.`); return;
  }
  const ratingsForm = event.target.closest('[data-ratings-form]');
  if (ratingsForm) {
    event.preventDefault();
    const engineer = !isSystemAdmin() && sessionRoleValues().has('engineer');
    const ownEngineer = rentalEngineerAccounts().find((account) => accountIdentifier(account) === sessionIdentifier());
    const engineerSite = ownEngineer?.responsibleSite || Object.entries(rentalSiteEngineerAssignments).find(([, id]) => id === sessionIdentifier())?.[0] || '';
    const site = engineerSite;
    if (!engineer || !site) { notify('حفظ التقييمات متاح للمهندس المعيّن للموقع فقط.'); return; }
    if (!ratingsMonth || !site) { notify('اختر الشهر والموقع قبل حفظ التقييمات.'); return; }
    const targets = ratingTargetRows(site);
    const changes = targets.map((target) => {
      const key = `${target.type}:${target.id}`;
      const score = Number(ratingsForm.querySelector(`[data-rating-score="${CSS.escape(key)}"]`)?.value);
      const note = ratingsForm.querySelector(`[data-rating-note="${CSS.escape(key)}"]`)?.value.trim() || '';
      return { target, score, note };
    });
    if (changes.some((item) => !Number.isInteger(item.score) || item.score < 1 || item.score > 5 || !item.note)) { notify('أدخل تقييمًا من 1 إلى 5 وملاحظة لكل موظف نشط في الموقع.'); return; }
    const now = new Date().toISOString();
    const evaluatorName = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.fullName || window.NAGM_SESSION?.name || sessionIdentifier();
    for (const { target, score, note } of changes) {
      const existing = employeeRatings.find((item) => item.targetType === target.type && item.targetId === target.id && item.month === ratingsMonth);
      if (existing) {
        existing.history ||= [];
        existing.history.push({ score: existing.score, note: existing.note, evaluatorId: existing.evaluatorId, evaluatorName: existing.evaluatorName, updatedAt: existing.updatedAt || existing.createdAt });
        Object.assign(existing, { score, note, site, evaluatorId: sessionIdentifier(), evaluatorName, updatedAt: now });
      } else employeeRatings.push({ id: `RATE-${target.type}-${target.id}-${ratingsMonth}`, targetType: target.type, targetId: target.id, employeeId: target.type === 'company' ? target.id : '', workerId: target.type === 'rental' ? target.id : '', month: ratingsMonth, site, score, note, evaluatorId: sessionIdentifier(), evaluatorName, createdAt: now, updatedAt: now, history: [] });
    }
    saveEmployeeRatings(); renderRatings();
    notify(`تم حفظ تقييم ${arabicNumber.format(changes.length)} موظفًا عن شهر ${ratingsMonth}.`);
    return;
  }
  const employeeRequestForm = event.target.closest('[data-employee-request-form]');
  if (employeeRequestForm) {
    event.preventDefault();
    const formData = new FormData(employeeRequestForm);
    const employee = currentEmployeeForSession();
    const type = String(formData.get('type') || '');
    if (!sessionRoleValues().has('employee')) { notify('رفع الطلبات من «طلباتي» مخصص لحساب الموظف نفسه.'); return; }
    if (!employee || String(formData.get('employeeId') || '') !== employee.id) { notify('اربط حساب الموظف بملفه الوظيفي؛ الموظف يرفع طلباته لنفسه فقط.'); return; }
    const config = approvalChainConfigs[type];
    if (!config || !config.submitters.includes('employee')) { notify('هذا النوع غير مفعّل للموظفين في سلسلة الاعتماد.'); return; }
    const requester = window.NAGM_SESSION || {};
    const requestedByName = requester.displayName || requester.fullName || requester.name || requester.account || employee.name;
    const now = new Date().toISOString();
    if (type === 'attendance-correction') {
      const date = String(formData.get('punchDate') || '');
      const site = String(formData.get('site') || '');
      const reason = String(formData.get('punchReason') || '').trim();
      if (!date || !site || !reason) { notify('أكمل تاريخ البصمة والموقع وسبب عدم البصمة.'); return; }
      if (date > saudiTodayISO()) { notify('لا يمكن طلب تصحيح بصمة بتاريخ مستقبلي.'); return; }
      if (!correctionSitesForEmployee(employee).includes(site)) { notify('الموقع غير مرتبط بالموظف.'); return; }
      if (!employeeWorkPeriodForDate(employee.id, date)) { notify('لا توجد فترة عمل سارية للموظف في التاريخ المحدد.'); return; }
      if (getCompanyAttendanceRecords().some((record) => record.employeeId === employee.id && record.date === date)) { notify('يوجد حضور مسجل للموظف في هذا التاريخ؛ لا يمكن إنشاء تصحيح مكرر.'); return; }
      if (attendanceCorrectionRequests.some((request) => request.employeeId === employee.id && request.date === date && !['approved', 'rejected'].includes(request.status))) { notify('يوجد طلب تصحيح بصمة مفتوح للموظف في هذا التاريخ.'); return; }
      const routing = correctionApprovalStages(site, sessionIdentifier());
      if (routing.error) { notify(routing.error); return; }
      attendanceCorrectionRequests.unshift({ id: `PUNCH-CORR-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, type, employeeId: employee.id, date, site, reason, requestedBy: sessionIdentifier(), requestedByName, engineerId: routing.engineerId, engineerName: routing.engineerName, approvalStages: routing.stages, stageIndex: 0, stage: 'engineer', status: 'pending-approval', createdAt: now, history: [] });
      saveAttendanceCorrectionRequests();
      notify(`تم إرسال طلب تصحيح البصمة إلى مهندس موقع ${site}.`);
    } else if (type === 'leave') {
      const startDate = String(formData.get('startDate') || '');
      const endDate = String(formData.get('endDate') || '');
      const leaveType = String(formData.get('leaveType') || '');
      if (!startDate || !endDate || endDate < startDate || !leaveType) { notify('حدد نوع الإجازة وفترة البداية والنهاية بصورة صحيحة.'); return; }
      if (employee.status === 'stopped') { notify('لا يمكن رفع طلب إجازة لموظف موقوف.'); return; }
      if (employeeLeaveRecords[employee.id]?.startDate && !employeeLeaveRecords[employee.id]?.returnDate) { notify('للموظف إجازة قائمة؛ سجّل عودته قبل إنشاء طلب جديد.'); return; }
      if (employeeLeaveRequests.some((item) => item.employeeId === employee.id && !['approved', 'rejected'].includes(item.status))) { notify('للموظف طلب إجازة بانتظار الاعتماد بالفعل.'); return; }
      const request = { id: `LEAVE-${Date.now()}`, employeeId: employee.id, requesterType: 'employee', requesterName: requestedByName, requestedBy: sessionIdentifier(), requestedByName, startDate, endDate, leaveType, employeeNote: String(formData.get('leaveNote') || '').trim(), approvalStages: [], stageIndex: 0, approvalHistory: [], status: 'pending-hr-review', createdAt: now };
      employeeLeaveRequests.unshift(request); leaveAudit('leave-request-submitted', request.id, { employeeId: employee.id, requesterType: 'employee', startDate, endDate, leaveType });
      saveEmployeeLeaveRequests();
      notify('تم إرسال طلب الإجازة إلى الموارد البشرية للمراجعة والتوجيه.');
    } else {
      const request = { id: `EMP-REQ-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, type, employeeId: employee.id, requestedBy: sessionIdentifier(), requestedByName, approvalStages: structuredClone(config.stages), stageIndex: 0, approvalHistory: [], status: 'pending-approval', createdAt: now };
      if (type === 'advance') {
        request.amount = Number(formData.get('amount'));
        request.details = String(formData.get('advanceDetails') || '').trim();
        if (!(request.amount > 0) || !request.details) { notify('أدخل مبلغ السلفة وسبب طلبها.'); return; }
      } else if (type === 'other-request') {
        request.subject = String(formData.get('subject') || '').trim();
        request.details = String(formData.get('otherDetails') || '').trim();
        if (!request.subject || !request.details) { notify('اكتب عنوان الطلب وتفاصيله.'); return; }
      } else { notify('نوع الطلب غير معروف.'); return; }
      employeeGeneralRequests.unshift(request);
      saveEmployeeGeneralRequests();
      notify('تم إرسال الطلب إلى سلسلة الاعتمادات.');
    }
    renderMyRequests(); renderMyApprovals();
    return;
  }
  const directLeaveForm = event.target.closest('[data-direct-leave-form]');
  if (directLeaveForm) {
    event.preventDefault();
    const employeeId = directLeaveForm.dataset.employeeId || directLeaveForm.querySelector('[name="employeeId"]').value;
    const startDate = directLeaveForm.querySelector('[name="startDate"]').value;
    const endDate = directLeaveForm.querySelector('[name="endDate"]').value;
    const reasonCategory = directLeaveForm.querySelector('[name="reasonCategory"]').value;
    const reason = directLeaveForm.querySelector('[name="reason"]').value;
    notify(registerDirectEmployeeLeave(employeeId, startDate, endDate, reasonCategory, reason));
    return;
  }
  const newLeaveRequest = event.target.closest('[data-new-leave-request]');
  if (newLeaveRequest) {
    event.preventDefault();
    const formData = new FormData(newLeaveRequest);
    const employeeId = newLeaveRequest.querySelector('[name="employeeId"]').value;
    const requesterType = newLeaveRequest.querySelector('[name="requesterType"]').value;
    const startDate = newLeaveRequest.querySelector('[name="startDate"]').value;
    const employee = employeeRecords.find((item) => item.id === employeeId && !item.archived && !item.systemHidden && item.sponsor === 'الشركة');
    if (!employee || !startDate) { notify('اختر موظفًا مسجلًا وتاريخ بداية الإجازة.'); return; }
    if (employee.status === 'stopped') { notify('لا يمكن رفع طلب إجازة لموظف موقوف.'); return; }
    if (employeeLeaveRecords[employee.id]?.startDate && !employeeLeaveRecords[employee.id]?.returnDate) { notify('للموظف إجازة قائمة؛ سجّل عودته قبل إنشاء طلب جديد.'); return; }
    if (employeeLeaveRequests.some((item) => item.employeeId === employee.id && !['approved', 'rejected'].includes(item.status))) { notify('للموظف طلب إجازة بانتظار الاعتماد بالفعل.'); return; }
    const requesterConfig = approvalChainConfigs.leave;
    if (!requesterConfig.submitters.includes(requesterType)) { notify('نوع مقدم الطلب غير مسموح به في سلسلة اعتماد الإجازات الحالية.'); return; }
    const session = window.NAGM_SESSION || { displayName: 'حساب المالك — معاينة', account: 'owner' };
    if (!sessionRoleValues().has('employee') || currentEmployeeForSession()?.id !== employee.id || requesterType !== 'employee') { notify('طلب الإجازة يُرفع من حساب الموظف نفسه فقط.'); return; }
    const endDate = String(formData.get('endDate') || '');
    const leaveType = String(formData.get('leaveType') || '');
    if (!endDate || endDate < startDate || !leaveType) { notify('حدد نوع الإجازة وتاريخ النهاية الصحيح.'); return; }
    const request = { id: `LEAVE-${Date.now()}`, employeeId, requesterType, requesterName: session.displayName || session.fullName || session.name || session.account || 'الحساب الحالي', requestedBy: sessionIdentifier(), startDate, endDate, leaveType, employeeNote: String(formData.get('leaveNote') || '').trim(), approvalStages: [], stageIndex: 0, approvalHistory: [], status: 'pending-hr-review', createdAt: new Date().toISOString() };
    employeeLeaveRequests.unshift(request); leaveAudit('leave-request-submitted', request.id, { employeeId, requesterType, startDate, endDate, leaveType });
    saveEmployeeLeaveRequests(); renderEmployeeLeaveManagement(); renderMyApprovals(); notify('تم إرسال طلب الإجازة إلى الموارد البشرية للمراجعة والتوجيه.'); return;
  }
  const ownerLeaveApproval = event.target.closest('[data-final-leave-approval]');
  if (ownerLeaveApproval) {
    event.preventDefault();
    const request = employeeLeaveRequests.find((item) => item.id === ownerLeaveApproval.dataset.finalLeaveApproval && !['approved', 'rejected'].includes(item.status));
    const employee = request && employeeRecords.find((item) => item.id === request.employeeId);
    const stage = request && leaveRequestCurrentStage(request);
    if (!request || !employee || (!isSystemAdmin() && (!stage?.final || !userCanApproveStage(stage)))) { notify('الطلب لا ينتظر الاعتماد النهائي من الحساب الحالي.'); return; }
    const reasonCategory = ownerLeaveApproval.querySelector('[name="reasonCategory"]').value;
    const reason = ownerLeaveApproval.querySelector('[name="reason"]').value.trim();
    if (!reasonCategory || !reason) { notify('اختر نوع الإجازة واكتب سببها.'); return; }
    request.approvalHistory ||= [];
    if (!stage.final && leaveFinanceManager()) {
      request.skippedStages = (request.approvalStages || []).slice(Math.max(0, stage.index));
      request.skippedStages.forEach((skippedStage) => request.approvalHistory.push({ stage: approverStageLabel(skippedStage), account: sessionIdentifier(), name: window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.account || 'مالك النظام', action: 'skipped-by-owner', at: new Date().toISOString() }));
    }
    saveApprovedLeaveRequest(request, employee, reasonCategory, reason, false);
    notify(request.startDate <= saudiTodayISO() ? `تمت الموافقة على إجازة ${employee.name} وتسجيل السبب بسرية.` : `تم اعتماد إجازة ${employee.name} المجدولة وتسجيل السبب بسرية.`); return;
  }
  const suspensionForm = event.target.closest('[data-suspension-form]');
  if (suspensionForm) {
    event.preventDefault();
    if (!isSystemAdmin()) { notify('تفاصيل الإيقاف متاحة لمالك النظام أو مدير النظام فقط.'); return; }
    const employee = employeeRecords.find((item) => item.id === suspensionForm.dataset.employeeId && item.status === 'stopped');
    if (!employee) return;
    employeeStatusDetails[employee.id] = { ...(employeeStatusDetails[employee.id] || {}), category: suspensionForm.querySelector('[name="category"]').value, reason: suspensionForm.querySelector('[name="reason"]').value.trim(), updatedAt: new Date().toISOString() };
    saveEmployeeStatusDetails(); renderEmployeeProfile(employee, 'overview'); notify('تم حفظ سبب الإيقاف في بيانات المعاينة.'); return;
  }
  const periodDefinitionForm = event.target.closest('[data-period-definition-form]');
  if (periodDefinitionForm) {
    event.preventDefault();
    const name = periodDefinitionForm.querySelector('[data-period-name]').value.trim();
    const mode = periodDefinitionForm.querySelector('[data-period-mode]').value;
    const values = mode === 'split' ? {
      mode,
      segments: [
        { startTime: periodDefinitionForm.querySelector('[data-period-start-1]').value, endTime: periodDefinitionForm.querySelector('[data-period-end-1]').value, endDay: 'same' },
        { startTime: periodDefinitionForm.querySelector('[data-period-start-2]').value, endTime: periodDefinitionForm.querySelector('[data-period-end-2]').value, endDay: 'same' },
      ],
      beforeMinutes: Number(periodDefinitionForm.querySelector('[data-period-before]').value),
      afterMinutes: Number(periodDefinitionForm.querySelector('[data-period-after]').value),
    } : {
      mode,
      startTime: periodDefinitionForm.querySelector('[data-period-start]').value,
      endTime: periodDefinitionForm.querySelector('[data-period-end]').value,
      endDay: periodDefinitionForm.querySelector('[data-period-end-day]').value,
      beforeMinutes: Number(periodDefinitionForm.querySelector('[data-period-before]').value),
      afterMinutes: Number(periodDefinitionForm.querySelector('[data-period-after]').value),
    };
    const validationError = validateWorkPeriodValues(values);
    if (!name) { notify('اكتب اسمًا للفترة.'); return; }
    if (validationError) { notify(validationError); return; }
    const duplicate = employeePeriodDefinitions.some((period) => period.id !== editingEmployeePeriodId && period.name.trim().toLocaleLowerCase('ar') === name.toLocaleLowerCase('ar'));
    if (duplicate) { notify('يوجد فترة بهذا الاسم بالفعل. اكتب اسمًا مختلفًا.'); return; }
    const index = employeePeriodDefinitions.findIndex((period) => period.id === editingEmployeePeriodId);
    const period = { ...(index >= 0 ? employeePeriodDefinitions[index] : { id: nextEmployeePeriodId() }), name, ...values };
    if (index >= 0) employeePeriodDefinitions[index] = period;
    else employeePeriodDefinitions.push(period);
    localStorage.setItem('nagm-employee-period-definitions', JSON.stringify(employeePeriodDefinitions));
    editingEmployeePeriodId = null;
    renderEmployeePeriodManagement();
    notify(index >= 0 ? `تم تعديل الفترة «${name}».` : `تم حفظ الفترة «${name}».`);
    return;
  }

  const periodAssignmentForm = event.target.closest('[data-period-assignment-form]');
  if (periodAssignmentForm) {
    event.preventDefault();
    const periodId = periodAssignmentForm.querySelector('input[name="assignment-period"]:checked')?.value;
    const employeeIds = [...periodAssignmentForm.querySelectorAll('input[name="period-employee"]:checked')].map((input) => input.value);
    const period = employeePeriodDefinitions.find((item) => item.id === periodId);
    const fromDate = periodAssignmentForm.querySelector('[data-period-assignment-from]').value;
    const toDate = periodAssignmentForm.querySelector('[data-period-assignment-to]').value;
    if (!period) { notify('اختر فترة محفوظة أولًا.'); return; }
    if (!employeeIds.length) { notify('ابحث عن الموظفين وحدد موظفًا واحدًا على الأقل.'); return; }
    const dateError = validatePeriodAssignmentDates(fromDate, toDate);
    if (dateError) { notify(dateError); return; }
    employeeIds.forEach((employeeId) => {
      const history = employeeWorkPeriodHistory(employeeId);
      history.push({ ...period, periodId: period.id, periodName: period.name, fromDate, toDate, assignmentId: `assignment-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, assignedAt: new Date().toISOString() });
      saveEmployeeWorkPeriodHistory(employeeId, history);
    });
    renderEmployeePeriodAssignment();
    notify(`تم تعيين «${period.name}» على ${arabicNumber.format(employeeIds.length)} موظفين من ${fromDate} إلى ${toDate}.`);
    return;
  }

  const manualAttendanceForm = event.target.closest('[data-manual-attendance-form]');
  if (manualAttendanceForm) {
    event.preventDefault();
    const plan = manualAttendancePlan(manualAttendanceEmployeeId, manualAttendanceDate);
    if (plan.error) { notify(plan.error); renderManualAttendancePreview(); return; }
    const { employee, date, period, site } = plan;
    const startTime = periodStartTime(period);
    const endTime = periodEndTime(period);
    const time = `${startTime}:00`;
    const departureDate = period.endDay === 'next' ? shiftSaudiDate(date, 1) : date;
    const departureTime = `${endTime}:00`;
    const periodSnapshot = { ...period, periodId: period.periodId || period.id || '', periodName: period.periodName || period.name || 'فترة العمل', fromDate: period.fromDate || '', toDate: period.toDate || '' };
    const record = {
      id: `MANUAL-ATT-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      employeeId: employee.id, date, time,
      timestamp: new Date(`${date}T${time}+03:00`).toISOString(),
      departureDate, departureTime, site, department: employee.department,
      source: 'manual', attendanceType: 'full-shift', periodSnapshot,
      workMinutes: periodWorkMinutes(period), breakMinutes: periodBreakMinutes(period),
    };
    manualCompanyAttendanceRecords.push(record);
    localStorage.setItem('nagm-company-manual-attendance', JSON.stringify(manualCompanyAttendanceRecords));
    punchRange = 'custom'; punchFromDate = date; punchToDate = date; punchEmployeeId = employee.id; punchQuery = '';
    manualAttendanceEmployeeId = '';
    manualAttendanceDate = date;
    renderAttendanceManagement();
    notify(`تم تسجيل دوام كامل لـ${employee.name} يوم ${date}: ${periodDisplay(period)}.`);
    return;
  }

  const custodyCreateForm = event.target.closest('[data-custody-create-form]');
  if (custodyCreateForm) {
    event.preventDefault();
    const formData = new FormData(custodyCreateForm);
    const statement = String(formData.get('statement') || '').trim();
    const serial = String(formData.get('serial') || '').trim();
    const phoneNumber = String(formData.get('phoneNumber') || '').trim();
    const value = Number(formData.get('value'));
    const documentFile = custodyCreateForm.querySelector('[name="document"]').files?.[0];
    if (!statement || !Number.isFinite(value) || value < 0) { notify('اكتب بيان العهدة وقيمتها بشكل صحيح.'); return; }
    if (serial && employeeCustodyRecords.some((item) => item.serial && item.serial.toLocaleLowerCase('ar') === serial.toLocaleLowerCase('ar'))) { notify('رقم السيريال مسجل لعهدة أخرى.'); return; }
    if (documentFile && documentFile.size > 10 * 1024 * 1024) { notify('حجم المرفق يجب ألا يتجاوز 10 ميجابايت في المعاينة.'); return; }
    const id = `CST-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const item = { id, statement, serial, phoneNumber, value, status: 'office', employeeId: '', receivedDate: '', createdDate: saudiTodayISO(), documentName: documentFile?.name || '', events: [] };
    try {
      if (documentFile) await putCustodyAttachment(id, documentFile);
      employeeCustodyRecords.unshift(item);
      saveEmployeeCustodyRecords();
      renderEmployeeCustodyManagement();
      notify(`تم تسجيل عهدة «${statement}» في المكتب.`);
    } catch (error) { notify(error.message); }
    return;
  }

  const custodyAssignForm = event.target.closest('[data-custody-assign-form]');
  if (custodyAssignForm) {
    event.preventDefault();
    const item = employeeCustodyRecords.find((record) => record.id === custodyAssignForm.dataset.custodyId);
    const employee = employeeRecords.find((record) => record.id === custodyAssignForm.querySelector('[name="employeeId"]').value);
    const receivedDate = custodyAssignForm.querySelector('[name="receivedDate"]').value;
    if (!item || item.status !== 'office' || !employee || !receivedDate) { notify('اختر عهدة من المكتب وموظفًا وتاريخ الاستلام.'); return; }
    item.status = 'assigned'; item.employeeId = employee.id; item.receivedDate = receivedDate;
    item.events ||= []; item.events.push({ type: 'issued', employeeId: employee.id, date: receivedDate });
    saveEmployeeCustodyRecords(); openEmployeeCustodyAction = null; renderEmployeeCustodyManagement();
    notify(`تم تسليم «${item.statement}» إلى ${employee.name}.`);
    return;
  }

  const custodyReturnForm = event.target.closest('[data-custody-return-form]');
  if (custodyReturnForm) {
    event.preventDefault();
    const item = employeeCustodyRecords.find((record) => record.id === custodyReturnForm.dataset.custodyId);
    const returnDate = custodyReturnForm.querySelector('[name="returnDate"]').value;
    if (!item || item.status !== 'assigned' || !returnDate) { notify('حدد العهدة وتاريخ استلام المكتب.'); return; }
    const employee = employeeRecords.find((record) => record.id === item.employeeId);
    item.events ||= []; item.events.push({ type: 'returned', employeeId: item.employeeId, date: returnDate });
    item.lastEmployeeId = item.employeeId; item.lastReturnDate = returnDate; item.employeeId = ''; item.status = 'office';
    saveEmployeeCustodyRecords(); openEmployeeCustodyAction = null; renderEmployeeCustodyManagement();
    notify(`تم استلام «${item.statement}» من ${employee?.name || 'الموظف'} في المكتب.`);
    return;
  }

  const siteForm = event.target.closest('[data-site-map-form]');
  if (siteForm) {
    event.preventDefault();
    const siteName = siteForm.querySelector('[data-new-site-name]').value.trim();
    const radiusMeters = Number(siteForm.querySelector('[data-new-site-radius]').value);
    const coordinates = selectedEmployeeSiteCoordinates;
    if (!siteName || !coordinates || !Number.isFinite(coordinates.latitude) || !Number.isFinite(coordinates.longitude)
      || coordinates.latitude < -90 || coordinates.latitude > 90 || coordinates.longitude < -180 || coordinates.longitude > 180
      || !Number.isInteger(radiusMeters) || radiusMeters < 1) {
      notify('اختر الموقع من الخريطة، واكتب الاسم ونطاق السماح بالمتر.');
      return;
    }
    const duplicateName = employeeSiteNames.some((otherSite) => otherSite !== editingEmployeeSite && otherSite.toLocaleLowerCase('ar') === siteName.toLocaleLowerCase('ar'));
    if (duplicateName) { notify('يوجد موقع بهذا الاسم بالفعل. اكتب اسمًا مختلفًا.'); return; }
    const previousName = editingEmployeeSite;
    const existingSettings = previousName ? defaultEmployeeSiteGeofence(previousName, employeeSiteNames.indexOf(previousName)) : null;
    if (previousName && previousName !== siteName) {
      employeeSiteNames = employeeSiteNames.map((site) => site === previousName ? siteName : site);
      employeeSiteGeofences[siteName] = existingSettings;
      delete employeeSiteGeofences[previousName];
      Object.entries(employeeAllowedSites).forEach(([employeeId, sites]) => {
        employeeAllowedSites[employeeId] = sites.map((site) => site === previousName ? siteName : site);
      });
      localStorage.setItem('nagm-employee-allowed-sites', JSON.stringify(employeeAllowedSites));
    } else if (!previousName) {
      const newLocationId = nextEmployeeLocationId();
      employeeSiteNames.push(siteName);
      employeeSiteGeofences[siteName] = { locationId: newLocationId, latitude: '', longitude: '', radiusMeters: '' };
    }
    const siteIndex = employeeSiteNames.indexOf(siteName);
    const currentSettings = employeeSiteGeofences[siteName] || defaultEmployeeSiteGeofence(siteName, siteIndex);
    employeeSiteGeofences[siteName] = {
      ...currentSettings,
      latitude: String(coordinates.latitude), longitude: String(coordinates.longitude), radiusMeters: String(radiusMeters),
    };
    localStorage.setItem('nagm-employee-location-sites', JSON.stringify(employeeSiteNames));
    localStorage.setItem('nagm-employee-site-geofences', JSON.stringify(employeeSiteGeofences));
    editingEmployeeSite = null;
    selectedEmployeeSiteCoordinates = null;
    renderEmployeeLocationManagement();
    notify(previousName ? `تم حفظ إعدادات ${siteName}.` : `تمت إضافة ${siteName} برقم ${employeeSiteGeofences[siteName].locationId}.`);
    return;
  }

  const bulkAssignment = event.target.closest('[data-bulk-location-assignment]');
  if (bulkAssignment) {
    event.preventDefault();
    const sites = [...bulkAssignment.querySelectorAll('input[name="bulk-site"]:checked:not(:disabled)')].map((input) => input.value);
    const employees = [...bulkAssignment.querySelectorAll('input[name="bulk-employee"]:checked')].map((input) => input.value);
    if (!sites.length) { notify('اختر موقعًا واحدًا على الأقل.'); return; }
    if (!employees.length) { notify('ابحث عن الموظفين وحدد موظفًا واحدًا على الأقل.'); return; }
    const mode = bulkAssignment.querySelector('[data-location-assignment-mode]').value;
    for (const employeeId of employees) {
      const existingSites = employeeAllowedSites[employeeId] || [];
      employeeAllowedSites[employeeId] = mode === 'add' ? [...new Set([...existingSites, ...sites])] : sites;
    }
    localStorage.setItem('nagm-employee-allowed-sites', JSON.stringify(employeeAllowedSites));
    renderEmployeeLocationAssignment();
    notify(`تم تطبيق ${arabicNumber.format(sites.length)} مواقع على ${arabicNumber.format(employees.length)} موظفين.`);
    return;
  }

  const locationAssignment = event.target.closest('[data-location-assignment]');
  if (locationAssignment) {
    event.preventDefault();
    const employee = employeeRecords.find((record) => record.id === locationAssignment.dataset.employeeId);
    if (!employee) return;
    const sites = [...locationAssignment.querySelectorAll('input[name="employee-site"]:checked')].map((input) => input.value);
    employeeAllowedSites[employee.id] = sites;
    localStorage.setItem('nagm-employee-allowed-sites', JSON.stringify(employeeAllowedSites));
    if (locationAssignment.dataset.locationScope === 'profile') {
      await renderEmployeeProfile(employee, 'locations');
    } else {
      renderEmployeeLocationManagement();
    }
    notify(sites.length ? `تم حفظ مواقع البصمة المسموح بها لـ${employee.name}.` : `تمت إزالة كل مواقع البصمة من ${employee.name}.`);
    return;
  }

  const periodForm = event.target.closest('[data-management-period-form]');
  if (periodForm) {
    event.preventDefault();
    const employee = employeeRecords.find((record) => record.id === periodForm.dataset.employeeId);
    if (!employee) return;
    const error = saveEmployeeWorkPeriod(employee, {
      startTime: periodForm.querySelector('[data-period-start]').value,
      endTime: periodForm.querySelector('[data-period-end]').value,
      endDay: periodForm.querySelector('[data-period-end-day]').value,
      beforeMinutes: Number(periodForm.querySelector('[data-period-before]').value),
      afterMinutes: Number(periodForm.querySelector('[data-period-after]').value),
    });
    if (error) { notify(error); return; }
    renderEmployeePeriodManagement();
    notify(`تم حفظ فترة ${employee.name}.`);
    return;
  }
  const returnForm = event.target.closest('[data-management-return-form]');
  if (returnForm) {
    event.preventDefault();
    if (!isSystemAdmin()) { notify('تسجيل العودة للعمل متاح لمالك النظام أو مدير النظام فقط.'); return; }
    const employee = employeeRecords.find((record) => record.id === returnForm.dataset.employeeId);
    if (!employee) return;
    const error = saveEmployeeReturn(employee, returnForm.querySelector('[name="returnDate"]').value);
    if (error) { notify(error); return; }
    renderEmployeeList();
    renderEmployeeLeaveManagement();
    renderDashboardSummary();
    renderEmployeeReturns();
    if (selectedEmployee?.id === employee.id) await renderEmployeeProfile(employee, 'leave');
    notify(`تم تسجيل عودة ${employee.name}.`);
    return;
  }
  const suspensionReturnForm = event.target.closest('[data-suspension-return-form]');
  if (suspensionReturnForm) {
    event.preventDefault();
    if (!isSystemAdmin()) { notify('تسجيل العودة من الإيقاف متاح لمالك النظام أو مدير النظام فقط.'); return; }
    const employee = employeeRecords.find((record) => record.id === suspensionReturnForm.dataset.employeeId);
    if (!employee) return;
    const error = saveEmployeeSuspensionReturn(employee, suspensionReturnForm.querySelector('[name="returnDate"]').value);
    if (error) { notify(error); return; }
    renderEmployeeList(); renderDashboardSummary(); renderEmployeeReturns();
    if (selectedEmployee?.id === employee.id) await renderEmployeeProfile(employee, 'leave');
    notify(`تم إنهاء إيقاف ${employee.name} وتسجيل عودته للعمل.`);
  }
});
document.querySelectorAll('[data-status-filter]').forEach((button) => button.addEventListener('click', () => {
  employeeFilter = button.dataset.statusFilter;
  document.querySelectorAll('[data-status-filter]').forEach((filter) => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  renderEmployeeList();
}));
document.querySelectorAll('[data-list-mode]').forEach((button) => button.addEventListener('click', () => {
  employeeMode = button.dataset.listMode;
  document.querySelectorAll('[data-list-mode]').forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  renderEmployeeList();
}));
employeeSearch.addEventListener('input', renderEmployeeList);
const jobFilter = document.querySelector('[data-job-filter]');
[...new Set(employeeRecords.map((employee) => employee.job))].sort().forEach((job) => jobFilter.add(new Option(job, job)));
jobFilter.addEventListener('change', renderEmployeeList);
document.querySelectorAll('[data-count]').forEach((node) => {
  const status = node.dataset.count;
  node.textContent = arabicNumber.format(status === 'all' ? employeeRecords.filter((employee) => !employee.archived && !employee.systemHidden).length : employeeRecords.filter((employee) => !employee.archived && !employee.systemHidden && employee.status === status).length);
});
renderEmployeeList();
document.querySelector('[data-archive-toggle]').addEventListener('click', (event) => {
  showArchivedEmployees = !showArchivedEmployees;
  event.currentTarget.setAttribute('aria-pressed', String(showArchivedEmployees));
  event.currentTarget.textContent = showArchivedEmployees ? 'العودة للموظفين الحاليين' : 'أرشيف الموظفين';
  document.querySelector('.employees-heading h2').textContent = showArchivedEmployees ? 'أرشيف الموظفين' : 'الموظفون';
  document.querySelector('.employees-heading p').textContent = showArchivedEmployees ? 'موظفون مؤرشفون أو مخفيون؛ سجلاتهم محفوظة ويمكن إظهارهم مجددًا' : 'سجلات موظفي الشركة وبياناتهم الوظيفية';
  renderEmployeeList();
});
employeeList.addEventListener('click', (event) => {
  const action = event.target.closest('[data-profile-action]');
  if (action) {
    event.stopPropagation();
    if (action.dataset.profileAction === 'edit') notify('نموذج تعديل الموظف سيُجهز ضمن خطوة تحرير البيانات.');
    else renderEmployeeProfile(employeeRecords.find((employee) => employee.id === action.dataset.employeeId));
    return;
  }
  const row = event.target.closest('[data-open-employee]');
  if (row) renderEmployeeProfile(employeeRecords.find((employee) => employee.id === row.dataset.openEmployee));
});
employeeList.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    const row = event.target.closest('[data-open-employee]');
    if (row) { event.preventDefault(); renderEmployeeProfile(employeeRecords.find((employee) => employee.id === row.dataset.openEmployee)); }
  }
});
employeeProfile.addEventListener('click', async (event) => {
  if (event.target.closest('[data-back-employees]')) {
    leaveEmployeeProfile();
    return;
  }
  if (event.target.closest('[data-profile-attendance-management]')) {
    const employee = selectedEmployee;
    if (employee) {
      const records = getCompanyAttendanceRecords().filter((record) => record.employeeId === employee.id);
      const dates = records.map((record) => record.date).filter(Boolean).sort();
      punchEmployeeId = employee.id;
      punchRange = 'custom';
      punchFromDate = dates[0] || saudiTodayISO();
      punchToDate = dates.at(-1) || saudiTodayISO();
      punchQuery = '';
    }
    setCurrentView('attendance-management');
    return;
  }
  if (event.target.closest('[data-profile-action="edit"]')) notify('نموذج تعديل الموظف سيُجهز ضمن خطوة تحرير البيانات.');
  const sectionButton = event.target.closest('[data-profile-section]');
  if (sectionButton) { renderEmployeeProfile(selectedEmployee, sectionButton.dataset.profileSection); return; }
  if (event.target.closest('[data-photo-trigger]')) { employeeProfile.querySelector('[data-photo-input]').click(); return; }
  const archiveButton = event.target.closest('[data-archive-employee]');
  if (archiveButton && selectedEmployee && window.confirm(`أرشفة سجل ${selectedEmployee.name}؟ سيختفي من القائمة الحالية ويمكن استعادته من الأرشيف.`)) {
    selectedEmployee.archived = true;
    archivedEmployeeIds.add(selectedEmployee.id);
    saveArchivedEmployeeIds();
    leaveEmployeeProfile();
    notify('تمت أرشفة الموظف. يمكنك استعادته من أرشيف الموظفين.');
  }
  const restoreSystemHidden = event.target.closest('[data-restore-system-hidden-employee]');
  if (restoreSystemHidden && selectedEmployee?.id === restoreSystemHidden.dataset.restoreSystemHiddenEmployee) {
    selectedEmployee.systemHidden = false;
    selectedEmployee.archived = false;
    hiddenEmployeeIds.delete(selectedEmployee.id);
    archivedEmployeeIds.delete(selectedEmployee.id);
    showArchivedEmployees = false;
    saveHiddenEmployeeIds(); saveArchivedEmployeeIds();
    const archiveToggle = document.querySelector('[data-archive-toggle]');
    archiveToggle?.setAttribute('aria-pressed', 'false');
    if (archiveToggle) archiveToggle.textContent = 'أرشيف الموظفين';
    document.querySelector('.employees-heading h2').textContent = 'الموظفون';
    document.querySelector('.employees-heading p').textContent = 'سجلات موظفي الشركة وبياناتهم الوظيفية';
    leaveEmployeeProfile(); renderEmployeeList(); renderDashboardSummary();
    notify('تم إظهار الموظف في النظام مجددًا مع بقاء سجلاته السابقة.');
    return;
  }
  const restoreButton = event.target.closest('[data-restore-employee]');
  if (restoreButton && selectedEmployee) {
    selectedEmployee.archived = false;
    archivedEmployeeIds.delete(selectedEmployee.id);
    saveArchivedEmployeeIds();
    leaveEmployeeProfile();
    notify('تمت استعادة الموظف إلى القائمة الحالية.');
  }
});
employeeProfile.addEventListener('change', async (event) => {
  if (event.target.matches('[data-attachment-employee]')) {
    const employee = employeeRecords.find((record) => record.id === event.target.value);
    if (employee) renderEmployeeProfile(employee, 'attachments');
    return;
  }
  if (!event.target.matches('[data-photo-input]')) return;
  const file = event.target.files?.[0];
  const employee = selectedEmployee;
  if (!file || !employee) return;
  if (!file.type.startsWith('image/')) { notify('اختر ملف صورة صالحًا.'); event.target.value = ''; return; }
  if (file.size > 5 * 1024 * 1024) { notify('حجم الصورة يجب ألا يتجاوز 5 ميجابايت في المعاينة.'); event.target.value = ''; return; }
  try {
    const files = await getEmployeeFiles(employee.id);
    const previousPhoto = files.find((record) => record.kind === 'photo');
    if (previousPhoto) await removeEmployeeFile(previousPhoto.id);
    await putEmployeeFile({ id: `photo-${employee.id}`, employeeId: employee.id, kind: 'photo', fileName: file.name, blob: file, createdAt: new Date().toISOString() });
    await renderEmployeeProfile(employee, employeeProfile.dataset.profileSection || 'overview');
    notify('تم حفظ صورة الموظف في معاينة هذا المتصفح.');
  } catch (error) {
    notify(error.message);
  } finally {
    event.target.value = '';
  }
});
employeeProfile.addEventListener('submit', async (event) => {
  if (event.target.matches('[data-employee-signature-form]')) {
    event.preventDefault();
    const form = event.target;
    const employee = employeeRecords.find((item) => item.id === form.dataset.employeeId);
    const currentEmployee = currentEmployeeForSession();
    const file = form.querySelector('[name="signature"]')?.files?.[0];
    if (!employee || (!isSystemAdmin() && currentEmployee?.id !== employee.id)) { notify('تعديل توقيع الموظف متاح لمدير النظام أو الموظف نفسه.'); return; }
    if (!(file instanceof File) || !file.size || !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) { notify('اختر صورة توقيع PNG أو JPG لا يتجاوز حجمها 10 ميجابايت.'); return; }
    const id = `employee-leave-signature-${employee.id}-${Date.now()}`;
    try { await putEmployeeFile({ id, employeeId: employee.id, kind: 'employee-leave-signature', fileName: file.name, mimeType: file.type, blob: file, createdAt: new Date().toISOString(), createdBy: sessionIdentifier() }); }
    catch (error) { notify(error.message || 'تعذر حفظ صورة التوقيع.'); return; }
    employeeLeaveSignatures[employee.id] = id;
    registeredAccounts.filter((account) => account.employeeId === employee.id).forEach((account) => { leaveApproverSignatures[accountIdentifier(account)] = id; });
    if (currentEmployee?.id === employee.id) leaveApproverSignatures[sessionIdentifier()] = id;
    saveEmployeeLeaveSignatures(); localStorage.setItem('nagm-leave-approver-signatures', JSON.stringify(leaveApproverSignatures));
    leaveAudit('employee-leave-signature-added', employee.id, { signatureFileId: id, fileName: file.name });
    await renderEmployeeProfile(employee, 'signature'); renderEmployeeLeaveManagement(); notify('تم حفظ نسخة التوقيع في ملف الموظف. ستستخدم في الاعتمادات الجديدة فقط.');
    return;
  }
  if (event.target.matches('[data-profile-custody-assign]')) {
    event.preventDefault();
    const employee = selectedEmployee;
    const form = event.target;
    const item = employeeCustodyRecords.find((record) => record.id === form.querySelector('[name="custodyId"]').value);
    const receivedDate = form.querySelector('[name="receivedDate"]').value;
    if (!employee || !item || item.status !== 'office' || !receivedDate) { notify('اختر عهدة متاحة وحدد تاريخ استلام الموظف.'); return; }
    item.status = 'assigned'; item.employeeId = employee.id; item.receivedDate = receivedDate;
    item.events ||= []; item.events.push({ type: 'issued', employeeId: employee.id, date: receivedDate });
    saveEmployeeCustodyRecords();
    await renderEmployeeProfile(employee, 'custody');
    notify(`تمت إضافة «${item.statement}» إلى عهد ${employee.name}.`);
    return;
  }
  if (event.target.matches('[data-profile-custody-return]')) {
    event.preventDefault();
    const employee = selectedEmployee;
    const form = event.target;
    const item = employeeCustodyRecords.find((record) => record.id === form.dataset.custodyId && record.employeeId === employee?.id && record.status === 'assigned');
    const returnDate = form.querySelector('[name="returnDate"]').value;
    if (!employee || !item || !returnDate) { notify('حدد تاريخ تسليم العهدة للمكتب.'); return; }
    item.events ||= []; item.events.push({ type: 'returned', employeeId: employee.id, date: returnDate });
    item.lastEmployeeId = employee.id; item.lastReturnDate = returnDate; item.employeeId = ''; item.status = 'office';
    saveEmployeeCustodyRecords();
    await renderEmployeeProfile(employee, 'custody');
    notify(`تم تسليم «${item.statement}» للمكتب.`);
    return;
  }
  if (event.target.matches('[data-period-form]')) {
    event.preventDefault();
    const employee = selectedEmployee;
    const form = event.target;
    if (!employee) return;
    const periodId = form.querySelector('input[name="profile-period-choice"]:checked')?.value;
    const period = employeePeriodDefinitions.find((item) => item.id === periodId);
    if (!period) { notify('اختر فترة محفوظة أولًا.'); return; }
    const fromDate = form.querySelector('[data-profile-period-from]').value;
    const toDate = form.querySelector('[data-profile-period-to]').value;
    const dateError = validatePeriodAssignmentDates(fromDate, toDate);
    if (dateError) { notify(dateError); return; }
    const history = employeeWorkPeriodHistory(employee.id);
    history.push({ ...period, periodId: period.id, periodName: period.name, fromDate, toDate, assignmentId: `assignment-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, assignedAt: new Date().toISOString() });
    saveEmployeeWorkPeriodHistory(employee.id, history);
    editingEmployeeProfilePeriod = false;
    await renderEmployeeProfile(employee, 'period');
    notify(`تم تعيين فترة «${period.name}» لـ${employee.name}.`);
    return;
  }
  if (!event.target.matches('[data-attachment-form]')) return;
  event.preventDefault();
  const form = event.target;
  const employeeId = form.querySelector('[data-attachment-employee]').value;
  const label = form.querySelector('[data-attachment-label]').value.trim();
  const file = form.querySelector('[data-attachment-file]').files?.[0];
  const visibility = form.querySelector('[data-attachment-visibility]').value;
  if (!employeeId || !label || !file) { notify('اختر الموظف واكتب اسم المرفق واختر الملف.'); return; }
  if (file.size > 15 * 1024 * 1024) { notify('حجم المرفق يجب ألا يتجاوز 15 ميجابايت في المعاينة.'); return; }
  const employee = employeeRecords.find((record) => record.id === employeeId);
  try {
    await putEmployeeFile({ id: `attachment-${crypto.randomUUID()}`, employeeId, kind: 'attachment', label, fileName: file.name, blob: file, visibility, createdAt: new Date().toISOString() });
    notify(`تم حفظ «${label}» للموظف ${employee.name} في المعاينة.`);
    renderEmployeeProfile(employee, 'attachments');
  } catch (error) {
    notify(error.message);
  }
});
employeeProfile.addEventListener('click', async (event) => {
  if (!event.target.closest('[data-cancel-leave]')) return;
  const employee = selectedEmployee;
  const leave = employee && employeeLeaveRecords[employee.id];
  if (!employee || !leave || leave.startDate <= saudiTodayISO()) return;
  employee.status = leave.statusBeforeLeave || 'active';
  delete employeeLeaveRecords[employee.id];
  saveEmployeeLeaveRecords();
  renderEmployeeList();
  await renderEmployeeProfile(employee, 'leave');
  notify('تم إلغاء الإجازة المجدولة.');
});
window.setInterval(syncScheduledEmployeeLeaves, 60_000);
window.addEventListener('focus', syncScheduledEmployeeLeaves);
document.querySelectorAll('[data-demo-action]').forEach((button) => button.addEventListener('click', () => {
  const messages = { template: 'قالب Excel سيُجهز مع اعتماد أعمدة الاستيراد.', import: 'استيراد Excel سيعرض معاينة قبل حفظ أي سجل.', add: 'إضافة الموظف ستُفعل عند تجهيز نموذج البيانات.' };
  notify(messages[button.dataset.demoAction]);
}));

const rentalRecords = [
  { id: 'RNT-101', name: 'عامل إيجاري 01', job: 'عامل عام', status: 'active', residency: '24••••••17', nationality: 'مصري', religion: 'مسلم', residence: 'سكن الشركة — الرياض', previousSite: 'موقع العيون · أكتوبر ٢٠٢٦', wage: '٢٬٨٠٠ ر.س' },
  { id: 'RNT-102', name: 'عامل إيجاري 02', job: 'حداد مسلح', status: 'active', residency: '25••••••62', nationality: 'يمني', religion: 'مسلم', residence: 'حي الشفا — الرياض', previousSite: 'موقع المربع · سبتمبر ٢٠٢٦', wage: '٣٬٢٠٠ ر.س' },
  { id: 'RNT-103', name: 'عامل إيجاري 03', job: 'نجار مسلح', status: 'leave', residency: '23••••••49', nationality: 'سوداني', religion: 'مسلم', residence: 'سكن الشركة — الرياض', previousSite: 'الورشة · أكتوبر ٢٠٢٦', wage: '٣٬٠٠٠ ر.س' },
  { id: 'RNT-104', name: 'عامل إيجاري 04', job: 'كهربائي', status: 'active', residency: '21••••••83', nationality: 'أردني', religion: 'مسلم', residence: 'حي الروضة — الرياض', previousSite: 'موقع المطار · أكتوبر ٢٠٢٦', wage: '٣٬٥٠٠ ر.س' },
  { id: 'RNT-105', name: 'عامل إيجاري 05', job: 'سائق معدات', status: 'stopped', residency: '26••••••35', nationality: 'هندي', religion: 'هندوسي', residence: 'حي الصناعية — الرياض', previousSite: 'موقع المربع · أغسطس ٢٠٢٦', wage: '٣٬٤٠٠ ر.س' },
  { id: 'RNT-106', name: 'عامل إيجاري 06', job: 'مبلط', status: 'active', residency: '22••••••91', nationality: 'باكستاني', religion: 'مسلم', residence: 'سكن الشركة — الرياض', previousSite: 'موقع العيون · أكتوبر ٢٠٢٦', wage: '٢٬٩٠٠ ر.س' },
];

let ratingsMonth = saudiTodayISO().slice(0, 7);
let ratingsSite = '';
function rentalWorkerCurrentSite(worker) {
  const latest = rentalDirectHireRequests.filter((request) => request.workerId === worker.id && request.status === 'approved').sort((a, b) => String(b.approvedAt || b.createdAt).localeCompare(String(a.approvedAt || a.createdAt)))[0];
  return latest?.site || String(worker.previousSite || '').split('·')[0].trim();
}
function ratingTargetRows(site) {
  const company = employeeRecords.filter((employee) => employee.status === 'active' && !employee.archived && !employee.systemHidden && employee.sponsor === 'الشركة' && (employee.site === site || (employeeAllowedSites[employee.id] || []).includes(site))).map((employee) => ({ type: 'company', id: employee.id, name: employee.name, job: employee.job, site }));
  const rental = rentalRecords.filter((worker) => worker.status === 'active' && rentalWorkerCurrentSite(worker) === site).map((worker) => ({ type: 'rental', id: worker.id, name: worker.name, job: worker.job, site }));
  return [...company, ...rental];
}
function renderRatings() {
  const host = document.querySelector('[data-ratings-content]');
  if (!host) return;
  const engineer = !isSystemAdmin() && sessionRoleValues().has('engineer');
  const ownEngineer = rentalEngineerAccounts().find((account) => accountIdentifier(account) === sessionIdentifier());
  const engineerSite = ownEngineer?.responsibleSite || Object.entries(rentalSiteEngineerAssignments).find(([, id]) => id === sessionIdentifier())?.[0] || '';
  const sites = [...new Set([...employeeRecords.map((employee) => employee.site), ...rentalRecords.map(rentalWorkerCurrentSite)].filter(Boolean))];
  if (engineer) ratingsSite = engineerSite;
  else if (!ratingsSite || !sites.includes(ratingsSite)) ratingsSite = sites[0] || '';
  const targets = ratingTargetRows(ratingsSite);
  const canRate = engineer && Boolean(engineerSite);
  const siteControl = engineer ? `<label>موقع مسؤوليتك<input value="${escapeHtml(ratingsSite || 'لم يُعيّن لك موقع مسؤولية')}" readonly></label>` : `<label>الموقع<select name="site" data-ratings-site>${sites.map((site) => `<option value="${escapeHtml(site)}" ${site === ratingsSite ? 'selected' : ''}>${escapeHtml(site)}</option>`).join('')}</select></label>`;
  const ratingRows = targets.map((target) => {
    const existing = employeeRatings.find((item) => item.targetType === target.type && item.targetId === target.id && item.month === ratingsMonth);
    return `<tr><td>${escapeHtml(target.name)}<small>${target.type === 'company' ? 'موظف شركة' : 'عمالة إيجارية'}</small></td><td>${escapeHtml(target.job)}</td><td><select data-rating-score="${escapeHtml(target.type)}:${escapeHtml(target.id)}" ${canRate ? 'required' : 'disabled'}><option value="">اختر</option>${[1, 2, 3, 4, 5].map((score) => `<option value="${score}" ${Number(existing?.score) === score ? 'selected' : ''}>${score} من 5</option>`).join('')}</select></td><td><input data-rating-note="${escapeHtml(target.type)}:${escapeHtml(target.id)}" maxlength="500" value="${escapeHtml(existing?.note || '')}" placeholder="ملاحظات المهندس" ${canRate ? 'required' : 'disabled'}></td></tr>`;
  }).join('');
  host.innerHTML = `<section class="profile-panel"><div class="panel-title"><div><h3>تقييم شهري</h3><p>يقيم المهندس كل موظف نشط يعمل في الموقع ويكتب ملاحظته. التقييم مرتبط بالشهر والموقع والمهندس.</p></div></div>${!engineer ? '<p class="profile-note">وضع مراجعة للمالك: يمكنك استعراض التقييمات حسب الموقع والشهر. تسجيل التقييم متاح لحساب المهندس المسؤول فقط.</p>' : !canRate ? '<div class="duplicate-block"><strong>لا يوجد موقع مسؤول مرتبط بحسابك</strong><p>يلزم تعيين موقع مسؤول للمهندس من الحسابات والصلاحيات.</p></div>' : ''}<form class="ratings-filter-form" data-ratings-filter><label>الشهر<input type="month" name="month" data-ratings-month value="${escapeHtml(ratingsMonth)}" required></label>${siteControl}</form><form data-ratings-form><div class="employee-list rows"><table class="employee-table ratings-table"><thead><tr><th>الموظف</th><th>المهنة</th><th>التقييم</th><th>ملاحظات المهندس</th></tr></thead><tbody>${ratingRows || '<tr><td colspan="4" class="log-empty">لا يوجد موظفون نشطون مرتبطون بهذا الموقع.</td></tr>'}</tbody></table></div><div class="approval-settings-actions"><button class="primary-button" type="submit" ${!canRate || !targets.length ? 'disabled' : ''}>حفظ تقييمات الشهر</button></div></form></section><section class="profile-panel"><div class="panel-title"><div><h3>التقييمات السابقة لهذا الشهر</h3><p>${escapeHtml(ratingsMonth)} · ${escapeHtml(ratingsSite)}</p></div></div>${targets.length ? `<p class="profile-note">يمكن للموظف الاطلاع على تقييماته من قسم «التقييمات» داخل ملفه الوظيفي.</p>` : '<div class="profile-empty-state">لا توجد تقييمات معروضة لهذا الموقع والشهر.</div>'}</section>`;
}

function renderDashboardSummary() {
  const company = employeeRecords.filter((employee) => !employee.archived && !employee.systemHidden && employee.sponsor === 'الشركة');
  const rental = rentalRecords;
  const groups = { company, rental };
  const total = company.length + rental.length;
  for (const [groupName, records] of Object.entries(groups)) {
    for (const status of ['active', 'leave', 'stopped']) {
      const node = document.querySelector(`[data-stat="${groupName}-${status}"]`);
      if (node) node.textContent = arabicNumber.format(records.filter((record) => record.status === status).length);
    }
    const totalNode = document.querySelector(`[data-stat="${groupName}-total"]`);
    if (totalNode) totalNode.textContent = arabicNumber.format(records.length);
  }
  const totalNode = document.querySelector('[data-total]');
  if (totalNode) totalNode.textContent = arabicNumber.format(total);
  for (const status of ['active', 'leave', 'stopped']) {
    const count = company.concat(rental).filter((record) => record.status === status).length;
    const percent = total ? Math.round(count / total * 100) : 0;
    const countNode = document.querySelector(`[data-total-${status}-count]`);
    const percentNode = document.querySelector(`[data-total-${status}-percent]`);
    if (countNode) countNode.textContent = arabicNumber.format(count);
    if (percentNode) percentNode.textContent = `${arabicNumber.format(percent)}٪`;
  }
  const progress = document.querySelector('.hero-progress span');
  if (progress) progress.style.width = `${total ? Math.round((company.concat(rental).filter((record) => record.status === 'active').length / total) * 100) : 0}%`;
  document.querySelectorAll('[data-distribution-total]').forEach((node) => { node.textContent = arabicNumber.format(total); });
  const distributionCount = (status) => company.concat(rental).filter((record) => record.status === status).length;
  for (const status of ['active', 'leave', 'stopped']) {
    const node = document.querySelector(`[data-distribution-${status}]`);
    if (node) node.textContent = arabicNumber.format(distributionCount(status));
  }
  const sourceNote = document.querySelector('[data-dashboard-data-note]');
  if (sourceNote) sourceNote.textContent = `البطاقات تُحسب مباشرة من ${arabicNumber.format(company.length)} سجلات شركة و${arabicNumber.format(rental.length)} سجلات إيجارية محمّلة. هذه السجلات تجريبية؛ الرسوم المالية والحضور والموافقات توضيحية. لا يوجد ملف موظفين فعلي أو قاعدة بيانات متصلة بعد.`;
}

renderDashboardSummary();
const rentalList = document.querySelector('[data-rental-list]');
const rentalSearch = document.querySelector('[data-rental-search]');
const rentalProfile = document.querySelector('[data-rental-profile]');
let rentalFilter = 'all';
let rentalMode = 'rows';
let selectedRentalWorker = null;
let rentalObjectUrls = [];
function loadRentalJson(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key) || 'null'); return value ?? fallback; } catch { return fallback; } }
let rentalWorkerCodes = loadRentalJson('nagm-rental-worker-codes', {});
let rentalWorkerWages = loadRentalJson('nagm-rental-worker-wages', {});
Object.entries(rentalWorkerWages).forEach(([workerId, wage]) => { const worker = rentalRecords.find((item) => item.id === workerId); if (worker) worker.wage = wage; });
let rentalWorkerJobs = loadRentalJson('nagm-rental-worker-jobs', {});
Object.entries(rentalWorkerJobs).forEach(([workerId, job]) => { const worker = rentalRecords.find((item) => item.id === workerId); if (worker) worker.job = job; });
let rentalWorkerNotes = loadRentalJson('nagm-rental-worker-notes', {});
const savedRentalStatementTransfers = loadRentalJson('nagm-rental-statement-transfers', []);
let rentalStatementTransfers = Array.isArray(savedRentalStatementTransfers) ? savedRentalStatementTransfers : [];
const savedRentalStatementEntries = loadRentalJson('nagm-rental-account-entries', []);
let rentalStatementEntries = Array.isArray(savedRentalStatementEntries) ? savedRentalStatementEntries : [];
let editingRentalStatementId = '';
const savedRentalDirectHires = loadRentalJson('nagm-rental-direct-hire-requests', []);
let rentalDirectHireRequests = Array.isArray(savedRentalDirectHires) ? savedRentalDirectHires : [];
const rentalFileOwnerId = (workerId) => `rental:${workerId}`;
const rentalWorkerCode = (worker) => rentalWorkerCodes[worker.id] || worker.code || worker.id;
const rentalWorkerWage = (worker) => rentalWorkerWages[worker.id] ?? worker.wage;

function saveRentalWorkerCodes() { localStorage.setItem('nagm-rental-worker-codes', JSON.stringify(rentalWorkerCodes)); }
function saveRentalWorkerWages() { localStorage.setItem('nagm-rental-worker-wages', JSON.stringify(rentalWorkerWages)); }
function saveRentalWorkerJobs() { localStorage.setItem('nagm-rental-worker-jobs', JSON.stringify(rentalWorkerJobs)); }
function saveRentalWorkerNotes() { localStorage.setItem('nagm-rental-worker-notes', JSON.stringify(rentalWorkerNotes)); }
function saveRentalDirectHireRequests() { localStorage.setItem('nagm-rental-direct-hire-requests', JSON.stringify(rentalDirectHireRequests)); }
function saveRentalStatementEntries() { localStorage.setItem('nagm-rental-account-entries', JSON.stringify(rentalStatementEntries)); }
function rentalAuditActor() { const session = window.NAGM_SESSION || {}; return { actorId: sessionIdentifier(), actorName: session.displayName || session.fullName || session.name || session.account || 'الحساب الحالي' }; }
const savedDailyDisbursements = loadRentalJson('nagm-daily-disbursements', []);
let dailyDisbursements = Array.isArray(savedDailyDisbursements) ? savedDailyDisbursements : [];
function saveDailyDisbursements() { localStorage.setItem('nagm-daily-disbursements', JSON.stringify(dailyDisbursements)); }
function canManageDailyDisbursements() {
  if (isSystemAdmin()) return true;
  const role = String(window.NAGM_SESSION?.role || '').trim().toLocaleLowerCase('ar');
  return ['hr', 'human-resources', 'personnel'].includes(role) || role.includes('موارد بشرية') || role.includes('شؤون الموظفين') || role.includes('الاتش ار');
}
function dailyDisbursementStatusLabel(entry) { return entry.status === 'deleted' ? 'محذوفة بعد الموافقة' : 'مسجلة'; }
function disbursementTargetLabel(entry) {
  if (entry.targetType === 'company') return `موظف شركة · ${employeeRecords.find((item) => item.id === entry.employeeId)?.name || entry.employeeName || entry.employeeId}`;
  if (entry.targetType === 'rental') return `عامل إيجاري · ${rentalRecords.find((item) => item.id === entry.workerId)?.name || entry.workerName || entry.workerId}`;
  return 'مصروف عام';
}
function renderEmployeeDisbursementProfile(employee) {
  const rows = dailyDisbursements.filter((entry) => entry.targetType === 'company' && entry.employeeId === employee.id).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const active = rows.filter((entry) => entry.status !== 'deleted');
  const currency = (amount) => new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(Number(amount) || 0);
  return `<div class="profile-section-stack"><section class="profile-panel"><div class="panel-title"><div><h3>المبالغ المنصرفة على ${escapeHtml(employee.name)}</h3><p>كل مبالغ الموظف المسجلة في السجل اليومي</p></div><strong>${currency(active.reduce((sum, row) => sum + Number(row.amount || 0), 0))}</strong></div><div class="employee-list rows"><table class="employee-table"><thead><tr><th>التاريخ</th><th>البيان</th><th>نوع الصرف</th><th>طريقة الدفع</th><th>المبلغ</th><th>الحالة</th></tr></thead><tbody>${rows.length ? rows.map((row) => `<tr><td>${escapeHtml(row.date)}</td><td>${escapeHtml(row.description)}</td><td>${escapeHtml(row.kindLabel || row.kind)}</td><td>${escapeHtml(row.paymentMethod || 'نقدي')}</td><td>${currency(row.amount)}</td><td>${dailyDisbursementStatusLabel(row)}</td></tr>`).join('') : '<tr><td colspan="6" class="log-empty">لا توجد مبالغ مسجلة لهذا الموظف.</td></tr>'}</tbody></table></div></section></div>`;
}
function renderEmployeeAlternateAttendanceProfile(employee) {
  const requests = alternateAttendanceRequests.filter((request) => request.employeeId === employee.id).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const punches = getCompanyAttendanceRecords().filter((record) => record.employeeId === employee.id && punchMethodLabel(record) === 'حضور بديل').sort((a, b) => String(b.timestamp).localeCompare(a.timestamp));
  const punchRows = punches.map((record) => { const request = alternateAttendanceRequests.find((item) => item.id === record.alternateRequestId); const routeLabel = request?.approvalSequenceEnabled === false ? 'اعتماد مباشر من مدير النظام' : 'اعتماد مهندس الموقع ومدير النظام'; return `<tr><td>${escapeHtml(record.date)}</td><td>${escapeHtml(record.time)}</td><td>${escapeHtml(record.site)}</td><td>${escapeHtml(punchDeviceLabel(record))}</td><td>حضور بديل · ${routeLabel} ${record.alternateRequestId ? `<button class="secondary-button" type="button" data-open-alternate-photo="${escapeHtml(record.alternateRequestId)}">صورة الإثبات</button>` : ''}</td></tr>`; }).join('');
  const requestRows = requests.map((request) => `<article class="evaluation-history-row"><div><strong>${escapeHtml(request.date)} · ${escapeHtml(request.site)}</strong><span class="request-status-pill">${escapeHtml(alternateAttendanceStatus(request))}</span></div><p>الجهاز مع ${escapeHtml(request.deviceOwnerName)} (${escapeHtml(request.deviceOwnerRole)}) · ${escapeHtml(request.reason || 'لا توجد ملاحظة')}</p><small>مقدم الطلب: ${escapeHtml(request.requesterName)} · الطلب ${escapeHtml(request.id)}</small>${request.photoFileId ? `<button class="secondary-button" type="button" data-open-alternate-photo="${escapeHtml(request.id)}">عرض صورة إثبات الحضور</button>` : ''}</article>`).join('');
  return `<div class="profile-section-stack"><section class="profile-panel"><div class="panel-title"><div><h3>سجل الحضور البديل</h3><p>الطلبات وسجلات الحضور البديل المعتمدة لهذا الموظف</p></div><button class="secondary-button" type="button" data-view="attendance-management">فتح إدارة البصمات</button></div><div class="employee-list rows"><table class="employee-table"><thead><tr><th>التاريخ</th><th>الوقت</th><th>الموقع</th><th>الجهاز المستخدم</th><th>مصدر التسجيل</th></tr></thead><tbody>${punchRows || '<tr><td colspan="5" class="log-empty">لا توجد بصمات بديلة معتمدة.</td></tr>'}</tbody></table></div></section><section class="profile-panel"><div class="panel-title"><div><h3>طلبات الحضور</h3><p>${arabicNumber.format(requests.length)} طلب</p></div></div><div class="evaluation-history-list">${requestRows || '<div class="profile-empty-state">لا توجد طلبات حضور بديل لهذا الموظف.</div>'}</div><p class="alternate-demo-notice">مطابقة الوجه المباشرة غير مفعلة في هذه المعاينة. الحضور البديل هنا طلب يدوي معتمد.</p></section></div>`;
}
function renderDailyDisbursements() {
  if (!canManageDailyDisbursements()) return;
  const host = document.querySelector('[data-daily-disbursements-content]');
  if (!host) return;
  const employeeOptions = employeeRecords.filter((item) => !item.archived && !item.systemHidden).map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)} · ${escapeHtml(item.id)}</option>`).join('');
  const rentalOptions = rentalRecords.filter((item) => !item.archived && !item.systemHidden).map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)} · ${escapeHtml(rentalWorkerCode(item))}</option>`).join('');
  const today = saudiTodayISO();
  const fromInput = host.querySelector('[data-disbursement-from]');
  const toInput = host.querySelector('[data-disbursement-to]');
  const from = fromInput ? fromInput.value : saudiTodayISO();
  const to = toInput ? toInput.value : saudiTodayISO();
  const target = host.querySelector('[data-disbursement-target-filter]')?.value || 'all';
  const query = host.querySelector('[data-disbursement-search]')?.value.trim().toLocaleLowerCase('ar') || '';
  const filtered = dailyDisbursements.filter((entry) => {
    const dateMatch = (!from || entry.date >= from) && (!to || entry.date <= to);
    const targetMatch = target === 'all' || entry.targetType === target;
    const searchable = [entry.date, entry.description, entry.kindLabel, entry.paymentMethod, disbursementTargetLabel(entry), entry.createdByName].join(' ').toLocaleLowerCase('ar');
    return dateMatch && targetMatch && (!query || searchable.includes(query));
  }).sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.createdAt).localeCompare(String(a.createdAt)));
  const active = filtered.filter((entry) => entry.status !== 'deleted');
  const total = active.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
  const currency = (amount) => new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount);
  const rows = filtered.map((entry) => {
    const linkedDeletionPending = changeDeletionRequests.some((request) => request.type === 'daily-disbursement' && request.recordId === entry.id && request.status === 'pending');
    const action = entry.status === 'deleted' ? 'محذوفة بعد الموافقة' : linkedDeletionPending ? 'طلب الحذف بانتظار الموافقة' : `<button class="danger-button" type="button" data-delete-daily-disbursement="${escapeHtml(entry.id)}">طلب حذف</button>`;
    return `<tr class="${entry.status === 'deleted' ? 'rental-ledger-deleted' : ''}"><td>${escapeHtml(entry.date)}</td><td>${escapeHtml(disbursementTargetLabel(entry))}</td><td>${escapeHtml(entry.kindLabel || entry.kind)}</td><td>${escapeHtml(entry.description)}</td><td>${currency(entry.amount)}</td><td>${escapeHtml(entry.paymentMethod || 'نقدي')}</td><td>${escapeHtml(entry.createdByName || 'الحساب الحالي')}</td><td>${action}</td></tr>`;
  }).join('');
  host.innerHTML = `<section class="profile-panel"><div class="panel-title"><div><h3>تسجيل مبلغ منصرف</h3><p>السلفة على العامل الإيجاري تُرحّل آليًا كخصم إلى كشف حسابه، مع حفظ رابط الحركة.</p></div></div><form class="daily-disbursement-form" data-daily-disbursement-form><label>جهة الصرف<select name="targetType" data-disbursement-target><option value="general">مصروف عام</option><option value="company">موظف شركة</option><option value="rental">عامل إيجاري</option></select></label><label data-disbursement-person-wrap hidden>الموظف / العامل<select name="personId" data-disbursement-person><option value="">اختر الاسم</option></select></label><label>نوع الصرف<select name="kind"><option value="expense">مصروف</option><option value="advance">سلفة</option><option value="travel">تذاكر سفر</option><option value="other">أخرى</option></select></label><label>التاريخ<input type="date" name="date" value="${today}" required></label><label>المبلغ (ر.س)<input type="number" name="amount" min="0.01" step="0.01" placeholder="0.00" required></label><label>طريقة الدفع<select name="paymentMethod"><option value="cash">نقدي</option><option value="transfer">تحويل</option><option value="other">أخرى</option></select></label><label class="daily-disbursement-description">البيان<input name="description" maxlength="240" placeholder="مثال: مبالغ جمعة 10 و11-12-2026 صرف نقدي" required></label><button class="primary-button" type="submit">تسجيل المبلغ</button></form><p class="profile-note">حركات هذه الصفحة تُحفظ في سجل الصرف اليومي. إذا كانت الجهة عاملًا إيجاريًا ونوع الحركة «سلفة»، تظهر أيضًا في كشف حساب العامل كخصم مرتبط. سجلات المعاينة محفوظة محليًا في هذا المتصفح.</p></section><section class="profile-panel"><div class="panel-title"><div><h3>سجل الصرف</h3><p>إجمالي النتائج النشطة: ${currency(total)} · ${arabicNumber.format(filtered.length)} حركة</p></div></div><div class="daily-disbursement-filters"><label>من تاريخ<input type="date" data-disbursement-from value="${escapeHtml(from)}"></label><label>إلى تاريخ<input type="date" data-disbursement-to value="${escapeHtml(to)}"></label><label>الجهة<select data-disbursement-target-filter><option value="all" ${target === 'all' ? 'selected' : ''}>الكل</option><option value="general" ${target === 'general' ? 'selected' : ''}>مصروف عام</option><option value="company" ${target === 'company' ? 'selected' : ''}>موظف شركة</option><option value="rental" ${target === 'rental' ? 'selected' : ''}>عامل إيجاري</option></select></label><label class="daily-disbursement-search">بحث<input type="search" data-disbursement-search value="${escapeHtml(query)}" placeholder="البيان أو الموظف أو التاريخ"></label><button type="button" class="secondary-button" data-clear-disbursement-filters>عرض كل التواريخ ومسح البحث</button></div><div class="employee-list rows"><table class="employee-table daily-disbursement-table"><thead><tr><th>التاريخ</th><th>المستفيد / الجهة</th><th>النوع</th><th>البيان</th><th>المبلغ</th><th>الدفع</th><th>أضافها</th><th>إجراء</th></tr></thead><tbody>${rows || '<tr><td colspan="8" class="log-empty">لا توجد حركات مطابقة للفلاتر.</td></tr>'}</tbody></table></div></section>`;
  const form = host.querySelector('[data-daily-disbursement-form]');
  const targetSelect = form.querySelector('[data-disbursement-target]');
  const updatePerson = () => {
    const type = targetSelect.value;
    const wrap = form.querySelector('[data-disbursement-person-wrap]');
    const select = form.querySelector('[data-disbursement-person]');
    wrap.hidden = type === 'general';
    select.required = type !== 'general';
    select.innerHTML = `<option value="">اختر ${type === 'rental' ? 'العامل' : 'الموظف'}</option>${type === 'rental' ? rentalOptions : employeeOptions}`;
  };
  targetSelect.addEventListener('change', updatePerson);
  updatePerson();
}
function refreshDailyDisbursements() { renderDailyDisbursements(); }
document.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-daily-disbursement-form]');
  if (!form) return;
  event.preventDefault();
  if (!canManageDailyDisbursements()) { notify('تسجيل المبالغ اليومية متاح لمالك النظام أو موظفي الموارد البشرية.'); return; }
  const data = new FormData(form);
  const targetType = String(data.get('targetType') || 'general');
  const kind = String(data.get('kind') || 'expense');
  const date = String(data.get('date') || '');
  const amount = Number(data.get('amount'));
  const description = String(data.get('description') || '').trim();
  const personId = String(data.get('personId') || '');
  const employee = targetType === 'company' ? employeeRecords.find((item) => item.id === personId && !item.archived && !item.systemHidden) : null;
  const worker = targetType === 'rental' ? rentalRecords.find((item) => item.id === personId && !item.archived && !item.systemHidden) : null;
  if (!date || !description || !Number.isFinite(amount) || amount <= 0 || (targetType === 'company' && !employee) || (targetType === 'rental' && !worker) || !['general', 'company', 'rental'].includes(targetType)) { notify('أكمل جهة الصرف والتاريخ والبيان والمبلغ بشكل صحيح.'); return; }
  const id = `DISB-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const actor = rentalAuditActor();
  const kindLabels = { expense: 'مصروف', advance: 'سلفة', travel: 'تذاكر سفر', other: 'أخرى' };
  const paymentLabels = { cash: 'نقدي', transfer: 'تحويل', other: 'أخرى' };
  const entry = { id, targetType, employeeId: employee?.id || '', employeeName: employee?.name || '', workerId: worker?.id || '', workerName: worker?.name || '', kind, kindLabel: kindLabels[kind] || kind, date, amount, description, paymentMethod: paymentLabels[String(data.get('paymentMethod'))] || 'نقدي', createdAt: new Date().toISOString(), createdById: actor.actorId, createdByName: actor.actorName, status: 'active', linkedStatementEntryId: '', history: [{ action: 'added', ...actor, at: new Date().toISOString(), date, amount, description }] };
  if (worker && kind === 'advance') {
    const statementId = `RNT-LEDGER-${id}`;
    const linkedEntry = { id: statementId, workerId: worker.id, type: 'deduction', direction: 'out', date, amount, description: `سلفة منصرفة · ${description}`, source: 'daily-disbursement', dailyDisbursementId: id, createdBy: actor.actorId, createdByName: actor.actorName, createdAt: new Date().toISOString(), status: 'active', history: [{ action: 'added', ...actor, at: new Date().toISOString(), date, amount, description: `سلفة منصرفة · ${description}`, linkedDailyDisbursementId: id }] };
    entry.linkedStatementEntryId = statementId;
    rentalStatementEntries.unshift(linkedEntry);
    saveRentalStatementEntries();
  }
  dailyDisbursements.unshift(entry);
  saveDailyDisbursements();
  renderDailyDisbursements();
  if (selectedEmployee?.id === employee?.id && employeeProfile.dataset.profileSection === 'disbursements') renderEmployeeProfile(employee, 'disbursements');
  if (selectedRentalWorker?.id === worker?.id && rentalProfile.dataset.profileSection === 'statement') renderRentalProfileSection(worker, 'statement');
  notify(worker && kind === 'advance' ? 'تم تسجيل الصرف وربطه بسلفة في كشف حساب العامل الإيجاري.' : 'تم تسجيل المبلغ في سجل الصرف اليومي.');
});
document.addEventListener('change', (event) => {
  if (event.target.matches('[data-disbursement-from], [data-disbursement-to], [data-disbursement-target-filter], [data-disbursement-search]')) renderDailyDisbursements();
});
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-clear-disbursement-filters]')) {
    const host = document.querySelector('[data-daily-disbursements-content]');
    if (host) { host.querySelector('[data-disbursement-from]').value = ''; host.querySelector('[data-disbursement-to]').value = ''; host.querySelector('[data-disbursement-search]').value = ''; host.querySelector('[data-disbursement-target-filter]').value = 'all'; }
    renderDailyDisbursements(); return;
  }
  if (!event.target.closest('[data-export-disbursements]')) return;
  const rows = dailyDisbursements.filter((entry) => entry.status !== 'deleted').sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const cell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const lines = [['التاريخ', 'المستفيد / الجهة', 'النوع', 'البيان', 'المبلغ', 'طريقة الدفع', 'أضافها'], ...rows.map((entry) => [entry.date, disbursementTargetLabel(entry), entry.kindLabel || entry.kind, entry.description, entry.amount, entry.paymentMethod, entry.createdByName])];
  const url = URL.createObjectURL(new Blob([`\uFEFF${lines.map((line) => line.map(cell).join(',')).join('\r\n')}`], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = `المبالغ-المنصرفة-${saudiTodayISO()}.csv`; link.click(); URL.revokeObjectURL(url);
});
function canManageRentalStatement() {
  if (isSystemAdmin()) return true;
  const role = String(window.NAGM_SESSION?.role || '').trim().toLocaleLowerCase('ar');
  return role.includes('مالية') || role.includes('محاسب') || ['finance', 'accountant'].includes(role);
}

function filteredRentalRecords() {
  const query = rentalSearch.value.trim().toLocaleLowerCase('ar');
  const job = document.querySelector('[data-rental-job]').value;
  return rentalRecords.filter((worker) => {
    const statusMatches = rentalFilter === 'all' || worker.status === rentalFilter;
    const jobMatches = !job || worker.job === job;
    const queryMatches = !query || [worker.name, worker.id, rentalWorkerCode(worker), worker.residency, worker.job, worker.residence].some((value) => String(value || '').toLocaleLowerCase('ar').includes(query));
    return statusMatches && jobMatches && queryMatches;
  });
}

function openRentalProfile(worker, section = 'overview') {
  selectedRentalWorker = worker;
  rentalProfile.innerHTML = `<button class="profile-back" type="button" data-back-rental>العودة لقائمة العمالة</button>
    <div class="profile-hero"><span class="employee-avatar">${arabicNumber.format(Number(worker.id.slice(-1)))}</span><div class="profile-hero-main"><h2>${escapeHtml(worker.name)}</h2><p>${escapeHtml(worker.job)} · ${escapeHtml(rentalWorkerCode(worker))}</p></div><span class="status-badge ${worker.status}">${employeeStatus[worker.status]}</span></div>
    <div class="employee-profile-layout"><nav class="employee-profile-nav" aria-label="أقسام ملف العامل الإيجاري">
      <button type="button" data-rental-profile-section="overview" class="${section === 'overview' ? 'active' : ''}">بيانات العامل</button>
      <button type="button" data-rental-profile-section="attachments" class="${section === 'attachments' ? 'active' : ''}">المرفقات</button>
      <button type="button" data-rental-profile-section="attendance-approvals" class="${section === 'attendance-approvals' ? 'active' : ''}">الحضور والاعتمادات</button>
      <button type="button" data-rental-profile-section="statement" class="${section === 'statement' ? 'active' : ''}">كشف الحساب</button>
      <button type="button" data-rental-profile-section="notes" class="${section === 'notes' ? 'active' : ''}">ملاحظات</button>
      <button type="button" data-rental-profile-section="evaluations" class="${section === 'evaluations' ? 'active' : ''}">التقييمات</button>
    </nav><div class="employee-profile-main" data-rental-profile-main data-section="${section}"></div></div>`;
  rentalProfile.dataset.profileSection = section;
  renderRentalProfileSection(worker, section);
  setCurrentView('rental-profile', worker.name);
}

function rentalAttendanceApprovalHistory(worker) {
  const earlierAttendance = existingPreparations.filter((record) => record.workerId === worker.id).map((record) => ({
    date: record.date, group: 'attendance', type: 'تحضير العمالة الإيجارية', details: record.site,
    requester: 'سجل سابق', approver: record.approver, status: record.approvalStatus,
  }));
  const preparationRows = rentalPreparationRequests.flatMap((request) => {
    if (!Array.isArray(request.workerIds) || !request.workerIds.includes(worker.id)) return [];
    const latestApproval = [...(request.approvalHistory || [])].reverse().find((item) => item.action === 'approved');
    const dailyRows = eachDateInRange(request.startDate, request.endDate).map((date) => ({ date, group: 'attendance', type: 'تحضير العمالة الإيجارية', details: request.site, requester: request.requesterName, approver: latestApproval?.name || '—', status: preparationRequestStatusLabel(request) }));
    const approvalRows = (request.approvalHistory || []).map((item) => ({ date: String(item.at || request.createdAt).slice(0, 10), group: 'approvals', type: item.action === 'rejected' ? 'رفض تحضير' : 'اعتماد تحضير', details: `${request.site} · ${item.stage}`, requester: request.requesterName, approver: item.name || item.stage, status: item.action === 'rejected' ? 'مرفوض' : 'معتمد' }));
    return [...dailyRows, ...approvalRows];
  });
  const hireRows = rentalDirectHireRequests.filter((request) => request.workerId === worker.id).flatMap((request) => {
    const status = request.status === 'approved' ? 'معتمد نهائيًا' : request.status === 'needs-revision' ? 'عاد للمراجعة' : request.status === 'rejected' ? 'مرفوض' : `بانتظار ${approverStageLabel(leaveRequestCurrentStage(request))}`;
    const main = [{ date: String(request.createdAt || '').slice(0, 10), group: 'approvals', type: 'نموذج مباشرة عمل', details: `${request.site} · بداية ${request.startDate} · الأجر ${request.wage}`, requester: request.requesterName, approver: request.approvedBy || '—', status }];
    const approvals = (request.approvalHistory || []).map((item) => ({ date: String(item.at || request.createdAt).slice(0, 10), group: 'approvals', type: item.action === 'rejected' ? 'إجراء على نموذج مباشرة' : 'اعتماد نموذج مباشرة', details: item.stage, requester: request.requesterName, approver: item.name || item.stage, status: item.action === 'rejected' ? 'مرفوض' : 'معتمد' }));
    const returns = (request.revisionHistory || []).map((item) => ({ date: String(item.returnedAt || '').slice(0, 10), group: 'approvals', type: 'إعادة للمراجعة', details: item.note, requester: request.requesterName, approver: item.returnedBy, status: 'عاد للمراجعة' }));
    return [...main, ...approvals, ...returns];
  });
  return [...earlierAttendance, ...preparationRows, ...hireRows].sort((a, b) => b.date.localeCompare(a.date) || a.type.localeCompare(b.type, 'ar'));
}

function renderRentalAttendanceApprovalRows(worker) {
  const body = rentalProfile.querySelector('[data-rental-history-body]');
  if (!body) return;
  const from = rentalProfile.querySelector('[data-rental-history-from]').value;
  const to = rentalProfile.querySelector('[data-rental-history-to]').value;
  const group = rentalProfile.querySelector('[data-rental-history-type]').value;
  const count = rentalProfile.querySelector('[data-rental-history-count]');
  const warning = rentalProfile.querySelector('[data-rental-history-warning]');
  const message = from && !to ? 'اختر تاريخ النهاية لإكمال فترة البحث.' : !from && to ? 'اختر تاريخ البداية لإكمال فترة البحث.' : from && to && to < from ? 'تاريخ النهاية يجب أن يساوي تاريخ البداية أو يأتي بعده.' : '';
  warning.textContent = message; warning.hidden = !message;
  const rows = message ? [] : rentalAttendanceApprovalHistory(worker).filter((row) => (!from || row.date >= from) && (!to || row.date <= to) && (group === 'all' || row.group === group));
  count.textContent = `عدد السجلات: ${arabicNumber.format(rows.length)}`;
  body.innerHTML = rows.length ? rows.map((row) => `<tr><td>${escapeHtml(row.date)}</td><td>${escapeHtml(row.type)}</td><td>${escapeHtml(row.details)}</td><td>${escapeHtml(row.requester)}</td><td>${escapeHtml(row.approver)}</td><td><span class="status-badge ${row.status.includes('معتمد') ? 'active' : row.status.includes('مرفوض') ? 'stopped' : 'leave'}">${escapeHtml(row.status)}</span></td></tr>`).join('') : '<tr><td colspan="6" class="log-empty">لا توجد سجلات تطابق فلاتر التاريخ والنوع.</td></tr>';
}

async function renderRentalProfileSection(worker, section) {
  const host = rentalProfile.querySelector('[data-rental-profile-main]');
  if (!host) return;
  rentalObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  rentalObjectUrls = [];
  if (section === 'evaluations') {
    host.innerHTML = `<section class="profile-panel"><div class="panel-title"><div><h3>تقييمات ${escapeHtml(worker.name)}</h3><p>التقييمات الشهرية المسجلة من مهندسي المواقع</p></div></div>${employeeEvaluationsMarkup('rental', worker.id)}</section>`;
    return;
  }
  if (section === 'overview') {
    host.innerHTML = `<div class="profile-section-stack"><section class="profile-panel"><div class="panel-title"><div><h3>البيانات الأساسية</h3><p>بيانات العامل وسكنه ووضعه الحالي</p></div></div><div class="profile-details"><div><small>المهنة</small><strong>${escapeHtml(worker.job)}</strong></div><div><small>رقم الإقامة</small><strong>${escapeHtml(worker.residency)}</strong></div><div><small>الجنسية</small><strong>${escapeHtml(worker.nationality)}</strong></div><div><small>الديانة</small><strong>${escapeHtml(worker.religion)}</strong></div><div><small>موقع السكن</small><strong>${escapeHtml(worker.residence)}</strong></div><div><small>الحالة</small><strong>${employeeStatus[worker.status]}</strong></div><div><small>الأجر المسجل</small><strong>${escapeHtml(rentalWorkerWage(worker))}</strong></div><div><small>آخر موقع تجهيز</small><strong>${escapeHtml(worker.previousSite)}</strong></div></div></section><section class="profile-panel"><h3>كود العامل</h3><form class="rental-code-form" data-rental-code-form><label>الكود الذي يظهر في القوائم والتقارير<input name="workerCode" maxlength="60" value="${escapeHtml(rentalWorkerCode(worker))}" placeholder="مثال: إيجار أو إيجارات" required></label><button class="primary-button" type="submit">حفظ الكود</button></form><p class="profile-note">يمكنك كتابة «إيجار» أو «إيجارات» أو أي كود تختاره. رقم السجل الداخلي يبقى ثابتًا لربط التحضير والمرفقات وكشف الحساب.</p></section></div>`;
    return;
  }
  if (section === 'attachments') {
    host.innerHTML = '<section class="profile-panel"><h3>مرفقات العامل</h3><div class="profile-empty-state">جارٍ تحميل المرفقات…</div></section>';
    try {
      const files = (await getEmployeeFiles(rentalFileOwnerId(worker.id))).filter((record) => record.kind === 'rental-attachment' && (record.category !== 'إثبات الهوية' || isSystemAdmin()));
      if (selectedRentalWorker?.id !== worker.id || rentalProfile.dataset.profileSection !== 'attachments') return;
      const rows = files.length ? files.map((record) => {
        const url = URL.createObjectURL(record.blob); rentalObjectUrls.push(url);
        return `<article class="attachment-row"><span class="attachment-file-icon">▧</span><div class="attachment-row-main"><strong>${escapeHtml(record.label)}</strong><small>${escapeHtml(record.category || 'مستند')} · ${escapeHtml(record.fileName)} · ${new Intl.DateTimeFormat('ar-EG').format(new Date(record.createdAt))}</small></div><a class="secondary-button" href="${url}" target="_blank" rel="noopener" download="${escapeHtml(record.fileName)}">فتح</a></article>`;
      }).join('') : '<div class="profile-empty-state"><strong>لا توجد مرفقات مسجلة.</strong><p>أضف الإقامة أو أي مستند للعامل.</p></div>';
      const latestHire = rentalDirectHireRequests.filter((item) => item.workerId === worker.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
      const hireStatus = latestHire?.status === 'approved' ? 'مباشرة العمل معتمدة' : latestHire?.status === 'needs-revision' ? 'عاد النموذج للمراجعة' : latestHire?.status === 'pending-approval' ? 'نموذج مباشرة بانتظار الاعتماد' : '';
      const approvals = latestHire?.approvalHistory?.filter((item) => item.action === 'approved').map((item) => item.name || item.stage) || [];
      const directHirePanel = latestHire ? `<section class="profile-panel"><div class="panel-title"><div><h3>حالة نموذج مباشرة العمل</h3><p>حالة الطلب وسجل الاعتمادات</p></div><span class="request-status-pill">${escapeHtml(hireStatus || latestHire.status)}</span></div>${approvals.length ? `<p class="approval-trace">اعتمد بواسطة: ${approvals.map(escapeHtml).join(' ← ')}</p>` : ''}${latestHire.reviewNotes ? `<div class="duplicate-block"><strong>ملاحظات المراجعة</strong><p>${escapeHtml(latestHire.reviewNotes)}</p></div>` : ''}<button type="button" class="secondary-button" data-open-rental-assignment="${escapeHtml(worker.id)}">فتح صفحة التعيين / استكمال المراجعة</button></section>` : `<section class="profile-panel"><h3>نموذج مباشرة العمل</h3><p class="profile-note">إنشاء نموذج المباشرة وإرساله للاعتماد يتم من صفحة «تعيين عمالة إيجارية».</p><button type="button" class="secondary-button" data-open-rental-assignment="${escapeHtml(worker.id)}">فتح صفحة التعيين</button></section>`;
      host.innerHTML = `<div class="profile-section-stack"><section class="profile-panel"><h3>إضافة مرفق</h3><form class="attachment-form" data-rental-attachment-form><label>نوع المرفق<select name="category"><option>الإقامة</option><option>نموذج مباشرة عمل</option><option>عقد العمل</option><option>أخرى</option></select></label><label>اسم المرفق<input name="label" maxlength="80" placeholder="مثال: إقامة العامل سارية" required></label><label>اختر الملف<input name="file" type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" required></label><button class="primary-button" type="submit">حفظ المرفق</button></form><p class="profile-note">المرفقات محفوظة في مساحة ملفات المعاينة على هذا المتصفح.</p></section>${directHirePanel}<section class="profile-panel"><div class="panel-title"><div><h3>مرفقات ${escapeHtml(worker.name)}</h3><p>${arabicNumber.format(files.length)} مستند</p></div></div><div class="attachment-list">${rows}</div></section></div>`;
    } catch (error) { host.innerHTML = `<section class="profile-panel"><div class="profile-empty-state">${escapeHtml(error.message)}</div></section>`; }
    return;
  }
  if (section === 'statement') {
    const canEdit = canManageRentalStatement();
    const editing = rentalStatementEntries.find((entry) => entry.id === editingRentalStatementId && entry.workerId === worker.id && entry.status !== 'deleted');
    const manualEntries = rentalStatementEntries.filter((entry) => entry.workerId === worker.id).sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    const payrollEntries = rentalStatementTransfers.filter((entry) => entry.workerId === worker.id && entry.transferred === true).map((entry) => ({ ...entry, status: 'active', source: entry.source || 'مسير معتمد', type: entry.type || 'salary', description: entry.description || 'راتب مرحّل', readonly: true }));
    const activeTotal = [...manualEntries.filter((entry) => entry.status !== 'deleted'), ...payrollEntries].reduce((sum, entry) => {
      const amount = Math.abs(Number(entry.amount) || 0);
      return sum + (entry.status === 'deleted' ? 0 : ['deduction', 'خصم'].includes(entry.type) || entry.direction === 'out' ? -amount : amount);
    }, 0);
    const currency = (amount) => new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount);
    const movementRows = [...manualEntries.map((entry) => ({ ...entry, readonly: entry.source === 'daily-disbursement' })), ...payrollEntries].sort((a, b) => String(b.date || '').localeCompare(String(a.date || ''))).map((entry) => {
      const isDeleted = entry.status === 'deleted';
      const signed = (['deduction', 'خصم'].includes(entry.type) || entry.direction === 'out' ? -1 : 1) * Math.abs(Number(entry.amount) || 0);
      const deletionPending = changeDeletionRequests.some((request) => request.type === 'rental-account-entry' && request.recordId === entry.id && request.employeeId === worker.id && request.status === 'pending');
      const actions = entry.readonly ? '<small>حركة مالية مرحّلة</small>' : isDeleted ? '<small>محذوفة بعد الموافقة</small>' : `<button type="button" class="secondary-button" data-edit-rental-statement="${escapeHtml(entry.id)}" ${canEdit ? '' : 'disabled'}>تعديل</button>${deletionPending ? '<small>طلب الحذف بانتظار الموافقة</small>' : `<button type="button" class="danger-button" data-delete-rental-statement="${escapeHtml(entry.id)}" ${canEdit ? '' : 'disabled'}>طلب حذف</button>`}`;
      return `<tr class="${isDeleted ? 'rental-ledger-deleted' : ''}"><td>${escapeHtml(entry.date || '')}</td><td>${escapeHtml(entry.description || entry.type || '')}</td><td>${entry.type === 'deduction' || entry.type === 'خصم' ? 'خصم' : entry.type === 'addition' ? 'إضافة' : entry.type === 'salary' ? 'راتب' : escapeHtml(entry.type || 'حركة')}</td><td>${currency(signed)}</td><td>${escapeHtml(entry.createdByName || entry.requesterName || 'مسير معتمد')}</td><td>${isDeleted ? `محذوفة بواسطة ${escapeHtml(entry.deletedByName || '—')}` : 'نشطة'}</td><td>${actions}</td></tr>`;
    }).join('');
    const historyRows = manualEntries.flatMap((entry) => (entry.history || []).map((event) => ({ ...event, date: event.at || entry.date, description: entry.description, id: entry.id }))).sort((a, b) => String(b.date).localeCompare(String(a.date))).map((event) => {
      const labels = { added: 'إضافة', edited: 'تعديل', deleted: 'حذف بعد الموافقة', restored: 'استعادة', 'delete-requested': 'طلب حذف', 'delete-request-rejected': 'رفض طلب حذف' };
      const details = event.action === 'edited' ? `قبل: ${event.before?.description || ''} · ${event.before?.amount ?? ''} / بعد: ${event.after?.description || ''} · ${event.after?.amount ?? ''}` : event.description || '';
      return `<tr><td>${new Date(event.date).toLocaleString('ar-SA')}</td><td>${labels[event.action] || escapeHtml(event.action)}</td><td>${escapeHtml(details)}</td><td>${escapeHtml(event.actorName || '—')}</td><td>${escapeHtml(event.actorId || '—')}</td></tr>`;
    }).join('');
    host.innerHTML = `<div class="profile-section-stack"><section class="profile-panel"><div class="panel-title"><div><h3>كشف حساب ${escapeHtml(worker.name)}</h3><p>أضف وعدّل الحركات، وكل تغيير يسجل باسم الحساب ووقته</p></div></div><div class="profile-stat"><span>الرصيد الصافي للحركات النشطة</span><strong>${currency(activeTotal)}</strong></div>${canEdit ? `<form class="rental-statement-form" data-rental-statement-form data-entry-id="${escapeHtml(editing?.id || '')}"><label>نوع الحركة<select name="type"><option value="salary" ${editing?.type === 'salary' ? 'selected' : ''}>راتب</option><option value="addition" ${editing?.type === 'addition' ? 'selected' : ''}>إضافة</option><option value="deduction" ${editing?.type === 'deduction' ? 'selected' : ''}>خصم</option></select></label><label>التاريخ<input type="date" name="date" value="${escapeHtml(editing?.date || saudiTodayISO())}" required></label><label>البيان<input name="description" maxlength="160" value="${escapeHtml(editing?.description || '')}" required></label><label>المبلغ (ر.س)<input type="number" name="amount" min="0.01" step="0.01" value="${editing ? Math.abs(Number(editing.amount) || 0) : ''}" required></label><button class="primary-button" type="submit">${editing ? 'حفظ التعديل' : 'إضافة حركة'}</button>${editing ? '<button class="secondary-button" type="button" data-cancel-rental-statement-edit>إلغاء التعديل</button>' : ''}</form>` : '<p class="profile-note">إضافة وتعديل الحركات متاح لحساب المالك أو مدير النظام أو الحساب المالي.</p>'}<div class="employee-list rows"><table class="employee-table rental-statement-table"><thead><tr><th>التاريخ</th><th>البيان</th><th>النوع</th><th>المبلغ</th><th>أضافها</th><th>الحالة</th><th>إجراء</th></tr></thead><tbody>${movementRows || '<tr><td colspan="7" class="log-empty">لا توجد حركات لهذا العامل.</td></tr>'}</tbody></table></div></section><section class="profile-panel"><div class="panel-title"><div><h3>سجل حركات كشف الحساب</h3><p>تاريخ الإضافة والتعديل والحذف والاستعادة مع الحساب المنفذ</p></div></div><div class="employee-list rows"><table class="employee-table"><thead><tr><th>الوقت</th><th>الحركة</th><th>التفاصيل</th><th>اسم الحساب</th><th>معرّف الحساب</th></tr></thead><tbody>${historyRows || '<tr><td colspan="5" class="log-empty">لم تسجل حركات بعد.</td></tr>'}</tbody></table></div></section><p class="profile-note">الرواتب المرحلة من المسيرات تظهر هنا تلقائيًا. الخصومات والإضافيات اليدوية لا تُرحّل تلقائيًا إلا عند اختيار ترحيلها. حذف الحركة يخفيها من الرصيد ويحفظها في سجل التدقيق.</p></div>`;
    return;
  }
  if (section === 'attendance-approvals') {
    host.innerHTML = `<section class="profile-panel"><div class="panel-title"><div><h3>حضور واعتمادات ${escapeHtml(worker.name)}</h3><p>التحضيرات اليومية واعتمادات نموذج مباشرة العمل</p></div><strong data-rental-history-count></strong></div><div class="rental-history-filters"><label>من تاريخ<input type="date" data-rental-history-from></label><label>إلى تاريخ<input type="date" data-rental-history-to></label><label>نوع السجل<select data-rental-history-type><option value="all">الكل</option><option value="attendance">الحضور والتحضير</option><option value="approvals">الاعتمادات والمباشرات</option></select></label><button type="button" class="secondary-button" data-clear-rental-history>مسح الفلاتر</button></div><div class="prep-date-warning" data-rental-history-warning role="status" hidden></div><div class="employee-list rows"><table class="employee-table preparation-table"><thead><tr><th>التاريخ</th><th>الحركة</th><th>الموقع / التفاصيل</th><th>المُعدّ / مقدم الطلب</th><th>المعتمد</th><th>الحالة</th></tr></thead><tbody data-rental-history-body></tbody></table></div><p class="profile-note">التحضير يظهر بحالته الحالية؛ لا يُعدّ حضورًا معتمدًا قبل اكتمال سلسلة الموافقة.</p></section>`;
    renderRentalAttendanceApprovalRows(worker);
    return;
  }
  if (section === 'notes') {
    const notes = (Array.isArray(rentalWorkerNotes[worker.id]) ? rentalWorkerNotes[worker.id] : []).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    host.innerHTML = `<div class="profile-section-stack"><section class="profile-panel"><h3>إضافة ملاحظة داخلية</h3><form class="rental-note-form" data-rental-note-form><label>الملاحظة<textarea name="note" rows="4" maxlength="1000" placeholder="اكتب ملاحظة تخص هذا العامل" required></textarea></label><button class="primary-button" type="submit">حفظ الملاحظة</button></form><p class="profile-note">هذه الملاحظات داخلية في ملف العامل ولا تضاف إلى كشف الحساب.</p></section><section class="profile-panel"><div class="panel-title"><div><h3>سجل الملاحظات</h3><p>${arabicNumber.format(notes.length)} ملاحظة</p></div></div>${notes.length ? `<div class="rental-note-list">${notes.map((item) => `<article class="rental-note-entry"><p>${escapeHtml(item.text)}</p><small>${escapeHtml(item.author)} · ${new Date(item.createdAt).toLocaleString('ar-SA')}</small></article>`).join('')}</div>` : '<div class="profile-empty-state">لا توجد ملاحظات لهذا العامل.</div>'}</section></div>`;
  }
}

let selectedRentalAssignmentWorkerId = '';
let rentalHireProofPreviewUrl = '';
const rentalAssignmentView = document.querySelector('[data-rental-assignment]');
const rentalAssignmentSearch = document.querySelector('[data-rental-assignment-search]');
const rentalAssignmentResults = document.querySelector('[data-rental-assignment-results]');
const rentalAssignmentFormHost = document.querySelector('[data-rental-assignment-form]');

function renderRentalAssignmentPage() {
  if (!rentalAssignmentView) return;
  if (rentalHireProofPreviewUrl) { URL.revokeObjectURL(rentalHireProofPreviewUrl); rentalHireProofPreviewUrl = ''; }
  const query = rentalAssignmentSearch.value.trim().toLocaleLowerCase('ar');
  const matches = query ? rentalRecords.filter((worker) => [worker.name, worker.id, rentalWorkerCode(worker), worker.residency, worker.job].some((value) => String(value || '').toLocaleLowerCase('ar').includes(query))).slice(0, 40) : [];
  rentalAssignmentResults.innerHTML = matches.length ? `<div class="rental-assignment-result-list">${matches.map((worker) => `<button type="button" class="rental-assignment-result ${worker.id === selectedRentalAssignmentWorkerId ? 'active' : ''}" data-rental-assignment-select="${escapeHtml(worker.id)}"><strong>${escapeHtml(worker.name)}</strong><small>${escapeHtml(rentalWorkerCode(worker))} · ${escapeHtml(worker.job)} · إقامة ${escapeHtml(worker.residency)}</small></button>`).join('')}</div>` : `<div class="profile-empty-state">${query ? 'لا توجد نتائج مطابقة لبحث العامل.' : 'اكتب اسم العامل أو كوده أو رقم الإقامة للبحث والاختيار.'}</div>`;
  const worker = rentalRecords.find((item) => item.id === selectedRentalAssignmentWorkerId);
  if (!worker) { rentalAssignmentFormHost.innerHTML = '<div class="profile-empty-state">ابحث عن العامل ثم اختره لعرض نموذج التعيين.</div>'; return; }
  const latest = rentalDirectHireRequests.filter((item) => item.workerId === worker.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  if (latest?.status === 'pending-approval') {
    const approvals = (latest.approvalHistory || []).filter((item) => item.action === 'approved').map((item) => item.name || item.stage);
    rentalAssignmentFormHost.innerHTML = `<section class="profile-panel rental-assignment-detail"><div class="panel-title"><div><h3>${escapeHtml(worker.name)}</h3><p>نموذج مباشرة العمل · ${escapeHtml(rentalWorkerCode(worker))}</p></div><span class="request-status-pill">${escapeHtml(leaveRequestStatusLabel(latest))}</span></div>${rentalHirePreviewMarkup(worker, latest)}${isSystemAdmin() && latest.identityProofFileId ? `<button type="button" class="secondary-button" data-open-hire-proof="${escapeHtml(latest.id)}">عرض صورة إثبات الهوية</button>` : ''}${approvals.length ? `<p class="approval-trace">اعتمادات: ${approvals.map(escapeHtml).join(' ← ')}</p>` : ''}<p class="profile-note">الطلب ينتظر الاعتماد ولا يفعّل العامل قبل اعتمادك النهائي. تظهر كل البيانات لمالك النظام.</p></section>`;
    return;
  }
  const revision = latest?.status === 'needs-revision';
  const approved = latest?.status === 'approved';
  if (approved) {
    rentalAssignmentFormHost.innerHTML = `<section class="profile-panel"><div class="panel-title"><div><h3>${escapeHtml(worker.name)}</h3><p>نموذج مباشرة العمل محفوظ ضمن مرفقات العامل</p></div><span class="request-status-pill">معتمد نهائيًا</span></div>${rentalHirePreviewMarkup(worker, latest)}${isSystemAdmin() && latest.identityProofFileId ? `<button type="button" class="secondary-button" data-open-hire-proof="${escapeHtml(latest.id)}">عرض صورة إثبات الهوية</button>` : ''}<p class="profile-note">تم إيقاف إنشاء نموذج مباشرة مكرر لهذا العامل بعد الاعتماد النهائي.</p></section>`;
    return;
  }
  const formTitle = revision ? 'استكمال المراجعة وإعادة الإرسال' : 'بيانات نموذج مباشرة العمل';
  const siteOptions = [...new Set([...rentalPreparationSites(), ...rentalRecords.map(rentalWorkerCurrentSite)].filter(Boolean))];
  const jobOptions = [...new Set([worker.job, ...rentalRecords.map((item) => item.job)].filter(Boolean))];
  const selectedSite = revision ? latest.site : rentalWorkerCurrentSite(worker);
  const proofField = latest?.identityProofFileId ? `<p class="profile-note">إثبات الهوية المحفوظ: ${escapeHtml(latest.identityProofFileName || 'صورة مرفوعة')}. ارفع صورة جديدة لاستبدالها، أو أعد الإرسال دون تغييرها.</p>` : '';
  const proofRequired = !revision || !latest?.identityProofFileId;
  rentalAssignmentFormHost.innerHTML = `<section class="profile-panel"><div class="panel-title"><div><h3>${formTitle}</h3><p>${escapeHtml(worker.name)} · ${escapeHtml(rentalWorkerCode(worker))} · أكمل بيانات التعيين وأرفق إثبات الهوية قبل الإرسال</p></div><span class="private-data-tag">مالك النظام يرى النموذج كاملًا</span></div>${revision && latest.reviewNotes ? `<div class="duplicate-block"><strong>ملاحظات المالك / مدير النظام</strong><p>${escapeHtml(latest.reviewNotes)}</p></div>` : ''}<form class="rental-assignment-form rental-hire-complete-form" data-rental-hire-form ${revision ? `data-request-id="${escapeHtml(latest.id)}"` : ''}><div class="rental-form-subheading">بيانات العامل</div><label>اسم العامل<input value="${escapeHtml(worker.name)}" readonly></label><label>كود العامل<input value="${escapeHtml(rentalWorkerCode(worker))}" readonly></label><label>رقم الإقامة / الهوية<input name="identityNumber" value="${escapeHtml(revision ? latest.identityNumber || worker.residency : worker.residency)}" maxlength="30" required></label><label>الجنسية<input value="${escapeHtml(worker.nationality)}" readonly></label><label>المهنة<select name="job" required>${jobOptions.map((job) => `<option value="${escapeHtml(job)}" ${(revision ? latest.job : worker.job) === job ? 'selected' : ''}>${escapeHtml(job)}</option>`).join('')}</select></label><label>موقع السكن<input value="${escapeHtml(worker.residence)}" readonly></label><div class="rental-form-subheading">بيانات التعيين</div><label>نوع الإجراء<select name="assignmentType" required><option value="new" ${!revision || latest.assignmentType === 'new' ? 'selected' : ''}>تعيين جديد</option><option value="renewal" ${revision && latest.assignmentType === 'renewal' ? 'selected' : ''}>تجديد</option><option value="site-transfer" ${revision && latest.assignmentType === 'site-transfer' ? 'selected' : ''}>نقل موقع</option></select></label><label>تاريخ المباشرة<input type="date" name="startDate" value="${escapeHtml(revision ? latest.startDate : saudiTodayISO())}" required></label><label>المشروع / موقع العمل<select name="site" required>${siteOptions.map((site) => `<option value="${escapeHtml(site)}" ${selectedSite === site ? 'selected' : ''}>${escapeHtml(site)}</option>`).join('')}</select></label><label>نوع الأجر<select name="wageUnit" required><option value="شهري" ${(revision ? latest.wageUnit : 'شهري') === 'شهري' ? 'selected' : ''}>راتب شهري</option><option value="يومي" ${revision && latest.wageUnit === 'يومي' ? 'selected' : ''}>أجر يومي</option><option value="بالساعة" ${revision && latest.wageUnit === 'بالساعة' ? 'selected' : ''}>أجر بالساعة</option></select></label><label>مبلغ الأجر (ر.س)<input type="number" name="wageAmount" min="0.01" step="0.01" value="${escapeHtml(revision ? latest.wageAmount : rentalWageNumber(worker))}" required></label><label>نهاية التعيين (اختياري)<input type="date" name="endDate" value="${escapeHtml(revision ? latest.endDate || '' : '')}"></label><label>رقم تواصل العامل<input type="tel" name="phone" maxlength="25" value="${escapeHtml(revision ? latest.phone || '' : worker.phone || '')}" placeholder="05xxxxxxxx"></label><label>طريقة صرف الأجر<select name="paymentMethod" required><option value="تحويل بنكي" ${revision && latest.paymentMethod === 'تحويل بنكي' ? 'selected' : ''}>تحويل بنكي</option><option value="نقدي" ${revision && latest.paymentMethod === 'نقدي' ? 'selected' : ''}>نقدي</option><option value="ضمن المسير" ${!revision || latest.paymentMethod === 'ضمن المسير' ? 'selected' : ''}>ضمن مسير الرواتب</option></select></label><label class="rental-hire-proof-field">صورة إثبات الهوية<input type="file" name="identityProof" data-rental-hire-proof accept="image/jpeg,image/png,image/webp" ${proofRequired ? 'required' : ''}><small>صورة واضحة للهوية أو الإقامة، بحد أقصى 15 ميجابايت.</small>${proofField}<span data-rental-hire-proof-preview></span></label><label class="rental-hire-notes-field">ملاحظات التعيين<textarea name="notes" rows="3" maxlength="600" placeholder="أي تفاصيل إضافية تظهر في نموذج المراجعة">${escapeHtml(revision ? latest.notes || '' : '')}</textarea></label><button class="primary-button" type="submit">${revision ? 'إعادة الإرسال للاعتماد' : 'إرسال نموذج التعيين للاعتماد'}</button></form><p class="profile-note">بعد الإرسال ينتقل النموذج إلى المهندس ثم مدير المشاريع ثم حسابك لاعتماد نهائي. لن يتفعّل التعيين أو يتغير أجر العامل قبل اعتمادك. صورة الهوية خاصة بمالك النظام ومدير النظام في هذه المعاينة.</p></section>`;
}

function rentalWageNumber(worker) {
  const raw = String(rentalWorkerWage(worker) ?? '').replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))).replace(/[٬,]/g, '');
  const value = Number(raw.replace(/[^0-9.]/g, ''));
  return Number.isFinite(value) && value > 0 ? value : '';
}

function rentalHirePreviewMarkup(worker, request) {
  const fields = [
    ['اسم العامل', worker.name], ['كود العامل', rentalWorkerCode(worker)], ['رقم الإقامة / الهوية', request.identityNumber || worker.residency], ['الجنسية', worker.nationality], ['المهنة', request.job || worker.job], ['موقع السكن', worker.residence],
    ['نوع الإجراء', { new: 'تعيين جديد', renewal: 'تجديد', 'site-transfer': 'نقل موقع' }[request.assignmentType] || 'تعيين'], ['تاريخ المباشرة', request.startDate], ['الموقع', request.site], ['نوع الأجر', request.wageUnit || 'شهري'], ['الأجر', `${request.wageAmount || request.wage} ر.س`], ['نهاية التعيين', request.endDate || 'مفتوح'], ['رقم التواصل', request.phone || 'غير مسجل'], ['طريقة الصرف', request.paymentMethod || 'ضمن المسير'], ['ملاحظات التعيين', request.notes || '—'],
  ];
  return `<div class="rental-hire-review-grid">${fields.map(([label, value]) => `<div><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`).join('')}</div>`;
}

async function openRentalHireProof(requestId) {
  if (!isSystemAdmin()) { notify('صورة إثبات الهوية متاحة لمالك النظام أو مدير النظام فقط.'); return; }
  const request = rentalDirectHireRequests.find((item) => item.id === requestId);
  if (!request?.identityProofFileId) { notify('لا توجد صورة إثبات هوية محفوظة لهذا الطلب.'); return; }
  const proofWindow = window.open('about:blank', '_blank');
  if (!proofWindow) { notify('اسمح بفتح نافذة جديدة لعرض صورة إثبات الهوية.'); return; }
  try {
    const files = await getEmployeeFiles(rentalFileOwnerId(request.workerId));
    const proof = files.find((item) => item.id === request.identityProofFileId);
    if (!proof) throw new Error('لم يتم العثور على صورة إثبات الهوية.');
    const url = URL.createObjectURL(proof.blob);
    proofWindow.document.write(`<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>إثبات هوية العامل</title><body style="margin:0;background:#17212b;display:grid;place-items:center;min-height:100vh"><img src="${url}" alt="إثبات هوية العامل" style="max-width:96vw;max-height:96vh;object-fit:contain"></body></html>`);
    proofWindow.document.close();
  } catch (error) { proofWindow.close(); notify(error.message || 'تعذر فتح صورة إثبات الهوية.'); }
}

rentalAssignmentSearch.addEventListener('input', renderRentalAssignmentPage);
rentalAssignmentView.addEventListener('click', (event) => {
  const select = event.target.closest('[data-rental-assignment-select]');
  if (!select) return;
  selectedRentalAssignmentWorkerId = select.dataset.rentalAssignmentSelect;
  renderRentalAssignmentPage();
});
rentalAssignmentView.addEventListener('change', (event) => {
  if (!event.target.matches('[data-rental-hire-proof]')) return;
  if (rentalHireProofPreviewUrl) URL.revokeObjectURL(rentalHireProofPreviewUrl);
  rentalHireProofPreviewUrl = '';
  const file = event.target.files?.[0];
  const preview = rentalAssignmentView.querySelector('[data-rental-hire-proof-preview]');
  if (!preview) return;
  preview.replaceChildren();
  if (!file || !file.type.startsWith('image/')) return;
  rentalHireProofPreviewUrl = URL.createObjectURL(file);
  const image = document.createElement('img'); image.src = rentalHireProofPreviewUrl; image.alt = 'معاينة إثبات الهوية'; image.className = 'rental-hire-proof-preview-image';
  preview.append(image);
});

rentalAssignmentView.addEventListener('click', (event) => {
  const proofButton = event.target.closest('[data-open-hire-proof]');
  if (!proofButton) return;
  openRentalHireProof(proofButton.dataset.openHireProof);
});

rentalAssignmentView.addEventListener('submit', async (event) => {
  if (!event.target.matches('[data-rental-hire-form]')) return;
  event.preventDefault();
  const worker = rentalRecords.find((item) => item.id === selectedRentalAssignmentWorkerId);
  const form = event.target;
  const requestId = form.dataset.requestId;
  const config = approvalChainConfigs['rental-direct-hire'];
  const allowed = canCreateRentalDirectHire();
  if (!worker || !allowed) { notify('إنشاء أو تعديل نموذج المباشرة غير متاح للحساب الحالي.'); return; }
  const startDate = form.elements.startDate.value;
  const endDate = form.elements.endDate.value;
  const site = form.elements.site.value.trim();
  const wageAmount = Number(form.elements.wageAmount.value);
  const wageUnit = form.elements.wageUnit.value;
  const identityNumber = form.elements.identityNumber.value.trim();
  const identityProof = form.elements.identityProof.files?.[0] || null;
  if (!identityNumber || !startDate || (endDate && endDate < startDate) || !site || !Number.isFinite(wageAmount) || wageAmount <= 0 || !form.elements.job.value || !form.elements.assignmentType.value || !form.elements.paymentMethod.value || !config.stages.length || config.stages.some((stage) => stage.mode === 'account' && stage.value === sessionIdentifier())) { notify('أكمل رقم الهوية وبيانات التعيين والأجر وتحقق من سلسلة الاعتماد والتواريخ.'); return; }
  if (!identityProof && !requestId) { notify('ارفع صورة إثبات الهوية قبل إرسال نموذج التعيين.'); return; }
  if (identityProof && (!identityProof.type.startsWith('image/') || identityProof.size > 15 * 1024 * 1024)) { notify('ارفع صورة هوية واضحة لا يتجاوز حجمها 15 ميجابايت.'); return; }
  const session = window.NAGM_SESSION || {};
  const request = requestId && rentalDirectHireRequests.find((item) => item.id === requestId && item.workerId === worker.id && item.status === 'needs-revision');
  if (requestId && !request) { notify('طلب إعادة المراجعة لم يعد متاحًا.'); return; }
  if (!request) {
    if (rentalDirectHireRequests.some((item) => item.workerId === worker.id && item.status === 'pending-approval')) { notify('يوجد نموذج مباشرة لهذا العامل بانتظار الاعتماد.'); return; }
    if (rentalDirectHireRequests.some((item) => item.workerId === worker.id && item.status === 'approved')) { notify('تم اعتماد نموذج مباشرة لهذا العامل بالفعل.'); return; }
  }
  const targetRequest = request || { id: `HIRE-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, workerId: worker.id, approvalHistory: [], revisionHistory: [], createdAt: new Date().toISOString() };
  const proofFileId = `rental-hire-proof-${worker.id}-${targetRequest.id}`;
  try {
    if (identityProof) await putEmployeeFile({ id: proofFileId, employeeId: rentalFileOwnerId(worker.id), workerId: worker.id, kind: 'rental-attachment', category: 'إثبات الهوية', label: `إثبات هوية ${worker.name}`, visibility: 'owner-only', fileName: identityProof.name, blob: identityProof, createdAt: new Date().toISOString() });
  } catch (error) { notify(error.message || 'تعذر حفظ صورة إثبات الهوية.'); return; }
  Object.assign(targetRequest, { workerId: worker.id, identityNumber, job: form.elements.job.value, assignmentType: form.elements.assignmentType.value, startDate, endDate, site, wageAmount, wageUnit, wage: `${new Intl.NumberFormat('ar-SA').format(wageAmount)} ر.س / ${wageUnit}`, phone: form.elements.phone.value.trim(), paymentMethod: form.elements.paymentMethod.value, notes: form.elements.notes.value.trim(), identityProofFileId: identityProof ? proofFileId : targetRequest.identityProofFileId, identityProofFileName: identityProof?.name || targetRequest.identityProofFileName || '', requestedBy: sessionIdentifier(), requesterName: session.displayName || session.fullName || session.name || session.account || 'الحساب الحالي', approvalStages: structuredClone(config.stages), stageIndex: 0, approvalHistory: [], status: 'pending-approval', verificationMode: 'manual-document-review' });
  if (request) targetRequest.resubmittedAt = new Date().toISOString(); else rentalDirectHireRequests.unshift(targetRequest);
  saveRentalDirectHireRequests(); renderRentalAssignmentPage(); renderMyApprovals(); notify(request ? 'تم تحديث النموذج وإعادة إرساله للاعتماد.' : 'تم توليد نموذج التعيين وإرساله للاعتماد.');
});

function openRentalAssignment(workerId = '') {
  if (!canCreateRentalDirectHire()) { setCurrentView('rental-assignment'); return; }
  selectedRentalAssignmentWorkerId = workerId;
  rentalAssignmentSearch.value = '';
  setCurrentView('rental-assignment');
  renderRentalAssignmentPage();
}

function renderRentalList() {
  const rows = filteredRentalRecords();
  rentalList.classList.toggle('rows', rentalMode === 'rows');
  document.querySelector('[data-rental-empty]').hidden = rows.length > 0;
  if (rentalMode === 'cards') {
    rentalList.innerHTML = rows.map((worker) => `<article class="employee-card" role="button" tabindex="0" data-open-rental="${worker.id}" aria-label="فتح ملف ${escapeHtml(worker.name)}"><div class="employee-card-head"><span class="employee-avatar">${arabicNumber.format(Number(worker.id.slice(-1)))}</span><div class="employee-name"><strong>${escapeHtml(worker.name)}</strong><small>${escapeHtml(rentalWorkerCode(worker))} · ${escapeHtml(worker.job)}</small></div><span class="status-badge ${worker.status}">${employeeStatus[worker.status]}</span></div><div class="employee-fields">${field('رقم الإقامة', worker.residency)}${field('الجنسية', worker.nationality)}${field('الديانة', worker.religion)}${field('موقع السكن', worker.residence)}${field('آخر موقع تجهيز', worker.previousSite)}${field('الراتب / الأجر', rentalWorkerWage(worker))}</div><div class="employee-card-foot"><button type="button" data-open-rental-profile="${worker.id}">عرض الملف</button></div></article>`).join('');
  } else {
    rentalList.innerHTML = `<table class="employee-table rental-directory-table"><thead><tr><th>العامل</th><th>المهنة</th><th>رقم الإقامة</th><th>الجنسية</th><th>موقع السكن</th><th>آخر موقع تجهيز</th><th>الراتب / الأجر</th><th>الحالة</th></tr></thead><tbody>${rows.map((worker) => `<tr data-open-rental="${worker.id}" tabindex="0"><td><div class="employee-name-cell"><span class="employee-avatar">${arabicNumber.format(Number(worker.id.slice(-1)))}</span><span>${escapeHtml(worker.name)}<small style="display:block;color:var(--muted);font-size:8px;font-weight:400">${escapeHtml(rentalWorkerCode(worker))}</small></span></div></td><td>${escapeHtml(worker.job)}</td><td>${escapeHtml(worker.residency)}</td><td>${escapeHtml(worker.nationality)}</td><td>${escapeHtml(worker.residence)}</td><td>${escapeHtml(worker.previousSite)}</td><td>${escapeHtml(rentalWorkerWage(worker))}</td><td><span class="status-badge ${worker.status}">${employeeStatus[worker.status]}</span></td></tr>`).join('')}</tbody></table>`;
  }
}

document.querySelectorAll('[data-rental-status]').forEach((button) => button.addEventListener('click', () => {
  rentalFilter = button.dataset.rentalStatus;
  document.querySelectorAll('[data-rental-status]').forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  renderRentalList();
}));
document.querySelectorAll('[data-rental-mode]').forEach((button) => button.addEventListener('click', () => {
  rentalMode = button.dataset.rentalMode;
  document.querySelectorAll('[data-rental-mode]').forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  renderRentalList();
}));
rentalSearch.addEventListener('input', renderRentalList);
const rentalJobFilter = document.querySelector('[data-rental-job]');
[...new Set(rentalRecords.map((worker) => worker.job))].sort().forEach((job) => rentalJobFilter.add(new Option(job, job)));
rentalJobFilter.addEventListener('change', renderRentalList);
document.querySelectorAll('[data-rental-count]').forEach((node) => {
  const status = node.dataset.rentalCount;
  node.textContent = arabicNumber.format(status === 'all' ? rentalRecords.length : rentalRecords.filter((worker) => worker.status === status).length);
});
renderRentalList();
rentalList.addEventListener('click', (event) => {
  const action = event.target.closest('[data-open-rental-profile]');
  const row = event.target.closest('[data-open-rental]');
  const id = action?.dataset.openRentalProfile || row?.dataset.openRental;
  if (id) openRentalProfile(rentalRecords.find((worker) => worker.id === id));
});
rentalList.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    const row = event.target.closest('[data-open-rental]');
    if (row) { event.preventDefault(); openRentalProfile(rentalRecords.find((worker) => worker.id === row.dataset.openRental)); }
  }
});
rentalProfile.addEventListener('click', (event) => {
  if (event.target.closest('[data-back-rental]')) setCurrentView('rental-workers');
  const assignmentButton = event.target.closest('[data-open-rental-assignment]');
  if (assignmentButton) { openRentalAssignment(assignmentButton.dataset.openRentalAssignment); return; }
  const section = event.target.closest('[data-rental-profile-section]');
  if (section && selectedRentalWorker) openRentalProfile(selectedRentalWorker, section.dataset.rentalProfileSection);
  const editLedger = event.target.closest('[data-edit-rental-statement]');
  if (editLedger && selectedRentalWorker && canManageRentalStatement()) {
    editingRentalStatementId = editLedger.dataset.editRentalStatement;
    renderRentalProfileSection(selectedRentalWorker, 'statement'); return;
  }
  if (event.target.closest('[data-cancel-rental-statement-edit]') && selectedRentalWorker) {
    editingRentalStatementId = ''; renderRentalProfileSection(selectedRentalWorker, 'statement'); return;
  }
  if (event.target.closest('[data-clear-rental-history]') && selectedRentalWorker) {
    rentalProfile.querySelector('[data-rental-history-from]').value = '';
    rentalProfile.querySelector('[data-rental-history-to]').value = '';
    rentalProfile.querySelector('[data-rental-history-type]').value = 'all';
    renderRentalAttendanceApprovalRows(selectedRentalWorker);
  }
});
rentalProfile.addEventListener('change', (event) => {
  if (event.target.matches('[data-rental-history-from], [data-rental-history-to], [data-rental-history-type]') && selectedRentalWorker) renderRentalAttendanceApprovalRows(selectedRentalWorker);
});
rentalProfile.addEventListener('submit', async (event) => {
  const worker = selectedRentalWorker;
  if (!worker) return;
  if (event.target.matches('[data-rental-statement-form]')) {
    event.preventDefault();
    if (!canManageRentalStatement()) { notify('إضافة وتعديل كشف الحساب متاح للحساب المالي أو مدير النظام.'); return; }
    const form = event.target;
    const amount = Number(form.elements.amount.value);
    const date = form.elements.date.value;
    const description = form.elements.description.value.trim();
    const type = form.elements.type.value;
    if (!date || !description || !Number.isFinite(amount) || amount <= 0) { notify('أكمل نوع الحركة والتاريخ والبيان والمبلغ بشكل صحيح.'); return; }
    const actor = rentalAuditActor();
    const entryId = form.dataset.entryId;
    const entry = entryId && rentalStatementEntries.find((item) => item.id === entryId && item.workerId === worker.id && item.status !== 'deleted');
    if (entryId && !entry) { notify('الحركة لم تعد متاحة للتعديل.'); editingRentalStatementId = ''; return; }
    if (entry) {
      const before = { type: entry.type, date: entry.date, description: entry.description, amount: entry.amount };
      Object.assign(entry, { type, date, description, amount, updatedAt: new Date().toISOString(), updatedBy: actor.actorId, updatedByName: actor.actorName });
      entry.history ||= []; entry.history.push({ action: 'edited', ...actor, at: entry.updatedAt, before, after: { type, date, description, amount } });
      editingRentalStatementId = '';
    } else {
      const createdAt = new Date().toISOString();
      rentalStatementEntries.unshift({ id: `LEDGER-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, workerId: worker.id, type, date, description, amount, status: 'active', source: 'manual', createdAt, createdBy: actor.actorId, createdByName: actor.actorName, history: [{ action: 'added', ...actor, at: createdAt, description, amount, type }] });
    }
    saveRentalStatementEntries(); renderRentalProfileSection(worker, 'statement'); notify(entry ? 'تم تعديل الحركة وتسجيل تفاصيل التعديل.' : 'تمت إضافة الحركة وتسجيل الحساب الذي أضافها.'); return;
  }
  if (event.target.matches('[data-rental-code-form]')) {
    event.preventDefault();
    const code = event.target.elements.workerCode.value.trim();
    if (!code) { notify('اكتب كود العامل.'); return; }
    rentalWorkerCodes[worker.id] = code;
    saveRentalWorkerCodes(); renderRentalList(); openRentalProfile(worker, 'overview');
    notify('تم حفظ كود العامل.'); return;
  }
  if (event.target.matches('[data-rental-attachment-form]')) {
    event.preventDefault();
    const form = event.target;
    const file = form.elements.file.files?.[0];
    const label = form.elements.label.value.trim();
    const category = form.elements.category.value;
    if (!file || !label) { notify('اختر الملف واكتب اسمه.'); return; }
    if (file.size > 15 * 1024 * 1024) { notify('حجم الملف يجب ألا يتجاوز 15 ميجابايت في المعاينة.'); return; }
    try {
      await putEmployeeFile({ id: `rental-attachment-${crypto.randomUUID()}`, employeeId: rentalFileOwnerId(worker.id), workerId: worker.id, kind: 'rental-attachment', category, label, fileName: file.name, blob: file, createdAt: new Date().toISOString() });
      openRentalProfile(worker, 'attachments'); notify(`تم حفظ مرفق «${label}» في ملف العامل.`);
    } catch (error) { notify(error.message); }
    return;
  }
  if (event.target.matches('[data-rental-note-form]')) {
    event.preventDefault();
    const text = event.target.elements.note.value.trim();
    if (!text) return;
    rentalWorkerNotes[worker.id] ||= [];
    rentalWorkerNotes[worker.id].unshift({ id: `NOTE-${Date.now()}`, text, author: window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.name || window.NAGM_SESSION?.account || 'حساب المالك — معاينة', createdAt: new Date().toISOString() });
    saveRentalWorkerNotes(); openRentalProfile(worker, 'notes'); notify('تم حفظ الملاحظة في سجل العامل.');
  }
});
document.querySelectorAll('[data-rental-action]').forEach((button) => button.addEventListener('click', () => {
  const messages = { template: 'قالب العمالة الإيجارية سيُجهز ضمن خطوة اعتماد حقول الاستيراد.', import: 'استيراد Excel سيحتاج معاينة وتأكيد مفتاح مطابقة السجلات.', add: 'إضافة العامل ستُفعل عند تجهيز نموذج البيانات.' };
  notify(messages[button.dataset.rentalAction]);
}));

const previewSession = window.NAGM_SESSION || { role: 'owner', account: 'owner', displayName: 'حساب المالك — معاينة' };
const prepDateStart = document.querySelector('[data-prep-date-start]');
const prepDateEnd = document.querySelector('[data-prep-date-end]');
const prepDateWarning = document.querySelector('[data-prep-date-warning]');
const prepSite = document.querySelector('[data-prep-site]');
const prepSearch = document.querySelector('[data-prep-search]');
const prepWorkersHost = document.querySelector('[data-prep-workers]');
const sessionRole = String(previewSession.role || '').trim().toLocaleLowerCase('ar');
const isSiteEngineer = sessionRole.includes('مهندس') && !sessionRole.includes('مدير') || ['engineer', 'site-engineer'].includes(sessionRole);
const sessionSites = Array.isArray(previewSession.allowedSites) ? previewSession.allowedSites : Array.isArray(previewSession.sites) ? previewSession.sites : [];
if (sessionSites.length && isSiteEngineer) {
  const allowed = new Set(sessionSites.map(String));
  [...prepSite.options].forEach((option) => { option.hidden = !allowed.has(option.value) && !allowed.has(option.textContent.trim()); });
  const firstAllowedSite = [...prepSite.options].find((option) => !option.hidden);
  if (firstAllowedSite) prepSite.value = firstAllowedSite.value;
} else if (previewSession.site && [...prepSite.options].some((option) => option.value === previewSession.site || option.textContent.trim() === previewSession.site)) {
  prepSite.value = previewSession.site;
}
const selectedPrepWorkerIds = new Set();
const preparerName = previewSession.displayName || previewSession.fullName || previewSession.name || previewSession.username || previewSession.email || previewSession.account || 'الحساب الحالي';
document.querySelector('[data-prep-identity]').textContent = preparerName;
let registeredAccounts = [];
try {
  const localAccounts = JSON.parse(localStorage.getItem('nagm-registered-accounts') || '[]');
  const sourceAccounts = Array.isArray(window.NAGM_ACCOUNTS) ? window.NAGM_ACCOUNTS : [];
  const accountById = new Map(sourceAccounts.map((account) => [String(account?.id || account?.email || account?.username || account?.account || account?.name || ''), account]));
  for (const account of Array.isArray(localAccounts) ? localAccounts : []) {
    const id = String(account?.id || account?.email || account?.username || account?.account || account?.name || '');
    if (id) accountById.set(id, { ...(accountById.get(id) || {}), ...account });
  }
  registeredAccounts = sourceAccounts.length || Array.isArray(localAccounts) ? [...accountById.values()] : [];
  if (!Array.isArray(registeredAccounts)) registeredAccounts = [];
} catch { registeredAccounts = []; }
let rentalSiteEngineerAssignments = loadRentalJson('nagm-rental-site-engineers', {});
if (!rentalSiteEngineerAssignments || typeof rentalSiteEngineerAssignments !== 'object' || Array.isArray(rentalSiteEngineerAssignments)) rentalSiteEngineerAssignments = {};

function rentalPreparationSites() {
  return [...new Set([...(prepSite ? [...prepSite.options].map((option) => option.value || option.textContent.trim()) : [])].filter(Boolean))];
}

function registeredAccountHasEngineerRole(account) {
  const rawRoles = [account?.role, account?.roleName, account?.type, account?.userType, ...(Array.isArray(account?.roles) ? account.roles : [])];
  return rawRoles.some((value) => {
    const role = String(value || '').trim().toLocaleLowerCase('ar');
    return role === 'engineer' || role === 'site-engineer' || (role.includes('مهندس') && !role.includes('مدير'));
  });
}

function rentalEngineerAccounts() {
  return registeredAccounts.filter(registeredAccountHasEngineerRole);
}

function syncRentalSiteEngineerAssignments() {
  const next = {};
  for (const account of rentalEngineerAccounts()) {
    const site = String(account.responsibleSite || '').trim();
    if (site) next[site] = accountIdentifier(account);
  }
  rentalSiteEngineerAssignments = next;
  localStorage.setItem('nagm-rental-site-engineers', JSON.stringify(next));
}

function renderAccounts() {
  const host = document.querySelector('[data-accounts-content]');
  if (!host) return;
  const siteOptions = rentalPreparationSites().map((site) => `<option value="${escapeHtml(site)}">${escapeHtml(site)}</option>`).join('');
  const employeeOptions = employeeRecords.filter((employee) => !employee.archived && !employee.systemHidden && employee.sponsor === 'الشركة').map((employee) => `<option value="${escapeHtml(employee.id)}">${escapeHtml(employee.name)} · ${escapeHtml(employee.id)}</option>`).join('');
  const accountRows = registeredAccounts.map((account) => {
    const id = accountIdentifier(account);
    const isEngineer = registeredAccountHasEngineerRole(account);
    const isSiteSupervisor = isEngineer || ['monitor','site-supervisor'].includes(String(account.role || '').toLowerCase());
    const name = account.displayName || account.fullName || account.name || id;
    const role = account.roleName || account.role || (isEngineer ? 'مهندس' : 'حساب مسجل');
    const responsibleSite = String(account.responsibleSite || Object.entries(rentalSiteEngineerAssignments).find(([, engineerId]) => engineerId === id)?.[0] || '');
    return `<article class="management-employee-card account-management-row"><div class="management-employee-head"><div><strong>${escapeHtml(name)}</strong><small>${escapeHtml(id)} · ${escapeHtml(role)}</small></div><span class="request-status-pill">${isEngineer ? 'مهندس' : isSiteSupervisor ? 'مسؤول موقع' : 'حساب'}</span></div>${isSiteSupervisor ? `<label>الموقع المسؤول عنه<select data-account-responsible-site="${escapeHtml(id)}"><option value="">لا يوجد موقع مسؤولية</option>${siteOptions.replace(`value="${escapeHtml(responsibleSite)}"`, `value="${escapeHtml(responsibleSite)}" selected` )}</select></label><small class="profile-note">مسؤولية هذا الحساب عن الموقع تشمل تسجيل الإضافيات. مواقع السماح بالبصمة تُدار منفصلة من «تعيين معرف لوكيشن».</small>` : ''}</article>`;
  }).join('');
  host.innerHTML = `<section class="profile-panel"><div class="panel-title"><div><h3>إنشاء حساب</h3><p>حدد الموقع المسؤول عنه عند إضافة المهندس أو المراقب.</p></div></div><form class="rental-note-form account-create-form" data-new-account><label>اسم الحساب<input name="displayName" required maxlength="100" placeholder="اسم المهندس أو الموظف"></label><label>معرّف الدخول<input name="accountId" required maxlength="120" placeholder="اسم مستخدم أو بريد إلكتروني"></label><label>الصلاحية<select name="role" required><option value="employee">موظف</option><option value="engineer">مهندس</option><option value="monitor">مراقب</option><option value="operations-manager">مدير التشغيل</option><option value="project-manager">مدير المشاريع</option><option value="finance">المالية</option><option value="hr">شؤون الموظفين / HR</option></select></label><label data-new-account-employee-wrap>الموظف المرتبط بالحساب<select name="employeeId" required><option value="">اختر الموظف</option>${employeeOptions}</select></label><label data-new-account-site-wrap hidden>الموقع المسؤول عنه<select name="responsibleSite"><option value="">اختر الموقع</option>${siteOptions}</select></label><button class="primary-button" type="submit">إضافة الحساب</button></form><p class="profile-note">حسابات المعاينة تُحفظ محليًا في هذا المتصفح. إنشاء بيانات دخول فعلية وربطها بمستخدمين يحتاج تجهيز خدمة تسجيل الدخول.</p></section><section class="profile-panel"><div class="panel-title"><div><h3>الحسابات الحالية</h3><p>${arabicNumber.format(registeredAccounts.length)} حسابات مسجلة</p></div></div><div class="account-management-list">${accountRows || '<div class="profile-empty-state">لا توجد حسابات مسجلة. أضف حساب مهندس لتعيين موقع مسؤوليته.</div>'}</div></section>`;
}

function rentalPreparationApprovalStages(site, requesterId = sessionIdentifier()) {
  const engineerId = rentalSiteEngineerAssignments[site];
  const engineer = rentalEngineerAccounts().find((account) => accountIdentifier(account) === engineerId);
  if (!engineer) return { error: `عيّن مهندسًا مسؤولًا عن «${site}» من إعداد سلاسل الاعتماد أولًا.` };
  if (engineerId === requesterId) return { error: `أنت مهندس الموقع المسؤول عن «${site}»؛ لا يمكنك اعتماد التحضير الذي رفعته بنفسك.` };
  const engineerName = engineer.displayName || engineer.fullName || engineer.name || engineer.email || engineerId;
  const configured = (approvalChainConfigs['rental-preparation']?.stages || []).filter((stage) => !(stage.value === 'engineer' || (stage.mode === 'account' && stage.value === engineerId)));
  return { engineerId, engineerName, stages: [{ mode: 'account', value: engineerId, label: `مهندس الموقع — ${site}` }, ...structuredClone(configured)] };
}

const approvalRequestTypes = [
  { id: 'leave', name: 'الإجازات' },
  { id: 'attendance-correction', name: 'تصحيح البصمة' },
  { id: 'alternate-attendance', name: 'الحضور البديل' },
  { id: 'advance', name: 'السلف' },
  { id: 'other-request', name: 'طلبات أخرى' },
  { id: 'rental-direct-hire', name: 'مباشرات العمل للعمالة الإيجارية' },
  { id: 'overtime', name: 'الإضافيات' },
  { id: 'rental-preparation', name: 'تحضير العمالة الإيجارية' },
];
const defaultApprovalStage = () => [
  { mode: 'role', value: 'operations-manager' },
  { mode: 'role', value: 'project-manager' },
];
const defaultApprovalConfigs = Object.fromEntries(approvalRequestTypes.map((type) => [type.id, {
  submitters: ['employee', 'engineer'],
  stages: defaultApprovalStage(),
}]));
defaultApprovalConfigs['rental-preparation'] = {
  submitters: ['engineer', 'monitor'],
  stages: [{ mode: 'role', value: 'engineer' }, { mode: 'role', value: 'project-manager' }],
};
defaultApprovalConfigs['rental-direct-hire'] = {
  submitters: ['engineer'],
  stages: [{ mode: 'role', value: 'engineer' }, { mode: 'role', value: 'project-manager' }],
};
defaultApprovalConfigs['attendance-correction'] = { submitters: ['employee'], stages: [] };
defaultApprovalConfigs['alternate-attendance'] = { submitters: ['employee'], stages: [{ mode: 'role', value: 'engineer' }] };
defaultApprovalConfigs['advance'] = { submitters: ['employee'], stages: defaultApprovalStage() };
defaultApprovalConfigs['other-request'] = { submitters: ['employee'], stages: defaultApprovalStage() };
const approvalChainConfigs = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem('nagm-approval-chain-configs') || '{}') || {};
    return Object.fromEntries(approvalRequestTypes.map((type) => {
      const current = saved[type.id] || {};
      return [type.id, {
        submitters: Array.isArray(current.submitters) ? current.submitters : defaultApprovalConfigs[type.id].submitters,
        stages: Array.isArray(current.stages) ? current.stages : defaultApprovalConfigs[type.id].stages,
      }];
    }));
  } catch { return structuredClone(defaultApprovalConfigs); }
})();
let selectedApprovalType = 'leave';
let approvalChainDrafts = structuredClone(approvalChainConfigs);
let myApprovalsFilter = 'leave';
let changeDeletionRequests = [];
try {
  const savedRequests = JSON.parse(localStorage.getItem('nagm-change-deletion-requests') || '[]');
  if (Array.isArray(savedRequests)) changeDeletionRequests = savedRequests;
} catch { changeDeletionRequests = []; }
changeDeletionRequests.forEach((request) => {
  if (request.type === 'permanent-employee') {
    request.type = 'system-hidden-employee';
    request.details = `${request.details || ''} · سيُخفى الموظف مع الاحتفاظ بسجلاته.`;
  }
});

const deletionRequestTypes = {
  'profile-period-assignment': 'فترة في ملف موظف',
  'employee-period': 'تعريف فترة عمل',
  'employee-site': 'موقع بصمة',
  'system-hidden-employee': 'إخفاء موظف مع الاحتفاظ بسجلاته',
  'rental-account-entry': 'حذف حركة من كشف حساب عامل إيجاري',
  'daily-disbursement': 'حذف مبلغ منصرف يومي',
};

function saveChangeDeletionRequests() {
  localStorage.setItem('nagm-change-deletion-requests', JSON.stringify(changeDeletionRequests));
}

function requestDeletion(button) {
  const targetSpecs = [
    ['data-delete-profile-period-assignment', 'profile-period-assignment'],
    ['data-clear-profile-period', 'profile-period-assignment'],
    ['data-delete-employee-period', 'employee-period'],
    ['data-delete-employee-site', 'employee-site'],
    ['data-hide-employee-system', 'system-hidden-employee'],
    ['data-delete-rental-statement', 'rental-account-entry'],
    ['data-delete-daily-disbursement', 'daily-disbursement'],
  ];
  const spec = targetSpecs.find(([attribute]) => button.hasAttribute(attribute));
  if (!spec) return false;
  const [attribute, type] = spec;
  let employeeId = type === 'profile-period-assignment' ? selectedEmployee?.id || '' : type === 'rental-account-entry' ? selectedRentalWorker?.id || '' : '';
  const recordId = attribute === 'data-clear-profile-period'
    ? employeeId && employeeWorkPeriodHistory(employeeId).at(-1)?.assignmentId
    : button.getAttribute(attribute);
  let record;
  if (type === 'profile-period-assignment') {
    record = employeeId && employeeWorkPeriodHistory(employeeId).find((item) => item.assignmentId === recordId);
  } else if (type === 'employee-period') record = employeePeriodDefinitions.find((item) => item.id === recordId);
  else if (type === 'employee-site') record = { name: recordId };
  else if (type === 'system-hidden-employee') record = employeeRecords.find((item) => item.id === recordId && item.status === 'stopped' && !item.systemHidden);
  else if (type === 'rental-account-entry') record = rentalStatementEntries.find((item) => item.id === recordId && item.workerId === employeeId && item.status !== 'deleted');
  else if (type === 'daily-disbursement') record = dailyDisbursements.find((item) => item.id === recordId && item.status !== 'deleted');
  if (type === 'daily-disbursement' && record?.targetType === 'rental') employeeId = record.workerId;
  if (type === 'daily-disbursement' && record?.targetType === 'company') employeeId = record.employeeId;
  if (!record) { notify('تعذر العثور على السجل المطلوب حذفه. حدّث الصفحة وحاول مرة أخرى.'); return true; }
  const duplicate = changeDeletionRequests.some((item) => item.status === 'pending' && item.type === type && item.recordId === recordId && item.employeeId === employeeId);
  if (duplicate) { notify('يوجد بالفعل طلب حذف معلّق لهذا السجل.'); return true; }
  const displayName = record.periodName || record.name || record.label || record.description || record.id || recordId;
  const details = type === 'profile-period-assignment'
    ? `الموظف: ${selectedEmployee.name} · الفترة: ${displayName} · ${record.fromDate || '؟'} إلى ${record.toDate || '؟'}`
    : type === 'employee-period'
      ? `الفترة «${displayName}» · معيّنة على ${employeesAssignedToPeriod(recordId).length} موظفين`
        : type === 'employee-site'
        ? `الموقع «${recordId}» · مرتبط بموظفين: ${Object.values(employeeAllowedSites).filter((sites) => Array.isArray(sites) && sites.includes(recordId)).length}`
        : type === 'daily-disbursement'
          ? `الجهة: ${disbursementTargetLabel(record)} · البيان: ${record.description} · المبلغ: ${record.amount} ريال${record.linkedStatementEntryId ? ' · سيتم حذف حركة كشف الحساب المرتبطة معه بعد الموافقة.' : ''}`
        : type === 'rental-account-entry'
          ? `العامل: ${rentalRecords.find((item) => item.id === employeeId)?.name || employeeId} · البيان: ${record.description} · المبلغ: ${record.amount} ريال · سيبقى في الرصيد حتى الموافقة على طلب الحذف.`
        : `الموظف الموقوف: ${record.name} · الرقم ${record.id} · ستبقى سجلات الحضور والإجازات والعهد والمرفقات محفوظة، مع استبعاده من قوائم وتقارير الموظفين المعتادة.`;
  const session = window.NAGM_SESSION || {};
  changeDeletionRequests.unshift({
    id: `DELETE-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type, recordId, employeeId, recordLabel: displayName, details,
    requesterId: sessionIdentifier(), requesterName: session.displayName || session.fullName || session.name || session.account || 'الحساب الحالي',
    requestedAt: new Date().toISOString(), status: 'pending',
  });
  if (type === 'rental-account-entry') {
    const actor = rentalAuditActor();
    record.history ||= [];
    record.history.push({ action: 'delete-requested', ...actor, at: new Date().toISOString(), description: record.description, amount: record.amount });
    saveRentalStatementEntries();
    renderRentalProfileSection(selectedRentalWorker, 'statement');
  } else if (type === 'daily-disbursement') {
    record.history ||= [];
    record.history.push({ action: 'delete-requested', ...rentalAuditActor(), at: new Date().toISOString(), description: record.description, amount: record.amount });
    saveDailyDisbursements();
    renderDailyDisbursements();
  }
  saveChangeDeletionRequests();
  renderChangeRequests();
  const badge = document.querySelector('[data-change-requests-count]');
  if (badge) { badge.textContent = arabicNumber.format(changeDeletionRequests.filter((item) => item.status === 'pending').length); badge.hidden = false; }
  notify('تم إرسال طلب الحذف للمراجعة. يظل السجل موجودًا حتى موافقة مدير النظام.');
  return true;
}

document.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('[data-delete-profile-period-assignment], [data-clear-profile-period], [data-delete-employee-period], [data-delete-employee-site], [data-hide-employee-system], [data-delete-rental-statement], [data-delete-daily-disbursement]');
  if (!deleteButton || !requestDeletion(deleteButton)) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}, true);

document.addEventListener('change', (event) => {
  const select = event.target.closest('[data-account-responsible-site]');
  if (select) {
    if (!isSystemAdmin()) { notify('تعديل الحسابات متاح لمالك النظام أو مدير النظام فقط.'); renderAccounts(); return; }
    const account = registeredAccounts.find((item) => accountIdentifier(item) === select.dataset.accountResponsibleSite);
    if (!account) return;
    const site = select.value;
    const duplicate = site && registeredAccountHasEngineerRole(account) && rentalEngineerAccounts().some((item) => item !== account && item.responsibleSite === site);
    if (duplicate) { notify('هذا الموقع مرتبط بالفعل بمهندس مسؤول.'); renderAccounts(); return; }
    account.responsibleSite = site;
    localStorage.setItem('nagm-registered-accounts', JSON.stringify(registeredAccounts));
    syncRentalSiteEngineerAssignments();
    renderAccounts();
    notify(site ? `تم تعيين ${site} موقعًا مسؤولًا لهذا المهندس.` : 'تم إلغاء موقع مسؤولية المهندس.');
    return;
  }
  const role = event.target.closest('[data-new-account] select[name="role"]');
  if (role) {
    const wrap = document.querySelector('[data-new-account-site-wrap]');
    const siteField = document.querySelector('[data-new-account] select[name="responsibleSite"]');
    const employeeWrap = document.querySelector('[data-new-account-employee-wrap]');
    const employeeField = document.querySelector('[data-new-account] select[name="employeeId"]');
    const siteSupervisorRole = ['engineer','monitor'].includes(role.value);
    if (wrap) wrap.hidden = !siteSupervisorRole;
    if (siteField) siteField.required = siteSupervisorRole;
    if (employeeWrap) employeeWrap.hidden = role.value !== 'employee';
    if (employeeField) employeeField.required = role.value === 'employee';
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-new-account]');
  if (!form) return;
  event.preventDefault();
  if (!isSystemAdmin()) { notify('إضافة الحسابات متاحة لمالك النظام أو مدير النظام فقط.'); return; }
  const data = new FormData(form);
  const accountId = String(data.get('accountId') || '').trim();
  const role = String(data.get('role') || '').trim();
  const responsibleSite = String(data.get('responsibleSite') || '').trim();
  const employeeId = String(data.get('employeeId') || '').trim();
  if (registeredAccounts.some((item) => accountIdentifier(item).toLocaleLowerCase() === accountId.toLocaleLowerCase())) { notify('معرّف الدخول مستخدم لحساب آخر.'); return; }
  if (['engineer','monitor'].includes(role) && !responsibleSite) { notify('اختر الموقع المسؤول عنه المهندس أو مسؤول الموقع.'); return; }
  if (role === 'employee' && !employeeRecords.some((employee) => employee.id === employeeId && !employee.archived && !employee.systemHidden)) { notify('اربط حساب الموظف بملفه الوظيفي.'); return; }
  if (role === 'engineer' && rentalEngineerAccounts().some((item) => item.responsibleSite === responsibleSite)) { notify('هذا الموقع مرتبط بالفعل بمهندس مسؤول.'); return; }
  const roleNames = { employee: 'موظف', engineer: 'مهندس', monitor: 'مراقب', 'operations-manager': 'مدير التشغيل', 'project-manager': 'مدير المشاريع', finance: 'المالية', hr: 'شؤون الموظفين / HR' };
  const account = { id: accountId, username: accountId, displayName: String(data.get('displayName') || '').trim(), role, roleName: roleNames[role] || role, employeeId: role === 'employee' ? employeeId : '', responsibleSite: ['engineer','monitor'].includes(role) ? responsibleSite : '' };
  registeredAccounts.push(account);
  localStorage.setItem('nagm-registered-accounts', JSON.stringify(registeredAccounts));
  syncRentalSiteEngineerAssignments();
  renderAccounts();
  notify(role === 'engineer' ? `تمت إضافة حساب المهندس وربطه بمسؤولية موقع ${responsibleSite}.` : 'تمت إضافة الحساب.');
});

function renderChangeRequests() {
  const host = document.querySelector('[data-change-requests-content]');
  if (!host) return;
  const pending = changeDeletionRequests.filter((item) => item.status === 'pending');
  const completed = changeDeletionRequests.filter((item) => item.status !== 'pending');
  const badge = document.querySelector('[data-change-requests-count]');
  const total = document.querySelector('[data-change-requests-total]');
  if (badge) { badge.textContent = arabicNumber.format(pending.length); badge.hidden = pending.length === 0; }
  if (total) total.textContent = `${arabicNumber.format(pending.length)} طلبات معلقة`;
  const card = (request, isPending) => `<article class="management-employee-card change-request-card"><div class="management-employee-head"><div><strong>${escapeHtml(deletionRequestTypes[request.type] || 'طلب حذف')} · ${escapeHtml(request.recordLabel)}</strong><small>مقدم الطلب: ${escapeHtml(request.requesterName)} · ${new Date(request.requestedAt).toLocaleString('ar-SA')}</small></div><span class="request-status-pill ${isPending ? '' : 'request-status-complete'}">${isPending ? 'بانتظار موافقتك' : request.status === 'approved' ? (request.type === 'system-hidden-employee' ? 'تم الإخفاء مع حفظ البيانات' : 'تم الحذف بعد الموافقة') : 'مرفوض'}</span></div><p>${escapeHtml(request.details)}</p>${!isPending && request.reviewedBy ? `<small class="change-request-reviewer">بواسطة ${escapeHtml(request.reviewedBy)} · ${new Date(request.reviewedAt).toLocaleString('ar-SA')}</small>` : ''}${isPending ? `<div class="request-actions"><button class="primary-button" type="button" data-approve-deletion-request="${escapeHtml(request.id)}">${request.type === 'system-hidden-employee' ? 'موافقة على الإخفاء' : 'موافقة على الحذف'}</button><button class="danger-button" type="button" data-reject-deletion-request="${escapeHtml(request.id)}">رفض الطلب</button></div>` : ''}</article>`;
  host.innerHTML = `<section class="approval-category-section"><div class="panel-title"><div><h3>طلبات تنتظر موافقتك</h3><p>لن يُحذف السجل قبل موافقتك</p></div></div>${pending.length ? `<div class="approval-request-stack">${pending.map((request) => card(request, true)).join('')}</div>` : '<div class="profile-empty-state">لا توجد طلبات حذف معلقة.</div>'}</section><section class="approval-category-section"><div class="panel-title"><div><h3>سجل الطلبات</h3><p>الطلبات التي سبق اعتمادها أو رفضها</p></div></div>${completed.length ? `<div class="approval-request-stack">${completed.slice(0, 30).map((request) => card(request, false)).join('')}</div>` : '<div class="profile-empty-state">لا توجد طلبات سابقة.</div>'}</section>`;
}

async function applyApprovedDeletion(request) {
  if (request.type === 'profile-period-assignment') {
    const history = employeeWorkPeriodHistory(request.employeeId);
    if (!history.some((item) => item.assignmentId === request.recordId)) throw new Error('فترة الموظف غير موجودة أو حُذفت بالفعل.');
    saveEmployeeWorkPeriodHistory(request.employeeId, history.filter((item) => item.assignmentId !== request.recordId));
    if (selectedEmployee?.id === request.employeeId) await renderEmployeeProfile(selectedEmployee, 'period');
  } else if (request.type === 'employee-period') {
    if (!employeePeriodDefinitions.some((item) => item.id === request.recordId)) throw new Error('تعريف الفترة غير موجود أو حُذف بالفعل.');
    employeePeriodDefinitions = employeePeriodDefinitions.filter((item) => item.id !== request.recordId);
    localStorage.setItem('nagm-employee-period-definitions', JSON.stringify(employeePeriodDefinitions));
    if (editingEmployeePeriodId === request.recordId) editingEmployeePeriodId = null;
    renderEmployeePeriodManagement();
  } else if (request.type === 'employee-site') {
    if (!employeeSiteNames.includes(request.recordId)) throw new Error('الموقع غير موجود أو حُذف بالفعل.');
    employeeSiteNames = employeeSiteNames.filter((site) => site !== request.recordId);
    delete employeeSiteGeofences[request.recordId];
    Object.entries(employeeAllowedSites).forEach(([employeeId, sites]) => { employeeAllowedSites[employeeId] = sites.filter((site) => site !== request.recordId); });
    localStorage.setItem('nagm-employee-location-sites', JSON.stringify(employeeSiteNames));
    localStorage.setItem('nagm-employee-site-geofences', JSON.stringify(employeeSiteGeofences));
    localStorage.setItem('nagm-employee-allowed-sites', JSON.stringify(employeeAllowedSites));
    if (editingEmployeeSite === request.recordId) { editingEmployeeSite = null; selectedEmployeeSiteCoordinates = null; }
    renderEmployeeLocationManagement();
  } else if (request.type === 'system-hidden-employee') {
    const employee = employeeRecords.find((item) => item.id === request.recordId && item.status === 'stopped' && !item.systemHidden);
    if (!employee) throw new Error('الموظف غير موجود أو لم يعد موقوفًا.');
    employee.systemHidden = true;
    hiddenEmployeeIds.add(employee.id);
    saveHiddenEmployeeIds();
    renderEmployeeList(); renderEmployeeLeaveManagement(); renderDashboardSummary();
  } else if (request.type === 'rental-account-entry') {
    const entry = rentalStatementEntries.find((item) => item.id === request.recordId && item.workerId === request.employeeId && item.status !== 'deleted');
    if (!entry) throw new Error('حركة كشف الحساب غير موجودة أو حُذفت بالفعل.');
    const actor = { actorId: request.reviewedById || sessionIdentifier(), actorName: request.reviewedBy || 'مدير النظام' };
    entry.status = 'deleted'; entry.deletedAt = request.reviewedAt || new Date().toISOString(); entry.deletedBy = actor.actorId; entry.deletedByName = actor.actorName;
    entry.history ||= []; entry.history.push({ action: 'deleted', ...actor, at: entry.deletedAt, requestedById: request.requesterId, requestedByName: request.requesterName, description: entry.description, amount: entry.amount });
    saveRentalStatementEntries();
    if (entry.dailyDisbursementId) {
      const linked = dailyDisbursements.find((item) => item.id === entry.dailyDisbursementId && item.status !== 'deleted');
      if (linked) { linked.status = 'deleted'; linked.deletedAt = entry.deletedAt; linked.deletedBy = actor.actorId; linked.deletedByName = actor.actorName; linked.history ||= []; linked.history.push({ action: 'deleted', ...actor, at: entry.deletedAt, linkedStatementEntryId: entry.id }); saveDailyDisbursements(); }
    }
    if (selectedRentalWorker?.id === request.employeeId) renderRentalProfileSection(selectedRentalWorker, 'statement');
    renderDailyDisbursements();
  } else if (request.type === 'daily-disbursement') {
    const entry = dailyDisbursements.find((item) => item.id === request.recordId && item.status !== 'deleted');
    if (!entry) throw new Error('سجل المبلغ المنصرف غير موجود أو حُذف بالفعل.');
    const linked = entry.linkedStatementEntryId ? rentalStatementEntries.find((item) => item.id === entry.linkedStatementEntryId && item.workerId === entry.workerId && item.status !== 'deleted') : null;
    if (entry.linkedStatementEntryId && !linked) throw new Error('تعذر العثور على حركة كشف الحساب المرتبطة؛ لم يُحذف سجل الصرف.');
    const actor = { actorId: request.reviewedById || sessionIdentifier(), actorName: request.reviewedBy || 'مدير النظام' };
    const deletedAt = request.reviewedAt || new Date().toISOString();
    entry.status = 'deleted'; entry.deletedAt = deletedAt; entry.deletedBy = actor.actorId; entry.deletedByName = actor.actorName;
    entry.history ||= []; entry.history.push({ action: 'deleted', ...actor, at: deletedAt, requestedById: request.requesterId, requestedByName: request.requesterName, description: entry.description, amount: entry.amount });
    if (linked) {
      linked.status = 'deleted'; linked.deletedAt = deletedAt; linked.deletedBy = actor.actorId; linked.deletedByName = actor.actorName;
      linked.history ||= []; linked.history.push({ action: 'deleted', ...actor, at: deletedAt, requestedById: request.requesterId, requestedByName: request.requesterName, description: linked.description, amount: linked.amount, linkedDailyDisbursementId: entry.id });
      saveRentalStatementEntries();
      if (selectedRentalWorker?.id === entry.workerId) renderRentalProfileSection(selectedRentalWorker, 'statement');
    }
    saveDailyDisbursements();
    renderDailyDisbursements();
    if (entry.targetType === 'company' && selectedEmployee?.id === entry.employeeId && employeeProfile.dataset.profileSection === 'disbursements') renderEmployeeProfile(selectedEmployee, 'disbursements');
  } else throw new Error('نوع الحذف غير مدعوم بعد.');
}

const approverRoleLabels = {
  employee: 'الموظف', engineer: 'المهندس', monitor: 'المراقب', 'operations-manager': 'مدير التشغيل',
  'direct-manager': 'المدير المباشر', 'engineering-manager': 'الإدارة الهندسية', 'custody-finance': 'مسؤول العهد والمالية', 'finance-manager': 'المدير المالي',
  'project-manager': 'مدير المشاريع', hr: 'الموارد البشرية', 'system-admin': 'مدير النظام / المالك',
};

function accountIdentifier(account) {
  return String(account?.id || account?.email || account?.username || account?.account || account?.name || '');
}

function sessionIdentifier() {
  return String(window.NAGM_SESSION?.id || window.NAGM_SESSION?.account || window.NAGM_SESSION?.email || window.NAGM_SESSION?.username || 'owner');
}

function sessionRoleValues() {
  const role = String(window.NAGM_SESSION?.role || 'owner').trim().toLocaleLowerCase('ar');
  const values = new Set();
  if (role.includes('موظف') || role === 'employee') values.add('employee');
  if ((role.includes('مهندس') && !role.includes('مدير')) || ['engineer', 'site-engineer'].includes(role)) values.add('engineer');
  if (role.includes('موارد بشرية') || role === 'hr' || role.includes('human resources')) values.add('hr');
  if (role.includes('مدير مباشر') || role === 'direct-manager') values.add('direct-manager');
  if (role.includes('إدارة هندسية') || role.includes('مدير هندسي') || role === 'engineering-manager') values.add('engineering-manager');
  if (role.includes('عهد') || role.includes('مسؤول مالية') || role === 'custody-finance') values.add('custody-finance');
  if (role.includes('مدير مالي') || role === 'finance-manager') values.add('finance-manager');
  if ((role.includes('تشغيل') && role.includes('مدير')) || role === 'operations-manager' || role === 'operation-manager') values.add('operations-manager');
  if ((role.includes('مشروع') && role.includes('مدير')) || role === 'project-manager' || role === 'projects-manager') values.add('project-manager');
  if (role.includes('مراقب') || role === 'monitor') values.add('monitor');
  if ((role.includes('تشغيل') && role.includes('مدير')) || ['operations-manager', 'operation-manager'].includes(role)) values.add('operations-manager');
  if ((role.includes('مدير') && (role.includes('مشروع') || role.includes('مشاريع'))) || ['project-manager', 'projects-manager'].includes(role)) values.add('project-manager');
  if (isSystemAdmin()) values.add('system-admin');
  return values;
}

function canCreateRentalDirectHire() {
  if (isSystemAdmin()) return true;
  const config = approvalChainConfigs['rental-direct-hire'];
  return Boolean(config?.submitters?.some((role) => sessionRoleValues().has(role)));
}

function approverStageLabel(stage) {
  if (!stage) return 'غير محدد';
  if (Array.isArray(stage.parallelApprovers)) return stage.parallelApprovers.map(approverStageLabel).join(' + ');
  if (stage.mode === 'account') {
    if (stage.label) return stage.label;
    const account = registeredAccounts.find((item) => accountIdentifier(item) === stage.value);
    return account ? (account.displayName || account.fullName || account.name || account.email || stage.value) : stage.label || stage.value;
  }
  return approverRoleLabels[stage.value] || stage.value || 'صلاحية غير محددة';
}

function leaveApprovalStages(request) {
  if (Array.isArray(request.approvalStages)) return request.approvalStages;
  if (request.status === 'pending-project-manager') return [{ mode: 'role', value: 'project-manager' }];
  return [];
}

function leaveRequestCurrentStage(request) {
  if (request.status === 'pending-hr-review') return { mode: 'role', value: 'system-admin', label: 'مراجعة الموارد البشرية', final: false, intake: true, index: -1 };
  const stages = leaveApprovalStages(request);
  const index = Number.isInteger(request.stageIndex) ? request.stageIndex : 0;
  return index < stages.length ? { ...stages[index], final: false, index } : { mode: 'role', value: 'system-admin', final: true, index: stages.length };
}

function userCanApproveStage(stage) {
  if (!stage) return false;
  if (Array.isArray(stage.parallelApprovers)) return stage.parallelApprovers.some(userCanApproveStage);
  if (stage.mode === 'account') return stage.value === sessionIdentifier();
  if (stage.value === 'system-admin') return leaveFinanceManager();
  return sessionRoleValues().has(stage.value);
}

function leaveRequestStatusLabel(request) {
  if (request.status === 'approved') return 'معتمد';
  if (request.status === 'rejected') return 'مرفوض';
  if (request.status === 'needs-revision') return `مطلوب استكمال · ${request.revisionNote || ''}`;
  if (request.status === 'pending-hr-review') return 'طلب وارد · بانتظار توجيه الموارد البشرية';
  return `بانتظار ${approverStageLabel(leaveRequestCurrentStage(request))}`;
}
function leaveRequestWaitingLabel(request) {
  if (request.status === 'pending-hr-review') return 'مراجعة الموارد البشرية';
  if (request.status !== 'pending-approval') return '';
  const stage = leaveRequestCurrentStage(request);
  if (Array.isArray(stage.parallelApprovers)) {
    const approved = request.parallelApprovals?.[stage.index] || [];
    const waiting = stage.parallelApprovers.filter((target) => {
      const key = target.mode === 'account' ? `account:${target.value}` : `${target.mode}:${target.value}`;
      return !approved.includes(key);
    });
    return waiting.map(approverStageLabel).join(' + ') || approverStageLabel(stage);
  }
  return approverStageLabel(stage);
}
function leaveRequestOperationalStatus(request) {
  if (request.status !== 'approved') return { key: request.status || 'unknown', label: leaveRequestStatusLabel(request) };
  if (leaveProceduresAreClosed(request)) return { key: 'procedures-complete', label: 'اكتملت إجراءات الموظف ومستحقاته' };
  if (request.proceduresReopenedAt && request.proceduresCompletedAt) return { key: 'procedures-reopened', label: 'أعيد فتح إجراءات اكتملت سابقًا' };
  const today = saudiTodayISO();
  if (request.startDate && request.startDate > today) return { key: 'approved-not-started', label: 'إجازة معتمدة لم تبدأ' };
  const record = employeeLeaveRecords[request.employeeId];
  const leave = record?.requestId === request.id ? record : (record?.history || []).find((entry) => entry.requestId === request.id);
  if (leave && !leave.returnDate) {
    if (leave.endDate && leave.endDate < today) return { key: 'leave-ended-no-return', label: 'انتهت الإجازة ولم تُسجل العودة' };
    return { key: 'currently-on-leave', label: 'الموظف على إجازة' };
  }
  if (!leave && request.startDate && request.startDate <= today) return { key: 'leave-record-missing', label: 'معتمدة · سجل الإجازة غير موجود' };
  if (leave?.returnDate) return { key: 'returned-procedures-open', label: 'عاد الموظف · إجراءات الإجازة لم تكتمل' };
  const settlement = employeeLeaveSettlements.find((item) => item.leaveRequestId === request.id);
  if (!settlement) return { key: 'settlement-not-started', label: 'بانتظار التصفية المالية' };
  if (settlement.status !== 'paid') return { key: 'settlement-not-paid', label: 'التصفية معتمدة أو مسودة · بانتظار الصرف' };
  return { key: 'procedures-open', label: 'صُرفت التصفية · إجراءات الموظف لم تكتمل' };
}
function overtimeCurrentStage(item) {
  const stages = Array.isArray(item.approvalStages) ? item.approvalStages : [];
  const index = Number.isInteger(item.stageIndex) ? item.stageIndex : 0;
  return index < stages.length ? { ...stages[index], final: false, index } : { mode: 'role', value: 'system-admin', label: 'الاعتماد النهائي للموارد البشرية', final: true, index: stages.length };
}
function overtimeCanApprove(item) {
  if (isSystemAdmin()) return true;
  const stage = overtimeCurrentStage(item);
  return (item.allowRequesterApproval || item.requestedBy !== sessionIdentifier()) && userCanApproveStage(stage);
}

function requestApprovalStep(requestId, note = '') {
  const request = employeeLeaveRequests.find((item) => item.id === requestId && !['approved', 'rejected'].includes(item.status));
  if (!request) return 'الطلب غير موجود أو أُغلق.';
  const stage = leaveRequestCurrentStage(request);
  if (stage.intake) return 'وجّه الطلب وحدد سلسلة الاعتماد من مراجعة الموارد البشرية أولًا.';
  if (stage.final) return 'اكتب نوع الإجازة وسببها في اعتماد مدير النظام الأخير.';
  if (request.requestedBy === sessionIdentifier() || !userCanApproveStage(stage)) return 'هذا الطلب لا ينتظر اعتماد الصلاحية أو الحساب الحالي.';
  const targets = Array.isArray(stage.parallelApprovers) ? stage.parallelApprovers : [stage];
  request.approvalHistory ||= [];
  request.parallelApprovals ||= {};
  request.parallelApprovals[stage.index] ||= [];
  if (request.approvalHistory.some((item) => item.stageIndex === stage.index && item.account === sessionIdentifier() && item.action === 'approved')) return 'لا يمكن للحساب نفسه اعتماد أكثر من جهة في المرحلة المتوازية.';
  const matchedTarget = targets.find((target) => userCanApproveStage(target) && !request.parallelApprovals[stage.index].includes(target.mode === 'account' ? `account:${target.value}` : `${target.mode}:${target.value}`));
  const targetKey = matchedTarget?.mode === 'account' ? `account:${matchedTarget.value}` : `${matchedTarget?.mode}:${matchedTarget?.value}`;
  if (request.parallelApprovals[stage.index].includes(targetKey)) return 'سُجل اعتمادك لهذه المرحلة من قبل.';
  request.parallelApprovals[stage.index].push(targetKey);
  request.approvalHistory.push({ stage: approverStageLabel(matchedTarget || stage), stageIndex: stage.index, account: sessionIdentifier(), name: window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.name || sessionIdentifier(), action: 'approved', note: note.trim(), signatureFileId: leaveSignatureForAccount(sessionIdentifier()), at: new Date().toISOString() });
  const completed = targets.every((target) => request.parallelApprovals[stage.index].includes(target.mode === 'account' ? `account:${target.value}` : `${target.mode}:${target.value}`));
  if (completed) request.stageIndex = stage.index + 1;
  request.status = 'pending-approval';
  leaveAudit('leave-approval-stage', request.id, { stage: approverStageLabel(stage), completed, note: note.trim() });
  saveEmployeeLeaveRequests();
  renderEmployeeLeaveManagement();
  renderMyApprovals();
  return completed ? `اكتمل اعتماد ${approverStageLabel(stage)} وأُرسل الطلب إلى ${approverStageLabel(leaveRequestCurrentStage(request))}.` : `تم تسجيل اعتمادك. ما زالت المرحلة بانتظار بقية المسؤولين: ${approverStageLabel(stage)}.`;
}

function currentEmployeeForSession() {
  const session = window.NAGM_SESSION || {};
  const account = registeredAccounts.find((item) => accountIdentifier(item) === sessionIdentifier());
  const employeeId = String(session.employeeId || account?.employeeId || sessionIdentifier());
  return employeeRecords.find((item) => item.id === employeeId && !item.archived && !item.systemHidden && item.sponsor === 'الشركة') || null;
}

function correctionSitesForEmployee(employee) {
  return [...new Set([...(employeeAllowedSites[employee.id] || []), employee.site].filter((site) => employeeSiteNames.includes(site) || site === employee.site))];
}

function correctionApprovalStages(site, requesterId = sessionIdentifier()) {
  const engineerId = rentalSiteEngineerAssignments[site];
  const engineer = rentalEngineerAccounts().find((account) => accountIdentifier(account) === engineerId);
  if (!engineer) return { error: `لا يوجد مهندس مسؤول عن «${site}». عيّن مهندس الموقع أولًا.` };
  if (engineerId === requesterId) return { error: 'مهندس الموقع لا يمكنه اعتماد طلب تصحيح بصمته بنفسه.' };
  const configured = (approvalChainConfigs['attendance-correction']?.stages || []).filter((stage) => !(stage.value === 'engineer' || (stage.mode === 'account' && stage.value === engineerId)));
  return { engineerId, engineerName: engineer.displayName || engineer.fullName || engineer.name || engineerId, stages: [{ mode: 'account', value: engineerId, label: `مهندس الموقع — ${site}` }, ...structuredClone(configured) ] };
}

function alternateAttendanceApprovalStages(site, requesterId = sessionIdentifier()) {
  if (!alternateAttendanceSettings.approvalSequence) return { stages: [], requesterIsResponsibleEngineer: false, directToOwner: true };
  const engineerId = rentalSiteEngineerAssignments[site] || accountIdentifier(rentalEngineerAccounts().find((account) => account.responsibleSite === site));
  const engineer = rentalEngineerAccounts().find((account) => accountIdentifier(account) === engineerId);
  if (!engineer) return { error: `لا يوجد مهندس مسؤول عن «${site}». عيّن مهندس الموقع أولًا.` };
  const configured = (approvalChainConfigs['alternate-attendance']?.stages || []).filter((stage) => !(stage.value === 'engineer' || (stage.mode === 'account' && stage.value === engineerId)));
  if (engineerId === requesterId) return { stages: structuredClone(configured), requesterIsResponsibleEngineer: true };
  return { stages: [{ mode: 'account', value: engineerId, label: `مهندس الموقع — ${site}` }, ...structuredClone(configured)] };
}

function alternateAttendanceCurrentStage(request) {
  const stages = Array.isArray(request.approvalStages) ? request.approvalStages : [];
  const index = Number.isInteger(request.stageIndex) ? request.stageIndex : 0;
  return index < stages.length ? { ...stages[index], final: false, index } : { mode: 'role', value: 'system-admin', final: true, index: stages.length };
}

function alternateAttendanceCanApprove(request) {
  if (!request || request.status !== 'pending-approval') return false;
  if (isSystemAdmin()) return true;
  return request.requestedBy !== sessionIdentifier() && userCanApproveStage(alternateAttendanceCurrentStage(request));
}

function alternateAttendanceStatus(request) {
  if (request.status === 'approved') return 'معتمد ومسجل بالحضور';
  if (request.status === 'rejected') return 'مرفوض';
  const stage = alternateAttendanceCurrentStage(request);
  return stage.final ? 'بانتظار مدير النظام' : `متوقف عند ${approverStageLabel(stage)}`;
}

function renderAlternateAttendance() {
  const host = document.querySelector('[data-alternate-attendance-content]');
  if (!host) return;
  const currentEmployee = currentEmployeeForSession();
  const canOwnerSimulate = isSystemAdmin();
  const canSubmitAsHelper = sessionRoleValues().has('engineer') || sessionRoleValues().has('monitor');
  const employeeChoices = employeeRecords.filter((employee) => canOwnerSimulate
    ? employee.sponsor === 'الشركة' && employee.status === 'active' && !employee.archived && !employee.systemHidden
    : canAppearInAssistedAttendance(employee));
  const canSubmit = Boolean(canOwnerSimulate || canSubmitAsHelper || (currentEmployee && canAppearInAssistedAttendance(currentEmployee)));
  const employeeOptions = employeeChoices.map((employee) => `<option value="${escapeHtml(employee.id)}">${escapeHtml(employee.name)} · ${escapeHtml(employee.id)}</option>`).join('');
  const chosenEmployee = currentEmployee || employeeChoices[0];
  const defaultSites = chosenEmployee ? correctionSitesForEmployee(chosenEmployee) : [];
  const eligibilitySetup = canOwnerSimulate ? `<section class="profile-panel alternate-settings-panel"><div class="panel-title"><div><h3>إعداد الحضور البديل</h3><p>أنت تتحكم في طلب الصورة ومسار اعتماد كل طلب جديد.</p></div><span class="private-data-tag">إدارة النظام</span></div><form class="alternate-attendance-settings-form" data-alternate-attendance-settings-form><div class="alternate-settings-grid"><label class="alternate-setting-card ${alternateAttendanceSettings.requirePhoto ? 'is-enabled' : ''}"><input type="checkbox" name="requirePhoto" ${alternateAttendanceSettings.requirePhoto ? 'checked' : ''}><span class="alternate-setting-switch" aria-hidden="true"></span><span class="alternate-setting-copy"><span class="alternate-setting-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="14" rx="3"></rect><circle cx="12" cy="13" r="3"></circle><path d="M8 6l1.5-2h5L16 6"></path></svg></span><span><strong>إلزام الموظف بصورة إثبات</strong><small>الصورة مطلوبة ويجب أن تظهر الموظف وموقع العمل.</small></span></span><span class="alternate-setting-state">${alternateAttendanceSettings.requirePhoto ? 'مفعّل' : 'متوقف'}</span></label><label class="alternate-setting-card ${alternateAttendanceSettings.approvalSequence ? 'is-enabled' : ''}"><input type="checkbox" name="approvalSequence" ${alternateAttendanceSettings.approvalSequence ? 'checked' : ''}><span class="alternate-setting-switch" aria-hidden="true"></span><span class="alternate-setting-copy"><span class="alternate-setting-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="6" cy="5" r="2"></circle><circle cx="18" cy="12" r="2"></circle><circle cx="6" cy="19" r="2"></circle><path d="M8 5h4a4 4 0 0 1 4 4v1M8 19h4a4 4 0 0 0 4-4v-1"></path></svg></span><span><strong>تفعيل تسلسل الاعتماد</strong><small>${alternateAttendanceSettings.approvalSequence ? 'مهندس الموقع المختار يراجع أولًا، ثم يصل الطلب إليك.' : 'الطلب يصل إليك مباشرةً دون انتظار مهندس الموقع.'}</small></span></span><span class="alternate-setting-state">${alternateAttendanceSettings.approvalSequence ? 'مهندس ثم المالك' : 'مباشر للمالك'}</span></label></div><div class="alternate-settings-footer"><p>التغيير يسري على الطلبات الجديدة فقط؛ الطلبات المرسلة تحتفظ بمسارها.</p><button class="primary-button" type="submit">حفظ الإعدادات</button></div></form></section><section class="profile-panel face-eligibility-panel"><div class="panel-title"><div><h3>الموظفون المسموح بظهورهم على الأجهزة المساعدة</h3><p>لا يظهر للموظف أو المراقب إلا الموظف النشط الذي تفعّله هنا. الموقوفون، المجازون، المؤرشفون والمخفيون مستبعدون تلقائيًا.</p></div><span class="private-data-tag">إدارة النظام</span></div><form data-face-eligibility-form><div class="face-eligibility-list">${employeeRecords.filter((employee) => employee.sponsor === 'الشركة' && !employee.archived && !employee.systemHidden).map((employee) => `<label class="face-eligibility-row ${employee.status !== 'active' ? 'is-ineligible' : ''}"><input type="checkbox" name="enabledEmployee" value="${escapeHtml(employee.id)}" ${faceAttendanceEnabled.has(employee.id) && employee.status === 'active' ? 'checked' : ''} ${employee.status !== 'active' ? 'disabled' : ''}><span><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.id)} · ${employee.status === 'active' ? 'نشط' : employee.status === 'leave' ? 'إجازة' : 'موقوف'} · ${escapeHtml(employee.site)}</small></span></label>`).join('')}</div><button class="primary-button" type="submit">حفظ قائمة الظهور</button></form><p class="profile-note">هذا الإعداد يحدد أهلية الظهور فقط. مطابقة الوجه الحقيقية تحتاج تسجيلًا وتحققًا آمنًا في الباك إند.</p></section>` : '';
  const pending = alternateAttendanceRequests.filter((request) => request.status === 'pending-approval');
  const visibleRequests = alternateAttendanceRequests.filter((request) => {
    if (isSystemAdmin()) return true;
    if (currentEmployee && request.employeeId === currentEmployee.id) return true;
    return request.status === 'pending-approval' && alternateAttendanceCanApprove(request);
  }).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const requestRows = visibleRequests.map((request) => {
    const employee = employeeRecords.find((item) => item.id === request.employeeId);
    const stage = alternateAttendanceCurrentStage(request);
    const history = (request.history || []).map((item) => `${item.name || item.stage} · ${item.action === 'approved' ? 'اعتمد' : ['skipped-by-owner', 'skipped-by-requester'].includes(item.action) ? 'تخطى' : 'رفض'} · ${item.stage}`).join(' ← ');
    let action = '';
    if (request.status === 'pending-approval' && alternateAttendanceCanApprove(request)) {
      action = isSystemAdmin()
        ? `<div class="request-actions"><button class="primary-button" type="button" data-approve-alternate-attendance="${escapeHtml(request.id)}">${stage.final ? 'اعتماد وتسجيل الحضور' : 'اعتماد وتخطي المراحل'}</button><button class="danger-button" type="button" data-reject-alternate-attendance="${escapeHtml(request.id)}">رفض</button></div>`
        : `<div class="request-actions"><button class="primary-button" type="button" data-approve-alternate-attendance="${escapeHtml(request.id)}">اعتماد المرحلة وإحالة الطلب</button><button class="danger-button" type="button" data-reject-alternate-attendance="${escapeHtml(request.id)}">رفض</button></div>`;
    }
    return `<article class="management-employee-card leave-request-card"><div class="management-employee-head"><div><strong>${escapeHtml(employee?.name || request.employeeId)}</strong><small>${escapeHtml(request.date)} · ${escapeHtml(request.time)} · ${escapeHtml(request.site)} · الجهاز: ${escapeHtml(request.deviceLabel || 'غير مسجل')} · مع ${escapeHtml(request.deviceOwnerName)}</small></div><span class="request-status-pill">${escapeHtml(alternateAttendanceStatus(request))}</span></div><p>${escapeHtml(request.reason || 'تعذر استخدام هاتف الموظف؛ طلب حضور من جهاز مرافق.')}</p><p class="alternate-demo-badge">حضور بديل · ${request.approvalSequenceEnabled === false ? 'مباشرةً إلى مدير النظام' : 'مهندس الموقع ثم مدير النظام'}.</p>${request.photoFileId ? `<button class="secondary-button" type="button" data-open-alternate-photo="${escapeHtml(request.id)}">عرض صورة إثبات الحضور</button>` : '<p class="profile-note">لم تُرفق صورة لهذا الطلب.</p>'}${history ? `<p class="approval-trace">${escapeHtml(history)}</p>` : ''}${action}</article>`;
  }).join('');
  const photoField = alternateAttendanceSettings.requirePhoto ? `<label class="alternate-attendance-photo"><span class="alternate-photo-label">صورة إثبات الحضور</span><span class="alternate-photo-row"><input type="file" name="proofPhoto" data-alternate-photo-input accept="image/*" capture="environment" required><span class="alternate-photo-preview" data-alternate-photo-preview><span>معاينة الصورة</span></span></span><small>صورة واضحة تظهر الموظف وموقع العمل معًا · حتى 10 ميجابايت.</small></label>` : '';
  const formUi = canSubmit && employeeChoices.length ? `<form class="alternate-attendance-form" data-alternate-attendance-form><label>الموظف${currentEmployee ? `<input value="${escapeHtml(currentEmployee.name)} · ${escapeHtml(currentEmployee.id)}" readonly><input type="hidden" name="employeeId" value="${escapeHtml(currentEmployee.id)}">` : `<select name="employeeId" data-alternate-employee required>${employeeOptions}</select>`}</label><label>موقع العمل<select name="site" data-alternate-site required>${defaultSites.map((site) => `<option value="${escapeHtml(site)}">${escapeHtml(site)}</option>`).join('')}</select></label><label>تاريخ الحضور<input type="date" name="date" value="${saudiTodayISO()}" max="${saudiTodayISO()}" required></label><label>وقت الحضور<input type="time" name="time" value="${new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date())}" required></label><label>صاحب الجهاز المستخدم<input name="deviceOwnerName" maxlength="100" placeholder="اسم الزميل أو المراقب أو المهندس" required></label><label>صفته<select name="deviceOwnerRole"><option>زميل في العمل</option><option>مراقب</option><option>مهندس الموقع</option></select></label><label class="alternate-attendance-reason">سبب عدم استخدام الكاميرا<textarea name="reason" rows="2" maxlength="300" placeholder="مثال: تعطل الهاتف أو تعذر التحقق بالكاميرا"></textarea></label>${photoField}<button class="primary-button" type="submit">إرسال الحضور البديل للاعتماد</button></form>` : '<div class="duplicate-block"><strong>لا توجد أسماء مؤهلة للظهور في قائمة هذا الحساب.</strong><p>تظهر للموظف أو المراقب الأسماء النشطة التي أتاحها مدير النظام فقط. الحساب الموظف يرفع طلبًا لنفسه.</p></div>';
  host.innerHTML = `${eligibilitySetup}<section class="profile-panel"><div class="panel-title"><div><h3>الحضور بالكاميرا</h3><p>عند نجاح مطابقة الوجه يسجل الحضور مباشرةً بلا موافقات.</p></div><span class="request-status-pill">بانتظار ربط الباك إند</span></div><div class="alternate-demo-notice"><strong>المعاينة الحالية لا تنفذ مطابقة وجه</strong><span>لن نسجل حضورًا بمجرد فتح الكاميرا أو التقاط صورة. عند تجهيز الباك إند سنربط تحقق الهوية وتسجيل الحضور الفوري، مع منع التكرار وتسجيل الجهاز.</span></div></section><section class="profile-panel"><div class="panel-title"><div><h3>حضور بديل بدون كاميرا</h3><p>${alternateAttendanceSettings.approvalSequence ? 'يذهب الطلب إلى مهندس الموقع ثم إليك للاعتماد النهائي.' : 'عند إيقافه يصل الطلب إليك مباشرةً دون انتظار مهندس الموقع.'}</p></div><span class="panel-chip">${arabicNumber.format(pending.length)} بانتظار المراجعة</span></div><p class="profile-note">لا تظهر للمساعدين إلا أسماء الموظفين النشطين الذين أتاحهم مدير النظام. يظل الإيقاف والإجازة مخفيين تلقائيًا.</p><p class="profile-note">قبل الاستخدام، اربط حساب مهندس بالموقع من «الحسابات والصلاحيات».</p>${formUi}</section><section class="profile-panel"><div class="panel-title"><div><h3>طلبات الحضور البديل</h3><p>حساب الموظف يرى طلباته، ومهندس الموقع يرى الطلبات المسندة إليه، والمالك يراجع الجميع.</p></div></div><div class="approval-request-stack">${requestRows || '<div class="profile-empty-state">لا توجد طلبات حضور بديل ظاهرة للحساب الحالي.</div>'}</div></section>`;
  const employeeSelect = host.querySelector('[data-alternate-employee]');
  if (employeeSelect) employeeSelect.addEventListener('change', () => {
    const employee = employeeRecords.find((item) => item.id === employeeSelect.value);
    const siteSelect = host.querySelector('[data-alternate-site]');
    const sites = employee ? correctionSitesForEmployee(employee) : [];
    siteSelect.innerHTML = sites.map((site) => `<option value="${escapeHtml(site)}">${escapeHtml(site)}</option>`).join('');
  });
  const proofInput = host.querySelector('[data-alternate-photo-input]');
  const proofPreview = host.querySelector('[data-alternate-photo-preview]');
  let previewUrl = '';
  proofInput?.addEventListener('change', () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = '';
    proofPreview.replaceChildren();
    const file = proofInput.files?.[0];
    if (!file) { proofPreview.innerHTML = '<span>معاينة الصورة</span>'; return; }
    if (!file.type.startsWith('image/')) { proofPreview.innerHTML = '<span>اختر صورة</span>'; return; }
    previewUrl = URL.createObjectURL(file);
    const image = document.createElement('img');
    image.src = previewUrl;
    image.alt = 'معاينة صورة إثبات الحضور';
    proofPreview.append(image);
  });
}

function decideAlternateAttendance(requestId, decision) {
  const request = alternateAttendanceRequests.find((item) => item.id === requestId && item.status === 'pending-approval');
  if (!alternateAttendanceCanApprove(request)) return 'الطلب لا ينتظر إجراءً من الحساب الحالي.';
  const stage = alternateAttendanceCurrentStage(request);
  const actor = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.fullName || window.NAGM_SESSION?.name || sessionIdentifier();
  request.history ||= [];
  if (decision === 'reject') {
    request.history.push({ stage: isSystemAdmin() ? `مدير النظام · ${approverStageLabel(stage)}` : approverStageLabel(stage), account: sessionIdentifier(), name: actor, action: 'rejected', at: new Date().toISOString() });
    request.status = 'rejected'; request.rejectedAt = new Date().toISOString(); request.rejectedBy = actor;
  } else if (isSystemAdmin()) {
    if (!stage.final) request.approvalStages.slice(stage.index).forEach((item) => request.history.push({ stage: approverStageLabel(item), account: sessionIdentifier(), name: actor, action: 'skipped-by-owner', at: new Date().toISOString() }));
    const employee = employeeRecords.find((item) => item.id === request.employeeId && !item.archived && !item.systemHidden);
    const period = employee && employeeWorkPeriodForDate(employee.id, request.date);
    if (!employee || !period) return 'تعذر الاعتماد: الموظف أو فترة العمل غير متاحة في التاريخ المحدد.';
    if (getCompanyAttendanceRecords().some((record) => record.employeeId === employee.id && record.date === request.date)) return 'تعذر الاعتماد: توجد حركة حضور لهذا الموظف في التاريخ المحدد.';
    request.history.push({ stage: 'مدير النظام / المالك', account: sessionIdentifier(), name: actor, action: 'approved', at: new Date().toISOString() });
    const startTime = request.time || periodStartTime(period);
    const endTime = periodEndTime(period);
    manualCompanyAttendanceRecords.push({ id: `ALT-ATT-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, employeeId: employee.id, date: request.date, time: `${startTime}:00`, timestamp: new Date(`${request.date}T${startTime}:00+03:00`).toISOString(), site: request.site, department: employee.department, source: 'alternate-device-approved', attendanceType: 'alternate-device', attendanceMethod: 'alternate-device', verificationMode: 'manual-approval', deviceOwnerName: request.deviceOwnerName, deviceOwnerRole: request.deviceOwnerRole, deviceLabel: request.deviceLabel || attendanceDeviceLabel(), requesterId: request.requesterId, alternateRequestId: request.id, alternatePhotoFileId: request.photoFileId || '', periodSnapshot: { ...period, periodId: period.periodId || period.id || '', periodName: period.periodName || period.name || 'فترة العمل' }, departureTime: `${endTime}:00` });
    localStorage.setItem('nagm-company-manual-attendance', JSON.stringify(manualCompanyAttendanceRecords));
    request.status = 'approved'; request.approvedAt = new Date().toISOString(); request.approvedBy = actor;
  } else {
    if (stage.final || !userCanApproveStage(stage)) return 'لا يمكن للحساب الحالي اعتماد المرحلة النهائية.';
    request.history.push({ stage: approverStageLabel(stage), account: sessionIdentifier(), name: actor, action: 'approved', at: new Date().toISOString() });
    request.stageIndex = stage.index + 1;
  }
  saveAlternateAttendanceRequests();
  renderAlternateAttendance(); renderMyApprovals(); renderMyRequests(); renderAttendanceManagement();
  const employee = employeeRecords.find((item) => item.id === request.employeeId);
  if (request.status === 'approved' && selectedEmployee?.id === employee?.id) renderEmployeeProfile(employee, 'alternate-attendance');
  return decision === 'reject' ? 'تم رفض طلب الحضور البديل وحفظه في سجل الطلب.' : request.status === 'approved' ? `تم اعتماد الطلب وإضافة حضور بديل لـ${employee?.name} إلى سجل البصمات.` : `اعتمدت المرحلة وأُرسل الطلب إلى ${approverStageLabel(alternateAttendanceCurrentStage(request))}.`;
}

document.addEventListener('submit', async (event) => {
  const settingsForm = event.target.closest('[data-alternate-attendance-settings-form]');
  if (settingsForm) {
    if (!isSystemAdmin()) { notify('تعديل إعدادات الحضور البديل متاح لمالك النظام أو مدير النظام فقط.'); return; }
    event.preventDefault();
    const settingsData = new FormData(settingsForm);
    alternateAttendanceSettings.requirePhoto = settingsData.get('requirePhoto') === 'on';
    alternateAttendanceSettings.approvalSequence = settingsData.get('approvalSequence') === 'on';
    saveAlternateAttendanceSettings();
    renderAlternateAttendance();
    notify('تم حفظ إعدادات الصورة وتسلسل اعتماد الحضور البديل.');
    return;
  }
  const eligibilityForm = event.target.closest('[data-face-eligibility-form]');
  if (eligibilityForm) {
    event.preventDefault();
    if (!isSystemAdmin()) { notify('إعداد ظهور الموظفين متاح لمدير النظام فقط.'); return; }
    faceAttendanceEnabled.clear();
    eligibilityForm.querySelectorAll('input[name="enabledEmployee"]:checked').forEach((input) => {
      const employee = employeeRecords.find((item) => item.id === input.value);
      if (employee?.status === 'active' && !employee.archived && !employee.systemHidden && employee.sponsor === 'الشركة') faceAttendanceEnabled.add(employee.id);
    });
    saveFaceAttendanceEnabled();
    renderAlternateAttendance();
    notify(`تم تحديث قائمة الظهور؛ ${arabicNumber.format(faceAttendanceEnabled.size)} موظف نشط مسموح به.`);
    return;
  }
  const form = event.target.closest('[data-alternate-attendance-form]');
  if (!form) return;
  event.preventDefault();
  const data = new FormData(form);
  const proofPhoto = data.get('proofPhoto');
  const signedInEmployee = currentEmployeeForSession();
  if (!signedInEmployee && !isSystemAdmin() && !sessionRoleValues().has('engineer') && !sessionRoleValues().has('monitor')) { notify('رفع طلب الحضور البديل متاح للموظف أو المراقب أو المهندس.'); return; }
  const employeeId = signedInEmployee?.id || String(data.get('employeeId') || '');
  const employee = employeeRecords.find((item) => item.id === employeeId && item.sponsor === 'الشركة' && !item.archived && !item.systemHidden && item.status === 'active');
  const site = String(data.get('site') || '').trim();
  const date = String(data.get('date') || '');
  const time = String(data.get('time') || '');
  const deviceOwnerName = String(data.get('deviceOwnerName') || '').trim();
  const deviceOwnerRole = String(data.get('deviceOwnerRole') || 'زميل في العمل');
  const reason = String(data.get('reason') || '').trim();
  if (alternateAttendanceSettings.requirePhoto && (!(proofPhoto instanceof File) || !proofPhoto.size || !proofPhoto.type.startsWith('image/') || proofPhoto.size > 10 * 1024 * 1024)) { notify('ارفع صورة واضحة بصيغة صورة تظهر الموظف وموقع العمل، وبحجم لا يتجاوز 10 ميجابايت.'); return; }
  if (proofPhoto instanceof File && proofPhoto.size && (!proofPhoto.type.startsWith('image/') || proofPhoto.size > 10 * 1024 * 1024)) { notify('يجب أن تكون صورة الإثبات صورة فعلية وألا يتجاوز حجمها 10 ميجابايت.'); return; }
  if (!employee || (!isSystemAdmin() && !canAppearInAssistedAttendance(employee)) || (signedInEmployee && signedInEmployee.id !== employee.id) || !date || !time || !deviceOwnerName || !correctionSitesForEmployee(employee).includes(site)) { notify('اختر موظفًا نشطًا أتاحه مدير النظام، وأكمل الموقع والتاريخ والوقت وبيانات الجهاز.'); return; }
  if (date > saudiTodayISO()) { notify('لا يمكن تسجيل حضور بديل بتاريخ مستقبلي.'); return; }
  if (getCompanyAttendanceRecords().some((record) => record.employeeId === employee.id && record.date === date) || alternateAttendanceRequests.some((request) => request.employeeId === employee.id && request.date === date && request.status === 'pending-approval')) { notify('يوجد حضور أو طلب حضور بديل لهذا الموظف في التاريخ نفسه.'); return; }
  const requesterId = sessionIdentifier();
  const routing = alternateAttendanceApprovalStages(site, requesterId);
  if (routing.error) { notify(routing.error); return; }
  const session = window.NAGM_SESSION || {};
  const history = routing.requesterIsResponsibleEngineer ? [{ stage: `مهندس الموقع — ${site}`, account: requesterId, name: session.displayName || session.name || requesterId, action: 'skipped-by-requester', at: new Date().toISOString(), note: 'المهندس هو صاحب الجهاز/مقدم الطلب، فأُحيل الطلب للمرحلة التالية لمنع اعتماد الشخص لطلبه.' }] : [];
  const requestId = `ALT-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const photoFileId = proofPhoto instanceof File && proofPhoto.size ? `${requestId}-photo` : '';
  if (photoFileId) try {
    await putEmployeeFile({ id: photoFileId, employeeId: employee.id, kind: 'alternate-attendance-photo', requestId, fileName: proofPhoto.name, mimeType: proofPhoto.type, blob: proofPhoto, createdAt: new Date().toISOString(), uploadedBy: requesterId });
  } catch (error) { notify(error.message || 'تعذر حفظ صورة إثبات الحضور. لم يُرسل الطلب.'); return; }
  alternateAttendanceRequests.unshift({ id: requestId, employeeId: employee.id, site, date, time, deviceOwnerName, deviceOwnerRole, deviceLabel: attendanceDeviceLabel(), reason, photoFileId, photoRequired: alternateAttendanceSettings.requirePhoto, approvalSequenceEnabled: alternateAttendanceSettings.approvalSequence, attendanceMethod: 'alternate-device', requesterId, requestedBy: requesterId, requesterName: session.displayName || session.fullName || session.name || session.account || employee.name, approvalStages: routing.stages, stageIndex: 0, history, status: 'pending-approval', verificationMode: 'manual-approval', createdAt: new Date().toISOString() });
  saveAlternateAttendanceRequests();
  renderAlternateAttendance(); renderMyApprovals(); renderMyRequests();
  notify(`تم إرسال طلب الحضور البديل لـ${employee.name} إلى مهندس موقع ${site}.`);
});

function correctionRequestStages(request) {
  if (Array.isArray(request?.approvalStages)) return request.approvalStages;
  return request?.engineerId ? [{ mode: 'account', value: request.engineerId, label: `مهندس الموقع — ${request.site}` }] : [];
}

function correctionRequestCurrentStage(request) {
  const stages = correctionRequestStages(request);
  const index = Number.isInteger(request?.stageIndex) ? request.stageIndex : request?.stage === 'owner' ? stages.length : 0;
  return index < stages.length ? { ...stages[index], final: false, index } : { mode: 'role', value: 'system-admin', final: true, index: stages.length };
}

function correctionRequestCanApprove(request) {
  if (!request || request.status !== 'pending-approval') return false;
  if (isSystemAdmin()) return true;
  return request.requestedBy !== sessionIdentifier() && userCanApproveStage(correctionRequestCurrentStage(request));
}

function employeeGeneralCurrentStage(request) {
  const stages = Array.isArray(request?.approvalStages) ? request.approvalStages : [];
  const index = Number.isInteger(request?.stageIndex) ? request.stageIndex : 0;
  return index < stages.length ? { ...stages[index], final: false, index } : { mode: 'role', value: 'system-admin', final: true, index: stages.length };
}

function employeeGeneralRequestCanApprove(request) {
  if (!request || request.status !== 'pending-approval') return false;
  if (isSystemAdmin()) return true;
  return request.requestedBy !== sessionIdentifier() && userCanApproveStage(employeeGeneralCurrentStage(request));
}

function decideEmployeeGeneralRequest(requestId, decision) {
  const request = employeeGeneralRequests.find((item) => item.id === requestId && item.status === 'pending-approval');
  if (!employeeGeneralRequestCanApprove(request)) return 'الطلب لا ينتظر إجراءً من الحساب الحالي.';
  const stage = employeeGeneralCurrentStage(request);
  const name = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.fullName || window.NAGM_SESSION?.name || sessionIdentifier();
  request.approvalHistory ||= [];
  if (decision === 'approve' && isSystemAdmin()) {
    if (!stage.final) request.approvalStages.slice(stage.index).forEach((item) => request.approvalHistory.push({ stage: approverStageLabel(item), account: sessionIdentifier(), name, action: 'skipped-by-owner', at: new Date().toISOString() }));
    request.approvalHistory.push({ stage: 'مدير النظام / المالك', account: sessionIdentifier(), name, action: 'approved', at: new Date().toISOString() });
    request.status = 'approved'; request.approvedBy = name; request.approvedAt = new Date().toISOString();
  } else if (decision === 'approve') {
    if (stage.final || !userCanApproveStage(stage)) return 'لا يمكن للحساب الحالي تخطي الاعتماد النهائي.';
    request.approvalHistory.push({ stage: approverStageLabel(stage), account: sessionIdentifier(), name, action: 'approved', at: new Date().toISOString() });
    request.stageIndex = stage.index + 1;
  } else {
    request.approvalHistory.push({ stage: isSystemAdmin() ? `مدير النظام · ${approverStageLabel(stage)}` : approverStageLabel(stage), account: sessionIdentifier(), name, action: 'rejected', at: new Date().toISOString() });
    request.status = 'rejected'; request.rejectedBy = name; request.rejectedAt = new Date().toISOString();
  }
  saveEmployeeGeneralRequests(); renderMyApprovals(); renderMyRequests();
  if (decision === 'reject') return 'تم رفض الطلب وحفظه في سجل الطلبات.';
  return isSystemAdmin() ? 'تم اعتماد الطلب وتخطي المراحل المتبقية.' : request.stageIndex >= request.approvalStages.length ? 'اكتملت مراحل الطلب وأُرسل لمدير النظام.' : `تم اعتماد المرحلة وإرسال الطلب إلى ${approverStageLabel(employeeGeneralCurrentStage(request))}.`;
}

function approveCorrectionRequest(requestId) {
  const request = attendanceCorrectionRequests.find((item) => item.id === requestId && item.status === 'pending-approval');
  if (!correctionRequestCanApprove(request)) return 'الطلب لا ينتظر اعتماد الحساب الحالي.';
  const actor = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.fullName || window.NAGM_SESSION?.name || sessionIdentifier();
  request.history ||= [];
  const stage = correctionRequestCurrentStage(request);
  if (isSystemAdmin() && !stage.final) correctionRequestStages(request).slice(stage.index).forEach((item) => request.history.push({ name: actor, account: sessionIdentifier(), action: 'skipped-by-owner', stage: approverStageLabel(item), at: new Date().toISOString() }));
  if (!isSystemAdmin() && !stage.final) {
    request.history.push({ name: actor, account: sessionIdentifier(), action: 'approved', stage: approverStageLabel(stage), at: new Date().toISOString() });
    request.stageIndex = stage.index + 1;
    request.stage = request.stageIndex < correctionRequestStages(request).length ? 'approval' : 'owner';
    saveAttendanceCorrectionRequests(); renderMyApprovals(); renderMyRequests();
    return request.stage === 'owner' ? 'اكتملت مراحل الاعتماد؛ أُرسل الطلب إلى مدير النظام.' : `اعتمد الطلب وأُرسل إلى ${approverStageLabel(correctionRequestCurrentStage(request))}.`;
  }
  const employee = employeeRecords.find((item) => item.id === request.employeeId && !item.archived && !item.systemHidden);
  const period = employee && employeeWorkPeriodForDate(employee.id, request.date);
  if (!employee || !period) return 'تعذر الاعتماد: الموظف أو فترة العمل غير متاحة في التاريخ المحدد.';
  if (getCompanyAttendanceRecords().some((record) => record.employeeId === employee.id && record.date === request.date)) return 'تعذر الاعتماد: توجد بصمة أو حركة حضور مسجلة لهذا الموظف في التاريخ.';
  const startTime = periodStartTime(period);
  const endTime = periodEndTime(period);
  const departureDate = period.endDay === 'next' ? shiftSaudiDate(request.date, 1) : request.date;
  manualCompanyAttendanceRecords.push({
    id: `CORRECTION-ATT-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    employeeId: employee.id, date: request.date, time: `${startTime}:00`,
    timestamp: new Date(`${request.date}T${startTime}:00+03:00`).toISOString(),
    departureDate, departureTime: `${endTime}:00`, site: request.site, department: employee.department,
    source: 'approved-punch-correction', attendanceType: 'full-shift',
    periodSnapshot: { ...period, periodId: period.periodId || period.id || '', periodName: period.periodName || period.name || 'فترة العمل' },
    workMinutes: periodWorkMinutes(period), breakMinutes: periodBreakMinutes(period), correctionRequestId: request.id,
  });
  localStorage.setItem('nagm-company-manual-attendance', JSON.stringify(manualCompanyAttendanceRecords));
  request.history.push({ name: actor, account: sessionIdentifier(), action: 'approved', stage: 'مدير النظام', at: new Date().toISOString() });
  request.status = 'approved'; request.approvedAt = new Date().toISOString(); request.approvedBy = actor;
  saveAttendanceCorrectionRequests();
  punchRange = 'custom'; punchFromDate = request.date; punchToDate = request.date; punchEmployeeId = employee.id;
  renderMyApprovals(); renderMyRequests(); renderAttendanceManagement();
  return `تم اعتماد تصحيح بصمة ${employee.name} وإدراج دوام ${periodDisplay(period)} في سجل الحضور.`;
}

function rejectCorrectionRequest(requestId) {
  const request = attendanceCorrectionRequests.find((item) => item.id === requestId && item.status === 'pending-approval');
  if (!correctionRequestCanApprove(request)) return 'الطلب لا ينتظر إجراءً من الحساب الحالي.';
  const actor = window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.fullName || window.NAGM_SESSION?.name || sessionIdentifier();
  request.history ||= [];
  request.history.push({ name: actor, account: sessionIdentifier(), action: 'rejected', stage: isSystemAdmin() ? `مدير النظام · ${approverStageLabel(correctionRequestCurrentStage(request))}` : approverStageLabel(correctionRequestCurrentStage(request)), at: new Date().toISOString() });
  request.status = 'rejected'; request.rejectedAt = new Date().toISOString(); request.rejectedBy = actor;
  saveAttendanceCorrectionRequests(); renderMyApprovals(); renderMyRequests();
  return 'تم رفض طلب تصحيح البصمة مع حفظه في سجل الطلبات.';
}

function compactRequestCards(root = document) {
  const selector = 'article.leave-request-card, article.change-request-card';
  const cards = root instanceof Element && root.matches(selector) ? [root] : [...(root.querySelectorAll?.(selector) || [])];
  for (const card of cards) {
    if (!card.isConnected) continue;
    const heading = card.querySelector(':scope > .management-employee-head');
    if (!heading) continue;
    const disclosure = document.createElement('details');
    for (const attribute of card.attributes) disclosure.setAttribute(attribute.name, attribute.value);
    disclosure.classList.add('compact-request-disclosure');
    const summary = document.createElement('summary');
    summary.className = 'management-employee-head compact-request-summary';
    summary.innerHTML = heading.innerHTML;
    const content = document.createElement('div');
    content.className = 'compact-request-details';
    for (const child of [...card.children]) if (child !== heading) content.append(child);
    disclosure.append(summary, content);
    card.replaceWith(disclosure);
  }
}

const compactRequestObserver = new MutationObserver((records) => {
  for (const record of records) for (const node of record.addedNodes) {
    if (node.nodeType === Node.ELEMENT_NODE) compactRequestCards(node);
  }
});
compactRequestObserver.observe(document.body, { childList: true, subtree: true });

function renderMyRequests() {
  const host = document.querySelector('[data-my-requests-content]');
  if (!host) return;
  const sessionEmployee = currentEmployeeForSession();
  const canSubmitRequests = Boolean(sessionEmployee && sessionRoleValues().has('employee'));
  const employeeId = sessionEmployee?.id || '';
  const siteOptions = sessionEmployee ? correctionSitesForEmployee(sessionEmployee).map((site) => `<option value="${escapeHtml(site)}">${escapeHtml(site)}</option>`).join('') : '';
  const ownLeave = employeeLeaveRequests.filter((request) => isSystemAdmin() || request.requestedBy === sessionIdentifier() || request.employeeId === employeeId).map((request) => ({ kind: 'leave', id: request.id, employeeId: request.employeeId, createdAt: request.createdAt, date: request.startDate, title: 'إجازة', details: `${request.leaveType || request.reasonCategory || 'طلب إجازة'} · ${request.startDate} إلى ${request.endDate || '—'}`, status: request.status, stage: leaveRequestStatusLabel(request), history: request.approvalHistory || [], source: request }));
  const ownCorrections = attendanceCorrectionRequests.filter((request) => isSystemAdmin() || request.requestedBy === sessionIdentifier() || request.employeeId === employeeId).map((request) => ({ kind: 'attendance-correction', id: request.id, employeeId: request.employeeId, createdAt: request.createdAt, date: request.date, title: `تصحيح بصمة · ${request.site}`, details: request.reason, status: request.status, stage: request.status !== 'pending-approval' ? request.status === 'approved' ? 'معتمد' : 'مرفوض' : correctionRequestCurrentStage(request).final ? 'بانتظار مدير النظام' : `متوقف عند ${approverStageLabel(correctionRequestCurrentStage(request))}`, history: request.history || [] }));
  const ownAlternateAttendance = alternateAttendanceRequests.filter((request) => isSystemAdmin() || request.requestedBy === sessionIdentifier() || request.employeeId === employeeId).map((request) => ({ kind: 'alternate-attendance', id: request.id, employeeId: request.employeeId, createdAt: request.createdAt, date: request.date, title: `حضور بديل · ${request.site}`, details: `${request.time} · الجهاز مع ${request.deviceOwnerName}`, status: request.status, stage: alternateAttendanceStatus(request), history: request.history || [] }));
  const ownOvertime = employeeFinancialItems.filter((item) => item.workflowRequest && (isSystemAdmin() || item.requestedBy === sessionIdentifier() || item.employeeId === employeeId)).map((item) => ({ kind: 'overtime', id: item.id, employeeId: item.employeeId, requestedByName: item.requestedByName, createdAt: item.createdAt, date: item.date, title: `عمل إضافي · ${item.site}`, details: `${item.description} · ${item.quantity} ساعة · ${arabicNumber.format(item.amount)} ر.س`, status: item.approvalStatus, stage: item.approvalStatus === 'approved' ? (item.paymentStatus === 'paid-with-settlement' ? `صُرف مع التصفية ${item.settlementNumber}` : item.paymentStatus === 'paid' ? `صُرف بتاريخ ${item.paidAt}` : 'معتمد · غير مصروف') : item.approvalStatus === 'rejected' ? `مرفوض · ${item.rejectionReason || ''}` : overtimeCurrentStage(item).final ? 'بانتظار الموارد البشرية' : `متوقف عند ${approverStageLabel(overtimeCurrentStage(item))}`, history: item.history || [], source: item }));
  const ownGeneral = employeeGeneralRequests.filter((request) => isSystemAdmin() || request.requestedBy === sessionIdentifier() || request.employeeId === employeeId).map((request) => ({ kind: request.type, id: request.id, employeeId: request.employeeId, createdAt: request.createdAt, date: request.date || '', title: request.type === 'advance' ? `طلب سلفة · ${request.amount} ريال` : `طلب آخر · ${request.subject}`, details: request.details, status: request.status, stage: request.status !== 'pending-approval' ? request.status === 'approved' ? 'معتمد' : 'مرفوض' : employeeGeneralCurrentStage(request).final ? 'بانتظار مدير النظام' : `متوقف عند ${approverStageLabel(employeeGeneralCurrentStage(request))}`, history: request.approvalHistory || [] }));
  const ownRequests = [...ownLeave, ...ownCorrections, ...ownAlternateAttendance, ...ownOvertime, ...ownGeneral].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const rows = ownRequests.map((request) => {
    const employee = employeeRecords.find((item) => item.id === request.employeeId);
    const trace = (request.history || []).map((item) => `${item.name || item.stage || item.actorName || ''}: ${['approved','stage-approved','fully-approved','submitted'].includes(item.action) ? 'إجراء محفوظ' : item.action === 'skipped-by-owner' ? 'تخطي' : item.action === 'rejected' ? 'رفض' : item.action}`).join(' · ');
    const resubmit = request.kind === 'leave' && request.status === 'needs-revision' && request.source?.requestedBy === sessionIdentifier() ? `<form class="leave-form" data-resubmit-leave="${escapeHtml(request.id)}"><label>نوع الإجازة<select name="leaveType" required><option>${escapeHtml(request.source.leaveType || 'إجازة سنوية')}</option><option>إجازة اعتيادية</option><option>إجازة مرضية</option><option>إجازة بدون راتب</option><option>أخرى</option></select></label><label>من تاريخ<input type="date" name="startDate" value="${escapeHtml(request.source.startDate || '')}" required></label><label>إلى تاريخ<input type="date" name="endDate" value="${escapeHtml(request.source.endDate || '')}" required></label><label>ملاحظات الاستكمال<textarea name="employeeNote" rows="2" maxlength="500">${escapeHtml(request.source.employeeNote || '')}</textarea></label><button class="primary-button" type="submit">إعادة الإرسال للموارد البشرية</button></form>` : '';
    return `<article class="management-employee-card leave-request-card"><div class="management-employee-head"><div><strong>${escapeHtml(request.title)} · ${escapeHtml(employee?.name || request.employeeId)}</strong><small>${escapeHtml(request.date || request.createdAt?.slice(0, 10) || '')} · رُفع بواسطة ${escapeHtml(request.requestedByName || employee?.name || 'الموظف')}</small></div><span class="request-status-pill">${escapeHtml(request.stage)}</span></div><p>${escapeHtml(request.details || '')}</p>${request.source?.revisionNote ? `<p class="profile-note">ملاحظة الاستكمال: ${escapeHtml(request.source.revisionNote)}</p>` : ''}${trace ? `<p class="approval-trace">${escapeHtml(trace)}</p>` : ''}${resubmit}</article>`;
  }).join('');
  const engineerSite = sessionEmployee ? correctionSitesForEmployee(sessionEmployee).map((site) => `<option value="${escapeHtml(site)}">${escapeHtml(site)}</option>`).join('') : '';
  host.innerHTML = `<section class="profile-panel"><div class="panel-title"><div><h3>رفع طلب جديد</h3><p>الطلب يُرفع من حساب الموظف المرتبط بملفه الوظيفي ويمر بمسار الاعتماد المحدد.</p></div></div>${!canSubmitRequests ? '<div class="duplicate-block"><strong>الدخول بحساب موظف مرتبط مطلوب</strong><p>لا يمكن للمالك أو أي حساب آخر رفع طلب نيابة عن الموظف من صفحة «طلباتي».</p></div>' : `<form class="leave-form correction-request-form" data-employee-request-form><label>نوع الطلب<select name="type" data-employee-request-type required><option value="attendance-correction">تصحيح بصمة</option><option value="leave">إجازة</option><option value="advance">سلفة</option><option value="other-request">طلب آخر</option></select></label><input type="hidden" name="employeeId" value="${escapeHtml(employeeId)}"><div class="employee-request-fields" data-request-fields="attendance-correction"><label>تاريخ البصمة<input type="date" name="punchDate" max="${saudiTodayISO()}"></label><label>الموقع<select name="site"><option value="">اختر الموقع</option>${engineerSite}</select></label><label class="correction-reason-field">سبب عدم البصمة<textarea name="punchReason" rows="3" maxlength="500" placeholder="اكتب سبب عدم تسجيل البصمة"></textarea></label></div><div class="employee-request-fields" data-request-fields="leave" hidden><label>تاريخ بداية الإجازة<input type="date" name="startDate"></label><label class="correction-reason-field">ملاحظة للطلب<textarea name="leaveNote" rows="2" maxlength="500" placeholder="سبب أو ملاحظة للطلب"></textarea></label></div><div class="employee-request-fields" data-request-fields="advance" hidden><label>مبلغ السلفة المطلوب<input type="number" name="amount" min="1" step="0.01"></label><label class="correction-reason-field">سبب طلب السلفة<textarea name="advanceDetails" rows="3" maxlength="500"></textarea></label></div><div class="employee-request-fields" data-request-fields="other-request" hidden><label>عنوان الطلب<input name="subject" maxlength="120" placeholder="اكتب عنوانًا مختصرًا"></label><label class="correction-reason-field">تفاصيل الطلب<textarea name="otherDetails" rows="3" maxlength="1000"></textarea></label></div><button class="primary-button" type="submit">إرسال الطلب</button></form>`}<p class="profile-note">طلب الإجازة والسلفة والطلب الآخر يمر بسلسلة الاعتماد المحددة. طلب تصحيح البصمة يبدأ بمهندس الموقع المسؤول عنه.</p></section><section class="profile-panel"><div class="panel-title"><div><h3>سجل طلباتي</h3><p>${arabicNumber.format(ownRequests.length)} طلبات محفوظة</p></div></div><div class="approval-request-stack">${rows || '<div class="profile-empty-state">لا توجد طلبات مسجلة لهذا الموظف.</div>'}</div></section>`;
  const leaveRequestFields = host.querySelector('[data-request-fields="leave"]');
  if (leaveRequestFields && !leaveRequestFields.querySelector('[name="endDate"]')) leaveRequestFields.insertAdjacentHTML('afterbegin', `<label>نوع الإجازة<select name="leaveType"><option value="">اختر النوع</option><option>إجازة سنوية</option><option>إجازة اعتيادية</option><option>إجازة مرضية</option><option>إجازة بدون راتب</option><option>أخرى</option></select></label><label>إلى تاريخ<input type="date" name="endDate"></label>`);
}

function preparationRequestCanApprove(request) {
  const stage = leaveRequestCurrentStage(request);
  return request.requestedBy !== sessionIdentifier() && userCanApproveStage(stage);
}

function advancePreparationApproval(requestId) {
  const request = rentalPreparationRequests.find((item) => item.id === requestId && item.status === 'pending-approval');
  if (!request) return 'طلب التحضير غير موجود أو أُغلق.';
  const stage = leaveRequestCurrentStage(request);
  if (request.requestedBy === sessionIdentifier()) return 'لا يمكن لمقدم التحضير اعتماد طلبه بنفسه.';
  if (!userCanApproveStage(stage)) return 'هذا الطلب لا ينتظر اعتماد الصلاحية أو الحساب الحالي.';
  if (stage.final) {
    request.status = 'approved';
    request.finalApprovedAt = new Date().toISOString();
  } else {
    request.stageIndex = stage.index + 1;
    request.status = 'pending-approval';
  }
  request.approvalHistory ||= [];
  request.approvalHistory.push({ stage: approverStageLabel(stage), account: sessionIdentifier(), name: window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.name || sessionIdentifier(), action: 'approved', at: new Date().toISOString() });
  saveRentalPreparationRequests();
  renderPreparationLog();
  renderMyApprovals();
  return stage.final ? 'تم اعتماد التحضير نهائيًا وإضافته إلى سجل التحضير.' : `تم اعتماد المرحلة وإرسال الطلب إلى ${approverStageLabel(leaveRequestCurrentStage(request))}.`;
}

function rejectPreparationRequest(requestId) {
  const request = rentalPreparationRequests.find((item) => item.id === requestId && item.status === 'pending-approval');
  if (!request) return 'طلب التحضير غير موجود أو أُغلق.';
  const stage = leaveRequestCurrentStage(request);
  if (request.requestedBy === sessionIdentifier() || !userCanApproveStage(stage)) return 'هذا الطلب لا ينتظر إجراءً من الحساب الحالي.';
  request.status = 'rejected';
  request.rejectedAt = new Date().toISOString();
  request.approvalHistory ||= [];
  request.approvalHistory.push({ stage: approverStageLabel(stage), account: sessionIdentifier(), name: window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.name || sessionIdentifier(), action: 'rejected', at: request.rejectedAt });
  saveRentalPreparationRequests();
  renderPreparationLog();
  renderMyApprovals();
  return 'تم رفض طلب التحضير.';
}

function directHireCanApprove(request) {
  if (isSystemAdmin()) return true;
  const stage = leaveRequestCurrentStage(request);
  return stage.final ? userCanApproveStage(stage) : request.requestedBy !== sessionIdentifier() && userCanApproveStage(stage);
}

function advanceDirectHireStage(requestId) {
  const request = rentalDirectHireRequests.find((item) => item.id === requestId && item.status === 'pending-approval');
  if (!request) return 'نموذج المباشرة غير موجود أو أُغلق.';
  const stage = leaveRequestCurrentStage(request);
  if (stage.final || request.requestedBy === sessionIdentifier() || !userCanApproveStage(stage)) return 'النموذج لا ينتظر اعتماد هذه المرحلة من الحساب الحالي.';
  request.approvalHistory ||= [];
  request.approvalHistory.push({ stage: approverStageLabel(stage), account: sessionIdentifier(), name: window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.name || sessionIdentifier(), action: 'approved', at: new Date().toISOString() });
  request.stageIndex = stage.index + 1;
  saveRentalDirectHireRequests(); renderMyApprovals();
  return `تم اعتماد المرحلة وإرسال النموذج إلى ${approverStageLabel(leaveRequestCurrentStage(request))}.`;
}

async function finalizeDirectHire(requestId, note, approvedWage) {
  const request = rentalDirectHireRequests.find((item) => item.id === requestId && item.status === 'pending-approval');
  const worker = request && rentalRecords.find((item) => item.id === request.workerId);
  const stage = request && leaveRequestCurrentStage(request);
  if (!request || !worker || (!isSystemAdmin() && (!stage?.final || !userCanApproveStage(stage)))) throw new Error('النموذج لا ينتظر الاعتماد النهائي من الحساب الحالي.');
  const finalWageAmount = Number(approvedWage);
  if (!Number.isFinite(finalWageAmount) || finalWageAmount <= 0) throw new Error('أدخل الأجر النهائي المعتمد قبل اعتماد النموذج.');
  const finalWage = `${new Intl.NumberFormat('ar-SA').format(finalWageAmount)} ر.س / ${request.wageUnit || 'شهري'}`;
  const approvedAt = new Date().toISOString();
  const stamp = { stage: 'مدير النظام / المالك', account: sessionIdentifier(), name: window.NAGM_SESSION?.displayName || window.NAGM_SESSION?.name || sessionIdentifier(), action: 'approved', at: approvedAt };
  const approvalHistory = [...(request.approvalHistory || [])];
  if (isSystemAdmin() && !stage.final) request.approvalStages.slice(stage.index).forEach((item) => approvalHistory.push({ stage: approverStageLabel(item), account: sessionIdentifier(), name: stamp.name, action: 'skipped-by-owner', at: approvedAt }));
  approvalHistory.push(stamp);
  const signatures = approvalHistory.filter((item) => item.action === 'approved').map((item) => `<div class="signature"><strong>${escapeHtml(item.stage)}</strong><span>${escapeHtml(item.name)}</span><small>${new Date(item.at).toLocaleString('ar-SA')}</small><b>معتمد إلكترونيًا</b></div>`).join('');
  const ownerNote = note.trim();
  const formRows = [
    ['اسم العامل', worker.name], ['كود العامل', rentalWorkerCode(worker)], ['رقم الإقامة / الهوية', request.identityNumber || worker.residency], ['الجنسية', worker.nationality],
    ['المهنة', request.job || worker.job], ['موقع السكن', worker.residence], ['نوع الإجراء', { new: 'تعيين جديد', renewal: 'تجديد', 'site-transfer': 'نقل موقع' }[request.assignmentType] || 'تعيين'],
    ['تاريخ المباشرة', request.startDate], ['نهاية التعيين', request.endDate || 'مفتوح'], ['موقع العمل', request.site], ['نوع الأجر', request.wageUnit || 'شهري'], ['الأجر المعتمد', finalWage],
    ['رقم التواصل', request.phone || 'غير مسجل'], ['طريقة الصرف', request.paymentMethod || 'ضمن المسير'], ['ملاحظات التعيين', request.notes || '—'], ['إثبات الهوية', request.identityProofFileName || 'مرفق بملف العامل'],
  ];
  const formHtml = `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>نموذج مباشرة عمل — ${escapeHtml(worker.name)}</title><style>body{font:16px Arial,sans-serif;max-width:850px;margin:36px auto;padding:24px;color:#15212b}h1{text-align:center}table{width:100%;border-collapse:collapse;margin:22px 0}th,td{border:1px solid #9caab5;padding:11px;text-align:right}th{width:35%;background:#f3f6f8}.signatures{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:45px}.signature{border-top:1px solid #333;padding-top:10px;display:grid;gap:7px}.signature b{color:#13804d}.note{padding:14px;background:#f3f6f8}</style><h1>نموذج مباشرة عمل</h1><table>${formRows.map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join('')}</table>${ownerNote ? `<div class="note"><strong>ملاحظة المالك / مدير النظام:</strong> ${escapeHtml(ownerNote)}</div>` : ''}<div class="signatures">${signatures}</div></html>`;
  await putEmployeeFile({ id: `rental-hire-${request.id}`, employeeId: rentalFileOwnerId(worker.id), workerId: worker.id, kind: 'rental-attachment', category: 'نموذج مباشرة عمل', label: `نموذج مباشرة عمل معتمد — ${worker.name}`, fileName: `نموذج-مباشرة-${rentalWorkerCode(worker)}.html`, blob: new Blob([formHtml], { type: 'text/html;charset=utf-8' }), createdAt: approvedAt });
  request.wageAmount = finalWageAmount; request.wage = finalWage; request.ownerNote = ownerNote; request.status = 'approved'; request.approvalHistory = approvalHistory; request.approvedAt = approvedAt; request.approvedBy = stamp.name;
  worker.wage = finalWage; rentalWorkerWages[worker.id] = finalWage; saveRentalWorkerWages();
  if (request.job) { worker.job = request.job; rentalWorkerJobs[worker.id] = request.job; saveRentalWorkerJobs(); }
  saveRentalDirectHireRequests(); renderMyApprovals(); renderRentalList(); renderDashboardSummary();
  return 'تم اعتماد نموذج المباشرة وحفظ نسخته الموقعة في مرفقات العامل.';
}

function returnDirectHireForRevision(requestId, note) {
  const request = rentalDirectHireRequests.find((item) => item.id === requestId && item.status === 'pending-approval');
  const stage = request && leaveRequestCurrentStage(request);
  if (!request || (!isSystemAdmin() && (!stage?.final || !userCanApproveStage(stage)))) return 'النموذج لا ينتظر مراجعة الحساب الحالي.';
  if (!note.trim()) return 'اكتب ملاحظات الإعادة للمراجعة.';
  request.revisionHistory ||= [];
  request.revisionHistory.push({ approvalHistory: structuredClone(request.approvalHistory || []), note: note.trim(), returnedAt: new Date().toISOString(), returnedBy: window.NAGM_SESSION?.displayName || sessionIdentifier() });
  request.reviewNotes = note.trim(); request.status = 'needs-revision'; request.returnedAt = new Date().toISOString();
  saveRentalDirectHireRequests(); renderMyApprovals();
  return 'تمت إعادة نموذج المباشرة للمراجعة، مع حفظ ملاحظاتك.';
}

function renderMyApprovals() {
  const host = document.querySelector('[data-my-approvals-content]');
  if (!host) return;
  const pending = employeeLeaveRequests.filter((request) => !['approved', 'rejected', 'needs-revision'].includes(request.status));
  const actionableLeaves = pending.filter((request) => isSystemAdmin() || (request.requestedBy !== sessionIdentifier() && userCanApproveStage(leaveRequestCurrentStage(request))));
  const actionableOvertimes = employeeFinancialItems.filter((item) => item.workflowRequest && !item.overtimeNeedsRouting && item.approvalStatus === 'pending' && overtimeCanApprove(item));
  const actionableCorrections = attendanceCorrectionRequests.filter(correctionRequestCanApprove);
  const actionableAlternateAttendance = alternateAttendanceRequests.filter(alternateAttendanceCanApprove);
  const actionableEmployeeRequests = employeeGeneralRequests.filter(employeeGeneralRequestCanApprove);
  const actionablePreparations = rentalPreparationRequests.filter((request) => request.status === 'pending-approval' && preparationRequestCanApprove(request));
  const actionableDirectHires = rentalDirectHireRequests.filter((request) => request.status === 'pending-approval' && directHireCanApprove(request));
  const badge = document.querySelector('[data-my-approvals-count]');
  const total = document.querySelector('[data-my-approvals-total]');
  const actionableTotal = actionableLeaves.length + actionableOvertimes.length + actionablePreparations.length + actionableDirectHires.length + actionableCorrections.length + actionableAlternateAttendance.length + actionableEmployeeRequests.length;
  if (badge) { badge.textContent = arabicNumber.format(actionableTotal); badge.hidden = actionableTotal === 0; }
  if (total) total.textContent = `${arabicNumber.format(actionableTotal)} طلبات بانتظارك`;
  const filters = [
    ['leave', 'الإجازات', actionableLeaves.map((request) => {
      const employee = employeeRecords.find((item) => item.id === request.employeeId);
      if (!employee) return '';
      const stage = leaveRequestCurrentStage(request);
      const isOwnerStage = stage.final || (leaveFinanceManager() && !stage.intake);
      const approvalTrace = (request.approvalHistory || []).map((item) => `${item.name || item.stage} · ${item.action === 'approved' ? 'اعتمد' : item.action === 'routed' ? 'وجّه' : item.action === 'direct-approval-selected' ? 'اعتماد مباشر' : item.action} · ${item.at ? new Date(item.at).toLocaleString('ar-SA') : ''}`).filter(Boolean);
      const traceMarkup = approvalTrace.length ? `<p class="approval-trace">${approvalTrace.map(escapeHtml).join(' ← ')}</p>` : '<p class="approval-trace">وصل الطلب إلى الموارد البشرية للمراجعة.</p>';
      const ownerSkipNote = leaveFinanceManager() && !stage.final ? '<p class="owner-final-stage-note"><strong>اعتماد الموارد البشرية يمكنه تجاوز المراحل المتبقية</strong><span>سيُحفظ في سجل الطلب من تخطّاه الاعتماد.</span></p>' : '';
      const leaveDetails = `${request.demo ? '<span class="private-data-tag">طلب تجريبي · بيانات معاينة</span>' : ''}<div class="leave-intake-summary"><div><small>النوع</small><strong>${escapeHtml(request.leaveType || 'غير محدد')}</strong></div><div><small>الفترة</small><strong>${escapeHtml(request.startDate || '—')} إلى ${escapeHtml(request.endDate || '—')}</strong></div><div><small>الموقع</small><strong>${escapeHtml(request.site || employee.site)}</strong></div><div><small>ملاحظات الطلب</small><strong>${escapeHtml(request.employeeNote || '—')}</strong></div></div>`;
      const intakeFields = stage.intake && leaveFinanceManager() ? leaveIntakeFormMarkup(request, employee) : '';
      const finalFields = isOwnerStage ? `<div class="owner-leave-approval"><form data-final-leave-approval="${escapeHtml(request.id)}">${ownerSkipNote}<label>نوع الإجازة<select name="reasonCategory" required><option value="">اختر التصنيف</option><option ${request.leaveType === 'إجازة سنوية' ? 'selected' : ''}>إجازة سنوية</option><option ${request.leaveType === 'إجازة اعتيادية' ? 'selected' : ''}>إجازة اعتيادية</option><option ${request.leaveType === 'إجازة مرضية' ? 'selected' : ''}>إجازة مرضية</option><option ${request.leaveType === 'إجازة بدون راتب' ? 'selected' : ''}>إجازة بدون راتب</option><option>أخرى</option></select></label><label>سبب الإجازة / ملاحظات الموارد البشرية<input name="reason" maxlength="500" required placeholder="تفاصيل خاصة بمدير النظام"></label><button class="primary-button" type="submit">${leaveFinanceManager() && !stage.final ? 'اعتماد نهائي وتخطي الباقي' : 'الاعتماد النهائي للإجازة'}</button><button class="danger-button" type="button" data-reject-leave-request="${escapeHtml(request.id)}">رفض الطلب</button></form></div>` : '';
      const parallelCount = Array.isArray(stage.parallelApprovers) ? stage.parallelApprovers.length : 1;
      const parallelDone = request.parallelApprovals?.[stage.index]?.length || 0;
      const parallelNote = parallelCount > 1 ? `<p class="profile-note">اعتماد متوازٍ: ${arabicNumber.format(parallelDone)} من ${arabicNumber.format(parallelCount)} مسؤولين</p>` : '';
      const stageAction = !stage.final && !stage.intake && !isSystemAdmin() ? `<div class="leave-approval-action">${parallelNote}<label>ملاحظات الاعتماد<textarea data-leave-approval-note="${escapeHtml(request.id)}" rows="2" maxlength="500" placeholder="ملاحظاتك أو شرط إخلاء الطرف"></textarea></label><label>إعادة للاستكمال (اختياري عند الضغط على الزر)<textarea data-leave-revision-note rows="2" maxlength="500" placeholder="ما المطلوب استكماله؟"></textarea></label><div class="request-actions"><button class="primary-button" type="button" data-approve-leave-stage="${escapeHtml(request.id)}">اعتماد المرحلة: ${escapeHtml(approverStageLabel(stage))}</button><button class="danger-button" type="button" data-reject-leave-request="${escapeHtml(request.id)}">رفض الطلب</button><button class="secondary-button" type="button" data-return-leave-request="${escapeHtml(request.id)}">إعادته للاستكمال</button></div><details class="bonus-proposal"><summary>اقتراح مكافأة للموظف</summary><form data-propose-leave-bonus="${escapeHtml(request.id)}"><label>البيان<input name="description" maxlength="240" required placeholder="سبب المكافأة"></label><label>القيمة (ريال)<input name="amount" type="number" min="0.01" step="0.01" required></label><button class="secondary-button" type="submit">إرسال الاقتراح لمدير النظام</button><p class="profile-note">الاقتراح ومراجعته يظهران لمدير النظام فقط.</p></form></details></div>` : '';
      const progress = (request.approvalStages || []).length ? `<p class="approval-trace">المسار: ${(request.approvalStages || []).map((item) => escapeHtml(approverStageLabel(item))).join(' ← ')}</p>` : '';
      return `<details class="management-employee-card leave-request-card leave-approval-compact-row"><summary class="leave-request-summary"><span class="leave-request-person"><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.id)} · ${escapeHtml(request.requesterName || 'الحساب الحالي')}</small></span><span class="leave-request-period"><strong>${escapeHtml(request.startDate || '—')} – ${escapeHtml(request.endDate || '—')}</strong><small>${escapeHtml(request.leaveType || request.reasonCategory || 'طلب إجازة')}</small></span><span class="request-status-pill">${escapeHtml(leaveRequestStatusLabel(request))}</span><span class="leave-request-expand-label">التفاصيل <i aria-hidden="true">⌄</i></span></summary><div class="leave-request-expanded">${leaveDetails}${progress}${traceMarkup}${intakeFields}${finalFields}${stageAction}</div></details>`;
    }).filter(Boolean)],
    ['overtime', 'الإضافيات', actionableOvertimes.map((record) => {
      const employee = employeeRecords.find((item) => item.id === record.employeeId) || (record.workerType === 'rental' ? (() => { const worker = rentalRecords.find((item) => `rental:${item.id}` === record.employeeId); return worker ? { ...worker, id: rentalWorkerCode(worker) } : null; })() : null) || { name: record.employeeName || record.employeeId, id: record.employeeCode || record.employeeId };
      const stage = overtimeCurrentStage(record); const pendingAt = stage.final ? 'بانتظار الموارد البشرية' : `متوقف عند ${approverStageLabel(stage)}`;
      const trace = (record.approvalHistory || []).map((entry) => `${entry.name || entry.stage} · ${entry.action === 'approved' ? 'اعتماد' : entry.action === 'rejected' ? 'رفض' : entry.action === 'skipped-by-owner' ? 'تجاوز' : entry.action} · ${entry.at ? new Date(entry.at).toLocaleString('ar-SA') : ''}`).join(' ← ');
      const buttonLabel = isSystemAdmin() && !stage.final ? 'اعتماد نهائي وتخطي المراحل' : stage.final ? 'الاعتماد النهائي' : `اعتماد المرحلة: ${approverStageLabel(stage)}`;
      return `<article class="management-employee-card leave-request-card overtime-approval-card"><div class="management-employee-head"><div><strong>عمل إضافي · ${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.id)} · ${escapeHtml(record.site)} · ${escapeHtml(record.date)} · ${arabicNumber.format(Number(record.quantity) || 0)} ساعة · ${leaveFinanceManager() ? arabicNumber.format(Number(record.amount) || 0) : ''} ر.س · مقدم الطلب ${escapeHtml(record.requestedByName || '')}</small></div><span class="request-status-pill">${escapeHtml(pendingAt)}</span></div><p>${escapeHtml(record.description)}</p>${trace ? `<p class="approval-trace">${escapeHtml(trace)}</p>` : ''}<label>ملاحظات الاعتماد / سبب الرفض<textarea data-overtime-note rows="2" maxlength="500"></textarea></label><div class="request-actions"><button class="primary-button" type="button" data-overtime-decision="approve" data-overtime-id="${escapeHtml(record.id)}">${escapeHtml(buttonLabel)}</button><button class="danger-button" type="button" data-overtime-decision="reject" data-overtime-id="${escapeHtml(record.id)}">رفض الطلب</button></div></article>`;
    }).filter(Boolean)],
    ['attendance-correction', 'تصحيح البصمة', actionableCorrections.map((request) => {
      const employee = employeeRecords.find((item) => item.id === request.employeeId);
      if (!employee) return '';
      const currentStage = correctionRequestCurrentStage(request);
      const pendingAt = currentStage.final ? 'بانتظار اعتماد مدير النظام' : `متوقف عند ${approverStageLabel(currentStage)}`;
      const history = (request.history || []).map((item) => `${item.name} · ${item.action === 'approved' ? 'اعتمد' : item.action === 'skipped-by-owner' ? 'تخطى' : 'رفض'} · ${item.stage}`).join(' ← ');
      const actions = isSystemAdmin()
        ? `<div class="request-actions"><button class="primary-button" type="button" data-approve-correction="${escapeHtml(request.id)}">اعتماد ${currentStage.final ? 'وإضافة الحضور' : 'وتخطي الاعتمادات المتبقية'}</button><button class="danger-button" type="button" data-reject-correction="${escapeHtml(request.id)}">رفض الطلب</button></div>`
        : `<div class="request-actions"><button class="primary-button" type="button" data-approve-correction="${escapeHtml(request.id)}">اعتماد المرحلة وإحالة الطلب</button><button class="danger-button" type="button" data-reject-correction="${escapeHtml(request.id)}">رفض الطلب</button></div>`;
      return `<article class="management-employee-card leave-request-card"><div class="management-employee-head"><div><strong>تصحيح بصمة · ${escapeHtml(employee.name)}</strong><small>${escapeHtml(request.date)} · ${escapeHtml(request.site)} · مقدم الطلب ${escapeHtml(request.requesterName)}</small></div><span class="request-status-pill">${escapeHtml(pendingAt)}</span></div><p>سبب الطلب: ${escapeHtml(request.reason)}</p>${history ? `<p class="approval-trace">${escapeHtml(history)}</p>` : '<p class="approval-trace">لم يجرِ اتخاذ إجراء بعد.</p>'}${actions}</article>`;
    }).filter(Boolean)],
    ['alternate-attendance', 'الحضور البديل', actionableAlternateAttendance.map((request) => {
      const employee = employeeRecords.find((item) => item.id === request.employeeId);
      if (!employee) return '';
      const stage = alternateAttendanceCurrentStage(request);
      const trace = (request.history || []).map((item) => `${item.name || item.stage} · ${item.action === 'approved' ? 'اعتمد' : ['skipped-by-owner', 'skipped-by-requester'].includes(item.action) ? 'تخطى' : 'رفض'} · ${item.stage}`).join(' ← ');
      const action = isSystemAdmin()
        ? `<div class="request-actions"><button class="primary-button" type="button" data-approve-alternate-attendance="${escapeHtml(request.id)}">${stage.final ? 'اعتماد وتسجيل الحضور' : 'اعتماد وتخطي المراحل'}</button><button class="danger-button" type="button" data-reject-alternate-attendance="${escapeHtml(request.id)}">رفض الطلب</button></div>`
        : `<div class="request-actions"><button class="primary-button" type="button" data-approve-alternate-attendance="${escapeHtml(request.id)}">اعتماد المرحلة وإحالة الطلب</button><button class="danger-button" type="button" data-reject-alternate-attendance="${escapeHtml(request.id)}">رفض الطلب</button></div>`;
      return `<article class="management-employee-card leave-request-card"><div class="management-employee-head"><div><strong>حضور بديل · ${escapeHtml(employee.name)}</strong><small>${escapeHtml(request.date)} ${escapeHtml(request.time)} · ${escapeHtml(request.site)} · ${escapeHtml(request.deviceLabel || 'الجهاز غير مسجل')} · مع ${escapeHtml(request.deviceOwnerName)}</small></div><span class="request-status-pill">${escapeHtml(alternateAttendanceStatus(request))}</span></div><p>${escapeHtml(request.reason || 'تعذر استخدام هاتف الموظف.')}</p><p class="alternate-demo-badge">${request.approvalSequenceEnabled === false ? 'وصل الطلب مباشرةً إلى مدير النظام.' : 'هذا المسار يحتاج اعتماد مهندس الموقع ثم مدير النظام.'}</p>${request.photoFileId ? `<button class="secondary-button" type="button" data-open-alternate-photo="${escapeHtml(request.id)}">عرض صورة إثبات الحضور</button>` : '<p class="profile-note">لم تُرفق صورة لهذا الطلب.</p>'}${trace ? `<p class="approval-trace">${escapeHtml(trace)}</p>` : ''}${action}</article>`;
    })],
    ['employee-requests', 'السلف والطلبات الأخرى', actionableEmployeeRequests.map((request) => {
      const employee = employeeRecords.find((item) => item.id === request.employeeId);
      if (!employee) return '';
      const stage = employeeGeneralCurrentStage(request);
      const pendingAt = stage.final ? 'بانتظار اعتماد مدير النظام' : `متوقف عند ${approverStageLabel(stage)}`;
      const title = request.type === 'advance' ? `طلب سلفة · ${arabicNumber.format(request.amount)} ريال` : `طلب آخر · ${request.subject}`;
      const history = (request.approvalHistory || []).map((item) => `${item.name || item.stage} · ${item.action === 'approved' ? 'اعتماد' : item.action === 'skipped-by-owner' ? 'تخطي' : 'رفض'} · ${item.stage}`).join(' ← ');
      const actions = isSystemAdmin()
        ? `<div class="request-actions"><button class="primary-button" type="button" data-decide-employee-request="approve" data-request-id="${escapeHtml(request.id)}">اعتماد وتخطي الاعتمادات المتبقية</button><button class="danger-button" type="button" data-decide-employee-request="reject" data-request-id="${escapeHtml(request.id)}">رفض الطلب</button></div>`
        : `<div class="request-actions"><button class="primary-button" type="button" data-decide-employee-request="approve" data-request-id="${escapeHtml(request.id)}">اعتماد المرحلة</button><button class="danger-button" type="button" data-decide-employee-request="reject" data-request-id="${escapeHtml(request.id)}">رفض الطلب</button></div>`;
      return `<article class="management-employee-card leave-request-card"><div class="management-employee-head"><div><strong>${escapeHtml(title)} · ${escapeHtml(employee.name)}</strong><small>مقدم الطلب: ${escapeHtml(request.requestedByName)} · ${new Date(request.createdAt).toLocaleDateString('ar-SA')}</small></div><span class="request-status-pill">${escapeHtml(pendingAt)}</span></div><p>${escapeHtml(request.details)}</p>${history ? `<p class="approval-trace">${escapeHtml(history)}</p>` : ''}${actions}</article>`;
    }).filter(Boolean)],
    ['rental-direct-hire', 'مباشرات العمل للعمالة الإيجارية', actionableDirectHires.map((request) => {
      const worker = rentalRecords.find((item) => item.id === request.workerId);
      if (!worker) return '';
      const stage = leaveRequestCurrentStage(request);
      const trace = (request.approvalHistory || []).filter((item) => item.action === 'approved').map((item) => item.name || item.stage);
      const signatures = trace.length ? `<p class="approval-trace">اعتمادات النموذج: ${trace.map(escapeHtml).join(' ← ')}</p>` : '<p class="approval-trace">بانتظار أول اعتماد</p>';
      const formFields = `<section class="rental-hire-approval-preview"><h4>نموذج التعيين للمراجعة</h4>${rentalHirePreviewMarkup(worker, request)}${isSystemAdmin() && request.identityProofFileId ? `<button type="button" class="secondary-button" data-open-hire-proof="${escapeHtml(request.id)}">عرض صورة إثبات الهوية · ${escapeHtml(request.identityProofFileName || 'الصورة')}</button>` : `<p class="profile-note">إثبات الهوية مرفق بملف العامل، وعرضه محصور بمالك النظام.</p>`}</section>`;
      const ownerFinalReview = stage.final || isSystemAdmin();
      const ownerOverrideNote = isSystemAdmin() && !stage.final ? '<p class="owner-final-stage-note"><strong>مراجعة مدير النظام</strong><span>يمكنك اعتماد النموذج وتخطي المراحل المتبقية؛ سيظهر ذلك في سجل الاعتمادات.</span></p>' : '';
      const action = ownerFinalReview ? `${ownerOverrideNote}<label class="direct-hire-review-note">الأجر النهائي المعتمد (ر.س)<input type="number" name="approvedWage" min="0.01" step="0.01" value="${escapeHtml(request.wageAmount || rentalWageNumber(worker))}" required></label><label class="direct-hire-review-note">ملاحظاتك / التعديلات<textarea rows="2" maxlength="500" placeholder="مثال: إضافة بدل أو توضيح شرط المباشرة"></textarea></label><div class="request-actions"><button class="primary-button" type="button" data-finalize-direct-hire="${escapeHtml(request.id)}">${isSystemAdmin() && !stage.final ? 'اعتماد نهائي وتخطي المراحل' : 'اعتماد النموذج والتوقيع'}</button><button class="secondary-button" type="button" data-return-direct-hire="${escapeHtml(request.id)}">عودة للمراجعة</button></div>` : `<div class="request-actions"><button class="primary-button" type="button" data-approve-direct-hire="${escapeHtml(request.id)}">اعتماد المرحلة: ${escapeHtml(approverStageLabel(stage))}</button></div>`;
      return `<article class="management-employee-card leave-request-card"><div class="management-employee-head"><div><strong>مباشرة عمل · ${escapeHtml(worker.name)}</strong><small>${escapeHtml(request.requesterName)} · بانتظار ${escapeHtml(approverStageLabel(stage))}</small></div><span class="request-status-pill">${escapeHtml(approverStageLabel(stage))}</span></div>${signatures}${formFields}${action}</article>`;
    }).filter(Boolean)],
    ['overtime', 'الإضافيات', []],
    ['rental-preparation', 'تحضير العمالة الإيجارية', actionablePreparations.map((request) => {
      const stage = leaveRequestCurrentStage(request);
      const workerNames = request.workerIds.map((id) => rentalRecords.find((worker) => worker.id === id)?.name || id);
      const trace = (request.approvalHistory || []).filter((item) => item.action === 'approved').map((item) => item.name || item.stage);
      const traceMarkup = trace.length ? `<p class="approval-trace">اعتمادات سابقة: ${trace.map(escapeHtml).join(' ← ')}</p>` : '<p class="approval-trace">أول مرحلة في مسار الاعتماد</p>';
      const action = stage.final
        ? `<div class="request-actions"><button class="primary-button" type="button" data-approve-preparation="${escapeHtml(request.id)}">اعتماد نهائي وإدراج التحضير</button><button class="danger-button" type="button" data-reject-preparation="${escapeHtml(request.id)}">رفض الطلب</button></div>`
        : `<div class="request-actions"><button class="primary-button" type="button" data-approve-preparation="${escapeHtml(request.id)}">اعتماد المرحلة: ${escapeHtml(approverStageLabel(stage))}</button><button class="danger-button" type="button" data-reject-preparation="${escapeHtml(request.id)}">رفض الطلب</button></div>`;
      return `<article class="management-employee-card leave-request-card"><div class="management-employee-head"><div><strong>تحضير ${arabicNumber.format(request.workerIds.length)} عامل</strong><small>${escapeHtml(request.site)} · من ${escapeHtml(request.startDate)} إلى ${escapeHtml(request.endDate)} · المُعدّ ${escapeHtml(request.requesterName)}</small></div><span class="request-status-pill">${escapeHtml(preparationRequestStatusLabel(request))}</span></div><p>${workerNames.map(escapeHtml).join('، ')}</p>${traceMarkup}${action}</article>`;
    })],
  ];
  host.innerHTML = `<div class="approval-category-tabs" role="tablist" aria-label="نوع الموافقات">${filters.map(([key, title, items]) => `<button type="button" class="count-filter ${myApprovalsFilter === key ? 'active' : ''}" data-my-approvals-filter="${key}" aria-pressed="${myApprovalsFilter === key}">${escapeHtml(title)} <b>${arabicNumber.format(items.length)}</b></button>`).join('')}</div>${filters.map(([key, title, items]) => `<section class="approval-category-section" data-my-approval-category="${key}" ${key !== myApprovalsFilter && !isSystemAdmin() ? 'hidden' : ''}><div class="panel-title"><div><h3>${escapeHtml(title)}</h3><p>${isSystemAdmin() ? 'كل الطلبات المعلّقة موضحة، حتى إن كانت عند مرحلة اعتماد أخرى' : 'المعروض ما يحتاج إجراء من الحساب الحالي'}</p></div></div>${items.length ? `<div class="approval-request-stack">${items.join('')}</div>` : `<div class="profile-empty-state">لا توجد طلبات بانتظار اعتمادك في هذا القسم.</div>`}</section>`).join('')}<p class="profile-note">يستطيع مالك النظام اعتماد طلب الموظف مباشرة وتخطي المراحل المتبقية؛ وتُحفظ المراحل التي تخطاها في سجل الطلب.</p>`;
}

function readApprovalChainDraft() {
  const host = document.querySelector('[data-approval-settings-content]');
  const type = host?.dataset.renderedChainType || selectedApprovalType;
  const submitters = [...(host?.querySelectorAll('input[name="approval-submitter"]:checked') || [])].map((input) => input.value);
  const stages = [...(host?.querySelectorAll('[data-approval-stage]') || [])].map((row) => ({
    mode: row.querySelector('[name="stage-mode"]').value,
    value: row.querySelector('[name="stage-value"]').value,
  })).filter((stage) => stage.value);
  approvalChainDrafts[type] = { submitters, stages };
  return type;
}

function renderApprovalSettings(type = selectedApprovalType) {
  selectedApprovalType = type;
  const host = document.querySelector('[data-approval-settings-content]');
  if (!host) return;
  const config = approvalChainDrafts[type] || defaultApprovalConfigs[type];
  host.dataset.renderedChainType = type;
  const typeOptions = approvalRequestTypes.map((item) => `<option value="${item.id}" ${item.id === type ? 'selected' : ''}>${escapeHtml(item.name)}</option>`).join('');
  const submitterChoices = ['rental-preparation', 'rental-direct-hire'].includes(type) ? [['engineer', 'المهندس'], ['monitor', 'المراقب']] : ['attendance-correction', 'advance', 'other-request'].includes(type) ? [['employee', 'الموظف']] : [['employee', 'الموظف'], ['engineer', 'المهندس']];
  const submitterChecks = submitterChoices.map(([value, label]) => `<label class="approval-submitter-choice"><input type="checkbox" name="approval-submitter" value="${value}" ${config.submitters.includes(value) ? 'checked' : ''}><span>${label}</span></label>`).join('');
  const stageRows = config.stages.map((stage, index) => approvalStageEditor(stage, index)).join('');
  const noAccounts = registeredAccounts.length === 0;
  const engineerOptions = rentalEngineerAccounts();
  const siteEngineerPanel = type === 'rental-preparation' ? `<section class="profile-panel site-engineer-assignment"><div class="panel-title"><div><h3>مهندس الاعتماد حسب الموقع</h3><p>اختر المهندس المسؤول لكل موقع. طلب التحضير سيتجه إليه تلقائيًا أولًا.</p></div></div>${rentalPreparationSites().map((site) => `<label class="site-engineer-assignment-row"><strong>${escapeHtml(site)}</strong><select data-site-engineer-assignment="${escapeHtml(site)}"><option value="">اختر المهندس المسؤول</option>${engineerOptions.map((account) => { const id = accountIdentifier(account); const name = account.displayName || account.fullName || account.name || account.email || id; return `<option value="${escapeHtml(id)}" ${rentalSiteEngineerAssignments[site] === id ? 'selected' : ''}>${escapeHtml(name)}</option>`; }).join('')}</select></label>`).join('') || '<div class="profile-empty-state">لا توجد مواقع تحضير معرفة.</div>'}${engineerOptions.length ? '' : '<p class="profile-note">لا توجد حسابات مسجلة بصلاحية مهندس. سجّل حسابات المهندسين أولًا لتعيين مسؤول للموقع.</p>'}<button type="button" class="primary-button" data-save-site-engineer-assignments>حفظ تعيينات مهندسي المواقع</button></section>` : '';
  host.innerHTML = `<section class="profile-panel approval-chain-editor"><div class="panel-title"><div><h3>المسار المطلوب</h3><p>حدد نوع الطلب، من يحق له رفعه، ثم مراحل الاعتماد بالترتيب</p></div><span class="private-data-tag">المالك / مدير النظام مرحلة أخيرة ثابتة</span></div><label class="approval-chain-type">القسم<select data-approval-chain-type>${typeOptions}</select></label><div class="approval-submitter-group"><strong>من يمكنه رفع الطلب؟</strong><div>${submitterChecks}</div></div><div class="approval-stage-editor-list"><div class="approval-stage-list-head"><h3>مراحل الاعتماد قبل مدير النظام</h3><span>${arabicNumber.format(config.stages.length)} مراحل</span></div>${stageRows || '<div class="profile-empty-state">أضف مرحلة اعتماد واحدة على الأقل.</div>'}</div><button type="button" class="secondary-button" data-add-approval-stage>+ إضافة مرحلة</button><div class="owner-final-stage-note"><strong>المرحلة الأخيرة</strong><span>بعد اعتماد المراحل أعلاه، يصل الطلب إلى «موافقاتي» لدى حساب مالك النظام أو مدير النظام.</span></div>${siteEngineerPanel}${noAccounts ? '<p class="profile-note">لا توجد حسابات مسجلة بعد؛ يمكنك إعداد السلسلة بالصلاحيات الآن، وسيظهر اختيار شخص محدد بعد تسجيل الحسابات.</p>' : ''}<div class="approval-settings-actions"><button type="button" class="primary-button" data-save-approval-config>حفظ سلسلة الاعتماد</button></div></section>`;
}

function approvalStageEditor(stage, index) {
  const roleOptions = Object.entries(approverRoleLabels).filter(([key]) => key !== 'system-admin').map(([value, label]) => `<option value="${value}" ${stage.mode !== 'account' && stage.value === value ? 'selected' : ''}>${escapeHtml(label)}</option>`).join('');
  const accountOptions = registeredAccounts.map((account) => {
    const id = accountIdentifier(account);
    const name = account.displayName || account.fullName || account.name || account.email || id;
    return `<option value="${escapeHtml(id)}" ${stage.mode === 'account' && stage.value === id ? 'selected' : ''}>${escapeHtml(name)}</option>`;
  }).join('');
  const valueOptions = stage.mode === 'account' ? `<option value="">${registeredAccounts.length ? 'اختر الحساب' : 'لا يوجد حساب مسجل'}</option>${accountOptions}` : `<option value="">اختر الصلاحية</option>${roleOptions}`;
  return `<div class="approval-stage-editor" data-approval-stage><span class="approval-stage-number">${arabicNumber.format(index + 1)}</span><label>التعيين<select name="stage-mode"><option value="role" ${stage.mode !== 'account' ? 'selected' : ''}>حسب الصلاحية</option><option value="account" ${stage.mode === 'account' ? 'selected' : ''}>شخص محدد</option></select></label><label class="approval-stage-assignee">${stage.mode === 'account' ? 'الحساب' : 'الصلاحية'}<select name="stage-value">${valueOptions}</select></label><button type="button" class="danger-button" data-remove-approval-stage aria-label="حذف مرحلة الاعتماد ${arabicNumber.format(index + 1)}">حذف</button></div>`;
}

function canAccessMyApprovals() {
  if (isSystemAdmin()) return true;
  const roles = sessionRoleValues();
  return Object.values(rentalSiteEngineerAssignments || {}).includes(sessionIdentifier()) || Object.values(approvalChainConfigs).some((config) => config.stages.some((stage) =>
    stage.mode === 'account' ? stage.value === sessionIdentifier() : roles.has(stage.value),
  ));
}

function applyApprovalPermissions() {
  document.querySelectorAll('[data-approval-settings-nav], [data-owner-only]').forEach((node) => { node.hidden = !isSystemAdmin(); });
  const disbursementNav = document.querySelector('[data-disbursement-nav]');
  if (disbursementNav) disbursementNav.hidden = !canManageDailyDisbursements();
  const ratingsNav = document.querySelector('[data-ratings-nav]');
  if (ratingsNav) ratingsNav.hidden = !isSystemAdmin() && !sessionRoleValues().has('engineer');
  const approvalsNav = document.querySelector('[data-my-approvals-nav]');
  if (approvalsNav) approvalsNav.hidden = !canAccessMyApprovals();
}

function applyPreparationPermissions() {
  const canManageApprovalChain = isSystemAdmin();
  document.querySelectorAll('[data-owner-only]').forEach((panel) => { panel.hidden = !canManageApprovalChain; });
  app.classList.toggle('no-approval-settings', !canManageApprovalChain);
}

const existingPreparations = [
  { date: '2026-11-18', site: 'موقع العيون', workerId: 'RNT-101', approver: '—', approvalStatus: 'بانتظار الاعتماد' },
  { date: '2026-11-18', site: 'موقع المطار', workerId: 'RNT-104', approver: 'مهندس الموقع', approvalStatus: 'معتمد' },
  { date: '2026-11-18', site: 'موقع المربع', workerId: 'RNT-106', approver: 'مهندس الموقع', approvalStatus: 'معتمد' },
  { date: '2026-11-17', site: 'موقع المربع', workerId: 'RNT-103', approver: 'مدير المشاريع', approvalStatus: 'معتمد' },
  { date: '2026-11-19', site: 'الورشة', workerId: 'RNT-102', approver: '—', approvalStatus: 'بانتظار الاعتماد' },
];

const prepLogDateStart = document.querySelector('[data-log-date-start]');
const prepLogDateEnd = document.querySelector('[data-log-date-end]');
const prepLogDateWarning = document.querySelector('[data-log-date-warning]');
const prepLogWorker = document.querySelector('[data-log-worker]');
const prepLogBody = document.querySelector('[data-preparation-log-body]');
const prepLogCount = document.querySelector('[data-log-result-count]');
const exportPrepLogButton = document.querySelector('[data-export-preparation-log]');
let rentalPreparationRequests = [];
try {
  const saved = JSON.parse(localStorage.getItem('nagm-rental-preparation-requests') || '[]');
  if (Array.isArray(saved)) rentalPreparationRequests = saved;
} catch { rentalPreparationRequests = []; }

function saveRentalPreparationRequests() {
  localStorage.setItem('nagm-rental-preparation-requests', JSON.stringify(rentalPreparationRequests));
}

function eachDateInRange(fromDate, toDate) {
  const dates = [];
  const cursor = new Date(`${fromDate}T12:00:00`);
  const end = new Date(`${toDate}T12:00:00`);
  while (cursor <= end && dates.length < 366) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

function preparationRequestStatusLabel(request) {
  if (request.status === 'approved') return 'معتمد';
  if (request.status === 'rejected') return 'مرفوض';
  const stage = leaveRequestCurrentStage(request);
  return `بانتظار ${approverStageLabel(stage)}`;
}

function preparationRequestRecords() {
  return rentalPreparationRequests.flatMap((request) => {
    const approver = [...(request.approvalHistory || [])].reverse().find((item) => item.action === 'approved');
    return (Array.isArray(request.workerIds) ? request.workerIds : []).flatMap((workerId) => {
      const worker = rentalRecords.find((item) => item.id === workerId);
      if (!worker) return [];
      return eachDateInRange(request.startDate, request.endDate).map((date) => ({
        date, site: request.site, workerId, worker, preparer: request.requesterName,
        approver: approver?.name || '—', approvalStatus: preparationRequestStatusLabel(request),
      }));
    });
  });
}

function preparationLogRecords() {
  return [
    ...existingPreparations.map((record) => ({ ...record, worker: rentalRecords.find((worker) => worker.id === record.workerId), preparer: 'سجل سابق' })).filter((record) => record.worker),
    ...preparationRequestRecords(),
  ].sort((a, b) => b.date.localeCompare(a.date) || a.worker.name.localeCompare(b.worker.name, 'ar'));
}

for (const worker of rentalRecords) prepLogWorker.add(new Option(`${worker.name} · ${rentalWorkerCode(worker)}`, worker.id));

function preparationLogDateError() {
  if (prepLogDateStart.value && !prepLogDateEnd.value) return 'اختر تاريخ النهاية في خانة «إلى تاريخ» لإكمال الفترة.';
  if (!prepLogDateStart.value && prepLogDateEnd.value) return 'اختر تاريخ البداية في خانة «من تاريخ» لإكمال الفترة.';
  if (prepLogDateStart.value && prepLogDateEnd.value && prepLogDateEnd.value < prepLogDateStart.value) return 'تاريخ «إلى» يجب أن يكون في نفس تاريخ «من» أو بعده.';
  return '';
}

function filteredPreparationLog() {
  if (preparationLogDateError()) return [];
  return preparationLogRecords().filter((record) => (!prepLogDateStart.value || record.date >= prepLogDateStart.value)
    && (!prepLogDateEnd.value || record.date <= prepLogDateEnd.value)
    && (prepLogWorker.value === 'all' || record.worker.id === prepLogWorker.value));
}

function renderPreparationLog() {
  const dateError = preparationLogDateError();
  prepLogDateWarning.textContent = dateError;
  prepLogDateWarning.hidden = !dateError;
  const records = filteredPreparationLog();
  const columnLabels = ['التاريخ', 'العامل', 'المهنة', 'الموقع', 'المُعدّ', 'المعتمد', 'الحالة'];
  prepLogBody.replaceChildren();
  for (const record of records) {
    const row = document.createElement('tr');
    const values = [record.date, `${record.worker.name} ${record.worker.id}`, record.worker.job, record.site, record.preparer, record.approver, record.approvalStatus];
    values.forEach((value, index) => {
      const cell = document.createElement('td');
      cell.dataset.label = columnLabels[index];
      cell.textContent = value;
      if (index === 1) {
        const id = document.createElement('small');
        id.textContent = rentalWorkerCode(record.worker);
        cell.textContent = record.worker.name;
        cell.append(id);
      }
      if (index === 6) {
        const badge = document.createElement('span');
        badge.className = `status-badge ${record.approvalStatus === 'معتمد' ? 'active' : 'leave'}`;
        badge.textContent = record.approvalStatus;
        cell.replaceChildren(badge);
      }
      row.append(cell);
    });
    prepLogBody.append(row);
  }
  if (!records.length) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 7;
    cell.className = 'log-empty';
    cell.textContent = 'لا توجد سجلات تحضير لهذا الاختيار.';
    row.append(cell);
    prepLogBody.append(row);
  }
  prepLogCount.textContent = `عدد السجلات: ${arabicNumber.format(records.length)}`;
  exportPrepLogButton.disabled = dateError.length > 0 || records.length === 0;
  exportPrepLogButton.title = dateError ? dateError : records.length ? 'تصدير السجلات الظاهرة بصيغة CSV المتوافقة مع Excel' : 'لا توجد سجلات لتصديرها';
}

prepLogDateStart.addEventListener('change', renderPreparationLog);
prepLogDateEnd.addEventListener('change', renderPreparationLog);
prepLogWorker.addEventListener('change', renderPreparationLog);
document.querySelector('[data-clear-log-filters]').addEventListener('click', () => {
  prepLogDateStart.value = '';
  prepLogDateEnd.value = '';
  prepLogWorker.value = 'all';
  renderPreparationLog();
});
exportPrepLogButton.addEventListener('click', () => {
  const records = filteredPreparationLog();
  if (!records.length) return;
  const columns = ['التاريخ', 'العامل', 'كود العامل', 'رقم السجل الداخلي', 'المهنة', 'الموقع', 'المُعدّ', 'المعتمد', 'حالة الاعتماد'];
  const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const csv = `\uFEFF${[columns, ...records.map((record) => [record.date, record.worker.name, rentalWorkerCode(record.worker), record.worker.id, record.worker.job, record.site, record.preparer, record.approver, record.approvalStatus])].map((line) => line.map(csvCell).join(',')).join('\r\n')}`;
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  const rangeLabel = prepLogDateStart.value && prepLogDateEnd.value
    ? `${prepLogDateStart.value}-إلى-${prepLogDateEnd.value}` : 'كل-التواريخ';
  link.download = `سجل-التحضير-${rangeLabel}.csv`;
  link.click();
  URL.revokeObjectURL(url);
});
renderPreparationLog();

applyPreparationPermissions();
applyApprovalPermissions();
renderMyApprovals();
renderChangeRequests();

function isPrepRangeValid() {
  return Boolean(prepDateStart.value && prepDateEnd.value && prepDateEnd.value >= prepDateStart.value);
}

function updatePrepDateWarning() {
  let message = '';
  if (prepDateStart.value && !prepDateEnd.value) message = 'اختر تاريخ النهاية في خانة «إلى تاريخ» لإكمال الفترة.';
  else if (!prepDateStart.value && prepDateEnd.value) message = 'اختر تاريخ البداية في خانة «من تاريخ» لإكمال الفترة.';
  else if (prepDateStart.value && prepDateEnd.value && prepDateEnd.value < prepDateStart.value) message = 'تاريخ «إلى» يجب أن يكون في نفس تاريخ «من» أو بعده.';
  prepDateWarning.textContent = message;
  prepDateWarning.hidden = !message;
}

function hasPreparationDuplicate(worker) {
  if (!isPrepRangeValid()) return false;
  const inExistingLog = existingPreparations.some((record) => record.date >= prepDateStart.value && record.date <= prepDateEnd.value && record.site === prepSite.value && record.workerId === worker.id);
  const inSavedRequest = rentalPreparationRequests.some((request) => request.site === prepSite.value
    && !['rejected'].includes(request.status)
    && Array.isArray(request.workerIds) && request.workerIds.includes(worker.id)
    && request.startDate <= prepDateEnd.value && request.endDate >= prepDateStart.value);
  return inExistingLog || inSavedRequest;
}

function renderPrepWorkers() {
  for (const workerId of [...selectedPrepWorkerIds]) {
    const worker = rentalRecords.find((record) => record.id === workerId);
    if (!worker || hasPreparationDuplicate(worker)) selectedPrepWorkerIds.delete(workerId);
  }
  const query = prepSearch.value.trim().toLocaleLowerCase('ar');
  const workers = rentalRecords.filter((worker) => !query || [worker.name, worker.job, worker.id, worker.residency].some((value) => value.toLocaleLowerCase('ar').includes(query)));
  prepWorkersHost.innerHTML = workers.map((worker) => {
    const duplicate = hasPreparationDuplicate(worker);
    const disabled = !isPrepRangeValid() || duplicate || worker.status === 'stopped';
    return `<label class="prep-worker-option ${disabled ? 'disabled' : ''}"><input type="checkbox" value="${worker.id}" ${selectedPrepWorkerIds.has(worker.id) ? 'checked' : ''} ${disabled ? 'disabled' : ''}><span class="prep-worker-main"><strong>${worker.name}</strong><small>${worker.job} · ${worker.id}</small></span>${duplicate ? '<small class="duplicate-mark">مجهز مسبقًا</small>' : worker.status === 'stopped' ? '<small class="duplicate-mark">موقوف</small>' : ''}</label>`;
  }).join('');
  document.querySelector('[data-prep-selected-count]').textContent = arabicNumber.format(selectedPrepWorkerIds.size);
  document.querySelector('[data-prep-preview-button]').disabled = selectedPrepWorkerIds.size === 0 || !isPrepRangeValid();
}

prepSearch.addEventListener('input', renderPrepWorkers);
function handlePrepDateChange() {
  selectedPrepWorkerIds.clear();
  document.querySelector('[data-prep-preview]').hidden = true;
  updatePrepDateWarning();
  renderPrepWorkers();
}
prepDateStart.addEventListener('change', handlePrepDateChange);
prepDateEnd.addEventListener('change', handlePrepDateChange);
prepSite.addEventListener('change', () => { selectedPrepWorkerIds.clear(); document.querySelector('[data-prep-preview]').hidden = true; renderPrepWorkers(); });
prepWorkersHost.addEventListener('change', (event) => {
  const input = event.target.closest('input[type="checkbox"]');
  if (!input) return;
  if (input.checked) selectedPrepWorkerIds.add(input.value);
  else selectedPrepWorkerIds.delete(input.value);
  document.querySelector('[data-prep-preview]').hidden = true;
  renderPrepWorkers();
});
document.querySelector('[data-prep-preview-button]').addEventListener('click', () => {
  updatePrepDateWarning();
  if (!isPrepRangeValid()) { notify('أكمل تاريخ البداية والنهاية بشكل صحيح أولًا.'); return; }
  if (eachDateInRange(prepDateStart.value, prepDateEnd.value).length >= 366 && prepDateEnd.value !== prepDateStart.value) { notify('الحد الأقصى لفترة التحضير الواحدة 365 يومًا.'); return; }
  const selected = rentalRecords.filter((worker) => selectedPrepWorkerIds.has(worker.id));
  const duplicates = selected.filter(hasPreparationDuplicate);
  const siteEngineer = rentalEngineerAccounts().find((account) => accountIdentifier(account) === rentalSiteEngineerAssignments[prepSite.value]);
  const siteEngineerName = siteEngineer && (siteEngineer.displayName || siteEngineer.fullName || siteEngineer.name || siteEngineer.email || accountIdentifier(siteEngineer));
  const preview = document.querySelector('[data-prep-preview]');
  if (!selected.length) { notify('حدد عاملًا واحدًا على الأقل لمعاينة التحضير.'); return; }
  preview.hidden = false;
  preview.innerHTML = duplicates.length
    ? `<div class="duplicate-block"><strong>تعذر تجهيز العامل المكرر</strong><p>${duplicates.map((worker) => worker.name).join('، ')} سبق تحضيره في ${prepSite.value} خلال الفترة المحددة.</p></div>`
    : !siteEngineer
      ? `<div class="duplicate-block"><strong>لا يوجد مهندس مسؤول عن الموقع</strong><p>عيّن مهندسًا لـ«${escapeHtml(prepSite.value)}» من «إعداد سلاسل الاعتماد» قبل إرسال التحضير.</p></div>`
      : accountIdentifier(siteEngineer) === sessionIdentifier()
        ? `<div class="duplicate-block"><strong>المُعدّ هو مهندس الموقع المسؤول</strong><p>لا يمكن اعتماد التحضير ذاتيًا. اطلب من مراقب الموقع إرساله أو عيّن مهندسًا آخر للموقع.</p></div>`
        : `<div class="preview-ready"><strong>معاينة التحضير جاهزة</strong><p>${arabicNumber.format(selected.length)} عامل · ${prepSite.value} · من ${prepDateStart.value} إلى ${prepDateEnd.value}</p><small>المُعدّ: ${escapeHtml(preparerName)} · الاعتماد الأول تلقائيًا: ${escapeHtml(siteEngineerName)}</small></div><div class="preview-workers">${selected.map((worker) => `<span>${escapeHtml(worker.name)} · ${escapeHtml(worker.job)}</span>`).join('')}</div><button class="primary-button" type="button" data-submit-rental-preparation>إرسال للاعتماد</button><small class="profile-note">سيُرسل الطلب أولًا لمهندس الموقع المحدد، ثم يكمل بقية سلسلة الاعتماد. لا يظهر التحضير كمعتمد قبل اكتمالها.</small>`;
});
updatePrepDateWarning();
renderPrepWorkers();

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    document.querySelector('.search-box input').focus();
  }
});

// Arabic is the source language. Exact phrase matching deliberately leaves
// employee names, notes, amounts, and other user-entered values untouched.
const nagmEnglishPhrases = {
  'لوحة التحكم': 'Dashboard', 'إدارة البصمات': 'Attendance Management', 'الحضور البديل': 'Alternate Attendance',
  'الموظفون': 'Employees', 'قائمة الموظفين': 'Employee List', 'الفترات': 'Work Periods', 'تعيين فترة': 'Assign Period',
  'معرف لوكيشن': 'Locations', 'تعيين معرف لوكيشن': 'Assign Locations', 'العهد': 'Custody', 'إجازات الموظفين': 'Employee Leaves',
  'الإضافيات والمكافآت والتصفية': 'Extras, Bonuses & Settlements', 'العودة للعمل': 'Return to Work', 'العمالة الإيجارية': 'Rental Workers',
  'قائمة العمالة': 'Worker List', 'تعيين عمالة إيجارية': 'Assign Rental Workers', 'تحضير العمالة الإيجارية': 'Rental Worker Preparation',
  'المسيرات': 'Payroll Runs', 'كشف الحسابات': 'Account Statements', 'الإضافيات والمكافآت': 'Extras & Bonuses',
  'المخزون والعهد': 'Inventory & Custody', 'المشروعات والاعتمادات': 'Projects & Approvals', 'موافقاتي': 'My Approvals',
  'طلباتي': 'My Requests', 'إعداد سلاسل الاعتماد': 'Approval Workflow Settings', 'طلبات التعديل والحذف': 'Change & Deletion Requests',
  'الإدارة والتقارير': 'Administration & Reports', 'التقارير': 'Reports', 'المبالغ المنصرفة اليومية': 'Daily Disbursements',
  'التقييمات': 'Evaluations', 'سجل الحركات': 'Activity Log', 'الحسابات والصلاحيات': 'Accounts & Permissions', 'المساعدة': 'Help',
  'دليل الاستخدام': 'User Guide', 'المالك': 'Owner', 'مالك النظام': 'System Owner', 'جلسة آمنة': 'Secure Session', 'بيانات محمية': 'Protected Data',
  'اليوم': 'Today', 'الأسبوع': 'Week', 'الشهر': 'Month', 'ابحث في النظام': 'Search the system', 'الإشعارات': 'Notifications',
  'إجمالي الموظفين': 'Total Employees', 'إجازة': 'On Leave', 'نشط': 'Active', 'موقوف': 'Suspended', 'موظفو الشركة': 'Company Employees',
  'إجازات سارية': 'Active Leaves', 'طلب إجازة': 'Leave Request', 'طلبات الإجازات الواردة': 'Incoming Leave Requests',
  'سلسلة الاعتماد وإخلاء الطرف': 'Approval & Clearance Workflow', 'المدير المباشر': 'Direct Manager', 'الموقع': 'Site',
  'مقدم الطلب': 'Requested By', 'تاريخ الطلب': 'Request Date', 'نوع الإجازة': 'Leave Type', 'من تاريخ': 'From Date', 'إلى تاريخ': 'To Date',
  'ملاحظات الموارد البشرية': 'HR Notes', 'إضافة مرحلة': 'Add Stage', 'المسؤول': 'Approver', 'بالتوازي مع المرحلة السابقة': 'In parallel with previous stage',
  'حذف المرحلة': 'Remove Stage', 'اعتماد الإجازة مباشرةً دون موافقات أو إخلاء طرف': 'Approve leave directly without approvals or clearance',
  'سبب التوجيه / الإعفاء': 'Routing / Waiver Reason', 'حفظ التوجيه وإرسال الاعتمادات': 'Save Routing & Send for Approval',
  'اعتماد الإجازة من جميع الجهات': 'Leave Approved by All Required Parties', 'تم اعتماد الإجازة من جميع الجهات': 'Leave Approved by All Required Parties',
  'تم الانتهاء من جميع إجراءات الموظف': 'All Employee Procedures Completed', 'سجل الإجازات والتصفيات': 'Leave & Settlement History',
  'سجل الإضافيات والمستحقات': 'Extras & Dues History', 'إضافيات ومستحقات': 'Extras & Dues', 'تصفية مالية': 'Financial Settlement',
  'إجمالي المستحقات': 'Total Credits', 'إجمالي الخصومات': 'Total Deductions', 'صافي التصفية': 'Net Settlement',
  'تأكيد الصرف الفعلي': 'Confirm Actual Payment', 'طريقة الصرف': 'Payment Method', 'رقم المرجع': 'Reference Number',
  'إثبات الصرف': 'Payment Proof', 'طباعة / PDF': 'Print / PDF', 'تصدير Excel (CSV)': 'Export Excel (CSV)',
  'بانتظار توجيه الموارد البشرية': 'Awaiting HR Routing', 'بانتظار الاعتماد': 'Awaiting Approval', 'معتمد': 'Approved',
  'مرفوض': 'Rejected', 'للاستكمال': 'Needs More Information', 'لا توجد إجازات مسجلة لهذا الموظف.': 'No leave records for this employee.',
  'غير معين': 'Not Assigned', 'لا يوجد مدير مباشر': 'No Direct Manager', 'حفظ المدير المباشر': 'Save Direct Manager',
  'التوقيعات': 'Signatures', 'توقيعي الإلكتروني': 'My Electronic Signature', 'حفظ نسخة توقيع جديدة': 'Save New Signature Version',
  'إعادة للاستكمال': 'Return for Completion', 'اعتماد المرحلة': 'Approve Stage', 'رفض الطلب': 'Reject Request',
  'إرسال الطلب': 'Submit Request', 'بحث': 'Search', 'إضافة': 'Add', 'تعديل': 'Edit', 'حذف': 'Delete', 'حفظ': 'Save', 'إلغاء': 'Cancel',
  'إغلاق': 'Close', 'الحالة': 'Status', 'التاريخ': 'Date', 'الموظف': 'Employee', 'الكود': 'Code', 'القيمة': 'Amount', 'البيان': 'Description'
};
const nagmArabicPhrases = Object.fromEntries(Object.entries(nagmEnglishPhrases).map(([arabic, english]) => [english, arabic]));
const nagmLocaleAttributes = ['placeholder', 'aria-label', 'title'];
function translateNagmSubtree(root, phrases) {
  if (!root) return;
  const translateText = (node) => {
    const original = node.nodeValue;
    const trimmed = original.trim();
    if (!trimmed || !Object.hasOwn(phrases, trimmed)) return;
    node.nodeValue = `${original.match(/^\s*/)?.[0] || ''}${phrases[trimmed]}${original.match(/\s*$/)?.[0] || ''}`;
  };
  if (root.nodeType === Node.TEXT_NODE) translateText(root);
  else {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) translateText(walker.currentNode);
    const elements = root.nodeType === Node.ELEMENT_NODE ? [root, ...root.querySelectorAll('*')] : root.querySelectorAll?.('*') || [];
    for (const element of elements) {
      for (const attribute of nagmLocaleAttributes) {
        const value = element.getAttribute(attribute);
        if (value && Object.hasOwn(phrases, value)) element.setAttribute(attribute, phrases[value]);
      }
    }
  }
}
function applyNagmLanguage(language) {
  const english = language === 'en';
  const phrases = english ? nagmEnglishPhrases : nagmArabicPhrases;
  document.documentElement.lang = english ? 'en' : 'ar';
  document.documentElement.dir = english ? 'ltr' : 'rtl';
  document.title = english ? 'Dashboard | Najm Al-Ghadraa Contracting' : 'لوحة التحكم | نجم الغدراء للمقاولات';
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = english ? 'Najm operations system preview dashboard.' : 'معاينة لوحة تحكم نظام نجم للعمليات.';
  document.querySelectorAll('[data-language-toggle]').forEach((button) => {
    button.textContent = english ? 'AR' : 'EN';
    button.title = english ? 'العربية' : 'English';
    button.setAttribute('aria-label', english ? 'Switch to Arabic' : 'Switch to English');
  });
  translateNagmSubtree(document.body, phrases);
  document.body.classList.toggle('language-english', english);
}
let nagmCurrentLanguage = localStorage.getItem('nagm-language') === 'en' ? 'en' : 'ar';
document.querySelector('[data-language-toggle]')?.addEventListener('click', () => {
  nagmCurrentLanguage = nagmCurrentLanguage === 'ar' ? 'en' : 'ar';
  localStorage.setItem('nagm-language', nagmCurrentLanguage);
  applyNagmLanguage(nagmCurrentLanguage);
});
const nagmLanguageObserver = new MutationObserver((records) => {
  if (nagmCurrentLanguage !== 'en') return;
  for (const record of records) {
    if (record.type === 'characterData') translateNagmSubtree(record.target, nagmEnglishPhrases);
    else for (const node of record.addedNodes) translateNagmSubtree(node, nagmEnglishPhrases);
  }
});
nagmLanguageObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
if (nagmCurrentLanguage === 'en') applyNagmLanguage('en');
