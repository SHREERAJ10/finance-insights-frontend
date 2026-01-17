import { motion } from "framer-motion";

const LoadingDots = () => {
  const dotVariants = {
    initial: { opacity: 0.3 },
    animate: { opacity: 1 },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  };

  return (
    <div className="min-h-75 w-full flex items-center justify-center gap-2 p-4">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            ...dotTransition,
            delay: index * 0.15, // Creates the staggered wave effect
          }}
          className="size-3 bg-[#313131] rounded-full"
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingDots;