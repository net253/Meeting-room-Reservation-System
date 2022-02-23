import {
  Box,
  Stack,
  Text,
  Center,
  Input,
  Button,
  Icon,
  Tooltip,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loading from "../components/lottie/Loading";

import axios from "axios";
import { urlSearch } from "../Config";
import {
  FaSearch,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaMapPin,
  FaUserEdit,
} from "react-icons/fa";

export default function History() {
  const [historyInfo, setHistoryInfo] = useState();
  const [search, setSearch] = useState("");

  const getTable = () => {
    axios.post(urlSearch, { search: search }).then(({ data }) => {
      setHistoryInfo(data);
    });
  };

  const handleClear = () => {
    setSearch("");
    axios.post(urlSearch, { search: "" }).then(({ data }) => {
      setHistoryInfo(data);
    });
  };

  useEffect(() => {
    const initPage = setTimeout(() => {
      getTable();
    }, 100);
    return () => {
      clearTimeout(initPage);
    };
  }, []);

  if (historyInfo == undefined) {
    return <Loading />;
  }

  const actionStatus = (info) => {
    return info.action === "returned" ? (
      <Icon as={FaCheckCircle} color="green" boxSize={7} />
    ) : info.action == "booking" ? (
      <Icon as={FaMapPin} boxSize={7} />
    ) : info.action == "Edit" ? (
      <Icon as={FaUserEdit} color="yellowgreen" boxSize={7} />
    ) : (
      <Icon as={FaTimesCircle} color="red" boxSize={7} />
    );
  };

  const dateTimeFormat = (info) => {
    var dateSpilt = info.slice(0, 16).split(" ");
    var date = dateSpilt[0].split("-").reverse().join("/");
    return date + " " + dateSpilt[1];
  };

  return (
    <>
      <Stack p={2}>
        <Stack direction="row">
          <Text
            className="font-thai"
            fontWeight="bold"
            fontSize="lg"
            textAlign="center"
          >
            ประวัติการจอง
          </Text>
          <Text fontWeight="bold">(Reservation history)</Text>
        </Stack>
        <Center>
          <Box
            bg="white"
            rounded="md"
            h={{ base: "85vh", md: "84vh" }}
            w={{ base: "96vw", md: "99vw" }}
            boxShadow="sm"
            p={2}
          >
            <Stack direction="row" spacing={3}>
              <Input
                variant="flushed"
                placeholder="Search..."
                w={{ base: "100%", md: "20%" }}
                value={search}
                onChange={({ target: { value: search } }) => setSearch(search)}
              />
              <Tooltip hasArrow label="Search">
                <Button colorScheme="gray" onClick={() => getTable()}>
                  <Icon as={FaSearch} />
                </Button>
              </Tooltip>

              <Tooltip hasArrow label="Clear">
                <Button colorScheme="red" onClick={() => handleClear()}>
                  <Icon as={FaTrash} />
                </Button>
              </Tooltip>
            </Stack>

            {/* Table */}
            <Center>
              <Box
                overflow="auto"
                h={{ md: "72vh", base: "74vh" }}
                w={{ md: "97vw", base: "92vw" }}
                mt={2}
              >
                <Table variant="striped" colorScheme="blackAlpha" size="sm">
                  <Thead>
                    <Tr>
                      <Th textAlign="center" w="3%" fontSize="small">
                        ลำดับ <br />
                        (No.)
                      </Th>
                      <Th fontSize="small" isTruncated>
                        ห้องประชุม <br />
                        (Meeting room)
                      </Th>
                      <Th fontSize="small">
                        ผู้จอง <br />
                        (Booking by)
                      </Th>
                      <Th textAlign="center" fontSize="small">
                        ตั้งแต่เวลา <br />
                        (Start)
                      </Th>
                      <Th textAlign="center" fontSize="small">
                        จนถึงเวลา <br />
                        (Return)
                      </Th>
                      <Th textAlign="center" fontSize="small" isTruncated>
                        เวลาล่าสุด <br />
                        (Last action)
                      </Th>
                      <Th textAlign="center" fontSize="small">
                        Action
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {historyInfo.map((info, i) => (
                      <React.Fragment key={i}>
                        <Tr
                          _hover={{
                            backgroundColor: "#EEE",
                          }}
                        >
                          <Td textAlign="center">{i + 1}</Td>
                          <Td isTruncated>{info.rooms}</Td>
                          <Td fontWeight="bold" isTruncated>
                            {info.name}
                          </Td>
                          <Td textAlign="center" isTruncated>
                            {dateTimeFormat(info.datetimeUse)}
                          </Td>
                          <Td textAlign="center" isTruncated>
                            {dateTimeFormat(info.datetimeReturn)}
                          </Td>
                          <Td textAlign="center" isTruncated>
                            {dateTimeFormat(info.datetime)}
                          </Td>
                          <Td textAlign="center">{actionStatus(info)}</Td>
                        </Tr>
                      </React.Fragment>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Center>
          </Box>
        </Center>
      </Stack>
    </>
  );
}
