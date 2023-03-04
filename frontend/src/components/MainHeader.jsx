import {Avatar, Box, Flex, Heading, Text} from "@chakra-ui/react";

export default function MainHeader() {
    return (
        <Flex direction="row" as="nav" align="center" justify="space-between" wrap="wrap"
              padding={2} bg="teal.300" color="white" background="black">

            <Heading as="h1" size="lg" letterSpacing={"tighter"} mx={2}>
                <Text>Лабораторная работа №2 по СОА</Text>
            </Heading>

            <Flex direction="row" as="nav" align="center" justify="justify-content" wrap="wrap" mx={5}>
                <Box>
                    <Text>Махнин Дмитрий P34111</Text>
                </Box>
            </Flex>



        </Flex>
    );
}