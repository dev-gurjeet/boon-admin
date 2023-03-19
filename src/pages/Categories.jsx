import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CategoryTableTableHeading from "../components/CategoryTableHeading";
import CategoryTableItem from "../components/CategoryTableItem";
import {
  addCategory,
  clearAdd,
  clearDelete,
  clearreorderCategory,
  clearSaveCommonDetails,
  clearUpdate,
  deleteCategory,
  getCategory,
  getCommonDetails,
  reorderCategory,
  saveCommonDetails,
  updateCategory,
} from "../redux/CategoryReducer";
import { clearUploadDocument, uploadDocument } from "../redux/commonReducer";
import { THEME } from "../utils/constants";
import { PhotoCamera } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const Categories = () => {
  const dispatch = useDispatch();
  const {
    uploadDocument_isLoading,
    uploadDocument_Data,
    uploadDocument_isError,
  } = useSelector((store) => store.commonStore);
  const {
    getCategory_isLoading,
    getCategory_Data,
    getCategory_isError,

    addCategory_isLoading,
    addCategory_Data,
    addCategory_isError,

    updateCategory_isLoading,
    updateCategory_Data,
    updateCategory_isError,

    deleteCategory_isLoading,
    deleteCategory_Data,
    deleteCategory_isError,

    saveCommonDetails_isLoading,
    saveCommonDetails_Data,
    saveCommonDetails_isError,

    getCommonDetails_isLoading,
    getCommonDetails_Data,
    getCommonDetails_isError,

    reorderCategory_isLoading,
    reorderCategory_Data,
    reorderCategory_isError,
  } = useSelector((store) => store.categoryStore);
  const [state, setState] = useState({
    dialog: false,
    category: "",
    edit: false,
    editId: "",
    deleteId: "",
    image: "",
    minimumPrice: "",
    confirmDelete: false,
    categoryData: [],
  });
  const handleAdd = () => {
    const body = {
      categoryName: state.category,
      categoryImage: state.image,
    };
    dispatch(addCategory(body));
  };
  const handleDelete = (id) => {
    setState({ ...state, confirmDelete: true, deleteId: id });
  };
  const handleConfirm = () => {
    const body = {
      categoryId: state.deleteId,
    };
    dispatch(deleteCategory(body));
  };
  const handleEdit = (id, name, image) => {
    setState({
      ...state,
      category: name,
      edit: true,
      editId: id,
      dialog: true,
      image: image,
    });
  };
  const handleUpdateMinimumPrice = () => {
    const body = {
      jobMinimumPrice: state.minimumPrice,
    };
    dispatch(saveCommonDetails(body));
  };
  const handleUpdate = () => {
    const body = {
      categoryId: state.editId,
      categoryName: state.category,
      categoryImage: state.image,
    };
    dispatch(updateCategory(body));
  };
  const onDragEnd = (result) => {
    // dropped outside the list

    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    let allData = [...state.categoryData];
    let element = allData[result.source.index];
    allData.splice(result.source.index, 1);
    allData.splice(result.destination.index, 0, element);

    setState({ ...state, categoryData: allData });
    let arr = [];
    allData.forEach((item, i) => {
      arr.push({
        categoryId: item.categoryId,
        sequence: allData.length - i,
      });
    });
    // console.log(allData, arr);

    dispatch(reorderCategory({ data: arr }));
  };
  useEffect(() => {
    if (reorderCategory_Data) {
      toast.success("category reordered");
      console.log(reorderCategory_Data);
      dispatch(clearreorderCategory());
      dispatch(getCategory());
    }
    if (reorderCategory_isError) {
      toast.error(
        reorderCategory_isError?.message
          ? reorderCategory_isError?.message
          : "something went wrong"
      );
      dispatch(clearreorderCategory());
    }
  }, [reorderCategory_Data, reorderCategory_isError]);
  useEffect(() => {
    if (updateCategory_Data) {
      toast.success("category updated");
      setState({
        ...state,
        dialog: false,
        category: "",
        edit: false,
        editId: "",
      });
      dispatch(clearUpdate());
      dispatch(getCategory());
    }
    if (updateCategory_isError) {
      toast.error("something went wrong");
    }
  }, [updateCategory_Data, updateCategory_isError]);
  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    dispatch(uploadDocument(formData));
  };
  useEffect(() => {
    if (getCommonDetails_Data) {
      setState({
        ...state,
        minimumPrice: getCommonDetails_Data?.data?.jobMinimumPrice,
      });
    }
  }, [getCommonDetails_Data]);

  useEffect(() => {
    if (saveCommonDetails_Data) {
      toast.success("price updated");
      dispatch(clearSaveCommonDetails());
      setState({ ...state, minimumPrice: "" });
      dispatch(getCommonDetails());
    }
    if (saveCommonDetails_isError) {
      toast.error(
        saveCommonDetails_isError?.message
          ? saveCommonDetails_isError?.message
          : "something went wrong"
      );
    }
  }, [saveCommonDetails_Data, saveCommonDetails_isError]);
  useEffect(() => {
    if (addCategory_Data) {
      toast.success("category Added");
      setState({
        ...state,
        dialog: false,
        category: "",
        edit: false,
        editId: "",
        image: "",
      });
      dispatch(clearAdd());
      dispatch(getCategory());
    }
    if (addCategory_isError) {
      toast.error("something went wrong");
    }
  }, [addCategory_Data, addCategory_isError]);

  useEffect(() => {
    if (deleteCategory_Data) {
      toast.success("category deleted");
      dispatch(clearDelete());
      setState({ ...state, confirmDelete: false, deleteId: "" });
      dispatch(getCategory());
    }
    if (deleteCategory_isError) {
      toast.error("something went wrong");
      dispatch(clearDelete());
    }
  }, [deleteCategory_Data, deleteCategory_isError]);
  useEffect(() => {
    if (uploadDocument_Data) {
      setState({ ...state, image: uploadDocument_Data?.data });
      dispatch(clearUploadDocument());
    }
    if (uploadDocument_isError) {
      toast.error(
        uploadDocument_isError?.message
          ? uploadDocument_isError?.message
          : "something wrong"
      );
    }
  }, [uploadDocument_Data, uploadDocument_Data]);
  useEffect(() => {
    if (getCategory_Data) {
      setState({ ...state, categoryData: getCategory_Data?.data });
    }
  }, [getCategory_Data]);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getCommonDetails());
  }, []);
  return (
    <div>
      <Dialog
        open={state.confirmDelete}
        onClose={() =>
          setState({ ...state, confirmDelete: false, deleteId: "" })
        }
        PaperProps={{
          sx: { borderRadius: "10px", width: "350px" },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Delete</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are You Sure Want to Delete</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClose={() =>
              setState({ ...state, confirmDelete: false, deleteId: "" })
            }
          >
            Cancel
          </Button>
          {deleteCategory_isLoading ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" color="error" onClick={handleConfirm}>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={state.dialog}
        onClose={() => setState({ ...state, dialog: false })}
        PaperProps={{
          sx: { borderRadius: "10px", width: "350px" },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
            {state.edit ? "Edit Category" : " Add Category"}
          </Typography>
          <Divider sx={{ my: 0.7 }} />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Enter Category Name
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              value={state.category}
              onChange={(e) => setState({ ...state, category: e.target.value })}
            />
            <Typography variant="body1" sx={{ mt: 1.5, fontWeight: 500 }}>
              Image
            </Typography>
            {state.image && (
              <Box sx={{ height: "80px", width: "80px" }}>
                <img
                  src={state.image}
                  alt="categoryImage"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
            {uploadDocument_isLoading ? (
              <CircularProgress sx={{ color: THEME.COLORS.primary }} />
            ) : (
              <Button
                variant="contained"
                component="label"
                size="small"
                endIcon={<PhotoCamera />}
                sx={{
                  backgroundColor: THEME.COLORS.primary,
                  textTransform: "capitalize",
                  my: 0.5,
                  "&:hover": {
                    backgroundColor: THEME.COLORS.primary,
                  },
                }}
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleUpload}
                />
              </Button>
            )}
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ my: 2 }}
            gap={2}
          >
            <Button
              size="small"
              onClick={() => setState({ ...state, dialog: false })}
              sx={{
                color: "#000",
                backgroundColor: "#D1D1D1",
                "&:hover": {
                  backgroundColor: "#D1D1D1",
                },
              }}
              variant="contained"
            >
              Cancel
            </Button>
            {state.edit ? (
              updateCategory_isLoading ? (
                <CircularProgress
                  sx={{ color: THEME.COLORS.primary }}
                  size={25}
                />
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  disabled={state.image ? false : true}
                  onClick={handleUpdate}
                  sx={{
                    backgroundColor: THEME.COLORS.primary,
                    "&:hover": {
                      backgroundColor: THEME.COLORS.primary,
                    },
                  }}
                >
                  Update
                </Button>
              )
            ) : addCategory_isLoading ? (
              <CircularProgress
                sx={{ color: THEME.COLORS.primary }}
                size={25}
              />
            ) : (
              <Button
                size="small"
                onClick={handleAdd}
                variant="contained"
                disabled={state.image ? false : true}
                sx={{
                  backgroundColor: THEME.COLORS.primary,
                  "&:hover": {
                    backgroundColor: THEME.COLORS.primary,
                  },
                }}
              >
                Submit
              </Button>
            )}
          </Stack>
        </Box>
      </Dialog>
      <Box
        sx={{
          backgroundColor: "#0F1C24",
          px: 2,
          py: 1,
          boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
          borderRadius: "5px",
          my: 2,
          mx: "20%",
        }}
      >
        <Typography sx={{ color: "#fff", fontWeight: 500, fontSize: "18px" }}>
          Minimum Job Price
        </Typography>
        <Box sx={{ mt: 2 ,color:THEME.COLORS.white}}>
          <Typography sx={{ mb: 1 }}>Enter Minimum Price</Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <Typography sx={{ mr: 1,color:"#fff"}}>$</Typography>
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{ width: "50%",backgroundColor:THEME.COLORS.backgroundSecondary,borderRadius:"3px",borderBlockColor:"#fff","&:hover": {
              borderRadius: "3px",borderBlockColor:"#fff",
            },input:{color: THEME.COLORS.text}}}
            placeholder="type minimum Price"
            value={state.minimumPrice}
            onChange={(e) =>
              setState({ ...state, minimumPrice: e.target.value })
            }
          />
          <Box>
            {saveCommonDetails_isLoading || getCommonDetails_isLoading ? (
              <CircularProgress sx={{ color: THEME.COLORS.text, my: 2 }} />
            ) : (
              <Button
                onClick={handleUpdateMinimumPrice}
                sx={{
                  color: "#fff",
                  my: 2,
                  backgroundColor: THEME.COLORS.secondary,
                  textTransform: "capitalize",
                  px: 6,
                  "&:hover": {
                    backgroundColor: THEME.COLORS.secondary,
                  },
                }}
              >
                Update
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                backgroundColor: "#0F1C24",
                px: 2,
                py: 1,
                boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
                borderRadius: "5px",
                my: 2,
                mx: "20%",
              }}
            >
              <Stack
                sx={{ mb: 5, mt: 1 }}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  sx={{ color: "#fff", fontWeight: 500, fontSize: "18px" }}
                >
                  Category
                </Typography>
                <Button
                  onClick={() => setState({ ...state, dialog: true })}
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: THEME.COLORS.secondary,
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: THEME.COLORS.secondary,
                    },
                  }}
                >
                  Add Category
                </Button>
              </Stack>

              <CategoryTableTableHeading />

              <Divider sx={{ my: 1 ,borderBottomColor:"#333"}} />
              {getCategory_isLoading || reorderCategory_isLoading ? (
                <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
                  <CircularProgress
                    sx={{ color: THEME.COLORS.white }}
                    size={40}
                  />
                </Stack>
              ) : (
                state.categoryData?.map((item, itemIndex) => (
                  <Draggable
                    key={itemIndex}
                    draggableId={`${itemIndex}`}
                    index={itemIndex}
                   
                  >
                    {(provide, snapshot) => (
                      <div
                        style={{
                          backgroundColor: snapshot.isDragging
                            ? "#fff"
                            : "blue !important",
                          boxShadow: snapshot.isDragging
                            ? "2px 2px 10px rgba(0,0,0,0.5)"
                            : "none",
                        }}
                        ref={provide.innerRef}
                        {...provide.draggableProps}
                        {...provide.dragHandleProps}
                      >
                        <CategoryTableItem
                          dbId={item?.categoryId}
                          categoryName={item?.categoryName}
                          checked={true}
                          createDate={""}
                          id={itemIndex + 1}
                          image={item?.categoryImage}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                        />
                        <Divider sx={{ my: 1 ,borderBottomColor:"#333"}} />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default memo(Categories);
