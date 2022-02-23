import React from "react";
import {
  Flex,
  Text,
  Stack,
  Spacer,
  Box,
  Image,
  Tooltip,
  Button,
  Icon,
} from "@chakra-ui/react";

import { TermOfUsed } from "../Modals";
import SNC from "./logo.png";
import { useNavigate } from "react-router-dom";

import { FaHistory } from "react-icons/fa";
import { BsFillPinAngleFill } from "react-icons/bs";
import { urlSrc } from "../../Config";

export default function TopNav({ page }) {
  const navigate = useNavigate();
  return (
    <>
      <Flex color="white" alignItems="center">
        <Image
          srcSet={SNC}
          w={{ md: "5vw", base: "15vw" }}
          fallbackSrc={urlSrc}
          onClick={() => navigate("/")}
        />
        <Spacer />
        <Text fontSize="lg">Meeting Room Reservation Service</Text>
        <Spacer />

        <Stack direction="row">
          <TermOfUsed />
        </Stack>

        <Box me="3">
          <Tooltip hasArrow label="Reservation">
            <Button bg="none" onClick={() => navigate("/")}>
              <Icon as={BsFillPinAngleFill} />
            </Button>
          </Tooltip>
          <Tooltip hasArrow label="History">
            <Button bg="none" onClick={() => navigate("/history")}>
              <Icon as={FaHistory} />
            </Button>
          </Tooltip>
        </Box>
      </Flex>
    </>
  );
}
