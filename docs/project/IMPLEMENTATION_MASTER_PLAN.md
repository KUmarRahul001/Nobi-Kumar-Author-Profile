# Nobi Kumar Author Website - Implementation Master Plan
Version: 3.0.0
Last Updated: 2026-07-21
Owner: Antigravity

This document is the absolute Single Source of Truth for the execution roadmap of the Nobi Kumar Author Website. It contains 30 phases and 300 atomic tasks.

---

## Phase 0: Repository Audit & Planning Baselines
* Purpose: Prepare environment controls and verify documentation files.
* Dependencies: None | Complexity: Low | Duration: 2 hours

### Tasks
* **Task 0.1: Directory Tree Mapping**
  - *Purpose*: Verify initial project workspace layout.
  - *Prerequisites*: None
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: List directories and match architecture guidelines.
  - *Rollback*: Revert folder moves.
  - *Documentation Updates*: Update `/docs/infrastructure/` logs.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 0.2: Docs Package Verification**
  - *Purpose*: Scan all 49 files inside `/docs` to align specifications.
  - *Prerequisites*: Task 0.1
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Cross-verify functional and technical requirements.
  - *Rollback*: Revert database settings.
  - *Documentation Updates*: Update `/docs/requirements/` matrix.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 0.3: TASKLIST Setup**
  - *Purpose*: Initialize main roadmap tracker.
  - *Prerequisites*: Task 0.2
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Verify all tasks have checkboxes.
  - *Rollback*: Reset TASKLIST file.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `TASKLIST.md`.
* **Task 0.4: Decision History Log**
  - *Purpose*: Create ADR tracking records.
  - *Prerequisites*: Task 0.3
  - *Claude Skills*: `documentation`
  - *Validation*: Validate ADR-001 through ADR-005 format.
  - *Rollback*: Delete ADR indexes.
  - *DocumentationUpdates*: Update `/docs/adr/`.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 0.5: Setup Notes Mapping**
  - *Purpose*: Compile environment variables guidelines.
  - *Prerequisites*: Task 0.4
  - *Claude Skills*: `devops`
  - *Validation*: Check setup notes for missing key indicators.
  - *Rollback*: Clear setup notes.
  - *Documentation Updates*: Update setup-notes file.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 0.6: File Mappings Audit**
  - *Purpose*: Sync physical files lists.
  - *Prerequisites*: Task 0.5
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Validate that no dead files are left.
  - *Rollback*: Restore list.
  - *Documentation Updates*: Update folder structure doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 0.7: Known Issues Trace**
  - *Purpose*: Document current technical constraints.
  - *Prerequisites*: Task 0.6
  - *Claude Skills*: `troubleshooting`
  - *Validation*: Verify issues lists are accurate.
  - *Rollback*: Clear issues logs.
  - *Documentation Updates*: Update bug tracking docs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 0.8: Changelog Initialization**
  - *Purpose*: Scaffold project updates list.
  - *Prerequisites*: Task 0.7
  - *Claude Skills*: `git-workflow`
  - *Validation*: Verify format complies with Keep a Changelog.
  - *Rollback*: Delete changelog template.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/changelog.md`.
* **Task 0.9: Milestones Mapping**
  - *Purpose*: Define verification checklist targets.
  - *Prerequisites*: Task 0.8
  - *Claude Skills*: `documentation`
  - *Validation*: Verify milestones logs match PRD features.
  - *Rollback*: Clear milestones file.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/milestones.md`.
* **Task 0.10: Phase Complete Verification**
  - *Purpose*: Verify Phase 0 milestone targets.
  - *Prerequisites*: Task 0.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed checklist logs.
  - *Rollback*: Revert Phase 0 completion flag.
  - *Documentation Updates*: Update repository log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 1: Tooling Configuration & Static Analyzers
* Purpose: Establish strict quality control lint environments.
* Dependencies: Phase 0 | Complexity: Low | Duration: 4 hours

### Tasks
* **Task 1.1: Vitest Engine Configuration**
  - *Purpose*: Setup testing configurations.
  - *Prerequisites*: Task 0.10
  - *Claude Skills*: `testing`
  - *Validation*: Test runner compiles with zero modules missing.
  - *Rollback*: Delete config files.
  - *Documentation Updates*: Update `testing/` docs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 1.2: ESLint Parameters Overwrite**
  - *Purpose*: Enforce strict typings checks.
  - *Prerequisites*: Task 1.1
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Running `npm run lint` passes.
  - *Rollback*: Revert eslint.json changes.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 1.3: Prettier Setup**
  - *Purpose*: Enforce code formatting conventions.
  - *Prerequisites*: Task 1.2
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Verify formatting on test components.
  - *Rollback*: Delete prettier.json.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 1.4: Pre-commit Hooks Integration**
  - *Purpose*: Run static checks on commits.
  - *Prerequisites*: Task 1.3
  - *Claude Skills*: `devops`
  - *Validation*: Committing triggers ESLint.
  - *Rollback*: Uninstall husky hooks.
  - *Documentation Updates*: Update dev workflow doc.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 1.5: Compiler Configuration Alignment**
  - *Purpose*: Set compile-time properties inside tsconfig.
  - *Prerequisites*: Task 1.4
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Typechecks verify successful.
  - *Rollback*: Revert tsconfig config updates.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 1.6: Package Dependencies Verification**
  - *Purpose*: Clean unreferenced packages.
  - *Prerequisites*: Task 1.5
  - *Claude Skills*: `devops`
  - *Validation*: Build checks succeed.
  - *Rollback*: Restore dependencies versions.
  - *Documentation Updates*: Update dependencies log.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 1.7: Git Hygiene Rules Setup**
  - *Purpose*: Enforce clean commit formats.
  - *Prerequisites*: Task 1.6
  - *Claude Skills*: `git-workflow`
  - *Validation*: Test commit messages match conventional formats.
  - *Rollback*: Revert changes.
  - *Documentation Updates*: Update git guidelines doc.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 1.8: Environment Variables Mapping**
  - *Purpose*: Map secrets properties values.
  - *Prerequisites*: Task 1.7
  - *Claude Skills*: `security`
  - *Validation*: Environment file maps successfully.
  - *Rollback*: Revert template changes.
  - *Documentation Updates*: Update environment keys doc.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 1.9: Dev Build Engine Verification**
  - *Purpose*: Run the local development server.
  - *Prerequisites*: Task 1.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Local server runs cleanly.
  - *Rollback*: Terminate build actions.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 1.10: Phase 1 Final Audit**
  - *Purpose*: Finalize Phase 1 milestones status.
  - *Prerequisites*: Task 1.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: All lint tasks pass successfully.
  - *Rollback*: Revert milestone state.
  - *Documentation Updates*: Update verification reports.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 2: App Router Layouts & Routing Grouping
* Purpose: Configure page routes layouts.
* Dependencies: Phase 1 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 2.1: Router Folder Structuring**
  - *Purpose*: Build `(site)` nested path structures.
  - *Prerequisites*: Task 1.10
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: App routes resolve.
  - *Rollback*: Revert directories nesting.
  - *Documentation Updates*: Update routes architecture doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 2.2: Root Providers Setup**
  - *Purpose*: Inject providers layout parameters wrapper.
  - *Prerequisites*: Task 2.1
  - *Claude Skills*: `react-patterns`
  - *Validation*: Compile verifies successful.
  - *Rollback*: Delete providers file.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 2.3: Theme Settings Config**
  - *Purpose*: Enforce persistent dark mode parameters.
  - *Prerequisites*: Task 2.2
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Toggle states persist over routes reload.
  - *Rollback*: Revert dark theme config.
  - *Documentation Updates*: Update visual theme docs.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 2.4: Skip Link Accessibility Wrapper**
  - *Purpose*: Focus outlines maps for keyboard users.
  - *Prerequisites*: Task 2.3
  - *Claude Skills*: `accessibility`
  - *Validation*: Skip to content link focuses.
  - *Rollback*: Remove skip elements.
  - *DocumentationUpdates*: Update accessibility log.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 2.5: Body Fonts Settings**
  - *Purpose*: Map outfit and playfair layout parameters.
  - *Prerequisites*: Task 2.4
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Fonts compile in body classes.
  - *Rollback*: Revert font settings.
  - *Documentation Updates*: Update typography guide.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 2.6: Layout Error Boundaries Setup**
  - *Purpose*: Handle runtime execution faults.
  - *Prerequisites*: Task 2.5
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Next compiles boundaries components.
  - *Rollback*: Delete error files.
  - *Documentation Updates*: Update error handling doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 2.7: Dynamic Loading States**
  - *Purpose*: Present load visual guides.
  - *Prerequisites*: Task 2.6
  - *Claude Skills*: `react-patterns`
  - *Validation*: Loading templates compile.
  - *Rollback*: Delete loading views.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 2.8: Page Metadata Setup**
  - *Purpose*: Setup root metadata configurations.
  - *Prerequisites*: Task 2.7
  - *Claude Skills*: `seo`
  - *Validation*: Verify title tags.
  - *Rollback*: Reset metadata parameters.
  - *Documentation Updates*: Update metadata spec doc.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 2.9: Compile Test Run**
  - *Purpose*: Build validation parameters checks.
  - *Prerequisites*: Task 2.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: `npm run build` completes.
  - *Rollback*: Revert build command logic.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 2.10: Phase 2 Completion Check**
  - *Purpose*: Save milestone baseline.
  - *Prerequisites*: Task 2.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed in TASKLIST.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 3: Design System Tokens & Global CSS Styling
* Purpose: Integrate dark branding guidelines.
* Dependencies: Phase 2 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 3.1: CSS Variables Injection**
  - *Purpose*: Define custom branding color values.
  - *Prerequisites*: Task 2.10
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Check color rendering.
  - *Rollback*: Clear colors classes.
  - *Documentation Updates*: Update color variables log.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 3.2: Typography Scales Injection**
  - *Purpose*: Setup custom font-family sizing rules.
  - *Prerequisites*: Task 3.1
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Sizing outputs render cleanly.
  - *Rollback*: Revert spacing parameters.
  - *Documentation Updates*: Update typography guide.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 3.3: Outline Focus Styles**
  - *Purpose*: Focus rings indicator mapping.
  - *Prerequisites*: Task 3.2
  - *Claude Skills*: `accessibility`
  - *Validation*: Tab focuses indicator appears on links.
  - *Rollback*: Remove outline classes.
  - *Documentation Updates*: Update accessibility guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 3.4: Hover Animations Config**
  - *Purpose*: Create smooth interactive card scaling parameters.
  - *Prerequisites*: Task 3.3
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Check transitions behavior.
  - *Rollback*: Revert hover rules.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 3.5: Layout Containers Padding Setup**
  - *Purpose*: Design alignment parameters.
  - *Prerequisites*: Task 3.4
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Check column responsiveness.
  - *Rollback*: Revert container configurations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 3.6: Neutral Grays Scale Customization**
  - *Purpose*: Setup cinematic gray palette.
  - *Prerequisites*: Task 3.5
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Check contrast ratios.
  - *Rollback*: Revert grays palette.
  - *Documentation Updates*: Update color schemes doc.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 3.7: Background Blur Filters**
  - *Purpose*: Create glassmorphic elements.
  - *Prerequisites*: Task 3.6
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Blurs compile.
  - *Rollback*: Clear blur utilities.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 3.8: Print Styles Configuration**
  - *Purpose*: Support pages print readability.
  - *Prerequisites*: Task 3.7
  - *Claude Skills*: `accessibility`
  - *Validation*: Verify page prints safely.
  - *Rollback*: Remove print rules.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 3.9: Theme Transition Controls**
  - *Purpose*: Smooth lighting shifts toggle animations.
  - *Prerequisites*: Task 3.8
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Theme swaps smoothly.
  - *Rollback*: Revert transition configs.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 3.10: Phase 3 Verification**
  - *Purpose*: Check theme styling compilation parameters.
  - *Prerequisites*: Task 3.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Build checks succeed.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 4: Common Layout Components - Navbar
* Purpose: Build navigation headers.
* Dependencies: Phase 3 | Complexity: Medium | Duration: 5 hours

### Tasks
* **Task 4.1: Navbar Header Placement**
  - *Purpose*: Create header grid dimensions.
  - *Prerequisites*: Task 3.10
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Element aligns in root page.
  - *Rollback*: Delete navbar file.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 4.2: Mobile Menu Logic**
  - *Purpose*: Configure responsive layout hamburger triggers.
  - *Prerequisites*: Task 4.1
  - *Claude Skills*: `react-patterns`
  - *Validation*: Tapping hamburger reveals mobile sidebar navigation drawer.
  - *Rollback*: Revert state triggers.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 4.3: Aria Roles Configuration**
  - *Purpose*: Support screen readers.
  - *Prerequisites*: Task 4.2
  - *Claude Skills*: `accessibility`
  - *Validation*: Navigation attributes declared correctly.
  - *Rollback*: Reset aria attributes.
  - *Documentation Updates*: Update accessibility matrix.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 4.4: Nav Links Mapping**
  - *Purpose*: Connect site routes paths parameters.
  - *Prerequisites*: Task 4.3
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Links resolve correctly.
  - *Rollback*: Revert link mappings.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 4.5: Theme Toggle Button**
  - *Purpose*: Setup mode control triggers.
  - *Prerequisites*: Task 4.4
  - *Claude Skills*: `react-patterns`
  - *Validation*: State updates accurately on tap triggers.
  - *Rollback*: Remove theme buttons.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 4.6: Keyboard Focus Control**
  - *Purpose*: Standardize layout tabindexes parameters.
  - *Prerequisites*: Task 4.5
  - *Claude Skills*: `accessibility`
  - *Validation*: Outlines indication verify.
  - *Rollback*: Reset outlines properties.
  - *Documentation Updates*: Update guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 4.7: Nav Panel Testing**
  - *Purpose*: Test navbar rendering states.
  - *Prerequisites*: Task 4.6
  - *Claude Skills*: `testing`
  - *Validation*: Run test suites.
  - *Rollback*: Clear test suites.
  - *Documentation Updates*: Update component test documentation.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 4.8: Navigation Search Button Interface**
  - *Purpose*: Anchor search toggle inputs.
  - *Prerequisites*: Task 4.7
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Button rendering matches mockup profiles.
  - *Rollback*: Remove search buttons.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 4.9: Dev Build Run**
  - *Purpose*: Confirm routes build status.
  - *Prerequisites*: Task 4.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 4.10: Phase 4 Verification**
  - *Purpose*: Save milestone tracking parameter configurations.
  - *Prerequisites*: Task 4.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed checklist logs.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 5: Common Layout Components - Footer
* Purpose: Build bottom footer modules.
* Dependencies: Phase 4 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 5.1: Footer Segment Grid**
  - *Purpose*: Build footer directories grid.
  - *Prerequisites*: Task 4.10
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Alignments render properly.
  - *Rollback*: Delete footer file.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 5.2: Footer Copyright Ingestion**
  - *Purpose*: Standardize legal copyright statements.
  - *Prerequisites*: Task 5.1
  - *Claude Skills*: `documentation`
  - *Validation*: Dynamic dates render correct current year values.
  - *Rollback*: Reset copyright parameters.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 5.3: Links Sitemaps Alignment**
  - *Purpose*: Connect bottom site navigation paths.
  - *Prerequisites*: Task 5.2
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Links resolve correctly.
  - *Rollback*: Remove footer link items.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 5.4: Social Channels Links**
  - *Purpose*: Anchor social references.
  - *Prerequisites*: Task 5.3
  - *Claude Skills*: `react-patterns`
  - *Validation*: External channels map correctly.
  - *Rollback*: Clear social configurations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 5.5: Footers Accessibility**
  - *Purpose*: Check aria tags.
  - *Prerequisites*: Task 5.4
  - *Claude Skills*: `accessibility`
  - *Validation*: Confirm outlines indications.
  - *Rollback*: Revert outline classes.
  - *Documentation Updates*: Update accessibility logs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 5.6: Footer Form Placeholder**
  - *Purpose*: Align subscription wrapper borders.
  - *Prerequisites*: Task 5.5
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Confirm grids spacing parameters.
  - *Rollback*: Revert layouts properties.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 5.7: Component Unit Testing**
  - *Purpose*: Verify footer mounting.
  - *Prerequisites*: Task 5.6
  - *Claude Skills*: `testing`
  - *Validation*: Tests run successfully.
  - *Rollback*: Clear test suites.
  - *Documentation Updates*: Update test reports.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 5.8: Clean CSS Auditing**
  - *Purpose*: Clean unreferenced classes.
  - *Prerequisites*: Task 5.7
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Build checks succeed.
  - *Rollback*: Revert CSS configs.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 5.9: Layout Build Audit**
  - *Purpose*: Verify compiled layouts parameters.
  - *Prerequisites*: Task 5.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: Revert compiler variables.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 5.10: Phase 5 Completion Check**
  - *Purpose*: Log Phase 5 checklist status.
  - *Prerequisites*: Task 5.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: TASKLIST checks sync correctly.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 6: Home Page - Hero Layout & Setup
* Purpose: Build landing banner views.
* Dependencies: Phase 5 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 6.1: Hero Element Structure**
  - *Purpose*: Configure section grids.
  - *Prerequisites*: Task 5.10
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Section compiles correctly.
  - *Rollback*: Delete component configurations.
  - *Documentation Updates*: Update page layout docs.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 6.2: Headers Typography**
  - *Purpose*: Add serif fonts spacing rules.
  - *Prerequisites*: Task 6.1
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Headlines styling render correctly.
  - *Rollback*: Revert typography configs.
  - *Documentation Updates*: Update typography guidelines.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 6.3: Call to Action Button**
  - *Purpose*: Build purchase call trigger buttons.
  - *Prerequisites*: Task 6.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Tabbing to action buttons works cleanly.
  - *Rollback*: Remove button elements.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 6.4: Hero Fade In Animation**
  - *Purpose*: Add landing opacity transitions.
  - *Prerequisites*: Task 6.3
  - *Claude Skills*: `react-patterns`
  - *Validation*: Transitions execute on page loads.
  - *Rollback*: Clear animation parameters.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 6.5: Background Gradient Accents**
  - *Purpose*: Apply cinematic blur colors.
  - *Prerequisites*: Task 6.4
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Background elements align correctly.
  - *Rollback*: Clear gradient properties.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 6.6: Header Breadcrumbs Navigation**
  - *Purpose*: Link route indicators.
  - *Prerequisites*: Task 6.5
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Breadcrumbs links resolve.
  - *Rollback*: Remove breadcrumb elements.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 6.7: Responsive Margins Alignment**
  - *Purpose*: Match layouts boundaries on mobile.
  - *Prerequisites*: Task 6.6
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Grid columns scale correctly.
  - *Rollback*: Revert padding styles.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 6.8: Hero Component Unit Testing**
  - *Purpose*: Verify section rendering parameters.
  - *Prerequisites*: Task 6.7
  - *Claude Skills*: `testing`
  - *Validation*: Test runs complete cleanly.
  - *Rollback*: Delete test specs files.
  - *Documentation Updates*: Update testing report docs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 6.9: Build Compilation Check**
  - *Purpose*: Confirm route compile.
  - *Prerequisites*: Task 6.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile finishes successfully.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 6.10: Phase 6 Final Audit**
  - *Purpose*: Sync milestone state.
  - *Prerequisites*: Task 6.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Sync TASKLIST checkboxes correctly.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones list.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 7: Home Page - Featured Books
