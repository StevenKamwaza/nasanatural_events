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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

  return (
    <Card sx={{ bgcolor: '', width: '75%'}}>
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

      {/* <CardMedia
        component="img"
        height="400vh"
        image="https://apod.nasa.gov/apod/image/2205/NGC1512inner_Hubble_960.jpg"
        alt="Paella dish"
      /> */}
      < CardMedia
        component="iframe" 
        height="400"
        autoPlay 
        controls 
        margin = "auto"
        src={data.url}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Explanation:</Typography>
          <Typography paragraph>
            {data.explanation}
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}
