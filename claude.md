PUPWIKI.COM - MASTER DEVELOPMENT BLUEPRINT & DATA STRATEGY
​1. Project Overview & Vibe
​You are a Senior Astro Developer, Technical SEO Expert, Data Architect, and UI/UX Designer. We are upgrading an existing Astro codebase into the ultimate version of PupWiki.com.
​The Vibe: Authoritative, but warm and highly accessible. It must feel like a premium "Dog Parent Lifestyle Magazine" (bold typography, warm amber/wood accents, rounded corners, beautiful photography) and NOT a sterile, clinical directory.
Monetization: We are natively integrating affiliate components. Currently active: Crown and Paw (custom pet art) [1] and Raw Wild LLC (premium raw elk/deer dog food). We are also laying the groundwork for pending CPL programs (Pet Insurance).
​2. Data & Taxonomy Strategy (Crucial)
​The /data folder (e.g., master-breeds.json) contains deep relational data (size, energy, traits, origin, ailments).
​Taxonomy & Page Building: We must move away from flat routing. The build needs a smart taxonomy (e.g., clustering by breed groups, sizes, or lifestyles) to create dynamic category hubs.
​Internal Linking: Every page must contextually link to related pages using the dataset's relationships (e.g., linking a Labrador to a Golden Retriever because both share size_category: "large" and fci_section: "Retrievers").
​3. Strict Execution Rules for Claude Code
​Analyze & Advise First: Before writing or refactoring ANY code, thoroughly audit the existing use of JSON datasets, the current routing/taxonomy, and internal linking. Advise me on improvements. Treat the current build as an outdated baseline.
​Step-by-Step Only: Do not build everything at once. Wait for my explicit command (e.g., "Execute Phase 1A").
​E-E-A-T is Mandatory: Google's YMYL guidelines apply. Implement robust Schema.org markup (Article, FAQPage, BreadcrumbList) and build transparent E-E-A-T pages (About, Methodology, AuthorCards).
​Native Monetization: Affiliate features must look like native, helpful recommendations, injected contextually based on data (e.g., Raw Wild food for active/large breeds, Crown and Paw for lifestyle/name pages).
​4. PHASE 1: Architecture, E-E-A-T & Affiliate Integration
​Phase 1A: Deep Data Audit & Taxonomy Strategy
​Action: Analyze all JSON files in /data and how they are currently mapped in src/pages/ and src/components/.
​Deliverable: Output a structured "Data & Routing Upgrade Plan". Tell me which data points are currently underutilized, how we should restructure the taxonomy (categories/tags), and how we will build the internal linking silos to boost SEO. Do not write code until I approve the plan.
​Phase 1B: Base Refactoring & E-E-A-T Foundation
​Action: Refactor BaseLayout.astro, Header.astro, and Footer.astro to reflect the new warm, accessible magazine vibe (mobile-first). Implement dynamic Schema.org markup.
​E-E-A-T: Build src/pages/about.astro, src/pages/methodology.astro, and an AuthorCard.astro component to establish editorial independence and trust.
​Phase 1C: Active Affiliate Components (Native Integration)
​Action: Build highly converting, warm UI components for our active programs.
​Components:
​RawWildAd.astro: "Upgrade your dog's health with 100% wild elk & deer meat."
​CrownAndPawAd.astro: "Turn your best friend into a masterpiece."
​PendingInsuranceAd.astro: A beautiful placeholder UI for upcoming Pet Insurance integrations.
​Phase 1D: Page Building & Contextual Injection
​Action: Refactor existing pages (Breed pages, Cost Calculator, Breed Finder) using the new taxonomy and internal linking rules established in Phase 1A.
​Injection: Use JSON data to smartly inject the affiliate components (e.g., inject RawWildAd if breed.energy_level === 'active', inject CrownAndPawAd on homepage and lifestyle tools). Ensure the UI is flawless.