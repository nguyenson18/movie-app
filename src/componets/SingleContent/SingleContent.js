import * as React from 'react';
import Badge from '@mui/material/Badge';
import { img_300, unavailable } from "../../config/config"
import './singleContent.css'
import ContentModal from '../contentModal/ContentModal';
import { keys } from 'lodash';

const SingleContent = ({
   
    id,
    poster,
    title,
    date,
    media_type,
    vote_average  
}) => {
  return (
    <ContentModal media_type={media_type} id={id}  >
     <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
        <img 
        className="poster"
        src=
        {poster ? `${img_300}/${poster}` 
        : unavailable } alt={title} />
        <b className="title">{title}</b>
        <span className="sunTitle">
            {media_type === 'tv' ? "TV Series" : "Movie"}
            <span className="sunTitle" >{date}</span>
        </span>
        
    </ContentModal>
  )
}

export default SingleContent