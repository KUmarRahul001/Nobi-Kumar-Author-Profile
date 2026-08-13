/**
 * src/lib/newsletter-automation.ts
 * Automated Newsletter Broadcasting Engine via Beehiiv V2 API
 * Triggers automated campaign/post draft creation or subscriber broadcasts whenever a new Book or Chronicle is published.
 */

export interface BroadcastPayload {
  type: 'book' | 'chronicle';
  title: string;
  subtitle?: string;
  summary: string;
  url: string;
  coverUrl?: string;
}

export async function triggerAutomatedNewsletterBroadcast(payload: BroadcastPayload): Promise<{
  success: boolean;
  message: string;
  beehiivPostId?: string;
}> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId =
    process.env.BEEHIIV_PUBLICATION_ID || process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    console.warn(
      '[Newsletter Automation] BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID is not configured. Automated broadcast skipped.'
    );
    return {
      success: false,
      message: 'Beehiiv credentials not configured.',
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'https://nobikumar.netlify.app';

  const fullUrl = payload.url.startsWith('http') ? payload.url : `${siteUrl}${payload.url}`;

  const subject =
    payload.type === 'book'
      ? `🚨 NEW NOVEL RELEASE: "${payload.title}" by Nobi Kumar`
      : `📁 NEW CASE FILE: "${payload.title}" | Nobi Kumar Chronicles`;

  const previewText = payload.subtitle || payload.summary.slice(0, 140);

  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #08090a; color: #f2f0ea; border-radius: 12px; border: 1px solid #1f2937;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #1f2937;">
        <span style="font-size: 11px; font-family: monospace; color: #b21f2d; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">
          OFFICIAL NOBI KUMAR BROADCAST
        </span>
        <h1 style="font-size: 24px; color: #ffffff; text-transform: uppercase; margin-top: 8px; margin-bottom: 4px;">
          ${payload.title}
        </h1>
        ${payload.subtitle ? `<p style="font-size: 13px; color: #a6a5a0; margin: 0;">${payload.subtitle}</p>` : ''}
      </div>

      ${
        payload.coverUrl
          ? `<div style="text-align: center; margin: 20px 0;">
              <img src="${payload.coverUrl}" alt="${payload.title}" style="max-width: 240px; height: auto; border-radius: 8px; border: 1px solid #374151; box-shadow: 0 10px 25px rgba(0,0,0,0.5);" />
            </div>`
          : ''
      }

      <div style="font-size: 14px; line-height: 1.6; color: #d1d5db; margin: 20px 0;">
        <p>${payload.summary}</p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #1f2937;">
        <a href="${fullUrl}" style="background-color: #b21f2d; color: #ffffff; padding: 12px 28px; text-decoration: none; font-size: 13px; font-weight: bold; border-radius: 6px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
          ${payload.type === 'book' ? 'EXPLORE NEW NOVEL →' : 'READ CASE FILE →'}
        </a>
      </div>

      <div style="text-align: center; margin-top: 30px; font-size: 11px; color: #6b7280; font-family: monospace;">
        <p>© ${new Date().getFullYear()} Nobi Kumar · All rights reserved.</p>
        <p>You received this because you subscribed to the official Nobi Kumar Newsletter.</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: subject,
        subtitle: previewText,
        content: htmlContent,
        status: 'confirmed',
        send_time: 'immediate',
        audience: 'all',
        platform: 'both',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Beehiiv Automation Error]', data);
      return {
        success: false,
        message: data.message || `Beehiiv returned status ${response.status}`,
      };
    }

    console.log('[Beehiiv Automation Success] Post broadcast created:', data.data?.id);
    return {
      success: true,
      message: 'Automated newsletter broadcast created successfully.',
      beehiivPostId: data.data?.id,
    };
  } catch (err: any) {
    console.error('[Newsletter Automation Exception]', err);
    return {
      success: false,
      message: err.message || 'Failed to communicate with Beehiiv V2 API.',
    };
  }
}
