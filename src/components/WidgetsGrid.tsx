import React from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import Widget from './Widget'

type Props = {
    widgets: string[]
}

export default function WidgetsGrid(props: Props) {
    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                {props.widgets.map((widget) => (
                    <Grid key={widget}>
                        <Widget name={widget} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
