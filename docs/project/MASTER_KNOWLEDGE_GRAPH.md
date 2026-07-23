# 🧠 MASTER KNOWLEDGE GRAPH & PROJECT MEMORY
## Complete System Registry of Entities, User Flows & Acceptance Criteria

> **Document Target:** `docs/project/MASTER_KNOWLEDGE_GRAPH.md`  
> **Status:** Active Knowledge Graph Registry

---

## 📚 1. CORE CANON NOVEL ENTITIES (NNU 7 NOVELS)
1. **`the-shadow-that-followed`** (Verma Saga Book 01, Chronological Position #1) — Protagonist: Rhea Kapoor; Core mystery: Unedited CCTV pen drive of the stairwell fall.
2. **`the-shadow-who-watched`** (Verma Saga Book 02, Chronological Position #2) — Narrator: Aarav Verma; Core mystery: Cracked confession written from inside guilty mind under surveillance.
3. **`false-memories-vol-1`** (Multiverse & Sci-Fi) — *"She said: You'll forget me. He never wanted to."* Synthetic memory implants.
4. **`whispers-of-shadows`** (Detective Arjun Mehra Chronicles) — Chilling moonlit alleyway murder investigations in Mumbai.
5. **`junoon-love-ya-death`** (Romantic Suspense) — High-octane obsession and lethal campus devotion.
6. **`dosti-aur-dil`** (Human Experience) — Emotional narrative of healing, deep friendship bonds, and self-discovery.
7. **`fateful-flavours`** (Master NNU Convergence) — Forgotten diaries binding all 7 standalone stories into Crossover Mode.

---

## 🗺️ 2. SYSTEM ROUTES & MONETIZATION MAP
```
Route                       Monetization Feature              Access Control
/                           Direct Buy Highlights            Public
/books                      Smart Retailer Badges            Public
/books/[slug]               Geo-IP Buy Links + Sample CTA    Public
/books/[slug]/sample        Post-Chapter 3 Email Lead Capture Public / Reader Mode
/universe                   Ko-fi Tips + Digital NNU Maps    Public / Interactive Map
/resources                  Writing Tool Affiliate Links     Public
/members                    VIP Fan Club Subscription        Protected (Member JWT)
/admin/*                    Dashboard & Analytics            Protected (Admin RBAC)
```

---

## 📊 3. ACCEPTANCE CRITERIA MEMORY BANK
- **Retailer Routing:** Indian visitors receive INR prices and Amazon IN / Pocket FM first; US visitors receive USD prices and Amazon US / Audible.
- **Affiliate Disclosures:** Every page containing outgoing Amazon links renders mandatory disclosure text: *"As an Amazon Associate, I earn from qualifying purchases."*
- **Sample Reader Mode:** Watermarked reader view with progress saved in localStorage; email capture popup triggered upon finishing Chapter 3.
