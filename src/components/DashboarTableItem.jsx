import {
  Box,
  Pagination,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/commonReducer";
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { styled } from '@mui/material/styles';
import { PATH, THEME } from "../utils/constants";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 45,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : THEME.COLORS.secondary,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
const textCss = {
  color: "#202020",
  fontWeight: 400,
  letterSpacing: "1px",
  fontSize: "14px",
  wordWrap: "wrap",
  textOverflow: "ellipsis",
};
const DashboarTableItem = ({
  id,
  dbId,
  name,
  phone,
  address,
  email,
  totalHours,
  img,
  checked,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleActiveInactive = () => {
    const body = {
      userId: dbId,
      isActive: !Boolean(checked),
    };
    // console.log("in update user", body);
    dispatch(updateUser(body));
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [state, setState] = useState({
    isOpen: false,
  });
  return (
    <>
      <StyledTableRow key={id}>
        <StyledTableCell align="left">#{id}</StyledTableCell>
        <StyledTableCell  align="right">
         <Stack sx={{ flex: 0.7 }} direction="row" alignItems="center" gap={1}>
           {img ? (
             <Box>
               <img
                 onClick={() => setState({ ...state, isOpen: true })}
                 src={img}
                 alt="personimage"
                 style={{
                   height: "30px",
                   width: "30px",
                   objectFit: "cover",
                   borderRadius: "50%",
                   cursor: "pointer",
                 }}
               />
             </Box>
           ) : (
             <Stack
               direction="row"
               alignItems="center"
               justifyContent="center"
               sx={{
                 height: "30px",
                 width: "30px",
                 borderRadius: "50%",
                 backgroundColor: "primary.main",
               }}
             >
               <Typography
                 sx={{
                   color: "#fff",
                   textTransform: "capitalize",
                   fontWeight: 600,
                   fontSize: "20px",
                 }}
               >
                 {name ? name?.slice(0, 1) : "B"}
               </Typography>
             </Stack>
           )}
           <Typography
             style={{
               color: "#202020",
               fontWeight: 400,
               letterSpacing: "1px",
               fontSize: "14px",
               wordWrap: "wrap",
               textOverflow: "ellipsis",
               cursor: "pointer",
             }}
             onClick={() => navigate(`${PATH.ContractorDetail}/${dbId}`)}
           >
             {name}
           </Typography>
         </Stack>
      </StyledTableCell>
      <StyledTableCell align="center">{phone && "+1"} {phone}</StyledTableCell>
      <StyledTableCell align="center">{address?.slice(0, 25)}</StyledTableCell>
      <StyledTableCell align="center">{email?.slice(0, 25)}</StyledTableCell>
      <StyledTableCell align="center"><IOSSwitch onClick={handleActiveInactive} checked={checked} /></StyledTableCell> 
    </StyledTableRow>
    </>
  )
  // return (
  //   <>
  //     {state.isOpen && (
  //       <Box sx={{ zIndex: 500000 }}>
  //         <Lightbox
  //           mainSrc={img}
  //           onCloseRequest={() => setState({ ...state, isOpen: false })}
  //         />
  //       </Box>
  //     )}
  //     <Stack direction="row" alignItems="center">
  //       <Box sx={{ flex: 0.3 }}>
  //         <Typography style={textCss}>#{id}</Typography>
  //       </Box>
  //       <Stack sx={{ flex: 0.7 }} direction="row" alignItems="center" gap={1}>
  //         {img ? (
  //           <Box>
  //             <img
  //               onClick={() => setState({ ...state, isOpen: true })}
  //               src={img}
  //               alt="personimage"
  //               style={{
  //                 height: "30px",
  //                 width: "30px",
  //                 objectFit: "cover",
  //                 borderRadius: "50%",
  //                 cursor: "pointer",
  //               }}
  //             />
  //           </Box>
  //         ) : (
  //           <Stack
  //             direction="row"
  //             alignItems="center"
  //             justifyContent="center"
  //             sx={{
  //               height: "30px",
  //               width: "30px",
  //               borderRadius: "50%",
  //               backgroundColor: "primary.main",
  //             }}
  //           >
  //             <Typography
  //               sx={{
  //                 color: "#fff",
  //                 textTransform: "capitalize",
  //                 fontWeight: 600,
  //                 fontSize: "20px",
  //               }}
  //             >
  //               {name ? name?.slice(0, 1) : "B"}
  //             </Typography>
  //           </Stack>
  //         )}
  //         <Typography
  //           style={{
  //             color: "#202020",
  //             fontWeight: 600,
  //             letterSpacing: "1px",
  //             fontSize: "14px",
  //             wordWrap: "wrap",
  //             textOverflow: "ellipsis",
  //             cursor: "pointer",
  //           }}
  //           onClick={() => navigate(`${PATH.ContractorDetail}/${dbId}`)}
  //         >
  //           {name}
  //         </Typography>
  //       </Stack>
  //       <Box sx={{ flex: 0.5 }}>
  //         <Typography style={textCss}>
  //           {phone && "+1"} {phone}
  //         </Typography>
  //       </Box>
  //       {/* <Box sx={{ flex: 1 }}>

  //         <Typography style={textCss}>{address?.slice(0, 25)}</Typography>
  //       </Box> */}
  //       <Box sx={{ flex: 1 }}>
  //         <Typography style={textCss}>{email?.slice(0, 25)}</Typography>
  //       </Box>
  //       {/* <Box sx={{ flex: 0.4 }}>
  //         <IOSSwitch onClick={handleActiveInactive} checked={checked} />
  //       </Box> */}
  //     </Stack>
  //   </>
  // );
};

export default DashboarTableItem;
