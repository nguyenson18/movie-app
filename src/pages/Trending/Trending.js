import  { useState, useEffect } from 'react';
import axios from "axios";
import SingleContent from '../../componets/SingleContent/SingleContent';
import './Trending.css';
import { Alert } from '@mui/material';
import LoadingScreen from '../../componets/LoadingScreen';
import { Box } from '@mui/system';
import CustomPagination from '../../componets/Pagination/CustomPagination';

function Trending() {
  const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

   
      useEffect(() => {
        
        const fetchTrending = async () => {
          setLoading(true);
          try{
            const API_KEY = `21a18fd40187d76bd381816c4a8949ea`
            const  {data}  = await axios.get(
              `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
            );
            
                console.log(data.results)
            setContent(data.results);
            setError("");
          }catch(error)
          {
            setError(error.message);
          }
         
          setLoading(false);
        };
        
        fetchTrending()  
      }, [page]);
  return (
    <div>
        <span className='pageTitle'>Trending</span>
        


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
                  media_type={e.media_type}
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

export default Trending