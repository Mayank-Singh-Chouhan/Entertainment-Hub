import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { ThemeProvider, createTheme } from '@material-ui/core';

const darkTheme = createTheme({
    palette: {
        type: "dark",
    },
});

const CustomPagination = ({ page, setPage, numOfPages = 10 }) => {
    const handlePageChange = (event, pageNum) => {
        setPage(pageNum);
        window.scroll(0, 0);
    }

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
            }}
        >
            <ThemeProvider theme={darkTheme}>
                <Pagination
                    page={page}
                    count={numOfPages}
                    variant="outlined"
                    onChange={handlePageChange}
                    color='standard'
                />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination