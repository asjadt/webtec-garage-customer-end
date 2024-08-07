import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
export default function TextLabelComponent({
  text,
  color = "text-primary",
  bgColor = "bg-primary-content",
  customClassName = "",
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
      className={`py-2 px-5 overflow-hidden rounded-full ${bgColor} ${color} ${customClassName} w-auto text-center font-semibold`}
    >
      {text}
    </motion.div>
  );
}
