import { Chip } from '@mui/material';
import axios from 'axios';
import React, { useEffect  } from 'react'

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage,
    type
}) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((c) => c.id !== genre.id));
        setPage(1);
      };
      const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
      };

    const fetchGenres = async () => {
        const API_KEY = `21a18fd40187d76bd381816c4a8949ea`
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(data.genres);
      };
    console.log(genres)
      useEffect(() => {
        fetchGenres();
    
        return () => {
          setGenres({}); // unmounting
        };
        // eslint-disable-next-line
      }, []);

  return (

  

    <div style={{padding: "6px 0"}}>
        { selectedGenres.map((genre)=> (
        <Chip 
         style={{ margin: 2 }}
        label={genre.name}
        key={genre.id}
        color="primary"
        clickable
        size="small" 
        onDelete={() => handleRemove(genre)}
        />
        
        ))}

        { genres.map((genre)=> (
            <Chip 
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            color="primary"
            clickable
            size="small" 
            onClick={()=> handleAdd(genre) }
            />
        
        ))}
        
    </div>
  )
}

export default Genres