* Purpose: Construct showcase panels.
* Dependencies: Phase 6 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 7.1: Showcase Panel Scaffolding**
  - *Purpose*: Build showcase outer panels.
  - *Prerequisites*: Task 6.10
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Panels compile.
  - *Rollback*: Delete showcase components.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 7.2: Book Synopsis Details Rendering**
  - *Purpose*: Display descriptions parameters.
  - *Prerequisites*: Task 7.1
  - *Claude Skills*: `react-patterns`
  - *Validation*: Text elements load correctly.
  - *Rollback*: Clear text grids.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 7.3: Outbound Link Redirection Trigger**
  - *Purpose*: Direct buyers to Amazon/retail endpoints.
  - *Prerequisites*: Task 7.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Retail URL configurations maps accurately.
  - *Rollback*: Revert link bindings.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 7.4: Book Cover Showcase**
  - *Purpose*: Render books cover illustrations.
  - *Prerequisites*: Task 7.3
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Cover assets display.
  - *Rollback*: Clear cover image configurations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 7.5: Outlines Focus Trailing Indicators**
  - *Purpose*: Support keyboard navigators outlines.
  - *Prerequisites*: Task 7.4
  - *Claude Skills*: `accessibility`
  - *Validation*: Indicators verify cleanly.
  - *Rollback*: Remove focus classes.
  - *Documentation Updates*: Update accessibility guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 7.6: Responsive Mobile Spacings Layout**
  - *Purpose*: Format stacked lists on mobile.
  - *Prerequisites*: Task 7.5
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Screen breakpoint limits align cleanly.
  - *Rollback*: Revert padding styles.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 7.7: Featured Panel Unit Tests**
  - *Purpose*: Assert elements render accurately.
  - *Prerequisites*: Task 7.6
  - *Claude Skills*: `testing`
  - *Validation*: Test runs verify cleanly.
  - *Rollback*: Delete test specs.
  - *Documentation Updates*: Update testing report logs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 7.8: Code Quality Lint Clean**
  - *Purpose*: Clean unreferenced classes logs.
  - *Prerequisites*: Task 7.7
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Lint verifies clean.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 7.9: Page Build Validation Check**
  - *Purpose*: Check compile properties values.
  - *Prerequisites*: Task 7.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: Revert compiler metrics.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 7.10: Phase 7 Final Check**
  - *Purpose*: Set completed milestones status.
  - *Prerequisites*: Task 7.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Synchronize checklist.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 8: Book Catalog Listing View
* Purpose: Build bibliography grids.
* Dependencies: Phase 7 | Complexity: Medium | Duration: 5 hours

### Tasks
* **Task 8.1: Catalog Page Setup**
  - *Purpose*: Build routing page for bibliography.
  - *Prerequisites*: Task 7.10
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Route compiles.
  - *Rollback*: Delete path directories.
  - *Documentation Updates*: Update routes architecture doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 8.2: Dynamic Data Integration**
  - *Purpose*: Fetch books metadata from content records.
  - *Prerequisites*: Task 8.1
  - *Claude Skills*: `mdx-content`
  - *Validation*: Lists arrays populate cleanly.
  - *Rollback*: Revert data references.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 8.3: BookCard Component Build**
  - *Purpose*: Create card grid elements.
  - *Prerequisites*: Task 8.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Cards rendering matches specifications parameters.
  - *Rollback*: Delete card components.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 8.4: Formats Badges Filters**
  - *Purpose*: Show format designations tags (Kindle, Pocket FM).
  - *Prerequisites*: Task 8.3
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Correct badge highlights display.
  - *Rollback*: Clear badge configurations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 8.5: Outlines Focus Trapping**
  - *Purpose*: Traversal outline markers mapping.
  - *Prerequisites*: Task 8.4
  - *Claude Skills*: `accessibility`
  - *Validation*: Invisible outlines indicator does not occur.
  - *Rollback*: Clear focus classes.
  - *Documentation Updates*: Update accessibility guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 8.6: Grid Layout Responsiveness**
  - *Purpose*: Design multi-column layout.
  - *Prerequisites*: Task 8.5
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Verify grid columns on larger layouts.
  - *Rollback*: Revert layout sizes.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 8.7: Catalog Unit Test Suite**
  - *Purpose*: Verify page loading.
  - *Prerequisites*: Task 8.6
  - *Claude Skills*: `testing`
  - *Validation*: Test passes.
  - *Rollback*: Delete tests specs files.
  - *Documentation Updates*: Update test records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 8.8: Clean Imports Lint**
  - *Purpose*: Clean relative imports paths.
  - *Prerequisites*: Task 8.7
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Lint verifies clean.
  - *Rollback*: Revert relative imports pathways.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 8.9: Static Pre-rendering Check**
  - *Purpose*: Confirm static HTML compiling outputs.
  - *Prerequisites*: Task 8.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile check returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 8.10: Phase 8 Audit Log**
  - *Purpose*: Update state configurations milestone status.
  - *Prerequisites*: Task 8.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Synchronize TASKLIST.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 9: Book Detail Pages Mapping
* Purpose: Dynamic layout page construction.
* Dependencies: Phase 8 | Complexity: Medium | Duration: 5 hours

### Tasks
* **Task 9.1: Slug Directory Scaffolding**
  - *Purpose*: Build nested route folder `/books/[slug]`.
  - *Prerequisites*: Task 8.10
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Router recognizes slug targets.
  - *Rollback*: Delete slug folders structure.
  - *Documentation Updates*: Update routes architecture doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 9.2: Static Params Compiler Setup**
  - *Purpose*: Dynamic page index compiler keys setup.
  - *Prerequisites*: Task 9.1
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Dynamic parameters trace correctly.
  - *Rollback*: Reset dynamic route configurations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 9.3: Synopsis Panel Injection**
  - *Purpose*: Map description text grids.
  - *Prerequisites*: Task 9.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Book details fetch values accurately.
  - *Rollback*: Revert panel views.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 9.4: Retail Link Button Anchors**
  - *Purpose*: Setup Amazon redirections triggers.
  - *Prerequisites*: Task 9.3
  - *Claude Skills*: `react-patterns`
  - *Validation*: Redirection triggers click operations cleanly.
  - *Rollback*: Remove button anchors.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 9.5: Breadcrumbs Navigation Layout**
  - *Purpose*: Map hierarchical routes labels.
  - *Prerequisites*: Task 9.4
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Route indicator shows links safely.
  - *Rollback*: Remove breadcrumb headers.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 9.6: Accessibility Tab Traversal**
  - *Purpose*: Confirm visible outlines indicators are present.
  - *Prerequisites*: Task 9.5
  - *Claude Skills*: `accessibility`
  - *Validation*: Focus indicates correctly.
  - *Rollback*: Revert visible outline styling classes.
  - *Documentation Updates*: Update guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 9.7: Cover Artwork Showcase**
  - *Purpose*: Show books covers dynamically.
  - *Prerequisites*: Task 9.6
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Covers image components mount cleanly.
  - *Rollback*: Reset cover components.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 9.8: Dynamic Page Unit Tests**
  - *Purpose*: Verify page loading.
  - *Prerequisites*: Task 9.7
  - *Claude Skills*: `testing`
  - *Validation*: Test run completes cleanly.
  - *Rollback*: Delete dynamic test files.
  - *Documentation Updates*: Update testing results records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 9.9: Static HTML Output Check**
  - *Purpose*: Build verification parameter assertions.
  - *Prerequisites*: Task 9.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 9.10: Phase 9 Completion Logs**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 9.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: All tasks sync correctly.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 10: Distraction-Free Sample Reader
* Purpose: Free preview chapter reader.
* Dependencies: Phase 9 | Complexity: High | Duration: 6 hours

### Tasks
* **Task 10.1: Sample Route Scaffolding**
  - *Purpose*: Build directory path for sample reader.
  - *Prerequisites*: Task 9.10
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Router resolves preview page.
  - *Rollback*: Delete sample directory pathways.
  - *Documentation Updates*: Update routes architecture doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 10.2: Reader Layout Placement**
  - *Purpose*: Design reading panel.
  - *Prerequisites*: Task 10.1
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Confirm width limit dimensions.
  - *Rollback*: Delete reader component file.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 10.3: Font Scale Adjuster Controls**
  - *Purpose*: Implement sizing zoom actions.
  - *Prerequisites*: Task 10.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Clicking zoom actions updates body font.
  - *Rollback*: Clear sizing configs.
  - *Documentation Updates*: Update accessibility guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 10.4: Reading Progress Bar**
  - *Purpose*: Visual progress indicator.
  - *Prerequisites*: Task 10.3
  - *Claude Skills*: `react-patterns`
  - *Validation*: Scroll tracks bar fill cleanly.
  - *Rollback*: Revert scroll listener properties.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 10.5: Breadcrumbs Back Redirection**
  - *Purpose*: Link exit actions button.
  - *Prerequisites*: Task 10.4
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Clicking exit links returns to dynamic detail route.
  - *Rollback*: Revert exit buttons setup.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 10.6: Zoom Range Boundaries**
  - *Purpose*: Constrain sizing parameters (14px - 26px).
  - *Prerequisites*: Task 10.5
  - *Claude Skills*: `react-patterns`
  - *Validation*: Font zooming restricts values outside bounds.
  - *Rollback*: Revert ranges constraints.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 10.7: Reading Mode Accessibility Audits**
  - *Purpose*: Confirm screen reader visibility alerts.
  - *Prerequisites*: Task 10.6
  - *Claude Skills*: `accessibility`
  - *Validation*: Font updates are announced in real-time.
  - *Rollback*: Clear aria live notifications.
  - *Documentation Updates*: Update accessibility logs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 10.8: Excerpts Unit Testing**
  - *Purpose*: Verify scroll tracking mount behavior.
  - *Prerequisites*: Task 10.7
  - *Claude Skills*: `testing`
  - *Validation*: Test passes.
  - *Rollback*: Revert test specs files.
  - *Documentation Updates*: Update test documentation records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 10.9: Build Compilation Run**
  - *Purpose*: Verify build compilation metrics.
  - *Prerequisites*: Task 10.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 10.10: Phase 10 Check Log**
  - *Purpose*: Log Phase 10 checklist status.
  - *Prerequisites*: Task 10.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed in TASKLIST.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 11: Universe Map Data Models
* Purpose: Parse universe graph configurations.
* Dependencies: Phase 10 | Complexity: Low | Duration: 3 hours

