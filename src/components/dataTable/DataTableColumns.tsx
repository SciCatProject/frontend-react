const cellStyle: React.CSSProperties = {
    boxSizing: "border-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
};

const renderCell = (val: any) => {
    const parentStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        boxSizing: "border-box",
        display: "block",
        width: "100%"
    };

    return (
        <div style={{ position: "relative", height: "20px" }}>
            <div style={parentStyle}>
                <div style={cellStyle}>{val}</div>
            </div>
        </div>
    );
};

export interface Column {
    name: string;
    label: string;
    options: {
        customBodyRender: (val: any) => JSX.Element;
    };
}

export const columns: Column[] = [
    {
        name: "pid", label: "PID",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "datasetName",
        label: "Name",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "runNumber",
        label: "Run No",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "sourceFolder",
        label: "Source Folder",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "size",
        label: "Size",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "creationTime",
        label: "Creation Time",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "type",
        label: "Type",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "image",
        label: "Image",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "metadata",
        label: "Metadata",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "proposalId",
        label: "Proposal ID",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "ownerGroup",
        label: "Group",
        options: {
            customBodyRender: renderCell
        }
    },
    {
        name: "dataStatus",
        label: "Status",
        options: {
            customBodyRender: renderCell
        }
    },
];

