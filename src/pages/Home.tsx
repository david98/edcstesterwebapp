import React, { useEffect } from 'react'

import TopBar from '../components/TopBar'
import WidgetsGrid from '../components/WidgetsGrid'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import ApiWrapper from '../utils/ApiWrapper'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            padding: 50,
        },
    })
)

type State = {
    loading: boolean
    widgets: string[]
}

export default function Home() {
    const classes = useStyles()

    const [state, setState] = React.useState<State>({
        loading: true,
        widgets: [],
    })

    const loadWidgets = async () => {
        let widgets = await ApiWrapper.getWidgets()
        setState({ ...state, loading: false, widgets })
    }

    useEffect(() => {
        loadWidgets()
    }, [])

    return (
        <div>
            <TopBar />
            <div className={classes.content}>
                {state.loading ? (
                    <LinearProgress />
                ) : (
                    <WidgetsGrid widgets={state.widgets} />
                )}
            </div>
        </div>
    )
}