### Tasks
* **Task 11.1: Graph Schema Contracts**
  - *Purpose*: Define node and edge interface types.
  - *Prerequisites*: Task 10.10
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Verify interface compiler assertions.
  - *Rollback*: Revert TS interface files.
  - *Documentation Updates*: Update database schema docs.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 11.2: Graph JSON Configurations Mapping**
  - *Purpose*: Scaffold nodes locations configuration maps.
  - *Prerequisites*: Task 11.1
  - *Claude Skills*: `mdx-content`
  - *Validation*: Verify JSON parses correctly on loader mounts.
  - *Rollback*: Reset manifest properties.
  - *Documentation Updates*: Update LLD design docs.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 11.3: Data Parse Utility Bindings**
  - *Purpose*: Setup parser metrics in db helper tools.
  - *Prerequisites*: Task 11.2
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Database loading parses objects array maps cleanly.
  - *Rollback*: Revert database tools updates.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 11.4: Map Relationships Config Validation**
  - *Purpose*: Confirm relational parameters exist.
  - *Prerequisites*: Task 11.3
  - *Claude Skills*: `mdx-content`
  - *Validation*: Node edges references map correctly.
  - *Rollback*: Revert relationship mappings.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 11.5: Content Mapping Unit Tests**
  - *Purpose*: Assert parser executes cleanly.
  - *Prerequisites*: Task 11.4
  - *Claude Skills*: `testing`
  - *Validation*: Verify test runs output cleanly.
  - *Rollback*: Delete schema test specs files.
  - *Documentation Updates*: Update test logs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 11.6: Dynamic Imports Cleanup**
  - *Purpose*: Remove unused files.
  - *Prerequisites*: Task 11.5
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Compile checks verify clean.
  - *Rollback*: Restore relative parameters.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 11.7: Graph Types Audits**
  - *Purpose*: Review interface rules.
  - *Prerequisites*: Task 11.6
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Verify type assertions return zero alerts.
  - *Rollback*: Revert interface parameters.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 11.8: Map Assets Optimization**
  - *Purpose*: Prevent unnecessary JSON payload sizes.
  - *Prerequisites*: Task 11.7
  - *Claude Skills*: `performance`
  - *Validation*: Config payload size under 15KB.
  - *Rollback*: Revert JSON modifications.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 11.9: Build Compilation Check**
  - *Purpose*: Confirm static routes compiles.
  - *Prerequisites*: Task 11.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Build checks succeed.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 11.10: Phase 11 Milestones Audit**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 11.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Synchronize checklist checkboxes.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 12: Universe Map SVG Interactive Graph
* Purpose: Dynamic relationships chart displays.
* Dependencies: Phase 11 | Complexity: High | Duration: 7 hours

### Tasks
* **Task 12.1: SVG Layout Placement**
  - *Purpose*: Define chart spacing coordinates dimensions.
  - *Prerequisites*: Task 11.10
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Canvas coordinates map.
  - *Rollback*: Delete graph component file.
  - *Documentation Updates*: Update component layout guide.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 12.2: Nodes SVG Elements Draw**
  - *Purpose*: Render circle tags representing nodes.
  - *Prerequisites*: Task 12.1
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Nodes rendering displays correctly.
  - *Rollback*: Remove nodes vector styling rules.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 12.3: Node Click Selection Action**
  - *Purpose*: Track selection tags variables.
  - *Prerequisites*: Task 12.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Clicking node updates details panel state.
  - *Rollback*: Revert state triggers.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 12.4: Node Link Edges Draw**
  - *Purpose*: Render relationship link vectors connecting nodes.
  - *Prerequisites*: Task 12.3
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Relationship paths link coordinate tags cleanly.
  - *Rollback*: Revert SVG link parameters.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 12.5: Interactive Hover Transitions**
  - *Purpose*: Add pointer focus highlight styling.
  - *Prerequisites*: Task 12.4
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Node vectors glow smoothly on hover focus.
  - *Rollback*: Revert animation styles.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 12.6: Filter Category Selections Controls**
  - *Purpose*: Filter nodes types dynamically.
  - *Prerequisites*: Task 12.5
  - *Claude Skills*: `react-patterns`
  - *Validation*: Tabs hide unrelated nodes.
  - *Rollback*: Remove filter tab configurations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 12.7: SVG Accessibility Screen Readers Support**
  - *Purpose*: Check aria tags inside SVG panels.
  - *Prerequisites*: Task 12.6
  - *Claude Skills*: `accessibility`
  - *Validation*: Description properties announce correctly.
  - *Rollback*: Reset aria attributes.
  - *Documentation Updates*: Update accessibility logs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 12.8: Universe Map Unit Testing**
  - *Purpose*: Verify tabs rendering states.
  - *Prerequisites*: Task 12.7
  - *Claude Skills*: `testing`
  - *Validation*: Test runs verify cleanly.
  - *Rollback*: Delete test specs.
  - *Documentation Updates*: Update test documentation records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 12.9: Page Build Validation Check**
  - *Purpose*: Verify build compilation metrics.
  - *Prerequisites*: Task 12.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: Revert compiler variables.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 12.10: Phase 12 Completion Logs**
  - *Purpose*: Log Phase 12 checklist status.
  - *Prerequisites*: Task 12.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed in TASKLIST.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 13: Universe Detail Sidebars & Drawers
* Purpose: Detail summaries slide-over panels.
* Dependencies: Phase 12 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 13.1: Details Sidebar Placement**
  - *Purpose*: Build sidebar containers grids.
  - *Prerequisites*: Task 12.10
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Alignment render checks verify correct.
  - *Rollback*: Delete sidebar component files.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 13.2: Mobile Drawers Collapsible Panel**
  - *Purpose*: Graceful layout scaling for smaller devices.
  - *Prerequisites*: Task 13.1
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Drawer collapses cleanly on widths under 768px.
  - *Rollback*: Revert responsive parameters.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 13.3: Selected Node Lore Content Map**
  - *Purpose*: Render bio data descriptions values.
  - *Prerequisites*: Task 13.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Detailed text arrays map cleanly.
  - *Rollback*: Clear content grids.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 13.4: Related Book Link Redirections**
  - *Purpose*: Link detailed bios to books profiles.
  - *Prerequisites*: Task 13.3
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Redirect indicators map correctly.
  - *Rollback*: Clear link controls.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 13.5: Close Action Drawer Toggle**
  - *Purpose*: Escape key drawer toggles close action.
  - *Prerequisites*: Task 13.4
  - *Claude Skills*: `react-patterns`
  - *Validation*: Esc closes detail drawer overlays.
  - *Rollback*: Remove keys listener controls.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 13.6: Dynamic ARIA Live Status Updates**
  - *Purpose*: Announce selected character context changes.
  - *Prerequisites*: Task 13.5
  - *Claude Skills*: `accessibility`
  - *Validation*: Screen readers voice node title updates.
  - *Rollback*: Clear aria live configs.
  - *Documentation Updates*: Update accessibility logs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 13.7: Sidebar Components Unit Tests**
  - *Purpose*: Verify elements render accurately.
  - *Prerequisites*: Task 13.6
  - *Claude Skills*: `testing`
  - *Validation*: Test runs verify cleanly.
  - *Rollback*: Delete test specs.
  - *Documentation Updates*: Update test documentation logs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 13.8: Class List Cleanup Audit**
  - *Purpose*: Clean unreferenced classes logs.
  - *Prerequisites*: Task 13.7
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Lint verifies clean.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 13.9: Page Build Run Validation**
  - *Purpose*: Confirm routes build status.
  - *Prerequisites*: Task 13.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile check returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 13.10: Phase 13 Completion Logs**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 13.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Synchronize checklist checkboxes.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 14: Chronicles Blog Indexing
* Purpose: Chronicles postings listing views.
* Dependencies: Phase 13 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 14.1: Blog Route Index Scaffolding**
  - *Purpose*: Build routing page path under `/blog`.
  - *Prerequisites*: Task 13.10
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Path resolves.
  - *Rollback*: Delete blog index folders.
  - *Documentation Updates*: Update routes architecture doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 14.2: Dynamic Posts Loader Ingestion**
  - *Purpose*: Retrieve blog frontmatter list arrays.
  - *Prerequisites*: Task 14.1
  - *Claude Skills*: `mdx-content`
  - *Validation*: Array maps render cleanly.
  - *Rollback*: Revert data loader configurations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 14.3: BlogCard Component Grid**
  - *Purpose*: Display post summaries in cards layouts.
  - *Prerequisites*: Task 14.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Render matches styling guides.
  - *Rollback*: Delete card component files.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 14.4: Category Filter Badges**
  - *Purpose*: Highlight topic badges tags.
  - *Prerequisites*: Task 14.3
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Tags format cleanly.
  - *Rollback*: Clear badge settings.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 14.5: Focus visible Indicators Outline**
  - *Purpose*: Check keyboard focus visible indications.
  - *Prerequisites*: Task 14.4
  - *Claude Skills*: `accessibility`
  - *Validation*: Visible outlines indicators show correctly on tab events.
  - *Rollback*: Clear focus indicator classes.
  - *Documentation Updates*: Update accessibility guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 14.6: Multi Column Listing View Grid**
  - *Purpose*: Layout elements positioning checks.
  - *Prerequisites*: Task 14.5
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Confirm columns layout spacing parameters.
  - *Rollback*: Revert grid sizes.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 14.7: Blog Index Page Unit Tests**
  - *Purpose*: Verify list loads dynamically.
  - *Prerequisites*: Task 14.6
  - *Claude Skills*: `testing`
  - *Validation*: Test runs complete successfully.
  - *Rollback*: Delete test specs files.
  - *Documentation Updates*: Update test logs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 14.8: Clean relative paths imports**
  - *Purpose*: Standardize alias imports mappings.
  - *Prerequisites*: Task 14.7
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Lint verifies clean.
  - *Rollback*: Revert imports pathways.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 14.9: Dev Build Run Compilation**
  - *Purpose*: Verify build compile outputs.
  - *Prerequisites*: Task 14.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 14.10: Phase 14 Audit Logs**
  - *Purpose*: Log Phase 14 checklist status.
  - *Prerequisites*: Task 14.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed in TASKLIST.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 15: Chronicles Blog Detail Layouts
