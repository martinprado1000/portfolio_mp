import * as React from 'react';

import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Select, { type SelectChangeEvent, selectClasses } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';

import { MpAvatar } from 'src/components/customIcons/MpIcon';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  const [company, setCompany] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCompany(event.target.value as string);
  };

  return (
    <Select
      labelId="company-select"
      id="company-simple-select"
      value={company}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select company' }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          pl: 1,
        },
      }}
    >
      <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader>

      <MenuItem value="">
        <Box display="flex" alignItems="center">
          <ListItemAvatar>
            <Avatar alt="SystemsMP web">
              {/* <DevicesRoundedIcon sx={{ fontSize: '1rem' }} /> */}
              {/* <MpIcon /> */}
              <MpAvatar />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="SystemsMP-web" secondary="Web app" />
        </Box>
      </MenuItem>

      <MenuItem value={10}>
        <Box display="flex" alignItems="center">
          <ListItemAvatar>
            <Avatar alt="SystemsMP App">
              <SmartphoneRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="SystemsMP-app" secondary="Mobile application" />
        </Box>
      </MenuItem>

      <MenuItem value={20}>
        <Box display="flex" alignItems="center">
          <ListItemAvatar>
            <Avatar alt="SystemsMP Store">
              <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="SystemsMP-Store" secondary="Web app" />
        </Box>
      </MenuItem>

      <ListSubheader>Development</ListSubheader>

      <MenuItem value={30}>
        <Box display="flex" alignItems="center">
          <ListItemAvatar>
            <Avatar alt="SystemsMP Admin">
              <ConstructionRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="SystemsMP-Admin" secondary="Web app" />
        </Box>
      </MenuItem>

      <Divider sx={{ mx: -1 }} />

      <MenuItem value={40}>
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Add product" secondary="Web app" />
      </MenuItem>
    </Select>
  );
}
