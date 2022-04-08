
import { Alert } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../componets/LoadingScreen';
import CustomPagination from '../../componets/Pagination/CustomPagination';
import SingleContent from '../../componets/SingleContent/SingleContent';

function Movies() {
  const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [numOfPages, setNumOfPages] = useState()

   
      useEffect(() => {
        
        const fetchMovies = async () => {
          setLoading(true);
          try{
            const API_KEY = `21a18fd40187d76bd381816c4a8949ea`
            const  {data}  = await axios.get(
              `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
            );
            
                console.log(data)
            setContent(data.results);
            setNumOfPages(data.total_pages);
            setError("");
          }catch(error)
          {
            setError(error.message);
          }
         
          setLoading(false);
        };
        
        fetchMovies()  
      }, [page]);

  return (
    <div>
        <span className='pageTitle'>Movies</span>
        
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <div className='trending'>
                  {content && content.map((e)=> 
                  <SingleContent 
                  key={e.id} 
                  id={e.id}
                  poster={e.poster_path}
                  title={e.title || e.name}
                  date={e.first_air_date || e.release_date}
                  media_type="movie"
                  vote_average={e.vote_average}
                  />)}
                  
                </div>
              )}
            </>
          )}
        </Box>
        <CustomPagination setPage={setPage}/>
    </div>
  )
}

export default Movies