import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
export default function TextLabelComponent({
  text,
  color = "text-primary",
  bgColor = "bg-primary-content",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const imageVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={imageVariants}
      className={`py-2 px-3 overflow-hidden rounded-full ${bgColor} ${color} w-32 text-center font-semibold`}
    >
      {text}
    </motion.div>
  );
}
