import  React , {useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NasaData() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [data, setData] = useState([]);
  const apikey ='yCx4CvIFFGFlQ1ktyufm8yCoYOnS97jY6UdcEcSp';

  const getApiData = async () => {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=yCx4CvIFFGFlQ1ktyufm8yCoYOnS97jY6UdcEcSp"
    ).then((response) => response.json());
    // update the state
    setData(response);
  };
  useEffect(() => {
    
    getApiData();
  
  }, [])
  
  console.log(data);
  const pictVideo = ()=>{
    if(data.media_type ==="image"){
      let imageLink =null;
      if(data.hdurl=== null){
        imageLink = data.url;
      }
      else{
        imageLink=data.hdurl;
      }
        return(
          <CardMedia
            component="img"
            height="400vh"
            image={imageLink}
            alt="Paella dish"
          />
        )
    }

    else if(data.media_type=="video"){
      return(
        < CardMedia
          component="iframe" 
          height="400"
          autoPlay 
          controls 
          margin = "auto"
          src={data.url}
        />
      )
    }

  }
  return (
    <Card sx={{ bgcolor: '', width: '100%'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[400] }} aria-label="recipe">
            N
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title = {data.title}
        subheader= {data.date}
      />

      {pictVideo()}
      
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.
        </Typography>
        
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
            aria-label="add to favorites"
           
          >
          <Typography>
            Explanation 
          </Typography>
          <ReadMoreIcon 
            fontSize= {'large'} 
            onClick = {handleExpandClick}/>
          
          
        </IconButton>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Typography>
            Exaplanation
          </Typography>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        
          <Typography paragraph 
            align="center"
            variant="h5">
              {data.title}
          </Typography>
          <Typography paragraph 
            align="center"
            variant="body2"
            color="text.secondary">
              copyright ({data. copyright})
          </Typography>
          <Typography 
            paragraph={true}
            align="center"
            variant="body1">
                {data.explanation}
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}
