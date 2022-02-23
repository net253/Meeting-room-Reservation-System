import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function ContentWrapper({ content: Content }) {
  const pageTransition = {
    ease: "anticipate",
    type: "tween",
  };
  return (
    <>
      <Box h="6vh" bgGradient="linear(to-r, #24243e, #0f0c29)">
        <TopNav />
      </Box>
      <Box h="91vh" bg="#EDF2F7">
        <motion.div
          initial={{ opacity: 0, y: "1%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "1%" }}
          transition={pageTransition}
        >
          <Content />
        </motion.div>
      </Box>
      <Box h="2vh">
        <Footer />
      </Box>
    </>
  );
}
