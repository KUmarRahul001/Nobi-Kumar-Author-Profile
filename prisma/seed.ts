import 'dotenv/config';
import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function seedAuthAndData() {
  console.log('Seeding Auth users and database tables into Supabase...');

  // 1. Seed Admin & Author Users
  const adminEmail =
    process.env.ADMIN_EMAILS?.split(',')[1]?.trim() || 'kumarrahulraj468@gmail.com';

  // Password hash for admin user (password: Rkraj@8789)
  const passwordHash = await bcrypt.hash('Rkraj@8789', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'admin',
      name: 'Nobi Kumar',
      passwordHash: passwordHash,
    },
    create: {
      email: adminEmail,
      name: 'Nobi Kumar',
      role: 'admin',
      passwordHash: passwordHash,
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  });

  console.log(`Created/updated Admin User: ${adminUser.email} (Role: ${adminUser.role})`);

  // 2. Seed Books
  const books = [
    {
      slug: 'the-verma-legacy',
      title: 'The Verma Legacy',
      subtitle: 'Secrets Buried in Blood and Lineage',
      seriesName: 'Verma Chronicles',
      volumeNumber: 1,
      genre: 'Psychological Thriller',
      tags: 'Mystery, Family Saga, Thriller, Dark',
      shortDescription:
        'A psychological thriller unspooling dark secrets, fractured memories, and inherited guilt within the enigmatic Verma dynasty.',
      fullSynopsis: `When Dev Verma returns to ancestral Manor House after fifteen years of self-imposed exile, he expects silent hallways and lingering resentment. Instead, he discovers his grandfather's secret journal detailing three decades of systemic cover-ups, hidden assets, and suspicious deaths disguised as natural causes.

As Dev investigates deeper into the estate's archives, someone begins re-enacting the sinister events outlined in the journal. With every clue revealed, the line between Dev's sanity and inherited madness blurs into a high-stakes psychological game of survival.`,
      releaseDate: '2024-10-15',
      isbn: '978-0-123456-78-9',
      language: 'English',
      pages: 384,
      readingTime: '6 hrs 30 mins',
      status: 'published',
      coverUrl:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      bannerUrl:
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      trailerLink: 'https://youtube.com/watch?v=demo',
      isFeatured: true,
      isBestseller: true,
      isEditorsChoice: true,
      displayOrder: 1,
      amazonLink: 'https://amazon.com/dp/demo1',
      googlePlayLink: 'https://play.google.com/store/books/details?id=demo1',
      appleBooksLink: 'https://books.apple.com/us/book/demo1',
      paperbackLink: 'https://amazon.com/dp/demo1-pb',
    },
    {
      slug: 'shadows-of-mumbai',
      title: 'Shadows of Mumbai',
      subtitle: 'Noir Thriller in the Heart of the City',
      seriesName: 'Standalone',
      genre: 'Crime Noir',
      tags: 'Crime, Noir, Detective, Mumbai',
      shortDescription:
        'A gritty crime thriller following a disgraced detective uncovering corruption during a stormy monsoonal week.',
      fullSynopsis: `In the torrential monsoon rain of South Mumbai, Detective Kabir Miller receives an anonymous cassette recording depicting a crime that officially never took place. Forced to operate outside police protocol, Kabir navigates the neon-drenched back alleys and elite high-rises to stop a conspiracy before the storm clears.`,
      releaseDate: '2025-03-20',
      isbn: '978-0-987654-32-1',
      language: 'English',
      pages: 320,
      readingTime: '5 hrs 15 mins',
      status: 'coming-soon',
      coverUrl:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      isBestseller: false,
      isEditorsChoice: false,
      displayOrder: 2,
      amazonLink: 'https://amazon.com/dp/demo2',
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { slug: book.slug },
      update: book,
      create: book,
    });
  }

  console.log('Successfully seeded database tables and Auth user credentials!');
}

seedAuthAndData()
  .catch((e) => {
    console.error('Error seeding DB:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
