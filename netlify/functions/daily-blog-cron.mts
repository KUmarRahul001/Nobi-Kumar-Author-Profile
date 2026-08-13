/**
 * netlify/functions/daily-blog-cron.mts
 * Netlify Scheduled Function for Daily 09:00 IST & 21:00 IST AI Blog Generation
 * Cron expressions:
 * 03:30 UTC = 09:00 IST
 * 15:30 UTC = 21:00 IST
 */
export default async (req: Request) => {
  const cronSecret = process.env.BLOG_CRON_SECRET || process.env.CRON_SECRET || process.env.ADMIN_PASSCODE;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nobikumar.netlify.app';

  if (!cronSecret) {
    console.error('[Netlify Scheduled Function] BLOG_CRON_SECRET is not configured.');
    return new Response('BLOG_CRON_SECRET missing', { status: 500 });
  }

  try {
    const res = await fetch(`${siteUrl}/api/cron/generate-blog`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cronSecret}`,
        'Content-Type': 'application/json',
      },
    });

    const text = await res.text();
    console.log(`[Netlify Scheduled Function] Status: ${res.status}, Response: ${text}`);

    return new Response(text, { status: res.status });
  } catch (err: any) {
    console.error('[Netlify Scheduled Function Exception]', err);
    return new Response(err.message || 'Scheduled function failed', { status: 500 });
  }
};

export const config = {
  schedule: '30 3,15 * * *',
};
