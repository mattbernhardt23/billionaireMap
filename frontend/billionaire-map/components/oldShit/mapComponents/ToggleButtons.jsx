import { PinDrop, RadioButtonUnchecked } from '@mui/icons-material'
import { ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { useState } from 'react'

function ToggleButtons({mapView}) {
    const [view, setView] = useState('pins');

  const handleChange = (event, nextView) => {
    setView(nextView);
  }
  return (
    <ToggleButtonGroup 
        size="small" 
        orientation="vertical" 
        value={view} 
        exclusive onChange={handleChange}
    >
      <Tooltip 
        title="Pins" 
        aria-label="Pins" 
        placement="right-end"
      >
            <ToggleButton 
                value="pins" aria-label="pins" 
                onClick={() => mapView("pins")}
            >
                <PinDrop 
                    style={{ color: '#eaebea' }}
                 />
            </ToggleButton>
      </Tooltip>
      <Tooltip 
        title="Clusters" 
        aria-label="Clusters" 
        placement="right-end">
            <ToggleButton 
                value="clusters" aria-label="clusters" 
                onClick={() => mapView("clusters")}>
                <RadioButtonUnchecked       style={{ color: '#eaebea' }}/>
            </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  )
}


export default ToggleButtons