* Purpose: Dynamic post details page.
* Dependencies: Phase 14 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 15.1: Dynamic Blog Slug Route Scaffold**
  - *Purpose*: Build routing folder structure at `/blog/[slug]`.
  - *Prerequisites*: Task 14.10
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Dynamic parameters resolve cleanly.
  - *Rollback*: Revert slug nested folder trees.
  - *Documentation Updates*: Update routes architecture doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 15.2: Static Params Compiler Setup**
  - *Purpose*: Pre-render dynamic post pages.
  - *Prerequisites*: Task 15.1
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Dynamic parameters trace correctly.
  - *Rollback*: Revert dynamic routes configurations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 15.3: Body Copy Text Formatting**
  - *Purpose*: Map description text elements.
  - *Prerequisites*: Task 15.2
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Book details fetch values accurately.
  - *Rollback*: Revert text style configurations.
  - *Documentation Updates*: Update typography guide.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 15.4: Post Meta Header Panel**
  - *Purpose*: Display publication dates and author tags.
  - *Prerequisites*: Task 15.3
  - *Claude Skills*: `react-patterns`
  - *Validation*: Header metadata panel mounts correctly.
  - *Rollback*: Clear header layout components.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 15.5: Exit Path Breadcrumbs**
  - *Purpose*: Link routes hierarchy.
  - *Prerequisites*: Task 15.4
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Clicking links returns to blog feed listing route.
  - *Rollback*: Remove breadcrumb elements.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 15.6: Accessibility Outlines indications check**
  - *Purpose*: Visible focus outlines mapping checks.
  - *Prerequisites*: Task 15.5
  - *Claude Skills*: `accessibility`
  - *Validation*: Focus outlines display correctly.
  - *Rollback*: Revert focus outline styling classes.
  - *Documentation Updates*: Update guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 15.7: Cover Illustrations Container**
  - *Purpose*: Show dynamic post headers.
  - *Prerequisites*: Task 15.6
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Image components mount cleanly.
  - *Rollback*: Reset cover components.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 15.8: Detail Page Unit Tests**
  - *Purpose*: Verify page loading.
  - *Prerequisites*: Task 15.7
  - *Claude Skills*: `testing`
  - *Validation*: Test run completes cleanly.
  - *Rollback*: Delete dynamic test files.
  - *Documentation Updates*: Update testing results records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 15.9: Static HTML Output Check**
  - *Purpose*: Build validation parameter assertions.
  - *Prerequisites*: Task 15.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 15.10: Phase 15 Completion Logs**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 15.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: All tasks sync correctly.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 16: Supabase Comments Schema Configuration
* Purpose: Database tables configurations.
* Dependencies: Phase 15 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 16.1: SQL Migration Script Setup**
  - *Purpose*: Configure comments table schemas.
  - *Prerequisites*: Task 15.10
  - *Claude Skills*: `supabase`
  - *Validation*: SQL syntax parses.
  - *Rollback*: Delete migration SQL script.
  - *Documentation Updates*: Update database schema docs.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 16.2: Table Indexes Mapping**
  - *Purpose*: Fast indexing of post IDs.
  - *Prerequisites*: Task 16.1
  - *Claude Skills*: `database-design`
  - *Validation*: Indexes mapping compiles.
  - *Rollback*: Drop SQL index keys references.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 16.3: Row-Level Security Rules**
  - *Purpose*: Enforce read/insert restrictions.
  - *Prerequisites*: Task 16.2
  - *Claude Skills*: `security`
  - *Validation*: Public is restricted to approved comments.
  - *Rollback*: Disable table RLS parameters.
  - *Documentation Updates*: Update security guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 16.4: Pending State Constraint**
  - *Purpose*: Default comments state to pending.
  - *Prerequisites*: Task 16.3
  - *Claude Skills*: `database-design`
  - *Validation*: Default check returns pending state.
  - *Rollback*: Revert constraints rules.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 16.5: Schema Migration Tests Suite**
  - *Purpose*: Assert insert properties validations.
  - *Prerequisites*: Task 16.4
  - *Claude Skills*: `testing`
  - *Validation*: Verify migration runs with zero warnings.
  - *Rollback*: Drop database schemas.
  - *Documentation Updates*: Update test documentation records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 16.6: Moderation Status Checks**
  - *Purpose*: Validate approved lists selectors.
  - *Prerequisites*: Task 16.5
  - *Claude Skills*: `supabase`
  - *Validation*: Check status filters return correct results.
  - *Rollback*: Reset queries filters.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 16.7: Admin Actions Controls Mapping**
  - *Purpose*: Setup administrator full access scopes.
  - *Prerequisites*: Task 16.6
  - *Claude Skills*: `security`
  - *Validation*: Admins verify bypass successfully.
  - *Rollback*: Clear admin permissions configurations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 16.8: RLS Integration Verifications**
  - *Purpose*: Test security boundaries.
  - *Prerequisites*: Task 16.7
  - *Claude Skills*: `security`
  - *Validation*: Unauthorized inserts fail safely.
  - *Rollback*: None.
  - *Documentation Updates*: Update security logs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 16.9: Build Compilation Check**
  - *Purpose*: Verify build compile outputs.
  - *Prerequisites*: Task 16.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 16.10: Phase 16 Complete Verification**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 16.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Synchronize checklist checkboxes.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 17: Comments Insertion API Sanitizers
* Purpose: Clean input fields content.
* Dependencies: Phase 16 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 17.1: API Path Scaffolding**
  - *Purpose*: Build routing folder `src/app/api/comments/`.
  - *Prerequisites*: Task 16.10
  - *Claude Skills*: `api-design`
  - *Validation*: Next compiles API route.
  - *Rollback*: Delete API directories.
  - *Documentation Updates*: Update routes architecture doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 17.2: Request Parser Handler**
  - *Purpose*: Parse POST parameters objects.
  - *Prerequisites*: Task 17.1
  - *Claude Skills*: `api-design`
  - *Validation*: Handlers read inputs successfully.
  - *Rollback*: Clear handler controls.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 17.3: Input Stripping Regex Purger**
  - *Purpose*: Strip HTML tags inside comment body.
  - *Prerequisites*: Task 17.2
  - *Claude Skills*: `security`
  - *Validation*: Body strips markup symbols safely.
  - *Rollback*: Remove regex purgers.
  - *Documentation Updates*: Update security guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 17.4: Empty State Form Validation**
  - *Purpose*: Verify non-empty comment submissions.
  - *Prerequisites*: Task 17.3
  - *Claude Skills*: `api-design`
  - *Validation*: Submitting empty strings returns warnings.
  - *Rollback*: Revert state validations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 17.5: Gravatar MD5 Hash Config**
  - *Purpose*: Secure emails representation using Gravatar.
  - *Prerequisites*: Task 17.4
  - *Claude Skills*: `security`
  - *Validation*: Confirm MD5 outputs format correctly.
  - *Rollback*: Revert hashes integrations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 17.6: Supabase Anon Client Hook**
  - *Purpose*: Securely insert payloads to database tables.
  - *Prerequisites*: Task 17.5
  - *Claude Skills*: `supabase`
  - *Validation*: Verify database inserts success.
  - *Rollback*: Revert client configurations.
  - *Documentation Updates*: Update database schema docs.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 17.7: API Unit Test Suite**
  - *Purpose*: Assert route responses parameters.
  - *Prerequisites*: Task 17.6
  - *Claude Skills*: `testing`
  - *Validation*: Vitest runs check clean.
  - *Rollback*: Delete test specs files.
  - *Documentation Updates*: Update test documentation records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 17.8: Build Compilation Test Run**
  - *Purpose*: Verify build compiler outputs.
  - *Prerequisites*: Task 17.7
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 17.9: API Endpoints Audit**
  - *Purpose*: Confirm routes validations.
  - *Prerequisites*: Task 17.8
  - *Claude Skills*: `api-design`
  - *Validation*: Confirm endpoint returns 400 on malformed payloads.
  - *Rollback*: None.
  - *Documentation Updates*: Update API reference docs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 17.10: Phase 17 Completion Logs**
  - *Purpose*: Log Phase 17 checklist status.
  - *Prerequisites*: Task 17.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed in TASKLIST.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 18: Client Comments Input Panel
* Purpose: Form panels widgets views.
* Dependencies: Phase 17 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 18.1: Comments Panel Setup**
  - *Purpose*: Build input form UI component layout grids.
  - *Prerequisites*: Task 17.10
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Element aligns correctly.
  - *Rollback*: Delete comment section file.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 18.2: Comments Form Sizing Controls**
  - *Purpose*: Align width margins for mobile views.
  - *Prerequisites*: Task 18.1
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Grid forms scale correctly on screens.
  - *Rollback*: Revert padding styles.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 18.3: Comments Submission Handlers**
  - *Purpose*: Submit input data to API endpoints.
  - *Prerequisites*: Task 18.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Submitting triggers pending status.
  - *Rollback*: Clear state hooks.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 18.4: Inline Warning Alerts**
  - *Purpose*: Highlight verification warnings states.
  - *Prerequisites*: Task 18.3
  - *Claude Skills*: `react-patterns`
  - *Validation*: Warning panels mount on invalid inputs.
  - *Rollback*: Clear status elements.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 18.5: Comments Feed Render**
  - *Purpose*: List approved comments chronological streams.
  - *Prerequisites*: Task 18.4
  - *Claude Skills*: `react-patterns`
  - *Validation*: Output fetches approved comments array maps.
  - *Rollback*: Clear listing layouts.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 18.6: Focus indications visible outlines check**
  - *Purpose*: Keyboard visible outlines verification.
  - *Prerequisites*: Task 18.5
  - *Claude Skills*: `accessibility`
  - *Validation*: Outline checks verify cleanly.
  - *Rollback*: Revert outline focus styling classes.
  - *Documentation Updates*: Update accessibility guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 18.7: Form Components Unit Tests**
  - *Purpose*: Verify elements render accurately.
  - *Prerequisites*: Task 18.6
  - *Claude Skills*: `testing`
  - *Validation*: Test runs verify cleanly.
  - *Rollback*: Delete test specs.
  - *Documentation Updates*: Update test records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 18.8: Class List Cleanup Audit**
  - *Purpose*: Clean unreferenced classes logs.
  - *Prerequisites*: Task 18.7
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Lint verifies clean.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 18.9: Page Build Validation Check**
  - *Purpose*: Verify build compilation metrics.
  - *Prerequisites*: Task 18.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 18.10: Phase 18 Completion Logs**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 18.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed in TASKLIST.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 19: Static Search Index Parser
* Purpose: Compile local query lists.
* Dependencies: Phase 18 | Complexity: Low | Duration: 3 hours

