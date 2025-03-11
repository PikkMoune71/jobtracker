import { motion } from "framer-motion";

interface LoaderProps {
  color: string;
}

const Loader = ({ color }: LoaderProps) => {
  {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center items-center">
          <motion.div
            className="relative w-20 h-20 flex justify-center items-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          >
            <motion.div
              className="absolute w-full h-full border-4 border-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              style={{ borderTopColor: color }}
            />

            <motion.div
              className="absolute w-10 h-10 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
              }}
              style={{ backgroundColor: color }}
            />
          </motion.div>
        </div>
      </div>
    );
  }
};

export default Loader;
