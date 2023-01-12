//CVS convert function
export const csvFileToArray = (string: string): Array<any> => {
    const csvHeader: Array<string> = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows: Array<string> = string.slice(string.indexOf("\n") + 1).split("\n");

    return csvRows.map(i => {
        const values = i.split(",");
        return csvHeader.reduce((object: { [key: string]: string }, header: string, index) => {
            object[header] = values[index]
            return object;
        }, {});
    });
};
