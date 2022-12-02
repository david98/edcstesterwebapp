import React from 'react'
import { Grid } from '@mui/material'

import Widget from './Widget'

type Props = {
    widgets: string[]
}

export default function WidgetsGrid(props: Props) {

    return (
        <div>
            <Grid container spacing={3}>
                {props.widgets.map(widget => (
                    <Grid key={widget} item xs>
                        <Widget name={widget} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
