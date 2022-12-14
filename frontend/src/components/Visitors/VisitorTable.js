import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { GlobalStyles } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { reqVisitorData } from '../../api';
import { error } from "../../utils/message"
import PropTypes from 'prop-types';

function renderGender(params) {
    if (params.value === 1) {
        return <MaleIcon />;
    } else if ((params.value === 2)) {
        return <FemaleIcon />;
    }

}

renderGender.propTypes = {
    value: PropTypes.number,
};

const VisitorTable = () => {

    const [visitors, setVisitors] = useState([]);


    useEffect(() => {
        handleAllVisitors();

    }, [])

    const handleAllVisitors = async () => {
        const response = await reqVisitorData();
        console.log(response.data)
        if (response.code === 200) {
            setVisitors(response.data)
        }
        else {
            error(response.msg)
        }
    }

    // make filter visible
    // const columns = React.useMemo(
    //   () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    //   [data.columns],
    // );
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'gender', headerName: 'Gender', width: 150, renderCell: renderGender },
        { field: 'age', headerName: 'Age', width: 150 },
        { field: 'email', headerName: 'E-mail', width: 250 },
        { field: 'phone', headerName: 'Phone', width: 250 },
        { field: 'date', headerName: 'Visit Date', width: 200 },
    ]

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <GlobalStyles
                styles={{
                    '.MuiDataGrid-toolbarContainer': {
                        backgroundColor: 'white',
                    },
                }}
            />
            <DataGrid
                sx={{
                    border: "0px ",
                    '.MuiButton-root': {
                        /* background-color: green; */
                        /* box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); */
                        /* padding: 7px 14px; */
                        color: '#000'
                    }
                }}
                getRowId={visitors => visitors.id}
                rows={visitors}
                columns={columns}
                components={{
                    Toolbar: GridToolbar,
                }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
            />
        </Box>

    );
}


export default VisitorTable