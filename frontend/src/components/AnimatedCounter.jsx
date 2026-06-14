import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ value, duration = 1.5, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    const incrementTime = (duration * 1000) / Math.min(end || 1, 60);
    const step = Math.max(1, Math.floor(end / 60));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

AnimatedCounter.propTypes = {
  value: PropTypes.number,
  duration: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};
