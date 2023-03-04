import { Padding } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DashboardTableHeading from "../components/DashboardTableHeading";
import DashboarTableItem from "../components/DashboarTableItem";
import { CustomPagination } from "../components/styledComponent";
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { clearUpdateuser } from "../redux/commonReducer";
import { getAllContractors } from "../redux/ContractorReducer";
import { THEME } from "../utils/constants";
import Paper from '@mui/material/Paper';

import TableRow from '@mui/material/TableRow';

import { styled } from '@mui/material/styles';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableBody-root": {
      "& .MuiTableCell-root": {
        borderLeft: "1px solid rgba(224, 224, 224, 1)"
      }
    }
  }
});
const DashboardContractor = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState(1);
  const {
    getContractors_isLoading,
    getContractors_Data,
    getContractors_isError,
  } = useSelector((store) => store.contractorStore);
  const { updateUser_isLoading, updateUser_Data, updateUser_isError } =
    useSelector((store) => store.commonStore);
  const onChangePage = (e, value) => {
    const body = {
      page: value,
      limit: 10,
    };
    setState(value);
    dispatch(getAllContractors(body));
  };
  useEffect(() => {
    const body = {
      page: state,
      limit: 10,
    };
    dispatch(getAllContractors(body));
  }, []);
  useEffect(() => {
    if (updateUser_Data) {
      toast.success("User Updated");
      dispatch(clearUpdateuser());
      const body = {
        page: state,
        limit: 10,
      };
      dispatch(getAllContractors(body));
    }
    if (updateUser_isError) {
      toast.error(
        updateUser_isError?.message
          ? updateUser_isError?.message
          : "somthing went wrong"
      );
      dispatch(clearUpdateuser());
    }
  }, [updateUser_Data, updateUser_isError]);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  useEffect(() => {
    setState(getContractors_Data?.currentPage);
  }, [getContractors_Data]);
  return (
    <div>
      <Box
        sx={{
          px: 2,
          py: 1,
        }}
      >

        {(getContractors_isLoading || updateUser_isLoading) && !getContractors_Data?.data ? (<Stack>
          <StyledTableRow aria-colspan={6}>
            <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
              <CircularProgress sx={{ color: THEME.COLORS.primary }} size={40} />
            </Stack>
          </StyledTableRow>
        </Stack>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} sx={{ minWidth: 700, width: '101%' }} aria-label="customized table">

              <DashboardTableHeading />
              {/* <Divider sx={{ mt: 0.5 }} /> */}

              <TableBody>{
                getContractors_Data?.data?.map((item, itemIndex) => (

                  // <Box key={itemIndex} sx={{ py: 1 }}>
                  <DashboarTableItem
                    id={(getContractors_Data?.currentPage - 1) * 10 + itemIndex + 1}
                    dbId={item?._id}
                    address={item?.address?.formattedAddress}
                    email={item?.email}
                    name={item?.firstName}
                    phone={item?.phoneNumber}
                    img={item?.profile_pic}
                    checked={item?.isActive}
                  />
                  // <Divider sx={{ mt: 0.5 }} />
                  // </Box> 
                ))
              }
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 5, mb: 2 }}>
        <CustomPagination
          count={getContractors_Data?.totalPage}
          defaultPage={state}
          shape="rounded"
          variant="outlined"
          onChange={onChangePage}
        />
      </Stack>
    </div>
  );
};

export default memo(DashboardContractor);

