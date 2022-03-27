
import Pagination from '@mui/material/Pagination';
import { useGridApiContext } from '@mui/x-data-grid';
// import { makeStyles } from '@mui/styles';
export const CustomPagination = () => {
    const apiRef = useGridApiContext();
    const state = apiRef.current.state
    return (
        <Pagination
            //className={classes.root}
            color="primary"
            count={state.pagination.pageCount}
            page={state.pagination.page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
            sx={{
                display: 'flex',
            }}
            shape="rounded"
            size="small"
        />
    );
};

//export default CustomPagination;