### Tasks
* **Task 19.1: Search Properties Interface Contracts**
  - *Purpose*: Define search entries type schemas.
  - *Prerequisites*: Task 18.10
  - *Claude Skills*: `typescript-standards`
  - *Validation*: TS interfaces verify cleanly.
  - *Rollback*: Revert interface changes.
  - *Documentation Updates*: Update database schemas doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 19.2: Frontmatter Extract Utility**
  - *Purpose*: Retrieve title and content parameters.
  - *Prerequisites*: Task 19.1
  - *Claude Skills*: `mdx-content`
  - *Validation*: Index keys map successfully.
  - *Rollback*: Clear parser tools config changes.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 19.3: Search Data File Generator**
  - *Purpose*: Build local search index configuration maps.
  - *Prerequisites*: Task 19.2
  - *Claude Skills*: `mdx-content`
  - *Validation*: Confirm output entries list compiles.
  - *Rollback*: Revert list configurations.
  - *Documentation Updates*: Update LLD design docs.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 19.4: Search Query Matching Algorithm**
  - *Purpose*: Run local string checks logic.
  - *Prerequisites*: Task 19.3
  - *Claude Skills*: `typescript-standards`
  - *Validation*: String matching finds titles maps accurately.
  - *Rollback*: Clear queries methods.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 19.5: Search Parser Unit Tests**
  - *Purpose*: Verify query execution outcomes.
  - *Prerequisites*: Task 19.4
  - *Claude Skills*: `testing`
  - *Validation*: Verify test runs complete cleanly.
  - *Rollback*: Revert test specs files.
  - *Documentation Updates*: Update test logs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 19.6: Search Index Payload Check**
  - *Purpose*: Keep size minimal.
  - *Prerequisites*: Task 19.5
  - *Claude Skills*: `performance`
  - *Validation*: Payload remains under 20KB.
  - *Rollback*: Revert optimizations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 19.7: Build Compile Audit**
  - *Purpose*: Confirm compilation.
  - *Prerequisites*: Task 19.6
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Build checks succeed.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 19.8: Search Layout Clean**
  - *Purpose*: Standardize spacing on query cards.
  - *Prerequisites*: Task 19.7
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Rendering alignment verifies cleanly.
  - *Rollback*: Revert styling classes.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 19.9: Clean Code Quality Audit**
  - *Purpose*: Remove unused packages.
  - *Prerequisites*: Task 19.8
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Compiler returns zero warnings.
  - *Rollback*: Restore parameters.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 19.10: Phase 19 Completion State**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 19.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Synchronize checklist checkboxes.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 20: Search Overlay Input Controls
* Purpose: Interactive search overlay dialogs.
* Dependencies: Phase 19 | Complexity: High | Duration: 5 hours

### Tasks
* **Task 20.1: Search Container Layout**
  - *Purpose*: Create dialog layout structures.
  - *Prerequisites*: Task 19.10
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Dialog compiles correctly.
  - *Rollback*: Delete overlay component configurations.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 20.2: Search Keyboard Trap Action**
  - *Purpose*: Focus trap boundaries setup.
  - *Prerequisites*: Task 20.1
  - *Claude Skills*: `accessibility`
  - *Validation*: Focus cycles only inside inputs panel.
  - *Rollback*: Clear focus listener hooks.
  - *Documentation Updates*: Update accessibility guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 20.3: Search Query Key Trigger**
  - *Purpose*: Trigger overlays close action on Esc.
  - *Prerequisites*: Task 20.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Pressing Escape closes overlay dialogs.
  - *Rollback*: Revert Esc keys handles setup.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 20.4: Search Query Results List**
  - *Purpose*: Render matches profiles details dynamically.
  - *Prerequisites*: Task 20.3
  - *Claude Skills*: `react-patterns`
  - *Validation*: Dynamic queries match targets cleanly.
  - *Rollback*: Clear results panels variables.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 20.5: Arrows Keys Navigation Index**
  - *Purpose*: Traversal controls without mouse pointer keys.
  - *Prerequisites*: Task 20.4
  - *Claude Skills*: `accessibility`
  - *Validation*: Up/Down arrows select lists indices.
  - *Rollback*: Clear arrow key listener maps.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 20.6: Dynamic ARIA Live Alerts**
  - *Purpose*: Announce count of results found.
  - *Prerequisites*: Task 20.5
  - *Claude Skills*: `accessibility`
  - *Validation*: Screen readers voice results count.
  - *Rollback*: Clear live status notifications.
  - *Documentation Updates*: Update accessibility logs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 20.7: Overlay Component Unit Tests**
  - *Purpose*: Verify focus toggles logic.
  - *Prerequisites*: Task 20.6
  - *Claude Skills*: `testing`
  - *Validation*: Test runs verify cleanly.
  - *Rollback*: Delete test specs.
  - *Documentation Updates*: Update test documentation records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 20.8: Class List Alignment**
  - *Purpose*: Spacings checks.
  - *Prerequisites*: Task 20.7
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Check alignments boundaries.
  - *Rollback*: Revert CSS configs.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 20.9: Page Build Validation Check**
  - *Purpose*: Verify build compilation metrics.
  - *Prerequisites*: Task 20.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 20.10: Phase 20 Completion State**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 20.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed in TASKLIST.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 21: Newsletter Subscription Database Setup
* Purpose: Newsletter subscribers database.
* Dependencies: Phase 20 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 21.1: Database Migration Setup**
  - *Purpose*: Scaffold subscribers table configurations.
  - *Prerequisites*: Task 20.10
  - *Claude Skills*: `supabase`
  - *Validation*: Migration parses cleanly.
  - *Rollback*: Delete database tables.
  - *Documentation Updates*: Update database schemas doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 21.2: RLS Policies Setup**
  - *Purpose*: Configure select and insert access.
  - *Prerequisites*: Task 21.1
  - *Claude Skills*: `security`
  - *Validation*: Verify database inserts success.
  - *Rollback*: Revert RLS properties.
  - *Documentation Updates*: Update security guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 21.3: Active Status Default Constraint**
  - *Purpose*: Default status to active on insert.
  - *Prerequisites*: Task 21.2
  - *Claude Skills*: `database-design`
  - *Validation*: Status maps active automatically.
  - *Rollback*: Revert constraint.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 21.4: Database Table Indexing**
  - *Purpose*: Speed index on email column.
  - *Prerequisites*: Task 21.3
  - *Claude Skills*: `database-design`
  - *Validation*: Index keys map.
  - *Rollback*: Revert database indices.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 21.5: Schema Verification Testing**
  - *Purpose*: Validate insertion behavior.
  - *Prerequisites*: Task 21.4
  - *Claude Skills*: `testing`
  - *Validation*: SQL executions check clean.
  - *Rollback*: Revert SQL schema additions.
  - *Documentation Updates*: Update test documentation records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 21.6: Insertion Permissions Verification**
  - *Purpose*: Check anonymous users inserts bounds.
  - *Prerequisites*: Task 21.5
  - *Claude Skills*: `security`
  - *Validation*: Unauthorized selects block.
  - *Rollback*: Reset permissions.
  - *Documentation Updates*: Update security logs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 21.7: Email Columns Length Limit**
  - *Purpose*: Restrict character storage limits.
  - *Prerequisites*: Task 21.6
  - *Claude Skills*: `database-design`
  - *Validation*: Malformed entries size check rejects.
  - *Rollback*: Revert parameters size configs.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 21.8: Database Performance Verifications**
  - *Purpose*: Verify query execution speed.
  - *Prerequisites*: Task 21.7
  - *Claude Skills*: `performance`
  - *Validation*: Indexes query latency under 10ms.
  - *Rollback*: Revert optimizations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 21.9: Build Compilation Check**
  - *Purpose*: Confirm static routes compile.
  - *Prerequisites*: Task 21.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Build checks succeed.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 21.10: Phase 21 Complete Verification**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 21.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Synchronize checklist checkboxes.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 22: Footer Newsletter Signup Widget
* Purpose: User signup forms widgets views.
* Dependencies: Phase 21 | Complexity: Low | Duration: 3 hours

### Tasks
* **Task 22.1: Email Captures Input Field**
  - *Purpose*: Create form layout fields.
  - *Prerequisites*: Task 21.10
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Form compiles correctly.
  - *Rollback*: Delete components files.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 22.2: Email Address Pattern Validation**
  - *Purpose*: Verify format constraints.
  - *Prerequisites*: Task 22.1
  - *Claude Skills*: `react-patterns`
  - *Validation*: Checking invalid inputs returns warnings.
  - *Rollback*: Revert regex check setups.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 22.3: Form Submission Controls Handler**
  - *Purpose*: Connect submission data calls.
  - *Prerequisites*: Task 22.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Submit trigger sends parameters.
  - *Rollback*: Revert state properties.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 22.4: Postgres Unique Constraint Code Handler**
  - *Purpose*: Handle duplicate email signups gracefully.
  - *Prerequisites*: Task 22.3
  - *Claude Skills*: `supabase`
  - *Validation*: Duplicate entries return correct warnings.
  - *Rollback*: Revert warning blocks.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 22.5: Forms Accessibility Labels**
  - *Purpose*: Enforce distinct label screen reader tags.
  - *Prerequisites*: Task 22.4
  - *Claude Skills*: `accessibility`
  - *Validation*: Label checks verify cleanly.
  - *Rollback*: Revert outline classes.
  - *Documentation Updates*: Update accessibility guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 22.6: Layout Margins Alignments**
  - *Purpose*: Align width margins for mobile views.
  - *Prerequisites*: Task 22.5
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Forms align properly on smaller viewports.
  - *Rollback*: Revert responsive styles.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 22.7: Forms Component Unit Tests**
  - *Purpose*: Assert email parsing success.
  - *Prerequisites*: Task 22.6
  - *Claude Skills*: `testing`
  - *Validation*: Test runs verify cleanly.
  - *Rollback*: Delete test specs.
  - *Documentation Updates*: Update test documentation logs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 22.8: Unused Classes Purging**
  - *Purpose*: Clean unreferenced classes logs.
  - *Prerequisites*: Task 22.7
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Lint verifies clean.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 22.9: Page Build Validation Check**
  - *Purpose*: Verify build compilation metrics.
  - *Prerequisites*: Task 22.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 22.10: Phase 22 Completion Logs**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 22.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed in TASKLIST.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 23: Contact Form Database Configuration
