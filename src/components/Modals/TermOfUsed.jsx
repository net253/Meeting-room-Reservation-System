import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Text,
  useDisclosure,
  Icon,
  Tooltip,
  HStack,
} from "@chakra-ui/react";

import { FaBookOpen } from "react-icons/fa";

export default function TermOfUsed() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   const initPage = setTimeout(() => {
  //     onOpen();
  //   }, 100);
  //   return () => {
  //     clearTimeout(initPage);
  //   };
  // }, []);
  return (
    <>
      <Tooltip hasArrow label="Term of use">
        <Button bg="none" onClick={onOpen}>
          <Icon as={FaBookOpen} className="blink-status" />
        </Button>
      </Tooltip>

      {/* Modal */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="blackAlpha.200">
            <Stack direction="row">
              <Text
                className="font-thai"
                fontWeight="bold"
                fontSize="lg"
                textAlign="center"
              >
                ข้อกำหนดการใช้งาน
              </Text>
              <Text fontWeight="bold" fontSize="md">
                (Term of use)
              </Text>
            </Stack>
          </ModalHeader>
          <ModalCloseButton />

          {/* Body */}
          <ModalBody>
            <Stack>
              <Text className="font-thai" fontSize="sm">
                1. ผู้ใช้งานสามารถตรวจสอบ จอง หรือยกเลิก
                ห้องประชุมในเครือของบริษัทฯ ผ่านเว็บไซต์นี้เท่านั้น
              </Text>

              <Text className="font-thai" fontSize="sm">
                2. หลีกเลี่ยงการนำอาหารและเครื่องดื่มเข้ามารับประทานภายในห้อง
              </Text>

              <Text className="font-thai" fontSize="sm">
                3. หากผู้ใช้งานต้องการเปลี่ยนแปลงหรือเคลื่อนย้ายอุปกรณ์ต่างๆ
                ภายในห้อง
                ควรแจ้งให้เจ้าหน้าที่ผู้ดูแลห้องรับทราบล่วงหน้าเพื่อดำเนินการต่อไป
              </Text>

              <Text className="font-thai" fontSize="sm">
                4. ผู้ใช้งานพึงใช้และเก็บรักษาอุปกรณ์ใดๆ
                ในห้องประชุมให้อยู่ในลักษณะสะอาดและเรียบร้อยเช่นเดิมเมื่อใช้งานเสร็จสิ้น
              </Text>

              <Text className="font-thai" fontSize="sm">
                5. หากมีการเปลี่ยนแปลงการใช้ห้อง
                กรุณายกเลิกการจองและจองห้องใหม่อีกครั้ง
              </Text>

              <Text className="font-thai" fontSize="sm">
                6. <b className="font-thai font-term">ก่อนใช้ห้อง</b>{" "}
                กำหนดให้เปิดห้องล่วงหน้า 30 นาที โดยจะเปิดไฟ เครื่องปรับอากาศ
                และอุปกรณ์โสตฯ ก่อนเริ่มประชุม 30 นาที
              </Text>

              <Text className="font-thai" fontSize="sm">
                7. <b className="font-thai font-term">หลังใช้ห้อง</b>{" "}
                กรุณาปิดเครื่องปรับอากาศ และเก็บอุปกรณต่างๆกลับที่เดิม
                หากมีการนำเก้าอี้เข้าไปเพิ่มเติมกรุณานำออกจากห้องประชุมด้วย
              </Text>

              <Text className="font-thai" fontSize="sm">
                8. กรณีอุปกรณ์ IT หรือระบบการเชื่อมต่อมีปัญหา กรุณาแจ้งให้แผนก
                IT ของบริษัทฯ ทราบผ่าน{" "}
                <b className="font-thai">Line Group: IT HelpDesk</b>
              </Text>
              <Text className="font-thai" fontSize="sm">
                9. กรณีโครงสร้างห้องประชุมชำรุดหรือมีปัญหาการใช้งาน
                กรุณาแจ้งแผนก GA ของทางบริษัทฯ
              </Text>
              <Text className="font-thai" fontSize="sm">
                10. กรณีเฟอร์นิเจอร์ หรือเครื่องใช้สำนักงาน
                รวมถึงอุปกรณ์สิ้นเปลืองภายในห้องหมด หรือชำรุด กรุณาแจ้ง
                หน่วยงานเจ้าของที่ดูแลห้องประชุมนั้นๆ
              </Text>

              <Text className="font-thai" fontSize="sm">
                11. ผู้ใช้งานสามารถจองและใช้งานห้องประชุมได้ตลอด
                <b className="font-thai"> 24 ชั่วโมง</b>
              </Text>

              <Text
                className="font-thai"
                fontWeight="bold"
                fontSize="md"
                pt={2}
              >
                การเข้าใช้งานเว็บไซต์
              </Text>
              <Text className="font-thai" fontSize="sm">
                1. กรุณาระบุรหัสพนักงาน 7 หลัก (นับจากด้านหลัง)
                ในการบันทึกข้อมูลในเว็บไซต์
              </Text>
              <Text className="font-thai" fontSize="sm">
                2. กรอกข้อมูลและตรวจสอบข้อมูลให้ครบถ้วน
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
