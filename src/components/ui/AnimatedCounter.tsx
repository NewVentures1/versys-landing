import { useEffect, useState } from "react";
import { animate } from "motion";

interface Props {
  from: number;
  to: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}

const defaultFormat = (n: number) => `$${Math.round(n).toLocaleString()}`;

export default function AnimatedCounter({
  from,
  to,
  duration = 2,
  format = defaultFormat,
  className = "",
}: Props) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [from, to, duration]);

  return <span className={className}>{format(value)}</span>;
}
