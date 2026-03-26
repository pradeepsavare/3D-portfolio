import { useEffect, useRef, useState } from "react";

const useInViewOnce = (options = {}) => {
  const targetRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) return;

    const node = targetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "100px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isInView, options.rootMargin, options.threshold]);

  return { targetRef, isInView };
};

export default useInViewOnce;