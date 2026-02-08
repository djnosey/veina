import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, useReducedMotion } from 'motion/react';

interface CountUpProps {
  target: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export default function CountUp({ target, duration = 1.5, className, suffix = '' }: CountUpProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;

    if (prefersReduced) {
      motionValue.set(target);
      return;
    }

    const controls = animate(motionValue, target, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
    });

    return () => controls.stop();
  }, [isInView, target, duration, motionValue, prefersReduced]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${v.toLocaleString()}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return <span ref={ref} className={className}>{`0${suffix}`}</span>;
}
