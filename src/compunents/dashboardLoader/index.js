import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const style={
  // backgroundColor:"red",
  width:"100%",
  height:"100vh",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
}

function CircularProgressWithLabel(props) {
  return (
    <div style={style}>

    <Box sx={{ position: 'relative', display: 'inline-flex'}}> 
      <CircularProgress variant="determinate" {...props} color="inherit" size={100}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary" fontSize={20} fontWeight={"bold"}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
    </div>

  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularStatic() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}

