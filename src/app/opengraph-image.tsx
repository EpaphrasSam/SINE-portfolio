import { ImageResponse } from 'next/og';
import { site } from '../lib/site';

export const alt = `${site.fullName} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The share card for every page that does not supply its own.
 * Project pages override this with their screenshot.
 *
 * Satori supports a subset of CSS — flexbox only, no grid, explicit
 * `display` on every element — so this is laid out plainly on purpose.
 */
export default function OpengraphImage() {
  const ground = '#0A0A0D';
  const accent = '#7A96FF';
  const ink = '#F0F0F5';
  const muted = '#7E8290';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: ground,
          padding: '72px 80px',
        }}
      >
        {/* Mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 32 32" fill="none">
            <path
              d="M5 16C8.67 8.67 12.33 8.67 16 16S23.33 23.33 27 16"
              stroke={accent}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              letterSpacing: 6,
              color: ink,
              fontWeight: 700,
            }}
          >
            SINE
          </div>
        </div>

        {/* Name */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: -4,
              color: ink,
              fontWeight: 700,
            }}
          >
            Isaac Epaphras
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: -4,
              color: muted,
              fontWeight: 700,
            }}
          >
            Nana Sam
          </div>
        </div>

        {/* Footer rule + meta */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <svg width="1040" height="26" viewBox="0 0 1040 26" fill="none">
            <path
              d="M0 13C40 -4 80 -4 120 13s80 17 120 0 80-17 120 0 80 17 120 0 80-17 120 0 80 17 120 0 80-17 120 0 80 17 120 0"
              stroke={accent}
              strokeOpacity="0.45"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 26,
              fontSize: 25,
              color: muted,
            }}
          >
            <div style={{ display: 'flex' }}>
              Software Engineer · Healthcare, fintech, government
            </div>
            <div style={{ display: 'flex', color: accent }}>isaacsam.com</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
