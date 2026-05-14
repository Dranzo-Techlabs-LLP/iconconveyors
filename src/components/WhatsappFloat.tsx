import { motion } from "framer-motion";
import { WhatsappIcon } from "./SocialIcons";

export default function WhatsappFloat() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      href="https://wa.me/918807209964?text=Hi%20Icon%20Conveyors%2C%20I%27d%20like%20a%20quote%20for"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 size-14 md:size-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)] hover:bg-[#1ebe57]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
      <WhatsappIcon className="relative size-7 md:size-8" />
    </motion.a>
  );
}
