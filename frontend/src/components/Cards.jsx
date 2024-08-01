import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Cards({name , github , linkedin , insta}) {
  return (
    <div className='flex flex-col items-center justify-center h-[60px] bg-slate-300 rounded-lg hover:scale-105' id='main-card-holder'>
        <h1>{name}</h1>
        <div id='social-container'  className='flex'>
            <Button href={github} target='_blank'><GitHubIcon/></Button>
            <Button href={linkedin} target='_blank'><LinkedInIcon/></Button>
            <Button href={insta} target='_blank'><InstagramIcon/></Button>
        </div>
    </div>
  );
}
