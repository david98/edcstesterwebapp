import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Widget from './Widget'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    })
)

type Props = {
    widgets: string[]
}

export default function WidgetsGrid(props: Props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
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
