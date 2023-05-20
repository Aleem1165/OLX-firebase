import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 , color: "red" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          size='large'
          onChange={handleChange}
        >
          <MenuItem value={10}>Karachi</MenuItem>
          <MenuItem value={20}>Lahore</MenuItem>
          <MenuItem value={30}>Sindh</MenuItem>
          <MenuItem value={40}>Punjab</MenuItem>
          <MenuItem value={50}>Islamabaad</MenuItem>
          <MenuItem value={60}>Balochistan</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}
