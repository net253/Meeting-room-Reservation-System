import {
  Box,
  Stack,
  Text,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loading from "../components/lottie/Loading";
import { List, Schedule } from "../components/Scheduler";

import { BookingModal, CancelModal } from "../components/Modals";
import axios from "axios";
import { urlChk } from "../Config";

const roomInfo = [
  // {
  //   rooms: "ห้องประชุม นิคมพัฒนา ตู้ CTN ชั้น 1 ประตู 1 (8 ที่นั่ง)",
  // },
  // { rooms: "ห้องประชุม บ้านฉาง ตู้ CTN ชั้น 1 ประตู 1 (10 ที่นั่ง)" },
  // { rooms: "ห้องประชุม บ้านบ้านค่าย ตู้ CTN ชั้น 1 ประตู 1 (10 ที่นั่ง)" },
  // { rooms: "ห้องประชุม เมืองระยอง ตู้ CTN ชั้น 2 ประตู 1 (20 ที่นั่ง)" },
  // { rooms: "ห้องประชุมใหญ่ B5 ชั้น 2 (อาคารผลิตหน้ากาก)" },
  { rooms: "ห้องประชุม B12 ชั้น 2 (11 ที่นั่ง)" },
];

export default function Scheduler() {
  const [information, setInformation] = useState();

  const getTable = () => {
    axios.post(urlChk, { code: "" }).then(({ data }) => {
      setInformation(data);
    });
  };

  useEffect(() => {
    const initPage = setTimeout(() => {
      getTable();
    }, 100);
    const timer5s = setInterval(() => {
      getTable();
    }, 5000);
    return () => {
      clearTimeout(initPage);
      clearInterval(timer5s);
    };
  }, []);

  if (information == undefined) {
    return <Loading />;
  }

  return (
    <>
      <Stack p={2}>
        <Accordion allowToggle defaultIndex={[0]}>
          {/* Calendar */}
          <AccordionItem>
            <AccordionButton>
              <Stack direction="row">
                <Text
                  className="font-thai"
                  fontWeight="bold"
                  fontSize="lg"
                  textAlign="center"
                >
                  ปฏิทินการจอง
                </Text>
                <Text fontWeight="bold">(Reservation Calendar)</Text>
              </Stack>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel px={0}>
              <Center>
                <Box
                  bg="white"
                  rounded="md"
                  h={{ base: "74vh", md: "73vh" }}
                  w="98vw"
                  boxShadow="sm"
                  p={2}
                >
                  <Schedule information={information} />
                  {/* Action */}
                  <Stack direction="row" p={2} justifyContent="center">
                    <BookingModal roomInfo={roomInfo} />
                    <CancelModal information={information} />
                  </Stack>
                </Box>
              </Center>
            </AccordionPanel>
          </AccordionItem>

          {/* list */}
          <AccordionItem>
            <AccordionButton>
              <Stack direction="row">
                <Text
                  className="font-thai"
                  fontWeight="bold"
                  textAlign="center"
                  fontSize="lg"
                >
                  รายการจอง
                </Text>
                <Text fontWeight="bold" fontSize="md">
                  (Reservation List)
                </Text>
              </Stack>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel px={0}>
              <Center>
                <Box
                  bg="white"
                  rounded="md"
                  h={{ base: "78vh", md: "73vh" }}
                  w="100vw"
                  boxShadow="sm"
                  p={1}
                >
                  <Box overflow="auto" h={{ base: "75vh", md: "69vh" }}>
                    <List information={information} />
                  </Box>
                </Box>
              </Center>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </>
  );
}
