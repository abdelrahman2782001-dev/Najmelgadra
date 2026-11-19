# NAGM Operations System — New Web Build

## Project instructions

Build a new web-based operations system for NAGM from the clean, dedicated local folder selected by the owner.

Use only that new folder for this project. Do not mix it with, overwrite, migrate, or delete files or data from any previous local project, GitHub repository, Cloudflare deployment, or Supabase project unless the owner gives a specific later instruction.

The owner wants to discuss the system in detail, one section at a time. Do not ask a large batch of questions. Do not make important product, workflow, permission, financial, or visual decisions by assumption. Ask a few focused questions about the current section, review any screenshots or examples the owner provides, summarize the agreed behavior and design, and then implement that section for review.

The first release is web only. Keep the architecture suitable for adding a mobile app later, but do not build a native mobile application now.

Location-ID, GPS, geofencing, or location-based attendance has been explicitly cancelled. Do not add employee GPS tracking, GPS check-in, or geofence attendance. Rental-worker preparation is entered by an authorized monitor or engineer, with a site selected from the owner-managed site list and approvals handled through the configured workflow. The exact attendance preparation and approval details must be confirmed with the owner.

The data/backend provider has not been selected. Do not create or modify cloud projects, databases, storage, Auth users, or migrations until the provider and a concrete implementation plan are reviewed and approved.

The project must be developed and tested at zero cost: no payment cards, paid tiers, paid trials, overages, paid domains, or storage subscriptions. Report the actual hosting/data regions and assess production suitability before launch approval. Keep Development, Staging, and Production isolated. Use synthetic test data only outside Production. Never put synthetic employees, attendance, payments, or files into Production.

## Product goals and modules

Build a modern, reliable, Arabic-first, RTL operations system for:

1. Dashboard
2. Company employees
3. Rental workers
4. Rental-worker preparation and attendance approvals
5. Rental-worker payroll runs and employee accounts
6. Employee overtime/additional-work records
7. Safety equipment inventory and employee receipts
8. Sites and approval workflows
9. Equipment and site costs
10. Users, roles, and permissions
11. Reports, Excel imports/exports, printing, and audit history

The owner will provide detailed rules and visual references section by section. Treat the descriptions below as the requirements already stated; treat unspecified details as open questions for the owner.

## Dashboard

Create a dashboard with clear visual charts and summary cards for:

- Active company employees
- Employees on leave
- Suspended employees

Show the count under each summary. Confirm which date range, chart types, and other summary information the owner wants before finalizing the dashboard.

## Company employees

Company employees have their own employee records and profile cards. A card should be able to show the fields the owner has requested, including:

- Name
- Employee code, if used
- National ID
- Nationality
- Religion
- Job/profession and department, where applicable
- Employment status
- Salary payment method
- Bank account number
- Sponsorship details and sponsorship number
- Site or assignment, where applicable
- Employee residence location, stored as a descriptive text field and kept separate from the work site

Provide the agreed options to view, edit, and remove employee records. Confirm whether removing an employee should archive the record instead of permanently deleting it, especially if it has historical or financial records.

Provide Excel import for company employee master data. The owner wants imported employee names to match the names used in Odoo reports. Before changing existing names or records, show an import preview, identify duplicates and unmatched rows, and confirm the matching key with the owner. Do not rely on name-only matching where duplicates are possible.

Company employee salaries are handled by an external payroll system. Do not create a company-employee payroll module and do not post company salaries or overtime into rental-worker accounts.

## Rental workers

Rental workers are separate from company employees.

Provide an Excel import template and a preview/validation step. The requested rental-worker import fields include:

- Name
- Profession
- Residency number
- Nationality
- Religion
- Residence location, stored as a descriptive text field and kept separate from the work site or assignment
- Previous assignment or “assigned before” information, if applicable
- Wage/salary
- Any additional fields agreed with the owner

Allow searchable worker lists and clear worker profiles.

Rental workers may be prepared at sites selected from a site list maintained by the owner. Engineers are not restricted to one permanently assigned site when preparing a rental worker; the engineer selects the relevant site for that preparation. Confirm how monitor and engineer assignments are displayed and what duplicate-preparation warnings are required.

## Sites and approval workflows

The owner maintains the list of work sites. Authorized engineers and monitors select from that list when preparing workers or submitting work records.

Approval sequences must be configurable by the owner, including which role or named approver is responsible for each step. Examples already requested include:

- A monitor prepares rental workers at a site; the responsible site engineer approves.
- A rental-worker direct-employment/start-work request can pass through an engineer and then a project manager, if configured.
- Overtime/additional-work records can pass from the engineer to the project manager, if configured.

The owner configures the rental-worker preparation approval chain from the preparation section. Restrict the chain editor to owner permissions. Workers and other users should see only the records and actions permitted for their role.

Prevent an approver from approving their own submission when the workflow requires independent approval. Keep a record of who submitted, approved, rejected, or changed each item and when.

## Rental-worker preparation, suspension, and direct start