* Purpose: Contact messages database.
* Dependencies: Phase 22 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 23.1: Database Migration Setup**
  - *Purpose*: Scaffold messages table configurations.
  - *Prerequisites*: Task 22.10
  - *Claude Skills*: `supabase`
  - *Validation*: Migration parses cleanly.
  - *Rollback*: Delete database tables.
  - *Documentation Updates*: Update database schemas doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 23.2: RLS Policies Setup**
  - *Purpose*: Configure select and insert access bounds.
  - *Prerequisites*: Task 23.1
  - *Claude Skills*: `security`
  - *Validation*: Verify database inserts success.
  - *Rollback*: Revert RLS properties.
  - *DocumentationUpdates*: Update security guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 23.3: Unread Status Default Constraint**
  - *Purpose*: Default status to unread on insert.
  - *Prerequisites*: Task 23.2
  - *Claude Skills*: `database-design`
  - *Validation*: Status maps unread automatically.
  - *Rollback*: Revert constraint.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 23.4: Table Indexing**
  - *Purpose*: Speed index on status column.
  - *Prerequisites*: Task 23.3
  - *Claude Skills*: `database-design`
  - *Validation*: Index keys map.
  - *Rollback*: Revert database indices.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 23.5: Schema Verification Testing**
  - *Purpose*: Validate insertion behavior.
  - *Prerequisites*: Task 23.4
  - *Claude Skills*: `testing`
  - *Validation*: SQL executions check clean.
  - *Rollback*: Revert SQL schema additions.
  - *Documentation Updates*: Update test documentation records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 23.6: Insertion Permissions Verification**
  - *Purpose*: Check anonymous users inserts bounds.
  - *Prerequisites*: Task 23.5
  - *Claude Skills*: `security`
  - *Validation*: Unauthorized selects block.
  - *Rollback*: Reset permissions.
  - *Documentation Updates*: Update security logs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 23.7: Text Columns Length Limit**
  - *Purpose*: Restrict character storage limits.
  - *Prerequisites*: Task 23.6
  - *Claude Skills*: `database-design`
  - *Validation*: Malformed entries size check rejects.
  - *Rollback*: Revert parameters size configs.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 23.8: Database Performance Verifications**
  - *Purpose*: Verify query execution speed.
  - *Prerequisites*: Task 23.7
  - *Claude Skills*: `performance`
  - *Validation*: Indexes query latency under 10ms.
  - *Rollback*: Revert optimizations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 23.9: Build Compilation Check**
  - *Purpose*: Confirm static routes compile.
  - *Prerequisites*: Task 23.8
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Build checks succeed.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 23.10: Phase 23 Complete Verification**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 23.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Synchronize checklist checkboxes.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 24: Contact Form Client Page
* Purpose: Communication forms templates.
* Dependencies: Phase 23 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 24.1: Dynamic Contact Route Scaffolding**
  - *Purpose*: Build routing folder structure at `/contact`.
  - *Prerequisites*: Task 23.10
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Path resolves.
  - *Rollback*: Delete contact index folder.
  - *Documentation Updates*: Update routes architecture doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 24.2: Name and Email Inputs**
  - *Purpose*: Create form layout fields.
  - *Prerequisites*: Task 24.1
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Form compiles correctly.
  - *Rollback*: Delete component files.
  - *Documentation Updates*: Update components map.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 24.3: Subject and Body Textareas**
  - *Purpose*: Define multiline inputs parameters.
  - *Prerequisites*: Task 24.2
  - *Claude Skills*: `react-patterns`
  - *Validation*: Confirm sizing parameters.
  - *Rollback*: Revert textstyle layout configs.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 24.4: Email Pattern Verification**
  - *Purpose*: Verify format constraints.
  - *Prerequisites*: Task 24.3
  - *Claude Skills*: `react-patterns`
  - *Validation*: Checking invalid inputs returns warnings.
  - *Rollback*: Revert check setups.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 24.5: Text String sanitization**
  - *Purpose*: Purge markup tags.
  - *Prerequisites*: Task 24.4
  - *Claude Skills*: `security`
  - *Validation*: Check sanitizers clean inputs.
  - *Rollback*: Revert validation checks.
  - *Documentation Updates*: Update security guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 24.6: Database Insert Integration**
  - *Purpose*: Submit contact messages data.
  - *Prerequisites*: Task 24.5
  - *Claude Skills*: `supabase`
  - *Validation*: Validate dynamic database writes.
  - *Rollback*: Revert client connection parameters.
  - *Documentation Updates*: Update database schema docs.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 24.7: Forms Accessibility Labels**
  - *Purpose*: Enforce visible tabindexes indications.
  - *Prerequisites*: Task 24.6
  - *Claude Skills*: `accessibility`
  - *Validation*: Outline checks verify cleanly.
  - *Rollback*: Revert focus outline classes.
  - *Documentation Updates*: Update accessibility guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 24.8: Form Page Unit Tests**
  - *Purpose*: Verify message submissions.
  - *Prerequisites*: Task 24.7
  - *Claude Skills*: `testing`
  - *Validation*: Test runs verify cleanly.
  - *Rollback*: Delete test specs.
  - *Documentation Updates*: Update test documentation records.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 24.9: Clean Code Quality Audit**
  - *Purpose*: Clean unreferenced classes logs.
  - *Prerequisites*: Task 24.8
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Lint verifies clean.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 24.10: Phase 24 Completion Logs**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 24.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Confirm all tasks completed in TASKLIST.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 25: SEO & Structured Schema Injections
* Purpose: Standardize metadata attributes.
* Dependencies: Phase 24 | Complexity: Medium | Duration: 5 hours

### Tasks
* **Task 25.1: Structured Book Schema Mapping**
  - *Purpose*: Inject JSON-LD Book properties inside dynamic route.
  - *Prerequisites*: Task 24.10
  - *Claude Skills*: `seo`
  - *Validation*: Check schema parsing outputs.
  - *Rollback*: Clear schema blocks.
  - *Documentation Updates*: Update search schemas doc.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 25.2: Structured BlogPosting Schema Mapping**
  - *Purpose*: Inject JSON-LD BlogPosting properties inside dynamic path.
  - *Prerequisites*: Task 25.1
  - *Claude Skills*: `seo`
  - *Validation*: Verify details page layout compiles.
  - *Rollback*: Revert dynamic schema config.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 25.3: Dynamic OpenGraph Metadata Resolution**
  - *Purpose*: Set dynamically resolved parameters inside routers.
  - *Prerequisites*: Task 25.2
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: OpenGraph values display on routes headers.
  - *Rollback*: Clear dynamic properties.
  - *Documentation Updates*: Update metadata spec doc.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 25.4: Canonical URLs Setup**
  - *Purpose*: Enforce distinct page URL domains.
  - *Prerequisites*: Task 25.3
  - *Claude Skills*: `seo`
  - *Validation*: Verification of indexation tags.
  - *Rollback*: Revert canonical mappings.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 25.5: Dynamic Sitemap Generation Setup**
  - *Purpose*: Auto sitemap indexing maps layout configuration.
  - *Prerequisites*: Task 25.4
  - *Claude Skills*: `seo`
  - *Validation*: Sitemap lists routes cleanly.
  - *Rollback*: Delete sitemaps routes.
  - *Documentation Updates*: Update sitemaps docs.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 25.6: Robots.txt Setup**
  - *Purpose*: Indexation preferences setup.
  - *Prerequisites*: Task 25.5
  - *Claude Skills*: `seo`
  - *Validation*: Robots file is readable.
  - *Rollback*: Delete robots file.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 25.7: Structured Schemas Unit Testing**
  - *Purpose*: Verify markup validations.
  - *Prerequisites*: Task 25.6
  - *Claude Skills*: `testing`
  - *Validation*: Verification passes cleanly.
  - *Rollback*: Revert test specs.
  - *Documentation Updates*: Update testing logs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 25.8: Build Compilation Test Run**
  - *Purpose*: Confirm static routes compile.
  - *Prerequisites*: Task 25.7
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Build checks succeed.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 25.9: SEO Metadata Review Audit**
  - *Purpose*: Confirm requirements.
  - *Prerequisites*: Task 25.8
  - *Claude Skills*: `seo`
  - *Validation*: Verify sitemap links match site paths.
  - *Rollback*: Revert modifications.
  - *Documentation Updates*: Update indexing matrices.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 25.10: Phase 25 Complete Verification**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 25.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Synchronize checklist checkboxes.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 26: Accessibility Visible Focus Verification
* Purpose: Visible focus outline traversal.
* Dependencies: Phase 25 | Complexity: Low | Duration: 3 hours

### Tasks
* **Task 26.1: Focus Ring Indicators Audit**
  - *Purpose*: Scan buttons and layout controls.
  - *Prerequisites*: Task 25.10
  - *Claude Skills*: `accessibility`
  - *Validation*: Interactive blocks indicator shows outlines.
  - *Rollback*: Revert outline classes.
  - *Documentation Updates*: Update accessibility rules.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 26.2: Tabindexes Mappings Review**
  - *Purpose*: Validate keyboard focus order.
  - *Prerequisites*: Task 26.1
  - *Claude Skills*: `accessibility`
  - *Validation*: Traversal path executes logically.
  - *Rollback*: Revert focus outline index tags.
  - *Documentation Updates*: Update guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 26.3: Heading Hierarchy Audits**
  - *Purpose*: Enforce distinct structural header tag sequences.
  - *Prerequisites*: Task 26.2
  - *Claude Skills*: `accessibility`
  - *Validation*: Document outlines verify clean.
  - *Rollback*: Revert semantic styling adjustments.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 26.4: Image Alt Parameters Checks**
  - *Purpose*: Confirm alt description exists.
  - *Prerequisites*: Task 26.3
  - *Claude Skills*: `accessibility`
  - *Validation*: Check alt description content.
  - *Rollback*: Clear alt text updates.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 26.5: Interactive Dialog Focus Lock Trap**
  - *Purpose*: Trap modal overlays focus.
  - *Prerequisites*: Task 26.4
  - *Claude Skills*: `accessibility`
  - *Validation*: Esc closes search overlays.
  - *Rollback*: Remove overlay keyboard focus listener hooks.
  - *Documentation Updates*: Update search spec doc.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 26.6: Colors Contrast Audits**
  - *Purpose*: Confirm visual readability text guides.
  - *Prerequisites*: Task 26.5
  - *Claude Skills*: `accessibility`
  - *Validation*: Check contrast guidelines metrics.
  - *Rollback*: Revert color grays.
  - *Documentation Updates*: Update color guides.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 26.7: Accessibility Unit Verification**
  - *Purpose*: Verify element traversal outcomes.
  - *Prerequisites*: Task 26.6
  - *Claude Skills*: `testing`
  - *Validation*: Automated checks return clean lists.
  - *Rollback*: Revert test scripts.
  - *Documentation Updates*: Update accessibility logs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 26.8: Compiler Warnings Purging**
  - *Purpose*: Verify build compile parameters.
  - *Prerequisites*: Task 26.7
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Build checks succeed.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 26.9: Responsive Margins Review**
  - *Purpose*: Verify layout boundaries on smaller viewports.
  - *Prerequisites*: Task 26.8
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Mobile breakpoints align.
  - *Rollback*: Revert layouts.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 26.10: Phase 26 Complete State**
  - *Purpose*: Log Phase 26 checklist status.
  - *Prerequisites*: Task 26.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Sync TASKLIST checkboxes correctly.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 27: Performance Bundle Checks
