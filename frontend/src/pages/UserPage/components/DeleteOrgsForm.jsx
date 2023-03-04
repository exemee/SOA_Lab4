import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import NumberControl from "../../../components/NumberControl";
import {useState} from "react";
import {orgsState} from "../../../globalState/orgs";
import {validateByAnnualTurnoverInput, validateByIdInput} from "../../../utils/validateInput";
import AlertMessage from "../../../components/AlertMessage";


export default function DeleteOrgsForm() {
    const [id, setId] = useState("");
    const [annualTurnover, setAnnualTurnover] = useState("");
    const [error, setError] = useState({isError: false, message: ""})

    const deleteByIdSubmitHandler = e => {
        e.preventDefault();
        const validation = validateByIdInput({id});
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.deleteOrgById(id);
    };
    const deleteByAnalSubmitHandler = e => {
        e.preventDefault();
        const validation = validateByAnnualTurnoverInput({annualTurnover});
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.deleteOrgsByAnnualTurnover({annualTurnover});
    };
    return (
        <Box mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
             h="100%" w="50%" minW={300} bg={"white"} my={5} opacity={0.95}>
            <form>
                <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} mb={5}>
                    <Text>Удалить организации</Text>
                </Heading>
                <NumberControl label={"Id:"} min={1} value={id} setValue={setId}/>
                <NumberControl label={"Annual Turnover:"} min={0} value={annualTurnover}
                               setValue={setAnnualTurnover}/>
                <Flex mt={5} justifyContent="space-between">
                    <Button mx={5} colorScheme='gray' onClick={deleteByIdSubmitHandler}>Удалить (id)</Button>
                    <Button mx={5} colorScheme='gray' onClick={deleteByAnalSubmitHandler}>Удалить (annual turn)</Button>
                </Flex>
            </form>
            {error.isError && <AlertMessage status={"error"} title={"Ошибка валидации"} message={error.message}/>}
        </Box>
    );
}