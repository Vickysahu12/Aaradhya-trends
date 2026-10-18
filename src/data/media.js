// Media manifest. Product photos are 4:5 and live in public/media/products as <id>.webp
// (384 x 480, the size the client supplied; one file serves every slot). `-1` is the full
// look, `-2` a closer crop. tones.json holds each photo's average colour as a placeholder.
import tones from './tones.json'

export const imageSet = (id) => ({
  id,
  src: `/media/products/${id}.webp`,
  srcSm: `/media/products/${id}.webp`,
  tone: tones[id] ?? 'var(--color-fog)',
})
