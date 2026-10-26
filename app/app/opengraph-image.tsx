import { ImageResponse } from 'next/og'

export const alt = 'shwcase — recollections from around the world'
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
          justifyContent: 'center',
          padding: '0 96px',
          background: '#fffafa',
          color: '#2b2226',
        }}
      >
        <div style={{ display: 'flex', fontSize: 120, fontFamily: 'serif' }}>
          shwcase
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 16,
            fontSize: 44,
            fontStyle: 'italic',
            fontFamily: 'serif',
            color: '#7b6a71',
          }}
        >
          recollections from around the world
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 56,
            width: 160,
            height: 12,
            borderRadius: 6,
            background: '#f0b3c1',
          }}
        />
      </div>
    ),
    size
  )
}
