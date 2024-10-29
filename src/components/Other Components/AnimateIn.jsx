import React, { useEffect, useState } from "react";
import cn from "mxcn";
import { useInView } from 'react-intersection-observer';
// or if using shadcn:
// import { cn } from "@/lib/utils"; // https://github.com/shadcn-ui/ui/blob/main/apps/www/lib/utils.ts

const AnimateIn = ({
  children,
  delay = 0,
  duration = 500,
  className = "",
  from,
  to,
  style,
  as: Component = 'div',
  threshold = 0.5,  // Customize how much of the element should be visible to trigger
}) => {
  const [animate, setAnimate] = useState(from);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Using the react-intersection-observer hook to trigger animation when in view
  const { ref, inView } = useInView({
    threshold, // Customize the threshold for triggering
    triggerOnce: true, // Only trigger the animation once
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const mediaQueryChangeHandler = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', mediaQueryChangeHandler);

    return () => {
      mediaQuery.removeEventListener('change', mediaQueryChangeHandler);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !inView) {
      // Skip animation if user prefers reduced motion or element is not in view
      setAnimate(from);
      return;
    }

    const timer = setTimeout(() => {
      setAnimate(to);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, delay, to, from, prefersReducedMotion]);

  return (
    <Component
      ref={ref} // Attach the ref from useInView to the component
      className={cn("transition-all ease-in-out", className, animate)}
      style={{
        transitionDuration: prefersReducedMotion ? "0ms" : `${duration}ms`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

export default AnimateIn;
