import { ImageResponse } from 'next/og'

export const alt = 'shwcase - where do you go when you need to think?'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 96px',
          background: '#F2EAD9',
          color: '#2E2118',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: 12,
            fontFamily: 'monospace',
            color: '#6F5138',
          }}
        >
          ONE QUESTION · A MINUTE
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontStyle: 'italic',
            fontFamily: 'serif',
            lineHeight: 1.15,
            maxWidth: 920,
          }}
        >
          where do you go when you need to think?
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              fontFamily: 'serif',
            }}
          >
            shwcase®
          </div>
          <div
            style={{
              display: 'flex',
              width: 160,
              height: 10,
              borderRadius: 5,
              background: '#B4895E',
            }}
          />
        </div>
      </div>
    ),
    size
  )
}
