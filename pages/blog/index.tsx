import { useEffect, useState } from 'react';
import { Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import TableBlogPosts from '@/components/postgres/TableBlogPosts';
import TableBlogLoading from '@/components/postgres/TableBlogLoading';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const [queryData, setQueryData] = useState<any>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const { data, error } = useSWR('api/getblogposts', fetcher);


  useEffect(() => {
    fetchData();  
  }, []);


  //* F E T C H   D A T A
  const fetchData = async () => {
    setIsDataLoaded(false);    
    const url = "http://localhost:3007/api/getblogposts";    
    fetch(url)      
      .then((response) => response.json())
      .then((response) => {
        console.log("fetchData", data);
        setQueryData(response);
        
      })
      .catch(function (error) {
        // handle error
        console.log('error', error);
        setIsDataLoaded(true);
        setIsError(true);
        setErrorMsg(error.message);
        
      })
      .finally(function () {
        setIsDataLoaded(true);
      });  
  };


  //* A D D   R E C O R D
  const handleAddRecord = async () => {    
    fetch("http://localhost:3007/api/addblogpost", {
      method: "POST",
      body: JSON.stringify({ title: title, body: body }),
    })
    .then((response) => {
      console.log("Then Response", response);
      fetchData();      
    })
    .catch(function (error) {
      // handle error      
      setIsError(true);
      setErrorMsg(error.message);
      
    })
    .finally(function () {
      
    });  

  };

  //* U P D A T E   R E C O R D
  const handleUpdateRecord = async (id, title, body) => {
    // console.log("handleUpdateRecord", id, title, body);
    
    fetch("http://localhost:3007/api/updateblogpost", {
      method: "POST",
      body: JSON.stringify({ id: id, title: title, body: body }),
    })
    .then((response) => {
      console.log("Then Response", response);
      fetchData();
    })
    .catch(function (error) {
      // handle error      
      setIsError(true);
      setErrorMsg(error.message);
    })
    .finally(function () {
      
    });  

  };

  //* R E M O V E   R E C O R D
  const handleRemoveRecord = async (id) => {
    // console.log("handleRemoveRecord", id);
    setIsDataLoaded(false);
    fetch("http://localhost:3007/api/deleteblogpost", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    })
    .then((response) => {
       // console.log("Then Response", response);
      fetchData();
    })
    .catch(function (error) {
      // handle error      
      setIsError(true);
      setErrorMsg(error.message);
    })
    .finally(function () {

    });  

  };

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Stack spacing={2}>
            <TextField
              type="text"
              id="standard-basic"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              type="text"
              multiline
              rows={4}
              id="standard-basic"
              label="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <Button variant="contained" 
                    disabled={title.length <= 2 || body.length <= 2}
                    onClick={() => handleAddRecord()}>
              Add
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={8}>
        {!isDataLoaded && <TableBlogLoading />}                
        
        {(isDataLoaded && !isError) && (
          <TableBlogPosts
            blogData={queryData}
            handleUpdateRecord={handleUpdateRecord}
            handleRemoveRecord={handleRemoveRecord}
          />
        )}

        {isError && 
          <Typography color='warning' variant='h3'>{errorMsg}</Typography>
        }

       </Grid>
      </Grid>
    </Container>
  );
}
