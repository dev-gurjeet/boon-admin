import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { THEME } from '../utils/constants';
import ContractorWages from '../components/ContractorWages';
import WorkerEarnings from '../components/WorkerEarnings';
import ReferInfo from '../components/ReferInfo';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PaymentDetail = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor='primary' 
          variant="fullWidth"  >
          <Tab sx={value == 0 ? styles.activeTab : styles.tabLabel} label="Contractor wages" {...a11yProps(0)} />
          <Tab sx={value == 1 ? styles.activeTab : styles.tabLabel} label="Worker Earnings" {...a11yProps(1)} />
          <Tab sx={value == 2 ? styles.activeTab : styles.tabLabel} label="Refer info" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ContractorWages />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WorkerEarnings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ReferInfo />
      </TabPanel>
    </Box>
  );
}

export default memo(PaymentDetail);
export const styles = {
  tabLabel: {
    color: THEME.COLORS.text
  },
  activeTab: {
    // color: THEME.COLORS.secondary + '!important'
  }
}
