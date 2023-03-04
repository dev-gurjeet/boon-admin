import { Pagination } from "@mui/material";
import { styled } from "@mui/system";
import { THEME } from "../utils/constants";

export const CustomPagination = styled(Pagination)(() => ({
  "& .Mui-selected": {
    backgroundColor: `${THEME.COLORS.primary} !important`,
    color: "#fff",
    // fontSize: "19px !important",
  },
  "& .MuiPaginationItem-root": {
    border: `1px solid ${THEME.COLORS.primary} !important`,
    fontSize: "19px !important",
  },
  "& .MuiPaginationItem-text": {
    // fontSize: "19px !important",
  },
}));