The preparation area should show rental workers only. It should support searchable worker selection, the selected site, preparation date, submitting engineer/monitor, and the approval status. Show what was prepared day by day and identify duplicate preparations. **Block preparing the same worker more than once for the same date and site.**

Provide a rental-worker suspension request. An engineer submits the request, and it follows the approval sequence configured by the owner. Show whether the request is pending, approved, or rejected. In monthly rental payroll, show the worker’s status for the selected month and any related suspension request and approval state.

Provide a direct-start/work-commencement request for rental workers, with the agreed worker information and an uploaded residency image/document. Apply the owner-configured approval sequence. Confirm the precise fields, document access, and approval roles before implementation.

## Rental-worker payroll

Rental-worker payroll is for rental workers only. There is no company-employee payroll module.

For a month selected by the user, show the rental workers eligible for that month and relevant status information. The payroll list should be easy to review in rows and include, as applicable:

- Worker name
- Profession
- Site(s) where the worker was prepared
- Prepared/approved days
- Responsible engineer
- Salary or other eligible amounts
- Payable days entered for the run
- Approval and payment status

The payable days must be editable by an authorized user. For example, a worker may have 29 approved preparation days while the authorized payer enters 30 payable days. Preserve who entered or changed the payable amount and the reason if the owner requires one.

Support salary-only, selected entitlements, or all eligible entitlements as agreed with the owner. Draft payroll runs must have a delete option. Once a payroll record or financial decision is approved, preserve it with an audit trail; do not silently delete or rewrite approved financial records.

A run must go through its configured approvals. Do not post any payroll amount to a rental worker’s account before the required approval and confirmed disbursement. The authorized “Paid / تم الصرف” action should record the disbursement and then create the corresponding rental-worker account entry automatically, with the correct month and payment details. Confirm the exact separation between payroll approval and final payment confirmation with the owner.

## Rental-worker accounts

Each rental worker has an account/ledger within the rental-worker section.

Provide:

- Search by worker name
- A clear account statement showing dated entries, descriptions, debits, credits, and balance
- Authorized additions and deductions
- Excel export of the worker’s statement
- Traceability to the payroll run or adjustment that created each entry

Only rental-worker transactions belong here. Company employee salaries and overtime must never be posted to rental-worker accounts.

Approved transactions must remain auditable. Use documented reversal/correction entries for approved financial records rather than silently erasing history. Confirm who can add, approve, or pay each adjustment.

## Company employee overtime/additional work

The overtime/additional-work section is for active company employees selected by the engineer or authorized submitter. It does not create a company payroll module and must never automatically post amounts into employee or rental-worker accounts.

The requested workflow includes:

- Search and select employees
- Select the work site and date
- Enter overtime hours and/or the amount using the owner-approved rules
- Record the submitting engineer and their signature/approval mark if required
- Route the record through the configured approvals, including project manager approval if selected
- Show pending, approved, rejected, paid, and unpaid statuses

Group records by date and site. A date view should list all relevant sites for that date; selecting a site should reveal its detailed employee and overtime records. Show who submitted and approved each item, and preserve a complete action history.

Provide employee-level search so an authorized user can see all overtime/additional-work items for an employee, including approved/unapproved and paid/unpaid states. This should help with employee leave or final settlement. Let the authorized payer mark an item or selected items as paid. Show paid records distinctly, such as with the requested green status.

Provide a flexible Odoo journal/import export grouped or filtered by the date selected by the user. It should include the agreed employee names, amounts, date, and site. The owner wants to copy the exported report into Odoo. Do not integrate with or post directly to Odoo unless separately approved. Confirm the exact Odoo import columns using the owner’s sample journal workbook.

Provide flexible printing: the user can select which records appear on a printout without deleting or changing the underlying records. Show totals for paid and remaining amounts. Editing requests from engineers or project managers must follow the owner-approval process requested by the owner. Keep an audit record of edits and approval decisions.

## Safety inventory and issue receipts

Provide an inventory for safety items such as safety shoes, vests, and other owner-defined items.

The owner can define item names and opening quantities. When stock arrives, an authorized user records the received quantity and the stock balance increases. When an item is issued, stock decreases and the issue record identifies the employee, item, date, quantity, and actual recipient/receiver information requested by the owner.

Provide searchable employee selection and show prior issue history. If an employee received the same item less than three months ago, clearly warn the user. If several employees meet this condition, show all of them and let the authorized user decide whether to issue to eligible employees only, ignore the warning for selected people, or issue to everyone, according to the final rules agreed with the owner. Do not make the warning itself silently block or authorize an issue.

Provide a flexible printable issue receipt that can include only the employees/items selected by the user. The user may record the actual person who handed the item to the employee.

## Equipment and reports

Allow the owner to define equipment and a daily work rate for each item. An engineer selects the equipment used at a site. Calculate equipment cost by site and date using the approved rate and usage rules.

Provide independent reports, including:

- Company employee attendance for a selected month
- Rental-worker preparation/attendance for a selected month
- Rental-worker payroll runs and disbursements
- Overtime/additional work, with approval and payment state
- Equipment use and cost by site
- Other reports agreed with the owner

