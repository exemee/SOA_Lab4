import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import NumberControl from "../../../components/NumberControl";
import SwitchControl from "../../../components/SwitchControl";
import TextControl from "../../../components/TextControl";
import {orgsState} from "../../../globalState/orgs";
import {validateByIdInput, validateGetOrgsInput} from "../../../utils/validateInput";
import AlertMessage from "../../../components/AlertMessage";


export default function GetOrgsForm() {
    const [isPaginationEnable, setPaginationEnable] = useState(false);
    const [isFilteringEnable, setFilteringEnable] = useState(false);
    const [isSortingEnable, setSortingEnable] = useState(false);
    const [page, setPage] = useState("");
    const [size, setSize] = useState("");
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");
    const [id, setId] = useState("");
    const [error, setError] = useState({isError: false, message: ""})

    useEffect(() => {
        if (!isPaginationEnable) {
            setPage("");
            setSize("");
        }
        if (!isSortingEnable) setSort("");
        if (!isFilteringEnable) setFilter("");
    }, [isPaginationEnable, isFilteringEnable, isSortingEnable])

    const getSubmitHandler = e => {
        e.preventDefault();
        const validation = validateGetOrgsInput({
            isPaginationEnable,
            isFilteringEnable,
            isSortingEnable,
            page,
            size,
            filter,
            sort
        });
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.fetchOrgs({page, size, filter, sort});
    };

    const getByIdSubmitHandler = e => {
        e.preventDefault();
        const validation = validateByIdInput({id});
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.getOrgById(id);
    };

    return (
        <Box mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
             h="100%" w="50%" minW={300} bg={"white"} my={5} opacity={0.95}>
            <form >
                <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} mb={5}>
                    <Text>Получить организации</Text>
                </Heading>
                <SwitchControl label={"Пагинация"} value={isPaginationEnable}
                               setValue={setPaginationEnable}/>
                <Box mb={4} display={isPaginationEnable ? "content" : "none"}>
                    <NumberControl label={"Номер страницы:"} min={0} value={page} setValue={setPage}/>
                    <NumberControl label={"Размер страницы:"} min={0} value={size} setValue={setSize}/>
                </Box>
                <SwitchControl label={"Фильтрация"} value={isFilteringEnable}
                               setValue={setFilteringEnable}/>
                <Box mb={4} display={isFilteringEnable ? "content" : "none"}>
                    <TextControl value={filter} setValue={setFilter}
                                 placeholder={"id>=2;postalAddress.street==tilt;..."}/>
                </Box>
                <SwitchControl label={"Сортировка"} value={isSortingEnable}
                               setValue={setSortingEnable}/>
                <Box mb={4} display={isSortingEnable ? "content" : "none"}>
                    <TextControl value={sort} setValue={setSort}
                                 placeholder={"id,desc;coordinates.y,asc;..."}/>
                </Box>
                <Flex mt={5} justifyContent="center">
                    <Button colorScheme='red' onClick={getSubmitHandler}>Получить</Button>
                </Flex>
            </form>
            <form>
                <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} my={5}>
                    <Text>Получить организацию (id)</Text>
                </Heading>
                <NumberControl label={"id"} min={1} value={id} setValue={setId}/>
                <Flex mt={5} justifyContent="center">
                    <Button colorScheme='red' onClick={getByIdSubmitHandler}>Получить</Button>
                </Flex>
            </form>
            {error.isError && <AlertMessage status={"error"} title={"Ошибка валидации"} message={error.message}/>}
        </Box>
    );
}