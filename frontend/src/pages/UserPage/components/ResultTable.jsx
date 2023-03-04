import {Box, Heading, Table, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {useTable} from "react-table";
import {orgsState} from "../../../globalState/orgs"
import {useMemo} from "react";
import {observer} from "mobx-react";
import AlertMessage from "../../../components/AlertMessage";

export const ResultTable = observer(() => {

    const columns = useMemo(() => [
        {Header: 'id', accessor: 'id'},
        {Header: 'Name', accessor: 'name'},
        {Header: 'Employees count', accessor: 'employeesCount'},
        {
            Header: 'Coordinates', columns: [
                {Header: 'X', accessor: 'coordinatesX'},
                {Header: 'Y', accessor: 'coordinatesY'},
            ]
        },
        {Header: 'Creation Date', accessor: 'creationDate'},
        {Header: 'Annual turnover', accessor: 'annualTurnover'},
        {Header: 'Type', accessor: 'type'},
        {
            Header: 'postal address', columns: [
                {Header: 'Street', accessor: 'postalAddressStreet'},
                {
                    Header: 'Town', columns: [
                        {Header: 'X', accessor: 'postalAddressTownX'},
                        {Header: 'Y', accessor: 'postalAddressTownY'},
                        {Header: 'Z', accessor: 'postalAddressTownZ'},
                    ]
                },
            ]
        },

    ], []);
    const data = useMemo(() =>
        orgsState.orgs?.map(o => ({
            id: o.id,
            name: o.name,
            employeesCount: o.employeesCount,
            coordinatesX: o.coordinates.x,
            coordinatesY: o.coordinates.y,
            creationDate: o.creationDate,
            annualTurnover: o.annualTurnover,
            type: o.type,
            postalAddressStreet: o.postalAddress.street,
            postalAddressTown: o.postalAddress.town,
            postalAddressTownX: o.postalAddress.town.x,
            postalAddressTownY: o.postalAddress.town.y,
            postalAddressTownZ: o.postalAddress.town.z,
        })), [orgsState.orgs]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data});

    return (
        <Box mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
             h="20%" w="100%" minW={300} bg={"white"} bg={"white"} my={5} opacity={0.95} size="sm">
            <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} mb={2}>
                <Text>Результат запроса</Text>
            </Heading>
            {
                orgsState.response.isError !== null &&
                <Box textAlign="center" mx="40%" size="sm">
                    <AlertMessage status={orgsState.response.isError ? "error" : "success"}
                                  message={orgsState.response.message}
                                  title={orgsState.response.isError ? "Error" : "Success"}/>
                </Box>
            }
            {orgsState.orgs.length !== 0 &&
                <Table {...getTableProps()} size="md">
                    <Thead>
                        {headerGroups.map(headerGroup => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row)
                            return (
                                <Tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                    })}
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            }
        </Box>
    );
});