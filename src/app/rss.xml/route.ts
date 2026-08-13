import { getPosts } from '@/lib/db';

export const revalidate = 3600;

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'https://nobikumar.netlify.app';

  const posts = await getPosts();

  const itemsXml = posts
    .map((post) => {
      const link = `${baseUrl}/blog/${post.slug}`;
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>nobikumar.author@gmail.com (Nobi Kumar)</author>
      <category><![CDATA[${post.category || 'Chronicles'}]]></category>
    </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nobi Kumar Chronicles | Author Blog &amp; Case Files</title>
    <link>${baseUrl}/blog</link>
    <description>Official updates, behind-the-scenes timelines, and classified case files from author Nobi Kumar.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
