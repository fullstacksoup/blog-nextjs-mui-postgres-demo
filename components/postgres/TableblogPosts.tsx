import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogUpdateBlogPost from "@/components/postgres/DialogUpdateBlogPost";

export default function TableBlogPosts(props) {
  const { blogData, handleRemoveRecord } = props;
  const [blogDataState, setBlogDataState] = React.useState(blogData);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  console.log("TableBlogPosts", props);
  React.useEffect(() => {
    console.log("TableBlogPosts", props);
    setBlogDataState(props.blogData);
    setTimeout(() => {
      setIsDataLoaded(true);
    }, 500);
  }, [props]);

  return (
    <>
      {isDataLoaded && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Body</TableCell>
                <TableCell align="left">Posted On</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogDataState.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <DialogUpdateBlogPost
                      data={row}
                      handleUpdateRecord={props.handleUpdateRecord}
                    />
                  </TableCell>
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.body}</TableCell>
                  <TableCell align="left">{row.created_on}</TableCell>
                  <TableCell align="left">
                    <IconButton onClick={(e) => handleRemoveRecord(row.id)}>
                      <DeleteIcon sx={{ color: "red", fontSize: 22 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
