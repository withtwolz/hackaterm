// Gobally used animations
import { useSpring } from '@react-spring/web';

export function useFadeIn(duration: number = 200) {
  return useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration }
  });
}