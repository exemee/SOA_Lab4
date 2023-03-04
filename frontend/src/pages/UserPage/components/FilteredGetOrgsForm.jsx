import {Box, Button, Flex, FormLabel, Heading, Text, Select} from "@chakra-ui/react";
import NumberControl from "../../../components/NumberControl";
import {useState} from "react";
import {orgsState} from "../../../globalState/orgs";
import {
    validateFilterByEmployeesInput,
    validateFilterByType,
    validateFilterByTypeInput
} from "../../../utils/validateInput";
import AlertMessage from "../../../components/AlertMessage";
import TextControl from "../../../components/TextControl";



export default function FilteredGetOrgsForm() {
    const [organizationType, setOrganizationType] = useState("");
    const [minEmployeesCount, setMinEmployeesCount] = useState("");
    const [maxEmployeesCount, setMaxEmployeesCount] = useState("");
    const [error, setError] = useState({isError: false, message: ""});

    const getFilteredByTypeSubmitHandler = e => {
        console.log(organizationType)
        e.preventDefault();
        const validation = validateFilterByTypeInput({organizationType});
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
        orgsState.getFilteredOrgsByType(organizationType);
    };

    const getFilteredByEmployeesSubmitHandler = e => {
        e.preventDefault();
        const validation = validateFilterByEmployeesInput({minEmployeesCount, maxEmployeesCount})
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.getFilteredOrgsByEmployees(minEmployeesCount, maxEmployeesCount);
    };

    return (
        <Box mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
             h="100%" w="50%" minW={300} bg={"white"} my={5} opacity={0.95}>
            <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} mb={5}>
                <Text>Получить организации, используя фильтры</Text>
            </Heading>
            <form>
                <FormLabel>Отфильтровать организации по типу</FormLabel>
                <TextControl label={"Type:"} placeholder={"COMMERCIAL, GOVERNMENT, PRIVATE_LIMITED_COMPANY, OPEN_JOINT_STOCK_COMPANY"} value={organizationType}
                             setValue={setOrganizationType}/>
                <Flex my={5} justifyContent="center">
                    <Button colorScheme='red' onClick={getFilteredByTypeSubmitHandler}>Выполнить</Button>
                </Flex>
            </form>
            <form>
                <FormLabel>Отфильтровать организации по количеству сотрудников</FormLabel>
                <NumberControl label={"Min employees count:"} min={0} value={minEmployeesCount}
                               setValue={setMinEmployeesCount}/>
                <NumberControl label={"Max employees count:"} min={0} value={maxEmployeesCount}
                               setValue={setMaxEmployeesCount}/>
                <Flex mt={5} justifyContent="center">
                    <Button colorScheme='red' onClick={getFilteredByEmployeesSubmitHandler}>Выполнить</Button>
                </Flex>
            </form>
            {error.isError && <AlertMessage status={"error"} title={"Ошибка валидации"} message={error.message}/>}
        </Box>
    );
}