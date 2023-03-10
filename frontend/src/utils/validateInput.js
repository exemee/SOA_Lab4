export const validateGetOrgsInput = ({
                                         isPaginationEnable,
                                         isFilteringEnable,
                                         isSortingEnable,
                                         page,
                                         size,
                                         filter,
                                         sort
                                     }) => {
    if (isPaginationEnable)
        if (!Number.isInteger(+page) || !Number.isInteger(+size) || page < 0 || size < 1)
            return {
                isValid: false,
                message: "Номер страницы: неотрицательное целое число\nРазмер страницы: положительное целое число"
            }
    if (isFilteringEnable)
        if (!filter || !/^[A-Za-z0-9.;,=<>]*$/.test(filter))
            return {isValid: false, message: "Строка фильтрации имеет неверный формат"}
    if (isSortingEnable)
        if (!sort || !/[A-Za-z0-9.],(asc|desc);*$/.test(sort))
            return {isValid: false, message: "Строка сортировки имеет неверный формат"}
    return {isValid: true, message: null}
};

export const validateByIdInput = ({id}) => {
    if (!Number.isInteger(+id) || id < 1)
        return {isValid: false, message: "Id: положительное целое число"}
    return {isValid: true, message: null}
};

export const validateAddUpdOrgsInput = ({
                                            isUpd, id, name, employeesCount, coordinatesX, coordinatesY, creationDate,
                                            annualTurnover, type, postalAddressStreet, postalAddressTownX,
                                            postalAddressTownY, postalAddressTownZ
                                        }) => {
    if ((isUpd || id) && (!Number.isInteger(+id) || id < 1))
        return {isValid: false, message: "Id: положительное целое число"}
    if (!name)
        return {isValid: false, message: "Name: строка не может быть пустой"}
    if (!employeesCount || !Number.isInteger(+employeesCount) || employeesCount < 0)
        return {isValid: false, message: "Employees count: неотрицательное целое число"}
    if (coordinatesX && !Number.isFinite(+coordinatesX))
        return {isValid: false, message: "Coordinate X: число"}
    if (!coordinatesY || !Number.isInteger(+coordinatesY))
        return {isValid: false, message: "Coordinate Y: целое число"}
    if ((isUpd || creationDate) && isNaN(Date.parse(creationDate)))
        return {isValid: false, message: "Creation date: формат не соответсвует образцу"}
    if (!annualTurnover || !Number.isFinite(+annualTurnover) || annualTurnover <= 0)
        return {isValid: false, message: "Annual turnover: положительное число"}
    if (["COMMERCIAL", "GOVERNMENT", "PRIVATE_LIMITED_COMPANY", "OPEN_JOINT_STOCK_COMPANY"].indexOf(type) === -1)
        return {isValid: false, message: "Type: строка, содержащая COMMERCIAL, GOVERNMENT, PRIVATE_LIMITED_COMPANY, OPEN_JOINT_STOCK_COMPANY"}
    if (!postalAddressStreet|| postalAddressStreet.length > 30)
        return {isValid: false, message: "Postal address street: строка не может быть пустой и длиннее 30"}
    if (!postalAddressTownX || !Number.isInteger(+postalAddressTownX))
        return {isValid: false, message: "Postal address town X: целое число"}
    if (!postalAddressTownY || !Number.isFinite(+postalAddressTownY))
        return {isValid: false, message: "Postal address town Y: число"}
    if (!postalAddressTownZ || !Number.isFinite(+postalAddressTownZ))
        return {isValid: false, message: "Postal address town Z: число"}
    return {isValid: true, message: null}
};

export const validateFilterByEmployeesInput = ({minEmployeesCount, maxEmployeesCount}) => {
    if (!Number.isInteger(+minEmployeesCount) || minEmployeesCount < 0)
        return {isValid: false, message: "Min employees count: неотрицательное целое число"}
    if (!Number.isInteger(+maxEmployeesCount) || maxEmployeesCount < 0)
        return {isValid: false, message: "Max employees count: неотрицательное целое число"}
    return {isValid: true, message: null}
};

export const validateFilterByTypeInput = ({organizationType}) => {
    if (["COMMERCIAL", "GOVERNMENT", "PRIVATE_LIMITED_COMPANY", "OPEN_JOINT_STOCK_COMPANY"].indexOf(organizationType) === -1)
        return {isValid: false, message: "Type: строка, содержащая COMMERCIAL, GOVERNMENT, PRIVATE_LIMITED_COMPANY, OPEN_JOINT_STOCK_COMPANY"}
    return {isValid: true, message: null}
};


export const validateByAnnualTurnoverInput = ({annualTurnover}) => {
    if (!annualTurnover || !Number.isFinite(+annualTurnover) || annualTurnover <= 0)
        return {isValid: false, message: "Annual turnover: положительное число"}
    return {isValid: true, message: null}
};