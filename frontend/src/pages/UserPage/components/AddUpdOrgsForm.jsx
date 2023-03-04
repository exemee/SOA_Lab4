import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import NumberControl from "../../../components/NumberControl";
import TextControl from "../../../components/TextControl";
import {useState} from "react";
import {orgsState} from "../../../globalState/orgs";
import {validateAddUpdOrgsInput} from "../../../utils/validateInput";
import AlertMessage from "../../../components/AlertMessage";


export default function AddUpdOrgsForm() {
    const [id, setId] = useState("");
    const [name, setName] = useState("test");
    const [employeesCount, setEmployeesCount] = useState("10");
    const [coordinatesX, setCoordinatesX] = useState("1");
    const [coordinatesY, setCoordinatesY] = useState("1");
    const [creationDate, setCreationDate] = useState("2011-12-03T10:15:30+01:00");
    const [annualTurnover, setAnnualTurnover] = useState("22");
    const [type, setType] = useState("GOVERNMENT");
    const [postalAddressStreet, setPostalAddressStreet] = useState("kronverkskiy");
    const [postalAddressTownX, setPostalAddressTownX] = useState("1");
    const [postalAddressTownY, setPostalAddressTownY] = useState("2");
    const [postalAddressTownZ, setPostalAddressTownZ] = useState("3");
    const [error, setError] = useState({isError: false, message: ""})

    const addSubmitHandler = e => {
        e.preventDefault();
        const validation = validateAddUpdOrgsInput({
                id,
                name,
                employeesCount,
                coordinatesX,
                coordinatesY,
                creationDate,
                annualTurnover,
                type,
                postalAddressStreet,
                postalAddressTownX,
                postalAddressTownY,
                postalAddressTownZ
            }
        );
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.addOrgs({
                isUpd: false,
                id,
                name,
                employeesCount,
                coordinates: {
                    x: coordinatesX,
                    y: coordinatesY
                },
                creationDate,
                annualTurnover,
                type,
                postalAddress: {
                    street: postalAddressStreet,
                    town: {
                        x: postalAddressTownX,
                        y: postalAddressTownY,
                        z: postalAddressTownZ
                    }
                }
            });
    };

    const updSubmitHandler = e => {
        e.preventDefault();
        const validation = validateAddUpdOrgsInput({
                isUpd: true,
                id,
                name,
                employeesCount,
                coordinatesX,
                coordinatesY,
                creationDate,
                annualTurnover,
                type,
                postalAddressStreet,
                postalAddressTownX,
                postalAddressTownY,
                postalAddressTownZ
            }
        );
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.updateOrgs({
                id,
                name,
                employeesCount,
                coordinates: {
                    x: coordinatesX,
                    y: coordinatesY
                },
                creationDate,
                annualTurnover,
                type,
                postalAddress: {
                    street: postalAddressStreet,
                    town: {
                        x: postalAddressTownX,
                        y: postalAddressTownY,
                        z: postalAddressTownZ
                    }
                }
            });
    };

    return (
        <Box mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
             h="100%" w="50%" minW={500} bg={"white"} my={5} opacity={0.95}>
            <form>
                <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} mb={5}>
                    <Text>Добавить/Обновить организацию</Text>
                </Heading>
                <Flex w="full" justifyContent="space-around">
                    <Box mx={3}>
                        <NumberControl label={"Id:"} min={1} value={id} setValue={setId}/>
                        <TextControl label={"Name:"} value={name} setValue={setName}/>
                        <NumberControl label={"Employees count:"} min={0} value={employeesCount}
                                       setValue={setEmployeesCount}/>
                        <NumberControl label={"Coordinate X:"} value={coordinatesX} setValue={setCoordinatesX}/>
                        <NumberControl label={"Coordinate Y:"} value={coordinatesY} setValue={setCoordinatesY}/>
                        <TextControl label={"Creation date:"} value={creationDate} setValue={setCreationDate}
                                     placeholder={"Not required for add"}/>
                    </Box>
                    <Box mx={3}>
                        <NumberControl label={"Annual Turnover:"} min={0} value={annualTurnover}
                                       setValue={setAnnualTurnover}/>
                        <TextControl label={"Type:"} placeholder={"COMMERCIAL, GOVERNMENT, PRIVATE_LIMITED_COMPANY, OPEN_JOINT_STOCK_COMPANY"} value={type}
                                     setValue={setType}/>
                        <TextControl label={"Postal address street:"} value={postalAddressStreet}
                                     setValue={setPostalAddressStreet}/>
                        <NumberControl label={"Postal address town X:"} value={postalAddressTownX}
                                       setValue={setPostalAddressTownX}/>
                        <NumberControl label={"Postal address town Y:"} value={postalAddressTownY}
                                       setValue={setPostalAddressTownY}/>
                        <TextControl label={"Postal address town Z:"} value={postalAddressTownZ}
                                     setValue={setPostalAddressTownZ}/>
                    </Box>
                </Flex>
                <Flex mt={5} mx={8} justifyContent="space-between">
                    <Button colorScheme='green' onClick={addSubmitHandler}>Добавить</Button>
                    <Button colorScheme='yellow' onClick={updSubmitHandler}>Обновить</Button>
                </Flex>
                {error.isError && <AlertMessage status={"error"} title={"Ошибка валидации"} message={error.message}/>}
            </form>
        </Box>
    );
}