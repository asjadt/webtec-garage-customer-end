import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
export default function TextTitleComponent({
  text,
  borderColor = "border-primary",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const imageVariants = {
    hidden: { x: -100 },
    visible: { x: 0, transition: { duration: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={imageVariants}
      className={`py-2 w-full border-l-4 px-3 text-xl overflow-hidden ${borderColor} w-32  font-semibold`}
    >
      {text}
    </motion.div>
  );
}
