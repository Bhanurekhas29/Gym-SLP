import { useCallback, useEffect, useState } from "react";

export default function useInView(options = { threshold: 0.2 }) {
  const [node, setNode] = useState(null);
  const [inView, setInView] = useState(false);

  const ref = useCallback((el) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  return [ref, inView];
}
