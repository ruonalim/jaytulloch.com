export const config = { runtime: 'edge' };

export default async function handler() {
  const upstream = await fetch('https://jaytulloch.substack.com/feed', {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; jaytulloch.com/1.0)' },
  });
  const xml = await upstream.text();
  return new Response(xml, {
    status: upstream.status,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
    },
  });
}
