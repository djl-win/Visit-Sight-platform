import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { reqComments } from '../../api';
import { error } from "../../utils/message"
import { useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';


function renderRating(params) {
  console.log(params.value);
  return <Rating readOnly value={params.value} />;
}

renderRating.propTypes = {

  value: PropTypes.number,
};


const CommentTable = () => {

  const [comments, setComments] = useState([]);


  useEffect(() => {
    handleAllComments();

  }, [])

  const handleAllComments = async () => {
    const response = await reqComments();
    if (response.code === 200) {
      setComments(response.data)
    }
    else {
      error(response.msg)
    }
  }

  const columns = [
    { field: 'commentId', headerName: 'ID' },
    { field: 'peopleName', headerName: 'Name', width: 150 },
    { field: 'commentRank', headerName: 'Rating', width: 200 ,
    renderCell: renderRating},
    { field: 'commentDate', headerName: 'Commented On', width: 200 },
    { field: 'commentContent', headerName: 'Content', width: 580 }
  ]

  return (

    <Box sx={{
      height: '100%',
      width: '100%',
    }}>

      <DataGrid
      
        sx={{
          border: "0px ",
          '.MuiButton-root': {
            color: '#000'
          }
        }}
        getRowId={comments => comments.commentId}
        rows={comments}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        components={{ Toolbar: GridToolbar }}
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

export default CommentTable