* Purpose: Check target JS file sizes.
* Dependencies: Phase 26 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 27.1: Build Bundle Chunk Checks**
  - *Purpose*: Verify JavaScript package sizes parameters.
  - *Prerequisites*: Task 26.10
  - *Claude Skills*: `performance`
  - *Validation*: Overall bundle conforms to under 200KB limits.
  - *Rollback*: Revert heavy library updates.
  - *Documentation Updates*: Update performance log.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 27.2: Code Splitting Mappings**
  - *Purpose*: Lazy-load large component models dynamically.
  - *Prerequisites*: Task 27.1
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Confirm page chunks sizes map correctly.
  - *Rollback*: Revert dynamic imports.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 27.3: Dynamic Image Transformations Setup**
  - *Purpose*: Add layout responsive height parameters.
  - *Prerequisites*: Task 27.2
  - *Claude Skills*: `ui-design-system`
  - *Validation*: Verify image sizing checks render cleanly.
  - *Rollback*: Clear dynamic images size configurations.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 27.4: Link Prefetching Configuration**
  - *Purpose*: Prefetch target static routes pages.
  - *Prerequisites*: Task 27.3
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Navigation loads instantly.
  - *Rollback*: Revert prefetch properties.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 27.5: Compiler Optimization Review**
  - *Purpose*: Remove console log calls.
  - *Prerequisites*: Task 27.4
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Confirm build files parameters.
  - *Rollback*: Restore log calls.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 27.6: Performance Audit Unit Verification**
  - *Purpose*: Assert elements load check metrics.
  - *Prerequisites*: Task 27.5
  - *Claude Skills*: `testing`
  - *Validation*: Verification passes cleanly.
  - *Rollback*: Revert test scripts.
  - *Documentation Updates*: Update testing logs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 27.7: CSS Variables Clean Audit**
  - *Purpose*: Clean unreferenced styling configurations.
  - *Prerequisites*: Task 27.6
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Build checks succeed.
  - *Rollback*: Revert CSS configs.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 27.8: Compile Verification Run**
  - *Purpose*: Verify build compile parameters.
  - *Prerequisites*: Task 27.7
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Compile returns zero warnings.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 27.9: Page Size Diagnostics Review**
  - *Purpose*: Verify layout boundaries on smaller viewports.
  - *Prerequisites*: Task 27.8
  - *Claude Skills*: `tailwind-guidelines`
  - *Validation*: Mobile breakpoints align.
  - *Rollback*: Revert layouts.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 27.10: Phase 27 Completion Logs**
  - *Purpose*: Sync milestone completion tags.
  - *Prerequisites*: Task 27.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Synchronize checklist checkboxes.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 28: CI/CD Pipeline Automation
* Purpose: Setup push verification actions.
* Dependencies: Phase 27 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 28.1: CI Workflow Setup**
  - *Purpose*: Write testing pipeline configuration scripts.
  - *Prerequisites*: Task 27.10
  - *Claude Skills*: `devops`
  - *Validation*: Pipeline validates pull requests.
  - *Rollback*: Delete workflow YAML file.
  - *Documentation Updates*: Update deployment guidelines.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 28.2: Actions Lint Task**
  - *Purpose*: Setup lint parameter checks.
  - *Prerequisites*: Task 28.1
  - *Claude Skills*: `typescript-standards`
  - *Validation*: Lint check executes correctly.
  - *Rollback*: Revert configuration changes.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 28.3: Actions Test Task**
  - *Purpose*: Setup test suite triggers.
  - *Prerequisites*: Task 28.2
  - *Claude Skills*: `testing`
  - *Validation*: Tests run cleanly inside workflow containers.
  - *Rollback*: Revert test scripts.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 28.4: Actions Build Task**
  - *Purpose*: Confirm compilation succeeds.
  - *Prerequisites*: Task 28.3
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Build checks succeed.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 28.5: Actions Accessibility Check Task**
  - *Purpose*: Automated visual outlines indices scan.
  - *Prerequisites*: Task 28.4
  - *Claude Skills*: `accessibility`
  - *Validation*: Elements verify cleanly.
  - *Rollback*: Revert checker setup.
  - *Documentation Updates*: Update accessibility logs.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 28.6: Actions Secrets Injection**
  - *Purpose*: Setup keys environment values.
  - *Prerequisites*: Task 28.5
  - *Claude Skills*: `security`
  - *Validation*: Verification passes cleanly.
  - *Rollback*: Revert test settings.
  - *Documentation Updates*: Update environment keys doc.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 28.7: Actions Performance Review Task**
  - *Purpose*: Automated JS bundle check.
  - *Prerequisites*: Task 28.6
  - *Claude Skills*: `performance`
  - *Validation*: Build output meets criteria.
  - *Rollback*: Revert actions.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 28.8: Compiler Warnings Check**
  - *Purpose*: Verify build compile parameters.
  - *Prerequisites*: Task 28.7
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Build checks succeed.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 28.9: Branch Protection Rules Setup**
  - *Purpose*: Block direct push events.
  - *Prerequisites*: Task 28.8
  - *Claude Skills*: `git-workflow`
  - *Validation*: Branches reject push triggers.
  - *Rollback*: Disable protection settings.
  - *Documentation Updates*: Update Git guidelines.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 28.10: Phase 28 Complete State**
  - *Purpose*: Log Phase 28 checklist status.
  - *Prerequisites*: Task 28.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Sync TASKLIST checkboxes correctly.
  - *Rollback*: Revert milestone flag.
  - *Documentation Updates*: Update milestones log.
  - *Brain Updates*: Update `brain/state.md`.

---

## Phase 29: Vercel Hosting Pipeline Setup
* Purpose: Host dynamic layouts live.
* Dependencies: Phase 28 | Complexity: Medium | Duration: 4 hours

### Tasks
* **Task 29.1: Hosting Connection Setup**
  - *Purpose*: Set environment keys on Vercel dashboard.
  - *Prerequisites*: Task 28.10
  - *Claude Skills*: `devops`
  - *Validation*: Live URL resolves securely.
  - *Rollback*: Reset hosting settings.
  - *Documentation Updates*: Update deployment guidelines.
  - *Brain Updates*: Update `brain/file-map.md`.
* **Task 29.2: Vercel Deployment Action Trigger**
  - *Purpose*: Run production host compiler.
  - *Prerequisites*: Task 29.1
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Verification passes cleanly.
  - *Rollback*: Revert host build version.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 29.3: Live Pages Navigation Check**
  - *Purpose*: Verify sitemap links resolve.
  - *Prerequisites*: Task 29.2
  - *Claude Skills*: `nextjs-architecture`
  - *Validation*: Main navigation flows function safely.
  - *Rollback*: Revert layout elements.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/state.md`.
* **Task 29.4: Database Connectivity Verification**
  - *Purpose*: Confirm connection live parameters.
  - *Prerequisites*: Task 29.3
  - *Claude Skills*: `supabase`
  - *Validation*: Submissions save successfully on server.
  - *Rollback*: Revert keys settings.
  - *Documentation Updates*: Update database schema docs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 29.5: SSL Configuration Checks**
  - *Purpose*: Secure dynamic layout streams.
  - *Prerequisites*: Task 29.4
  - *Claude Skills*: `security`
  - *Validation*: URL redirects HTTP traffic correctly.
  - *Rollback*: Disable SSL settings.
  - *Documentation Updates*: Update security guidelines.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 29.6: Rollback System Test Run**
  - *Purpose*: Assert recovery operations.
  - *Prerequisites*: Task 29.5
  - *Claude Skills*: `devops`
  - *Validation*: Reverting updates works cleanly.
  - *Rollback*: Reset production parameters.
  - *Documentation Updates*: Update rollback log.
  - *Brain Updates*: Update `brain/decisions.md`.
* **Task 29.7: Live Accessibility Verification**
  - *Purpose*: Verify live focus outlines indicators.
  - *Prerequisites*: Task 29.6
  - *Claude Skills*: `accessibility`
  - *Validation*: Verification passes cleanly.
  - *Rollback*: Revert layouts.
  - *Documentation Updates*: Update accessibility logs.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 29.8: Live Performance Load Check**
  - *Purpose*: Verify production loading parameters.
  - *Prerequisites*: Task 29.7
  - *Claude Skills*: `performance`
  - *Validation*: Load checks complete under 2.5s.
  - *Rollback*: None.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/issues.md`.
* **Task 29.9: Domain Routing Setup**
  - *Purpose*: Map Custom DNS records.
  - *Prerequisites*: Task 29.8
  - *Claude Skills*: `devops`
  - *Validation*: Domain checks verify correctly.
  - *Rollback*: Reset DNS parameters.
  - *Documentation Updates*: None.
  - *Brain Updates*: Update `brain/setup-notes.md`.
* **Task 29.10: Project Launch Complete State**
  - *Purpose*: Log Phase 29 launch milestones completion.
  - *Prerequisites*: Task 29.9
  - *Claude Skills*: `antigravity-workflow`
  - *Validation*: Sync TASKLIST checkboxes correctly.
  - *Rollback*: Revert production status.
  - *Documentation Updates*: Update launch notes.
  - *Brain Updates*: Update `brain/state.md`.
