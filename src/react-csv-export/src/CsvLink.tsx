// eslint-disable
// @ts-nocheck
import Papa from "papaparse";
import React, {MouseEvent, useCallback, useEffect} from "react";

interface CsvLinkProps {
    data: any[];
    fileName: string;
    withTimeStamp?: boolean;
    skipHeader?: boolean;
    skipEmptyLines?: boolean;
    onClick?: () => void;
    children: any
}

const CsvLink: React.FC<CsvLinkProps> = (
    {
        data,
        fileName,
        withTimeStamp,
        skipHeader = false,
        skipEmptyLines = false,
        children,
        onClick
    }) => {
    let lastObjectUrl: string = null;

    const handleClick = (evt: MouseEvent<HTMLElement>) => {
        const csv = Papa.unparse(data, {header: !skipHeader, skipEmptyLines});
        const url = getObjectURL(csv);
        const computedFileName = computeFileName();

        const tempA = document.createElement("a");
        tempA.href = url;
        tempA.download = computedFileName;
        tempA.target = "_blank";
        tempA.click();
        tempA.remove();

        if (onClick) {
            onClick();
        }
        evt.stopPropagation();
        evt.preventDefault();
    };

    useEffect(() => {
        return () => {
            revokeObjectURL();
        };
        // eslint-disable-next-line
    }, []);

    const computeFileName = useCallback(
        () => (withTimeStamp ? `${fileName}_${Date.now()}` : fileName),
        [fileName, withTimeStamp]
    );

    const getObjectURL = (csv: string) => {
        revokeObjectURL();
        const type = "text/csv";
        const blob = new Blob([csv], {type});
        lastObjectUrl = URL.createObjectURL(blob);
        return lastObjectUrl;
    };

    const revokeObjectURL = () => {
        if (lastObjectUrl) {
            URL.revokeObjectURL(lastObjectUrl);
            lastObjectUrl = null;
        }
    };

    return (
        <a href="src/react-csv-export/src#" target="_self" onClick={handleClick}>
            {children}
        </a>
    );
};

export default CsvLink;