Reports must respect permissions and must not expose confidential employee documents.

## Accounts, authorization, documents, and audit

Provide user and permission management as requested by the owner, including multiple accounts, editing/deactivating accounts, and configurable permission choices for roles such as owner, project manager, engineer, monitor, and accounts staff.

The owner has reserved owner-only authority for account management and other owner-controlled actions. A general Super Admin role must not automatically receive owner-only authority. Employee credentials are created or changed by the owner only; an employee’s own account page, if provided, is read-only.

Enforce permissions on the server/database/storage layer, not only by hiding interface buttons. Include negative authorization checks for ordinary users and other administrators.

Confidential employee identity/residency documents must be stored and accessed separately from ordinary work attachments and general reports. Keep an owner-only access audit for confidential documents. Do not place confidential documents in general reports or cached employee-device data.

Maintain a comprehensive append-only audit history for important actions: record creation, edits, approvals, rejections, payment confirmation, inventory issue/receipt, imports, exports, and permission changes. Show who acted and when.

## Owner additions — returns, scale, and data integrity (2026-11-19)

- Record an employee's actual return from leave or suspension with the return date, acting account, and timestamp. Provide the action in the employee's Leave tab and in an owner/system-admin-only central “Employee Returns” page. Keep prior leave/suspension records for audit.
- Plan the eventual account and permission system to support 1,000+ accounts with multiple roles, including roughly 100 operational/admin accounts such as engineers, project managers, HR, and finance. This is a capacity requirement, not permission to create synthetic production accounts.
- Treat employee punch intake as a near-real-time path: persist each event quickly, prevent duplicate retries, associate it with stable employee/site IDs and its timestamp, and make the same record available to approved reports. Agree on a measurable response/visibility target and run load tests before claiming the target is met.
- Treat financial and employment reports as high-integrity records linked to the same source data as the operational modules. Use stable employee/account/transaction IDs and validated relationships; derive reports from one approved source of truth; preserve changes, approvals, reversals, and the actor/time in an audit trail; reconcile totals before export. Do not silently delete or rewrite approved financial or employment records.
- Keep this requirement at the design level until the backend provider is selected. The current browser-only preview is not evidence of multi-account, database, transactional, or production-scale behavior. Define report fields and calculation rules with the owner before implementing each report.

## Visual design and interaction process

The application is Arabic-first and RTL. The owner wants a very polished, modern, professional interface and will provide visual references. Ask about each page and its details separately, including layout, colors, typography, icons, card density, table behavior, empty states, and action placement. Use supplied references as visual guidance and review each section with the owner before considering its design final.

A previously discussed design direction used light/dark themes, IBM Plex Sans Arabic, refined borders, clear focus states, and lime accent #C6F432. Treat that as a starting reference to confirm with the owner section by section, not as permission to ignore new screenshots or preferences.

Use the supplied original company logo when available; do not replace it with generated lettering or a placeholder.

Make the web application responsive for desktop and mobile browsers. Do not build native mobile apps in this release. A later mobile app should be able to use the same approved APIs, authorization rules, and database.

## Backend, environment, and deployment

Before selecting a database/backend, compare viable zero-cost options for this system and present the trade-offs to the owner. Do not create duplicate data stores or connect the application to an unverified existing project.

Never expose service-role keys, database passwords, or other server secrets in browser code, GitHub, logs, or screenshots. Keep environment secrets in the appropriate local/deployment secret store.

Create a new private GitHub repository for the approved new code when the owner is ready. Cloudflare should deploy the reviewed code from that repository after the build and required checks pass. Do not publish a production release or alter existing live deployments without the owner’s explicit approval.

Keep development, staging, and production separate. Use synthetic fixtures for development and testing only. Before production, provide a readiness report with the actual selected hosting/data regions, cost confirmation, security and permission results, backup/restore plan, and unresolved risks. Production must start with only the owner account and approved baseline configuration, with no synthetic employees, attendance, payroll, or files.

## Testing and delivery

Test the important workflows end to end, including:

- Employee import and validation
- Rental-worker import
- Search and profile display
- Preparation and approval workflow
- Duplicate preparation detection
- Rental payroll approval, payment confirmation, and account posting
- Overtime submission, approvals, payment status, reports, and Odoo export
- Safety stock receipt, issue, three-month warning, and receipt printing
- Permission enforcement and audit history
- Responsive Arabic RTL pages
- Build and deployment preview

Do not claim that a feature works unless it has been tested in the environment relevant to that claim. Hosted Auth/Storage, real devices, backups, and restoration require their own verification; local tests alone do not prove production readiness.

## First steps

1. Confirm the active working directory is the new clean folder and do not touch the old project.
2. Save this brief as the project requirements baseline.
3. Summarize the already-confirmed requirements and list only the unresolved decisions.
4. Start by asking the owner which section to design first and request its screenshot/reference.
5. Work one section at a time: agree details, implement, review with the owner, then continue.
