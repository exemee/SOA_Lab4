import {Box, Button, Flex, FormLabel, Heading, Text} from "@chakra-ui/react";
import {useState} from "react";
import {orgsState} from "../../../globalState/orgs";
import AlertMessage from "../../../components/AlertMessage";


export default function AdditionalGetOrgsForm() {
    const [type, setType] = useState("");
    const [error, setError] = useState({isError: false, message: ""})

    const sumByAnnualTurnoverSubmitHandler = e => {
        e.preventDefault();
        orgsState.getSumOfOrganizationsByAnnualTurnover();
    };

    const getTopOrgByCreationDate = e => {
        e.preventDefault();
        orgsState.getTopOrgByCreationDate();
    };

    return (
        <Box mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
             h="100%" w="50%" minW={300} bg={"white"} my={5} opacity={0.95}>
            <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} mb={5}>
                <Text>Дополнительный функционал</Text>
            </Heading>
            <form>
                <FormLabel>Рассчитать сумму значений поля annualTurnover для всех объектов</FormLabel>
                <Flex my={5} justifyContent="center">
                    <Button colorScheme='red' onClick={sumByAnnualTurnoverSubmitHandler}>Выполнить</Button>
                </Flex>
            </form>
            <form>
                <FormLabel>Вернуть один (любой) объект, значение поля creationDate, которого является максимальным</FormLabel>
                <Flex mt={5} justifyContent="center">
                    <Button colorScheme='red' onClick={getTopOrgByCreationDate}>Выполнить</Button>
                </Flex>
            </form>
            {error.isError && <AlertMessage status={"error"} title={"Ошибка валидации"} message={error.message}/>}
        </Box>
    );
}