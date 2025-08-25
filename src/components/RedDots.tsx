import { motion, type Variants } from 'motion/react';

const radiuses = [
  '50%',
  '0% 50% 50% 0%',
  '0% 0% 50% 50%',
  '50% 0% 0% 50%',
]

const dotVariants: Variants = {
  hidden: { scale: 0.5, borderRadius: '50%' },
  visible: (custom: number) => ({
    scale: 1,
    borderRadius: radiuses[custom],
    transition: {
      duration: 0.5,
      delay: custom * 0.5 + 0.5,
      type: 'spring' as const,
    },
  }),
};

const RedDots = () => {
  return (
    <div className={"flex flex-row-reverse gap-1"}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={"size-10 rounded-full animate-pulse bg-rose-500/50"}
          custom={i}
          initial="hidden"
          whileInView={"visible"}
          viewport={{once: true}}
          variants={dotVariants}
        />
      ))}
    </div>
  );
}

export default RedDots;
